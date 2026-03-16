# LemonLens — Used Car AI Damage Detection for Buyers

## Status: Scaffold Complete

## Product Overview
LemonLens helps used car buyers detect hidden damage by analyzing listing photos with AI vision and decoding VINs for recall, flood, and title history. 40M+ used cars are sold in the US each year, and many have undisclosed damage from accidents, floods, or poor repairs. LemonLens gives buyers an AI-powered pre-inspection before they even visit the lot.

## Target User
- Used car buyers evaluating online listings (primary)
- Private party buyers meeting sellers from Craigslist, Facebook Marketplace, etc.
- Parents helping first-time car buyers avoid scams
- Small used car dealers doing quick intake assessments
- Insurance adjusters wanting a second opinion on damage claims

## MVP Features (v0.1.x)
1. **Photo Upload & AI Analysis** — Upload up to 20 photos of a used car, Gemini Vision API detects paint inconsistencies, panel gaps, misaligned body panels, overspray, and structural repair signs
2. **Risk Report** — Detailed damage assessment with annotated photos, confidence scores, and plain-language explanations
3. **VIN Decoder** — Enter VIN, decode vehicle specs via NHTSA API (year, make, model, trim, engine, safety ratings)
4. **VIN Recall Check** — Check for open recalls on the specific VIN via NHTSA Recalls API
5. **Listing URL Import** — Paste a used car listing URL, auto-scrape photos and VIN (Facebook Marketplace, Craigslist, Cars.com, etc.)
6. **Scan History** — Save past analyses with comparison notes
7. **SEO Landing Pages** — "How to spot hidden damage on [car make/model]" programmatic pages
8. **Shareable Reports** — Generate a shareable link to show a mechanic or friend

## Tech Stack
| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js 15 (App Router) | SSR/SSG for SEO, React Server Components |
| Runtime | Bun | Fast installs, native TypeScript |
| Database | Supabase (Postgres + Auth + Storage) | RLS for user data, storage for uploaded photos |
| Storage | Supabase Storage | User-uploaded car photos, generated report images |
| Auth | Supabase Auth | Email + Google OAuth, anonymous for single scans |
| Payments | Stripe | Per-scan ($4.99) and subscription ($14.99/mo unlimited) |
| Deploy | Vercel | Edge functions, image optimization |
| AI Vision | Gemini 2.0 Flash (Vision) | Image analysis for damage detection — fast, accurate, cost-effective |
| VIN Decode | NHTSA vPIC API | Free, authoritative vehicle identification |
| VIN Recalls | NHTSA Recalls API | Free recall lookup by VIN |
| Image Processing | Sharp (server-side) | Image resizing, optimization before AI analysis |

## Build / Test / Deploy
```bash
cd lemonlens
bun install              # Install dependencies
bun run dev              # Start dev server (localhost:3007)
bun run test             # Run Vitest unit/integration tests (NOT bun test!)
bun run test:e2e         # Run Playwright E2E tests
bun run build            # Production build
bun run lint             # ESLint check
bun run typecheck        # TypeScript strict type check
bun run db:migrate       # Run Supabase migrations (future)
bun run db:seed          # Seed database with sample data (future)
bun run db:types         # Generate TypeScript types from Supabase schema (future)
```

