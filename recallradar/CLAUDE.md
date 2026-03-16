# RecallRadar — Product Recall Barcode Scanner for Parents

## Status: Planning Complete

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
# Install dependencies
bun install

# Development server
bun dev

# Build for production
bun run build

# Run unit tests
bun test

# Run E2E tests
bunx playwright test

# Lint
bun run lint

# Type check
bun run typecheck

# Database migrations
bunx supabase db push

# Generate Supabase types
bunx supabase gen types typescript --local > src/lib/database.types.ts
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

## Model & Effort
Always use Claude Opus 4.6 with max effort.

## Version
0.0.0
