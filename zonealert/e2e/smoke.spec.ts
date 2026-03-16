import { test, expect } from "@playwright/test";

test.describe("ZoneAlert Smoke Tests", () => {
  test("landing page loads and displays hero", async ({ page }) => {
    await page.goto("/");

    // Verify core layout elements (header, sidebar, footer)
    await expect(page.getByTestId("header")).toBeVisible();
    await expect(page.getByTestId("sidebar")).toBeVisible();
    await expect(page.getByTestId("main-content")).toBeVisible();
    await expect(page.getByTestId("footer")).toBeVisible();

    // Verify hero section
    await expect(page.getByTestId("hero-title")).toBeVisible();
    await expect(page.getByTestId("hero-subtitle")).toBeVisible();

    // Verify CTA buttons
    await expect(page.getByTestId("cta-monitor-button")).toBeVisible();
    await expect(page.getByTestId("cta-demo-button")).toBeVisible();
  });

  test("navigation links are present", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("logo-link")).toBeVisible();
    await expect(page.getByTestId("nav-alerts")).toBeVisible();
    await expect(page.getByTestId("nav-map")).toBeVisible();
    await expect(page.getByTestId("nav-login")).toBeVisible();
  });

  test("sidebar navigation links are present", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("sidebar")).toBeVisible();
    await expect(page.getByTestId("sidebar-nav")).toBeVisible();
    await expect(page.getByTestId("sidebar-dashboard")).toBeVisible();
    await expect(page.getByTestId("sidebar-alerts")).toBeVisible();
    await expect(page.getByTestId("sidebar-map")).toBeVisible();
    await expect(page.getByTestId("sidebar-hearings")).toBeVisible();
    await expect(page.getByTestId("sidebar-addresses")).toBeVisible();
    await expect(page.getByTestId("sidebar-settings")).toBeVisible();
  });

  test("footer links are present", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("footer-privacy")).toBeVisible();
    await expect(page.getByTestId("footer-terms")).toBeVisible();
    await expect(page.getByTestId("footer-contact")).toBeVisible();
  });

  test("page title is correct", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/ZoneAlert/);
  });

  test("stats section is visible", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("stats-section")).toBeVisible();
    await expect(page.getByTestId("stat-addresses-monitored")).toBeVisible();
    await expect(page.getByTestId("stat-alerts-sent")).toBeVisible();
    await expect(page.getByTestId("stat-cities-covered")).toBeVisible();
  });

  test("how it works section is visible", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("how-it-works-section")).toBeVisible();
    await expect(page.getByTestId("step-register")).toBeVisible();
    await expect(page.getByTestId("step-monitor")).toBeVisible();
    await expect(page.getByTestId("step-alert")).toBeVisible();
  });

  test("health check API returns ok", async ({ request }) => {
    const response = await request.get("/api/health");
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.status).toBe("ok");
    expect(body.product).toBe("zonealert");
  });
});
