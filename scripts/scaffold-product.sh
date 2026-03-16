#!/usr/bin/env bash
# Scaffold a new Shield Stack product from the Next.js template.
#
# Usage:
#   bash scripts/scaffold-product.sh <product-slug> <product-name> <tagline>
#
# Example:
#   bash scripts/scaffold-product.sh debtguard "DebtGuard" "Track and dispute unfair debt collection practices"
#
# This script:
#   1. Copies the template directory to <product-slug>/
#   2. Replaces {{PRODUCT_SLUG}}, {{PRODUCT_NAME}}, {{PRODUCT_TAGLINE}} placeholders
#   3. Installs dependencies with bun
#   4. Runs build, lint, and test to verify the scaffold works
#   5. Optionally runs validate-pr.sh

set -euo pipefail

# ── Args ──────────────────────────────────────────────────────────────────────

SLUG="${1:?Usage: scaffold-product.sh <product-slug> \"Product Name\" \"Tagline\"}"
NAME="${2:?Usage: scaffold-product.sh <product-slug> \"Product Name\" \"Tagline\"}"
TAGLINE="${3:?Usage: scaffold-product.sh <product-slug> \"Product Name\" \"Tagline\"}"

# ── Colors ────────────────────────────────────────────────────────────────────

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

info()  { echo -e "${BLUE}INFO${NC}: $1"; }
pass()  { echo -e "${GREEN}PASS${NC}: $1"; }
fail()  { echo -e "${RED}FAIL${NC}: $1"; }
warn()  { echo -e "${YELLOW}WARN${NC}: $1"; }

# ── Resolve paths ─────────────────────────────────────────────────────────────

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
TEMPLATE_DIR="${SCRIPT_DIR}/templates/nextjs"
TARGET_DIR="${REPO_ROOT}/${SLUG}"

# ── Preflight checks ─────────────────────────────────────────────────────────

if [ ! -d "${TEMPLATE_DIR}" ]; then
  fail "Template directory not found: ${TEMPLATE_DIR}"
  exit 1
fi

if [ -d "${TARGET_DIR}" ]; then
  fail "Target directory already exists: ${TARGET_DIR}"
  echo "  Remove it first if you want to re-scaffold: rm -rf ${TARGET_DIR}"
  exit 1
fi

if ! command -v bun &>/dev/null; then
  fail "bun is not installed. Install it: https://bun.sh"
  exit 1
fi

# ── Scaffold ──────────────────────────────────────────────────────────────────

echo ""
echo "=== Scaffolding ${NAME} (${SLUG}) ==="
echo "  Tagline: ${TAGLINE}"
echo "  Target:  ${TARGET_DIR}"
echo ""

# 1. Copy template
info "Copying template files..."
cp -r "${TEMPLATE_DIR}" "${TARGET_DIR}"
pass "Template copied to ${SLUG}/"

# 2. Replace placeholders in all files
info "Replacing placeholders..."

# Use find + perl for reliable cross-platform string replacement
# (sed -i behaves differently on macOS vs Linux)
find "${TARGET_DIR}" -type f \( \
  -name "*.ts" -o -name "*.tsx" -o -name "*.json" -o -name "*.mjs" \
  -o -name "*.css" -o -name "*.md" -o -name "*.example" -o -name ".prettierrc" \
  -o -name ".gitignore" \
\) -exec perl -pi -e "
  s/\\{\\{PRODUCT_SLUG\\}\\}/${SLUG}/g;
  s/\\{\\{PRODUCT_NAME\\}\\}/${NAME}/g;
  s/\\{\\{PRODUCT_TAGLINE\\}\\}/${TAGLINE}/g;
" {} +

pass "Placeholders replaced (SLUG=${SLUG}, NAME=${NAME})"

# 3. Install dependencies
info "Installing dependencies with bun..."
cd "${TARGET_DIR}"
bun install --no-progress 2>&1 | tail -1
pass "Dependencies installed"

# 4. Run build
info "Running build..."
if bun run build > /dev/null 2>&1; then
  pass "bun run build"
