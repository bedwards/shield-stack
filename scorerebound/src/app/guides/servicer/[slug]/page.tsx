import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import QuizCTA from "@/components/QuizCTA";
import FAQSchema, { type FAQItem } from "@/components/FAQSchema";
import {
  SERVICER_GUIDES,
  getServicerGuideSlugs,
  getServicerGuide,
  type ServicerGuideData,
} from "@/data/servicers";

export function generateStaticParams() {
  return getServicerGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getServicerGuide(slug);
  if (!guide) return {};

  const title = `How to Recover Your Credit Score with ${guide.shortName} | ScoreRebound`;
  const description = `Step-by-step ${guide.shortName} recovery guide: IBR enrollment, loan rehabilitation, consolidation. Phone: ${guide.phone}. Processing times, tips, and FAQs.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      siteName: "ScoreRebound",
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

function HowToSchema({ guide }: { guide: ServicerGuideData }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to Recover Your Credit Score with ${guide.shortName}`,
    description: `Step-by-step guide to recovering your credit score through ${guide.shortName}. Covers IBR enrollment, loan rehabilitation, and consolidation.`,
    step: [
      ...guide.ibrSteps.map((text, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: `IBR Step ${i + 1}`,
        text,
      })),
      ...guide.rehabSteps.map((text, i) => ({
        "@type": "HowToStep",
        position: guide.ibrSteps.length + i + 1,
        name: `Rehabilitation Step ${i + 1}`,
        text,
      })),
      ...guide.consolidationSteps.map((text, i) => ({
        "@type": "HowToStep",
        position: guide.ibrSteps.length + guide.rehabSteps.length + i + 1,
        name: `Consolidation Step ${i + 1}`,
        text,
      })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      data-testid="howto-structured-data"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function StepList({ steps }: { steps: string[] }) {
  return (
    <ol className="mt-6 space-y-3">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-3 text-gray-600">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
            {i + 1}
          </span>
          <span>{step}</span>
        </li>
      ))}
    </ol>
  );
}

