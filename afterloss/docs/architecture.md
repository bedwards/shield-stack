# AfterLoss Architecture

## Overview

AfterLoss is a free, empathetic estate settlement guide. The architecture prioritizes:

1. **Works without account** — localStorage-first, optional Supabase sync
2. **SEO-driven acquisition** — SSG pages for 50 states, 100+ document types
3. **AI-powered differentiation** — Claude API for personalized document generation
4. **Empathy-first UX** — warm design, progressive disclosure, no dark patterns

## System Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    Vercel (CDN + Edge)                    │
├──────────────────────────────────────────────────────────┤
│  Next.js 15 App Router                                   │
│                                                          │
│  SSG Pages          App Pages           API Routes       │
│  /states/*          /onboard            /api/health      │
│  /guides/*          /checklist          /api/generate-doc│
│  /templates/*       /dashboard          /api/affiliate   │
│                                                          │
├──────────────────────────────────────────────────────────┤
│  Client-Side Storage Layer                               │
│                                                          │
│  localStorage (default)       Supabase (optional)        │
│  - Checklist progress         - Cross-device sync        │
│  - Onboarding state           - Email reminders          │
│  - Generated docs (base64)    - Document storage (R2)    │
│                                                          │
├──────────────────────────────────────────────────────────┤
│  External Services                                       │
│                                                          │
│  Claude API        Supabase           Affiliate APIs     │
│  (doc gen)         (DB + Auth)        (CJ, Impact.com)   │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

## Data Persistence: localStorage-First

### Why localStorage-First?

1. **Zero friction** — users are grieving, they should NOT have to create an account
2. **Competitive advantage** — Empathy, Atticus, Sunset all require accounts
3. **Trust building** — deliver value first, ask for account later
4. **Privacy** — sensitive data stays on user's device by default

### Implementation Flow

```
User arrives (often from Google: "what to do when someone dies")
→ Landing page → Start checklist
→ Onboarding: state, relationship, estate complexity, date of death
→ All data saved to localStorage
→ Checklist generated, progress tracked in localStorage
→ Documents generated via API, stored as base64 in localStorage

Optional upgrade path:
→ After significant engagement (5+ items checked)
→ Gentle prompt: "Save your progress across devices?"
→ Supabase Auth sign-up → localStorage data migrated to Supabase
→ Email reminders for deadlines enabled
```

### localStorage Data Model

```typescript
interface LocalEstateCase {
  id: string;                    // UUID generated client-side
  state: string;                 // 2-letter state code
  relationship: 'spouse' | 'child' | 'sibling' | 'parent' | 'other';
  estateComplexity: 'simple' | 'moderate' | 'complex';
  dateOfDeath: string;           // ISO 8601
  deceasedName?: string;
  createdAt: string;             // ISO 8601
  checklistProgress: Record<string, {
    status: 'pending' | 'in_progress' | 'completed' | 'skipped';
    completedAt?: string;
    notes?: string;
  }>;
  generatedDocuments: {
    id: string;
    type: string;
    generatedAt: string;
    content: string;             // base64 PDF or text
  }[];
  deadlines: {
    id: string;
    title: string;
    dueDate: string;
    completed: boolean;
  }[];
}
```

## SEO Architecture

### Programmatic Pages (SSG at build time)

| URL Pattern | Count | Content |
|------------|-------|---------|
| `/states/{state}/probate` | 51 | State probate guide (50 states + DC) |
| `/states/{state}/small-estate` | 51 | Small estate affidavit guide |
| `/states/{state}/death-certificate` | 51 | Death certificate ordering guide |
| `/templates/{document-type}` | 20+ | Letter/form templates |
| `/guides/{topic}` | 10+ | Comprehensive topical guides |

**Total: 180+ unique SEO-optimized pages from structured data.**

### ISR (Incremental Static Regeneration)

- State probate data: revalidate every 7 days
- Template pages: revalidate every 30 days
- Guide pages: revalidate on deploy

### Content Strategy

1. **Interactive tool** (checklist + doc gen) as core product
2. **SEO content hub** with comprehensive guides that rank independently
3. **Programmatic state pages** capturing "[topic] [state]" long-tail searches
4. **Internal linking**: content pages → tool to drive engagement

### Target Keywords (from research, updated March 2026)

- "what to do when someone dies checklist" — primary head term (target: #277 guide page)
- "what to do when someone dies checklist 2026" — year-stamped variant (Atticus, SwiftProbate ranking for this)
- "how to close bank account after death" — high volume
- "cancel subscriptions after death" — growing
- "what to say when calling SSA about a death" — unique to AfterLoss (phone scripts #265)
- "how to call bank about deceased account holder" — unique to AfterLoss (phone scripts #265)
- "probate process [state]" — 50 state variants (year-stamped: "Probate Process in [State] (2026 Guide)")
- "small estate affidavit [state]" — 50 state variants
- "death certificate ordering [state]" — 50 state variants

### Date-Stamped Content Strategy (from March 2026 research)

Competitors use year-stamped titles for YMYL SEO freshness signals:
- SwiftProbate: "(2026)" in ALL 3,200+ county page titles
- Atticus: "2026 Checklist" article ranking well
- Elayne: Monthly date-stamped guides ("March 2026", "February 2026")

**AfterLoss must include the current year in all page titles.** Use build-time `new Date().getFullYear()` for SSG pages (no hydration mismatch). ISR revalidation auto-updates when pages regenerate.

## AI Integration

### Claude API Document Generation

- **Server-side only** — API routes with `import "server-only"`
- **Rate-limited**: 10/hour without account, 50/hour with account
- **Model**: Claude claude-sonnet-4-6 (cost-efficient, fast, good quality)

### Document Types

1. Death notification letter (to employers, banks, insurance)
2. Subscription cancellation letter (100+ services)
3. Creditor notification letter
4. Employer benefits inquiry letter
5. Insurance claim letter
6. Affidavit of heirship (state-specific)

### PDF Generation Flow

```
User clicks "Generate Letter"
→ API route receives document type + case data
→ Claude API generates personalized letter text (server-side)
→ JSON response with generated text returned to client
→ @react-pdf/renderer renders styled PDF (CLIENT-SIDE via dynamic import)
→ PDF download triggered in browser
→ Copy stored in localStorage (base64) or Supabase Storage
```

**IMPORTANT:** @react-pdf/renderer MUST use client-side rendering via dynamic import.
Server-side rendering in Next.js App Router causes "DOMMatrix is not defined" errors.

```typescript
// Client-side PDF component (src/components/PdfDocument.tsx)
import dynamic from 'next/dynamic';
const PdfDocument = dynamic(() => import('./PdfDocumentInner'), { ssr: false });

// next.config.ts (fallback for any future server-side compatibility)
const nextConfig = {
  serverExternalPackages: ['@react-pdf/renderer'],
};
```

## Affiliate Integration Points

Affiliate links shown ONLY at contextually relevant checklist steps:

| Checklist Step | Partner | Commission |
|---------------|---------|-----------|
| "Consult estate attorney" | LegalZoom | 15% via CJ |
| "Create your own will" | Trust & Will | 20% via Impact.com |
| "Seek grief support" | BetterHelp | $10-40/referral |
| "Order death certificates" | VitalChek | TBD |

All affiliate links are:
- Clearly labeled as "Sponsored" or "Affiliate"
- Never block progress or require interaction
- Tracked via `affiliate_clicks` table for revenue analysis

## Color Palette & Design

Research (March 2026) found corporate blue is wrong for bereavement. The palette should be:

- **Primary**: Sage green or warm gray (calming, not clinical)
- **Accent**: Soft gold (gentle warmth)
- **Background**: Off-white / warm cream (not stark white)
- **Text**: Dark warm gray (not pure black)
- **All colors**: WCAG 2.1 AA compliant (many users are elderly 70+)
- **Dark mode**: Important — users browse late at night while grieving

## Implementation Priority (Updated 2026-03-17 — Research-Informed)

This is the order the orchestrator should pick up issues. Updated based on March 2026 research findings: CI/CD moved to #2 (automated validation before feature work), 2026 Guide content page added.

1. **Fix scaffold violations (#252)** — P0, must be first. 13+ mechanical fixes from `.ralph/learnings.md`.
2. **CI/CD pipeline (#127)** — P1, must be second. Research confirmed: without CI, every subsequent PR is manually validated. ScoreRebound has CI; AfterLoss does not. Blocked by #252.
3. **Supabase schema + migrations (#111)** — P1, data foundation. All features depend on this. Blocked by #252.
4. **State probate rules data curation (#253)** — P1, highest-value data asset. Enables 153+ SEO pages. Primary data source: Justia 50-state survey. Blocked by #111.
5. **Empathetic landing page redesign (#255)** — P1, first impression. Warm palette, empathetic UX. Blocked by #252.
6. **Onboarding flow (#259)** — P1, prerequisite for checklist engine. Blocked by #252.
7. **Interactive checklist engine (#254)** — P1, core product. Uses zustand + localStorage. Blocked by #259.
8. **SEO infrastructure (#261)** — P1, foundation for #258. Sitemap, robots.ts, JSON-LD schemas (FAQ, HowTo, Article).
9. **Definitive 2026 Guide content page (#277)** — P1, head-term SEO. Competes with AARP, Atticus, Fidelity for "what to do when someone dies checklist". Blocked by #255.
10. **Programmatic SEO state pages (#258)** — P1, SEO multiplier. 153+ pages with year-stamped titles "(2026 Guide)". Blocked by #253, #111.
11. **Phone scripts library (#265)** — P1, UNIQUE differentiator. Research confirmed: NO competitor offers this. Can be built independently.
12. **AI document generation (#260)** — P1, key differentiator. Claude API for letter text + client-side PDF. Blocked by #254.
13. **Subscription cancellation database (#256)** — P2, target 150+ services (expanded from 100+ per research). Blocked by #111.
14. **Deadline tracker (#262)** — P2, completes core product. State-specific filing deadlines. Blocked by #253.
15. **County-level SEO pages (#266)** — P2, 3,200+ pages competing with SwiftProbate. Blocked by #258.
16. **Comparison page SEO strategy (#267)** — P3, intercept competitor-seeking traffic. `/compare/{competitor}` pages.
17. **Affiliate integration (#124)** — P3, revenue. After core features are built.

**Superseded issues:** #115 (mega-issue) replaced by #254, AI doc gen, deadline tracker. #118 (SEO landing) replaced by #255.

### Critical Path
```
#252 → #127 → #111 → #253 → #258 (SEO pages)
#252 → #255 → #277 (2026 guide)
#252 → #259 → #254 → #260 (core product)
#265, #261 (can be worked in parallel with any non-blocked issue)
```

## Key Decisions

| Decision | Choice | Rationale |
|---------|--------|-----------|
| State management | zustand + persist middleware | Simple, localStorage persistence built-in |
| PDF library | @react-pdf/renderer | React-native components → PDF, 860K+ weekly downloads |
| AI model | Claude claude-sonnet-4-6 | Cost-efficient for document generation |
| Auth | Supabase Auth (optional) | Only for cross-device sync + email reminders |
| Checklist data | Static JSON in bundle | Offline-first, no network required for core flow |
| State probate data | Supabase + SSG at build | Changes infrequently, ISR revalidates weekly |
| Primary data source | Justia 50-state survey | Comprehensive, free, covers all states' small estate procedures |
| SEO freshness | Year-stamped titles + ISR | Competitors use "(2026)" in titles; YMYL queries reward freshness |
