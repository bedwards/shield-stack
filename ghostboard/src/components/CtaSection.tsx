import Link from "next/link";

export function CtaSection() {
  return (
    <section data-testid="cta-section" className="bg-secondary py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-foreground">
          Help Build Hiring Transparency
        </h2>
        <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
          Every report makes the job market more transparent. Share your
          application experiences and help fellow job seekers avoid companies
          that ghost.
        </p>
        <Link
          href="/report"
          data-testid="cta-report-button"
          className="mt-8 inline-block rounded-lg bg-primary px-8 py-3 font-medium text-white hover:bg-primary-hover transition-colors"
        >
          Submit a Report
        </Link>
      </div>
    </section>
  );
}
