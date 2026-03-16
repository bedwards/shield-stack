import { test, expect } from "@playwright/test";

test.describe("RecallRadar Smoke Tests", () => {
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
    await expect(page.getByTestId("cta-browse-button")).toBeVisible();
  });

  test("navigation links are present", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("logo-link")).toBeVisible();
    await expect(page.getByTestId("nav-scan")).toBeVisible();
    await expect(page.getByTestId("nav-inventory")).toBeVisible();
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

    await expect(page).toHaveTitle(/RecallRadar/);
  });

  test("stats section is visible", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("stats-section")).toBeVisible();
    await expect(page.getByTestId("stat-products-scanned")).toBeVisible();
    await expect(page.getByTestId("stat-recalls-tracked")).toBeVisible();
    await expect(page.getByTestId("stat-families-protected")).toBeVisible();
  });

  test("how it works section is visible", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("how-it-works-section")).toBeVisible();
    await expect(page.getByTestId("step-scan")).toBeVisible();
    await expect(page.getByTestId("step-check")).toBeVisible();
    await expect(page.getByTestId("step-protect")).toBeVisible();
  });

  test("features section is visible", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("features-section")).toBeVisible();
    await expect(page.getByTestId("feature-scanner")).toBeVisible();
    await expect(page.getByTestId("feature-cpsc")).toBeVisible();
    await expect(page.getByTestId("feature-inventory")).toBeVisible();
    await expect(page.getByTestId("feature-alerts")).toBeVisible();
  });
});
