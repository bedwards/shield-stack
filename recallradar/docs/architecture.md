# RecallRadar Architecture

## System Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser (PWA)                         │
│  ┌──────────┐  ┌──────────────┐  ┌────────────────────────┐ │
│  │ Camera    │  │ QuaggaJS/    │  │ React (Next.js App     │ │
│  │ Stream    │──│ ZXing WASM   │──│ Router) UI             │ │
│  │           │  │ Barcode Scan │  │                        │ │
│  └──────────┘  └──────────────┘  └────────────────────────┘ │
│                        │                      │              │
└────────────────────────┼──────────────────────┼──────────────┘
                         │ UPC code             │ Auth / Data
                         ▼                      ▼
┌─────────────────────────────────────────────────────────────┐
│                    Vercel (Next.js API)                       │
│  ┌──────────┐  ┌──────────────┐  ┌────────────────────────┐ │
│  │ /api/scan │  │ /api/recalls │  │ /api/inventory         │ │
│  │           │  │ /api/history │  │ /api/push              │ │
│  └─────┬────┘  └──────┬───────┘  └────────────┬───────────┘ │
│        │               │                       │             │
│  ┌─────▼────────────────▼───────────────────────▼──────────┐ │
│  │                  Cron: /api/cron/sync-recalls            │ │
│  └─────────────────────────┬───────────────────────────────┘ │
└────────────────────────────┼─────────────────────────────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
┌──────────────────┐ ┌─────────────┐ ┌──────────────┐
│   Supabase       │ │ CPSC API    │ │ Stripe       │
│   (Postgres +    │ │ SaferProd-  │ │ (Payments)   │
│   Auth + Storage │ │ ucts.gov    │ │              │
│   + Realtime)    │ │             │ │              │
└──────────────────┘ └─────────────┘ └──────────────┘
```

## Components

### Frontend (PWA)
- **Scanner View**: Camera stream with real-time barcode detection overlay. Uses QuaggaJS for 1D barcodes (UPC-A, UPC-E, EAN-13, EAN-8) and @aspect-ratio/zxing-wasm as fallback. No server round-trip for decoding.
- **Result View**: Green/red status card with recall details, remedy instructions, and manufacturer contact. Animated transition from scan to result.
- **Inventory View**: Grid/list of saved products with recall status badges. Search and filter by category/room.
- **History View**: Chronological scan log with timestamps and status at time of scan.
- **SEO Pages**: ISR-rendered pages for "Is [product] recalled" queries. Server Components fetch from Supabase cache.
- **Service Worker**: PWA manifest, offline support for inventory viewing, push notification handler.

### Backend (Vercel API Routes)
- **Scan Endpoint**: Receives UPC, checks Supabase cache (1hr TTL), falls back to CPSC API, caches result, returns status.
- **Recall Sync Cron**: Runs nightly via Vercel Cron. Fetches all new recalls from CPSC API, upserts into Supabase, triggers push notifications for matching inventory items.
- **Inventory CRUD**: Standard REST endpoints with Supabase RLS enforcement.
- **Push Service**: Manages Web Push subscriptions and sends notifications via the Web Push protocol.
- **Stripe Webhooks**: Handles checkout.session.completed, customer.subscription.updated, customer.subscription.deleted.

### External Services
- **CPSC SaferProducts.gov API**: Free REST API. No key required. Rate limit: ~100 req/min. Provides recall data by UPC, product name, date range.
- **Supabase**: Postgres database, authentication, file storage, real-time subscriptions.
- **Stripe**: Manages premium subscriptions ($2.99/mo). Checkout Sessions for signup, Customer Portal for management.

## Data Flow

### Scan Flow
1. User opens scanner view, grants camera permission
2. QuaggaJS/ZXing decodes barcode from camera stream (client-side)
3. UPC sent to `POST /api/scan`
4. Server checks `recalls` table for cached result (TTL: 1 hour)
5. If cache miss: query CPSC API by UPC, cache response in `recalls` + `recall_products`
6. Return recall status (safe/recalled) with details to client
7. Log scan in `scan_history` table
8. If user is authenticated and product is new, upsert into `products` table

### Alert Flow
1. Nightly cron job runs `GET /api/cron/sync-recalls`
2. Fetch recent recalls from CPSC API (last 48 hours to handle overlap)
3. Upsert new recalls into `recalls` and `recall_products` tables
4. Query `user_inventory` joined with `recall_products` for new matches
5. For each match, create `alerts` record and send Web Push notification
6. User taps notification, opens RecallRadar to the specific recall detail

### Subscription Flow
1. User taps "Upgrade to Premium" button
2. Frontend creates Stripe Checkout Session via `POST /api/stripe/checkout`
3. User completes payment on Stripe-hosted checkout
4. Stripe sends `checkout.session.completed` webhook to `/api/webhooks/stripe`
5. Server updates `profiles.subscription_tier` to "premium"
6. User redirected back to app with premium features unlocked

## Database Schema

### profiles
| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PK, references auth.users |
| email | text | NOT NULL |
| display_name | text | |
| subscription_tier | text | DEFAULT 'free', CHECK IN ('free', 'premium', 'facility') |
| stripe_customer_id | text | UNIQUE |
| created_at | timestamptz | DEFAULT now() |
| updated_at | timestamptz | DEFAULT now() |

### products
| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PK, DEFAULT gen_random_uuid() |
| upc | text | UNIQUE, NOT NULL |
| name | text | |
| brand | text | |
| category | text | |
| image_url | text | |
| first_scanned_at | timestamptz | DEFAULT now() |

### recalls
| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PK, DEFAULT gen_random_uuid() |
| cpsc_recall_id | text | UNIQUE, NOT NULL |
| title | text | NOT NULL |
| description | text | |
| remedy | text | |
| product_name | text | |
| manufacturer | text | |
| published_date | date | |
| hazard | text | |
| images | jsonb | DEFAULT '[]' |
| synced_at | timestamptz | DEFAULT now() |

### recall_products
| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PK, DEFAULT gen_random_uuid() |
| recall_id | uuid | FK recalls(id), NOT NULL |
| product_id | uuid | FK products(id) |
| upc | text | NOT NULL |
| UNIQUE(recall_id, upc) | | |

### user_inventory
| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PK, DEFAULT gen_random_uuid() |
| user_id | uuid | FK profiles(id), NOT NULL |
| product_id | uuid | FK products(id), NOT NULL |
| nickname | text | |
| room | text | |
| notes | text | |
| added_at | timestamptz | DEFAULT now() |
| UNIQUE(user_id, product_id) | | |

### scan_history
| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PK, DEFAULT gen_random_uuid() |
| user_id | uuid | FK profiles(id) |
| upc | text | NOT NULL |
| product_id | uuid | FK products(id) |
| recall_status | text | CHECK IN ('safe', 'recalled', 'unknown') |
| scanned_at | timestamptz | DEFAULT now() |

### push_subscriptions
| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PK, DEFAULT gen_random_uuid() |
| user_id | uuid | FK profiles(id), NOT NULL |
| endpoint | text | UNIQUE, NOT NULL |
| keys_p256dh | text | NOT NULL |
| keys_auth | text | NOT NULL |
| created_at | timestamptz | DEFAULT now() |

### alerts
| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PK, DEFAULT gen_random_uuid() |
| user_id | uuid | FK profiles(id), NOT NULL |
| recall_id | uuid | FK recalls(id), NOT NULL |
| product_id | uuid | FK products(id), NOT NULL |
| sent_at | timestamptz | DEFAULT now() |
| read_at | timestamptz | |

## API Routes

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | /api/scan | Optional | Submit UPC, return recall status |
| GET | /api/recalls/search | Public | Search recalls by name/brand |
| GET | /api/recalls/[id] | Public | Get recall details |
| POST | /api/inventory | Required | Add product to inventory |
| DELETE | /api/inventory/[id] | Required | Remove from inventory |
| GET | /api/inventory | Required | List inventory with recall status |
| GET | /api/history | Required | Get scan history |
| POST | /api/push/subscribe | Required | Register push subscription |
| POST | /api/webhooks/stripe | Stripe Sig | Handle Stripe webhooks |
| GET | /api/cron/sync-recalls | Vercel Cron | Nightly recall sync |

## Auth Strategy
- **Anonymous sessions**: Free tier users can scan without creating an account. Supabase anonymous auth tracks session.
- **Authenticated users**: Email or Google OAuth via Supabase Auth. Required for inventory, history, and push alerts.
- **RLS policies**: Users can only read/write their own inventory, history, and push subscriptions. Recalls and products are publicly readable.

## Deployment
- **Vercel**: Auto-deploy on push to main. Preview deployments on PRs.
- **Environment variables**: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`
- **Vercel Cron**: `vercel.json` configures `/api/cron/sync-recalls` to run at 3:00 AM UTC daily.
- **Domain**: TBD (recallradar.com or similar)
