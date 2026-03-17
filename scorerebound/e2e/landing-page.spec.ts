import { test, expect } from "@playwright/test";

test.describe("Landing page — all sections render", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("stats section shows key numbers", async ({ page }) => {
    const stats = page.locator("[data-testid='stats-section']");
    await expect(stats).toBeVisible();
    await expect(page.locator("[data-testid='stat-borrowers']")).toContainText(
      "2.2M",
    );
    await expect(page.locator("[data-testid='stat-score-drop']")).toContainText(
      "100+",
    );
    await expect(
      page.locator("[data-testid='stat-recovery-time']"),
    ).toContainText("9-12");
  });

  test("how-it-works section has 3 steps", async ({ page }) => {
    const section = page.locator("[data-testid='how-it-works-section']");
    await expect(section).toBeVisible();
    await expect(page.locator("[data-testid='step-1']")).toBeVisible();
    await expect(page.locator("[data-testid='step-2']")).toBeVisible();
    await expect(page.locator("[data-testid='step-3']")).toBeVisible();
  });

  test("recovery paths section shows 3 paths with links", async ({ page }) => {
    const section = page.locator("[data-testid='recovery-paths-section']");
    await expect(section).toBeVisible();

    for (const path of ["ibr", "rehabilitation", "consolidation"]) {
      await expect(
        page.locator(`[data-testid='path-${path}']`),
      ).toBeVisible();
      await expect(
        page.locator(`[data-testid='path-${path}-link']`),
      ).toBeVisible();
    }
  });

  test("CTA section has quiz funnel", async ({ page }) => {
    await expect(
      page.locator("[data-testid='cta-section']"),
    ).toBeVisible();
    await expect(
      page.locator("[data-testid='quiz-funnel']"),
    ).toBeVisible();
  });

  test("footer has all expected links", async ({ page }) => {
    const footer = page.locator("[data-testid='footer']");
    await expect(footer).toBeVisible();

    const footerLinks = [
      "footer-link-ibr",
      "footer-link-rehabilitation",
      "footer-link-consolidation",
      "footer-link-faq",
      "footer-link-about",
      "footer-link-servicers",
      "footer-link-privacy",
      "footer-link-terms",
    ];

    for (const testid of footerLinks) {
      await expect(page.locator(`[data-testid='${testid}']`)).toBeVisible();
    }

    await expect(
      page.locator("[data-testid='footer-copyright']"),
    ).toContainText("ScoreRebound");
  });

  test("hero badge shows free messaging", async ({ page }) => {
    await expect(
      page.locator("[data-testid='hero-badge']"),
    ).toContainText("Free");
  });

  test("hero description mentions quiz and recovery plan", async ({
    page,
  }) => {
    await expect(
      page.locator("[data-testid='hero-description']"),
    ).toContainText("quiz");
    await expect(
      page.locator("[data-testid='hero-description']"),
    ).toContainText("recovery plan");
  });
});

test.describe("Landing page — anchor navigation", () => {
  test("hero CTA scrolls to quiz section", async ({ page }) => {
    await page.goto("/");
    const cta = page.locator("[data-testid='hero-cta-primary']");
    await cta.click();
    // Verify the URL fragment changed to #quiz
    await expect(page).toHaveURL(/#quiz/);
  });

  test("secondary CTA links to how-it-works", async ({ page }) => {
    await page.goto("/");
    const cta = page.locator("[data-testid='hero-cta-secondary']");
    await expect(cta).toHaveAttribute("href", "#how-it-works");
  });

  test("nav links have correct anchor hrefs", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.locator("[data-testid='nav-how-it-works']"),
    ).toHaveAttribute("href", "#how-it-works");
    await expect(
      page.locator("[data-testid='nav-recovery-paths']"),
    ).toHaveAttribute("href", "#recovery-paths");
    await expect(page.locator("[data-testid='nav-faq']")).toHaveAttribute(
      "href",
      "#faq",
    );
    await expect(page.locator("[data-testid='nav-cta']")).toHaveAttribute(
      "href",
      "#quiz",
    );
  });
});
