"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import type { MockPlan } from "@/lib/mock-data";
import { formatDataLimit, formatPrice, formatHotspot, getFeatureLabels } from "@/lib/plans";

export default function ComparePage() {
  const searchParams = useSearchParams();
  const [plans, setPlans] = useState<MockPlan[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const idsParam = searchParams.get("ids");

  const fetchPlans = useCallback(async () => {
    if (!idsParam) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/plans/compare?ids=${idsParam}`);
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to load comparison");
        setPlans([]);
      } else {
        setPlans(data.plans);
      }
    } catch {
      setError("Network error. Please try again.");
      setPlans([]);
    } finally {
      setLoading(false);
    }
  }, [idsParam]);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  const hasPlans = plans.length > 0;

  return (
    <div data-testid="compare-page" className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 data-testid="compare-title" className="text-3xl font-bold text-foreground mb-2">
        Compare Plans
      </h1>
      <p className="text-muted mb-8">
        Side-by-side comparison of up to 3 cell phone plans.
      </p>

      {!idsParam && (
        <div data-testid="compare-empty" className="text-center py-16">
          <p className="text-lg text-muted mb-4">No plans selected for comparison.</p>
          <Link
            href="/plans"
            data-testid="compare-browse-link"
            className="rounded-lg bg-primary px-6 py-3 font-medium text-white hover:bg-primary-hover transition-colors"
          >
            Browse Plans to Compare
          </Link>
        </div>
      )}

      {loading && (
        <div data-testid="compare-loading" className="text-center py-12 text-muted">
          Loading comparison...
        </div>
      )}

      {error && (
        <div data-testid="compare-error" className="rounded-lg bg-destructive/10 border border-destructive/20 p-4 text-destructive mb-8">
          {error}
        </div>
      )}

      {hasPlans && (
        <div data-testid="compare-table" className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 text-sm text-muted font-medium border-b border-border w-40">Feature</th>
                {plans.map((plan) => (
                  <th key={plan.id} className="text-left p-3 border-b border-border" data-testid={`compare-header-${plan.id}`}>
                    <p className="text-sm text-muted">{plan.carrier_name}</p>
                    <p className="font-semibold text-foreground">{plan.plan_name}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <CompareRow label="Monthly Price" plans={plans} render={(p) => (
                <span data-testid={`compare-price-${p.id}`} className="text-lg font-bold text-primary">{formatPrice(p.monthly_price)}</span>
              )} />
              <CompareRow label="Data" plans={plans} render={(p) => (
                <span data-testid={`compare-data-${p.id}`}>{formatDataLimit(p.data_limit_gb)}</span>
              )} />
              <CompareRow label="Hotspot" plans={plans} render={(p) => (
                <span data-testid={`compare-hotspot-${p.id}`}>{formatHotspot(p.hotspot_gb)}</span>
              )} />
              <CompareRow label="Throttle" plans={plans} render={(p) => (
                <span data-testid={`compare-throttle-${p.id}`} className="text-sm">{p.throttle_speed_after || "No throttle"}</span>
              )} />
              <CompareRow label="Lines" plans={plans} render={(p) => (
                <span>{p.num_lines_min}{p.num_lines_max ? `-${p.num_lines_max}` : "+"}</span>
              )} />
              <CompareRow label="Priority" plans={plans} render={(p) => (
                <span className="text-sm">{p.data_priority_level || "N/A"}</span>
              )} />
              <CompareRow label="Features" plans={plans} render={(p) => (
                <div data-testid={`compare-features-${p.id}`} className="flex flex-wrap gap-1">
                  {getFeatureLabels(p.features).map((f) => (
                    <span key={f} className="px-2 py-0.5 bg-secondary rounded-full text-xs">{f}</span>
                  ))}
                </div>
              )} />
              <CompareRow label="" plans={plans} render={(p) => (
                <a
                  href={p.affiliate_url || "#"}
                  data-testid={`compare-affiliate-link-${p.id}`}
                  className="inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get This Plan
                </a>
              )} />
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function CompareRow({
  label,
  plans,
  render,
}: {
  label: string;
  plans: MockPlan[];
  render: (plan: MockPlan) => React.ReactNode;
}) {
  return (
    <tr className="border-b border-border">
      <td className="p-3 text-sm text-muted font-medium">{label}</td>
      {plans.map((plan) => (
        <td key={plan.id} className="p-3 text-foreground">
          {render(plan)}
        </td>
      ))}
    </tr>
  );
}
