import { describe, it, expect } from "vitest";
import {
  STATES,
  STATE_BY_SLUG,
  STATE_BY_CODE,
  getAllStateSlugs,
  getBillComparison,
  NATIONAL_AVG_BILL,
} from "./data";

describe("State data", () => {
  it("contains exactly 51 entries (50 states + DC)", () => {
    expect(STATES.length).toBe(51);
  });

  it("every state has required fields", () => {
    for (const s of STATES) {
      expect(s.name).toBeTruthy();
      expect(s.code).toMatch(/^[A-Z]{2}$/);
      expect(s.slug).toMatch(/^[a-z]+(-[a-z]+)*$/);
      expect(s.avgMonthlyBill).toBeGreaterThan(0);
      expect(s.avgRate).toBeGreaterThan(0);
      expect(typeof s.rateTrend).toBe("number");
      expect(typeof s.isDeregulated).toBe("boolean");
      expect(s.topUtilities).toHaveLength(3);
      s.topUtilities.forEach((u) => expect(u).toBeTruthy());
    }
  });

  it("has no duplicate state codes", () => {
    const codes = STATES.map((s) => s.code);
    expect(new Set(codes).size).toBe(codes.length);
  });

  it("has no duplicate slugs", () => {
    const slugs = STATES.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("slugs match state names (lowercase, hyphenated)", () => {
    for (const s of STATES) {
      const expected = s.name.toLowerCase().replace(/ /g, "-");
      expect(s.slug).toBe(expected);
    }
  });

  it("includes all 13 fully deregulated states", () => {
    const deregCodes = STATES.filter((s) => s.isDeregulated).map((s) => s.code);
    const expected = [
      "TX",
      "CT",
      "DE",
      "ME",
      "MD",
      "NH",
      "NJ",
      "NY",
      "RI",
      "IL",
      "OH",
      "PA",
      "MA",
    ];
    for (const code of expected) {
      expect(deregCodes).toContain(code);
    }
    expect(deregCodes.length).toBe(expected.length);
  });

  it("includes DC (District of Columbia)", () => {
    const dc = STATES.find((s) => s.code === "DC");
    expect(dc).toBeDefined();
    expect(dc!.name).toBe("District of Columbia");
    expect(dc!.slug).toBe("district-of-columbia");
  });
});

describe("STATE_BY_SLUG lookup", () => {
  it("finds Texas by slug", () => {
    expect(STATE_BY_SLUG.get("texas")?.code).toBe("TX");
  });

  it("finds multi-word states by slug", () => {
    expect(STATE_BY_SLUG.get("new-york")?.code).toBe("NY");
    expect(STATE_BY_SLUG.get("north-carolina")?.code).toBe("NC");
    expect(STATE_BY_SLUG.get("district-of-columbia")?.code).toBe("DC");
  });

  it("returns undefined for invalid slug", () => {
    expect(STATE_BY_SLUG.get("fake-state")).toBeUndefined();
  });
});

describe("STATE_BY_CODE lookup", () => {
  it("finds California by code", () => {
    expect(STATE_BY_CODE.get("CA")?.name).toBe("California");
  });

  it("returns undefined for invalid code", () => {
    expect(STATE_BY_CODE.get("XX")).toBeUndefined();
  });
});

describe("getAllStateSlugs", () => {
  it("returns 51 slugs", () => {
    expect(getAllStateSlugs()).toHaveLength(51);
  });

  it("includes texas and new-york", () => {
    const slugs = getAllStateSlugs();
    expect(slugs).toContain("texas");
    expect(slugs).toContain("new-york");
  });
});

describe("getBillComparison", () => {
  it("returns above for bills higher than national avg", () => {
    const result = getBillComparison(200);
    expect(result.direction).toBe("above");
    expect(result.diff).toBe(200 - NATIONAL_AVG_BILL);
  });

  it("returns below for bills lower than national avg", () => {
    const result = getBillComparison(100);
    expect(result.direction).toBe("below");
    expect(result.diff).toBe(NATIONAL_AVG_BILL - 100);
  });

  it("returns at for bills close to national avg", () => {
    const result = getBillComparison(NATIONAL_AVG_BILL);
    expect(result.direction).toBe("at");
    expect(result.diff).toBe(0);
  });
});
