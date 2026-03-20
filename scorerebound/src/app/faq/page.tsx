import type { Metadata } from "next";
import Link from "next/link";
import FAQSchema, { type FAQItem } from "@/components/FAQSchema";

export const metadata: Metadata = {
  title:
    "FAQ — Student Loan Credit Score Recovery Questions | ScoreRebound",
  description:
    "Answers to frequently asked questions about student loan credit score recovery, IBR enrollment, loan rehabilitation, consolidation, and credit building after default.",
  openGraph: {
    title: "FAQ — Student Loan Credit Score Recovery Questions",
    description:
      "Find answers about recovering your credit score after student loan delinquency. Covers IBR, rehabilitation, consolidation, and credit building.",
    type: "website",
    siteName: "ScoreRebound",
  },
  twitter: {
    card: "summary_large_image",
  },
};

interface FAQCategory {
  name: string;
  slug: string;
  faqs: FAQItem[];
}

const categories: FAQCategory[] = [
  {
    name: "General",
    slug: "general",
    faqs: [
      {
        question:
          "What happened to student loan credit scores after forbearance ended?",
        answer:
          "When the COVID-era student loan forbearance ended in late 2024, over 2.2 million borrowers who had fallen behind on payments saw delinquencies reported to credit bureaus for the first time. Many experienced credit score drops of 100 points or more, affecting their ability to qualify for mortgages, auto loans, and apartments.",
      },
      {
        question: "How long does it take to recover my credit score?",
        answer:
          "Recovery timelines depend on your situation and chosen recovery path. With Income-Based Repayment (IBR), most borrowers see 30-80 points of improvement within 3-9 months of consistent on-time payments. Loan rehabilitation takes 9-10 months but removes the default notation entirely, potentially improving your score by 50-150 points. Consolidation is the fastest path, bringing loans current in 30-60 days.",
      },
      {
        question: "Is ScoreRebound really free?",
        answer:
          "Yes, ScoreRebound is completely free for all borrowers. Our recovery quiz, personalized plan, and all educational guides are free to use with no signup required. We earn revenue through affiliate partnerships with credit-building products — you are never charged for using ScoreRebound itself.",
      },
      {
        question: "Do I need to sign up to use ScoreRebound?",
        answer:
          "No. You can take our recovery quiz and receive a personalized plan without creating an account. If you want to save your plan and track your progress over time, you can optionally create a free account.",
      },
      {
        question: "Will my credit score recover fully?",
        answer:
          "In most cases, yes — with time and consistent action. Late payment records become less impactful over time and fall off your credit report after 7 years. By enrolling in an affordable repayment plan and making on-time payments, you build positive credit history that gradually outweighs past delinquencies. Many borrowers return to their pre-delinquency score range within 12-24 months.",
      },
    ],
  },
  {
    name: "Income-Based Repayment (IBR)",
    slug: "ibr",
    faqs: [
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
        question: "Can my IBR payment really be $0?",
        answer:
          "Yes. If your adjusted gross income is at or below 150% of the federal poverty guideline for your family size, your IBR payment will be $0/month. A $0 payment still counts as an 'on-time payment' for forgiveness purposes and will not generate new negative marks on your credit report.",
      },
      {
        question: "Will IBR remove late payments from my credit report?",
        answer:
          "No, IBR will not remove existing late payment records. However, it makes your payments affordable so you can make on-time payments going forward. Consistent on-time payments are the single most important factor in credit score recovery. Late payments become less impactful over time and fall off after 7 years.",
      },
    ],
  },
  {
    name: "Loan Rehabilitation",
    slug: "rehabilitation",
    faqs: [
      {
        question: "What is student loan rehabilitation?",
        answer:
          "Student loan rehabilitation is a one-time opportunity to remove a federal student loan default from your credit report. You agree to make 9 voluntary, on-time monthly payments within 10 consecutive months. The payment amount is calculated based on your income and can be as low as $5 per month.",
      },
      {
        question:
          "Will rehabilitation remove the default from my credit report?",
        answer:
          "Yes — this is the unique benefit of rehabilitation over other recovery paths. Once you complete 9 qualifying payments, the default notation is removed from your credit report. However, individual late payment records from before the default will remain.",
      },
      {
        question: "Can I rehabilitate my loans more than once?",
        answer:
          "No. Loan rehabilitation is a one-time opportunity per loan. If you default again after completing rehabilitation, you cannot rehabilitate that loan a second time. Your only options would be consolidation or full repayment.",
      },
      {
        question: "How long does loan rehabilitation take?",
        answer:
          "The rehabilitation process requires 9 on-time payments within 10 consecutive months, so it takes approximately 9-10 months. After completion, it may take an additional 1-2 months for the default to be removed from your credit report.",
      },
    ],
  },
  {
    name: "Consolidation",
    slug: "consolidation",
    faqs: [
      {
        question: "What is a Direct Consolidation Loan?",
        answer:
          "A Direct Consolidation Loan combines multiple federal student loans into a single new loan with a fixed interest rate. It simplifies repayment into one monthly payment and can resolve default status by bringing loans current immediately.",
      },
      {
        question: "Can I consolidate loans that are in default?",
        answer:
          "Yes. One of the primary benefits of consolidation is that it can resolve default status. You must agree to repay the new consolidation loan under an income-driven repayment plan, or make three consecutive voluntary on-time payments first.",
      },
      {
        question:
          "Will consolidation remove the default from my credit report?",
        answer:
          "No. Unlike rehabilitation, consolidation does not remove the default notation from your credit report. The old defaulted loans will show as paid through consolidation, and the new consolidation loan will appear as current. The default record remains for 7 years.",
      },
      {
        question: "How long does consolidation take?",
        answer:
          "The consolidation process typically takes 30-60 days from application submission to completion. During this time, continue making payments on your existing loans to avoid additional delinquency.",
      },
    ],
  },
  {
    name: "Credit Building",
    slug: "credit-building",
    faqs: [
      {
        question:
          "What can I do to rebuild my credit while recovering from student loan delinquency?",
        answer:
          "The most effective strategy combines consistent on-time student loan payments with a credit-builder product. Secured credit cards, credit-builder loans (like Self or MoneyLion), and becoming an authorized user on a family member's card all add positive payment history. Keep utilization below 30% on any credit cards.",
      },
      {
        question: "Should I check my credit score during recovery?",
        answer:
          "Yes — monitoring your credit score is important for tracking progress and catching errors. Use free services like Credit Karma, your bank's credit monitoring, or AnnualCreditReport.com. Check at least monthly during active recovery. If you see an error, dispute it with the credit bureau immediately.",
      },
      {
        question: "Can I get a mortgage or auto loan while recovering?",
        answer:
          "It depends on your current score and the lender's requirements. FHA loans allow credit scores as low as 580 with 3.5% down. Some auto lenders work with borrowers in the 500-600 range, though at higher interest rates. Getting your student loans current (via consolidation or rehabilitation) and making 6-12 months of on-time payments significantly improves your odds.",
      },
    ],
  },
];

