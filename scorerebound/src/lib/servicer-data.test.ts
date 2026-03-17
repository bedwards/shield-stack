import { describe, it, expect } from "vitest";
import { getServicerInfo, getServicerOptions, SERVICERS } from "./servicer-data";

describe("SERVICERS", () => {
  it("has all expected servicers", () => {
    const keys = Object.keys(SERVICERS);
    expect(keys).toContain("mohela");
    expect(keys).toContain("nelnet");
    expect(keys).toContain("aidvantage");
    expect(keys).toContain("edfinancial");
    expect(keys).toContain("ecsi");
    expect(keys).toContain("default_resolution");
    expect(keys).toContain("other");
  });

  it("each servicer has required fields", () => {
    for (const servicer of Object.values(SERVICERS)) {
      expect(servicer.name).toBeTruthy();
      expect(servicer.shortName).toBeTruthy();
      expect(servicer.phone).toBeTruthy();
      expect(servicer.website).toBeTruthy();
      expect(servicer.hours).toBeTruthy();
      expect(servicer.specialNotes.length).toBeGreaterThan(0);
      expect(servicer.consolidationUrl).toBeTruthy();
    }
  });
});

describe("getServicerInfo", () => {
  it("matches by direct key", () => {
    expect(getServicerInfo("mohela").shortName).toBe("MOHELA");
  });

  it("matches case-insensitively", () => {
    expect(getServicerInfo("MOHELA").shortName).toBe("MOHELA");
    expect(getServicerInfo("Nelnet").shortName).toBe("Nelnet");
  });

  it("matches by name substring", () => {
    expect(getServicerInfo("Navient").shortName).toBe("Aidvantage");
  });

  it("falls back to other for unknown servicers", () => {
    expect(getServicerInfo("unknown_servicer").shortName).toBe("Other");
  });

  it("trims whitespace", () => {
    expect(getServicerInfo("  mohela  ").shortName).toBe("MOHELA");
  });
});

describe("getServicerOptions", () => {
  it("returns array of value/label objects", () => {
    const options = getServicerOptions();
    expect(options.length).toBeGreaterThanOrEqual(6);
    for (const opt of options) {
      expect(opt.value).toBeTruthy();
      expect(opt.label).toBeTruthy();
    }
  });

  it("includes MOHELA", () => {
    const options = getServicerOptions();
    expect(options.some((o) => o.value === "mohela")).toBe(true);
  });
});