else
  fail "bun run build failed"
  echo "  Run 'cd ${SLUG} && bun run build' to see errors"
  exit 1
fi

# 5. Run lint
info "Running lint..."
if bun run lint > /dev/null 2>&1; then
  pass "bun run lint"
else
  fail "bun run lint failed"
  echo "  Run 'cd ${SLUG} && bun run lint' to see errors"
  exit 1
fi

# 6. Run tests
info "Running tests..."
if bun run test > /dev/null 2>&1; then
  pass "bun run test (vitest)"
else
  fail "bun run test failed"
  echo "  Run 'cd ${SLUG} && bun run test' to see errors"
  exit 1
fi

# 7. Run validate-pr.sh (non-fatal — scaffold isn't on a branch yet)
cd "${REPO_ROOT}"
if [ -f "${SCRIPT_DIR}/validate-pr.sh" ]; then
  info "Running validate-pr.sh (structural checks only)..."
  # Only run the structural checks, skip git-diff-based checks
  ERRORS=0
  # Check package.json test script
  if grep -q '"test":.*vitest' "${TARGET_DIR}/package.json"; then
    pass "validate: test script runs vitest"
  else
    warn "validate: test script may not run vitest"
    ((ERRORS++))
  fi
  # Check NEXT_PUBLIC_ prefix
  if [ -f "${TARGET_DIR}/.env.example" ]; then
    BAD_SUPABASE=$(grep -E "^SUPABASE_(URL|ANON_KEY)=" "${TARGET_DIR}/.env.example" || true)
    if [ -n "$BAD_SUPABASE" ]; then
      fail "validate: Supabase vars need NEXT_PUBLIC_ prefix"
      ((ERRORS++))
    else
      pass "validate: client env vars use NEXT_PUBLIC_ prefix"
    fi
  fi
  # Check e2e excluded from tsconfig
  if grep -q '"e2e"' "${TARGET_DIR}/tsconfig.json"; then
    pass "validate: e2e/ excluded from tsconfig"
  else
    fail "validate: e2e/ not excluded from tsconfig.json"
    ((ERRORS++))
  fi
  # Check playwright config
  if [ -f "${TARGET_DIR}/playwright.config.ts" ]; then
    pass "validate: playwright.config.ts exists"
  else
    warn "validate: missing playwright.config.ts"
  fi
  # Check smoke test
  if ls "${TARGET_DIR}/e2e/"*.spec.ts 1>/dev/null 2>&1; then
    pass "validate: e2e smoke test exists"
  else
    warn "validate: no e2e smoke test"
  fi
  # Check CLAUDE.md
  if [ -f "${TARGET_DIR}/CLAUDE.md" ]; then
    if grep -qi "scaffold complete\|0\.1\.0" "${TARGET_DIR}/CLAUDE.md"; then
      pass "validate: CLAUDE.md has version/status"
    else
      warn "validate: CLAUDE.md may not be updated"
    fi
  fi
  # Check health endpoint
  if [ -f "${TARGET_DIR}/src/app/api/health/route.ts" ]; then
    pass "validate: health check endpoint exists"
  else
    warn "validate: no health check endpoint"
  fi
fi

# ── Summary ───────────────────────────────────────────────────────────────────

echo ""
echo "=== Scaffold Complete ==="
echo ""
echo "  Product: ${NAME}"
echo "  Slug:    ${SLUG}"
echo "  Dir:     ${TARGET_DIR}"
echo ""
echo "  Next steps:"
echo "    cd ${SLUG}"
echo "    bun run dev          # Start dev server"
echo "    bun run test         # Run unit tests"
echo "    bun run test:e2e     # Run E2E tests"
echo ""
echo "  Files created:"
find "${TARGET_DIR}" -type f \
  -not -path '*/node_modules/*' \
  -not -path '*/.next/*' \
  -not -path '*/bun.lock' \
  -not -name 'next-env.d.ts' \
  | sort \
  | while read -r f; do echo "    ${f#${REPO_ROOT}/}"; done
echo ""