**IMPORTANT**: Always use `bun run test` (which runs vitest via package.json script), NOT `bun test` (which invokes Bun's native test runner and will pick up Playwright files incorrectly).

## Project Structure
```
lemonlens/
  src/
    app/              # Next.js App Router pages and layouts
      layout.tsx      # Root layout with header/footer shell
      page.tsx        # Landing page with hero, features, CTA
      globals.css     # Tailwind imports and CSS custom properties
    components/       # Reusable React components
    lib/              # Utility functions and helpers
      env.ts          # Environment variable accessors
      env.test.ts     # Unit tests for env helpers
      test-setup.ts   # Vitest setup file
    types/            # TypeScript type definitions
      index.ts        # Shared types (Scan, DamageReport, VinDecode, etc.)
  e2e/                # Playwright E2E tests (excluded from tsconfig)
    smoke.spec.ts     # Landing page smoke tests
  public/             # Static assets
  docs/               # Architecture and design documents
```

## Architecture Decisions

### ADR-001: Gemini Vision for Damage Detection
Gemini 2.0 Flash provides excellent image analysis capabilities at a fraction of the cost of GPT-4 Vision. The structured prompt approach asks Gemini to analyze specific damage indicators: paint color consistency, panel gap uniformity, overspray patterns, body line alignment, and repair tell-tales. Results are returned as structured JSON with confidence scores.

### ADR-002: Multi-Photo Analysis Pipeline
Users upload multiple photos. The server-side pipeline: (1) resize/optimize with Sharp, (2) upload to Supabase Storage, (3) send all photos in a single Gemini API call with a detailed analysis prompt, (4) parse structured response, (5) store results. Single API call per scan keeps costs predictable.

### ADR-003: NHTSA APIs for VIN Data
NHTSA provides free, authoritative VIN decoding and recall data. No API key required. We cache VIN decode results permanently (vehicle specs don't change) and recall data for 24 hours (new recalls are added periodically).

### ADR-004: Per-Scan + Subscription Hybrid
Casual buyers want one scan ($4.99) when they find a car they like. Dealers and frequent buyers want unlimited scans ($14.99/mo). The per-scan model has lower friction for first-time users, and subscription captures power users.

### ADR-005: Shareable Reports via Public URLs
Each analysis generates a unique shareable URL (e.g., `/reports/[uuid]`). This serves dual purpose: users share with mechanics/friends, and shared reports drive organic traffic and brand awareness.

## Data Model

### Core Tables
- `profiles` — User profiles (id, email, display_name, subscription_tier, stripe_customer_id, scans_remaining, created_at)
- `scans` — Vehicle scan sessions (id, user_id, vin, listing_url, status, created_at, completed_at, share_token)
- `scan_photos` — Uploaded photos per scan (id, scan_id, file_path, original_filename, order_index, width, height, uploaded_at)
- `damage_reports` — AI analysis results (id, scan_id, overall_risk_score, summary, findings_json, model_used, tokens_used, analyzed_at)
- `damage_findings` — Individual findings (id, damage_report_id, finding_type, description, severity, confidence, photo_id, bounding_box_json, recommendation)
- `vin_decodes` — Cached VIN decode results (id, vin, year, make, model, trim, engine, body_class, plant_city, plant_country, decoded_at)
- `vin_recalls` — Cached recall data per VIN (id, vin, nhtsa_campaign_number, component, summary, consequence, remedy, checked_at)
- `scan_history` — User notes on scans (id, scan_id, user_id, notes, asking_price, seller_name, decision, created_at)

## APIs

### Internal API Routes
- `POST /api/scans` — Create new scan session
- `POST /api/scans/[id]/photos` — Upload photos to scan
- `POST /api/scans/[id]/analyze` — Trigger Gemini Vision analysis
- `GET /api/scans/[id]` — Get scan with analysis results
- `GET /api/scans` — List user's scan history
- `GET /api/reports/[share_token]` — Public shareable report
- `POST /api/vin/decode` — Decode VIN via NHTSA API
- `GET /api/vin/[vin]/recalls` — Get recalls for VIN
- `POST /api/listings/import` — Import photos from listing URL
- `POST /api/webhooks/stripe` — Stripe webhook handler

### External APIs
- **Gemini Vision API**: `POST https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent`
- **NHTSA VIN Decoder**: `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/{vin}?format=json`
- **NHTSA Recalls**: `https://api.nhtsa.gov/recalls/recallsByVehicle?make={make}&model={model}&modelYear={year}`
- **Stripe**: Per-scan payments and subscription management

## SEO Strategy
- **Primary keyword pattern**: "How to spot hidden damage on used car", "Used car damage check", "[make model] common problems"
- **Programmatic pages**: `/guides/[make]/[model]` — damage detection guide per vehicle, ISR with 7-day revalidation
- **Report pages**: `/reports/[share_token]` — public analysis reports (noindex but crawlable for brand)
- **Blog content**: "Signs of a repainted car", "How to check for flood damage", "Used car inspection checklist"
- **Schema markup**: Product, HowTo, FAQPage, BreadcrumbList structured data
- **Internal linking**: Make/model guides link to scanner, reports link to relevant guides

## Revenue Model
| Tier | Price | Features |
|------|-------|----------|
| Free | $0 | VIN decode + recall check only (no photo analysis) |
| Per Scan | $4.99/scan | Full AI photo analysis + VIN decode + shareable report |
| Premium | $14.99/mo | Unlimited scans, listing URL import, priority analysis, scan history |
| Dealer | $49.99/mo | API access, bulk VIN checks, white-label reports |

## LLM-Testable Design
All interactive elements include `data-testid` attributes for Playwright testing.
- `data-testid="header"` -- Page header
- `data-testid="nav"` -- Navigation bar
- `data-testid="logo-link"` -- Logo/home link
- `data-testid="nav-scan"` -- Scan a car nav link
- `data-testid="nav-history"` -- My scans nav link
- `data-testid="nav-login"` -- Sign in button
- `data-testid="main-content"` -- Main content area
- `data-testid="footer"` -- Page footer
- `data-testid="hero-section"` -- Hero section
- `data-testid="hero-title"` -- Hero heading
- `data-testid="hero-subtitle"` -- Hero subheading
- `data-testid="cta-scan-button"` -- Scan CTA button
- `data-testid="cta-demo-button"` -- Demo CTA button
- `data-testid="stats-section"` -- Statistics section
- `data-testid="stat-cars-scanned"` -- Cars scanned counter
- `data-testid="stat-damage-found"` -- Hidden damage found counter
- `data-testid="stat-money-saved"` -- Money saved counter
- `data-testid="how-it-works-section"` -- How it works section
- `data-testid="step-upload"` -- Step 1: Upload Photos
- `data-testid="step-analyze"` -- Step 2: AI Damage Scan
- `data-testid="step-report"` -- Step 3: Get Your Report
- `data-testid="features-section"` -- Features section
- `data-testid="feature-ai-vision"` -- AI damage detection feature
- `data-testid="feature-vin-decode"` -- VIN decoder feature
- `data-testid="feature-recall-check"` -- Recall alerts feature
- `data-testid="feature-listing-import"` -- Listing URL import feature
- `data-testid="feature-shareable-reports"` -- Shareable reports feature
- `data-testid="feature-scan-history"` -- Scan history feature
- `data-testid="cta-section"` -- Bottom CTA section
- `data-testid="cta-start-button"` -- Get started button
- `data-testid="footer-privacy"` -- Privacy link
- `data-testid="footer-terms"` -- Terms link
- `data-testid="footer-contact"` -- Contact link

Convention: All new interactive elements MUST include a `data-testid` attribute.

## Environment Variables
See `.env.example` for required variables:
- `NEXT_PUBLIC_SUPABASE_URL` -- Supabase project URL (client-side accessible)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` -- Supabase anonymous key (client-side accessible)
- `GEMINI_API_KEY` -- Gemini API key for AI damage detection (server-only)
- `STRIPE_SECRET_KEY` -- Stripe secret API key (server-only)
- `TEST_MODE` -- Enable test mode (bypasses rate limits, enables test accounts)
- `NEXT_PUBLIC_APP_URL` -- Public app URL (client-side accessible)

**IMPORTANT**: Any environment variable accessed in client components or browser code MUST be prefixed with `NEXT_PUBLIC_`. Server-only secrets (like `STRIPE_SECRET_KEY`, `GEMINI_API_KEY`) do NOT get the prefix.

## Model & Effort
Always use Claude Opus 4.6 with max effort.

## Version
0.1.0
