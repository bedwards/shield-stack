import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Benefits Cliff Calculator — CliffCheck",
  description:
    "Enter your income, household size, and state to see how all your government benefits change together. Free benefits cliff calculator.",
};

export default function CalculatorPage() {
  return (
    <section
      data-testid="calculator-page"
      className="mx-auto max-w-5xl px-4 py-12"
    >
      <h1
        data-testid="calculator-heading"
        className="mb-4 text-3xl font-bold"
      >
        Benefits Cliff Calculator
      </h1>
      <p
        data-testid="calculator-description"
        className="mb-8 text-gray-600 dark:text-gray-400"
      >
        Enter your details below to see how your total benefits change as income
        rises. The chart will show the combined cliff across all programs.
      </p>
      <div
        data-testid="calculator-placeholder"
        className="flex min-h-[400px] items-center justify-center rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700"
      >
        <p className="text-gray-500 dark:text-gray-500">
          Interactive calculator coming soon — calculation engine in development.
        </p>
      </div>
    </section>
  );
}
