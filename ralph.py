#!/usr/bin/env python3
"""
RALPH — Research, Arrange, Loop, Produce, Heal

An autonomous coding loop that orchestrates Claude Code CLI instances
to continuously improve the Shield Stack mono repo (22 products).

Each phase runs a single-shot Claude Code CLI instance with a focused
prompt and narrow scope. Status files in .ralph/ track state between
phases. Everything is serial, robust, and logged to stdout.

Usage:
    python3 ralph.py                        # Unlimited loop
    python3 ralph.py --max-loops 3          # Run 3 loops
    python3 ralph.py --start-phase work     # Resume from work phase
    python3 ralph.py --product hoashield    # Focus on one product
    python3 ralph.py --dry-run              # Preview without running Claude
    python3 ralph.py --status               # Print current state
    python3 ralph.py --reset                # Reset counters before starting
"""

import argparse
import atexit
import datetime
import json
import os
import re
import signal
import subprocess
import sys
import time
import traceback

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))
WORKTREES_DIR = os.path.join(PROJECT_DIR, ".claude", "worktrees")
RALPH_DIR = os.path.join(PROJECT_DIR, ".ralph")
STATUS_FILE = os.path.join(RALPH_DIR, "status.json")
METRICS_FILE = os.path.join(RALPH_DIR, "metrics.json")
BACKLOG_FILE = os.path.join(RALPH_DIR, "backlog.json")
RESEARCH_OUTPUT = os.path.join(RALPH_DIR, "research_output.json")
PROMPTS_DIR = os.path.join(RALPH_DIR, "prompts")
LOGS_DIR = os.path.join(RALPH_DIR, "logs")
WORKERS_DIR = os.path.join(RALPH_DIR, "workers")
PRODUCTS_FILE = os.path.join(PROJECT_DIR, "products.json")
MERGER_LOCK = os.path.join(RALPH_DIR, "merger.lock")

PHASES = ["research", "plan", "orchestrate", "work", "review", "verify", "monitor"]
IMPL_PHASES = ["orchestrate", "work", "review", "verify", "monitor"]

# Claude Code CLI settings — always Opus 4.6 max effort
CLAUDE_CMD = "claude"
CLAUDE_MODEL = "claude-opus-4-6"
CLAUDE_MAX_TURNS = 30
CLAUDE_BUDGET = None  # Using Claude Max subscription, no dollar budget

# Parallel workers: configurable 1-22
DEFAULT_WORKERS = 3
MAX_WORKERS = 22

# Research cadence: measured in PRs merged (not loops)
# With W workers per loop, research runs every RESEARCH_CADENCE_PRS merged PRs
RESEARCH_CADENCE_PRS = 30

# Error handling
MAX_CONSECUTIVE_ERRORS = 5
RATE_LIMIT_BACKOFF_SECONDS = 300  # 5 minutes
ERROR_BACKOFF_SECONDS = 30

# Automated code review settings
REVIEW_INITIAL_WAIT = 120
REVIEW_POLL_INTERVAL = 30
REVIEW_POLL_MAX_ATTEMPTS = 32
GITHUB_REPO = "bedwards/shield-stack"

# Bot reviewer config
REVIEWERS_FILE = os.path.join(RALPH_DIR, "reviewers.json")


def load_bot_reviewers():
    """Load active bot reviewers from .ralph/reviewers.json."""
    try:
        data = read_json(REVIEWERS_FILE)
        all_reviewers = data.get("reviewers", [])
        active = [r for r in all_reviewers if r.get("active", True)]
        inactive = [r["name"] for r in all_reviewers if not r.get("active", True)]
        if inactive:
            log(f"Inactive reviewers (skipped): {', '.join(inactive)}")
        return active
    except (FileNotFoundError, json.JSONDecodeError, KeyError) as e:
        log(f"Warning: could not load {REVIEWERS_FILE}: {e}", "WARN")
        return []


def get_all_bot_logins():
    """Get all bot logins (active and inactive) for filtering reviews."""
    try:
        data = read_json(REVIEWERS_FILE)
        return [r["login"] for r in data.get("reviewers", [])]
    except (FileNotFoundError, json.JSONDecodeError, KeyError):
        return []


def load_products():
    """Load the product manifest."""
    try:
        data = read_json(PRODUCTS_FILE)
        return data.get("products", [])
    except (FileNotFoundError, json.JSONDecodeError):
        log("Could not load products.json", "ERROR")
        return []


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def now_iso():
    return datetime.datetime.now(datetime.timezone.utc).isoformat()


def log(msg, level="INFO"):
    ts = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    line = f"[{ts}] [{level}] {msg}"
    print(line, flush=True)
    # Also append to log file
    try:
        os.makedirs(LOGS_DIR, exist_ok=True)
        date_str = datetime.datetime.now().strftime("%Y-%m-%d")
        with open(os.path.join(LOGS_DIR, f"{date_str}.log"), "a") as f:
            f.write(line + "\n")
    except OSError:
        pass


def log_phase(phase, msg):
    log(f"[{phase.upper()}] {msg}")


# ---------------------------------------------------------------------------
# Status file helpers
# ---------------------------------------------------------------------------

def read_json(path):
    try:
        with open(path, "r") as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return {}


def write_json(path, data):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w") as f:
        json.dump(data, f, indent=2, default=str)
        f.write("\n")


def update_status(**kwargs):
    status = read_json(STATUS_FILE)
    status.update(kwargs)
    status["updated_at"] = now_iso()
    status["pid"] = os.getpid()
    status["last_heartbeat"] = now_iso()
    write_json(STATUS_FILE, status)
    return status


def is_pid_alive(pid):
    """Return True if pid is a running process owned by us."""
    if not pid:
        return False
    try:
        os.kill(int(pid), 0)
        return True
    except (OSError, ValueError, TypeError):
        return False


def _mark_halted_on_exit():
    """atexit hook: if we exit without setting halted=True, set it now with reason."""
    try:
        status = read_json(STATUS_FILE)
        if status.get("pid") != os.getpid():
            return  # not our status file
        if status.get("halted"):
            return  # already cleanly halted
        status["halted"] = True
        status["halt_reason"] = status.get("halt_reason") or "process exited unexpectedly (atexit)"
        status["updated_at"] = now_iso()
        write_json(STATUS_FILE, status)
    except Exception:
        pass


def _signal_halt(signum, frame):
    """Signal handler: mark halted with reason and re-raise so default handler runs."""
    sig_name = signal.Signals(signum).name if hasattr(signal, "Signals") else str(signum)
    try:
        update_status(halted=True, halt_reason=f"received {sig_name}")
    except Exception:
        pass
    # Restore default handler and re-raise
    signal.signal(signum, signal.SIG_DFL)
    os.kill(os.getpid(), signum)


def update_metrics(**kwargs):
    metrics = read_json(METRICS_FILE)
    for k, v in kwargs.items():
        if k == "phases_completed" and isinstance(v, dict):
            if "phases_completed" not in metrics:
                metrics["phases_completed"] = {}
            metrics["phases_completed"].update(v)
        else:
            metrics[k] = v
    write_json(METRICS_FILE, metrics)
    return metrics


def increment_metric(key, amount=1):
    metrics = read_json(METRICS_FILE)
    metrics[key] = metrics.get(key, 0) + amount
    write_json(METRICS_FILE, metrics)


def increment_phase_metric(phase):
    metrics = read_json(METRICS_FILE)
    if "phases_completed" not in metrics:
        metrics["phases_completed"] = {}
    metrics["phases_completed"][phase] = metrics["phases_completed"].get(phase, 0) + 1
    write_json(METRICS_FILE, metrics)


def update_worker_state(worker_id, **kwargs):
    """Write worker state file for monitoring."""
    path = os.path.join(WORKERS_DIR, f"{worker_id}.json")
    state = read_json(path)
    state.update(kwargs)
    state["updated_at"] = now_iso()
    write_json(path, state)


# ---------------------------------------------------------------------------
# Claude Code CLI runner
# ---------------------------------------------------------------------------

CLAUDE_RUN_LOG_DIR = os.path.join(RALPH_DIR, "logs", "claude")


