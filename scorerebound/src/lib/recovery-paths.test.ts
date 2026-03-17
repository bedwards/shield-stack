import { describe, it, expect } from "vitest";
import {
  RECOVERY_PATHS,
  determineRecoveryPath,
  getEstimatedMonths,
} from "./recovery-paths";

describe("RECOVERY_PATHS", () => {
  it("has all 5 recovery paths defined", () => {
    expect(Object.keys(RECOVERY_PATHS)).toHaveLength(5);
    expect(RECOVERY_PATHS.ibr_enrollment).toBeDefined();
    expect(RECOVERY_PATHS.rehabilitation).toBeDefined();
    expect(RECOVERY_PATHS.consolidation).toBeDefined();
    expect(RECOVERY_PATHS.credit_building).toBeDefined();
    expect(RECOVERY_PATHS.mixed).toBeDefined();
  });

  it("each path has required fields", () => {
    for (const path of Object.values(RECOVERY_PATHS)) {
      expect(path.id).toBeTruthy();
      expect(path.title).toBeTruthy();
      expect(path.shortDescription).toBeTruthy();
      expect(path.detailedDescription).toBeTruthy();
      expect(path.eligibility.length).toBeGreaterThan(0);
      expect(path.pros.length).toBeGreaterThan(0);
      expect(path.cons.length).toBeGreaterThan(0);
      expect(path.estimatedMonths.min).toBeLessThanOrEqual(path.estimatedMonths.max);
      expect(path.bestFor.length).toBeGreaterThan(0);
    }
  });
});

describe("determineRecoveryPath", () => {
  it("returns credit_building for private loans", () => {
    expect(
      determineRecoveryPath("private", "default", ["improve_credit_score"]),
    ).toBe("credit_building");
  });

  it("returns consolidation for defaulted parent_plus", () => {
    expect(
      determineRecoveryPath("parent_plus", "default", ["get_out_of_default"]),
    ).toBe("consolidation");
  });

  it("returns rehabilitation for defaulted federal_direct with get_out_of_default goal", () => {
    expect(
      determineRecoveryPath("federal_direct", "default", ["get_out_of_default"]),
    ).toBe("rehabilitation");
  });

  it("returns mixed for defaulted with many goals", () => {
    expect(
      determineRecoveryPath("federal_direct", "default", [
        "improve_credit_score",
        "lower_monthly_payments",
        "buy_a_home",
      ]),
    ).toBe("mixed");
  });

  it("returns mixed for 90+ days delinquent", () => {
    expect(
      determineRecoveryPath("federal_direct", "90_plus", ["improve_credit_score"]),
    ).toBe("mixed");
  });

  it("returns ibr_enrollment for 30-day delinquent federal_direct", () => {
    expect(
      determineRecoveryPath("federal_direct", "30_days", ["lower_monthly_payments"]),
    ).toBe("ibr_enrollment");
  });

  it("returns consolidation for 60-day delinquent parent_plus", () => {
    expect(
      determineRecoveryPath("parent_plus", "60_days", ["lower_monthly_payments"]),
    ).toBe("consolidation");
  });

  it("returns credit_building for current payments without lower payment goal", () => {
    expect(
      determineRecoveryPath("federal_direct", "current", ["improve_credit_score"]),
    ).toBe("credit_building");
  });

  it("returns ibr_enrollment for current payments with lower payment goal", () => {
    expect(
      determineRecoveryPath("federal_direct", "current", ["lower_monthly_payments"]),
    ).toBe("ibr_enrollment");
  });
});

describe("getEstimatedMonths", () => {
  it("returns a number for all path/score combinations", () => {
    const paths = Object.keys(RECOVERY_PATHS) as Array<keyof typeof RECOVERY_PATHS>;
    const scores = [
      "300_499", "500_579", "580_619", "620_659",
      "660_699", "700_749", "750_plus",
    ] as const;

    for (const path of paths) {
      for (const score of scores) {
        const months = getEstimatedMonths(path, score);
        expect(months).toBeGreaterThan(0);
        expect(Number.isInteger(months)).toBe(true);
      }
    }
  });

  it("lower scores take longer", () => {
    const lowScore = getEstimatedMonths("rehabilitation", "300_499");
    const highScore = getEstimatedMonths("rehabilitation", "750_plus");
    expect(lowScore).toBeGreaterThanOrEqual(highScore);
  });
});
