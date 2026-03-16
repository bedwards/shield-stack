# RecallRadar — Product Recall Barcode Scanner for Parents

## Status: Scaffold Complete

## Product Overview
RecallRadar lets parents and caregivers scan any product barcode to instantly check if it has been recalled by the CPSC. Users build a product inventory and receive push alerts when future recalls affect items they own. The app targets 85M+ US households with children who need peace of mind about product safety.

## Target User
- Parents and caregivers of young children (primary)
- Daycare operators, schools, and childcare facilities
- Safety-conscious consumers of any product category
- Grandparents buying gifts who want to verify safety

## MVP Features (v0.1.x)
1. **Barcode Scanner** — PWA camera-based scanning using QuaggaJS/ZXing, decode UPC-A, UPC-E, EAN-13, EAN-8
2. **Manual Search** — Text search by product name, brand, or UPC code
3. **Recall Lookup** — Real-time query against CPSC SaferProducts.gov REST API
4. **Result Display** — Green (safe) / Red (recalled) status with recall details, remedy instructions, and manufacturer contact
5. **Product Inventory** — Save scanned products to personal inventory (Supabase)
6. **Push Alerts** — Web push notifications when a new recall matches inventory items
7. **SEO Landing Pages** — Pre-rendered pages for "Is [product] recalled" long-tail queries
8. **Receipt History** — Scan history with timestamps and recall status at time of scan

## Tech Stack
| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js 15 (App Router) | SSR/SSG for SEO pages, React Server Components for performance |
| Runtime | Bun | Fast installs, native TypeScript |
| Database | Supabase (Postgres + Auth + Realtime) | Row-level security, real-time subscriptions for alerts, built-in auth |
| Storage | Supabase Storage | Product images, scan history thumbnails |
| Auth | Supabase Auth | Email + Google OAuth, anonymous sessions for free tier |
| Payments | Stripe | Checkout Sessions for $2.99/mo premium subscription |
| Deploy | Vercel | Edge functions, preview deployments, ISR for SEO pages |
| Barcode | QuaggaJS + @aspect-ratio/zxing-wasm | Client-side barcode decoding, no server round-trip |
| Push | Web Push API + Supabase Edge Functions | Standards-based push notifications |
| External API | CPSC SaferProducts.gov REST API | Free, public, no API key required |

## Build / Test / Deploy
```bash
cd recallradar
bun install              # Install dependencies
bun run dev              # Start dev server (localhost:3008)
bun run test             # Run Vitest unit/integration tests (NOT bun test!)
bun run test:e2e         # Run Playwright E2E tests
bun run build            # Production build
bun run lint             # ESLint check
bun run typecheck        # TypeScript type checking
bun run db:migrate       # Run Supabase migrations (future)
bun run db:seed          # Seed database with sample data (future)
bun run db:types         # Generate TypeScript types from Supabase schema (future)
```

