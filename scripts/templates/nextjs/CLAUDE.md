# {{PRODUCT_NAME}} -- {{PRODUCT_TAGLINE}}

## Status: Scaffold Complete

## Product Overview
{{PRODUCT_NAME}} -- {{PRODUCT_TAGLINE}}

### Target User
(To be defined during research phase)

### Key Features (MVP)
(To be defined during planning phase)

### Revenue Model
(To be defined during planning phase)

## Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Framework | Next.js 15 (App Router) | SSG for SEO content pages, RSC for dashboard |
| Database | Supabase (PostgreSQL) | RLS for multi-tenant user data |
| Auth | Supabase Auth | Email + Google OAuth |
| Storage | Supabase Storage | User uploads |
| Payments | Stripe | Subscription management |
| Deploy | Vercel | Edge functions, ISR for content pages |
| Package Manager | bun | Fast installs, native TypeScript |
| Testing | Vitest + Playwright | Unit/integration + E2E |
| Styling | Tailwind CSS 4 | Utility-first, fast iteration |

## Model & Effort
Always use Claude Opus 4.6 with max effort.

## Build / Test / Deploy
```bash
cd {{PRODUCT_SLUG}}
bun install              # Install dependencies
bun run dev              # Start dev server (localhost:3001)
bun run test             # Run Vitest unit/integration tests (NOT bun test!)
bun run test:e2e         # Run Playwright E2E tests
bun run build            # Production build
bun run lint             # ESLint check
bun run format           # Format code with Prettier
bun run format:check     # Check formatting without writing
bun run typecheck        # TypeScript strict type check
```

**IMPORTANT**: Always use `bun run test` (which runs vitest via package.json script), NOT `bun test` (which invokes Bun's native test runner and will pick up Playwright files incorrectly).

## Project Structure
```
{{PRODUCT_SLUG}}/
  src/
    app/              # Next.js App Router pages and layouts
      layout.tsx      # Root layout with header/footer shell
      page.tsx        # Landing page with hero, features, CTA
      globals.css     # Tailwind imports and CSS custom properties
      api/
        health/
          route.ts    # Health check endpoint
    components/       # Reusable React components
    lib/              # Utility functions and helpers
      env.ts          # Environment variable accessors
      test-setup.ts   # Vitest setup file
    types/            # TypeScript type definitions
      index.ts        # Shared types
  e2e/                # Playwright E2E tests (excluded from tsconfig)
    smoke.spec.ts     # Landing page smoke tests
  public/             # Static assets
```

## LLM-Testable Design
All interactive elements include `data-testid` attributes for Playwright testing.
- `data-testid="header"` -- Page header
- `data-testid="nav"` -- Navigation bar
- `data-testid="logo-link"` -- Logo/home link
- `data-testid="nav-login"` -- Sign in button
- `data-testid="main-content"` -- Main content area
- `data-testid="footer"` -- Page footer
- `data-testid="hero-section"` -- Hero section
- `data-testid="hero-title"` -- Hero heading
- `data-testid="hero-subtitle"` -- Hero subheading
- `data-testid="cta-primary-button"` -- Primary CTA button
- `data-testid="cta-demo-button"` -- Demo CTA button
- `data-testid="how-it-works-section"` -- How it works section
- `data-testid="step-1"` -- Step 1
- `data-testid="step-2"` -- Step 2
- `data-testid="step-3"` -- Step 3
- `data-testid="features-section"` -- Features section
- `data-testid="cta-section"` -- Bottom CTA section
- `data-testid="cta-start-button"` -- Get started button
- `data-testid="footer-privacy"` -- Privacy link
- `data-testid="footer-terms"` -- Terms link
- `data-testid="footer-contact"` -- Contact link

Convention: All new interactive elements MUST include a `data-testid` attribute.

## Environment Variables
See `.env.example` for required variables:
- `NEXT_PUBLIC_SUPABASE_URL` -- Supabase project URL (client-side accessible)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` -- Supabase anonymous key (client-side accessible)
- `STRIPE_SECRET_KEY` -- Stripe secret API key (server-only)
- `TEST_MODE` -- Enable test mode (bypasses rate limits, enables test accounts)
- `NEXT_PUBLIC_APP_URL` -- Public app URL (client-side accessible)

**IMPORTANT**: Any environment variable accessed in client components or browser code MUST be prefixed with `NEXT_PUBLIC_`. Server-only secrets (like `STRIPE_SECRET_KEY`) do NOT get the prefix.

## Version
0.1.0
