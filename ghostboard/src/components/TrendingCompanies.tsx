import Link from "next/link";

interface TrendingCompany {
  slug: string;
  name: string;
  ghostingRate: number | null;
  totalReports: number;
}

export function TrendingCompanies({
  companies,
}: {
  companies: TrendingCompany[];
}) {
  if (companies.length === 0) {
    return (
      <section data-testid="trending-section" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground">
            Trending Companies
          </h2>
          <p className="mt-3 text-center text-muted">
            Companies will appear here once enough reports have been submitted.
            Be an early contributor!
          </p>
          <div
            data-testid="trending-placeholder"
            className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-24 rounded-xl border border-border bg-secondary animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section data-testid="trending-section" className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-foreground">
          Trending Companies
        </h2>
        <p className="mt-3 text-center text-muted">
          Most searched companies this week
        </p>
        <div
          data-testid="trending-list"
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {companies.map((company) => (
            <Link
              key={company.slug}
              href={`/company/${company.slug}`}
              data-testid={`trending-${company.slug}`}
              className="flex items-center gap-4 rounded-xl border border-border p-4 transition-colors hover:bg-secondary"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
                {company.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground truncate">
                  {company.name}
                </p>
                <p className="text-xs text-muted">
                  {company.totalReports} reports
                </p>
              </div>
              {company.ghostingRate !== null && (
                <span className="text-sm font-semibold text-destructive">
                  {Math.round(company.ghostingRate * 100)}%
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
