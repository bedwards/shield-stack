import { test, expect } from "@playwright/test";

test.describe("Credit-Builder Comparison Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/compare/credit-builders");
  });

  test("page loads with correct title and meta description", async ({
    page,
  }) => {
    await expect(page).toHaveTitle(
      /Best Credit Builder Products.*Student Loan Recovery/,
    );
    const description = await page
      .locator('meta[name="description"]')
      .getAttribute("content");
    expect(description).toBeTruthy();
    expect(description!.length).toBeGreaterThan(50);
  });

  test("comparison page wrapper has correct data-testid", async ({ page }) => {
    await expect(page.locator("[data-testid='comparison-page']")).toBeVisible();
  });

  test("FTC disclosure is visible at top of page", async ({ page }) => {
    await expect(
      page.locator("[data-testid='comparison-disclosure']"),
    ).toBeVisible();
    await expect(
      page.locator("[data-testid='affiliate-disclosure']"),
    ).toBeVisible();
    await expect(
      page.locator("[data-testid='affiliate-disclosure']"),
    ).toContainText("commission");
  });

  test("comparison table renders with all 6 products", async ({ page }) => {
    const table = page.locator("[data-testid='comparison-table']");
    await expect(table).toBeVisible();

    const expectedProducts = [
      "self",
      "moneylion",
      "discover-secured",
      "capital-one-secured",
      "chime",
      "credit-karma",
    ];

    for (const slug of expectedProducts) {
      await expect(
        page.locator(`[data-testid='table-row-${slug}']`),
      ).toBeVisible();
    }
  });

  test("comparison table has sortable column headers", async ({ page }) => {
    const sortButtons = [
      "sort-name",
      "sort-type",
      "sort-monthly_cost",
      "sort-credit_bureaus_reported",
      "sort-min_credit_score",
      "sort-time_to_build_credit",
    ];

    for (const id of sortButtons) {
      await expect(page.locator(`[data-testid='${id}']`)).toBeVisible();
    }
  });

  test("clicking sort column reorders table rows", async ({ page }) => {
    // Sort by monthly cost
    await page.locator("[data-testid='sort-monthly_cost']").click();

    // After sorting by cost ascending, free products ($0) should come first
    const firstRow = page.locator("tbody tr").first();
    await expect(firstRow).toContainText("$0");
  });

  test("individual product cards render for all products", async ({ page }) => {
    const expectedProducts = [
      "self",
      "moneylion",
      "discover-secured",
      "capital-one-secured",
      "chime",
      "credit-karma",
    ];

    for (const slug of expectedProducts) {
      await expect(
        page.locator(`[data-testid='product-card-${slug}']`),
      ).toBeVisible();
    }
  });

  test("product cards have CTA buttons that use tracking endpoint", async ({
    page,
  }) => {
    const expectedProducts = [
      "self",
      "moneylion",
      "discover-secured",
      "capital-one-secured",
      "chime",
      "credit-karma",
    ];

    for (const slug of expectedProducts) {
      const cta = page.locator(`[data-testid='product-cta-${slug}']`);
      await expect(cta).toBeVisible();
      const href = await cta.getAttribute("href");
      expect(href).toContain("/api/affiliate/click");
      expect(href).toContain("referrer=");
      // Verify NO hardcoded external URLs
      expect(href).not.toContain("https://www.");
    }
  });

  test("table CTA links also use tracking endpoint", async ({ page }) => {
    const tableCTAs = page.locator("[data-testid^='table-cta-']");
    const count = await tableCTAs.count();
    expect(count).toBe(6);

    for (let i = 0; i < count; i++) {
      const href = await tableCTAs.nth(i).getAttribute("href");
      expect(href).toContain("/api/affiliate/click");
      expect(href).not.toContain("https://www.");
    }
  });

  test("quiz CTA section is visible and links to quiz", async ({ page }) => {
    const quizCta = page.locator("[data-testid='comparison-quiz-cta']");
    await expect(quizCta).toBeVisible();
    await expect(quizCta).toContainText("Take our 2-minute recovery quiz");

    const quizButton = page.locator("[data-testid='quiz-cta-button']");
    await expect(quizButton).toBeVisible();
    const href = await quizButton.getAttribute("href");
    expect(href).toContain("quiz");
  });

  test("table of contents has jump links for all products", async ({
    page,
  }) => {
    const toc = page.locator("[data-testid='comparison-toc']");
    await expect(toc).toBeVisible();

    // Verify TOC links exist
    await expect(page.locator("[data-testid='toc-table']")).toBeVisible();
    await expect(
      page.locator("[data-testid='toc-how-it-works']"),
    ).toBeVisible();
    await expect(page.locator("[data-testid='toc-self']")).toBeVisible();
    await expect(page.locator("[data-testid='toc-chime']")).toBeVisible();
    await expect(page.locator("[data-testid='toc-quiz']")).toBeVisible();
  });

  test("how credit-builder products work section is present", async ({
    page,
  }) => {
    await expect(
      page.locator("[data-testid='how-credit-builders-work']"),
    ).toBeVisible();
    await expect(
      page.locator("[data-testid='how-credit-builders-work']"),
    ).toContainText("Credit-Builder Loans");
    await expect(
      page.locator("[data-testid='how-credit-builders-work']"),
    ).toContainText("Secured Credit Cards");
    await expect(
      page.locator("[data-testid='how-credit-builders-work']"),
    ).toContainText("Credit Monitoring");
  });

  test("editors pick badge appears on Self Credit Builder", async ({
    page,
  }) => {
    await expect(
      page.locator("[data-testid='editors-pick-self']"),
    ).toBeVisible();
    await expect(
      page.locator("[data-testid='editors-pick-self']"),
    ).toContainText("Best for Recovery");
  });

  test("related recovery resources link to guide pages", async ({ page }) => {
    await expect(
      page.locator("[data-testid='related-link-ibr']"),
    ).toBeVisible();
    await expect(
      page.locator("[data-testid='related-link-rehabilitation']"),
    ).toBeVisible();
    await expect(
      page.locator("[data-testid='related-link-consolidation']"),
    ).toBeVisible();

    const ibrHref = await page
      .locator("[data-testid='related-link-ibr']")
      .getAttribute("href");
    expect(ibrHref).toBe("/guides/ibr-enrollment");
  });

  test("product structured data (JSON-LD) is present", async ({ page }) => {
    const jsonLd = page.locator(
      "[data-testid='product-structured-data']",
    );
    await expect(jsonLd).toBeAttached();
    const content = await jsonLd.textContent();
    const parsed = JSON.parse(content!);
    expect(parsed["@type"]).toBe("ItemList");
    expect(parsed.numberOfItems).toBe(6);
    expect(parsed.itemListElement).toHaveLength(6);
  });

  test("page has no console errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    await page.goto("/compare/credit-builders");
    await page.waitForLoadState("networkidle");

    expect(
      errors.filter((e) => !e.includes("favicon")),
      `Console errors: ${errors.join("; ")}`,
    ).toEqual([]);
  });

  test("mobile viewport renders without horizontal overflow", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/compare/credit-builders");
    await page.waitForLoadState("networkidle");

    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1);
  });

  test("page has correct semantic HTML structure", async ({ page }) => {
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBe(1);
  });
});
