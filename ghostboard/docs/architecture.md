# GhostBoard Architecture

## System Overview

GhostBoard is a crowdsourced employer responsiveness database built on Next.js 15, Supabase, and Vercel. The architecture prioritizes SEO (SSG company pages), data integrity (anti-spam, validation), and scalable aggregation of crowdsourced reports.

```
┌─────────────────────────────────────────────────────────┐
│                     Vercel Edge Network                  │
│  ┌──────────┐  ┌──────────────┐  ┌───────────────────┐  │
│  │ SSG Pages│  │  ISR Pages   │  │  API Routes       │  │
│  │ (Top 10K │  │  (Long tail  │  │  /api/reports     │  │
│  │ companies)│  │  companies)  │  │  /api/companies   │  │
│  │          │  │  revalidate  │  │  /api/search      │  │
│  │          │  │  24h         │  │  /api/webhooks     │  │
│  └──────────┘  └──────────────┘  └───────────────────┘  │
└─────────────────────┬───────────────────────────────────┘
                      │
          ┌───────────┴───────────┐
          │                       │
┌─────────▼──────────┐  ┌────────▼────────┐
│   Supabase         │  │   Stripe        │
│  ┌──────────────┐  │  │  Subscriptions  │
│  │ PostgreSQL   │  │  │  Webhooks       │
│  │  + RLS       │  │  └─────────────────┘
│  ├──────────────┤  │
│  │ Auth         │  │
│  │ Email+OAuth  │  │
│  ├──────────────┤  │
│  │ Storage      │  │
│  │ (logos)      │  │
│  ├──────────────┤  │
│  │ Edge Funcs   │  │
│  │ (stats agg)  │  │
│  └──────────────┘  │
└────────────────────┘
```

## Components

### Frontend (Next.js 15 App Router)

| Route | Type | Description |
|-------|------|-------------|
| `/` | SSG | Landing page with search bar, trending companies |
| `/search` | SSR | Search results page with filters |
| `/company/[slug]` | SSG/ISR | Company profile with ghosting stats |
| `/compare` | SSR | Side-by-side company comparison |
| `/report` | SSR (authed) | Submit application outcome report |
| `/dashboard` | SSR (authed) | User dashboard — tracked companies, report history |
| `/recruiter` | SSR (authed) | Recruiter portal — claim profile, analytics |
| `/pricing` | SSG | Pricing page for premium + recruiter tiers |
| `/blog/[slug]` | SSG | SEO content articles |

### API Routes

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/companies/search` | GET | Public | Search companies by name, fuzzy match |
| `/api/companies/[slug]` | GET | Public | Get company profile + stats |
| `/api/companies/[slug]/stats` | GET | Public | Get detailed company statistics |
| `/api/reports` | POST | Auth | Submit new application outcome report |
| `/api/reports/[id]` | GET | Auth | Get user's own report |
| `/api/reports/validate` | POST | Auth | Validate report before submission |
| `/api/user/dashboard` | GET | Auth | Get user dashboard data |
| `/api/user/subscription` | GET | Auth | Get subscription status |
| `/api/recruiter/claim` | POST | Auth | Claim a company profile |
| `/api/recruiter/respond` | POST | Auth | Respond to a report |
| `/api/webhooks/stripe` | POST | Stripe | Stripe webhook handler |
| `/api/sitemap` | GET | Public | Dynamic sitemap generation |

## Data Flow

### Report Submission Flow
```
User fills report form
  → Client-side validation (required fields, date sanity)
  → POST /api/reports
  → Server validates: auth check, rate limit, duplicate detection
  → Insert into `reports` table (status: pending)
  → Supabase trigger: update `company_stats` materialized view
  → ISR revalidation triggered for company page
  → User sees confirmation
```

### Company Page Rendering
```
Request for /company/[slug]
  → SSG (build-time) for top 10K companies
  → ISR (on-demand, 24h revalidate) for long tail
  → Page fetches: company profile + aggregated stats
  → Renders: ghosting rate, avg response time, trend chart, recent reports
  → Schema.org structured data in <head>
```

### Search Flow
```
User types in search bar
  → Debounced client-side (300ms)
  → GET /api/companies/search?q={query}
  → PostgreSQL full-text search with trigram similarity
  → Return top 10 matches with basic stats
  → User clicks → navigates to /company/[slug]
```

## Database Schema

### companies
```sql
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  domain TEXT,
  industry TEXT,
  company_size TEXT, -- 'startup', 'small', 'medium', 'large', 'enterprise'
  headquarters_city TEXT,
  headquarters_state TEXT,
  logo_url TEXT,
  description TEXT,
  is_claimed BOOLEAN DEFAULT FALSE,
  claimed_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_companies_slug ON companies(slug);
