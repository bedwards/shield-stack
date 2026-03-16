# FAFSAcopilot — Real-Time FAFSA Error Catcher & Aid Negotiator

## Status: Scaffold Complete

## Product Overview

FAFSAcopilot is a two-phase product that helps families maximize financial aid. Phase 1 is a real-time copilot that watches as users fill out the FAFSA, catching errors and optimizing answers before submission. Phase 2 adds aid negotiation: after receiving award letters, users can generate professional appeal letters to schools. The seasonal peak is January through April when FAFSA applications open.

### Target User
- High school seniors and their parents filling out FAFSA for the first time
- Current college students re-filing annually
- Independent students navigating complex financial situations
- Families who feel they received inadequate financial aid and want to appeal
- Anyone Googling "FAFSA help" or "FAFSA mistakes to avoid"

### MVP Features (v0.1)
1. **FAFSA Field Validator** — Real-time validation of FAFSA field values against known rules
2. **Error Checker Dashboard** — Step-by-step review of FAFSA answers with warnings and suggestions
3. **AI Optimization Tips** — Claude API analyzes answers for missed opportunities
4. **School Aid Comparison** — Compare expected aid packages across selected schools using IPEDS data
5. **Appeal Letter Generator** (Phase 2, premium) — AI-generated financial aid appeal letters customized per school
6. **Award Letter Analyzer** (Phase 2, premium) — Upload award letter, get breakdown and comparison
7. **SEO Landing Pages** — "FAFSA mistakes to avoid", "How to appeal financial aid", per-school pages

### Revenue Model
- **Free**: FAFSA error checker, basic field validation, general tips
- **Premium ($19.99/school)**: Appeal letter generation, award letter analysis, school-specific aid statistics
- Stripe for one-time per-school payments

## Tech Stack & Rationale

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Next.js 15 (App Router) | SSR for SEO pages, complex form UI with React |
| Database | Supabase (Postgres + Auth + Storage) | Store FAFSA field rules, user sessions, appeal letters; RLS for user data isolation |
| Auth | Supabase Auth | Email + Google OAuth, needed for saving progress and premium features |
| Payments | Stripe | One-time per-school payments for appeal letters |
| Deploy | Vercel | Edge rendering for fast form validation, preview deploys |
| Package Manager | bun | Fast installs, native TypeScript |
| AI | Claude API | Error detection, optimization suggestions, appeal letter generation |
| Data Source | IPEDS (Integrated Postsecondary Education Data System) | School-specific financial aid statistics |
| PDF Generation | @react-pdf/renderer | Generate downloadable appeal letters as PDFs |

## Build / Test / Deploy

```bash
cd fafsacopilot
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
bun run db:seed          # Seed FAFSA rules data
bun run db:types         # Generate TypeScript types from Supabase schema
```

## Architecture

### High-Level Components
1. **Web App (Next.js)** — SEO landing pages + interactive FAFSA copilot form UI
2. **API Routes (Next.js Route Handlers)** — Validation engine, AI analysis, letter generation
3. **Supabase Backend** — Postgres for rules DB, Auth, Storage for uploaded award letters
4. **Claude API** — Error analysis, optimization suggestions, appeal letter drafting
5. **IPEDS Data Pipeline** — Imported school financial aid statistics for comparison

### Data Model

**fafsa_fields** — FAFSA form field definitions and validation rules
- `id` (uuid, PK), `field_name` (text, unique), `section` (text), `field_type` (enum: text, number, currency, date, select), `label` (text), `help_text` (text), `validation_rules` (jsonb), `common_errors` (jsonb), `optimization_tips` (jsonb), `created_at` (timestamptz), `updated_at` (timestamptz)

**schools** — School directory with aid statistics from IPEDS
- `id` (uuid, PK), `ipeds_id` (text, unique), `name` (text), `state` (text), `city` (text), `type` (enum: public, private_nonprofit, private_forprofit), `avg_net_price` (integer), `avg_aid_package` (integer), `pct_receiving_aid` (numeric), `acceptance_rate` (numeric), `appeal_success_notes` (text), `updated_at` (timestamptz)

