import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About ScoreRebound — Free Student Loan Credit Score Recovery Tools",
  description:
    "ScoreRebound provides free tools and personalized plans to help borrowers recover their credit scores after student loan delinquency. Learn about our mission and how we help.",
  openGraph: {
    title: "About ScoreRebound — Free Student Loan Credit Score Recovery Tools",
    description:
      "Free tools and personalized plans to help 2.2M+ borrowers recover their credit scores after student loan delinquency.",
    type: "website",
    siteName: "ScoreRebound",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function AboutPage() {
  return (
    <div
      data-testid="about-page"
      className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8"
    >
      {/* Breadcrumb */}
      <nav
        data-testid="about-breadcrumb"
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
        <span className="text-gray-900">About</span>
      </nav>

      {/* Header */}
      <header>
        <h1
          data-testid="about-title"
          className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
        >
          About ScoreRebound
        </h1>
        <p
          data-testid="about-subtitle"
          className="mt-6 text-lg leading-8 text-gray-600"
        >
          Free tools to help you recover your credit score after student loan
          delinquency.
        </p>
      </header>

      {/* Mission */}
      <section data-testid="about-mission" className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
        <p className="mt-4 text-gray-600 leading-7">
          When the COVID-era student loan forbearance ended in late 2024, over
          2.2 million borrowers were caught off guard. Payments they thought were
          still paused suddenly went delinquent, and credit scores dropped by
          100 points or more overnight. Many borrowers discovered the damage only
          when they were denied for a mortgage, auto loan, or apartment.
        </p>
        <p className="mt-4 text-gray-600 leading-7">
          ScoreRebound exists to help these borrowers navigate the recovery
          process. We provide free, personalized guidance on the federal programs
          available — Income-Based Repayment, loan rehabilitation, and
          consolidation — so every borrower can find the right path back to
          financial health.
        </p>
      </section>

      {/* How It Works */}
      <section data-testid="about-how-it-works" className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">How It Works</h2>
        <div className="mt-8 space-y-8">
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-lg font-bold text-white">
              1
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Take the Quiz
              </h3>
              <p className="mt-2 text-gray-600 leading-7">
                Our 5-question quiz asks about your loan type, servicer,
                delinquency status, current credit score range, and recovery
                goals. It takes about 2 minutes — no signup required.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-lg font-bold text-white">
              2
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Get Your Personalized Plan
              </h3>
              <p className="mt-2 text-gray-600 leading-7">
                Based on your answers, we generate a step-by-step recovery plan
                recommending the best federal program for your situation —
                whether that is IBR enrollment, loan rehabilitation,
                consolidation, or a combination.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-lg font-bold text-white">
              3
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Follow the Steps and Recover
              </h3>
              <p className="mt-2 text-gray-600 leading-7">
                Your plan includes specific actions, links to official
                government resources, and estimated timelines. Our guides
                provide detailed, servicer-specific instructions for each step
                of the process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Cover */}
      <section data-testid="about-resources" className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">
          Resources We Provide
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/guides/ibr-enrollment"
            data-testid="about-link-ibr"
            className="rounded-xl border border-gray-200 p-6 hover:border-emerald-300 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-gray-900">
              IBR Enrollment Guide
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Lower your monthly payment to as little as $0 based on your
              income.
            </p>
          </Link>
          <Link
            href="/guides/loan-rehabilitation"
            data-testid="about-link-rehabilitation"
            className="rounded-xl border border-gray-200 p-6 hover:border-emerald-300 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-gray-900">
              Loan Rehabilitation Guide
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Remove the default from your credit report with 9 affordable
              payments.
            </p>
          </Link>
          <Link
            href="/guides/loan-consolidation"
            data-testid="about-link-consolidation"
            className="rounded-xl border border-gray-200 p-6 hover:border-emerald-300 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-gray-900">
              Consolidation Guide
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Get current immediately by combining loans into one.
            </p>
          </Link>
          <Link
            href="/compare/credit-builders"
            data-testid="about-link-credit-builders"
            className="rounded-xl border border-gray-200 p-6 hover:border-emerald-300 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-gray-900">
              Credit Builder Comparison
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Compare secured cards and credit-builder loans to accelerate
              recovery.
            </p>
          </Link>
        </div>
      </section>

      {/* How We Make Money */}
      <section data-testid="about-revenue" className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">
          How We Make Money
        </h2>
        <p className="mt-4 text-gray-600 leading-7">
          ScoreRebound is free because we earn affiliate commissions when users
          sign up for credit-building products we recommend — secured credit
          cards, credit-builder loans, credit monitoring services, and student
          loan refinancing. We only recommend products that we believe genuinely
          help with credit recovery.
        </p>
        <p className="mt-4 text-gray-600 leading-7">
          Our recovery quiz and educational content are always free. We never
          charge borrowers for access to our tools or personalized plans.
        </p>
      </section>

      {/* Disclaimer */}
      <section data-testid="about-disclaimer" className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">Disclaimer</h2>
        <p className="mt-4 text-gray-600 leading-7">
          ScoreRebound provides educational information about federal student
          loan programs and credit recovery strategies. We are not a financial
          advisor, credit repair organization, or law firm. The information on
          this site is for educational purposes only and should not be
          considered legal or financial advice. Always consult a qualified
          professional for guidance specific to your situation.
        </p>
      </section>

      {/* CTA */}
      <section
        data-testid="about-cta"
        className="mt-16 rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-12 text-center"
      >
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Ready to Start Recovering?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-gray-600">
          Take our free 2-minute quiz and get your personalized credit score
          recovery plan.
        </p>
        <Link
          href="/quiz"
          data-testid="about-cta-button"
          className="mt-8 inline-block rounded-lg bg-emerald-600 px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
        >
          Start My Free Recovery Plan
        </Link>
      </section>
    </div>
  );
}
