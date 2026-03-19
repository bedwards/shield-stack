import { test, expect } from "@playwright/test";

test.describe("CellScore Smoke Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("landing page loads and displays hero", async ({ page }) => {
    await expect(page.getByTestId("header")).toBeVisible();
    await expect(page.getByTestId("main-content")).toBeVisible();
    await expect(page.getByTestId("footer")).toBeVisible();
    await expect(page.getByTestId("hero-title")).toBeVisible();
    await expect(page.getByTestId("hero-subtitle")).toBeVisible();
  });

  test("navigation links are present", async ({ page }) => {
    await expect(page.getByTestId("logo-link")).toBeVisible();
    await expect(page.getByTestId("nav-check")).toBeVisible();
    await expect(page.getByTestId("nav-plans")).toBeVisible();
    await expect(page.getByTestId("nav-compare")).toBeVisible();
  });

  test("footer links are present", async ({ page }) => {
    await expect(page.getByTestId("footer-privacy")).toBeVisible();
    await expect(page.getByTestId("footer-terms")).toBeVisible();
    await expect(page.getByTestId("footer-contact")).toBeVisible();
  });

  test("page title is correct", async ({ page }) => {
    await expect(page).toHaveTitle(/CellScore/);
  });
});
