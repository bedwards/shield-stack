# SkimpWatch — Ingredient & Quality Change Tracker

## Status: Planning Complete

## Product Overview

SkimpWatch lets consumers scan a product barcode and instantly see whether the manufacturer has changed the ingredients, portion size, or formulation over time. It crowdsources change reports, compares ingredient lists with AI, and alerts subscribers when products they care about are reformulated. The core value proposition: "Did [brand] change their recipe?" answered with dated evidence.

### Target User
- Health-conscious consumers, allergy sufferers, parents
- Frugal shoppers noticing quality decline ("shrinkflation")
- Food bloggers and consumer advocates
- Anyone who Googles "did [brand] change their recipe"

### MVP Features (v0.1)
1. **Barcode Scanner** — PWA camera-based barcode scanning via QuaggaJS/ZXing
2. **Product Lookup** — Fetch current ingredient data from Open Food Facts API
3. **Ingredient History Timeline** — Show dated snapshots of ingredient lists per product
4. **Change Detection** — AI-powered diff highlighting additions, removals, and substitutions
5. **Crowdsourced Reports** — Users submit ingredient photos when they notice changes
6. **SEO Landing Pages** — Pre-built pages for top brands: "Did [brand] change their [product] recipe"
7. **Allergen Watchlist** (premium) — Alert when a tracked product adds a user-flagged allergen
8. **Email/Push Alerts** (premium) — Notifications for changes to saved products

### Revenue Model
- **Free tier**: Barcode scan, view history, see changes (ad-supported via Google AdSense)
- **Premium ($2.99/mo)**: Allergen watchlist, push alerts, ad-free, unlimited saved products
- Stripe for subscription billing

## Tech Stack & Rationale

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Next.js 15 (App Router) | SSR/SSG for SEO landing pages, React for PWA scanner UI |
| Database | Supabase (Postgres + Auth + Storage) | Row-level security, real-time subscriptions for alerts, image storage for ingredient photos |
| Auth | Supabase Auth | Email + Google OAuth, integrated with RLS |
| Payments | Stripe | Subscription billing for premium tier |
| Deploy | Vercel | Edge functions, preview deployments, zero-config Next.js |
| Package Manager | bun | Fast installs, native TypeScript |
| Barcode Scanning | QuaggaJS or ZXing-js | Client-side barcode decoding from camera stream |
| Ingredient Data | Open Food Facts API | Free, open-source food product database |
| AI Diff | Claude API | Ingredient list comparison and change summarization |
| Image OCR | Tesseract.js | Extract ingredient text from user-uploaded photos |
| Ads | Google AdSense | Monetize free tier |

## Build / Test / Deploy

```bash
# Install dependencies
cd skimpwatch && bun install

# Development
bun dev                    # Next.js dev server on :3000

# Build
bun run build              # Production build

# Test
bun test                   # Unit tests (Vitest)
bun run test:e2e           # Playwright E2E tests

# Lint
bun run lint               # ESLint + Prettier

# Database
bunx supabase db push      # Apply migrations
bunx supabase db reset     # Reset local DB

# Type checking
bun run typecheck          # tsc --noEmit

# Deploy
# Automatic via Vercel on push to main
# Preview deploys on PRs
```

## Architecture

### High-Level Components
1. **Web App (Next.js)** — SSR landing pages + PWA barcode scanner SPA
2. **API Routes (Next.js Route Handlers)** — Product lookup, change reports, user preferences
3. **Supabase Backend** — Postgres DB, Auth, Storage (ingredient photos), Edge Functions
4. **External APIs** — Open Food Facts (product data), Claude API (ingredient diff), Tesseract.js (OCR)
5. **Background Jobs** — Supabase Edge Functions for periodic ingredient re-checks and alert dispatch

### Data Model

**products** — Canonical product records keyed by barcode
- `id` (uuid, PK), `barcode` (text, unique, indexed), `name` (text), `brand` (text), `category` (text), `image_url` (text), `current_ingredients` (text), `created_at` (timestamptz), `updated_at` (timestamptz)

**ingredient_snapshots** — Point-in-time ingredient captures
- `id` (uuid, PK), `product_id` (uuid, FK->products), `ingredients_text` (text), `ingredients_normalized` (jsonb), `source` (enum: openfoodfacts, user_report, automated_scan), `captured_at` (timestamptz), `captured_by` (uuid, FK->auth.users, nullable), `image_url` (text, nullable), `created_at` (timestamptz)

**ingredient_changes** — Detected changes between snapshots
- `id` (uuid, PK), `product_id` (uuid, FK->products), `old_snapshot_id` (uuid, FK->ingredient_snapshots), `new_snapshot_id` (uuid, FK->ingredient_snapshots), `change_type` (enum: addition, removal, substitution, reorder), `change_summary` (text), `ai_analysis` (jsonb), `severity` (enum: minor, moderate, major), `detected_at` (timestamptz)

**user_watchlist** — Products a user is tracking
- `id` (uuid, PK), `user_id` (uuid, FK->auth.users), `product_id` (uuid, FK->products), `alert_on_any_change` (boolean), `allergen_alerts` (jsonb), `created_at` (timestamptz)

**change_reports** — Crowdsourced reports from users
- `id` (uuid, PK), `product_id` (uuid, FK->products), `reporter_id` (uuid, FK->auth.users), `photo_url` (text), `description` (text), `ingredients_text` (text, nullable), `status` (enum: pending, verified, rejected), `created_at` (timestamptz)

**profiles** — Extended user profile
- `id` (uuid, PK, FK->auth.users), `display_name` (text), `subscription_tier` (enum: free, premium), `stripe_customer_id` (text, nullable), `allergens` (jsonb), `created_at` (timestamptz), `updated_at` (timestamptz)

### API Routes
- `GET /api/products/[barcode]` — Lookup product by barcode, fetch from OFF if not cached
- `GET /api/products/[barcode]/history` — Ingredient change timeline
- `POST /api/products/[barcode]/report` — Submit crowdsourced change report (auth required)
- `GET /api/products/search?q=` — Search products by name/brand
- `GET /api/watchlist` — Get user's watchlist (auth required)
- `POST /api/watchlist` — Add product to watchlist (auth required)
- `DELETE /api/watchlist/[id]` — Remove from watchlist (auth required)
- `POST /api/scan` — Process barcode scan, return product + changes
- `POST /api/webhooks/stripe` — Stripe webhook for subscription events

### SEO Strategy
- **Programmatic pages**: `/brands/[brand]/[product]` — "Did [brand] change [product] recipe"
- **Blog/guide pages**: `/guides/shrinkflation-tracker`, `/guides/ingredient-changes-[year]`
- **City/category pages**: `/categories/[category]/changes` — "Recent ingredient changes in [category]"
- **Schema.org markup**: Product, FAQPage structured data
- **Sitemap**: Auto-generated from product database

### Revenue Integration
- Stripe Checkout for premium subscription ($2.99/mo)
- Stripe Customer Portal for subscription management
- Webhook handler for subscription lifecycle events
- AdSense integration on free-tier pages

## Version
0.1.0

## Model & Effort
Always use Claude Opus 4.6 with max effort.

## LLM-Testability
- All interactive elements have `data-testid` attributes
- `TEST_MODE=true` env var enables test accounts and bypasses rate limits
- Test seed data includes known products with ingredient change history
- No CAPTCHAs in test/preview environments
- E2E tests in `e2e/` directory using Playwright
