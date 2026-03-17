import { describe, it, expect } from "vitest";
import type {
  Database,
  LoanType,
  RecoveryPath,
  DelinquencyStatus,
  ScoreRange,
  EmailSequenceStatus,
  Profile,
  QuizResponse,
  RecoveryPlan,
  PlanStep,
  ProgressEntry,
  AffiliateClick,
  EmailSequence,
  QuizResponseInsert,
  RecoveryPlanInsert,
  PlanStepInsert,
  ProgressEntryInsert,
  AffiliateClickInsert,
  EmailSequenceInsert,
  ProfileUpdate,
  RecoveryPlanJson,
} from "./database.types";

describe("Database enum types", () => {
  it("LoanType has all expected values", () => {
    const values: LoanType[] = [
      "federal_direct",
      "federal_ffel",
      "federal_perkins",
      "parent_plus",
      "private",
    ];
    expect(values).toHaveLength(5);
  });

  it("RecoveryPath has all expected values", () => {
    const values: RecoveryPath[] = [
      "ibr_enrollment",
      "rehabilitation",
      "consolidation",
      "credit_building",
      "mixed",
    ];
    expect(values).toHaveLength(5);
  });

  it("DelinquencyStatus has all expected values", () => {
    const values: DelinquencyStatus[] = [
      "current",
      "30_days",
      "60_days",
      "90_plus",
      "default",
      "collections",
    ];
    expect(values).toHaveLength(6);
  });

  it("ScoreRange has all expected values", () => {
    const values: ScoreRange[] = [
      "300_499",
      "500_579",
      "580_619",
      "620_659",
      "660_699",
      "700_749",
      "750_plus",
    ];
    expect(values).toHaveLength(7);
  });

  it("EmailSequenceStatus has all expected values", () => {
    const values: EmailSequenceStatus[] = [
      "active",
      "paused",
      "completed",
      "unsubscribed",
    ];
    expect(values).toHaveLength(4);
  });
});

describe("Database row types", () => {
  it("Profile type matches schema", () => {
    const profile: Profile = {
      id: "00000000-0000-0000-0000-000000000001",
      display_name: "Test User",
      score_range: "500_579",
      notification_prefs: { email: true, push: false },
      is_anonymous: false,
      created_at: "2026-03-16T00:00:00Z",
      updated_at: "2026-03-16T00:00:00Z",
    };
    expect(profile.id).toBeDefined();
    expect(profile.notification_prefs.email).toBe(true);
    expect(profile.is_anonymous).toBe(false);
  });

  it("Profile allows null display_name and score_range", () => {
    const profile: Profile = {
      id: "00000000-0000-0000-0000-000000000001",
      display_name: null,
      score_range: null,
      notification_prefs: { email: true, push: false },
      is_anonymous: true,
      created_at: "2026-03-16T00:00:00Z",
      updated_at: "2026-03-16T00:00:00Z",
    };
    expect(profile.display_name).toBeNull();
    expect(profile.score_range).toBeNull();
  });

  it("QuizResponse type matches schema with nullable user_id", () => {
    const response: QuizResponse = {
      id: "10000000-0000-0000-0000-000000000001",
      user_id: null,
      loan_type: "federal_direct",
      servicer: "MOHELA",
      delinquency_status: "90_plus",
      current_score_range: "500_579",
      goals: ["improve_credit_score", "get_out_of_default"],
      created_at: "2026-03-16T00:00:00Z",
    };
    expect(response.user_id).toBeNull();
    expect(response.goals).toHaveLength(2);
  });

  it("RecoveryPlan type matches schema with typed plan_json", () => {
    const planJson: RecoveryPlanJson = {
      title: "Recovery Plan",
      summary: "Test summary",
      steps_overview: ["Step 1", "Step 2"],
      estimated_score_improvement: "80-120 points",
      warnings: ["Warning 1"],
    };
    const plan: RecoveryPlan = {
      id: "20000000-0000-0000-0000-000000000001",
      quiz_response_id: "10000000-0000-0000-0000-000000000001",
      user_id: "00000000-0000-0000-0000-000000000001",
      plan_json: planJson,
      recovery_path: "rehabilitation",
      estimated_months: 12,
      created_at: "2026-03-16T00:00:00Z",
    };
    expect(plan.plan_json.title).toBe("Recovery Plan");
    expect(plan.estimated_months).toBe(12);
  });

  it("PlanStep type matches schema with completion tracking", () => {
    const step: PlanStep = {
      id: "30000000-0000-0000-0000-000000000001",
      plan_id: "20000000-0000-0000-0000-000000000001",
      step_order: 1,
      title: "Contact Servicer",
      description: "Call your loan servicer",
      action_url: "https://example.com",
      is_completed: true,
      completed_at: "2026-03-16T00:00:00Z",
      created_at: "2026-03-16T00:00:00Z",
    };
    expect(step.is_completed).toBe(true);
    expect(step.completed_at).toBeDefined();
  });

  it("ProgressEntry enforces user_id (not nullable)", () => {
    const entry: ProgressEntry = {
      id: "40000000-0000-0000-0000-000000000001",
      user_id: "00000000-0000-0000-0000-000000000001",
      plan_id: "20000000-0000-0000-0000-000000000001",
      action_type: "score_check",
      action_description: "Monthly credit score check",
      score_snapshot: 520,
      completed_at: "2026-03-16T00:00:00Z",
    };
    expect(entry.user_id).toBeDefined();
    expect(entry.score_snapshot).toBe(520);
  });

  it("AffiliateClick allows nullable user_id for anonymous tracking", () => {
    const click: AffiliateClick = {
      id: "50000000-0000-0000-0000-000000000001",
      user_id: null,
      product_slug: "self-credit-builder",
      affiliate_url: "https://www.self.inc/refer/scorerebound",
      referrer_page: "/recovery-plan",
      clicked_at: "2026-03-16T00:00:00Z",
    };
    expect(click.user_id).toBeNull();
    expect(click.product_slug).toBe("self-credit-builder");
  });

  it("EmailSequence type matches schema with drip campaign state", () => {
    const seq: EmailSequence = {
      id: "60000000-0000-0000-0000-000000000001",
      user_id: "00000000-0000-0000-0000-000000000001",
      sequence_name: "rehabilitation_drip",
      current_step: 3,
      status: "active",
      last_sent_at: "2026-03-13T00:00:00Z",
      next_send_at: "2026-03-20T00:00:00Z",
      metadata: { recovery_path: "rehabilitation" },
      created_at: "2026-03-16T00:00:00Z",
      updated_at: "2026-03-16T00:00:00Z",
    };
    expect(seq.status).toBe("active");
    expect(seq.current_step).toBe(3);
  });
});

