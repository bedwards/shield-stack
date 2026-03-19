"use client";

import {
  isDeregulatedState,
  getDeregulationStatus,
  getDeregulatedProvidersForState,
  type DeregulationStatus,
} from "@/lib/providers/deregulated";
import { getPartnersByCategory } from "@/lib/affiliate/partners";
import AffiliateLink from "./AffiliateLink";

interface ProviderComparisonProps {
  /** Two-letter state code (e.g. "TX", "OH") */
  stateCode: string;
  /** Page that triggered the display, for affiliate attribution */
  referrer: string;
}

/**
 * "Switch and save" provider comparison section.
 *
 * Only renders when the user's state has a deregulated electricity market.
 * Uses AffiliateLink to route all clicks through /api/affiliate/click.
 */
export default function ProviderComparison({
  stateCode,
  referrer,
}: ProviderComparisonProps) {
  const upper = stateCode.toUpperCase();

  if (!isDeregulatedState(upper)) {
    return null;
  }

  const status: DeregulationStatus = getDeregulationStatus(upper);
  const providers = getDeregulatedProvidersForState(upper);
  const switchingPartners = getPartnersByCategory("energy_switching").filter(
    (p) => p.states === "nationwide" || p.states.includes(upper),
  );

  return (
    <section
      data-testid="provider-comparison"
      className="rounded-lg border-2 border-[var(--primary)] bg-[var(--secondary)] p-6 my-8"
    >
      <h2
        data-testid="provider-comparison-title"
        className="text-xl font-bold text-[var(--foreground)] mb-2"
      >
        Switch and Save on Your Electric Bill
      </h2>

      <p className="text-[var(--muted)] mb-4">
        {status === "full"
          ? `Your state has a fully deregulated electricity market \u2014 you can choose your provider and lock in a lower rate.`
          : `Your state has a partially deregulated electricity market \u2014 you may be able to choose your electricity supplier depending on your area.`}
      </p>

      {/* Local providers */}
      {providers.length > 0 && (
        <div data-testid="provider-list" className="mb-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--muted)] mb-3">
            Providers in Your Area
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {providers.map((provider) => (
              <div
                key={provider.id}
                data-testid={`provider-card-${provider.id}`}
                className="rounded-md border border-[var(--border)] bg-[var(--background)] p-3"
              >
                <p className="font-medium text-[var(--foreground)]">
                  {provider.name}
                </p>
                <p className="text-xs text-[var(--muted)] mt-1">
                  {provider.provider_type === "retail_provider"
                    ? "Competitive Provider"
                    : "Incumbent Utility"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Affiliate CTAs */}
      {switchingPartners.length > 0 && (
        <div data-testid="switching-partners">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--muted)] mb-3">
            Compare Rates Instantly
          </h3>
          <div className="flex flex-col sm:flex-row gap-3">
            {switchingPartners.map((partner) => (
              <AffiliateLink
                key={partner.slug}
                slug={partner.slug}
                referrer={referrer}
                state={upper}
                className="flex-1 rounded-lg bg-[var(--primary)] px-4 py-3 text-center font-medium text-white hover:bg-[var(--primary-hover)] transition-colors"
              >
                {partner.name}
              </AffiliateLink>
            ))}
          </div>
          <p className="text-xs text-[var(--muted)] mt-3">
            Compare providers side by side and switch with zero interruption to
            your service.
          </p>
        </div>
      )}

      {/* Primary CTA */}
      {switchingPartners.length > 0 && (
        <div
          data-testid="cta-switch-provider"
          className="mt-4 pt-4 border-t border-[var(--border)]"
        >
          <AffiliateLink
            slug={switchingPartners[0].slug}
            referrer={referrer}
            state={upper}
            className="inline-block rounded-lg bg-[var(--primary)] px-6 py-3 font-medium text-white hover:bg-[var(--primary-hover)] transition-colors"
          >
            Compare Providers &amp; Switch Now
          </AffiliateLink>
        </div>
      )}
    </section>
  );
}
