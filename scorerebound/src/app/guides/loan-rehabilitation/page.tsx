import type { Metadata } from "next";
import Link from "next/link";
import QuizCTA from "@/components/QuizCTA";
import FAQSchema, { type FAQItem } from "@/components/FAQSchema";

export const metadata: Metadata = {
  title:
    "Student Loan Rehabilitation Guide — Remove Default from Credit Report | ScoreRebound",
  description:
    "Complete guide to student loan rehabilitation. Make 9 affordable payments to remove the default from your credit report. Learn eligibility, steps, and credit score impact.",
  openGraph: {
    title:
      "Student Loan Rehabilitation Guide — Remove Default from Credit Report",
    description:
      "Make 9 affordable monthly payments to remove the default from your credit report. The only recovery path that erases the default notation.",
    type: "article",
    siteName: "ScoreRebound",
  },
};

const faqs: FAQItem[] = [
  {
    question: "What is student loan rehabilitation?",
    answer:
      "Student loan rehabilitation is a one-time opportunity to remove a federal student loan default from your credit report. You agree to make 9 voluntary, on-time monthly payments within 10 consecutive months. The payment amount is calculated based on your income and can be as low as $5 per month.",
  },
  {
    question:
      "How much are the rehabilitation payments?",
    answer:
      "Your rehabilitation payment is calculated as 15% of your discretionary income divided by 12. Discretionary income is the difference between your adjusted gross income and 150% of the poverty guideline. If this calculation results in a very low amount, the minimum payment is $5 per month.",
  },
  {
    question:
      "Will rehabilitation remove the default from my credit report?",
    answer:
      "Yes — this is the unique benefit of rehabilitation over other recovery paths. Once you complete 9 qualifying payments, the default notation is removed from your credit report. However, the individual late payment records that occurred before the default will remain.",
  },
  {
    question: "Can I rehabilitate my loans more than once?",
    answer:
      "No. Loan rehabilitation is a one-time opportunity per loan. If you default again after completing rehabilitation, you cannot rehabilitate that loan a second time. Your only options would be consolidation or full repayment.",
  },
  {
    question:
      "What happens to wage garnishment during rehabilitation?",
    answer:
      "Wage garnishment is suspended once you enter a rehabilitation agreement and must stop entirely once rehabilitation is complete. Tax refund offsets may also be stopped or refunded if rehabilitation is completed before the offset is processed.",
  },
  {
    question:
      "How long does loan rehabilitation take?",
    answer:
      "The rehabilitation process requires 9 on-time payments within 10 consecutive months, so it takes approximately 9-10 months from start to finish. After completion, it may take an additional 1-2 months for the default to be removed from your credit report.",
  },
];

function HowToSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Rehabilitate Your Student Loans",
    description:
      "Step-by-step guide to student loan rehabilitation. Make 9 affordable payments to remove the default notation from your credit report.",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Find your loan holder",
        text: "Log into studentaid.gov to see your current loan holder, or call the Default Resolution Group at 1-800-621-3115.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Request a rehabilitation agreement",
        text: "Contact your loan holder and request rehabilitation. They will calculate your monthly payment based on your income. The minimum payment is $5 per month.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Make 9 on-time payments within 10 months",
        text: "Payments must be voluntary, made within 20 days of the due date, and for the full agreed-upon amount. You have 10 consecutive months to make 9 qualifying payments.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Loan transferred to new servicer",
        text: "After completing rehabilitation, your loan is transferred from the default holder back to a regular federal loan servicer. The default notation is removed from your credit report.",
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "Enroll in an income-driven repayment plan",
        text: "Immediately enroll in IBR or another income-driven plan with your new servicer to keep payments affordable and avoid defaulting again.",
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

