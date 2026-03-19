import { test, expect } from "@playwright/test";

test.describe("Checklist Engine — Onboard to Checklist Flow", () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage to start fresh
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
  });

  test("redirects to onboarding when no case exists", async ({ page }) => {
    await page.goto("/checklist");
    await expect(page.getByTestId("checklist-start-link")).toBeVisible();
    await expect(page.getByTestId("checklist-heading")).toHaveText(
      "Let's get you started",
    );
  });

  test("completes onboarding and sees personalized checklist", async ({
    page,
  }) => {
    await page.goto("/onboard");
    await expect(page.getByTestId("onboard-page")).toBeVisible();

    // Step 1: Select state
    await page.getByTestId("onboard-state-select").selectOption("CA");
    await page.getByTestId("onboard-continue-button").click();

    // Step 2: Select relationship
    await page.getByTestId("relationship-option-spouse").click();
    await page.getByTestId("onboard-continue-button").click();

    // Step 3: Select complexity
    await page.getByTestId("complexity-option-moderate").click();
    await page.getByTestId("onboard-continue-button").click();

    // Step 4: Enter date and submit
    await page.getByTestId("date-of-death-input").fill("2026-01-15");
    await page.getByTestId("deceased-name-input").fill("John Smith");
    await page.getByTestId("onboard-submit").click();

    // Should navigate to checklist page
    await expect(page).toHaveURL(/\/checklist/);
    await expect(page.getByTestId("checklist-page")).toBeVisible();
    await expect(page.getByTestId("checklist-heading")).toHaveText(
      "Your Estate Settlement Checklist",
    );
  });

  test("displays progress bar and checklist items", async ({ page }) => {
    // Complete onboarding first
    await page.goto("/onboard");
    await page.getByTestId("onboard-state-select").selectOption("NY");
    await page.getByTestId("onboard-continue-button").click();
    await page.getByTestId("relationship-option-child").click();
    await page.getByTestId("onboard-continue-button").click();
    await page.getByTestId("complexity-option-simple").click();
    await page.getByTestId("onboard-continue-button").click();
    await page.getByTestId("date-of-death-input").fill("2026-03-01");
    await page.getByTestId("onboard-submit").click();

    // Verify progress bar shows 0%
    await expect(page.getByTestId("checklist-progress")).toBeVisible();
    await expect(page.getByTestId("checklist-progress")).toContainText("0%");

    // Verify the immediate category is visible (default expanded)
    await expect(page.getByTestId("category-immediate")).toBeVisible();

    // Verify at least one checklist item is visible
    await expect(
      page.getByTestId("checklist-item-immediate-001"),
    ).toBeVisible();
  });

  test("toggles checklist items and persists across page refresh", async ({
    page,
  }) => {
    // Complete onboarding
    await page.goto("/onboard");
    await page.getByTestId("onboard-state-select").selectOption("TX");
    await page.getByTestId("onboard-continue-button").click();
    await page.getByTestId("relationship-option-sibling").click();
    await page.getByTestId("onboard-continue-button").click();
    await page.getByTestId("complexity-option-moderate").click();
    await page.getByTestId("onboard-continue-button").click();
    await page.getByTestId("date-of-death-input").fill("2026-02-15");
    await page.getByTestId("onboard-submit").click();
    await expect(page.getByTestId("checklist-page")).toBeVisible();

    // Check off 3 items
    await page.getByTestId("checklist-toggle-immediate-001").click();
    await page.getByTestId("checklist-toggle-immediate-002").click();
    await page.getByTestId("checklist-toggle-immediate-003").click();

    // Verify progress updated
    await expect(page.getByTestId("checklist-progress")).toContainText(
      "3 of",
    );

    // Refresh the page
    await page.reload();

    // Verify items are still checked after refresh
    await expect(page.getByTestId("checklist-page")).toBeVisible();
    await expect(page.getByTestId("checklist-progress")).toContainText(
      "3 of",
    );

    // Verify the checklist items show as completed (the toggle button
    // should contain the checkmark SVG when completed)
    const toggle1 = page.getByTestId("checklist-toggle-immediate-001");
    await expect(toggle1.locator("svg")).toBeVisible();
  });

  test("can skip and unskip items", async ({ page }) => {
    // Complete onboarding
    await page.goto("/onboard");
    await page.getByTestId("onboard-state-select").selectOption("FL");
    await page.getByTestId("onboard-continue-button").click();
    await page.getByTestId("relationship-option-parent").click();
    await page.getByTestId("onboard-continue-button").click();
    await page.getByTestId("complexity-option-simple").click();
    await page.getByTestId("onboard-continue-button").click();
    await page.getByTestId("date-of-death-input").fill("2026-03-10");
    await page.getByTestId("onboard-submit").click();

    // Skip an item
    await page.getByTestId("checklist-skip-immediate-001").click();
    await expect(
      page.getByTestId("checklist-skip-immediate-001"),
    ).toHaveText("Unskip");

    // Unskip it
    await page.getByTestId("checklist-skip-immediate-001").click();
    await expect(
      page.getByTestId("checklist-skip-immediate-001"),
    ).toHaveText("Skip");
  });

  test("can expand and collapse category sections", async ({ page }) => {
    // Complete onboarding
    await page.goto("/onboard");
    await page.getByTestId("onboard-state-select").selectOption("OH");
    await page.getByTestId("onboard-continue-button").click();
    await page.getByTestId("relationship-option-spouse").click();
    await page.getByTestId("onboard-continue-button").click();
    await page.getByTestId("complexity-option-moderate").click();
    await page.getByTestId("onboard-continue-button").click();
    await page.getByTestId("date-of-death-input").fill("2026-03-05");
    await page.getByTestId("onboard-submit").click();

    // Immediate section should be expanded by default
    await expect(
      page.getByTestId("checklist-item-immediate-001"),
    ).toBeVisible();

    // First Week section items should be hidden (collapsed by default)
    await expect(
      page.getByTestId("checklist-item-week-001"),
    ).not.toBeVisible();

    // Expand First Week section
    await page.getByTestId("category-toggle-first_week").click();
    await expect(page.getByTestId("checklist-item-week-001")).toBeVisible();

    // Collapse it
    await page.getByTestId("category-toggle-first_week").click();
    await expect(
      page.getByTestId("checklist-item-week-001"),
    ).not.toBeVisible();
  });

  test("shows state-specific items for community property states", async ({
    page,
  }) => {
    // Complete onboarding for California (community property state)
    await page.goto("/onboard");
    await page.getByTestId("onboard-state-select").selectOption("CA");
    await page.getByTestId("onboard-continue-button").click();
    await page.getByTestId("relationship-option-spouse").click();
    await page.getByTestId("onboard-continue-button").click();
    await page.getByTestId("complexity-option-moderate").click();
    await page.getByTestId("onboard-continue-button").click();
    await page.getByTestId("date-of-death-input").fill("2026-03-01");
    await page.getByTestId("onboard-submit").click();

    // Expand the First Month section to see community property item
    await page.getByTestId("category-toggle-first_month").click();
    await expect(
      page.getByTestId("checklist-item-month-010"),
    ).toBeVisible();
  });

  test("can expand checklist item to see details", async ({ page }) => {
    // Complete onboarding
    await page.goto("/onboard");
    await page.getByTestId("onboard-state-select").selectOption("GA");
    await page.getByTestId("onboard-continue-button").click();
    await page.getByTestId("relationship-option-child").click();
    await page.getByTestId("onboard-continue-button").click();
    await page.getByTestId("complexity-option-simple").click();
    await page.getByTestId("onboard-continue-button").click();
    await page.getByTestId("date-of-death-input").fill("2026-03-01");
    await page.getByTestId("onboard-submit").click();

    // Click on the first item to expand it
    await page.getByTestId("checklist-expand-immediate-001").click();

    // Should show the description and why it matters
    await expect(
      page.getByText("Why it matters:", { exact: false }),
    ).toBeVisible();
  });
});
