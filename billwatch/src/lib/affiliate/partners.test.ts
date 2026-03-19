import { describe, it, expect } from "vitest";
import {
  AFFILIATE_PARTNERS,
  PARTNER_SLUGS,
  getPartner,
  getPartnerUrl,
  getPartnersForState,
  getPartnersByCategory,
} from "./partners";

describe("Affiliate Partner Registry", () => {
  it("has all 7 required partners", () => {
    const requiredSlugs = [
      "chooseenergy",
      "electricityrates",
      "electricchoice",
      "energysage",
      "sunpower",
      "arcadia",
      "homedepot",
    ];
    for (const slug of requiredSlugs) {
      expect(getPartner(slug), `Missing partner: ${slug}`).toBeDefined();
    }
    expect(AFFILIATE_PARTNERS).toHaveLength(7);
  });

  it("every partner has required fields", () => {
    for (const partner of AFFILIATE_PARTNERS) {
      expect(partner.slug).toBeTruthy();
      expect(partner.name).toBeTruthy();
      expect(partner.category).toMatch(
        /^(energy_switching|solar|efficiency)$/,
      );
      expect(partner.baseUrl).toMatch(/^https:\/\//);
      expect(
        partner.states === "nationwide" || Array.isArray(partner.states),
      ).toBe(true);
      expect(partner.description).toBeTruthy();
    }
  });

  it("PARTNER_SLUGS matches AFFILIATE_PARTNERS", () => {
    expect(PARTNER_SLUGS).toHaveLength(AFFILIATE_PARTNERS.length);
    for (const partner of AFFILIATE_PARTNERS) {
      expect(PARTNER_SLUGS).toContain(partner.slug);
    }
  });
});

describe("getPartner", () => {
  it("returns partner for valid slug", () => {
    const partner = getPartner("chooseenergy");
    expect(partner).toBeDefined();
    expect(partner!.name).toBe("Choose Energy");
    expect(partner!.category).toBe("energy_switching");
  });

  it("returns undefined for unknown slug", () => {
    expect(getPartner("nonexistent")).toBeUndefined();
  });
});

describe("getPartnerUrl", () => {
  it("returns URL for valid slug", () => {
    const url = getPartnerUrl("energysage");
    expect(url).toBe("https://placeholder.example.com/energysage");
  });

  it("returns undefined for unknown slug", () => {
    expect(getPartnerUrl("nonexistent")).toBeUndefined();
  });
});

describe("getPartnersForState", () => {
  it("returns energy switching + nationwide partners for TX", () => {
    const partners = getPartnersForState("TX");
    const slugs = partners.map((p) => p.slug);
    // TX has all 3 energy switching partners + all nationwide
    expect(slugs).toContain("chooseenergy");
    expect(slugs).toContain("electricityrates");
    expect(slugs).toContain("electricchoice");
    expect(slugs).toContain("energysage");
    expect(slugs).toContain("sunpower");
    expect(slugs).toContain("arcadia");
    expect(slugs).toContain("homedepot");
  });

  it("returns only nationwide partners for non-deregulated state", () => {
    const partners = getPartnersForState("CA");
    const slugs = partners.map((p) => p.slug);
    expect(slugs).not.toContain("chooseenergy");
    expect(slugs).toContain("energysage");
    expect(slugs).toContain("homedepot");
  });

  it("is case-insensitive", () => {
    const upper = getPartnersForState("TX");
    const lower = getPartnersForState("tx");
    expect(upper).toEqual(lower);
  });
});

describe("getPartnersByCategory", () => {
  it("returns 3 energy switching partners", () => {
    const partners = getPartnersByCategory("energy_switching");
    expect(partners).toHaveLength(3);
    expect(partners.every((p) => p.category === "energy_switching")).toBe(true);
  });

  it("returns 3 solar partners", () => {
    const partners = getPartnersByCategory("solar");
    expect(partners).toHaveLength(3);
    expect(partners.every((p) => p.category === "solar")).toBe(true);
  });

  it("returns 1 efficiency partner", () => {
    const partners = getPartnersByCategory("efficiency");
    expect(partners).toHaveLength(1);
    expect(partners[0].slug).toBe("homedepot");
  });
});
