import { test, expect } from "@playwright/test";

test.describe("State Guide Pages — Texas (deregulated)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/guides/texas");
  });

  test("page loads with correct container test ID", async ({ page }) => {
    await expect(page.getByTestId("guide-state-tx")).toBeVisible();
  });

  test("H1 contains state name and 2026", async ({ page }) => {
    const title = page.getByTestId("guide-title");
    await expect(title).toBeVisible();
    await expect(title).toContainText("Texas");
    await expect(title).toContainText("2026");
  });

  test("upload CTA is present with correct test ID", async ({ page }) => {
    const cta = page.getByTestId("cta-upload-state-bill");
    await expect(cta).toBeVisible();
    await expect(cta).toContainText("Texas");
  });

  test("state stats section shows bill, rate, and trend", async ({ page }) => {
    await expect(page.getByTestId("stat-state-bill")).toBeVisible();
    await expect(page.getByTestId("stat-state-rate")).toBeVisible();
    await expect(page.getByTestId("stat-state-trend")).toBeVisible();
  });

  test("causes section is present", async ({ page }) => {
    await expect(page.getByTestId("causes-section")).toBeVisible();
    await expect(page.getByTestId("cause-0")).toBeVisible();
  });

  test("utilities section lists Texas utilities", async ({ page }) => {
    const section = page.getByTestId("utilities-section");
    await expect(section).toBeVisible();
    await expect(section).toContainText("Oncor");
  });

  test("deregulated state shows compare providers section", async ({
    page,
  }) => {
    await expect(
      page.getByTestId("compare-providers-section"),
    ).toBeVisible();
    const cta = page.getByTestId("cta-compare-providers");
    await expect(cta).toBeVisible();
    await expect(cta).toContainText("Texas");
  });

  test("FAQ section has state-specific questions", async ({ page }) => {
    await expect(page.getByTestId("faq-section")).toBeVisible();
    await expect(page.getByTestId("faq-item-0")).toBeVisible();
    await expect(page.getByTestId("faq-item-0")).toContainText("Texas");
  });

  test("bottom CTA is present", async ({ page }) => {
    await expect(page.getByTestId("cta-bottom-section")).toBeVisible();
    await expect(page.getByTestId("cta-bottom-upload")).toBeVisible();
  });

  test("breadcrumb navigation is present", async ({ page }) => {
    await expect(page.getByTestId("breadcrumb")).toBeVisible();
    await expect(page.getByTestId("breadcrumb-home")).toBeVisible();
  });

  test("page has FAQPage JSON-LD structured data", async ({ page }) => {
    const jsonLd = await page.locator('script[type="application/ld+json"]');
    const count = await jsonLd.count();
    expect(count).toBeGreaterThanOrEqual(1);

    let hasFaq = false;
    for (let i = 0; i < count; i++) {
      const content = await jsonLd.nth(i).textContent();
      if (content && content.includes("FAQPage")) {
        hasFaq = true;
        const parsed = JSON.parse(content);
        expect(parsed["@type"]).toBe("FAQPage");
        expect(parsed.mainEntity.length).toBeGreaterThanOrEqual(3);
      }
    }
    expect(hasFaq).toBe(true);
  });
});

test.describe("State Guide Pages — Utah (not deregulated)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/guides/utah");
  });

  test("page loads with correct container test ID", async ({ page }) => {
    await expect(page.getByTestId("guide-state-ut")).toBeVisible();
  });

  test("H1 contains state name", async ({ page }) => {
    await expect(page.getByTestId("guide-title")).toContainText("Utah");
  });

  test("non-deregulated state does NOT show compare providers section", async ({
    page,
  }) => {
    await expect(
      page.getByTestId("compare-providers-section"),
    ).not.toBeVisible();
    await expect(page.getByTestId("cta-compare-providers")).not.toBeVisible();
  });

  test("FAQ section does NOT include provider choice question", async ({
    page,
  }) => {
    const faqSection = page.getByTestId("faq-section");
    await expect(faqSection).toBeVisible();
    await expect(faqSection).not.toContainText(
      "choose my electricity provider",
    );
  });

  test("upload CTA is still present", async ({ page }) => {
    await expect(page.getByTestId("cta-upload-state-bill")).toBeVisible();
  });
});

test.describe("State Guide Pages — multi-word state slug", () => {
  test("New York page loads correctly via hyphenated slug", async ({
    page,
  }) => {
    await page.goto("/guides/new-york");
    await expect(page.getByTestId("guide-state-ny")).toBeVisible();
    await expect(page.getByTestId("guide-title")).toContainText("New York");
  });

  test("North Carolina page loads correctly", async ({ page }) => {
    await page.goto("/guides/north-carolina");
    await expect(page.getByTestId("guide-state-nc")).toBeVisible();
    await expect(page.getByTestId("guide-title")).toContainText(
      "North Carolina",
    );
  });
});
