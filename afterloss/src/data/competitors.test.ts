import { describe, it, expect } from "vitest";
import {
  COMPETITORS,
  getCompetitorBySlug,
  getAllCompetitorSlugs,
} from "./competitors";

describe("Competitors Data", () => {
  it("contains all 5 required competitors", () => {
    const slugs = getAllCompetitorSlugs();
    expect(slugs).toContain("sunset");
    expect(slugs).toContain("atticus");
    expect(slugs).toContain("swiftprobate");
    expect(slugs).toContain("elayne");
    expect(slugs).toContain("eversettled");
    expect(slugs).toHaveLength(5);
  });

  it("getCompetitorBySlug returns correct competitor", () => {
    const sunset = getCompetitorBySlug("sunset");
    expect(sunset).toBeDefined();
    expect(sunset!.name).toBe("Sunset");
    expect(sunset!.slug).toBe("sunset");
  });

  it("getCompetitorBySlug returns undefined for unknown slug", () => {
    expect(getCompetitorBySlug("nonexistent")).toBeUndefined();
  });

  it("every competitor has required fields populated", () => {
    for (const competitor of COMPETITORS) {
      expect(competitor.slug).toBeTruthy();
      expect(competitor.name).toBeTruthy();
      expect(competitor.summary).toBeTruthy();
      expect(competitor.pricing).toBeTruthy();
      expect(competitor.pricingDetail).toBeTruthy();
      expect(competitor.keywords.length).toBeGreaterThan(0);
      expect(competitor.features.length).toBeGreaterThan(0);
      expect(competitor.competitorPros.length).toBeGreaterThan(0);
      expect(competitor.competitorCons.length).toBeGreaterThan(0);
      expect(competitor.whyAfterloss.length).toBeGreaterThan(0);
      expect(competitor.whenCompetitorBetter).toBeTruthy();
      expect(competitor.lastVerified).toBeTruthy();
    }
  });

  it("every competitor has unique slug", () => {
    const slugs = getAllCompetitorSlugs();
    const unique = new Set(slugs);
    expect(unique.size).toBe(slugs.length);
  });

  it("every feature row has both afterloss and competitor values", () => {
    for (const competitor of COMPETITORS) {
      for (const feature of competitor.features) {
        expect(feature.name).toBeTruthy();
        expect(feature.afterloss).toBeDefined();
        expect(feature.competitor).toBeDefined();
      }
    }
  });

  it("emphasizes AfterLoss differentiators: free, no account, web-first, AI doc gen, phone scripts", () => {
    for (const competitor of COMPETITORS) {
      const featureNames = competitor.features.map((f) => f.name.toLowerCase());
      // Must include cost comparison
      expect(featureNames.some((n) => n.includes("cost"))).toBe(true);
      // Must include AI-generated letters
      expect(
        featureNames.some((n) => n.includes("ai-generated") || n.includes("letter"))
      ).toBe(true);
      // Must include phone scripts
      expect(featureNames.some((n) => n.includes("phone script"))).toBe(true);
    }
  });

  it("slugs are URL-safe (lowercase, no spaces)", () => {
    for (const competitor of COMPETITORS) {
      expect(competitor.slug).toMatch(/^[a-z0-9-]+$/);
    }
  });
});
