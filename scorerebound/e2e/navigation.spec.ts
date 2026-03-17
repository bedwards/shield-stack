import { test, expect } from "@playwright/test";

test.describe("Navigation & anchor links", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("header nav links have correct href anchors", async ({ page }) => {
    await expect(page.getByTestId("nav-how-it-works")).toHaveAttribute(
      "href",
      "#how-it-works",
    );
    await expect(page.getByTestId("nav-recovery-paths")).toHaveAttribute(
      "href",
      "#recovery-paths",
    );
    await expect(page.getByTestId("nav-faq")).toHaveAttribute("href", "#faq");
    await expect(page.getByTestId("nav-cta")).toHaveAttribute("href", "#quiz");
  });

  test("logo links to home page", async ({ page }) => {
    const logoLink = page.getByTestId("logo-link");
    await expect(logoLink).toHaveAttribute("href", "/");
    await expect(logoLink).toContainText("ScoreRebound");
  });

  test("hero CTA buttons have correct anchors", async ({ page }) => {
    await expect(page.getByTestId("hero-cta-primary")).toHaveAttribute(
      "href",
      "#quiz",
    );
    await expect(page.getByTestId("hero-cta-secondary")).toHaveAttribute(
      "href",
      "#how-it-works",
    );
  });

  test("recovery path Learn more links navigate to guide pages", async ({
    page,
  }) => {
    await expect(page.getByTestId("path-ibr-link")).toHaveAttribute(
      "href",
      "/guide/ibr",
    );
    await expect(page.getByTestId("path-rehabilitation-link")).toHaveAttribute(
      "href",
      "/guide/rehabilitation",
    );
    await expect(page.getByTestId("path-consolidation-link")).toHaveAttribute(
      "href",
      "/guide/consolidation",
    );
  });

  test("footer links point to correct pages", async ({ page }) => {
    await expect(page.getByTestId("footer-link-ibr")).toHaveAttribute(
      "href",
      "/guide/ibr",
    );
    await expect(
      page.getByTestId("footer-link-rehabilitation"),
    ).toHaveAttribute("href", "/guide/rehabilitation");
    await expect(
      page.getByTestId("footer-link-consolidation"),
    ).toHaveAttribute("href", "/guide/consolidation");
    await expect(page.getByTestId("footer-link-servicers")).toHaveAttribute(
      "href",
      "/servicer/mohela",
    );
    await expect(page.getByTestId("footer-link-privacy")).toHaveAttribute(
      "href",
      "/privacy",
    );
    await expect(page.getByTestId("footer-link-terms")).toHaveAttribute(
      "href",
      "/terms",
    );
  });

  test("CTA section contains the quiz funnel", async ({ page }) => {
    const ctaSection = page.getByTestId("cta-section");
    await expect(ctaSection).toBeVisible();
    await expect(ctaSection).toContainText("Start Your Free Recovery Plan");
    await expect(ctaSection).toContainText("No signup required");
    await expect(ctaSection.getByTestId("quiz-funnel")).toBeVisible();
  });
});
