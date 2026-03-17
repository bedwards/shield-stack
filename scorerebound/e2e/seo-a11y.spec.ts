import { test, expect } from "@playwright/test";

test.describe("SEO & accessibility", () => {
  test("page has correct meta title", async ({ page }) => {
    await page.goto("/");
    const title = await page.title();
    expect(title).toContain("ScoreRebound");
  });

  test("page has meta description", async ({ page }) => {
    await page.goto("/");
    const metaDescription = page.locator('meta[name="description"]');
    const content = await metaDescription.getAttribute("content");
    expect(content).toBeTruthy();
    expect(content).toContain("credit score");
    expect(content).toContain("student loan");
  });

  test("page has lang attribute on html", async ({ page }) => {
    await page.goto("/");
    const lang = await page.locator("html").getAttribute("lang");
    expect(lang).toBe("en");
  });

  test("heading hierarchy is correct (h1 then h2s)", async ({ page }) => {
    await page.goto("/");

    // Exactly one h1
    const h1s = page.locator("h1");
    await expect(h1s).toHaveCount(1);
    await expect(h1s.first()).toContainText("credit score");

    // Multiple h2 sections
    const h2s = page.locator("h2");
    const h2Count = await h2s.count();
    expect(h2Count).toBeGreaterThanOrEqual(3);
  });

  test("logo SVG has aria-hidden for accessibility", async ({ page }) => {
    await page.goto("/");
    const logoIcon = page.getByTestId("logo-icon");
    await expect(logoIcon).toHaveAttribute("aria-hidden", "true");
  });

  test("all sections have data-testid attributes for LLM testability", async ({
    page,
  }) => {
    await page.goto("/");

    const requiredTestIds = [
      "header",
      "main-nav",
      "main-content",
      "hero-section",
      "stats-section",
      "how-it-works-section",
      "recovery-paths-section",
      "faq-section",
      "cta-section",
      "footer",
    ];

    for (const testId of requiredTestIds) {
      await expect(
        page.getByTestId(testId),
        `Missing data-testid="${testId}"`
      ).toBeAttached();
    }
  });

  test("sticky header remains visible on scroll", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(300);

    const header = page.getByTestId("header");
    await expect(header).toBeVisible();
  });

  test("no broken images on the page", async ({ page }) => {
    await page.goto("/");
    const images = page.locator("img");
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const naturalWidth = await img.evaluate(
        (el: HTMLImageElement) => el.naturalWidth
      );
      expect(naturalWidth, `Image ${i} is broken`).toBeGreaterThan(0);
    }
  });
});
