import { test, expect } from "@playwright/test";

test.describe("LemonLens Smoke Tests", () => {
  test("landing page loads and displays hero", async ({ page }) => {
    await page.goto("/");

    // Verify core layout elements
    await expect(page.getByTestId("header")).toBeVisible();
    await expect(page.getByTestId("main-content")).toBeVisible();
    await expect(page.getByTestId("footer")).toBeVisible();

    // Verify hero section
    await expect(page.getByTestId("hero-title")).toBeVisible();
    await expect(page.getByTestId("hero-subtitle")).toBeVisible();

    // Verify CTA buttons
    await expect(page.getByTestId("cta-scan-button")).toBeVisible();
    await expect(page.getByTestId("cta-demo-button")).toBeVisible();
  });

  test("navigation links are present", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("logo-link")).toBeVisible();
    await expect(page.getByTestId("nav-scan")).toBeVisible();
    await expect(page.getByTestId("nav-history")).toBeVisible();
    await expect(page.getByTestId("nav-login")).toBeVisible();
  });

  test("footer links are present", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("footer-privacy")).toBeVisible();
    await expect(page.getByTestId("footer-terms")).toBeVisible();
    await expect(page.getByTestId("footer-contact")).toBeVisible();
  });

  test("page title is correct", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/LemonLens/);
  });

  test("stats section is visible", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("stats-section")).toBeVisible();
    await expect(page.getByTestId("stat-cars-scanned")).toBeVisible();
    await expect(page.getByTestId("stat-damage-found")).toBeVisible();
    await expect(page.getByTestId("stat-money-saved")).toBeVisible();
  });

  test("how it works section is visible", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("how-it-works-section")).toBeVisible();
    await expect(page.getByTestId("step-upload")).toBeVisible();
    await expect(page.getByTestId("step-analyze")).toBeVisible();
    await expect(page.getByTestId("step-report")).toBeVisible();
  });

  test("features section is visible", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("features-section")).toBeVisible();
    await expect(page.getByTestId("feature-ai-vision")).toBeVisible();
    await expect(page.getByTestId("feature-vin-decode")).toBeVisible();
    await expect(page.getByTestId("feature-recall-check")).toBeVisible();
    await expect(page.getByTestId("feature-listing-import")).toBeVisible();
    await expect(page.getByTestId("feature-shareable-reports")).toBeVisible();
    await expect(page.getByTestId("feature-scan-history")).toBeVisible();
  });

  test("bottom CTA section is visible", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("cta-section")).toBeVisible();
    await expect(page.getByTestId("cta-start-button")).toBeVisible();
  });
});
