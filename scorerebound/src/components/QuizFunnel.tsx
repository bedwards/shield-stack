"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { LoanType, DelinquencyStatus, ScoreRange } from "@/lib/database.types";
import {
  LOAN_TYPE_OPTIONS,
  DELINQUENCY_OPTIONS,
  SCORE_RANGE_OPTIONS,
  GOAL_OPTIONS,
} from "@/lib/plan-generator";
import { getServicerOptions } from "@/lib/servicer-data";

const SERVICER_OPTIONS = getServicerOptions();

const STEPS = [
  { key: "loan_type", title: "What type of student loans do you have?", subtitle: "This determines which federal programs are available to you." },
  { key: "servicer", title: "Who is your loan servicer?", subtitle: "Your servicer manages your loan payments. Check studentaid.gov if unsure." },
  { key: "delinquency_status", title: "What is your current payment status?", subtitle: "Be honest — this helps us recommend the right recovery path." },
  { key: "current_score_range", title: "What is your current credit score range?", subtitle: "An estimate is fine. Check Credit Karma or your bank app for free." },
  { key: "goals", title: "What are your recovery goals?", subtitle: "Select all that apply. We'll prioritize your plan accordingly." },
] as const;

interface QuizState {
  loan_type: LoanType | null;
  servicer: string | null;
  delinquency_status: DelinquencyStatus | null;
  current_score_range: ScoreRange | null;
  goals: string[];
}

