import { describe, it, expect } from "vitest";
import {
  DEREGULATED_STATES,
  isDeregulatedState,
  getDeregulationStatus,
  getProvidersForState,
  getDeregulatedProvidersForState,
} from "./deregulated";

describe("DEREGULATED_STATES", () => {
  it("has all 13 fully deregulated states", () => {
    const fullStates = DEREGULATED_STATES.filter(
      (s) => s.status === "full",
    ).map((s) => s.code);
    for (const code of [
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
    ]) {
      expect(fullStates, `Missing fully deregulated state: ${code}`).toContain(
        code,
      );
    }
  });

  it("has 6 partially deregulated states", () => {
    const partialStates = DEREGULATED_STATES.filter(
      (s) => s.status === "partial",
    ).map((s) => s.code);
    for (const code of ["DC", "MI", "MT", "NV", "OR", "VA"]) {
      expect(
        partialStates,
        `Missing partially deregulated state: ${code}`,
      ).toContain(code);
    }
  });

  it("has 19 total entries", () => {
    expect(DEREGULATED_STATES).toHaveLength(19);
  });
});

describe("isDeregulatedState", () => {
  it("returns true for fully deregulated states", () => {
    expect(isDeregulatedState("TX")).toBe(true);
    expect(isDeregulatedState("OH")).toBe(true);
    expect(isDeregulatedState("PA")).toBe(true);
    expect(isDeregulatedState("IL")).toBe(true);
    expect(isDeregulatedState("NY")).toBe(true);
    expect(isDeregulatedState("MA")).toBe(true);
  });

  it("returns true for partially deregulated states", () => {
    expect(isDeregulatedState("DC")).toBe(true);
    expect(isDeregulatedState("VA")).toBe(true);
    expect(isDeregulatedState("MI")).toBe(true);
  });

  it("returns false for regulated states", () => {
    expect(isDeregulatedState("CA")).toBe(false);
    expect(isDeregulatedState("FL")).toBe(false);
    expect(isDeregulatedState("WA")).toBe(false);
  });

  it("is case-insensitive", () => {
    expect(isDeregulatedState("tx")).toBe(true);
    expect(isDeregulatedState("Tx")).toBe(true);
  });
});

describe("getDeregulationStatus", () => {
  it("returns full for TX", () => {
    expect(getDeregulationStatus("TX")).toBe("full");
  });

  it("returns partial for DC", () => {
    expect(getDeregulationStatus("DC")).toBe("partial");
  });

  it("returns none for CA", () => {
    expect(getDeregulationStatus("CA")).toBe("none");
  });

  it("is case-insensitive", () => {
    expect(getDeregulationStatus("tx")).toBe("full");
  });
});

describe("getProvidersForState", () => {
  it("returns providers for TX", () => {
    const providers = getProvidersForState("TX");
    expect(providers.length).toBeGreaterThanOrEqual(5);
  });

  it("returns providers for regulated states too", () => {
    const providers = getProvidersForState("FL");
    expect(providers.length).toBeGreaterThan(0);
  });

  it("is case-insensitive", () => {
    expect(getProvidersForState("tx")).toEqual(getProvidersForState("TX"));
  });
});

describe("getDeregulatedProvidersForState", () => {
  it("returns only deregulated providers for TX", () => {
    const providers = getDeregulatedProvidersForState("TX");
    expect(providers.length).toBeGreaterThanOrEqual(5);
    expect(providers.every((p) => p.is_deregulated_market)).toBe(true);
  });

  it("returns empty array for fully regulated states", () => {
    const providers = getDeregulatedProvidersForState("FL");
    expect(providers).toHaveLength(0);
  });
});