CREATE INDEX idx_companies_name_trgm ON companies USING gin(name gin_trgm_ops);
CREATE INDEX idx_companies_industry ON companies(industry);
```

### reports
```sql
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  company_id UUID NOT NULL REFERENCES companies(id),
  status TEXT NOT NULL CHECK (status IN ('applied', 'heard_back', 'interviewed', 'offered', 'rejected', 'ghosted')),
  applied_date DATE NOT NULL,
  response_date DATE, -- NULL if ghosted
  response_days INTEGER, -- computed: response_date - applied_date
  role_level TEXT CHECK (role_level IN ('intern', 'entry', 'mid', 'senior', 'lead', 'executive')),
  role_title TEXT,
  application_method TEXT CHECK (application_method IN ('online', 'referral', 'recruiter', 'career_fair', 'other')),
  notes TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  is_flagged BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_reports_company ON reports(company_id);
CREATE INDEX idx_reports_user ON reports(user_id);
CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_reports_applied_date ON reports(applied_date);
```

### company_stats (materialized)
```sql
CREATE MATERIALIZED VIEW company_stats AS
SELECT
  c.id AS company_id,
  c.slug,
  COUNT(r.id) AS total_reports,
  COUNT(r.id) FILTER (WHERE r.status = 'ghosted') AS ghosted_count,
  ROUND(
    COUNT(r.id) FILTER (WHERE r.status = 'ghosted')::NUMERIC / NULLIF(COUNT(r.id), 0) * 100, 1
  ) AS ghosting_rate,
  AVG(r.response_days) FILTER (WHERE r.response_days IS NOT NULL) AS avg_response_days,
  COUNT(r.id) FILTER (WHERE r.status = 'interviewed') AS interview_count,
  COUNT(r.id) FILTER (WHERE r.status = 'offered') AS offer_count,
  ROUND(
    COUNT(r.id) FILTER (WHERE r.status = 'offered')::NUMERIC /
    NULLIF(COUNT(r.id) FILTER (WHERE r.status = 'interviewed'), 0) * 100, 1
  ) AS interview_to_offer_ratio,
  MAX(r.created_at) AS last_report_date
FROM companies c
LEFT JOIN reports r ON r.company_id = c.id AND r.is_flagged = FALSE
GROUP BY c.id, c.slug;

CREATE UNIQUE INDEX idx_company_stats_company ON company_stats(company_id);
CREATE INDEX idx_company_stats_slug ON company_stats(slug);
```

### users (extended profile)
```sql
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  display_name TEXT,
  user_type TEXT DEFAULT 'job_seeker' CHECK (user_type IN ('job_seeker', 'recruiter')),
  reports_submitted INTEGER DEFAULT 0,
  reports_remaining_today INTEGER DEFAULT 3,
  last_report_reset DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### subscriptions
```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  stripe_customer_id TEXT NOT NULL,
  stripe_subscription_id TEXT,
  plan TEXT NOT NULL CHECK (plan IN ('free', 'premium', 'recruiter')),
  status TEXT NOT NULL CHECK (status IN ('active', 'canceled', 'past_due', 'trialing')),
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_stripe ON subscriptions(stripe_subscription_id);
```

### company_claims
```sql
CREATE TABLE company_claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  verification_method TEXT, -- 'email_domain', 'manual'
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## External Services

| Service | Purpose | Integration |
|---------|---------|-------------|
| Supabase | Database, Auth, Storage | `@supabase/supabase-js` + `@supabase/ssr` |
| Stripe | Payments | `stripe` SDK + webhooks |
| Vercel | Hosting, Edge, Analytics | Vercel CLI + git push deploy |

## Auth Flow

1. User clicks "Sign In" -> Supabase Auth UI (email or Google OAuth)
2. On successful auth -> Supabase creates `auth.users` row
3. Database trigger creates `user_profiles` row with defaults
4. Middleware checks auth token on protected routes (`/report`, `/dashboard`, `/recruiter`)
5. RLS policies enforce data isolation (users see only their own reports)
6. Subscription status checked for feature gating (premium/recruiter features)

## Deployment

- **Platform**: Vercel
- **Build**: `bun run build` produces SSG pages + serverless API functions
- **ISR**: Company pages revalidate every 24 hours
- **Environment**: Production secrets via Vercel environment variables
- **Preview**: Every PR gets a preview deployment
- **Monitoring**: Vercel Analytics + Vercel Speed Insights
- **CI**: GitHub Actions runs lint + test before deploy