**IMPORTANT**: Always use `bun run test` (which runs vitest via package.json script), NOT `bun test` (which invokes Bun's native test runner and will pick up Playwright files incorrectly).

## Project Structure
```
recallradar/
  src/
    app/              # Next.js App Router pages and layouts
      layout.tsx      # Root layout with header/footer shell
      page.tsx        # Landing page with hero, stats, features
      page.test.tsx   # Unit tests for landing page
      globals.css     # Tailwind imports and CSS custom properties
    components/       # Reusable React components
    lib/              # Utility functions and helpers
      env.ts          # Environment variable accessors
      env.test.ts     # Tests for env helpers
      test-setup.ts   # Vitest setup file
      scanner/        # Barcode scanning pipeline (QuaggaJS/ZXing)
      recall/         # CPSC recall lookup logic
    types/            # TypeScript type definitions
      index.ts        # Shared types (Product, Recall, ScanResult, etc.)
  e2e/                # Playwright E2E tests
    smoke.spec.ts     # Basic smoke tests for landing page
  public/             # Static assets
  docs/               # Architecture and design documents
```

## Architecture Decisions

### ADR-001: PWA with Camera Access
The app runs as a Progressive Web App to access the device camera for barcode scanning without requiring a native app store. This maximizes distribution (direct from search) and eliminates app store review friction.

### ADR-002: Client-Side Barcode Decoding
QuaggaJS/ZXing runs entirely in the browser. No images are sent to our server, which improves latency, reduces bandwidth costs, and addresses privacy concerns from parents.

### ADR-003: CPSC API as Source of Truth
The CPSC SaferProducts.gov API is free, public, and authoritative. We cache responses in Supabase for 1 hour to reduce API load and improve response times. We also run a nightly sync job to build our own recall database for SEO pages.

### ADR-004: Freemium Model
Free users get unlimited scans and search. Premium ($2.99/mo) unlocks product inventory (save up to 500 items), push alerts for future recalls, and scan history. This keeps the free tier valuable for SEO traffic while monetizing engaged users.

### ADR-005: ISR for SEO Pages
Incremental Static Regeneration generates "Is [product] recalled" pages that revalidate every 24 hours. This gives us fast page loads for SEO while keeping recall data reasonably fresh.

## Data Model

### Core Tables
- `profiles` — User profiles linked to Supabase Auth (id, email, display_name, subscription_tier, stripe_customer_id, created_at)
- `products` — Product catalog from scans (id, upc, name, brand, category, image_url, first_scanned_at)
- `recalls` — Cached CPSC recall data (id, cpsc_recall_id, title, description, remedy, product_name, manufacturer, published_date, hazard, images, synced_at)
- `recall_products` — Join table linking recalls to UPC codes (id, recall_id, product_id, upc)
- `user_inventory` — Products saved by users (id, user_id, product_id, nickname, added_at, room, notes)
- `scan_history` — Log of all scans (id, user_id, upc, product_id, recall_status, scanned_at)
- `push_subscriptions` — Web push subscription endpoints (id, user_id, endpoint, keys_p256dh, keys_auth, created_at)
- `alerts` — Sent alert log (id, user_id, recall_id, product_id, sent_at, read_at)

## APIs

### Internal API Routes
- `POST /api/scan` — Submit UPC, return recall status (checks cache, then CPSC API)
- `GET /api/recalls/search?q=` — Search recalls by product name/brand
- `GET /api/recalls/[id]` — Get recall details
- `POST /api/inventory` — Add product to user inventory
- `DELETE /api/inventory/[id]` — Remove product from inventory
- `GET /api/inventory` — List user's inventory with recall status
- `GET /api/history` — Get scan history
- `POST /api/push/subscribe` — Register push subscription
- `POST /api/webhooks/stripe` — Stripe webhook handler
- `GET /api/cron/sync-recalls` — Nightly CPSC recall sync (Vercel Cron)

### External APIs
- **CPSC SaferProducts.gov**: `https://www.saferproducts.gov/RestWebServices/Recall?format=json&UPC={upc}`
- **Stripe**: Checkout Sessions, Customer Portal, Webhooks

## SEO Strategy
- **Primary keyword pattern**: "Is [product name] recalled", "Is [brand] recalled"
- **Programmatic pages**: `/recalls/[slug]` — one page per recall, ISR with 24h revalidation
- **Category pages**: `/recalls/category/[category]` — toys, cribs, strollers, car seats, etc.
- **Blog content**: "How to check if a product is recalled", "Most recalled baby products [year]"
- **Schema markup**: Product, FAQPage, BreadcrumbList structured data
- **Internal linking**: Each recall page links to related recalls, category pages, and the scanner

## Revenue Model
| Tier | Price | Features |
|------|-------|----------|
| Free | $0 | Unlimited scans, search, 7-day history |
| Premium | $2.99/mo | Product inventory (500 items), push alerts, full history, no ads |
| Facility | $9.99/mo | Unlimited inventory, team accounts, compliance reports |

## LLM-Testable Design
All interactive elements include `data-testid` attributes for Playwright testing.
- `data-testid="header"` -- Page header
- `data-testid="nav"` -- Navigation bar
- `data-testid="logo-link"` -- Logo/home link
- `data-testid="nav-scan"` -- Scan nav link
- `data-testid="nav-inventory"` -- My Products nav link
- `data-testid="nav-login"` -- Sign in button
- `data-testid="main-content"` -- Main content area
- `data-testid="footer"` -- Page footer
- `data-testid="footer-privacy"` -- Privacy footer link
- `data-testid="footer-terms"` -- Terms footer link
- `data-testid="footer-contact"` -- Contact footer link
- `data-testid="hero-section"` -- Hero section
- `data-testid="hero-title"` -- Hero heading
- `data-testid="hero-subtitle"` -- Hero subheading
- `data-testid="hero-cta"` -- Hero CTA button group
- `data-testid="cta-scan-button"` -- Scan barcode CTA button
- `data-testid="cta-browse-button"` -- Browse recalls CTA button
- `data-testid="stats-section"` -- Statistics section
- `data-testid="stat-products-scanned"` -- Products scanned counter
- `data-testid="stat-recalls-tracked"` -- Recalls tracked counter
- `data-testid="stat-families-protected"` -- Families protected counter
- `data-testid="how-it-works-section"` -- How it works section
- `data-testid="step-scan"` -- Step 1: Scan
- `data-testid="step-check"` -- Step 2: Check
- `data-testid="step-protect"` -- Step 3: Protect
- `data-testid="features-section"` -- Features section
- `data-testid="feature-scanner"` -- Barcode scanning feature
- `data-testid="feature-cpsc"` -- CPSC data feature
- `data-testid="feature-inventory"` -- Product inventory feature
- `data-testid="feature-alerts"` -- Push alerts feature
- `data-testid="feature-history"` -- Scan history feature
- `data-testid="feature-search"` -- Manual search feature
- `data-testid="cta-section"` -- Bottom CTA section
- `data-testid="cta-start-button"` -- Get started button

Convention: All new interactive elements MUST include a `data-testid` attribute.

## Environment Variables
See `.env.example` for required variables:
- `NEXT_PUBLIC_SUPABASE_URL` -- Supabase project URL (client-side accessible)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` -- Supabase anonymous key (client-side accessible)
- `STRIPE_SECRET_KEY` -- Stripe secret API key (server-only)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` -- Stripe publishable key (client-side accessible)
- `NEXT_PUBLIC_VAPID_PUBLIC_KEY` -- VAPID public key for web push (client-side accessible)
- `VAPID_PRIVATE_KEY` -- VAPID private key for web push (server-only)
- `TEST_MODE` -- Enable test mode (bypasses rate limits, enables test accounts)
- `NEXT_PUBLIC_APP_URL` -- Public app URL (client-side accessible)

**IMPORTANT**: Any environment variable accessed in client components or browser code MUST be prefixed with `NEXT_PUBLIC_`. Server-only secrets (like `STRIPE_SECRET_KEY`) do NOT get the prefix.

## Model & Effort
Always use Claude Opus 4.6 with max effort.

## Version
0.1.0
