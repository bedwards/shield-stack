# AfterLoss — Free After-Death Estate Settlement Process Guide

## Status: Scaffold Complete

## Product Overview
AfterLoss is a completely FREE step-by-step guide that walks people through everything they need to do after someone dies. It covers the overwhelming checklist: getting death certificates, notifying Social Security, contacting employers about benefits, closing bank accounts, cancelling subscriptions, filing insurance claims, navigating probate, and handling taxes. It generates every letter and form needed, tracks deadlines, and provides state-specific guidance. Revenue comes exclusively from tasteful affiliate partnerships (estate attorneys, probate services, grief counseling, life insurance).

### Target User
Anyone who has recently lost a loved one and is responsible for settling their affairs. This is often a spouse, adult child, or sibling who is grieving AND overwhelmed by paperwork. The UX must be empathetic, gentle, and never pushy.

### MVP Features
1. **Guided Checklist** — Step-by-step interactive checklist organized by timeline (first 24 hours, first week, first month, first 3 months, first year)
2. **Document Generator** — Claude API generates personalized letters for every scenario: employer notification, bank account closure, subscription cancellation, insurance claims, Social Security notification, creditor notification
3. **State-Specific Probate Guide** — Probate rules, requirements, and timelines for all 50 states + DC
4. **Deadline Tracker** — Automatic deadline calculation and reminders (e.g., probate filing deadline, tax return due date, insurance claim windows)
5. **Subscription Cancellation Templates** — Pre-written cancellation templates for 100+ common subscriptions and services
6. **Government Form Guidance** — Step-by-step instructions for SSA, IRS, DMV, and other government forms
7. **Resource Directory** — Curated directory of estate attorneys, probate services, grief counselors (affiliate)
8. **Progress Dashboard** — Visual progress tracker showing completed/pending/upcoming tasks

### Revenue Model
- **100% free** — no subscriptions, no paywalls, no fees
- **Affiliate revenue** (tasteful, clearly labeled):
  - Estate attorneys (FindLaw, Avvo, LegalZoom referrals)
  - Probate services (Trust & Will, Willful, etc.)
  - Grief counseling (BetterHelp, Talkspace referrals)
  - Life insurance quotes (for surviving family members)
  - Estate sale services
- **IMPORTANT**: Affiliate suggestions are always contextual, never intrusive, clearly labeled as sponsored

### SEO Strategy
- Primary: "what to do when someone dies checklist", "after death checklist"
- Long-tail: "how to close bank account after death", "cancel subscription after someone dies", "probate process [state]", "notify social security of death"
- Programmatic: `/guides/{state}/probate` for all 50 states, `/templates/{document-type}` for each letter type
- Content: Comprehensive "what to do" timeline, state probate guides, document checklists, grief resources

## Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js 15 (App Router) | SSG for SEO-critical content pages, ISR for state guides |
| Database | Supabase (Postgres) | User progress tracking, state probate rules database |
| Auth | Supabase Auth | Optional account for saving progress (works without account too) |
| Storage | Supabase Storage | Generated document PDFs |
| Payments | Stripe | Not needed for users; only for affiliate tracking if needed |
| AI | Claude API | Document generation, personalized letter writing |
| Deploy | Vercel | Fast SSG pages, edge functions for document generation |
| PDF Generation | @react-pdf/renderer | Client-side PDF via dynamic import (server-side has DOMMatrix issues) |
| Package Manager | bun | Fast installs, native TypeScript |

## Model & Effort
Always use Claude Opus 4.6 with max effort.

## Build / Test / Deploy
```bash
cd afterloss
bun install              # Install dependencies
bun run dev              # Start dev server (localhost:3000)
bun run build            # Production build
bun run lint             # ESLint
bun run test             # Run Vitest unit/integration tests (NEVER use `bun test`)
bun run test:e2e         # Run Playwright E2E tests
bun run test:e2e:ui      # Playwright E2E with UI mode
```

