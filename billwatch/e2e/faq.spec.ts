import { test, expect } from "@playwright/test";

test.describe("FAQ Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/faq");
  });

  test("renders FAQ page with title", async ({ page }) => {
    await expect(page.getByTestId("faq-page")).toBeVisible();
    await expect(page.getByTestId("faq-title")).toBeVisible();
  });

  test("displays FAQ categories", async ({ page }) => {
    await expect(page.getByTestId("faq-category-0")).toBeVisible();
    await expect(page.getByTestId("faq-category-1")).toBeVisible();
    await expect(page.getByTestId("faq-category-2")).toBeVisible();
    await expect(page.getByTestId("faq-category-3")).toBeVisible();
  });

  test("displays FAQ items", async ({ page }) => {
    await expect(page.getByTestId("faq-item-0-0")).toBeVisible();
    await expect(page.getByTestId("faq-item-0-1")).toBeVisible();
  });

  test("has JSON-LD structured data", async ({ page }) => {
    const jsonLd = await page.evaluate(() => {
      const script = document.querySelector(
        'script[type="application/ld+json"]',
      );
      return script ? JSON.parse(script.textContent || "{}") : null;
    });
    expect(jsonLd).not.toBeNull();
    expect(jsonLd["@type"]).toBe("FAQPage");
    expect(jsonLd.mainEntity.length).toBeGreaterThan(0);
  });

  test("has bottom CTA", async ({ page }) => {
    await expect(page.getByTestId("faq-cta")).toBeVisible();
    await expect(page.getByTestId("faq-cta-upload")).toBeVisible();
  });
});
