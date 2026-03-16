# ParkFight — Trustworthy Parking Ticket Dispute Automation

## Status: Scaffold Complete

## Product Overview

ParkFight lets users upload a photo of their parking ticket, extracts the violation details via OCR, analyzes dismissal grounds using AI and city-specific traffic codes, and generates a ready-to-submit dispute letter. It also publishes verified win-rate data by city and violation type, building trust through transparency. The core SEO play: "How to fight parking ticket [city]."

### Target User
- Anyone who received a parking ticket they believe is unfair (30M+ tickets/year in the US)
- Frequent parkers in cities with aggressive enforcement
- Rideshare/delivery drivers who accumulate tickets
- Anyone Googling "how to fight parking ticket [city]" or "parking ticket dismissal"

### MVP Features (v0.1)
1. **Ticket Photo Upload** — Drag-and-drop or camera capture of parking ticket
2. **OCR Data Extraction** — Tesseract.js extracts violation code, date, location, fine amount
3. **AI Violation Analysis** — Claude API analyzes violation against city-specific dismissal grounds
4. **Dispute Letter Generator** — AI-generated formal dispute letter citing relevant codes
5. **City-Specific Rules Database** — Traffic codes and dismissal grounds by city
6. **Win Rate Dashboard** — Aggregated, anonymized outcome data by city and violation type
7. **SEO Landing Pages** — "How to fight a parking ticket in [city]" for top 100 cities
8. **Outcome Tracking** — Users report whether their dispute succeeded or failed

### Revenue Model
- **Free**: First dispute letter free (to build the dataset and word-of-mouth)
- **Paid ($4.99/dispute)**: Subsequent dispute letters
- Stripe for one-time per-dispute payments

## Tech Stack & Rationale

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Next.js 15 (App Router) | SSR for SEO city pages, React for upload/analysis UI |
| Database | Supabase (Postgres + Auth + Storage) | Store tickets, letters, city rules, outcomes; Storage for ticket photos |
| Auth | Supabase Auth | Email + Google OAuth, tracks free vs paid disputes |
| Payments | Stripe | Per-dispute payments |
| Deploy | Vercel | Edge functions, image optimization, preview deploys |
| Package Manager | bun | Fast installs, native TypeScript |
| OCR | Tesseract.js | Client-side ticket text extraction, no server costs |
| AI Analysis | Claude API | Violation analysis, dismissal ground identification, letter generation |
| PDF Generation | @react-pdf/renderer | Generate downloadable dispute letter PDFs |

## Build / Test / Deploy

```bash
cd parkfight
bun install              # Install dependencies
bun run dev              # Start dev server (localhost:3000)
bun run build            # Production build
bun run lint             # ESLint
bun run test             # Run Vitest unit/integration tests (NEVER use `bun test`)
bun run test:e2e         # Run Playwright E2E tests
bun run test:e2e:ui      # Playwright E2E with UI mode
```

**IMPORTANT:** Always use `bun run test` (NOT `bun test`).

## Architecture

### High-Level Components
1. **Web App (Next.js)** — SEO city pages + ticket upload/analysis SPA
2. **API Routes (Next.js Route Handlers)** — OCR processing, AI analysis, letter generation, outcome tracking
3. **Supabase Backend** — Postgres for city rules and tickets, Auth, Storage for ticket photos and letter PDFs
4. **Claude API** — Violation analysis, dismissal ground identification, dispute letter drafting
5. **Tesseract.js** — Client-side OCR for ticket data extraction

### Data Model

**cities** — City-specific parking enforcement data
- `id` (uuid, PK), `name` (text), `state` (text), `slug` (text, unique, indexed), `parking_authority` (text), `dispute_process` (jsonb), `dispute_deadline_days` (integer), `dispute_submission_methods` (jsonb), `website_url` (text, nullable), `created_at` (timestamptz), `updated_at` (timestamptz)

**violation_codes** — City-specific violation types and dismissal grounds
- `id` (uuid, PK), `city_id` (uuid, FK->cities), `code` (text), `description` (text), `fine_amount` (integer), `dismissal_grounds` (jsonb), `relevant_statutes` (jsonb), `defense_strategies` (jsonb), `created_at` (timestamptz), `updated_at` (timestamptz)

