# HOAshield — Homeowner Defense Against HOA Overreach

## Status: Planning Complete

## Product Overview
HOAshield helps homeowners fight unfair HOA fines and violations by using AI to analyze their CC&Rs (Covenants, Conditions & Restrictions), track violations, and generate legally-grounded dispute letters. 75M+ Americans live under HOA governance, and many face arbitrary enforcement, selective prosecution, and fines for ambiguous rules. HOAshield levels the playing field.

## Target User
- Homeowners who have received an HOA fine or violation notice (primary, urgent)
- Homeowners moving into an HOA community who want to understand their CC&Rs
- Homeowners preparing to challenge HOA board decisions at meetings
- Real estate buyers evaluating HOA risk before purchase

## MVP Features (v0.1.x)
1. **CC&R Upload & AI Analysis** — Upload CC&R PDF, AI extracts key rules, restrictions, homeowner rights, enforcement procedures, and amendment requirements
2. **Violation Tracker** — Log HOA violations received with dates, photos, and fine amounts
3. **AI Dispute Letter Generator** — Generate legally-grounded dispute letters citing specific CC&R sections, state law, and case precedent
4. **State HOA Law Database** — Curated database of state-specific HOA statutes and homeowner protections
5. **Rights Dashboard** — Plain-language summary of your rights based on CC&Rs + state law
6. **Letter History** — Track all generated letters, delivery dates, and HOA responses
7. **SEO Landing Pages** — "How to fight HOA fine in [state]" programmatic pages
8. **Document Storage** — Secure storage for CC&Rs, violation notices, photos, and correspondence

## Tech Stack
| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js 15 (App Router) | SSR/SSG for SEO, React Server Components |
| Runtime | Bun | Fast installs, native TypeScript |
| Database | Supabase (Postgres + Auth + Storage) | RLS for multi-tenant document security, full-text search for law database |
| Storage | Supabase Storage | CC&R PDFs, violation photos, generated letters |
| Auth | Supabase Auth | Email + Google OAuth |
| Payments | Stripe | Per-letter ($9.99) and subscription ($4.99/mo) |
| Deploy | Vercel | Edge functions, preview deployments |
| PDF Parsing | pdf.js (pdfjs-dist) | Client-side PDF text extraction, no server upload needed for preview |
| AI Analysis | Claude API (Anthropic) | CC&R interpretation, letter generation, legal research |
| AI Model | claude-sonnet-4-20250514 | Best balance of quality and cost for document analysis |

## Build / Test / Deploy
```bash
# Install dependencies
bun install

# Development server
bun dev

# Build for production
bun run build

# Run unit tests
bun test

# Run E2E tests
bunx playwright test

# Lint
bun run lint

# Type check
bun run typecheck

# Database migrations
bunx supabase db push

# Generate Supabase types
bunx supabase gen types typescript --local > src/lib/database.types.ts
```

## Architecture Decisions

### ADR-001: Claude API for Document Analysis
CC&Rs are complex legal documents (often 50-100 pages). Claude excels at understanding legal language, extracting structured data, and generating well-reasoned responses that cite specific sections. We use claude-sonnet-4-20250514 for cost efficiency on document analysis, with Opus available for complex dispute letters.

### ADR-002: Client-Side PDF Preview, Server-Side Analysis
pdf.js renders the PDF in the browser for preview and basic text extraction. Full AI analysis happens server-side via API route to protect the Claude API key and enable caching of analysis results.

### ADR-003: Per-Letter + Subscription Hybrid
Users in crisis (just got a fine) want one letter NOW ($9.99). Users in ongoing disputes want unlimited letters ($4.99/mo). The hybrid model captures both segments. Free tier gets CC&R analysis and rights summary but not letter generation.

### ADR-004: State Law Database as Structured Data
HOA laws vary significantly by state. We maintain a curated Postgres table of state statutes with full-text search rather than relying solely on AI knowledge. This ensures accuracy and allows programmatic SEO pages per state.

### ADR-005: Document Security via RLS
CC&Rs and violation notices contain sensitive personal information. Supabase Row Level Security ensures users can only access their own documents. All storage buckets are private with signed URLs.

## Data Model

### Core Tables
- `profiles` — User profiles (id, email, display_name, state, subscription_tier, stripe_customer_id, created_at)
- `properties` — User's HOA properties (id, user_id, address, hoa_name, state, created_at)
- `ccr_documents` — Uploaded CC&R PDFs (id, property_id, user_id, file_path, file_name, upload_date, page_count, status)
- `ccr_analysis` — AI analysis results (id, ccr_document_id, summary, rules_json, rights_json, enforcement_procedures, amendment_process, analyzed_at, model_used)
- `violations` — Logged HOA violations (id, user_id, property_id, violation_type, description, fine_amount, received_date, due_date, status, photos, ccr_section_cited)
- `dispute_letters` — Generated letters (id, user_id, violation_id, property_id, letter_type, content, ccr_citations, state_law_citations, tone, generated_at, sent_date, response_date, response_notes)
- `state_hoa_laws` — State HOA statute database (id, state, statute_number, title, summary, full_text, category, effective_date, source_url)
- `letter_templates` — Template library (id, letter_type, state, template_content, variables, created_at)

## APIs

### Internal API Routes
- `POST /api/ccr/upload` — Upload CC&R PDF to Supabase Storage
- `POST /api/ccr/analyze` — Trigger AI analysis of uploaded CC&R
- `GET /api/ccr/[id]/analysis` — Get analysis results
- `POST /api/violations` — Create violation record
- `PUT /api/violations/[id]` — Update violation status
- `GET /api/violations` — List user's violations
- `POST /api/letters/generate` — Generate dispute letter via Claude API
- `GET /api/letters` — List generated letters
- `GET /api/laws/[state]` — Get HOA laws for state
- `GET /api/laws/search?q=&state=` — Search law database
- `POST /api/webhooks/stripe` — Stripe webhook handler

### External APIs
- **Claude API**: Document analysis and letter generation
- **Stripe**: Payment processing for per-letter and subscription models

## SEO Strategy
- **Primary keyword pattern**: "How to fight HOA fine", "HOA fine dispute letter", "HOA rights [state]"
- **Programmatic pages**: `/states/[state]/hoa-laws` — one page per state with HOA statutes
- **Violation type pages**: `/guides/[violation-type]` — parking, landscaping, paint color, fence, satellite dish, etc.
- **Blog content**: "Can my HOA fine me for [X]", "HOA board meeting tips", "How to read your CC&Rs"
- **Schema markup**: FAQPage, HowTo, BreadcrumbList, LegalService structured data
- **Internal linking**: State pages link to violation guides, guides link to the tool

## Revenue Model
| Tier | Price | Features |
|------|-------|----------|
| Free | $0 | CC&R upload + AI analysis, rights dashboard, state law lookup |
| Per Letter | $9.99/letter | Generate one dispute letter with citations |
| Premium | $4.99/mo | Unlimited letters, violation tracker, document storage, letter history |
| Pro | $14.99/mo | Everything + priority AI analysis, phone consultation scheduling |

## Model & Effort
Always use Claude Opus 4.6 with max effort.

## Version
0.0.0
