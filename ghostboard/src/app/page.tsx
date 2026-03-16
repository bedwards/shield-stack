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
          Does that company{" "}
          <span className="text-[var(--primary)]">ghost applicants?</span>
        </h1>
        <p
          data-testid="hero-subtitle"
          className="mt-6 text-lg sm:text-xl text-[var(--muted)] max-w-2xl mx-auto"
        >
          Search any employer and see their ghosting rate before you apply.
          Real data from real job seekers.
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
              placeholder="Search company name..."
              className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
            />
            <button
              type="submit"
              data-testid="search-button"
              className="rounded-lg bg-[var(--primary)] px-6 py-3 font-medium text-white hover:bg-[var(--primary-hover)] transition-colors"
            >
              Search
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
                Companies Tracked
              </p>
            </div>
            <div data-testid="stat-reports">
              <p className="text-3xl font-bold text-[var(--primary)]">0</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Reports Submitted
              </p>
            </div>
            <div data-testid="stat-ghosting-rate">
              <p className="text-3xl font-bold text-[var(--accent)]">--</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Avg Ghosting Rate
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
                Search a Company
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Look up any employer to see their ghosting rate and response
                time stats.
              </p>
            </div>
            <div data-testid="step-report" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">
                2
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">
                Report Your Experience
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Share whether you heard back, got an interview, or were ghosted
                after applying.
              </p>
            </div>
            <div data-testid="step-decide" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">
                3
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">
                Make Better Decisions
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Apply with confidence knowing which companies actually respond
                to candidates.
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
            Help Build Hiring Transparency
          </h2>
          <p className="mt-4 text-lg text-[var(--muted)] max-w-2xl mx-auto">
            Every report makes the job market more transparent. Share your
            application experiences and help fellow job seekers avoid companies
            that ghost.
          </p>
          <Link
            href="/report"
            data-testid="cta-report-button"
            className="mt-8 inline-block rounded-lg bg-[var(--primary)] px-8 py-3 font-medium text-white hover:bg-[var(--primary-hover)] transition-colors"
          >
            Submit a Report
          </Link>
        </div>
      </section>
    </div>
  );
}
