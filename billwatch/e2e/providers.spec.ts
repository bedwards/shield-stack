import { test, expect } from "@playwright/test";

test.describe("Providers Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/providers");
  });

  test("renders providers page with title", async ({ page }) => {
    await expect(page.getByTestId("providers-page")).toBeVisible();
    await expect(page.getByTestId("providers-title")).toBeVisible();
  });

  test("displays statistics", async ({ page }) => {
    await expect(page.getByTestId("providers-stats")).toBeVisible();
  });

  test("displays deregulated states section", async ({ page }) => {
    await expect(page.getByTestId("deregulated-section")).toBeVisible();
    await expect(page.getByTestId("deregulated-state-tx")).toBeVisible();
    await expect(page.getByTestId("deregulated-state-oh")).toBeVisible();
    await expect(page.getByTestId("deregulated-state-pa")).toBeVisible();
  });

  test("displays regulated states table", async ({ page }) => {
    await expect(page.getByTestId("regulated-section")).toBeVisible();
    await expect(page.getByTestId("regulated-states-table")).toBeVisible();
  });

  test("deregulated state cards link to guides", async ({ page }) => {
    const txLink = page.getByTestId("state-link-tx");
    await expect(txLink).toBeVisible();
    await expect(txLink).toHaveAttribute("href", "/guides/texas");
  });

  test("has bottom CTA", async ({ page }) => {
    await expect(page.getByTestId("providers-cta")).toBeVisible();
    await expect(page.getByTestId("providers-cta-upload")).toBeVisible();
  });
});
