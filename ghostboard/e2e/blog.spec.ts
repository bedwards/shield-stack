import { test, expect } from "@playwright/test";

test.describe("Blog Pages", () => {
  test("blog index lists all articles", async ({ page }) => {
    await page.goto("/blog");
    await expect(page.getByTestId("blog-page")).toBeVisible();
    await expect(page.getByTestId("blog-title")).toBeVisible();
    await expect(page.getByTestId("blog-posts")).toBeVisible();
    await expect(
      page.getByTestId("blog-post-what-is-employer-ghosting"),
    ).toBeVisible();
  });

  test("blog post page renders content", async ({ page }) => {
    await page.goto("/blog/what-is-employer-ghosting");
    await expect(page.getByTestId("blog-post")).toBeVisible();
    await expect(page.getByTestId("blog-post-title")).toBeVisible();
    await expect(page.getByTestId("blog-post-content")).toBeVisible();
    await expect(page.getByTestId("blog-post-date")).toBeVisible();
    await expect(page.getByTestId("blog-post-author")).toBeVisible();
    await expect(page.getByTestId("back-to-blog")).toBeVisible();
  });

  test("blog post has correct title in head", async ({ page }) => {
    await page.goto("/blog/what-is-employer-ghosting");
    await expect(page).toHaveTitle(/Employer Ghosting/);
  });

  test("blog post has Schema.org structured data", async ({ page }) => {
    await page.goto("/blog/what-is-employer-ghosting");
    const jsonLd = page.locator('script[type="application/ld+json"]');
    const content = await jsonLd.textContent();
    expect(content).toBeTruthy();
    const parsed = JSON.parse(content!);
    expect(parsed["@type"]).toBe("BlogPosting");
  });

  test("clicking blog link from index navigates to post", async ({ page }) => {
    await page.goto("/blog");
    await page.getByTestId("blog-link-what-is-employer-ghosting").click();
    await expect(page.getByTestId("blog-post")).toBeVisible();
  });
});
