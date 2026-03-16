# MoverCheck — Moving Company Scam Protection

## Status: Scaffold Complete

## Product Overview

MoverCheck lets anyone enter a moving company name or USDOT number and instantly get a deep background check pulling from FMCSA licensing data, BBB complaints, state licensing records, and aggregated reviews. The output is a clear red/yellow/green trust score with a detailed report, plus a binding estimate template to protect against price gouging. The core SEO play: "Is [moving company] legit?"

### Target User
- Anyone planning a move (30M+ moves/year in the US)
- People who have received moving quotes and want to verify the company
- Victims of moving scams seeking recourse information
- Real estate agents recommending movers to clients
- Anyone Googling "is [moving company] legit" or "[mover] reviews scam"

### MVP Features (v0.1)
1. **Company Lookup** — Search by company name or USDOT number
2. **FMCSA Verification** — Pull licensing, insurance, safety rating, complaint history
3. **Trust Score Algorithm** — Red/yellow/green score based on multi-source data
4. **Detailed Report** — Insurance status, years in business, complaint trends, fleet size
5. **Review Aggregation** — Pull and summarize reviews from multiple platforms
6. **Binding Estimate Template** — Downloadable template protecting against price gouging
7. **SEO Landing Pages** — Pre-built pages: "Is [company] a legit moving company"
8. **Full Report** (premium) — Complete deep-dive with BBB data, state licensing, document downloads

### Revenue Model
- **Free tier**: Basic lookup with trust score color and summary (ad-supported)
- **Full report ($9.99)**: Complete FMCSA details, BBB data, review analysis, binding estimate template, PDF download
- Stripe for one-time report purchases

