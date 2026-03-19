/**
 * Competitor comparison data for /compare/{competitor} SEO pages.
 *
 * Each entry contains factual, sourced information about the competitor
 * and a fair comparison with AfterLoss. Tone: empathetic, factual, never
 * aggressive or disparaging. These are people in grief — not SaaS buyers.
 */

export interface CompetitorFeature {
  name: string;
  afterloss: string | boolean;
  competitor: string | boolean;
}

export interface CompetitorData {
  slug: string;
  name: string;
  tagline: string;
  /** One-sentence summary of what the competitor does */
  summary: string;
  pricing: string;
  pricingDetail: string;
  /** Target keywords for SEO */
  keywords: string[];
  /** Feature-by-feature comparison rows */
  features: CompetitorFeature[];
  /** Pros of the competitor (honest, fair) */
  competitorPros: string[];
  /** Cons of the competitor (factual, not harsh) */
  competitorCons: string[];
  /** Why AfterLoss may be a better fit */
  whyAfterloss: string[];
  /** When the competitor might be a better choice (fairness) */
  whenCompetitorBetter: string;
  /** Last verified date for competitor data */
  lastVerified: string;
}

export const COMPETITORS: CompetitorData[] = [
  {
    slug: "sunset",
    name: "Sunset",
    tagline: "Automated estate settlement via mobile app",
    summary:
      "Sunset is a mobile app that helps families discover and transfer financial assets after a death. It is funded by partner banks that hold estate funds in FDIC-insured accounts.",
    pricing: "Free",
    pricingDetail:
      "Free to use. Revenue comes from partner bank interest on estate funds held in FDIC-insured accounts (up to $3M).",
    keywords: [
      "sunset app review",
      "sunset estate app",
      "afterloss vs sunset",
      "sunset app alternative",
      "free estate settlement app",
      "sunset estate settlement review 2026",
    ],
    features: [
      { name: "Cost", afterloss: "Free", competitor: "Free" },
      { name: "Account required", afterloss: "No", competitor: "Yes" },
      { name: "Works in browser (no download)", afterloss: true, competitor: false },
      { name: "Mobile app", afterloss: false, competitor: true },
      { name: "Asset discovery", afterloss: false, competitor: true },
      { name: "AI-generated letters & forms", afterloss: true, competitor: false },
      { name: "Phone scripts for calling institutions", afterloss: true, competitor: false },
      { name: "State-specific probate guides (all 50 states)", afterloss: true, competitor: false },
      { name: "Subscription cancellation templates", afterloss: true, competitor: false },
      { name: "Step-by-step settlement checklist", afterloss: true, competitor: true },
      { name: "Deadline tracking", afterloss: true, competitor: false },
      { name: "E-notarization", afterloss: false, competitor: true },
      { name: "Digital asset & crypto discovery", afterloss: false, competitor: true },
      { name: "SOC 2 Type II certified", afterloss: false, competitor: true },
    ],
    competitorPros: [
      "Completely free — no hidden costs",
      "Automated asset discovery across financial institutions",
      "iPhone and Android apps for on-the-go access",
      "SOC 2 Type II security certification",
      "E-notarization for legal documents",
      "Covers all 50 states and 3,000+ counties",
      "RUFADAA-compliant crypto and digital asset discovery",
    ],
    competitorCons: [
      "Requires downloading an app — no web-based option",
      "Requires account creation to use any features",
      "Narrowly focused on asset discovery and transfer",
      "Does not provide full emotional or administrative guidance",
      "No AI-generated letters, phone scripts, or cancellation templates",
      "No state-specific probate guides or legal education content",
    ],
    whyAfterloss: [
      "Works instantly in your browser — no app download needed during a difficult time",
      "No account required — start getting help immediately without signing up",
      "Covers the full estate settlement process, not just asset discovery",
      "AI generates personalized letters for banks, insurers, employers, and creditors",
      "Pre-written phone scripts so you know exactly what to say when calling institutions",
      "State-specific probate guides with timelines, costs, and requirements",
      "Subscription cancellation templates for 100+ services",
    ],
    whenCompetitorBetter:
      "Sunset may be a better choice if you primarily need help discovering and transferring financial assets, especially if you prefer using a mobile app and want automated asset search across institutions.",
    lastVerified: "March 2026",
  },
  {
    slug: "atticus",
    name: "Atticus",
    tagline: "iOS app for step-by-step estate settlement",
    summary:
      "Atticus is an iOS-only mobile app that provides step-by-step guidance for settling an estate. It was named a Fast Company World Changing Idea.",
    pricing: "$15/month",
    pricingDetail:
      "Subscription-based at approximately $15 per month. No free tier available.",
    keywords: [
      "atticus estate app review",
      "atticus app review 2026",
      "afterloss vs atticus",
      "atticus alternative",
      "atticus estate settlement app",
      "free atticus alternative",
    ],
    features: [
      { name: "Cost", afterloss: "Free forever", competitor: "~$15/month" },
      { name: "Account required", afterloss: "No", competitor: "Yes" },
      { name: "Works in browser (no download)", afterloss: true, competitor: false },
      { name: "Available on Android", afterloss: "Yes (web)", competitor: "No (iOS only)" },
      { name: "AI-generated letters & forms", afterloss: true, competitor: false },
      { name: "Phone scripts for calling institutions", afterloss: true, competitor: false },
      { name: "State-specific probate guides (all 50 states)", afterloss: true, competitor: true },
      { name: "Subscription cancellation templates", afterloss: true, competitor: false },
      { name: "Step-by-step settlement checklist", afterloss: true, competitor: true },
      { name: "Deadline tracking", afterloss: true, competitor: true },
      { name: "Document generation", afterloss: true, competitor: false },
      { name: "Works without internet (offline)", afterloss: false, competitor: true },
    ],
    competitorPros: [
      "Well-designed step-by-step guidance for executors",
      "Fast Company World Changing Idea award winner",
      "Offline access for areas with poor connectivity",
      "Dedicated iOS app experience",
    ],
    competitorCons: [
      "Costs approximately $15 per month — adds up during a long settlement",
      "iOS only — no Android app or web access",
      "Requires account creation and app download",
      "Mixed App Store reviews citing bugs and unresponsive support",
      "No AI-generated personalized documents or letters",
      "No phone scripts or cancellation templates",
    ],
    whyAfterloss: [
      "100% free — estate settlement is stressful enough without subscription fees",
      "Works on any device with a browser — phone, tablet, or computer",
      "No download or account needed — start immediately",
      "AI generates personalized letters tailored to your specific situation",
      "Phone scripts so you know what to say when calling Social Security, banks, and insurers",
      "Subscription cancellation templates for 100+ services",
    ],
    whenCompetitorBetter:
      "Atticus may be a better choice if you have an iPhone, prefer a native app experience, and need offline access in areas with poor internet connectivity.",
    lastVerified: "March 2026",
  },
  {
    slug: "swiftprobate",
    name: "SwiftProbate",
    tagline: "DIY probate filing platform with county-level guides",
    summary:
      "SwiftProbate is a DIY probate platform with 3,200+ county-specific guides and 160+ institution guides. It focuses on probate filing rather than full estate settlement.",
    pricing: "$39 one-time",
    pricingDetail:
      "One-time fee of $39 for access to probate filing guides and tools.",
    keywords: [
      "swiftprobate review",
      "swiftprobate alternative",
      "afterloss vs swiftprobate",
      "swiftprobate alternatives 2026",
      "free swiftprobate alternative",
      "best estate settlement app 2026",
    ],
    features: [
      { name: "Cost", afterloss: "Free forever", competitor: "$39 one-time" },
      { name: "Account required", afterloss: "No", competitor: "Yes" },
      { name: "County-specific probate guides", afterloss: "State + county level", competitor: "3,200+ counties" },
      { name: "AI-generated letters & forms", afterloss: true, competitor: false },
      { name: "Phone scripts for calling institutions", afterloss: true, competitor: false },
      { name: "Subscription cancellation templates", afterloss: true, competitor: false },
      { name: "Full estate settlement checklist", afterloss: true, competitor: false },
      { name: "Deadline tracking", afterloss: true, competitor: false },
      { name: "Institution guides (banks, insurers)", afterloss: true, competitor: "160+" },
      { name: "Probate filing guidance", afterloss: true, competitor: true },
      { name: "Death certificate ordering help", afterloss: true, competitor: false },
      { name: "Grief support resources", afterloss: true, competitor: false },
    ],
    competitorPros: [
      "Extensive county-specific probate guides (3,200+ counties)",
      "Affordable one-time fee — no recurring charges",
      "160+ institution-specific guides for banks and insurers",
      "Focused specifically on the probate filing process",
    ],
    competitorCons: [
      "Costs $39 — AfterLoss provides similar guidance for free",
      "Focused narrowly on probate — does not cover full estate settlement",
      "No AI-generated personalized letters or forms",
      "No phone scripts, cancellation templates, or deadline tracking",
      "No grief counseling resources or emotional support content",
      "Requires account and payment before accessing guides",
    ],
    whyAfterloss: [
      "Completely free — why pay $39 when you can get comprehensive guidance at no cost?",
      "Covers the entire estate settlement process, not just probate filing",
      "AI generates personalized letters for every scenario you need",
      "Phone scripts tell you exactly what to say when calling institutions",
      "Deadline tracking ensures you never miss a filing window",
      "Grief counseling resources and empathetic guidance throughout",
    ],
    whenCompetitorBetter:
      "SwiftProbate may be a better choice if you specifically need detailed county-level probate court information and prefer a platform solely focused on the probate filing process.",
    lastVerified: "March 2026",
  },
  {
    slug: "elayne",
    name: "Elayne",
    tagline: "AI-powered estate settlement with optional full-service discovery",
    summary:
      "Elayne offers a free self-guided tier with family collaboration and document sharing, plus a $250 paid tier with full account search and human support. SOC 2 Type II and HIPAA compliant.",
    pricing: "Free self-guided / $250 full discovery",
    pricingDetail:
      "Free tier includes family collaboration and document sharing but requires account creation. Paid $250 tier adds full account discovery and human support.",
    keywords: [
      "elayne estate settlement review",
      "elayne review 2026",
      "afterloss vs elayne",
      "elayne alternative",
      "elayne estate app",
      "free elayne alternative",
    ],
    features: [
      { name: "Cost", afterloss: "Free forever", competitor: "Free tier / $250 full" },
      { name: "Account required", afterloss: "No", competitor: "Yes (even free tier)" },
      { name: "Works without signup", afterloss: true, competitor: false },
      { name: "Family collaboration", afterloss: false, competitor: true },
      { name: "Document sharing", afterloss: false, competitor: true },
      { name: "AI-generated letters & forms", afterloss: true, competitor: false },
      { name: "Phone scripts for calling institutions", afterloss: true, competitor: false },
      { name: "State-specific probate guides (all 50 states)", afterloss: true, competitor: false },
      { name: "Subscription cancellation templates", afterloss: true, competitor: false },
      { name: "Full account discovery", afterloss: false, competitor: "$250 paid tier" },
      { name: "Human support", afterloss: false, competitor: "$250 paid tier" },
      { name: "SOC 2 Type II + HIPAA compliant", afterloss: false, competitor: true },
      { name: "Estate plan management", afterloss: false, competitor: true },
      { name: "Deadline tracking", afterloss: true, competitor: false },
    ],
    competitorPros: [
      "Free tier includes family collaboration and document sharing",
      "SOC 2 Type II and HIPAA compliance for data security",
      "Paid tier provides full account discovery across institutions",
      "Human support available at the $250 tier",
      "Estate plan management features",
    ],
    competitorCons: [
      "Requires account creation even for the free tier",
      "Full features locked behind $250 paywall",
      "No AI-generated personalized letters or phone scripts",
      "No state-specific probate guides or legal education content",
      "No subscription cancellation templates",
      "No deadline tracking or grief counseling resources",
    ],
    whyAfterloss: [
      "No account needed — start getting help immediately without creating a login",
      "Full functionality is free — no tiered pricing or paywalls",
      "AI generates personalized letters for banks, insurers, employers, and government",
      "Phone scripts so you know exactly what to say on difficult calls",
      "State-specific probate guides for all 50 states plus DC",
      "Grief counseling resources and empathetic tone throughout",
    ],
    whenCompetitorBetter:
      "Elayne may be a better choice if you need family collaboration features, document sharing with multiple family members, or want full-service account discovery with human support at the $250 tier.",
    lastVerified: "March 2026",
  },
  {
    slug: "eversettled",
    name: "EverSettled",
    tagline: "Full-service estate settlement platform with specialist support",
    summary:
      "EverSettled offers a smart checklist based on state, assets, and family situation, with optional estate settlement specialists at higher tiers. Based in San Francisco with 500+ families served.",
    pricing: "$199 base",
    pricingDetail:
      "Starting at $199 for the base tier. Higher tiers include access to estate settlement specialists. Free 2-week trial available.",
    keywords: [
      "eversettled review",
      "eversettled review 2026",
      "afterloss vs eversettled",
      "eversettled alternative",
      "eversettled estate settlement",
      "free eversettled alternative",
    ],
    features: [
      { name: "Cost", afterloss: "Free forever", competitor: "$199+" },
      { name: "Account required", afterloss: "No", competitor: "Yes" },
      { name: "Smart checklist by state/assets", afterloss: true, competitor: true },
      { name: "AI-generated letters & forms", afterloss: true, competitor: false },
      { name: "Phone scripts for calling institutions", afterloss: true, competitor: false },
      { name: "State-specific probate guides (all 50 states)", afterloss: true, competitor: false },
      { name: "Subscription cancellation templates", afterloss: true, competitor: false },
      { name: "Access to human specialists", afterloss: false, competitor: "Higher tiers" },
      { name: "Deadline tracking", afterloss: true, competitor: true },
      { name: "Death certificate ordering help", afterloss: true, competitor: false },
      { name: "Grief support resources", afterloss: true, competitor: false },
      { name: "Free trial available", afterloss: "Always free", competitor: "2-week trial" },
    ],
    competitorPros: [
      "Smart checklist adapts to your state, assets, and family situation",
      "Optional access to estate settlement specialists at higher tiers",
      "500+ families served — established track record",
      "Free 2-week trial to evaluate before committing",
    ],
    competitorCons: [
      "Starts at $199 — significant cost during an already expensive time",
      "Higher tiers with specialists cost even more",
      "Requires account creation to use any features",
      "No AI-generated personalized documents or letters",
      "No phone scripts or subscription cancellation templates",
      "No state-specific probate guides or grief counseling resources",
    ],
    whyAfterloss: [
      "100% free forever — save $199+ for funeral costs, medical bills, or other pressing needs",
      "No account needed — start immediately without signing up or providing payment info",
      "AI generates personalized letters tailored to your situation — not just templates",
      "Phone scripts for every difficult call you need to make",
      "State-specific probate guides with costs, timelines, and court information",
      "Subscription cancellation templates for 100+ services",
    ],
    whenCompetitorBetter:
      "EverSettled may be a better choice if you want access to human estate settlement specialists who can provide personalized professional guidance, especially for complex estates.",
    lastVerified: "March 2026",
  },
];

export function getCompetitorBySlug(
  slug: string
): CompetitorData | undefined {
  return COMPETITORS.find((c) => c.slug === slug);
}

export function getAllCompetitorSlugs(): string[] {
  return COMPETITORS.map((c) => c.slug);
}
