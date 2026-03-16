# ReceiptGuard — Grocery Overcharge Detection

## Status: Scaffold Complete

## Product Overview
ReceiptGuard lets shoppers scan their grocery receipt, extract line items via OCR, cross-reference prices against advertised deals and store circulars, and flag overcharges. US grocery stores overcharge consumers an estimated $1-3 billion annually through scanner errors, expired promotions left in systems, and weight discrepancies. ReceiptGuard puts evidence in shoppers' hands.

### Target User
- Budget-conscious grocery shoppers (primary, 130M+ US households)
- Coupon and deal hunters who want to verify advertised prices were applied
- Families with large grocery bills ($200+/week) where small errors add up
- Consumer advocates and price-monitoring communities
- Shoppers at stores with "scanner accuracy guarantee" policies (get the item free if overcharged)

### Key Features (MVP)
1. **Receipt Scanner** — PWA camera-based receipt capture with Tesseract.js OCR
2. **Line Item Extraction** — Parse OCR text into structured line items (product name, quantity, unit price, total, tax)
3. **Price Comparison** — Cross-reference extracted prices against known store prices and current circulars
4. **Discrepancy Report** — Flag items where charged price exceeds advertised price, with difference amounts
5. **Store Price Database** — Crowdsourced price database built from user scans (anonymized)
6. **Savings Tracker** — Running total of overcharges detected and money recovered
7. **SEO Landing Pages** — "Is [store] overcharging" and "[store] scanner accuracy" programmatic pages
8. **Receipt History** — Archive of scanned receipts with overcharge flags

### Revenue Model
- **Free tier**: Unlimited scans, basic overcharge detection, 7-day history (ads supported)
- **Premium ($2.99/mo)**: No ads, full history, savings tracker, refund request generator, price alerts
- **Family ($4.99/mo)**: Premium + 5 family members, shared savings dashboard, monthly savings report

## Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Framework | Next.js 15 (App Router) | SSR/SSG for SEO, React Server Components |
| Runtime | Bun | Fast installs, native TypeScript |
| Database | Supabase (Postgres + Auth) | Full-text search for products, RLS for user data, aggregation for price DB |
| Storage | Supabase Storage | Receipt images, processed OCR data |
| Auth | Supabase Auth | Email + Google OAuth, anonymous for free tier |
| Payments | Stripe | $2.99/mo premium subscription |
| Deploy | Vercel | Edge functions, ISR for SEO |
| OCR | Tesseract.js (client-side) + Sharp (server-side) | Free, runs in browser, no API costs |
| Image Processing | Sharp (server-side) | Receipt image enhancement for better OCR accuracy |
| Testing | Vitest + Playwright | Unit/integration + E2E |
| Styling | Tailwind CSS 4 | Utility-first, fast iteration |

## Model & Effort
Always use Claude Opus 4.6 with max effort.

## Build / Test / Deploy
```bash
cd receiptguard
bun install              # Install dependencies
bun run dev              # Start dev server (localhost:3008)
bun run test             # Run Vitest unit/integration tests (NOT bun test!)
bun run test:e2e         # Run Playwright E2E tests
bun run build            # Production build
bun run lint             # ESLint check
bun run typecheck        # TypeScript strict type check
```

