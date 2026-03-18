const steps = [
  {
    id: "step-situation",
    number: "1",
    title: "Tell us your situation",
    description:
      "Answer a few gentle questions about your state, your relationship to the person who passed, and the estate. We personalize everything from there.",
  },
  {
    id: "step-checklist",
    number: "2",
    title: "Get your personalized checklist",
    description:
      "Receive a step-by-step list organized by timeline \u2014 what to do in the first 24 hours, first week, first month, and beyond. Each task has clear instructions.",
  },
  {
    id: "step-documents",
    number: "3",
    title: "We generate every document",
    description:
      "Need to notify a bank? Cancel a subscription? File with Social Security? We create personalized letters and forms ready to send.",
  },
];

export default function HowItWorksSection() {
  return (
    <section data-testid="how-it-works-section" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          data-testid="how-it-works-heading"
          className="text-3xl font-bold text-center text-foreground"
        >
          How AfterLoss helps
        </h2>
        <p className="mt-4 text-center text-muted max-w-2xl mx-auto">
          We guide you through every step, so you can focus on what matters
          most.
        </p>
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-10">
          {steps.map((step) => (
            <div key={step.id} data-testid={step.id} className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-light text-primary text-xl font-bold">
                {step.number}
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
