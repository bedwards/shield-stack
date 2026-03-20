import type { Metadata } from "next";
import QuizFunnel from "@/components/QuizFunnel";

export const metadata: Metadata = {
  title:
    "Student Loan Credit Score Recovery Quiz — Free Personalized Plan | ScoreRebound",
  description:
    "Take our free 2-minute quiz to get a personalized credit score recovery plan. Answer 5 questions about your loan type, servicer, and situation to find the best path forward.",
  openGraph: {
    title: "Student Loan Credit Score Recovery Quiz — Get Your Free Plan",
    description:
      "Answer 5 quick questions and get a personalized, step-by-step plan to recover your credit score after student loan delinquency.",
    type: "website",
    siteName: "ScoreRebound",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function QuizPage() {
  return (
    <div data-testid="quiz-page" className="min-h-[80vh] bg-white py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1
            data-testid="quiz-page-title"
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
          >
            Your Credit Score Recovery Starts Here
          </h1>
          <p
            data-testid="quiz-page-description"
            className="mt-6 text-lg leading-8 text-gray-600"
          >
            Answer 5 quick questions about your student loans and get a
            personalized, step-by-step recovery plan. No signup required — your
            plan is generated instantly.
          </p>
        </div>

        <QuizFunnel />

        <div className="mt-12 rounded-xl border border-gray-200 bg-gray-50 p-6">
          <h2
            data-testid="quiz-page-trust"
            className="text-sm font-semibold text-gray-900"
          >
            Why trust ScoreRebound?
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li className="flex gap-2">
              <span className="text-emerald-600">&#10003;</span>
              <span>100% free — no hidden fees, no credit card required</span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-600">&#10003;</span>
              <span>Based on official federal student loan programs</span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-600">&#10003;</span>
              <span>No signup required to get your recovery plan</span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-600">&#10003;</span>
              <span>
                Personalized recommendations for your specific situation
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
