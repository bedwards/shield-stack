import { test, expect } from "@playwright/test";

test.describe("Electric Bill High Guide", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/guides/electric-bill-high");
  });

  test("page loads with correct title", async ({ page }) => {
    await expect(page).toHaveTitle(/Why Is My Electric Bill So High/);
  });

  test("renders page container and hero", async ({ page }) => {
    await expect(page.getByTestId("guide-electric-bill-high")).toBeVisible();
    await expect(page.getByTestId("guide-title")).toBeVisible();
    await expect(page.getByTestId("guide-subtitle")).toBeVisible();
  });

  test("renders breadcrumb navigation", async ({ page }) => {
    await expect(page.getByTestId("breadcrumb")).toBeVisible();
    await expect(page.getByTestId("breadcrumb-home")).toBeVisible();
  });

  test("renders upload CTA with correct link", async ({ page }) => {
    const cta = page.getByTestId("cta-upload-bill");
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("href", "/upload");
  });

  test("renders table of contents", async ({ page }) => {
    await expect(page.getByTestId("table-of-contents")).toBeVisible();
    await expect(page.getByTestId("toc-causes")).toBeVisible();
    await expect(page.getByTestId("toc-faq")).toBeVisible();
  });

  test("renders 2026 statistics", async ({ page }) => {
    await expect(page.getByTestId("statistics-section")).toBeVisible();
    await expect(page.getByTestId("stat-avg-bill")).toContainText("$163");
    await expect(page.getByTestId("stat-rate")).toContainText("18.05");
    await expect(page.getByTestId("stat-increase")).toContainText("+35%");
  });

  test("renders all 5 causes", async ({ page }) => {
    await expect(page.getByTestId("causes-section")).toBeVisible();
    await expect(page.getByTestId("cause-aging-grid")).toBeVisible();
    await expect(page.getByTestId("cause-ai-demand")).toBeVisible();
    await expect(page.getByTestId("cause-fuel-prices")).toBeVisible();
    await expect(page.getByTestId("cause-extreme-weather")).toBeVisible();
    await expect(page.getByTestId("cause-infrastructure-investment")).toBeVisible();
  });

  test("renders state average tables with links to state guides", async ({ page }) => {
    await expect(page.getByTestId("state-averages-section")).toBeVisible();
    await expect(page.getByTestId("table-highest-states")).toBeVisible();
    await expect(page.getByTestId("table-lowest-states")).toBeVisible();
    // State names are links to /guides/[state] pages
    const hawaiiLink = page.getByTestId("state-link-hi");
    await expect(hawaiiLink).toBeVisible();
    await expect(hawaiiLink).toHaveAttribute("href", "/guides/hawaii");
    const utahLink = page.getByTestId("state-link-ut");
    await expect(utahLink).toBeVisible();
    await expect(utahLink).toHaveAttribute("href", "/guides/utah");
  });

  test("renders FAQ section", async ({ page }) => {
    await expect(page.getByTestId("faq-section")).toBeVisible();
    await expect(page.getByTestId("faq-item-0")).toBeVisible();
    await expect(page.getByTestId("faq-item-6")).toBeVisible();
  });

  test("renders bottom CTA", async ({ page }) => {
    await expect(page.getByTestId("cta-bottom-section")).toBeVisible();
    const bottomCta = page.getByTestId("cta-bottom-upload");
    await expect(bottomCta).toBeVisible();
    await expect(bottomCta).toHaveAttribute("href", "/upload");
  });

  test("has FAQPage and HowTo JSON-LD structured data", async ({ page }) => {
    const scripts = await page.locator('script[type="application/ld+json"]').all();
    expect(scripts.length).toBeGreaterThanOrEqual(3);

    const contents = await Promise.all(
      scripts.map(async (s) => JSON.parse((await s.textContent()) || "{}"))
    );
    const faq = contents.find((c) => c["@type"] === "FAQPage");
    const howTo = contents.find((c) => c["@type"] === "HowTo");
    expect(faq).toBeDefined();
    expect(faq.mainEntity.length).toBeGreaterThanOrEqual(5);
    expect(howTo).toBeDefined();
  });

  test("shared layout header and footer are visible", async ({ page }) => {
    await expect(page.getByTestId("header")).toBeVisible();
    await expect(page.getByTestId("footer")).toBeVisible();
  });
});
