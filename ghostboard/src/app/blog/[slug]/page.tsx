import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostBySlug, getAllBlogSlugs } from "@/lib/blog";

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Post Not Found | GhostBoard" };

  return {
    title: `${post.title} | GhostBoard Blog`,
    description: post.description,
    openGraph: {
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      tags: post.tags,
      siteName: "GhostBoard",
    },
  };
}

/** Convert markdown-like content to basic HTML */
function renderContent(content: string): string {
  return content
    .split("\n\n")
    .map((block) => {
      const trimmed = block.trim();
      if (trimmed.startsWith("## ")) {
        return `<h2 class="mt-8 mb-3 text-2xl font-bold text-foreground">${trimmed.slice(3)}</h2>`;
      }
      if (trimmed.startsWith("### ")) {
        return `<h3 class="mt-6 mb-2 text-xl font-semibold text-foreground">${trimmed.slice(4)}</h3>`;
      }
      if (trimmed.startsWith("- **")) {
        const items = trimmed.split("\n").map((line) => {
          const formatted = line
            .replace(/^- /, "")
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
          return `<li class="ml-4">${formatted}</li>`;
        });
        return `<ul class="my-3 list-disc space-y-1 pl-4 text-muted">${items.join("")}</ul>`;
      }
      if (trimmed.startsWith("1. ")) {
        const items = trimmed.split("\n").map((line) => {
          const formatted = line
            .replace(/^\d+\. /, "")
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
          return `<li class="ml-4">${formatted}</li>`;
        });
        return `<ol class="my-3 list-decimal space-y-1 pl-4 text-muted">${items.join("")}</ol>`;
      }
      if (trimmed.startsWith("> ")) {
        const text = trimmed.slice(2).replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
        return `<blockquote class="my-4 border-l-4 border-primary pl-4 italic text-muted">${text}</blockquote>`;
      }
      const formatted = trimmed
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>");
      return `<p class="my-3 leading-relaxed text-muted">${formatted}</p>`;
    })
    .join("");
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "GhostBoard",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />

      <article
        data-testid="blog-post"
        className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8"
      >
        <header className="mb-8">
          <h1
            data-testid="blog-post-title"
            className="text-3xl font-bold text-foreground sm:text-4xl"
          >
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted">
            <time data-testid="blog-post-date" dateTime={post.publishedAt}>
              {post.publishedAt}
            </time>
            <span data-testid="blog-post-author">{post.author}</span>
          </div>
          <div className="mt-3 flex gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-secondary px-3 py-1 text-xs text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div
          data-testid="blog-post-content"
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
        />

        <div className="mt-12 border-t border-border pt-8">
          <Link
            href="/blog"
            data-testid="back-to-blog"
            className="text-sm text-primary hover:underline"
          >
            &larr; All Articles
          </Link>
        </div>
      </article>
    </>
  );
}
