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
          Document habitability issues.{" "}
          <span className="text-[var(--primary)]">
            Demand repairs with the law on your side.
          </span>
        </h1>
        <p
          data-testid="hero-subtitle"
          className="mt-6 text-lg sm:text-xl text-[var(--muted)] max-w-2xl mx-auto"
        >
          Upload timestamped photos of mold, broken heating, pests, or water
          damage. TenantShield generates state-specific legal demand letters and
          tracks your landlord&apos;s response deadline.
        </p>

        {/* CTA Buttons */}
        <div data-testid="hero-cta" className="mt-10 flex justify-center gap-4">
          <Link
            href="/document"
            data-testid="cta-document-button"
            className="rounded-lg bg-[var(--primary)] px-8 py-3 font-medium text-white hover:bg-[var(--primary-hover)] transition-colors"
          >
            Document an Issue
          </Link>
          <Link
            href="/states"
            data-testid="cta-states-button"
            className="rounded-lg border border-[var(--border)] px-8 py-3 font-medium text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors"
          >
            Check Your State Laws
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
            <div data-testid="stat-renters">
              <p className="text-3xl font-bold text-[var(--primary)]">44M+</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                U.S. Renter Households
              </p>
            </div>
            <div data-testid="stat-complaints">
              <p className="text-3xl font-bold text-[var(--accent)]">50%+</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Report Maintenance Issues
              </p>
            </div>
            <div data-testid="stat-letters">
              <p className="text-3xl font-bold text-[var(--success)]">--</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Demand Letters Generated
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
            <div data-testid="step-document" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">
                1
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">
                Document the Problem
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Upload photos with automatic EXIF extraction for timestamps and
                GPS coordinates. Build an evidence trail your landlord
                can&apos;t dispute.
              </p>
            </div>
            <div data-testid="step-generate" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">
                2
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">
                Generate Legal Letter
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                AI generates a state-specific demand letter citing your
                state&apos;s habitability statutes, notice requirements, and
                tenant remedies.
              </p>
            </div>
            <div data-testid="step-track" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">
                3
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">
                Track &amp; Escalate
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Track your landlord&apos;s response deadline. If they miss it,
                get guided next steps: code enforcement, rent withholding, or
                lease termination.
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
            Your Landlord Has Obligations. Hold Them Accountable.
          </h2>
          <p className="mt-4 text-lg text-[var(--muted)] max-w-2xl mx-auto">
            Every state requires landlords to maintain habitable conditions.
            Document the problem, send the letter, track the deadline. Start
            free.
          </p>
          <Link
            href="/document"
            data-testid="cta-bottom-button"
            className="mt-8 inline-block rounded-lg bg-[var(--primary)] px-8 py-3 font-medium text-white hover:bg-[var(--primary-hover)] transition-colors"
          >
            Document Your First Issue Free
          </Link>
        </div>
      </section>
    </div>
  );
}
