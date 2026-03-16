# ZoneAlert — Neighborhood Zoning & Development Decision Alerts

## Status: Scaffold Complete

## Product Overview
ZoneAlert monitors municipal public agendas, zoning applications, and development proposals near a user's address, then sends push alerts when changes are detected. 130M+ US households could be affected by nearby zoning changes, from cell towers to apartment complexes to liquor stores, yet most people only find out after it is too late. ZoneAlert gives residents advance notice and a voice.

## Target User
- Homeowners concerned about property values and neighborhood character (primary)
- Residents near proposed developments (urgent trigger)
- Real estate investors monitoring multiple addresses
- Community organizers tracking municipal decisions
- Renters curious about neighborhood changes

## MVP Features (v0.1.x)
1. **Address Registration** — Enter home address, geocode it, and establish monitoring radius
2. **Zoning Alert Feed** — Display detected zoning applications, public hearings, and development proposals near the user
3. **Push Notifications** — Web push alerts when new zoning activity is detected within radius
4. **Meeting Calendar** — Upcoming public hearings and city council meetings with zoning agenda items
5. **Map View** — Interactive map showing the user's address, monitoring radius, and nearby zoning activity
6. **Municipal Data Scraping** — Automated scraping of municipal public agendas and zoning portals (initial: top 50 US cities)
7. **SEO Landing Pages** — "Zoning changes near [city/neighborhood]" programmatic pages
8. **Alert History** — Archive of past alerts with outcomes (approved/denied/pending)

## Tech Stack
| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js 15 (App Router) | SSR/SSG for SEO, React Server Components |
| Runtime | Bun | Fast installs, native TypeScript |
| Database | Supabase (Postgres + PostGIS) | Geospatial queries for radius-based alerts, RLS for user data |
| Storage | Supabase Storage | Scraped documents, meeting minutes |
| Auth | Supabase Auth | Email + Google OAuth, anonymous for free tier |
| Payments | Stripe | $3.99/mo expanded radius subscription |
| Deploy | Vercel | Edge functions, ISR for SEO, Cron Jobs for scraping triggers |
| Geocoding | Mapbox Geocoding API | Address to lat/lng conversion, free tier generous |
| Maps | Mapbox GL JS | Interactive map rendering, free tier covers MVP |
| Scraping | Supabase Edge Functions + Cheerio | Scheduled municipal data collection |
| Push | Web Push API + Supabase Edge Functions | Standards-based push notifications |

## Build / Test / Deploy
```bash
cd zonealert
bun install              # Install dependencies
bun run dev              # Start dev server (localhost:3009)
bun run test             # Run Vitest unit/integration tests (NOT bun test!)
bun run test:e2e         # Run Playwright E2E tests
bun run build            # Production build
bun run lint             # ESLint check
bun run format           # Format code with Prettier
bun run format:check     # Check formatting without writing
bun run typecheck        # TypeScript type check
bun run db:migrate       # Run Supabase migrations (future)
bun run db:types         # Generate TypeScript types from Supabase schema (future)
```

