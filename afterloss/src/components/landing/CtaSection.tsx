import Link from "next/link";

export default function CtaSection() {
  return (
    <section data-testid="cta-section" className="bg-primary-light py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2
          data-testid="cta-heading"
          className="text-3xl font-bold text-foreground"
        >
          You don&apos;t have to figure this out alone
        </h2>
        <p className="mt-4 text-lg text-muted max-w-2xl mx-auto leading-relaxed">
          Losing someone is hard enough. Let us handle the paperwork so you can
          focus on your family.
        </p>
        <Link
          href="/onboard"
          data-testid="cta-bottom-button"
          className="mt-8 inline-block rounded-lg bg-primary px-8 py-4 text-lg font-medium text-white hover:bg-primary-hover transition-colors shadow-sm"
        >
          Start Your Checklist &mdash; Free Forever
        </Link>
        <p className="mt-4 text-sm text-muted">
          No account required. Takes about 2 minutes to get started.
        </p>
      </div>
    </section>
  );
}
