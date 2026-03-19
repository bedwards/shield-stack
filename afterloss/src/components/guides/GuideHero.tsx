import Link from "next/link";

export default function GuideHero() {
  return (
    <div data-testid="guide-hero">
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

      <header data-testid="guide-header" className="mb-10">
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
          A gentle, step-by-step guide to everything that needs to happen — from
          the first 24 hours through the first year. Take your time. There is no
          wrong order.
        </p>
        <p data-testid="last-verified" className="mt-2 text-sm text-muted">
          Last verified: March 2026
        </p>
      </header>

      <div
        data-testid="stat-callout"
        className="mb-10 rounded-lg bg-secondary border border-border p-6"
      >
        <p className="text-lg text-foreground">
          When someone you love dies, you&apos;re handed a mountain of paperwork
          while navigating the worst time of your life. There are{" "}
          <strong>over 75 individual tasks</strong> to complete — from ordering
          death certificates to filing tax returns — spread across government
          agencies, financial institutions, and service providers.
        </p>
        <p className="mt-3 text-sm text-muted">
          This guide breaks it all down into a clear timeline so you know what
          to do first, what can wait, and what you might not know about.
          Everything here is <strong>free</strong>.
        </p>
      </div>
    </div>
  );
}
