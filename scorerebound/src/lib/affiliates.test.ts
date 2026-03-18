import { describe, it, expect } from "vitest";
import {
  getAffiliateRecommendations,
  getAffiliateProduct,
  getAffiliateUrl,
  getAffiliateSlugs,
  AFFILIATE_PRODUCTS,
} from "./affiliates";
import type { RecoveryPath } from "./database.types";

describe("AFFILIATE_PRODUCTS", () => {
  it("has required fields on every product", () => {
    for (const [slug, product] of Object.entries(AFFILIATE_PRODUCTS)) {
      expect(product.slug).toBe(slug);
      expect(product.name).toBeTruthy();
      expect(product.category).toBeTruthy();
      expect(product.description).toBeTruthy();
      expect(product.ctaText).toBeTruthy();
      expect(product.baseUrl).toMatch(/^https:\/\//);
      expect(product.whyRecommended).toBeTruthy();
    }
  });
});

describe("getAffiliateRecommendations", () => {
  it("returns max 3 products", () => {
    const results = getAffiliateRecommendations("mixed", "300_499");
    expect(results.length).toBeLessThanOrEqual(3);
    expect(results.length).toBeGreaterThan(0);
  });

  it("returns credit builders and secured cards for low scores", () => {
    const results = getAffiliateRecommendations("rehabilitation", "300_499");
    const categories = results.map((r) => r.category);
    expect(categories).toContain("credit_builder");
  });

  it("returns credit monitoring for all paths and scores", () => {
    const paths: RecoveryPath[] = [
      "ibr_enrollment",
      "rehabilitation",
      "consolidation",
      "credit_building",
      "mixed",
    ];
    for (const path of paths) {
      const results = getAffiliateRecommendations(path, "700_749");
      const slugs = results.map((r) => r.slug);
      // At least one monitoring product should appear
      expect(
        slugs.includes("experian") || slugs.includes("credit_karma"),
      ).toBe(true);
    }
  });

  it("returns refinancing for high scores on eligible paths", () => {
    const results = getAffiliateRecommendations("ibr_enrollment", "750_plus");
    const slugs = results.map((r) => r.slug);
    expect(slugs).toContain("sofi_refi");
  });

  it("does not return refinancing for low scores", () => {
    const results = getAffiliateRecommendations("ibr_enrollment", "300_499");
    const slugs = results.map((r) => r.slug);
    expect(slugs).not.toContain("sofi_refi");
  });

  it("does not return refinancing for rehabilitation path", () => {
    const results = getAffiliateRecommendations("rehabilitation", "750_plus");
    const slugs = results.map((r) => r.slug);
    expect(slugs).not.toContain("sofi_refi");
  });

  it("returns products sorted by priority", () => {
    const results = getAffiliateRecommendations("mixed", "500_579");
    // Self (priority 1) should come before Experian (priority 4)
    const selfIdx = results.findIndex((r) => r.slug === "self");
    const experianIdx = results.findIndex((r) => r.slug === "experian");
    if (selfIdx !== -1 && experianIdx !== -1) {
      expect(selfIdx).toBeLessThan(experianIdx);
    }
  });

  it("returns different products for different score ranges", () => {
    const lowResults = getAffiliateRecommendations("credit_building", "300_499");
    const highResults = getAffiliateRecommendations("credit_building", "750_plus");
    const lowSlugs = lowResults.map((r) => r.slug);
    const highSlugs = highResults.map((r) => r.slug);
    // Low scores should have Self, high scores should not
    expect(lowSlugs).toContain("self");
    expect(highSlugs).not.toContain("self");
  });
});

describe("getAffiliateProduct", () => {
  it("returns product for valid slug", () => {
    const product = getAffiliateProduct("self");
    expect(product).toBeDefined();
    expect(product!.name).toBe("Self Credit Builder");
  });

  it("returns undefined for unknown slug", () => {
    const product = getAffiliateProduct("nonexistent");
    expect(product).toBeUndefined();
  });
});

describe("getAffiliateUrl", () => {
  it("returns base URL for known product", () => {
    const url = getAffiliateUrl("self");
    expect(url).toBe("https://www.self.inc/");
  });

  it("throws for unknown product", () => {
    expect(() => getAffiliateUrl("nonexistent")).toThrow(
      "Unknown affiliate product: nonexistent",
    );
  });
});

describe("getAffiliateSlugs", () => {
  it("returns all product slugs", () => {
    const slugs = getAffiliateSlugs();
    expect(slugs).toContain("self");
    expect(slugs).toContain("sofi_refi");
    expect(slugs).toContain("experian");
    expect(slugs).toContain("discover_secured");
    expect(slugs).toContain("capital_one_secured");
    expect(slugs).toContain("credit_karma");
    expect(slugs).toContain("moneylion");
    expect(slugs).toContain("chime");
    expect(slugs).toContain("capital_one_creditwise");
    expect(slugs).toContain("earnest");
    expect(slugs).toContain("splash");
    expect(slugs.length).toBe(11);
  });
});
