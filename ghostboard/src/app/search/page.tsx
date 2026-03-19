import type { Metadata } from "next";
import CompanySearch from "@/components/CompanySearch";

export const metadata: Metadata = {
  title: "Search Companies - GhostBoard",
  description: "Search any company to see their ghosting rate and how they treat job applicants.",
};

export default function SearchPage() {
  return (
    <div data-testid="search-page" className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1
        data-testid="search-page-title"
        className="text-3xl font-bold text-[var(--foreground)]"
      >
        Search Companies
      </h1>
      <p className="mt-2 text-[var(--muted)]">
        Look up any employer to see their ghosting rate, response time, and applicant experiences.
      </p>

      <div className="mt-8">
        <CompanySearch placeholder="Type a company name..." />
      </div>

      <div data-testid="search-tips" className="mt-12 rounded-lg bg-[var(--secondary)] p-6">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">Search Tips</h2>
        <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
          <li>Search by company name (e.g., &ldquo;Google&rdquo;, &ldquo;Amazon&rdquo;)</li>
          <li>Companies need at least 5 reports before stats are shown</li>
          <li>Can&apos;t find a company? Submit a report and we&apos;ll add it</li>
        </ul>
      </div>
    </div>
  );
}
