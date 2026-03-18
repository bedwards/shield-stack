import { describe, it, expect, beforeEach } from "vitest";
import { useEstateStore } from "./store";

describe("useEstateStore", () => {
  beforeEach(() => {
    useEstateStore.setState({ currentCase: null });
  });

  it("starts with no current case", () => {
    expect(useEstateStore.getState().currentCase).toBeNull();
  });

  it("sets onboarding data and creates a case", () => {
    useEstateStore.getState().setOnboardingData({
      state: "CA",
      relationship: "spouse",
      estateComplexity: "simple",
      dateOfDeath: "2026-01-15T00:00:00.000Z",
    });

    const currentCase = useEstateStore.getState().currentCase;
    expect(currentCase).not.toBeNull();
    expect(currentCase!.state).toBe("CA");
    expect(currentCase!.relationship).toBe("spouse");
    expect(currentCase!.estateComplexity).toBe("simple");
    expect(currentCase!.dateOfDeath).toBe("2026-01-15T00:00:00.000Z");
    expect(currentCase!.id).toBeTruthy();
    expect(currentCase!.createdAt).toBeTruthy();
    expect(currentCase!.checklistProgress).toEqual({});
    expect(currentCase!.generatedDocuments).toEqual([]);
    expect(currentCase!.deadlines).toEqual([]);
  });

  it("sets optional deceased name", () => {
    useEstateStore.getState().setOnboardingData({
      state: "NY",
      relationship: "child",
      estateComplexity: "moderate",
      dateOfDeath: "2026-02-01T00:00:00.000Z",
      deceasedName: "Jane Doe",
    });

    const currentCase = useEstateStore.getState().currentCase;
    expect(currentCase!.deceasedName).toBe("Jane Doe");
  });

  it("generates a unique UUID for each case", () => {
    useEstateStore.getState().setOnboardingData({
      state: "TX",
      relationship: "sibling",
      estateComplexity: "complex",
      dateOfDeath: "2026-03-01T00:00:00.000Z",
    });
    const firstId = useEstateStore.getState().currentCase!.id;

    useEstateStore.getState().setOnboardingData({
      state: "FL",
      relationship: "parent",
      estateComplexity: "simple",
      dateOfDeath: "2026-03-10T00:00:00.000Z",
    });
    const secondId = useEstateStore.getState().currentCase!.id;

    expect(firstId).not.toBe(secondId);
  });

  it("resets the case to null", () => {
    useEstateStore.getState().setOnboardingData({
      state: "IL",
      relationship: "other",
      estateComplexity: "moderate",
      dateOfDeath: "2026-01-01T00:00:00.000Z",
    });
    expect(useEstateStore.getState().currentCase).not.toBeNull();

    useEstateStore.getState().resetCase();
    expect(useEstateStore.getState().currentCase).toBeNull();
  });

  it("getCase returns the current case", () => {
    expect(useEstateStore.getState().getCase()).toBeNull();

    useEstateStore.getState().setOnboardingData({
      state: "WA",
      relationship: "spouse",
      estateComplexity: "simple",
      dateOfDeath: "2026-02-15T00:00:00.000Z",
    });

    const fromGetCase = useEstateStore.getState().getCase();
    const fromState = useEstateStore.getState().currentCase;
    expect(fromGetCase).toEqual(fromState);
  });

  it("stores ISO 8601 createdAt timestamp", () => {
    useEstateStore.getState().setOnboardingData({
      state: "OR",
      relationship: "child",
      estateComplexity: "simple",
      dateOfDeath: "2026-01-20T00:00:00.000Z",
    });

    const createdAt = useEstateStore.getState().currentCase!.createdAt;
    expect(() => new Date(createdAt)).not.toThrow();
    expect(new Date(createdAt).toISOString()).toBe(createdAt);
  });
});
