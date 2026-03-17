import type { Metadata } from "next";
import Link from "next/link";
import QuizCTA from "@/components/QuizCTA";
import FAQSchema, { type FAQItem } from "@/components/FAQSchema";

export const metadata: Metadata = {
  title:
    "Income-Based Repayment (IBR) Enrollment Guide — ScoreRebound",
  description:
    "Step-by-step guide to enrolling in Income-Based Repayment (IBR) for federal student loans. Lower your monthly payment, avoid default, and start recovering your credit score.",
  openGraph: {
    title: "Income-Based Repayment (IBR) Enrollment Guide — ScoreRebound",
    description:
      "Step-by-step guide to enrolling in IBR. Lower your monthly payment based on your income and family size.",
    type: "article",
    siteName: "ScoreRebound",
  },
};

const faqs: FAQItem[] = [
  {
    question: "What is Income-Based Repayment (IBR)?",
    answer:
      "Income-Based Repayment (IBR) is a federal student loan repayment plan that caps your monthly payment at 10-15% of your discretionary income. If your income is low enough, your payment could be as low as $0 per month. After 20-25 years of qualifying payments, any remaining balance is forgiven.",
  },
  {
    question: "Who is eligible for IBR?",
    answer:
      "You are eligible for IBR if you have federal Direct Loans or FFEL loans and can demonstrate partial financial hardship — meaning your IBR payment would be less than what you'd pay under the standard 10-year repayment plan. Parent PLUS loans are not directly eligible but can qualify after consolidation.",
  },
  {
    question: "How do I apply for IBR?",
    answer:
      "You can apply for IBR online at studentaid.gov using the Income-Driven Repayment (IDR) application. You'll need your most recent tax return or pay stubs to verify your income. The application takes about 10 minutes. Your servicer will notify you of your new payment amount within 1-2 weeks.",
  },
  {
    question: "Will IBR remove late payments from my credit report?",
    answer:
      "No, IBR will not remove existing late payment records from your credit report. However, enrolling in IBR makes your payments affordable so you can make on-time payments going forward. Consistent on-time payments are the single most important factor in credit score recovery. Late payments become less impactful over time and fall off your report after 7 years.",
  },
  {
    question: "Can my IBR payment really be $0?",
    answer:
      "Yes. If your adjusted gross income is at or below 150% of the federal poverty guideline for your family size, your IBR payment will be $0/month. A $0 payment still counts as an 'on-time payment' for forgiveness purposes and will not generate new negative marks on your credit report.",
  },
  {
    question: "How long does it take to get approved for IBR?",
    answer:
      "The IBR application process typically takes 1-2 weeks from submission to approval. During this time, contact your servicer to request forbearance so you don't incur additional late payments while waiting. Once approved, your new lower payment takes effect immediately.",
  },
];

