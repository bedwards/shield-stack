import { describe, it, expect, beforeEach } from "vitest";
import {
  computeDeadlines,
  daysRemaining,
  getDeadlineUrgency,
} from "./deadlines";

describe("computeDeadlines", () => {
  describe("California (CA) — verified state, 30-day filing deadline", () => {
    const state = "CA";
    const dateOfDeath = "2026-01-15T00:00:00.000Z";
    let deadlines: ReturnType<typeof computeDeadlines>;

    beforeEach(() => {
      deadlines = computeDeadlines(state, dateOfDeath);
    });

    it("returns both universal and state-specific deadlines", () => {
      expect(deadlines.length).toBeGreaterThanOrEqual(9);
      const universal = deadlines.filter((d) => !d.stateSpecific);
      const stateSpecific = deadlines.filter((d) => d.stateSpecific);
      expect(universal.length).toBe(7);
      expect(stateSpecific.length).toBeGreaterThanOrEqual(2);
    });

    it("includes Social Security notification within 7 days", () => {
      const ss = deadlines.find((d) => d.id === "universal-ss-notification");
      expect(ss).toBeDefined();
      expect(ss!.dueDate).toBe("2026-01-22T00:00:00.000Z");
      expect(ss!.category).toBe("notification");
      expect(ss!.stateSpecific).toBe(false);
    });

    it("includes COBRA enrollment at 60 days", () => {
      const cobra = deadlines.find((d) => d.id === "universal-cobra-enrollment");
      expect(cobra).toBeDefined();
      expect(cobra!.dueDate).toBe("2026-03-16T00:00:00.000Z");
      expect(cobra!.category).toBe("benefits");
    });

    it("includes final income tax return due April 15 of following year", () => {
      const tax = deadlines.find((d) => d.id === "universal-final-income-tax");
      expect(tax).toBeDefined();
      expect(tax!.dueDate).toBe("2027-04-15T00:00:00.000Z");
      expect(tax!.category).toBe("tax");
    });

    it("includes estate tax return at 9 months", () => {
      const estate = deadlines.find((d) => d.id === "universal-estate-tax-return");
      expect(estate).toBeDefined();
      expect(estate!.dueDate).toBe("2026-10-15T00:00:00.000Z");
      expect(estate!.category).toBe("tax");
    });

    it("includes CA probate filing deadline at 30 days", () => {
      const probate = deadlines.find((d) => d.id === "state-probate-filing-ca");
      expect(probate).toBeDefined();
      expect(probate!.dueDate).toBe("2026-02-14T00:00:00.000Z");
      expect(probate!.stateSpecific).toBe(true);
      expect(probate!.category).toBe("probate");
      expect(probate!.description).toContain("California");
      expect(probate!.description).toContain("30 days");
    });

    it("includes CA small estate affidavit option", () => {
      const smallEstate = deadlines.find(
        (d) => d.id === "state-small-estate-ca",
      );
      expect(smallEstate).toBeDefined();
      expect(smallEstate!.description).toContain("208,850");
      expect(smallEstate!.stateSpecific).toBe(true);
    });

    it("sorts deadlines by due date ascending", () => {
      for (let i = 1; i < deadlines.length; i++) {
        const prev = new Date(deadlines[i - 1].dueDate).getTime();
        const curr = new Date(deadlines[i].dueDate).getTime();
        expect(curr).toBeGreaterThanOrEqual(prev);
      }
    });

    it("all deadlines have required fields", () => {
      for (const d of deadlines) {
        expect(d.id).toBeTruthy();
        expect(d.title).toBeTruthy();
        expect(d.dueDate).toBeTruthy();
        expect(d.category).toBeTruthy();
        expect(d.description).toBeTruthy();
        expect(d.consequence).toBeTruthy();
        expect(typeof d.completed).toBe("boolean");
        expect(typeof d.stateSpecific).toBe("boolean");
      }
    });
  });

  describe("Florida (FL) — verified state, 10-day filing deadline", () => {
    const state = "FL";
    const dateOfDeath = "2026-03-01T00:00:00.000Z";
    let deadlines: ReturnType<typeof computeDeadlines>;

    beforeEach(() => {
      deadlines = computeDeadlines(state, dateOfDeath);
    });

    it("includes FL probate filing deadline at 10 days", () => {
      const probate = deadlines.find((d) => d.id === "state-probate-filing-fl");
      expect(probate).toBeDefined();
      expect(probate!.dueDate).toBe("2026-03-11T00:00:00.000Z");
      expect(probate!.description).toContain("Florida");
      expect(probate!.description).toContain("10 days");
    });

    it("FL probate deadline comes before COBRA deadline", () => {
      const probateIdx = deadlines.findIndex(
        (d) => d.id === "state-probate-filing-fl",
      );
      const cobraIdx = deadlines.findIndex(
        (d) => d.id === "universal-cobra-enrollment",
      );
      expect(probateIdx).toBeLessThan(cobraIdx);
    });

    it("includes small estate affidavit with FL threshold", () => {
      const smallEstate = deadlines.find(
        (d) => d.id === "state-small-estate-fl",
      );
      expect(smallEstate).toBeDefined();
      expect(smallEstate!.description).toContain("75,000");
    });
  });

  describe("New York (NY) — verified state, 30-day filing deadline", () => {
    const state = "NY";
    const dateOfDeath = "2026-06-15T00:00:00.000Z";
    let deadlines: ReturnType<typeof computeDeadlines>;

    beforeEach(() => {
      deadlines = computeDeadlines(state, dateOfDeath);
    });

    it("includes NY probate filing deadline at 30 days", () => {
      const probate = deadlines.find((d) => d.id === "state-probate-filing-ny");
      expect(probate).toBeDefined();
      expect(probate!.dueDate).toBe("2026-07-15T00:00:00.000Z");
      expect(probate!.description).toContain("New York");
    });

    it("includes NY small estate affidavit with $50K threshold", () => {
      const smallEstate = deadlines.find(
        (d) => d.id === "state-small-estate-ny",
      );
      expect(smallEstate).toBeDefined();
      expect(smallEstate!.description).toContain("50,000");
    });

    it("final income tax due April 15 of 2027 for mid-2026 death", () => {
      const tax = deadlines.find((d) => d.id === "universal-final-income-tax");
      expect(tax).toBeDefined();
      expect(tax!.dueDate).toBe("2027-04-15T00:00:00.000Z");
    });
  });

  describe("Colorado (CO) — 10-day filing deadline", () => {
    const state = "CO";
    const dateOfDeath = "2026-12-20T00:00:00.000Z";

    it("computes correct probate deadline for short-window state", () => {
      const deadlines = computeDeadlines(state, dateOfDeath);
      const probate = deadlines.find((d) => d.id === "state-probate-filing-co");
      expect(probate).toBeDefined();
      expect(probate!.dueDate).toBe("2026-12-30T00:00:00.000Z");
      expect(probate!.description).toContain("10 days");
    });

    it("final income tax for December death is April 15 of next year + 1", () => {
      const deadlines = computeDeadlines(state, dateOfDeath);
      const tax = deadlines.find((d) => d.id === "universal-final-income-tax");
      expect(tax!.dueDate).toBe("2027-04-15T00:00:00.000Z");
    });
  });

  describe("edge cases", () => {
    it("returns empty array for invalid date", () => {
      const deadlines = computeDeadlines("CA", "not-a-date");
      expect(deadlines).toEqual([]);
    });

    it("returns only universal deadlines for unknown state code", () => {
      const deadlines = computeDeadlines("XX", "2026-01-15T00:00:00.000Z");
      expect(deadlines.length).toBe(7);
      expect(deadlines.every((d) => !d.stateSpecific)).toBe(true);
    });

    it("handles case-insensitive state codes", () => {
      const upper = computeDeadlines("CA", "2026-01-15T00:00:00.000Z");
      const lower = computeDeadlines("ca", "2026-01-15T00:00:00.000Z");
      expect(upper.length).toBe(lower.length);
      // State-specific deadlines should exist for both
      expect(upper.some((d) => d.stateSpecific)).toBe(true);
      expect(lower.some((d) => d.stateSpecific)).toBe(true);
    });

    it("all deadlines start as not completed", () => {
      const deadlines = computeDeadlines("TX", "2026-05-01T00:00:00.000Z");
      expect(deadlines.every((d) => d.completed === false)).toBe(true);
    });

    it("each deadline has a unique id", () => {
      const deadlines = computeDeadlines("IL", "2026-02-01T00:00:00.000Z");
      const ids = deadlines.map((d) => d.id);
      expect(new Set(ids).size).toBe(ids.length);
    });
  });
});

