# BillWatch Architecture

## System Overview

BillWatch is a utility bill tracking and anomaly detection platform built on Next.js 15, Supabase, and Vercel. The architecture prioritizes client-side OCR (zero server cost), time-series data management, and SEO content for utility cost queries.

```
┌──────────────────────────────────────────────────────────┐
│                     Vercel Edge Network                   │
│  ┌──────────┐  ┌──────────────┐  ┌────────────────────┐  │
│  │ SSG Pages│  │  ISR Pages   │  │  API Routes        │  │
│  │ (state/  │  │  (city-level │  │  /api/bills        │  │
│  │  guides) │  │   cost data) │  │  /api/anomalies    │  │
│  │          │  │              │  │  /api/benchmarks   │  │
│  │          │  │              │  │  /api/webhooks     │  │
│  └──────────┘  └──────────────┘  └────────────────────┘  │
└──────────────────────┬──────────────────────────────────┘
                       │
          ┌────────────┴────────────┐
          │                         │
┌─────────▼───────────┐   ┌────────▼────────┐
│   Supabase          │   │   Stripe        │
│  ┌───────────────┐  │   │  Subscriptions  │
│  │ PostgreSQL    │  │   │  Webhooks       │
│  │  + RLS        │  │   └─────────────────┘
│  ├───────────────┤  │
│  │ Auth          │  │
│  │ Email+OAuth   │  │
│  ├───────────────┤  │
│  │ Storage       │  │
│  │ (bill images) │  │
│  ├───────────────┤  │
│  │ Edge Funcs    │  │
│  │ (anomaly det) │  │
│  └───────────────┘  │
└─────────────────────┘

┌───────────────────────────────┐
│   Client-Side Processing      │
│  ┌─────────────────────────┐  │
│  │ Tesseract.js Web Worker │  │
│  │ (OCR engine, runs in    │  │
│  │  browser, zero server   │  │
│  │  cost)                  │  │
│  └─────────────────────────┘  │
│  ┌─────────────────────────┐  │
│  │ Bill Data Parser        │  │
│  │ (regex extraction of    │  │
│  │  amount, usage, rate)   │  │
│  └─────────────────────────┘  │
└───────────────────────────────┘
```

## Components

### Frontend (Next.js 15 App Router)

| Route | Type | Description |
|-------|------|-------------|
| `/` | SSG | Landing page with value prop, upload CTA |
| `/upload` | SSR (authed) | Bill upload page with OCR processing |
| `/dashboard` | SSR (authed) | Bill history, charts, anomaly alerts |
| `/dashboard/[account_id]` | SSR (authed) | Individual utility account detail |
| `/benchmark` | SSR (authed) | Household comparison tool |
| `/guides/[state]` | SSG | "Why is my electric bill so high in [state]" |
| `/guides/[state]/[utility_type]` | ISR | "Average [utility] bill in [state]" |
| `/pricing` | SSG | Pricing page |
| `/blog/[slug]` | SSG | SEO content articles |

### API Routes

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/bills` | POST | Auth | Save extracted bill data |
| `/api/bills` | GET | Auth | Get user's bill history |
| `/api/bills/[id]` | GET | Auth | Get single bill detail |
| `/api/bills/[id]` | PATCH | Auth | Update/correct bill data |
| `/api/accounts` | POST | Auth | Create utility account |
| `/api/accounts` | GET | Auth | Get user's utility accounts |
| `/api/anomalies` | GET | Auth | Get detected anomalies |
| `/api/anomalies/[id]/dismiss` | POST | Auth | Dismiss an anomaly |
| `/api/benchmarks` | GET | Auth | Get benchmarks for user's profile |
| `/api/user/profile` | GET/PATCH | Auth | Get/update household profile |
| `/api/webhooks/stripe` | POST | Stripe | Stripe webhook handler |

## Data Flow

### Bill Upload & OCR Flow
```
User uploads bill image/PDF
  → Client stores file in browser memory
  → Tesseract.js Web Worker processes image
  → Raw OCR text extracted
  → Bill parser applies utility-specific regex patterns
  → Extracts: provider name, amount due, usage (kWh/therms/gallons),
    rate per unit, billing period start/end, account number
  → User reviews extracted data, corrects errors
  → POST /api/bills with extracted data
  → Upload image to Supabase Storage (for reference)
  → Server validates, saves to `bills` table
  → Anomaly detection runs on new data point
  → If anomaly found → insert into `anomalies` table
  → Dashboard updates
```

### Anomaly Detection Flow
```
New bill saved to database
  → Supabase trigger fires
  → Fetch last 12 months of bills for same utility account
  → Calculate rolling mean and standard deviation
  → Apply seasonal adjustment (compare to same month last year)
  → If current bill > mean + 2*stddev → flag as anomaly
  → Categorize: usage_spike, rate_change, billing_error, seasonal
  → Insert anomaly record with severity (low/medium/high)
  → If high severity → queue email notification
```

### Benchmarking Flow
```
User views benchmark page
  → GET /api/benchmarks
  → Server queries aggregated anonymous data:
    same zip code prefix (3-digit), similar sqft range (±500), similar household size
  → Returns: average usage, average cost, percentile ranking
  → Rendered as comparison charts