**IMPORTANT**: Always use `bun run test` (which runs vitest via package.json script), NOT `bun test` (which invokes Bun's native test runner and will pick up Playwright files incorrectly).

## Project Structure
```
zonealert/
  src/
    app/              # Next.js App Router pages and layouts
      layout.tsx      # Root layout with header, sidebar, and footer shell
      page.tsx        # Landing page with hero, stats, features
      globals.css     # Tailwind imports and CSS custom properties
      api/
        health/
          route.ts    # Health check API endpoint
    components/       # Reusable React components
    lib/              # Utility functions and helpers
      env.ts          # Environment variable accessors
      test-setup.ts   # Vitest setup file
    types/            # TypeScript type definitions
      index.ts        # Shared types (MonitoredAddress, ZoningApplication, etc.)
  e2e/                # Playwright E2E tests
    smoke.spec.ts     # Basic smoke tests for landing page
  public/             # Static assets
  docs/               # Architecture and design documents
```

## Architecture Decisions

### ADR-001: PostGIS for Geospatial Queries
Zoning alerts are fundamentally location-based. PostGIS enables efficient radius queries ("find all zoning applications within 2 miles of this point") without application-level distance calculations. Supabase supports PostGIS as a Postgres extension.

### ADR-002: Incremental Municipal Coverage
Start with the top 50 US cities by population, where municipal data is most likely to be digitized and publicly available. Each city gets a custom scraper module. Expand coverage based on user demand (track failed geocoding and missing city requests).

### ADR-003: Edge Functions for Scraping
Supabase Edge Functions (Deno) run on a schedule to scrape municipal data portals. This keeps scraping infrastructure serverless, avoids long-running processes, and scales per-city. Each scraper runs independently.

### ADR-004: Mapbox for Geocoding and Maps
Mapbox provides both geocoding and map rendering with a generous free tier (100K geocoding requests/mo, 50K map loads/mo). This keeps MVP costs near zero. Google Maps is a fallback if Mapbox proves insufficient.

### ADR-005: Freemium Radius Model
Free users monitor one address within a 0.5-mile radius. Premium ($3.99/mo) expands to 5-mile radius, multiple addresses, and email digest. This creates natural upgrade pressure when users realize nearby-but-not-adjacent developments matter.

## Data Model

### Core Tables
- `profiles` — User profiles (id, email, display_name, subscription_tier, stripe_customer_id, created_at)
- `monitored_addresses` — User's registered addresses (id, user_id, address, city, state, zip, lat, lng, geog [PostGIS geography], radius_miles, is_primary, created_at)
- `municipalities` — Tracked cities/counties (id, name, state, fips_code, data_portal_url, scraper_module, last_scraped_at, scrape_frequency_hours, status)
- `zoning_applications` — Scraped zoning activity (id, municipality_id, external_id, title, description, application_type, status, applicant_name, address, lat, lng, geog, hearing_date, decision_date, decision, source_url, scraped_at)
- `public_hearings` — Meeting/hearing schedule (id, municipality_id, zoning_application_id, title, description, meeting_date, meeting_time, location, agenda_url, minutes_url, scraped_at)
- `alerts` — Sent alerts (id, user_id, monitored_address_id, zoning_application_id, alert_type, sent_at, read_at, distance_miles)
- `push_subscriptions` — Web push endpoints (id, user_id, endpoint, keys_p256dh, keys_auth, created_at)
- `scrape_logs` — Scraper run history (id, municipality_id, started_at, completed_at, records_found, records_new, errors, status)

### PostGIS Setup
```sql
CREATE EXTENSION IF NOT EXISTS postgis;
-- Geography columns enable ST_DWithin for radius queries in meters
-- Index: CREATE INDEX idx_zoning_geog ON zoning_applications USING GIST (geog);
```

## APIs

### Internal API Routes
- `POST /api/addresses` — Register address for monitoring (geocodes via Mapbox)
- `GET /api/addresses` — List monitored addresses
- `DELETE /api/addresses/[id]` — Remove monitored address
- `GET /api/alerts` — Get alerts for user (within radius of their addresses)
- `GET /api/alerts/feed` — Real-time alert feed with Supabase Realtime
- `GET /api/zoning/nearby?lat=&lng=&radius=` — Find zoning activity near a point
- `GET /api/zoning/[id]` — Get zoning application details
- `GET /api/hearings?city=&from=&to=` — Upcoming public hearings
- `POST /api/push/subscribe` — Register push subscription
- `POST /api/webhooks/stripe` — Stripe webhook handler
- `GET /api/cron/scrape` — Trigger municipal scraping (Vercel Cron)

### External APIs
- **Mapbox Geocoding**: `https://api.mapbox.com/geocoding/v5/mapbox.places/{address}.json`
- **Mapbox GL JS**: Client-side map rendering
- **Municipal data portals**: City-specific URLs (per scraper module)
- **Stripe**: Subscription payments

## SEO Strategy
- **Primary keyword pattern**: "Zoning change near me", "Zoning hearing [city]", "New development near [neighborhood]"
- **Programmatic pages**: `/cities/[state]/[city]/zoning` — one page per tracked city with recent activity
- **Application pages**: `/zoning/[id]` — individual zoning application details
- **Guide pages**: `/guides/how-to-attend-zoning-hearing`, `/guides/how-to-object-to-zoning-change`
- **Schema markup**: Event (hearings), Place, FAQPage, BreadcrumbList structured data
- **Internal linking**: City pages link to active applications, applications link to hearings

## Revenue Model
| Tier | Price | Features |
|------|-------|----------|
| Free | $0 | 1 address, 0.5-mile radius, in-app alerts only, 30-day history |
| Premium | $3.99/mo | 5-mile radius, 3 addresses, email digest, full history, map view |
| Pro | $9.99/mo | Unlimited addresses, 25-mile radius, API access, export data |

## LLM-Testable Design
All interactive elements include `data-testid` attributes for Playwright testing.
- `data-testid="header"` -- Page header
- `data-testid="nav"` -- Navigation bar
- `data-testid="logo-link"` -- Logo/home link
- `data-testid="nav-alerts"` -- My Alerts nav link
- `data-testid="nav-map"` -- Map View nav link
- `data-testid="nav-login"` -- Sign in button
- `data-testid="sidebar"` -- Sidebar navigation panel (hidden on mobile)
- `data-testid="sidebar-nav"` -- Sidebar nav container
- `data-testid="sidebar-dashboard"` -- Sidebar: Dashboard link
- `data-testid="sidebar-alerts"` -- Sidebar: My Alerts link
- `data-testid="sidebar-map"` -- Sidebar: Map View link
- `data-testid="sidebar-hearings"` -- Sidebar: Public Hearings link
- `data-testid="sidebar-addresses"` -- Sidebar: My Addresses link
- `data-testid="sidebar-settings"` -- Sidebar: Settings link
- `data-testid="main-content"` -- Main content area
- `data-testid="footer"` -- Page footer
- `data-testid="hero-section"` -- Hero section
- `data-testid="hero-title"` -- Hero heading
- `data-testid="hero-subtitle"` -- Hero subheading
- `data-testid="cta-monitor-button"` -- Monitor address CTA button
- `data-testid="cta-demo-button"` -- Demo CTA button
- `data-testid="stats-section"` -- Statistics section
- `data-testid="stat-addresses-monitored"` -- Addresses monitored counter
- `data-testid="stat-alerts-sent"` -- Alerts sent counter
- `data-testid="stat-cities-covered"` -- Cities covered counter
- `data-testid="how-it-works-section"` -- How it works section
- `data-testid="step-register"` -- Step 1: Enter address
- `data-testid="step-monitor"` -- Step 2: We scan data
- `data-testid="step-alert"` -- Step 3: Get alerted
- `data-testid="features-section"` -- Features section
- `data-testid="cta-section"` -- Bottom CTA section
- `data-testid="cta-start-button"` -- Get started button

Convention: All new interactive elements MUST include a `data-testid` attribute.
**Enforced by ESLint**: The custom `data-testid/require-data-testid` rule warns when interactive elements (`button`, `a`, `input`, `select`, `textarea`, `Link`) are missing `data-testid`.

## Environment Variables
See `.env.example` for required variables:
- `NEXT_PUBLIC_SUPABASE_URL` -- Supabase project URL (client-side accessible)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` -- Supabase anonymous key (client-side accessible)
- `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` -- Mapbox token for geocoding and maps (client-side accessible)
- `NEXT_PUBLIC_APP_URL` -- Public app URL (client-side accessible)
- `STRIPE_SECRET_KEY` -- Stripe secret API key (server-only)
- `TEST_MODE` -- Enable test mode (bypasses rate limits, enables test accounts)

**IMPORTANT**: Any environment variable accessed in client components or browser code MUST be prefixed with `NEXT_PUBLIC_`. Server-only secrets (like `STRIPE_SECRET_KEY`) do NOT get the prefix.

## Model & Effort
Always use Claude Opus 4.6 with max effort.

## Version
0.1.0
