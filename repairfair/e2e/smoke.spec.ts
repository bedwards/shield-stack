import { test, expect } from "@playwright/test";

test.describe("RepairFair Smoke Tests", () => {
  test("landing page loads and displays hero", async ({ page }) => {
    await page.goto("/");

    // Verify core layout elements
    await expect(page.getByTestId("header")).toBeVisible();
    await expect(page.getByTestId("main-content")).toBeVisible();
    await expect(page.getByTestId("footer")).toBeVisible();

    // Verify hero section
    await expect(page.getByTestId("hero-title")).toBeVisible();
    await expect(page.getByTestId("hero-subtitle")).toBeVisible();

    // Verify symptom input form
    await expect(page.getByTestId("symptom-input")).toBeVisible();
    await expect(page.getByTestId("diagnose-button")).toBeVisible();
  });

  test("navigation links are present", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("logo-link")).toBeVisible();
    await expect(page.getByTestId("nav-diagnose")).toBeVisible();
    await expect(page.getByTestId("nav-cost")).toBeVisible();
    await expect(page.getByTestId("nav-submit")).toBeVisible();
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

    await expect(page).toHaveTitle(/RepairFair/);
  });

  test("how it works section is visible", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("how-it-works-section")).toBeVisible();
    await expect(page.getByTestId("step-describe")).toBeVisible();
    await expect(page.getByTestId("step-diagnose")).toBeVisible();
    await expect(page.getByTestId("step-estimate")).toBeVisible();
  });

  test("popular repairs section is visible", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("popular-repairs-section")).toBeVisible();
    await expect(page.getByTestId("repair-card-refrigerator")).toBeVisible();
  });

  test("CTA section is visible", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("cta-section")).toBeVisible();
    await expect(page.getByTestId("cta-submit-button")).toBeVisible();
  });
});
