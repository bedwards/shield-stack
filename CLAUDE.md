# CLAUDE.md — Shield Stack Mono Repo

Read BUSINESS_PRINCIPLES.md and BUSINESS_OPPORTUNITIES.md for product context.
Read products.json for the full manifest of all 22 products.

## Project Overview

Shield Stack is a mono repo containing 22 consumer protection/empowerment products. Each product is a standalone app in its own subfolder, built to solve a specific universal micro-pain with zero-cost SEO distribution, revenue from day one, and full automation.

## Model & Effort

**Always use Claude Opus 4.6 with max effort for everything.** No exceptions. The only non-Claude AI usage is Gemini for image generation and Gemini/Claude code reviews via GitHub Actions.

## Repository Structure

```
shield-stack/
├── CLAUDE.md                    # This file — root instructions
├── BUSINESS_PRINCIPLES.md       # Business validation framework
├── BUSINESS_OPPORTUNITIES.md    # 22 validated product opportunities
├── products.json                # Product manifest (stacks, versions, status)
├── ralph.py                     # Autonomous RALPH orchestrator
├── .ralph/                      # RALPH runtime state
│   ├── status.json              # Current loop state
│   ├── metrics.json             # Cumulative counters
│   ├── backlog.json             # Cross-product issue priority cache
│   ├── reviewers.json           # Bot reviewer config
│   ├── prompts/                 # Worker prompt templates
│   ├── logs/                    # Phase execution logs
│   └── workers/                 # Active worker state files
├── .github/
│   ├── CODEOWNERS
│   └── workflows/
│       ├── ci-{product}.yml     # Per-product CI pipelines
│       ├── claude-code-review.yml
│       ├── gemini-review.yml
│       └── pr-gatekeeper.yml
├── .claude/
│   └── worktrees/               # Git worktrees for isolated work
├── tools/
│   ├── gemini-reviewer/         # Custom Gemini 3.1 Pro PR reviewer
│   └── gemini-image/            # Gemini image generation/analysis
├── scripts/                     # Shared utility scripts
├── ghostboard/                  # Product #1
├── cliffcheck/                  # Product #2
├── ...                          # Products #3-22
└── afterloss/                   # Product #22
```

## Two Operational Modes

### Mode 1: Interactive TUI Orchestrator
You (Claude in the TUI) are the orchestrator. The human stays in control.
- Spawn up to 15 background implementation workers simultaneously
- Each worker operates in a git worktree on a feature branch
- Each worker is assigned one GitHub issue
- Monitor worker progress via git, gh, and .ralph/workers/ state files
- Review PRs by watching GitHub Actions (Claude + Gemini code reviews)
- Merge PRs only after code reviews pass and CI is green

### Mode 2: Autonomous RALPH Loop
`python3 ralph.py` runs a serial loop per product:
- Research + Plan every 10 implementation cycles
- Inner loop: Orchestrate → Implement → Review → Verify → Monitor
- Each phase is a single-shot `claude -p` instance with focused prompt
- All artifacts must be committed and pushed — context windows evaporate
- Rate-limit backoff handles Claude Max subscription throttling

### Vision: Mode 1 orchestrating Mode 2
Eventually the interactive TUI orchestrator manages one RALPH loop per product — 22 autonomous loops running in parallel, each building and improving its product.

## Product Development Rules

### Every Worker MUST:
1. Produce durable artifacts (commits, PRs, issues, CLAUDE.md updates)
2. Commit and push often — if it's not pushed, it doesn't exist
3. Bump minor version of the subsystem and tag (e.g., `hoashield-v0.1.3`)
4. Reference the GitHub issue number in commits and PRs
5. Write tests appropriate to the tech stack
6. Pass CI locally before pushing

### Code Reviews Are MANDATORY
- Claude and Gemini code reviews run on every PR via GitHub Actions
- If code reviews stop working → **HALT everything** and report to the human
- The orchestrator watches GitHub Actions for both reviews before merging
- High-priority review findings block merge
- Lower-priority findings → create GitHub issues, don't lose them

