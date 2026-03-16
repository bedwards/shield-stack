import { test, expect } from "@playwright/test";

test.describe("TenantShield Smoke Tests", () => {
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
    await expect(page.getByTestId("cta-document-button")).toBeVisible();
    await expect(page.getByTestId("cta-states-button")).toBeVisible();
  });

  test("navigation links are present", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("logo-link")).toBeVisible();
    await expect(page.getByTestId("nav-document")).toBeVisible();
    await expect(page.getByTestId("nav-issues")).toBeVisible();
    await expect(page.getByTestId("nav-states")).toBeVisible();
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

    await expect(page).toHaveTitle(/TenantShield/);
  });

  test("how it works section is present", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("how-it-works-section")).toBeVisible();
    await expect(page.getByTestId("step-document")).toBeVisible();
    await expect(page.getByTestId("step-generate")).toBeVisible();
    await expect(page.getByTestId("step-track")).toBeVisible();
  });

  test("stats section is present", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("stats-section")).toBeVisible();
    await expect(page.getByTestId("stat-renters")).toBeVisible();
    await expect(page.getByTestId("stat-complaints")).toBeVisible();
    await expect(page.getByTestId("stat-letters")).toBeVisible();
  });
});