export default function LoanRehabilitationGuide() {
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
          <span className="text-gray-900">Loan Rehabilitation Guide</span>
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
            Student Loan Rehabilitation Guide
          </h1>
          <p
            data-testid="guide-description"
            className="mt-6 text-lg leading-8 text-gray-600"
          >
            Loan rehabilitation is the <strong>only federal program</strong> that removes
            the default notation from your credit report. By making 9 affordable monthly
            payments, you can erase the default and start rebuilding your credit. This
            guide covers everything you need to know.
          </p>
        </header>

        {/* Key Stats */}
        <div
          data-testid="guide-key-stats"
          className="my-12 grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-center">
            <p className="text-3xl font-bold text-emerald-600">9</p>
            <p className="mt-1 text-sm text-gray-600">
              on-time payments required
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-center">
            <p className="text-3xl font-bold text-emerald-600">$5/mo</p>
            <p className="mt-1 text-sm text-gray-600">
              minimum payment possible
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-center">
            <p className="text-3xl font-bold text-emerald-600">50-150 pts</p>
            <p className="mt-1 text-sm text-gray-600">
              potential score improvement
            </p>
          </div>
        </div>

        <QuizCTA />

        {/* What is Rehabilitation */}
        <section data-testid="guide-section-what-is" className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900">
            What Is Loan Rehabilitation?
          </h2>
          <p className="mt-4 text-gray-600 leading-7">
            Student loan rehabilitation is a federal program designed to help borrowers
            recover from default. When you default on federal student loans — typically
            after 270 days of non-payment — it creates a devastating mark on your credit
            report that can drop your score by 100 or more points.
          </p>
          <p className="mt-4 text-gray-600 leading-7">
            Rehabilitation gives you one chance to erase that default. You agree to
            make 9 voluntary, on-time monthly payments within a window of 10
            consecutive months. The payment amount is based on your income and can be
            as low as $5 per month. Once you complete the 9 payments, the default
            notation is removed from all three credit bureaus.
          </p>
          <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-sm text-emerald-800">
              <strong>Key benefit:</strong> Rehabilitation is the only recovery path
              that removes the default notation itself from your credit report.
              Consolidation brings your loans current but the default record stays.
            </p>
          </div>
        </section>

        {/* Eligibility */}
        <section data-testid="guide-section-eligibility" className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900">
            Eligibility Requirements
          </h2>
          <ul className="mt-4 space-y-3 text-gray-600">
            <li className="flex gap-3">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                1
              </span>
              <span>
                <strong>Your loans must be in default</strong> — rehabilitation is
                specifically for borrowers who have already defaulted on federal loans.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                2
              </span>
              <span>
                <strong>Federal loans only</strong> — private student loans are not
                eligible for rehabilitation.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                3
              </span>
              <span>
                <strong>One-time opportunity</strong> — you can only rehabilitate each
                loan once. If you default again, consolidation is your only option.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                4
              </span>
              <span>
                <strong>Not in active bankruptcy</strong> — you cannot rehabilitate
                loans that are part of an active bankruptcy proceeding.
              </span>
            </li>
          </ul>
        </section>

        {/* Step by Step */}
        <section data-testid="guide-section-steps" className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900">
            How to Rehabilitate Your Loans: Step by Step
          </h2>
          <div className="mt-8 space-y-8">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-lg font-bold text-white">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Find your loan holder
                </h3>
                <p className="mt-2 text-gray-600 leading-7">
                  If your loans are in default, they may have been transferred to the
                  Default Resolution Group (DRG) or a collection agency. Log into{" "}
                  <a
                    href="https://studentaid.gov"
                    data-testid="guide-link-studentaid"
                    className="font-medium text-emerald-600 hover:text-emerald-500"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    studentaid.gov
                  </a>{" "}
                  to see your current loan holder, or call the Default Resolution Group
                  at 1-800-621-3115.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-lg font-bold text-white">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Request a rehabilitation agreement
                </h3>
                <p className="mt-2 text-gray-600 leading-7">
                  Contact your loan holder and tell them you want to rehabilitate your
                  loan. They will calculate your monthly payment based on your income. If
                  you disagree with the calculated amount, you can request a review.
                  The minimum payment is $5 per month.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-lg font-bold text-white">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Make 9 on-time payments within 10 months
                </h3>
                <p className="mt-2 text-gray-600 leading-7">
                  Payments must be voluntary (not from wage garnishment), made within
                  20 days of the due date, and for the full agreed-upon amount. You
                  have 10 consecutive months to make 9 qualifying payments — meaning you
                  can miss one month and still succeed.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-lg font-bold text-white">
                4
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Your loan is transferred to a new servicer
                </h3>
                <p className="mt-2 text-gray-600 leading-7">
                  After completing rehabilitation, your loan is transferred from the
                  default holder back to a regular federal loan servicer (like
                  MOHELA, Nelnet, or Aidvantage). The default notation is removed
                  from your credit report.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-lg font-bold text-white">
                5
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Immediately enroll in an income-driven repayment plan
                </h3>
                <p className="mt-2 text-gray-600 leading-7">
                  Once rehabilitation is complete, enroll in{" "}
                  <Link
                    href="/guides/ibr-enrollment"
                    data-testid="guide-link-ibr"
                    className="font-medium text-emerald-600 hover:text-emerald-500"
                  >
                    Income-Based Repayment (IBR)
                  </Link>{" "}
                  or another income-driven plan with your new servicer. Do this right
                  away — the default payment amount after rehabilitation may be high,
                  and you do not want to fall behind again.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Credit Impact */}
        <section data-testid="guide-section-credit-impact" className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900">
            Credit Score Impact of Rehabilitation
          </h2>
          <p className="mt-4 text-gray-600 leading-7">
            Loan rehabilitation delivers the biggest potential credit score improvement
            of any recovery path because it removes the default notation itself — not
            just bringing the loan current.
          </p>
          <div className="mt-6 space-y-4">
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900">Default removal (major impact)</h3>
              <p className="mt-1 text-sm text-gray-600">
                The default notation is removed from all three credit bureaus. This is
                often the single largest negative item on your report, and removing it
                can result in a 50-150 point improvement.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900">Late payments remain (smaller impact)</h3>
              <p className="mt-1 text-sm text-gray-600">
                Individual late payment records from before the default will stay on your
                report for 7 years from the date they occurred. However, they become
                less impactful over time.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900">Timeline</h3>
              <p className="mt-1 text-sm text-gray-600">
                The full rehabilitation process takes 9-10 months, plus 1-2 months for
                credit bureau updates. Most borrowers see significant score improvement
                within 12 months of starting rehabilitation.
              </p>
            </div>
          </div>
        </section>

        <QuizCTA />

        {/* Pros and Cons */}
        <section data-testid="guide-section-pros-cons" className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900">
            Rehabilitation vs. Consolidation
          </h2>
          <p className="mt-4 text-gray-600 leading-7">
            Both rehabilitation and consolidation can resolve a default, but they work
            differently. Here is how they compare:
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 pr-4 font-semibold text-gray-900">Feature</th>
                  <th className="py-3 pr-4 font-semibold text-emerald-700">Rehabilitation</th>
                  <th className="py-3 font-semibold text-gray-700">Consolidation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-3 pr-4 text-gray-600">Removes default from credit report</td>
                  <td className="py-3 pr-4 font-medium text-emerald-700">Yes</td>
                  <td className="py-3 text-gray-600">No</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-gray-600">Time to complete</td>
                  <td className="py-3 pr-4 text-gray-600">9-10 months</td>
                  <td className="py-3 font-medium text-gray-900">1-3 months</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-gray-600">Gets you current immediately</td>
                  <td className="py-3 pr-4 text-gray-600">No (after 9 payments)</td>
                  <td className="py-3 font-medium text-gray-900">Yes</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-gray-600">Can be used multiple times</td>
                  <td className="py-3 pr-4 text-gray-600">No (once per loan)</td>
                  <td className="py-3 font-medium text-gray-900">Yes</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-gray-600">Minimum payment</td>
                  <td className="py-3 pr-4 font-medium text-emerald-700">$5/month</td>
                  <td className="py-3 text-gray-600">Varies by income</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-gray-600">Available for Parent PLUS</td>
                  <td className="py-3 pr-4 text-gray-600">Limited</td>
                  <td className="py-3 font-medium text-gray-900">Yes</td>
                </tr>
              </tbody>
            </table>
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
                After rehabilitation, enroll in IBR to keep your payments
                affordable and avoid defaulting again.
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
                Already used your rehabilitation opportunity? Consolidation can
                still bring your loans current.
              </p>
            </Link>
          </div>
        </section>

        <QuizCTA />
      </article>
    </>
  );
}