export default async function ServicerGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getServicerGuide(slug);

  if (!guide) {
    notFound();
  }

  const otherGuides = Object.values(SERVICER_GUIDES).filter(
    (g) => g.slug !== slug,
  );

  return (
    <>
      <HowToSchema guide={guide} />
      <FAQSchema faqs={guide.faqs as FAQItem[]} />

      <article
        data-testid={`servicer-page-${slug}`}
        className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8"
      >
        {/* Breadcrumb */}
        <nav
          data-testid="servicer-breadcrumb"
          className="mb-8 text-sm text-gray-500"
        >
          <Link
            href="/"
            data-testid="breadcrumb-home"
            className="hover:text-emerald-700"
          >
            Home
          </Link>
          <span className="mx-2">/</span>
          <span>Guides</span>
          <span className="mx-2">/</span>
          <span>Servicers</span>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{guide.shortName}</span>
        </nav>

        {/* Header */}
        <header data-testid="servicer-header">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
              Loan Servicer Guide
            </span>
            <span
              data-testid="servicer-last-verified"
              className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm text-gray-600"
              suppressHydrationWarning
            >
              Last verified: {guide.lastVerified}
            </span>
          </div>
          <h1
            data-testid="servicer-name"
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
          >
            How to Recover Your Credit Score with {guide.shortName}
          </h1>
          <p
            data-testid="servicer-overview"
            className="mt-6 text-lg leading-8 text-gray-600"
          >
            {guide.overview}
          </p>
        </header>

        {/* Transition warning for Great Lakes */}
        {guide.transitionInfo && (
          <div
            data-testid="servicer-transition-info"
            className="my-8 rounded-xl border border-amber-200 bg-amber-50 p-6"
          >
            <h2 className="text-lg font-semibold text-amber-900">
              Important: {guide.shortName} Service Transition
            </h2>
            <p className="mt-2 text-amber-800">{guide.transitionInfo.message}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {guide.transitionInfo.targetSlugs.map((targetSlug) => {
                const target = SERVICER_GUIDES[targetSlug];
                if (!target) return null;
                return (
                  <Link
                    key={targetSlug}
                    href={`/guides/servicer/${targetSlug}`}
                    data-testid={`transition-link-${targetSlug}`}
                    className="inline-flex items-center rounded-lg bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-900 hover:bg-amber-200"
                  >
                    See {target.shortName} Guide
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Contact Info */}
        <section
          data-testid="servicer-contact-section"
          className="my-12 rounded-xl border border-gray-200 bg-gray-50 p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900">
            Contact {guide.shortName}
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Phone</p>
              <p
                data-testid="servicer-phone"
                className="mt-1 text-base font-semibold text-gray-900"
              >
                {guide.phone}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Hours</p>
              <p className="mt-1 text-sm text-gray-900">{guide.hours}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Online Portal</p>
              <a
                href={guide.portalUrl}
                data-testid="servicer-portal-link"
                className="mt-1 inline-block text-sm font-medium text-emerald-600 hover:text-emerald-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                {guide.website.replace("https://", "")}
              </a>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Mailing Address</p>
              <p className="mt-1 text-sm text-gray-900">{guide.mailingAddress}</p>
            </div>
          </div>

          {/* Processing Times */}
          <div className="mt-6 border-t border-gray-200 pt-4">
            <p className="text-sm font-medium text-gray-500">
              Estimated Processing Times
            </p>
            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
              <div className="rounded-lg bg-white p-3">
                <p className="text-xs font-medium text-gray-500">IBR Enrollment</p>
                <p className="mt-1 text-sm text-gray-900">
                  {guide.processingTimes.ibr}
                </p>
              </div>
              <div className="rounded-lg bg-white p-3">
                <p className="text-xs font-medium text-gray-500">Rehabilitation</p>
                <p className="mt-1 text-sm text-gray-900">
                  {guide.processingTimes.rehabilitation}
                </p>
              </div>
              <div className="rounded-lg bg-white p-3">
                <p className="text-xs font-medium text-gray-500">Consolidation</p>
                <p className="mt-1 text-sm text-gray-900">
                  {guide.processingTimes.consolidation}
                </p>
              </div>
            </div>
          </div>

          {/* Tips/Quirks */}
          {guide.quirks.length > 0 && (
            <div className="mt-4 border-t border-gray-200 pt-4">
              <p className="text-sm font-medium text-gray-500">
                Tips for {guide.shortName} Borrowers
              </p>
              <ul className="mt-2 space-y-1">
                {guide.quirks.map((quirk, i) => (
                  <li key={i} className="text-sm text-gray-600">
                    &bull; {quirk}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* Quiz CTA - prominent, with required testid */}
        <div data-testid="servicer-quiz-cta">
          <QuizCTA />
        </div>

        {/* IBR Section */}
        <section
          data-testid="servicer-ibr-section"
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-gray-900">
            How to Enroll in IBR with {guide.shortName}
          </h2>
          <p className="mt-4 text-gray-600 leading-7">
            Income-Based Repayment caps your monthly payment at 10-15% of your
            discretionary income. Here is how to enroll through{" "}
            {guide.shortName}:
          </p>
          <StepList steps={guide.ibrSteps} />
          <p className="mt-4 text-sm text-gray-500">
            For a complete guide, see our{" "}
            <Link
              href="/guides/ibr-enrollment"
              data-testid="servicer-link-ibr-guide"
              className="font-medium text-emerald-600 hover:text-emerald-500"
            >
              IBR Enrollment Guide
            </Link>
            .
          </p>
        </section>

        {/* Rehabilitation Section */}
        <section
          data-testid="servicer-rehab-section"
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-gray-900">
            Loan Rehabilitation with {guide.shortName}
          </h2>
          <p className="mt-4 text-gray-600 leading-7">
            If your loans are in default, rehabilitation removes the default from
            your credit report after 9 on-time payments:
          </p>
          <StepList steps={guide.rehabSteps} />
          <p className="mt-4 text-sm text-gray-500">
            For a complete guide, see our{" "}
            <Link
              href="/guides/loan-rehabilitation"
              data-testid="servicer-link-rehab-guide"
              className="font-medium text-emerald-600 hover:text-emerald-500"
            >
              Loan Rehabilitation Guide
            </Link>
            .
          </p>
        </section>

        {/* Consolidation Section */}
        <section
          data-testid="servicer-consolidation-section"
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-gray-900">
            Consolidation for {guide.shortName} Borrowers
          </h2>
          <p className="mt-4 text-gray-600 leading-7">
            Consolidation brings defaulted loans current immediately. It is
            processed through studentaid.gov, not through {guide.shortName}{" "}
            directly:
          </p>
          <StepList steps={guide.consolidationSteps} />
          <p className="mt-4 text-sm text-gray-500">
            For a complete guide, see our{" "}
            <Link
              href="/guides/loan-consolidation"
              data-testid="servicer-link-consolidation-guide"
              className="font-medium text-emerald-600 hover:text-emerald-500"
            >
              Loan Consolidation Guide
            </Link>
            .
          </p>
        </section>

        <div data-testid="servicer-quiz-cta-bottom">
          <QuizCTA />
        </div>

        {/* FAQ Section */}
        <section data-testid="servicer-faq-section" className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900">
            Frequently Asked Questions about {guide.shortName}
          </h2>
          <div className="mt-6 divide-y divide-gray-200">
            {guide.faqs.map((faq, index) => (
              <div key={index} className="py-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {faq.question}
                </h3>
                <p className="mt-3 text-gray-600 leading-7">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Other Servicer Guides */}
        <section data-testid="servicer-related-section" className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900">
            Other Loan Servicer Guides
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {otherGuides.map((other) => (
              <Link
                key={other.slug}
                href={`/guides/servicer/${other.slug}`}
                data-testid={`related-servicer-${other.slug}`}
                className="rounded-xl border border-gray-200 p-6 hover:border-emerald-300 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-gray-900">
                  {other.shortName} Guide
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Phone: {other.phone}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {other.processingTimes.ibr.includes("N/A")
                    ? "Service transitioned — see guide for details"
                    : `IBR processing: ${other.processingTimes.ibr}`}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Related Recovery Guides */}
        <section data-testid="servicer-recovery-guides" className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900">
            Related Recovery Guides
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Link
              href="/guides/ibr-enrollment"
              data-testid="related-guide-ibr"
              className="rounded-xl border border-gray-200 p-6 hover:border-emerald-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-900">
                IBR Enrollment Guide
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Lower your monthly payment based on income. Payments can be as
                low as $0/month.
              </p>
            </Link>
            <Link
              href="/guides/loan-rehabilitation"
              data-testid="related-guide-rehabilitation"
              className="rounded-xl border border-gray-200 p-6 hover:border-emerald-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-900">
                Loan Rehabilitation Guide
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Make 9 payments to remove the default notation from your credit
                report.
              </p>
            </Link>
            <Link
              href="/guides/loan-consolidation"
              data-testid="related-guide-consolidation"
              className="rounded-xl border border-gray-200 p-6 hover:border-emerald-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-900">
                Consolidation Guide
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Combine loans and get current immediately. Faster than
                rehabilitation.
              </p>
            </Link>
          </div>
        </section>

        <div data-testid="servicer-quiz-cta-final">
          <QuizCTA />
        </div>
      </article>
    </>
  );
}
