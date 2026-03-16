# TenantShield — Habitability Documentation & Legal Notice Generator

## Status: Planning Complete

## Product Overview
TenantShield empowers renters to document habitability issues (mold, broken heating, pest infestations, water damage) with timestamped, GPS-tagged photos/videos, then generates state-specific legal demand letters using AI. It tracks landlord response deadlines per state law and provides escalation paths to code enforcement, health departments, and tenant legal aid. Every renter becomes their own advocate with legally sound documentation.

### Target User
- Renters dealing with unresponsive landlords on maintenance/habitability issues
- Tenants preparing for rent withholding or lease breaking due to habitability violations
- Tenant advocacy organizations helping renters navigate their rights
- Legal aid attorneys collecting documentation from clients

### Key Features (MVP)
1. **Issue Documentation** — Upload photos/videos with automatic EXIF extraction (timestamp, GPS coordinates), add written descriptions
2. **AI Legal Letter Generation** — Claude API generates state-specific demand letters citing relevant habitability statutes
3. **State Law Database** — All 50 states' habitability codes, notice requirements, cure periods, and tenant remedies
4. **Deadline Tracking** — Automatic tracking of landlord response deadlines per state law, with email/push reminders
5. **Escalation Paths** — When deadlines expire, guide to next steps: code enforcement complaint, rent withholding, lease termination
6. **SEO Content Pages** — "Landlord won't fix [issue] in [state]" programmatic pages with legal information

### Revenue Model
- **Free tier**: Document 1 issue, generate 1 legal letter, basic deadline tracking
- **Premium ($4.99/mo)**: Unlimited issues and letters, priority support, document export for court
- **One-time letter ($1.99)**: Pay per additional letter without subscribing
- **Affiliate**: Tenant legal aid referrals, renter's insurance

## Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Framework | Next.js 15 (App Router) | SSG for state law pages (SEO), RSC for app features |
| Database | Supabase (PostgreSQL) | RLS for tenant data privacy, JSONB for state law database |
| Auth | Supabase Auth | Email + Google OAuth |
| Storage | Supabase Storage | Photo/video evidence uploads with signed URLs |
| AI | Claude API (Anthropic) | Legal letter generation, issue categorization |
| Payments | Stripe | Subscriptions + per-letter purchases |
| Deploy | Vercel | Edge functions, ISR for state pages |
| Package Manager | bun | Fast installs, native TypeScript |
| Testing | Vitest + Playwright | Unit/integration + E2E |
| Styling | Tailwind CSS 4 | Utility-first, fast iteration |
| EXIF | exifr (npm) | Client-side EXIF metadata extraction from photos |

## Model & Effort
Always use Claude Opus 4.6 with max effort.

## Build / Test / Deploy
```bash
cd tenantshield
bun install              # Install dependencies
bun run dev              # Start dev server (localhost:3003)
bun test                 # Run Vitest unit/integration tests
bun run test:e2e         # Run Playwright E2E tests
bun run build            # Production build
bun run lint             # ESLint + Prettier check
bun run db:migrate       # Run Supabase migrations
bun run db:seed          # Seed state law database
bun run db:types         # Generate TypeScript types from Supabase schema
```

## Architecture Decisions

### Evidence Documentation Pipeline
- **EXIF extraction**: Client-side extraction of timestamp and GPS coordinates from uploaded photos using `exifr`
- **Metadata preservation**: Store original EXIF data as JSON alongside the image for legal evidence integrity
- **Signed URLs**: All evidence files served via Supabase Storage signed URLs (time-limited access)
- **Evidence chain**: Immutable records — once created, evidence entries cannot be edited (only new entries added)
- **Export**: Generate court-ready PDF packages with all evidence, metadata, timeline, and letters

### AI Letter Generation
- **Claude API** via Anthropic SDK with structured system prompt
- **State-specific templates**: System prompt includes relevant state statutes, notice requirements, and legal language
- **Structured output**: Claude returns JSON with letter text, cited statutes, cure period, next steps
- **Tone control**: Professional legal tone, firm but not threatening
- **Disclaimer**: Every letter includes "This is not legal advice" disclaimer with local legal aid referral
- **Version history**: Track all generated letter versions per issue

### State Law Database
- **All 50 states + DC**: Habitability codes, implied warranty of habitability statutes
- **Structured data**: Notice requirements (written/email), cure periods (days), tenant remedies (withhold rent, repair-and-deduct, lease termination)
- **Issue categories**: Heating/cooling, plumbing, electrical, pest, mold, structural, security, lead paint
- **Seeded from research**: Initial data from legal research, tagged with last-verified date
- **Versioned**: Track law changes with effective dates

### SEO Strategy
- **State pages**: "Tenant rights in [state]" for all 50 states + DC
- **Issue + state pages**: "Landlord won't fix [issue] in [state]" (e.g., "landlord won't fix heat in New York")
- **Legal guide pages**: "How to write a demand letter to landlord [state]"
- **Schema.org**: LegalService + FAQPage structured data
- **Sitemap**: Auto-generated from state/issue matrix (50 states x ~10 issues = 500+ pages)
- Target keywords: "landlord won't fix", "tenant rights [state]", "habitability violation [state]", "demand letter to landlord"

### Data Model Overview
- `users` — Extended tenant profiles (state, lease start/end, landlord info)
- `properties` — Rental properties (address, landlord name, management company)
- `issues` — Habitability issues (category, description, severity, status, property_id)
- `evidence` — Photos/videos per issue (file URL, EXIF data as JSONB, upload timestamp)
- `letters` — Generated legal letters (issue_id, letter text, cited statutes, version)
- `deadlines` — Tracked deadlines (issue_id, type, due date, status, reminder sent)
- `state_laws` — State habitability law database (state, issue category, notice requirement, cure period, remedies)
- `subscriptions` — Stripe subscription tracking
- `letter_purchases` — One-time letter purchases

### API Integrations
- **Claude API (Anthropic)**: Legal letter generation and issue categorization
- **Supabase Storage**: Evidence file storage with signed URLs
- **Stripe**: Subscriptions + one-time letter purchases
- **exifr**: Client-side EXIF metadata extraction
- **Local legal aid APIs (future)**: Referral to state/county legal aid organizations

### Revenue Implementation
- Stripe Checkout for subscription + one-time letter purchases
- Webhook handler for subscription lifecycle
- Feature gating: free = 1 issue + 1 letter, premium = unlimited
- One-time purchase flow: after first free letter, pay $1.99 per additional letter
- Affiliate integration for renter's insurance recommendations

## Version
0.0.0
