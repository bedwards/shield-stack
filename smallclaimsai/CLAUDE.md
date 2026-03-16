# SmallClaimsAI — Nationwide Small Claims Court Guide

## Status: Scaffold Complete

## Product Overview

SmallClaimsAI guides users through the entire small claims court process from filing to judgment collection. Enter your state and describe your dispute, and it generates all required court documents, provides step-by-step guidance specific to your jurisdiction, and helps with hearing preparation. The core SEO play: "How to file small claims court [state]."

### Target User
- Individuals with disputes under the small claims limit (landlord issues, contractor disputes, property damage)
- Small business owners pursuing unpaid invoices
- Anyone considering small claims but intimidated by the process
- People who've won judgments but can't collect
- Anyone Googling "how to file small claims court [state]" or "small claims court [state] limit"

### MVP Features (v0.1)
1. **Case Intake Wizard** — Guided questionnaire: state, dispute type, amount, parties, evidence
2. **State Rules Engine** — All 50 states + DC: filing limits, fees, service requirements, deadlines
3. **Document Generator** — AI-generated complaint, demand letter, service affidavit, subpoena
4. **Step-by-Step Process Guide** — Filing -> service -> hearing prep -> hearing -> judgment collection
5. **Court Form Auto-Fill** — Generate state-specific court forms (PDF)
6. **Hearing Preparation** — AI-generated talking points, evidence organization, Q&A prep
7. **Judgment Collection Guide** (premium upsell) — Post-judgment tools: garnishment, lien filing
8. **SEO Landing Pages** — Per-state guides: "How to file small claims court in [state]"

### Revenue Model
- **Per case ($29.99)**: Full document package + step-by-step guide for one case
- **Collection tools upsell ($14.99)**: Judgment collection guide and documents
- Stripe for one-time payments

## Tech Stack & Rationale

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Next.js 15 (App Router) | SSR for SEO state pages, complex multi-step form UI |
| Database | Supabase (Postgres + Auth + Storage) | Store state rules (50+DC), user cases, generated documents; RLS for case isolation |
| Auth | Supabase Auth | Email + Google OAuth, needed for case persistence and document access |
| Payments | Stripe | Per-case and upsell payments |
| Deploy | Vercel | Edge functions, preview deploys |
| Package Manager | bun | Fast installs, native TypeScript |
| AI | Claude API | Document generation, hearing prep, legal language drafting |
| PDF Generation | @react-pdf/renderer + pdf-lib | Generate court forms, demand letters, complaint documents |

## Build / Test / Deploy

```bash
cd smallclaimsai
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
bun run db:seed          # Seed state rules data
bun run db:types         # Generate TypeScript types from Supabase schema
```

## Architecture

### High-Level Components
1. **Web App (Next.js)** — SEO state pages + interactive case intake wizard and document viewer
2. **API Routes (Next.js Route Handlers)** — Case management, document generation, state rules lookup
3. **Supabase Backend** — Postgres for state rules database, Auth, Storage for generated PDFs
4. **Claude API** — Document generation (complaints, demand letters, hearing prep)
5. **PDF Engine** — Court form filling (pdf-lib for form fields) + document generation (@react-pdf/renderer)

### Data Model

**states** — Jurisdiction-level rules and requirements
- `id` (uuid, PK), `code` (text, unique, indexed), `name` (text), `slug` (text, unique), `small_claims_limit` (integer), `filing_fee_min` (integer), `filing_fee_max` (integer), `statute_of_limitations` (jsonb), `service_requirements` (jsonb), `appeal_rules` (jsonb), `court_name` (text), `court_website` (text, nullable), `special_rules` (jsonb), `created_at` (timestamptz), `updated_at` (timestamptz)

**counties** — County-specific court info within states
- `id` (uuid, PK), `state_id` (uuid, FK->states), `name` (text), `court_address` (jsonb), `court_phone` (text, nullable), `court_hours` (text, nullable), `filing_url` (text, nullable), `local_rules` (jsonb, nullable), `created_at` (timestamptz)

**dispute_types** — Common dispute categories with state-specific guidance
- `id` (uuid, PK), `name` (text), `slug` (text, unique), `description` (text), `common_evidence` (jsonb), `typical_damages` (jsonb), `success_factors` (jsonb), `created_at` (timestamptz)

**cases** — User's small claims cases
- `id` (uuid, PK), `user_id` (uuid, FK->auth.users), `state_id` (uuid, FK->states), `county_id` (uuid, FK->counties, nullable), `dispute_type_id` (uuid, FK->dispute_types), `case_name` (text), `plaintiff_info` (jsonb), `defendant_info` (jsonb), `dispute_description` (text), `amount_claimed` (integer), `evidence_summary` (jsonb), `timeline_of_events` (jsonb), `status` (enum: intake, documents_generated, filed, served, hearing_scheduled, completed), `current_step` (integer), `stripe_payment_intent_id` (text, nullable), `created_at` (timestamptz), `updated_at` (timestamptz)

