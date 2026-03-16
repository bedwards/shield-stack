# RepairFair Architecture

## System Overview

RepairFair is an AI-powered appliance repair pricing platform built on Next.js 15, Supabase, Claude API, and Vercel. The architecture centers on the AI diagnosis pipeline, a crowdsourced pricing database, and massive SEO surface area from programmatic appliance/repair/location pages.

```
┌──────────────────────────────────────────────────────────┐
│                     Vercel Edge Network                   │
│  ┌──────────┐  ┌──────────────┐  ┌────────────────────┐  │
│  │ SSG Pages│  │  ISR Pages   │  │  API Routes        │  │
│  │ (top     │  │  (long-tail  │  │  /api/diagnose     │  │
│  │  repair  │  │   appliance/ │  │  /api/estimates    │  │
│  │  combos) │  │   location)  │  │  /api/submissions  │  │
│  │          │  │              │  │  /api/webhooks     │  │
│  └──────────┘  └──────────────┘  └──────┬─────────────┘  │
└──────────────────────┬──────────────────┼───────────────┘
                       │                  │
          ┌────────────┴───────┐          │
          │                    │          │
┌─────────▼──────────┐  ┌─────▼──┐  ┌────▼──────────────┐
│   Supabase         │  │ Stripe │  │  Claude API       │
│  ┌──────────────┐  │  │        │  │  (Anthropic)      │
│  │ PostgreSQL   │  │  │        │  │  Symptom diagnosis │
│  │  + RLS       │  │  │        │  │  Structured output │
│  ├──────────────┤  │  │        │  └───────────────────┘
│  │ Auth         │  │  │        │
│  │ Email+OAuth  │  │  └────────┘
│  └──────────────┘  │
└────────────────────┘
```

## Components

### Frontend (Next.js 15 App Router)

| Route | Type | Description |
|-------|------|-------------|
| `/` | SSG | Landing page with symptom input CTA |
| `/diagnose` | SSR | Interactive AI diagnosis flow |
| `/diagnose/result/[id]` | SSR (authed) | Diagnosis result with price estimate |
| `/cost/[appliance]/[repair]` | SSG/ISR | "How much does [appliance] [repair] cost" |
| `/cost/[appliance]/[repair]/[city]` | ISR | Location-specific pricing page |
| `/appliance/[brand]/[model]` | ISR | Appliance model page with common issues |
| `/compare` | SSR | Repair vs replace calculator |
| `/submit-price` | SSR (authed) | Submit what you actually paid |
| `/pricing` | SSG | Product pricing page |
| `/blog/[slug]` | SSG | SEO content articles |

### API Routes

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/diagnose` | POST | Auth | Submit symptoms for AI diagnosis |
| `/api/diagnose/[id]` | GET | Auth | Get diagnosis result |
| `/api/diagnose/[id]/report` | POST | Auth | Generate premium report (paid) |
| `/api/estimates/[appliance]/[repair]` | GET | Public | Get price estimate for repair type |
| `/api/estimates/[appliance]/[repair]/[zip]` | GET | Public | Location-adjusted estimate |
| `/api/submissions` | POST | Auth | Submit actual repair cost |
| `/api/submissions/[id]` | GET | Auth | Get submission detail |
| `/api/appliances/search` | GET | Public | Search appliance database |
| `/api/appliances/[brand]/[model]` | GET | Public | Get appliance details |
| `/api/user/diagnoses` | GET | Auth | Get user's diagnosis history |
| `/api/user/subscription` | GET | Auth | Get subscription status |
| `/api/webhooks/stripe` | POST | Stripe | Stripe webhook handler |

## Data Flow

### AI Diagnosis Flow
```
User describes symptoms in plain English
  + selects appliance category (required)
  + optionally selects brand/model
  → POST /api/diagnose
  → Server checks: auth, rate limit (3/month free, unlimited premium)
  → Check diagnosis cache (same appliance + similar symptoms hash)
  → If cache miss:
    → Call Claude API with structured system prompt
    → System prompt includes: appliance repair knowledge, output JSON schema,
      safety disclaimers, parts database context
    → Claude returns JSON: {
        diagnosis: string,
        confidence: 'high' | 'medium' | 'low',
        repair_type: string (maps to canonical repair_types table),
        likely_parts: [{name, avg_cost}],
        estimated_labor_hours: number,
        diy_difficulty: 'easy' | 'moderate' | 'hard' | 'professional_only',
        safety_notes: string[]
      }
  → Save diagnosis to `diagnoses` table
  → Fetch price estimate from `price_estimates` for repair_type + user's zip
  → Return diagnosis + price range to user
  → User sees: diagnosis, price range (low/median/high), repair vs replace recommendation