**tickets** — User-submitted parking tickets
- `id` (uuid, PK), `user_id` (uuid, FK->auth.users), `city_id` (uuid, FK->cities, nullable), `violation_code_id` (uuid, FK->violation_codes, nullable), `ticket_number` (text, nullable), `photo_url` (text), `ocr_data` (jsonb), `violation_date` (date, nullable), `fine_amount` (integer, nullable), `location` (text, nullable), `status` (enum: uploaded, analyzed, disputed, resolved), `created_at` (timestamptz), `updated_at` (timestamptz)

**dispute_letters** — Generated dispute letters
- `id` (uuid, PK), `ticket_id` (uuid, FK->tickets), `user_id` (uuid, FK->auth.users), `letter_content` (text), `letter_pdf_url` (text, nullable), `ai_analysis` (jsonb), `dismissal_grounds_cited` (jsonb), `statutes_cited` (jsonb), `is_free` (boolean), `stripe_payment_intent_id` (text, nullable), `created_at` (timestamptz)

**outcomes** — User-reported dispute outcomes
- `id` (uuid, PK), `ticket_id` (uuid, FK->tickets), `dispute_letter_id` (uuid, FK->dispute_letters), `result` (enum: dismissed, reduced, denied, pending), `reduced_amount` (integer, nullable), `notes` (text, nullable), `reported_at` (timestamptz)

**win_rates** — Aggregated win rate statistics (materialized)
- `id` (uuid, PK), `city_id` (uuid, FK->cities), `violation_code_id` (uuid, FK->violation_codes, nullable), `total_disputes` (integer), `total_dismissed` (integer), `total_reduced` (integer), `total_denied` (integer), `win_rate` (numeric), `avg_savings` (integer), `updated_at` (timestamptz)

**profiles** — Extended user profile
- `id` (uuid, PK, FK->auth.users), `display_name` (text), `stripe_customer_id` (text, nullable), `free_disputes_used` (integer, default 0), `created_at` (timestamptz), `updated_at` (timestamptz)

### API Routes
- `POST /api/tickets/upload` — Upload ticket photo, run OCR (auth required)
- `POST /api/tickets/[id]/analyze` — AI analysis of ticket violation and dismissal grounds
- `POST /api/tickets/[id]/generate-letter` — Generate dispute letter (checks free vs paid)
- `GET /api/tickets` — List user's tickets (auth required)
- `GET /api/tickets/[id]` — Get ticket details and analysis
- `POST /api/outcomes` — Report dispute outcome (auth required)
- `GET /api/cities/[slug]` — Get city parking rules and win rates
- `GET /api/cities/[slug]/win-rates` — Get win rate statistics for a city
- `GET /api/violation-codes/[city-slug]` — Get violation codes for a city
- `POST /api/webhooks/stripe` — Stripe webhook for payment events

### SEO Strategy
- **City pages**: `/cities/[city]-[state]` — "How to fight a parking ticket in [City]"
- **Violation pages**: `/cities/[city]-[state]/[violation]` — "Fight [violation] ticket in [City]"
- **Guide pages**: `/guides/parking-ticket-dispute-tips`, `/guides/common-dismissal-grounds`
- **Win rate pages**: `/win-rates/[city]` — "[City] parking ticket dismissal rates"
- **Schema.org markup**: FAQPage, HowTo, LocalBusiness structured data
- **Sitemap**: Auto-generated from city and violation database

### Revenue Integration
- Stripe Checkout for per-dispute payment ($4.99)
- First dispute is free (tracked via `free_disputes_used` on profile)
- Payment verification before generating paid dispute letters
- Webhook handler for payment lifecycle events

## Version
0.1.0

## Model & Effort
Always use Claude Opus 4.6 with max effort.

## LLM-Testability
- All interactive elements have `data-testid` attributes
- `TEST_MODE=true` env var enables test accounts, mock OCR results, and bypasses rate limits
- Test seed data includes sample tickets with known violations and city rules
- Mock Claude API responses in test mode for deterministic analysis
- No CAPTCHAs in test/preview environments
- E2E tests in `e2e/` directory using Playwright
