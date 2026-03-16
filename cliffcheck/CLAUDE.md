# CliffCheck — All-Program, All-State Benefits Cliff Calculator

## Status: Planning Complete

## Product Overview

CliffCheck solves one of the cruelest traps in the American safety net: the benefits cliff. Over 50 million Americans receiving government benefits face the risk that a modest raise or extra hours could cost them more in lost benefits than they gain in income. CliffCheck lets users enter their income, household size, and state, then see a combined visualization of how their total benefits change across ALL programs simultaneously (SNAP, Medicaid, EITC, childcare subsidies, housing assistance, LIHEAP, TANF, and more).

No existing tool shows the COMBINED cliff across all programs in a single view. Each program has its own calculator, but nobody sees the aggregate picture -- which is where the real cliff lives.

## Target User Persona

- **Primary**: Ages 25-55, working adults receiving 2+ government benefits, considering a raise or job change
- **Secondary**: Social workers, benefits counselors, and nonprofit case managers advising clients
- **Tertiary**: Policy researchers and journalists analyzing cliff effects
- **Psychographic**: Cautious, risk-averse (rationally so), needs concrete numbers before making career decisions
- **Entry point**: Google search "will I lose my benefits if I get a raise"

## Key Features (MVP Scope)

1. **Multi-Program Cliff Calculator**: Enter income, household size, state, current benefits -> see combined benefits vs. income curve
2. **Interactive Cliff Visualization**: D3.js/Recharts chart showing income on X-axis, total compensation (income + benefits) on Y-axis, with cliff zones highlighted
3. **Program-by-Program Breakdown**: Individual line for each program showing where each cliff hits
4. **State-Specific Rules Engine**: Accurate thresholds for all 50 states + DC for major programs
5. **"What-If" Scenario Planner**: Slide income up/down and see real-time benefit changes
6. **Shareable Results**: Generate a shareable URL or PDF of the analysis
7. **Resource Directory**: Links to benefits counselors, VITA sites, and advocacy organizations

## Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js 15 (App Router) | SSR for SEO landing pages, CSR for interactive calculator |
| Database | Supabase (Postgres) | Store benefits rules, user scenarios, analytics |
| Auth | Supabase Auth | Save scenarios requires auth, email + Google OAuth |
| Payments | Stripe | Future premium features, ad-free tier |
| Deploy | Vercel | Instant deploys, preview URLs, edge functions |
| Package Manager | Bun | Fast installs, native TypeScript |
| Styling | Tailwind CSS | Rapid UI development, responsive |
| Charts | Recharts + D3.js | Interactive benefits cliff visualization |
| Calculation Engine | TypeScript (server-side) | Complex benefits math runs on server, results cached |
| Analytics | Plausible/PostHog | Privacy-friendly, conversion tracking |

## Build / Test / Deploy

```bash
# Install dependencies
bun install

# Development
bun dev                    # Next.js dev server (localhost:3000)

# Testing
bun test                   # Unit tests (vitest) -- critical for calculation engine
bun test:e2e              # Playwright E2E tests
bun test:e2e:ui           # Playwright with UI mode
bun test:calc             # Benefits calculation engine unit tests only

# Build
bun run build             # Production build
bun start                 # Start production server

# Database
bunx supabase db reset    # Reset local DB
bunx supabase db push     # Push migrations to remote
bunx supabase gen types   # Generate TypeScript types

# Linting
bun lint                  # ESLint
bun typecheck             # TypeScript strict check

# Benefits data
bun run update-thresholds # Update benefits thresholds from source data
```

## Architecture Decisions

1. **Server-side calculation engine**: Benefits math is complex and state-specific. Runs on the server as a pure TypeScript module with comprehensive unit tests. Results are cached aggressively.
2. **Rule-based, data-driven design**: Benefits rules stored as structured data (JSON/DB rows), not hardcoded. Each program is a pluggable module implementing a common interface. Makes it maintainable as rules change annually.
3. **Anonymous-first**: Calculator works without login. Auth only required to save scenarios.
4. **Progressive enhancement**: Basic calculator works without JS (SSR fallback). Interactive charts enhance with client-side JS.
5. **State as URL params**: Calculator state encoded in URL for shareability and SEO (e.g., `/calculator?state=CA&income=35000&household=3`).
6. **Aggressive caching**: Benefits rules rarely change (annually). Cache calculation results by input hash. SSG for all informational pages.
7. **LLM-testable design**: All interactive elements have `data-testid` attributes. Test mode available.

## Data Model Overview

### Key Tables

