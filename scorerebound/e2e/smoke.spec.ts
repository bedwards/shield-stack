import { test, expect } from "@playwright/test";

test.describe("Smoke tests", () => {
  test("homepage loads and displays hero section", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("app-root")).toBeVisible();
    await expect(page.getByTestId("header")).toBeVisible();
    await expect(page.getByTestId("hero-heading")).toBeVisible();
    await expect(page.getByTestId("hero-heading")).toContainText(
      "Recover Your Credit Score"
    );
    await expect(page.getByTestId("footer")).toBeVisible();
  });

  test("hero CTA link points to quiz", async ({ page }) => {
    await page.goto("/");

    const cta = page.getByTestId("cta-start-quiz");
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("href", "/quiz");
  });

  test("header navigation is present", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("header-logo")).toBeVisible();
    await expect(page.getByTestId("nav-quiz")).toBeVisible();
    await expect(page.getByTestId("nav-cta")).toBeVisible();
  });

  test("footer links are present", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("footer-about")).toBeVisible();
    await expect(page.getByTestId("footer-faq")).toBeVisible();
  });

  test("features section displays three features", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("features-section")).toBeVisible();
    await expect(page.getByTestId("feature-quiz")).toBeVisible();
    await expect(page.getByTestId("feature-plan")).toBeVisible();
    await expect(page.getByTestId("feature-track")).toBeVisible();
  });
});
