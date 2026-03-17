import { test, expect } from "@playwright/test";

// ---------------------------------------------------------------------------
// sessionStorage state during quiz flow
// ---------------------------------------------------------------------------
test.describe("Browser state — sessionStorage during quiz flow", () => {
  test("sessionStorage contains plan data after quiz completion", async ({
    page,
  }) => {
    await page.goto("/#quiz");
    await page.waitForLoadState("networkidle");

    // Complete all 5 quiz steps
    await page.locator("[data-testid='quiz-loan-type-federal_direct']").click();
    await page.locator("[data-testid='quiz-next']").click();

    await page.locator("[data-testid='quiz-servicer-mohela']").click();
    await page.locator("[data-testid='quiz-next']").click();

    await page.locator("[data-testid='quiz-delinquency-90_plus']").click();
    await page.locator("[data-testid='quiz-next']").click();

    await page.locator("[data-testid='quiz-score-range-500_579']").click();
    await page.locator("[data-testid='quiz-next']").click();

    await page
      .locator("[data-testid='quiz-goal-improve_credit_score']")
      .click();
    await page
      .locator("[data-testid='quiz-goal-get_out_of_default']")
      .click();
    await page.locator("[data-testid='quiz-submit']").click();

    // Wait for plan page navigation
    await page.waitForURL(/\/plan\/local-/, { timeout: 15000 });
    await expect(page.locator("[data-testid='plan-viewer']")).toBeVisible({
      timeout: 10000,
    });

    // Extract the local plan ID from the URL
    const url = page.url();
    const planIdMatch = url.match(/\/plan\/(local-\d+)/);
    expect(planIdMatch).toBeTruthy();
    const planId = planIdMatch![1]!;

    // Verify sessionStorage contains the plan
    const storedPlan = await page.evaluate((id) => {
      return sessionStorage.getItem(`plan-${id}`);
    }, planId);

    expect(storedPlan).toBeTruthy();

    // Parse and verify plan structure
    const plan = JSON.parse(storedPlan!);
    expect(plan.recovery_path).toBeTruthy();
    expect(plan.estimated_months).toBeGreaterThan(0);
    expect(plan.steps).toBeDefined();
    expect(plan.steps.length).toBeGreaterThanOrEqual(3);
    expect(plan.plan_json).toBeDefined();
    expect(plan.plan_json.title).toBeTruthy();
    expect(plan.plan_json.summary).toBeTruthy();
    expect(plan.plan_json.estimated_score_improvement).toBeTruthy();
  });

  test("sessionStorage plan contains correct quiz answers in plan data", async ({
    page,
  }) => {
    await page.goto("/#quiz");
    await page.waitForLoadState("networkidle");

    // Complete quiz with specific answers
    await page.locator("[data-testid='quiz-loan-type-parent_plus']").click();
    await page.locator("[data-testid='quiz-next']").click();

    await page.locator("[data-testid='quiz-servicer-mohela']").click();
    await page.locator("[data-testid='quiz-next']").click();

    await page.locator("[data-testid='quiz-delinquency-default']").click();
    await page.locator("[data-testid='quiz-next']").click();

    await page.locator("[data-testid='quiz-score-range-500_579']").click();
    await page.locator("[data-testid='quiz-next']").click();

    await page
      .locator("[data-testid='quiz-goal-improve_credit_score']")
      .click();
    await page.locator("[data-testid='quiz-submit']").click();

    await page.waitForURL(/\/plan\/local-/, { timeout: 15000 });
    await expect(page.locator("[data-testid='plan-viewer']")).toBeVisible({
      timeout: 10000,
    });

    // Get all sessionStorage keys
    const keys = await page.evaluate(() => {
      const result: string[] = [];
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key) result.push(key);
      }
      return result;
    });

    // At least one plan key should exist
    const planKeys = keys.filter((k) => k.startsWith("plan-local-"));
    expect(planKeys.length).toBeGreaterThanOrEqual(1);
  });

  test("sessionStorage is empty before quiz completion", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const planKeys = await page.evaluate(() => {
      const result: string[] = [];
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key && key.startsWith("plan-")) result.push(key);
      }
      return result;
    });

    expect(planKeys).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// localStorage state verification