```

## Database Schema

### users (extended profile)
```sql
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  display_name TEXT,
  zip_code TEXT,
  home_sqft INTEGER,
  household_size INTEGER,
  home_type TEXT CHECK (home_type IN ('apartment', 'condo', 'townhouse', 'single_family', 'other')),
  heating_type TEXT CHECK (heating_type IN ('gas', 'electric', 'oil', 'propane', 'heat_pump', 'other')),
  cooling_type TEXT CHECK (cooling_type IN ('central_ac', 'window_ac', 'heat_pump', 'none', 'other')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### utility_accounts
```sql
CREATE TABLE utility_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  provider_id UUID REFERENCES providers(id),
  provider_name TEXT NOT NULL,
  account_type TEXT NOT NULL CHECK (account_type IN ('electric', 'gas', 'water', 'sewer', 'trash', 'internet', 'other')),
  account_nickname TEXT,
  account_number_last4 TEXT, -- last 4 digits only for identification
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_utility_accounts_user ON utility_accounts(user_id);
```

### bills
```sql
CREATE TABLE bills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL REFERENCES utility_accounts(id),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  amount_cents INTEGER NOT NULL, -- store as cents for precision
  usage_quantity NUMERIC, -- kWh, therms, gallons, etc.
  usage_unit TEXT, -- 'kWh', 'therms', 'gallons', 'ccf'
  rate_per_unit NUMERIC, -- cost per unit
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  period_days INTEGER, -- computed: period_end - period_start
  due_date DATE,
  image_url TEXT, -- Supabase Storage URL
  ocr_confidence NUMERIC, -- 0-1 confidence score from Tesseract
  ocr_raw_text TEXT, -- raw OCR output for debugging
  is_manually_entered BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_bills_account ON bills(account_id);
CREATE INDEX idx_bills_user ON bills(user_id);
CREATE INDEX idx_bills_period ON bills(period_start, period_end);
```

### anomalies
```sql
CREATE TABLE anomalies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bill_id UUID NOT NULL REFERENCES bills(id),
  account_id UUID NOT NULL REFERENCES utility_accounts(id),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  anomaly_type TEXT NOT NULL CHECK (anomaly_type IN ('usage_spike', 'rate_change', 'billing_error', 'seasonal_unexpected', 'provider_wide')),
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high')),
  description TEXT NOT NULL, -- human-readable explanation
  expected_amount_cents INTEGER, -- what the bill should have been
  actual_amount_cents INTEGER,
  z_score NUMERIC, -- how many std devs from mean
  is_dismissed BOOLEAN DEFAULT FALSE,
  dismissed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_anomalies_user ON anomalies(user_id);
CREATE INDEX idx_anomalies_account ON anomalies(account_id);
CREATE INDEX idx_anomalies_severity ON anomalies(severity);
```

### providers
```sql
CREATE TABLE providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  service_area_states TEXT[], -- array of state abbreviations
  utility_types TEXT[], -- array of utility types served
  is_deregulated BOOLEAN DEFAULT FALSE,
  website_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_providers_slug ON providers(slug);
```

### benchmarks (materialized)
```sql
CREATE MATERIALIZED VIEW benchmarks AS
SELECT
  LEFT(up.zip_code, 3) AS zip_prefix,
  ua.account_type,
  CASE
    WHEN up.home_sqft < 1000 THEN 'small'
    WHEN up.home_sqft < 2000 THEN 'medium'
    ELSE 'large'
  END AS home_size_bucket,
  up.household_size,
  EXTRACT(MONTH FROM b.period_start) AS bill_month,
  AVG(b.amount_cents) AS avg_amount_cents,
  PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY b.amount_cents) AS median_amount_cents,
  AVG(b.usage_quantity) AS avg_usage,
  COUNT(DISTINCT b.user_id) AS sample_size
FROM bills b
JOIN utility_accounts ua ON ua.id = b.account_id
JOIN user_profiles up ON up.id = b.user_id
WHERE up.zip_code IS NOT NULL AND up.home_sqft IS NOT NULL
GROUP BY zip_prefix, ua.account_type, home_size_bucket, up.household_size, bill_month;
```

### subscriptions
```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  stripe_customer_id TEXT NOT NULL,
  stripe_subscription_id TEXT,
  plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'premium')),
  status TEXT NOT NULL CHECK (status IN ('active', 'canceled', 'past_due', 'trialing')),
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_subscriptions_user ON subscriptions(user_id);
```

## External Services

| Service | Purpose | Integration |
|---------|---------|-------------|
| Supabase | Database, Auth, Storage | `@supabase/supabase-js` + `@supabase/ssr` |
| Tesseract.js | Client-side OCR | `tesseract.js` npm package, Web Worker |
| Stripe | Payments | `stripe` SDK + webhooks |
| Vercel | Hosting, Edge, Analytics | Vercel CLI + git push deploy |
| EIA API (future) | Utility rate data | REST API for energy pricing |

## Auth Flow

1. User clicks "Sign In" -> Supabase Auth UI (email or Google OAuth)
2. On successful auth -> Supabase creates `auth.users` row
3. Database trigger creates `user_profiles` row with defaults
4. Onboarding flow collects: zip code, home sqft, household size, heating type
5. Middleware checks auth on protected routes (`/upload`, `/dashboard`, `/benchmark`)
6. RLS policies: users see only their own bills, accounts, and anomalies
7. Subscription status checked for feature gating (account limits, history depth)

## Deployment

- **Platform**: Vercel
- **Build**: `bun run build` produces SSG state guide pages + serverless API functions
- **ISR**: City/utility-level pages revalidate every 7 days
- **Environment**: Production secrets via Vercel environment variables
- **Preview**: Every PR gets a preview deployment
- **Monitoring**: Vercel Analytics + Vercel Speed Insights
- **CI**: GitHub Actions runs lint + test before deploy
- **Storage**: Bill images stored in Supabase Storage with user-scoped buckets