```

### Price Estimation Flow
```
Diagnosis identifies repair type + location
  → Query `price_estimates` for repair_type + zip
  → If exact zip match: return those estimates
  → If no match: fall back to state-level, then national-level
  → Apply location adjustment using cost-of-living multiplier
  → Return: {low, median, high} price range
  → Include: parts cost breakdown, labor cost breakdown, sample size
```

### Premium Report Generation
```
User requests premium report (paid)
  → Check subscription or prompt Stripe Checkout ($2.99 one-time)
  → After payment confirmed:
    → Fetch full diagnosis, price data, appliance specs
    → Generate detailed PDF report:
      - Diagnosis explanation
      - Model-specific parts with part numbers
      - Price breakdown (parts + labor)
      - Local price comparison
      - Repair vs replace analysis
      - Negotiation tips
      - Recommended local repair shops (future)
    → Store PDF in Supabase Storage
    → Return download URL
```

### Crowdsourced Price Submission
```
User submits what they actually paid
  → POST /api/submissions with:
    appliance, repair_type, amount_paid, zip, repair_date, receipt_photo (optional)
  → Server validates: auth, sanity check on amount
  → Insert into `user_submissions` (status: pending)
  → Outlier detection: if amount > 3 stddev from mean for this repair type, flag for review
  → Aggregate job runs nightly to update `price_estimates` materialized view
```

## Database Schema

### appliances
```sql
CREATE TABLE appliances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand TEXT NOT NULL,
  model TEXT,
  category TEXT NOT NULL CHECK (category IN (
    'refrigerator', 'washer', 'dryer', 'dishwasher', 'oven', 'range',
    'microwave', 'garbage_disposal', 'water_heater', 'furnace', 'ac_unit',
    'hvac', 'ceiling_fan', 'garage_door', 'other'
  )),
  avg_lifespan_years INTEGER,
  avg_replacement_cost_cents INTEGER,
  slug TEXT UNIQUE NOT NULL, -- brand-model slug for URLs
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_appliances_category ON appliances(category);
CREATE INDEX idx_appliances_brand ON appliances(brand);
CREATE INDEX idx_appliances_slug ON appliances(slug);
```

### repair_types
```sql
CREATE TABLE repair_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL, -- e.g., 'compressor_replacement'
  display_name TEXT NOT NULL, -- e.g., 'Compressor Replacement'
  category TEXT NOT NULL, -- appliance category
  description TEXT,
  avg_parts_cost_cents INTEGER,
  avg_labor_hours NUMERIC,
  diy_possible BOOLEAN DEFAULT FALSE,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_repair_types_category ON repair_types(category);
CREATE INDEX idx_repair_types_slug ON repair_types(slug);
```

### price_estimates
```sql
CREATE TABLE price_estimates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  repair_type_id UUID NOT NULL REFERENCES repair_types(id),
  zip_prefix TEXT, -- 3-digit zip prefix, NULL for national
  state TEXT, -- 2-letter state code, NULL for national
  low_cents INTEGER NOT NULL,
  median_cents INTEGER NOT NULL,
  high_cents INTEGER NOT NULL,
  parts_cost_cents INTEGER,
  labor_cost_cents INTEGER,
  sample_size INTEGER DEFAULT 0,
  last_updated TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_price_estimates_repair_type ON price_estimates(repair_type_id);
