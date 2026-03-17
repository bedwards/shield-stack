import Link from "next/link";

export default function QuizCTA() {
  return (
    <section
      data-testid="guide-quiz-cta"
      className="my-16 rounded-2xl bg-emerald-50 border border-emerald-200 px-6 py-12 text-center"
    >
      <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
        Get Your Personalized Recovery Plan
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-lg text-gray-600">
        Take our free 2-minute quiz to get a step-by-step recovery plan
        tailored to your specific loan type, servicer, and situation.
      </p>
      <Link
        href="/#quiz"
        data-testid="guide-quiz-cta-button"
        className="mt-8 inline-block rounded-lg bg-emerald-600 px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
      >
        Start My Free Recovery Plan
      </Link>
    </section>
  );
}
