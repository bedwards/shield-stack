import { test, expect } from "@playwright/test";

const BASE = "http://localhost:3010";

test.describe("API — /api/health", () => {
  test("returns 200 with { status: ok }", async ({ request }) => {
    const res = await request.get(`${BASE}/api/health`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ status: "ok" });
  });
});

test.describe("API — /api/quiz", () => {
  const validPayload = {
    loan_type: "federal_direct",
    servicer: "MOHELA",
    delinquency_status: "90_plus",
    current_score_range: "500_579",
    goals: ["improve_credit_score", "get_out_of_default"],
  };

  test("valid quiz submission returns plan", async ({ request }) => {
    const res = await request.post(`${BASE}/api/quiz`, {
      data: validPayload,
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.plan).toBeDefined();
    expect(body.plan.recovery_path).toBeTruthy();
    expect(body.plan.estimated_months).toBeGreaterThan(0);
    expect(body.plan.steps.length).toBeGreaterThanOrEqual(3);
    expect(body.plan.plan_json).toBeDefined();
    expect(body.plan.plan_json.title).toBeTruthy();
    expect(body.plan.plan_json.summary).toBeTruthy();
    expect(body.plan.plan_json.estimated_score_improvement).toBeTruthy();
    for (const step of body.plan.steps) {
      expect(step.step_order).toBeGreaterThan(0);
      expect(step.title).toBeTruthy();
      expect(step.description).toBeTruthy();
    }
  });

  test("rejects missing loan_type", async ({ request }) => {
    const { loan_type: _, ...payload } = validPayload;
    const res = await request.post(`${BASE}/api/quiz`, { data: payload });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("loan_type");
  });

  test("rejects empty goals array", async ({ request }) => {
    const res = await request.post(`${BASE}/api/quiz`, {
      data: { ...validPayload, goals: [] },
    });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("goals");
  });

  test("rejects invalid delinquency_status", async ({ request }) => {
    const res = await request.post(`${BASE}/api/quiz`, {
      data: { ...validPayload, delinquency_status: "invalid_status" },
    });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("delinquency_status");
  });

  test("private loan generates private-loan warning", async ({ request }) => {
    const res = await request.post(`${BASE}/api/quiz`, {
      data: { ...validPayload, loan_type: "private" },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.plan.plan_json.warnings.length).toBeGreaterThan(0);
    expect(
      body.plan.plan_json.warnings.some((w: string) => /private/i.test(w)),
    ).toBe(true);
  });

  test("default status generates urgency warning", async ({ request }) => {
    const res = await request.post(`${BASE}/api/quiz`, {
      data: { ...validPayload, delinquency_status: "default" },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.plan.plan_json.warnings.length).toBeGreaterThan(0);
  });

  test("all five recovery paths produce valid plans", async ({ request }) => {
    const scenarios = [
      { delinquency_status: "30_days", loan_type: "federal_direct" },
      { delinquency_status: "default", loan_type: "federal_direct" },
      { delinquency_status: "default", loan_type: "parent_plus" },
      { delinquency_status: "current", loan_type: "federal_direct" },
      {
        delinquency_status: "90_plus",
        loan_type: "federal_direct",
        goals: ["improve_credit_score", "lower_monthly_payments"],
      },
    ];

    for (const override of scenarios) {
      const res = await request.post(`${BASE}/api/quiz`, {
        data: { ...validPayload, ...override },
      });
      expect(res.status()).toBe(200);
      const body = await res.json();
      expect(body.plan.recovery_path).toBeTruthy();
      expect(body.plan.steps.length).toBeGreaterThanOrEqual(3);
    }
  });
});

test.describe("API — /api/plan/[id]", () => {
  test("returns 404 for local plan IDs", async ({ request }) => {
    const res = await request.get(`${BASE}/api/plan/local-12345`);
    expect(res.status()).toBe(404);
    const body = await res.json();
    expect(body.error).toBeTruthy();
  });

  test("returns 404 or 503 for non-existent plan ID", async ({ request }) => {
    const res = await request.get(
      `${BASE}/api/plan/00000000-0000-0000-0000-000000000099`,
    );
    // 503 if Supabase not configured, 404 if configured but plan not found
    expect([404, 503]).toContain(res.status());
  });
});
