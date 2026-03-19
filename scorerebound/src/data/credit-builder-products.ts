// ============================================================================
// Credit-builder product comparison catalog
// Used by /compare/credit-builders page for SEO comparison content.
// affiliate_slug values match slugs in src/lib/affiliates.ts
// ============================================================================

export type CreditBuilderType =
  | "credit-builder-loan"
  | "secured-card"
  | "credit-monitoring";

export interface CreditBuilderProduct {
  /** Unique slug for this comparison entry */
  slug: string;
  /** Display name */
  name: string;
  /** Product type category */
  type: CreditBuilderType;
  /** Monthly cost as display string */
  monthly_cost: string;
  /** Annual fee as display string */
  annual_fee: string;
  /** Credit limit or savings amount */
  credit_limit_or_savings: string;
  /** Which credit bureaus the product reports to */
  credit_bureaus_reported: string[];
  /** Minimum credit score required, or "No minimum" */
  min_credit_score: string;
  /** Typical time to see credit improvement */
  time_to_build_credit: string;
  /** Advantages */
  pros: string[];
  /** Disadvantages */
  cons: string[];
  /** One-line summary of ideal user */
  best_for: string;
  /** Matches slug in src/lib/affiliates.ts AFFILIATE_PRODUCTS */
  affiliate_slug: string;
  /** Whether this product gets an "Editor's Pick" badge */
  editors_pick?: boolean;
}

export const CREDIT_BUILDER_PRODUCTS: CreditBuilderProduct[] = [
  {
    slug: "self",
    name: "Self Credit Builder",
    type: "credit-builder-loan",
    monthly_cost: "$25–$48/mo",
    annual_fee: "$0",
    credit_limit_or_savings: "$520–$1,700 savings",
    credit_bureaus_reported: ["Equifax", "Experian", "TransUnion"],
    min_credit_score: "No minimum",
    time_to_build_credit: "3–6 months",
    pros: [
      "Reports to all 3 bureaus monthly",
      "No credit check to apply",
      "Builds savings while building credit",
      "Low starting monthly payment ($25/mo)",
    ],
    cons: [
      "Monthly payments are not refundable if you cancel early",
      "Interest charges reduce total savings returned",
      "Takes 12–24 months to complete the loan term",
    ],
    best_for:
      "Borrowers with very low scores who need to establish positive payment history from scratch",
    affiliate_slug: "self",
    editors_pick: true,
  },
  {
    slug: "moneylion",
    name: "MoneyLion Credit Builder Plus",
    type: "credit-builder-loan",
    monthly_cost: "$19.99/mo",
    annual_fee: "$0",
    credit_limit_or_savings: "$1,000 loan",
    credit_bureaus_reported: ["Equifax", "Experian", "TransUnion"],
    min_credit_score: "No minimum",
    time_to_build_credit: "2–4 months",
    pros: [
      "0% APR credit-builder loan",
      "Includes free credit monitoring",
      "Get funds deposited to your account",
      "No credit check required",
    ],
    cons: [
      "Membership fee required ($19.99/mo)",
      "Must maintain RoarMoney account",
      "Limited availability in some states",
    ],
    best_for:
      "Borrowers who want credit building and monitoring bundled together",
    affiliate_slug: "moneylion",
  },
  {
    slug: "discover-secured",
    name: "Discover it\u00AE Secured Card",
    type: "secured-card",
    monthly_cost: "$0",
    annual_fee: "$0",
    credit_limit_or_savings: "$200–$2,500 credit limit",
    credit_bureaus_reported: ["Equifax", "Experian", "TransUnion"],
    min_credit_score: "No minimum",
    time_to_build_credit: "6–8 months",
    pros: [
      "No annual fee",
      "Earn 2% cashback at gas stations and restaurants (up to $1,000/quarter)",
      "Discover doubles all cashback your first year",
      "Automatic upgrade to unsecured card after 8 months of responsible use",
    ],
    cons: [
      "Requires $200 minimum security deposit",
      "Lower cashback (1%) on non-bonus purchases",
      "Smaller acceptance network than Visa/Mastercard",
    ],
    best_for:
      "Borrowers who want a real credit card with cashback rewards while rebuilding",
    affiliate_slug: "discover_secured",
  },
  {
    slug: "capital-one-secured",
    name: "Capital One Platinum Secured",
    type: "secured-card",
    monthly_cost: "$0",
    annual_fee: "$0",
    credit_limit_or_savings: "$200 credit limit",
    credit_bureaus_reported: ["Equifax", "Experian", "TransUnion"],
    min_credit_score: "No minimum",
    time_to_build_credit: "6–8 months",
    pros: [
      "Security deposit as low as $49",
      "No annual fee",
      "Reports to all 3 bureaus",
      "Access to CreditWise score tracking",
    ],
    cons: [
      "No cashback or rewards program",
      "Higher APR (30.74% variable)",
      "$200 initial credit limit regardless of deposit",
    ],
    best_for:
      "Borrowers on a tight budget who cannot afford a large security deposit",
    affiliate_slug: "capital_one_secured",
  },
  {
    slug: "chime",
    name: "Chime Credit Builder Card",
    type: "secured-card",
    monthly_cost: "$0",
    annual_fee: "$0",
    credit_limit_or_savings: "Spend up to your balance",
    credit_bureaus_reported: ["Equifax", "Experian", "TransUnion"],
    min_credit_score: "No minimum",
    time_to_build_credit: "2–4 months",
    pros: [
      "No fees of any kind (no annual, interest, or late fees)",
      "No credit check to apply",
      "No minimum security deposit",
      "Reports to all 3 bureaus",
    ],
    cons: [
      "Requires Chime checking account with direct deposit",
      "Credit limit tied to how much you load onto the card",
      "No rewards program",
    ],
    best_for:
      "Borrowers who want zero-risk credit building with absolutely no fees",
    affiliate_slug: "chime",
  },
  {
    slug: "credit-karma",
    name: "Credit Karma",
    type: "credit-monitoring",
    monthly_cost: "$0",
    annual_fee: "$0",
    credit_limit_or_savings: "N/A",
    credit_bureaus_reported: ["TransUnion", "Equifax"],
    min_credit_score: "No minimum",
    time_to_build_credit: "N/A (monitoring only)",
    pros: [
      "Completely free — no hidden charges",
      "Scores from both TransUnion and Equifax",
      "Personalized product recommendations",
      "Credit report alerts and score simulator",
    ],
    cons: [
      "Does not directly build credit (monitoring only)",
      "Uses VantageScore, not FICO (which most lenders use)",
      "Shows targeted ads for financial products",
    ],
    best_for:
      "Everyone — pair with a credit-builder loan or secured card to track your progress",
    affiliate_slug: "credit_karma",
  },
];

/** Type label for display */
export const TYPE_LABELS: Record<CreditBuilderType, string> = {
  "credit-builder-loan": "Credit Builder Loan",
  "secured-card": "Secured Card",
  "credit-monitoring": "Credit Monitoring",
};

/** Get all credit-builder product slugs */
export function getCreditBuilderSlugs(): string[] {
  return CREDIT_BUILDER_PRODUCTS.map((p) => p.slug);
}
