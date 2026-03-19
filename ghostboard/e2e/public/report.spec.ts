import { test, expect } from "@playwright/test";
import path from "path";

const screenshotDir = path.join(__dirname, "..", "screenshots");

test.describe("Report Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/report");
  });

  test("report page loads with title and company search", async ({ page }) => {
    await expect(page.getByTestId("report-page")).toBeVisible();
    await expect(page.getByTestId("report-page-title")).toHaveText("Submit a Report");
    await expect(page.getByTestId("company-search-input")).toBeVisible();
    await expect(page.getByTestId("report-placeholder")).toBeVisible();

    await page.screenshot({
      path: path.join(screenshotDir, "report-page.png"),
      fullPage: true,
    });
  });

  test("nav report link navigates to report page", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("nav-report").click();
    await expect(page).toHaveURL(/\/report/);
    await expect(page.getByTestId("report-page")).toBeVisible();
  });
});