**IMPORTANT:** Always use `bun run test` (NOT `bun test`). `bun test` invokes Bun's native test runner which picks up Playwright e2e files and doesn't use the Vitest config.

## Architecture

### Core Components
1. **Landing Page** — Warm, empathetic design. "We are sorry for your loss. Let us help with the paperwork." Simple CTA to start.
2. **Onboarding Flow** — Gentle questions: state of residence, relationship to deceased, rough estate complexity (simple/moderate/complex)
3. **Checklist Engine** — Dynamic checklist that adapts based on state, estate type, and user progress
4. **Document Generator** — Claude API integration that generates personalized letters/forms based on user's specific situation
5. **State Probate Guide** — Pre-rendered SSG pages for each state's probate process, requirements, timelines, costs
6. **Deadline Calculator** — Computes all relevant deadlines based on date of death and state rules
7. **Template Library** — Pre-written templates for subscription cancellations, creditor notifications, bank closures
8. **Resource Directory** — Contextual affiliate recommendations (attorneys, counseling) shown at relevant checklist steps
9. **Progress Dashboard** — Visual timeline of completed/pending tasks with deadline indicators

### Data Flow
```
User arrives (often from Google: "what to do when someone dies")
→ Landing page with empathetic messaging → Start checklist
→ Onboarding: state, relationship, estate info
→ Generate personalized checklist with state-specific steps and deadlines
→ User works through checklist → can generate documents at each step
→ Claude API generates personalized letters/forms → PDF download
→ At relevant steps: show tasteful affiliate recommendations
→ Progress saved (with account) or in localStorage (without account)
→ Deadline reminders via email (with account)
```

## Data Model

### Key Tables
- `users` — Supabase Auth managed (optional)
- `cases` — user_id (nullable), state, date_of_death, relationship_to_deceased, estate_complexity, deceased_name, created_at
- `checklist_templates` — step_id, category (immediate/first_week/first_month/first_quarter/first_year), title, description, state_specific (boolean), applicable_states[], estimated_time, required_documents, deadline_rule
- `case_checklist_items` — case_id, template_step_id, status (pending/in_progress/completed/skipped), completed_at, notes, deadline_date
- `generated_documents` — case_id, document_type, template_name, generated_content, pdf_storage_path, generated_at
- `state_probate_rules` — state_code, probate_threshold, simplified_probate_threshold, filing_deadline_days, required_documents JSONB, court_info JSONB, fees JSONB
- `subscription_templates` — service_name, category (streaming/utility/insurance/membership), cancellation_method, cancellation_contact, template_text
- `affiliate_partners` — partner_name, category, url, description, commission_type, display_context (which checklist steps)
- `affiliate_clicks` — case_id (nullable), partner_id, checklist_step_id, clicked_at
- `deadline_reminders` — case_id, checklist_item_id, reminder_date, sent_at

## UX PRINCIPLES — CRITICAL
- **Empathy first**: Warm, gentle tone throughout. Never clinical or corporate.
- **No dark patterns**: Never pressure users. Affiliate recommendations are clearly labeled and contextual.
- **Works without account**: Full functionality available without sign-up. Account only needed for progress saving and email reminders.
- **Progressive disclosure**: Don't overwhelm. Show one section at a time, celebrate completion.
- **One question per screen**: Grief kills attention span. Clear next steps, soft progress indicator, no pressure to finish.
- **Pause and resume**: Grief is nonlinear. Users must be able to stop and come back at any time.
- **Validate emotions in copy**: Use gentle prompts like "Take your time" for real comfort.
- **Templates reduce decision fatigue**: Provide meaningful defaults so users have a place to start.
- **Cultural flexibility**: Avoid Western-centric assumptions about death/grief practices.
- **Accessibility**: WCAG 2.1 AA compliant. Many users will be elderly.
- **Mobile-first**: Many users will be on their phone at a funeral home or hospital.

