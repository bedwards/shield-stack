"use client";

import { AVAILABLE_CARRIERS, FILTERABLE_FEATURES, type PlanFilters as PlanFiltersType } from "@/lib/plans";

interface PlanFiltersProps {
  filters: PlanFiltersType;
  onFiltersChange: (filters: PlanFiltersType) => void;
}

export default function PlanFilters({ filters, onFiltersChange }: PlanFiltersProps) {
  const updateFilter = (key: keyof PlanFiltersType, value: PlanFiltersType[keyof PlanFiltersType]) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleFeature = (feat: string) => {
    const current = filters.features || [];
    const next = current.includes(feat)
      ? current.filter((f) => f !== feat)
      : [...current, feat];
    updateFilter("features", next.length > 0 ? next : undefined);
  };

  return (
    <div data-testid="plan-filters" className="space-y-4 p-4 border border-border rounded-lg bg-background">
      <h3 className="font-semibold text-foreground">Filters</h3>

      <div>
        <label htmlFor="carrier-filter" className="block text-sm text-muted mb-1">Carrier</label>
        <select
          id="carrier-filter"
          data-testid="filter-carrier"
          value={filters.carrier || ""}
          onChange={(e) => updateFilter("carrier", e.target.value || undefined)}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
        >
          <option value="">All Carriers</option>
          {AVAILABLE_CARRIERS.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label htmlFor="min-price-filter" className="block text-sm text-muted mb-1">Min Price</label>
          <input
            id="min-price-filter"
            data-testid="filter-min-price"
            type="number"
            min={0}
            placeholder="$0"
            value={filters.minPrice ?? ""}
            onChange={(e) => updateFilter("minPrice", e.target.value ? Number(e.target.value) : undefined)}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
          />
        </div>
        <div>
          <label htmlFor="max-price-filter" className="block text-sm text-muted mb-1">Max Price</label>
          <input
            id="max-price-filter"
            data-testid="filter-max-price"
            type="number"
            min={0}
            placeholder="$100"
            value={filters.maxPrice ?? ""}
            onChange={(e) => updateFilter("maxPrice", e.target.value ? Number(e.target.value) : undefined)}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
          />
        </div>
      </div>

      <div>
        <label htmlFor="min-data-filter" className="block text-sm text-muted mb-1">Min Data (GB)</label>
        <input
          id="min-data-filter"
          data-testid="filter-min-data"
          type="number"
          min={0}
          placeholder="Any"
          value={filters.minData ?? ""}
          onChange={(e) => updateFilter("minData", e.target.value ? Number(e.target.value) : undefined)}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
        />
      </div>

      <div>
        <p className="text-sm text-muted mb-2">Features</p>
        <div className="flex flex-wrap gap-2">
          {FILTERABLE_FEATURES.map((feat) => {
            const active = filters.features?.includes(feat.key);
            return (
              <button
                key={feat.key}
                data-testid={`filter-feature-${feat.key}`}
                onClick={() => toggleFeature(feat.key)}
                className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                  active
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-foreground hover:bg-secondary"
                }`}
              >
                {feat.label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label htmlFor="sort-filter" className="block text-sm text-muted mb-1">Sort By</label>
        <select
          id="sort-filter"
          data-testid="filter-sort"
          value={filters.sort || "price_asc"}
          onChange={(e) => updateFilter("sort", e.target.value as PlanFiltersType["sort"])}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
        >
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="data_desc">Data: Most First</option>
          <option value="carrier">Carrier Name</option>
        </select>
      </div>
    </div>
  );
}
