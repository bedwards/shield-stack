import { test, expect } from "@playwright/test";

/**
 * Testability audit — verifies the product follows LLM-testable design:
 * - data-testid attributes on all interactive elements
 * - No console errors
 * - No broken images
 * - Accessible markup
 * - Mobile responsiveness
 */

const REQUIRED_TEST_IDS = [
  // Header / Nav
  "header",
  "main-nav",
  "logo-link",
  "logo-icon",
  "nav-how-it-works",
  "nav-recovery-paths",
  "nav-faq",
  "nav-cta",
  // Hero
  "hero-section",
  "hero-badge",
  "hero-title",
  "hero-description",
  "hero-cta-primary",
  "hero-cta-secondary",
  // Stats
  "stats-section",
  "stat-borrowers",
  "stat-score-drop",
  "stat-recovery-time",
  // How It Works
  "how-it-works-section",
  "step-1",
  "step-2",
  "step-3",
  // Recovery Paths
  "recovery-paths-section",
  "path-ibr",
  "path-ibr-link",
  "path-rehabilitation",
  "path-rehabilitation-link",
  "path-consolidation",
  "path-consolidation-link",
  // CTA / Quiz
  "cta-section",
  "quiz-funnel",
  // Footer
  "footer",
  "footer-link-ibr",
  "footer-link-rehabilitation",
  "footer-link-consolidation",
  "footer-link-credit-building",
  "footer-link-servicers",
  "footer-link-privacy",
  "footer-link-terms",
  "footer-copyright",
  // Main
  "main-content",
];

test.describe("Testability audit", () => {
  test("all required data-testid attributes are present on the page", async ({
    page,
  }) => {
    await page.goto("/");

    const missing: string[] = [];
    for (const id of REQUIRED_TEST_IDS) {
      const count = await page.locator(`[data-testid='${id}']`).count();
      if (count === 0) {
        missing.push(id);
      }
    }

    expect(missing, `Missing data-testid: ${missing.join(", ")}`).toEqual([]);
  });

  test("no console errors on page load", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    expect(
      errors.filter((e) => !e.includes("favicon")),
      `Console errors: ${errors.join("; ")}`,
    ).toEqual([]);
  });

  test("page has correct meta title and description", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/ScoreRebound/);
    const description = await page
      .locator('meta[name="description"]')
      .getAttribute("content");
    expect(description).toBeTruthy();
    expect(description!.length).toBeGreaterThan(50);
  });

  test("page has semantic HTML structure", async ({ page }) => {
    await page.goto("/");
    // header, main, footer exist
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
    // nav inside header
    await expect(page.locator("header nav")).toBeVisible();
    // At least one h1
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBe(1);
  });

  test("mobile viewport renders without horizontal overflow", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1); // 1px tolerance
  });

  test("all links have non-empty href", async ({ page }) => {
    await page.goto("/");
    const links = page.locator("a");
    const count = await links.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const href = await links.nth(i).getAttribute("href");
      expect(href, `Link ${i} has empty/missing href`).toBeTruthy();
    }
  });

  test("no broken images", async ({ page }) => {
    await page.goto("/");
    const images = page.locator("img");
    const count = await images.count();

    // If there are images, verify they loaded
    for (let i = 0; i < count; i++) {
      const naturalWidth = await images
        .nth(i)
        .evaluate((el: HTMLImageElement) => el.naturalWidth);
      expect(naturalWidth, `Image ${i} failed to load`).toBeGreaterThan(0);
    }
  });
});
