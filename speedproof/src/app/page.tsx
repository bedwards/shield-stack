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
          Is your ISP{" "}
          <span className="text-[var(--primary)]">delivering what you pay for?</span>
        </h1>
        <p
          data-testid="hero-subtitle"
          className="mt-6 text-lg sm:text-xl text-[var(--muted)] max-w-2xl mx-auto"
        >
          Run automated speed tests, build a legally defensible record, and hold
          your internet provider accountable with FCC complaints and credit
          request letters.
        </p>

        {/* CTA Buttons */}
        <div data-testid="hero-cta" className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/test"
            data-testid="cta-test-button"
            className="rounded-lg bg-[var(--primary)] px-8 py-3 font-medium text-white hover:bg-[var(--primary-hover)] transition-colors"
          >
            Run Speed Test
          </Link>
          <Link
            href="/dashboard"
            data-testid="cta-dashboard-button"
            className="rounded-lg border border-[var(--border)] px-8 py-3 font-medium text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors"
          >
            View Dashboard
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
            <div data-testid="stat-tests">
              <p className="text-3xl font-bold text-[var(--primary)]">0</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Speed Tests Run
              </p>
            </div>
            <div data-testid="stat-isps">
              <p className="text-3xl font-bold text-[var(--primary)]">0</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                ISPs Tracked
              </p>
            </div>
            <div data-testid="stat-complaints">
              <p className="text-3xl font-bold text-[var(--accent)]">--</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Complaints Filed
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
            <div data-testid="step-test" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">
                1
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">
                Test Your Speed
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Run one-click speed tests or enable automatic hourly testing to
                build a comprehensive record.
              </p>
            </div>
            <div data-testid="step-track" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">
                2
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">
                Track the Evidence
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                See your actual speeds vs. what your ISP advertises with
                detailed charts and daily averages.
              </p>
            </div>
            <div data-testid="step-act" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">
                3
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">
                Take Action
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Generate a 30-day report, file an FCC complaint, or send your
                ISP a credit request letter.
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
            Everything You Need to Hold ISPs Accountable
          </h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div data-testid="feature-speed-test" className="rounded-lg bg-[var(--background)] p-6 border border-[var(--border)]">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                Browser-Based Speed Test
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Accurate download, upload, latency, and jitter measurements
                using Cloudflare edge servers.
              </p>
            </div>
            <div data-testid="feature-auto-test" className="rounded-lg bg-[var(--background)] p-6 border border-[var(--border)]">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                Automatic Hourly Testing
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Background Service Worker runs speed tests every hour so you
                never miss a slowdown.
              </p>
            </div>
            <div data-testid="feature-dashboard" className="rounded-lg bg-[var(--background)] p-6 border border-[var(--border)]">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                Historical Dashboard
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Charts showing your speed over time vs. advertised speed, with
                daily, weekly, and monthly views.
              </p>
            </div>
            <div data-testid="feature-report" className="rounded-lg bg-[var(--background)] p-6 border border-[var(--border)]">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                30-Day Accountability Report
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Professional PDF report with evidence of underperformance,
                ready to attach to complaints.
              </p>
            </div>
            <div data-testid="feature-fcc" className="rounded-lg bg-[var(--background)] p-6 border border-[var(--border)]">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                FCC Complaint Generator
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Pre-filled FCC complaint form data based on your collected
                speed test evidence.
              </p>
            </div>
            <div data-testid="feature-credit" className="rounded-lg bg-[var(--background)] p-6 border border-[var(--border)]">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                ISP Credit Request Letter
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Professional letter requesting a billing credit for
                underperformance, backed by data.
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
            Stop Paying for Speed You&apos;re Not Getting
          </h2>
          <p className="mt-4 text-lg text-[var(--muted)] max-w-2xl mx-auto">
            Start building your speed test record today. Free manual tests with
            7 days of history. Upgrade to Pro for automatic hourly testing,
            unlimited history, and accountability tools.
          </p>
          <Link
            href="/test"
            data-testid="cta-start-button"
            className="mt-8 inline-block rounded-lg bg-[var(--primary)] px-8 py-3 font-medium text-white hover:bg-[var(--primary-hover)] transition-colors"
          >
            Run Your First Speed Test
          </Link>
        </div>
      </section>
    </div>
  );
}