**documents** — Generated legal documents per case
- `id` (uuid, PK), `case_id` (uuid, FK->cases), `document_type` (enum: demand_letter, complaint, service_affidavit, subpoena, hearing_prep, collection_letter, garnishment_request), `content` (text), `pdf_url` (text, nullable), `version` (integer, default 1), `created_at` (timestamptz), `updated_at` (timestamptz)

**process_steps** — State-specific step-by-step process definitions
- `id` (uuid, PK), `state_id` (uuid, FK->states), `step_number` (integer), `phase` (enum: pre_filing, filing, service, hearing, post_judgment), `title` (text), `description` (text), `instructions` (jsonb), `required_documents` (jsonb), `deadline_rules` (jsonb), `tips` (jsonb), `created_at` (timestamptz)

**profiles** — Extended user profile
- `id` (uuid, PK, FK->auth.users), `display_name` (text), `stripe_customer_id` (text, nullable), `created_at` (timestamptz), `updated_at` (timestamptz)

### API Routes
- `GET /api/states` — List all states with small claims limits
- `GET /api/states/[code]` — Get state rules and filing requirements
- `GET /api/states/[code]/counties` — Get counties in a state
- `GET /api/states/[code]/steps` — Get step-by-step process for a state
- `GET /api/dispute-types` — List common dispute types
- `POST /api/cases` — Create a new case (auth + payment required)
- `GET /api/cases` — List user's cases (auth required)
- `GET /api/cases/[id]` — Get case details (auth required)
- `PUT /api/cases/[id]` — Update case details (auth required)
- `POST /api/cases/[id]/documents/generate` — Generate documents for a case
- `GET /api/cases/[id]/documents` — List documents for a case
- `GET /api/cases/[id]/documents/[docId]/pdf` — Download document PDF
- `POST /api/cases/[id]/hearing-prep` — Generate hearing preparation materials
- `POST /api/cases/[id]/collection` — Generate collection documents (upsell)
- `POST /api/webhooks/stripe` — Stripe webhook for payment events

### SEO Strategy
- **State pages**: `/states/[state]` — "How to file small claims court in [State]"
- **State + dispute pages**: `/states/[state]/[dispute-type]` — "Small claims court [State] for [dispute]"
- **Limit pages**: `/states/[state]/limits` — "[State] small claims court dollar limit"
- **Guide pages**: `/guides/demand-letter`, `/guides/serving-papers`, `/guides/collecting-judgment`
- **FAQ pages**: `/faq/[topic]` — "Can I sue in small claims court for [X]"
- **Schema.org markup**: FAQPage, HowTo, LegalService structured data
- **Sitemap**: Auto-generated from state and dispute type database

### Revenue Integration
- Stripe Checkout for per-case payment ($29.99)
- Stripe Checkout for collection tools upsell ($14.99)
- Payment required before document generation
- Webhook handler for payment lifecycle events
- Case access persists indefinitely after purchase

## Project Structure
```
smallclaimsai/
  src/
    app/              # Next.js App Router pages and layouts
      layout.tsx      # Root layout with header/footer shell
      page.tsx        # Landing page with hero, features, CTA
      globals.css     # Tailwind imports and CSS custom properties
    components/       # Reusable React components
    lib/              # Utility functions and helpers
      env.ts          # Environment variable accessors
      env.test.ts     # Tests for env helpers
      test-setup.ts   # Vitest setup file
    types/            # TypeScript type definitions
      index.ts        # Shared types (Case, Document, State, etc.)
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
- `data-testid="nav-states"` -- State guides nav link
- `data-testid="nav-start"` -- Start a case nav link
- `data-testid="nav-login"` -- Sign in button
- `data-testid="main-content"` -- Main content area
- `data-testid="footer"` -- Page footer
- `data-testid="hero-section"` -- Hero section
- `data-testid="hero-title"` -- Hero heading
- `data-testid="hero-subtitle"` -- Hero subheading
- `data-testid="hero-cta"` -- Hero CTA button group
- `data-testid="cta-start-button"` -- Start Your Case button
- `data-testid="cta-states-button"` -- Browse State Guides button
- `data-testid="stats-section"` -- Statistics section
- `data-testid="how-it-works-section"` -- How it works section
- `data-testid="features-section"` -- Features grid section
- `data-testid="cta-section"` -- Bottom CTA section
- `data-testid="cta-bottom-button"` -- Bottom CTA button

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
