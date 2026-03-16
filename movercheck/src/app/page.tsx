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
          Is that moving company{" "}
          <span className="text-[var(--primary)]">legit?</span>
        </h1>
        <p
          data-testid="hero-subtitle"
          className="mt-6 text-lg sm:text-xl text-[var(--muted)] max-w-2xl mx-auto"
        >
          Instantly verify any mover with FMCSA data, trust scores, and scam
          detection. Protect yourself before you sign.
        </p>

        {/* Search Box */}
        <div data-testid="hero-search" className="mt-10 max-w-xl mx-auto">
          <form
            data-testid="search-form"
            className="flex gap-2"
            action="/search"
            method="GET"
          >
            <input
              type="text"
              name="q"
              data-testid="search-input"
              placeholder="Enter company name or USDOT number..."
              className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
            />
            <button
              type="submit"
              data-testid="search-button"
              className="rounded-lg bg-[var(--primary)] px-6 py-3 font-medium text-white hover:bg-[var(--primary-hover)] transition-colors"
            >
              Check
            </button>
          </form>
        </div>
      </section>

      {/* Stats Section */}
      <section
        data-testid="stats-section"
        className="bg-[var(--secondary)] py-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div data-testid="stat-companies">
              <p className="text-3xl font-bold text-[var(--primary)]">0</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Companies Verified
              </p>
            </div>
            <div data-testid="stat-reports">
              <p className="text-3xl font-bold text-[var(--primary)]">0</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Reports Generated
              </p>
            </div>
            <div data-testid="stat-scams">
              <p className="text-3xl font-bold text-[var(--destructive)]">0</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Scams Flagged
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
            <div data-testid="step-search" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">
                1
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">
                Search the Company
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Enter the moving company name or USDOT number to start a
                background check.
              </p>
            </div>
            <div data-testid="step-verify" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">
                2
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">
                Get the Trust Score
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                See a red/yellow/green trust score based on FMCSA data, reviews,
                and complaint history.
              </p>
            </div>
            <div data-testid="step-protect" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">
                3
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">
                Protect Yourself
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Download a binding estimate template and full report to protect
                against price gouging.
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
            Don&apos;t Get Scammed by Movers
          </h2>
          <p className="mt-4 text-lg text-[var(--muted)] max-w-2xl mx-auto">
            Moving scams cost Americans millions each year. Check any moving
            company before you hire them — it only takes seconds.
          </p>
          <Link
            href="/search"
            data-testid="cta-search-button"
            className="mt-8 inline-block rounded-lg bg-[var(--primary)] px-8 py-3 font-medium text-white hover:bg-[var(--primary-hover)] transition-colors"
          >
            Check a Mover Now
          </Link>
        </div>
      </section>
    </div>
  );
}
