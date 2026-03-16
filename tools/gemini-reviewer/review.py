#!/usr/bin/env python3
"""
Custom Gemini PR Reviewer for Shield Stack — runs as a GitHub Action step.

Uses Gemini 3.1 Pro (1M token context) to review pull requests with FULL
context: the product's source tree, issue details, PR comments, specs,
and coding standards.

Adapted from copper-hollow for multi-product mono repo.

Environment variables required:
  GEMINI_API_KEY    — Google AI API key
  GITHUB_TOKEN      — GitHub token with pull-requests:write scope
  PR_NUMBER         — Pull request number to review
  GITHUB_REPOSITORY — owner/repo (e.g., bedwards/shield-stack)
"""

import json
import os
import re
import subprocess
import sys
from pathlib import Path

from google import genai
from google.genai import types

GEMINI_MODEL = "gemini-3.1-pro-preview"
GITHUB_REPO = os.environ.get("GITHUB_REPOSITORY", "bedwards/shield-stack")

# File extensions to include in source tree by language
SOURCE_EXTENSIONS = {
    ".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs",
    ".py", ".rs", ".toml", ".json", ".yaml", ".yml",
    ".svelte", ".astro", ".vue", ".css", ".scss",
    ".sql", ".graphql", ".prisma",
}

# Files/dirs to always skip
SKIP_PATTERNS = {
    "node_modules", ".next", "dist", "build", ".wrangler",
    "target", "__pycache__", ".git", "coverage", ".turbo",
    "package-lock.json", "pnpm-lock.yaml", "bun.lockb",
    "Cargo.lock",
}


def gh_api(endpoint: str, extra_args: list[str] | None = None,
           timeout: int = 60) -> str:
    cmd = ["gh", "api", endpoint]
    if extra_args:
        cmd.extend(extra_args)
    result = subprocess.run(
        cmd, capture_output=True, text=True, timeout=timeout,
    )
    if result.returncode != 0:
        raise RuntimeError(f"gh api {endpoint} failed: {result.stderr}")
    return result.stdout


def get_pr_info(pr_number: int) -> dict:
    return json.loads(gh_api(f"repos/{GITHUB_REPO}/pulls/{pr_number}"))


def get_pr_diff(pr_number: int) -> str:
    return gh_api(
        f"repos/{GITHUB_REPO}/pulls/{pr_number}",
        ["-H", "Accept: application/vnd.github.diff"],
    )


def get_pr_comments(pr_number: int) -> list[dict]:
    comments = []
    for endpoint, comment_type in [
        (f"repos/{GITHUB_REPO}/pulls/{pr_number}/comments", "inline"),
        (f"repos/{GITHUB_REPO}/issues/{pr_number}/comments", "conversation"),
    ]:
        try:
            data = json.loads(gh_api(endpoint, ["--paginate"]))
            for c in data:
                entry = {
                    "user": c.get("user", {}).get("login", "unknown"),
                    "body": c.get("body", ""),
                    "type": comment_type,
                }
                if comment_type == "inline":
                    entry["path"] = c.get("path", "")
                    entry["line"] = c.get("line")
                comments.append(entry)
        except Exception:
            pass

    try:
        data = json.loads(gh_api(f"repos/{GITHUB_REPO}/pulls/{pr_number}/reviews"))
        for r in data:
            if r.get("body"):
                comments.append({
                    "user": r.get("user", {}).get("login", "unknown"),
                    "state": r.get("state", ""),
                    "body": r.get("body", ""),
                    "type": "review",
                })
    except Exception:
        pass

    return comments


def get_linked_issue(pr_info: dict) -> dict | None:
    body = (pr_info.get("body") or "") + " " + (pr_info.get("title") or "")
    matches = re.findall(r'(?:closes?|fixes?|resolves?)\s+#(\d+)|#(\d+)',
                         body, re.IGNORECASE)
    issue_numbers = set()
    for m in matches:
        num = m[0] or m[1]
        if num:
            issue_numbers.add(int(num))

    if not issue_numbers:
        return None

    issue_num = min(issue_numbers)
    try:
        data = json.loads(gh_api(f"repos/{GITHUB_REPO}/issues/{issue_num}"))
        return {
            "number": issue_num,
            "title": data.get("title", ""),
            "body": data.get("body", ""),
            "labels": [l.get("name") for l in data.get("labels", [])],
        }
    except Exception:
        return None


