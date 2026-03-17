import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import QuizCTA from "@/components/QuizCTA";
import FAQSchema, { type FAQItem } from "@/components/FAQSchema";
import { SERVICERS, type ServicerInfo } from "@/lib/servicer-data";

interface ServicerPageData {
  servicerKey: string;
  servicer: ServicerInfo;
  description: string;
  aboutContent: string[];
  ibrSteps: string[];
  rehabSteps: string[];
  consolidationSteps: string[];
  faqs: FAQItem[];
}

const SERVICER_PAGES: Record<string, ServicerPageData> = {
  mohela: {
    servicerKey: "mohela",
    servicer: SERVICERS["mohela"]!,
    description:
      "MOHELA (Missouri Higher Education Loan Authority) is the largest federal student loan servicer in the United States. This guide covers how to contact MOHELA, enroll in IBR, start rehabilitation, and recover your credit score.",
    aboutContent: [
      "MOHELA is the largest federal student loan servicer, managing the accounts of millions of borrowers. If your loans were previously serviced by FedLoan Servicing (PHEAA), they were likely transferred to MOHELA in 2022.",
      "MOHELA handles most Public Service Loan Forgiveness (PSLF) accounts and has dedicated teams for income-driven repayment applications. They can process IBR applications by phone, which is often faster than the online portal.",
      "Many borrowers affected by the post-COVID forbearance credit score drop are serviced by MOHELA. If you missed payments after the forbearance on-ramp ended in late 2024, MOHELA is your primary point of contact for resolution.",
    ],
    ibrSteps: [
      "Log into your MOHELA account at mohela.com or call 1-888-866-4352",
      "Request to switch to an Income-Based Repayment (IBR) plan",
      "Provide your most recent tax return or current pay stubs",
      "MOHELA can process IBR applications by phone — often faster than online",
      "You can also apply through studentaid.gov and MOHELA will be notified",
      "Set up autopay for a 0.25% interest rate reduction",
    ],
    rehabSteps: [
      "Call MOHELA at 1-888-866-4352 and select the rehabilitation option",
      "MOHELA will calculate your monthly rehabilitation payment based on income",
      "Minimum payment can be as low as $5/month",
      "Make 9 voluntary, on-time payments within 10 consecutive months",
      "After completion, the default is removed from your credit report",
      "Your loan will be assigned to a regular servicer (possibly MOHELA again)",
    ],
    consolidationSteps: [
      "Apply for consolidation at studentaid.gov — not through MOHELA directly",
      "Select an income-driven repayment plan during the application",
      "Processing takes 30-60 days",
      "Your consolidated loan may be assigned to MOHELA or another servicer",
      "Continue making MOHELA payments until consolidation is complete",
    ],
    faqs: [
      {
        question: "How do I contact MOHELA about my student loans?",
        answer:
          "You can reach MOHELA by phone at 1-888-866-4352 (Monday-Friday, 7am-9pm CT) or online at mohela.com. Log into your account to view your loan details, make payments, and submit repayment plan change requests.",
      },
      {
        question: "Can MOHELA process my IBR application by phone?",
        answer:
          "Yes. MOHELA can process income-driven repayment applications by phone, which is often faster than the online process. Have your most recent tax return or pay stubs ready when you call. You can also apply online through studentaid.gov.",
      },
      {
        question: "My loans were transferred to MOHELA from FedLoan. What do I need to do?",
        answer:
          "If your loans were transferred from FedLoan Servicing (PHEAA) to MOHELA, your loan terms, balances, and repayment plan remain the same. Create a MOHELA account at mohela.com if you haven't already, and verify that your payment information and autopay settings transferred correctly.",
      },
      {
        question: "Does MOHELA handle Public Service Loan Forgiveness (PSLF)?",
        answer:
          "Yes. MOHELA is the primary servicer for PSLF accounts. If you work for a qualifying employer and are making payments under an income-driven plan, submit your PSLF Employment Certification Form through MOHELA to track your qualifying payments.",
      },
      {
        question: "What are MOHELA's customer service hours?",
        answer:
          "MOHELA's phone support is available Monday through Friday, 7am to 9pm Central Time, at 1-888-866-4352. Online account access through mohela.com is available 24/7.",
      },
    ],
  },
  nelnet: {
    servicerKey: "nelnet",
    servicer: SERVICERS["nelnet"]!,
    description:
      "Nelnet is a major federal student loan servicer with a strong online portal. This guide covers contacting Nelnet, enrolling in IBR, managing your repayment, and recovering your credit score.",
    aboutContent: [
      "Nelnet is one of the largest federal student loan servicers in the US, known for its user-friendly online portal and extended customer service hours. They service millions of federal student loan borrowers.",
      "Nelnet offers a strong online platform for managing your repayment plan, making payments, and applying for income-driven repayment. Their portal lets you see projected payments under different plans before you commit.",
      "If you fell behind on payments after the COVID forbearance ended, Nelnet's online tools make it straightforward to explore your options and get back on track. They offer autopay enrollment with a 0.25% interest rate discount.",
    ],
    ibrSteps: [
      "Log into your Nelnet account at nelnet.com",
      "Navigate to Repayment Plans and explore income-driven options",
      "Nelnet's portal shows projected payments under each plan",
      "Submit your IDR application online through Nelnet or studentaid.gov",
      "Provide your most recent tax return or income documentation",
      "Enroll in auto-debit for a 0.25% interest rate reduction",
    ],
    rehabSteps: [
      "Call Nelnet at 1-888-486-4722 to discuss rehabilitation options",
      "If your loan is in default, Nelnet will calculate an affordable payment",
      "Agree to the rehabilitation payment amount (can be as low as $5/month)",
      "Make 9 on-time payments within 10 consecutive months",
      "Once complete, the default notation is removed from your credit report",
      "Immediately enroll in an income-driven plan to keep payments affordable",
    ],
    consolidationSteps: [
      "Apply at studentaid.gov/consolidation — the application is not through Nelnet",
      "Select which Nelnet-serviced loans you want to consolidate",
      "Choose an income-driven repayment plan during the application",
      "Continue making Nelnet payments until consolidation is finalized (30-60 days)",
      "Your new consolidated loan may be assigned to a different servicer",
    ],
    faqs: [
      {
        question: "How do I contact Nelnet about my student loans?",
        answer:
          "Contact Nelnet by phone at 1-888-486-4722 (Monday-Friday 7am-10pm CT, Saturday 8am-4pm CT) or online at nelnet.com. Their online portal lets you manage your account, view payment history, and change repayment plans.",
      },
      {
        question: "Can I change my repayment plan online through Nelnet?",
        answer:
          "Yes. Nelnet's online portal allows you to explore and apply for different repayment plans, including income-driven options. You can see projected payments under each plan before committing. For income-driven plans, you can also apply through studentaid.gov.",
      },
      {
        question: "Does Nelnet offer an auto-debit discount?",
        answer:
          "Yes. Nelnet offers a 0.25% interest rate reduction when you enroll in automatic debit payments. This saves you money over time and ensures you never miss a payment — which is critical for credit score recovery.",
      },
      {
        question: "What are Nelnet's customer service hours?",
        answer:
          "Nelnet's phone support is available Monday through Friday, 7am to 10pm Central Time, and Saturday 8am to 4pm CT, at 1-888-486-4722. Online access through nelnet.com is available 24/7.",
      },
      {
        question: "My credit score dropped after the COVID forbearance ended. What should I do?",
        answer:
          "Contact Nelnet immediately to discuss your options. If you are behind on payments, you may be able to enroll in an income-driven repayment plan like IBR to make payments affordable. If you have already defaulted, ask about rehabilitation or consolidation to resolve the default status.",
      },
    ],
  },
  aidvantage: {
    servicerKey: "aidvantage",
    servicer: SERVICERS["aidvantage"]!,
    description:
      "Aidvantage (formerly Navient federal loans) is a federal student loan servicer. This guide covers contacting Aidvantage, enrolling in income-driven repayment, and recovering your credit score.",
    aboutContent: [
      "Aidvantage took over the federal student loan portfolio from Navient in December 2021. If you previously had federal loans serviced by Navient, they are now with Aidvantage. Your loan terms, balances, and repayment plan did not change during the transfer.",
      "Aidvantage supports online applications for income-driven repayment plans and provides tools to manage your account online. They service a significant portion of the federal student loan portfolio.",
      "If your credit score dropped after the COVID forbearance on-ramp ended, Aidvantage can help you explore options to get back on track. Whether you need IBR enrollment, rehabilitation, or consolidation, contacting Aidvantage is your first step.",
    ],
    ibrSteps: [
      "Log into your Aidvantage account at aidvantage.com",
      "Navigate to repayment options and review income-driven plans",
      "Submit an IDR application through aidvantage.com or studentaid.gov",
      "Provide your most recent tax return or proof of income",
      "Aidvantage will process your application and notify you of your new payment",
      "Set up autopay to ensure on-time payments and get a rate reduction",
    ],
    rehabSteps: [
      "Call Aidvantage at 1-800-722-1300 to discuss rehabilitation",
      "If in default, they will calculate an income-based rehabilitation payment",
      "Minimum payment can be as low as $5/month",
      "Make 9 on-time payments within 10 consecutive months",
      "After completion, the default is removed from your credit report",
      "Enroll in an income-driven plan immediately after rehabilitation",
    ],
    consolidationSteps: [
      "Apply at studentaid.gov/consolidation — not through Aidvantage directly",
      "Select which Aidvantage-serviced loans you want to consolidate",
      "Choose an income-driven repayment plan if your loans are in default",
      "Continue making payments to Aidvantage until consolidation completes (30-60 days)",
      "Your new consolidated loan may be assigned to a different servicer",
    ],
    faqs: [
      {
        question: "How do I contact Aidvantage about my student loans?",
        answer:
          "Contact Aidvantage by phone at 1-800-722-1300 (Monday-Friday, 8am-9pm ET) or online at aidvantage.com. You can manage your account, make payments, and apply for repayment plan changes through their online portal.",
      },
      {
        question: "My loans were with Navient. Are they now at Aidvantage?",
        answer:
          "If you had federal student loans serviced by Navient, they were transferred to Aidvantage in December 2021. Your loan terms, interest rates, and repayment plan remained the same. Create an Aidvantage account at aidvantage.com to manage your loans.",
      },
      {
        question: "Can I apply for income-driven repayment through Aidvantage?",
        answer:
          "Yes. Aidvantage supports online IDR plan applications through their portal. You can also apply through studentaid.gov. Both methods work — use whichever is more convenient. Have your tax return ready to verify income.",
      },
      {
        question: "What are Aidvantage's customer service hours?",
        answer:
          "Aidvantage's phone support is available Monday through Friday, 8am to 9pm Eastern Time, at 1-800-722-1300. Online account access through aidvantage.com is available 24/7.",
      },
      {
        question: "Does Aidvantage offer autopay discounts?",
        answer:
          "Yes. Like most federal loan servicers, Aidvantage offers a 0.25% interest rate reduction when you enroll in autopay. This saves money and ensures on-time payments, which is the most important factor in credit score recovery.",
      },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(SERVICER_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = SERVICER_PAGES[slug];
  if (!data) return {};

  return {
    title: `${data.servicer.shortName} Student Loan Guide — Contact, IBR, Rehabilitation | ScoreRebound`,
    description: data.description,
    openGraph: {
      title: `${data.servicer.shortName} Student Loan Guide — ScoreRebound`,
      description: data.description,
      type: "article",
      siteName: "ScoreRebound",
    },
  };
}

export default async function ServicerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = SERVICER_PAGES[slug];

  if (!data) {
    notFound();
  }

  const { servicer, faqs } = data;

  return (
    <>
      <FAQSchema faqs={faqs} />

      <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav data-testid="servicer-breadcrumb" className="mb-8 text-sm text-gray-500">
          <Link href="/" data-testid="breadcrumb-home" className="hover:text-emerald-700">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{servicer.shortName}</span>
        </nav>

        {/* Header */}
        <header data-testid="servicer-header">
          <div className="mb-4 inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
            Loan Servicer
          </div>
          <h1
            data-testid="servicer-title"
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
          >
            {servicer.shortName} Student Loan Guide
          </h1>
          <p
            data-testid="servicer-description"
            className="mt-6 text-lg leading-8 text-gray-600"
          >
            {data.description}
          </p>
        </header>

        {/* Contact Info */}
        <div
          data-testid="servicer-contact-info"
          className="my-12 rounded-xl border border-gray-200 bg-gray-50 p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900">
            Contact {servicer.shortName}
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <p className="text-sm font-medium text-gray-500">Phone</p>
              <p className="mt-1 text-base font-semibold text-gray-900">
                {servicer.phone}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Hours</p>
              <p className="mt-1 text-sm text-gray-900">{servicer.hours}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Website</p>
              <a
                href={servicer.website}
                data-testid="servicer-website-link"
                className="mt-1 inline-block text-sm font-medium text-emerald-600 hover:text-emerald-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                {servicer.website.replace("https://", "")}
              </a>
            </div>
          </div>
          {servicer.specialNotes.length > 0 && (
            <div className="mt-4 border-t border-gray-200 pt-4">
              <p className="text-sm font-medium text-gray-500">Key Notes</p>
              <ul className="mt-2 space-y-1">
                {servicer.specialNotes.map((note, i) => (
                  <li key={i} className="text-sm text-gray-600">
                    &bull; {note}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <QuizCTA />

        {/* About */}
        <section data-testid="servicer-section-about" className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900">
            About {servicer.shortName}
          </h2>
          {data.aboutContent.map((paragraph, i) => (
            <p key={i} className="mt-4 text-gray-600 leading-7">
              {paragraph}
            </p>
          ))}
        </section>

        {/* IBR Steps */}
        <section data-testid="servicer-section-ibr" className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900">
            How to Enroll in IBR with {servicer.shortName}
          </h2>
          <p className="mt-4 text-gray-600 leading-7">
            Income-Based Repayment caps your monthly payment at 10-15% of your
            discretionary income. Here is how to enroll through {servicer.shortName}:
          </p>
          <ol className="mt-6 space-y-3">
            {data.ibrSteps.map((step, i) => (
              <li key={i} className="flex gap-3 text-gray-600">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-sm text-gray-500">
            For a complete guide, see our{" "}
            <Link
              href="/guides/ibr-enrollment"
              data-testid="servicer-link-ibr-guide"
              className="font-medium text-emerald-600 hover:text-emerald-500"
            >
              IBR Enrollment Guide
            </Link>
            .
          </p>
        </section>

        {/* Rehabilitation Steps */}
        <section data-testid="servicer-section-rehab" className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900">
            Loan Rehabilitation with {servicer.shortName}
          </h2>
          <p className="mt-4 text-gray-600 leading-7">
            If your loans are in default, rehabilitation removes the default from
            your credit report after 9 on-time payments:
          </p>
          <ol className="mt-6 space-y-3">
            {data.rehabSteps.map((step, i) => (
              <li key={i} className="flex gap-3 text-gray-600">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-sm text-gray-500">
            For a complete guide, see our{" "}
            <Link
              href="/guides/loan-rehabilitation"
              data-testid="servicer-link-rehab-guide"
              className="font-medium text-emerald-600 hover:text-emerald-500"
            >
              Loan Rehabilitation Guide
            </Link>
            .
          </p>
        </section>

        {/* Consolidation Steps */}
        <section data-testid="servicer-section-consolidation" className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900">
            Consolidation for {servicer.shortName} Borrowers
          </h2>
          <p className="mt-4 text-gray-600 leading-7">
            Consolidation brings defaulted loans current immediately. It is processed
            through studentaid.gov, not through {servicer.shortName} directly:
          </p>
          <ol className="mt-6 space-y-3">
            {data.consolidationSteps.map((step, i) => (
              <li key={i} className="flex gap-3 text-gray-600">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-sm text-gray-500">
            For a complete guide, see our{" "}
            <Link
              href="/guides/loan-consolidation"
              data-testid="servicer-link-consolidation-guide"
              className="font-medium text-emerald-600 hover:text-emerald-500"
            >
              Loan Consolidation Guide
            </Link>
            .
          </p>
        </section>

        <QuizCTA />

        {/* FAQ */}
        <section data-testid="servicer-section-faq" className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900">
            Frequently Asked Questions about {servicer.shortName}
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

        {/* Other Servicers */}
        <section data-testid="servicer-section-related" className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900">
            Other Loan Servicer Guides
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {Object.entries(SERVICER_PAGES)
              .filter(([key]) => key !== slug)
              .map(([key, otherData]) => (
                <Link
                  key={key}
                  href={`/servicers/${key}`}
                  data-testid={`related-servicer-${key}`}
                  className="rounded-xl border border-gray-200 p-6 hover:border-emerald-300 hover:shadow-md transition-all"
                >
                  <h3 className="font-semibold text-gray-900">
                    {otherData.servicer.shortName} Guide
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Phone: {otherData.servicer.phone}
                  </p>
                </Link>
              ))}
          </div>
        </section>

        <QuizCTA />
      </article>
    </>
  );
}