## Tech Stack & Rationale

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Next.js 15 (App Router) | SSR for SEO company pages, React for interactive report UI |
| Database | Supabase (Postgres + Auth + Storage) | Cache FMCSA data, store reports, user accounts; RLS for data isolation |
| Auth | Supabase Auth | Email + Google OAuth for saved reports and purchase history |
| Payments | Stripe | One-time report purchases |
| Deploy | Vercel | Edge functions for fast lookups, preview deploys |
| Package Manager | bun | Fast installs, native TypeScript |
| FMCSA Data | FMCSA SAFER Web API | Official USDOT carrier data (https://ai.fmcsa.dot.gov/) |
| PDF Generation | @react-pdf/renderer | Generate downloadable report PDFs and estimate templates |
| Ads | Google AdSense | Monetize free-tier pages |

## Build / Test / Deploy

```bash
cd movercheck
bun install              # Install dependencies
bun run dev              # Start dev server (localhost:3000)
bun run build            # Production build
bun run lint             # ESLint
bun run test             # Run Vitest unit/integration tests (NEVER use `bun test`)
bun run test:e2e         # Run Playwright E2E tests
bun run test:e2e:ui      # Playwright E2E with UI mode
```

**IMPORTANT:** Always use `bun run test` (NOT `bun test`). `bun test` invokes Bun's native test runner which picks up Playwright e2e files and doesn't use the Vitest config.

### Future commands (not yet wired up)
```bash
bun run db:migrate       # Run Supabase migrations
bun run db:seed          # Seed FMCSA company data
bun run db:types         # Generate TypeScript types from Supabase schema
```

## Architecture

### High-Level Components
1. **Web App (Next.js)** — SEO landing pages + interactive company lookup and report UI
2. **API Routes (Next.js Route Handlers)** — Company search, FMCSA data fetch, trust score calculation, report generation
3. **Supabase Backend** — Postgres for cached company data, Auth, Storage for report PDFs
4. **FMCSA SAFER API** — Official carrier licensing, insurance, and safety data
5. **Background Jobs** — Supabase Edge Functions for periodic data refresh of cached companies

### Data Model

**companies** — Cached moving company records
- `id` (uuid, PK), `usdot_number` (text, unique, indexed), `mc_number` (text, nullable), `legal_name` (text), `dba_name` (text, nullable), `address` (jsonb), `phone` (text, nullable), `email` (text, nullable), `entity_type` (text), `operating_status` (text), `out_of_service_date` (date, nullable), `created_at` (timestamptz), `updated_at` (timestamptz)

**fmcsa_data** — Detailed FMCSA records per company
- `id` (uuid, PK), `company_id` (uuid, FK->companies), `insurance_status` (text), `insurance_amount` (integer), `safety_rating` (text, nullable), `safety_rating_date` (date, nullable), `fleet_size` (integer), `driver_count` (integer), `complaint_count` (integer), `inspection_data` (jsonb), `crash_data` (jsonb), `hm_flag` (boolean), `fetched_at` (timestamptz)

**trust_scores** — Computed trust scores
- `id` (uuid, PK), `company_id` (uuid, FK->companies), `overall_score` (integer), `color` (enum: red, yellow, green), `fmcsa_score` (integer), `review_score` (integer, nullable), `bbb_score` (integer, nullable), `age_score` (integer), `factors` (jsonb), `computed_at` (timestamptz)

**reviews_cache** — Aggregated reviews from external platforms
- `id` (uuid, PK), `company_id` (uuid, FK->companies), `platform` (text), `rating` (numeric), `review_count` (integer), `recent_reviews` (jsonb), `sentiment_summary` (text, nullable), `fetched_at` (timestamptz)

**reports** — Generated full reports (premium)
- `id` (uuid, PK), `user_id` (uuid, FK->auth.users, nullable), `company_id` (uuid, FK->companies), `report_data` (jsonb), `pdf_url` (text, nullable), `stripe_payment_intent_id` (text, nullable), `created_at` (timestamptz)

**profiles** — Extended user profile
- `id` (uuid, PK, FK->auth.users), `display_name` (text), `stripe_customer_id` (text, nullable), `created_at` (timestamptz), `updated_at` (timestamptz)

**searches** — Search analytics and history
- `id` (uuid, PK), `query` (text), `query_type` (enum: name, usdot, mc_number), `company_id` (uuid, FK->companies, nullable), `user_id` (uuid, FK->auth.users, nullable), `created_at` (timestamptz)

### API Routes
- `GET /api/companies/search?q=` — Search companies by name or USDOT
- `GET /api/companies/[usdot]` — Get company details and trust score
- `GET /api/companies/[usdot]/fmcsa` — Get detailed FMCSA data
- `GET /api/companies/[usdot]/reviews` — Get aggregated reviews
- `POST /api/reports/generate` — Generate full report (premium, triggers payment)
- `GET /api/reports/[id]` — Get generated report (auth required for paid reports)
- `GET /api/reports/[id]/pdf` — Download report PDF
- `GET /api/estimate-template` — Download binding estimate template
- `POST /api/webhooks/stripe` — Stripe webhook for payment events

### Trust Score Algorithm
The trust score (0-100) is computed from weighted factors:
- **FMCSA Status (40%)**: Active authority, insurance current, no out-of-service
- **Safety Record (20%)**: Crash rate, inspection results, complaints
- **Business Age (15%)**: Years operating under current USDOT
- **Review Score (15%)**: Aggregated rating across platforms
- **BBB Status (10%)**: BBB rating and complaint resolution

Color mapping: Green (70-100), Yellow (40-69), Red (0-39)

### SEO Strategy
- **Company pages**: `/companies/[slug]` — "Is [Company Name] a legit moving company"
- **USDOT pages**: `/usdot/[number]` — "[USDOT Number] moving company lookup"
- **Guide pages**: `/guides/how-to-avoid-moving-scams`, `/guides/binding-vs-nonbinding-estimates`
- **City pages**: `/cities/[city]-[state]/movers` — "Best movers in [City] - verified reviews"
- **Schema.org markup**: LocalBusiness, Review, FAQPage structured data
- **Sitemap**: Auto-generated from company database

### Revenue Integration
- Stripe Checkout for one-time report purchase ($9.99)
- Payment verification before generating full report PDF
- Webhook handler for payment lifecycle events
- AdSense on free-tier pages (company summary, guides)

## Project Structure
```
movercheck/
  src/
    app/              # Next.js App Router pages and layouts
      layout.tsx      # Root layout with header/footer shell
      page.tsx        # Landing page with hero, search, stats, CTA
      globals.css     # Tailwind imports and CSS custom properties
    components/       # Reusable React components
    lib/              # Utility functions and helpers
      env.ts          # Environment variable accessors
      env.test.ts     # Tests for env helpers
      test-setup.ts   # Vitest setup file
    types/            # TypeScript type definitions
      index.ts        # Shared types (Company, TrustScore, FmcsaData, etc.)
  e2e/                # Playwright E2E tests
    smoke.spec.ts     # Basic smoke tests for landing page
  public/             # Static assets
  docs/               # Architecture and design documents
```

## Model & Effort
Always use Claude Opus 4.6 with max effort.

## LLM-Testable Design
All interactive elements include `data-testid` attributes for Playwright testing.
- `data-testid="header"` -- Page header
- `data-testid="nav"` -- Navigation bar
- `data-testid="logo-link"` -- Logo/home link
- `data-testid="nav-search"` -- Search movers nav link
- `data-testid="nav-guides"` -- Guides nav link
- `data-testid="nav-login"` -- Sign in button
- `data-testid="main-content"` -- Main content area
- `data-testid="footer"` -- Page footer
- `data-testid="hero-section"` -- Hero section
- `data-testid="hero-title"` -- Hero heading
- `data-testid="hero-subtitle"` -- Hero subheading
- `data-testid="search-form"` -- Search form
- `data-testid="search-input"` -- Search input field
- `data-testid="search-button"` -- Search submit button
- `data-testid="stats-section"` -- Statistics section
- `data-testid="how-it-works-section"` -- How it works section
- `data-testid="cta-section"` -- Bottom CTA section
- `data-testid="cta-search-button"` -- Bottom CTA button

Convention: All new interactive elements MUST include a `data-testid` attribute.

## Environment Variables
See `.env.example` for required variables:
- `NEXT_PUBLIC_SUPABASE_URL` -- Supabase project URL (client-accessible)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` -- Supabase anonymous key (client-accessible)
- `NEXT_PUBLIC_APP_URL` -- Public app URL (client-accessible)
- `STRIPE_SECRET_KEY` -- Stripe secret API key (server-only, NO NEXT_PUBLIC_ prefix)
- `TEST_MODE` -- Enable test mode (bypasses rate limits, enables test accounts)

## Version
0.1.0
