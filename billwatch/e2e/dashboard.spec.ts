import { test, expect } from "@playwright/test";

test.describe("Dashboard Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard");
  });

  test("renders dashboard with all sections", async ({ page }) => {
    await expect(page.getByTestId("dashboard-page")).toBeVisible();
    await expect(page.getByTestId("dashboard-title")).toBeVisible();
    await expect(page.getByTestId("dashboard-demo-banner")).toBeVisible();
  });

  test("displays bill history section with bars", async ({ page }) => {
    await expect(page.getByTestId("dashboard-bill-history")).toBeVisible();
    await expect(
      page.getByTestId("bill-bar-oct-2025"),
    ).toBeVisible();
  });

  test("displays anomaly alerts", async ({ page }) => {
    await expect(page.getByTestId("dashboard-anomaly-alerts")).toBeVisible();
    await expect(page.getByTestId("anomaly-1")).toBeVisible();
    await expect(page.getByTestId("anomaly-severity-1")).toBeVisible();
  });

  test("displays benchmarks section", async ({ page }) => {
    await expect(page.getByTestId("dashboard-benchmarks")).toBeVisible();
    await expect(page.getByTestId("benchmark-yours")).toBeVisible();
    await expect(page.getByTestId("benchmark-neighborhood")).toBeVisible();
    await expect(page.getByTestId("benchmark-insight")).toBeVisible();
  });

  test("has upload CTA buttons", async ({ page }) => {
    await expect(page.getByTestId("dashboard-upload-cta")).toBeVisible();
    await expect(page.getByTestId("dashboard-cta-upload")).toBeVisible();
  });
});
