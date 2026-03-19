import { test, expect } from "@playwright/test";

test.describe("BillWatch Smoke Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("landing page loads and displays hero", async ({ page }) => {
    await expect(page.getByTestId("header")).toBeVisible();
    await expect(page.getByTestId("main-content")).toBeVisible();
    await expect(page.getByTestId("footer")).toBeVisible();
    await expect(page.getByTestId("hero-title")).toBeVisible();
    await expect(page.getByTestId("hero-subtitle")).toBeVisible();
    await expect(page.getByTestId("cta-upload-button")).toBeVisible();
    await expect(page.getByTestId("cta-demo-button")).toBeVisible();
  });

  test("navigation links are present", async ({ page }) => {
    await expect(page.getByTestId("logo-link")).toBeVisible();
    await expect(page.getByTestId("nav-dashboard")).toBeVisible();
    await expect(page.getByTestId("nav-providers")).toBeVisible();
    await expect(page.getByTestId("nav-upload")).toBeVisible();
    await expect(page.getByTestId("nav-login")).toBeVisible();
  });

  test("footer links are present", async ({ page }) => {
    await expect(page.getByTestId("footer-faq")).toBeVisible();
    await expect(page.getByTestId("footer-providers")).toBeVisible();
    await expect(page.getByTestId("footer-privacy")).toBeVisible();
    await expect(page.getByTestId("footer-terms")).toBeVisible();
    await expect(page.getByTestId("footer-contact")).toBeVisible();
  });

  test("page title is correct", async ({ page }) => {
    await expect(page).toHaveTitle(/BillWatch/);
  });

  test("stats section is visible", async ({ page }) => {
    await expect(page.getByTestId("stats-section")).toBeVisible();
    await expect(page.getByTestId("stat-bills-analyzed")).toBeVisible();
    await expect(page.getByTestId("stat-anomalies-found")).toBeVisible();
    await expect(page.getByTestId("stat-money-saved")).toBeVisible();
  });

  test("how it works section is visible", async ({ page }) => {
    await expect(page.getByTestId("how-it-works-section")).toBeVisible();
    await expect(page.getByTestId("step-upload")).toBeVisible();
    await expect(page.getByTestId("step-analyze")).toBeVisible();
    await expect(page.getByTestId("step-save")).toBeVisible();
  });

  test("social proof section with testimonials", async ({ page }) => {
    await expect(page.getByTestId("social-proof-section")).toBeVisible();
    await expect(page.getByTestId("testimonial-sarah-t")).toBeVisible();
    await expect(page.getByTestId("testimonial-marcus-r")).toBeVisible();
    await expect(page.getByTestId("testimonial-jennifer-l")).toBeVisible();
  });
});