def get_changed_files_list(pr_number: int) -> list[dict]:
    try:
        return json.loads(gh_api(
            f"repos/{GITHUB_REPO}/pulls/{pr_number}/files",
            ["--paginate"],
        ))
    except Exception:
        return []


def detect_product_from_files(changed_files: list[dict]) -> str | None:
    """Detect which product is being modified based on changed file paths."""
    products_file = Path("products.json")
    if not products_file.exists():
        return None

    try:
        data = json.loads(products_file.read_text())
        slugs = {p["slug"] for p in data.get("products", [])}
    except (json.JSONDecodeError, KeyError):
        return None

    product_hits = {}
    for f in changed_files:
        path = f.get("filename", "")
        parts = path.split("/")
        if parts and parts[0] in slugs:
            product_hits[parts[0]] = product_hits.get(parts[0], 0) + 1

    if product_hits:
        return max(product_hits, key=product_hits.get)
    return None


def read_source_tree(product_slug: str | None) -> str:
    """Read source files for the detected product (or root if cross-product)."""
    source_parts = []
    total_chars = 0
    max_chars = 500_000

    search_dirs = []
    if product_slug:
        search_dirs.append(Path(product_slug))
    search_dirs.append(Path("tools"))
    search_dirs.append(Path("scripts"))

    paths_seen = set()
    for search_dir in search_dirs:
        if not search_dir.exists():
            continue
        for fpath in sorted(search_dir.rglob("*")):
            if not fpath.is_file():
                continue
            if fpath.suffix not in SOURCE_EXTENSIONS:
                continue
            if any(skip in fpath.parts for skip in SKIP_PATTERNS):
                continue
            if fpath in paths_seen:
                continue
            paths_seen.add(fpath)

            try:
                content = fpath.read_text()
                if total_chars + len(content) > max_chars:
                    source_parts.append(f"\n### {fpath}\n(skipped — context budget)\n")
                    continue
                source_parts.append(f"\n### {fpath} ({len(content)} chars)\n```\n{content}\n```\n")
                total_chars += len(content)
            except (OSError, UnicodeDecodeError):
                pass

    return "".join(source_parts)


def read_project_files(product_slug: str | None) -> dict[str, str]:
    """Read CLAUDE.md files, configs, and docs."""
    result = {}

    # Root CLAUDE.md
    for fname in ["CLAUDE.md", "products.json"]:
        try:
            result[fname] = Path(fname).read_text()
        except (OSError, UnicodeDecodeError):
            pass

    # Product-specific files
    if product_slug:
        product_dir = Path(product_slug)
        for fname in ["CLAUDE.md", "package.json", "Cargo.toml", "pyproject.toml",
                       "wrangler.toml", "tsconfig.json"]:
            fpath = product_dir / fname
            if fpath.exists():
                try:
                    result[f"{product_slug}/{fname}"] = fpath.read_text()
                except (OSError, UnicodeDecodeError):
                    pass

        docs_dir = product_dir / "docs"
        if docs_dir.is_dir():
            for fpath in sorted(docs_dir.glob("*.md")):
                try:
                    result[f"{product_slug}/docs/{fpath.name}"] = fpath.read_text()
                except (OSError, UnicodeDecodeError):
                    pass

    return result


