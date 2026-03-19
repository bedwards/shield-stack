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

  const title = `How to Get a Death Certificate in ${state.stateName} (${YEAR})`;
  const description = `Step-by-step guide to ordering death certificates in ${state.stateName}. Learn who can request them, how many copies you need, where to order, costs, and processing times — free ${YEAR} guide.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/states/${slug}/death-certificate`,
    },
    alternates: {
      canonical: `${BASE_URL}/states/${slug}/death-certificate`,
    },
  };
}

function getFaqs(stateName: string) {
  return [
    {
      question: `How do I get a death certificate in ${stateName}?`,
      answer: `In ${stateName}, death certificates are issued by the state's vital records office or the county where the death occurred. You can typically order them in person, by mail, or online through an authorized vendor. The funeral home usually orders the first batch.`,
    },
    {
      question: `How many death certificate copies do I need in ${stateName}?`,
      answer: `We recommend ordering at least 10–15 certified copies. You'll need them for: probate court, each bank or financial institution, insurance claims, Social Security, the DMV, the IRS, retirement accounts, and real estate transfers. Each institution typically requires an original certified copy, not a photocopy.`,
    },
    {
      question: `How much does a death certificate cost in ${stateName}?`,
      answer: `Death certificate costs vary by state and county. Typical costs range from $5 to $25 per certified copy. The first copy is often more expensive than additional copies ordered at the same time. Ordering from the funeral home at the time of death is usually the fastest and most cost-effective option.`,
    },
    {
      question: `Who can request a death certificate in ${stateName}?`,
      answer: `In most states including ${stateName}, death certificates can be requested by: the spouse, domestic partner, parent, child, or sibling of the deceased; the executor or administrator of the estate; an attorney representing the estate; a funeral director; or anyone with a documented legal need.`,
    },
    {
      question: `How long does it take to get a death certificate in ${stateName}?`,
      answer: `Processing times vary. If ordered through the funeral home, certificates are often available within 1–2 weeks. Online orders typically take 2–4 weeks. In-person requests at the vital records office may be processed same-day or within a few business days. Rush processing is sometimes available for an additional fee.`,
    },
  ];
}

