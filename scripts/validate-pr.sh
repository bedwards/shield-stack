#!/usr/bin/env bash
# Pre-push validation for Shield Stack workers.
# Run this BEFORE pushing your branch.
# Usage: bash scripts/validate-pr.sh <product-slug>

set -euo pipefail

PRODUCT="${1:?Usage: validate-pr.sh <product-slug>}"
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

ERRORS=0
WARNINGS=0

fail() { echo -e "${RED}FAIL${NC}: $1"; ((ERRORS++)); }
warn() { echo -e "${YELLOW}WARN${NC}: $1"; ((WARNINGS++)); }
pass() { echo -e "${GREEN}PASS${NC}: $1"; }

echo "=== Shield Stack Pre-Push Validation: ${PRODUCT} ==="
echo ""

# 1. Scope check — no files outside product dir
NON_PRODUCT=$(git diff --name-only main...HEAD | grep -v "^${PRODUCT}/" | grep -v "^\.ralph/" || true)
if [ -n "$NON_PRODUCT" ]; then
  fail "Files outside ${PRODUCT}/ detected (scope creep):"
  echo "$NON_PRODUCT" | head -5
else
  pass "All changes scoped to ${PRODUCT}/"
fi

# 2. No deleted pre-existing files
DELETED=$(git diff --diff-filter=D --name-only main...HEAD | grep "^${PRODUCT}/" || true)
if [ -n "$DELETED" ]; then
  warn "Deleted files — verify these were intentional:"
  echo "$DELETED"
else
  pass "No pre-existing files deleted"
fi

# 3. Package.json exists
if [ ! -f "${PRODUCT}/package.json" ]; then
  fail "Missing ${PRODUCT}/package.json"
else
  pass "package.json exists"

  # 4. Test script uses vitest, not bun test
  if grep -q '"test":.*vitest' "${PRODUCT}/package.json"; then
    pass "Test script runs vitest"
  else
    warn "Test script may not run vitest — check package.json"
  fi
fi

# 5. NEXT_PUBLIC_ prefix check
if [ -f "${PRODUCT}/.env.example" ]; then
  BAD_SUPABASE=$(grep -E "^SUPABASE_(URL|ANON_KEY)=" "${PRODUCT}/.env.example" || true)
  if [ -n "$BAD_SUPABASE" ]; then
    fail "Supabase vars need NEXT_PUBLIC_ prefix in .env.example"
  else
    pass "Client env vars use NEXT_PUBLIC_ prefix"
  fi
fi

# 6. e2e excluded from tsconfig
if [ -f "${PRODUCT}/tsconfig.json" ]; then
  if grep -q '"e2e"' "${PRODUCT}/tsconfig.json"; then
    pass "e2e/ excluded from tsconfig"
  else
    fail "e2e/ not excluded from tsconfig.json — add to exclude array"
  fi
fi

# 7. Playwright config exists
if [ -f "${PRODUCT}/playwright.config.ts" ]; then
  pass "Playwright config exists"
else
  warn "Missing playwright.config.ts"
fi

# 8. Smoke test exists
if ls "${PRODUCT}/e2e/"*.spec.ts 1>/dev/null 2>&1; then
  pass "E2E smoke test exists"
else
  warn "No E2E smoke test in ${PRODUCT}/e2e/"
fi

# 9. CLAUDE.md updated
if [ -f "${PRODUCT}/CLAUDE.md" ]; then
  if grep -qi "scaffold complete\|0\.1\.0" "${PRODUCT}/CLAUDE.md"; then
    pass "CLAUDE.md updated"
  else
    warn "CLAUDE.md may not be updated — check status and version"
  fi
fi

# 10. Build check
echo ""
echo "Running build verification..."
cd "${PRODUCT}"
if bun run build > /dev/null 2>&1; then pass "bun run build"; else fail "bun run build failed"; fi
if bun run lint > /dev/null 2>&1; then pass "bun run lint"; else fail "bun run lint failed"; fi
if bun run test > /dev/null 2>&1; then pass "bun run test"; else fail "bun run test failed"; fi
cd ..

echo ""
echo "=== Results: ${ERRORS} errors, ${WARNINGS} warnings ==="
if [ "$ERRORS" -gt 0 ]; then
  echo -e "${RED}DO NOT PUSH — fix errors first${NC}"
  exit 1
else
  echo -e "${GREEN}OK to push${NC}"
  exit 0
fi
