# RALPH Learnings — Shield Stack

This file is an artifact. Workers read it before starting work. Reviewers append to it after finding issues. It grows over time. Every entry was learned the hard way.

## How this file works
- **Reviewers** append entries after merging or requesting changes on a PR
- **Workers** read this file at the start of every implementation phase
- **Research phase** reviews past PR comments and adds patterns here
- Entries are never deleted — they accumulate as institutional knowledge
- Each entry includes: date, product, what went wrong, what to do instead

---

## 2026-03-16 | ghostboard, cliffcheck, speedproof | Scope creep across products (RECURRING — 3 incidents)
**What happened:** Multiple workers committed other products' files because they shared the repo checkout. This happened with GhostBoard (included ScoreRebound), CliffCheck (included SpeedProof), and SpeedProof (included CliffCheck). Every time parallel workers share a checkout, this happens.
**Rule:** Workers MUST use git worktrees for isolation. Before committing, run `git diff --name-only main...HEAD` and verify EVERY file is under your product's directory. If you see another product's files, you have contamination — do NOT commit. The BillWatch worker used `git worktree add .claude/worktrees/billwatch-163` and was the only clean PR in its batch.

## 2026-03-16 | ghostboard | Deleted existing files
**What happened:** Worker deleted `ghostboard/docs/architecture.md` that existed before the scaffold. The planner had created it.
**Rule:** Before committing, run `git diff --stat` and verify you haven't deleted files that existed before your branch. Only add/modify files relevant to your issue.

## 2026-03-16 | scorerebound, ghostboard | bun test vs bun run test
**What happened:** `bun test` invokes Bun's native test runner which picks up Playwright e2e files and doesn't use vitest config. Both workers hit this independently.
**Rule:** Always use `bun run test` (which runs the `test` script from package.json → vitest) not `bun test`. Document this in the product's CLAUDE.md.

## 2026-03-16 | ghostboard | NEXT_PUBLIC_ prefix for client-side env vars
**What happened:** Supabase URL and anon key were defined as `SUPABASE_URL` and `SUPABASE_ANON_KEY`. These need the `NEXT_PUBLIC_` prefix to be accessible in client-side code in Next.js.
**Rule:** Any environment variable accessed in client components or browser code MUST be prefixed with `NEXT_PUBLIC_`. Server-only secrets (like `STRIPE_SECRET_KEY`) do NOT get the prefix.

## 2026-03-16 | scorerebound | Duplicate PRs from branch naming
**What happened:** Worker created a branch with a different naming convention than expected, resulting in two PRs for the same issue.
**Rule:** Branch naming convention is `{product-slug}/issue-{N}-{short-description}`. No variations.

## 2026-03-16 | all | Database migrations
**Rule:** Always use popular third-party migration tools. Never roll your own.
- Supabase: `supabase migration new` + `supabase db push`
- Prisma: `prisma migrate dev` + `prisma migrate deploy`
- Drizzle: `drizzle-kit generate` + `drizzle-kit migrate`
Never write custom migration runners or schema diff tools.

## 2026-03-16 | all | Incremental updates, never destructive resets
**Rule:** Every data process must be resumable and incremental:
- Seed scripts: upsert (INSERT ... ON CONFLICT DO NOTHING)
- Scrapers/crawlers: store last-processed cursor, resume from there
- Build processes: incremental compilation (ISR, Turbo cache)
- Migrations: forward-only, additive. Never DROP TABLE in production.
- Worker state: track progress so a killed worker can resume
