import { test, expect } from "@playwright/test";

test.describe("Section content verification", () => {
  test("stats section shows correct values", async ({ page }) => {
    await page.goto("/");

    const borrowers = page.getByTestId("stat-borrowers");
    await expect(borrowers).toContainText("2.2M+");
    await expect(borrowers).toContainText("Borrowers affected");

    const scoreDrop = page.getByTestId("stat-score-drop");
    await expect(scoreDrop).toContainText("100+");
    await expect(scoreDrop).toContainText("credit score points lost");

    const recoveryTime = page.getByTestId("stat-recovery-time");
    await expect(recoveryTime).toContainText("9-12 mo");
    await expect(recoveryTime).toContainText("recovery timeline");
  });

  test("how-it-works section has 3 steps with correct content", async ({
    page,
  }) => {
    await page.goto("/");

    const section = page.getByTestId("how-it-works-section");
    await expect(section).toBeVisible();
    await expect(section).toContainText("How ScoreRebound Works");

    const step1 = page.getByTestId("step-1");
    await expect(step1).toContainText("Take the Quiz");
    await expect(step1).toContainText("5 quick questions");

    const step2 = page.getByTestId("step-2");
    await expect(step2).toContainText("Get Your Plan");
    await expect(step2).toContainText("personalized recovery roadmap");

    const step3 = page.getByTestId("step-3");
    await expect(step3).toContainText("Track Progress");
    await expect(step3).toContainText("credit score recover");
  });

  test("recovery paths section has 3 cards with correct info", async ({
    page,
  }) => {
    await page.goto("/");

    const section = page.getByTestId("recovery-paths-section");
    await expect(section).toBeVisible();
    await expect(section).toContainText("Recovery Paths");

    const ibr = page.getByTestId("path-ibr");
    await expect(ibr).toContainText("Income-Based Repayment");
    await expect(ibr).toContainText("monthly payment based on income");

    const rehab = page.getByTestId("path-rehabilitation");
    await expect(rehab).toContainText("Loan Rehabilitation");
    await expect(rehab).toContainText("9 on-time payments");

    const consol = page.getByTestId("path-consolidation");
    await expect(consol).toContainText("Consolidation");
    await expect(consol).toContainText("Combine multiple loans");
  });

  test("hero badge displays free-for-all messaging", async ({ page }) => {
    await page.goto("/");

    const badge = page.getByTestId("hero-badge");
    await expect(badge).toBeVisible();
    await expect(badge).toContainText("Free for all borrowers");
  });

  test("hero description mentions quiz and recovery options", async ({
    page,
  }) => {
    await page.goto("/");

    const desc = page.getByTestId("hero-description");
    await expect(desc).toContainText("2-minute quiz");
    await expect(desc).toContainText("IBR enrollment");
    await expect(desc).toContainText("loan rehabilitation");
    await expect(desc).toContainText("consolidation");
  });

  test("CTA section has correct messaging", async ({ page }) => {
    await page.goto("/");

    const ctaSection = page.getByTestId("cta-section");
    await expect(ctaSection).toContainText("Ready to start your recovery?");
    await expect(ctaSection).toContainText("free 2-minute quiz");
    await expect(ctaSection).toContainText("No signup required");
  });

  test("footer copyright includes current year and disclaimer", async ({
    page,
  }) => {
    await page.goto("/");

    const copyright = page.getByTestId("footer-copyright");
    const year = new Date().getFullYear().toString();
    await expect(copyright).toContainText(year);
    await expect(copyright).toContainText("Not financial advice");
  });
});
