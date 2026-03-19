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

  const title = `Small Estate Affidavit in ${state.stateName} (${YEAR})`;
  const description = `How to use a small estate affidavit in ${state.stateName} to avoid probate. Limit: ${formatDollars(state.smallEstateAffidavitLimit)}. Learn the eligibility requirements, process, and required documents — free ${YEAR} guide.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/states/${slug}/small-estate`,
    },
    alternates: {
      canonical: `${BASE_URL}/states/${slug}/small-estate`,
    },
  };
}

function getFaqs(stateName: string, state: ReturnType<typeof getStateBySlug>) {
  if (!state) return [];
  return [
    {
      question: `What is the small estate limit in ${stateName}?`,
      answer: `In ${stateName}, estates valued at ${formatDollars(state.smallEstateAffidavitLimit)} or less may qualify for the small estate affidavit process, which is simpler and faster than formal probate.`,
    },
    {
      question: `How long does the small estate process take in ${stateName}?`,
      answer: `The small estate affidavit process in ${stateName} is typically much faster than full probate. While formal probate can take ${state.estimatedTimelineMonths} months, the small estate process often takes just a few weeks once the required waiting period has passed.`,
    },
    {
      question: `Who can file a small estate affidavit in ${stateName}?`,
      answer: `In ${stateName}, a small estate affidavit can typically be filed by any heir or beneficiary of the deceased. The person filing must have a legal right to the assets and must wait the required period after the date of death (usually ${state.filingDeadlineDays} days).`,
    },
    {
      question: `What if the estate is worth more than ${formatDollars(state.smallEstateAffidavitLimit)}?`,
      answer: `If the estate exceeds ${stateName}'s ${formatDollars(state.smallEstateAffidavitLimit)} small estate threshold, you'll need to go through formal probate. Court filing fees range from ${formatDollars(state.filingFeesMin)} to ${formatDollars(state.filingFeesMax)}, and the process typically takes ${state.estimatedTimelineMonths} months.`,
    },
    {
      question: `Does the small estate limit include real property in ${stateName}?`,
      answer: `Rules vary by state. In some states, the small estate affidavit only applies to personal property (bank accounts, vehicles, personal items). Real estate may require a separate transfer process. Check with the ${stateName} probate court for specific rules about real property.`,
    },
  ];
}

