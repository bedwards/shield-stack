import type { Metadata } from "next";
import Link from "next/link";
import QuizCTA from "@/components/QuizCTA";
import FAQSchema, { type FAQItem } from "@/components/FAQSchema";

export const metadata: Metadata = {
  title:
    "Student Loan Consolidation Guide — Get Current Immediately | ScoreRebound",
  description:
    "Complete guide to Direct Consolidation Loans. Combine multiple federal loans, get out of default immediately, and access income-driven repayment plans.",
  openGraph: {
    title: "Student Loan Consolidation Guide — Get Current Immediately",
    description:
      "Combine multiple federal student loans into one. Brings defaulted loans current immediately. The fastest path out of default.",
    type: "article",
    siteName: "ScoreRebound",
  },
};

const faqs: FAQItem[] = [
  {
    question: "What is a Direct Consolidation Loan?",
    answer:
      "A Direct Consolidation Loan combines multiple federal student loans into a single new loan with a fixed interest rate based on the weighted average of the loans being consolidated, rounded up to the nearest one-eighth of a percent. It simplifies repayment into one monthly payment and can resolve default status.",
  },
  {
    question:
      "Can I consolidate loans that are in default?",
    answer:
      "Yes. One of the primary benefits of consolidation is that it can resolve default status. If you consolidate defaulted loans, you must agree to repay the new consolidation loan under an income-driven repayment plan, or make three consecutive, voluntary, on-time monthly payments on the defaulted loan before consolidating.",
  },
  {
    question: "Will consolidation remove the default from my credit report?",
    answer:
      "No. Unlike rehabilitation, consolidation does not remove the default notation from your credit report. The old defaulted loans will show as paid through consolidation, and the new consolidation loan will appear as current. The default record remains for 7 years from the original default date.",
  },
  {
    question: "Can I consolidate Parent PLUS loans?",
    answer:
      "Yes. Parent PLUS loans can be consolidated into a Direct Consolidation Loan. This is particularly important because it is the only way to access income-driven repayment — specifically Income-Contingent Repayment (ICR) — for Parent PLUS loans. Note: a consolidated Parent PLUS loan cannot be combined with other federal student loans.",
  },
  {
    question: "How long does consolidation take?",
    answer:
      "The consolidation process typically takes 30-60 days from application submission to completion. During this time, continue making payments on your existing loans to avoid additional delinquency. Once processed, your old loans are paid off and replaced by the new consolidation loan.",
  },
  {
    question: "Will consolidation lower my interest rate?",
    answer:
      "Not typically. The interest rate on a consolidation loan is the weighted average of the rates on the loans being consolidated, rounded up to the nearest one-eighth of a percent. So it may be slightly higher. However, consolidation gives you access to income-driven repayment plans that can significantly lower your monthly payment.",
  },
];

function HowToSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Consolidate Your Student Loans",
    description:
      "Step-by-step guide to Direct Consolidation Loans. Combine multiple federal loans, get out of default immediately, and access income-driven repayment plans.",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Check which loans to consolidate",
        text: "Log into studentaid.gov to see all your federal loans, their servicers, balances, and statuses. You can choose to consolidate all or some. Private loans cannot be included.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Submit the consolidation application",
        text: "Apply online at studentaid.gov/consolidation. During the application, select an income-driven repayment plan if your loans are in default.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Continue payments during processing",
        text: "Processing takes 30-60 days. Continue making payments on existing loans during this time to avoid additional delinquency.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Set up autopay with your new servicer",
        text: "Once your consolidation loan is active, enroll in autopay for on-time payments and a 0.25% interest rate reduction.",
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "Start building positive credit history",
        text: "Pair consolidation with a credit-building strategy — a secured credit card or credit-builder loan adds positive payment history that accelerates score recovery.",
      },
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

