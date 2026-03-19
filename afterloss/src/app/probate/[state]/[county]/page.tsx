import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/states/Breadcrumbs";
import {
  generateBreadcrumbSchema,
  generateFaqPageSchema,
  generateGovernmentOfficeSchema,
} from "@/lib/structured-data";
import {
  getAllCountyParams,
  getCountyBySlug,
  getCountiesByStateSlug,
  countyNameToSlug,
} from "@/lib/county-data/county-slugs";
import {
  getStateBySlug,
  formatDollars,
  getCurrentYear,
  stateNameToSlug,
} from "@/lib/probate/state-slugs";

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://afterloss.pages.dev";

const YEAR = getCurrentYear();

export const revalidate = 604800; // 7 days ISR

export function generateStaticParams() {
  return getAllCountyParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string; county: string }>;
}): Promise<Metadata> {
  const { state: stateSlug, county: countySlug } = await params;
  const county = getCountyBySlug(stateSlug, countySlug);
  const state = getStateBySlug(stateSlug);
  if (!county || !state) return {};

  const title = `${county.county_name} County Probate Court, ${state.stateName} (${YEAR} Guide)`;
  const description = `Complete guide to ${county.county_name} County probate court in ${state.stateName}. Court address, phone, filing fees${county.filing_fees ? ` ($${county.filing_fees})` : ""}, timeline, and step-by-step process. Free, updated ${YEAR}.`;

  return {
    title,
    description,
    openGraph: {
      url: `${BASE_URL}/probate/${stateSlug}/${countySlug}`,
    },
    alternates: {
      canonical: `${BASE_URL}/probate/${stateSlug}/${countySlug}`,
    },
  };
}

function getFaqs(
  countyName: string,
  stateName: string,
  county: NonNullable<ReturnType<typeof getCountyBySlug>>,
  state: NonNullable<ReturnType<typeof getStateBySlug>>,
) {
  return [
    {
      question: `Where is the probate court in ${countyName} County, ${stateName}?`,
      answer: `The ${county.probate_court_name} is located at ${county.court_address}. You can reach them by phone at ${county.court_phone}.${county.court_website ? ` Visit their website for forms and filing instructions.` : ""}`,
    },
    {
      question: `How much does it cost to file for probate in ${countyName} County?`,
      answer: county.filing_fees
        ? `Court filing fees in ${countyName} County are approximately $${county.filing_fees}. Additional costs may include attorney fees, publication fees, and appraisal costs. The statewide probate threshold in ${stateName} is ${formatDollars(state.probateThreshold)}.`
        : `Filing fees for ${countyName} County are not publicly listed. Contact the court at ${county.court_phone} for current fee schedules. The statewide probate threshold in ${stateName} is ${formatDollars(state.probateThreshold)}.`,
    },
    {
      question: `How long does probate take in ${countyName} County, ${stateName}?`,
      answer: county.estimated_timeline
        ? `Probate in ${countyName} County typically takes ${county.estimated_timeline}, depending on estate complexity, whether the will is contested, and court caseload. Simple uncontested estates may resolve faster.`
        : `Probate timelines in ${countyName} County vary based on estate complexity and court caseload. Contact the court for current processing times.`,
    },
    {
      question: `Can I avoid probate in ${countyName} County?`,
      answer: state.simplifiedProbateAvailable
        ? `${stateName} offers simplified probate for estates valued under ${formatDollars(state.smallEstateAffidavitLimit)}. You may also avoid probate through living trusts, joint ownership, beneficiary designations, and transfer-on-death deeds. Check with the ${countyName} County court for local procedures.`
        : `${stateName} does not offer a simplified probate for small estates, but you may avoid probate through living trusts, joint ownership, beneficiary designations, and transfer-on-death deeds.`,
    },
    {
      question: `What documents do I need for ${countyName} County probate?`,
      answer: `To file for probate in ${countyName} County, ${stateName}, you typically need: ${state.requiredDocuments.join(", ")}. Requirements may vary — contact the court at ${county.court_phone} to confirm.`,
    },
  ];
}

/**
 * Extract the city from a court address string.
 * Assumes format: "123 Main St, City, ST 12345"
 */
function extractCity(address: string): string {
  const parts = address.split(",");
  if (parts.length >= 2) {
    return parts[parts.length - 2].trim();
  }
  return "";
}

