# ScoreRebound — Student Loan Credit Score Recovery Planner

## Status: Scaffolded (v0.1.0)

## Product Overview

ScoreRebound helps the 2.2 million borrowers who lost 100+ credit score points when student loan delinquencies hit credit reports after the COVID forbearance on-ramp expired in late 2024/early 2025. This is a TIME-CRITICAL crisis happening RIGHT NOW (March 2026) -- these borrowers need immediate, actionable guidance.

The product delivers a quiz funnel (5 questions) that generates a personalized credit score recovery plan, then tracks the user's progress over time. Recovery paths include IBR enrollment, loan rehabilitation, consolidation, and credit-building strategies.

## Target User Persona

- **Primary**: Ages 25-45, student loan borrowers who missed payments during/after the COVID on-ramp period and saw their credit score plummet
- **Secondary**: Parents with Parent PLUS loans in delinquency
- **Psychographic**: Anxious, financially stressed, searching desperately for answers, likely discovered the damage when denied for a mortgage/auto loan/apartment
- **Entry point**: Google search "student loan credit score dropped what to do"

## Key Features (MVP Scope)

1. **Recovery Quiz Funnel**: 5-question intake (loan type, servicer, delinquency status, current score range, recovery goals) that generates a personalized plan
2. **Personalized Recovery Plan**: Step-by-step instructions for IBR enrollment, rehabilitation (9 on-time payments), consolidation, and credit-building
3. **Progress Tracker**: Dashboard to log actions taken and track score recovery over time
4. **Resource Library**: Guides for each recovery path with servicer-specific instructions
5. **Affiliate Product Recommendations**: Contextual recommendations for credit-builder loans, secured cards, credit monitoring, and refinancing
6. **Email Capture + Drip Campaign**: Collect email during quiz for ongoing recovery guidance

## Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js 15 (App Router) | SSR/SSG for SEO, React Server Components for performance |
| Database | Supabase (Postgres) | RLS for user data, real-time subscriptions for progress updates |
| Auth | Supabase Auth | Email + Google OAuth, seamless with DB |
| Payments | Stripe | Affiliate tracking, future premium tier |
| Deploy | Vercel | Instant deploys, preview URLs, edge functions |
| Package Manager | Bun | Fast installs, native TypeScript |
| Styling | Tailwind CSS v4 | Rapid UI development, responsive |
| Charts | Recharts | Score progress visualization |
| Email | Resend | Transactional emails for drip campaign |
| Analytics | Plausible/PostHog | Privacy-friendly, conversion tracking |
| Unit Testing | Vitest + @testing-library/react | Fast, jsdom environment |
| E2E Testing | Playwright | LLM-testable, cross-browser |

## Project Structure

```
scorerebound/
├── CLAUDE.md               # This file — product-specific instructions
├── .env.example            # Environment variable template
├── .gitignore              # Git ignores (node_modules, .next, etc.)
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript strict mode config
├── next.config.ts          # Next.js configuration
├── postcss.config.mjs      # PostCSS with Tailwind v4
├── eslint.config.mjs       # ESLint flat config (next/core-web-vitals)
├── vitest.config.ts        # Vitest unit test config
├── playwright.config.ts    # Playwright E2E config
├── bun.lock                # Bun lockfile
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout with header/footer shell
│   │   ├── page.tsx        # Landing page hero
│   │   ├── page.test.tsx   # Unit tests for landing page
│   │   └── globals.css     # Tailwind CSS imports
│   ├── components/         # Shared UI components
│   ├── lib/                # Utility functions, Supabase client, etc.
│   ├── types/              # TypeScript type definitions
│   └── test-setup.ts       # Vitest setup (jest-dom matchers)
├── e2e/
│   └── smoke.spec.ts       # Playwright smoke test
├── public/                 # Static assets
└── docs/
    └── architecture.md     # Architecture documentation
```

## Build / Test / Deploy

```bash
# Install dependencies
bun install

# Development
bun dev                    # Next.js dev server with Turbopack (localhost:3000)

# Testing
bun run test               # Unit tests (Vitest)
bun run test:watch         # Unit tests in watch mode
bun run test:e2e           # Playwright E2E tests
bun run test:e2e:ui        # Playwright with UI mode

# Build & Start
bun run build              # Production build
bun start                  # Start production server

# Linting & Type Checking
bun run lint               # ESLint
bun run typecheck          # TypeScript strict check

# Database (when Supabase is set up)
bunx supabase db reset     # Reset local DB
bunx supabase db push      # Push migrations to remote
bunx supabase gen types    # Generate TypeScript types
```

**Important**: Use `bun run test` (not `bun test`) to invoke Vitest. `bun test` invokes Bun's built-in test runner which is different.

## Architecture Decisions

1. **Quiz-first UX**: The quiz IS the landing page. No friction between SEO landing and value delivery. SSG the quiz shell, CSR the logic.
2. **Anonymous-first**: Generate recovery plan without requiring signup. Capture email/auth only when they want to save progress.
3. **Server Components for SEO pages**: All informational/resource pages are RSC with full SSR for Google indexing.
4. **Client Components for interactive features**: Quiz, progress tracker, and dashboard use client components.
5. **Edge-ready API routes**: Supabase client runs in edge runtime for low latency.
6. **Affiliate link attribution**: All affiliate links pass through internal redirect endpoint for tracking.
7. **LLM-testable design**: All interactive elements have `data-testid` attributes. Test mode bypasses rate limits.

## Data Model Overview

### Key Tables