def build_review_prompt(
    pr_info: dict,
    diff: str,
    changed_files: list[dict],
    comments: list[dict],
    linked_issue: dict | None,
    project_files: dict[str, str],
    source_tree: str,
    product_slug: str | None,
) -> str:
    title = pr_info.get("title", "Unknown")
    body = pr_info.get("body", "") or ""
    author = pr_info.get("user", {}).get("login", "unknown")

    sections = []

    product_desc = f" (product: {product_slug})" if product_slug else ""
    sections.append(
        f"You are a senior code reviewer for Shield Stack{product_desc}, "
        "a mono repo of 22 consumer protection products. Each product is a "
        "standalone app solving a specific consumer pain point. Your review "
        "is the quality gate before code reaches main."
    )

    if "CLAUDE.md" in project_files:
        sections.append(f"## Root Coding Standards (CLAUDE.md)\n{project_files['CLAUDE.md']}")

    if product_slug and f"{product_slug}/CLAUDE.md" in project_files:
        sections.append(
            f"## Product Standards ({product_slug}/CLAUDE.md)\n"
            f"{project_files[f'{product_slug}/CLAUDE.md']}"
        )

    # Config files
    for name, content in project_files.items():
        if name not in ("CLAUDE.md", "products.json") and "CLAUDE.md" not in name:
            sections.append(f"## {name}\n```\n{content}\n```")

    if linked_issue:
        sections.append(
            f"## Linked Issue #{linked_issue['number']}\n"
            f"**Title:** {linked_issue['title']}\n"
            f"**Labels:** {', '.join(linked_issue['labels'])}\n"
            f"**Description:**\n{linked_issue['body']}"
        )

    sections.append(
        f"## Pull Request #{pr_info.get('number', '?')}\n"
        f"**Title:** {title}\n"
        f"**Author:** {author}\n"
        f"**Product:** {product_slug or 'cross-product'}\n"
        f"**Description:**\n{body}"
    )

    if comments:
        comment_text = []
        for c in comments:
            prefix = f"[{c['type']}] {c['user']}"
            if c.get('path'):
                prefix += f" on {c['path']}"
            if c.get('line'):
                prefix += f":{c['line']}"
            if c.get('state'):
                prefix += f" ({c['state']})"
            comment_text.append(f"**{prefix}:**\n{c['body']}\n")
        sections.append("## Existing Comments & Reviews\n" + "\n".join(comment_text))

    sections.append(f"## Source Code\n{source_tree}")
    sections.append(f"## Pull Request Diff\n```diff\n{diff}\n```")

    file_summary = []
    for f in changed_files:
        file_summary.append(
            f"- `{f.get('filename', '?')}` "
            f"({f.get('status', '?')}, "
            f"+{f.get('additions', 0)}/-{f.get('deletions', 0)})"
        )
    sections.append("## Changed Files\n" + "\n".join(file_summary))

    sections.append("""## Review Instructions

You have the full source code, issue context, PR description, existing reviews,
and project standards. Perform a thorough review:

1. **Issue compliance** — Does the implementation fully address the linked issue?
2. **Correctness** — Logic errors? Edge cases? Off-by-one errors?
3. **CLAUDE.md compliance** — Does the code follow project and product standards?
4. **Production quality** — No stubs, no mocks in production paths, no demoware
5. **Testing** — Adequate tests? Real behavior tested?
6. **Security** — Secrets exposed? Injection risks? Unsafe patterns?
7. **Type safety** — Proper TypeScript types? No `any`? Proper error handling?
8. **SEO** — For web products: proper meta tags, structured data, SSR/SSG?

## Output Format

Respond with a JSON object:
```json
{
  "summary": "2-3 sentence overall assessment",
  "verdict": "APPROVE or REQUEST_CHANGES",
  "issue_compliance": "Does the PR fully address the linked issue?",
  "findings": [
    {
      "severity": "high|medium|low",
      "file": "path/to/file",
      "line": 42,
      "category": "correctness|compliance|quality|testing|security|performance|seo",
      "message": "What's wrong and how to fix it"
    }
  ]
}
```

Only output the JSON object, nothing else.
""")

    return "\n\n".join(sections)


