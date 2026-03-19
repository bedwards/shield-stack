import Link from "next/link";

export function GuideHero() {
  return (
    <header data-testid="guide-hero" className="mb-12">
      <nav
        data-testid="breadcrumb-nav"
        aria-label="Breadcrumb"
        className="mb-8 text-sm text-muted"
      >
        <ol className="flex items-center gap-2">
          <li>
            <Link
              href="/"
              data-testid="breadcrumb-home"
              className="hover:text-foreground transition-colors"
            >
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <span data-testid="breadcrumb-guides" className="text-foreground">
              Guides
            </span>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <span
              data-testid="breadcrumb-current"
              aria-current="page"
              className="text-foreground font-medium"
            >
              What to Do When Someone Dies
            </span>
          </li>
        </ol>
      </nav>

      <h1
        data-testid="guide-title"
        className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground"
      >
        What to Do When Someone Dies: The Complete 2026 Checklist
      </h1>
      <p
        data-testid="guide-subtitle"
        className="mt-4 text-lg text-muted max-w-2xl"
      >
        A gentle, step-by-step guide to help you through the paperwork, phone
        calls, and decisions — organized by timeline so you know exactly what to
        do and when.
      </p>
      <p data-testid="last-updated" className="mt-2 text-sm text-muted">
        Last updated: March 2026
      </p>

      <div
        data-testid="guide-intro-callout"
        className="mt-8 rounded-lg bg-secondary border border-border p-6"
      >
        <p className="text-foreground leading-relaxed">
          If you&apos;re reading this, you&apos;re probably dealing with one of
          the hardest moments of your life. We&apos;re sorry you&apos;re here.
          This guide breaks everything down into manageable steps — organized by
          when each task typically needs to happen. You don&apos;t have to do
          everything at once.{" "}
          <strong>Take your time, and come back whenever you&apos;re ready.</strong>
        </p>
        <p className="mt-3 text-sm text-muted">
          Every family&apos;s situation is different. Use this as a reference —
          not every step will apply to you, and the order can be flexible.
        </p>
      </div>
    </header>
  );
}
