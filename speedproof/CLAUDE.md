# SpeedProof — ISP Speed Accountability Monitor

## Status: Scaffold Complete

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
cd speedproof
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
bun run db:seed          # Seed ISP directory data
bun run db:types         # Generate TypeScript types from Supabase schema
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

## Project Structure
```
speedproof/
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
      index.ts        # Shared types (SpeedTestResult, UserProfile, etc.)
  e2e/                # Playwright E2E tests
    smoke.spec.ts     # Basic smoke tests for landing page
  public/             # Static assets
  docs/               # Architecture and design documents
```

## LLM-Testable Design
All interactive elements include `data-testid` attributes for Playwright testing.
- `data-testid="header"` -- Page header
- `data-testid="nav"` -- Navigation bar
- `data-testid="logo-link"` -- Logo/home link
- `data-testid="nav-dashboard"` -- Dashboard nav link
- `data-testid="nav-reports"` -- Reports nav link
- `data-testid="nav-login"` -- Sign in button
- `data-testid="main-content"` -- Main content area
- `data-testid="footer"` -- Page footer
- `data-testid="hero-section"` -- Hero section
- `data-testid="hero-title"` -- Hero heading
- `data-testid="hero-subtitle"` -- Hero subheading
- `data-testid="hero-cta"` -- Hero CTA button group
- `data-testid="cta-test-button"` -- Run Speed Test button
- `data-testid="cta-dashboard-button"` -- View Dashboard button
- `data-testid="stats-section"` -- Statistics section
- `data-testid="how-it-works-section"` -- How it works section
- `data-testid="features-section"` -- Features grid section
- `data-testid="cta-section"` -- Bottom CTA section
- `data-testid="cta-start-button"` -- Bottom CTA button

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
