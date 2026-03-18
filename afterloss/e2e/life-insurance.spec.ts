import { test, expect } from "@playwright/test";

test.describe("Life Insurance After Loss Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/resources/life-insurance-after-loss");
  });

  test("page loads with hero section", async ({ page }) => {
    await expect(page.getByTestId("life-insurance-hero")).toBeVisible();
    await expect(page.getByTestId("page-title")).toContainText(
      "Life Insurance After Losing a Loved One"
    );
    await expect(page.getByTestId("page-title")).toContainText("2026");
  });

  test("breadcrumb navigation is present", async ({ page }) => {
    await expect(page.getByTestId("breadcrumb-nav")).toBeVisible();
    await expect(page.getByTestId("breadcrumb-home")).toBeVisible();
    await expect(page.getByTestId("breadcrumb-current")).toContainText(
      "Life Insurance After Loss"
    );
  });

  test("coverage calculator section renders", async ({ page }) => {
    await expect(page.getByTestId("coverage-calculator")).toBeVisible();
    await expect(page.getByTestId("coverage-calculator")).toContainText(
      "Quick Coverage Estimate"
    );
  });

  test("term vs whole life comparison renders", async ({ page }) => {
    await expect(page.getByTestId("term-vs-whole-section")).toBeVisible();
  });

  test("Policygenius affiliate CTA renders with disclosure", async ({
    page,
  }) => {
    const cta = page.getByTestId("policygenius-cta");
    await expect(cta).toBeVisible();
    await expect(cta).toContainText(
      "AfterLoss may earn a commission at no cost to you"
    );
    const affiliateLink = page.getByTestId("policygenius-affiliate-link");
    await expect(affiliateLink).toBeVisible();
    await expect(affiliateLink).toHaveAttribute("target", "_blank");
    await expect(affiliateLink).toHaveAttribute(
      "rel",
      "noopener noreferrer sponsored"
    );
  });

  test("FAQ section has questions", async ({ page }) => {
    const faq = page.getByTestId("faq-section");
    await expect(faq).toBeVisible();
    await expect(faq).toContainText("Frequently Asked Questions");
  });

  test("related resources link to other pages", async ({ page }) => {
    await expect(page.getByTestId("related-resources")).toBeVisible();
    await expect(page.getByTestId("link-checklist")).toHaveAttribute(
      "href",
      "/guide"
    );
    await expect(page.getByTestId("link-state-guides")).toHaveAttribute(
      "href",
      "/states"
    );
  });

  test("bottom CTA links to full guide", async ({ page }) => {
    await expect(page.getByTestId("page-cta-button")).toBeVisible();
    await expect(page.getByTestId("page-cta-button")).toHaveAttribute(
      "href",
      "/guide"
    );
  });

  test("JSON-LD FAQPage schema is present", async ({ page }) => {
    const jsonLd = await page.locator('script[type="application/ld+json"]');
    const content = await jsonLd.first().textContent();
    const schema = JSON.parse(content || "{}");
    expect(schema["@type"]).toBe("FAQPage");
    expect(schema.mainEntity.length).toBeGreaterThanOrEqual(5);
  });
});
