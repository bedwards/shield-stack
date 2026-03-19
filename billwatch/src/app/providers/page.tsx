import type { Metadata } from "next";
import Link from "next/link";
import { STATES, NATIONAL_AVG_RATE } from "@/lib/states/data";
import { PROVIDERS } from "@/lib/providers/data";

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://billwatch.pages.dev";

export const metadata: Metadata = {
  title: "Compare Electricity Providers by State — BillWatch",
  description:
    "Compare electricity providers and rates across all 50 states. Find out if you can switch providers in your state and see current average rates.",
  alternates: {
    canonical: `${BASE_URL}/providers`,
  },
};

/* ------------------------------------------------------------------ */
/*  Data helpers                                                        */
/* ------------------------------------------------------------------ */

const DEREGULATED_STATES = STATES.filter((s) => s.isDeregulated);
const REGULATED_STATES = STATES.filter((s) => !s.isDeregulated);

function getProvidersForState(stateCode: string) {
  return PROVIDERS.filter((p) => p.states_served.includes(stateCode));
}

/* ------------------------------------------------------------------ */
/*  JSON-LD                                                             */
/* ------------------------------------------------------------------ */

function breadcrumbJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Compare Providers",
        item: `${BASE_URL}/providers`,
      },
    ],
  };
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                      */
/* ------------------------------------------------------------------ */

