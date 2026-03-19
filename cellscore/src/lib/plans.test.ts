import { describe, it, expect } from "vitest";
import { filterPlans, sortPlans, formatDataLimit, formatPrice, formatHotspot, getFeatureLabels } from "./plans";
import { MOCK_PLANS } from "./mock-data";

describe("plan filtering", () => {
  it("returns all plans when no filters applied", () => {
    const result = filterPlans(MOCK_PLANS, {});
    expect(result.length).toBe(MOCK_PLANS.length);
  });

  it("filters by carrier", () => {
    const result = filterPlans(MOCK_PLANS, { carrier: "att" });
    expect(result.every((p) => p.carrier_slug === "att")).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it("filters by min price", () => {
    const result = filterPlans(MOCK_PLANS, { minPrice: 50 });
    expect(result.every((p) => p.monthly_price >= 50)).toBe(true);
  });

  it("filters by max price", () => {
    const result = filterPlans(MOCK_PLANS, { maxPrice: 30 });
    expect(result.every((p) => p.monthly_price <= 30)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it("filters by price range", () => {
    const result = filterPlans(MOCK_PLANS, { minPrice: 20, maxPrice: 60 });
    expect(result.every((p) => p.monthly_price >= 20 && p.monthly_price <= 60)).toBe(true);
  });

  it("filters by min data (unlimited plans always pass)", () => {
    const result = filterPlans(MOCK_PLANS, { minData: 10 });
    expect(result.every((p) => p.data_limit_gb === null || p.data_limit_gb >= 10)).toBe(true);
  });

  it("filters by features", () => {
    const result = filterPlans(MOCK_PLANS, { features: ["international"] });
    expect(result.every((p) => p.features.international === true)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it("filters by multiple features", () => {
    const result = filterPlans(MOCK_PLANS, { features: ["five_g", "hotspot"] });
    expect(result.every((p) => p.features.five_g === true && p.features.hotspot === true)).toBe(true);
  });

  it("combines multiple filters", () => {
    const result = filterPlans(MOCK_PLANS, {
      maxPrice: 50,
      features: ["five_g"],
    });
    expect(result.every((p) => p.monthly_price <= 50 && p.features.five_g === true)).toBe(true);
  });

  it("returns empty when no plans match", () => {
    const result = filterPlans(MOCK_PLANS, { maxPrice: 5 });
    expect(result).toHaveLength(0);
  });
});

describe("plan sorting", () => {
  it("sorts by price ascending by default", () => {
    const result = sortPlans(MOCK_PLANS);
    for (let i = 1; i < result.length; i++) {
      expect(result[i].monthly_price).toBeGreaterThanOrEqual(result[i - 1].monthly_price);
    }
  });

  it("sorts by price descending", () => {
    const result = sortPlans(MOCK_PLANS, "price_desc");
    for (let i = 1; i < result.length; i++) {
      expect(result[i].monthly_price).toBeLessThanOrEqual(result[i - 1].monthly_price);
    }
  });

  it("sorts by data descending (unlimited first)", () => {
    const result = sortPlans(MOCK_PLANS, "data_desc");
    // Unlimited (null -> Infinity) should come first
    const firstUnlimited = result.findIndex((p) => p.data_limit_gb !== null);
    if (firstUnlimited > 0) {
      expect(result.slice(0, firstUnlimited).every((p) => p.data_limit_gb === null)).toBe(true);
    }
  });

  it("sorts by carrier name", () => {
    const result = sortPlans(MOCK_PLANS, "carrier");
    for (let i = 1; i < result.length; i++) {
      expect(result[i].carrier_name.localeCompare(result[i - 1].carrier_name)).toBeGreaterThanOrEqual(0);
    }
  });
});

describe("format helpers", () => {
  it("formatDataLimit handles unlimited", () => {
    expect(formatDataLimit(null)).toBe("Unlimited");
  });

  it("formatDataLimit handles numeric values", () => {
    expect(formatDataLimit(5)).toBe("5 GB");
    expect(formatDataLimit(20)).toBe("20 GB");
  });

  it("formatPrice formats correctly", () => {
    expect(formatPrice(15)).toBe("$15.00");
    expect(formatPrice(85.99)).toBe("$85.99");
  });

  it("formatHotspot handles null (unlimited)", () => {
    expect(formatHotspot(null)).toBe("Unlimited");
  });

  it("formatHotspot handles zero", () => {
    expect(formatHotspot(0)).toBe("None");
  });

  it("formatHotspot handles numeric values", () => {
    expect(formatHotspot(15)).toBe("15 GB");
  });

  it("getFeatureLabels extracts feature labels", () => {
    const labels = getFeatureLabels({
      five_g: true,
      wifi_calling: true,
      international: true,
      hotspot: true,
    });
    expect(labels).toContain("5G");
    expect(labels).toContain("Wi-Fi Calling");
    expect(labels).toContain("International");
    expect(labels).toContain("Hotspot");
  });

  it("getFeatureLabels includes streaming perks", () => {
    const labels = getFeatureLabels({
      streaming_perks: "Netflix Standard",
    });
    expect(labels).toContain("Netflix Standard");
  });

  it("getFeatureLabels includes no-contract label", () => {
    const labels = getFeatureLabels({ contract_required: false });
    expect(labels).toContain("No Contract");
  });

  it("getFeatureLabels handles 5G Ultra variants", () => {
    const labels1 = getFeatureLabels({ five_g_plus: true });
    expect(labels1).toContain("5G Ultra");

    const labels2 = getFeatureLabels({ five_g_uw: true });
    expect(labels2).toContain("5G Ultra");
  });
});
