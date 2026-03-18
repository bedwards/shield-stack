import type { RecoveryPath, ScoreRange } from "./database.types";

// ============================================================================
// Affiliate product catalog
// ============================================================================

export type AffiliateCategory =
  | "credit_builder"
  | "secured_card"
  | "credit_monitoring"
  | "refinancing";

export interface AffiliateProduct {
  /** Unique slug — matches product_slug in affiliate_clicks table */
  slug: string;
  /** Display name */
  name: string;
  /** Product category */
  category: AffiliateCategory;
  /** One-line benefit description shown to users */
  description: string;
  /** CTA button text */
  ctaText: string;
  /** Base URL to redirect to (affiliate ID appended server-side from env) */
  baseUrl: string;
  /** Why this product helps — shown as a secondary line */
  whyRecommended: string;
}

/**
 * Full catalog of affiliate products.
 * Order within each category matters — higher priority first.
 */
export const AFFILIATE_PRODUCTS: Record<string, AffiliateProduct> = {
  self: {
    slug: "self",
    name: "Self Credit Builder",
    category: "credit_builder",
    description:
      "Build credit with small monthly payments. Your payments are reported to all 3 bureaus.",
    ctaText: "Start Building Credit",
    baseUrl: "https://www.self.inc/",
    whyRecommended:
      "Credit-builder loans are one of the fastest ways to establish positive payment history.",
  },
  discover_secured: {
    slug: "discover_secured",
    name: "Discover it\u00AE Secured Card",
    category: "secured_card",
    description:
      "No annual fee secured card with cashback rewards. Doubles all cashback your first year.",
    ctaText: "Apply Now",
    baseUrl: "https://www.discover.com/credit-cards/secured/",
    whyRecommended:
      "A secured card builds credit history while giving you access to a real credit card.",
  },
  capital_one_secured: {
    slug: "capital_one_secured",
    name: "Capital One Platinum Secured",
    category: "secured_card",
    description:
      "No annual fee. Deposit as low as $49. Reports to all 3 bureaus monthly.",
    ctaText: "Check Eligibility",
    baseUrl: "https://www.capitalone.com/credit-cards/platinum-secured/",
    whyRecommended:
      "Low deposit requirement makes this accessible even on a tight budget.",
  },
  experian: {
    slug: "experian",
    name: "Experian Credit Monitoring",
    category: "credit_monitoring",
    description:
      "Free FICO score, credit report access, and real-time alerts when your score changes.",
    ctaText: "Get Free Monitoring",
    baseUrl: "https://www.experian.com/consumer-products/free-credit-report.html",
    whyRecommended:
      "Track your recovery progress with real-time score updates and credit report alerts.",
  },
  credit_karma: {
    slug: "credit_karma",
    name: "Credit Karma",
    category: "credit_monitoring",
    description:
      "Free credit scores from TransUnion and Equifax. Personalized recommendations.",
    ctaText: "Check Your Score Free",
    baseUrl: "https://www.creditkarma.com/",
    whyRecommended:
      "Monitor your score recovery for free and get alerts when something changes.",
  },
  sofi_refi: {
    slug: "sofi_refi",
    name: "SoFi Student Loan Refinancing",
    category: "refinancing",
    description:
      "Refinance at a lower rate. No fees. Unemployment protection included.",
    ctaText: "Check Your Rate",
    baseUrl: "https://www.sofi.com/refinance-student-loan/",
    whyRecommended:
      "Once your score recovers, refinancing can save thousands in interest.",
  },
};

// ============================================================================
// Matching logic — recovery path + score range → recommended products
// ============================================================================

/**
 * Score ranges grouped by severity for matching.
 * Lower scores → more credit-building products.
 * Higher scores → monitoring + refinancing.
 */
const LOW_SCORES: Set<ScoreRange> = new Set([
  "300_499",
  "500_579",
]);

const MID_SCORES: Set<ScoreRange> = new Set([
  "580_619",
  "620_659",
]);

const HIGH_SCORES: Set<ScoreRange> = new Set([
  "660_699",
  "700_749",
  "750_plus",
]);

interface MatchRule {
  slug: string;
  paths: Set<RecoveryPath> | "all";
  scores: Set<ScoreRange> | "all";
  priority: number;
}

const ALL_PATHS: Set<RecoveryPath> = new Set([
  "ibr_enrollment",
  "rehabilitation",
  "consolidation",
  "credit_building",
  "mixed",
]);

/**
 * Rules that map (path, score) → product recommendations.
 * Lower priority number = shown first.
 */
const MATCH_RULES: MatchRule[] = [
  // Credit builders — recommended for low/mid scores on all paths
  {
    slug: "self",
    paths: "all",
    scores: new Set([...LOW_SCORES, ...MID_SCORES]),
    priority: 1,
  },
  // Secured cards — recommended for low/mid scores
  {
    slug: "discover_secured",
    paths: "all",
    scores: new Set([...LOW_SCORES, ...MID_SCORES]),
    priority: 2,
  },
  {
    slug: "capital_one_secured",
    paths: new Set(["credit_building", "mixed", "rehabilitation"]),
    scores: LOW_SCORES,
    priority: 3,
  },
  // Credit monitoring — recommended for everyone
  {
    slug: "experian",
    paths: "all",
    scores: "all",
    priority: 4,
  },
  {
    slug: "credit_karma",
    paths: "all",
    scores: "all",
    priority: 5,
  },
  // Refinancing — only for high scores who have recovered
  {
    slug: "sofi_refi",
    paths: new Set(["ibr_enrollment", "credit_building"]),
    scores: HIGH_SCORES,
    priority: 6,
  },
];

/**
 * Get affiliate product recommendations based on recovery path and score range.
 * Returns products sorted by priority (most relevant first).
 * Maximum of 3 products per plan to avoid overwhelming the user.
 */
export function getAffiliateRecommendations(
  recoveryPath: RecoveryPath,
  scoreRange: ScoreRange,
): AffiliateProduct[] {
  const MAX_RECOMMENDATIONS = 3;

  const matched = MATCH_RULES
    .filter((rule) => {
      const pathMatch =
        rule.paths === "all" || rule.paths.has(recoveryPath);
      const scoreMatch =
        rule.scores === "all" || rule.scores.has(scoreRange);
      return pathMatch && scoreMatch;
    })
    .sort((a, b) => a.priority - b.priority)
    .slice(0, MAX_RECOMMENDATIONS);

  return matched
    .map((rule) => AFFILIATE_PRODUCTS[rule.slug])
    .filter((p): p is AffiliateProduct => p !== undefined);
}

/**
 * Get a single affiliate product by slug.
 * Returns undefined if slug is not found.
 */
export function getAffiliateProduct(
  slug: string,
): AffiliateProduct | undefined {
  return AFFILIATE_PRODUCTS[slug];
}

/**
 * Build the affiliate redirect URL for a product.
 * In production, this appends the affiliate tracking ID from env vars.
 * Falls back to the base product URL if no affiliate ID is configured.
 */
export function getAffiliateUrl(slug: string): string {
  const product = AFFILIATE_PRODUCTS[slug];
  if (!product) {
    throw new Error(`Unknown affiliate product: ${slug}`);
  }
  return product.baseUrl;
}

/**
 * Get all available affiliate product slugs.
 */
export function getAffiliateSlugs(): string[] {
  return Object.keys(AFFILIATE_PRODUCTS);
}
