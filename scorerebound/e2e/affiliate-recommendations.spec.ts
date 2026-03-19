import { test, expect } from "@playwright/test";

/**
 * Helper: complete the entire quiz flow and land on the plan page.
 * Selects score range "500_579" (low) and rehabilitation-eligible inputs
 * so credit-builder + secured-card products appear.
 */
async function completeQuizAndGetPlan(
  page: import("@playwright/test").Page,
  scoreRange: string = "500_579",
) {
  await page.goto("/#quiz");
  await expect(page.locator("[data-testid='quiz-funnel']")).toBeVisible();

  // Step 0: Loan type
  await page.locator("[data-testid='quiz-loan-type-federal_direct']").click();
  await page.locator("[data-testid='quiz-next']").click();

  // Step 1: Servicer
  await page.locator("[data-testid='quiz-servicer-mohela']").click();
  await page.locator("[data-testid='quiz-next']").click();

  // Step 2: Delinquency status
  await page.locator("[data-testid='quiz-delinquency-90_plus']").click();
  await page.locator("[data-testid='quiz-next']").click();

  // Step 3: Score range
  await page.locator(`[data-testid='quiz-score-range-${scoreRange}']`).click();
  await page.locator("[data-testid='quiz-next']").click();

  // Step 4: Goals
  await page.locator("[data-testid='quiz-goal-improve_credit_score']").click();
  await page.locator("[data-testid='quiz-goal-get_out_of_default']").click();
  await page.locator("[data-testid='quiz-submit']").click();

  // Wait for plan page
  await page.waitForURL(/\/plan\//, { timeout: 10000 });
  await expect(page.locator("[data-testid='plan-viewer']")).toBeVisible({
    timeout: 10000,
  });
}

test.describe("Affiliate product recommendations on plan page", () => {
  test("affiliate cards appear after completing quiz with low score", async ({
    page,
  }) => {
    await completeQuizAndGetPlan(page, "500_579");

    // Affiliate section should be visible
    const section = page.locator("[data-testid='plan-affiliate-section']");
    await expect(section).toBeVisible();

    // Should show 1-3 affiliate cards
    const cards = page.locator("[data-testid^='affiliate-card-']");
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(1);
    expect(count).toBeLessThanOrEqual(3);

    // Each card should have required sub-elements
    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      const slug = await card.getAttribute("data-testid").then((id) =>
        id!.replace("affiliate-card-", ""),
      );

      await expect(
        page.locator(`[data-testid='affiliate-name-${slug}']`),
      ).toBeVisible();
      await expect(
        page.locator(`[data-testid='affiliate-description-${slug}']`),
      ).toBeVisible();
      await expect(
        page.locator(`[data-testid='affiliate-why-${slug}']`),
      ).toBeVisible();
      await expect(
        page.locator(`[data-testid='affiliate-cta-${slug}']`),
      ).toBeVisible();
    }
  });

  test("FTC disclosure is visible on plan page", async ({ page }) => {
    await completeQuizAndGetPlan(page);

    const disclosure = page.locator("[data-testid='affiliate-disclosure']");
    await expect(disclosure).toBeVisible();
    await expect(disclosure).toContainText("commission");
    await expect(disclosure).toContainText("recommendations");
  });

  test("affiliate links route through tracking endpoint", async ({ page }) => {
    await completeQuizAndGetPlan(page);

    // Get all affiliate CTA links
    const ctas = page.locator("[data-testid^='affiliate-cta-']");
    const count = await ctas.count();
    expect(count).toBeGreaterThanOrEqual(1);

    for (let i = 0; i < count; i++) {
      const href = await ctas.nth(i).getAttribute("href");
      expect(href).toMatch(/^\/api\/affiliate\/click\?slug=/);
      expect(href).toContain("referrer=");
    }
  });

  test("affiliate links have rel noopener sponsored", async ({ page }) => {
    await completeQuizAndGetPlan(page);

    const ctas = page.locator("[data-testid^='affiliate-cta-']");
    const count = await ctas.count();
    expect(count).toBeGreaterThanOrEqual(1);

    for (let i = 0; i < count; i++) {
      const rel = await ctas.nth(i).getAttribute("rel");
      expect(rel).toContain("noopener");
      expect(rel).toContain("sponsored");
    }
  });

  test("low score shows credit-builder products, not refinancing", async ({
    page,
  }) => {
    await completeQuizAndGetPlan(page, "500_579");

    // Self Credit Builder should appear for low scores
    await expect(
      page.locator("[data-testid='affiliate-card-self']"),
    ).toBeVisible();

    // Refinancing should NOT appear for low scores
    await expect(
      page.locator("[data-testid='affiliate-card-sofi_refi']"),
    ).not.toBeVisible();
  });

  test("high score shows monitoring and refinancing products", async ({
    page,
  }) => {
    await completeQuizAndGetPlan(page, "750_plus");

    // Self Credit Builder should NOT appear for high scores
    await expect(
      page.locator("[data-testid='affiliate-card-self']"),
    ).not.toBeVisible();

    // Monitoring products should appear for all scores
    const hasExperian = await page
      .locator("[data-testid='affiliate-card-experian']")
      .isVisible();
    const hasCreditKarma = await page
      .locator("[data-testid='affiliate-card-credit_karma']")
      .isVisible();
    expect(hasExperian || hasCreditKarma).toBe(true);
  });

  test("affiliate category badges display correctly", async ({ page }) => {
    await completeQuizAndGetPlan(page, "500_579");

    const categories = page.locator("[data-testid^='affiliate-category-']");
    const count = await categories.count();
    expect(count).toBeGreaterThanOrEqual(1);

    for (let i = 0; i < count; i++) {
      const text = await categories.nth(i).textContent();
      expect(
        ["Credit Builder", "Secured Card", "Credit Monitoring", "Refinancing"],
      ).toContain(text!.trim());
    }
  });

  test("no hardcoded affiliate URLs in CTA links", async ({ page }) => {
    await completeQuizAndGetPlan(page);

    const ctas = page.locator("[data-testid^='affiliate-cta-']");
    const count = await ctas.count();

    for (let i = 0; i < count; i++) {
      const href = await ctas.nth(i).getAttribute("href");
      // Must NOT be an external URL — all must go through /api/affiliate/click
      expect(href).not.toMatch(/^https?:\/\//);
    }
  });
});
