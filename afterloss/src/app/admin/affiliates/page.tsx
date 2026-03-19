"use client";

import { useEffect, useState } from "react";
import type { PartnerAnalytics } from "@/app/api/affiliate/analytics/route";

interface AnalyticsResponse {
  partners: PartnerAnalytics[];
  summary: {
    total_clicks: number;
    total_partners: number;
    active_partners: number;
  };
}

export default function AffiliateAnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const response = await fetch("/api/affiliate/analytics");
        if (!response.ok) {
          const err = await response.json();
          setError(err.error || "Failed to fetch analytics");
          return;
        }
        const result = await response.json();
        setData(result);
      } catch {
        setError("Failed to connect to analytics API");
      } finally {
        setLoading(false);
      }
    }
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 p-8" data-testid="dashboard-loading">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-semibold text-stone-800 mb-8">
            Affiliate Analytics
          </h1>
          <p className="text-stone-500">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-stone-50 p-8" data-testid="dashboard-error">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-semibold text-stone-800 mb-8">
            Affiliate Analytics
          </h1>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700" data-testid="error-message">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-stone-50 p-8" data-testid="affiliate-dashboard">
      <div className="max-w-6xl mx-auto">
        <h1
          className="text-2xl font-semibold text-stone-800 mb-8"
          data-testid="dashboard-title"
        >
          Affiliate Analytics
        </h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <SummaryCard
            testId="summary-total-clicks"
            label="Total Clicks"
            value={data.summary.total_clicks}
          />
          <SummaryCard
            testId="summary-total-partners"
            label="Total Partners"
            value={data.summary.total_partners}
          />
          <SummaryCard
            testId="summary-active-partners"
            label="Active Partners"
            value={data.summary.active_partners}
          />
        </div>

        {/* Partner Table */}
        <div className="bg-white rounded-lg shadow-sm border border-stone-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full" data-testid="partner-table">
              <thead>
                <tr className="bg-stone-100 border-b border-stone-200">
                  <th className="text-left px-4 py-3 text-sm font-medium text-stone-600">
                    Partner
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-stone-600">
                    Category
                  </th>
                  <th className="text-right px-4 py-3 text-sm font-medium text-stone-600">
                    Today
                  </th>
                  <th className="text-right px-4 py-3 text-sm font-medium text-stone-600">
                    This Week
                  </th>
                  <th className="text-right px-4 py-3 text-sm font-medium text-stone-600">
                    This Month
                  </th>
                  <th className="text-right px-4 py-3 text-sm font-medium text-stone-600">
                    Total
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-stone-600">
                    Commission
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-stone-600">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.partners.map((partner) => (
                  <PartnerRow key={partner.partner_id} partner={partner} />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Referrer Pages */}
        <div className="mt-8">
          <h2
            className="text-lg font-semibold text-stone-800 mb-4"
            data-testid="referrer-section-title"
          >
            Top Referrer Pages by Partner
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.partners
              .filter((p) => p.top_referrer_pages.length > 0)
              .map((partner) => (
                <ReferrerCard key={partner.partner_id} partner={partner} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({
  testId,
  label,
  value,
}: {
  testId: string;
  label: string;
  value: number;
}) {
  return (
    <div
      className="bg-white rounded-lg shadow-sm border border-stone-200 p-6"
      data-testid={testId}
    >
      <p className="text-sm text-stone-500 mb-1">{label}</p>
      <p className="text-3xl font-bold text-stone-800">{value}</p>
    </div>
  );
}

function PartnerRow({ partner }: { partner: PartnerAnalytics }) {
  return (
    <tr
      className="border-b border-stone-100 hover:bg-stone-50"
      data-testid={`partner-row-${partner.slug}`}
    >
      <td className="px-4 py-3">
        <span className="font-medium text-stone-800">{partner.partner_name}</span>
      </td>
      <td className="px-4 py-3">
        <span className="inline-block px-2 py-1 text-xs rounded-full bg-stone-100 text-stone-600">
          {partner.category}
        </span>
      </td>
      <td className="px-4 py-3 text-right font-mono text-sm" data-testid={`clicks-today-${partner.slug}`}>
        {partner.clicks_today}
      </td>
      <td className="px-4 py-3 text-right font-mono text-sm" data-testid={`clicks-week-${partner.slug}`}>
        {partner.clicks_this_week}
      </td>
      <td className="px-4 py-3 text-right font-mono text-sm" data-testid={`clicks-month-${partner.slug}`}>
        {partner.clicks_this_month}
      </td>
      <td className="px-4 py-3 text-right font-mono text-sm font-bold" data-testid={`clicks-total-${partner.slug}`}>
        {partner.total_clicks}
      </td>
      <td className="px-4 py-3 text-sm text-stone-600">
        {partner.commission_value || "—"}
      </td>
      <td className="px-4 py-3">
        <span
          className={`inline-block px-2 py-1 text-xs rounded-full ${
            partner.is_active
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
          data-testid={`status-${partner.slug}`}
        >
          {partner.is_active ? "Active" : "Inactive"}
        </span>
      </td>
    </tr>
  );
}

function ReferrerCard({ partner }: { partner: PartnerAnalytics }) {
  return (
    <div
      className="bg-white rounded-lg shadow-sm border border-stone-200 p-4"
      data-testid={`referrer-card-${partner.slug}`}
    >
      <h3 className="font-medium text-stone-800 mb-2">{partner.partner_name}</h3>
      <ul className="space-y-1">
        {partner.top_referrer_pages.map((ref) => (
          <li
            key={ref.page}
            className="flex justify-between text-sm text-stone-600"
          >
            <span className="truncate mr-2">{ref.page}</span>
            <span className="font-mono text-stone-800">{ref.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
