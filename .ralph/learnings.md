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

## 2026-03-16 | multiple | Workers skip issue-specific requirements
**What happened:** Workers scaffold a generic Next.js project but skip product-specific requirements listed in the GitHub issue body (barcode scanner deps, PWA support, health check endpoints, Prettier, sidebar layout). Gemini catches these as compliance failures.
**Rule:** Workers MUST read the FULL GitHub issue body (not just the title) and check off every acceptance criterion before pushing. Run `gh issue view {N}` and verify each `- [ ]` item is addressed. Generic scaffolds that ignore issue-specific requirements will be rejected.

## 2026-03-16 | multiple | Missing Supabase client initialization
**What happened:** Workers add Supabase to package.json but don't create the client initialization file (src/lib/supabase.ts). The reviewer catches "dependencies added but not used."
**Rule:** If you add a dependency, you must also add the initialization/setup code that uses it. A dependency in package.json without corresponding code is incomplete work.

## 2026-03-16 | all | Run validate-pr.sh before pushing
**What happened:** Workers would push, get rejected by Gemini, fix, push again, get rejected again. Some PRs needed 3+ rounds. 64% of PRs were rejected at least once.
**Rule:** Before pushing, run `bash scripts/validate-pr.sh {product-slug}`. It checks for scope creep, missing NEXT_PUBLIC_ prefix, tsconfig e2e exclusion, build/lint/test, and other common failures. Fix all errors before pushing.

## 2026-03-16 | all | Learnings adoption improves over batches
**What happened:** Batch 1: 0% worktree usage, 2 contaminated PRs. Batch 2: 67% worktree usage, 2 contaminated. Batch 3: 100% worktree usage, 0 contaminated. Simple concrete rules (bun run test, NEXT_PUBLIC_) adopted immediately. Vague rules (read issue carefully) adopted slowly.
**Rule:** When adding a learning, make it as concrete and mechanical as possible. "Run this script" beats "be more careful." Provide exact commands, not principles.

---

## 2026-03-16 | all scaffold PRs (201–213) | Playwright tests repeat page.goto in every test (RECURRING — 10/10 PRs)
**What happened:** Every single scaffold PR wrote E2E smoke tests with `await page.goto("/")` duplicated inside every individual test case. Reviewers flagged this in all 10 PRs reviewed (201, 202, 203, 207, 208, 209, 210, 211, 212, 213).
**Rule:** Always use `test.beforeEach` to handle shared navigation. Put `await page.goto("/")` in a `test.beforeEach` hook inside the `test.describe` block, not inside each individual test. This is the canonical Playwright pattern.
```typescript
test.describe("ProductName Smoke Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });
  test("landing page loads", async ({ page }) => {
    await expect(page.getByTestId("header")).toBeVisible();
  });
});
```

## 2026-03-16 | all scaffold PRs (201–213) | Vitest unit tests repeat render() in every test (RECURRING — 10/10 PRs)
**What happened:** Every scaffold PR wrote unit tests calling `render(<Home />)` inside each individual `it()` block. Reviewers flagged this in all 10 PRs (same batch as goto duplication).
**Rule:** Use `beforeEach(() => { render(<Home />) })` at the describe block level. Import `beforeEach` from vitest. Do not repeat render in every test body.
```typescript
describe("Home Page", () => {
  beforeEach(() => {
    render(<Home />);
  });
  it("renders hero title", () => {
    expect(screen.getByTestId("hero-title")).toBeInTheDocument();
  });
});
```

## 2026-03-16 | all scaffold PRs | Config files and JSON minified onto single lines (RECURRING — 8+ PRs)
**What happened:** Workers generated tsconfig.json, playwright.config.ts, vitest.config.ts, package.json, and globals.css with all content compressed onto single lines. Reviewers flagged this as HIGH priority (tsconfig) and MEDIUM (all others) across PRs 213, 212, 211, 210, 208, 207, 203, 202.
**Rule:** All config files must be properly formatted with one property/rule per line. Specifically:
- `tsconfig.json` — each compilerOption on its own line (HIGH: breaks readability and triggers security scanner false alarms)
- `playwright.config.ts` — expand the `defineConfig({})` call with proper indentation
- `vitest.config.ts` — expand `test:` and `resolve:` objects with proper indentation
- `package.json` — one script/dependency per line
- `globals.css` — each CSS custom property (CSS variable) on its own line, including inside `@media` blocks
The scaffold template must produce properly formatted output, not minified output.

