import { test, expect } from "@playwright/test";

test.describe("NetCheck Smoke Tests", () => {
  test("landing page loads and displays hero", async ({ page }) => {
    await page.goto("/");

    // Verify core layout elements
    await expect(page.getByTestId("header")).toBeVisible();
    await expect(page.getByTestId("main-content")).toBeVisible();
    await expect(page.getByTestId("footer")).toBeVisible();

    // Verify hero section
    await expect(page.getByTestId("hero-title")).toBeVisible();
    await expect(page.getByTestId("hero-subtitle")).toBeVisible();

    // Verify CTA button
    await expect(page.getByTestId("hero-cta-button")).toBeVisible();
  });

  test("navigation links are present", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("logo-link")).toBeVisible();
    await expect(page.getByTestId("nav-verify")).toBeVisible();
    await expect(page.getByTestId("nav-providers")).toBeVisible();
    await expect(page.getByTestId("nav-checklist")).toBeVisible();
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

    await expect(page).toHaveTitle(/NetCheck/);
  });

  test("stats section is visible", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("stats-section")).toBeVisible();
    await expect(page.getByTestId("stat-surprise-bills")).toBeVisible();
    await expect(page.getByTestId("stat-avg-bill")).toBeVisible();
    await expect(page.getByTestId("stat-providers")).toBeVisible();
  });

  test("how it works section is visible", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("how-it-works-section")).toBeVisible();
    await expect(page.getByTestId("step-enter")).toBeVisible();
    await expect(page.getByTestId("step-check")).toBeVisible();
    await expect(page.getByTestId("step-protect")).toBeVisible();
  });

  test("CTA section is visible", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("cta-section")).toBeVisible();
    await expect(page.getByTestId("cta-verify-button")).toBeVisible();
  });
});