def _persist_claude_run(phase_hint, prompt, stdout, stderr, exit_code, duration_s):
    """Write a full record of every claude -p run to disk for postmortem.

    Files: .ralph/logs/claude/<ts>-<phase>-exit<code>.log
    Includes the FULL prompt and FULL stdout/stderr — never truncate on disk.
    """
    try:
        os.makedirs(CLAUDE_RUN_LOG_DIR, exist_ok=True)
        ts = datetime.datetime.utcnow().strftime("%Y%m%dT%H%M%SZ")
        path = os.path.join(
            CLAUDE_RUN_LOG_DIR,
            f"{ts}-{phase_hint or 'unknown'}-exit{exit_code}.log",
        )
        with open(path, "w") as f:
            f.write(f"=== claude -p run @ {ts} ===\n")
            f.write(f"phase_hint: {phase_hint}\n")
            f.write(f"exit_code: {exit_code}\n")
            f.write(f"duration_s: {duration_s:.2f}\n")
            f.write(f"prompt_chars: {len(prompt)}\n")
            f.write("=" * 60 + "\n")
            f.write("--- PROMPT ---\n")
            f.write(prompt)
            f.write("\n" + "=" * 60 + "\n")
            f.write("--- STDOUT ---\n")
            f.write(stdout or "(empty)")
            f.write("\n" + "=" * 60 + "\n")
            f.write("--- STDERR ---\n")
            f.write(stderr or "(empty)")
            f.write("\n")
        return path
    except Exception as e:
        log(f"Failed to persist claude run log: {e}", "WARN")
        return None


def _classify_claude_failure(stdout, stderr, exit_code):
    """Decide if a failure is retryable, rate-limited, or fatal.

    Returns one of: "rate_limit", "transient", "fatal".
    """
    combined = ((stdout or "") + " " + (stderr or "")).lower()
    rate_limit_markers = [
        "rate limit", "429", "overloaded", "too many requests",
        "quota exceeded", "capacity", "usage limit",
    ]
    if any(m in combined for m in rate_limit_markers):
        return "rate_limit"
    transient_markers = [
        "connection reset", "timeout", "timed out", "econnrefused",
        "network error", "temporary failure", "503", "502", "504",
        "eai_again", "socket hang up",
    ]
    if any(m in combined for m in transient_markers):
        return "transient"
    return "fatal"


def run_claude(prompt, max_turns=None, timeout=600, cwd=None,
               phase_hint=None, max_retries=3):
    """
    Run a single-shot Claude Code CLI instance.
    Always uses Claude Opus 4.6 with max effort.

    Workers communicate via FILES ON DISK, not stdout.
    Each phase tells Claude which files to read and write.
    After Claude exits, ralph.py reads those files to determine outcome.

    Diagnostics + resilience contract:
      - Every run's full prompt + stdout + stderr is persisted to
        .ralph/logs/claude/ — never truncated. No silent death.
      - On rate limit: exponential backoff (60s, 240s, 960s) up to max_retries.
      - On transient network failure: linear backoff (15s, 30s, 60s).
      - On fatal failure: log full stdout + stderr (truncated tail in console,
        full record on disk), return False with exit code.
      - The constitution is prepended to the prompt by load_prompt_template,
        not here — phases that build raw prompts must call build_prompt() to
        get constitutional framing.

    Returns (success: bool, exit_code: int)
    """
    cmd = [CLAUDE_CMD, "-p", prompt]
    cmd.extend(["--model", CLAUDE_MODEL])
    cmd.extend(["--effort", "max"])
    cmd.extend(["--dangerously-skip-permissions"])
    cmd.extend(["--max-turns", str(max_turns or CLAUDE_MAX_TURNS)])

    log(f"Running: claude -p '<{len(prompt)} chars>' --model {CLAUDE_MODEL} "
        f"--effort max --max-turns {max_turns or CLAUDE_MAX_TURNS} "
        f"phase={phase_hint or '?'}")

    attempt = 0
    while True:
        attempt += 1
        start_t = time.time()
        try:
            result = subprocess.run(
                cmd,
                cwd=cwd or PROJECT_DIR,
                capture_output=True,
                text=True,
                timeout=timeout,
            )
        except subprocess.TimeoutExpired as e:
            duration = time.time() - start_t
            stdout = e.stdout.decode() if isinstance(e.stdout, bytes) else (e.stdout or "")
            stderr = e.stderr.decode() if isinstance(e.stderr, bytes) else (e.stderr or "")
            log_path = _persist_claude_run(phase_hint, prompt, stdout, stderr, -1, duration)
            log(f"Claude timed out after {timeout}s (attempt {attempt}). "
                f"Full log: {log_path}", "ERROR")
            if attempt < max_retries:
                backoff = 30 * attempt
                log(f"Retrying after {backoff}s (timeout/transient)", "WARN")
                time.sleep(backoff)
                continue
            return False, -1
        except FileNotFoundError:
            log(f"Claude CLI not found at {CLAUDE_CMD}. Halting.", "FATAL")
            update_status(halted=True, halt_reason="claude CLI missing")
            sys.exit(1)

        duration = time.time() - start_t
        stdout = result.stdout or ""
        stderr = result.stderr or ""
        log_path = _persist_claude_run(
            phase_hint, prompt, stdout, stderr, result.returncode, duration
        )

        if result.returncode == 0:
            log(f"Claude OK in {duration:.1f}s (attempt {attempt}). Log: {log_path}")
            return True, 0

        # Failure path — log meaningful diagnostics from BOTH streams
        kind = _classify_claude_failure(stdout, stderr, result.returncode)
        log(f"Claude exited code={result.returncode} kind={kind} "
            f"duration={duration:.1f}s attempt={attempt} log={log_path}", "ERROR")

        # Tail of stdout (where claude -p actually writes errors)
        if stdout.strip():
            tail = stdout.strip().split("\n")[-15:]
            for line in tail:
                log(f"  stdout: {line}", "ERROR")
        # Tail of stderr
        if stderr.strip():
            tail = stderr.strip().split("\n")[-15:]
            for line in tail:
                log(f"  stderr: {line}", "ERROR")

        if kind == "rate_limit":
            update_metrics(last_rate_limit_at=now_iso())
            if attempt < max_retries:
                backoff = 60 * (4 ** (attempt - 1))  # 60s, 240s, 960s
                log(f"Rate limited — backing off {backoff}s before retry", "WARN")
                update_metrics(backoff_until=now_iso())
                time.sleep(backoff)
                continue
            log("Rate limit retries exhausted", "ERROR")
            return False, result.returncode

        if kind == "transient" and attempt < max_retries:
            backoff = 15 * attempt
            log(f"Transient failure — retrying in {backoff}s", "WARN")
            time.sleep(backoff)
            continue

        # Fatal — record last_error so the loop and humans can see it
        last_err = (stdout.strip().split("\n")[-1] if stdout.strip()
                    else (stderr.strip().split("\n")[-1] if stderr.strip()
                          else f"exit {result.returncode}"))
        update_status(last_error=f"claude {phase_hint or ''}: {last_err}"[:500])
        return False, result.returncode


# ---------------------------------------------------------------------------
# Prompt builders
# ---------------------------------------------------------------------------

_CONSTITUTION_CACHE = None


def load_constitution():
    """Load the immutable constitutional preamble. Cached after first read."""
    global _CONSTITUTION_CACHE
    if _CONSTITUTION_CACHE is None:
        path = os.path.join(PROMPTS_DIR, "_constitution.md")
        try:
            with open(path, "r") as f:
                _CONSTITUTION_CACHE = f.read()
        except FileNotFoundError:
            log("WARNING: _constitution.md missing — phases will run without "
                "constitutional framing. This violates the durability rule.", "WARN")
            _CONSTITUTION_CACHE = ""
    return _CONSTITUTION_CACHE


def load_prompt_template(name):
    """Load a phase prompt template with the constitution prepended.

    The constitution is immutable framing that overrides any conflicting
    phase-specific instructions: mission (make money), equal-attention rule,
    reality rule, durability rule, root-cause rule.
    """
    path = os.path.join(PROMPTS_DIR, f"{name}.md")
    with open(path, "r") as f:
        body = f.read()
    constitution = load_constitution()
    if constitution:
        return constitution + "\n\n---\n\n# Phase: " + name + "\n\n" + body
    return body


