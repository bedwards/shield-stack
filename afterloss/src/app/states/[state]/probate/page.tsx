import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/states/Breadcrumbs";
import {
  generateBreadcrumbSchema,
  generateFaqPageSchema,
  generateHowToSchema,
} from "@/lib/structured-data";
import {
  getAllStateSlugs,
  getStateBySlug,
  stateNameToSlug,
  formatDollars,
  getCurrentYear,
} from "@/lib/probate/state-slugs";

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://afterloss.pages.dev";

const YEAR = getCurrentYear();

export const revalidate = 604800; // 7 days ISR

export function generateStaticParams() {
  return getAllStateSlugs().map((state) => ({ state }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state: slug } = await params;
  const state = getStateBySlug(slug);
  if (!state) return {};

  const title = `Probate Process in ${state.stateName} (${YEAR} Guide)`;
  const description = `Complete guide to the probate process in ${state.stateName}. Probate threshold: ${formatDollars(state.probateThreshold)}, filing deadline: ${state.filingDeadlineDays} days, estimated timeline: ${state.estimatedTimelineMonths} months, court fees: ${formatDollars(state.filingFeesMin)}–${formatDollars(state.filingFeesMax)}. Updated ${YEAR}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/states/${slug}/probate`,
    },
    alternates: {
      canonical: `${BASE_URL}/states/${slug}/probate`,
    },
  };
}

function getFaqs(stateName: string, state: ReturnType<typeof getStateBySlug>) {
  if (!state) return [];
  return [
    {
      question: `How long does probate take in ${stateName}?`,
      answer: `Probate in ${stateName} typically takes ${state.estimatedTimelineMonths} months from filing to final distribution, though complex estates with disputes or creditor claims can take longer.`,
    },
    {
      question: `How much does probate cost in ${stateName}?`,
      answer: `Court filing fees in ${stateName} range from ${formatDollars(state.filingFeesMin)} to ${formatDollars(state.filingFeesMax)}. Additional costs may include attorney fees, executor compensation, publication fees, and appraisal costs.`,
    },
    {
      question: `Can I avoid probate in ${stateName}?`,
      answer: state.simplifiedProbateAvailable
        ? `Yes. ${stateName} offers a simplified probate procedure for estates valued under ${formatDollars(state.smallEstateAffidavitLimit)}. Estates may also avoid probate through living trusts, joint ownership, beneficiary designations, and transfer-on-death deeds.`
        : `${stateName} does not offer a simplified probate procedure for small estates. However, estates may avoid probate through living trusts, joint ownership, beneficiary designations, and transfer-on-death deeds.`,
    },
    {
      question: `What is the probate threshold in ${stateName}?`,
      answer: `The probate threshold in ${stateName} is ${formatDollars(state.probateThreshold)}. Estates valued below this amount may qualify for simplified procedures, such as a small estate affidavit, instead of full probate.`,
    },
    {
      question: `What documents do I need to file for probate in ${stateName}?`,
      answer: `To initiate probate in ${stateName}, you typically need: ${state.requiredDocuments.join(", ")}. Requirements may vary by county — check with your local probate court.`,
    },
  ];
}