**user_sessions** — Saved FAFSA review sessions
- `id` (uuid, PK), `user_id` (uuid, FK->auth.users), `session_name` (text), `fafsa_data` (jsonb, encrypted), `validation_results` (jsonb), `ai_suggestions` (jsonb), `target_schools` (jsonb), `status` (enum: in_progress, reviewed, submitted), `created_at` (timestamptz), `updated_at` (timestamptz)

**appeal_letters** — Generated appeal letters
- `id` (uuid, PK), `user_id` (uuid, FK->auth.users), `session_id` (uuid, FK->user_sessions), `school_id` (uuid, FK->schools), `letter_content` (text), `letter_pdf_url` (text, nullable), `special_circumstances` (text), `status` (enum: draft, finalized, sent), `created_at` (timestamptz), `updated_at` (timestamptz)

**award_letters** — Uploaded award letter analysis
- `id` (uuid, PK), `user_id` (uuid, FK->auth.users), `school_id` (uuid, FK->schools), `upload_url` (text), `parsed_data` (jsonb), `ai_analysis` (jsonb), `total_cost` (integer), `total_aid` (integer), `net_cost` (integer), `created_at` (timestamptz)

**profiles** — Extended user profile
- `id` (uuid, PK, FK->auth.users), `display_name` (text), `graduation_year` (integer), `dependency_status` (enum: dependent, independent), `stripe_customer_id` (text, nullable), `purchases` (jsonb), `created_at` (timestamptz), `updated_at` (timestamptz)

**payments** — Per-school payment records
- `id` (uuid, PK), `user_id` (uuid, FK->auth.users), `school_id` (uuid, FK->schools), `stripe_payment_intent_id` (text), `amount_cents` (integer), `status` (enum: pending, completed, refunded), `created_at` (timestamptz)

### API Routes
- `POST /api/validate` — Validate FAFSA field values against rules database
- `POST /api/analyze` — AI analysis of complete FAFSA answers for optimization
- `GET /api/schools/search?q=` — Search schools by name
- `GET /api/schools/[id]/aid-stats` — Get school aid statistics from IPEDS data
- `POST /api/appeal/generate` — Generate appeal letter for a school (premium, auth required)
- `POST /api/award-letter/upload` — Upload and analyze award letter (premium, auth required)
- `GET /api/sessions` — List user's saved sessions (auth required)
- `POST /api/sessions` — Create/update session (auth required)
- `POST /api/webhooks/stripe` — Stripe webhook for payment events
- `POST /api/compare` — Compare aid packages across multiple schools

### SEO Strategy
- **Guide pages**: `/guides/fafsa-mistakes`, `/guides/financial-aid-appeal`, `/guides/fafsa-[year]-changes`
- **School pages**: `/schools/[slug]` — "[School] financial aid statistics and tips"
- **FAQ pages**: `/faq/fafsa-[topic]` — "What happens if I make a mistake on FAFSA"
- **State pages**: `/states/[state]/financial-aid` — "[State] financial aid programs"
- **Schema.org markup**: FAQPage, HowTo, EducationalOrganization structured data
- **Sitemap**: Auto-generated from school database

### Revenue Integration
- Stripe Checkout for per-school appeal letter purchase ($19.99)
- Payment verification before generating premium content
- Webhook handler for payment lifecycle events
- Free tier has no paywall for error checking features

### Seasonal Considerations
- Peak traffic: January through April (FAFSA opens October 1, priority deadlines in Feb-Mar)
- Content calendar: Update guides each October when new FAFSA opens
- IPEDS data refresh: Annual, typically available in fall
- Marketing push: December through February

## Version
0.1.0

## Model & Effort
Always use Claude Opus 4.6 with max effort.

## LLM-Testability
- All interactive elements have `data-testid` attributes
- `TEST_MODE=true` env var enables test accounts and bypasses rate limits
- Test seed data includes sample FAFSA fields and school data
- Mock Claude API responses in test mode for deterministic validation
- No CAPTCHAs in test/preview environments
- E2E tests in `e2e/` directory using Playwright
