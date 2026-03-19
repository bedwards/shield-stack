import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import GhostingStats from "@/components/GhostingStats";
import StatusDistribution from "@/components/StatusDistribution";
import ReportForm from "@/components/ReportForm";

interface CompanyData {
  company: {
    id: string;
    slug: string;
    name: string;
    domain: string | null;
    industry: string | null;
    company_size: string | null;
    headquarters: string | null;
    is_claimed: boolean;
  };
  stats: {
    total_reports: number;
    ghosting_rate: number | null;
    avg_response_days: number | null;
    interview_to_offer_ratio: number | null;
  };
  recent_reports: Array<{
    id: string;
    status: string;
    applied_date: string;
    response_date: string | null;
    response_days: number | null;
    role_level: string | null;
    application_method: string | null;
    created_at: string;
  }>;
  status_distribution: Record<string, number>;
  has_enough_reports: boolean;
}

async function getCompany(slug: string): Promise<CompanyData | null> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  try {
    const res = await fetch(`${baseUrl}/api/companies/${slug}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getCompany(slug);
  if (!data) return { title: "Company Not Found - GhostBoard" };

  const { company, stats, has_enough_reports } = data;
  const description = has_enough_reports
    ? `${company.name} has a ${stats.ghosting_rate}% ghosting rate based on ${stats.total_reports} reports. See if they respond to applicants.`
    : `Does ${company.name} ghost applicants? See reports from job seekers on GhostBoard.`;

  return {
    title: `Does ${company.name} Ghost Applicants? - GhostBoard`,
    description,
  };
}

const STATUS_LABELS: Record<string, string> = {
  ghosted: "Ghosted",
  heard_back: "Heard Back",
  interviewed: "Interviewed",
  offered: "Offered",
  rejected: "Rejected",
  applied: "Applied",
};

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getCompany(slug);

  if (!data) notFound();

  const { company, stats, recent_reports, status_distribution, has_enough_reports } = data;

  return (
    <div data-testid="company-page" className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Company Header */}
      <div data-testid="company-header" className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1
            data-testid="company-page-title"
            className="text-3xl font-bold text-[var(--foreground)]"
          >
            {company.name}
          </h1>
          <div className="mt-1 flex flex-wrap gap-2 text-sm text-[var(--muted)]">
            {company.industry && <span data-testid="company-industry">{company.industry}</span>}
            {company.industry && company.headquarters && <span>·</span>}
            {company.headquarters && <span data-testid="company-headquarters">{company.headquarters}</span>}
            {company.company_size && (
              <>
                <span>·</span>
                <span data-testid="company-size">{company.company_size}</span>
              </>
            )}
          </div>
          {company.domain && (
            <p className="mt-1 text-sm text-[var(--primary)]" data-testid="company-domain">
              {company.domain}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <Link
            href={`/compare?companies=${company.slug}`}
            data-testid="compare-button"
            className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors"
          >
            Compare
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8">
        <GhostingStats
          ghostingRate={stats.ghosting_rate}
          avgResponseDays={stats.avg_response_days}
          interviewToOfferRatio={stats.interview_to_offer_ratio}
          totalReports={stats.total_reports}
          hasEnoughReports={has_enough_reports}
        />
      </div>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: Distribution + Recent Reports */}
        <div className="lg:col-span-2 space-y-8">
          {/* Status Distribution */}
          {has_enough_reports && (
            <div className="rounded-lg border border-[var(--border)] p-6">
              <StatusDistribution
                distribution={status_distribution}
                totalReports={stats.total_reports}
              />
            </div>
          )}

          {/* Recent Reports */}
          <div>
            <h3 className="text-lg font-semibold text-[var(--foreground)]">Recent Reports</h3>
            {recent_reports.length > 0 ? (
              <div className="mt-4 space-y-3">
                {recent_reports.map((report) => (
                  <div
                    key={report.id}
                    data-testid={`report-item-${report.id}`}
                    className="rounded-lg border border-[var(--border)] p-4"
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          report.status === "ghosted"
                            ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                            : report.status === "offered"
                              ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                              : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                        }`}
                      >
                        {STATUS_LABELS[report.status] || report.status}
                      </span>
                      <span className="text-xs text-[var(--muted)]">
                        Applied {new Date(report.applied_date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="mt-2 flex gap-4 text-xs text-[var(--muted)]">
                      {report.role_level && <span>Level: {report.role_level}</span>}
                      {report.application_method && <span>Via: {report.application_method}</span>}
                      {report.response_days !== null && <span>Response: {report.response_days} days</span>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p data-testid="no-reports" className="mt-4 text-sm text-[var(--muted)]">
                No reports yet. Be the first to share your experience!
              </p>
            )}
          </div>
        </div>

        {/* Right column: Report Form */}
        <div>
          <div className="sticky top-4 rounded-lg border border-[var(--border)] p-6">
            <h3 className="text-lg font-semibold text-[var(--foreground)]">
              Share Your Experience
            </h3>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Applied to {company.name}? Let others know what happened.
            </p>
            <div className="mt-4">
              <ReportForm companyId={company.id} companyName={company.name} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
