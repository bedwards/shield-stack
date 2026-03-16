# ScoreRebound — Architecture Document

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Vercel Edge Network                      │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    Next.js 15 App Router                   │  │
│  │                                                           │  │
│  │  ┌─────────────┐  ┌──────────────┐  ┌────────────────┐  │  │
│  │  │  SSG Pages   │  │  SSR Pages   │  │ API Routes     │  │  │
│  │  │  - Landing   │  │  - Dashboard │  │ - /api/quiz    │  │  │
│  │  │  - Guides    │  │  - Progress  │  │ - /api/plan    │  │  │
│  │  │  - Resources │  │  - Profile   │  │ - /api/track   │  │  │
│  │  │  - Servicer  │  │              │  │ - /api/affiliate│ │  │
│  │  │    pages     │  │              │  │ - /api/auth     │  │  │
│  │  └─────────────┘  └──────────────┘  └────────────────┘  │  │
│  │                                                           │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │              Client Components                       │  │  │
│  │  │  - QuizFunnel     - ProgressChart (Recharts)        │  │  │
│  │  │  - PlanViewer     - AffiliateCard                   │  │  │
│  │  │  - ScoreTracker   - EmailCapture                    │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Supabase                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │  PostgreSQL   │  │  Auth         │  │  Storage (future)    │  │
│  │  - users      │  │  - Email/pass │  │  - User documents    │  │
│  │  - profiles   │  │  - Google     │  │  - PDF reports       │  │
│  │  - quiz_resp  │  │  - Magic link │  │                      │  │
│  │  - plans      │  │              │  │                      │  │
│  │  - progress   │  │              │  │                      │  │
│  │  - affiliates │  │              │  │                      │  │
│  │  - resources  │  │              │  │                      │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     External Services                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐   │
│  │  Stripe   │  │  Resend   │  │ Plausible │  │  Affiliate   │   │
│  │  (future) │  │  (email)  │  │ (analytics│  │  Networks    │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## Component Breakdown

### Pages (App Router)

| Route | Type | Description |
|-------|------|-------------|
| `/` | SSG + Client | Landing page with quiz funnel (hero + quiz component) |
| `/quiz` | Client | Full-page quiz experience (redirect from landing CTA) |
| `/plan/[id]` | SSR | Personalized recovery plan view |
| `/dashboard` | SSR (auth) | User dashboard with saved plans and progress |
| `/progress` | SSR (auth) | Progress tracker with score chart |
| `/guide/[slug]` | SSG | Recovery path guides (IBR, rehab, consolidation, etc.) |
| `/servicer/[slug]` | SSG | Servicer-specific instructions |
| `/faq` | SSG | FAQ page with structured data |
| `/about` | SSG | About page |
| `/api/quiz` | API Route | POST: submit quiz, generate plan |
| `/api/plan/[id]` | API Route | GET: retrieve plan details |
| `/api/progress` | API Route | POST: log progress entry |
| `/api/affiliate/click` | API Route | POST: track affiliate click, redirect |
| `/api/og/[...path]` | API Route | Dynamic OG image generation |

### Client Components

| Component | Purpose |
|-----------|---------|
| `QuizFunnel` | 5-step quiz with progress indicator, animated transitions |
| `QuizStep` | Individual quiz question (radio, select, multi-select) |
| `PlanViewer` | Renders personalized recovery plan with expandable sections |
| `ProgressTracker` | Log actions, update score snapshots |
| `ScoreChart` | Recharts line chart showing score recovery over time |
| `AffiliateCard` | Product recommendation card with tracking link |
| `EmailCapture` | Email collection form (post-quiz, newsletter) |
| `ServicerSelector` | Dropdown for selecting loan servicer |
| `RecoveryTimeline` | Visual timeline of recovery steps |

### Server Components / Lib

| Module | Purpose |
|--------|---------|
| `lib/plan-generator.ts` | Core logic: quiz responses -> recovery plan |
| `lib/recovery-paths.ts` | Recovery path definitions and eligibility rules |
| `lib/servicer-data.ts` | Servicer contact info, specific instructions |
| `lib/affiliate-links.ts` | Affiliate product catalog with contextual matching |
| `lib/supabase/server.ts` | Server-side Supabase client |
| `lib/supabase/client.ts` | Client-side Supabase client |
| `lib/supabase/middleware.ts` | Auth middleware for protected routes |

## Data Flow

### Quiz -> Plan Generation

```
User answers quiz (client)
  │
  ▼
POST /api/quiz
  │ Body: { loan_type, servicer, delinquency_months,
  │         current_score_range, goals[] }
  │
  ▼
plan-generator.ts
  │ 1. Determine eligible recovery paths
  │ 2. Score/rank paths by user situation
  │ 3. Generate step-by-step plan
  │ 4. Select relevant affiliate products
  │ 5. Estimate recovery timeline
  │
  ▼
Insert quiz_response + recovery_plan into Supabase
  │
  ▼
Return plan_id -> redirect to /plan/[id]
  │
  ▼
/plan/[id] page (SSR)
  │ Fetches plan from DB
  │ Renders PlanViewer + AffiliateCards
  │ Shows EmailCapture if not authenticated
  │
  ▼
User optionally signs up to save plan
```

### Progress Tracking

```
User on /dashboard (authenticated)
  │
  ▼
User clicks "Log Progress"
  │ Selects action type (e.g., "Made IBR payment")
  │ Optionally enters score snapshot
  │
  ▼
POST /api/progress
  │ Body: { plan_id, action_type, description, score_snapshot? }
  │
  ▼
Insert progress_entry into Supabase
  │
  ▼
Dashboard re-renders with updated ScoreChart
  │ Shows progress timeline
  │ Adjusts estimated completion date
```

### Affiliate Click Tracking

```
User clicks affiliate product link
  │
  ▼
POST /api/affiliate/click
  │ Body: { product_slug, referrer_page }
  │ Logs to affiliate_clicks table
  │
  ▼
302 Redirect to affiliate URL with tracking params
```

## Database Schema

### users (managed by Supabase Auth)
```sql
-- Supabase Auth handles this table
-- id: uuid (PK)
-- email: text
-- created_at: timestamptz
```

### profiles
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  display_name TEXT,
  score_range TEXT, -- e.g., "500-549"
  notification_prefs JSONB DEFAULT '{"email_weekly": true, "email_milestones": true}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS: Users can only read/write their own profile
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own profile" ON profiles
  FOR ALL USING (auth.uid() = user_id);
```

### quiz_responses
```sql
CREATE TABLE quiz_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- nullable for anonymous
  loan_type TEXT NOT NULL, -- federal_direct, federal_ffel, parent_plus, private, etc.
  servicer TEXT, -- MOHELA, Nelnet, Aidvantage, etc.
  delinquency_months INTEGER, -- months delinquent
  delinquency_status TEXT NOT NULL, -- current, 30_days, 60_days, 90_plus, default, collections
  current_score_range TEXT NOT NULL, -- e.g., "450-499"
  goals TEXT[] DEFAULT '{}', -- ['buy_home', 'rent_apartment', 'get_car_loan', 'general_recovery']
  session_id TEXT, -- anonymous session tracking
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS: Users can read their own, anonymous can read by session_id via API
ALTER TABLE quiz_responses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own quiz responses" ON quiz_responses
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Anyone can insert" ON quiz_responses
  FOR INSERT WITH CHECK (true);
```

### recovery_plans
```sql
CREATE TABLE recovery_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_response_id UUID REFERENCES quiz_responses(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  recovery_path TEXT NOT NULL, -- ibr_enrollment, rehabilitation, consolidation, credit_building, mixed
  plan_steps JSONB NOT NULL, -- ordered array of step objects
  estimated_recovery_months INTEGER,
  recommended_products JSONB, -- affiliate product recommendations
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE recovery_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own plans" ON recovery_plans
  FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);
```

### progress_entries
```sql
CREATE TABLE progress_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  plan_id UUID REFERENCES recovery_plans(id) ON DELETE CASCADE NOT NULL,
  action_type TEXT NOT NULL, -- e.g., 'ibr_application_submitted', 'payment_made', 'score_checked'
  action_description TEXT,
  score_snapshot INTEGER, -- nullable, self-reported score
  completed_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE progress_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own progress" ON progress_entries
  FOR ALL USING (auth.uid() = user_id);

CREATE INDEX idx_progress_user_plan ON progress_entries(user_id, plan_id);
CREATE INDEX idx_progress_completed ON progress_entries(completed_at);
```

### affiliate_clicks
```sql
CREATE TABLE affiliate_clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  product_slug TEXT NOT NULL,
  affiliate_url TEXT NOT NULL,
  referrer_page TEXT,
  session_id TEXT,
  clicked_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE affiliate_clicks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Insert only" ON affiliate_clicks
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Users read own clicks" ON affiliate_clicks
  FOR SELECT USING (auth.uid() = user_id);
```

### resources
```sql
CREATE TABLE resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content_md TEXT NOT NULL,
  category TEXT NOT NULL, -- recovery_guide, servicer_info, faq, general
  loan_type_tags TEXT[] DEFAULT '{}',
  meta_title TEXT,
  meta_description TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Public read for published resources
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published" ON resources
  FOR SELECT USING (published = true);
```

## API Routes

### POST /api/quiz
Submit quiz responses and generate a recovery plan.

**Request:**
```json
{
  "loan_type": "federal_direct",
  "servicer": "mohela",
  "delinquency_months": 6,
  "delinquency_status": "90_plus",
  "current_score_range": "500-549",
  "goals": ["buy_home", "general_recovery"]
}
```

**Response:**
```json
{
  "plan_id": "uuid",
  "recovery_path": "rehabilitation",
  "estimated_months": 12,
  "steps": [...],
  "recommended_products": [...]
}
```

### GET /api/plan/[id]
Retrieve a recovery plan by ID.

### POST /api/progress
Log a progress entry (authenticated).

**Request:**
```json
{
  "plan_id": "uuid",
  "action_type": "payment_made",
  "action_description": "Made 3rd rehabilitation payment",
  "score_snapshot": 520
}
```

### POST /api/affiliate/click
Track affiliate link click and redirect.

**Request:**
```json
{
  "product_slug": "self-credit-builder",
  "referrer_page": "/plan/abc123"
}
```

**Response:** 302 redirect to affiliate URL.

### GET /api/og/[...path]
Dynamic Open Graph image generation for social sharing.

## External Service Integrations

| Service | Purpose | Auth | Notes |
|---------|---------|------|-------|
| Supabase | Database + Auth + Storage | Service role key (server), anon key (client) | RLS policies enforce access control |
| Stripe | Future premium tier | Secret key (server) | Webhook endpoint for payment confirmation |
| Resend | Transactional email | API key (server) | Quiz results, progress reminders |
| Plausible | Analytics | Site ID (client) | Privacy-friendly, no cookies |

## Auth Flow

```
1. Anonymous user takes quiz → plan generated, stored with session_id
2. User prompted to save plan → sign up modal
3. Supabase Auth (email + password OR Google OAuth)
4. On signup: create profile, link quiz_response + recovery_plan to user_id
5. Auth middleware on /dashboard, /progress routes
6. Supabase RLS ensures data isolation
7. JWT in httpOnly cookie, refreshed via middleware
```

### Protected Routes
- `/dashboard` — requires auth
- `/progress` — requires auth
- `/api/progress` — requires auth
- `/api/plan/[id]` — auth optional (anonymous plans accessible by session)

### Public Routes
- `/` — landing page + quiz
- `/quiz` — quiz funnel
- `/plan/[id]` — plan view (accessible by ID, no auth needed for share links)
- `/guide/*` — all guide pages
- `/servicer/*` — all servicer pages
- `/faq` — FAQ page

## Deployment Architecture

```
┌──────────────────┐     ┌──────────────────┐
│   GitHub Repo    │────▶│   Vercel          │
│   (main branch)  │     │   - Auto deploy   │
│                  │     │   - Preview URLs   │
│   PR branches ───┼────▶│   - PR previews   │
└──────────────────┘     └──────────────────┘
                              │
                    ┌─────────┼─────────┐
                    ▼         ▼         ▼
              ┌──────────┐ ┌─────┐ ┌──────────┐
              │ Serverless│ │ Edge│ │  Static  │
              │ Functions │ │ MW  │ │  Assets  │
              │ (API)     │ │     │ │ (SSG)    │
              └──────────┘ └─────┘ └──────────┘
                    │
                    ▼
              ┌──────────────┐
              │   Supabase   │
              │   (hosted)   │
              └──────────────┘
```

### Environment Variables (Vercel)
```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
RESEND_API_KEY=re_...
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=scorerebound.com
TEST_MODE=false
```

### CI/CD Pipeline
1. Push to feature branch → Vercel preview deploy
2. PR created → GitHub Actions: build + test + lint + Playwright E2E
3. Claude + Gemini code reviews on PR
4. Merge to main → Vercel production deploy
5. Post-deploy: Playwright E2E against production URL