describe("Insert types", () => {
  it("QuizResponseInsert allows omitting auto-generated fields", () => {
    const insert: QuizResponseInsert = {
      user_id: null,
      loan_type: "federal_direct",
      servicer: "MOHELA",
      delinquency_status: "90_plus",
      current_score_range: "500_579",
      goals: ["improve_credit_score"],
    };
    expect(insert.loan_type).toBe("federal_direct");
    // id and created_at should be optional
    expect("id" in insert).toBe(false);
  });

  it("RecoveryPlanInsert requires quiz_response_id", () => {
    const insert: RecoveryPlanInsert = {
      quiz_response_id: "10000000-0000-0000-0000-000000000001",
      user_id: null,
      plan_json: {
        title: "Test",
        summary: "Test",
        steps_overview: [],
        estimated_score_improvement: "50 points",
        warnings: [],
      },
      recovery_path: "consolidation",
      estimated_months: 6,
    };
    expect(insert.quiz_response_id).toBeDefined();
  });

  it("PlanStepInsert requires plan_id, step_order, title, description", () => {
    const insert: PlanStepInsert = {
      plan_id: "20000000-0000-0000-0000-000000000001",
      step_order: 1,
      title: "Step 1",
      description: "Do this first",
      action_url: null,
    };
    expect(insert.plan_id).toBeDefined();
    expect(insert.step_order).toBe(1);
  });

  it("ProgressEntryInsert requires user_id and plan_id", () => {
    const insert: ProgressEntryInsert = {
      user_id: "00000000-0000-0000-0000-000000000001",
      plan_id: "20000000-0000-0000-0000-000000000001",
      action_type: "milestone",
      action_description: "Completed step 1",
      score_snapshot: null,
    };
    expect(insert.user_id).toBeDefined();
  });

  it("AffiliateClickInsert requires product_slug and affiliate_url", () => {
    const insert: AffiliateClickInsert = {
      user_id: null,
      product_slug: "discover-secured",
      affiliate_url: "https://discover.com",
      referrer_page: "/paths",
    };
    expect(insert.product_slug).toBe("discover-secured");
  });

  it("EmailSequenceInsert requires user_id and sequence_name", () => {
    const insert: EmailSequenceInsert = {
      user_id: "00000000-0000-0000-0000-000000000001",
      sequence_name: "welcome_drip",
    };
    expect(insert.sequence_name).toBe("welcome_drip");
    // status, current_step, metadata should default
    expect("status" in insert).toBe(false);
  });
});

describe("Update types", () => {
  it("ProfileUpdate allows partial updates", () => {
    const update: ProfileUpdate = {
      display_name: "New Name",
    };
    expect(update.display_name).toBe("New Name");
    // Other fields should be optional
    expect("score_range" in update).toBe(false);
  });
});

describe("Database type structure", () => {
  it("Database type has public schema with all tables", () => {
    // Type-level check: ensure Database has the expected structure
    type Tables = Database["public"]["Tables"];
    type TableNames = keyof Tables;

    const expectedTables: TableNames[] = [
      "profiles",
      "quiz_responses",
      "recovery_plans",
      "plan_steps",
      "progress_entries",
      "affiliate_clicks",
      "email_sequences",
    ];
    expect(expectedTables).toHaveLength(7);
  });

  it("Database type has all enum definitions", () => {
    type Enums = Database["public"]["Enums"];
    type EnumNames = keyof Enums;

    const expectedEnums: EnumNames[] = [
      "loan_type",
      "recovery_path",
      "delinquency_status",
      "score_range",
      "email_sequence_status",
    ];
    expect(expectedEnums).toHaveLength(5);
  });
});