const allFaqs = categories.flatMap((cat) => cat.faqs);

export default function FAQPage() {
  return (
    <>
      <FAQSchema faqs={allFaqs} />

      <div data-testid="faq-page" className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav data-testid="faq-breadcrumb" className="mb-8 text-sm text-gray-500">
          <Link
            href="/"
            data-testid="breadcrumb-home"
            className="hover:text-emerald-700"
          >
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">FAQ</span>
        </nav>

        {/* Header */}
        <header>
          <h1
            data-testid="faq-page-title"
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
          >
            Frequently Asked Questions
          </h1>
          <p
            data-testid="faq-page-description"
            className="mt-6 text-lg leading-8 text-gray-600"
          >
            Everything you need to know about recovering your credit score after
            student loan delinquency. Can&apos;t find your answer?{" "}
            <Link
              href="/#quiz"
              data-testid="faq-quiz-link"
              className="font-medium text-emerald-600 hover:text-emerald-500"
            >
              Take our free quiz
            </Link>{" "}
            for a personalized recovery plan.
          </p>
        </header>

        {/* Table of Contents */}
        <nav
          data-testid="faq-toc"
          className="my-12 rounded-xl border border-gray-200 bg-gray-50 p-6"
        >
          <h2 className="text-sm font-semibold text-gray-900">
            Jump to a topic
          </h2>
          <ul className="mt-3 flex flex-wrap gap-3">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <a
                  href={`#${cat.slug}`}
                  data-testid={`faq-toc-${cat.slug}`}
                  className="inline-block rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:border-emerald-300 hover:text-emerald-700"
                >
                  {cat.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* FAQ Categories */}
        {categories.map((cat) => (
          <section
            key={cat.slug}
            id={cat.slug}
            data-testid={`faq-category-${cat.slug}`}
            className="mt-12 first:mt-0"
          >
            <h2 className="text-2xl font-bold text-gray-900">{cat.name}</h2>
            <div className="mt-6 divide-y divide-gray-200">
              {cat.faqs.map((faq, index) => (
                <div key={index} className="py-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {faq.question}
                  </h3>
                  <p className="mt-3 text-gray-600 leading-7">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* CTA */}
        <section
          data-testid="faq-cta"
          className="mt-16 rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-12 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Still have questions?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-600">
            Take our free quiz to get a personalized recovery plan based on
            your specific situation.
          </p>
          <Link
            href="/quiz"
            data-testid="faq-cta-button"
            className="mt-8 inline-block rounded-lg bg-emerald-600 px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            Start My Free Recovery Plan
          </Link>
        </section>
      </div>
    </>
  );
}
