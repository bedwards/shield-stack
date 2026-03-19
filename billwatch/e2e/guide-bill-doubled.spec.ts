import { test, expect } from "@playwright/test";

test.describe("Bill Doubled Crisis Guide", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/guides/bill-doubled");
  });

  test("page loads with correct container test ID", async ({ page }) => {
    await expect(page.getByTestId("guide-bill-doubled")).toBeVisible();
  });

  test("H1 contains crisis title and 2026", async ({ page }) => {
    const title = page.getByTestId("guide-title");
    await expect(title).toBeVisible();
    await expect(title).toContainText("Electric Bill Doubled?");
    await expect(title).toContainText("2026");
  });

  test("subtitle contains crisis stats", async ({ page }) => {
    const subtitle = page.getByTestId("guide-subtitle");
    await expect(subtitle).toBeVisible();
    await expect(subtitle).toContainText("$163/month");
    await expect(subtitle).toContainText("$1,000");
  });

  test("primary upload CTA has correct data-testid and href", async ({
    page,
  }) => {
    const cta = page.getByTestId("cta-upload-doubled");
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("href", "/upload");
  });

  test("crisis stats section shows all 4 stat cards", async ({ page }) => {
    await expect(page.getByTestId("crisis-stats-section")).toBeVisible();
    await expect(page.getByTestId("stat-avg-increase")).toBeVisible();
    await expect(page.getByTestId("stat-fortune-bills")).toBeVisible();
    await expect(page.getByTestId("stat-pittsburgh")).toBeVisible();
    await expect(page.getByTestId("stat-virginia")).toBeVisible();
  });

  test("emergency actions section has all 4 steps", async ({ page }) => {
    await expect(
      page.getByTestId("emergency-actions-section"),
    ).toBeVisible();
    await expect(page.getByTestId("emergency-check-meter")).toBeVisible();
    await expect(page.getByTestId("emergency-call-utility")).toBeVisible();
    await expect(page.getByTestId("emergency-billing-audit")).toBeVisible();
    await expect(page.getByTestId("emergency-puc-complaint")).toBeVisible();
  });

  test("PUC complaint info is present in emergency actions", async ({
    page,
  }) => {
    const puc = page.getByTestId("emergency-puc-complaint");
    await expect(puc).toContainText("Public Utility Commission");
  });

  test("causes section shows all 7 causes", async ({ page }) => {
    await expect(page.getByTestId("causes-section")).toBeVisible();
    await expect(page.getByTestId("cause-rate-increase")).toBeVisible();
    await expect(page.getByTestId("cause-broken-meter")).toBeVisible();
    await expect(page.getByTestId("cause-hvac-failure")).toBeVisible();
    await expect(page.getByTestId("cause-phantom-loads")).toBeVisible();
    await expect(page.getByTestId("cause-seasonal-shift")).toBeVisible();
    await expect(page.getByTestId("cause-billing-error")).toBeVisible();
    await expect(page.getByTestId("cause-rate-plan-change")).toBeVisible();
  });

  test("each cause has symptoms, verify, and action sections", async ({
    page,
  }) => {
    const cause = page.getByTestId("cause-rate-increase");
    await expect(cause).toContainText("Symptoms");
    await expect(cause).toContainText("How to Verify");
    await expect(cause).toContainText("What to Do");
  });

  test("self-check (HowTo) section has 6 steps", async ({ page }) => {
    await expect(page.getByTestId("self-check-section")).toBeVisible();
    for (let i = 1; i <= 6; i++) {
      await expect(page.getByTestId(`howto-step-${i}`)).toBeVisible();
    }
  });

  test("related guides section links to head-term guide", async ({
    page,
  }) => {
    const link = page.getByTestId("link-electric-bill-high");
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("href", "/guides/electric-bill-high");
  });

  test("FAQ section has at least 4 items", async ({ page }) => {
    await expect(page.getByTestId("faq-section")).toBeVisible();
    for (let i = 0; i < 4; i++) {
      await expect(page.getByTestId(`faq-item-${i}`)).toBeVisible();
    }
  });

  test("bottom CTA is present", async ({ page }) => {
    await expect(page.getByTestId("cta-bottom-section")).toBeVisible();
    const cta = page.getByTestId("cta-bottom-upload");
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("href", "/upload");
  });

  test("breadcrumb navigation is present", async ({ page }) => {
    await expect(page.getByTestId("breadcrumb")).toBeVisible();
    await expect(page.getByTestId("breadcrumb-home")).toBeVisible();
  });

  test("page has FAQPage JSON-LD structured data", async ({ page }) => {
    const jsonLd = await page.locator('script[type="application/ld+json"]');
    const count = await jsonLd.count();
    expect(count).toBeGreaterThanOrEqual(3);

    let hasFaq = false;
    let hasHowTo = false;
    for (let i = 0; i < count; i++) {
      const content = await jsonLd.nth(i).textContent();
      if (content && content.includes("FAQPage")) {
        hasFaq = true;
        const parsed = JSON.parse(content);
        expect(parsed["@type"]).toBe("FAQPage");
        expect(parsed.mainEntity.length).toBeGreaterThanOrEqual(4);
      }
      if (content && content.includes("HowTo")) {
        hasHowTo = true;
        const parsed = JSON.parse(content);
        expect(parsed["@type"]).toBe("HowTo");
        expect(parsed.name).toContain("electric bill doubled");
      }
    }
    expect(hasFaq).toBe(true);
    expect(hasHowTo).toBe(true);
  });
});