def pick_underserved_product():
    """Pick the product with the fewest merged PRs / least development."""
    products = load_products()
    metrics = read_json(METRICS_FILE)
    per_product = metrics.get("per_product", {})

    # Score each product: lower = more underserved
    scored = []
    for p in products:
        slug = p["slug"]
        prs_merged = per_product.get(slug, {}).get("prs_merged", 0)
        scored.append((prs_merged, slug))

    scored.sort()
    return scored[0][1] if scored else None


def build_research_prompt(product_slug=None):
    template = load_prompt_template("researcher")
    status = read_json(STATUS_FILE)
    metrics = read_json(METRICS_FILE)

    # If no product specified, pick the most underserved one
    if not product_slug:
        product_slug = pick_underserved_product()

    context = (
        f"\n\n## Current State\n"
        f"- Loop count: {metrics.get('total_loops', 0)}\n"
        f"- PRs merged so far: {metrics.get('total_prs_merged', 0)}\n"
        f"- Last phase: {status.get('last_phase_completed', 'none')}\n"
        f"- **Focus product this cycle: {product_slug}**\n"
        f"- Research this ONE product deeply. Read its code, docs, and issues. "
        f"Search the web for its specific APIs, competitors, and user needs.\n"
    )
    return template + context


def build_plan_prompt(product_slug=None):
    template = load_prompt_template("planner")
    if product_slug:
        template += f"\n\n## Focus Product\nFocus planning on: {product_slug}\n"
    return template


def build_orchestrate_prompt():
    template = load_prompt_template("orchestrator")
    metrics = read_json(METRICS_FILE)
    return (
        f"{template}\n\n"
        f"## Metrics\n"
        f"- Total PRs merged: {metrics.get('total_prs_merged', 0)}\n"
        f"- Total issues created: {metrics.get('total_issues_created', 0)}\n"
    )


def build_work_prompt(issue_number, issue_title, branch_name, product_slug):
    template = load_prompt_template("worker")
    return (
        template
        .replace("{issue_number}", str(issue_number))
        .replace("{issue_title}", issue_title)
        .replace("{branch_name}", branch_name)
        .replace("{product_slug}", product_slug)
    )


def build_review_prompt(pr_number, branch_name, product_slug):
    template = load_prompt_template("reviewer")
    return (
        template
        .replace("{pr_number}", str(pr_number))
        .replace("{branch_name}", branch_name)
        .replace("{product_slug}", product_slug)
    )


def build_verify_prompt(product_slug, deploy_url=None):
    template = load_prompt_template("verifier")
    return (
        template
        .replace("{product_slug}", product_slug or "unknown")
        .replace("{deploy_url}", deploy_url or "")
    )


def build_monitor_prompt():
    return load_prompt_template("monitor")


# ---------------------------------------------------------------------------
# Git helpers
# ---------------------------------------------------------------------------

def git_run(*args, check=True):
    result = subprocess.run(
        ["git"] + list(args),
        cwd=PROJECT_DIR,
        capture_output=True,
        text=True,
    )
    if check and result.returncode != 0:
        log(f"git {' '.join(args)} failed: {result.stderr}", "ERROR")
    return result.stdout.strip(), result.returncode


def check_bot_review_status(pr_number, bot):
    """Check if a bot has posted on a PR.
    Returns: 'reviewed', 'quota_exhausted', or 'pending'."""
    if bot["type"] == "action":
        try:
            result = subprocess.run(
                ["gh", "pr", "checks", str(pr_number), "--repo", GITHUB_REPO,
                 "--json", "name,state,completedAt,link,workflow"],
                cwd=PROJECT_DIR, capture_output=True, text=True, timeout=30,
            )
            if result.returncode == 0:
                checks = json.loads(result.stdout)
                for chk in checks:
                    if bot.get("check_name", "").lower() in chk.get("name", "").lower():
                        state = chk.get("state", "").upper()
                        if state in ("SUCCESS", "FAILURE", "COMPLETED", "NEUTRAL"):
                            link = chk.get("link", "")
                            if link:
                                bot["_last_run_url"] = link
                            return "reviewed"
                        elif state in ("PENDING", "IN_PROGRESS", "QUEUED"):
                            return "pending"
        except (subprocess.TimeoutExpired, json.JSONDecodeError):
            pass
        return "pending"

    # Review-type bots
    try:
        result = subprocess.run(
            ["gh", "api", f"repos/{GITHUB_REPO}/pulls/{pr_number}/reviews",
             "--jq", f'[.[] | select(.user.login == "{bot["login"]}")] | .[0].body // ""'],
            cwd=PROJECT_DIR, capture_output=True, text=True, timeout=30,
        )
        review_body = result.stdout.strip()

        if not review_body:
            result = subprocess.run(
                ["gh", "api", f"repos/{GITHUB_REPO}/issues/{pr_number}/comments",
                 "--jq", f'[.[] | select(.user.login == "{bot["login"]}")] | .[0].body // ""'],
                cwd=PROJECT_DIR, capture_output=True, text=True, timeout=30,
            )
            review_body = result.stdout.strip()

        if not review_body:
            return "pending"

        body_lower = review_body.lower()
        for phrase in bot.get("quota_phrases", []):
            if phrase.lower() in body_lower:
                return "quota_exhausted"
        return "reviewed"

    except (subprocess.TimeoutExpired, ValueError):
        return "pending"


def wait_for_bot_reviews(pr_number):
    """Wait for all bot reviewers to post on a PR."""
    active_reviewers = load_bot_reviewers()
    bot_names = [b["name"] for b in active_reviewers]
    log_phase("review", f"Waiting for bot reviews on PR #{pr_number}: {', '.join(bot_names)}")

    time.sleep(REVIEW_INITIAL_WAIT)

    results = {b["name"]: "pending" for b in active_reviewers}

    for attempt in range(1, REVIEW_POLL_MAX_ATTEMPTS + 1):
        all_done = True
        for bot in active_reviewers:
            if results[bot["name"]] != "pending":
                continue
            status = check_bot_review_status(pr_number, bot)
            if status != "pending":
                results[bot["name"]] = status
                log_phase("review", f"  {bot['name']}: {status}")
            else:
                all_done = False

        if all_done:
            log_phase("review", "All bot reviews resolved")
            break

        pending = [name for name, s in results.items() if s == "pending"]
        log_phase("review", f"Poll {attempt}/{REVIEW_POLL_MAX_ATTEMPTS} — waiting on: {', '.join(pending)}")
        time.sleep(REVIEW_POLL_INTERVAL)

    for name in results:
        if results[name] == "pending":
            results[name] = "timeout"
            log_phase("review", f"  {name}: timed out")

    return results


def verify_review_posted(pr_number):
    """Verify that a non-bot review was actually posted on the PR."""
    bot_logins = get_all_bot_logins()
    jq_conditions = " and ".join(f'.user.login != "{login}"' for login in bot_logins)
    jq_filter = f'[.[] | select({jq_conditions})] | length'
    try:
        result = subprocess.run(
            ["gh", "api", f"repos/{GITHUB_REPO}/pulls/{pr_number}/reviews",
             "--jq", jq_filter],
            cwd=PROJECT_DIR, capture_output=True, text=True, timeout=30,
        )
        count = int(result.stdout.strip() or "0")
        return count > 0
    except (subprocess.TimeoutExpired, ValueError):
        return False


def get_open_prs():
    """Return list of open PR numbers for this repo."""
    try:
        result = subprocess.run(
            ["gh", "pr", "list", "--repo", GITHUB_REPO, "--state", "open",
             "--json", "number,title", "--author", "@me"],
            cwd=PROJECT_DIR, capture_output=True, text=True, timeout=30,
        )
        return json.loads(result.stdout) if result.returncode == 0 else []
    except (subprocess.TimeoutExpired, json.JSONDecodeError):
        return []


def ensure_main():
    git_run("checkout", "main")
    git_run("pull", "origin", "main")
    log("On main branch, pulled latest")


