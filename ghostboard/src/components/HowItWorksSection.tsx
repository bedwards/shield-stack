const steps = [
  {
    number: 1,
    title: "Search a Company",
    description:
      "Look up any employer to see their ghosting rate and response time stats.",
    testId: "step-search",
  },
  {
    number: 2,
    title: "Report Your Experience",
    description:
      "Share whether you heard back, got an interview, or were ghosted after applying.",
    testId: "step-report",
  },
  {
    number: 3,
    title: "Make Better Decisions",
    description:
      "Apply with confidence knowing which companies actually respond to candidates.",
    testId: "step-decide",
  },
];

export function HowItWorksSection() {
  return (
    <section data-testid="how-it-works-section" className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-foreground">
          How It Works
        </h2>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.testId} data-testid={step.testId} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white font-bold">
                {step.number}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