### Verification: Multi-Level, Multi-Context, Mandatory
Verify and verify again — at various levels, from various perspectives, in various context windows.

1. **Worker (pre-push)**: Unit tests, lint, build, Playwright E2E if available
2. **Review (separate context)**: Code review by Claude + Gemini bots, plus RALPH reviewer — logic correctness from fresh eyes
3. **Verify (post-merge, separate context)**: Playwright E2E against deployed preview URL — every page, every button, database round-trips
4. **Monitor (separate context)**: Health checks on main branch, verify deployments are live, run E2E against production

If ANY verification layer fails, it becomes the next work assignment. The loop self-heals.

### LLM-Testable Design (MANDATORY)
Every product must be built so an AI can test it with Playwright:
- `data-testid` attributes on all interactive elements
- Test user accounts / seed data via environment variables
- `TEST_MODE=true` env var to enable test accounts and bypass rate limits
- No CAPTCHAs or anti-bot measures in test/preview environments
- API endpoints return meaningful JSON errors, not HTML error pages
- Every product must have `e2e/` directory with Playwright tests

### Tech Stack Per Product
Each product independently chooses its stack based on research:
- **TypeScript/Next.js**: SEO-heavy web apps, landing pages with SSR/SSG
- **TypeScript/Cloudflare Workers**: API-first products, edge computing
- **Python**: System tools, scripts, AI-heavy backends
- **Rust**: Performance-critical native tools, CLI apps
- **Bun**: Fast Node.js runtime for build tooling and serverless
- Databases: Supabase, Neon, Cloudflare D1, or whatever fits
- Auth: Clerk, Supabase Auth, or whatever fits
- Deploy: Vercel, Cloudflare Pages/Workers, AWS, GCP — per product

### Versioning
- Independent semver per product AND per subsystem
- Tags: `{product-slug}-v{major}.{minor}.{patch}` (e.g., `hoashield-v0.1.0`)
- Worker bumps minor version on each merged PR with meaningful changes
- Major version bumps require human approval

### Database & Data Rules
- **Migrations**: Always use popular third-party tools. NEVER roll your own.
  - Supabase: `supabase migration new` + `supabase db push`
  - Prisma: `prisma migrate dev` + `prisma migrate deploy`
  - Drizzle: `drizzle-kit generate` + `drizzle-kit migrate`
- **Incremental updates only**: Every data process must be resumable
  - Seed scripts: idempotent (upsert / ON CONFLICT DO NOTHING)
  - Scrapers/crawlers: store last-processed cursor, resume from there
  - Migrations: forward-only, additive. Never DROP TABLE in production.
- **No destructive resets**: Quick check of where we left off, then continue

### Git Workflow
- Feature branches: `{product-slug}/issue-{N}-{short-description}`
- Workers MUST use git worktrees for isolation when running in parallel
- One PR per issue, one issue per worker
- Squash merge to main
- Secrets in `~/.config/.env`, NEVER in repo or client-side code

### Continuous Improvement — Learnings System
Every instance works in isolation. The ONLY way to pass knowledge between context windows is through committed artifacts.

- `.ralph/learnings.md` — Growing file of hard-won lessons from past cycles
- **Workers** read it before starting. **Reviewers** append to it after every review.
- **Researchers** mine past PR review comments for recurring patterns and add them.
- Product `CLAUDE.md` files capture product-specific gotchas as they're discovered.
- If a mistake happens twice, it must be documented. If it's documented, it must not happen again.

## RALPH Phase Roles

### Researcher
- Confirms date with `date` command before any web search
- Searches web, GitHub, Reddit/X for latest info
- Produces research artifacts: findings JSON, markdown docs
- Creates GitHub issues for discoveries
- Updates CLAUDE.md and memories with new knowledge

### Planner
- Reads research artifacts and existing GitHub issues
- Creates architecture docs, design documents
- Creates well-specified GitHub issues with acceptance criteria
- Updates products.json with stack/deploy decisions
- Maintains issue priority and dependency graph

