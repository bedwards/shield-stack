import { test, expect } from "@playwright/test";

test.describe("SmallClaimsAI Smoke Tests", () => {
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
    await expect(page.getByTestId("cta-start-button")).toBeVisible();
    await expect(page.getByTestId("cta-states-button")).toBeVisible();
  });

  test("navigation links are present", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("logo-link")).toBeVisible();
    await expect(page.getByTestId("nav-states")).toBeVisible();
    await expect(page.getByTestId("nav-start")).toBeVisible();
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

    await expect(page).toHaveTitle(/SmallClaimsAI/);
  });
});
