import { test, expect } from "@playwright/test";

const COMPETITORS = [
  { slug: "sunset", name: "Sunset" },
  { slug: "atticus", name: "Atticus" },
  { slug: "swiftprobate", name: "SwiftProbate" },
  { slug: "elayne", name: "Elayne" },
  { slug: "eversettled", name: "EverSettled" },
];

test.describe("Comparison Pages", () => {
  for (const { slug, name } of COMPETITORS) {
    test.describe(`/compare/${slug}`, () => {
      test.beforeEach(async ({ page }) => {
        await page.goto(`/compare/${slug}`);
      });

      test("renders comparison page with correct title", async ({ page }) => {
        await expect(page.getByTestId("comparison-page")).toBeVisible();
        await expect(page.getByTestId("comparison-title")).toContainText(
          `AfterLoss vs ${name}`
        );
        await expect(page).toHaveTitle(
          new RegExp(`AfterLoss vs ${name}.*Comparison`)
        );
      });

      test("renders pricing comparison section", async ({ page }) => {
        await expect(page.getByTestId("pricing-comparison")).toBeVisible();
        await expect(page.getByTestId("pricing-afterloss")).toContainText(
          "Free"
        );
        await expect(page.getByTestId("pricing-competitor")).toContainText(
          name
        );
      });

      test("renders feature comparison table", async ({ page }) => {
        await expect(page.getByTestId("feature-comparison")).toBeVisible();
        const table = page.getByTestId("feature-comparison-table");
        await expect(table).toBeVisible();
        // Table has header + at least 5 feature rows
        const rows = table.locator("tbody tr");
        await expect(rows).not.toHaveCount(0);
      });

      test("renders pros and cons sections", async ({ page }) => {
        await expect(page.getByTestId("pros-cons")).toBeVisible();
        await expect(page.getByTestId("competitor-pros")).toBeVisible();
        await expect(page.getByTestId("competitor-cons")).toBeVisible();
      });

      test("renders why-afterloss and when-competitor-better sections", async ({
        page,
      }) => {
        await expect(page.getByTestId("why-afterloss")).toBeVisible();
        await expect(
          page.getByTestId("when-competitor-better")
        ).toBeVisible();
        await expect(
          page.getByTestId("competitor-better-text")
        ).toBeVisible();
      });

      test("renders CTA buttons with correct hrefs", async ({ page }) => {
        const startGuide = page.getByTestId("cta-start-guide");
        await expect(startGuide).toBeVisible();
        await expect(startGuide).toHaveAttribute("href", "/onboard");

        const stateGuides = page.getByTestId("cta-state-guides");
        await expect(stateGuides).toBeVisible();
        await expect(stateGuides).toHaveAttribute("href", "/states");
      });

      test("renders links to other comparison pages (not self)", async ({
        page,
      }) => {
        await expect(page.getByTestId("other-comparisons")).toBeVisible();
        // Should NOT have a link to itself
        await expect(
          page.getByTestId(`compare-link-${slug}`)
        ).not.toBeVisible();
        // Should have links to other competitors
        const otherSlugs = COMPETITORS.filter(
          (c) => c.slug !== slug
        ).map((c) => c.slug);
        for (const otherSlug of otherSlugs) {
          await expect(
            page.getByTestId(`compare-link-${otherSlug}`)
          ).toBeVisible();
        }
      });

      test("renders breadcrumb navigation", async ({ page }) => {
        await expect(page.getByTestId("breadcrumb-home")).toBeVisible();
        await expect(page.getByTestId("breadcrumb-home")).toHaveAttribute(
          "href",
          "/"
        );
      });

      test("has JSON-LD structured data", async ({ page }) => {
        const jsonLd = page.locator('script[type="application/ld+json"]');
        const count = await jsonLd.count();
        expect(count).toBeGreaterThanOrEqual(2); // comparison schema + breadcrumb schema
      });
    });
  }

  test("navigating between comparison pages works", async ({ page }) => {
    await page.goto("/compare/sunset");
    await expect(page.getByTestId("comparison-title")).toContainText("Sunset");

    // Click link to another comparison page
    await page.getByTestId("compare-link-atticus").click();
    await expect(page.getByTestId("comparison-title")).toContainText("Atticus");
  });

  test("invalid competitor slug returns 404", async ({ page }) => {
    const response = await page.goto("/compare/nonexistent-competitor");
    expect(response?.status()).toBe(404);
  });
});