function DeregulatedStateCard({
  state,
}: {
  state: (typeof DEREGULATED_STATES)[number];
}) {
  const providers = getProvidersForState(state.code);
  const retailProviders = providers.filter(
    (p) => p.provider_type === "retail_provider",
  );
  const utilities = providers.filter((p) => p.provider_type === "utility");

  return (
    <div
      data-testid={`deregulated-state-${state.code.toLowerCase()}`}
      className="rounded-lg border border-[var(--border)] p-6"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-bold text-[var(--foreground)]">
            <Link
              href={`/guides/${state.slug}`}
              data-testid={`state-link-${state.code.toLowerCase()}`}
              className="hover:text-[var(--primary)] transition-colors"
            >
              {state.name}
            </Link>
          </h3>
          <p className="text-sm text-[var(--muted)]">
            Avg. rate: {state.avgRate.toFixed(2)}¢/kWh &middot; Avg. bill: $
            {state.avgMonthlyBill}/mo
          </p>
        </div>
        <span className="rounded-full bg-[var(--success)] px-2.5 py-0.5 text-xs font-medium text-white">
          Deregulated
        </span>
      </div>

      {utilities.length > 0 && (
        <div className="mb-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)] mb-2">
            Incumbent Utilities
          </p>
          <div className="flex flex-wrap gap-2">
            {utilities.map((u) => (
              <span
                key={u.id}
                data-testid={`provider-${u.id}`}
                className="rounded-md border border-[var(--border)] px-2.5 py-1 text-xs text-[var(--foreground)]"
              >
                {u.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {retailProviders.length > 0 && (
        <div className="mb-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)] mb-2">
            Competitive Providers
          </p>
          <div className="flex flex-wrap gap-2">
            {retailProviders.map((p) => (
              <span
                key={p.id}
                data-testid={`provider-${p.id}`}
                className="rounded-md border border-[var(--primary)] bg-[var(--secondary)] px-2.5 py-1 text-xs text-[var(--primary)]"
              >
                {p.name}
              </span>
            ))}
          </div>
        </div>
      )}

      <Link
        href={`/guides/${state.slug}`}
        data-testid={`view-guide-${state.code.toLowerCase()}`}
        className="inline-block mt-2 text-sm text-[var(--primary)] hover:underline"
      >
        View {state.name} electric bill guide &rarr;
      </Link>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                      */
/* ------------------------------------------------------------------ */

export default function ProvidersPage() {
  return (
    <div data-testid="providers-page">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd()),
        }}
      />

      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            data-testid="providers-title"
            className="text-3xl sm:text-4xl font-bold text-[var(--foreground)]"
          >
            Compare Electricity Providers by State
          </h1>
          <p className="mt-4 text-lg text-[var(--muted)] max-w-3xl mx-auto">
            In deregulated states, you can choose your electricity supplier and
            potentially save hundreds per year. See which states let you switch
            and compare providers.
          </p>
        </div>

        {/* Quick stats */}
        <div
          data-testid="providers-stats"
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12"
        >
          <div className="rounded-lg border border-[var(--border)] p-5 text-center">
            <p className="text-3xl font-bold text-[var(--primary)]">
              {DEREGULATED_STATES.length}
            </p>
            <p className="text-sm text-[var(--muted)] mt-1">
              Deregulated States
            </p>
          </div>
          <div className="rounded-lg border border-[var(--border)] p-5 text-center">
            <p className="text-3xl font-bold text-[var(--foreground)]">
              {PROVIDERS.filter((p) => p.provider_type === "retail_provider").length}+
            </p>
            <p className="text-sm text-[var(--muted)] mt-1">
              Competitive Providers
            </p>
          </div>
          <div className="rounded-lg border border-[var(--border)] p-5 text-center">
            <p className="text-3xl font-bold text-[var(--foreground)]">
              {NATIONAL_AVG_RATE}¢
            </p>
            <p className="text-sm text-[var(--muted)] mt-1">
              National Avg. Rate/kWh
            </p>
          </div>
        </div>

        {/* Deregulated states */}
        <section data-testid="deregulated-section" className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">
            Deregulated States — You Can Switch
          </h2>
          <p className="text-[var(--muted)] mb-6">
            These states allow residential customers to choose their electricity
            supplier. Your local utility still delivers power, but you can buy it
            from a competitive provider at a potentially lower rate.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DEREGULATED_STATES.map((state) => (
              <DeregulatedStateCard key={state.code} state={state} />
            ))}
          </div>
        </section>

        {/* Regulated states */}
        <section data-testid="regulated-section" className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">
            Regulated States
          </h2>
          <p className="text-[var(--muted)] mb-6">
            In regulated states, your local utility is both the supplier and
            deliverer of electricity. You cannot switch providers, but BillWatch
            can still help you detect anomalies and optimize your usage.
          </p>
          <div className="rounded-lg border border-[var(--border)] overflow-hidden">
            <div className="overflow-x-auto">
              <table
                data-testid="regulated-states-table"
                className="w-full text-sm"
              >
                <thead>
                  <tr className="bg-[var(--secondary)]">
                    <th className="text-left px-4 py-3 font-semibold text-[var(--foreground)]">
                      State
                    </th>
                    <th className="text-right px-4 py-3 font-semibold text-[var(--foreground)]">
                      Avg. Rate
                    </th>
                    <th className="text-right px-4 py-3 font-semibold text-[var(--foreground)]">
                      Avg. Bill
                    </th>
                    <th className="text-right px-4 py-3 font-semibold text-[var(--foreground)]">
                      Trend
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {REGULATED_STATES.map((state) => (
                    <tr
                      key={state.code}
                      data-testid={`regulated-state-${state.code.toLowerCase()}`}
                      className="border-t border-[var(--border)] hover:bg-[var(--secondary)] transition-colors"
                    >
                      <td className="px-4 py-3">
                        <Link
                          href={`/guides/${state.slug}`}
                          data-testid={`regulated-link-${state.code.toLowerCase()}`}
                          className="text-[var(--primary)] hover:underline font-medium"
                        >
                          {state.name}
                        </Link>
                      </td>
                      <td className="text-right px-4 py-3 text-[var(--foreground)]">
                        {state.avgRate.toFixed(2)}¢/kWh
                      </td>
                      <td className="text-right px-4 py-3 text-[var(--foreground)]">
                        ${state.avgMonthlyBill}/mo
                      </td>
                      <td className="text-right px-4 py-3">
                        <span
                          className={
                            state.rateTrend > 6
                              ? "text-[var(--anomaly)]"
                              : "text-[var(--warning)]"
                          }
                        >
                          +{state.rateTrend}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <div
          data-testid="providers-cta"
          className="rounded-lg bg-[var(--secondary)] border border-[var(--border)] p-8 text-center"
        >
          <h2 className="text-xl font-bold text-[var(--foreground)]">
            Are You Overpaying for Electricity?
          </h2>
          <p className="mt-2 text-[var(--muted)] max-w-xl mx-auto">
            Upload your bill and BillWatch will compare your rate against state
            and national averages — and show you cheaper options if available.
          </p>
          <Link
            href="/upload"
            data-testid="providers-cta-upload"
            className="mt-4 inline-block rounded-lg bg-[var(--primary)] px-6 py-3 font-medium text-white hover:bg-[var(--primary-hover)] transition-colors"
          >
            Upload Your Bill to Compare
          </Link>
        </div>
      </div>
    </div>
  );
}
