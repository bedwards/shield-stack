# BillWatch — Consumer Utility Bill Anomaly Detection

## Status: Planning Complete

## Product Overview
BillWatch lets consumers upload or photograph their utility bills, automatically extracts the data via OCR, tracks costs over time, flags anomalies (sudden spikes, overcharges, rate changes), and benchmarks against similar households. It turns opaque utility billing into transparent, actionable data. Users finally know if they're being overcharged and get alerts before small billing errors compound.

### Target User
- Homeowners and renters concerned about rising utility costs
- Budget-conscious households tracking monthly expenses
- Consumers in deregulated energy markets comparing providers
- Landlords managing bills across multiple properties

### Key Features (MVP)
1. **Bill Upload & OCR** — Upload photo or PDF of utility bill, Tesseract.js extracts key data (provider, amount, usage, rate, billing period)
2. **Bill History & Trends** — Time-series visualization of costs, usage, and rates over months/years
3. **Anomaly Detection** — Flag bills that deviate significantly from historical pattern (z-score algorithm)
4. **Household Benchmarking** — Compare usage against anonymized similar households (same zip, sqft range, household size)
5. **SEO Content Pages** — "Why is my electric bill so high in [state]" programmatic pages
6. **Rate Comparison (future)** — In deregulated markets, show cheaper provider options

### Revenue Model
- **Free tier**: Track 1 utility account, 12 months history, basic anomaly alerts
- **Premium ($3.99/mo)**: Unlimited accounts, full history, benchmarking, CSV export, rate comparison
- **Affiliate**: Energy provider referrals in deregulated markets (TX, OH, PA, etc.)
- **Ads**: Non-intrusive ads on free tier pages

## Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Framework | Next.js 15 (App Router) | SSG for SEO content pages, RSC for dashboard |
| Database | Supabase (PostgreSQL) | Time-series bill data, RLS for multi-tenant user data |
| Auth | Supabase Auth | Email + Google OAuth |
| Storage | Supabase Storage | Bill image/PDF uploads |
| OCR | Tesseract.js (client-side) | No server cost for OCR, runs in browser |
| Payments | Stripe | Subscription management |
| Charts | Recharts or Chart.js | Time-series bill visualization |
| Deploy | Vercel | Edge functions for API, ISR for content pages |
| Package Manager | bun | Fast installs, native TypeScript |
| Testing | Vitest + Playwright | Unit/integration + E2E |
| Styling | Tailwind CSS 4 | Utility-first, fast iteration |

## Model & Effort
Always use Claude Opus 4.6 with max effort.

## Build / Test / Deploy
```bash
cd billwatch
bun install              # Install dependencies
bun run dev              # Start dev server (localhost:3001)
bun test                 # Run Vitest unit/integration tests
bun run test:e2e         # Run Playwright E2E tests
bun run build            # Production build
bun run lint             # ESLint + Prettier check
bun run db:migrate       # Run Supabase migrations
bun run db:seed          # Seed database with sample data
bun run db:types         # Generate TypeScript types from Supabase schema
```

## Architecture Decisions

### OCR Pipeline
- **Client-side first**: Tesseract.js runs in the browser via Web Worker — zero server cost
- **Structured extraction**: After raw OCR, parse with regex patterns for common utility bill formats (amount due, usage kWh/therms/gallons, rate per unit, billing period dates)
- **Manual correction UI**: Users can correct OCR errors before saving — improves data quality
- **Template library**: Pre-built extraction templates for major utilities (Con Edison, PG&E, Duke Energy, etc.)
- **Fallback**: If client-side OCR confidence is low, offer manual entry form

### Anomaly Detection Algorithm
- Z-score based: flag bills >2 standard deviations from user's rolling 12-month average
- Seasonal adjustment: account for heating/cooling seasons using historical patterns
- Rate change detection: separate usage anomalies from rate anomalies
- Provider-level alerts: if many users on same provider see simultaneous spikes, flag as potential billing error

### SEO Strategy
- **Programmatic pages**: "Why is my electric bill so high in [state]" for all 50 states
- **Utility-specific pages**: "Average [utility] bill in [city/state]"
- **Seasonal content**: "Summer electric bill tips", "Winter heating cost guide"
- **Schema.org**: FAQPage structured data for common questions
- **Sitemap**: Auto-generated from state/city/utility combinations

### Data Model Overview
- `users` — Extended profiles (zip code, home sqft, household size, heating type)
- `utility_accounts` — Tracked utility accounts (provider, account type: electric/gas/water)
- `bills` — Individual bill records (amount, usage, rate, period start/end, image URL)
- `anomalies` — Detected anomalies with severity and explanation
- `providers` — Utility provider database (name, service area, rate type)
- `benchmarks` — Aggregated anonymous benchmarks by region/home type
- `subscriptions` — Stripe subscription tracking

### API Integrations
- **Tesseract.js**: Client-side OCR for bill image processing
- **EIA API (future)**: U.S. Energy Information Administration for utility rate data
- **Stripe**: Payment processing for premium subscriptions
- **Supabase Storage**: Bill image/PDF storage with signed URLs

### Revenue Implementation
- Stripe Checkout for premium subscription
- Webhook handler for subscription lifecycle
- Feature gating: free users limited to 1 utility account, 12 months
- Affiliate link integration for energy provider switching in deregulated markets

## Version
0.0.0
