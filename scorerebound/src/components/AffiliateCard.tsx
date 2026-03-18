"use client";

import type { AffiliateProduct } from "@/lib/affiliates";

interface AffiliateCardProps {
  product: AffiliateProduct;
  /** Page path for referrer tracking (e.g., "/plan/abc123") */
  referrerPage?: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  credit_builder: "Credit Builder",
  secured_card: "Secured Card",
  credit_monitoring: "Credit Monitoring",
  refinancing: "Refinancing",
};

const CATEGORY_COLORS: Record<string, string> = {
  credit_builder: "bg-purple-100 text-purple-700",
  secured_card: "bg-blue-100 text-blue-700",
  credit_monitoring: "bg-teal-100 text-teal-700",
  refinancing: "bg-amber-100 text-amber-700",
};

export default function AffiliateCard({ product, referrerPage }: AffiliateCardProps) {
  const clickUrl = `/api/affiliate/click?slug=${encodeURIComponent(product.slug)}${
    referrerPage ? `&referrer=${encodeURIComponent(referrerPage)}` : ""
  }`;

  return (
    <div
      data-testid={`affiliate-card-${product.slug}`}
      className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h4
          data-testid={`affiliate-name-${product.slug}`}
          className="text-base font-semibold text-gray-900"
        >
          {product.name}
        </h4>
        <span
          data-testid={`affiliate-category-${product.slug}`}
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
            CATEGORY_COLORS[product.category] ?? "bg-gray-100 text-gray-700"
          }`}
        >
          {CATEGORY_LABELS[product.category] ?? product.category}
        </span>
      </div>

      <p
        data-testid={`affiliate-description-${product.slug}`}
        className="text-sm text-gray-600 mb-2"
      >
        {product.description}
      </p>

      <p
        data-testid={`affiliate-why-${product.slug}`}
        className="text-xs text-emerald-700 italic mb-4"
      >
        {product.whyRecommended}
      </p>

      <a
        href={clickUrl}
        data-testid={`affiliate-cta-${product.slug}`}
        className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 transition-colors"
        rel="noopener noreferrer sponsored"
      >
        {product.ctaText}
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
            clipRule="evenodd"
          />
        </svg>
      </a>
    </div>
  );
}

// ============================================================================
// FTC Disclosure — must appear near affiliate content
// ============================================================================

export function AffiliateDisclosure() {
  return (
    <p
      data-testid="affiliate-disclosure"
      className="text-xs text-gray-500 leading-relaxed"
    >
      <span className="font-medium">Disclosure:</span> ScoreRebound may earn a
      commission if you sign up for products through our links. This does not
      affect our recommendations &mdash; we only suggest products that genuinely
      help with credit recovery.
    </p>
  );
}
