import { describe, it, expect } from "vitest";
import {
  PROVIDERS,
  getProvider,
  getProvidersForState,
  getProvidersByType,
  getDeregulatedProviders,
} from "./data";

describe("Provider Registry", () => {
  it("has at least 40 providers seeded (5 per deregulated state + 10 regulated)", () => {
    expect(PROVIDERS.length).toBeGreaterThanOrEqual(48);
  });

  it("every provider has all required fields", () => {
    for (const provider of PROVIDERS) {
      expect(provider.id).toBeTruthy();
      expect(provider.name).toBeTruthy();
      expect(provider.states_served.length).toBeGreaterThan(0);
      expect(typeof provider.is_deregulated_market).toBe("boolean");
      expect(provider.provider_type).toMatch(/^(utility|retail_provider)$/);
      expect(provider.website_url).toMatch(/^https:\/\//);
      expect(provider.last_verified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it("has no duplicate provider IDs", () => {
    const ids = PROVIDERS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("getProvider", () => {
  it("returns provider by id", () => {
    const provider = getProvider("tx-txu-energy");
    expect(provider).toBeDefined();
    expect(provider!.name).toBe("TXU Energy");
  });

  it("returns undefined for unknown id", () => {
    expect(getProvider("nonexistent")).toBeUndefined();
  });
});

describe("getProvidersForState", () => {
  it("returns at least 5 providers for TX", () => {
    const providers = getProvidersForState("TX");
    expect(providers.length).toBeGreaterThanOrEqual(5);
    expect(providers.some((p) => p.name === "TXU Energy")).toBe(true);
  });

  it("returns at least 5 providers for OH", () => {
    const providers = getProvidersForState("OH");
    expect(providers.length).toBeGreaterThanOrEqual(5);
  });

  it("returns at least 5 providers for PA", () => {
    const providers = getProvidersForState("PA");
    expect(providers.length).toBeGreaterThanOrEqual(5);
  });

  it("returns at least 5 providers for IL", () => {
    const providers = getProvidersForState("IL");
    expect(providers.length).toBeGreaterThanOrEqual(5);
  });

  it("returns at least 5 providers for NY", () => {
    const providers = getProvidersForState("NY");
    expect(providers.length).toBeGreaterThanOrEqual(5);
  });

  it("returns at least 5 providers for NJ", () => {
    const providers = getProvidersForState("NJ");
    expect(providers.length).toBeGreaterThanOrEqual(5);
  });

  it("returns at least 5 providers for CT", () => {
    const providers = getProvidersForState("CT");
    expect(providers.length).toBeGreaterThanOrEqual(5);
  });

  it("returns at least 5 providers for MA", () => {
    const providers = getProvidersForState("MA");
    expect(providers.length).toBeGreaterThanOrEqual(5);
  });

  it("returns regulated providers for FL", () => {
    const providers = getProvidersForState("FL");
    expect(providers.length).toBeGreaterThan(0);
    expect(providers.some((p) => p.name.includes("Florida Power"))).toBe(true);
  });

  it("is case-insensitive", () => {
    expect(getProvidersForState("tx")).toEqual(getProvidersForState("TX"));
  });
});

describe("getProvidersByType", () => {
  it("returns only utilities", () => {
    const utilities = getProvidersByType("utility");
    expect(utilities.length).toBeGreaterThan(0);
    expect(utilities.every((p) => p.provider_type === "utility")).toBe(true);
  });

  it("returns only retail providers", () => {
    const retail = getProvidersByType("retail_provider");
    expect(retail.length).toBeGreaterThan(0);
    expect(retail.every((p) => p.provider_type === "retail_provider")).toBe(
      true,
    );
  });
});

describe("getDeregulatedProviders", () => {
  it("returns only deregulated-market providers", () => {
    const deregulated = getDeregulatedProviders();
    expect(deregulated.length).toBeGreaterThan(0);
    expect(deregulated.every((p) => p.is_deregulated_market)).toBe(true);
  });

  it("does not include regulated utilities", () => {
    const deregulated = getDeregulatedProviders();
    const ids = deregulated.map((p) => p.id);
    expect(ids).not.toContain("reg-florida-power");
    expect(ids).not.toContain("reg-duke-energy");
  });
});
