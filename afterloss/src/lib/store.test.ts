import { describe, it, expect, beforeEach } from "vitest";
import { useEstateStore } from "./store";

describe("useEstateStore", () => {
  beforeEach(() => {
    useEstateStore.setState({ currentCase: null });
  });

  it("starts with no current case", () => {
    expect(useEstateStore.getState().currentCase).toBeNull();
  });

  it("sets onboarding data and creates a case with computed deadlines", () => {
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
    // Deadlines are now computed from state + dateOfDeath
    expect(currentCase!.deadlines.length).toBeGreaterThan(0);
    // Should include both universal and CA-specific deadlines
    expect(
      currentCase!.deadlines.some((d) => d.id === "state-probate-filing-ca"),
    ).toBe(true);
    expect(
      currentCase!.deadlines.some(
        (d) => d.id === "universal-cobra-enrollment",
      ),
    ).toBe(true);
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

  describe("toggleItem", () => {
    beforeEach(() => {
      useEstateStore.getState().setOnboardingData({
        state: "CA",
        relationship: "spouse",
        estateComplexity: "simple",
        dateOfDeath: "2026-01-15T00:00:00.000Z",
      });
    });

    it("marks an item as completed", () => {
      useEstateStore.getState().toggleItem("immediate-001");
      const progress = useEstateStore.getState().currentCase!.checklistProgress;
      expect(progress["immediate-001"].status).toBe("completed");
      expect(progress["immediate-001"].completedAt).toBeTruthy();
    });

    it("toggles a completed item back to pending", () => {
      useEstateStore.getState().toggleItem("immediate-001");
      useEstateStore.getState().toggleItem("immediate-001");
      const progress = useEstateStore.getState().currentCase!.checklistProgress;
      expect(progress["immediate-001"]).toBeUndefined();
    });

    it("does nothing if no case exists", () => {
      useEstateStore.setState({ currentCase: null });
      useEstateStore.getState().toggleItem("immediate-001");
      expect(useEstateStore.getState().currentCase).toBeNull();
    });
  });

  describe("toggleDeadline", () => {
    beforeEach(() => {
      useEstateStore.getState().setOnboardingData({
        state: "CA",
        relationship: "spouse",
        estateComplexity: "simple",
        dateOfDeath: "2026-01-15T00:00:00.000Z",
      });
    });

    it("marks a deadline as completed", () => {
      const deadlineId =
        useEstateStore.getState().currentCase!.deadlines[0].id;
      useEstateStore.getState().toggleDeadline(deadlineId);
      const deadline = useEstateStore
        .getState()
        .currentCase!.deadlines.find((d) => d.id === deadlineId);
      expect(deadline!.completed).toBe(true);
    });

    it("toggles a completed deadline back to incomplete", () => {
      const deadlineId =
        useEstateStore.getState().currentCase!.deadlines[0].id;
      useEstateStore.getState().toggleDeadline(deadlineId);
      useEstateStore.getState().toggleDeadline(deadlineId);
      const deadline = useEstateStore
        .getState()
        .currentCase!.deadlines.find((d) => d.id === deadlineId);
      expect(deadline!.completed).toBe(false);
    });

    it("does nothing if no case exists", () => {
      useEstateStore.setState({ currentCase: null });
      useEstateStore.getState().toggleDeadline("nonexistent");
      expect(useEstateStore.getState().currentCase).toBeNull();
    });
  });

  describe("skipItem", () => {
    beforeEach(() => {
      useEstateStore.getState().setOnboardingData({
        state: "NY",
        relationship: "child",
        estateComplexity: "moderate",
        dateOfDeath: "2026-02-01T00:00:00.000Z",
      });
    });

    it("marks an item as skipped", () => {
      useEstateStore.getState().skipItem("week-001");
      const progress = useEstateStore.getState().currentCase!.checklistProgress;
      expect(progress["week-001"].status).toBe("skipped");
    });

    it("unskips a skipped item", () => {
      useEstateStore.getState().skipItem("week-001");
      useEstateStore.getState().skipItem("week-001");
      const progress = useEstateStore.getState().currentCase!.checklistProgress;
      expect(progress["week-001"]).toBeUndefined();
    });

    it("does nothing if no case exists", () => {
      useEstateStore.setState({ currentCase: null });
      useEstateStore.getState().skipItem("week-001");
      expect(useEstateStore.getState().currentCase).toBeNull();
    });
  });
});
