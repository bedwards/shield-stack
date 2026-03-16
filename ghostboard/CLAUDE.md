# GhostBoard — Employer Ghosting Rate Database

## Status: Planning Complete

## Product Overview
GhostBoard is a crowdsourced employer accountability platform where job seekers search any company and instantly see its ghosting rate (% of applicants who never hear back), average response time, and interview-to-offer ratio. Users report their own application outcomes, building the largest database of employer responsiveness. Think Glassdoor, but specifically for whether companies actually respond to applicants.

### Target User
- Job seekers evaluating whether to apply to a company
- Career coaches and employment advisors
- Recruiters who want to see/improve their company's score

### Key Features (MVP)
1. **Company Search & Profile Pages** — Search any company, see ghosting stats on a dedicated SEO-optimized page
2. **Report Submission Form** — Users report application outcomes (applied, heard back, interview, offer, ghosted) with validation and anti-spam
3. **Ghosting Rate Dashboard** — Aggregate stats: ghosting rate %, avg days to respond, interview-to-offer ratio, trend over time
4. **Company Comparison** — Side-by-side comparison of employer responsiveness
5. **SEO Landing Pages** — SSG pages for "Does [company name] ghost applicants" queries
6. **Recruiter Portal** — Paid tier for recruiters to claim profiles, respond to reports, and improve scores

### Revenue Model
- **Free tier**: Search companies, view ghosting rates, submit 3 reports/month
- **Premium ($4.99/mo)**: Unlimited reports, detailed analytics, email alerts for companies you're tracking
- **Recruiter tier ($49/mo)**: Claim company profile, respond to reports, analytics dashboard, badge of responsiveness
- **Affiliate**: Job board referral links on company pages

## Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Framework | Next.js 15 (App Router) | SSG for company pages (SEO), SSR for search, React Server Components |
| Database | Supabase (PostgreSQL) | Row-level security for user data, real-time subscriptions for live stats |
| Auth | Supabase Auth | Email + Google OAuth, easy RLS integration |
| Storage | Supabase Storage | User avatars, company logos |
| Payments | Stripe | Subscriptions for premium + recruiter tiers |
| Deploy | Vercel | Edge network, ISR for company pages, analytics |
| Package Manager | bun | Fast installs, native TypeScript |
| Testing | Vitest + Playwright | Unit/integration + E2E |
| Styling | Tailwind CSS 4 | Utility-first, fast iteration |

## Model & Effort
Always use Claude Opus 4.6 with max effort.

## Build / Test / Deploy
```bash
cd ghostboard
bun install              # Install dependencies
bun run dev              # Start dev server (localhost:3000)
bun test                 # Run Vitest unit/integration tests
bun run test:e2e         # Run Playwright E2E tests
bun run build            # Production build
bun run lint             # ESLint + Prettier check
bun run db:migrate       # Run Supabase migrations
bun run db:seed          # Seed database with sample data
bun run db:types         # Generate TypeScript types from Supabase schema
```

## Architecture Decisions

### Data Collection & Anti-Spam
- Rate limit report submissions: 3/day for free users, 10/day for premium
- Require email verification before first report
- Fingerprint-based duplicate detection (same company + similar timeframe from same user)
- Report aging: reports older than 2 years weighted less in calculations
- Minimum 5 reports before showing public stats (prevents gaming)

### SEO Strategy
- **SSG company pages**: Pre-generate pages for top 10,000 companies at build time
- **ISR for long tail**: On-demand ISR for less popular companies (revalidate every 24h)
- **Programmatic SEO**: "Does [company] ghost applicants" title pattern
- **Schema.org markup**: Organization + AggregateRating structured data
- **Sitemap generation**: Auto-generated sitemap from company database
- Target keywords: "does [company] ghost applicants", "[company] hiring process", "[company] application response time"

### Data Model Overview
- `companies` — Company profiles (name, domain, industry, size, location)
- `reports` — User-submitted application outcomes (status, dates, role level)
- `company_stats` — Materialized aggregate stats (ghosting rate, avg response time)
- `users` — Extended user profiles (job seeker vs recruiter)
- `subscriptions` — Stripe subscription tracking
- `company_claims` — Recruiter company profile claims

### API Integrations
- **Clearbit/PDL (future)**: Company data enrichment (logo, industry, size)
- **Job board APIs (future)**: Indeed, LinkedIn for job listing cross-reference
- **Stripe**: Payment processing for premium and recruiter subscriptions

### Revenue Implementation
- Stripe Checkout for subscription upgrades
- Webhook handler for subscription lifecycle events
- Feature gating middleware based on subscription tier
- Recruiter portal behind paywall with Stripe Connect consideration for future marketplace features

## Version
0.0.0
