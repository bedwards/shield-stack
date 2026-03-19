import { test, expect } from "@playwright/test";
import path from "path";

const screenshotDir = path.join(__dirname, "..", "screenshots");

test.describe("Compare Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/compare");
  });

  test("compare page loads with title and empty state", async ({ page }) => {
    await expect(page.getByTestId("compare-page")).toBeVisible();
    await expect(page.getByTestId("compare-page-title")).toHaveText("Compare Companies");
    await expect(page.getByTestId("compare-empty")).toBeVisible();
    await expect(page.getByTestId("company-search-input")).toBeVisible();

    await page.screenshot({
      path: path.join(screenshotDir, "compare-page.png"),
      fullPage: true,
    });
  });
});
