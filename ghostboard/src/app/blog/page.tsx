import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Employer Ghosting Insights | GhostBoard",
  description:
    "Articles and data-driven insights about employer ghosting, hiring transparency, and job search strategies from GhostBoard.",
};

export default function BlogIndex() {
  const posts = getAllBlogPosts();

  return (
    <div data-testid="blog-page" className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1
        data-testid="blog-title"
        className="text-3xl font-bold text-foreground sm:text-4xl"
      >
        GhostBoard Blog
      </h1>
      <p className="mt-3 text-lg text-muted">
        Insights, data, and advice on employer ghosting and the job search.
      </p>

      <div data-testid="blog-posts" className="mt-10 space-y-8">
        {posts.map((post) => (
          <article
            key={post.slug}
            data-testid={`blog-post-${post.slug}`}
            className="rounded-xl border border-border p-6 transition-colors hover:bg-secondary"
          >
            <Link href={`/blog/${post.slug}`} data-testid={`blog-link-${post.slug}`}>
              <h2 className="text-xl font-semibold text-foreground hover:text-primary transition-colors">
                {post.title}
              </h2>
            </Link>
            <p className="mt-2 text-sm text-muted">{post.description}</p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted">
              <time dateTime={post.publishedAt}>{post.publishedAt}</time>
              <span>{post.author}</span>
              <div className="flex gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-secondary px-2 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
