import { test, expect } from "@playwright/test";
import path from "path";

const screenshotDir = path.join(__dirname, "..", "screenshots");

test.describe("Company Search", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/search");
  });

  test("search page loads with title and search input", async ({ page }) => {
    await expect(page.getByTestId("search-page")).toBeVisible();
    await expect(page.getByTestId("search-page-title")).toHaveText("Search Companies");
    await expect(page.getByTestId("company-search-input")).toBeVisible();
    await expect(page.getByTestId("search-tips")).toBeVisible();

    await page.screenshot({
      path: path.join(screenshotDir, "search-page.png"),
      fullPage: true,
    });
  });

  test("search form on home page navigates to search page", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("search-form")).toBeVisible();
    await expect(page.getByTestId("search-input")).toBeVisible();
    await expect(page.getByTestId("search-button")).toBeVisible();
  });

  test("nav search link navigates to search page", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("nav-search").click();
    await expect(page).toHaveURL(/\/search/);
    await expect(page.getByTestId("search-page")).toBeVisible();
  });
});