def create_branch(name):
    ensure_main()
    stdout, rc = git_run("checkout", "-b", name)
    if rc != 0:
        git_run("checkout", name)
    log(f"On branch: {name}")


def branch_name_for_issue(issue_number, issue_title, product_slug):
    slug = issue_title.lower()
    slug = "".join(c if c.isalnum() or c == " " else "" for c in slug)
    slug = "-".join(slug.split()[:5])
    return f"{product_slug}/issue-{issue_number}-{slug}"


# ---------------------------------------------------------------------------
# Worktree helpers — isolate worker changes from main working directory
# ---------------------------------------------------------------------------

def worktree_path_for_issue(issue_number):
    """Return the worktree directory path for a given issue number."""
    return os.path.join(WORKTREES_DIR, f"issue-{issue_number}")


def create_worktree(branch_name, issue_number):
    """Create an isolated git worktree for a worker.

    Creates a new branch and worktree in .claude/worktrees/issue-{N}.
    If the branch already exists, checks it out in the worktree.
    Returns the absolute path to the worktree directory.
    """
    wt_path = worktree_path_for_issue(issue_number)

    # Clean up stale worktree if directory exists but git doesn't know about it
    if os.path.isdir(wt_path):
        try:
            git_run("worktree", "remove", "--force", wt_path)
        except Exception:
            import shutil
            shutil.rmtree(wt_path, ignore_errors=True)

    os.makedirs(WORKTREES_DIR, exist_ok=True)

    # Try creating worktree with new branch
    _, rc = git_run("worktree", "add", wt_path, "-b", branch_name, "main")
    if rc != 0:
        # Branch already exists — check it out in the worktree
        _, rc2 = git_run("worktree", "add", wt_path, branch_name)
        if rc2 != 0:
            log(f"Failed to create worktree for {branch_name} at {wt_path}", "ERROR")
            return None

    log(f"Created worktree at {wt_path} on branch {branch_name}")
    return wt_path


def remove_worktree(issue_number):
    """Remove a worktree after the worker finishes.

    Only removes if the worktree has no uncommitted changes.
    """
    wt_path = worktree_path_for_issue(issue_number)
    if not os.path.isdir(wt_path):
        return

    # Check for uncommitted changes
    try:
        result = subprocess.run(
            ["git", "status", "--porcelain"],
            cwd=wt_path, capture_output=True, text=True, timeout=10,
        )
        if result.stdout.strip():
            log(f"Worktree {wt_path} has uncommitted changes — NOT removing", "WARN")
            return
    except Exception:
        pass

    try:
        # Use --force because worker branches are typically not yet merged to main
        git_run("worktree", "remove", "--force", wt_path)
        log(f"Removed worktree at {wt_path}")
    except Exception as e:
        log(f"Failed to remove worktree {wt_path}: {e}", "WARN")


# ---------------------------------------------------------------------------
# Phase implementations
# ---------------------------------------------------------------------------

def phase_research(dry_run=False, product_slug=None):
    """Research phase: Claude writes findings to .ralph/research_output.json
    and may commit docs (learnings, CLAUDE.md updates) directly to main."""
    log_phase("research", "Starting research phase")
    update_status(phase="research")

    # Snapshot research_output.json before Claude runs
    before = read_json(RESEARCH_OUTPUT)

    prompt = build_research_prompt(product_slug)

    if dry_run:
        log_phase("research", f"[DRY RUN] Would run researcher ({len(prompt)} chars)")
        return True

    success, _ = run_claude(prompt, max_turns=20, timeout=1200, phase_hint="research")

    if not success:
        log_phase("research", "Research phase completed with non-zero exit (may have partial results)")
        # Don't return False — research may have written partial findings to disk
        # before timing out. Continue to plan phase.

    # Check what Claude wrote to disk
    after = read_json(RESEARCH_OUTPUT)
    if after != before:
        findings_count = len(after.get("findings", []))
        log_phase("research", f"Research produced {findings_count} findings in research_output.json")
    else:
        log_phase("research", "Research completed (check git log for committed docs)")

    increment_phase_metric("research")
    update_status(last_phase_completed="research")
    return True


def phase_plan(dry_run=False, product_slug=None):
    """Plan phase: Claude creates GitHub issues and may update CLAUDE.md/docs.
    Docs are committed directly to main (no PR needed)."""
    log_phase("plan", "Starting planning phase")
    update_status(phase="plan")

    prompt = build_plan_prompt(product_slug)

    if dry_run:
        log_phase("plan", f"[DRY RUN] Would run planner ({len(prompt)} chars)")
        return True

    # Count issues before
    issues_before = 0
    try:
        result = subprocess.run(
            ["gh", "issue", "list", "--repo", GITHUB_REPO, "--state", "open",
             "--json", "number", "--limit", "500"],
            cwd=PROJECT_DIR, capture_output=True, text=True, timeout=30,
        )
        issues_before = len(json.loads(result.stdout))
    except Exception:
        pass

    success, _ = run_claude(prompt, max_turns=40, timeout=900, phase_hint="plan")

    if not success:
        log_phase("plan", "Planning phase failed")
        return False

    # Check how many issues exist now
    issues_after = 0
    try:
        result = subprocess.run(
            ["gh", "issue", "list", "--repo", GITHUB_REPO, "--state", "open",
             "--json", "number", "--limit", "500"],
            cwd=PROJECT_DIR, capture_output=True, text=True, timeout=30,
        )
        issues_after = len(json.loads(result.stdout))
    except Exception:
        pass

    new_issues = issues_after - issues_before
    if new_issues > 0:
        log_phase("plan", f"Planner created {new_issues} new issues")
        increment_metric("total_issues_created", new_issues)
    else:
        log_phase("plan", "Planning completed (check gh issues and git log)")

    increment_phase_metric("plan")
    update_status(last_phase_completed="plan")
    return True


def phase_orchestrate(dry_run=False):
    """Orchestrate phase: Claude reads issues, updates .ralph/status.json
    with selected issue, and updates .ralph/backlog.json with priorities."""
    log_phase("orchestrate", "Starting orchestration phase")
    update_status(phase="orchestrate")

    # Guard: refuse to pick new work if there are open PRs
    open_prs = get_open_prs()
    if open_prs:
        pr_nums = [f"#{p['number']}" for p in open_prs]
        log_phase("orchestrate",
            f"BLOCKED: {len(open_prs)} open PR(s) ({', '.join(pr_nums)}). "
            f"Finish existing work first.")
        oldest_pr = min(open_prs, key=lambda p: p["number"])
        update_status(current_pr=oldest_pr["number"])
        increment_phase_metric("orchestrate")
        update_status(last_phase_completed="orchestrate")
        return True

    prompt = build_orchestrate_prompt()

    if dry_run:
        log_phase("orchestrate", "[DRY RUN] Would run orchestrator")
        return True

    success, _ = run_claude(prompt, max_turns=15, timeout=600, phase_hint="orchestrate")

    if not success:
        log_phase("orchestrate", "Orchestration failed")
        return False

    # Claude should have updated .ralph/status.json with current_issue
    status = read_json(STATUS_FILE)
    selected = status.get("current_issue")
    if selected:
        issue_num = selected.get("number", "?")
        product = status.get("current_product", "unknown")
        log_phase("orchestrate", f"Selected #{issue_num} [{product}]")
    else:
        log_phase("orchestrate", "No issue selected (check status.json)")

    increment_phase_metric("orchestrate")
    update_status(last_phase_completed="orchestrate")
    return True


