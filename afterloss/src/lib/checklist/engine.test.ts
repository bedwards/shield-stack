import { describe, it, expect, beforeEach } from "vitest";
import { generateChecklist, calculateProgress } from "./engine";
import { masterChecklist, CATEGORY_ORDER } from "./data";

describe("generateChecklist", () => {
  describe("basic generation", () => {
    it("returns items for a simple estate", () => {
      const result = generateChecklist("CA", "simple");
      expect(result.items.length).toBeGreaterThan(0);
      expect(result.totalItems).toBe(result.items.length);
    });

    it("returns items organized by category", () => {
      const result = generateChecklist("NY", "moderate");
      for (const cat of CATEGORY_ORDER) {
        expect(result.byCategory[cat]).toBeDefined();
        expect(Array.isArray(result.byCategory[cat])).toBe(true);
      }
    });

    it("includes at least 40 items for a complex estate in a community property state", () => {
      const result = generateChecklist("CA", "complex");
      expect(result.totalItems).toBeGreaterThanOrEqual(40);
    });

    it("has items in every timeline category", () => {
      const result = generateChecklist("CA", "complex");
      for (const cat of CATEGORY_ORDER) {
        expect(result.byCategory[cat].length).toBeGreaterThan(0);
      }
    });
  });

  describe("state-specific filtering", () => {
    it("includes community property item for California", () => {
      const result = generateChecklist("CA", "moderate");
      const communityPropertyItem = result.items.find(
        (item) => item.id === "month-010",
      );
      expect(communityPropertyItem).toBeDefined();
    });

    it("excludes community property item for New York", () => {
      const result = generateChecklist("NY", "moderate");
      const communityPropertyItem = result.items.find(
        (item) => item.id === "month-010",
      );
      expect(communityPropertyItem).toBeUndefined();
    });

    it("includes estate tax item for Washington (estate tax state)", () => {
      const result = generateChecklist("WA", "moderate");
      const estateTaxItem = result.items.find(
        (item) => item.id === "quarter-009",
      );
      expect(estateTaxItem).toBeDefined();
    });

    it("excludes estate tax item for Texas (no estate tax)", () => {
      const result = generateChecklist("TX", "moderate");
      const estateTaxItem = result.items.find(
        (item) => item.id === "quarter-009",
      );
      expect(estateTaxItem).toBeUndefined();
    });

    it("includes inheritance tax item for Pennsylvania", () => {
      const result = generateChecklist("PA", "moderate");
      const inheritanceTaxItem = result.items.find(
        (item) => item.id === "quarter-010",
      );
      expect(inheritanceTaxItem).toBeDefined();
    });

    it("excludes inheritance tax item for California (no inheritance tax)", () => {
      const result = generateChecklist("CA", "moderate");
      const inheritanceTaxItem = result.items.find(
        (item) => item.id === "quarter-010",
      );
      expect(inheritanceTaxItem).toBeUndefined();
    });
  });

  describe("complexity filtering", () => {
    it("simple estate excludes moderate-complexity items", () => {
      const simpleResult = generateChecklist("CA", "simple");
      const moderateResult = generateChecklist("CA", "moderate");
      expect(moderateResult.totalItems).toBeGreaterThan(
        simpleResult.totalItems,
      );
    });

    it("complex estate includes all items for the state", () => {
      const complexResult = generateChecklist("CA", "complex");
      const moderateResult = generateChecklist("CA", "moderate");
      expect(complexResult.totalItems).toBeGreaterThanOrEqual(
        moderateResult.totalItems,
      );
    });

    it("simple estate excludes probate filing", () => {
      const result = generateChecklist("CA", "simple");
      const probateItem = result.items.find(
        (item) => item.id === "month-007",
      );
      expect(probateItem).toBeUndefined();
    });

    it("moderate estate includes probate filing", () => {
      const result = generateChecklist("CA", "moderate");
      const probateItem = result.items.find(
        (item) => item.id === "month-007",
      );
      expect(probateItem).toBeDefined();
    });

    it("simple estate excludes business interests item", () => {
      const result = generateChecklist("NY", "simple");
      const businessItem = result.items.find(
        (item) => item.id === "quarter-011",
      );
      expect(businessItem).toBeUndefined();
    });

    it("complex estate includes business interests item", () => {
      const result = generateChecklist("NY", "complex");
      const businessItem = result.items.find(
        (item) => item.id === "quarter-011",
      );
      expect(businessItem).toBeDefined();
    });
  });

  describe("data integrity", () => {
    it("all items have required fields", () => {
      for (const item of masterChecklist) {
        expect(item.id).toBeTruthy();
        expect(item.title).toBeTruthy();
        expect(item.description).toBeTruthy();
        expect(item.whyItMatters).toBeTruthy();
        expect(item.category).toBeTruthy();
        expect(item.estimatedTime).toBeTruthy();
        expect(typeof item.stateSpecific).toBe("boolean");
      }
    });

    it("all item IDs are unique", () => {
      const ids = masterChecklist.map((item) => item.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it("state-specific items have applicableStates", () => {
      for (const item of masterChecklist) {
        if (item.stateSpecific) {
          expect(item.applicableStates).toBeDefined();
          expect(item.applicableStates!.length).toBeGreaterThan(0);
        }
      }
    });

    it("contains at least 40 total items", () => {
      expect(masterChecklist.length).toBeGreaterThanOrEqual(40);
    });
  });
});

describe("calculateProgress", () => {
  it("returns zero progress for empty checklistProgress", () => {
    const result = calculateProgress(10, {});
    expect(result.completed).toBe(0);
    expect(result.skipped).toBe(0);
    expect(result.remaining).toBe(10);
    expect(result.percentage).toBe(0);
  });

  it("calculates correct percentage for completed items", () => {
    const progress = {
      "item-1": { status: "completed", completedAt: "2026-01-01" },
      "item-2": { status: "completed", completedAt: "2026-01-02" },
    };
    const result = calculateProgress(10, progress);
    expect(result.completed).toBe(2);
    expect(result.percentage).toBe(20);
    expect(result.remaining).toBe(8);
  });

  it("counts skipped items separately from completed", () => {
    const progress = {
      "item-1": { status: "completed", completedAt: "2026-01-01" },
      "item-2": { status: "skipped" },
    };
    const result = calculateProgress(10, progress);
    expect(result.completed).toBe(1);
    expect(result.skipped).toBe(1);
    expect(result.remaining).toBe(8);
    expect(result.percentage).toBe(10);
  });

  it("returns 100% when all items are completed", () => {
    const progress = {
      "item-1": { status: "completed", completedAt: "2026-01-01" },
      "item-2": { status: "completed", completedAt: "2026-01-02" },
    };
    const result = calculateProgress(2, progress);
    expect(result.percentage).toBe(100);
    expect(result.remaining).toBe(0);
  });

  it("handles zero total items", () => {
    const result = calculateProgress(0, {});
    expect(result.percentage).toBe(0);
  });
});
