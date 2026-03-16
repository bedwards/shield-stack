# ClearFile — Background Check Error Dispute Tool

## Status: Planning Complete

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

## Model & Effort
Always use Claude Opus 4.6 with max effort.

## Build / Test / Deploy
```bash
# Install dependencies
bun install

# Development
bun dev                    # Next.js dev server on :3000

# Testing
bun test                   # Unit tests (vitest)
bun test:e2e               # Playwright E2E tests

# Linting & Formatting
bun lint                   # ESLint
bun format                 # Prettier

# Database
bun db:migrate             # Run Supabase migrations
bun db:seed                # Seed CRA directory data
bun db:reset               # Reset local Supabase

# Build & Deploy
bun build                  # Production build
vercel --prod              # Deploy to production
```

## Architecture

### Core Components
1. **Landing Page** — SEO-optimized, explains FCRA rights, CTA to start review
2. **Request Wizard** — Multi-step form: personal info -> select CRAs -> generate letters
3. **CRA Directory** — Browseable/searchable database of background check companies
4. **Report Upload** — Drag-and-drop PDF/image upload with OCR extraction
5. **Error Flagging UI** — Extracted report data vs. user truth data, checkbox flagging
6. **Dispute Generator** — Produces FCRA-compliant dispute letters per flagged error per CRA
7. **Tracker Dashboard** — Timeline view of all requests, responses, disputes, deadlines
8. **Monitoring Engine** — Cron-triggered re-check reminders and status updates

### Data Flow
```
User enters PII → encrypted at app layer → stored encrypted in Supabase
→ Generate request letters (PDF) → user downloads/mails to CRAs
→ User uploads received reports → parse/extract data points
→ User flags errors → generate dispute letters (PDF)
→ Track 30-day FCRA deadlines → alert on approaching deadlines
→ Monitoring: periodic reminders to re-request and verify corrections
```

## Data Model

### Key Tables
- `users` — Supabase Auth managed
- `user_profiles` — encrypted PII (name, DOB, SSN_encrypted, addresses)
- `cra_companies` — background check company directory (name, address, fax, website, submission_method)
- `disclosure_requests` — user -> CRA request tracking (status, sent_date, response_due_date, response_received_date)
- `uploaded_reports` — storage refs to uploaded PDFs, extracted_data JSONB
- `report_items` — individual line items extracted from reports (record_type, details, source)
- `truth_data` — user-provided correct information for comparison
- `error_flags` — flagged discrepancies between report_items and truth_data
- `dispute_letters` — generated dispute letters (CRA, error_flags referenced, status, sent_date)
- `subscriptions` — Stripe subscription tracking for monitoring tier

## SECURITY — CRITICAL
- **SSN is field-level encrypted** using pgcrypto `pgp_sym_encrypt()` with a key from environment variables, NEVER from client-accessible config
- **PII is NEVER logged** — all logging middleware strips sensitive fields
- **Minimal retention** — SSN is only needed for letter generation, encrypted at rest, decrypted only in server-side functions
- **RLS enforced** — every table has row-level security; users can only access their own data
- **No client-side PII** — SSN and sensitive data never sent to the browser after initial submission
- **Supabase Storage** — uploaded reports are in private buckets with RLS
- **HTTPS only** — enforced at Vercel edge

## External APIs & Services
- **Supabase** — Database, Auth, Storage (no external background check APIs — CRAs don't have public APIs)
- **Stripe** — Payment processing
- **Claude API** — (Future) Intelligent report parsing and error detection
- **Vercel** — Hosting and edge functions

## Version
0.0.0