def phase_work(dry_run=False):
    """Work phase: Claude implements in an isolated worktree, commits, pushes, creates PR.
    ralph.py detects the PR by checking gh after Claude exits."""
    log_phase("work", "Starting work phase")
    update_status(phase="work")

    # Guard: refuse to create new work if there are open PRs
    open_prs = get_open_prs()
    if open_prs:
        pr_nums = [f"#{p['number']}" for p in open_prs]
        log_phase("work", f"BLOCKED: {len(open_prs)} open PR(s). Review first.")
        increment_phase_metric("work")
        update_status(last_phase_completed="work")
        return True

    status = read_json(STATUS_FILE)
    issue = status.get("current_issue")
    branch = status.get("current_branch")
    product = status.get("current_product", "unknown")

    if not issue:
        log_phase("work", "No issue selected, skipping")
        return True

    issue_number = issue["number"]
    issue_title = issue["title"]

    if not branch:
        slug = re.sub(r'[^a-z0-9]+', '-', issue_title.lower())[:50].strip('-')
        branch = f"{product}/issue-{issue_number}-{slug}"
        update_status(current_branch=branch)

    log_phase("work", f"Working on #{issue_number} [{product}]: {issue_title}")
    log_phase("work", f"Branch: {branch}")

    # Create isolated worktree instead of branching in main tree
    wt_path = create_worktree(branch, issue_number)
    if not wt_path:
        log_phase("work", f"Failed to create worktree for #{issue_number}")
        increment_phase_metric("work")
        update_status(last_phase_completed="work")
        return False

    prompt = build_work_prompt(issue_number, issue_title, branch, product)

    if dry_run:
        log_phase("work", f"[DRY RUN] Would implement #{issue_number}")
        remove_worktree(issue_number)
        return True

    success, _ = run_claude(
        prompt,
        max_turns=CLAUDE_MAX_TURNS,
        timeout=900,
        cwd=wt_path,
        phase_hint=f"work-{issue_number}",
    )

    # Detect PR from git state (Claude creates it, we find it)
    pr_number = None
    try:
        result = subprocess.run(
            ["gh", "pr", "list", "--head", branch, "--json", "number",
             "--repo", GITHUB_REPO],
            cwd=PROJECT_DIR, capture_output=True, text=True, timeout=15,
        )
        prs = json.loads(result.stdout)
        if prs:
            pr_number = prs[0]["number"]
    except (subprocess.TimeoutExpired, json.JSONDecodeError, IndexError, KeyError):
        pass

    if pr_number:
        log_phase("work", f"PR #{pr_number} created on branch {branch}")
        update_status(current_pr=pr_number)
        increment_metric("total_prs_created")
    elif success:
        log_phase("work", "Worker finished but no PR found — check branch")
    else:
        log_phase("work", "Work phase failed")

    # Clean up worktree (only if no uncommitted changes)
    remove_worktree(issue_number)

    increment_phase_metric("work")
    update_status(last_phase_completed="work")
    return success or pr_number is not None


def phase_review(dry_run=False):
    log_phase("review", "Starting review phase")
    update_status(phase="review")

    status = read_json(STATUS_FILE)
    pr_number = status.get("current_pr")
    branch = status.get("current_branch")
    product = status.get("current_product", "unknown")

    if not pr_number:
        log_phase("review", "No PR to review, skipping")
        return True

    log_phase("review", f"Reviewing PR #{pr_number} [{product}]")

    if dry_run:
        log_phase("review", f"[DRY RUN] Would review PR #{pr_number}")
        return True

    # Wait for bot reviews
    bot_results = wait_for_bot_reviews(pr_number)

    # Build review prompt with bot status
    prompt = build_review_prompt(str(pr_number), branch or "unknown", product)

    status_lines = []
    claude_run_url = None
    for bot in load_bot_reviewers():
        bot_name = bot["name"]
        bot_status = bot_results.get(bot_name, "timeout")
        if bot_status == "reviewed":
            status_lines.append(f"- **{bot_name}**: HAS posted its review. Read and address findings.")
            if bot.get("type") == "action" and bot.get("_last_run_url"):
                claude_run_url = bot["_last_run_url"]
                status_lines.append(f"  - Action run: {claude_run_url}")
        elif bot_status == "quota_exhausted":
            status_lines.append(f"- **{bot_name}**: Quota exhausted. Skip.")
        else:
            status_lines.append(f"- **{bot_name}**: Did not post within timeout. Proceed without it.")

    prompt += f"\n\n## Automated Review Status\n" + "\n".join(status_lines) + "\n"

    if claude_run_url:
        prompt += (
            f"\n### Reading Claude Action output\n"
            f"1. `gh pr checks {pr_number}` — check status\n"
            f"2. `gh api repos/{GITHUB_REPO}/pulls/{pr_number}/comments` — inline comments\n"
            f"3. `gh api repos/{GITHUB_REPO}/pulls/{pr_number}/reviews` — summary reviews\n"
        )

    bots_with_reviews = [name for name, s in bot_results.items() if s == "reviewed"]
    if bots_with_reviews:
        prompt += f"\nRead and address findings from: {', '.join(bots_with_reviews)}\n"

    success, _ = run_claude(prompt, max_turns=40, timeout=900, phase_hint="review")

    # Determine what happened by checking PR state (not stdout)
    try:
        result = subprocess.run(
            ["gh", "pr", "view", str(pr_number), "--repo", GITHUB_REPO,
             "--json", "state,merged,reviewDecision"],
            cwd=PROJECT_DIR, capture_output=True, text=True, timeout=15,
        )
        pr_state = json.loads(result.stdout)
        merged = pr_state.get("merged", False)
        state = pr_state.get("state", "OPEN")
        decision = pr_state.get("reviewDecision", "")

        if merged:
            log_phase("review", f"PR #{pr_number} was MERGED")
            increment_metric("total_prs_merged")

            # Track per-product metrics
            metrics = read_json(METRICS_FILE)
            per_product = metrics.get("per_product", {})
            prod_metrics = per_product.get(product, {"prs_merged": 0})
            prod_metrics["prs_merged"] = prod_metrics.get("prs_merged", 0) + 1
            per_product[product] = prod_metrics
            update_metrics(per_product=per_product)

            update_status(current_issue=None, current_branch=None,
                         current_pr=None, current_product=None)

        elif decision == "CHANGES_REQUESTED":
            log_phase("review", f"PR #{pr_number}: changes requested")
            # Leave PR open for next work phase

        elif state == "OPEN":
            log_phase("review", f"PR #{pr_number} still open (checks may be pending)")

        else:
            log_phase("review", f"PR #{pr_number} state: {state}")

    except (subprocess.TimeoutExpired, json.JSONDecodeError, KeyError) as e:
        log_phase("review", f"Could not check PR state: {e}")

    increment_phase_metric("review")
    update_status(last_phase_completed="review")
    return True


def phase_verify(dry_run=False):
    """Phase: Run Playwright E2E tests against the deployed product."""
    log_phase("verify", "Starting verification phase")
    update_status(phase="verify")

    status = read_json(STATUS_FILE)
    product = status.get("current_product")

    if not product:
        log_phase("verify", "No product to verify, skipping")
        increment_phase_metric("verify")
        update_status(last_phase_completed="verify")
        return True

    # Check if product has a playwright config
    playwright_config = os.path.join(PROJECT_DIR, product, "playwright.config.ts")
    if not os.path.exists(playwright_config):
        playwright_config_js = os.path.join(PROJECT_DIR, product, "playwright.config.js")
        if not os.path.exists(playwright_config_js):
            log_phase("verify", f"No playwright config in {product}/, skipping")
            increment_phase_metric("verify")
            update_status(last_phase_completed="verify")
            return True

    log_phase("verify", f"Running Playwright E2E tests for {product}")

    # Try to detect deploy URL from product config or Vercel/Cloudflare preview
    deploy_url = detect_deploy_url(product)

    prompt = build_verify_prompt(product, deploy_url)

    if dry_run:
        log_phase("verify", f"[DRY RUN] Would run E2E verification for {product}")
        increment_phase_metric("verify")
        update_status(last_phase_completed="verify")
        return True

    success, _ = run_claude(prompt, max_turns=20, timeout=600, phase_hint="verify")

    if not success:
        log_phase("verify", "Verification phase failed (Claude exited non-zero)")
        # Don't block the loop — log it and continue
    else:
        log_phase("verify", "Verification phase completed (check git log for test results/commits)")

    increment_phase_metric("verify")
    update_status(last_phase_completed="verify")
    return True