### Orchestrator
- Grooms GitHub issue backlog across all products
- Prioritizes: blocking issues first, then dependencies, then impact
- Assigns next issue to implementation worker
- Watches GitHub Actions for code reviews on open PRs
- Responds to review comments — spawns followup workers for fixes
- Creates GitHub issues for lower-priority findings
- Merges PRs only when: CI green + code reviews pass + no blocking findings

### Implementation Worker
- Assigned one GitHub issue
- Works in a git worktree on a feature branch
- Implements, tests, commits, pushes, creates PR
- Bumps subsystem minor version and tags
- Must verify CI passes locally before creating PR
- Must add `data-testid` attributes and Playwright tests for new UI

### Verifier (Post-Merge)
- Runs Playwright E2E tests against deployed preview/production URL
- Tests every page, every form, every button, database round-trips
- Creates Playwright test files if none exist for the product
- Takes screenshots and verifies visual correctness
- Checks LLM-testability (data-testid, test accounts, no CAPTCHAs)
- If tests fail → creates GitHub issue, becomes next work assignment

### Monitor
- Checks main branch health (build, test, lint)
- Verifies GitHub Actions CI status
- Flags stale PRs, broken builds, missing reviews
- Halts the loop if main branch is broken

## Secrets & Environment

Secrets are stored in `~/.config/.env` and loaded by scripts/workers as needed.
Available keys:
- `CLOUDFLARE_API_TOKEN` — Workers, Pages, D1, R2
- `CLOUDFLARE_ACCOUNT_ID`
- `GEMINI_API_KEY` — Image generation, code review, product AI features

Claude access is via Claude Max subscription (20x plan) through the `claude` CLI.

### GitHub Actions Secrets for E2E Tests

The E2E workflow (`e2e-tests.yml`) requires these secrets in the GitHub repo settings.
Secrets can be set per-product (prefixed with the slug) or shared across all products.

**Per-product secrets** (preferred — each product has its own Supabase project):
- `{PRODUCT_SLUG}_SUPABASE_URL` — Supabase project URL (e.g., `scorerebound_SUPABASE_URL`)
- `{PRODUCT_SLUG}_SUPABASE_ANON_KEY` — Supabase anonymous/public key
- `{PRODUCT_SLUG}_SERVICE_ROLE_KEY` — Supabase service role key (admin access, bypasses RLS)

**Shared fallback secrets** (used when per-product secrets are not set):
- `NEXT_PUBLIC_SUPABASE_URL` — Default Supabase URL for all products
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Default anon key for all products
- `SUPABASE_SERVICE_ROLE_KEY` — Default service role key for all products

The `SUPABASE_SERVICE_ROLE_KEY` is a server-only secret that grants full database access
bypassing Row Level Security. It is used by E2E test helpers (`e2e/helpers/db.ts`) to seed
test users, verify database state, and clean up test data. Never expose it to client code.

## GitHub Actions

### Per-Product CI
Each product gets a workflow that triggers only on changes to its directory.
Runs the product's build, test, and lint commands.

### E2E Tests (`e2e-tests.yml`)
Matrix-based workflow that runs authenticated Playwright E2E tests for each product.
- **Matrix products**: scorerebound, ghostboard (add new products to the matrix)
- **Environment**: `TEST_MODE=true`, Supabase credentials from secrets
- **Setup**: `bunx playwright install --with-deps chromium`
- **Tests**: Runs ALL tests including `e2e/authenticated/` and `e2e/visual/`
- **Artifacts**: playwright-report, screenshots, test-results, traces, visual snapshots
- **Visual regression**: Compares screenshots against baselines, reports diffs on PRs
- **Secrets**: See "GitHub Actions Secrets for E2E Tests" section above

### Claude Code Review
Uses `anthropics/claude-code-action@v1` to review PRs.
Requires `CLAUDE_CODE_OAUTH_TOKEN` secret.

### Gemini Review
Custom `tools/gemini-reviewer/review.py` using Gemini 3.1 Pro.
Requires `GEMINI_API_KEY` secret.

### PR Gatekeeper
Closes PRs from unauthorized authors. Only `bedwards` is allowed.
