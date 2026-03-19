import { test, expect } from "@playwright/test";
import path from "path";

const screenshotDir = path.join(__dirname, "..", "screenshots");

test.describe("Company Profile Page", () => {
  test("shows company header with name and metadata", async ({ page }) => {
    // Navigate to a known seed company (Amazon has 8 reports in seed data)
    await page.goto("/company/amazon");

    await expect(page.getByTestId("company-page")).toBeVisible();
    await expect(page.getByTestId("company-page-title")).toContainText(
      "Amazon",
    );
    await expect(page.getByTestId("company-industry")).toContainText(
      "Technology",
    );
    await expect(page.getByTestId("company-headquarters")).toContainText(
      "Seattle",
    );

    await page.screenshot({
      path: path.join(screenshotDir, "company-amazon.png"),
      fullPage: true,
    });
  });

  test("shows ghosting stats panel for companies with enough reports", async ({
    page,
  }) => {
    await page.goto("/company/amazon");

    // Amazon has 8 reports in seed data (>= 5 threshold)
    await expect(page.getByTestId("stats-panel")).toBeVisible();
    await expect(page.getByTestId("stat-ghosting-rate-card")).toBeVisible();
    await expect(page.getByTestId("stat-response-time-card")).toBeVisible();
    await expect(page.getByTestId("stat-offer-ratio-card")).toBeVisible();
    await expect(page.getByTestId("stat-total-reports-card")).toBeVisible();
  });

  test("shows insufficient data message for companies with few reports", async ({
    page,
  }) => {
    // Navigate to a company with no reports in seed data
    await page.goto("/company/disney");

    await expect(page.getByTestId("company-page")).toBeVisible();
    // Disney has 0 reports in seed data
    await expect(page.getByTestId("stats-insufficient")).toBeVisible();
  });

  test("shows status distribution for companies with enough data", async ({
    page,
  }) => {
    await page.goto("/company/amazon");
    await expect(page.getByTestId("status-distribution")).toBeVisible();
  });

  test("shows report form on company page", async ({ page }) => {
    await page.goto("/company/amazon");
    await expect(page.getByTestId("report-form")).toBeVisible();
    await expect(page.getByTestId("report-status-select")).toBeVisible();
    await expect(page.getByTestId("report-applied-date")).toBeVisible();
    await expect(page.getByTestId("report-submit-button")).toBeVisible();
  });

  test("compare button links to compare page with slug", async ({ page }) => {
    await page.goto("/company/amazon");
    const compareBtn = page.getByTestId("compare-button");
    await expect(compareBtn).toBeVisible();
    await expect(compareBtn).toHaveAttribute(
      "href",
      "/compare?companies=amazon",
    );
  });

  test("returns 404 for nonexistent company", async ({ page }) => {
    const response = await page.goto("/company/nonexistent-company-xyz-123");
    // Next.js notFound() returns 404
    expect(response?.status()).toBe(404);
  });
});
