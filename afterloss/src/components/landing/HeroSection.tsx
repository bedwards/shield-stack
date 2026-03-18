import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      data-testid="hero-section"
      className="mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 text-center"
    >
      <p
        data-testid="hero-eyebrow"
        className="text-sm font-medium tracking-wide text-accent uppercase"
      >
        Free. Compassionate. Step-by-step.
      </p>
      <h1
        data-testid="hero-heading"
        className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight"
      >
        We&apos;re sorry for your loss.
        <br />
        <span className="text-primary">Let us help with what comes next.</span>
      </h1>
      <p
        data-testid="hero-subtitle"
        className="mt-6 text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed"
      >
        A free, step-by-step guide personalized to your state. Checklists,
        document templates, deadline tracking, and everything you need to settle
        an estate &mdash; at your own pace.
      </p>
      <div data-testid="hero-cta" className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
        <Link
          href="/onboard"
          data-testid="cta-start-button"
          className="rounded-lg bg-primary px-8 py-4 text-lg font-medium text-white hover:bg-primary-hover transition-colors shadow-sm"
        >
          Start Your Checklist
        </Link>
        <Link
          href="/states"
          data-testid="cta-states-button"
          className="rounded-lg border border-border px-8 py-4 text-lg font-medium text-foreground hover:bg-secondary transition-colors"
        >
          Find Your State
        </Link>
      </div>
      <p
        data-testid="hero-reassurance"
        className="mt-6 text-sm text-muted"
      >
        No account required. Free forever. Take your time.
      </p>
    </section>
  );
}
