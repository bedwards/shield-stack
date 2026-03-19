import { test, expect } from "@playwright/test";

test.describe("Landing Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders all landing page sections", async ({ page }) => {
    await expect(page.getByTestId("landing-page")).toBeVisible();
    await expect(page.getByTestId("hero-section")).toBeVisible();
    await expect(page.getByTestId("stats-section")).toBeVisible();
    await expect(page.getByTestId("trending-section")).toBeVisible();
    await expect(page.getByTestId("recent-reports-section")).toBeVisible();
    await expect(page.getByTestId("how-it-works-section")).toBeVisible();
    await expect(page.getByTestId("cta-section")).toBeVisible();
  });

  test("search form is functional", async ({ page }) => {
    await expect(page.getByTestId("search-input")).toBeVisible();
    await expect(page.getByTestId("search-button")).toBeVisible();
    const form = page.getByTestId("search-form");
    await expect(form).toHaveAttribute("action", "/search");
  });

  test("navigation links are present", async ({ page }) => {
    await expect(page.getByTestId("logo-link")).toBeVisible();
    await expect(page.getByTestId("nav-search")).toBeVisible();
    await expect(page.getByTestId("nav-report")).toBeVisible();
    await expect(page.getByTestId("nav-pricing")).toBeVisible();
    await expect(page.getByTestId("nav-blog")).toBeVisible();
    await expect(page.getByTestId("nav-login")).toBeVisible();
  });

  test("footer links are present", async ({ page }) => {
    await expect(page.getByTestId("footer-privacy")).toBeVisible();
    await expect(page.getByTestId("footer-terms")).toBeVisible();
    await expect(page.getByTestId("footer-contact")).toBeVisible();
    await expect(page.getByTestId("footer-pricing")).toBeVisible();
    await expect(page.getByTestId("footer-blog")).toBeVisible();
  });

  test("page title contains GhostBoard", async ({ page }) => {
    await expect(page).toHaveTitle(/GhostBoard/);
  });

  test("CTA report button links to /report", async ({ page }) => {
    const cta = page.getByTestId("cta-report-button");
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("href", "/report");
  });
});
