import { test, expect } from "@playwright/test";

test.describe("Navigation & anchor links", () => {
  test("header nav links have correct href anchors", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("nav-how-it-works")).toHaveAttribute(
      "href",
      "#how-it-works"
    );
    await expect(page.getByTestId("nav-recovery-paths")).toHaveAttribute(
      "href",
      "#recovery-paths"
    );
    await expect(page.getByTestId("nav-faq")).toHaveAttribute("href", "#faq");
    await expect(page.getByTestId("nav-cta")).toHaveAttribute("href", "#quiz");
  });

  test("logo links to home page", async ({ page }) => {
    await page.goto("/");
    const logoLink = page.getByTestId("logo-link");
    await expect(logoLink).toHaveAttribute("href", "/");
    await expect(logoLink).toContainText("ScoreRebound");
  });

  test("hero CTA buttons have correct anchors", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("hero-cta-primary")).toHaveAttribute(
      "href",
      "#quiz"
    );
    await expect(page.getByTestId("hero-cta-secondary")).toHaveAttribute(
      "href",
      "#how-it-works"
    );
  });

  test("recovery path Learn more links navigate to subpages", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page.getByTestId("path-ibr-link")).toHaveAttribute(
      "href",
      "/recovery/ibr"
    );
    await expect(page.getByTestId("path-rehabilitation-link")).toHaveAttribute(
      "href",
      "/recovery/rehabilitation"
    );
    await expect(page.getByTestId("path-consolidation-link")).toHaveAttribute(
      "href",
      "/recovery/consolidation"
    );
  });

  test("footer links point to correct pages", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("footer-link-ibr")).toHaveAttribute(
      "href",
      "/recovery/ibr"
    );
    await expect(
      page.getByTestId("footer-link-rehabilitation")
    ).toHaveAttribute("href", "/recovery/rehabilitation");
    await expect(
      page.getByTestId("footer-link-consolidation")
    ).toHaveAttribute("href", "/recovery/consolidation");
    await expect(
      page.getByTestId("footer-link-credit-building")
    ).toHaveAttribute("href", "/resources/credit-building");
    await expect(page.getByTestId("footer-link-servicers")).toHaveAttribute(
      "href",
      "/resources/servicer-contacts"
    );
    await expect(page.getByTestId("footer-link-privacy")).toHaveAttribute(
      "href",
      "/privacy"
    );
    await expect(page.getByTestId("footer-link-terms")).toHaveAttribute(
      "href",
      "/terms"
    );
  });

  test("CTA section start-quiz button has correct anchor", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page.getByTestId("cta-start-quiz")).toHaveAttribute(
      "href",
      "#quiz-start"
    );
    await expect(page.getByTestId("cta-start-quiz")).toContainText(
      "Start My Free Recovery Plan"
    );
  });
});