export default async function SmallEstatePage({
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
    { label: "Small Estate" },
  ];

  const howToSteps = [
    {
      name: "Confirm eligibility",
      text: `Verify the estate's total value is at or below ${state.stateName}'s small estate threshold of ${formatDollars(state.smallEstateAffidavitLimit)}. This typically includes personal property like bank accounts, vehicles, and personal items.`,
    },
    {
      name: "Wait the required period",
      text: `${state.stateName} requires a waiting period of at least ${state.filingDeadlineDays} days after the date of death before you can file a small estate affidavit. Use this time to gather documents.`,
    },
    {
      name: "Gather required documents",
      text: `Collect: a certified death certificate, proof of your identity and relationship to the deceased, the original will (if one exists), and a list of estate assets with approximate values.`,
    },
    {
      name: "Complete the affidavit form",
      text: `Obtain the small estate affidavit form from the ${state.stateName} probate court website or county clerk. Fill it out completely, listing all assets and their values.`,
    },
    {
      name: "Sign and notarize",
      text: `Sign the affidavit in the presence of a notary public. Some states require additional witnesses. The affidavit is a sworn legal document — all information must be accurate.`,
    },
    {
      name: "Present to asset holders",
      text: `Bring the notarized affidavit, death certificate, and your ID to banks, financial institutions, and other asset holders. They are legally required to release assets to you upon receiving a valid small estate affidavit.`,
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "State Guides", url: `${BASE_URL}/states` },
          {
            name: state.stateName,
            url: `${BASE_URL}/states/${slug}/probate`,
          },
          {
            name: "Small Estate",
            url: `${BASE_URL}/states/${slug}/small-estate`,
          },
        ])}
      />
      <JsonLd data={generateFaqPageSchema(faqs)} />
      <JsonLd
        data={generateHowToSchema(
          `How to File a Small Estate Affidavit in ${state.stateName} (${YEAR})`,
          `Step-by-step guide to using the small estate affidavit process in ${state.stateName} for estates valued under ${formatDollars(state.smallEstateAffidavitLimit)}.`,
          howToSteps,
        )}
      />

      <Breadcrumbs items={breadcrumbItems} />

      {/* Hero */}
      <header data-testid="small-estate-hero" className="mb-10">
        <h1
          data-testid="small-estate-page-title"
          className="text-3xl font-bold text-foreground sm:text-4xl"
        >
          Small Estate Affidavit in {state.stateName} ({YEAR})
        </h1>
        <p
          data-testid="small-estate-page-description"
          className="mt-4 text-lg text-muted max-w-3xl"
        >
          {state.simplifiedProbateAvailable
            ? `${state.stateName} allows estates valued at ${formatDollars(state.smallEstateAffidavitLimit)} or less to skip formal probate using a small estate affidavit. Here's exactly how the process works.`
            : `${state.stateName} has limited small estate procedures. Here's what you need to know about handling smaller estates.`}
        </p>
        <div
          data-testid="small-estate-verification-badge"
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
      <section data-testid="small-estate-key-stats" className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          {state.stateName} Small Estate at a Glance
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div
            data-testid="stat-limit"
            className="rounded-lg border border-border p-4"
          >
            <p className="text-sm text-muted">Small Estate Limit</p>
            <p className="text-xl font-bold text-foreground">
              {formatDollars(state.smallEstateAffidavitLimit)}
            </p>
          </div>
          <div
            data-testid="stat-simplified"
            className="rounded-lg border border-border p-4"
          >
            <p className="text-sm text-muted">Simplified Process</p>
            <p className="text-xl font-bold text-foreground">
              {state.simplifiedProbateAvailable ? "Available" : "Limited"}
            </p>
          </div>
          <div
            data-testid="stat-waiting-period"
            className="rounded-lg border border-border p-4"
          >
            <p className="text-sm text-muted">Waiting Period</p>
            <p className="text-xl font-bold text-foreground">
              {state.filingDeadlineDays} days
            </p>
          </div>
          <div
            data-testid="stat-probate-threshold"
            className="rounded-lg border border-border p-4"
          >
            <p className="text-sm text-muted">Full Probate Threshold</p>
            <p className="text-xl font-bold text-foreground">
              {formatDollars(state.probateThreshold)}
            </p>
          </div>
          <div
            data-testid="stat-fees"
            className="rounded-lg border border-border p-4"
          >
            <p className="text-sm text-muted">Probate Fees (if needed)</p>
            <p className="text-xl font-bold text-foreground">
              {formatDollars(state.filingFeesMin)}–
              {formatDollars(state.filingFeesMax)}
            </p>
          </div>
          <div
            data-testid="stat-timeline-savings"
            className="rounded-lg border border-border p-4"
          >
            <p className="text-sm text-muted">Time Saved vs. Probate</p>
            <p className="text-xl font-bold text-foreground">
              {Math.max(1, state.estimatedTimelineMonths - 1)}+ months
            </p>
          </div>
        </div>
      </section>

      {/* Step-by-step process */}
      <section data-testid="small-estate-steps" className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          How to File a Small Estate Affidavit in {state.stateName}
        </h2>
        <ol className="space-y-4">
          {howToSteps.map((step, i) => (
            <li
              key={i}
              data-testid={`small-estate-step-${i}`}
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

      {/* Court link */}
      <section data-testid="small-estate-court" className="mb-10">
        <p className="text-muted">
          For official forms and the most current requirements, visit the{" "}
          <a
            href={state.probateCourtWebsiteUrl}
            data-testid="small-estate-court-link"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary-hover underline"
          >
            {state.stateName} probate court website
          </a>
          .
        </p>
      </section>

      {/* Related guides */}
      <section data-testid="small-estate-related" className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          More {state.stateName} Guides
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href={`/states/${slug}/probate`}
            data-testid="related-probate"
            className="rounded-lg border border-border p-4 hover:shadow-md transition-shadow block"
          >
            <h3 className="font-semibold text-foreground">
              Probate Process in {state.stateName}
            </h3>
            <p className="text-sm text-muted mt-1">
              Full guide for estates over{" "}
              {formatDollars(state.probateThreshold)}
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
      <section data-testid="small-estate-faq" className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Frequently Asked Questions — {state.stateName} Small Estates
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} data-testid={`small-estate-faq-${i}`}>
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
        data-testid="small-estate-cta"
        className="rounded-lg bg-primary/5 border border-primary/20 p-8 text-center"
      >
        <h2 className="text-2xl font-bold text-foreground mb-3">
          Start your personalized checklist for {state.stateName}
        </h2>
        <p className="text-muted mb-6 max-w-xl mx-auto">
          Not sure if you qualify for the small estate process? Our free
          checklist will guide you through the right path based on your specific
          situation.
        </p>
        <Link
          href="/onboard"
          data-testid="small-estate-cta-button"
          className="inline-block rounded-md bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary-hover transition-colors"
        >
          Start Your Free Checklist
        </Link>
      </section>
    </div>
  );
}
