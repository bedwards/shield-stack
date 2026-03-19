import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { generateBreadcrumbSchema } from "@/lib/structured-data";
import {
  COMPETITORS,
  getCompetitorBySlug,
  getAllCompetitorSlugs,
} from "@/data/competitors";

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://afterloss.pages.dev";

const YEAR = new Date().getFullYear();

interface PageProps {
  params: Promise<{ competitor: string }>;
}

export function generateStaticParams() {
  return getAllCompetitorSlugs().map((competitor) => ({ competitor }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { competitor: slug } = await params;
  const competitor = getCompetitorBySlug(slug);
  if (!competitor) return {};

  const title = `AfterLoss vs ${competitor.name} (${YEAR} Comparison)`;
  const description = `Compare AfterLoss and ${competitor.name} for estate settlement after a death. AfterLoss is 100% free with no account required. ${competitor.name}: ${competitor.pricing}. See features, pricing, and honest pros & cons.`;

  return {
    title,
    description,
    keywords: competitor.keywords,
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/compare/${slug}`,
      type: "article",
      siteName: "AfterLoss",
    },
    alternates: {
      canonical: `${BASE_URL}/compare/${slug}`,
    },
  };
}

function generateComparisonSchema(competitor: ReturnType<typeof getCompetitorBySlug>) {
  if (!competitor) return null;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `AfterLoss vs ${competitor.name} (${YEAR} Comparison)`,
    description: `Compare AfterLoss and ${competitor.name} for estate settlement.`,
    url: `${BASE_URL}/compare/${competitor.slug}`,
    mainEntity: {
      "@type": "ItemList",
      name: `AfterLoss vs ${competitor.name} Feature Comparison`,
      numberOfItems: 2,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "SoftwareApplication",
            name: "AfterLoss",
            applicationCategory: "LifestyleApplication",
            operatingSystem: "Any (web browser)",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Free step-by-step guide for settling an estate after someone dies. AI-generated documents, state-specific probate guides, phone scripts, and deadline tracking.",
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "SoftwareApplication",
            name: competitor.name,
            applicationCategory: "LifestyleApplication",
            description: competitor.summary,
            offers: {
              "@type": "Offer",
              price: competitor.pricing === "Free" ? "0" : competitor.pricing,
              priceCurrency: "USD",
            },
          },
        },
      ],
    },
  };
}

function FeatureValue({ value }: { value: string | boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <span className="text-green-700 dark:text-green-400 font-medium">Yes</span>
    ) : (
      <span className="text-muted">No</span>
    );
  }
  return <span>{value}</span>;
}

export default async function ComparisonPage({ params }: PageProps) {
  const { competitor: slug } = await params;
  const competitor = getCompetitorBySlug(slug);

  if (!competitor) {
    notFound();
  }

  const comparisonSchema = generateComparisonSchema(competitor);
  const otherCompetitors = COMPETITORS.filter((c) => c.slug !== slug);

  return (
    <div data-testid="comparison-page">
      {comparisonSchema && <JsonLd data={comparisonSchema} />}
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "Compare", url: `${BASE_URL}/compare` },
          {
            name: `vs ${competitor.name}`,
            url: `${BASE_URL}/compare/${slug}`,
          },
        ])}
      />

      {/* Hero */}
      <section
        data-testid="comparison-hero"
        className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted">
            <li>
              <Link
                href="/"
                data-testid="breadcrumb-home"
                className="hover:text-foreground transition-colors"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <span className="text-foreground">
                vs {competitor.name}
              </span>
            </li>
          </ol>
        </nav>
        <h1
          data-testid="comparison-title"
          className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground"
        >
          AfterLoss vs {competitor.name}{" "}
          <span className="text-primary">({YEAR})</span>
        </h1>
        <p className="mt-6 text-lg text-muted max-w-3xl">
          {competitor.summary} Here is how it compares to AfterLoss — a 100%
          free, no-signup-required estate settlement guide.
        </p>
        <p className="mt-3 text-sm text-muted">
          Last verified: {competitor.lastVerified}
        </p>
      </section>

      {/* Pricing comparison */}
      <section
        data-testid="pricing-comparison"
        className="bg-secondary py-16"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Pricing Comparison
          </h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              data-testid="pricing-afterloss"
              className="rounded-lg border-2 border-primary bg-background p-6"
            >
              <h3 className="text-xl font-bold text-primary">AfterLoss</h3>
              <p className="mt-2 text-3xl font-bold text-foreground">Free</p>
              <p className="mt-1 text-sm text-muted">
                Free forever. No subscriptions, no paywalls, no hidden fees.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                <li>No account required to use</li>
                <li>All features included at no cost</li>
                <li>No credit card needed</li>
              </ul>
            </div>
            <div
              data-testid="pricing-competitor"
              className="rounded-lg border border-border bg-background p-6"
            >
              <h3 className="text-xl font-bold text-foreground">
                {competitor.name}
              </h3>
              <p className="mt-2 text-3xl font-bold text-foreground">
                {competitor.pricing}
              </p>
              <p className="mt-1 text-sm text-muted">
                {competitor.pricingDetail}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature comparison table */}
      <section data-testid="feature-comparison" className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Feature Comparison
          </h2>
          <p className="mt-4 text-muted">
            A side-by-side look at what each platform offers for estate
            settlement.
          </p>
          <div className="mt-8 overflow-x-auto">
            <table
              data-testid="feature-comparison-table"
              className="w-full border-collapse text-sm"
            >
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="py-3 pr-4 text-left font-semibold text-foreground">
                    Feature
                  </th>
                  <th className="py-3 px-4 text-left font-semibold text-primary">
                    AfterLoss
                  </th>
                  <th className="py-3 pl-4 text-left font-semibold text-foreground">
                    {competitor.name}
                  </th>
                </tr>
              </thead>
              <tbody>
                {competitor.features.map((feature) => (
                  <tr
                    key={feature.name}
                    className="border-b border-border"
                  >
                    <td className="py-4 pr-4 font-medium text-foreground">
                      {feature.name}
                    </td>
                    <td className="py-4 px-4 text-muted">
                      <FeatureValue value={feature.afterloss} />
                    </td>
                    <td className="py-4 pl-4 text-muted">
                      <FeatureValue value={feature.competitor} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pros & Cons */}
      <section data-testid="pros-cons" className="bg-secondary py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            {competitor.name}: Honest Pros &amp; Cons
          </h2>
          <p className="mt-4 text-muted">
            We believe in being fair and transparent. Here is what{" "}
            {competitor.name} does well and where it falls short.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              data-testid="competitor-pros"
              className="rounded-lg border border-border bg-background p-6"
            >
              <h3 className="text-lg font-semibold text-green-700 dark:text-green-400">
                What {competitor.name} Does Well
              </h3>
              <ul className="mt-4 space-y-3">
                {competitor.competitorPros.map((pro) => (
                  <li
                    key={pro}
                    className="flex items-start gap-2 text-sm text-muted"
                  >
                    <span className="mt-0.5 flex-shrink-0 text-green-600 dark:text-green-400">
                      +
                    </span>
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div
              data-testid="competitor-cons"
              className="rounded-lg border border-border bg-background p-6"
            >
              <h3 className="text-lg font-semibold text-amber-700 dark:text-amber-400">
                Where {competitor.name} Falls Short
              </h3>
              <ul className="mt-4 space-y-3">
                {competitor.competitorCons.map((con) => (
                  <li
                    key={con}
                    className="flex items-start gap-2 text-sm text-muted"
                  >
                    <span className="mt-0.5 flex-shrink-0 text-amber-600 dark:text-amber-400">
                      &ndash;
                    </span>
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why AfterLoss */}
      <section data-testid="why-afterloss" className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Why Choose AfterLoss
          </h2>
          <p className="mt-4 text-muted">
            We built AfterLoss because no one should have to pay for help
            during one of the most difficult times of their life.
          </p>
          <ul className="mt-8 space-y-4">
            {competitor.whyAfterloss.map((reason) => (
              <li
                key={reason}
                className="flex items-start gap-3 text-muted"
              >
                <span className="mt-1 flex-shrink-0 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                </span>
                {reason}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* When competitor is better — fairness */}
      <section
        data-testid="when-competitor-better"
        className="bg-secondary py-16"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            When {competitor.name} Might Be the Better Choice
          </h2>
          <p className="mt-4 text-muted">
            We want you to find the tool that best fits your situation. No
            single platform is perfect for everyone.
          </p>
          <div className="mt-6 rounded-lg border border-border bg-background p-6">
            <p data-testid="competitor-better-text" className="text-muted">
              {competitor.whenCompetitorBetter}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section data-testid="comparison-cta" className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
            AfterLoss is free, requires no account, and walks you through
            every step of settling an estate. Start whenever you are ready
            &mdash; there is no rush.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/onboard"
              data-testid="cta-start-guide"
              className="rounded-lg bg-primary px-8 py-3 font-medium text-white hover:bg-primary-hover transition-colors"
            >
              Start Your Free Guide
            </Link>
            <Link
              href="/states"
              data-testid="cta-state-guides"
              className="rounded-lg border border-border px-8 py-3 font-medium text-foreground hover:bg-secondary transition-colors"
            >
              Browse State Guides
            </Link>
          </div>
        </div>
      </section>

      {/* Other comparisons */}
      {otherCompetitors.length > 0 && (
        <section
          data-testid="other-comparisons"
          className="border-t border-border py-16"
        >
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-foreground">
              Other Comparisons
            </h2>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {otherCompetitors.map((other) => (
                <Link
                  key={other.slug}
                  href={`/compare/${other.slug}`}
                  data-testid={`compare-link-${other.slug}`}
                  className="rounded-lg border border-border p-4 hover:border-primary hover:bg-secondary/50 transition-colors"
                >
                  <p className="font-medium text-foreground">
                    vs {other.name}
                  </p>
                  <p className="mt-1 text-xs text-muted">{other.pricing}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
