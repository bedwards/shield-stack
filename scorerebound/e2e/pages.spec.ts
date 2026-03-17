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

test.describe("Guide pages", () => {
  const guides = [
    {
      slug: "ibr",
      title: "Income-Based Repayment (IBR)",
    },
    {
      slug: "rehabilitation",
      title: "Loan Rehabilitation",
    },
    {
      slug: "consolidation",
      title: "Direct Consolidation Loan",
    },
  ];

  for (const guide of guides) {
    test(`${guide.slug} guide page renders correctly`, async ({ page }) => {
      await page.goto(`/guide/${guide.slug}`);

      await expect(page.getByTestId("guide-page")).toBeVisible();
      await expect(page.getByTestId("guide-title")).toContainText(
        guide.title,
      );
      await expect(page.getByTestId("guide-description")).toBeVisible();
      await expect(page.getByTestId("guide-timeline")).toBeVisible();
      await expect(page.getByTestId("guide-eligibility")).toBeVisible();
      await expect(page.getByTestId("guide-steps")).toBeVisible();
      await expect(page.getByTestId("guide-step-0")).toBeVisible();
      await expect(page.getByTestId("guide-pros-cons")).toBeVisible();
      await expect(page.getByTestId("guide-best-for")).toBeVisible();
      await expect(page.getByTestId("guide-faq")).toBeVisible();
      await expect(page.getByTestId("guide-cta-link")).toHaveAttribute(
        "href",
        "/quiz",
      );
    });
  }

  test("guide page has breadcrumb navigation", async ({ page }) => {
    await page.goto("/guide/ibr");
    await expect(page.getByTestId("guide-breadcrumb")).toBeVisible();
    await expect(page.getByTestId("breadcrumb-home")).toHaveAttribute(
      "href",
      "/",
    );
  });
});

test.describe("Servicer pages", () => {
  const servicers = [
    { slug: "mohela", name: "MOHELA" },
    { slug: "nelnet", name: "Nelnet" },
    { slug: "aidvantage", name: "Aidvantage" },
    { slug: "edfinancial", name: "EdFinancial" },
  ];

  for (const servicer of servicers) {
    test(`${servicer.slug} servicer page renders correctly`, async ({
      page,
    }) => {
      await page.goto(`/servicer/${servicer.slug}`);

      await expect(page.getByTestId("servicer-page")).toBeVisible();
      await expect(page.getByTestId("servicer-title")).toContainText(
        servicer.name,
      );
      await expect(page.getByTestId("servicer-contact")).toBeVisible();
      await expect(page.getByTestId("servicer-phone")).toBeVisible();
      await expect(page.getByTestId("servicer-website")).toBeVisible();
      await expect(page.getByTestId("servicer-hours")).toBeVisible();
      await expect(page.getByTestId("servicer-notes")).toBeVisible();
      await expect(page.getByTestId("servicer-recovery-options")).toBeVisible();
      await expect(page.getByTestId("servicer-cta-link")).toHaveAttribute(
        "href",
        "/quiz",
      );
    });
  }

  test("servicer page has breadcrumb navigation", async ({ page }) => {
    await page.goto("/servicer/mohela");
    await expect(page.getByTestId("servicer-breadcrumb")).toBeVisible();
    await expect(page.getByTestId("breadcrumb-home")).toHaveAttribute(
      "href",
      "/",
    );
  });
});

test.describe("FAQ page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/faq");
  });

  test("renders FAQ page with title and accordion", async ({ page }) => {
    await expect(page.getByTestId("faq-page")).toBeVisible();
    await expect(page.getByTestId("faq-page-title")).toContainText(
      "Frequently Asked Questions",
    );
    await expect(page.getByTestId("faq-list")).toBeVisible();
    await expect(page.getByTestId("faq-item-0")).toBeVisible();
  });

  test("FAQ accordion expands and collapses", async ({ page }) => {
    await page.getByTestId("faq-toggle-0").click();
    await expect(page.getByTestId("faq-answer-0")).toBeVisible();

    await page.getByTestId("faq-toggle-0").click();
    await expect(page.getByTestId("faq-answer-0")).not.toBeVisible();
  });

  test("FAQ page has CTA to quiz", async ({ page }) => {
    await expect(page.getByTestId("faq-cta")).toBeVisible();
    await expect(page.getByTestId("faq-cta-link")).toHaveAttribute(
      "href",
      "/quiz",
    );
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
