import { describe, it, expect } from "vitest";
import {
  LOAN_TYPES,
  RECOVERY_PATHS,
  DELINQUENCY_STATUSES,
  SCORE_RANGES,
  SITE_NAME,
} from "./constants";

describe("constants", () => {
  it("exports site name", () => {
    expect(SITE_NAME).toBe("ScoreRebound");
  });

  it("defines all loan types", () => {
    expect(LOAN_TYPES).toContain("federal_direct");
    expect(LOAN_TYPES).toContain("parent_plus");
    expect(LOAN_TYPES).toContain("private");
    expect(LOAN_TYPES).toHaveLength(5);
  });

  it("defines all recovery paths", () => {
    expect(RECOVERY_PATHS).toContain("ibr_enrollment");
    expect(RECOVERY_PATHS).toContain("rehabilitation");
    expect(RECOVERY_PATHS).toContain("consolidation");
    expect(RECOVERY_PATHS).toContain("credit_building");
    expect(RECOVERY_PATHS).toContain("mixed");
    expect(RECOVERY_PATHS).toHaveLength(5);
  });

  it("defines all delinquency statuses", () => {
    expect(DELINQUENCY_STATUSES).toContain("current");
    expect(DELINQUENCY_STATUSES).toContain("collections");
    expect(DELINQUENCY_STATUSES).toHaveLength(6);
  });

  it("defines score ranges in ascending order", () => {
    expect(SCORE_RANGES[0]).toBe("300-449");
    expect(SCORE_RANGES[SCORE_RANGES.length - 1]).toBe("700+");
    expect(SCORE_RANGES).toHaveLength(7);
  });
});
