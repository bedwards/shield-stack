import { describe, it, expect, beforeEach } from "vitest";
import {
  CREDIT_BUILDER_PRODUCTS,
  getCreditBuilderSlugs,
  TYPE_LABELS,
} from "./credit-builder-products";
import { AFFILIATE_PRODUCTS } from "@/lib/affiliates";

describe("Credit Builder Products Data", () => {
  describe("CREDIT_BUILDER_PRODUCTS", () => {
    it("contains exactly 6 products", () => {
      expect(CREDIT_BUILDER_PRODUCTS).toHaveLength(6);
    });

    it("includes all required products from the issue spec", () => {
      const names = CREDIT_BUILDER_PRODUCTS.map((p) => p.name);
      expect(names).toContain("Self Credit Builder");
      expect(names).toContain("MoneyLion Credit Builder Plus");
      expect(names).toContain("Discover it\u00AE Secured Card");
      expect(names).toContain("Capital One Platinum Secured");
      expect(names).toContain("Chime Credit Builder Card");
      expect(names).toContain("Credit Karma");
    });

    it("has unique slugs", () => {
      const slugs = CREDIT_BUILDER_PRODUCTS.map((p) => p.slug);
      const unique = new Set(slugs);
      expect(unique.size).toBe(slugs.length);
    });

    it("every product has valid type", () => {
      const validTypes = new Set([
        "credit-builder-loan",
        "secured-card",
        "credit-monitoring",
      ]);
      for (const product of CREDIT_BUILDER_PRODUCTS) {
        expect(validTypes.has(product.type)).toBe(true);
      }
    });

    it("every product has non-empty pros and cons arrays", () => {
      for (const product of CREDIT_BUILDER_PRODUCTS) {
        expect(product.pros.length).toBeGreaterThan(0);
        expect(product.cons.length).toBeGreaterThan(0);
      }
    });

    it("every product has non-empty best_for string", () => {
      for (const product of CREDIT_BUILDER_PRODUCTS) {
        expect(product.best_for.length).toBeGreaterThan(0);
      }
    });

    it("every product has non-empty credit_bureaus_reported", () => {
      for (const product of CREDIT_BUILDER_PRODUCTS) {
        expect(product.credit_bureaus_reported.length).toBeGreaterThan(0);
      }
    });
  });

  describe("affiliate_slug alignment", () => {
    it("every affiliate_slug matches a product in AFFILIATE_PRODUCTS", () => {
      for (const product of CREDIT_BUILDER_PRODUCTS) {
        expect(
          AFFILIATE_PRODUCTS[product.affiliate_slug],
          `affiliate_slug "${product.affiliate_slug}" for "${product.name}" not found in AFFILIATE_PRODUCTS`,
        ).toBeDefined();
      }
    });
  });

  describe("editors_pick", () => {
    it("exactly one product is marked as editors_pick", () => {
      const picks = CREDIT_BUILDER_PRODUCTS.filter((p) => p.editors_pick);
      expect(picks).toHaveLength(1);
      expect(picks[0].slug).toBe("self");
    });
  });

  describe("getCreditBuilderSlugs", () => {
    it("returns slugs for all products", () => {
      const slugs = getCreditBuilderSlugs();
      expect(slugs).toHaveLength(6);
      expect(slugs).toContain("self");
      expect(slugs).toContain("credit-karma");
    });
  });

  describe("TYPE_LABELS", () => {
    it("has labels for all product types", () => {
      expect(TYPE_LABELS["credit-builder-loan"]).toBe("Credit Builder Loan");
      expect(TYPE_LABELS["secured-card"]).toBe("Secured Card");
      expect(TYPE_LABELS["credit-monitoring"]).toBe("Credit Monitoring");
    });
  });
});
