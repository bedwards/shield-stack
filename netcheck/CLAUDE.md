# NetCheck — Pre-Procedure In-Network Verification

## Status: Scaffold Complete

## Product Overview

NetCheck protects the 180 million Americans with private insurance from surprise medical bills by verifying that ALL providers involved in a procedure are in-network BEFORE the procedure happens. Despite the No Surprises Act (2022), patients still face unexpected bills because the Act doesn't cover all scenarios, enforcement is inconsistent, and patients don't know to check every provider (anesthesiologist, pathologist, assistant surgeon, etc.).

Users enter their insurance plan, facility, and planned procedure. NetCheck checks all providers who might be involved, flags out-of-network risks, and generates verification request letters to send to the facility and insurer.

## Target User Persona

- **Primary**: Ages 30-65, insured Americans scheduling non-emergency procedures (surgeries, imaging, lab work, specialist visits)
- **Secondary**: HR benefits managers helping employees navigate coverage
- **Tertiary**: Patient advocates and healthcare navigators
- **Psychographic**: Anxious about costs, burned before by surprise bills, willing to pay for peace of mind before a major procedure
- **Entry point**: Google search "is [doctor] in network [insurance plan]"

## Key Features (MVP Scope)

1. **Multi-Provider Verification Check**: Enter insurance plan + facility + procedure -> check ALL provider types who might be involved (surgeon, anesthesiologist, pathologist, radiologist, assistant surgeon, etc.)
2. **Out-of-Network Risk Flags**: Clear red/yellow/green status for each provider type, with explanation of financial risk
3. **Verification Request Generator**: Pre-written letters/forms to send to facility and insurer requesting written network confirmation
4. **Provider Search**: Look up providers by NPI number, name, or facility
5. **Insurance Plan Directory**: Searchable database of major insurance plans and their network types
6. **Cost Estimator**: Rough cost range for in-network vs. out-of-network for common procedures
7. **Verification Checklist**: Step-by-step guide of what to verify before any procedure

## Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js 15 (App Router) | SSR for SEO, Server Actions for form processing |
| Database | Supabase (Postgres) | Provider data, user verifications, insurance plans |
| Auth | Supabase Auth | Save verifications, email + Google OAuth |
| Payments | Stripe | $9.99 per verification (Stripe Checkout) |
| Deploy | Vercel | Instant deploys, preview URLs, edge functions |
| Package Manager | Bun | Fast installs, native TypeScript |
| Styling | Tailwind CSS | Rapid UI development, responsive |
| PDF Generation | @react-pdf/renderer | Verification request letters as PDF |
| Email | Resend | Verification results delivery |
| Analytics | Plausible/PostHog | Privacy-friendly, conversion tracking |

## Build / Test / Deploy

```bash
cd netcheck

# Install dependencies
bun install

# Development
bun run dev                # Next.js dev server (localhost:3000)

# Testing — IMPORTANT: use `bun run test` NOT `bun test`
# `bun test` invokes Bun's native runner and picks up Playwright files.
# `bun run test` invokes vitest via package.json scripts.
bun run test               # Unit tests (vitest)
bun run test:e2e           # Playwright E2E tests
bun run test:e2e:ui        # Playwright with UI mode

# Build
bun run build              # Production build
bun run start              # Start production server

# Database (future)
bunx supabase db reset     # Reset local DB
bunx supabase db push      # Push migrations to remote
bunx supabase gen types    # Generate TypeScript types

# Data ingestion (future)
bun run ingest-npi         # Ingest NPI registry data
bun run update-networks    # Update insurance network data

# Linting
bun run lint               # ESLint
```

## Project Structure

```
netcheck/
  src/
    app/              # Next.js App Router pages and layouts
      layout.tsx      # Root layout with header/footer shell
      page.tsx        # Landing page with hero, stats, CTA
      globals.css     # Tailwind imports and CSS custom properties
    components/       # Reusable React components
    lib/              # Utility functions and helpers
      env.ts          # Environment variable accessors
      env.test.ts     # Unit tests for env helpers
      test-setup.ts   # Vitest setup file
    types/            # TypeScript type definitions
      index.ts        # Shared types (Provider, InsurancePlan, Verification, etc.)
  e2e/                # Playwright E2E tests
    smoke.spec.ts     # Basic smoke tests for landing page
  public/             # Static assets
  docs/               # Architecture and design documents
```

