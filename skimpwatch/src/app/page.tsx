import Link from "next/link";

export default function Home() {
  return (
    <div data-testid="landing-page">
      {/* Hero Section */}
      <section
        data-testid="hero-section"
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 text-center"
      >
        <h1
          data-testid="hero-title"
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--foreground)]"
        >
          Did they change{" "}
          <span className="text-[var(--primary)]">the recipe?</span>
        </h1>
        <p
          data-testid="hero-subtitle"
          className="mt-6 text-lg sm:text-xl text-[var(--muted)] max-w-2xl mx-auto"
        >
          Scan any product barcode and instantly see if the ingredients, portion
          size, or formulation has changed. Crowdsourced evidence, AI-powered
          detection.
        </p>

        {/* CTA Buttons */}
        <div data-testid="hero-cta" className="mt-10 flex justify-center gap-4">
          <Link
            href="/scan"
            data-testid="cta-scan-button"
            className="rounded-lg bg-[var(--primary)] px-8 py-3 font-medium text-white hover:bg-[var(--primary-hover)] transition-colors"
          >
            Scan a Product
          </Link>
          <Link
            href="/brands"
            data-testid="cta-brands-button"
            className="rounded-lg border border-[var(--border)] px-8 py-3 font-medium text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors"
          >
            Browse Changes
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section
        data-testid="stats-section"
        className="bg-[var(--secondary)] py-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div data-testid="stat-products">
              <p className="text-3xl font-bold text-[var(--primary)]">0</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Products Tracked
              </p>
            </div>
            <div data-testid="stat-changes">
              <p className="text-3xl font-bold text-[var(--accent)]">0</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Changes Detected
              </p>
            </div>
            <div data-testid="stat-reports">
              <p className="text-3xl font-bold text-[var(--primary)]">0</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Community Reports
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section data-testid="how-it-works-section" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[var(--foreground)]">
            How It Works
          </h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div data-testid="step-scan" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">
                1
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">
                Scan the Barcode
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Use your phone camera to scan any product barcode in seconds.
              </p>
            </div>
            <div data-testid="step-compare" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">
                2
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">
                See the Changes
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                AI compares current ingredients against historical snapshots and
                highlights every change.
              </p>
            </div>
            <div data-testid="step-alert" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">
                3
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">
                Get Alerts
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Add products to your watchlist and get notified when ingredients
                change.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        data-testid="cta-section"
        className="bg-[var(--secondary)] py-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[var(--foreground)]">
            Hold Brands Accountable
          </h2>
          <p className="mt-4 text-lg text-[var(--muted)] max-w-2xl mx-auto">
            Companies quietly change recipes, shrink portions, and substitute
            cheap ingredients. SkimpWatch catches them with crowdsourced evidence.
          </p>
          <Link
            href="/scan"
            data-testid="cta-bottom-button"
            className="mt-8 inline-block rounded-lg bg-[var(--primary)] px-8 py-3 font-medium text-white hover:bg-[var(--primary-hover)] transition-colors"
          >
            Start Scanning
          </Link>
        </div>
      </section>
    </div>
  );
}
