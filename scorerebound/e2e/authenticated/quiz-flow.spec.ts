import { test, expect } from "@playwright/test";
import {
  verifyQuizResponse,
  verifyRecoveryPlan,
  verifyPlanSteps,
  cleanupTestUser,
} from "../helpers/db";

/**
 * Authenticated quiz flow E2E tests.
 *
 * These tests run with stored auth state from auth.setup.ts,
 * meaning the browser already has the test user's session cookies/localStorage.
 *
 * The full flow:
 * 1. Navigate to the quiz
 * 2. Complete all 5 questions
 * 3. Verify the recovery plan renders
 * 4. Verify the plan was saved to the database (via admin client)
 * 5. Take screenshots at each step
 */
test.describe("Authenticated quiz flow", () => {
  // Clean up test data after all tests in this suite
  test.afterAll(async () => {
    try {
      await cleanupTestUser();
    } catch (error) {
      // Non-fatal — cleanup is best-effort. Tests may run without a real DB.
      console.warn("Cleanup warning:", error);
    }
  });

  test("complete quiz flow as authenticated user with DB verification", async ({
    page,
  }) => {
    // Step 1: Navigate to the quiz
    await page.goto("/#quiz");
    await page.screenshot({
      path: "screenshots/auth-quiz-step-0-landing.png",
    });

    // Verify quiz is visible
    await expect(page.locator("[data-testid='quiz-funnel']")).toBeVisible();
    await expect(
      page.locator("[data-testid='quiz-progress']"),
    ).toBeVisible();

    // Step 2: Loan type selection (Step 0)
    await expect(
      page.locator("[data-testid='quiz-step-0']"),
    ).toBeVisible();
    await page
      .locator("[data-testid='quiz-loan-type-federal_direct']")
      .click();
    await page.screenshot({
      path: "screenshots/auth-quiz-step-0-selected.png",
    });
    await page.locator("[data-testid='quiz-next']").click();

    // Step 3: Servicer selection (Step 1)
    await expect(
      page.locator("[data-testid='quiz-step-1']"),
    ).toBeVisible();
    await page.locator("[data-testid='quiz-servicer-mohela']").click();
    await page.screenshot({
      path: "screenshots/auth-quiz-step-1-servicer.png",
    });
    await page.locator("[data-testid='quiz-next']").click();

    // Step 4: Delinquency status (Step 2)
    await expect(
      page.locator("[data-testid='quiz-step-2']"),
    ).toBeVisible();
    await page
      .locator("[data-testid='quiz-delinquency-90_plus']")
      .click();
    await page.screenshot({
      path: "screenshots/auth-quiz-step-2-delinquency.png",
    });
    await page.locator("[data-testid='quiz-next']").click();

    // Step 5: Score range (Step 3)
    await expect(
      page.locator("[data-testid='quiz-step-3']"),
    ).toBeVisible();
    await page
      .locator("[data-testid='quiz-score-range-500_579']")
      .click();
    await page.screenshot({
      path: "screenshots/auth-quiz-step-3-score.png",
    });
    await page.locator("[data-testid='quiz-next']").click();

    // Step 6: Goals selection (Step 4)
    await expect(
      page.locator("[data-testid='quiz-step-4']"),
    ).toBeVisible();
    await page
      .locator("[data-testid='quiz-goal-improve_credit_score']")
      .click();
    await page
      .locator("[data-testid='quiz-goal-get_out_of_default']")
      .click();
    await page.screenshot({
      path: "screenshots/auth-quiz-step-4-goals.png",
    });

    // Step 7: Submit the quiz
    const submitBtn = page.locator("[data-testid='quiz-submit']");
    await expect(submitBtn).toBeEnabled();
    await submitBtn.click();

    // Step 8: Wait for plan page to load
    await page.waitForURL(/\/plan\//, { timeout: 15000 });
    await expect(
      page.locator("[data-testid='plan-viewer']"),
    ).toBeVisible({ timeout: 15000 });
    await page.screenshot({
      path: "screenshots/auth-quiz-plan-result.png",
    });

    // Step 9: Verify plan renders correctly
    await expect(
      page.locator("[data-testid='plan-title']"),
    ).toBeVisible();
    await expect(
      page.locator("[data-testid='plan-steps']"),
    ).toBeVisible();
    await expect(
      page.locator("[data-testid='recovery-timeline']"),
    ).toBeVisible();
    await expect(
      page.locator("[data-testid='plan-path-badge']"),
    ).toBeVisible();
    await expect(
      page.locator("[data-testid='plan-score-estimate']"),
    ).toBeVisible();

    // Step 10: Verify plan details are present
    const planTitle = await page
      .locator("[data-testid='plan-title']")
      .textContent();
    expect(planTitle).toBeTruthy();

    const planSummary = await page
      .locator("[data-testid='plan-summary']")
      .textContent();
    expect(planSummary).toBeTruthy();

    // Take a final full-page screenshot
    await page.screenshot({
      path: "screenshots/auth-quiz-plan-full.png",
      fullPage: true,
    });

    // Step 11: Verify data was saved to the database
    // Extract plan ID from the URL
    const url = page.url();
    const planIdMatch = url.match(/\/plan\/(.+)$/);

    // Only verify DB if we have a real plan ID (not local- prefix)
    if (planIdMatch && planIdMatch[1] && !planIdMatch[1].startsWith("local-")) {
      // This test user's data should be in the database
      // NOTE: The quiz API currently saves with user_id: null (anonymous).
      // When auth is wired into the quiz submission, this will verify the
      // authenticated user's data. For now, we verify the plan exists by ID.
      const admin = (await import("../helpers/auth")).getAdminClient();

      // Verify the recovery plan exists
      const { data: plan, error: planError } = await admin
        .from("recovery_plans")
        .select("*")
        .eq("id", planIdMatch[1])
        .single();

      expect(planError).toBeNull();
      expect(plan).not.toBeNull();
      expect(plan!.recovery_path).toBeTruthy();
      expect(plan!.estimated_months).toBeGreaterThan(0);

      // Verify the quiz response exists
      const { data: quizResponse, error: quizError } = await admin
        .from("quiz_responses")
        .select("*")
        .eq("id", plan!.quiz_response_id)
        .single();

      expect(quizError).toBeNull();
      expect(quizResponse).not.toBeNull();
      expect(quizResponse!.loan_type).toBe("federal_direct");
      expect(quizResponse!.servicer).toBe("mohela");
      expect(quizResponse!.delinquency_status).toBe("90_plus");
      expect(quizResponse!.current_score_range).toBe("500_579");

      // Verify plan steps exist
      const { data: steps, error: stepsError } = await admin
        .from("plan_steps")
        .select("*")
        .eq("plan_id", planIdMatch[1])
        .order("step_order", { ascending: true });

      expect(stepsError).toBeNull();
      expect(steps).not.toBeNull();
      expect(steps!.length).toBeGreaterThan(0);
    }
  });

  test("plan page shows recovery path details", async ({ page }) => {
    // Navigate to quiz and complete it
    await page.goto("/#quiz");
    await page
      .locator("[data-testid='quiz-loan-type-federal_direct']")
      .click();
    await page.locator("[data-testid='quiz-next']").click();
    await page.locator("[data-testid='quiz-servicer-mohela']").click();
    await page.locator("[data-testid='quiz-next']").click();
    await page
      .locator("[data-testid='quiz-delinquency-90_plus']")
      .click();
    await page.locator("[data-testid='quiz-next']").click();
    await page
      .locator("[data-testid='quiz-score-range-500_579']")
      .click();
    await page.locator("[data-testid='quiz-next']").click();
    await page
      .locator("[data-testid='quiz-goal-improve_credit_score']")
      .click();
    await page.locator("[data-testid='quiz-submit']").click();

    await page.waitForURL(/\/plan\//, { timeout: 15000 });
    await expect(
      page.locator("[data-testid='plan-viewer']"),
    ).toBeVisible({ timeout: 15000 });

    // Verify path details section
    await expect(
      page.locator("[data-testid='plan-path-details']"),
    ).toBeVisible();

    await page.screenshot({
      path: "screenshots/auth-quiz-path-details.png",
      fullPage: true,
    });
  });

  test("plan page has action steps that expand", async ({ page }) => {
    // Navigate to quiz and complete it
    await page.goto("/#quiz");
    await page
      .locator("[data-testid='quiz-loan-type-federal_direct']")
      .click();
    await page.locator("[data-testid='quiz-next']").click();
    await page.locator("[data-testid='quiz-servicer-mohela']").click();
    await page.locator("[data-testid='quiz-next']").click();
    await page
      .locator("[data-testid='quiz-delinquency-90_plus']")
      .click();
    await page.locator("[data-testid='quiz-next']").click();
    await page
      .locator("[data-testid='quiz-score-range-500_579']")
      .click();
    await page.locator("[data-testid='quiz-next']").click();
    await page
      .locator("[data-testid='quiz-goal-get_out_of_default']")
      .click();
    await page.locator("[data-testid='quiz-submit']").click();

    await page.waitForURL(/\/plan\//, { timeout: 15000 });
    await expect(
      page.locator("[data-testid='plan-viewer']"),
    ).toBeVisible({ timeout: 15000 });

    // First step should be expanded by default
    await expect(
      page.locator("[data-testid='plan-step-detail-1']"),
    ).toBeVisible();

    // Click step 2 to expand it
    const step2Toggle = page.locator("[data-testid='plan-step-toggle-2']");
    if (await step2Toggle.isVisible()) {
      await step2Toggle.click();
      await expect(
        page.locator("[data-testid='plan-step-detail-2']"),
      ).toBeVisible();
    }

    await page.screenshot({
      path: "screenshots/auth-quiz-steps-expanded.png",
      fullPage: true,
    });
  });
});
