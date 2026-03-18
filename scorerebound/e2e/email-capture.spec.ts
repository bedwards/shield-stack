import { test, expect } from "@playwright/test";

test.describe("Email Capture Flow", () => {
  // Complete the quiz to reach the plan page where email capture lives
  async function completeQuizAndGetPlanPage(page: import("@playwright/test").Page) {
    await page.goto("/");

    // Step 1: Loan Type
    await page.getByTestId("quiz-loan-type-federal_direct").click();
    await page.getByTestId("quiz-next").click();

    // Step 2: Servicer
    await page.getByTestId("quiz-servicer-mohela").click();
    await page.getByTestId("quiz-next").click();

    // Step 3: Delinquency Status
    await page.getByTestId("quiz-delinquency-90_plus").click();
    await page.getByTestId("quiz-next").click();

    // Step 4: Score Range
    await page.getByTestId("quiz-score-range-500_579").click();
    await page.getByTestId("quiz-next").click();

    // Step 5: Goals
    await page.getByTestId("quiz-goal-improve_credit_score").click();
    await page.getByTestId("quiz-submit").click();

    // Wait for plan page to load
    await page.waitForURL(/\/plan\//, { timeout: 15000 });
    await expect(page.getByTestId("plan-viewer")).toBeVisible({ timeout: 10000 });
  }

  test.beforeEach(async ({ page }) => {
    await completeQuizAndGetPlanPage(page);
  });

  test("email capture section is visible on plan page", async ({ page }) => {
    await expect(page.getByTestId("email-capture-section")).toBeVisible();
    await expect(page.getByTestId("email-capture-title")).toBeVisible();
    await expect(page.getByTestId("email-capture-title")).toContainText(
      "Get recovery tips in your inbox",
    );
  });

  test("email capture form has required elements", async ({ page }) => {
    await expect(page.getByTestId("email-capture-form")).toBeVisible();
    await expect(page.getByTestId("email-capture-input")).toBeVisible();
    await expect(page.getByTestId("email-capture-submit")).toBeVisible();
    await expect(page.getByTestId("email-capture-submit")).toContainText("Send Me Tips");
  });

  test("email input accepts text and has email type", async ({ page }) => {
    const input = page.getByTestId("email-capture-input");
    await expect(input).toHaveAttribute("type", "email");
    await expect(input).toHaveAttribute("placeholder", "you@example.com");

    await input.fill("test@example.com");
    await expect(input).toHaveValue("test@example.com");
  });

  test("email capture form shows validation for empty input", async ({ page }) => {
    // The browser's built-in validation should prevent empty submission
    const input = page.getByTestId("email-capture-input");
    await expect(input).toHaveAttribute("required", "");
  });

  test("email capture form submits successfully", async ({ page }) => {
    // Intercept the subscribe API call
    await page.route("/api/email/subscribe", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    const input = page.getByTestId("email-capture-input");
    await input.fill("recovery@example.com");
    await page.getByTestId("email-capture-submit").click();

    // Should show success message
    await expect(page.getByTestId("email-capture-success")).toBeVisible({ timeout: 5000 });
    await expect(page.getByTestId("email-capture-success")).toContainText("Check your inbox");
  });

  test("email capture form shows error on failure", async ({ page }) => {
    // Mock API failure
    await page.route("/api/email/subscribe", async (route) => {
      await route.fulfill({
        status: 400,
        contentType: "application/json",
        body: JSON.stringify({ error: "A valid email address is required" }),
      });
    });

    const input = page.getByTestId("email-capture-input");
    await input.fill("bad-email");
    // Override browser validation to test server-side
    await page.evaluate(() => {
      const form = document.querySelector('[data-testid="email-capture-form"]') as HTMLFormElement;
      form?.setAttribute("novalidate", "true");
    });
    await page.getByTestId("email-capture-submit").click();

    // Should show error message
    await expect(page.getByTestId("email-capture-error")).toBeVisible({ timeout: 5000 });
  });

  test("submit button shows loading state", async ({ page }) => {
    // Delay the API response to observe loading state
    await page.route("/api/email/subscribe", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    await page.getByTestId("email-capture-input").fill("test@example.com");
    await page.getByTestId("email-capture-submit").click();

    // Should show "Subscribing..." during submission
    await expect(page.getByTestId("email-capture-submit")).toContainText("Subscribing...");
  });

  test("email capture screenshot", async ({ page }) => {
    await page.screenshot({
      path: "e2e/screenshots/email-capture.png",
      fullPage: false,
    });
  });
});
