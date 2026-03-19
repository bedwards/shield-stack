/**
 * Feature gating definitions for BillWatch.
 *
 * Defines which features are available on free vs premium plans,
 * and the limits for each tier.
 */

export type PlanTier = "free" | "premium";

/** Feature flags and limits per plan */
export interface PlanLimits {
  /** Maximum number of utility accounts a user can track */
  maxUtilityAccounts: number;
  /** Maximum months of bill history retained */
  maxHistoryMonths: number;
  /** Access to household benchmarking */
  benchmarking: boolean;
  /** Access to anomaly email alerts */
  anomalyAlerts: boolean;
  /** Access to provider comparison / switching CTAs */
  providerComparison: boolean;
  /** CSV export of bill history */
  csvExport: boolean;
  /** Access to EIA rate data benchmarking */
  rateBenchmarking: boolean;
}

/** Plan limits configuration */
export const PLAN_LIMITS: Record<PlanTier, PlanLimits> = {
  free: {
    maxUtilityAccounts: 1,
    maxHistoryMonths: 12,
    benchmarking: false,
    anomalyAlerts: false,
    providerComparison: false,
    csvExport: false,
    rateBenchmarking: false,
  },
  premium: {
    maxUtilityAccounts: 50,
    maxHistoryMonths: 120,
    benchmarking: true,
    anomalyAlerts: true,
    providerComparison: true,
    csvExport: true,
    rateBenchmarking: true,
  },
};

/** Premium plan pricing */
export const PREMIUM_PRICE = {
  amount: 3.99,
  amountCents: 399,
  currency: "usd",
  interval: "month" as const,
  displayPrice: "$3.99/mo",
};

/**
 * Features displayed on the pricing page.
 * Each entry maps a feature name to its availability per plan.
 */
export const PRICING_FEATURES: {
  name: string;
  free: string;
  premium: string;
}[] = [
  {
    name: "Utility accounts",
    free: "1 account",
    premium: "Unlimited",
  },
  {
    name: "Bill history",
    free: "12 months",
    premium: "10 years",
  },
  {
    name: "Anomaly detection",
    free: "Basic alerts",
    premium: "Advanced alerts + email notifications",
  },
  {
    name: "Household benchmarking",
    free: "Not included",
    premium: "Compare against similar households",
  },
  {
    name: "Rate benchmarking",
    free: "Not included",
    premium: "Compare against state/national averages",
  },
  {
    name: "Provider comparison",
    free: "Not included",
    premium: "Compare providers in deregulated markets",
  },
  {
    name: "CSV export",
    free: "Not included",
    premium: "Full bill history export",
  },
  {
    name: "Bill upload & OCR",
    free: "Included",
    premium: "Included",
  },
  {
    name: "Cost trend charts",
    free: "Included",
    premium: "Included",
  },
];

/**
 * Routes that require premium access.
 * Used by the Next.js middleware to gate premium features.
 */
export const PREMIUM_ROUTES: string[] = [
  "/dashboard/benchmarking",
  "/dashboard/rate-comparison",
  "/dashboard/provider-comparison",
  "/dashboard/export",
  "/dashboard/alerts/settings",
];

/**
 * Routes that require authentication (but not necessarily premium).
 */
export const AUTH_REQUIRED_ROUTES: string[] = [
  "/dashboard",
  "/upload",
  "/settings",
  "/api/stripe/checkout",
  "/api/stripe/portal",
];

/**
 * Check if a given path requires premium access.
 */
export function requiresPremium(pathname: string): boolean {
  return PREMIUM_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );
}

/**
 * Check if a given path requires authentication.
 */
export function requiresAuth(pathname: string): boolean {
  return (
    AUTH_REQUIRED_ROUTES.some(
      (route) => pathname === route || pathname.startsWith(route + "/"),
    ) || requiresPremium(pathname)
  );
}

/**
 * Get the plan limits for a given tier.
 */
export function getPlanLimits(tier: PlanTier): PlanLimits {
  return PLAN_LIMITS[tier];
}

/**
 * Check if a user can add another utility account.
 */
export function canAddAccount(
  tier: PlanTier,
  currentAccountCount: number,
): boolean {
  return currentAccountCount < PLAN_LIMITS[tier].maxUtilityAccounts;
}

/**
 * Check if a specific feature is available on a plan.
 */
export function hasFeature(
  tier: PlanTier,
  feature: keyof Omit<PlanLimits, "maxUtilityAccounts" | "maxHistoryMonths">,
): boolean {
  return PLAN_LIMITS[tier][feature];
}