CREATE INDEX idx_price_estimates_location ON price_estimates(zip_prefix, state);
```

### user_submissions
```sql
CREATE TABLE user_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  appliance_category TEXT NOT NULL,
  appliance_brand TEXT,
  appliance_model TEXT,
  repair_type_id UUID REFERENCES repair_types(id),
  repair_description TEXT NOT NULL,
  amount_paid_cents INTEGER NOT NULL,
  zip_code TEXT NOT NULL,
  repair_date DATE,
  receipt_image_url TEXT,
  is_outlier BOOLEAN DEFAULT FALSE,
  is_verified BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_submissions_user ON user_submissions(user_id);
CREATE INDEX idx_submissions_repair_type ON user_submissions(repair_type_id);
CREATE INDEX idx_submissions_zip ON user_submissions(zip_code);
```

### diagnoses
```sql
CREATE TABLE diagnoses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  appliance_category TEXT NOT NULL,
  appliance_brand TEXT,
  appliance_model TEXT,
  symptoms TEXT NOT NULL,
  symptoms_hash TEXT NOT NULL, -- for cache lookup
  diagnosis TEXT NOT NULL,
  confidence TEXT CHECK (confidence IN ('high', 'medium', 'low')),
  repair_type_id UUID REFERENCES repair_types(id),
  likely_parts JSONB, -- [{name, avg_cost}]
  estimated_labor_hours NUMERIC,
  diy_difficulty TEXT CHECK (diy_difficulty IN ('easy', 'moderate', 'hard', 'professional_only')),
  safety_notes TEXT[],
  price_estimate_low_cents INTEGER,
  price_estimate_median_cents INTEGER,
  price_estimate_high_cents INTEGER,
  is_premium_report BOOLEAN DEFAULT FALSE,
  report_pdf_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_diagnoses_user ON diagnoses(user_id);
CREATE INDEX idx_diagnoses_symptoms_hash ON diagnoses(symptoms_hash);
CREATE INDEX idx_diagnoses_appliance ON diagnoses(appliance_category, appliance_brand);
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

### report_purchases
```sql
CREATE TABLE report_purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  diagnosis_id UUID NOT NULL REFERENCES diagnoses(id),
  stripe_payment_intent_id TEXT NOT NULL,
  amount_cents INTEGER NOT NULL, -- 299 ($2.99)
  status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'refunded')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_report_purchases_user ON report_purchases(user_id);
```

## External Services

| Service | Purpose | Integration |
|---------|---------|-------------|
| Supabase | Database, Auth | `@supabase/supabase-js` + `@supabase/ssr` |
| Claude API | AI symptom diagnosis | `@anthropic-ai/sdk` |
| Stripe | Payments | `stripe` SDK + webhooks |
| Vercel | Hosting, Edge, Analytics | Vercel CLI + git push deploy |
| BLS API (future) | Cost-of-living data | REST API for location adjustment |

## Auth Flow

1. User can browse price pages and use diagnosis without auth (limited)
2. To save diagnosis or submit pricing: sign in via Supabase Auth (email or Google OAuth)
3. On successful auth -> Supabase creates `auth.users` row
4. Database trigger creates user profile row
5. Rate limits tracked per user: 3 free diagnoses/month
6. Premium features gated by subscription status
7. One-time report purchases tracked independently from subscription

## Deployment

- **Platform**: Vercel
- **Build**: `bun run build` produces SSG price pages + serverless API functions
- **ISR**: Appliance/repair/location pages revalidate every 7 days
- **Environment**: Production secrets via Vercel environment variables (`ANTHROPIC_API_KEY`, `STRIPE_SECRET_KEY`, Supabase keys)
- **Preview**: Every PR gets a preview deployment
- **Monitoring**: Vercel Analytics + Vercel Speed Insights
- **CI**: GitHub Actions runs lint + test before deploy
- **AI costs**: Claude API calls are server-side only, rate-limited to control costs