def detect_deploy_url(product_slug):
    """Try to detect the preview/production URL for a deployed product."""
    # Check for Vercel preview from latest deployment
    try:
        result = subprocess.run(
            ["gh", "api", f"repos/{GITHUB_REPO}/deployments",
             "--jq", f'[.[] | select(.environment | test("{product_slug}"))] | .[0].payload.web_url // ""'],
            cwd=PROJECT_DIR, capture_output=True, text=True, timeout=15,
        )
        url = result.stdout.strip()
        if url:
            return url
    except (subprocess.TimeoutExpired, ValueError):
        pass

    # Check for wrangler.toml or vercel.json in product dir
    product_dir = os.path.join(PROJECT_DIR, product_slug)
    for config_name, url_key in [
        ("wrangler.toml", None),
        (".env.local", None),
    ]:
        config_path = os.path.join(product_dir, config_name)
        if os.path.exists(config_path):
            # The verifier worker will detect the URL from these configs
            pass

    return None


def phase_monitor(dry_run=False):
    log_phase("monitor", "Starting monitoring phase")
    update_status(phase="monitor")

    ensure_main()

    prompt = build_monitor_prompt()

    if dry_run:
        log_phase("monitor", "[DRY RUN] Would run health checks")
        return True

    success, _ = run_claude(prompt, max_turns=10, timeout=300, phase_hint="monitor")

    if not success:
        log_phase("monitor", "Monitor phase failed (Claude exited non-zero)")
    else:
        log_phase("monitor", "Monitor completed (check status.json for halt flags)")

    # Check if Claude set the halt flag
    post_status = read_json(STATUS_FILE)
    if post_status.get("halted"):
        log_phase("monitor", f"HALTED: {post_status.get('halt_reason', 'unknown')}")

    increment_phase_metric("monitor")
    update_status(last_phase_completed="monitor")
    return True


# ---------------------------------------------------------------------------
# Lock-based merger
# ---------------------------------------------------------------------------

def acquire_merger_lock():
    """Try to acquire the merger lock. Returns True if acquired."""
    if os.path.exists(MERGER_LOCK):
        # Check if the PID in the lock is still alive
        try:
            with open(MERGER_LOCK) as f:
                pid = int(f.read().strip())
            os.kill(pid, 0)  # Signal 0 = check if alive
            return False  # Lock held by alive process
        except (ValueError, OSError):
            # PID invalid or process dead — stale lock
            log("Removing stale merger lock", "WARN")
            os.remove(MERGER_LOCK)

    # Write our PID
    with open(MERGER_LOCK, "w") as f:
        f.write(str(os.getpid()))
    return True


def release_merger_lock():
    """Release the merger lock."""
    try:
        os.remove(MERGER_LOCK)
    except FileNotFoundError:
        pass


def build_merger_prompt():
    """Build the prompt for the merger worker."""
    return load_prompt_template("merger")


def run_merger():
    """Run the merger worker — handles all open PRs until none remain."""
    if not acquire_merger_lock():
        log("Merger already running (lock held), skipping")
        return

    try:
        log_phase("merger", "Starting merger — handling all open PRs")
        prompt = build_merger_prompt()
        success, _ = run_claude(prompt, max_turns=50, timeout=1200, phase_hint="merger")

        if success:
            log_phase("merger", "Merger completed")
            # Count merged PRs
            status = read_json(STATUS_FILE)
            merged = status.get("prs_merged", [])
            if merged:
                increment_metric("total_prs_merged", len(merged))
                log_phase("merger", f"Merged {len(merged)} PRs: {merged}")
        else:
            log_phase("merger", "Merger failed")
            increment_metric("total_errors")
    finally:
        release_merger_lock()


# ---------------------------------------------------------------------------
# Parallel worker launcher
# ---------------------------------------------------------------------------

def rank_products_by_underservice():
    """Return products ranked from most-underserved to most-served.

    Underservice score = (PRs merged, deployed?, last activity).
    Lower score = more underserved = higher priority for the equal-attention slot.

    Returns list of dicts: [{slug, prs_merged, deployed, score}, ...]
    """
    products = load_products()
    metrics = read_json(METRICS_FILE)
    per_product = metrics.get("per_product", {})
    ranked = []
    for p in products:
        slug = p["slug"]
        prs_merged = per_product.get(slug, {}).get("prs_merged", 0)
        deployed = bool(p.get("production_url"))
        # Lower score = more underserved. Deployed adds a strong constant.
        score = prs_merged + (1000 if deployed else 0)
        ranked.append({
            "slug": slug,
            "prs_merged": prs_merged,
            "deployed": deployed,
            "score": score,
        })
    ranked.sort(key=lambda r: r["score"])
    return ranked


def select_issues(num_workers, dry_run=False):
    """Use the orchestrator to select N issues for parallel work.

    Equal-attention enforcement (constitutional, non-negotiable):
      The most-underserved product is RESERVED a worker slot every cycle.
      The orchestrator chooses from issues belonging to that product for
      the reserved slot. The remaining N-1 slots follow normal priority.
      This guarantees laggards get lifted up every cycle without ever
      delaying or regressing the leaders.

    Returns list of {number, title, product, branch} dicts.
    """
    log_phase("orchestrate", f"Selecting {num_workers} issues for parallel work")
    update_status(phase="orchestrate")

    if dry_run:
        log_phase("orchestrate", f"[DRY RUN] Would select {num_workers} issues")
        return []

    # Compute the underservice ranking and pin the most-underserved product
    # for the equal-attention reserved slot.
    ranked = rank_products_by_underservice()
    underserved = ranked[0] if ranked else None
    underserved_slug = underserved["slug"] if underserved else None
    if underserved_slug:
        log_phase("orchestrate",
                  f"Equal-attention reserved slot: {underserved_slug} "
                  f"(prs_merged={underserved['prs_merged']}, "
                  f"deployed={underserved['deployed']})")

    # Build an orchestrator prompt that selects N issues with the reserved slot
    template = load_prompt_template("orchestrator")
    metrics = read_json(METRICS_FILE)
    ranking_summary = "\n".join(
        f"  {i+1}. {r['slug']}: prs={r['prs_merged']}, deployed={r['deployed']}"
        for i, r in enumerate(ranked[:10])
    )
    prompt = (
        f"{template}\n\n"
        f"## Special Instructions — Equal-Attention Constitutional Rule\n"
        f"Select EXACTLY {num_workers} issues for parallel work, written as a "
        f"`selected_issues` array in `.ralph/status.json`.\n\n"
        f"### Reserved slot (NON-NEGOTIABLE)\n"
        f"Slot 1 of {num_workers} is RESERVED for the most-underserved product: "
        f"**{underserved_slug or '(none)'}**. Pick the highest-priority unblocked "
        f"issue belonging to {underserved_slug} for this slot. If no open issue "
        f"exists for {underserved_slug}, you MUST first CREATE one (e.g., "
        f"'[{underserved_slug}] First production deploy' or the next logical "
        f"step toward shipping it) and then select it. Do NOT skip the reserved "
        f"slot. Lifting the laggard is the point.\n\n"
        f"### Remaining {max(0, num_workers - 1)} slots\n"
        f"Pick highest-priority unblocked issues from any product, weighted toward "
        f"revenue-generating work. NEVER pick issues that delete features, "
        f"regress functionality, or simplify leading products to 'even things "
        f"out' — leveling is achieved by addition, never subtraction.\n\n"
        f"### Underservice ranking (most underserved first)\n{ranking_summary}\n\n"
        f"Each entry in selected_issues needs: number, title, product, reason. "
        f"The reason for slot 1 must explicitly mention the equal-attention rule.\n\n"
        f"## Metrics\n"
        f"- Total PRs merged: {metrics.get('total_prs_merged', 0)}\n"
        f"- Total issues created: {metrics.get('total_issues_created', 0)}\n"
    )

    success, _ = run_claude(prompt, max_turns=15, timeout=600,
                            phase_hint="orchestrate")

    if not success:
        log_phase("orchestrate", "Orchestration failed")
        return []

    # Read what Claude wrote
    status = read_json(STATUS_FILE)
    selected = status.get("selected_issues", [])

    # Fallback: if Claude wrote single issue in old format
    if not selected and status.get("current_issue"):
        selected = [status["current_issue"]]

    if selected:
        log_phase("orchestrate", f"Selected {len(selected)} issues:")
        for s in selected:
            log_phase("orchestrate", f"  #{s.get('number','?')} [{s.get('product','?')}] {s.get('title','?')}")
    else:
        log_phase("orchestrate", "No issues selected")

    increment_phase_metric("orchestrate")
    return selected[:num_workers]