## Competitive Landscape (Updated March 17, 2026)

The estate settlement space has exploded — 12+ competitors now exist. AfterLoss must differentiate sharply.

### Tier 1 — Direct Threats (free or cheap, similar model)

| Competitor | Model | Pricing | Threat Level |
|-----------|-------|---------|--------------|
| **Sunset** | B2C automated | **Free** (bank-partner funded) | **HIGHEST** — Revenue from partner bank interest while estate funds sit in FDIC-insured account (up to $3M). iPhone + Android apps. All 50 states, 3000+ counties. 1-day asset discovery. SOC 2 Type II. New: e-notarization, RUFADAA-compliant crypto/digital asset discovery, debt/liability identification. Narrowly focused on asset discovery/transfer — NOT the full emotional/checklist experience. |
| **SwiftProbate** | B2C DIY | **$39 one-time** | **HIGH (SEO)** — 3,200+ county-specific probate guides, all updated with "(2026)" in titles. URL pattern: /probate/{state}/{county}. 160+ institution guides. Running comparison pages (/compare/elayne, /compare/eversettled, etc.) intercepting competitor traffic. Probate checklist blog post ranking well. |
| **Atticus** | B2C DIY | ~$15/mo subscription | **MEDIUM** — iOS-only (no Android, no web app). Mixed App Store reviews: some praise step-by-step guide, others report bugs and unresponsive support. Trustpilot mostly positive (Mar 2026). Fast Company World Changing Idea winner. Has well-ranking "2026 Checklist" article. |

### Tier 2 — Premium Competitors

| Competitor | Model | Pricing | Notes |
|-----------|-------|---------|-------|
| **Empathy** | B2B (insurance carriers) | Free via insurer | $160M+ raised. Partners: MetLife, New York Life, Allianz, Aflac, TIAA, MassMutual, Prudential, AT&T, Sun Life. Launched "Leave Support" with MetLife (Oct 2025) for bereavement leave management. 1:1 Care Manager, saves families avg 200 hours. Pure B2B — not accessible without carrier partnership. |
| **Elayne** | Full-service + AI | **FREE self-guided** or $250 full discovery | **UPGRADED THREAT (Mar 2026)**: Free tier includes family collaboration, document sharing, estate plan management — but REQUIRES account. Paid $250 tier adds full account search, human support. Running aggressive date-stamped SEO content (monthly guides like "Delete Cash App Account Permanently March 2026"). SOC 2 Type II + HIPAA compliant. |
| **EverSettled** | Full-service | **$199 base** + optional specialist support | Smart checklist based on state/assets/family. Optional estate settlement specialists at higher tiers. 500+ families served. Free 2-week trial. San Francisco based. |
| **EstateExec** | Executor software | $199 | Executor accounting focus. 4.9/5 TrustPilot (180 reviews). Won 2026 ACQ5 Global Awards, Edison Innovation Award. Bank integration, PDF court reports. |
| **Alix** | Full-service | 1% of estate, $9K min | Premium tier, not accessible to average families. |
| **ClearEstate** | Full-service | 1.75%, $20K min | Primarily Canadian market, expanding to US. |

### Tier 3 — Niche/Adjacent

| Competitor | Focus | Notes |
|-----------|-------|-------|
| **Cadence** | Software + live advisors | Certified Executor Advisors. |
| **Legacy Logix** | AI document sorting + estate management | Smart Digital Estate Vault, VaultIQ (AI document interrogation). Free starter, $38.95/mo premium. Ongoing estate management focus, not post-death guidance. |
| **SubsVault** | Digital legacy planning | Subscription management after death. |

**Note:** Caily (caily.com) was previously listed as "subscription cancellation guides" — this was incorrect. Caily is a HIPAA-compliant messaging platform for senior living communities. It is not a competitor.

