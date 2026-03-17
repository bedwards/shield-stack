import type { Metadata } from "next";
import QuizFunnel from "@/components/QuizFunnel";

export const metadata: Metadata = {
  title:
    "Credit Score Recovery Quiz — ScoreRebound",
  description:
    "Take a free 2-minute quiz to get your personalized student loan credit score recovery plan. Find out if IBR, rehabilitation, or consolidation is right for you.",
  openGraph: {
    title: "Credit Score Recovery Quiz — ScoreRebound",
    description:
      "Take a free 2-minute quiz to get your personalized student loan credit score recovery plan.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Credit Score Recovery Quiz — ScoreRebound",
    description:
      "Free 2-minute quiz for a personalized student loan credit score recovery plan.",
  },
};

export default function QuizPage() {
  return (
    <div
      data-testid="quiz-page"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
    >
      <div className="mx-auto max-w-2xl text-center mb-12">
        <h1
          data-testid="quiz-page-title"
          className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
        >
          Student Loan Credit Score Recovery Quiz
        </h1>
        <p
          data-testid="quiz-page-description"
          className="mt-4 text-lg text-gray-600"
        >
          Answer 5 quick questions about your situation and get a personalized,
          step-by-step plan to recover your credit score. No signup required.
        </p>
      </div>
      <QuizFunnel />
    </div>
  );
}
