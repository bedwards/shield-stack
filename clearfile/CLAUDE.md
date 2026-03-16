# ClearFile — Background Check Error Dispute Tool

## Status: Scaffold Complete

## Product Overview
ClearFile helps people discover, dispute, and correct errors in their background check reports. Users enter basic identifying information, and ClearFile generates FCRA-compliant request letters to all major background check companies (consumer reporting agencies, or CRAs). When reports come back, users can flag errors and generate legally proper dispute letters. The system tracks the entire dispute lifecycle across multiple companies.

### Target User
Anyone who has been denied a job, housing, or credit due to inaccurate background check information. Common scenarios: wrong criminal records, outdated eviction records, mixed-file errors (another person's records on your report), incorrect employment history.

### MVP Features
1. **Background Check Request Generator** — Enter name/DOB/address, generate FCRA Section 612 disclosure request letters for all major CRAs
2. **CRA Directory** — Comprehensive database of background check companies (Checkr, Sterling, HireRight, CoreLogic, First Advantage, Accurate Background, GoodHire, etc.) with contact info, mailing addresses, fax numbers
3. **Report Upload & Parsing** — Upload received background check reports (PDF/image), extract key data points
4. **Error Flagging** — Side-by-side comparison tool to flag inaccuracies against user-provided truth data
5. **Dispute Letter Generator** — FCRA Section 611 dispute letters tailored to each error type and each CRA
6. **Request Tracker** — Dashboard tracking status of all requests and disputes across companies with deadline alerts (CRAs have 30 days to respond under FCRA)
7. **Monitoring Subscription** — Periodic re-checks to verify corrections were made and no new errors appeared

### Revenue Model
- **One-time review**: $19.99 — generates all request letters, one round of dispute letters
- **Monthly monitoring**: $9.99/mo — automated re-checks, ongoing dispute support, new CRA coverage

### SEO Strategy
- Primary: "background check wrong information", "how to dispute background check"
- Long-tail: "background check shows someone else's record", "FCRA dispute letter template", "how to get a copy of your background check", "background check error cost me a job"
- Programmatic: `/companies/{cra-slug}` pages for each background check company
- Content: FCRA rights guide, state-specific background check laws, dispute letter examples

## Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js 15 (App Router) | SSR/SSG for SEO, React Server Components for secure server-side PII handling |
| Database | Supabase (Postgres) | Row-level security for user data isolation, pgcrypto for field-level encryption |
| Auth | Supabase Auth | Email + OAuth, RLS policies tie data to authenticated user |
| Storage | Supabase Storage | Uploaded background check report PDFs, generated letter PDFs |
| Payments | Stripe | Checkout Sessions for one-time, Subscriptions for monitoring |
| Deploy | Vercel | Edge functions for fast response, preview deploys for QA |
| PDF Generation | @react-pdf/renderer | Server-side PDF generation for dispute letters |
| Encryption | pgcrypto + Node crypto | Field-level encryption for SSN and other PII at rest |
| Package Manager | bun | Fast installs, native TypeScript |
| Testing | Vitest + Playwright | Unit/integration + E2E |
| Styling | Tailwind CSS 4 | Utility-first, fast iteration |

## Model & Effort
Always use Claude Opus 4.6 with max effort.

## Build / Test / Deploy
```bash
cd clearfile
bun install              # Install dependencies
bun run dev              # Start dev server (localhost:3003)
bun run test             # Run Vitest unit/integration tests (NOT bun test!)
bun run test:e2e         # Run Playwright E2E tests
bun run build            # Production build
bun run lint             # ESLint check
bun run db:migrate       # Run Supabase migrations (future)
bun run db:seed          # Seed CRA directory data (future)
```

**IMPORTANT**: Always use `bun run test` (which runs vitest via package.json script), NOT `bun test` (which invokes Bun's native test runner and will pick up Playwright files incorrectly).

## Project Structure
```
clearfile/
  src/
    app/              # Next.js App Router pages and layouts
      layout.tsx      # Root layout with header/footer shell
      page.tsx        # Landing page with hero, stats, features
      globals.css     # Tailwind imports and CSS custom properties
    components/       # Reusable React components
    lib/              # Utility functions and helpers
      env.ts          # Environment variable accessors
      test-setup.ts   # Vitest setup file
      disputes/       # FCRA dispute letter generation
      cra/            # CRA directory and contact management
    types/            # TypeScript type definitions
      index.ts        # Shared types (CRACompany, DisclosureRequest, ErrorFlag, etc.)
  e2e/                # Playwright E2E tests
    smoke.spec.ts     # Basic smoke tests for landing page
  public/             # Static assets
  docs/               # Architecture and design documents
```

## Architecture Decisions

### FCRA Letter Generation
- **Disclosure requests**: FCRA Section 612 requires CRAs to provide a copy of your file upon request. Letters include name, DOB, address, SSN (last 4 only in letter body).
- **Dispute letters**: FCRA Section 611 requires CRAs to investigate disputes within 30 days. Letters identify each error, provide correct information, and reference supporting documentation.
- **PDF output**: Server-side PDF generation via @react-pdf/renderer. Letters formatted for standard letter paper with proper legal language.

### CRA Directory
- **Comprehensive database**: 40+ background check companies with complete contact information.
- **Submission methods**: Each CRA has preferred submission (mail, fax, online portal, email).
- **SEO pages**: Each CRA gets its own `/companies/{slug}` page for programmatic SEO.

### Report Parsing
- **PDF/image upload**: Users upload received background check reports to Supabase Storage.
- **Data extraction**: Extract key data points (records, dates, identifiers) for error comparison.
- **Manual correction**: Users can correct extraction errors before flagging inaccuracies.

### Dispute Lifecycle Tracking
- **Status tracking**: Each disclosure request and dispute letter has a status timeline.
- **30-day deadlines**: FCRA requires CRA response within 30 days. Auto-calculated due dates with alerts.
- **Multi-CRA coordination**: Track disputes across multiple CRAs simultaneously.

## Data Model Overview
- `users` — Supabase Auth managed
- `user_profiles` — encrypted PII (name, DOB, SSN_encrypted, addresses)
- `cra_companies` — background check company directory
- `disclosure_requests` — user -> CRA request tracking with deadlines
- `uploaded_reports` — storage refs to uploaded PDFs, extracted_data JSONB
- `report_items` — individual line items extracted from reports
- `truth_data` — user-provided correct information for comparison
- `error_flags` — flagged discrepancies between report_items and truth_data
- `dispute_letters` — generated dispute letters with status tracking
- `subscriptions` — Stripe subscription tracking for monitoring tier

## SECURITY — CRITICAL
- **SSN is field-level encrypted** using pgcrypto `pgp_sym_encrypt()` with a key from environment variables, NEVER from client-accessible config
- **PII is NEVER logged** — all logging middleware strips sensitive fields
- **Minimal retention** — SSN is only needed for letter generation, encrypted at rest, decrypted only in server-side functions
- **RLS enforced** — every table has row-level security; users can only access their own data
- **No client-side PII** — SSN and sensitive data never sent to the browser after initial submission
- **Supabase Storage** — uploaded reports are in private buckets with RLS
- **HTTPS only** — enforced at Vercel edge

## LLM-Testable Design
All interactive elements include `data-testid` attributes for Playwright testing.
- `data-testid="header"` — Page header
- `data-testid="nav"` — Navigation bar
- `data-testid="logo-link"` — Logo/home link
- `data-testid="nav-dashboard"` — Dashboard nav link
- `data-testid="nav-companies"` — CRA Directory nav link
- `data-testid="nav-login"` — Sign in button
- `data-testid="main-content"` — Main content area
- `data-testid="footer"` — Page footer
- `data-testid="hero-section"` — Hero section
- `data-testid="hero-title"` — Hero heading
- `data-testid="hero-subtitle"` — Hero subheading
- `data-testid="cta-start-review"` — Start review CTA button
- `data-testid="cta-learn-rights"` — Learn rights CTA button
- `data-testid="stats-section"` — Statistics section
- `data-testid="stat-errors-found"` — Errors found stat
- `data-testid="stat-disputes-filed"` — Disputes filed stat
- `data-testid="stat-companies-covered"` — Companies covered stat
- `data-testid="how-it-works-section"` — How it works section
- `data-testid="step-request"` — Step 1: Request
- `data-testid="step-flag"` — Step 2: Flag
- `data-testid="step-dispute"` — Step 3: Dispute
- `data-testid="features-section"` — Features section
- `data-testid="cta-section"` — Bottom CTA section
- `data-testid="cta-start-button"` — Get started button

Convention: All new interactive elements MUST include a `data-testid` attribute.

## Environment Variables
See `.env.example` for required variables:
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL (client-side accessible)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anonymous key (client-side accessible)
- `STRIPE_SECRET_KEY` — Stripe secret API key (server-only)
- `TEST_MODE` — Enable test mode (bypasses rate limits, enables test accounts)
- `NEXT_PUBLIC_APP_URL` — Public app URL (client-side accessible)

**IMPORTANT**: Any environment variable accessed in client components or browser code MUST be prefixed with `NEXT_PUBLIC_`. Server-only secrets (like `STRIPE_SECRET_KEY`) do NOT get the prefix.

## Version
0.1.0