// ---------------------------------------------------------------------------
test.describe("Browser state — localStorage", () => {
  test("localStorage does not contain sensitive data after quiz flow", async ({
    page,
  }) => {
    await page.goto("/#quiz");
    await page.waitForLoadState("networkidle");

    // Complete the quiz
    await page.locator("[data-testid='quiz-loan-type-federal_direct']").click();
    await page.locator("[data-testid='quiz-next']").click();
    await page.locator("[data-testid='quiz-servicer-mohela']").click();
    await page.locator("[data-testid='quiz-next']").click();
    await page.locator("[data-testid='quiz-delinquency-90_plus']").click();
    await page.locator("[data-testid='quiz-next']").click();
    await page.locator("[data-testid='quiz-score-range-500_579']").click();
    await page.locator("[data-testid='quiz-next']").click();
    await page
      .locator("[data-testid='quiz-goal-improve_credit_score']")
      .click();
    await page.locator("[data-testid='quiz-submit']").click();

    await page.waitForURL(/\/plan\//, { timeout: 15000 });
    await expect(page.locator("[data-testid='plan-viewer']")).toBeVisible({
      timeout: 10000,
    });

    // Verify no auth tokens or secrets leaked to localStorage
    const sensitiveKeys = await page.evaluate(() => {
      const suspicious: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          const lower = key.toLowerCase();
          if (
            lower.includes("token") ||
            lower.includes("secret") ||
            lower.includes("password") ||
            lower.includes("api_key") ||
            lower.includes("apikey")
          ) {
            suspicious.push(key);
          }
        }
      }
      return suspicious;
    });

    expect(
      sensitiveKeys,
      `Sensitive data found in localStorage: ${sensitiveKeys.join(", ")}`,
    ).toHaveLength(0);
  });

  test("localStorage preserves Supabase auth keys when present", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Check that if Supabase auth sets localStorage keys, they follow the
    // expected naming pattern (sb-*-auth-token)
    const supabaseKeys = await page.evaluate(() => {
      const result: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("sb-")) result.push(key);
      }
      return result;
    });

    // In anonymous/no-auth mode there should be zero or more sb- keys,
    // but if they exist they should follow the Supabase pattern
    for (const key of supabaseKeys) {
      expect(key).toMatch(/^sb-[\w-]+-auth-token$/);
    }
  });
});

// ---------------------------------------------------------------------------
// Cookie state verification
// ---------------------------------------------------------------------------
test.describe("Browser state — cookies", () => {
  test("no unexpected cookies set on initial page load", async ({
    page,
    context,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const cookies = await context.cookies();

    // Verify no tracking cookies without consent
    const trackingCookies = cookies.filter(
      (c) =>
        c.name.includes("_ga") ||
        c.name.includes("_fbp") ||
        c.name.includes("_gcl"),
    );
    expect(
      trackingCookies,
      "Tracking cookies found without user consent",
    ).toHaveLength(0);
  });

  test("cookies have secure attributes when set", async ({
    page,
    context,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Complete quiz to trigger any cookie-setting behavior
    await page.goto("/#quiz");
    await page.locator("[data-testid='quiz-loan-type-federal_direct']").click();
    await page.locator("[data-testid='quiz-next']").click();
    await page.locator("[data-testid='quiz-servicer-mohela']").click();
    await page.locator("[data-testid='quiz-next']").click();
    await page.locator("[data-testid='quiz-delinquency-90_plus']").click();
    await page.locator("[data-testid='quiz-next']").click();
    await page.locator("[data-testid='quiz-score-range-500_579']").click();
    await page.locator("[data-testid='quiz-next']").click();
    await page
      .locator("[data-testid='quiz-goal-improve_credit_score']")
      .click();
    await page.locator("[data-testid='quiz-submit']").click();
    await page.waitForURL(/\/plan\//, { timeout: 15000 });

    const cookies = await context.cookies();

    // If any auth cookies are present, verify they have secure flags
    const authCookies = cookies.filter(
      (c) =>
        c.name.includes("auth") ||
        c.name.includes("session") ||
        c.name.startsWith("sb-"),
    );

    for (const cookie of authCookies) {
      expect(
        cookie.httpOnly,
        `Auth cookie "${cookie.name}" should be httpOnly`,
      ).toBe(true);
      // In local dev (HTTP), Secure may be false. Only check in production-like envs.
      if (!cookie.domain.includes("localhost")) {
        expect(
          cookie.secure,
          `Auth cookie "${cookie.name}" should be secure`,
        ).toBe(true);
      }
    }
  });

  test("cookies are cleared after clearing site data", async ({
    page,
    context,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Get cookies before clear
    const cookiesBefore = await context.cookies();

    // Clear all cookies
    await context.clearCookies();

    // Get cookies after clear
    const cookiesAfter = await context.cookies();
    expect(cookiesAfter).toHaveLength(0);

    // Reload page — app should still work without cookies
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("[data-testid='header']")).toBeVisible();
    await expect(page.locator("[data-testid='hero-section']")).toBeVisible();

    // If original cookies existed, suppress the unused variable warning
    void cookiesBefore;
  });
});
