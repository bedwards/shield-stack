import { test, expect } from "@playwright/test";

test.describe("SpeedProof Smoke Tests", () => {
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
    await expect(page.getByTestId("cta-test-button")).toBeVisible();
    await expect(page.getByTestId("cta-dashboard-button")).toBeVisible();
  });

  test("navigation links are present", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("logo-link")).toBeVisible();
    await expect(page.getByTestId("nav-dashboard")).toBeVisible();
    await expect(page.getByTestId("nav-reports")).toBeVisible();
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

    await expect(page).toHaveTitle(/SpeedProof/);
  });

  test("how it works section is visible", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("how-it-works-section")).toBeVisible();
    await expect(page.getByTestId("step-test")).toBeVisible();
    await expect(page.getByTestId("step-track")).toBeVisible();
    await expect(page.getByTestId("step-act")).toBeVisible();
  });

  test("features section is visible", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("features-section")).toBeVisible();
    await expect(page.getByTestId("feature-speed-test")).toBeVisible();
    await expect(page.getByTestId("feature-auto-test")).toBeVisible();
    await expect(page.getByTestId("feature-dashboard")).toBeVisible();
    await expect(page.getByTestId("feature-report")).toBeVisible();
    await expect(page.getByTestId("feature-fcc")).toBeVisible();
    await expect(page.getByTestId("feature-credit")).toBeVisible();
  });

  test("bottom CTA section is visible", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("cta-section")).toBeVisible();
    await expect(page.getByTestId("cta-start-button")).toBeVisible();
  });
});