def spawn_worker(issue, dry_run=False):
    """Spawn a single implementation worker in an isolated git worktree.
    Returns the subprocess.Popen object (or None on failure/dry-run)."""
    issue_number = issue["number"]
    issue_title = issue.get("title", "unknown")
    product = issue.get("product", "unknown")
    branch = branch_name_for_issue(issue_number, issue_title, product)

    # Write worker state
    worker_file = os.path.join(WORKERS_DIR, f"{issue_number}.json")
    write_json(worker_file, {
        "issue_number": issue_number,
        "issue_title": issue_title,
        "product": product,
        "branch": branch,
        "status": "running",
        "started_at": now_iso(),
        "pid": None,
        "worktree": None,
    })

    if dry_run:
        log_phase("work", f"[DRY RUN] Would spawn worker for #{issue_number} [{product}]")
        return None

    # Create isolated worktree for this worker
    wt_path = create_worktree(branch, issue_number)
    if not wt_path:
        log_phase("work", f"Failed to create worktree for #{issue_number}, skipping")
        write_json(worker_file, {
            "issue_number": issue_number,
            "product": product,
            "status": "failed",
            "error": "worktree creation failed",
            "completed_at": now_iso(),
        })
        return None

    prompt = build_work_prompt(issue_number, issue_title, branch, product)

    cmd = [CLAUDE_CMD, "-p", prompt]
    cmd.extend(["--model", CLAUDE_MODEL])
    cmd.extend(["--effort", "max"])
    cmd.extend(["--dangerously-skip-permissions"])
    cmd.extend(["--max-turns", str(CLAUDE_MAX_TURNS)])

    log_phase("work", f"Spawning worker for #{issue_number} [{product}] on {branch} in {wt_path}")

    proc = subprocess.Popen(
        cmd,
        cwd=wt_path,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )

    # Update worker state with PID and worktree path
    write_json(worker_file, {
        "issue_number": issue_number,
        "issue_title": issue_title,
        "product": product,
        "branch": branch,
        "status": "running",
        "started_at": now_iso(),
        "pid": proc.pid,
        "worktree": wt_path,
    })

    return proc


def wait_for_workers_with_merger(workers, dry_run=False):
    """Wait for parallel workers to finish. As each finishes,
    check if merger lock is free and spawn merger if needed.

    workers: list of (issue_dict, Popen_or_None) tuples
    """
    if dry_run or not workers:
        return

    active = {i: (issue, proc) for i, (issue, proc) in enumerate(workers) if proc}
    merger_proc = None

    while active or merger_proc:
        # Check each active worker
        finished = []
        for idx, (issue, proc) in active.items():
            retcode = proc.poll()
            if retcode is not None:
                issue_num = issue["number"]
                product = issue.get("product", "unknown")

                # Update worker state
                worker_file = os.path.join(WORKERS_DIR, f"{issue_num}.json")
                write_json(worker_file, {
                    "issue_number": issue_num,
                    "product": product,
                    "status": "completed" if retcode == 0 else "failed",
                    "exit_code": retcode,
                    "completed_at": now_iso(),
                })

                # Clean up worktree (only if no uncommitted changes)
                remove_worktree(issue_num)

                if retcode == 0:
                    log_phase("work", f"Worker #{issue_num} [{product}] completed")
                    increment_metric("total_prs_created")

                    # Try to start merger if not running
                    if merger_proc is None or merger_proc.poll() is not None:
                        if acquire_merger_lock():
                            release_merger_lock()  # Release immediately — merger will re-acquire
                            log_phase("merger", "Spawning merger to handle open PRs")
                            merger_prompt = build_merger_prompt()
                            merger_cmd = [CLAUDE_CMD, "-p", merger_prompt]
                            merger_cmd.extend(["--model", CLAUDE_MODEL])
                            merger_cmd.extend(["--effort", "max"])
                            merger_cmd.extend(["--dangerously-skip-permissions"])
                            merger_cmd.extend(["--max-turns", "50"])
                            merger_proc = subprocess.Popen(
                                merger_cmd,
                                cwd=PROJECT_DIR,
                                stdout=subprocess.PIPE,
                                stderr=subprocess.PIPE,
                            )
                            # Write lock with merger PID
                            with open(MERGER_LOCK, "w") as f:
                                f.write(str(merger_proc.pid))
                else:
                    log_phase("work", f"Worker #{issue_num} [{product}] FAILED (exit {retcode})")
                    increment_metric("total_errors")

                increment_phase_metric("work")
                finished.append(idx)

        for idx in finished:
            del active[idx]

        # Check merger
        if merger_proc and merger_proc.poll() is not None:
            retcode = merger_proc.poll()
            if retcode == 0:
                log_phase("merger", "Merger completed successfully")
            else:
                log_phase("merger", f"Merger exited with code {retcode}")
            release_merger_lock()
            merger_proc = None

            # Check if more PRs appeared while merger was running
            open_prs = get_open_prs()
            if open_prs and active:
                log_phase("merger", f"{len(open_prs)} PRs still open, will re-check when next worker finishes")

        if active or merger_proc:
            time.sleep(10)  # Poll every 10 seconds

    # Final merger sweep — if any PRs still open after all workers done
    open_prs = get_open_prs()
    if open_prs:
        log_phase("merger", f"{len(open_prs)} PRs still open after all workers done — running final merger")
        run_merger()


# ---------------------------------------------------------------------------
# Main loop
# ---------------------------------------------------------------------------

PHASE_FUNCTIONS = {
    "research": phase_research,
    "plan": phase_plan,
    "orchestrate": phase_orchestrate,
    "work": phase_work,
    "review": phase_review,
    "verify": phase_verify,
    "monitor": phase_monitor,
}


def check_should_halt():
    status = read_json(STATUS_FILE)
    if status.get("halted"):
        log(f"Halted: {status.get('halt_reason', 'unknown')}", "WARN")
        return True

    metrics = read_json(METRICS_FILE)

    backoff_until = metrics.get("backoff_until")
    if backoff_until:
        try:
            until = datetime.datetime.fromisoformat(backoff_until)
            if datetime.datetime.now(datetime.timezone.utc) < until:
                remaining = (until - datetime.datetime.now(datetime.timezone.utc)).seconds
                log(f"In backoff period, {remaining}s remaining", "WARN")
                time.sleep(min(remaining, 60))
                return True
        except (ValueError, TypeError):
            pass

    if metrics.get("consecutive_errors", 0) >= MAX_CONSECUTIVE_ERRORS:
        log(f"Too many consecutive errors ({MAX_CONSECUTIVE_ERRORS}), halting", "ERROR")
        update_status(halted=True, halt_reason="max consecutive errors reached")
        return True

    return False


def run_phase(phase_name, dry_run=False, product_slug=None):
    status = read_json(STATUS_FILE)
    if status.get("halted"):
        log(f"Halted before {phase_name}: {status.get('halt_reason', 'unknown')}", "WARN")
        return None

    phase_fn = PHASE_FUNCTIONS.get(phase_name)
    if not phase_fn:
        log(f"Unknown phase: {phase_name}", "ERROR")
        return False

    try:
        # Pass product_slug to phases that accept it
        if phase_name in ("research", "plan"):
            success = phase_fn(dry_run=dry_run, product_slug=product_slug)
        else:
            success = phase_fn(dry_run=dry_run)

        if success:
            update_metrics(consecutive_errors=0)
        else:
            increment_metric("consecutive_errors")
            increment_metric("total_errors")
        return success

    except KeyboardInterrupt:
        raise
    except Exception as e:
        log(f"Phase {phase_name} crashed: {e}", "ERROR")
        traceback.print_exc()
        increment_metric("consecutive_errors")
        increment_metric("total_errors")
        update_status(last_error=str(e))
        return False


