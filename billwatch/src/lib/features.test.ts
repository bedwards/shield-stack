import { describe, it, expect } from "vitest";
import {
  PLAN_LIMITS,
  PREMIUM_PRICE,
  PRICING_FEATURES,
  PREMIUM_ROUTES,
  AUTH_REQUIRED_ROUTES,
  requiresPremium,
  requiresAuth,
  getPlanLimits,
  canAddAccount,
  hasFeature,
} from "./features";

describe("Plan limits", () => {
  it("free plan limits are correct", () => {
    const free = PLAN_LIMITS.free;
    expect(free.maxUtilityAccounts).toBe(1);
    expect(free.maxHistoryMonths).toBe(12);
    expect(free.benchmarking).toBe(false);
    expect(free.anomalyAlerts).toBe(false);
    expect(free.providerComparison).toBe(false);
    expect(free.csvExport).toBe(false);
    expect(free.rateBenchmarking).toBe(false);
  });

  it("premium plan unlocks all features", () => {
    const premium = PLAN_LIMITS.premium;
    expect(premium.maxUtilityAccounts).toBe(50);
    expect(premium.maxHistoryMonths).toBe(120);
    expect(premium.benchmarking).toBe(true);
    expect(premium.anomalyAlerts).toBe(true);
    expect(premium.providerComparison).toBe(true);
    expect(premium.csvExport).toBe(true);
    expect(premium.rateBenchmarking).toBe(true);
  });
});

describe("Premium price", () => {
  it("is $3.99/month", () => {
    expect(PREMIUM_PRICE.amount).toBe(3.99);
    expect(PREMIUM_PRICE.amountCents).toBe(399);
    expect(PREMIUM_PRICE.currency).toBe("usd");
    expect(PREMIUM_PRICE.interval).toBe("month");
    expect(PREMIUM_PRICE.displayPrice).toBe("$3.99/mo");
  });
});

describe("Pricing features", () => {
  it("has entries for all key features", () => {
    const names = PRICING_FEATURES.map((f) => f.name);
    expect(names).toContain("Utility accounts");
    expect(names).toContain("Bill history");
    expect(names).toContain("Household benchmarking");
    expect(names).toContain("Rate benchmarking");
    expect(names).toContain("Provider comparison");
    expect(names).toContain("CSV export");
  });

  it("every feature has free and premium values", () => {
    for (const feature of PRICING_FEATURES) {
      expect(feature.name).toBeTruthy();
      expect(feature.free).toBeTruthy();
      expect(feature.premium).toBeTruthy();
    }
  });
});

describe("requiresPremium", () => {
  it("returns true for premium routes", () => {
    for (const route of PREMIUM_ROUTES) {
      expect(requiresPremium(route)).toBe(true);
    }
  });

  it("returns true for sub-paths of premium routes", () => {
    expect(requiresPremium("/dashboard/benchmarking/settings")).toBe(true);
  });

  it("returns false for non-premium routes", () => {
    expect(requiresPremium("/")).toBe(false);
    expect(requiresPremium("/pricing")).toBe(false);
    expect(requiresPremium("/guides/texas")).toBe(false);
  });
});

describe("requiresAuth", () => {
  it("returns true for auth-required routes", () => {
    for (const route of AUTH_REQUIRED_ROUTES) {
      expect(requiresAuth(route)).toBe(true);
    }
  });

  it("returns true for premium routes (they also require auth)", () => {
    for (const route of PREMIUM_ROUTES) {
      expect(requiresAuth(route)).toBe(true);
    }
  });

  it("returns false for public routes", () => {
    expect(requiresAuth("/")).toBe(false);
    expect(requiresAuth("/pricing")).toBe(false);
    expect(requiresAuth("/guides/texas")).toBe(false);
    expect(requiresAuth("/api/health")).toBe(false);
  });
});

describe("getPlanLimits", () => {
  it("returns correct limits for each tier", () => {
    expect(getPlanLimits("free")).toEqual(PLAN_LIMITS.free);
    expect(getPlanLimits("premium")).toEqual(PLAN_LIMITS.premium);
  });
});

describe("canAddAccount", () => {
  it("free user can add 1 account", () => {
    expect(canAddAccount("free", 0)).toBe(true);
    expect(canAddAccount("free", 1)).toBe(false);
  });

  it("premium user can add many accounts", () => {
    expect(canAddAccount("premium", 0)).toBe(true);
    expect(canAddAccount("premium", 49)).toBe(true);
    expect(canAddAccount("premium", 50)).toBe(false);
  });
});

describe("hasFeature", () => {
  it("free plan does not have premium features", () => {
    expect(hasFeature("free", "benchmarking")).toBe(false);
    expect(hasFeature("free", "anomalyAlerts")).toBe(false);
    expect(hasFeature("free", "providerComparison")).toBe(false);
    expect(hasFeature("free", "csvExport")).toBe(false);
    expect(hasFeature("free", "rateBenchmarking")).toBe(false);
  });

  it("premium plan has all features", () => {
    expect(hasFeature("premium", "benchmarking")).toBe(true);
    expect(hasFeature("premium", "anomalyAlerts")).toBe(true);
    expect(hasFeature("premium", "providerComparison")).toBe(true);
    expect(hasFeature("premium", "csvExport")).toBe(true);
    expect(hasFeature("premium", "rateBenchmarking")).toBe(true);
  });
});
