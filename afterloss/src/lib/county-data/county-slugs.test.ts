import { describe, it, expect, beforeEach } from "vitest";
import {
  countyNameToSlug,
  getAllCountyParams,
  getCountyBySlug,
  getCountiesByState,
  getCountiesByStateSlug,
  getCountyCount,
} from "./county-slugs";

describe("county-slugs", () => {
  describe("countyNameToSlug", () => {
    it("converts simple county names", () => {
      expect(countyNameToSlug("Cook")).toBe("cook");
      expect(countyNameToSlug("Harris")).toBe("harris");
      expect(countyNameToSlug("Maricopa")).toBe("maricopa");
    });

    it("converts multi-word county names", () => {
      expect(countyNameToSlug("Los Angeles")).toBe("los-angeles");
      expect(countyNameToSlug("San Diego")).toBe("san-diego");
      expect(countyNameToSlug("San Bernardino")).toBe("san-bernardino");
      expect(countyNameToSlug("Miami-Dade")).toBe("miami-dade");
    });

    it("handles periods and apostrophes", () => {
      expect(countyNameToSlug("St. Louis")).toBe("st-louis");
      expect(countyNameToSlug("St Joseph")).toBe("st-joseph");
    });

    it("converts District of Columbia", () => {
      expect(countyNameToSlug("District of Columbia")).toBe(
        "district-of-columbia",
      );
    });
  });

  describe("getAllCountyParams", () => {
    let params: { state: string; county: string }[];

    beforeEach(() => {
      params = getAllCountyParams();
    });

    it("returns at least 200 county/state tuples", () => {
      expect(params.length).toBeGreaterThanOrEqual(200);
    });

    it("all state slugs are lowercase with hyphens only", () => {
      for (const p of params) {
        expect(p.state).toMatch(/^[a-z-]+$/);
      }
    });

    it("all county slugs are lowercase with hyphens only", () => {
      for (const p of params) {
        expect(p.county).toMatch(/^[a-z-]+$/);
      }
    });

    it("includes known state/county combinations", () => {
      const la = params.find(
        (p) => p.state === "california" && p.county === "los-angeles",
      );
      expect(la).toBeDefined();

      const cook = params.find(
        (p) => p.state === "illinois" && p.county === "cook",
      );
      expect(cook).toBeDefined();

      const harris = params.find(
        (p) => p.state === "texas" && p.county === "harris",
      );
      expect(harris).toBeDefined();
    });

    it("has no exact duplicate state+county combinations", () => {
      const keys = params.map((p) => `${p.state}/${p.county}`);
      const unique = new Set(keys);
      expect(unique.size).toBe(keys.length);
    });
  });

  describe("getCountyBySlug", () => {
    it("returns county data for valid slugs", () => {
      const la = getCountyBySlug("california", "los-angeles");
      expect(la).toBeDefined();
      expect(la!.county_name).toBe("Los Angeles");
      expect(la!.state_code).toBe("CA");
    });

    it("returns county data for Cook County, IL", () => {
      const cook = getCountyBySlug("illinois", "cook");
      expect(cook).toBeDefined();
      expect(cook!.county_name).toBe("Cook");
      expect(cook!.state_code).toBe("IL");
    });

    it("returns undefined for invalid state slug", () => {
      expect(getCountyBySlug("not-a-state", "cook")).toBeUndefined();
    });

    it("returns undefined for invalid county slug", () => {
      expect(getCountyBySlug("california", "not-a-county")).toBeUndefined();
    });

    it("returns undefined for valid county in wrong state", () => {
      expect(getCountyBySlug("texas", "los-angeles")).toBeUndefined();
    });
  });

  describe("getCountiesByState", () => {
    it("returns multiple counties for California", () => {
      const caCounties = getCountiesByState("CA");
      expect(caCounties.length).toBeGreaterThan(10);
      for (const c of caCounties) {
        expect(c.state_code).toBe("CA");
      }
    });

    it("returns multiple counties for Texas", () => {
      const txCounties = getCountiesByState("TX");
      expect(txCounties.length).toBeGreaterThan(10);
      for (const c of txCounties) {
        expect(c.state_code).toBe("TX");
      }
    });

    it("returns empty array for state with no counties in dataset", () => {
      // Some smaller states may not be in Phase 1
      const result = getCountiesByState("XX");
      expect(result).toHaveLength(0);
    });
  });

  describe("getCountiesByStateSlug", () => {
    it("returns counties for valid state slug", () => {
      const caCounties = getCountiesByStateSlug("california");
      expect(caCounties.length).toBeGreaterThan(10);
    });

    it("returns empty array for invalid state slug", () => {
      expect(getCountiesByStateSlug("not-a-state")).toHaveLength(0);
    });
  });

  describe("getCountyCount", () => {
    it("returns at least 200", () => {
      expect(getCountyCount()).toBeGreaterThanOrEqual(200);
    });
  });

  describe("round-trip: every county in dataset is reachable via slug", () => {
    it("all counties can be looked up by their slugified name", () => {
      const params = getAllCountyParams();
      for (const p of params) {
        const county = getCountyBySlug(p.state, p.county);
        expect(county).toBeDefined();
      }
    });
  });
});
