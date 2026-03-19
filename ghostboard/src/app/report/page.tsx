"use client";

import { useState } from "react";
import type { Metadata } from "next";
import CompanySearch from "@/components/CompanySearch";
import ReportForm from "@/components/ReportForm";

interface SelectedCompany {
  id: string;
  slug: string;
  name: string;
}

export default function ReportPage() {
  const [selectedCompany, setSelectedCompany] = useState<SelectedCompany | null>(null);

  return (
    <div data-testid="report-page" className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <h1
        data-testid="report-page-title"
        className="text-3xl font-bold text-[var(--foreground)]"
      >
        Submit a Report
      </h1>
      <p className="mt-2 text-[var(--muted)]">
        Share your application experience to help other job seekers. All reports are anonymous.
      </p>

      {/* Step 1: Select Company */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">
          1. Find the Company
        </h2>
        <div className="mt-3">
          <CompanySearch
            navigateOnSelect={false}
            onSelect={(company) =>
              setSelectedCompany({
                id: company.id,
                slug: company.slug,
                name: company.name,
              })
            }
            placeholder="Search for a company..."
          />
        </div>
      </div>

      {/* Step 2: Fill Report Form */}
      {selectedCompany && (
        <div className="mt-8" data-testid="report-form-section">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">
            2. Report Your Experience with{" "}
            <span className="text-[var(--primary)]">{selectedCompany.name}</span>
          </h2>
          <div className="mt-4 rounded-lg border border-[var(--border)] p-6">
            <ReportForm
              companyId={selectedCompany.id}
              companyName={selectedCompany.name}
            />
          </div>
        </div>
      )}

      {!selectedCompany && (
        <div data-testid="report-placeholder" className="mt-8 rounded-lg bg-[var(--secondary)] p-8 text-center">
          <p className="text-[var(--muted)]">
            Search for a company above to start your report.
          </p>
        </div>
      )}
    </div>
  );
}