## Architecture Decisions

1. **NPI Registry as foundation**: CMS NPPES NPI registry is the authoritative free source for provider data. We ingest and index it for fast lookups.
2. **Procedure -> provider type mapping**: Each CPT code maps to a list of provider types typically involved. This is the key insight -- we check ALL of them, not just the primary surgeon.
3. **Paid verification model**: The core check is paid ($9.99) because it delivers immediate, concrete financial value. Free tier shows the checklist and educational content.
4. **Letter generation as key deliverable**: The verification request letter is a tangible asset the user takes away. It forces the facility to put network status in writing.
5. **Insurance network data is approximate**: Network data changes constantly. We make clear that our check is a starting point and the verification letter is the critical step.
6. **Anonymous browsing, paid verification**: Users can browse providers and educational content for free. The paid verification check generates the full report and letters.
7. **LLM-testable design**: All interactive elements have `data-testid` attributes. Test mode bypasses payment.

## Data Model Overview

### Key Tables

- **users**: Supabase auth users (id, email, created_at)
- **profiles**: Extended user data (user_id, display_name, insurance_plan_id, notification_prefs)
- **providers**: NPI registry data (npi, name, credential, taxonomy_code, taxonomy_desc, practice_address, phone, enumeration_date)
- **facilities**: Hospitals/ASCs (id, npi, name, address, facility_type, network_status_cache)
- **insurance_carriers**: Insurance companies (id, name, slug, website, provider_directory_url)
- **insurance_plans**: Specific plans (id, carrier_id, name, plan_type, network_type, state, metal_level)
- **procedure_types**: Common procedures (id, cpt_code, name, description, category, typical_provider_types[])
- **provider_type_roles**: Provider types per procedure (id, procedure_type_id, role_name, taxonomy_codes[], is_primary, out_of_network_risk_level)
- **verifications**: Paid verification checks (id, user_id, facility_id, procedure_type_id, insurance_plan_id, status, results_json, stripe_payment_id, created_at)
- **verification_results**: Per-provider results (id, verification_id, provider_npi, provider_role, network_status, confidence, data_source, checked_at)
- **verification_letters**: Generated documents (id, verification_id, letter_type, content_html, pdf_url, created_at)
- **affiliate_clicks**: Click tracking for any affiliate links (id, user_id nullable, product_slug, clicked_at)

### Key Enums

- **network_status**: in_network, out_of_network, unknown, requires_verification
- **plan_type**: hmo, ppo, epo, pos, hdhp
- **facility_type**: hospital, ambulatory_surgery_center, imaging_center, lab, clinic
- **letter_type**: facility_verification_request, insurer_verification_request, provider_verification_request
- **verification_status**: pending_payment, processing, complete, failed

## API Integrations

### MVP Integrations
1. **CMS NPPES NPI Registry** (free) -- bulk download + API for provider lookups
   - URL: https://npiregistry.cms.hhs.gov/api/
   - Data: Provider name, NPI, taxonomy, address, credentials
2. **Supabase Auth** -- email/password + Google OAuth
3. **Stripe Checkout** -- $9.99 per verification payment
4. **Resend** -- email delivery of verification results and letters

### Post-MVP Integrations
- **CMS Machine-Readable Files** (insurance network data, mandated by Transparency in Coverage rule)
- **Insurance carrier provider directories** (scraping/APIs where available)
- **CMS Physician Compare** (quality metrics)
- **FAIR Health** (cost estimation data)
- **No Surprises Act complaint portal** (link for disputes)

## SEO Strategy

### Primary Keywords
- "is [doctor] in network [insurance]" (the core query, massive volume)
- "in network verification" (direct intent)
- "surprise medical bill" (problem awareness)
- "how to check if doctor is in network" (informational)
- "out of network [procedure] cost" (cost concern)

