import { test, expect } from "@playwright/test";

test.describe("Pricing Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/pricing");
  });

  test("renders pricing page with all plans", async ({ page }) => {
    await expect(page.getByTestId("pricing-page")).toBeVisible();
    await expect(page.getByTestId("pricing-title")).toBeVisible();
    await expect(page.getByTestId("plan-free")).toBeVisible();
    await expect(page.getByTestId("plan-premium")).toBeVisible();
    await expect(page.getByTestId("plan-recruiter")).toBeVisible();
  });

  test("premium plan has popular badge", async ({ page }) => {
    await expect(page.getByTestId("popular-badge")).toBeVisible();
  });

  test("all plan CTAs are clickable", async ({ page }) => {
    await expect(page.getByTestId("plan-free-cta")).toBeVisible();
    await expect(page.getByTestId("plan-premium-cta")).toBeVisible();
    await expect(page.getByTestId("plan-recruiter-cta")).toBeVisible();
  });

  test("FAQ section is visible", async ({ page }) => {
    await expect(page.getByTestId("pricing-faq")).toBeVisible();
    await expect(page.getByTestId("faq-cancel")).toBeVisible();
  });

  test("page title contains Pricing", async ({ page }) => {
    await expect(page).toHaveTitle(/Pricing/);
  });
});
