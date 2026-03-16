import { test, expect } from "@playwright/test";

test.describe("Smoke tests", () => {
  test("homepage loads with hero section", async ({ page }) => {
    await page.goto("/");
    const hero = page.locator('[data-testid="hero-section"]');
    await expect(hero).toBeVisible();

    const heading = page.locator('[data-testid="hero-heading"]');
    await expect(heading).toContainText("Will a raise");

    const cta = page.locator('[data-testid="hero-cta"]');
    await expect(cta).toBeVisible();
    await expect(cta).toHaveText("Check Your Benefits Cliff");
  });

  test("header renders with logo and nav", async ({ page }) => {
    await page.goto("/");
    const header = page.locator('[data-testid="header"]');
    await expect(header).toBeVisible();

    const logo = page.locator('[data-testid="header-logo"]');
    await expect(logo).toHaveText("CliffCheck");

    const calcLink = page.locator('[data-testid="nav-calculator"]');
    await expect(calcLink).toBeVisible();
  });

  test("footer renders with links", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator('[data-testid="footer"]');
    await expect(footer).toBeVisible();

    const disclaimer = page.locator('[data-testid="footer-disclaimer"]');
    await expect(disclaimer).toContainText("Not financial or legal advice");
  });

  test("CTA navigates to calculator page", async ({ page }) => {
    await page.goto("/");
    await page.locator('[data-testid="hero-cta"]').click();
    await expect(page).toHaveURL(/\/calculator/);

    const calculatorPage = page.locator('[data-testid="calculator-page"]');
    await expect(calculatorPage).toBeVisible();
  });

  test("calculator page loads", async ({ page }) => {
    await page.goto("/calculator");
    const heading = page.locator('[data-testid="calculator-heading"]');
    await expect(heading).toHaveText("Benefits Cliff Calculator");
  });

  test("feature cards are visible on homepage", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.locator('[data-testid="feature-multi-program"]')
    ).toBeVisible();
    await expect(
      page.locator('[data-testid="feature-state-specific"]')
    ).toBeVisible();
    await expect(
      page.locator('[data-testid="feature-what-if"]')
    ).toBeVisible();
  });
});
