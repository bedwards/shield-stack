import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About ScoreRebound — Free Student Loan Credit Score Recovery Tool",
  description:
    "ScoreRebound is a free tool helping 2.2 million borrowers recover their credit scores after student loan delinquency caused by the end of COVID forbearance.",
  openGraph: {
    title: "About ScoreRebound",
    description:
      "Free tool helping borrowers recover credit scores after student loan delinquency.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About ScoreRebound",
    description:
      "Free tool helping borrowers recover credit scores after student loan delinquency.",
  },
};

export default function AboutPage() {
  return (
    <div
      data-testid="about-page"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
    >
      <div className="mx-auto max-w-3xl">
        <h1
          data-testid="about-title"
          className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
        >
          About ScoreRebound
        </h1>

        <div className="mt-8 space-y-8 text-base leading-7 text-gray-600">
          <section data-testid="about-mission">
            <h2 className="text-xl font-semibold text-gray-900">
              Our Mission
            </h2>
            <p className="mt-3">
              When the COVID student loan forbearance on-ramp ended in late 2024,
              over 2.2 million borrowers saw their credit scores plummet — many
              losing 100 or more points virtually overnight. These borrowers
              discovered the damage when they were denied mortgages, car loans,
              or apartments.
            </p>
            <p className="mt-3">
              ScoreRebound exists to help these borrowers understand their
              options and take action. We provide free, personalized recovery
              plans based on each borrower&apos;s unique situation — loan type,
              servicer, delinquency status, and goals.
            </p>
          </section>

          <section data-testid="about-how-it-works">
            <h2 className="text-xl font-semibold text-gray-900">
              How It Works
            </h2>
            <p className="mt-3">
              Our recovery quiz takes just 2 minutes and asks 5 questions about
              your loans. Based on your answers, we generate a personalized
              step-by-step plan that tells you exactly what to do — whether
              that&apos;s enrolling in Income-Based Repayment, rehabilitating
              your loans, consolidating, or building credit through other
              strategies.
            </p>
          </section>

          <section data-testid="about-free">
            <h2 className="text-xl font-semibold text-gray-900">
              Always Free
            </h2>
            <p className="mt-3">
              ScoreRebound is completely free to use. We may recommend
              third-party products that could help your recovery (like
              credit-builder loans or secured credit cards). These
              recommendations are optional, and while we may earn a referral
              fee, this never affects the advice in your recovery plan.
            </p>
          </section>

          <section data-testid="about-disclaimer">
            <h2 className="text-xl font-semibold text-gray-900">
              Important Disclaimer
            </h2>
            <p className="mt-3">
              ScoreRebound provides educational information and general
              guidance. We are not financial advisors, attorneys, or credit
              counselors. Our recovery plans are based on publicly available
              information about federal student loan programs. For advice
              specific to your legal or financial situation, consult a qualified
              professional.
            </p>
          </section>
        </div>

        <div
          data-testid="about-cta"
          className="mt-12 rounded-xl bg-emerald-50 border border-emerald-200 p-8 text-center"
        >
          <h2 className="text-xl font-semibold text-gray-900">
            Ready to start recovering?
          </h2>
          <p className="mt-2 text-gray-600">
            Take our free quiz and get your personalized recovery plan in under
            2 minutes.
          </p>
          <Link
            href="/quiz"
            data-testid="about-cta-link"
            className="mt-4 inline-block rounded-lg bg-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-emerald-500"
          >
            Start My Free Recovery Plan
          </Link>
        </div>
      </div>
    </div>
  );
}
