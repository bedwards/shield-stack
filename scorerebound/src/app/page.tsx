import Link from "next/link";
import QuizFunnel from "@/components/QuizFunnel";
import FAQSchema, { type FAQItem } from "@/components/FAQSchema";

const landingFAQs: FAQItem[] = [
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
      "Yes, ScoreRebound is completely free for all borrowers. Our recovery quiz, personalized plan, and all educational guides are free to use with no signup required. We earn revenue through affiliate partnerships with credit-building products that we recommend as part of your recovery plan — you are never charged for using ScoreRebound itself.",
  },
  {
    question: "What recovery paths are available to me?",
    answer:
      "The three main federal recovery paths are: (1) Income-Based Repayment (IBR) — lowers your monthly payment to 10-15% of discretionary income, (2) Loan Rehabilitation — make 9 affordable payments to remove default from your credit report, and (3) Consolidation — combine loans into one and get current immediately. Our quiz recommends the best path based on your specific loan type, servicer, and situation.",
  },
  {
    question: "Do I need to sign up to use ScoreRebound?",
    answer:
      "No. You can take our recovery quiz and receive a personalized plan without creating an account. If you want to save your plan and track your progress over time, you can optionally create a free account. We believe in an anonymous-first experience — get value immediately, no barriers.",
  },
  {
    question: "Will my credit score recover fully?",
    answer:
      "In most cases, yes — with time and consistent action. Late payment records become less impactful over time and fall off your credit report after 7 years. By enrolling in an affordable repayment plan and making on-time payments, you build positive credit history that gradually outweighs past delinquencies. Many borrowers return to their pre-delinquency score range within 12-24 months.",
  },
];

export default function Home() {
  return (
    <>
      <FAQSchema faqs={landingFAQs} />

      {/* Hero Section */}
      <section
        data-testid="hero-section"
        className="relative overflow-hidden bg-gradient-to-b from-emerald-50 to-white"
      >
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div
              data-testid="hero-badge"
              className="mb-6 inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700"
            >
              Free for all borrowers
            </div>
            <h1
              data-testid="hero-title"
              className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
            >
              Recover your credit score after{" "}
              <span className="text-emerald-600">student loan</span>{" "}
              delinquency
            </h1>
            <p
              data-testid="hero-description"
              className="mt-6 text-lg leading-8 text-gray-600"
            >
              Take a 2-minute quiz and get a personalized, step-by-step recovery
              plan. Whether you need IBR enrollment, loan rehabilitation, or
              consolidation, we will show you exactly what to do.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-4">
              <a
                href="#quiz"
                data-testid="hero-cta-primary"
                className="rounded-lg bg-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
              >
                Start My Free Recovery Plan
              </a>
              <a
                href="#how-it-works"
                data-testid="hero-cta-secondary"
                className="text-base font-semibold text-gray-700 hover:text-emerald-700"
              >
                Learn more &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section data-testid="stats-section" className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div data-testid="stat-borrowers" className="text-center">
              <p className="text-4xl font-bold text-emerald-600">2.2M+</p>
              <p className="mt-2 text-sm text-gray-600">
                Borrowers affected by post-forbearance credit drops
              </p>
            </div>
            <div data-testid="stat-score-drop" className="text-center">
              <p className="text-4xl font-bold text-emerald-600">100+</p>
              <p className="mt-2 text-sm text-gray-600">
                Average credit score points lost
              </p>
            </div>
            <div data-testid="stat-recovery-time" className="text-center">
              <p className="text-4xl font-bold text-emerald-600">9-12 mo</p>
              <p className="mt-2 text-sm text-gray-600">
                Typical recovery timeline with the right plan
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        data-testid="how-it-works-section"
        className="bg-gray-50 py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              How ScoreRebound Works
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Three simple steps to start recovering your credit score
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div data-testid="step-1" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-lg font-bold text-emerald-700">
                1
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Take the Quiz
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Answer 5 quick questions about your loan type, servicer, and
                current situation.
              </p>
            </div>
            <div data-testid="step-2" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-lg font-bold text-emerald-700">
                2
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Get Your Plan
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Receive a personalized recovery roadmap with specific actions
                for your situation.
              </p>
            </div>
            <div data-testid="step-3" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-lg font-bold text-emerald-700">
                3
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Track Progress
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Log your actions and watch your credit score recover over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recovery Paths Preview */}
      <section
        id="recovery-paths"
        data-testid="recovery-paths-section"
        className="bg-white py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Recovery Paths
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              The right path depends on your loan type and situation
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div
              data-testid="path-ibr"
              className="rounded-xl border border-gray-200 p-6 hover:border-emerald-300 hover:shadow-md transition-all"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                Income-Based Repayment
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Lower your monthly payment based on income. Available for most
                federal loans.
              </p>
              <Link
                href="/guides/ibr-enrollment"
                data-testid="path-ibr-link"
                className="mt-4 inline-block text-sm font-medium text-emerald-600 hover:text-emerald-500"
              >
                Learn more &rarr;
              </Link>
            </div>
            <div
              data-testid="path-rehabilitation"
              className="rounded-xl border border-gray-200 p-6 hover:border-emerald-300 hover:shadow-md transition-all"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                Loan Rehabilitation
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Make 9 on-time payments to remove default from your credit
                report. One-time opportunity.
              </p>
              <Link
                href="/guides/loan-rehabilitation"
                data-testid="path-rehabilitation-link"
                className="mt-4 inline-block text-sm font-medium text-emerald-600 hover:text-emerald-500"
              >
                Learn more &rarr;
              </Link>
            </div>
            <div
              data-testid="path-consolidation"
              className="rounded-xl border border-gray-200 p-6 hover:border-emerald-300 hover:shadow-md transition-all"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                Consolidation
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Combine multiple loans into one with a new repayment plan.
                Brings loans current immediately.
              </p>
              <Link
                href="/guides/loan-consolidation"
                data-testid="path-consolidation-link"
                className="mt-4 inline-block text-sm font-medium text-emerald-600 hover:text-emerald-500"
              >
                Learn more &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        data-testid="faq-section"
        className="bg-gray-50 py-24"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Answers to common questions about student loan credit score recovery
            </p>
          </div>
          <div className="mt-12 divide-y divide-gray-200">
            {landingFAQs.map((faq, index) => (
              <div
                key={index}
                data-testid={`faq-item-${index}`}
                className="py-6"
              >
                <h3
                  data-testid={`faq-question-${index}`}
                  className="text-lg font-semibold text-gray-900"
                >
                  {faq.question}
                </h3>
                <p
                  data-testid={`faq-answer-${index}`}
                  className="mt-3 text-gray-600 leading-7"
                >
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/faq"
              data-testid="faq-view-all"
              className="text-base font-semibold text-emerald-600 hover:text-emerald-500"
            >
              View all FAQs &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section
        id="quiz"
        data-testid="cta-section"
        className="bg-white py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Start Your Free Recovery Plan
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Answer 5 quick questions and get a personalized, step-by-step plan.
              No signup required.
            </p>
          </div>
          <QuizFunnel />
        </div>
      </section>
    </>
  );
}
