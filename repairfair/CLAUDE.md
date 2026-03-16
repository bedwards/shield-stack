# RepairFair — Appliance Repair Fair Price Estimator

## Status: Planning Complete

## Product Overview
RepairFair lets consumers describe appliance symptoms in plain English, uses Claude AI to diagnose the probable issue, and provides a fair price range for the repair based on location, appliance make/model, and crowdsourced pricing data. It eliminates the information asymmetry that lets repair shops overcharge homeowners who have no idea what a repair should cost.

### Target User
- Homeowners facing an appliance breakdown who need a repair quote sanity check
- Renters wanting to verify if their landlord's repair cost claims are reasonable
- DIY enthusiasts deciding whether to repair or replace
- Property managers evaluating repair invoices

### Key Features (MVP)
1. **Symptom Input & AI Diagnosis** — Describe what's wrong in plain English, Claude AI identifies probable cause and repair needed
2. **Fair Price Estimate** — Location-adjusted price range (low/median/high) for the diagnosed repair
3. **Appliance Database** — Major brands and models with common issues and typical repair costs
4. **Repair vs Replace Calculator** — Based on appliance age, repair cost, and replacement cost, recommend repair or replace
5. **SEO Price Pages** — "How much should [appliance] [repair] cost" programmatic pages
6. **Crowdsourced Pricing** — Users submit what they actually paid, building real-world pricing data

### Revenue Model
- **Free tier**: 3 AI diagnoses/month, basic price ranges
- **Premium report ($2.99 each)**: Detailed report with model-specific parts, local repair shop recommendations, negotiation tips
- **Premium subscription ($4.99/mo)**: Unlimited diagnoses, full reports, price alerts
- **Affiliate**: Repair service referrals, appliance purchase links (Amazon, Home Depot)
- **Ads**: Non-intrusive ads on free lookup pages

## Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Framework | Next.js 15 (App Router) | SSG for appliance/repair SEO pages, RSC for interactive features |
| Database | Supabase (PostgreSQL) | Appliance database, pricing data, user submissions |
| Auth | Supabase Auth | Email + Google OAuth |
| AI | Claude API (Anthropic) | Symptom diagnosis, natural language understanding |
| Payments | Stripe | Per-report purchases + subscriptions |
| Deploy | Vercel | Edge functions for AI proxy, ISR for price pages |
| Package Manager | bun | Fast installs, native TypeScript |
| Testing | Vitest + Playwright | Unit/integration + E2E |
| Styling | Tailwind CSS 4 | Utility-first, fast iteration |

## Model & Effort
Always use Claude Opus 4.6 with max effort.

## Build / Test / Deploy
```bash
cd repairfair
bun install              # Install dependencies
bun run dev              # Start dev server (localhost:3002)
bun test                 # Run Vitest unit/integration tests
bun run test:e2e         # Run Playwright E2E tests
bun run build            # Production build
bun run lint             # ESLint + Prettier check
bun run db:migrate       # Run Supabase migrations
bun run db:seed          # Seed appliance + pricing data
bun run db:types         # Generate TypeScript types from Supabase schema
```

## Architecture Decisions

### AI Diagnosis Pipeline
- **Claude API** via Anthropic SDK for symptom analysis
- **Structured output**: Claude returns JSON with diagnosis, confidence, repair type, estimated parts, estimated labor
- **System prompt engineering**: Trained prompt with appliance repair knowledge, safety disclaimers, and output schema
- **Rate limiting**: 3 free diagnoses/month tracked server-side, premium unlimited
- **Caching**: Cache diagnosis results for identical symptom+appliance combinations (TTL 30 days)
- **Safety**: Always include disclaimer that AI diagnosis is informational, not a substitute for professional inspection

### Pricing Data Strategy
- **Seed data**: Research-based initial pricing for top 50 appliance repair types across 20 metro areas
- **Crowdsourced enrichment**: Users submit actual repair costs (amount, zip, appliance, repair type)
- **Validation**: Flag outlier submissions (>3 standard deviations), require receipt photo for high-value reports
- **Location adjustment**: Use Bureau of Labor Statistics cost-of-living indices to adjust prices by metro area
- **Aging**: Weight recent submissions higher, decay older data over 2 years

### SEO Strategy
- **Programmatic pages**: "How much should [appliance] [repair type] cost" for all appliance+repair combos
- **Appliance model pages**: "[Brand] [Model] common problems and repair costs"
- **Location pages**: "[Appliance] repair cost in [city]"
- **Schema.org**: Product + Offer structured data, FAQPage for common questions
- **Sitemap**: Auto-generated from appliance/repair/location matrix
- Target keywords: "how much does [appliance] repair cost", "[appliance] not working", "should I repair or replace [appliance]"

### Data Model Overview
- `appliances` — Appliance catalog (brand, model, category, avg_lifespan, avg_replacement_cost)
- `repair_types` — Canonical repair types (name, category, avg_parts_cost, avg_labor_hours)
- `price_estimates` — Location-adjusted price ranges (repair_type, zip, low, median, high)
- `user_submissions` — Crowdsourced repair cost reports (appliance, repair, amount, zip, date)
- `diagnoses` — AI diagnosis results (symptoms, diagnosis, confidence, repair_type, user_id)
- `users` — Extended user profiles
- `subscriptions` — Stripe subscription tracking
- `report_purchases` — One-time premium report purchases

### API Integrations
- **Claude API (Anthropic)**: Core AI diagnosis engine
- **Stripe**: Subscriptions + one-time report purchases
- **BLS API (future)**: Cost-of-living adjustment data
- **Amazon Product API (future)**: Replacement appliance pricing and affiliate links

### Revenue Implementation
- Stripe Checkout for both subscription and one-time report purchases
- Webhook handler for subscription lifecycle
- Per-report purchase flow: diagnose free, pay $2.99 for detailed report
- Feature gating: free = 3 diagnoses/month + basic price range, premium = unlimited + full reports
- Affiliate link injection on repair and replacement recommendations

## Version
0.0.0