## 2026-03-16 | all scaffold PRs | Missing /api/health route (RECURRING — 4 PRs: 201, 207, 210, 213 via Gemini)
**What happened:** Scaffold acceptance criteria explicitly requires a `/api/health` route returning 200 OK JSON. Workers consistently omit it. Gemini flagged this as HIGH priority compliance failure in PRs for lemonlens (#201), movercheck (#207), fafsacopilot (#210), and it was called out across multiple others.
**Rule:** Every scaffold MUST include `src/app/api/health/route.ts`. This is a standard acceptance criterion for all products. Contents:
```typescript
import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json({ status: "ok" });
}
```
Add this file every time. The validate-pr.sh script should check for it.

## 2026-03-16 | all scaffold PRs | Missing Prettier configuration (RECURRING — 3+ PRs: 201, 207, 210)
**What happened:** Scaffold acceptance criteria requires "ESLint + Prettier configured." Workers add ESLint but skip Prettier. Gemini flagged as MEDIUM compliance failure in lemonlens, movercheck, fafsacopilot.
**Rule:** Every scaffold must include: `prettier` and `eslint-config-prettier` in devDependencies, plus a `.prettierrc` config file. Run `bun add -d prettier eslint-config-prettier` and create `.prettierrc` as part of the scaffold.

## 2026-03-16 | all scaffold PRs | Missing ESLint rule enforcing data-testid (RECURRING — 3+ PRs: 201, 207, 210)
**What happened:** Scaffold acceptance criteria requires `data-testid` to be enforced via an ESLint rule. Workers either omit it entirely or document it incorrectly (attributing it to `eslint-plugin-jsx-a11y` which does not enforce data-testid). Gemini flagged this as HIGH priority in lemonlens (twice), movercheck, fafsacopilot.
**Rule:** Add the following to `eslint.config.mjs` under rules:
```javascript
"no-restricted-syntax": ["error", {
  "selector": "JSXElement[openingElement.name.name=/^(a|button|input|select|textarea|Link)$/]:not(:has(JSXAttribute[name.name='data-testid']))",
  "message": "Interactive elements must have a data-testid attribute."
}]
```
Do NOT reference `jsx-a11y` for this enforcement. Update product CLAUDE.md to reflect the actual rule used.

## 2026-03-16 | cellscore, skimpwatch, lemonlens, others | next/typescript ESLint config is deprecated (RECURRING — 4+ PRs: 208, 209, 210, 211)
**What happened:** Workers used `compat.extends("next/core-web-vitals", "next/typescript")` in eslint.config.mjs. `next/typescript` is deprecated — `next/core-web-vitals` already includes TypeScript support when a tsconfig.json is present. Flagged as HIGH in PR 208 (skimpwatch), MEDIUM in others.
**Rule:** ESLint config must be `compat.extends("next/core-web-vitals")` only. Remove `"next/typescript"` from all scaffold output. The scaffold template is generating this incorrectly.

## 2026-03-16 | cellscore, skimpwatch | new Date().getFullYear() causes hydration mismatch (RECURRING — 2 PRs: 208, 211)
**What happened:** Footer components used `new Date().getFullYear()` for the copyright year. In Next.js App Router, this can cause a server/client hydration mismatch if the year rolls over between render and hydration. Flagged as HIGH priority in both PRs.
**Rule:** Do NOT use `new Date().getFullYear()` in components. Either: (a) hardcode the year and update manually, or (b) add `suppressHydrationWarning` to the element. Option (b) is preferred so it stays current:
```tsx
<p suppressHydrationWarning>&copy; {new Date().getFullYear()} ProductName. All rights reserved.</p>
```

## 2026-03-16 | all scaffold PRs | font-family overrides Tailwind defaults (RECURRING — 7+ PRs: 201, 202, 203, 207, 208, 209, 210)
**What happened:** globals.css sets `font-family: Arial, Helvetica, sans-serif` on the body. This overrides Tailwind's superior default system font stack from preflight. Flagged as MEDIUM in 7+ PRs.
**Rule:** Do NOT set a custom `font-family` on the body in globals.css. Remove this line entirely and let Tailwind's preflight provide the default system font stack. If a custom font is needed for a specific product, configure it in tailwind.config.js using the `fontFamily` extend key, not via a raw CSS declaration.

## 2026-03-16 | settlescan, skimpwatch | env getter functions missing error-throwing tests (RECURRING — 2 PRs: 208, 209)
**What happened:** env.ts helper functions (`getSupabaseUrl`, `getSupabaseAnonKey`, `getStripeSecretKey`) throw errors when env vars are missing, but tests only cover `isTestMode`. The error-throw behavior is untested. Flagged as HIGH in movercheck (#207), MEDIUM in settlescan (#209) and skimpwatch (#208).
**Rule:** Tests for env.ts MUST cover the error-throwing behavior for every getter function. Use `vi.stubEnv` and `expect(() => getX()).toThrow("VAR_NAME is not set")` pattern. Also: `vi.stubEnv("TEST_MODE", "")` is NOT the same as unset — to test the unset case, use `vi.unstubAllEnvs()` in `beforeEach` and assert without stubbing.

## 2026-03-16 | all scaffold PRs | Playwright baseURL and webServer.url hardcoded (RECURRING — 3+ PRs: 201, 208, 211)
**What happened:** playwright.config.ts hardcodes `baseURL: "http://localhost:3000"` and `webServer.url: "http://localhost:3000"`. This breaks in CI/CD environments where the port or host differs. Flagged across lemonlens, skimpwatch, cellscore.
**Rule:** Use `process.env.NEXT_PUBLIC_APP_URL` with a fallback:
```typescript
const baseURL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
```
Use this variable for both `use.baseURL` and `webServer.url`.

## 2026-03-16 | cellscore | Tailwind CSS variable syntax — prefer semantic class names (RECURRING — 2+ PRs: 210, 211)
**What happened:** Workers used verbose `text-[var(--primary)]` arbitrary value syntax instead of semantic Tailwind class names. With Tailwind CSS 4 and CSS variables defined in globals.css, semantic class names like `text-primary`, `bg-primary`, `text-foreground` work directly.
**Rule:** In Tailwind CSS 4, CSS variables defined in globals.css are automatically available as utility class names. Use `text-primary`, `bg-primary`, `hover:bg-primary-hover`, `text-foreground`, `text-muted`, `border-border`, etc. Do NOT use `text-[var(--primary)]` syntax.

## 2026-03-16 | all scaffold PRs | e2e directory excluded from TypeScript type checking (RECURRING — flagged in PR 208)
**What happened:** The scaffold template sets `"exclude": ["node_modules", "e2e"]` in tsconfig.json, meaning TypeScript errors in Playwright test files are silently ignored.
**Rule:** Remove `"e2e"` from the tsconfig.json `exclude` array. Use `"exclude": ["node_modules"]` only. Type errors in E2E tests must be caught by the TypeScript compiler.

## 2026-03-16 | settlescan | Date fields typed as string without format documentation (SINGLE — PR 209)
**What happened:** Domain interfaces (Settlement, Claim, UserProfile) used `string` for date properties with no indication of expected format. This causes ambiguity and potential bugs when consumers interpret the format differently.
**Rule:** When typing date fields as `string` in TypeScript interfaces, add a JSDoc comment specifying the expected format: `/** ISO 8601 date string */`. Consider using a branded type `type ISODateString = string` for extra clarity.

## 2026-03-16 | settlescan | Large monolithic page components not split into sub-components (SINGLE — PR 209)
**What happened:** Home page component contained all sections (hero, stats, how-it-works, features, CTA) inline as one large component. Reviewer flagged maintainability concern.
**Rule:** Landing page sections should be extracted into named sub-components: `HeroSection`, `StatsSection`, `HowItWorksSection`, `FeaturesSection`, `CtaSection`. These live in `src/components/` and are composed in `page.tsx`. This is the correct pattern from day one.

## 2026-03-16 | multiple | getStripeSecretKey used without server-only guard (SINGLE — PR 211)
**What happened:** `getStripeSecretKey()` in env.ts accesses a server-only env var (`STRIPE_SECRET_KEY`). If accidentally imported in a client component, it will always throw. No warning or guard was present.
**Rule:** Server-only env getter functions must be marked with a JSDoc `@remarks Server-side only` comment or named with a `Server` suffix (e.g., `getServerStripeSecretKey`). For extra safety, add `import "server-only"` at the top of any module that exports server-only getters.

## 2026-03-16 | multiple | TEST_MODE=true in .env.example (SINGLE — PR 208, skimpwatch)
**What happened:** `.env.example` shipped with `TEST_MODE=true` as default. A developer copying this file to `.env` without changing it would unknowingly run in test mode in production-like environments.
**Rule:** `.env.example` must ship with `TEST_MODE=false` as the default. Test mode must be explicitly opted into.

## 2026-03-17 | all | Full-stack E2E verification is the #1 hard requirement (POLICY)
**What happened:** Features were shipping with unit tests and smoke E2E tests but no authenticated E2E tests. Login flows, database writes, and browser state were untested in real browser contexts. Bugs slipped through that only manifest when a real user logs in and interacts with the product.
**Rule:** Full-stack E2E verification is the #1 hard requirement. No feature is done until it has authenticated E2E tests verifying UI, database state, browser state, and screenshots. Every product must have: (1) `/api/test-auth` endpoint gated by `TEST_MODE`, (2) `e2e/authenticated/` tests, (3) `e2e/helpers/auth.ts` and `e2e/helpers/db.ts`, (4) visual regression screenshots, (5) database state assertions in E2E tests. Run with: `TEST_MODE=true SUPABASE_SERVICE_ROLE_KEY=xxx bunx playwright test`. Workers must run this locally before pushing. Reviewers must block PRs that add auth features without authenticated E2E tests.

## 2026-03-17 | scorerebound | RLS policies missing anonymous SELECT — breaks anonymous-first UX (PR #257)
**What happened:** Database schema had INSERT policies for `anon` role on `quiz_responses`, `recovery_plans`, and `plan_steps`, but no SELECT policies. Anonymous users could create data but never read it back. This completely breaks the "Anonymous-first: Generate recovery plan without requiring signup" architecture. All 3 bot reviewers (Gemini Code Assist, Gemini 3.1 Pro, RALPH reviewer) caught this independently.
**Rule:** When implementing anonymous-first UX with Supabase RLS, always add matching SELECT policies for every INSERT policy granted to the `anon` role. If anon can insert, anon must be able to read. Check: for every `FOR INSERT TO anon` policy, there must be a corresponding `FOR SELECT TO anon` policy with appropriate USING clause.

## 2026-03-17 | scorerebound | UPDATE policies block anonymous row claiming after signup (PR #257)
**What happened:** UPDATE policies on `quiz_responses` and `recovery_plans` used `USING (auth.uid() = user_id)`. For anonymous rows where `user_id IS NULL`, `auth.uid() = NULL` is never true in SQL (NULL != NULL). Authenticated users could never claim their anonymous data after signing up.
**Rule:** When tables support anonymous-then-claim flows, UPDATE policies must include `OR user_id IS NULL` in the USING clause: `USING (auth.uid() = user_id OR user_id IS NULL)`. Keep `WITH CHECK (auth.uid() = user_id)` to enforce that the updated row gets the authenticated user's ID. This is a fundamental SQL gotcha: `NULL = anything` is never true.

## 2026-03-17 | scorerebound | Gemini Code Assist incorrectly flags Next.js 15 `await params` as critical bug (PR #263)
**What happened:** Gemini Code Assist flagged `{ params }: { params: Promise<{ id: string }> }` with `const { id } = await params` as a **critical** bug, claiming "params is a plain object, not a promise. Using `await params` here is incorrect." This is WRONG — in Next.js 15 App Router, route handler params ARE Promises and MUST be awaited. The code was correct.
**Rule:** When reviewing bot feedback about Next.js route handlers, verify against Next.js 15 docs. In Next.js 15, `params` is asynchronous in route handlers, layouts, pages, and middleware. The correct pattern is `{ params }: { params: Promise<{ id: string }> }`. Do NOT downgrade to the Next.js 14 synchronous pattern based on bot suggestions.

## 2026-03-17 | scorerebound | When changing footer/nav links, update ALL test files that reference data-testid attributes (PR #264)
**What happened:** Worker replaced `footer-link-credit-building` with `footer-link-faq` and `footer-link-about` in `layout.tsx` and correctly updated `landing-page.spec.ts`, but forgot to update the `REQUIRED_TEST_IDS` array in `testability.spec.ts`. This caused CI E2E failure. The Gemini 3.1 Pro reviewer correctly identified this as HIGH severity.
**Rule:** When modifying data-testid attributes in components, grep ALL E2E test files (`e2e/**/*.spec.ts`) for the old test IDs to ensure all references are updated. Multiple test files may reference the same test IDs (landing-page, testability, sections, navigation, etc.). Also update the `Existing data-testid Attributes` list in the product's CLAUDE.md.

## 2026-03-17 | scorerebound | Header nav anchor links must use absolute paths for cross-page navigation (PR #264)
**What happened:** Header nav in `layout.tsx` used bare anchor hrefs (`#how-it-works`, `#recovery-paths`, `#faq`) which work on the home page but do nothing on subpages (guide, servicer, FAQ, about) since those anchor targets don't exist there.
**Rule:** In shared layout nav, use `/#section-name` (with leading slash) instead of `#section-name` so that anchor links work from any page by navigating to home first.

## 2026-03-17 | scorerebound | Tailwind divide-y and border-b cause double borders (PR #264)
**What happened:** `FAQSection` parent used `divide-y divide-gray-200` while each child `FAQAccordionItem` had `border-b border-gray-200`, resulting in double-thick borders between items.
**Rule:** When using Tailwind's `divide-y` on a parent container, do NOT also add `border-b` to child items — `divide-y` already inserts borders between siblings. Pick one approach.

## 2026-03-17 | scorerebound | Visual regression baselines must be generated per-platform from CI artifacts (PR #294)
**What happened:** Worker committed darwin (macOS) visual baselines but CI runs on Ubuntu Linux. All 23 visual regression tests failed because Linux baselines didn't exist. Font rendering differences between macOS and Linux produce different page dimensions, so macOS screenshots cannot serve as Linux baselines.
**Rule:** Visual regression baselines must exist for EVERY platform that runs tests. For cross-platform CI, download the "actual" screenshots from CI artifacts after a failed run and commit them as the `linux/` baselines alongside the `darwin/` baselines. The Playwright config must use `{platform}` in `snapshotPathTemplate`. Quick fix command: `gh run download <run-id> --name <product>-visual-snapshots --dir /tmp/linux-snapshots`, then copy the `linux/` directory into the snapshot directories and commit.

## 2026-03-17 | afterloss | @react-pdf/renderer cannot render server-side in Next.js App Router route handlers (Research)
**What happened:** Research confirmed that @react-pdf/renderer relies on browser APIs (DOMMatrix) not available in Node.js server-side rendering. Using it in API routes or route handlers causes "DOMMatrix is not defined" errors.
**Rule:** Use @react-pdf/renderer via CLIENT-SIDE dynamic import: `dynamic(() => import('@react-pdf/renderer'), { ssr: false })`. The Claude API generates letter TEXT server-side in an API route, then the client renders the text into a styled PDF. Add `serverExternalPackages: ['@react-pdf/renderer']` to next.config.ts as a fallback for any server-side usage that may work in future versions. Alternative for pure server-side: jsPDF.

## 2026-03-18 | multiple | Issue #290 commit contaminates feature branches (RECURRING — PRs #301, #308)
**What happened:** Two separate PRs (#301 for afterloss issue #297, #308 for ghostboard issue #288) both included commit `0a3e346` from issue #290 (deploy workflows, SEO files across 5 products). This happened because workers branched from a point that already included the unmerged #290 work, creating the same contamination in both PRs. The #290 work was never merged to main, so it keeps reappearing as a phantom diff.
**Rule:** Before creating a feature branch, always branch from `origin/main` (fresh pull). Run `git log --oneline origin/main..HEAD` before pushing to verify your branch only contains commits for YOUR issue. If you see commits from other issues, you branched from a dirty base. Fix: `git rebase --onto origin/main <bad-base> <your-branch>` to transplant only your commits onto clean main.

## 2026-03-18 | multiple | Merger: verify actual diff locally before blocking for scope creep (PR #308)
**What happened:** PR #308 was blocked by 6+ merger reviews for "scope creep" because `gh pr diff` showed #290 files. However, `git diff origin/main...branch --stat` showed only 1 file changed. The `gh pr diff` was stale because the merge base hadn't been recalculated after #290 was merged to main. PR #308 was clean all along.
**Rule:** Before blocking a PR for scope creep, verify the actual diff locally with `git diff origin/main...origin/{branch} --stat`. GitHub's PR diff can be stale if the merge base changed after commits were pushed to main. If the local diff is clean, the PR is clean — merge it.

## 2026-03-18 | multiple | Merger: fix contaminated PRs by cherry-picking onto clean branches (PR #301 → #309)
**What happened:** PR #301 had a real contamination (commit `843b993` for #290 on a branch with merge base before #290). After 6 blocking reviews, no one fixed it. The merger created a clean branch from `origin/main`, cherry-picked only the relevant commit (`478d2bd`), and opened PR #309 which merged cleanly.
**Rule:** When a PR has been blocked for contamination through multiple review cycles and the fix is mechanical (cherry-pick relevant commits onto clean branch), the merger should fix it rather than posting yet another blocking review. Command: `git checkout -b {clean-branch} origin/main && git cherry-pick {good-commit} && git push -u origin {clean-branch}`. Close the old PR, open a new one.
