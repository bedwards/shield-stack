import { describe, it, expect } from "vitest";
import { getAllBlogPosts, getBlogPostBySlug, getAllBlogSlugs } from "./blog";

describe("Blog data layer", () => {
  it("returns all blog posts sorted by date", () => {
    const posts = getAllBlogPosts();
    expect(posts.length).toBeGreaterThan(0);

    // Verify sorted newest first
    for (let i = 1; i < posts.length; i++) {
      expect(
        new Date(posts[i - 1].publishedAt).getTime(),
      ).toBeGreaterThanOrEqual(new Date(posts[i].publishedAt).getTime());
    }
  });

  it("returns a post by slug", () => {
    const post = getBlogPostBySlug("what-is-employer-ghosting");
    expect(post).not.toBeNull();
    expect(post!.title).toContain("Employer Ghosting");
  });

  it("returns null for non-existent slug", () => {
    const post = getBlogPostBySlug("non-existent-post");
    expect(post).toBeNull();
  });

  it("returns all slugs for SSG", () => {
    const slugs = getAllBlogSlugs();
    expect(slugs.length).toBeGreaterThan(0);
    expect(slugs).toContain("what-is-employer-ghosting");
  });

  it("all posts have required fields", () => {
    const posts = getAllBlogPosts();
    for (const post of posts) {
      expect(post.slug).toBeTruthy();
      expect(post.title).toBeTruthy();
      expect(post.description).toBeTruthy();
      expect(post.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(post.author).toBeTruthy();
      expect(post.tags.length).toBeGreaterThan(0);
      expect(post.content.length).toBeGreaterThan(100);
    }
  });
});
