import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  isValidGuideSlug,
  getGuideData,
  getAllGuideSlugs,
  type GuideSlug,
} from "@/lib/guide-data";

export function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isValidGuideSlug(slug)) return {};

  const guide = getGuideData(slug);
  const title = `${guide.pathInfo.title} Guide — ScoreRebound`;
  const description = guide.pathInfo.detailedDescription.slice(0, 155) + "...";

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

function generateHowToSchema(guide: ReturnType<typeof getGuideData>) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to use ${guide.pathInfo.title} to recover your credit score`,
    description: guide.pathInfo.detailedDescription,
    estimatedCost: { "@type": "MonetaryCost", currency: "USD", value: "0" },
    totalTime: `P${guide.pathInfo.estimatedMonths.max}M`,
    step: guide.steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.title,
      text: step.description,
    })),
  };
}

function generateArticleSchema(guide: ReturnType<typeof getGuideData>) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${guide.pathInfo.title}: Complete Recovery Guide`,
    description: guide.pathInfo.detailedDescription,
    author: { "@type": "Organization", name: "ScoreRebound" },
    publisher: { "@type": "Organization", name: "ScoreRebound" },
  };
}

function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isValidGuideSlug(slug)) notFound();

  const guide = getGuideData(slug as GuideSlug);
  const howToSchema = generateHowToSchema(guide);
  const articleSchema = generateArticleSchema(guide);
  const faqSchema = generateFAQSchema(guide.faqs);

  return (
    <div
      data-testid="guide-page"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mx-auto max-w-3xl">
        <nav data-testid="guide-breadcrumb" className="mb-8">
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
              {guide.pathInfo.title}
            </li>
          </ol>
        </nav>

        <h1
          data-testid="guide-title"
          className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
        >
          {guide.pathInfo.title}: Complete Recovery Guide
        </h1>

        <p
          data-testid="guide-description"
          className="mt-6 text-lg leading-8 text-gray-600"
        >
          {guide.pathInfo.detailedDescription}
        </p>

        {/* Timeline estimate */}
        <div
          data-testid="guide-timeline"
          className="mt-8 flex items-center gap-3 rounded-lg bg-emerald-50 border border-emerald-200 p-4"
        >
          <svg
            className="h-5 w-5 text-emerald-600 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <span className="text-sm font-medium text-emerald-800">
            Estimated timeline: {guide.pathInfo.estimatedMonths.min}–
            {guide.pathInfo.estimatedMonths.max} months
          </span>
        </div>

        {/* Eligibility */}
        <section data-testid="guide-eligibility" className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900">Eligibility</h2>
          <ul className="mt-4 space-y-2">
            {guide.pathInfo.eligibility.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-gray-600"
              >
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Step-by-step guide */}
        <section data-testid="guide-steps" className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900">
            Step-by-Step Guide
          </h2>
          <ol className="mt-6 space-y-6">
            {guide.steps.map((step, i) => (
              <li
                key={i}
                data-testid={`guide-step-${i}`}
                className="flex gap-4"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Pros & Cons */}
        <section data-testid="guide-pros-cons" className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900">
            Pros &amp; Cons
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-green-200 bg-green-50 p-4">
              <h3 className="font-semibold text-green-800">Pros</h3>
              <ul className="mt-2 space-y-1">
                {guide.pathInfo.pros.map((pro, i) => (
                  <li key={i} className="text-sm text-green-700">
                    + {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <h3 className="font-semibold text-red-800">Cons</h3>
              <ul className="mt-2 space-y-1">
                {guide.pathInfo.cons.map((con, i) => (
                  <li key={i} className="text-sm text-red-700">
                    - {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Best For */}
        <section data-testid="guide-best-for" className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900">Best For</h2>
          <ul className="mt-4 space-y-2">
            {guide.pathInfo.bestFor.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-gray-600"
              >
                <span className="text-emerald-500">&#8226;</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        {guide.faqs.length > 0 && (
          <section data-testid="guide-faq" className="mt-12">
            <h2 className="text-xl font-semibold text-gray-900">
              Frequently Asked Questions
            </h2>
            <div className="mt-4 space-y-6">
              {guide.faqs.map((faq, i) => (
                <div key={i} data-testid={`guide-faq-${i}`}>
                  <h3 className="font-medium text-gray-900">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div
          data-testid="guide-cta"
          className="mt-16 rounded-xl bg-emerald-50 border border-emerald-200 p-8 text-center"
        >
          <h2 className="text-xl font-semibold text-gray-900">
            Not sure which path is right for you?
          </h2>
          <p className="mt-2 text-gray-600">
            Take our free quiz to get a personalized recovery plan.
          </p>
          <Link
            href="/quiz"
            data-testid="guide-cta-link"
            className="mt-4 inline-block rounded-lg bg-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-emerald-500"
          >
            Start My Free Recovery Plan
          </Link>
        </div>
      </div>
    </div>
  );
}