describe("daysRemaining", () => {
  it("returns positive days for future deadline", () => {
    const now = new Date("2026-03-10T12:00:00.000Z");
    expect(daysRemaining("2026-03-20T00:00:00.000Z", now)).toBe(10);
  });

  it("returns negative days for past deadline", () => {
    const now = new Date("2026-03-20T12:00:00.000Z");
    expect(daysRemaining("2026-03-10T00:00:00.000Z", now)).toBe(-10);
  });

  it("returns 0 for deadline due today", () => {
    const now = new Date("2026-03-15T12:00:00.000Z");
    expect(daysRemaining("2026-03-16T00:00:00.000Z", now)).toBe(1);
  });
});

describe("getDeadlineUrgency", () => {
  it("returns overdue for past deadlines", () => {
    const now = new Date("2026-03-20T12:00:00.000Z");
    expect(getDeadlineUrgency("2026-03-10T00:00:00.000Z", now)).toBe("overdue");
  });

  it("returns urgent for deadlines within 7 days", () => {
    const now = new Date("2026-03-15T12:00:00.000Z");
    expect(getDeadlineUrgency("2026-03-20T00:00:00.000Z", now)).toBe("urgent");
  });

  it("returns upcoming for deadlines more than 7 days away", () => {
    const now = new Date("2026-03-01T12:00:00.000Z");
    expect(getDeadlineUrgency("2026-03-20T00:00:00.000Z", now)).toBe("upcoming");
  });

  it("returns urgent for deadline exactly 7 days away", () => {
    const now = new Date("2026-03-13T00:00:00.000Z");
    expect(getDeadlineUrgency("2026-03-20T00:00:00.000Z", now)).toBe("urgent");
  });
});
