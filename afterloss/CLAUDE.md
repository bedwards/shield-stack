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
- **Accessibility**: WCAG 2.1 AA compliant. Many users will be elderly.
- **Mobile-first**: Many users will be on their phone at a funeral home or hospital.

## Competitive Landscape (Updated March 16, 2026)

The estate settlement space has exploded — 12+ competitors now exist. AfterLoss must differentiate sharply.

### Tier 1 — Direct Threats (free or cheap, similar model)

| Competitor | Model | Pricing | Threat Level |
|-----------|-------|---------|--------------|
| **Sunset** | B2C automated | **Free** (bank-partner funded) | **HIGHEST** — Also free. iPhone + Android apps. All 50 states, 3000+ counties. Finds assets in 1 day. FDIC-insured estate account up to $3M. SOC 2 Type II. |
| **SwiftProbate** | B2C DIY | **$39 one-time** | **HIGH (SEO)** — 3,200+ county-specific probate guides. Already doing programmatic SEO at county level. 160+ institution guides. |
| **Atticus** | B2C DIY | ~$15/mo subscription | **MEDIUM** — iOS-only (no Android, no web app). Step-by-step guide. Already ranks for "what to do when loved one dies 2026". Fast Company World Changing Idea winner. |

### Tier 2 — Premium Competitors

| Competitor | Model | Pricing | Notes |
|-----------|-------|---------|-------|
| **Empathy** | B2B (insurance carriers) | Free via insurer, or $8.99/mo | $162M raised. 45M+ lives. BMO Insurance partnership (Jan 2026). LifeVault reached 2M users. B2B-locked, not direct-to-consumer. |
| **Elayne** | Full-service + AI | Flat fee ~$250+ | AI + human support. Searches 50+ financial categories. Good SEO content play. |
| **EverSettled** | B2C DIY | $199 per estate | State-level guidance, document organization, optional estate specialists. |
| **EstateExec** | Executor software | $199 | Executor accounting focus. Won 2026 ACQ5 Global Awards. |
| **Alix** | Full-service | 1% of estate, $9K min | Premium tier, not accessible to average families. |
| **ClearEstate** | Full-service | 1.75%, $20K min | Primarily Canadian market, expanding to US. |

### Tier 3 — Niche/Adjacent

| Competitor | Focus | Notes |
|-----------|-------|-------|
| **Cadence** | Software + live advisors | Certified Executor Advisors. |
| **Caily** | Subscription cancellation guides | Content-focused, blog articles. |
| **Legacy Logix** | AI document sorting | Task identification, deadline alerts. |
| **SubsVault** | Digital legacy planning | Subscription management after death. |

### AfterLoss Differentiation
1. **100% free, forever** — Beats Atticus ($15/mo), EverSettled ($199), SwiftProbate ($39), Elayne ($250+)
2. **Web-first, no download** — Works instantly in browser. Beats Atticus (iOS-only) and Sunset (app download required)
3. **No account required** — localStorage-first. Full functionality without signup. No competitor does this.
4. **AI-generated personalized documents** — Claude API writes actual letters/forms, not just templates or guides
5. **Programmatic SEO** — 153+ state-specific pages (51 states × 3 guide types)
6. **Empathy-first UX** — Designed for people in grief, not executors managing assets

### Competitive Threat Assessment
- **Sunset** is #1 threat (also free + mobile apps), but focused narrowly on asset discovery/probate docs. AfterLoss differentiates on AI doc gen, broader checklist scope, empathy-first UX, and web accessibility.
- **SwiftProbate** is #1 SEO threat with 3,200+ county-level pages. AfterLoss must launch state-level programmatic pages ASAP.
- **Empathy** has massive scale (45M+ users) but locked behind insurance carrier B2B partnerships — not a direct SEO competitor.
- **Atticus** is direct DIY competitor but charges $15/mo and is iOS-only — no web experience.

## Validated Affiliate Programs

| Partner | Commission | Via | Placement Context |
|---------|-----------|-----|-------------------|
| **LegalZoom** | 15% per sale ($125+) | CJ Affiliate | Estate planning, attorney referral steps |
| **Trust & Will** | 20% per sale (avg $80, up to $180) | Impact.com | Will creation, estate planning steps |
| **BetterHelp** | $10-$40 per referral CPA | Direct | Grief counseling, emotional support steps |
| **VitalChek** | TBD | TBD | Death certificate ordering step |

## Key Data Sources (No Public APIs — Must Curate)

- **State probate rules**: Curate from state court websites, Justia 50-state survey, Nolo state guides
- **Small estate thresholds**: Range from $10K (GA, VT) to $208K (CA). Change periodically.
- **Government forms**: SSA-721, IRS forms, state-specific probate forms — link to official sources
- **Subscription cancellation info**: Must build database of 100+ services with cancellation methods

## External APIs & Services
- **Claude API** (`@anthropic-ai/sdk`) — Document generation (letters, forms, notifications)
- **Supabase** (`@supabase/supabase-js`) — Database, Auth, Storage
- **@react-pdf/renderer** — PDF generation. Use CLIENT-SIDE via dynamic import (server-side has DOMMatrix issues in App Router). Add `serverExternalPackages: ['@react-pdf/renderer']` in next.config.ts as fallback.
- **Vercel** — Hosting with SSG/ISR
- **Affiliate tracking** — CJ Affiliate (LegalZoom), Impact.com (Trust & Will), direct (BetterHelp)

## Wave Timing (Re-validated March 16, 2026)
- Oldest baby boomers turn 80 in 2026
- 3.6M US deaths/year, rising through peak in 2055
- CBO projects deaths > births by 2030 (Fortune, Jan 2026)
- US life expectancy hit record 79 years in 2024 (CDC DB548, Jan 2026)
- Digital estate complexity growing (subscriptions, crypto, social media, digital purchases)
- Senior share of US population: 18.7% (2025) → 23% (2050)
- Empathy's $162M fundraise proves venture capital validates this market
- State probate thresholds changing: CA raised to $208,850 (Apr 2025), IL raised to $150K (Aug 2025)

## Key State Probate Threshold Changes (Track These)
- **California**: Small estate affidavit → $208,850 (April 1, 2025 via AB 2016). New: primary residence transfer without probate up to $750K.
- **Illinois**: Small estate limit → $150,000 (August 15, 2025). Vehicles now excluded from limit calculation.
- These thresholds change periodically — include `last_verified_date` in state data.

## Version
0.1.0
