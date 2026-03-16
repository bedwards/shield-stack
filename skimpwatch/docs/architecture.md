# SkimpWatch — Architecture Document

## System Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Vercel Edge                          │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              Next.js 15 App Router                   │    │
│  │  ┌──────────┐  ┌──────────┐  ┌───────────────────┐ │    │
│  │  │ SSR/SSG  │  │   PWA    │  │  API Route        │ │    │
│  │  │ SEO      │  │ Barcode  │  │  Handlers         │ │    │
│  │  │ Pages    │  │ Scanner  │  │                    │ │    │
│  │  └──────────┘  └──────────┘  └───────────────────┘ │    │
│  └─────────────────────────────────────────────────────┘    │
└──────────────────────────┬──────────────────────────────────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
              ▼            ▼            ▼
┌──────────────────┐ ┌──────────┐ ┌──────────────────┐
│    Supabase      │ │  Claude  │ │  Open Food Facts  │
│  ┌────────────┐  │ │   API    │ │       API         │
│  │  Postgres  │  │ │(Diff AI) │ │  (Product Data)   │
│  ├────────────┤  │ └──────────┘ └──────────────────┘
│  │   Auth     │  │
│  ├────────────┤  │ ┌──────────────────┐
│  │  Storage   │  │ │   Tesseract.js   │
│  │  (Photos)  │  │ │  (Client-side    │
│  ├────────────┤  │ │   OCR)           │
│  │   Edge     │  │ └──────────────────┘
│  │ Functions  │  │
│  └────────────┘  │ ┌──────────────────┐
└──────────────────┘ │    Stripe         │
                     │  (Subscriptions)  │
                     └──────────────────┘
```

## Components

### 1. Next.js Web Application
- **SSR/SSG Pages**: SEO-optimized brand and product pages generated at build time and revalidated via ISR
- **PWA Barcode Scanner**: Camera-based barcode scanning using QuaggaJS or ZXing-js, runs entirely client-side
- **Dashboard**: User's tracked products, change alerts, watchlist management
- **API Route Handlers**: Server-side routes for product lookup, report submission, AI analysis

### 2. Barcode Scanner (Client-Side)
- QuaggaJS or ZXing-js for real-time barcode detection from camera stream
- Supports EAN-13, UPC-A, UPC-E barcode formats (standard food/consumer goods)
- Progressive Web App manifest for "Add to Home Screen" experience
- Falls back to manual barcode entry if camera is unavailable

### 3. Supabase Backend
- **Postgres**: Product data, ingredient snapshots, change history, user watchlists
- **Auth**: Email + Google OAuth with Row Level Security
- **Storage**: User-uploaded ingredient photos (change reports)
- **Edge Functions**: Periodic ingredient re-checking for tracked products, alert dispatch

### 4. External APIs
- **Open Food Facts API**: Product lookup by barcode, ingredient lists, nutrition data
- **Claude API**: Ingredient list diff analysis, change summarization, severity assessment
- **Tesseract.js**: Client-side OCR to extract ingredient text from user-uploaded photos

### 5. Stripe Integration
- Subscription billing for premium tier ($2.99/mo)
- Customer portal for subscription management
- Webhook handler for subscription lifecycle events

## Data Flow

### Barcode Scan Flow
```
User scans barcode
    → QuaggaJS/ZXing decodes barcode number
    → POST /api/scan { barcode }
    → Check Supabase for cached product
    → If not found: fetch from Open Food Facts API
    → Store/update product record
    → Fetch all ingredient_snapshots for product
    → If multiple snapshots exist: detect changes
    → Return product + ingredient history + changes
```

### Crowdsourced Report Flow
```
User notices ingredient change
    → Uploads photo of ingredient label
    → Tesseract.js extracts text (client-side)
    → POST /api/products/[barcode]/report { photo_url, ingredients_text }
    → Store as change_report (status: pending)
    → Background: Compare with latest snapshot
    → If different: Create new ingredient_snapshot
    → Run Claude API diff analysis
    → Create ingredient_change record
    → Notify watchlist subscribers
```

### Alert Flow
```
Supabase Edge Function (cron: daily)
    → For each product with active watchers
    → Fetch latest from Open Food Facts
    → Compare with most recent snapshot
    → If changed: Create snapshot + change record
    → Query user_watchlist for affected users
    → Send email/push notifications to premium users
