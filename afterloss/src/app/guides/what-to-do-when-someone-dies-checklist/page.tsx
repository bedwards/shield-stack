import type { Metadata } from "next";
import Link from "next/link";
import GuideHero from "@/components/guides/GuideHero";
import TimelineSection from "@/components/guides/TimelineSection";
import FaqSection, { guideFaqs } from "@/components/guides/FaqSection";
import GuideCtaSection from "@/components/guides/GuideCtaSection";

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://afterloss.pages.dev";
const CANONICAL_PATH =
  "/guides/what-to-do-when-someone-dies-checklist";

export function generateMetadata(): Metadata {
  return {
    title:
      "What to Do When Someone Dies: The Complete 2026 Checklist",
    description:
      "Free step-by-step checklist of everything to do after someone dies — from death certificates and Social Security to probate, taxes, and closing the estate. Organized by timeline: first 24 hours through the first year.",
    keywords: [
      "what to do when someone dies checklist",
      "what to do when someone dies",
      "after death checklist",
      "checklist when someone dies",
      "death checklist 2026",
      "estate settlement checklist",
      "after someone dies what to do",
      "steps after death of loved one",
      "probate checklist",
      "death certificate how many copies",
      "notify social security of death",
    ],
    alternates: {
      canonical: `${BASE_URL}${CANONICAL_PATH}`,
    },
    openGraph: {
      title:
        "What to Do When Someone Dies: The Complete 2026 Checklist",
      description:
        "Free step-by-step guide with everything you need to do after a loved one dies. Organized by timeline with phone numbers, documents needed, and common mistakes to avoid.",
      type: "article",
      url: `${BASE_URL}${CANONICAL_PATH}`,
      siteName: "AfterLoss",
    },
    twitter: {
      card: "summary_large_image",
      title:
        "What to Do When Someone Dies: The Complete 2026 Checklist",
      description:
        "Free step-by-step guide with everything you need to do after a loved one dies. Organized by timeline with phone numbers, documents needed, and common mistakes to avoid.",
    },
  };
}

function JsonLdSchemas() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guideFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "What to Do When Someone Dies: Complete Checklist",
    description:
      "Step-by-step guide covering everything families need to do after a loved one dies, from the first 24 hours through the first year.",
    totalTime: "P365D",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "First 24 Hours",
        text: "Get a legal pronouncement of death, notify immediate family, arrange care for dependents and pets, secure the home and property, and contact a funeral home.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "First Week",
        text: "Order 10-15 certified death certificates, report the death to Social Security (800-772-1213), notify the employer about benefits, file life insurance claims, and secure financial accounts.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "First Month",
        text: "Consult an estate attorney if needed, file the will with probate court, apply for survivor benefits, cancel or transfer utilities and subscriptions, notify government agencies, and protect the deceased's identity with credit bureaus.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "First 3 Months",
        text: "Open an estate bank account, create a complete inventory of assets and debts, file outstanding insurance claims, transfer or sell vehicles, and address real property.",
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "First Year",
        text: "File final tax returns (Form 1040, Form 1041), consider portability election (Form 706), distribute assets to beneficiaries, close the estate, and take care of yourself with grief support resources.",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
    </>
  );
}

const tocItems = [
  { href: "#first-24-hours", label: "First 24 Hours" },
  { href: "#first-week", label: "First Week" },
  { href: "#first-month", label: "First Month" },
  { href: "#first-3-months", label: "First 3 Months" },
  { href: "#first-year", label: "First Year" },
  { href: "#faq", label: "Frequently Asked Questions" },
];

export default function WhatToDoWhenSomeoneDiesChecklistGuide() {
  return (
    <div data-testid="what-to-do-guide">
      <JsonLdSchemas />

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <GuideHero />

        {/* Table of Contents */}
        <nav
          data-testid="guide-toc"
          aria-label="Table of contents"
          className="mb-12 rounded-lg border border-border p-6"
        >
          <h2 className="text-lg font-semibold text-foreground mb-4">
            In this guide
          </h2>
          <ol className="space-y-2">
            {tocItems.map((item, index) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  data-testid={`toc-item-${index}`}
                  className="text-primary hover:text-primary-hover transition-colors text-sm"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ol>
          <div className="mt-4 pt-4 border-t border-border">
            <Link
              href="/onboard"
              data-testid="toc-cta"
              className="text-sm font-medium text-primary hover:text-primary-hover transition-colors"
            >
              Skip to personalized checklist &rarr;
            </Link>
          </div>
        </nav>

        <TimelineSection />

        <FaqSection />

        <GuideCtaSection />
      </article>
    </div>
  );
}
