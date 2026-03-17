import type { Metadata } from "next";
import Link from "next/link";
import FAQSection from "@/components/FAQSection";
import { FAQ_ITEMS, generateFAQSchema } from "@/lib/faq-data";

export const metadata: Metadata = {
  title:
    "FAQ — Student Loan Credit Score Recovery Questions — ScoreRebound",
  description:
    "Find answers to common questions about student loan credit score recovery, loan rehabilitation, IBR enrollment, consolidation, and rebuilding your credit.",
  openGraph: {
    title: "FAQ — Student Loan Credit Score Recovery — ScoreRebound",
    description:
      "Answers to common questions about recovering your credit score after student loan delinquency.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ — Student Loan Credit Score Recovery — ScoreRebound",
    description:
      "Answers to common questions about recovering your credit score after student loan delinquency.",
  },
};

export default function FAQPage() {
  const faqSchema = generateFAQSchema(FAQ_ITEMS);

  return (
    <div
      data-testid="faq-page"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mx-auto max-w-3xl">
        <h1
          data-testid="faq-page-title"
          className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
        >
          Frequently Asked Questions
        </h1>
        <p
          data-testid="faq-page-description"
          className="mt-4 text-lg text-gray-600"
        >
          Everything you need to know about recovering your credit score after
          student loan delinquency or default.
        </p>

        <div className="mt-12">
          <FAQSection items={FAQ_ITEMS} />
        </div>

        <div
          data-testid="faq-cta"
          className="mt-16 rounded-xl bg-emerald-50 border border-emerald-200 p-8 text-center"
        >
          <h2 className="text-xl font-semibold text-gray-900">
            Still have questions?
          </h2>
          <p className="mt-2 text-gray-600">
            Take our free quiz to get a personalized recovery plan for your
            situation.
          </p>
          <Link
            href="/quiz"
            data-testid="faq-cta-link"
            className="mt-4 inline-block rounded-lg bg-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-emerald-500"
          >
            Start My Free Recovery Plan
          </Link>
        </div>
      </div>
    </div>
  );
}
