import { test, expect } from "@playwright/test";

test.describe("Smoke tests", () => {
  test("home page loads and has correct title", async ({ page }) => {
    await page.goto("/");

    // Verify the title contains "ScoreRebound"
    await expect(page).toHaveTitle(/ScoreRebound/);
  });

  test("home page renders without errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => {
      errors.push(error.message);
    });

    await page.goto("/");

    // Verify no console errors
    expect(errors).toHaveLength(0);
  });

  test("home page has header and footer", async ({ page }) => {
    await page.goto("/");

    // Header is visible
    const header = page.locator("[data-testid='header']");
    await expect(header).toBeVisible();

    // Footer is visible
    const footer = page.locator("[data-testid='footer']");
    await expect(footer).toBeVisible();
  });

  test("home page has hero section with CTA", async ({ page }) => {
    await page.goto("/");

    // Hero section renders
    const hero = page.locator("[data-testid='hero-section']");
    await expect(hero).toBeVisible();

    // Hero title is present
    const title = page.locator("[data-testid='hero-title']");
    await expect(title).toContainText("credit score");

    // Primary CTA button is visible
    const cta = page.locator("[data-testid='hero-cta-primary']");
    await expect(cta).toBeVisible();
    await expect(cta).toContainText("Start My Free Recovery Plan");
  });

  test("navigation links are present", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("[data-testid='logo-link']")).toBeVisible();
    await expect(page.locator("[data-testid='nav-cta']")).toBeVisible();
  });
});
