import Link from "next/link";

interface RecentReport {
  id: string;
  status: string;
  role_level: string | null;
  created_at: string;
  company: { name: string; slug: string } | null;
}

const statusLabels: Record<string, { label: string; color: string }> = {
  ghosted: { label: "Ghosted", color: "text-destructive" },
  applied: { label: "Applied", color: "text-muted" },
  heard_back: { label: "Heard Back", color: "text-primary" },
  interviewed: { label: "Interviewed", color: "text-primary" },
  offered: { label: "Offered", color: "text-accent" },
  rejected: { label: "Rejected", color: "text-muted" },
};

export function RecentReports({ reports }: { reports: RecentReport[] }) {
  if (reports.length === 0) {
    return (
      <section data-testid="recent-reports-section" className="bg-secondary py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground">
            Recent Reports
          </h2>
          <p className="mt-3 text-center text-muted">
            No reports yet. Be the first to share your application experience!
          </p>
          <div className="mt-6 text-center">
            <Link
              href="/report"
              data-testid="recent-reports-cta"
              className="inline-block rounded-lg bg-primary px-6 py-3 font-medium text-white hover:bg-primary-hover transition-colors"
            >
              Submit a Report
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section data-testid="recent-reports-section" className="bg-secondary py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-foreground">
          Recent Reports
        </h2>
        <p className="mt-3 text-center text-muted">
          Latest application outcomes shared by job seekers
        </p>
        <div
          data-testid="recent-reports-list"
          className="mt-8 mx-auto max-w-2xl space-y-3"
        >
          {reports.map((report) => {
            const statusInfo = statusLabels[report.status] ?? {
              label: report.status,
              color: "text-muted",
            };
            return (
              <div
                key={report.id}
                data-testid={`report-${report.id}`}
                className="flex items-center gap-4 rounded-lg border border-border bg-background p-4"
              >
                <div className="flex-1 min-w-0">
                  {report.company ? (
                    <Link
                      href={`/company/${report.company.slug}`}
                      className="font-semibold text-foreground hover:text-primary transition-colors"
                    >
                      {report.company.name}
                    </Link>
                  ) : (
                    <span className="font-semibold text-foreground">
                      Unknown Company
                    </span>
                  )}
                  {report.role_level && (
                    <span className="ml-2 text-xs text-muted">
                      {report.role_level}
                    </span>
                  )}
                </div>
                <span className={`text-sm font-medium ${statusInfo.color}`}>
                  {statusInfo.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