def main_loop(max_loops=None, num_workers=DEFAULT_WORKERS,
              dry_run=False, product_slug=None):
    """
    Main RALPH loop with parallel implementation workers.

    Architecture:
      Research (serial) -> Plan (serial) ->
      Repeat:
        Orchestrate: select N issues (serial)
        Spawn N workers (parallel)
        As workers finish: lock-based merger handles open PRs
        Monitor (serial)
      Research again after RESEARCH_CADENCE_PRS merged
    """
    log("=" * 60)
    log("RALPH — Research, Arrange, Loop, Produce, Heal")
    log("Shield Stack — 22 Consumer Protection Products")
    log(f"Model: Claude Opus 4.6 | Effort: max | Workers: {num_workers}")
    log("=" * 60)
    log(f"Project: {PROJECT_DIR}")
    log(f"Max loops: {max_loops or 'unlimited'}")
    log(f"Workers per loop: {num_workers}")
    log(f"Product focus: {product_slug or 'all'}")
    log(f"Research cadence: every {RESEARCH_CADENCE_PRS} PRs merged")
    log(f"Dry run: {dry_run}")
    log("")

    loop_count = 0
    prs_since_research = 0

    while True:
        if max_loops and loop_count >= max_loops:
            log(f"Reached max loops ({max_loops}), exiting")
            break

        if check_should_halt():
            break

        loop_count += 1
        increment_metric("total_loops")

        log("")
        log(f"{'=' * 60}")
        log(f"LOOP {loop_count} | workers: {num_workers} | prs_since_research: {prs_since_research}")
        log(f"{'=' * 60}")
        log("")

        update_status(loop_count=loop_count, started_at=now_iso())

        # --- Research + Plan (serial, cadence-based) ---
        do_research = (prs_since_research >= RESEARCH_CADENCE_PRS or loop_count == 1)

        if do_research:
            log("Running RESEARCH + PLAN phases (serial)")
            for phase_name in ["research", "plan"]:
                if check_should_halt():
                    break
                result = run_phase(phase_name, dry_run=dry_run, product_slug=product_slug)
                if result is None:
                    return
                if not result:
                    metrics = read_json(METRICS_FILE)
                    if metrics.get("last_rate_limit_at"):
                        backoff = datetime.datetime.now(datetime.timezone.utc) + \
                            datetime.timedelta(seconds=RATE_LIMIT_BACKOFF_SECONDS)
                        update_metrics(backoff_until=backoff.isoformat(),
                                       last_rate_limit_at=None)
                        log(f"Rate limited — backing off {RATE_LIMIT_BACKOFF_SECONDS}s", "WARN")
                        break
                    time.sleep(ERROR_BACKOFF_SECONDS)
            prs_since_research = 0
        else:
            log(f"Skipping research+plan ({prs_since_research}/{RESEARCH_CADENCE_PRS} PRs)")

        if check_should_halt():
            break

        # --- Orchestrate: select N issues (serial) ---
        issues = select_issues(num_workers, dry_run=dry_run)

        if not issues:
            log("No issues to work on. Pausing 60s...")
            time.sleep(60)
            continue

        # --- Spawn N workers (parallel) ---
        log(f"Spawning {len(issues)} implementation workers in parallel")
        workers = []
        for issue in issues:
            proc = spawn_worker(issue, dry_run=dry_run)
            workers.append((issue, proc))

        # --- Wait for workers + run merger as they finish ---
        wait_for_workers_with_merger(workers, dry_run=dry_run)

        # Count completed workers this cycle
        prs_this_cycle = 0
        for issue, _ in workers:
            wf = os.path.join(WORKERS_DIR, f"{issue['number']}.json")
            if os.path.exists(wf):
                ws = read_json(wf)
                if ws.get("status") == "completed":
                    prs_this_cycle += 1
        prs_since_research += prs_this_cycle

        # --- Monitor (serial) ---
        if not dry_run:
            log("Running MONITOR phase (serial)")
            run_phase("monitor", dry_run=dry_run)

        log(f"Loop {loop_count} complete. {prs_this_cycle}/{len(issues)} workers succeeded. "
            f"Pausing 10s...")
        time.sleep(10)

    log("")
    log("=" * 60)
    log("RALPH loop ended")
    log(f"Total loops: {loop_count}")
    metrics = read_json(METRICS_FILE)
    log(f"Issues created: {metrics.get('total_issues_created', 0)}")
    log(f"PRs created: {metrics.get('total_prs_created', 0)}")
    log(f"PRs merged: {metrics.get('total_prs_merged', 0)}")
    log(f"Errors: {metrics.get('total_errors', 0)}")
    log("=" * 60)

def main():
    parser = argparse.ArgumentParser(
        description="RALPH — Autonomous coding loop for Shield Stack"
    )
    parser.add_argument("--max-loops", type=int, default=None,
        help="Maximum number of loops (default: unlimited)")
    parser.add_argument("--workers", type=int, default=DEFAULT_WORKERS,
        help=f"Number of parallel implementation workers (1-{MAX_WORKERS}, default: {DEFAULT_WORKERS})")
    parser.add_argument("--product", type=str, default=None,
        help="Focus on a specific product (slug)")
    parser.add_argument("--dry-run", action="store_true",
        help="Show what would be done without running Claude")
    parser.add_argument("--reset", action="store_true",
        help="Reset status and metrics files before starting")
    parser.add_argument("--status", action="store_true",
        help="Print current status and exit")

    args = parser.parse_args()

    if args.status:
        status = read_json(STATUS_FILE)
        metrics = read_json(METRICS_FILE)
        # Liveness truth, computed fresh — never trust the file's self-report
        pid = status.get("pid")
        alive = is_pid_alive(pid)
        last_hb = status.get("last_heartbeat") or status.get("updated_at")
        try:
            hb_dt = datetime.datetime.fromisoformat(last_hb.replace("Z", "+00:00")) if last_hb else None
            stale_seconds = (datetime.datetime.now(datetime.timezone.utc) - hb_dt).total_seconds() if hb_dt else None
        except Exception:
            stale_seconds = None
        liveness = {
            "pid": pid,
            "pid_alive": alive,
            "last_heartbeat": last_hb,
            "stale_seconds": stale_seconds,
            # Threshold = 1800s (30 min) to cover the longest phase timeout
            # (research/merger run up to 1200s) plus margin. If pid is alive
            # but heartbeat is older than 30 min, the loop is wedged inside a
            # claude call that exceeded its own timeout — that IS dead.
            "verdict": "ALIVE" if (alive and stale_seconds is not None and stale_seconds < 1800) else "DEAD",
        }
        print(json.dumps({"liveness": liveness, "status": status, "metrics": metrics}, indent=2))
        return

    if args.reset:
        log("Resetting status and metrics")
        write_json(STATUS_FILE, {
            "phase": "idle", "loop_count": 0,
            "last_phase_completed": None, "last_error": None,
            "started_at": None, "updated_at": now_iso(),
            "current_product": None, "current_issue": None,
            "current_branch": None, "current_pr": None,
            "halted": False, "halt_reason": None,
        })
        write_json(METRICS_FILE, {
            "total_loops": 0, "total_issues_created": 0,
            "total_prs_created": 0, "total_prs_merged": 0,
            "total_errors": 0, "consecutive_errors": 0,
            "last_rate_limit_at": None, "backoff_until": None,
            "phases_completed": {p: 0 for p in PHASES},
            "per_product": {},
        })

    # Clamp workers to valid range
    num_workers = max(1, min(args.workers, MAX_WORKERS))

    # Liveness: stamp pid + heartbeat, register cleanup handlers so the
    # status file can never lie about being alive again.
    update_status(
        pid=os.getpid(),
        started_at=now_iso(),
        halted=False,
        halt_reason=None,
        last_error=None,
    )
    atexit.register(_mark_halted_on_exit)
    signal.signal(signal.SIGTERM, _signal_halt)
    signal.signal(signal.SIGHUP, _signal_halt)

    try:
        main_loop(
            max_loops=args.max_loops,
            num_workers=num_workers,
            dry_run=args.dry_run,
            product_slug=args.product,
        )
    except KeyboardInterrupt:
        log("\nInterrupted by user (Ctrl+C)", "WARN")
        update_status(phase="interrupted", halted=True, halt_reason="user interrupt")
        sys.exit(130)


if __name__ == "__main__":
    main()
