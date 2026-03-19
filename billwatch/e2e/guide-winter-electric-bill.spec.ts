import { test, expect } from "@playwright/test";

test.describe("Winter Electric Bill Guide", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/guides/winter-electric-bill");
  });

  test("page loads with correct title", async ({ page }) => {
    await expect(page).toHaveTitle(
      /Why Is My Electric Bill So High This Winter/
    );
  });

  test("renders page container and hero", async ({ page }) => {
    await expect(
      page.getByTestId("guide-winter-electric-bill")
    ).toBeVisible();
    await expect(page.getByTestId("guide-title")).toBeVisible();
    await expect(page.getByTestId("guide-subtitle")).toBeVisible();
  });

  test("renders breadcrumb navigation", async ({ page }) => {
    await expect(page.getByTestId("breadcrumb")).toBeVisible();
    await expect(page.getByTestId("breadcrumb-home")).toBeVisible();
    await expect(page.getByTestId("breadcrumb-guides")).toBeVisible();
  });

  test("renders seasonal upload CTA with correct data-testid", async ({
    page,
  }) => {
    const cta = page.getByTestId("cta-upload-seasonal");
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("href", "/upload");
  });

  test("renders table of contents", async ({ page }) => {
    await expect(page.getByTestId("table-of-contents")).toBeVisible();
    await expect(page.getByTestId("toc-winter-stats")).toBeVisible();
    await expect(page.getByTestId("toc-causes")).toBeVisible();
    await expect(page.getByTestId("toc-tips")).toBeVisible();
    await expect(page.getByTestId("toc-faq")).toBeVisible();
  });

  test("renders winter 2026 statistics", async ({ page }) => {
    await expect(page.getByTestId("winter-stats-section")).toBeVisible();
    await expect(page.getByTestId("stat-winter-avg")).toContainText(
      "$210-250"
    );
    await expect(page.getByTestId("stat-heating-pct")).toContainText("45%");
    await expect(page.getByTestId("stat-heating-degree-days")).toContainText(
      "+12%"
    );
    await expect(page.getByTestId("stat-em-heat-cost")).toContainText("2-3x");
  });

  test("renders all 6 winter causes", async ({ page }) => {
    await expect(page.getByTestId("causes-section")).toBeVisible();
    await expect(page.getByTestId("cause-heating-demand")).toBeVisible();
    await expect(page.getByTestId("cause-heat-pump-emergency")).toBeVisible();
    await expect(page.getByTestId("cause-insulation-gaps")).toBeVisible();
    await expect(page.getByTestId("cause-rate-increases")).toBeVisible();
    await expect(page.getByTestId("cause-shorter-days")).toBeVisible();
    await expect(page.getByTestId("cause-thermostat-settings")).toBeVisible();
  });

  test("renders regional breakdown table", async ({ page }) => {
    await expect(page.getByTestId("regional-section")).toBeVisible();
    await expect(page.getByTestId("region-northeast")).toBeVisible();
    await expect(page.getByTestId("region-midwest")).toBeVisible();
    await expect(page.getByTestId("region-southeast")).toBeVisible();
  });

  test("renders 8 winter tips", async ({ page }) => {
    await expect(page.getByTestId("tips-section")).toBeVisible();
    await expect(page.getByTestId("tip-thermostat")).toBeVisible();
    await expect(page.getByTestId("tip-seal-leaks")).toBeVisible();
    await expect(page.getByTestId("tip-heat-pump")).toBeVisible();
    await expect(page.getByTestId("tip-space-heaters")).toBeVisible();
  });

  test("renders affiliate recommendations", async ({ page }) => {
    await expect(
      page.getByTestId("affiliate-recommendations")
    ).toBeVisible();
    await expect(
      page.getByTestId("affiliate-link-smart-thermostat")
    ).toBeVisible();
    await expect(
      page.getByTestId("affiliate-link-weatherstripping")
    ).toBeVisible();
  });

  test("renders normal vs suspicious section", async ({ page }) => {
    await expect(
      page.getByTestId("normal-vs-suspicious-section")
    ).toBeVisible();
    await expect(page.getByTestId("normal-signs")).toBeVisible();
    await expect(page.getByTestId("suspicious-signs")).toBeVisible();
  });

  test("renders related guides with internal links", async ({ page }) => {
    await expect(page.getByTestId("related-guides-section")).toBeVisible();
    const headTermLink = page.getByTestId("link-electric-bill-high");
    await expect(headTermLink).toBeVisible();
    await expect(headTermLink).toHaveAttribute(
      "href",
      "/guides/electric-bill-high"
    );
    const summerLink = page.getByTestId("link-summer-guide");
    await expect(summerLink).toBeVisible();
    await expect(summerLink).toHaveAttribute(
      "href",
      "/guides/summer-electric-bill"
    );
  });

  test("renders FAQ section with 4 items", async ({ page }) => {
    await expect(page.getByTestId("faq-section")).toBeVisible();
    await expect(page.getByTestId("faq-item-0")).toBeVisible();
    await expect(page.getByTestId("faq-item-3")).toBeVisible();
  });

  test("renders bottom CTA", async ({ page }) => {
    await expect(page.getByTestId("cta-bottom-section")).toBeVisible();
    const bottomCta = page.getByTestId("cta-bottom-upload");
    await expect(bottomCta).toBeVisible();
    await expect(bottomCta).toHaveAttribute("href", "/upload");
  });

  test("has FAQPage JSON-LD structured data", async ({ page }) => {
    const scripts = await page
      .locator('script[type="application/ld+json"]')
      .all();
    expect(scripts.length).toBeGreaterThanOrEqual(2);

    const contents = await Promise.all(
      scripts.map(async (s) => JSON.parse((await s.textContent()) || "{}"))
    );
    const faq = contents.find((c) => c["@type"] === "FAQPage");
    expect(faq).toBeDefined();
    expect(faq.mainEntity.length).toBeGreaterThanOrEqual(3);
  });

  test("shared layout header and footer are visible", async ({ page }) => {
    await expect(page.getByTestId("header")).toBeVisible();
    await expect(page.getByTestId("footer")).toBeVisible();
  });
});