### AfterLoss Differentiation
1. **100% free, forever** — Beats Atticus ($15/mo), EverSettled ($1,499), SwiftProbate ($39)
2. **No account required** — localStorage-first. Full functionality without signup. No competitor does this (Elayne's free tier still requires account).
3. **Web-first, no download** — Works instantly in browser. Beats Atticus (iOS-only) and Sunset (app download required)
4. **AI-generated personalized documents** — Claude API writes actual letters/forms, not just templates or guides
5. **Phone scripts library** — Pre-written scripts for calling SSA, banks, insurance, subscriptions. No competitor offers this.
6. **Programmatic SEO** — 153+ state-specific pages (51 states × 3 guide types), expanding to county-level
7. **Empathy-first UX** — Designed for people in grief, not executors managing assets

### Competitive Threat Assessment (Updated March 17, 2026)
- **Sunset** is #1 overall threat (also free + mobile apps). Revenue from bank interest on estate account funds. New features: e-notarization, crypto/digital asset discovery, debt/liability ID. BUT narrowly focused on asset discovery/transfer — lacks the full emotional/administrative guidance, phone scripts, subscription cancellation, and AI document generation that AfterLoss provides.
- **SwiftProbate** is #1 SEO threat with 3,200+ county-level pages (all "(2026)" tagged) + 160+ institution guides + comparison pages intercepting competitor traffic. AfterLoss must launch state-level programmatic pages ASAP and plan county-level expansion. Also need comparison pages to counter SwiftProbate's strategy.
- **Elayne** upgraded to MEDIUM-HIGH threat. Free tier includes family collaboration and document sharing but REQUIRES account creation. Running date-stamped monthly content strategy for SEO freshness. AfterLoss differentiates on: no account required, AI doc gen, phone scripts.
- **Empathy** has massive scale ($160M+ raised) + new "Leave Support" product with MetLife (Oct 2025) but locked behind insurance carrier B2B partnerships — not accessible to most grieving families.
- **Atticus** is direct DIY competitor but charges $15/mo, iOS-only, mixed App Store reviews (bugs, unresponsive support). Web-first + free is AfterLoss's counter-position.

## Validated Affiliate Programs (Updated March 17, 2026)

| Partner | Commission | Via | Cookie | Placement Context |
|---------|-----------|-----|--------|-------------------|
| **Rocket Lawyer** | 30% per sale | Yazing/VigLink | TBD | Estate planning, attorney referral steps. Highest commission. |
| **Trust & Will** | 20% per sale (avg $80, up to $180) | Impact.com | 30 days | Will creation, estate planning steps |
| **LegalZoom** | 15% per sale ($125+) | CJ Affiliate | 30 days | Estate planning, attorney referral steps. $50 min payout. |
| **Nolo** | Up to 15% | Direct | **120 days** | State probate guides, legal self-help. Long cookie ideal for grief users who delay purchase. |
| **BetterHelp** | $10-$150 per referral | Impact | TBD | Grief counseling, emotional support steps. Higher commissions at scale. |
| **VitalChek** | TBD | TBD | TBD | Death certificate ordering step |
| **Ever Loved** | TBD | Direct | TBD | Funeral products, fundraising, memorial websites |
| **Titan Casket** | TBD | Refersion | TBD | Direct-to-consumer caskets (funeral planning step) |

**Note:** Avvo NO LONGER has an affiliate program. Their fee-sharing model was ruled a violation in NJ and challenged in FL. Removed from partner list.

## Key Data Sources (No Public APIs — Must Curate)

- **State probate rules**: Curate from state court websites, Justia 50-state survey, Nolo state guides
- **PRIMARY data source**: Justia's Small Estates Laws and Procedures 50-State Survey — comprehensive starting point for issue #253. Cross-reference with Nolo guides and individual state court websites.
- **Small estate thresholds**: Range from $10K (GA, VT) to $208,850 (CA). Change periodically.
- **Government forms**: SSA-721 (updated 10-2024 edition), IRS forms, state-specific probate forms — link to official sources. SSA reporting: phone (800-772-1213) or in person only. Funeral homes use EDR. USAGov guide: usa.gov/social-security-report-a-death
- **Subscription cancellation info**: Must build database of 150+ services with cancellation methods (expanded from 100+ per March 2026 research — Everplans and funeral.com have 100-150 categories)

## External APIs & Services
- **Claude API** (`@anthropic-ai/sdk`) — Document generation (letters, forms, notifications)
- **Supabase** (`@supabase/supabase-js`) — Database, Auth, Storage
- **@react-pdf/renderer** — PDF generation. Use CLIENT-SIDE via dynamic import (server-side has DOMMatrix issues in App Router). Add `serverExternalPackages: ['@react-pdf/renderer']` in next.config.ts as fallback.
- **Vercel** — Hosting with SSG/ISR
- **Affiliate tracking** — CJ Affiliate (LegalZoom), Impact.com (Trust & Will), direct (BetterHelp)

## Wave Timing (Re-validated March 17, 2026)
- Oldest baby boomers turn 80 in 2026
- 3.6M US deaths/year, rising through peak in 2055
- CBO projects deaths > births by 2030 (Fortune, Jan 2026)
- US life expectancy hit record 79 years in 2024 (CDC DB548, Jan 2026)
- Digital estate complexity growing (subscriptions, crypto, social media, digital purchases)
- Senior share of US population: 18.7% (2025) → 23% (2050); 56M+ aged 65+ in 2026, 72M+ by 2033
- Empathy's $160M+ fundraise proves venture capital validates this market
- Estate Planning Software Market: $1.5B (2024) → $4.2B (2033) at 12.3% CAGR
- Global deathcare industry: $147B → $209.6B by 2030 (6.1% CAGR)
- Federal estate tax exemption permanently $15M (One Big Beautiful Bill Act) — removes tax anxiety for 99%+ of families
- State thresholds still changing: CA $208,850 (Apr 2025), IL $150K (Aug 2025), SC $45K (May 2025)

## Key State Probate Threshold Changes (Track These)
- **California**: Small estate affidavit → $208,850 (April 1, 2025 via AB 2016). Primary residence transfer without probate up to $750K. **2026:** AB 1521 expanded notice requirements (electronic DHCS notice, child support notification within 90 days). Medi-Cal asset test reinstated ($130K individual / $195K married, 30-month lookback). Crypto business licensing effective July 2026.
- **Illinois**: Small estate limit → $150,000 (August 15, 2025). Vehicles now excluded from limit calculation.
- **South Carolina**: Small estate threshold raised to $45,000 (May 2025, HB 3472).
- **Michigan**: Small estate threshold → $53,000 (for deaths in 2026, cost-of-living adjusted annually). Real property with mortgage/lien: subtract up to $264,000 from property value. Source: michiganlegalhelp.org
- **Washington**: HB 2445 — family gets 90 days (up from 40) to petition as administrator; new rules on third-party administrator compensation and eligibility.
- **Federal**: Estate tax exemption permanently $15M individual / $30M married (One Big Beautiful Bill Act, effective Jan 1, 2026). No sunset. GST exemption $15M. Indexed for inflation starting 2027. **Portability election is NOT automatic** — must file Form 706 even if under threshold.
- These thresholds change periodically — include `last_verified_date` in state data.

## IRS Forms After Death (Quick Reference)
- **Final Form 1040**: Decedent's final personal income tax return
- **Form 1041**: Estate income tax (required if gross income ≥ $600). Deadline: April 15 following year.
- **Form 706**: Estate tax return (required if estate > $15M). Deadline: 9 months after death. 6-month extension via Form 4768.
- **Portability**: Must file Form 706 even if under $15M threshold to preserve unused exemption for surviving spouse.
- **99%+ of families will NOT owe federal estate tax** — emphasize this to users to reduce anxiety.

## Version
0.1.0