export default function IBREnrollmentGuide() {
  return (
    <>
      <FAQSchema faqs={faqs} />

      <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav data-testid="guide-breadcrumb" className="mb-8 text-sm text-gray-500">
          <Link href="/" data-testid="breadcrumb-home" className="hover:text-emerald-700">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">IBR Enrollment Guide</span>
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
            Income-Based Repayment (IBR) Enrollment Guide
          </h1>
          <p
            data-testid="guide-description"
            className="mt-6 text-lg leading-8 text-gray-600"
          >
            If your student loan payments are unaffordable and you are falling behind,
            Income-Based Repayment can lower your monthly payment to as little as $0
            based on your income. This guide walks you through everything you need to
            know to enroll and start recovering your credit score.
          </p>
        </header>

        {/* Key Stats */}
        <div
          data-testid="guide-key-stats"
          className="my-12 grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-center">
            <p className="text-3xl font-bold text-emerald-600">10-15%</p>
            <p className="mt-1 text-sm text-gray-600">
              of discretionary income
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-center">
            <p className="text-3xl font-bold text-emerald-600">$0</p>
            <p className="mt-1 text-sm text-gray-600">
              possible monthly payment
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-center">
            <p className="text-3xl font-bold text-emerald-600">20-25 yr</p>
            <p className="mt-1 text-sm text-gray-600">
              forgiveness timeline
            </p>
          </div>
        </div>

        <QuizCTA />

        {/* What is IBR */}
        <section data-testid="guide-section-what-is-ibr" className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900">
            What Is Income-Based Repayment?
          </h2>
          <p className="mt-4 text-gray-600 leading-7">
            Income-Based Repayment (IBR) is one of several income-driven repayment (IDR)
            plans offered by the federal government for student loans. Under IBR, your
            monthly payment is capped at a percentage of your discretionary income — the
            difference between your adjusted gross income and 150% of the poverty guideline
            for your state and family size.
          </p>
          <p className="mt-4 text-gray-600 leading-7">
            For borrowers who took out their first loans after July 1, 2014, the cap is
            10% of discretionary income with forgiveness after 20 years. For earlier
            borrowers, it is 15% with forgiveness after 25 years.
          </p>
          <p className="mt-4 text-gray-600 leading-7">
            If your income is very low — at or below 150% of the federal poverty
            guideline — your monthly payment will be $0. This still counts as a
            qualifying payment for forgiveness and will not result in negative credit
            reporting.
          </p>
        </section>

        {/* Eligibility */}
        <section data-testid="guide-section-eligibility" className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900">
            Who Is Eligible for IBR?
          </h2>
          <p className="mt-4 text-gray-600 leading-7">
            To qualify for IBR, you must meet these requirements:
          </p>
          <ul className="mt-4 space-y-3 text-gray-600">
            <li className="flex gap-3">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                1
              </span>
              <span>
                <strong>Federal loans:</strong> You must have eligible federal student
                loans — Direct Loans or FFEL loans. Private loans are not eligible.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                2
              </span>
              <span>
                <strong>Partial financial hardship:</strong> Your calculated IBR payment
                must be less than what you would pay under the standard 10-year repayment
                plan.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                3
              </span>
              <span>
                <strong>Not in default:</strong> If your loans are in default, you must
                first rehabilitate or consolidate them before you can enroll in IBR. See
                our{" "}
                <Link
                  href="/guides/loan-rehabilitation"
                  data-testid="guide-link-rehabilitation"
                  className="font-medium text-emerald-600 hover:text-emerald-500"
                >
                  Loan Rehabilitation Guide
                </Link>{" "}
                or{" "}
                <Link
                  href="/guides/loan-consolidation"
                  data-testid="guide-link-consolidation"
                  className="font-medium text-emerald-600 hover:text-emerald-500"
                >
                  Consolidation Guide
                </Link>
                .
              </span>
            </li>
          </ul>
          <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm text-amber-800">
              <strong>Parent PLUS loans:</strong> Parent PLUS loans are not directly
              eligible for IBR. However, if you consolidate your Parent PLUS loans
              into a Direct Consolidation Loan, you can access the Income-Contingent
              Repayment (ICR) plan.
            </p>
          </div>
        </section>

        {/* Step by Step */}
        <section data-testid="guide-section-steps" className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900">
            How to Enroll in IBR: Step by Step
          </h2>
          <div className="mt-8 space-y-8">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-lg font-bold text-white">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Gather your documents
                </h3>
                <p className="mt-2 text-gray-600 leading-7">
                  You will need your most recent federal tax return (or tax transcript)
                  and your current pay stubs if your income has changed since you last
                  filed. If you are married and file jointly, your spouse&apos;s income
                  will also be considered.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-lg font-bold text-white">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Submit the IDR application on studentaid.gov
                </h3>
                <p className="mt-2 text-gray-600 leading-7">
                  Go to{" "}
                  <a
                    href="https://studentaid.gov/app/ibrInstructions.action"
                    data-testid="guide-link-studentaid"
                    className="font-medium text-emerald-600 hover:text-emerald-500"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    studentaid.gov
                  </a>{" "}
                  and complete the Income-Driven Repayment application. Select IBR as
                  your preferred plan (or let the system recommend the best plan for you).
                  The application takes about 10 minutes.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-lg font-bold text-white">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Request forbearance while your application processes
                </h3>
                <p className="mt-2 text-gray-600 leading-7">
                  Call your servicer and ask for administrative forbearance during the
                  processing period. This prevents additional late payments while you
                  wait for approval. Processing typically takes 1-2 weeks.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-lg font-bold text-white">
                4
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Set up automatic payments
                </h3>
                <p className="mt-2 text-gray-600 leading-7">
                  Once approved, enroll in autopay with your servicer. Autopay ensures
                  you never miss a payment (the #1 factor in credit recovery) and most
                  servicers offer a 0.25% interest rate reduction for enrollment.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-lg font-bold text-white">
                5
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Recertify your income annually
                </h3>
                <p className="mt-2 text-gray-600 leading-7">
                  IBR requires annual income recertification. Your servicer will notify
                  you when it is time. If you miss the deadline, your payment may
                  temporarily increase to the standard amount. Set a calendar reminder
                  60 days before your recertification date.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Credit Impact */}
        <section data-testid="guide-section-credit-impact" className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900">
            How IBR Affects Your Credit Score
          </h2>
          <p className="mt-4 text-gray-600 leading-7">
            Enrolling in IBR does not directly remove past late payments from your credit
            report. However, it is one of the most powerful tools for credit recovery
            because it makes your payments affordable, allowing you to make consistent
            on-time payments going forward.
          </p>
          <div className="mt-6 space-y-4">
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900">Payment history (35% of your score)</h3>
              <p className="mt-1 text-sm text-gray-600">
                Each on-time IBR payment adds positive history. After 12-24 months of
                consistent payments, most borrowers see significant score improvement.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900">Delinquency aging (time heals)</h3>
              <p className="mt-1 text-sm text-gray-600">
                Past late payments become less impactful over time. A late payment from
                18 months ago hurts much less than one from last month. IBR stops new
                delinquencies from appearing.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900">Estimated recovery</h3>
              <p className="mt-1 text-sm text-gray-600">
                Most borrowers who enroll in IBR and make consistent on-time payments
                see 30-80 points of credit score improvement within 3-9 months.
              </p>
            </div>
          </div>
        </section>

        <QuizCTA />

        {/* Pros and Cons */}
        <section data-testid="guide-section-pros-cons" className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900">
            IBR Pros and Cons
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6">
              <h3 className="font-semibold text-emerald-800">Pros</h3>
              <ul className="mt-3 space-y-2 text-sm text-emerald-900">
                <li className="flex gap-2">
                  <span>+</span>
                  <span>Immediately lowers monthly payment</span>
                </li>
                <li className="flex gap-2">
                  <span>+</span>
                  <span>Payment can be $0 if income is very low</span>
                </li>
                <li className="flex gap-2">
                  <span>+</span>
                  <span>Remaining balance forgiven after 20-25 years</span>
                </li>
                <li className="flex gap-2">
                  <span>+</span>
                  <span>Stops further delinquencies from appearing</span>
                </li>
                <li className="flex gap-2">
                  <span>+</span>
                  <span>Qualifies for Public Service Loan Forgiveness (PSLF)</span>
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-red-200 bg-red-50 p-6">
              <h3 className="font-semibold text-red-800">Cons</h3>
              <ul className="mt-3 space-y-2 text-sm text-red-900">
                <li className="flex gap-2">
                  <span>-</span>
                  <span>Does not remove existing late payments from credit report</span>
                </li>
                <li className="flex gap-2">
                  <span>-</span>
                  <span>Interest may capitalize (be added to principal)</span>
                </li>
                <li className="flex gap-2">
                  <span>-</span>
                  <span>Forgiven amount may be taxable as income</span>
                </li>
                <li className="flex gap-2">
                  <span>-</span>
                  <span>Must recertify income annually</span>
                </li>
              </ul>
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
              href="/guides/loan-rehabilitation"
              data-testid="related-link-rehabilitation"
              className="rounded-xl border border-gray-200 p-6 hover:border-emerald-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-900">
                Loan Rehabilitation Guide
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Already in default? Learn how to make 9 payments to remove the
                default from your credit report.
              </p>
            </Link>
            <Link
              href="/guides/loan-consolidation"
              data-testid="related-link-consolidation"
              className="rounded-xl border border-gray-200 p-6 hover:border-emerald-300 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-900">
                Consolidation Guide
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Combine multiple loans into one and get current immediately.
                Faster than rehabilitation.
              </p>
            </Link>
          </div>
        </section>

        <QuizCTA />
      </article>
    </>
  );
}
