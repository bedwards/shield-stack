# CellScore — Unified Cell Plan Finder with Real Coverage at Your Address

## Status: Planning Complete

## Product Overview
CellScore combines real signal strength data (FCC Broadband Data Collection + crowdsourced reports) with a comprehensive carrier/MVNO plan database to recommend the best cell phone plans for any specific address. Unlike carrier coverage maps that show vague blobs, CellScore uses actual measured data to tell you which carriers actually work well at your address, then recommends the cheapest plans that meet your needs.

### Target User
Anyone shopping for a new cell phone plan. Especially: people in rural/suburban areas with spotty coverage, price-sensitive consumers comparing MVNOs (Mint, Visible, Cricket, etc.), people who have been burned by a carrier's inaccurate coverage map, families optimizing multi-line plans.

### MVP Features
1. **Address-Based Coverage Check** — Enter address, see real signal strength data for all carriers at that location
2. **Plan Database** — Comprehensive database of plans from all major carriers and MVNOs (T-Mobile, AT&T, Verizon, Mint Mobile, Visible, Cricket, US Mobile, Google Fi, etc.)
3. **Needs Quiz** — Quick questionnaire: data usage, number of lines, budget, priorities (price/coverage/speed)
4. **AI Plan Recommender** — Top 3 plan recommendations based on coverage at address + user needs
5. **Plan Comparison** — Side-by-side comparison of any plans with coverage, price, features, fine print
6. **Coverage Map** — Interactive map showing signal strength from FCC data and crowdsourced reports
7. **Crowdsource Reporting** — Users can submit their own signal strength readings to improve data
8. **Affiliate Links** — Revenue through carrier/MVNO affiliate sign-up links

### Revenue Model
- **100% affiliate commissions** on plan switches/sign-ups through referral links
- Free to use — no subscription, no paywall
- Monetize through value: better recommendations = more switches = more affiliate revenue

### SEO Strategy
- Primary: "best cell phone plan for my area", "best cell coverage at my address"
- Long-tail: "best MVNO for rural areas", "cheapest unlimited data plan with good coverage", "does Mint Mobile work in [city]"
- Programmatic: `/coverage/{city}/{state}` pages, `/carriers/{carrier-slug}` pages, `/carriers/{carrier-slug}/{city}` pages
- Content: Carrier coverage comparison guides, MVNO vs. major carrier explainers, "hidden fees in cell plans"

## Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js 15 (App Router) | SSG for thousands of programmatic SEO pages, ISR for coverage data freshness |
| Database | Supabase (Postgres) | PostGIS extension for geospatial coverage queries, JSONB for plan feature data |
| Auth | Supabase Auth | Optional account for saving preferences, crowdsource reporting |
| Storage | Supabase Storage | Coverage map tiles, carrier logos |
| Payments | Stripe | Not used for user payments; affiliate tracking through carrier links |
| Maps | Mapbox GL JS | Interactive coverage map rendering |
| Geocoding | Mapbox Geocoding API | Address to coordinates for coverage lookup |
| Deploy | Vercel | ISR for programmatic pages, edge functions for coverage API |
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
bun db:seed                # Seed carrier/plan data + FCC coverage data
bun db:reset               # Reset local Supabase

# Data Pipeline
bun run import:fcc         # Import FCC BDC coverage data
bun run import:plans       # Import/update carrier plan database
bun run aggregate:coverage # Compute coverage aggregates per area

# Build & Deploy
bun build                  # Production build
vercel --prod              # Deploy to production
```

## Architecture

### Core Components
1. **Landing Page** — SEO-optimized with address search hero, sample coverage comparison
2. **Address Coverage Checker** — Geocode address, query PostGIS for coverage data, show per-carrier signal strength
3. **Needs Quiz** — 4-5 question wizard: usage, lines, budget, priorities
4. **Recommendation Engine** — Score and rank plans based on coverage + needs, surface top 3
5. **Plan Directory** — Browseable/searchable plan database with filters (carrier, price, data, features)
6. **Coverage Map** — Mapbox GL JS interactive map with coverage overlay layers per carrier
7. **Plan Comparison View** — Side-by-side feature/price/coverage comparison table
8. **Crowdsource Portal** — Submit signal readings from browser (Navigator.connection API + geolocation)
9. **Programmatic SEO Pages** — Auto-generated city/carrier coverage pages for search traffic

### Data Flow
```
User enters address → Mapbox Geocoding → lat/lng coordinates
→ PostGIS query: coverage data within radius of coordinates
→ Return per-carrier signal strength at that location
→ User completes needs quiz → AI scoring of matching plans
→ Display top 3 recommendations with affiliate links
→ User can explore full plan directory and coverage map
→ Optional: user submits own signal data → stored for future queries
```

## Data Model

### Key Tables
- `users` — Supabase Auth managed (optional, for saved searches and crowdsource)
- `carriers` — carrier name, slug, type (mno/mvno), parent_carrier_id, logo_url, website, affiliate_url
- `plans` — carrier_id, plan_name, monthly_price, data_limit_gb (null=unlimited), throttle_speed_after, hotspot_gb, num_lines_min, num_lines_max, features JSONB, affiliate_url, last_verified_at
- `fcc_coverage` — provider_id, technology (4G/5G), geography (geom GEOMETRY), max_download, max_upload, imported_at
- `crowdsource_reports` — user_id, lat, lng, carrier, signal_dbm, download_mbps, upload_mbps, technology, reported_at
- `coverage_aggregates` — carrier_id, city, state, zip, avg_signal, avg_download, sample_count, technology (materialized view)
- `searches` — user_id (nullable), address, lat, lng, results JSONB, searched_at
- `affiliate_clicks` — search_id, plan_id, carrier_id, clicked_at
- `cities` — city name, state, slug, lat, lng, population (for programmatic SEO pages)

## External APIs & Services
- **FCC Broadband Data Collection API** — Carrier coverage data by geography
- **Mapbox Geocoding API** — Address to lat/lng conversion
- **Mapbox GL JS** — Interactive map rendering (client-side)
- **Supabase** — Database (with PostGIS), Auth, Storage
- **Stripe** — Only for future premium features if needed; MVP is free
- **Vercel** — Hosting with ISR for programmatic pages
- **Carrier Affiliate Programs** — Revenue source (Mint, Visible, etc. all have affiliate programs)

## Version
0.0.0
