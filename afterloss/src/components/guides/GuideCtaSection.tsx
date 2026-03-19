import Link from "next/link";

export default function GuideCtaSection() {
  return (
    <section
      data-testid="guide-cta-section"
      className="mt-16 rounded-lg bg-secondary p-8 text-center"
    >
      <h2
        data-testid="guide-cta-heading"
        className="text-2xl font-bold text-foreground"
      >
        You don&apos;t have to figure this out alone
      </h2>
      <p className="mt-3 text-muted max-w-xl mx-auto">
        This guide covers the essentials, but every situation is different.
        AfterLoss creates a personalized, state-specific checklist based on your
        situation — with AI-generated letters, deadline tracking, and
        step-by-step guidance. Completely free, no account required.
      </p>
      <Link
        href="/onboard"
        data-testid="guide-cta-button"
        className="mt-6 inline-block rounded-lg bg-primary px-8 py-3 font-medium text-white hover:bg-primary-hover transition-colors"
      >
        Get Your Personalized Checklist — Free
      </Link>
    </section>
  );
}
