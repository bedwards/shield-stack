import { test, expect } from "@playwright/test";

test.describe("Quiz funnel flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#quiz");
  });

  test("quiz funnel is visible on landing page", async ({ page }) => {
    await expect(page.locator("[data-testid='quiz-funnel']")).toBeVisible();
    await expect(page.locator("[data-testid='quiz-progress']")).toBeVisible();
    await expect(page.locator("[data-testid='quiz-step-title']")).toBeVisible();
  });

  test("step 1: loan type selection enables Next button", async ({ page }) => {
    const nextBtn = page.locator("[data-testid='quiz-next']");
    // Next should be disabled initially
    await expect(nextBtn).toBeDisabled();

    // Select a loan type
    await page.locator("[data-testid='quiz-loan-type-federal_direct']").click();
    await expect(nextBtn).toBeEnabled();
  });

  test("step navigation: back button hidden on first step, visible after", async ({
    page,
  }) => {
    // Back button should be invisible on step 0
    const backBtn = page.locator("[data-testid='quiz-back']");
    await expect(backBtn).not.toBeVisible();

    // Advance to step 1
    await page.locator("[data-testid='quiz-loan-type-federal_direct']").click();
    await page.locator("[data-testid='quiz-next']").click();

    // Back button should now be visible
    await expect(backBtn).toBeVisible();
  });

  test("full quiz flow: complete all 5 steps and get plan", async ({
    page,
  }) => {
    // Step 0: Loan type
    await expect(page.locator("[data-testid='quiz-step-0']")).toBeVisible();
    await page.locator("[data-testid='quiz-loan-type-federal_direct']").click();
    await page.locator("[data-testid='quiz-next']").click();

    // Step 1: Servicer
    await expect(page.locator("[data-testid='quiz-step-1']")).toBeVisible();
    await page.locator("[data-testid='quiz-servicer-mohela']").click();
    await page.locator("[data-testid='quiz-next']").click();

    // Step 2: Delinquency status
    await expect(page.locator("[data-testid='quiz-step-2']")).toBeVisible();
    await page.locator("[data-testid='quiz-delinquency-90_plus']").click();
    await page.locator("[data-testid='quiz-next']").click();

    // Step 3: Score range
    await expect(page.locator("[data-testid='quiz-step-3']")).toBeVisible();
    await page.locator("[data-testid='quiz-score-range-500_579']").click();
    await page.locator("[data-testid='quiz-next']").click();

    // Step 4: Goals (multi-select)
    await expect(page.locator("[data-testid='quiz-step-4']")).toBeVisible();
    await page.locator("[data-testid='quiz-goal-improve_credit_score']").click();
    await page.locator("[data-testid='quiz-goal-get_out_of_default']").click();

    // Submit
    const submitBtn = page.locator("[data-testid='quiz-submit']");
    await expect(submitBtn).toBeEnabled();
    await submitBtn.click();

    // Should navigate to plan page
    await page.waitForURL(/\/plan\//, { timeout: 10000 });
    await expect(page.locator("[data-testid='plan-viewer']")).toBeVisible({
      timeout: 10000,
    });
    await expect(page.locator("[data-testid='plan-title']")).toBeVisible();
    await expect(page.locator("[data-testid='plan-steps']")).toBeVisible();
    await expect(
      page.locator("[data-testid='recovery-timeline']"),
    ).toBeVisible();
  });

  test("progress bar advances with each step", async ({ page }) => {
    // Step 0: should show 20%
    await expect(page.locator("[data-testid='quiz-progress']")).toContainText(
      "20%",
    );

    await page.locator("[data-testid='quiz-loan-type-federal_direct']").click();
    await page.locator("[data-testid='quiz-next']").click();

    // Step 1: should show 40%
    await expect(page.locator("[data-testid='quiz-progress']")).toContainText(
      "40%",
    );
  });

  test("goals step allows multi-select and deselect", async ({ page }) => {
    // Navigate to step 4
    await page.locator("[data-testid='quiz-loan-type-federal_direct']").click();
    await page.locator("[data-testid='quiz-next']").click();
    await page.locator("[data-testid='quiz-servicer-mohela']").click();
    await page.locator("[data-testid='quiz-next']").click();
    await page.locator("[data-testid='quiz-delinquency-90_plus']").click();
    await page.locator("[data-testid='quiz-next']").click();
    await page.locator("[data-testid='quiz-score-range-500_579']").click();
    await page.locator("[data-testid='quiz-next']").click();

    // Select two goals
    const goal1 = page.locator("[data-testid='quiz-goal-improve_credit_score']");
    const goal2 = page.locator("[data-testid='quiz-goal-get_out_of_default']");
    await goal1.click();
    await goal2.click();

    // Submit should be enabled
    await expect(page.locator("[data-testid='quiz-submit']")).toBeEnabled();

    // Deselect both
    await goal1.click();
    await goal2.click();

    // Submit should be disabled
    await expect(page.locator("[data-testid='quiz-submit']")).toBeDisabled();
  });
});
