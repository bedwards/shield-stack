# SpeedProof — ISP Speed Accountability Monitor

## Status: Planning Complete

## Product Overview
SpeedProof runs automated internet speed tests and builds a legally defensible record proving your ISP is not delivering advertised speeds. After collecting 30 days of data, it generates professional reports, FCC complaint templates, and ISP credit request letters. The free tier offers manual tests with 7-day history; the paid tier adds automatic hourly background testing, full historical reports, and pre-filled complaint/credit templates.

### Target User
Anyone frustrated that their internet is slower than what they pay for. Especially: remote workers whose ISP underperforms during business hours, gamers experiencing lag, streamers with buffering issues, rural broadband users getting a fraction of advertised speed.

### MVP Features
1. **Manual Speed Test** — One-click browser-based speed test (download, upload, latency, jitter) using WebSocket-based measurement against Cloudflare Workers endpoints
2. **Automatic Background Testing** — Service Worker runs hourly speed tests in the background (paid tier)
3. **Historical Dashboard** — Charts showing speed over time vs. advertised speed, with daily/weekly/monthly views
4. **ISP Detection** — Automatic detection of user's ISP and their advertised speed tier
5. **30-Day Accountability Report** — PDF report showing average speeds vs. advertised, % of time below threshold, peak/off-peak analysis
6. **FCC Complaint Generator** — Pre-filled FCC complaint form data based on collected evidence
7. **ISP Credit Request Letter** — Professional letter requesting billing credit for underperformance
8. **Speed Test History** — 7 days free, unlimited paid

### Revenue Model
- **Free tier**: Manual speed tests, 7-day history, basic dashboard
- **Pro tier ($3.99/mo)**: Automatic hourly testing, unlimited history, PDF reports, FCC complaint templates, ISP credit request letters

### SEO Strategy
- Primary: "ISP not delivering advertised speed", "internet speed test history"
- Long-tail: "how to complain to FCC about internet speed", "ISP credit for slow internet", "prove internet is slow"
- Programmatic: `/isp/{isp-slug}` pages showing aggregate speed data per ISP, `/isp/{isp-slug}/{city}` for local ISP performance
- Content: Guide to FCC complaints, ISP speed guarantee rights, how to get credit for slow internet

## Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js 15 (App Router) | SSR/SSG for SEO landing pages, App Router for dashboard |
| Database | Supabase (Postgres) | TimescaleDB extension for time-series speed data, RLS for user isolation |
| Auth | Supabase Auth | Email + OAuth for account creation |
| Storage | Supabase Storage | Generated PDF reports |
| Payments | Stripe | Subscriptions for Pro tier |
| Speed Test Server | Cloudflare Workers | Edge-deployed test endpoints for accurate speed measurement |
| Deploy | Vercel | Main app hosting |
| PDF Generation | @react-pdf/renderer | Server-side report PDF generation |
| Service Worker | Workbox | Background speed test scheduling |
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
bun db:seed                # Seed ISP directory data
bun db:reset               # Reset local Supabase

# Speed Test Server (Cloudflare Workers)
bun --cwd workers/speed-test dev     # Local worker dev
bun --cwd workers/speed-test deploy  # Deploy to Cloudflare

# Build & Deploy
bun build                  # Production build
vercel --prod              # Deploy to production
```

## Architecture

### Core Components
1. **Landing Page** — SEO-optimized, real-time speed test widget, ISP performance stats
2. **Speed Test Engine** — WebSocket-based speed measurement using Cloudflare Workers as test servers
3. **Service Worker** — Background test scheduler (Workbox), runs hourly for Pro users
4. **Dashboard** — Time-series charts (recharts), speed vs. advertised comparison, daily/weekly/monthly
5. **ISP Directory** — Database of ISPs with advertised speed tiers, populated from FCC broadband data
6. **Report Generator** — 30-day PDF report with charts, statistics, evidence summary
7. **Complaint Templates** — FCC complaint form data generator, ISP credit request letter generator
8. **Aggregation Pipeline** — Supabase functions to compute ISP-level and city-level aggregate statistics

### Data Flow
```
User clicks "Test" or Service Worker triggers automatically
→ Browser opens WebSocket to Cloudflare Worker speed test endpoint
→ Measures download speed, upload speed, latency, jitter
→ Results stored in Supabase speed_tests table
→ Dashboard fetches and charts historical data
→ After 30 days: generate report PDF → FCC complaint data → ISP credit letter
→ Aggregation: anonymized data feeds ISP directory pages (SEO)
```

## Data Model

### Key Tables
- `users` — Supabase Auth managed
- `user_profiles` — ISP name, plan name, advertised_download, advertised_upload, zip_code
- `speed_tests` — timestamp, download_mbps, upload_mbps, latency_ms, jitter_ms, test_server_region, user_id, isp_detected
- `isp_directory` — ISP name, slug, website, FCC provider_id, coverage_areas
- `isp_plans` — isp_id, plan_name, advertised_download, advertised_upload, price, data_cap
- `reports` — user_id, period_start, period_end, report_type, pdf_storage_path, generated_at
- `complaints` — user_id, type (fcc/isp_credit), generated_data JSONB, submitted_at
- `subscriptions` — Stripe subscription tracking
- `isp_aggregates` — isp_id, city, state, avg_download, avg_upload, sample_count, period (materialized view, updated daily)

## External APIs & Services
- **Cloudflare Workers** — Speed test server endpoints (custom, deployed to multiple regions)
- **Supabase** — Database, Auth, Storage, Edge Functions
- **Stripe** — Subscription payments
- **FCC Broadband Data Collection API** — ISP advertised speed data, coverage maps
- **Vercel** — App hosting
- **IP Geolocation** — Detect user's ISP from IP address (ipinfo.io or similar)

## Version
0.0.0