- **users**: Supabase auth users (id, email, created_at)
- **profiles**: Extended user data (user_id, display_name, score_range, notification_prefs)
- **quiz_responses**: Quiz intake data (id, user_id nullable, loan_type, servicer, delinquency_months, current_score_range, goals[], created_at)
- **recovery_plans**: Generated plans (id, quiz_response_id, user_id nullable, plan_json, recovery_path, estimated_months, created_at)
- **progress_entries**: User progress tracking (id, user_id, plan_id, action_type, action_description, score_snapshot, completed_at)
- **affiliate_clicks**: Click tracking (id, user_id nullable, product_slug, affiliate_url, referrer_page, clicked_at)
- **resources**: CMS for recovery guides (id, slug, title, content_md, category, loan_type_tags[], updated_at)

### Key Enums

- **loan_type**: federal_direct, federal_ffel, federal_perkins, parent_plus, private
- **recovery_path**: ibr_enrollment, rehabilitation, consolidation, credit_building, mixed
- **delinquency_status**: current, 30_days, 60_days, 90_plus, default, collections

## API Integrations

1. **No external credit APIs in MVP** -- user self-reports score range (avoids regulatory complexity)
2. **Supabase Auth** -- email/password + Google OAuth
3. **Stripe** -- future premium tier, affiliate commission tracking
4. **Resend** -- transactional emails (quiz results, progress reminders)
5. **Plausible/PostHog** -- analytics and conversion funnels

### Future Integrations (Post-MVP)
- Credit Karma / Credit Sesame affiliate APIs
- Federal Student Aid (studentaid.gov) data
- Loan servicer status APIs (if available)

## SEO Strategy

### Primary Keywords
- "student loan credit score dropped" (crisis search, high intent)
- "student loan credit score recovery" (solution search)
- "student loan default credit score" (problem awareness)
- "how to fix credit score after student loan default"
- "student loan rehabilitation vs consolidation"

### Content Strategy
- **Quiz landing page**: Targets "student loan credit score dropped what to do" -- the #1 crisis search
- **Recovery path guides**: Individual SSG pages for each recovery method (IBR, rehabilitation, consolidation)
- **Servicer-specific guides**: Pages for each major servicer (MOHELA, Nelnet, Aidvantage, EdFinancial)
- **FAQ/glossary pages**: Target long-tail informational queries
- **State-specific pages**: Target "student loan help [state]" searches

### Technical SEO
- SSG for all informational pages (build-time rendering)
- Structured data: FAQ schema, HowTo schema, Article schema
- Open Graph images per page (dynamic OG with servicer logos)
- Sitemap.xml auto-generation
- robots.txt with proper crawl directives
- Core Web Vitals optimization (target all green)

## Revenue / Monetization

### Primary: Affiliate Commissions
- **Credit-builder loans** (Self, MoneyLion, Chime): $5-20 per signup
- **Secured credit cards** (Discover, Capital One): $25-75 per approval
- **Credit monitoring** (Credit Karma, Experian): $1-5 per signup
- **Student loan refinancing** (SoFi, Earnest, Splash): $100-300 per funded loan
- **Financial literacy courses**: $10-30 per enrollment

### Secondary: Email List Monetization
- Drip campaign with contextual affiliate offers at each recovery milestone
- Weekly "credit recovery tips" newsletter with sponsored content

### Future: Premium Tier
- Personalized AI coaching
- Direct servicer communication templates
- Priority support

## Model & Effort

Always use Claude Opus 4.6 with max effort. No exceptions.

## LLM-Testable Design (MANDATORY)

All UI components MUST follow these conventions:

### data-testid Convention
- All buttons, inputs, links, and interactive elements MUST have `data-testid` attributes
- Format: `{component}-{element}` (e.g., `hero-cta-primary`, `nav-cta`, `footer-link-ibr`)
- Sections: `{section-name}-section` (e.g., `hero-section`, `stats-section`)
- Navigation: `nav-{item}` (e.g., `nav-how-it-works`, `nav-cta`)
- Forms: `{form-name}-{field}` (e.g., `quiz-loan-type`, `quiz-submit`)

### Existing data-testid Attributes (Landing Page)
- `header`, `main-nav`, `logo-link`, `logo-icon`
- `nav-how-it-works`, `nav-recovery-paths`, `nav-faq`, `nav-cta`
- `hero-section`, `hero-badge`, `hero-title`, `hero-description`
- `hero-cta-primary`, `hero-cta-secondary`
- `stats-section`, `stat-borrowers`, `stat-score-drop`, `stat-recovery-time`
- `how-it-works-section`, `step-1`, `step-2`, `step-3`
- `recovery-paths-section`, `path-ibr`, `path-ibr-link`, `path-rehabilitation`, `path-rehabilitation-link`, `path-consolidation`, `path-consolidation-link`
- `cta-section`, `cta-start-quiz`
- `footer`, `footer-link-ibr`, `footer-link-rehabilitation`, `footer-link-consolidation`
- `footer-link-credit-building`, `footer-link-servicers`
- `footer-link-privacy`, `footer-link-terms`, `footer-copyright`
- `main-content`

### Testing Requirements
- `TEST_MODE=true` env var enables test accounts and bypasses rate limits
- Test user accounts seeded via environment variables
- No CAPTCHAs in test/preview environments
- API endpoints return meaningful JSON errors
- `e2e/` directory with Playwright tests for all critical flows
- Unit tests in `src/**/*.test.{ts,tsx}` using Vitest + @testing-library/react

## Environment Variables

See `.env.example` for the full list. Key variables:
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anonymous key
- `STRIPE_SECRET_KEY` — Stripe API secret key
- `RESEND_API_KEY` — Resend email API key
- `TEST_MODE` — Enable test mode (`true`/`false`)

**NEVER commit secrets.** Use `.env.local` for local development, `.env.example` for templates.

## Version

0.1.0
