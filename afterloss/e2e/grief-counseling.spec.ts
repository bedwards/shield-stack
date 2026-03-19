import { test, expect } from "@playwright/test";

test.describe("Grief Counseling Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/resources/grief-counseling");
  });

  test("page loads with correct title", async ({ page }) => {
    await expect(page).toHaveTitle(/Online Grief Counseling Guide.*2026/);
  });

  test("hero section is visible", async ({ page }) => {
    await expect(page.getByTestId("grief-counseling-hero")).toBeVisible();
  });

  test("all content sections render", async ({ page }) => {
    await expect(page.getByTestId("what-is-grief-counseling")).toBeVisible();
    await expect(page.getByTestId("when-to-seek-help")).toBeVisible();
    await expect(page.getByTestId("online-vs-inperson")).toBeVisible();
    await expect(page.getByTestId("what-to-expect")).toBeVisible();
    await expect(page.getByTestId("insurance-coverage")).toBeVisible();
    await expect(page.getByTestId("cost-comparison")).toBeVisible();
    await expect(page.getByTestId("platform-comparison")).toBeVisible();
    await expect(page.getByTestId("grief-counseling-children")).toBeVisible();
    await expect(page.getByTestId("faq-section")).toBeVisible();
  });

  test("therapy comparison table renders", async ({ page }) => {
    await expect(page.getByTestId("therapy-comparison-table")).toBeVisible();
  });

  test("affiliate CTAs render with proper disclosure", async ({ page }) => {
    const talkspaceCta = page.getByTestId("talkspace-cta");
    await expect(talkspaceCta).toBeVisible();
    await expect(talkspaceCta).toHaveAttribute("target", "_blank");

    const betterhelpCta = page.getByTestId("betterhelp-cta");
    await expect(betterhelpCta).toBeVisible();
    await expect(betterhelpCta).toHaveAttribute("target", "_blank");
  });

  test("crisis resources are visible", async ({ page }) => {
    await expect(page.getByTestId("crisis-resources")).toBeVisible();
    await expect(page.getByText("988")).toBeVisible();
  });

  test("internal navigation links work", async ({ page }) => {
    const checklistLink = page.getByTestId("cta-checklist-link");
    await expect(checklistLink).toBeVisible();
    await expect(checklistLink).toHaveAttribute("href", "/");

    const statesLink = page.getByTestId("cta-states-link");
    await expect(statesLink).toBeVisible();
    await expect(statesLink).toHaveAttribute("href", "/states");
  });

  test("breadcrumb navigation is present", async ({ page }) => {
    await expect(page.getByTestId("breadcrumb-home")).toBeVisible();
  });

  test("FAQ section has questions", async ({ page }) => {
    const faqSection = page.getByTestId("faq-section");
    await expect(faqSection).toBeVisible();
    const questions = faqSection.locator("h3");
    await expect(questions).toHaveCount(7);
  });

  test("page has JSON-LD structured data", async ({ page }) => {
    const jsonLd = page.locator('script[type="application/ld+json"]');
    const count = await jsonLd.count();
    expect(count).toBeGreaterThanOrEqual(1);

    const faqJsonLd = await jsonLd.first().textContent();
    expect(faqJsonLd).toContain("FAQPage");
  });
});