- **users**: Supabase auth users (id, email, created_at)
- **profiles**: Extended user data (user_id, display_name, state, household_size)
- **benefit_programs**: Master list (id, slug, name, federal_or_state, description, category)
- **state_rules**: Program rules by state (id, program_id, state_code, income_limits_json, phase_out_json, asset_limits_json, effective_date, expires_date)
- **federal_rules**: Federal program rules (id, program_id, income_limits_json, phase_out_json, effective_date)
- **scenarios**: Saved user calculations (id, user_id, name, state_code, annual_income, household_size, household_members_json, current_benefits[], results_json, created_at)
- **calculation_cache**: Cached results (input_hash, result_json, computed_at, expires_at)
- **program_updates**: Changelog when rules change (id, program_id, state_code, change_description, effective_date, source_url, logged_at)

### Key Enums / Types

- **program_category**: nutrition, healthcare, tax_credit, childcare, housing, energy, cash_assistance
- **household_member**: { age: number, relationship: string, disabled: boolean, student: boolean }
- **income_type**: wages, self_employment, social_security, disability, unemployment, child_support

### Benefits Programs Tracked (MVP)

1. SNAP (Food Stamps) -- federal + state
2. Medicaid / CHIP -- state-specific
3. EITC (Earned Income Tax Credit) -- federal + state
4. Child Tax Credit -- federal
5. Childcare subsidies (CCDF) -- state-specific
6. Section 8 / Housing Choice Voucher -- local
7. LIHEAP (energy assistance) -- state-specific
8. TANF (cash assistance) -- state-specific
9. WIC -- federal
10. ACA Premium Tax Credits -- federal

## API Integrations

1. **No external APIs in MVP** -- benefits rules are manually curated from official sources and stored in the database
2. **Supabase Auth** -- email/password + Google OAuth
3. **Stripe** -- future premium/ad-free tier
4. **Plausible/PostHog** -- analytics

### Data Sources (for populating rules database)
- USDA FNS (SNAP thresholds)
- CMS (Medicaid eligibility)
- IRS (EITC tables, CTC)
- HHS (Federal Poverty Level)
- State HHS agencies (TANF, childcare, LIHEAP)
- HUD (Section 8 income limits)
- Benefits.gov program data

### Future Integrations (Post-MVP)
- Benefits.gov API
- State benefits eligibility APIs (where available)
- Policy change tracking (automated rule updates)

## SEO Strategy

### Primary Keywords
- "benefits cliff calculator" (direct intent)
- "will I lose my benefits if I get a raise" (the core crisis search)
- "SNAP income limit [state]" (program-specific, high volume)
- "Medicaid income limit [state] [year]" (program-specific)
- "benefits cliff [state]" (state-specific)

### Content Strategy
- **Calculator landing page**: Targets "benefits cliff calculator" -- interactive tool IS the content
- **State-specific pages**: 51 SSG pages (50 states + DC) targeting "[state] benefits cliff" and "[state] income limits"
- **Program guides**: Individual pages for each program's rules and cliffs
- **"What is the benefits cliff" explainer**: Educational SEO content
- **Income threshold tables**: Updated annually, targeting "[program] income limit [year]"
- **Blog/news**: Policy change alerts when thresholds update

### Technical SEO
- SSG for all informational and state-specific pages
- Calculator state in URL params for indexable results
- Structured data: FAQ schema, Dataset schema
- Open Graph images with state-specific data visualization
- Sitemap.xml with state/program page hierarchy
- Core Web Vitals optimization

## Revenue / Monetization

### Primary: Display Advertising
- Google AdSense / Mediavine (once traffic qualifies)
- Contextual ads on results pages and resource guides
- Non-intrusive placement that doesn't interfere with calculator UX

### Secondary: Affiliate Commissions
- **Credit unions**: Referrals for savings accounts, emergency loans
- **Financial literacy platforms**: Referrals to budgeting tools, financial coaching
- **Tax preparation**: VITA site referrals, TurboFree referrals
- **Benefits enrollment assistance**: Referrals to benefits navigators

### Future: Premium Tier
- Ad-free experience
- Saved scenario history
- Email alerts when rules change for saved scenarios
- PDF report generation
- API access for nonprofits and counselors

## Model & Effort

Always use Claude Opus 4.6 with max effort. No exceptions.

## LLM-Testable Design

- All buttons, inputs, sliders, and interactive elements have `data-testid` attributes
- `TEST_MODE=true` env var enables test accounts and bypasses rate limits
- Test user accounts seeded via environment variables
- Calculator accepts URL params for deterministic testing
- No CAPTCHAs in test/preview environments
- API endpoints return meaningful JSON errors
- `e2e/` directory with Playwright tests for all critical flows

## Version

0.0.0
