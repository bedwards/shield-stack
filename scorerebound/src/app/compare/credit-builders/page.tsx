import type { Metadata } from "next";
import Link from "next/link";
import {
  CREDIT_BUILDER_PRODUCTS,
  TYPE_LABELS,
} from "@/data/credit-builder-products";
import ComparisonTable from "@/components/ComparisonTable";
import { AffiliateDisclosure } from "@/components/AffiliateCard";

export const metadata: Metadata = {
  title:
    "Best Credit Builder Products for Student Loan Recovery (2026) | ScoreRebound",
  description:
    "Compare the best credit-builder loans, secured cards, and credit monitoring tools for rebuilding your score after student loan delinquency. Side-by-side pricing, bureau coverage, and pros/cons.",
  openGraph: {
    type: "article",
    siteName: "ScoreRebound",
  },
};

const TYPE_COLORS: Record<string, string> = {
  "credit-builder-loan": "bg-purple-100 text-purple-700",
  "secured-card": "bg-blue-100 text-blue-700",
  "credit-monitoring": "bg-teal-100 text-teal-700",
};

export default function CreditBuildersComparisonPage() {
  return (
    <div data-testid="comparison-page">
      {/* Hero / Intro */}
      <section className="bg-gradient-to-b from-emerald-50 to-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1
            data-testid="comparison-title"
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Best Credit Builder Products for Student Loan Recovery
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Rebuilding your credit after student loan delinquency takes the right
            tools. We compared the top credit-builder loans, secured cards, and
            monitoring services so you can pick the best fit.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-20">
        {/* FTC Disclosure */}
        <div
          data-testid="comparison-disclosure"
          className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-4"
        >
          <AffiliateDisclosure />
        </div>

        {/* Table of Contents */}
        <nav
          data-testid="comparison-toc"
          className="mt-10 rounded-lg border border-gray-200 bg-gray-50 p-5"
        >
          <h2 className="text-sm font-semibold text-gray-900 mb-3">
            On This Page
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <li>
              <a
                href="#comparison-table-section"
                data-testid="toc-table"
                className="text-emerald-700 hover:text-emerald-600"
              >
                Side-by-Side Comparison Table
              </a>
            </li>
            <li>
              <a
                href="#how-it-works-section"
                data-testid="toc-how-it-works"
                className="text-emerald-700 hover:text-emerald-600"
              >
                How Credit-Builder Products Work
              </a>
            </li>
            {CREDIT_BUILDER_PRODUCTS.map((product) => (
              <li key={product.slug}>
                <a
                  href={`#${product.slug}`}
                  data-testid={`toc-${product.slug}`}
                  className="text-emerald-700 hover:text-emerald-600"
                >
                  {product.name}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#quiz-section"
                data-testid="toc-quiz"
                className="text-emerald-700 hover:text-emerald-600"
              >
                Which Is Right for Me?
              </a>
            </li>
          </ul>
        </nav>

        {/* Comparison Table */}
        <section id="comparison-table-section" className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Side-by-Side Comparison
          </h2>
          <ComparisonTable products={CREDIT_BUILDER_PRODUCTS} />
        </section>

        {/* How Credit-Builder Products Work */}
        <section
          id="how-it-works-section"
          data-testid="how-credit-builders-work"
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How Credit-Builder Products Work
          </h2>
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              Credit-builder products help you establish or rebuild positive
              payment history — the single most important factor in your credit
              score (35% of your FICO score). They come in three main types:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-lg border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Credit-Builder Loans
                </h3>
                <p className="text-sm text-gray-600">
                  You make fixed monthly payments into a savings account. The
                  lender reports your on-time payments to credit bureaus. At the
                  end of the term, you receive the saved amount (minus interest
                  and fees).
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Secured Credit Cards
                </h3>
                <p className="text-sm text-gray-600">
                  You put down a refundable security deposit that becomes your
                  credit limit. Use the card for everyday purchases, pay the
                  balance each month, and the issuer reports your activity to
                  credit bureaus.
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Credit Monitoring
                </h3>
                <p className="text-sm text-gray-600">
                  Monitoring services don&apos;t build credit directly, but they
                  let you track your score, catch errors on your report, and see
                  exactly how your recovery actions affect your score over time.
                </p>
              </div>
            </div>
            <p>
              For the fastest credit recovery after student loan delinquency, we
              recommend pairing a credit-builder loan <em>or</em> secured card
              with free credit monitoring. This gives you both the positive
              payment history and the visibility to track progress.
            </p>
          </div>
        </section>

        {/* Individual Product Cards */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Detailed Product Reviews
          </h2>
          <div className="space-y-8">
            {CREDIT_BUILDER_PRODUCTS.map((product) => (
              <article
                key={product.slug}
                id={product.slug}
                data-testid={`product-card-${product.slug}`}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-gray-900">
                      {product.name}
                    </h3>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        TYPE_COLORS[product.type] ?? "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {TYPE_LABELS[product.type]}
                    </span>
                    {product.editors_pick && (
                      <span
                        data-testid={`editors-pick-${product.slug}`}
                        className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800"
                      >
                        Best for Recovery
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      {product.monthly_cost}
                    </p>
                    {product.annual_fee !== "$0" && (
                      <p className="text-sm text-gray-500">
                        + {product.annual_fee}/yr
                      </p>
                    )}
                  </div>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 text-sm">
                  <div>
                    <p className="text-gray-500">Bureaus Reported</p>
                    <p className="font-medium text-gray-900">
                      {product.credit_bureaus_reported.length === 3
                        ? "All 3"
                        : product.credit_bureaus_reported.join(", ")}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Min Score</p>
                    <p className="font-medium text-gray-900">
                      {product.min_credit_score}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Time to Results</p>
                    <p className="font-medium text-gray-900">
                      {product.time_to_build_credit}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Credit Limit / Savings</p>
                    <p className="font-medium text-gray-900">
                      {product.credit_limit_or_savings}
                    </p>
                  </div>
                </div>

                {/* Best for */}
                <p className="text-sm text-emerald-700 italic mb-5">
                  Best for: {product.best_for}
                </p>

                {/* Pros / Cons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">
                      Pros
                    </h4>
                    <ul className="space-y-1.5 text-sm text-gray-700">
                      {product.pros.map((pro) => (
                        <li key={pro} className="flex items-start gap-2">
                          <svg
                            className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">
                      Cons
                    </h4>
                    <ul className="space-y-1.5 text-sm text-gray-700">
                      {product.cons.map((con) => (
                        <li key={con} className="flex items-start gap-2">
                          <svg
                            className="mt-0.5 h-4 w-4 shrink-0 text-red-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                          </svg>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA */}
                <a
                  href={`/api/affiliate/click?slug=${encodeURIComponent(product.affiliate_slug)}&referrer=${encodeURIComponent("/compare/credit-builders")}`}
                  data-testid={`product-cta-${product.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-500 transition-colors"
                  rel="noopener noreferrer sponsored"
                >
                  {product.type === "credit-monitoring"
                    ? "Start Free Monitoring"
                    : "Get Started"}
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* Related Resources */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Related Recovery Resources
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/guides/ibr-enrollment"
              data-testid="related-link-ibr"
              className="rounded-lg border border-gray-200 p-4 hover:border-emerald-300 hover:shadow-sm transition-all"
            >
              <h3 className="font-semibold text-gray-900 text-sm">
                IBR Enrollment Guide
              </h3>
              <p className="mt-1 text-xs text-gray-600">
                Lower your monthly student loan payment based on income.
              </p>
            </Link>
            <Link
              href="/guides/loan-rehabilitation"
              data-testid="related-link-rehabilitation"
              className="rounded-lg border border-gray-200 p-4 hover:border-emerald-300 hover:shadow-sm transition-all"
            >
              <h3 className="font-semibold text-gray-900 text-sm">
                Loan Rehabilitation Guide
              </h3>
              <p className="mt-1 text-xs text-gray-600">
                Remove the default status from your credit report.
              </p>
            </Link>
            <Link
              href="/guides/loan-consolidation"
              data-testid="related-link-consolidation"
              className="rounded-lg border border-gray-200 p-4 hover:border-emerald-300 hover:shadow-sm transition-all"
            >
              <h3 className="font-semibold text-gray-900 text-sm">
                Consolidation Guide
              </h3>
              <p className="mt-1 text-xs text-gray-600">
                Combine federal loans for simplified repayment.
              </p>
            </Link>
          </div>
        </section>

        {/* Quiz CTA */}
        <section
          id="quiz-section"
          data-testid="comparison-quiz-cta"
          className="mt-16 rounded-xl bg-emerald-50 border border-emerald-200 p-8 text-center"
        >
          <h2 className="text-xl font-bold text-gray-900">
            Not sure which product fits your situation?
          </h2>
          <p className="mt-2 text-gray-600 max-w-xl mx-auto">
            Take our 2-minute recovery quiz. We&apos;ll analyze your loan type,
            servicer, score range, and goals to recommend the exact products and
            steps for your situation.
          </p>
          <Link
            href="/#quiz"
            data-testid="quiz-cta-button"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 transition-colors"
          >
            Take the Recovery Quiz
            <svg
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </section>

        {/* Product Structured Data (Schema.org) */}
        <script
          data-testid="product-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: "Best Credit Builder Products for Student Loan Recovery",
              description:
                "Compare credit-builder loans, secured cards, and credit monitoring tools for rebuilding credit after student loan delinquency.",
              numberOfItems: CREDIT_BUILDER_PRODUCTS.length,
              itemListElement: CREDIT_BUILDER_PRODUCTS.map((product, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "Product",
                  name: product.name,
                  description: product.best_for,
                  category: TYPE_LABELS[product.type],
                  offers: {
                    "@type": "Offer",
                    price:
                      product.monthly_cost === "$0"
                        ? "0"
                        : product.monthly_cost.match(/\$(\d+)/)?.[1] ?? "0",
                    priceCurrency: "USD",
                    priceValidUntil: "2026-12-31",
                  },
                },
              })),
            }),
          }}
        />
      </div>
    </div>
  );
}
