import { test, expect } from "@playwright/test";

test.describe("Quiz page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/quiz");
  });

  test("renders quiz page with title and quiz funnel", async ({ page }) => {
    await expect(page.getByTestId("quiz-page")).toBeVisible();
    await expect(page.getByTestId("quiz-page-title")).toContainText(
      "Student Loan Credit Score Recovery Quiz",
    );
    await expect(page.getByTestId("quiz-funnel")).toBeVisible();
  });
});

test.describe("FAQ page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/faq");
  });

  test("renders FAQ page with title and categories", async ({ page }) => {
    await expect(page.getByTestId("faq-page")).toBeVisible();
    await expect(page.getByTestId("faq-page-title")).toContainText(
      "Frequently Asked Questions",
    );
    await expect(page.getByTestId("faq-toc")).toBeVisible();
  });

  test("FAQ page has CTA to quiz", async ({ page }) => {
    await expect(page.getByTestId("faq-cta")).toBeVisible();
  });
});

test.describe("About page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/about");
  });

  test("renders about page with all sections", async ({ page }) => {
    await expect(page.getByTestId("about-page")).toBeVisible();
    await expect(page.getByTestId("about-title")).toContainText(
      "About ScoreRebound",
    );
    await expect(page.getByTestId("about-mission")).toBeVisible();
    await expect(page.getByTestId("about-how-it-works")).toBeVisible();
    await expect(page.getByTestId("about-free")).toBeVisible();
    await expect(page.getByTestId("about-disclaimer")).toBeVisible();
  });

  test("about page has CTA to quiz", async ({ page }) => {
    await expect(page.getByTestId("about-cta")).toBeVisible();
    await expect(page.getByTestId("about-cta-link")).toHaveAttribute(
      "href",
      "/quiz",
    );
  });
});
