import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICERS, type ServicerInfo } from "@/lib/servicer-data";

const SERVICER_SLUGS = [
  "mohela",
  "nelnet",
  "aidvantage",
  "edfinancial",
] as const;

type ServicerSlug = (typeof SERVICER_SLUGS)[number];

function isValidServicerSlug(slug: string): slug is ServicerSlug {
  return SERVICER_SLUGS.includes(slug as ServicerSlug);
}

export function generateStaticParams() {
  return SERVICER_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isValidServicerSlug(slug)) return {};

  const servicer = SERVICERS[slug] as ServicerInfo;
  const title = `${servicer.shortName} Student Loan Help — Contact, Rehabilitation & Recovery — ScoreRebound`;
  const description = `How to recover your credit score if your ${servicer.shortName} student loans went delinquent. Contact info, rehabilitation, consolidation, and IBR enrollment guide.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

function generateArticleSchema(servicer: ServicerInfo) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${servicer.shortName} Student Loan Recovery Guide`,
    description: `How to recover your credit score if your ${servicer.shortName} student loans went delinquent.`,
    author: { "@type": "Organization", name: "ScoreRebound" },
    publisher: { "@type": "Organization", name: "ScoreRebound" },
  };
}

export default async function ServicerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isValidServicerSlug(slug)) notFound();

  const servicer = SERVICERS[slug] as ServicerInfo;
  const articleSchema = generateArticleSchema(servicer);

  return (
    <div
      data-testid="servicer-page"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="mx-auto max-w-3xl">
        <nav data-testid="servicer-breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link
                href="/"
                data-testid="breadcrumb-home"
                className="hover:text-emerald-600"
              >
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">
              {servicer.shortName}
            </li>
          </ol>
        </nav>

        <h1
          data-testid="servicer-title"
          className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
        >
          {servicer.shortName} Student Loan Recovery Guide
        </h1>

        <p
          data-testid="servicer-description"
          className="mt-6 text-lg leading-8 text-gray-600"
        >
          If your {servicer.shortName} student loans went delinquent after the
          COVID forbearance on-ramp ended, here is everything you need to know
          about recovering your credit score.
        </p>

        {/* Contact Information */}
        <section data-testid="servicer-contact" className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900">
            Contact Information
          </h2>
          <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-6">
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Full Name
                </dt>
                <dd
                  data-testid="servicer-full-name"
                  className="mt-1 text-sm text-gray-900"
                >
                  {servicer.name}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                <dd
                  data-testid="servicer-phone"
                  className="mt-1 text-sm text-gray-900"
                >
                  <a
                    href={`tel:${servicer.phone.replace(/[^0-9+]/g, "")}`}
                    data-testid="servicer-phone-link"
                    className="text-emerald-600 hover:text-emerald-500"
                  >
                    {servicer.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Website</dt>
                <dd
                  data-testid="servicer-website"
                  className="mt-1 text-sm text-gray-900"
                >
                  <a
                    href={servicer.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="servicer-website-link"
                    className="text-emerald-600 hover:text-emerald-500"
                  >
                    {servicer.website}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Hours</dt>
                <dd
                  data-testid="servicer-hours"
                  className="mt-1 text-sm text-gray-900"
                >
                  {servicer.hours}
                </dd>
              </div>
              {servicer.rehabilitationContact && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Rehabilitation Contact
                  </dt>
                  <dd
                    data-testid="servicer-rehab-contact"
                    className="mt-1 text-sm text-gray-900"
                  >
                    {servicer.rehabilitationContact}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </section>

        {/* Special Notes */}
        <section data-testid="servicer-notes" className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900">
            What You Should Know About {servicer.shortName}
          </h2>
          <ul className="mt-4 space-y-3">
            {servicer.specialNotes.map((note, i) => (
              <li
                key={i}
                data-testid={`servicer-note-${i}`}
                className="flex items-start gap-2 text-sm text-gray-600"
              >
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 11.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 10-1.414-1.414L11 10.586V7z" />
                </svg>
                {note}
              </li>
            ))}
          </ul>
        </section>

        {/* Recovery Options */}
        <section data-testid="servicer-recovery-options" className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900">
            Your Recovery Options with {servicer.shortName}
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Link
              href="/guide/ibr"
              data-testid="servicer-option-ibr"
              className="rounded-lg border border-gray-200 p-4 hover:border-emerald-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-900">
                Income-Based Repayment
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Lower your monthly payment based on income
              </p>
            </Link>
            <Link
              href="/guide/rehabilitation"
              data-testid="servicer-option-rehab"
              className="rounded-lg border border-gray-200 p-4 hover:border-emerald-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-900">
                Loan Rehabilitation
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Remove default from your credit report
              </p>
            </Link>
            <Link
              href="/guide/consolidation"
              data-testid="servicer-option-consolidation"
              className="rounded-lg border border-gray-200 p-4 hover:border-emerald-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-900">Consolidation</h3>
              <p className="mt-1 text-sm text-gray-600">
                Get current status immediately
              </p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <div
          data-testid="servicer-cta"
          className="mt-16 rounded-xl bg-emerald-50 border border-emerald-200 p-8 text-center"
        >
          <h2 className="text-xl font-semibold text-gray-900">
            Get your personalized {servicer.shortName} recovery plan
          </h2>
          <p className="mt-2 text-gray-600">
            Take our free quiz and we will tell you exactly which steps to take
            with {servicer.shortName} to recover your credit score.
          </p>
          <Link
            href="/quiz"
            data-testid="servicer-cta-link"
            className="mt-4 inline-block rounded-lg bg-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-emerald-500"
          >
            Start My Free Recovery Plan
          </Link>
        </div>
      </div>
    </div>
  );
}