export default async function CountyProbatePage({
  params,
}: {
  params: Promise<{ state: string; county: string }>;
}) {
  const { state: stateSlug, county: countySlug } = await params;
  const county = getCountyBySlug(stateSlug, countySlug);
  const state = getStateBySlug(stateSlug);
  if (!county || !state) notFound();

  const faqs = getFaqs(county.county_name, state.stateName, county, state);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "State Guides", href: "/states" },
    {
      label: state.stateName,
      href: `/states/${stateSlug}/probate`,
    },
    { label: `${county.county_name} County` },
  ];

  // Related counties in the same state
  const relatedCounties = getCountiesByStateSlug(stateSlug)
    .filter((c) => c.fips_code !== county.fips_code)
    .slice(0, 6);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "State Guides", url: `${BASE_URL}/states` },
          {
            name: state.stateName,
            url: `${BASE_URL}/states/${stateSlug}/probate`,
          },
          {
            name: `${county.county_name} County`,
            url: `${BASE_URL}/probate/${stateSlug}/${countySlug}`,
          },
        ])}
      />
      <JsonLd data={generateFaqPageSchema(faqs)} />
      <JsonLd
        data={generateGovernmentOfficeSchema({
          name: county.probate_court_name,
          description: `Probate court for ${county.county_name} County, ${state.stateName}. Handles estate administration, wills, and probate filings.`,
          streetAddress: county.court_address.split(",")[0],
          city: extractCity(county.court_address),
          stateCode: county.state_code,
          phone: county.court_phone,
          url: county.court_website ?? undefined,
        })}
      />

      <Breadcrumbs items={breadcrumbItems} />

      {/* Hero */}
      <header data-testid="county-hero" className="mb-10">
        <h1
          data-testid="county-page-title"
          className="text-3xl font-bold text-foreground sm:text-4xl"
        >
          {county.county_name} County Probate Court, {state.stateName} ({YEAR}{" "}
          Guide)
        </h1>
        <p
          data-testid="county-page-description"
          className="mt-4 text-lg text-muted max-w-3xl"
        >
          Everything you need to know about filing for probate in{" "}
          {county.county_name} County, {state.stateName} — court address, phone
          number, filing fees, timeline, and step-by-step guidance. Free and
          updated for {YEAR}.
        </p>
        <div
          data-testid="county-verification-badge"
          className="mt-4 inline-flex items-center gap-2 text-sm"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
          <span className="text-muted">
            Last verified: {county.last_verified_date}
          </span>
        </div>
      </header>

      {/* Court Contact Info */}
      <section data-testid="county-court-info" className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          {county.probate_court_name}
        </h2>
        <div className="rounded-lg border border-border p-6 space-y-4">
          <div className="flex items-start gap-3">
            <span
              className="text-primary text-lg flex-shrink-0 mt-0.5"
              aria-hidden="true"
            >
              &#128205;
            </span>
            <div>
              <p className="text-sm font-medium text-muted">Address</p>
              <p
                data-testid="county-court-address"
                className="text-foreground"
              >
                {county.court_address}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span
              className="text-primary text-lg flex-shrink-0 mt-0.5"
              aria-hidden="true"
            >
              &#128222;
            </span>
            <div>
              <p className="text-sm font-medium text-muted">Phone</p>
              <a
                href={`tel:${county.court_phone.replace(/[^\d+]/g, "")}`}
                data-testid="county-court-phone"
                className="text-primary hover:text-primary-hover underline"
              >
                {county.court_phone}
              </a>
            </div>
          </div>

          {county.court_website && (
            <div className="flex items-start gap-3">
              <span
                className="text-primary text-lg flex-shrink-0 mt-0.5"
                aria-hidden="true"
              >
                &#127760;
              </span>
              <div>
                <p className="text-sm font-medium text-muted">Website</p>
                <a
                  href={county.court_website}
                  data-testid="county-court-website"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-hover underline"
                >
                  Visit court website
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Key Stats */}
      <section data-testid="county-key-stats" className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          {county.county_name} County Probate at a Glance
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div
            data-testid="county-stat-fees"
            className="rounded-lg border border-border p-4"
          >
            <p className="text-sm text-muted">Filing Fees</p>
            <p className="text-xl font-bold text-foreground">
              {county.filing_fees
                ? `$${county.filing_fees}`
                : "Contact court"}
            </p>
          </div>
          <div
            data-testid="county-stat-timeline"
            className="rounded-lg border border-border p-4"
          >
            <p className="text-sm text-muted">Estimated Timeline</p>
            <p className="text-xl font-bold text-foreground">
              {county.estimated_timeline ?? "Varies"}
            </p>
          </div>
          <div
            data-testid="county-stat-threshold"
            className="rounded-lg border border-border p-4"
          >
            <p className="text-sm text-muted">
              {state.stateName} Probate Threshold
            </p>
            <p className="text-xl font-bold text-foreground">
              {formatDollars(state.probateThreshold)}
            </p>
          </div>
          <div
            data-testid="county-stat-small-estate"
            className="rounded-lg border border-border p-4"
          >
            <p className="text-sm text-muted">Small Estate Limit</p>
            <p className="text-xl font-bold text-foreground">
              {formatDollars(state.smallEstateAffidavitLimit)}
            </p>
          </div>
          <div
            data-testid="county-stat-deadline"
            className="rounded-lg border border-border p-4"
          >
            <p className="text-sm text-muted">Filing Deadline</p>
            <p className="text-xl font-bold text-foreground">
              {state.filingDeadlineDays} days
            </p>
          </div>
          <div
            data-testid="county-stat-population"
            className="rounded-lg border border-border p-4"
          >
            <p className="text-sm text-muted">County Population</p>
            <p className="text-xl font-bold text-foreground">
              {county.population.toLocaleString("en-US")}
            </p>
          </div>
        </div>
      </section>

      {/* Required Documents (from state data) */}
      <section data-testid="county-documents" className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Required Documents for Probate in {county.county_name} County
        </h2>
        <ul className="space-y-2">
          {state.requiredDocuments.map((doc, i) => (
            <li
              key={i}
              data-testid={`county-doc-${i}`}
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
          Requirements may vary by county. Contact the {county.county_name}{" "}
          County court at{" "}
          <a
            href={`tel:${county.court_phone.replace(/[^\d+]/g, "")}`}
            data-testid="county-docs-phone-link"
            className="text-primary hover:text-primary-hover underline"
          >
            {county.court_phone}
          </a>{" "}
          to confirm.
        </p>
      </section>

      {/* Parent State Guide Link */}
      <section data-testid="county-state-guide" className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          {state.stateName} Probate Guide
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href={`/states/${stateSlug}/probate`}
            data-testid="county-link-state-probate"
            className="rounded-lg border border-border p-4 hover:shadow-md transition-shadow block"
          >
            <h3 className="font-semibold text-foreground">
              Probate Process in {state.stateName}
            </h3>
            <p className="text-sm text-muted mt-1">
              Statewide rules, thresholds, and step-by-step process
            </p>
          </Link>
          <Link
            href={`/states/${stateSlug}/small-estate`}
            data-testid="county-link-state-small-estate"
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
        </div>
      </section>

      {/* Related Counties */}
      {relatedCounties.length > 0 && (
        <section data-testid="county-related" className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Other {state.stateName} Counties
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedCounties.map((rc) => (
              <Link
                key={rc.fips_code}
                href={`/probate/${stateSlug}/${countyNameToSlug(rc.county_name)}`}
                data-testid={`county-link-${countyNameToSlug(rc.county_name)}`}
                className="rounded-lg border border-border p-3 hover:shadow-md transition-shadow block"
              >
                <h3 className="font-semibold text-foreground text-sm">
                  {rc.county_name} County
                </h3>
                <p className="text-xs text-muted mt-1">
                  Pop. {rc.population.toLocaleString("en-US")}
                  {rc.filing_fees ? ` · $${rc.filing_fees} filing fee` : ""}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* FAQs */}
      <section data-testid="county-faq" className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Frequently Asked Questions — {county.county_name} County Probate
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} data-testid={`county-faq-${i}`}>
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
        data-testid="county-cta"
        className="rounded-lg bg-primary/5 border border-primary/20 p-8 text-center"
      >
        <h2 className="text-2xl font-bold text-foreground mb-3">
          Start your personalized checklist for {state.stateName}
        </h2>
        <p className="text-muted mb-6 max-w-xl mx-auto">
          Get a step-by-step guide customized for {state.stateName}&apos;s
          probate rules, with deadline tracking and document templates — free, no
          account required.
        </p>
        <Link
          href="/onboard"
          data-testid="county-cta-button"
          className="inline-block rounded-md bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary-hover transition-colors"
        >
          Start Your Free Checklist
        </Link>
      </section>
    </div>
  );
}