def post_review(pr_number: int, review_data: dict, product_slug: str | None) -> None:
    summary = review_data.get("summary", "Review complete.")
    verdict = review_data.get("verdict", "APPROVE")
    issue_compliance = review_data.get("issue_compliance", "")
    findings = review_data.get("findings", [])

    product_label = f" [{product_slug}]" if product_slug else ""
    body_parts = [
        f"## Gemini 3.1 Pro Code Review{product_label}\n",
        f"**Verdict:** {verdict}\n",
        f"### Summary\n{summary}\n",
    ]

    if issue_compliance:
        body_parts.append(f"### Issue Compliance\n{issue_compliance}\n")

    if findings:
        high = [f for f in findings if f.get("severity") == "high"]
        medium = [f for f in findings if f.get("severity") == "medium"]
        low = [f for f in findings if f.get("severity") == "low"]

        for label, group in [("HIGH", high), ("MEDIUM", medium), ("LOW", low)]:
            if group:
                body_parts.append(f"### {label} Priority\n")
                for f in group:
                    file_path = f.get("file", "unknown")
                    line = f.get("line", "")
                    category = f.get("category", "")
                    message = f.get("message", "")
                    line_ref = f":{line}" if line else ""
                    cat_ref = f" [{category}]" if category else ""
                    body_parts.append(
                        f"- **`{file_path}{line_ref}`**{cat_ref}: {message}\n"
                    )

    body_parts.append(
        "\n---\n*Reviewed by Gemini 3.1 Pro with full source context "
        "(custom reviewer, not Gemini Code Assist)*"
    )

    body = "\n".join(body_parts)

    try:
        gh_api(
            f"repos/{GITHUB_REPO}/issues/{pr_number}/comments",
            ["-f", f"body={body}"],
        )
        print("Posted issue comment.")
    except Exception as e:
        print(f"Warning: failed to post issue comment: {e}", file=sys.stderr)

    event = "APPROVE" if verdict == "APPROVE" else "COMMENT"
    try:
        gh_api(
            f"repos/{GITHUB_REPO}/pulls/{pr_number}/reviews",
            ["-f", f"body={body}", "-f", f"event={event}"],
        )
        print("Posted PR review.")
    except Exception as e:
        print(f"Note: PR review post returned: {e}", file=sys.stderr)


def main():
    pr_number = int(os.environ.get("PR_NUMBER", "0"))
    api_key = os.environ.get("GEMINI_API_KEY", "")

    if not pr_number:
        print("ERROR: PR_NUMBER not set", file=sys.stderr)
        sys.exit(1)
    if not api_key:
        print("ERROR: GEMINI_API_KEY not set", file=sys.stderr)
        sys.exit(1)

    print(f"Reviewing PR #{pr_number} with {GEMINI_MODEL} (full context)...")

    print("Fetching PR info...")
    pr_info = get_pr_info(pr_number)
    print(f"PR: {pr_info.get('title', 'unknown')}")

    print("Fetching diff...")
    diff = get_pr_diff(pr_number)
    print(f"Diff: {len(diff)} chars")

    print("Fetching changed files...")
    changed_files = get_changed_files_list(pr_number)
    print(f"Changed files: {len(changed_files)}")

    print("Detecting product...")
    product_slug = detect_product_from_files(changed_files)
    print(f"Product: {product_slug or 'cross-product'}")

    print("Fetching comments and reviews...")
    comments = get_pr_comments(pr_number)
    print(f"Comments/reviews: {len(comments)}")

    print("Fetching linked issue...")
    linked_issue = get_linked_issue(pr_info)
    if linked_issue:
        print(f"Linked issue: #{linked_issue['number']} — {linked_issue['title']}")

    print("Reading project files...")
    project_files = read_project_files(product_slug)
    print(f"Project files: {list(project_files.keys())}")

    print("Reading source tree...")
    source_tree = read_source_tree(product_slug)
    print(f"Source tree: {len(source_tree)} chars")

    prompt = build_review_prompt(
        pr_info, diff, changed_files, comments,
        linked_issue, project_files, source_tree, product_slug,
    )
    print(f"Total prompt: {len(prompt)} chars (~{len(prompt)//4} tokens)")

    print(f"Calling {GEMINI_MODEL}...")
    client = genai.Client(api_key=api_key)
    response = client.models.generate_content(
        model=GEMINI_MODEL,
        contents=[prompt],
        config=types.GenerateContentConfig(
            temperature=0.2,
            max_output_tokens=8192,
        ),
    )

    response_text = response.text.strip()
    print(f"Response: {len(response_text)} chars")

    cleaned = response_text
    if cleaned.startswith("```"):
        lines = cleaned.split("\n")
        lines = [l for l in lines if not l.strip().startswith("```")]
        cleaned = "\n".join(lines)

    try:
        review_data = json.loads(cleaned)
    except json.JSONDecodeError as e:
        print(f"Warning: JSON parse failed: {e}", file=sys.stderr)
        review_data = {
            "summary": response_text[:2000],
            "verdict": "COMMENT",
            "findings": [],
        }

    verdict = review_data.get("verdict", "unknown")
    findings = review_data.get("findings", [])
    high = sum(1 for f in findings if f.get("severity") == "high")
    print(f"Verdict: {verdict}")
    print(f"Findings: {len(findings)} total, {high} high priority")

    post_review(pr_number, review_data, product_slug)
    print("Done.")


if __name__ == "__main__":
    main()
