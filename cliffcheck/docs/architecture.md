# CliffCheck — Architecture Document

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Vercel Edge Network                      │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    Next.js 15 App Router                   │  │
│  │                                                           │  │
│  │  ┌─────────────┐  ┌──────────────┐  ┌────────────────┐  │  │
│  │  │  SSG Pages   │  │  SSR Pages   │  │ API Routes     │  │  │
│  │  │  - Landing   │  │  - Dashboard │  │ - /api/calc    │  │  │
│  │  │  - State/*   │  │  - Scenarios │  │ - /api/scenario│  │  │
│  │  │  - Program/* │  │  - Profile   │  │ - /api/share   │  │  │
│  │  │  - Guides    │  │              │  │ - /api/auth    │  │  │
│  │  │  - FAQ       │  │              │  │ - /api/og      │  │  │
│  │  └─────────────┘  └──────────────┘  └────────────────┘  │  │
│  │                                                           │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │              Client Components                       │  │  │
│  │  │  - Calculator       - CliffChart (Recharts + D3)    │  │  │
│  │  │  - IncomeSlider     - ProgramBreakdown              │  │  │
│  │  │  - HouseholdForm    - ScenarioSaver                 │  │  │
│  │  │  - WhatIfPanel      - ShareModal                    │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  │                                                           │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │         Benefits Calculation Engine (Server)         │  │  │
│  │  │  - SNAP calculator    - EITC calculator             │  │  │
│  │  │  - Medicaid checker   - CTC calculator              │  │  │
│  │  │  - Childcare calc     - TANF calculator             │  │  │
│  │  │  - Housing calc       - LIHEAP calculator           │  │  │
│  │  │  - WIC checker        - ACA PTC calculator          │  │  │
│  │  │                                                     │  │  │
│  │  │  Each program: implements BenefitCalculator iface   │  │  │
│  │  │  Input: HouseholdInput → Output: BenefitResult      │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Supabase                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │  PostgreSQL   │  │  Auth         │  │  Storage (future)    │  │
│  │  - users      │  │  - Email/pass │  │  - PDF reports       │  │
│  │  - profiles   │  │  - Google     │  │  - Exported charts   │  │
│  │  - programs   │  │              │  │                      │  │
│  │  - state_rules│  │              │  │                      │  │
│  │  - fed_rules  │  │              │  │                      │  │
│  │  - scenarios  │  │              │  │                      │  │
│  │  - calc_cache │  │              │  │                      │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     External Services                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────────────────┐  │
│  │  Stripe   │  │ Plausible │  │  Data Sources (manual ingest)│  │
│  │  (future) │  │ (analytics│  │  - USDA FNS (SNAP)          │  │
│  └──────────┘  └──────────┘  │  - CMS (Medicaid)            │  │
│                               │  - IRS (EITC, CTC)           │  │
│                               │  - HHS (FPL)                 │  │
│                               │  - HUD (Section 8)           │  │
│                               │  - State agencies             │  │
│                               └──────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Component Breakdown

### Pages (App Router)

| Route | Type | Description |
|-------|------|-------------|
| `/` | SSG + Client | Landing page with embedded calculator |
| `/calculator` | Client | Full-page calculator experience |
| `/calculator?state=CA&income=35000&household=3` | Client | Deep-linkable calculator with pre-filled params |
| `/state/[code]` | SSG | State-specific benefits overview (51 pages) |
| `/program/[slug]` | SSG | Program-specific guide and rules |
| `/program/[slug]/[state]` | SSG | Program + state specific rules |
| `/dashboard` | SSR (auth) | Saved scenarios and comparison |
| `/faq` | SSG | FAQ with structured data |
| `/about` | SSG | About page and methodology |
| `/api/calc` | API Route | POST: run benefits calculation |
| `/api/scenario` | API Route | CRUD: save/load/delete scenarios |
| `/api/share/[id]` | API Route | GET: shared scenario view |
| `/api/og/[...path]` | API Route | Dynamic OG image generation |

### Client Components

| Component | Purpose |
|-----------|---------|
| `Calculator` | Main calculator container, manages state, orchestrates child components |
| `HouseholdForm` | Input form for household size, members, income sources |
| `IncomeSlider` | Draggable slider for income adjustment with real-time recalculation |
| `StateSelector` | State dropdown with auto-detection option |
| `CliffChart` | Main Recharts/D3 visualization: income vs. total compensation |
| `ProgramBreakdown` | Individual program lines overlaid on the chart |
| `CliffZoneHighlight` | D3 overlay highlighting cliff zones with annotations |
| `WhatIfPanel` | Side panel for scenario adjustment (income, household changes) |
| `BenefitSummaryCard` | Card for each program showing current benefit amount |
| `ScenarioSaver` | Save/name/compare scenarios (auth required) |
| `ShareModal` | Generate shareable link or export as PDF/image |
| `IncomeBreakdown` | Stacked bar showing wages + benefits = total compensation |

### Benefits Calculation Engine (Server-side)

The calculation engine is the core of CliffCheck. It is a pure TypeScript module with no side effects, designed for comprehensive unit testing.

```typescript
// Core interface — every program implements this
interface BenefitCalculator {
  programSlug: string;
  programName: string;
  category: ProgramCategory;

  // Calculate benefit amount for given household at given income
  calculate(input: HouseholdInput, rules: ProgramRules): BenefitResult;

  // Check basic eligibility (before full calculation)
  isEligible(input: HouseholdInput, rules: ProgramRules): boolean;

  // Get the income threshold where benefit drops to zero
  getPhaseOutEnd(input: HouseholdInput, rules: ProgramRules): number;
}

interface HouseholdInput {
  annualIncome: number;
  incomeTypes: IncomeBreakdown;
  stateCode: string;
  householdSize: number;
  members: HouseholdMember[];
  currentBenefits: string[]; // programs currently receiving
}

interface BenefitResult {
  programSlug: string;
  eligible: boolean;
  monthlyBenefit: number;
  annualBenefit: number;
  phaseOutStart: number;  // income where benefit starts reducing
  phaseOutEnd: number;    // income where benefit hits zero
  cliffAmount: number;    // sudden drop amount (0 if gradual phase-out)
  isCliff: boolean;       // true if sudden cutoff, false if gradual
  notes: string[];        // explanatory notes
}
```

### Program Calculators

| Module | Program | Complexity | Notes |
|--------|---------|------------|-------|
| `calc/snap.ts` | SNAP | High | Net/gross income tests, deductions, state variations |
| `calc/medicaid.ts` | Medicaid/CHIP | High | MAGI-based, state expansion status, family composition |
| `calc/eitc.ts` | EITC | Medium | Filing status, qualifying children, income phase-out |
| `calc/ctc.ts` | Child Tax Credit | Medium | Per-child, phase-out thresholds |
| `calc/childcare.ts` | CCDF Childcare | High | State-specific, copay scales, waitlist reality |
| `calc/housing.ts` | Section 8 | High | AMI-based, local HUD FMR, 30% rent rule |
| `calc/liheap.ts` | LIHEAP | Medium | State-specific, seasonal, energy burden |
| `calc/tanf.ts` | TANF | High | State-specific, time limits, work requirements |
| `calc/wic.ts` | WIC | Low | Categorical eligibility, adjunctive |
| `calc/aca-ptc.ts` | ACA Premium Tax Credit | Medium | FPL percentage, benchmark plan |
| `calc/aggregate.ts` | Combined | Core | Runs all calculators, produces combined cliff chart data |

## Data Flow

### Benefits Calculation Flow

```
User inputs (client)
  │ state, income, household_size, members
  │
  ▼
POST /api/calc
  │ Body: HouseholdInput
  │
  ▼
aggregate.ts (server)
  │
  ├──▶ Fetch state_rules + federal_rules for this state
  │    (cached in memory, refreshed hourly)
  │
  ├──▶ For income range $0 to $150,000 (step $500):
  │    ├── snap.calculate(input_at_income, snap_rules)
  │    ├── medicaid.calculate(input_at_income, medicaid_rules)
  │    ├── eitc.calculate(input_at_income, eitc_rules)
  │    ├── ctc.calculate(input_at_income, ctc_rules)
  │    ├── childcare.calculate(input_at_income, childcare_rules)
  │    ├── housing.calculate(input_at_income, housing_rules)
  │    ├── liheap.calculate(input_at_income, liheap_rules)
  │    ├── tanf.calculate(input_at_income, tanf_rules)
  │    ├── wic.calculate(input_at_income, wic_rules)
  │    └── aca_ptc.calculate(input_at_income, aca_rules)
  │
  ├──▶ Aggregate: at each income point, sum all benefits
  │    Identify cliff zones (where total comp drops)
  │
  ├──▶ Cache result by input hash (calculation_cache table)
  │
  ▼
Response: AggregateResult
  │ { incomePoints[], programResults[], cliffZones[], summary }
  │
  ▼
CliffChart renders (client)
  │ Recharts area chart with stacked program benefits
  │ D3 cliff zone annotations
  │ Current income marker
  │ What-if income marker (draggable)
```

### Scenario Save/Load Flow

```
User on calculator (authenticated)
  │
  ▼
User clicks "Save Scenario"
  │ Names the scenario
  │
  ▼
POST /api/scenario
  │ Body: { name, state, income, household, results_json }
  │
  ▼
Insert into scenarios table
  │
  ▼
/dashboard shows saved scenarios
  │ User can load, compare side-by-side, or share
```

### Share Flow

```
User clicks "Share"
  │
  ▼
POST /api/share
  │ Creates shareable snapshot with unique ID
  │
  ▼
/calculator?share=[id]
  │ Loads pre-calculated results
  │ Read-only view with "Try your own" CTA
```

## Database Schema

### benefit_programs
```sql
CREATE TABLE benefit_programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL, -- 'snap', 'medicaid', 'eitc', etc.
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- nutrition, healthcare, tax_credit, childcare, housing, energy, cash_assistance
  federal_or_state TEXT NOT NULL, -- 'federal', 'state', 'both'
  description TEXT,
  official_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### federal_rules
```sql
CREATE TABLE federal_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID REFERENCES benefit_programs(id) NOT NULL,
  rule_year INTEGER NOT NULL, -- e.g., 2026
  fpl_percentage_limit NUMERIC, -- e.g., 130 for 130% FPL
  income_limits JSONB NOT NULL, -- { "household_1": 15000, "household_2": 20000, ... }
  phase_out JSONB, -- { "start_pct": 100, "end_pct": 200, "rate": 0.24 }
  benefit_amounts JSONB, -- { "max_monthly": { "household_1": 291, ... } }
  deductions JSONB, -- applicable deductions
  additional_rules JSONB, -- program-specific rules
  source_url TEXT,
  effective_date DATE NOT NULL,
  expires_date DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE UNIQUE INDEX idx_federal_rules_program_year
  ON federal_rules(program_id, rule_year);
```

### state_rules
```sql
CREATE TABLE state_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID REFERENCES benefit_programs(id) NOT NULL,
  state_code TEXT NOT NULL, -- 'CA', 'TX', etc.
  rule_year INTEGER NOT NULL,
  income_limits JSONB NOT NULL,
  phase_out JSONB,
  benefit_amounts JSONB,
  deductions JSONB,
  eligibility_expansions JSONB, -- state-specific expansions
  additional_rules JSONB,
  source_url TEXT,
  effective_date DATE NOT NULL,
  expires_date DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE UNIQUE INDEX idx_state_rules_program_state_year
  ON state_rules(program_id, state_code, rule_year);
CREATE INDEX idx_state_rules_state ON state_rules(state_code);
```

### federal_poverty_levels
```sql
CREATE TABLE federal_poverty_levels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year INTEGER NOT NULL,
  region TEXT NOT NULL DEFAULT 'contiguous', -- contiguous, alaska, hawaii
  household_size INTEGER NOT NULL,
  annual_amount NUMERIC NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE UNIQUE INDEX idx_fpl_year_region_size
  ON federal_poverty_levels(year, region, household_size);
```

### scenarios
```sql
CREATE TABLE scenarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  state_code TEXT NOT NULL,
  annual_income NUMERIC NOT NULL,
  household_size INTEGER NOT NULL,
  household_members JSONB, -- array of member details
  income_sources JSONB, -- breakdown by type
  current_benefits TEXT[], -- currently receiving
  results_json JSONB NOT NULL, -- full calculation results
  is_shared BOOLEAN DEFAULT false,
  share_id TEXT UNIQUE, -- for shareable links
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE scenarios ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own scenarios" ON scenarios
  FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Shared scenarios are public" ON scenarios
  FOR SELECT USING (is_shared = true);
```

### calculation_cache
```sql
CREATE TABLE calculation_cache (
  input_hash TEXT PRIMARY KEY, -- SHA-256 of canonical input JSON
  result_json JSONB NOT NULL,
  computed_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ DEFAULT now() + interval '24 hours'
);

CREATE INDEX idx_cache_expires ON calculation_cache(expires_at);
```

### program_updates
```sql
CREATE TABLE program_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID REFERENCES benefit_programs(id),
  state_code TEXT, -- null for federal
  change_description TEXT NOT NULL,
  effective_date DATE,
  source_url TEXT,
  logged_at TIMESTAMPTZ DEFAULT now()
);
```

## API Routes

### POST /api/calc
Run benefits cliff calculation.

**Request:**
```json
{
  "stateCode": "CA",
  "annualIncome": 35000,
  "householdSize": 3,
  "members": [
    { "age": 32, "relationship": "self", "disabled": false },
    { "age": 30, "relationship": "spouse", "disabled": false },
    { "age": 4, "relationship": "child", "disabled": false }
  ],
  "incomeTypes": { "wages": 35000 },
  "currentBenefits": ["snap", "medicaid"]
}
```

**Response:**
```json
{
  "summary": {
    "currentIncome": 35000,
    "currentTotalBenefits": 12400,
    "currentTotalCompensation": 47400,
    "worstCliffAt": 42000,
    "worstCliffLoss": 8200,
    "breakEvenIncome": 55000
  },
  "incomePoints": [
    { "income": 0, "totalBenefits": 22000, "totalCompensation": 22000 },
    { "income": 500, "totalBenefits": 21800, "totalCompensation": 22300 },
    ...
  ],
  "programResults": {
    "snap": { "eligible": true, "monthlyBenefit": 516, ... },
    "medicaid": { "eligible": true, "monthlyBenefit": 800, ... },
    ...
  },
  "cliffZones": [
    { "startIncome": 41000, "endIncome": 42000, "totalLoss": 8200, "programs": ["medicaid", "snap"] }
  ]
}
```

### POST /api/scenario
Save a calculation scenario (authenticated).

### GET /api/share/[id]
Retrieve a shared scenario.

### GET /api/og/[...path]
Dynamic OG image generation for social sharing (chart preview).

## External Service Integrations

| Service | Purpose | Auth | Notes |
|---------|---------|------|-------|
| Supabase | Database + Auth + Storage | Service role key (server), anon key (client) | RLS policies enforce access |
| Stripe | Future premium tier | Secret key (server) | Ad-free, API access |
| Plausible | Analytics | Site ID (client) | Privacy-friendly |

### Data Ingestion (Offline/Batch)

Benefits rules are manually curated from official sources. The `bun run update-thresholds` script:
1. Reads source data files (JSON) in `data/` directory
2. Validates against schema
3. Upserts into `federal_rules` and `state_rules` tables
4. Logs changes to `program_updates` table

## Auth Flow

```
1. Anonymous user uses calculator → full functionality, no save
2. User wants to save scenario → sign up modal
3. Supabase Auth (email + password OR Google OAuth)
4. On signup: create profile with state preference
5. Auth middleware on /dashboard routes only
6. Calculator works 100% without auth
7. JWT in httpOnly cookie, refreshed via middleware
```

### Protected Routes
- `/dashboard` — requires auth (saved scenarios)
- `/api/scenario` — requires auth (save/load/delete)

### Public Routes
- `/` — landing page + calculator
- `/calculator` — full calculator (no auth needed)
- `/state/*` — all state pages
- `/program/*` — all program pages
- `/api/calc` — calculation endpoint (no auth)
- `/api/share/*` — shared scenarios (read-only)
- `/faq` — FAQ

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
              │ (calc API)│ │     │ │ (SSG     │
              │           │ │     │ │  51 state│
              │           │ │     │ │  pages)  │
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
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=cliffcheck.com
TEST_MODE=false
```

### Performance Considerations
- Calculation engine is CPU-bound: cache aggressively
- SSG for 51 state pages + ~500 program/state pages at build time
- Calculator client-side state management with URL params for shareability
- Debounce income slider to avoid excessive API calls (300ms)
- Web Workers for client-side chart rendering if needed

### CI/CD Pipeline
1. Push to feature branch → Vercel preview deploy
2. PR created → GitHub Actions: build + test + lint + Playwright E2E
3. **Critical: unit tests for calculation engine must all pass**
4. Claude + Gemini code reviews on PR
5. Merge to main → Vercel production deploy
6. Post-deploy: Playwright E2E against production URL
