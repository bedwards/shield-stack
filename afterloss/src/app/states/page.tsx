import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/states/Breadcrumbs";
import {
  generateBreadcrumbSchema,
  generateFaqPageSchema,
} from "@/lib/structured-data";
import { STATE_PROBATE_RULES } from "@/lib/probate/state-data";
import {
  stateNameToSlug,
  formatDollars,
  getCurrentYear,
} from "@/lib/probate/state-slugs";

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://afterloss.pages.dev";

const YEAR = getCurrentYear();

export const revalidate = 604800; // 7 days ISR

export const metadata: Metadata = {
  title: `State-by-State Probate & Estate Settlement Guides (${YEAR})`,
  description: `Free probate guides for all 50 states and DC. Find your state's probate threshold, small estate affidavit limits, filing deadlines, court fees, and step-by-step process — updated for ${YEAR}.`,
  openGraph: {
    title: `State-by-State Probate & Estate Settlement Guides (${YEAR})`,
    description: `Free probate guides for all 50 states and DC — thresholds, deadlines, fees, and processes updated for ${YEAR}.`,
    url: `${BASE_URL}/states`,
  },
  alternates: {
    canonical: `${BASE_URL}/states`,
  },
};

const FAQS = [
  {
    question: "What is probate?",
    answer:
      "Probate is the legal process of validating a deceased person's will and distributing their assets. The process, timeline, and costs vary significantly by state — some states allow estates under certain thresholds to skip formal probate entirely.",
  },
  {
    question: "What is a small estate affidavit?",
    answer:
      "A small estate affidavit is a simplified legal document that allows heirs to claim assets without going through full probate, when the estate value falls below the state's threshold. Limits range from $10,000 in states like Georgia to over $400,000 in Wyoming.",
  },
  {
    question: "How do I know if I need probate?",
    answer:
      "Whether you need formal probate depends on your state's threshold and the estate's total value. Many states offer simplified procedures for smaller estates. Select your state from the list below to find your state's specific thresholds and requirements.",
  },
];

export default function StatesIndexPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "State Guides" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "State Guides", url: `${BASE_URL}/states` },
        ])}
      />
      <JsonLd data={generateFaqPageSchema(FAQS)} />

      <Breadcrumbs items={breadcrumbItems} />

      <div className="mb-10">
        <h1
          data-testid="states-page-title"
          className="text-3xl font-bold text-foreground sm:text-4xl"
        >
          State-by-State Estate Settlement Guides ({YEAR})
        </h1>
        <p
          data-testid="states-page-description"
          className="mt-4 text-lg text-muted max-w-3xl"
        >
          Every state has different rules for probate, small estates, and death
          certificates. Find your state below for specific thresholds, deadlines,
          required documents, court fees, and step-by-step guidance — all free.
        </p>
      </div>

      {/* State cards grid */}
      <div
        data-testid="states-grid"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {STATE_PROBATE_RULES.map((state) => {
          const slug = stateNameToSlug(state.stateName);
          return (
            <div
              key={state.stateCode}
              data-testid={`state-card-${state.stateCode}`}
              className="rounded-lg border border-border bg-background p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-lg font-semibold text-foreground">
                  {state.stateName}
                </h2>
                <span className="text-xs font-medium text-muted bg-background border border-border rounded px-2 py-0.5">
                  {state.stateCode}
                </span>
              </div>
              <div className="text-sm text-muted space-y-1 mb-4">
                <p>
                  Probate threshold:{" "}
                  <span className="font-medium text-foreground">
                    {formatDollars(state.probateThreshold)}
                  </span>
                </p>
                <p>
                  Small estate limit:{" "}
                  <span className="font-medium text-foreground">
                    {formatDollars(state.smallEstateAffidavitLimit)}
                  </span>
                </p>
                <p>
                  Filing deadline:{" "}
                  <span className="font-medium text-foreground">
                    {state.filingDeadlineDays} days
                  </span>
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/states/${slug}/probate`}
                  data-testid={`state-link-probate-${state.stateCode}`}
                  className="text-xs font-medium text-primary hover:text-primary-hover underline-offset-2 hover:underline"
                >
                  Probate Guide
                </Link>
                <span className="text-muted" aria-hidden="true">
                  &middot;
                </span>
                <Link
                  href={`/states/${slug}/small-estate`}
                  data-testid={`state-link-small-estate-${state.stateCode}`}
                  className="text-xs font-medium text-primary hover:text-primary-hover underline-offset-2 hover:underline"
                >
                  Small Estate
                </Link>
                <span className="text-muted" aria-hidden="true">
                  &middot;
                </span>
                <Link
                  href={`/states/${slug}/death-certificate`}
                  data-testid={`state-link-death-cert-${state.stateCode}`}
                  className="text-xs font-medium text-primary hover:text-primary-hover underline-offset-2 hover:underline"
                >
                  Death Certificate
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* FAQ section */}
      <section data-testid="states-faq-section" className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {FAQS.map((faq, i) => (
            <div key={i} data-testid={`states-faq-${i}`}>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {faq.question}
              </h3>
              <p className="text-muted">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section data-testid="states-cta" className="mt-16 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Not sure where to start?
        </h2>
        <p className="text-muted mb-6 max-w-xl mx-auto">
          Our free personalized checklist walks you through everything
          step-by-step, customized for your state and situation.
        </p>
        <Link
          href="/onboard"
          data-testid="states-cta-button"
          className="inline-block rounded-md bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary-hover transition-colors"
        >
          Start Your Free Checklist
        </Link>
      </section>
    </div>
  );
}
