import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCompanyBySlug,
  getAllCompanySlugs,
} from "@/lib/companies";

/** ISR: revalidate every 24 hours */
export const revalidate = 86400;

/** Allow on-demand ISR for slugs not in generateStaticParams */
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getAllCompanySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const company = await getCompanyBySlug(slug);
  const displayName = company?.name ?? formatSlugAsName(slug);

  return {
    title: `Does ${displayName} Ghost Applicants? | GhostBoard`,
    description: `See ${displayName}'s ghosting rate, average response time, and interview-to-offer ratio. Real data from real job seekers on GhostBoard.`,
    openGraph: {
      type: "website",
      siteName: "GhostBoard",
    },
  };
}

function formatSlugAsName(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatPercent(value: number | null): string {
  if (value === null) return "--";
  return `${Math.round(value * 100)}%`;
}

function formatDays(value: number | null): string {
  if (value === null) return "--";
  return `${Math.round(value)} days`;
}

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const company = await getCompanyBySlug(slug);

  if (!company) {
    notFound();
  }

  const stats = company.stats;
  const hasStats = stats && stats.total_reports >= 5;

  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    url: company.domain ? `https://${company.domain}` : undefined,
    ...(hasStats
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: stats.ghosting_rate !== null
              ? Math.round((1 - stats.ghosting_rate) * 5 * 10) / 10
              : undefined,
            bestRating: 5,
            worstRating: 1,
            ratingCount: stats.total_reports,
          },
        }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />

      <div data-testid="company-page" className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Company Header */}
        <div data-testid="company-header" className="mb-8">
          <div className="flex items-start gap-4">
            <div
              data-testid="company-avatar"
              className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary text-2xl font-bold text-white"
            >
              {company.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h1
                data-testid="company-name"
                className="text-3xl font-bold text-foreground"
              >
                {company.name}
              </h1>
              <div className="mt-1 flex flex-wrap gap-3 text-sm text-muted">
                {company.industry && (
                  <span data-testid="company-industry">{company.industry}</span>
                )}
                {company.company_size && (
                  <span data-testid="company-size">
                    {company.company_size} employees
                  </span>
                )}
                {company.headquarters && (
                  <span data-testid="company-location">
                    {company.headquarters}
                  </span>
                )}
              </div>
              {company.domain && (
                <p className="mt-1 text-sm text-muted">{company.domain}</p>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div
          data-testid="company-stats"
          className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          <div
            data-testid="stat-ghosting-rate"
            className="rounded-xl border border-border bg-secondary p-6 text-center"
          >
            <p className="text-3xl font-bold text-destructive">
              {hasStats ? formatPercent(stats.ghosting_rate) : "--"}
            </p>
            <p className="mt-1 text-sm text-muted">Ghosting Rate</p>
          </div>
          <div
            data-testid="stat-response-time"
            className="rounded-xl border border-border bg-secondary p-6 text-center"
          >
            <p className="text-3xl font-bold text-primary">
              {hasStats ? formatDays(stats.avg_response_days) : "--"}
            </p>
            <p className="mt-1 text-sm text-muted">Avg Response Time</p>
          </div>
          <div
            data-testid="stat-offer-ratio"
            className="rounded-xl border border-border bg-secondary p-6 text-center"
          >
            <p className="text-3xl font-bold text-accent">
              {hasStats ? formatPercent(stats.interview_to_offer_ratio) : "--"}
            </p>
            <p className="mt-1 text-sm text-muted">Interview-to-Offer</p>
          </div>
        </div>

        {/* Minimum reports notice */}
        {stats && stats.total_reports < 5 && stats.total_reports > 0 && (
          <div
            data-testid="insufficient-data"
            className="mb-8 rounded-lg border border-accent/30 bg-accent/10 p-4 text-center text-sm text-muted"
          >
            {stats.total_reports} report{stats.total_reports !== 1 ? "s" : ""}{" "}
            submitted. Stats will be shown after 5 reports for accuracy.
          </div>
        )}

        {(!stats || stats.total_reports === 0) && (
          <div
            data-testid="no-reports"
            className="mb-8 rounded-lg border border-border bg-secondary p-8 text-center"
          >
            <p className="text-lg font-semibold text-foreground">
              No reports yet for {company.name}
            </p>
            <p className="mt-2 text-sm text-muted">
              Be the first to report your application experience with this
              company.
            </p>
          </div>
        )}

        {/* CTA */}
        <div
          data-testid="company-cta"
          className="rounded-xl border border-border bg-secondary p-8 text-center"
        >
          <h2 className="text-xl font-bold text-foreground">
            Applied to {company.name}?
          </h2>
          <p className="mt-2 text-sm text-muted">
            Share your experience to help other job seekers.
          </p>
          <Link
            href="/report"
            data-testid="report-button"
            className="mt-4 inline-block rounded-lg bg-primary px-6 py-3 font-medium text-white hover:bg-primary-hover transition-colors"
          >
            Submit a Report
          </Link>
        </div>

        {/* Breadcrumb / Back */}
        <div className="mt-8">
          <Link
            href="/"
            data-testid="back-home"
            className="text-sm text-primary hover:underline"
          >
            &larr; Back to GhostBoard
          </Link>
        </div>
      </div>
    </>
  );
}
