import { test, expect } from "@playwright/test";

test.describe("Summer Electric Bill Guide", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/guides/summer-electric-bill");
  });

  test("page loads with correct title", async ({ page }) => {
    await expect(page).toHaveTitle(
      /Why Is My Electric Bill So High This Summer/
    );
  });

  test("renders page container and hero", async ({ page }) => {
    await expect(
      page.getByTestId("guide-summer-electric-bill")
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
    await expect(page.getByTestId("toc-summer-stats")).toBeVisible();
    await expect(page.getByTestId("toc-causes")).toBeVisible();
    await expect(page.getByTestId("toc-tips")).toBeVisible();
    await expect(page.getByTestId("toc-peak-pricing-explained")).toBeVisible();
    await expect(page.getByTestId("toc-faq")).toBeVisible();
  });

  test("renders summer 2026 statistics", async ({ page }) => {
    await expect(page.getByTestId("summer-stats-section")).toBeVisible();
    await expect(page.getByTestId("stat-summer-avg")).toContainText(
      "$230-280"
    );
    await expect(page.getByTestId("stat-ac-share")).toContainText("50%");
    await expect(page.getByTestId("stat-peak-records")).toContainText("28");
    await expect(page.getByTestId("stat-peak-multiplier")).toContainText(
      "2-3x"
    );
  });

  test("renders all 6 summer causes", async ({ page }) => {
    await expect(page.getByTestId("causes-section")).toBeVisible();
    await expect(page.getByTestId("cause-ac-demand")).toBeVisible();
    await expect(page.getByTestId("cause-peak-pricing")).toBeVisible();
    await expect(page.getByTestId("cause-aging-ac")).toBeVisible();
    await expect(page.getByTestId("cause-heat-gain")).toBeVisible();
    await expect(page.getByTestId("cause-pool-pump")).toBeVisible();
    await expect(page.getByTestId("cause-humidity")).toBeVisible();
  });

  test("renders regional breakdown table", async ({ page }) => {
    await expect(page.getByTestId("regional-section")).toBeVisible();
    await expect(page.getByTestId("region-texas")).toBeVisible();
    await expect(page.getByTestId("region-california")).toBeVisible();
    await expect(page.getByTestId("region-midwest")).toBeVisible();
  });

  test("renders 8 summer tips", async ({ page }) => {
    await expect(page.getByTestId("tips-section")).toBeVisible();
    await expect(page.getByTestId("tip-thermostat")).toBeVisible();
    await expect(page.getByTestId("tip-peak-shift")).toBeVisible();
    await expect(page.getByTestId("tip-window-treatments")).toBeVisible();
    await expect(page.getByTestId("tip-ac-service")).toBeVisible();
    await expect(page.getByTestId("tip-pool-pump")).toBeVisible();
    await expect(page.getByTestId("tip-duct-leaks")).toBeVisible();
  });

  test("renders affiliate recommendations", async ({ page }) => {
    await expect(
      page.getByTestId("affiliate-recommendations")
    ).toBeVisible();
    await expect(
      page.getByTestId("affiliate-link-smart-thermostat")
    ).toBeVisible();
    await expect(
      page.getByTestId("affiliate-link-blackout-curtains")
    ).toBeVisible();
  });

  test("renders peak pricing explained section", async ({ page }) => {
    await expect(page.getByTestId("peak-pricing-section")).toBeVisible();
    await expect(page.getByTestId("peak-off-peak")).toBeVisible();
    await expect(page.getByTestId("peak-shoulder")).toBeVisible();
    await expect(page.getByTestId("peak-on-peak")).toBeVisible();
  });

  test("renders related guides with internal links", async ({ page }) => {
    await expect(page.getByTestId("related-guides-section")).toBeVisible();
    const headTermLink = page.getByTestId("link-electric-bill-high");
    await expect(headTermLink).toBeVisible();
    await expect(headTermLink).toHaveAttribute(
      "href",
      "/guides/electric-bill-high"
    );
    const winterLink = page.getByTestId("link-winter-guide");
    await expect(winterLink).toBeVisible();
    await expect(winterLink).toHaveAttribute(
      "href",
      "/guides/winter-electric-bill"
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
