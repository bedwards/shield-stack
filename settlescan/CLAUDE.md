# SettleScan — Class Action Settlement Auto-Match & Claim Filer

## Status: Scaffold Complete

## Product Overview
SettleScan connects to a user's email (read-only Gmail OAuth), scans for class action settlement notifications and purchase receipts, cross-references against a database of active settlements, and helps users file claims for settlements they qualify for. Most people miss class action settlements worth $5-500 because they ignore emails or never check. SettleScan catches the money they are owed.

### Target User
Any consumer who buys products/services and might be eligible for class action settlements. Especially: people who get settlement emails and ignore them, people who never check if they qualify for open settlements, anyone who wants passive income recovery from corporate misconduct.

### MVP Features
1. **Gmail OAuth Connection** — Read-only email access to scan for settlement notifications and purchase receipts
2. **Settlement Database** — Curated database of active class action settlements scraped from TopClassActions.com, ClassAction.org, and court settlement websites
3. **AI Email Parser** — Claude API to parse settlement notification emails, extract deadlines, eligibility criteria, claim URLs
4. **Purchase History Extraction** — Parse order confirmation emails to build purchase history for matching
5. **Settlement Matching** — Cross-reference user's purchase history and demographics against active settlements
6. **Claim Filing Assistant** — Guided flow to file claims: pre-fill forms with user data, provide proof of purchase links
7. **Payment Tracker** — Track filed claims through to payment, show total recovered amount
8. **Settlement Alerts** — Notify users of new settlements matching their profile

### Revenue Model
- **Success fee**: 15-25% of settlements recovered (user pays nothing upfront)
- Users see potential value before connecting email, building trust
- Revenue only when the user actually receives settlement money

### SEO Strategy
- Primary: "class action settlements I can claim", "open class action settlements"
- Long-tail: "how to file class action claim", "class action settlement check", "unclaimed class action money"
- Programmatic: `/settlements/{settlement-slug}` pages for each active settlement
- Content: "How class action settlements work" guide, monthly "new settlements" roundup, "biggest settlements you missed"

## Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js 15 (App Router) | SSR/SSG for settlement directory SEO, App Router for dashboard |
| Database | Supabase (Postgres) | RLS for user data isolation, JSONB for flexible email parsed data |
| Auth | Supabase Auth | Email signup + Google OAuth (reuse Google auth for Gmail access) |
| Storage | Supabase Storage | Cached email attachments, proof of purchase documents |
| Payments | Stripe | Connect for receiving settlement funds, standard for fee collection |
| AI | Claude API | Email parsing, settlement matching, eligibility determination |
| Deploy | Vercel | Main app + cron functions for email scanning |
| Email | Gmail API | Read-only OAuth for email scanning |
| Package Manager | bun | Fast installs, native TypeScript |

## Model & Effort
Always use Claude Opus 4.6 with max effort.

## Build / Test / Deploy
```bash
cd settlescan
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
bun run db:seed          # Seed settlement database
bun run db:types         # Generate TypeScript types from Supabase schema
```

## Architecture

### Core Components
1. **Landing Page** — SEO-optimized, show sample settlements with potential value, CTA to connect email
2. **Settlement Directory** — Browseable/searchable database of active settlements with deadlines
3. **Gmail OAuth Flow** — Minimal-scope read-only email connection
4. **Email Scanner** — Background job that scans connected emails for settlement notifications and receipts
5. **AI Parser** — Claude API integration to extract structured data from emails
6. **Matching Engine** — Compares user purchase history against settlement eligibility criteria
7. **Claim Filing UI** — Step-by-step guided claim filing with pre-filled data
8. **Payment Tracker Dashboard** — Shows filed claims, expected payouts, received payments
9. **Settlement Scraper** — Scheduled job to update settlement database from source sites

### Data Flow
```
User connects Gmail (OAuth, read-only scope)
→ Background scanner fetches settlement emails + order confirmations
→ Claude API parses emails → structured settlement/purchase data
→ Matching engine compares purchases against active settlements
→ User sees matches with estimated value on dashboard
→ User clicks "File Claim" → guided flow with pre-filled data
→ Track claim status → notify on payment
→ Collect success fee when settlement pays out
```

## Data Model

### Key Tables
- `users` — Supabase Auth managed
- `user_profiles` — name, email, address, demographics for settlement matching
- `gmail_connections` — user_id, access_token_encrypted, refresh_token_encrypted, last_scan_at, scope
- `settlements` — title, slug, description, defendant, eligibility_criteria JSONB, claim_url, deadline, estimated_payout_min, estimated_payout_max, source_url, status (active/closed/paying)
- `parsed_emails` — user_id, gmail_message_id, email_type (settlement_notice/order_confirmation/receipt), parsed_data JSONB, raw_subject, received_at
- `purchase_history` — user_id, merchant, product, amount, purchase_date, source_email_id
- `settlement_matches` — user_id, settlement_id, match_confidence, matched_purchases JSONB, status (potential/filed/approved/paid)
- `claims` — user_id, settlement_id, claim_reference, filed_at, form_data JSONB, proof_documents, status, payout_amount, paid_at
- `fee_ledger` — claim_id, settlement_amount, fee_percentage, fee_amount, stripe_payment_id

## SECURITY & PRIVACY
- **Gmail OAuth scope is minimal**: `gmail.readonly` only — no send, no modify
- **OAuth tokens are encrypted** at rest using pgcrypto
- **Email content is parsed and discarded** — only structured data is retained
- **Users can disconnect Gmail** at any time, which deletes all parsed email data
- **RLS enforced** on all tables — users see only their own data

## External APIs & Services
- **Gmail API** — Read-only email access for scanning
- **Claude API** — Email parsing, settlement matching intelligence
- **Supabase** — Database, Auth, Storage
- **Stripe** — Fee collection on successful settlements
- **Vercel** — Hosting, cron jobs for background scanning
- **Settlement Sources** — TopClassActions.com, ClassAction.org (web scraping for settlement database)

## Version
0.0.0