export default async function ProbatePage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state: slug } = await params;
  const state = getStateBySlug(slug);
  if (!state) notFound();

  const faqs = getFaqs(state.stateName, state);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "State Guides", href: "/states" },
    {
      label: state.stateName,
      href: `/states/${slug}/probate`,
    },
    { label: "Probate Guide" },
  ];

  const howToSteps = [
    {
      name: "Locate the will",
      text: `Find the original will and any codicils. In ${state.stateName}, the will must be filed with the probate court within ${state.filingDeadlineDays} days of the death.`,
    },
    {
      name: "Obtain death certificates",
      text: `Order at least 10–15 certified copies of the death certificate. You'll need them for courts, banks, insurance companies, and government agencies.`,
    },
    {
      name: "File the petition",
      text: `File the petition for probate with the ${state.stateName} probate court. Filing fees range from ${formatDollars(state.filingFeesMin)} to ${formatDollars(state.filingFeesMax)}.`,
    },
    {
      name: "Notify heirs and creditors",
      text: `Send formal notice to all heirs, beneficiaries, and known creditors. ${state.stateName} may also require publication in a local newspaper.`,
    },
    {
      name: "Inventory assets",
      text: `Compile a detailed inventory of all estate assets, including real property, bank accounts, investments, vehicles, and personal property.`,
    },
    {
      name: "Pay debts and taxes",
      text: `Pay outstanding debts, final income taxes (Form 1040), and any estate taxes. The federal estate tax exemption is $15M (2026), so most families owe nothing.`,
    },
    {
      name: "Distribute assets",
      text: `After debts and taxes are settled, distribute remaining assets to beneficiaries according to the will or ${state.stateName} intestacy law. File the final accounting with the court.`,
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "State Guides", url: `${BASE_URL}/states` },
          { name: state.stateName, url: `${BASE_URL}/states/${slug}/probate` },
          { name: "Probate Guide", url: `${BASE_URL}/states/${slug}/probate` },
        ])}
      />
      <JsonLd data={generateFaqPageSchema(faqs)} />
      <JsonLd
        data={generateHowToSchema(
          `How to File for Probate in ${state.stateName} (${YEAR})`,
          `Step-by-step guide to the probate process in ${state.stateName}, including filing deadlines, required documents, court fees, and timeline.`,
          howToSteps,
        )}
      />

      <Breadcrumbs items={breadcrumbItems} />

      {/* Hero */}
      <header data-testid="probate-hero" className="mb-10">
        <h1
          data-testid="probate-page-title"
          className="text-3xl font-bold text-foreground sm:text-4xl"
        >
          Probate Process in {state.stateName} ({YEAR} Guide)
        </h1>
        <p
          data-testid="probate-page-description"
          className="mt-4 text-lg text-muted max-w-3xl"
        >
          A complete, free guide to navigating probate in {state.stateName}.
          Learn the requirements, costs, timeline, and how to avoid probate for
          smaller estates.
        </p>
        <div
          data-testid="probate-verification-badge"
          className="mt-4 inline-flex items-center gap-2 text-sm"
        >
          <span
            className={`inline-block w-2 h-2 rounded-full ${state.dataVerified ? "bg-green-500" : "bg-yellow-500"}`}
          />
          <span className="text-muted">
            {state.dataVerified
              ? "Verified from primary sources"
              : "Data from secondary sources"}{" "}
            &middot; Last updated: {state.lastVerifiedDate}
          </span>
        </div>
      </header>

      {/* Key stats */}
      <section data-testid="probate-key-stats" className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          {state.stateName} Probate at a Glance
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div
            data-testid="stat-threshold"
            className="rounded-lg border border-border p-4"
          >
            <p className="text-sm text-muted">Probate Threshold</p>
            <p className="text-xl font-bold text-foreground">
              {formatDollars(state.probateThreshold)}
            </p>
          </div>
          <div
            data-testid="stat-small-estate"
            className="rounded-lg border border-border p-4"
          >
            <p className="text-sm text-muted">Small Estate Limit</p>
            <p className="text-xl font-bold text-foreground">
              {formatDollars(state.smallEstateAffidavitLimit)}
            </p>
          </div>
          <div
            data-testid="stat-deadline"
            className="rounded-lg border border-border p-4"
          >
            <p className="text-sm text-muted">Filing Deadline</p>
            <p className="text-xl font-bold text-foreground">
              {state.filingDeadlineDays} days
            </p>
          </div>
          <div
            data-testid="stat-timeline"
            className="rounded-lg border border-border p-4"
          >
            <p className="text-sm text-muted">Estimated Timeline</p>
            <p className="text-xl font-bold text-foreground">
              {state.estimatedTimelineMonths} months
            </p>
          </div>
          <div
            data-testid="stat-fees"
            className="rounded-lg border border-border p-4"
          >
            <p className="text-sm text-muted">Court Filing Fees</p>
            <p className="text-xl font-bold text-foreground">
              {formatDollars(state.filingFeesMin)}–
              {formatDollars(state.filingFeesMax)}
            </p>
          </div>
          <div
            data-testid="stat-simplified"
            className="rounded-lg border border-border p-4"
          >
            <p className="text-sm text-muted">Simplified Probate</p>
            <p className="text-xl font-bold text-foreground">
              {state.simplifiedProbateAvailable ? "Available" : "Not available"}
            </p>
          </div>
        </div>
      </section>

      {/* Step-by-step process */}
      <section data-testid="probate-steps" className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          How to File for Probate in {state.stateName}
        </h2>
        <ol className="space-y-4">
          {howToSteps.map((step, i) => (
            <li
              key={i}
              data-testid={`probate-step-${i}`}
              className="flex gap-4"
            >
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                {i + 1}
              </span>
              <div>
                <h3 className="font-semibold text-foreground">{step.name}</h3>
                <p className="text-muted mt-1">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Required documents */}
      <section data-testid="probate-documents" className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Required Documents for {state.stateName} Probate
        </h2>
        <ul className="space-y-2">
          {state.requiredDocuments.map((doc, i) => (
            <li
              key={i}
              data-testid={`probate-doc-${i}`}
              className="flex items-start gap-2 text-muted"
            >
              <span className="text-primary mt-0.5" aria-hidden="true">
                &#10003;
              </span>
              {doc}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted">
          <a
            href={state.probateCourtWebsiteUrl}
            data-testid="probate-court-link"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary-hover underline"
          >
            Visit the {state.stateName} probate court website
          </a>{" "}
          for the most current requirements and forms.
        </p>
      </section>

      {/* Related guides */}
      <section data-testid="probate-related" className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          More {state.stateName} Guides
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href={`/states/${slug}/small-estate`}
            data-testid="related-small-estate"
            className="rounded-lg border border-border p-4 hover:shadow-md transition-shadow block"
          >
            <h3 className="font-semibold text-foreground">
              Small Estate Affidavit in {state.stateName}
            </h3>
            <p className="text-sm text-muted mt-1">
              Skip probate for estates under{" "}
              {formatDollars(state.smallEstateAffidavitLimit)}
            </p>
          </Link>
          <Link
            href={`/states/${slug}/death-certificate`}
            data-testid="related-death-certificate"
            className="rounded-lg border border-border p-4 hover:shadow-md transition-shadow block"
          >
            <h3 className="font-semibold text-foreground">
              How to Get a Death Certificate in {state.stateName}
            </h3>
            <p className="text-sm text-muted mt-1">
              Ordering certified copies and who can request them
            </p>
          </Link>
        </div>
      </section>

      {/* FAQs */}
      <section data-testid="probate-faq" className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Frequently Asked Questions — {state.stateName} Probate
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} data-testid={`probate-faq-${i}`}>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {faq.question}
              </h3>
              <p className="text-muted">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        data-testid="probate-cta"
        className="rounded-lg bg-primary/5 border border-primary/20 p-8 text-center"
      >
        <h2 className="text-2xl font-bold text-foreground mb-3">
          Start your personalized checklist for {state.stateName}
        </h2>
        <p className="text-muted mb-6 max-w-xl mx-auto">
          Get a step-by-step guide customized for {state.stateName}&apos;s
          probate rules, with deadline tracking and document templates — free,
          no account required.
        </p>
        <Link
          href="/onboard"
          data-testid="probate-cta-button"
          className="inline-block rounded-md bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary-hover transition-colors"
        >
          Start Your Free Checklist
        </Link>
      </section>
    </div>
  );
}
