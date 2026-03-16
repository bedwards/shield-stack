#!/usr/bin/env bash
# PR review metrics for Shield Stack.
# Tracks first-try approval rate and common rejection reasons.
# Usage: bash scripts/pr-metrics.sh

set -euo pipefail

REPO="bedwards/shield-stack"

echo "=== Shield Stack PR Metrics ==="
echo ""

# Count merged PRs
MERGED=$(gh pr list --repo "$REPO" --state merged --json number --limit 200 2>/dev/null | python3 -c 'import json,sys; print(len(json.loads(sys.stdin.read())))')
echo "Total merged PRs: $MERGED"

# Count open PRs
OPEN=$(gh pr list --repo "$REPO" --state open --json number --limit 200 2>/dev/null | python3 -c 'import json,sys; print(len(json.loads(sys.stdin.read())))')
echo "Open PRs: $OPEN"

# Count open issues
ISSUES=$(gh issue list --repo "$REPO" --state open --json number --limit 500 2>/dev/null | python3 -c 'import json,sys; print(len(json.loads(sys.stdin.read())))')
echo "Open issues: $ISSUES"

# Count Gemini review comments
echo ""
echo "=== Recent Gemini Verdicts (last 10 PRs) ==="
gh pr list --repo "$REPO" --state merged --json number --limit 10 2>/dev/null | python3 -c "
import json, sys, subprocess
prs = json.loads(sys.stdin.read())
approve = 0
reject = 0
for pr in prs:
    n = pr['number']
    try:
        result = subprocess.run(
            ['gh', 'api', f'repos/$REPO/issues/{n}/comments', '--jq', '.[].body'],
            capture_output=True, text=True, timeout=10
        )
        verdicts = [l for l in result.stdout.split('\n') if 'Verdict' in l]
        if any('APPROVE' in v for v in verdicts):
            approve += 1
        if any('REQUEST_CHANGES' in v for v in verdicts):
            reject += 1
    except Exception:
        pass
total = approve + reject
if total > 0:
    print(f'Approved: {approve}/{total} ({100*approve//total}%)')
    print(f'Rejected at least once: {reject}/{total} ({100*reject//total}%)')
"

echo ""
echo "=== Products by status ==="
for slug in ghostboard cliffcheck scorerebound hoashield recallradar billwatch repairfair clearfile zonealert lemonlens speedproof netcheck receiptguard smallclaimsai tenantshield movercheck skimpwatch settlescan fafsacopilot cellscore parkfight afterloss; do
  if [ -f "$slug/package.json" ]; then
    version=$(python3 -c "import json; print(json.load(open('$slug/package.json')).get('version','?'))" 2>/dev/null || echo "?")
    echo "  $slug: v$version"
  else
    echo "  $slug: not scaffolded"
  fi
done