export default function QuizFunnel() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [quiz, setQuiz] = useState<QuizState>({
    loan_type: null,
    servicer: null,
    delinquency_status: null,
    current_score_range: null,
    goals: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canAdvance = useCallback((): boolean => {
    switch (step) {
      case 0: return quiz.loan_type !== null;
      case 1: return quiz.servicer !== null;
      case 2: return quiz.delinquency_status !== null;
      case 3: return quiz.current_score_range !== null;
      case 4: return quiz.goals.length > 0;
      default: return false;
    }
  }, [step, quiz]);

  const handleNext = useCallback(() => {
    if (step < STEPS.length - 1 && canAdvance()) {
      setStep((s) => s + 1);
    }
  }, [step, canAdvance]);

  const handleBack = useCallback(() => {
    if (step > 0) {
      setStep((s) => s - 1);
      setError(null);
    }
  }, [step]);

  const handleSubmit = useCallback(async () => {
    if (!canAdvance() || isSubmitting) return;
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          loan_type: quiz.loan_type,
          servicer: quiz.servicer,
          delinquency_status: quiz.delinquency_status,
          current_score_range: quiz.current_score_range,
          goals: quiz.goals,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({ error: "Server error" }));
        throw new Error(body.error ?? `Server returned ${res.status}`);
      }

      const data = await res.json();

      if (data.plan_id) {
        // Store scoreRange in sessionStorage so the plan page can use it for affiliate matching
        sessionStorage.setItem(`score-${data.plan_id}`, quiz.current_score_range!);
        router.push(`/plan/${data.plan_id}`);
      } else {
        // No DB — store plan + scoreRange in sessionStorage and navigate with a local ID
        const localId = `local-${Date.now()}`;
        sessionStorage.setItem(
          `plan-${localId}`,
          JSON.stringify({ plan: data.plan, scoreRange: quiz.current_score_range }),
        );
        router.push(`/plan/${localId}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [quiz, canAdvance, isSubmitting, router]);

  const toggleGoal = useCallback((goal: string) => {
    setQuiz((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter((g) => g !== goal)
        : [...prev.goals, goal],
    }));
  }, []);

  const currentStep = STEPS[step]!;
  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <div data-testid="quiz-funnel" className="mx-auto max-w-2xl">
      {/* Progress bar */}
      <div data-testid="quiz-progress" className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">
            Step {step + 1} of {STEPS.length}
          </span>
          <span className="text-sm font-medium text-emerald-600">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
          <div
            data-testid="quiz-progress-bar"
            className="h-full rounded-full bg-emerald-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step content */}
      <div
        data-testid={`quiz-step-${step}`}
        className="transition-opacity duration-300"
      >
        <h2
          data-testid="quiz-step-title"
          className="text-2xl font-bold text-gray-900 mb-2"
        >
          {currentStep.title}
        </h2>
        <p
          data-testid="quiz-step-subtitle"
          className="text-gray-600 mb-8"
        >
          {currentStep.subtitle}
        </p>

        {/* Step 0: Loan Type */}
        {step === 0 && (
          <div className="grid gap-3" data-testid="quiz-loan-type-options">
            {LOAN_TYPE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                data-testid={`quiz-loan-type-${opt.value}`}
                onClick={() => setQuiz((prev) => ({ ...prev, loan_type: opt.value }))}
                className={`w-full rounded-lg border-2 px-4 py-3 text-left text-base font-medium transition-all ${
                  quiz.loan_type === opt.value
                    ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                    : "border-gray-200 bg-white text-gray-700 hover:border-emerald-300 hover:bg-emerald-50/50"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}

        {/* Step 1: Servicer */}
        {step === 1 && (
          <div className="grid gap-3" data-testid="quiz-servicer-options">
            {SERVICER_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                data-testid={`quiz-servicer-${opt.value}`}
                onClick={() => setQuiz((prev) => ({ ...prev, servicer: opt.value }))}
                className={`w-full rounded-lg border-2 px-4 py-3 text-left text-base font-medium transition-all ${
                  quiz.servicer === opt.value
                    ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                    : "border-gray-200 bg-white text-gray-700 hover:border-emerald-300 hover:bg-emerald-50/50"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}

        {/* Step 2: Delinquency Status */}
        {step === 2 && (
          <div className="grid gap-3" data-testid="quiz-delinquency-options">
            {DELINQUENCY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                data-testid={`quiz-delinquency-${opt.value}`}
                onClick={() => setQuiz((prev) => ({ ...prev, delinquency_status: opt.value }))}
                className={`w-full rounded-lg border-2 px-4 py-3 text-left text-base font-medium transition-all ${
                  quiz.delinquency_status === opt.value
                    ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                    : "border-gray-200 bg-white text-gray-700 hover:border-emerald-300 hover:bg-emerald-50/50"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}

        {/* Step 3: Score Range */}
        {step === 3 && (
          <div className="grid gap-3" data-testid="quiz-score-range-options">
            {SCORE_RANGE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                data-testid={`quiz-score-range-${opt.value}`}
                onClick={() => setQuiz((prev) => ({ ...prev, current_score_range: opt.value }))}
                className={`w-full rounded-lg border-2 px-4 py-3 text-left text-base font-medium transition-all ${
                  quiz.current_score_range === opt.value
                    ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                    : "border-gray-200 bg-white text-gray-700 hover:border-emerald-300 hover:bg-emerald-50/50"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}

        {/* Step 4: Goals (multi-select) */}
        {step === 4 && (
          <div className="grid gap-3" data-testid="quiz-goals-options">
            {GOAL_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                data-testid={`quiz-goal-${opt.value}`}
                onClick={() => toggleGoal(opt.value)}
                className={`w-full rounded-lg border-2 px-4 py-3 text-left text-base font-medium transition-all ${
                  quiz.goals.includes(opt.value)
                    ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                    : "border-gray-200 bg-white text-gray-700 hover:border-emerald-300 hover:bg-emerald-50/50"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors ${
                      quiz.goals.includes(opt.value)
                        ? "border-emerald-600 bg-emerald-600"
                        : "border-gray-300"
                    }`}
                  >
                    {quiz.goals.includes(opt.value) && (
                      <svg className="h-3 w-3 text-white" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  {opt.label}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <div data-testid="quiz-error" className="mt-4 rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Navigation buttons */}
      <div className="mt-8 flex items-center justify-between">
        <button
          data-testid="quiz-back"
          onClick={handleBack}
          disabled={step === 0}
          className={`rounded-lg px-5 py-2.5 text-sm font-medium transition-all ${
            step === 0
              ? "invisible"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          }`}
        >
          Back
        </button>

        {step < STEPS.length - 1 ? (
          <button
            data-testid="quiz-next"
            onClick={handleNext}
            disabled={!canAdvance()}
            className={`rounded-lg px-6 py-2.5 text-sm font-semibold transition-all ${
              canAdvance()
                ? "bg-emerald-600 text-white shadow-sm hover:bg-emerald-500"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Next
          </button>
        ) : (
          <button
            data-testid="quiz-submit"
            onClick={handleSubmit}
            disabled={!canAdvance() || isSubmitting}
            className={`rounded-lg px-6 py-2.5 text-sm font-semibold transition-all ${
              canAdvance() && !isSubmitting
                ? "bg-emerald-600 text-white shadow-sm hover:bg-emerald-500"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Generating Plan...
              </span>
            ) : (
              "Get My Recovery Plan"
            )}
          </button>
        )}
      </div>
    </div>
  );
}
