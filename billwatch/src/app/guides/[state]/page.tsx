import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  STATES,
  STATE_BY_SLUG,
  NATIONAL_AVG_BILL,
  NATIONAL_AVG_RATE,
  getBillComparison,
  type StateData,
} from "@/lib/states/data";

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://billwatch.pages.dev";

/* ------------------------------------------------------------------ */
/*  Static generation                                                  */
/* ------------------------------------------------------------------ */

export function generateStaticParams() {
  return STATES.map((s) => ({ state: s.slug }));
}

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state: slug } = await params;
  const s = STATE_BY_SLUG.get(slug);
  if (!s) return {};

  const title = `Why Is My Electric Bill So High in ${s.name}? [2026 Guide] | BillWatch`;
  const description = `The average ${s.name} electric bill is $${s.avgMonthlyBill}/month in 2026. Learn why your ${s.name} bill is rising, compare it to the $${NATIONAL_AVG_BILL} national average, and find ways to save.`;

  return {
    title,
    description,
    keywords: [
      `why is my electric bill so high ${s.name.toLowerCase()}`,
      `average electric bill ${s.name.toLowerCase()}`,
      `${s.name.toLowerCase()} electricity rates 2026`,
      `high electric bill ${s.name.toLowerCase()}`,
      `${s.name.toLowerCase()} utility costs`,
    ],
    alternates: {
      canonical: `${BASE_URL}/guides/${s.slug}`,
    },
    openGraph: {
      type: "article",
      url: `${BASE_URL}/guides/${s.slug}`,
      siteName: "BillWatch",
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

/* ------------------------------------------------------------------ */
/*  FAQ generation                                                     */
/* ------------------------------------------------------------------ */

function getStateFaqs(s: StateData) {
  const comparison = getBillComparison(s.avgMonthlyBill);
  const comparisonText =
    comparison.direction === "above"
      ? `$${comparison.diff} more than the $${NATIONAL_AVG_BILL} national average`
      : comparison.direction === "below"
        ? `$${comparison.diff} less than the $${NATIONAL_AVG_BILL} national average`
        : `roughly equal to the $${NATIONAL_AVG_BILL} national average`;

  const faqs = [
    {
      question: `What is the average electric bill in ${s.name} in 2026?`,
      answer: `The average residential electric bill in ${s.name} is $${s.avgMonthlyBill} per month in 2026, which is ${comparisonText}. The average residential electricity rate in ${s.name} is ${s.avgRate.toFixed(2)} cents per kWh, compared to the national average of ${NATIONAL_AVG_RATE} cents per kWh.`,
    },
    {
      question: `Why is electricity ${comparison.direction === "above" ? "so expensive" : comparison.direction === "below" ? "relatively affordable" : "at the national average"} in ${s.name}?`,
      answer:
        comparison.direction === "above"
          ? `${s.name} electricity rates are higher than average due to a combination of factors including infrastructure costs, fuel mix, regulatory environment, and geographic challenges. The state's rate has increased ${s.rateTrend}% over the past year. Major utilities serving ${s.name} include ${s.topUtilities.join(", ")}.`
          : comparison.direction === "below"
            ? `${s.name} benefits from lower electricity costs thanks to its energy mix, regional fuel availability, and lower infrastructure costs. However, rates have still increased ${s.rateTrend}% over the past year. Major utilities include ${s.topUtilities.join(", ")}.`
            : `${s.name} electricity costs are in line with the national average. Rates have increased ${s.rateTrend}% over the past year due to infrastructure investments, fuel costs, and grid modernization. Major utilities include ${s.topUtilities.join(", ")}.`,
    },
    {
      question: `How can I lower my electric bill in ${s.name}?`,
      answer: `Start by uploading your ${s.name} utility bill to BillWatch to identify anomalies and compare against similar households. Common savings strategies include: upgrading to Energy Star appliances, installing a smart thermostat, sealing air leaks, and switching to a time-of-use rate plan with your utility.${s.isDeregulated ? ` Since ${s.name} has a deregulated electricity market, you can also shop for a cheaper rate from competitive suppliers.` : ""}`,
    },
  ];

  if (s.isDeregulated) {
    faqs.push({
      question: `Can I choose my electricity provider in ${s.name}?`,
      answer: `Yes. ${s.name} has a deregulated electricity market, which means you can choose your electricity supplier. While your local utility (such as ${s.topUtilities[0]}) still delivers the power, you can select a competitive supplier offering a lower rate. Use BillWatch to compare your current rate against available plans.`,
    });
  }

  return faqs;
}

/* ------------------------------------------------------------------ */
/*  JSON-LD structured data                                            */
/* ------------------------------------------------------------------ */

function faqJsonLd(s: StateData) {
  const faqs = getStateFaqs(s);
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

function breadcrumbJsonLd(s: StateData) {
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
        name: "Guides",
        item: `${BASE_URL}/guides`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${s.name} Electric Bill Guide`,
        item: `${BASE_URL}/guides/${s.slug}`,
      },
    ],
  };
}

/* ------------------------------------------------------------------ */
/*  Content helpers                                                    */
/* ------------------------------------------------------------------ */

function getTopCauses(s: StateData): { title: string; description: string }[] {
  const causes: { title: string; description: string }[] = [];

  if (s.rateTrend > 6) {
    causes.push({
      title: "Rapidly Rising Rates",
      description: `Electricity rates in ${s.name} have increased ${s.rateTrend}% over the past year, well above the national average. This acceleration is driven by a combination of infrastructure investments, fuel cost pass-throughs, and regulatory approvals for rate increases by utilities like ${s.topUtilities[0]}.`,
    });
  }

  if (s.avgRate > NATIONAL_AVG_RATE) {
    causes.push({
      title: "Above-Average Electricity Rates",
      description: `At ${s.avgRate.toFixed(2)} cents per kWh, ${s.name} residents pay more per unit of electricity than the ${NATIONAL_AVG_RATE} cent national average. This higher base rate means every kilowatt-hour of usage costs more, compounding the impact of increased consumption from AC, heating, or electric vehicles.`,
    });
  } else {
    causes.push({
      title: "Rising Usage Driving Higher Bills",
      description: `While ${s.name}'s rate of ${s.avgRate.toFixed(2)} cents per kWh is below the national average of ${NATIONAL_AVG_RATE} cents, total bills can still be high due to increased electricity consumption from larger homes, electric heating, AC usage, or electric vehicle charging.`,
    });
  }

  causes.push({
    title: "Grid Infrastructure Upgrades",
    description: `${s.name}'s electric utilities, including ${s.topUtilities[0]} and ${s.topUtilities[1]}, are investing in aging grid infrastructure — replacing decades-old transformers, transmission lines, and substations. These capital costs are passed to customers through base rate increases and infrastructure surcharges.`,
  });

  causes.push({
    title: "Fuel and Energy Market Volatility",
    description: `Natural gas generates roughly 40% of US electricity, and price swings flow directly into electric bills with a 1-2 month delay. ${s.name} residents see these fluctuations reflected in fuel cost adjustment charges on their bills from utilities like ${s.topUtilities[0]}.`,
  });

  if (s.isDeregulated) {
    causes.push({
      title: "Competitive Market Complexity",
      description: `${s.name} has a deregulated electricity market where consumers can choose their supplier. While this creates opportunities for savings, many residents remain on their utility's default rate, which is often higher than competitive options. Shopping for the right plan can reduce your bill significantly.`,
    });
  }

  return causes.slice(0, 4);
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function StateBreadcrumb({ state }: { state: StateData }) {
  return (
    <nav
      data-testid="breadcrumb"
      aria-label="Breadcrumb"
      className="mx-auto max-w-4xl px-4 pt-6 sm:px-6 lg:px-8"
    >
      <ol className="flex items-center gap-2 text-sm text-[var(--muted)]">
        <li>
          <Link
            href="/"
            data-testid="breadcrumb-home"
            className="hover:text-[var(--foreground)] transition-colors"
          >
            Home
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <Link
            href="/guides/electric-bill-high"
            data-testid="breadcrumb-guides"
            className="hover:text-[var(--foreground)] transition-colors"
          >
            Guides
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <span className="text-[var(--foreground)] font-medium">
            {state.name}
          </span>
        </li>
      </ol>
    </nav>
  );
}

function StateStatsGrid({ state }: { state: StateData }) {
  const comparison = getBillComparison(state.avgMonthlyBill);

  return (
    <div
      data-testid="state-stats"
      className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
    >
      <div
        data-testid="stat-state-bill"
        className="rounded-lg border border-[var(--border)] p-5 text-center"
      >
        <p className="text-3xl font-bold text-[var(--primary)]">
          ${state.avgMonthlyBill}
        </p>
        <p className="text-sm text-[var(--muted)] mt-1">
          Avg. monthly bill in {state.name}
        </p>
      </div>
      <div
        data-testid="stat-state-rate"
        className="rounded-lg border border-[var(--border)] p-5 text-center"
      >
        <p className="text-3xl font-bold text-[var(--primary)]">
          {state.avgRate.toFixed(2)}&cent;
        </p>
        <p className="text-sm text-[var(--muted)] mt-1">per kWh</p>
      </div>
      <div
        data-testid="stat-state-trend"
        className="rounded-lg border border-[var(--border)] p-5 text-center"
      >
        <p
          className={`text-3xl font-bold ${state.rateTrend > 5 ? "text-[var(--anomaly)]" : "text-[var(--warning)]"}`}
        >
          +{state.rateTrend}%
        </p>
        <p className="text-sm text-[var(--muted)] mt-1">
          rate change vs. last year
        </p>
      </div>
      {comparison.direction !== "at" && (
        <div
          data-testid="stat-state-comparison"
          className="rounded-lg border border-[var(--border)] p-5 text-center sm:col-span-3"
        >
          <p
            className={`text-lg font-semibold ${comparison.direction === "above" ? "text-[var(--anomaly)]" : "text-[var(--success)]"}`}
          >
            {comparison.direction === "above"
              ? `$${comparison.diff}/mo more than the national average`
              : `$${comparison.diff}/mo less than the national average`}
          </p>
          <p className="text-sm text-[var(--muted)] mt-1">
            National average: ${NATIONAL_AVG_BILL}/mo at {NATIONAL_AVG_RATE}
            &cent;/kWh
          </p>
        </div>
      )}
    </div>
  );
}

function UploadCtaBanner({ state }: { state: StateData }) {
  return (
    <div className="mx-auto max-w-4xl px-4 pb-8 sm:px-6 lg:px-8">
      <div
        data-testid="cta-upload-section"
        className="rounded-lg border-2 border-[var(--primary)] bg-[var(--secondary)] p-6 flex flex-col sm:flex-row items-center gap-4"
      >
        <div className="flex-1">
          <p className="font-semibold text-[var(--foreground)]">
            Find out exactly why your {state.name} bill is high
          </p>
          <p className="text-sm text-[var(--muted)] mt-1">
            BillWatch scans your bill in seconds to find overcharges, anomalies,
            and savings opportunities specific to {state.name} utilities.
          </p>
        </div>
        <Link
          href="/upload"
          data-testid="cta-upload-state-bill"
          className="rounded-lg bg-[var(--primary)] px-6 py-3 font-medium text-white hover:bg-[var(--primary-hover)] transition-colors whitespace-nowrap"
        >
          Upload your {state.name} bill
        </Link>
      </div>
    </div>
  );
}

function CausesSection({ state }: { state: StateData }) {
  const causes = getTopCauses(state);

  return (
    <section
      id="causes"
      data-testid="causes-section"
      className="mb-12"
    >
      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
        Why Is Your Electric Bill High in {state.name}?
      </h2>
      <div className="space-y-8">
        {causes.map((cause, i) => (
          <div key={i} data-testid={`cause-${i}`}>
            <h3 className="text-xl font-semibold text-[var(--foreground)] flex items-baseline gap-3">
              <span className="text-[var(--primary)] font-bold">{i + 1}.</span>
              {cause.title}
            </h3>
            <p className="mt-2 text-[var(--muted)] leading-relaxed">
              {cause.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function UtilitiesSection({ state }: { state: StateData }) {
  return (
    <section
      id="utilities"
      data-testid="utilities-section"
      className="mb-12"
    >
      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
        Major Electric Utilities in {state.name}
      </h2>
      <p className="text-[var(--muted)] leading-relaxed mb-4">
        {state.name} is primarily served by these electric utilities. Your bill
        amount depends on which utility serves your area and the rate plan
        you&apos;re on.
      </p>
      <ul className="space-y-3">
        {state.topUtilities.map((utility) => (
          <li
            key={utility}
            data-testid={`utility-${utility.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
            className="flex items-center gap-3 rounded-lg border border-[var(--border)] p-4"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--secondary)] text-[var(--primary)] font-bold text-sm">
              {utility.charAt(0)}
            </div>
            <span className="font-medium text-[var(--foreground)]">
              {utility}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function CompareProvidersSection({ state }: { state: StateData }) {
  if (!state.isDeregulated) return null;

  return (
    <section
      id="compare-providers"
      data-testid="compare-providers-section"
      className="mb-12"
    >
      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
        Compare Electricity Providers in {state.name}
      </h2>
      <p className="text-[var(--muted)] leading-relaxed mb-4">
        {state.name} has a deregulated electricity market. This means you can
        choose your electricity supplier and potentially save by switching to a
        competitive rate. Your local utility ({state.topUtilities[0]}) still
        delivers the power, but a different company can supply it at a lower
        price.
      </p>
      <div className="rounded-lg border-2 border-[var(--primary)] bg-[var(--secondary)] p-6 text-center">
        <p className="font-semibold text-[var(--foreground)] mb-2">
          See what rates are available in {state.name}
        </p>
        <p className="text-sm text-[var(--muted)] mb-4">
          Upload your current bill and BillWatch will show you competitive
          plans that could save you money.
        </p>
        <Link
          href="/upload"
          data-testid="cta-compare-providers"
          className="inline-block rounded-lg bg-[var(--primary)] px-6 py-3 font-medium text-white hover:bg-[var(--primary-hover)] transition-colors"
        >
          Compare providers in {state.name}
        </Link>
      </div>
    </section>
  );
}

function FaqSection({ state }: { state: StateData }) {
  const faqs = getStateFaqs(state);

  return (
    <section id="faq" data-testid="faq-section" className="mb-12">
      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
        {state.name} Electric Bill FAQ
      </h2>
      <div className="space-y-6">
        {faqs.map((item, i) => (
          <div
            key={i}
            data-testid={`faq-item-${i}`}
            className="rounded-lg border border-[var(--border)] p-5"
          >
            <h3 className="font-semibold text-[var(--foreground)]">
              {item.question}
            </h3>
            <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">
              {item.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function BottomCta({ state }: { state: StateData }) {
  return (
    <section data-testid="cta-bottom-section" className="mt-12">
      <div className="rounded-lg bg-[var(--secondary)] border border-[var(--border)] p-8 text-center">
        <h2 className="text-2xl font-bold text-[var(--foreground)]">
          Ready to Analyze Your {state.name} Electric Bill?
        </h2>
        <p className="mt-3 text-[var(--muted)] max-w-xl mx-auto">
          Upload your bill and BillWatch will analyze it in seconds — flagging
          anomalies, comparing you to similar {state.name} households, and
          showing where your money is going.
        </p>
        <Link
          href="/upload"
          data-testid="cta-bottom-upload"
          className="mt-6 inline-block rounded-lg bg-[var(--primary)] px-8 py-3 font-medium text-white hover:bg-[var(--primary-hover)] transition-colors"
        >
          Upload Your {state.name} Bill Now
        </Link>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default async function StateGuidePage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state: slug } = await params;
  const state = STATE_BY_SLUG.get(slug);
  if (!state) notFound();

  const comparison = getBillComparison(state.avgMonthlyBill);

  return (
    <div data-testid={`guide-state-${state.code.toLowerCase()}`}>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(state)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(state)),
        }}
      />

      {/* Breadcrumb */}
      <StateBreadcrumb state={state} />

      {/* Hero / H1 */}
      <header className="mx-auto max-w-4xl px-4 pt-8 pb-4 sm:px-6 lg:px-8">
        <h1
          data-testid="guide-title"
          className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--foreground)]"
        >
          Why Is My Electric Bill So High in {state.name}?{" "}
          <span className="text-[var(--primary)]">[2026 Guide]</span>
        </h1>
        <p
          data-testid="guide-subtitle"
          className="mt-4 text-lg text-[var(--muted)] max-w-3xl"
        >
          The average {state.name} household pays{" "}
          <strong className="text-[var(--foreground)]">
            ${state.avgMonthlyBill}/month
          </strong>{" "}
          for electricity
          {comparison.direction === "above"
            ? ` — $${comparison.diff} more than the national average`
            : comparison.direction === "below"
              ? ` — $${comparison.diff} less than the national average`
              : ""}
          . Here&apos;s why your {state.name} bill is high and what you can do
          about it.
        </p>
      </header>

      {/* Upload CTA - Primary */}
      <UploadCtaBanner state={state} />

      <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-16">
        {/* State stats */}
        <StateStatsGrid state={state} />

        {/* Top causes */}
        <CausesSection state={state} />

        {/* Utilities */}
        <UtilitiesSection state={state} />

        {/* Compare Providers (deregulated states only) */}
        <CompareProvidersSection state={state} />

        {/* FAQ */}
        <FaqSection state={state} />

        {/* Bottom CTA */}
        <BottomCta state={state} />
      </article>
    </div>
  );
}
