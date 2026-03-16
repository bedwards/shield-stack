import Link from "next/link";

export default function Home() {
  return (
    <section
      data-testid="hero-section"
      className="flex flex-col items-center justify-center px-4 py-20 text-center"
    >
      <h1
        data-testid="hero-heading"
        className="mb-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
      >
        Will a raise{" "}
        <span className="text-red-600 dark:text-red-400">cost you</span> more
        than it pays?
      </h1>
      <p
        data-testid="hero-subheading"
        className="mb-10 max-w-2xl text-lg text-gray-600 dark:text-gray-400 sm:text-xl"
      >
        See how your SNAP, Medicaid, EITC, childcare subsidies, and other
        benefits change as your income rises. The first calculator that shows the{" "}
        <strong>combined cliff</strong> across all programs at once.
      </p>
      <Link
        href="/calculator"
        data-testid="hero-cta"
        className="rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Check Your Benefits Cliff
      </Link>
      <p
        data-testid="hero-disclaimer"
        className="mt-6 text-sm text-gray-500 dark:text-gray-500"
      >
        Free. No sign-up required. Works for all 50 states.
      </p>

      <div
        data-testid="features-section"
        className="mt-20 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        <FeatureCard
          testId="feature-multi-program"
          title="All Programs, One View"
          description="SNAP, Medicaid, EITC, childcare, housing, TANF, LIHEAP, WIC, ACA subsidies — see the combined cliff, not just one program."
        />
        <FeatureCard
          testId="feature-state-specific"
          title="State-Specific Rules"
          description="Accurate thresholds for your state. Benefits rules vary dramatically — we track every state's specifics."
        />
        <FeatureCard
          testId="feature-what-if"
          title="What-If Scenarios"
          description="Slide your income up or down and watch benefits change in real time. Find the safe zones and the danger zones."
        />
      </div>
    </section>
  );
}

function FeatureCard({
  testId,
  title,
  description,
}: {
  testId: string;
  title: string;
  description: string;
}) {
  return (
    <div
      data-testid={testId}
      className="rounded-xl border border-gray-200 p-6 text-left dark:border-gray-800"
    >
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}
