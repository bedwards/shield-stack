"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import PlanCard from "@/components/PlanCard";
import PlanFilters from "@/components/PlanFilters";
import type { MockPlan } from "@/lib/mock-data";
import type { PlanFilters as PlanFiltersType } from "@/lib/plans";

export default function PlansPage() {
  const [plans, setPlans] = useState<MockPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<PlanFiltersType>({ sort: "price_asc" });
  const [compareIds, setCompareIds] = useState<string[]>([]);

  const fetchPlans = useCallback(async () => {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams();
    if (filters.carrier) params.set("carrier", filters.carrier);
    if (filters.minPrice !== undefined) params.set("min_price", String(filters.minPrice));
    if (filters.maxPrice !== undefined) params.set("max_price", String(filters.maxPrice));
    if (filters.minData !== undefined) params.set("min_data", String(filters.minData));
    if (filters.features && filters.features.length > 0) params.set("features", filters.features.join(","));
    if (filters.sort) params.set("sort", filters.sort);

    try {
      const response = await fetch(`/api/plans?${params}`);
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to load plans");
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
  }, [filters]);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  const toggleCompare = (planId: string) => {
    setCompareIds((prev) => {
      if (prev.includes(planId)) return prev.filter((id) => id !== planId);
      if (prev.length >= 3) return prev;
      return [...prev, planId];
    });
  };

  return (
    <div data-testid="plans-page" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 data-testid="plans-title" className="text-3xl font-bold text-foreground">Cell Phone Plans</h1>
          <p className="text-muted mt-1">Compare plans from 16 carriers and MVNOs</p>
        </div>
        {compareIds.length > 0 && (
          <Link
            href={`/compare?ids=${compareIds.join(",")}`}
            data-testid="compare-selected-button"
            className="rounded-lg bg-primary px-6 py-3 font-medium text-white hover:bg-primary-hover transition-colors"
          >
            Compare {compareIds.length} Plan{compareIds.length > 1 ? "s" : ""}
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <PlanFilters filters={filters} onFiltersChange={setFilters} />
        </aside>

        <div className="lg:col-span-3">
          {loading && (
            <div data-testid="plans-loading" className="text-center py-12 text-muted">
              Loading plans...
            </div>
          )}

          {error && (
            <div data-testid="plans-error" className="rounded-lg bg-destructive/10 border border-destructive/20 p-4 text-destructive">
              {error}
            </div>
          )}

          {!loading && !error && plans.length === 0 && (
            <div data-testid="plans-empty" className="text-center py-12 text-muted">
              No plans match your filters. Try adjusting your criteria.
            </div>
          )}

          {!loading && !error && plans.length > 0 && (
            <div data-testid="plans-grid" className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {plans.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  onCompare={toggleCompare}
                  isComparing={compareIds.includes(plan.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
