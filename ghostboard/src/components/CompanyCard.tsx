import Link from "next/link";

interface CompanyStats {
  total_reports: number;
  ghosting_rate: number | null;
  avg_response_days: number | null;
  interview_to_offer_ratio: number | null;
}

interface CompanyCardProps {
  slug: string;
  name: string;
  industry: string | null;
  headquarters: string | null;
  company_size: string | null;
  stats: CompanyStats | null;
}

function getGhostingColor(rate: number | null): string {
  if (rate === null) return "text-[var(--muted)]";
  if (rate <= 20) return "text-green-600 dark:text-green-400";
  if (rate <= 50) return "text-[var(--accent)]";
  return "text-[var(--destructive)]";
}

export default function CompanyCard({ slug, name, industry, headquarters, company_size, stats }: CompanyCardProps) {
  const hasStats = stats && stats.total_reports >= 5;

  return (
    <Link
      href={`/company/${slug}`}
      data-testid={`company-card-${slug}`}
      className="block rounded-lg border border-[var(--border)] bg-[var(--background)] p-6 hover:border-[var(--primary)] transition-colors"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 data-testid={`company-name-${slug}`} className="text-lg font-semibold text-[var(--foreground)]">
            {name}
          </h3>
          <div className="mt-1 flex gap-2 text-sm text-[var(--muted)]">
            {industry && <span data-testid={`company-industry-${slug}`}>{industry}</span>}
            {industry && headquarters && <span>·</span>}
            {headquarters && <span data-testid={`company-location-${slug}`}>{headquarters}</span>}
          </div>
          {company_size && (
            <span className="mt-2 inline-block rounded-full bg-[var(--secondary)] px-2 py-0.5 text-xs text-[var(--muted)]">
              {company_size}
            </span>
          )}
        </div>
        {hasStats ? (
          <div className="text-right" data-testid={`company-stats-${slug}`}>
            <p className={`text-2xl font-bold ${getGhostingColor(stats.ghosting_rate)}`}>
              {stats.ghosting_rate !== null ? `${stats.ghosting_rate}%` : "—"}
            </p>
            <p className="text-xs text-[var(--muted)]">ghosting rate</p>
            <p className="mt-1 text-sm text-[var(--muted)]">
              {stats.total_reports} reports
            </p>
          </div>
        ) : (
          <div className="text-right" data-testid={`company-no-stats-${slug}`}>
            <p className="text-sm text-[var(--muted)]">
              {stats ? `${stats.total_reports}/5 reports` : "No reports yet"}
            </p>
          </div>
        )}
      </div>
    </Link>
  );
}
