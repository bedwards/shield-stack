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
          Errors on your{" "}
          <span className="text-[var(--primary)]">background check</span>?
        </h1>
        <p
          data-testid="hero-subtitle"
          className="mt-6 text-lg sm:text-xl text-[var(--muted)] max-w-2xl mx-auto"
        >
          ClearFile helps you discover, dispute, and correct errors in your
          background check reports. Generate FCRA-compliant letters and track
          every dispute across all major reporting agencies.
        </p>

        {/* CTA Buttons */}
        <div data-testid="hero-cta" className="mt-10 flex justify-center gap-4">
          <Link
            href="/start"
            data-testid="cta-start-review"
            className="rounded-lg bg-[var(--primary)] px-8 py-3 font-medium text-white hover:bg-[var(--primary-hover)] transition-colors"
          >
            Start Your Review
          </Link>
          <Link
            href="/rights"
            data-testid="cta-learn-rights"
            className="rounded-lg border border-[var(--border)] px-8 py-3 font-medium text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors"
          >
            Know Your Rights
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
            <div data-testid="stat-errors-found">
              <p className="text-3xl font-bold text-[var(--error-flag)]">1 in 4</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Background checks contain errors
              </p>
            </div>
            <div data-testid="stat-disputes-filed">
              <p className="text-3xl font-bold text-[var(--primary)]">30 days</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                CRAs must respond to disputes under FCRA
              </p>
            </div>
            <div data-testid="stat-companies-covered">
              <p className="text-3xl font-bold text-[var(--success)]">40+</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Background check companies covered
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
            <div data-testid="step-request" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">
                1
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">
                Request Your Reports
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                We generate FCRA disclosure request letters for all major
                background check companies. You have a legal right to see your
                file.
              </p>
            </div>
            <div data-testid="step-flag" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">
                2
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">
                Flag Errors
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Upload your reports and flag any inaccurate information — wrong
                records, mixed files, outdated entries, or incorrect details.
              </p>
            </div>
            <div data-testid="step-dispute" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">
                3
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">
                Dispute &amp; Track
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                We generate legally compliant dispute letters for each error and
                each company. Track every deadline and response in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        data-testid="features-section"
        className="bg-[var(--secondary)] py-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[var(--foreground)]">
            Everything You Need to Clear Your Record
          </h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div data-testid="feature-letters" className="rounded-lg bg-[var(--background)] p-6 border border-[var(--border)]">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                FCRA Letter Generator
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Automatically generate legally compliant disclosure requests and
                dispute letters tailored to each company and error type.
              </p>
            </div>
            <div data-testid="feature-directory" className="rounded-lg bg-[var(--background)] p-6 border border-[var(--border)]">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                CRA Directory
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Comprehensive database of 40+ background check companies with
                contact info, mailing addresses, and submission methods.
              </p>
            </div>
            <div data-testid="feature-tracker" className="rounded-lg bg-[var(--background)] p-6 border border-[var(--border)]">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                Dispute Tracker
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Track the status of every request and dispute across all
                companies. Never miss a 30-day FCRA deadline.
              </p>
            </div>
            <div data-testid="feature-upload" className="rounded-lg bg-[var(--background)] p-6 border border-[var(--border)]">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                Report Upload &amp; Parsing
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Upload your background check reports and we extract key data
                points for easy comparison and error flagging.
              </p>
            </div>
            <div data-testid="feature-monitoring" className="rounded-lg bg-[var(--background)] p-6 border border-[var(--border)]">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                Ongoing Monitoring
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Periodic re-checks to verify corrections were made and no new
                errors have appeared on your records.
              </p>
            </div>
            <div data-testid="feature-encryption" className="rounded-lg bg-[var(--background)] p-6 border border-[var(--border)]">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                Bank-Level Security
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Your sensitive information is encrypted at rest with field-level
                encryption. SSN is never stored in plaintext.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        data-testid="cta-section"
        className="py-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[var(--foreground)]">
            Don&apos;t Let Background Check Errors Cost You
          </h2>
          <p className="mt-4 text-lg text-[var(--muted)] max-w-2xl mx-auto">
            Errors on your background check can cost you a job, an apartment, or
            a loan. Under FCRA, you have the right to dispute inaccurate
            information. ClearFile makes it easy.
          </p>
          <Link
            href="/start"
            data-testid="cta-start-button"
            className="mt-8 inline-block rounded-lg bg-[var(--primary)] px-8 py-3 font-medium text-white hover:bg-[var(--primary-hover)] transition-colors"
          >
            Start Your Free Review
          </Link>
        </div>
      </section>
    </div>
  );
}