**IMPORTANT**: Always use `bun run test` (which runs vitest via package.json script), NOT `bun test` (which invokes Bun's native test runner and will pick up Playwright files incorrectly).

## Project Structure
```
receiptguard/
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
      ocr/            # Tesseract.js OCR pipeline (future)
      parsing/        # Receipt parsing logic (future)
    types/            # TypeScript type definitions
      index.ts        # Shared types (Receipt, ReceiptItem, Store, etc.)
  e2e/                # Playwright E2E tests
    smoke.spec.ts     # Basic smoke tests for landing page
  public/             # Static assets
  docs/               # Architecture and design documents
```

## Architecture Decisions

### ADR-001: Client-Side OCR with Server Fallback
Tesseract.js runs OCR entirely in the browser, which eliminates server costs and keeps receipt images private. For low-quality images where client-side OCR fails, a server-side Tesseract fallback with Sharp image enhancement provides a second pass. No third-party OCR APIs needed.

### ADR-002: Receipt Parsing Pipeline
OCR output is messy. The parsing pipeline: (1) pre-process image (deskew, contrast, crop), (2) Tesseract OCR to text, (3) regex + heuristic parser to extract line items, (4) Claude API fallback for unstructured receipts that defy regex parsing. Each step is independently testable.

### ADR-003: Crowdsourced Price Database
Every scanned receipt contributes anonymized price data to a shared database. This creates a flywheel: more users = better price data = better overcharge detection = more users. Store-level price aggregation powers the comparison engine.

### ADR-004: Store Scanner Accuracy Policies
Many stores (Walmart, Kroger, Meijer, etc.) have "scanner accuracy guarantee" policies where if an item scans at the wrong price, you get it free or at reduced cost. ReceiptGuard highlights these policies and helps users file claims, which creates strong word-of-mouth.

### ADR-005: Freemium with Ad Support
Free tier includes unlimited scans and basic overcharge detection (supported by ads). Premium ($2.99/mo) removes ads, adds full history, savings tracker, and automated refund request generation. The free tier must be genuinely useful to drive SEO traffic.

## Data Model Overview
- `profiles` — User profiles (id, email, display_name, subscription_tier, stripe_customer_id, total_savings, created_at)
- `receipts` — Scanned receipts (id, user_id, store_id, image_path, ocr_text, receipt_date, subtotal, tax, total, item_count, overcharge_count, overcharge_total, scanned_at)
- `receipt_items` — Extracted line items (id, receipt_id, raw_text, product_name, quantity, unit_price, total_price, tax_flag, category, upc, is_overcharge, expected_price, overcharge_amount)
- `stores` — Store locations (id, chain_name, store_number, address, city, state, zip, lat, lng, scanner_guarantee_policy, created_at)
- `store_prices` — Crowdsourced price database (id, store_id, product_name, upc, price, unit, source, observed_date, reported_by_count)
- `circulars` — Store weekly ads/circulars (id, store_id, chain_name, start_date, end_date, items_json, source_url, scraped_at)
- `overcharge_claims` — Refund claim tracking (id, user_id, receipt_id, receipt_item_id, store_id, claim_amount, status, submitted_date, resolved_date, resolution_notes)
- `savings_log` — Savings tracker entries (id, user_id, receipt_id, amount_saved, source, logged_at)

## API Routes
- `POST /api/receipts/scan` — Upload receipt image, trigger OCR pipeline
- `POST /api/receipts/[id]/parse` — Parse OCR text into line items
- `POST /api/receipts/[id]/compare` — Compare line items against price database
- `GET /api/receipts` — List user's receipts
- `GET /api/receipts/[id]` — Get receipt with items and overcharges
- `GET /api/stores/search?q=&city=&state=` — Search store database
- `GET /api/stores/[id]/prices` — Get known prices for a store
- `GET /api/prices/search?product=&store=` — Search price database
- `POST /api/claims` — Submit overcharge claim
- `GET /api/savings` — Get user's savings summary
- `POST /api/webhooks/stripe` — Stripe webhook handler

## SEO Strategy
- **Primary keyword pattern**: "Grocery store overcharging", "[store] scanner errors", "How to get a refund for overcharge"
- **Programmatic pages**: `/stores/[chain]` — overcharge statistics and scanner accuracy per chain
- **Store policy pages**: `/stores/[chain]/scanner-guarantee` — how to use the store's own accuracy policy
- **Blog content**: "How to check your grocery receipt", "Most common grocery overcharges", "Stores that give you the item free if overcharged"
- **Schema markup**: FAQPage, HowTo, Organization, BreadcrumbList structured data
- **Internal linking**: Chain pages link to policy pages, policy pages link to the scanner tool

## LLM-Testable Design
All interactive elements include `data-testid` attributes for Playwright testing.
- `data-testid="header"` -- Page header
- `data-testid="nav"` -- Navigation bar
- `data-testid="logo-link"` -- Logo/home link
- `data-testid="nav-scan"` -- Scan receipt nav link
- `data-testid="nav-history"` -- History nav link
- `data-testid="nav-login"` -- Sign in button
- `data-testid="main-content"` -- Main content area
- `data-testid="footer"` -- Page footer
- `data-testid="hero-section"` -- Hero section
- `data-testid="hero-title"` -- Hero heading
- `data-testid="hero-subtitle"` -- Hero subheading
- `data-testid="cta-scan-button"` -- Scan receipt CTA button
- `data-testid="cta-demo-button"` -- Demo CTA button
- `data-testid="stats-section"` -- Statistics section
- `data-testid="stat-receipts-scanned"` -- Receipts scanned counter
- `data-testid="stat-overcharges-found"` -- Overcharges found counter
- `data-testid="stat-money-saved"` -- Money saved counter
- `data-testid="how-it-works-section"` -- How it works section
- `data-testid="step-scan"` -- Step 1: Scan
- `data-testid="step-detect"` -- Step 2: Detect
- `data-testid="step-save"` -- Step 3: Save
- `data-testid="features-section"` -- Features section
- `data-testid="feature-ocr"` -- OCR feature card
- `data-testid="feature-price-check"` -- Price comparison feature card
- `data-testid="feature-overcharge-alerts"` -- Overcharge alerts feature card
- `data-testid="feature-store-policies"` -- Store guarantee feature card
- `data-testid="feature-savings-tracker"` -- Savings tracker feature card
- `data-testid="feature-receipt-history"` -- Receipt history feature card
- `data-testid="cta-section"` -- Bottom CTA section
- `data-testid="cta-start-button"` -- Get started button

Convention: All new interactive elements MUST include a `data-testid` attribute.

## Environment Variables
See `.env.example` for required variables:
- `NEXT_PUBLIC_SUPABASE_URL` -- Supabase project URL (client-side accessible)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` -- Supabase anonymous key (client-side accessible)
- `STRIPE_SECRET_KEY` -- Stripe secret API key (server-only)
- `TEST_MODE` -- Enable test mode (bypasses rate limits, enables test accounts)
- `NEXT_PUBLIC_APP_URL` -- Public app URL (client-side accessible)

**IMPORTANT**: Any environment variable accessed in client components or browser code MUST be prefixed with `NEXT_PUBLIC_`. Server-only secrets (like `STRIPE_SECRET_KEY`) do NOT get the prefix.

## Version
0.1.0
