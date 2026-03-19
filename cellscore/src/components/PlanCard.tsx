"use client";

import type { MockPlan } from "@/lib/mock-data";
import { formatDataLimit, formatPrice, formatHotspot, getFeatureLabels } from "@/lib/plans";

interface PlanCardProps {
  plan: MockPlan;
  onCompare?: (planId: string) => void;
  isComparing?: boolean;
  showCompareButton?: boolean;
}

export default function PlanCard({ plan, onCompare, isComparing, showCompareButton = true }: PlanCardProps) {
  const affiliateHref = plan.affiliate_url || "#";
  const features = getFeatureLabels(plan.features);

  return (
    <div
      data-testid={`plan-card-${plan.id}`}
      className={`border rounded-lg p-5 bg-background transition-colors ${
        isComparing ? "border-primary ring-2 ring-primary/20" : "border-border"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <p data-testid={`plan-carrier-${plan.id}`} className="text-sm font-medium text-muted">{plan.carrier_name}</p>
          <h3 data-testid={`plan-name-${plan.id}`} className="text-lg font-semibold text-foreground">{plan.plan_name}</h3>
        </div>
        <div className="text-right">
          <p data-testid={`plan-price-${plan.id}`} className="text-2xl font-bold text-primary">
            {formatPrice(plan.monthly_price)}
          </p>
          <p className="text-xs text-muted">/month</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm mb-4">
        <div>
          <span className="text-muted">Data: </span>
          <span data-testid={`plan-data-${plan.id}`} className="font-medium">{formatDataLimit(plan.data_limit_gb)}</span>
        </div>
        <div>
          <span className="text-muted">Hotspot: </span>
          <span data-testid={`plan-hotspot-${plan.id}`} className="font-medium">{formatHotspot(plan.hotspot_gb)}</span>
        </div>
        {plan.throttle_speed_after && (
          <div className="col-span-2">
            <span className="text-muted">Throttle: </span>
            <span data-testid={`plan-throttle-${plan.id}`} className="font-medium text-xs">{plan.throttle_speed_after}</span>
          </div>
        )}
      </div>

      {features.length > 0 && (
        <div data-testid={`plan-features-${plan.id}`} className="flex flex-wrap gap-1 mb-4">
          {features.map((feat) => (
            <span key={feat} className="px-2 py-0.5 bg-secondary rounded-full text-xs text-foreground">
              {feat}
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <a
          href={affiliateHref}
          data-testid={`plan-affiliate-link-${plan.id}`}
          className="flex-1 text-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get This Plan
        </a>
        {showCompareButton && onCompare && (
          <button
            data-testid={`plan-compare-btn-${plan.id}`}
            onClick={() => onCompare(plan.id)}
            className={`rounded-md px-4 py-2 text-sm font-medium border transition-colors ${
              isComparing
                ? "border-primary text-primary bg-primary/5"
                : "border-border text-foreground hover:bg-secondary"
            }`}
          >
            {isComparing ? "Remove" : "Compare"}
          </button>
        )}
      </div>
    </div>
  );
}