export default async function DeathCertificatePage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state: slug } = await params;
  const state = getStateBySlug(slug);
  if (!state) notFound();

  const faqs = getFaqs(state.stateName);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "State Guides", href: "/states" },
    {
      label: state.stateName,
      href: `/states/${slug}/probate`,
    },
    { label: "Death Certificate" },
  ];

  const howToSteps = [
    {
      name: "Contact the funeral home",
      text: `The funeral home handling arrangements typically orders the first batch of death certificates for you. Let them know how many certified copies you need (we recommend at least 10–15). This is the fastest way to get certificates.`,
    },
    {
      name: "Determine how many copies you need",
      text: `Count the institutions that will need a certified copy: probate court, each bank account, each insurance policy, Social Security, the DMV, the IRS, any retirement accounts, and real estate title companies. Order extras — it's cheaper to order more upfront than to reorder later.`,
    },
    {
      name: `Order from ${state.stateName}'s vital records office`,
      text: `If you need additional copies, contact the ${state.stateName} vital records office or the county registrar where the death occurred. Most states allow ordering online, by mail, or in person. You'll need to provide the deceased's full name, date of death, and your relationship.`,
    },
    {
      name: "Provide required identification",
      text: `You'll need to prove your identity and your relationship to the deceased. Bring a government-issued photo ID and documentation showing your legal right to request the certificate (marriage certificate, birth certificate, or court appointment letter).`,
    },
    {
      name: "Review the certificate for accuracy",
      text: `When you receive the certificates, carefully check all information: full legal name, date of birth, date of death, cause of death, and place of death. Errors must be corrected through the vital records office — institutions will reject certificates with incorrect information.`,
    },
    {
      name: "Store copies securely",
      text: `Keep certified copies in a safe, accessible place. You'll be distributing them over several months as you close accounts, file insurance claims, and handle probate. Never send your last copy — always keep at least one in reserve.`,
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
            name: "Death Certificate",
            url: `${BASE_URL}/states/${slug}/death-certificate`,
          },
        ])}
      />
      <JsonLd data={generateFaqPageSchema(faqs)} />
      <JsonLd
        data={generateHowToSchema(
          `How to Get a Death Certificate in ${state.stateName} (${YEAR})`,
          `Step-by-step guide to ordering certified death certificates in ${state.stateName}, including who can request them, costs, and processing times.`,
          howToSteps,
        )}
      />

      <Breadcrumbs items={breadcrumbItems} />

      {/* Hero */}
      <header data-testid="death-cert-hero" className="mb-10">
        <h1
          data-testid="death-cert-page-title"
          className="text-3xl font-bold text-foreground sm:text-4xl"
        >
          How to Get a Death Certificate in {state.stateName} ({YEAR})
        </h1>
        <p
          data-testid="death-cert-page-description"
          className="mt-4 text-lg text-muted max-w-3xl"
        >
          A certified death certificate is the first document you&apos;ll need
          after a loved one passes. Here&apos;s how to get copies in{" "}
          {state.stateName}, how many you need, and who can request them.
        </p>
      </header>

      {/* Why you need copies */}
      <section data-testid="death-cert-why" className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Why You Need Multiple Certified Copies
        </h2>
        <p className="text-muted mb-4">
          Nearly every institution handling the estate will require an original
          certified death certificate — not a photocopy. Here&apos;s where
          you&apos;ll need them:
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            {
              label: "Probate court",
              detail: `Required to initiate ${state.stateName} probate`,
            },
            {
              label: "Each bank or financial institution",
              detail: "To close or transfer accounts",
            },
            {
              label: "Insurance companies",
              detail: "Life, health, auto, and homeowner claims",
            },
            {
              label: "Social Security Administration",
              detail: "To report the death and claim benefits",
            },
            {
              label: "Department of Motor Vehicles",
              detail: "To transfer or cancel vehicle titles",
            },
            {
              label: "IRS",
              detail: "For the final tax return and estate tax filings",
            },
            {
              label: "Retirement and pension providers",
              detail: "401(k), IRA, pension benefit claims",
            },
            {
              label: "Real estate / title companies",
              detail: "To transfer property ownership",
            },
            {
              label: "Employer / HR department",
              detail: "Final paycheck, benefits, life insurance",
            },
            {
              label: "Utility companies",
              detail: "To transfer or close accounts",
            },
          ].map((item, i) => (
            <div
              key={i}
              data-testid={`death-cert-use-${i}`}
              className="flex items-start gap-2 text-muted"
            >
              <span className="text-primary mt-0.5 flex-shrink-0" aria-hidden="true">
                &#10003;
              </span>
              <div>
                <span className="font-medium text-foreground">
                  {item.label}
                </span>
                <span className="text-sm"> — {item.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Step-by-step process */}
      <section data-testid="death-cert-steps" className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          How to Order Death Certificates in {state.stateName}
        </h2>
        <ol className="space-y-4">
          {howToSteps.map((step, i) => (
            <li
              key={i}
              data-testid={`death-cert-step-${i}`}
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

      {/* Vital records link */}
      <section data-testid="death-cert-resources" className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          {state.stateName} Vital Records Resources
        </h2>
        <p className="text-muted mb-4">
          For official ordering information, fees, and processing times:
        </p>
        <ul className="space-y-2">
          <li className="flex items-start gap-2 text-muted">
            <span className="text-primary mt-0.5" aria-hidden="true">
              &#8594;
            </span>
            <a
              href={state.probateCourtWebsiteUrl}
              data-testid="death-cert-court-link"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-hover underline"
            >
              {state.stateName} Courts / Vital Records
            </a>
          </li>
        </ul>
      </section>

      {/* Related guides */}
      <section data-testid="death-cert-related" className="mb-10">
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
              Complete guide — thresholds, fees, timeline, required documents
            </p>
          </Link>
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
        </div>
      </section>

      {/* FAQs */}
      <section data-testid="death-cert-faq" className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Frequently Asked Questions — {state.stateName} Death Certificates
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} data-testid={`death-cert-faq-${i}`}>
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
        data-testid="death-cert-cta"
        className="rounded-lg bg-primary/5 border border-primary/20 p-8 text-center"
      >
        <h2 className="text-2xl font-bold text-foreground mb-3">
          Start your personalized checklist for {state.stateName}
        </h2>
        <p className="text-muted mb-6 max-w-xl mx-auto">
          Death certificates are just the first step. Our free checklist guides
          you through everything that comes next — customized for{" "}
          {state.stateName}.
        </p>
        <Link
          href="/onboard"
          data-testid="death-cert-cta-button"
          className="inline-block rounded-md bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary-hover transition-colors"
        >
          Start Your Free Checklist
        </Link>
      </section>
    </div>
  );
}