export default function LoanConsolidationGuide() {
  return (
    <>
      <HowToSchema />
      <FAQSchema faqs={faqs} />

      <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav data-testid="guide-breadcrumb" className="mb-8 text-sm text-gray-500">
          <Link href="/" data-testid="breadcrumb-home" className="hover:text-emerald-700">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Loan Consolidation Guide</span>
        </nav>

        {/* Header */}
        <header data-testid="guide-header">
          <div className="mb-4 inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
            Recovery Path
          </div>
          <h1
            data-testid="guide-title"
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
          >
            Student Loan Consolidation Guide
          </h1>
          <p
            data-testid="guide-description"
            className="mt-6 text-lg leading-8 text-gray-600"
          >
            A Direct Consolidation Loan is the <strong>fastest way to get out of
            default</strong> on federal student loans. It combines multiple loans
            into one, immediately brings defaulted loans to current status, and
            unlocks access to income-driven repayment plans. Here is everything
            you need to know.
          </p>
        </header>

        {/* Key Stats */}
        <div
          data-testid="guide-key-stats"
          className="my-12 grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-center">
            <p className="text-3xl font-bold text-emerald-600">30-60 days</p>
            <p className="mt-1 text-sm text-gray-600">
              to process and get current
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-center">
            <p className="text-3xl font-bold text-emerald-600">1 payment</p>
            <p className="mt-1 text-sm text-gray-600">
              instead of multiple loans
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-center">
            <p className="text-3xl font-bold text-emerald-600">IDR access</p>
            <p className="mt-1 text-sm text-gray-600">
              income-driven plans unlocked
            </p>
          </div>
        </div>

        <QuizCTA />

        {/* What is Consolidation */}
        <section data-testid="guide-section-what-is" className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900">
            What Is a Direct Consolidation Loan?
          </h2>
          <p className="mt-4 text-gray-600 leading-7">
            A Direct Consolidation Loan is a federal program that allows you to combine
            multiple federal student loans into a single new loan. The new loan has a
            fixed interest rate based on the weighted average of the rates on the loans
            being consolidated, rounded up to the nearest one-eighth of a percent.
          </p>
          <p className="mt-4 text-gray-600 leading-7">
            For borrowers in default, consolidation offers a critical benefit: it
            immediately brings your loans to current status. While it does not remove the
            default notation from your credit report (rehabilitation does that), it is
            significantly faster — processing in weeks rather than the 9+ months required
            for rehabilitation.
          </p>
          <p className="mt-4 text-gray-600 leading-7">
            Consolidation is also the only path for Parent PLUS loan borrowers to access
            income-driven repayment plans. After consolidating, Parent PLUS borrowers can
            enroll in Income-Contingent Repayment (ICR).
          </p>
        </section>

        {/* When to Choose */}
        <section data-testid="guide-section-when-to-choose" className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900">
            When Should You Choose Consolidation?
          </h2>
          <p className="mt-4 text-gray-600 leading-7">
            Consolidation is the right choice in several scenarios:
          </p>
          <ul className="mt-4 space-y-3 text-gray-600">
            <li className="flex gap-3">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                1
              </span>
              <span>
                <strong>You need to get current fast:</strong> If you are applying for a
                mortgage, apartment, or job that requires a credit check, consolidation
                brings your loans current in 30-60 days versus 9+ months for rehabilitation.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                2
              </span>
              <span>
                <strong>You already used rehabilitation:</strong> You can only rehabilitate
                each loan once. If you have defaulted again, consolidation is your path back.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                3
              </span>
              <span>
                <strong>You have Parent PLUS loans:</strong> Consolidation is the only way
                to access income-driven repayment for Parent PLUS borrowers.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                4
              </span>
              <span>
                <strong>You have multiple loans with different servicers:</strong> Consolidation
                simplifies to one loan, one servicer, one monthly payment.
              </span>
            </li>
          </ul>
        </section>

        {/* Step by Step */}
        <section data-testid="guide-section-steps" className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900">
            How to Consolidate: Step by Step
          </h2>
          <div className="mt-8 space-y-8">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-lg font-bold text-white">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Check which loans you want to consolidate
                </h3>
                <p className="mt-2 text-gray-600 leading-7">
                  Log into{" "}
                  <a
                    href="https://studentaid.gov"
                    data-testid="guide-link-studentaid"
                    className="font-medium text-emerald-600 hover:text-emerald-500"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    studentaid.gov
                  </a>{" "}
                  to see all your federal loans, their servicers, balances, and statuses.
                  You can choose to consolidate all of them or only some. Private loans
                  cannot be included.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-lg font-bold text-white">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Submit the consolidation application
                </h3>
                <p className="mt-2 text-gray-600 leading-7">
                  Apply online at{" "}
                  <a
                    href="https://studentaid.gov/app/launchConsolidation.action"
                    data-testid="guide-link-consolidation-app"
                    className="font-medium text-emerald-600 hover:text-emerald-500"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    studentaid.gov/consolidation
                  </a>
                  . During the application, you will select a repayment plan. If your
                  loans are in default, you must select an income-driven repayment plan.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-lg font-bold text-white">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Continue payments during processing
                </h3>
                <p className="mt-2 text-gray-600 leading-7">
                  Processing takes 30-60 days. Continue making payments on your existing
                  loans during this time to avoid additional delinquency. Your old loans
                  will be paid off once the consolidation loan is finalized.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-lg font-bold text-white">
                4
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Set up autopay with your new servicer
                </h3>
                <p className="mt-2 text-gray-600 leading-7">
                  Once your consolidation loan is active, immediately enroll in autopay.
                  This ensures on-time payments (critical for credit recovery) and often
                  qualifies you for a 0.25% interest rate reduction.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-lg font-bold text-white">
                5
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Start building positive credit history
                </h3>
                <p className="mt-2 text-gray-600 leading-7">
                  With your loans now current, pair consolidation with a{" "}
                  <Link
                    href="/guides/ibr-enrollment"
                    data-testid="guide-link-ibr"
                    className="font-medium text-emerald-600 hover:text-emerald-500"
                  >
                    credit-building strategy
                  </Link>{" "}
                  — a secured credit card or credit-builder loan adds positive payment
                  history that accelerates your score recovery.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Credit Impact */}
        <section data-testid="guide-section-credit-impact" className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900">
            Credit Score Impact of Consolidation
          </h2>
          <p className="mt-4 text-gray-600 leading-7">
            Consolidation provides immediate relief by bringing your loans to current
            status, but the credit impact is different from rehabilitation:
          </p>
          <div className="mt-6 space-y-4">
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900">Immediate: Loans show as current</h3>
              <p className="mt-1 text-sm text-gray-600">
                Your old defaulted loans will show as &quot;paid through consolidation&quot;
                and the new consolidation loan appears as current. This stops new negative
                marks immediately.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900">Default record remains</h3>
              <p className="mt-1 text-sm text-gray-600">
                Unlike rehabilitation, the default notation stays on your credit report
                for 7 years from the original default date. However, its impact
                diminishes over time, especially as you build positive payment history.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900">Estimated recovery</h3>
              <p className="mt-1 text-sm text-gray-600">
                Most borrowers see 30-100 points of improvement within 1-3 months
                of consolidation, depending on their overall credit profile and how
                much of their negative history was student-loan related.
              </p>
            </div>
          </div>
        </section>

        <QuizCTA />

        {/* Important Warnings */}
        <section data-testid="guide-section-warnings" className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900">
            Important Things to Know
          </h2>
          <div className="mt-6 space-y-4">
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
              <h3 className="font-semibold text-amber-800">
                Forgiveness progress may reset
              </h3>
              <p className="mt-1 text-sm text-amber-700">
                If you were making progress toward income-driven repayment forgiveness
                or Public Service Loan Forgiveness (PSLF), consolidation may reset your
                qualifying payment count. Check with your servicer before consolidating
                if this applies to you.
              </p>
            </div>
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
              <h3 className="font-semibold text-amber-800">
                Interest rate may be slightly higher
              </h3>
              <p className="mt-1 text-sm text-amber-700">
                The consolidation interest rate is the weighted average of your existing
                rates, rounded up to the nearest one-eighth of a percent. This rounding
                can result in a slightly higher overall rate.
              </p>
            </div>
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
              <h3 className="font-semibold text-amber-800">
                Private loans cannot be consolidated
              </h3>
              <p className="mt-1 text-sm text-amber-700">
                Direct Consolidation Loans are for federal student loans only. If you
                have private student loans, you would need to refinance them separately
                through a private lender.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section data-testid="guide-section-faq" className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <div className="mt-6 divide-y divide-gray-200">
            {faqs.map((faq, index) => (
              <div key={index} className="py-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {faq.question}
                </h3>
                <p className="mt-3 text-gray-600 leading-7">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Guides */}
        <section data-testid="guide-section-related" className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900">
            Related Recovery Guides
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link
              href="/guides/ibr-enrollment"
              data-testid="related-link-ibr"
              className="rounded-xl border border-gray-200 p-6 hover:border-emerald-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-900">
                IBR Enrollment Guide
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                After consolidation, enroll in IBR to keep your monthly payments
                affordable based on your income.
              </p>
            </Link>
            <Link
              href="/guides/loan-rehabilitation"
              data-testid="related-link-rehabilitation"
              className="rounded-xl border border-gray-200 p-6 hover:border-emerald-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-900">
                Loan Rehabilitation Guide
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Want the default removed from your credit report? Rehabilitation
                is the only path that does this.
              </p>
            </Link>
          </div>
        </section>

        <QuizCTA />
      </article>
    </>
  );
}
