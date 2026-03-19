import { test, expect } from "@playwright/test";

test.describe("State Guide Pages", () => {
  test.describe("States index page", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/states");
    });

    test("loads and displays title", async ({ page }) => {
      await expect(page.getByTestId("states-page-title")).toBeVisible();
    });

    test("displays state cards grid", async ({ page }) => {
      await expect(page.getByTestId("states-grid")).toBeVisible();
      // Verify at least 3 known state cards
      await expect(page.getByTestId("state-card-CA")).toBeVisible();
      await expect(page.getByTestId("state-card-TX")).toBeVisible();
      await expect(page.getByTestId("state-card-NY")).toBeVisible();
    });

    test("state cards link to guide pages", async ({ page }) => {
      const probateLink = page.getByTestId("state-link-probate-CA");
      await expect(probateLink).toBeVisible();
      await expect(probateLink).toHaveAttribute(
        "href",
        "/states/california/probate",
      );
    });

    test("displays CTA button", async ({ page }) => {
      const cta = page.getByTestId("states-cta-button");
      await expect(cta).toBeVisible();
      await expect(cta).toHaveAttribute("href", "/onboard");
    });

    test("displays breadcrumbs", async ({ page }) => {
      await expect(page.getByTestId("breadcrumbs")).toBeVisible();
    });
  });

  test.describe("California probate page", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/states/california/probate");
    });

    test("loads with state-specific title", async ({ page }) => {
      const title = page.getByTestId("probate-page-title");
      await expect(title).toBeVisible();
      await expect(title).toContainText("California");
      await expect(title).toContainText("Probate");
    });

    test("displays key stats with California data", async ({ page }) => {
      await expect(page.getByTestId("stat-threshold")).toContainText(
        "$208,850",
      );
      await expect(page.getByTestId("stat-deadline")).toContainText("30 days");
      await expect(page.getByTestId("stat-timeline")).toContainText(
        "12 months",
      );
    });

    test("displays probate steps", async ({ page }) => {
      await expect(page.getByTestId("probate-steps")).toBeVisible();
      await expect(page.getByTestId("probate-step-0")).toBeVisible();
    });

    test("displays required documents", async ({ page }) => {
      await expect(page.getByTestId("probate-documents")).toBeVisible();
    });

    test("displays verification badge", async ({ page }) => {
      await expect(
        page.getByTestId("probate-verification-badge"),
      ).toBeVisible();
    });

    test("displays FAQs", async ({ page }) => {
      await expect(page.getByTestId("probate-faq")).toBeVisible();
      await expect(page.getByTestId("probate-faq-0")).toBeVisible();
    });

    test("displays CTA with link to onboard", async ({ page }) => {
      const cta = page.getByTestId("probate-cta-button");
      await expect(cta).toBeVisible();
      await expect(cta).toHaveAttribute("href", "/onboard");
    });

    test("has JSON-LD structured data", async ({ page }) => {
      const jsonLd = await page.locator('script[type="application/ld+json"]');
      const count = await jsonLd.count();
      expect(count).toBeGreaterThanOrEqual(2); // breadcrumb + FAQ + HowTo
    });

    test("has breadcrumbs with correct hierarchy", async ({ page }) => {
      await expect(page.getByTestId("breadcrumbs")).toBeVisible();
      await expect(page.getByTestId("breadcrumb-0")).toContainText("Home");
      await expect(page.getByTestId("breadcrumb-1")).toContainText(
        "State Guides",
      );
    });

    test("links to related state guides", async ({ page }) => {
      await expect(page.getByTestId("related-small-estate")).toBeVisible();
      await expect(page.getByTestId("related-death-certificate")).toBeVisible();
    });
  });

  test.describe("Texas small estate page", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/states/texas/small-estate");
    });

    test("loads with state-specific title", async ({ page }) => {
      const title = page.getByTestId("small-estate-page-title");
      await expect(title).toBeVisible();
      await expect(title).toContainText("Texas");
      await expect(title).toContainText("Small Estate");
    });

    test("displays key stats with Texas data", async ({ page }) => {
      await expect(page.getByTestId("stat-limit")).toContainText("$75,000");
    });

    test("displays step-by-step process", async ({ page }) => {
      await expect(page.getByTestId("small-estate-steps")).toBeVisible();
      await expect(page.getByTestId("small-estate-step-0")).toBeVisible();
    });

    test("links to related guides", async ({ page }) => {
      await expect(page.getByTestId("related-probate")).toBeVisible();
      await expect(page.getByTestId("related-death-certificate")).toBeVisible();
    });

    test("displays CTA", async ({ page }) => {
      await expect(page.getByTestId("small-estate-cta-button")).toBeVisible();
    });
  });

  test.describe("New York death certificate page", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/states/new-york/death-certificate");
    });

    test("loads with state-specific title", async ({ page }) => {
      const title = page.getByTestId("death-cert-page-title");
      await expect(title).toBeVisible();
      await expect(title).toContainText("New York");
      await expect(title).toContainText("Death Certificate");
    });

    test("displays why you need copies section", async ({ page }) => {
      await expect(page.getByTestId("death-cert-why")).toBeVisible();
    });

    test("displays step-by-step process", async ({ page }) => {
      await expect(page.getByTestId("death-cert-steps")).toBeVisible();
      await expect(page.getByTestId("death-cert-step-0")).toBeVisible();
    });

    test("displays FAQs", async ({ page }) => {
      await expect(page.getByTestId("death-cert-faq")).toBeVisible();
      await expect(page.getByTestId("death-cert-faq-0")).toBeVisible();
    });

    test("links to related guides", async ({ page }) => {
      await expect(page.getByTestId("related-probate")).toBeVisible();
      await expect(page.getByTestId("related-small-estate")).toBeVisible();
    });

    test("displays CTA", async ({ page }) => {
      await expect(page.getByTestId("death-cert-cta-button")).toBeVisible();
    });
  });

  test.describe("Invalid state slug returns 404", () => {
    test("returns 404 for non-existent state", async ({ page }) => {
      const response = await page.goto("/states/not-a-state/probate");
      expect(response?.status()).toBe(404);
    });
  });
});
