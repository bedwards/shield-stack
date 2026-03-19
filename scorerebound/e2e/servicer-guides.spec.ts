import { test, expect } from "@playwright/test";

const SERVICER_SLUGS = [
  "mohela",
  "nelnet",
  "aidvantage",
  "edfinancial",
  "great-lakes",
] as const;

test.describe("Servicer recovery guide pages — /guides/servicer/[slug]", () => {
  test("mohela page renders with correct servicer data", async ({ page }) => {
    await page.goto("/guides/servicer/mohela");

    // Page wrapper
    await expect(
      page.locator("[data-testid='servicer-page-mohela']"),
    ).toBeVisible();

    // H1 with servicer name
    const h1 = page.locator("[data-testid='servicer-name']");
    await expect(h1).toBeVisible();
    await expect(h1).toContainText("MOHELA");

    // Contact info
    await expect(
      page.locator("[data-testid='servicer-phone']"),
    ).toContainText("1-888-866-4352");

    // Portal link exists and is a link
    const portalLink = page.locator("[data-testid='servicer-portal-link']");
    await expect(portalLink).toBeVisible();
    await expect(portalLink).toHaveAttribute("href", /mohela\.com/);

    // Quiz CTA
    await expect(
      page.locator("[data-testid='servicer-quiz-cta']"),
    ).toBeVisible();

    // IBR section
    await expect(
      page.locator("[data-testid='servicer-ibr-section']"),
    ).toBeVisible();

    // Rehabilitation section
    await expect(
      page.locator("[data-testid='servicer-rehab-section']"),
    ).toBeVisible();

    // Consolidation section
    await expect(
      page.locator("[data-testid='servicer-consolidation-section']"),
    ).toBeVisible();

    // FAQ section
    await expect(
      page.locator("[data-testid='servicer-faq-section']"),
    ).toBeVisible();
  });

  test("quiz CTA links to /quiz", async ({ page }) => {
    await page.goto("/guides/servicer/mohela");

    const ctaButton = page.locator("[data-testid='guide-quiz-cta-button']");
    await expect(ctaButton).toBeVisible();
    await expect(ctaButton).toHaveAttribute("href", "/#quiz");
  });

  test("HowTo structured data script tag exists", async ({ page }) => {
    await page.goto("/guides/servicer/mohela");

    const howtoScript = page.locator(
      "[data-testid='howto-structured-data']",
    );
    await expect(howtoScript).toBeAttached();

    const content = await howtoScript.innerHTML();
    const json = JSON.parse(content);
    expect(json["@type"]).toBe("HowTo");
    expect(json.step.length).toBeGreaterThan(0);
  });

  test("FAQ structured data script tag exists", async ({ page }) => {
    await page.goto("/guides/servicer/mohela");

    const scripts = page.locator("script[type='application/ld+json']");
    const count = await scripts.count();
    let hasFAQ = false;
    for (let i = 0; i < count; i++) {
      const content = await scripts.nth(i).innerHTML();
      const json = JSON.parse(content);
      if (json["@type"] === "FAQPage") {
        hasFAQ = true;
        expect(json.mainEntity.length).toBeGreaterThan(0);
      }
    }
    expect(hasFAQ).toBe(true);
  });

  test("breadcrumb navigation is present", async ({ page }) => {
    await page.goto("/guides/servicer/nelnet");

    const breadcrumb = page.locator("[data-testid='servicer-breadcrumb']");
    await expect(breadcrumb).toBeVisible();
    await expect(breadcrumb).toContainText("Home");
    await expect(breadcrumb).toContainText("Guides");
    await expect(breadcrumb).toContainText("Nelnet");
  });

  test("last verified badge is shown", async ({ page }) => {
    await page.goto("/guides/servicer/aidvantage");

    const badge = page.locator("[data-testid='servicer-last-verified']");
    await expect(badge).toBeVisible();
    await expect(badge).toContainText("Last verified:");
  });

  test("related servicer guides link to other servicers", async ({ page }) => {
    await page.goto("/guides/servicer/mohela");

    // Should link to at least nelnet and aidvantage
    await expect(
      page.locator("[data-testid='related-servicer-nelnet']"),
    ).toBeVisible();
    await expect(
      page.locator("[data-testid='related-servicer-aidvantage']"),
    ).toBeVisible();
  });

  test("related recovery guides section has links", async ({ page }) => {
    await page.goto("/guides/servicer/edfinancial");

    await expect(
      page.locator("[data-testid='related-guide-ibr']"),
    ).toBeVisible();
    await expect(
      page.locator("[data-testid='related-guide-rehabilitation']"),
    ).toBeVisible();
    await expect(
      page.locator("[data-testid='related-guide-consolidation']"),
    ).toBeVisible();
  });

  test("great-lakes page shows transition info", async ({ page }) => {
    await page.goto("/guides/servicer/great-lakes");

    await expect(
      page.locator("[data-testid='servicer-page-great-lakes']"),
    ).toBeVisible();

    // Transition info banner
    await expect(
      page.locator("[data-testid='servicer-transition-info']"),
    ).toBeVisible();

    // Links to MOHELA and Nelnet guides
    await expect(
      page.locator("[data-testid='transition-link-mohela']"),
    ).toBeVisible();
    await expect(
      page.locator("[data-testid='transition-link-nelnet']"),
    ).toBeVisible();
  });

  for (const slug of SERVICER_SLUGS) {
    test(`/guides/servicer/${slug} loads without errors`, async ({ page }) => {
      const response = await page.goto(`/guides/servicer/${slug}`);
      expect(response?.status()).toBe(200);

      // Page wrapper exists
      await expect(
        page.locator(`[data-testid='servicer-page-${slug}']`),
      ).toBeVisible();

      // Core sections exist
      await expect(
        page.locator("[data-testid='servicer-name']"),
      ).toBeVisible();
      await expect(
        page.locator("[data-testid='servicer-phone']"),
      ).toBeVisible();
      await expect(
        page.locator("[data-testid='servicer-ibr-section']"),
      ).toBeVisible();
      await expect(
        page.locator("[data-testid='servicer-rehab-section']"),
      ).toBeVisible();
    });
  }

  test("nonexistent servicer returns 404", async ({ page }) => {
    const response = await page.goto("/guides/servicer/nonexistent");
    expect(response?.status()).toBe(404);
  });
});
