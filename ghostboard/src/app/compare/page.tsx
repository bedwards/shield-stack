"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import CompanySearch from "@/components/CompanySearch";

interface CompanyWithStats {
  company: {
    id: string;
    slug: string;
    name: string;
    domain: string | null;
    industry: string | null;
    headquarters: string | null;
  };
  stats: {
    total_reports: number;
    ghosting_rate: number | null;
    avg_response_days: number | null;
    interview_to_offer_ratio: number | null;
  };
  has_enough_reports: boolean;
}

function CompareContent() {
  const searchParams = useSearchParams();
  const [companies, setCompanies] = useState<CompanyWithStats[]>([]);
  const [loading, setLoading] = useState(false);

  // Load initial companies from URL params
  useEffect(() => {
    const slugs = searchParams.get("companies")?.split(",").filter(Boolean) ?? [];
    if (slugs.length > 0) {
      loadCompanies(slugs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadCompanies(slugs: string[]) {
    setLoading(true);
    const results: CompanyWithStats[] = [];
    for (const slug of slugs) {
      try {
        const res = await fetch(`/api/companies/${slug}`);
        if (res.ok) {
          const data = await res.json();
          results.push(data);
        }
      } catch {
        // Skip failed fetches
      }
    }
    setCompanies(results);
    setLoading(false);
  }

  function addCompany(company: { id: string; slug: string; name: string }) {
    if (companies.some((c) => c.company.slug === company.slug)) return;
    if (companies.length >= 4) return;

    fetch(`/api/companies/${company.slug}`)
      .then((res) => res.json())
      .then((data) => {
        setCompanies((prev) => [...prev, data]);
      })
      .catch(() => {});
  }

  function removeCompany(slug: string) {
    setCompanies((prev) => prev.filter((c) => c.company.slug !== slug));
  }

  return (
    <>
      {/* Add Company Search */}
      <div className="mt-8 max-w-md">
        <CompanySearch
          navigateOnSelect={false}
          onSelect={(company) =>
            addCompany({ id: company.id, slug: company.slug, name: company.name })
          }
          placeholder="Add a company to compare..."
        />
      </div>

      {loading && (
        <div className="mt-8 text-center text-[var(--muted)]">Loading companies...</div>
      )}

      {/* Comparison Grid */}
      {companies.length > 0 && (
        <div className="mt-8">
          <div
            data-testid="compare-grid"
            className="grid gap-6"
            style={{ gridTemplateColumns: `repeat(${Math.min(companies.length, 4)}, minmax(0, 1fr))` }}
          >
            {companies.map(({ company, stats, has_enough_reports }) => (
              <div
                key={company.slug}
                data-testid={`compare-card-${company.slug}`}
                className="rounded-lg border border-[var(--border)] p-6"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--foreground)]">
                      {company.name}
                    </h3>
                    <p className="text-xs text-[var(--muted)]">
                      {[company.industry, company.headquarters].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                  <button
                    data-testid={`remove-compare-${company.slug}`}
                    onClick={() => removeCompany(company.slug)}
                    className="text-[var(--muted)] hover:text-[var(--destructive)] transition-colors"
                    aria-label={`Remove ${company.name}`}
                  >
                    ×
                  </button>
                </div>

                <div className="mt-4 space-y-4">
                  {has_enough_reports ? (
                    <>
                      <div className="text-center">
                        <p className="text-4xl font-bold text-[var(--destructive)]">
                          {stats.ghosting_rate !== null ? `${stats.ghosting_rate}%` : "—"}
                        </p>
                        <p className="text-sm text-[var(--muted)]">Ghosting Rate</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-center">
                        <div>
                          <p className="text-xl font-semibold text-[var(--primary)]">
                            {stats.avg_response_days !== null ? `${stats.avg_response_days}d` : "—"}
                          </p>
                          <p className="text-xs text-[var(--muted)]">Avg Response</p>
                        </div>
                        <div>
                          <p className="text-xl font-semibold text-[var(--primary)]">
                            {stats.interview_to_offer_ratio !== null ? `${stats.interview_to_offer_ratio}%` : "—"}
                          </p>
                          <p className="text-xs text-[var(--muted)]">Offer Ratio</p>
                        </div>
                      </div>
                      <p className="text-center text-xs text-[var(--muted)]">
                        {stats.total_reports} reports
                      </p>
                    </>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-sm text-[var(--muted)]">
                        Not enough data ({stats.total_reports}/5 reports)
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {companies.length === 0 && !loading && (
        <div data-testid="compare-empty" className="mt-12 rounded-lg bg-[var(--secondary)] p-8 text-center">
          <p className="text-lg font-semibold text-[var(--foreground)]">
            No companies selected
          </p>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Use the search above to add companies for comparison.
          </p>
        </div>
      )}
    </>
  );
}

export default function ComparePage() {
  return (
    <div data-testid="compare-page" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <h1
        data-testid="compare-page-title"
        className="text-3xl font-bold text-[var(--foreground)]"
      >
        Compare Companies
      </h1>
      <p className="mt-2 text-[var(--muted)]">
        Compare ghosting rates and responsiveness side by side. Add up to 4 companies.
      </p>
      <Suspense fallback={<div className="mt-8 text-center text-[var(--muted)]">Loading...</div>}>
        <CompareContent />
      </Suspense>
    </div>
  );
}
