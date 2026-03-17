import { describe, it, expect } from "vitest";
import {
  validateQuizInput,
  generatePlan,
  LOAN_TYPE_OPTIONS,
  DELINQUENCY_OPTIONS,
  SCORE_RANGE_OPTIONS,
  GOAL_OPTIONS,
  type QuizInput,
} from "./plan-generator";

const VALID_INPUT: QuizInput = {
  loan_type: "federal_direct",
  servicer: "mohela",
  delinquency_status: "90_plus",
  current_score_range: "500_579",
  goals: ["improve_credit_score", "get_out_of_default"],
};

describe("validateQuizInput", () => {
  it("accepts valid input", () => {
    const result = validateQuizInput(VALID_INPUT);
    expect(result.valid).toBe(true);
    if (result.valid) {
      expect(result.data.loan_type).toBe("federal_direct");
    }
  });

  it("rejects non-object input", () => {
    expect(validateQuizInput(null)).toEqual({
      valid: false,
      error: "Request body must be an object",
    });
    expect(validateQuizInput("string")).toEqual({
      valid: false,
      error: "Request body must be an object",
    });
  });

  it("rejects invalid loan_type", () => {
    const result = validateQuizInput({ ...VALID_INPUT, loan_type: "invalid" });
    expect(result).toEqual({ valid: false, error: "Invalid loan_type" });
  });

  it("rejects missing servicer", () => {
    const result = validateQuizInput({ ...VALID_INPUT, servicer: "" });
    expect(result).toEqual({ valid: false, error: "servicer is required" });
  });

  it("rejects invalid delinquency_status", () => {
    const result = validateQuizInput({
      ...VALID_INPUT,
      delinquency_status: "bad",
    });
    expect(result).toEqual({
      valid: false,
      error: "Invalid delinquency_status",
    });
  });

  it("rejects invalid current_score_range", () => {
    const result = validateQuizInput({
      ...VALID_INPUT,
      current_score_range: "bad",
    });
    expect(result).toEqual({
      valid: false,
      error: "Invalid current_score_range",
    });
  });

  it("rejects empty goals array", () => {
    const result = validateQuizInput({ ...VALID_INPUT, goals: [] });
    expect(result).toEqual({
      valid: false,
      error: "goals must be a non-empty array of strings",
    });
  });

  it("rejects non-array goals", () => {
    const result = validateQuizInput({ ...VALID_INPUT, goals: "not-array" });
    expect(result).toEqual({
      valid: false,
      error: "goals must be a non-empty array of strings",
    });
  });
});

describe("generatePlan", () => {
  it("generates a plan with all required fields", () => {
    const plan = generatePlan(VALID_INPUT);
    expect(plan.recovery_path).toBeTruthy();
    expect(plan.estimated_months).toBeGreaterThan(0);
    expect(plan.steps.length).toBeGreaterThanOrEqual(3);
    expect(plan.plan_json.title).toBeTruthy();
    expect(plan.plan_json.summary).toBeTruthy();
    expect(plan.plan_json.estimated_score_improvement).toMatch(/\d+-\d+ points/);
    expect(plan.plan_json.steps_overview.length).toBe(plan.steps.length);
  });

  it("steps have sequential step_order", () => {
    const plan = generatePlan(VALID_INPUT);
    for (let i = 0; i < plan.steps.length; i++) {
      expect(plan.steps[i]!.step_order).toBe(i + 1);
    }
  });

  it("always starts with credit report check step", () => {
    const plan = generatePlan(VALID_INPUT);
    expect(plan.steps[0]!.title).toContain("credit report");
  });

  it("always ends with monitor progress step", () => {
    const plan = generatePlan(VALID_INPUT);
    const lastStep = plan.steps[plan.steps.length - 1]!;
    expect(lastStep.title).toContain("Monitor");
  });

  it("generates IBR path for 30-day delinquent federal direct", () => {
    const plan = generatePlan({
      ...VALID_INPUT,
      delinquency_status: "30_days",
    });
    expect(plan.recovery_path).toBe("ibr_enrollment");
  });

  it("generates rehabilitation path for defaulted federal direct", () => {
    const plan = generatePlan({
      ...VALID_INPUT,
      delinquency_status: "default",
      goals: ["get_out_of_default"],
    });
    expect(plan.recovery_path).toBe("rehabilitation");
  });

  it("generates consolidation path for parent_plus in default", () => {
    const plan = generatePlan({
      ...VALID_INPUT,
      loan_type: "parent_plus",
      delinquency_status: "default",
    });
    expect(plan.recovery_path).toBe("consolidation");
  });

  it("generates credit_building path for private loans", () => {
    const plan = generatePlan({
      ...VALID_INPUT,
      loan_type: "private",
    });
    expect(plan.recovery_path).toBe("credit_building");
  });

  it("generates mixed path for 90+ day delinquency", () => {
    const plan = generatePlan({
      ...VALID_INPUT,
      delinquency_status: "90_plus",
    });
    expect(plan.recovery_path).toBe("mixed");
  });

  it("includes private loan warning for private loans", () => {
    const plan = generatePlan({
      ...VALID_INPUT,
      loan_type: "private",
    });
    expect(plan.plan_json.warnings.some((w) => /private/i.test(w))).toBe(true);
  });

  it("includes collections warning for collections status", () => {
    const plan = generatePlan({
      ...VALID_INPUT,
      delinquency_status: "collections",
      goals: ["get_out_of_default"],
    });
    expect(plan.plan_json.warnings.some((w) => /collections/i.test(w))).toBe(
      true,
    );
  });

  it("includes default urgency warning", () => {
    const plan = generatePlan({
      ...VALID_INPUT,
      delinquency_status: "default",
      goals: ["get_out_of_default"],
    });
    expect(plan.plan_json.warnings.some((w) => /default/i.test(w))).toBe(true);
  });

  it("includes parent_plus warning", () => {
    const plan = generatePlan({
      ...VALID_INPUT,
      loan_type: "parent_plus",
      delinquency_status: "default",
    });
    expect(
      plan.plan_json.warnings.some((w) => /Parent PLUS/i.test(w)),
    ).toBe(true);
  });

  it("includes mortgage warning for home-buyer goal with default", () => {
    const plan = generatePlan({
      ...VALID_INPUT,
      delinquency_status: "default",
      goals: ["buy_a_home", "get_out_of_default"],
    });
    expect(plan.plan_json.warnings.some((w) => /mortgage/i.test(w))).toBe(
      true,
    );
  });
});

describe("quiz option arrays", () => {
  it("LOAN_TYPE_OPTIONS has 5 options", () => {
    expect(LOAN_TYPE_OPTIONS).toHaveLength(5);
  });

  it("DELINQUENCY_OPTIONS has 6 options", () => {
    expect(DELINQUENCY_OPTIONS).toHaveLength(6);
  });

  it("SCORE_RANGE_OPTIONS has 7 options", () => {
    expect(SCORE_RANGE_OPTIONS).toHaveLength(7);
  });

  it("GOAL_OPTIONS has 6 options", () => {
    expect(GOAL_OPTIONS).toHaveLength(6);
  });
});