```

## Database Schema

### products
| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PK, default gen_random_uuid() |
| barcode | text | UNIQUE, NOT NULL, indexed |
| name | text | NOT NULL |
| brand | text | |
| category | text | |
| image_url | text | |
| current_ingredients | text | |
| off_data | jsonb | Raw Open Food Facts response cache |
| created_at | timestamptz | default now() |
| updated_at | timestamptz | default now() |

### ingredient_snapshots
| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PK, default gen_random_uuid() |
| product_id | uuid | FK->products, NOT NULL, indexed |
| ingredients_text | text | NOT NULL |
| ingredients_normalized | jsonb | Parsed/normalized ingredient array |
| source | text | CHECK IN ('openfoodfacts', 'user_report', 'automated_scan') |
| captured_at | timestamptz | NOT NULL |
| captured_by | uuid | FK->auth.users, nullable |
| image_url | text | nullable, Storage URL |
| created_at | timestamptz | default now() |

### ingredient_changes
| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PK, default gen_random_uuid() |
| product_id | uuid | FK->products, NOT NULL, indexed |
| old_snapshot_id | uuid | FK->ingredient_snapshots, NOT NULL |
| new_snapshot_id | uuid | FK->ingredient_snapshots, NOT NULL |
| change_type | text | CHECK IN ('addition', 'removal', 'substitution', 'reorder') |
| change_summary | text | Human-readable summary |
| ai_analysis | jsonb | Full Claude API analysis |
| severity | text | CHECK IN ('minor', 'moderate', 'major') |
| detected_at | timestamptz | default now() |

### user_watchlist
| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PK, default gen_random_uuid() |
| user_id | uuid | FK->auth.users, NOT NULL, indexed |
| product_id | uuid | FK->products, NOT NULL |
| alert_on_any_change | boolean | default true |
| allergen_alerts | jsonb | Array of allergens to watch for |
| created_at | timestamptz | default now() |
| | | UNIQUE(user_id, product_id) |

### change_reports
| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PK, default gen_random_uuid() |
| product_id | uuid | FK->products, NOT NULL |
| reporter_id | uuid | FK->auth.users, NOT NULL |
| photo_url | text | Storage URL |
| description | text | |
| ingredients_text | text | OCR-extracted or manually entered |
| status | text | CHECK IN ('pending', 'verified', 'rejected'), default 'pending' |
| created_at | timestamptz | default now() |

### profiles
| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PK, FK->auth.users |
| display_name | text | |
| subscription_tier | text | CHECK IN ('free', 'premium'), default 'free' |
| stripe_customer_id | text | nullable |
| stripe_subscription_id | text | nullable |
| allergens | jsonb | User's allergen list |
| created_at | timestamptz | default now() |
| updated_at | timestamptz | default now() |

## API Routes

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | /api/products/[barcode] | No | Lookup product, fetch from OFF if not cached |
| GET | /api/products/[barcode]/history | No | Ingredient change timeline |
| POST | /api/products/[barcode]/report | Yes | Submit crowdsourced change report |
| GET | /api/products/search | No | Search products by name/brand |
| POST | /api/scan | No | Process barcode scan |
| GET | /api/watchlist | Yes | Get user's watchlist |
| POST | /api/watchlist | Yes (premium) | Add product to watchlist |
| DELETE | /api/watchlist/[id] | Yes | Remove from watchlist |
| POST | /api/webhooks/stripe | No (verified) | Stripe webhook handler |

## External Services

| Service | Purpose | Auth |
|---------|---------|------|
| Open Food Facts API | Product data by barcode | None (free, open API) |
| Claude API | Ingredient diff analysis | API key (server-side only) |
| Tesseract.js | OCR for ingredient photos | None (client-side library) |
| Stripe | Subscription billing | API key (server-side only) |
| Google AdSense | Ad revenue on free tier | Publisher ID |
| QuaggaJS/ZXing | Barcode scanning | None (client-side library) |

## Authentication

- **Provider**: Supabase Auth
- **Methods**: Email/password + Google OAuth
- **Session**: JWT tokens, httpOnly cookies via Supabase SSR helpers
- **RLS Policies**:
  - `profiles`: Users can read/update their own profile
  - `user_watchlist`: Users can CRUD their own watchlist items
  - `change_reports`: Users can create reports, read all verified reports
  - `products`, `ingredient_snapshots`, `ingredient_changes`: Public read access

## Deployment

- **Platform**: Vercel
- **Build**: `bun run build` (Next.js production build)
- **Environment Variables**:
  - `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anonymous key
  - `SUPABASE_SERVICE_ROLE_KEY` — Supabase service key (server-side only)
  - `ANTHROPIC_API_KEY` — Claude API key (server-side only)
  - `STRIPE_SECRET_KEY` — Stripe secret key (server-side only)
  - `STRIPE_WEBHOOK_SECRET` — Stripe webhook signing secret
  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — Stripe publishable key
  - `TEST_MODE` — Enable test mode (test/preview only)
- **CI**: GitHub Actions workflow triggered on changes to `skimpwatch/`
- **Preview**: Automatic preview deploys on PRs via Vercel
- **Production**: Automatic deploy on merge to main