### Content Strategy
- **Verification tool landing page**: Targets "check if doctor is in network" -- the tool IS the content
- **Procedure-specific guides**: SSG pages for common procedures ("is my anesthesiologist in network for surgery")
- **Insurance plan guides**: Pages for major carriers ("how to check in-network providers [carrier]")
- **No Surprises Act explainer**: Educational content on patient rights
- **Cost comparison pages**: In-network vs. out-of-network cost ranges for common procedures
- **Checklist pages**: "What to verify before [procedure]" targeting pre-procedure searches

### Technical SEO
- SSG for all informational and guide pages
- Structured data: FAQ schema, HowTo schema, MedicalWebPage schema
- Open Graph images per procedure/carrier page
- Sitemap.xml with procedure/carrier/state hierarchy
- Core Web Vitals optimization
- Local SEO for facility/provider pages

## Revenue / Monetization

### Primary: Per-Verification Fee ($9.99)
- Stripe Checkout for one-time payment
- User gets: full multi-provider network check, risk assessment, verification request letters (PDF), email copy
- Value prop: $9.99 to potentially avoid a $5,000+ surprise bill
- Conversion funnel: free checklist -> see risk preview -> pay for full verification + letters

### Secondary: Subscription (Future)
- $4.99/month for unlimited verifications
- Target: frequent healthcare users, families, HR managers
- Includes: saved insurance profiles, verification history, alerts

### Tertiary: B2B / Affiliate
- Patient advocacy organizations (bulk verification access)
- Healthcare navigation companies (API access)
- Insurance comparison affiliates

## Model & Effort

Always use Claude Opus 4.6 with max effort. No exceptions.

## LLM-Testable Design

- All buttons, inputs, and interactive elements have `data-testid` attributes
- `TEST_MODE=true` env var enables test accounts, bypasses Stripe payment, and uses mock provider data
- Test user accounts seeded via environment variables
- No CAPTCHAs in test/preview environments
- API endpoints return meaningful JSON errors
- `e2e/` directory with Playwright tests for all critical flows
- Mock NPI data available for testing without live API calls

### data-testid Registry

- `data-testid="header"` -- Page header
- `data-testid="nav"` -- Navigation bar
- `data-testid="logo-link"` -- Logo/home link
- `data-testid="nav-verify"` -- Verify Network nav link
- `data-testid="nav-providers"` -- Find Providers nav link
- `data-testid="nav-checklist"` -- Checklist nav link
- `data-testid="nav-login"` -- Sign in button
- `data-testid="main-content"` -- Main content area
- `data-testid="footer"` -- Page footer
- `data-testid="footer-privacy"` -- Privacy footer link
- `data-testid="footer-terms"` -- Terms footer link
- `data-testid="footer-contact"` -- Contact footer link
- `data-testid="landing-page"` -- Landing page wrapper
- `data-testid="hero-section"` -- Hero section
- `data-testid="hero-title"` -- Hero heading
- `data-testid="hero-subtitle"` -- Hero subheading
- `data-testid="hero-cta-button"` -- Hero call-to-action button
- `data-testid="stats-section"` -- Statistics section
- `data-testid="stat-surprise-bills"` -- Surprise bills stat
- `data-testid="stat-avg-bill"` -- Average bill stat
- `data-testid="stat-providers"` -- Providers involved stat
- `data-testid="how-it-works-section"` -- How it works section
- `data-testid="step-enter"` -- Step 1: Enter details
- `data-testid="step-check"` -- Step 2: We check providers
- `data-testid="step-protect"` -- Step 3: Get protected
- `data-testid="cta-section"` -- Bottom CTA section
- `data-testid="cta-verify-button"` -- Bottom CTA verify button

Convention: All new interactive elements MUST include a `data-testid` attribute.

## Environment Variables

See `.env.example` for required variables:
- `NEXT_PUBLIC_SUPABASE_URL` -- Supabase project URL (client-side, needs NEXT_PUBLIC_ prefix)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` -- Supabase anonymous key (client-side, needs NEXT_PUBLIC_ prefix)
- `STRIPE_SECRET_KEY` -- Stripe secret API key (server-only, NO NEXT_PUBLIC_ prefix)
- `TEST_MODE` -- Enable test mode (bypasses payments, enables test accounts)
- `NEXT_PUBLIC_APP_URL` -- Public app URL (client-side)

## Version

0.1.0
