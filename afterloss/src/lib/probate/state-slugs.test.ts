import { describe, it, expect, beforeEach } from "vitest";
import {
  stateNameToSlug,
  slugToStateCode,
  getStateBySlug,
  getAllStateSlugs,
  formatDollars,
  getCurrentYear,
} from "./state-slugs";
import { STATE_PROBATE_RULES } from "./state-data";

describe("state-slugs", () => {
  describe("stateNameToSlug", () => {
    it("converts simple state names", () => {
      expect(stateNameToSlug("California")).toBe("california");
      expect(stateNameToSlug("Texas")).toBe("texas");
      expect(stateNameToSlug("Ohio")).toBe("ohio");
    });

    it("converts multi-word state names with hyphens", () => {
      expect(stateNameToSlug("New York")).toBe("new-york");
      expect(stateNameToSlug("North Carolina")).toBe("north-carolina");
      expect(stateNameToSlug("West Virginia")).toBe("west-virginia");
      expect(stateNameToSlug("New Hampshire")).toBe("new-hampshire");
    });

    it("converts District of Columbia", () => {
      expect(stateNameToSlug("District of Columbia")).toBe(
        "district-of-columbia",
      );
    });
  });

  describe("slugToStateCode", () => {
    it("maps simple slugs to state codes", () => {
      expect(slugToStateCode("california")).toBe("CA");
      expect(slugToStateCode("texas")).toBe("TX");
      expect(slugToStateCode("florida")).toBe("FL");
    });

    it("maps multi-word slugs to state codes", () => {
      expect(slugToStateCode("new-york")).toBe("NY");
      expect(slugToStateCode("north-carolina")).toBe("NC");
      expect(slugToStateCode("district-of-columbia")).toBe("DC");
    });

    it("returns undefined for invalid slugs", () => {
      expect(slugToStateCode("not-a-state")).toBeUndefined();
      expect(slugToStateCode("")).toBeUndefined();
    });
  });

  describe("getStateBySlug", () => {
    it("returns state data for valid slugs", () => {
      const ca = getStateBySlug("california");
      expect(ca).toBeDefined();
      expect(ca!.stateCode).toBe("CA");
      expect(ca!.stateName).toBe("California");
      expect(ca!.probateThreshold).toBe(208850);
    });

    it("returns state data for multi-word slugs", () => {
      const ny = getStateBySlug("new-york");
      expect(ny).toBeDefined();
      expect(ny!.stateCode).toBe("NY");
    });

    it("returns undefined for invalid slugs", () => {
      expect(getStateBySlug("not-a-state")).toBeUndefined();
    });
  });

  describe("getAllStateSlugs", () => {
    let slugs: string[];

    beforeEach(() => {
      slugs = getAllStateSlugs();
    });

    it("returns 51 slugs (50 states + DC)", () => {
      expect(slugs).toHaveLength(51);
    });

    it("includes known slugs", () => {
      expect(slugs).toContain("california");
      expect(slugs).toContain("new-york");
      expect(slugs).toContain("district-of-columbia");
      expect(slugs).toContain("wyoming");
    });

    it("all slugs are lowercase with hyphens only", () => {
      for (const slug of slugs) {
        expect(slug).toMatch(/^[a-z-]+$/);
      }
    });

    it("every slug maps back to a valid state", () => {
      for (const slug of slugs) {
        const state = getStateBySlug(slug);
        expect(state).toBeDefined();
      }
    });

    it("has no duplicates", () => {
      const unique = new Set(slugs);
      expect(unique.size).toBe(slugs.length);
    });
  });

  describe("formatDollars", () => {
    it("formats small amounts", () => {
      expect(formatDollars(10000)).toBe("$10,000");
    });

    it("formats large amounts", () => {
      expect(formatDollars(208850)).toBe("$208,850");
      expect(formatDollars(400000)).toBe("$400,000");
    });
  });

  describe("getCurrentYear", () => {
    it("returns a 4-digit year", () => {
      const year = getCurrentYear();
      expect(year).toBeGreaterThanOrEqual(2026);
      expect(year).toBeLessThan(2100);
    });
  });

  describe("round-trip: every state in STATE_PROBATE_RULES is reachable", () => {
    it("all 51 states have a unique slug that resolves back to them", () => {
      for (const rule of STATE_PROBATE_RULES) {
        const slug = stateNameToSlug(rule.stateName);
        const code = slugToStateCode(slug);
        expect(code).toBe(rule.stateCode);

        const resolved = getStateBySlug(slug);
        expect(resolved).toBeDefined();
        expect(resolved!.stateCode).toBe(rule.stateCode);
      }
    });
  });
});
