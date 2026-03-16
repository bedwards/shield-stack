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
          Why is my{" "}
          <span className="text-[var(--primary)]">electric bill</span> so high?
        </h1>
        <p
          data-testid="hero-subtitle"
          className="mt-6 text-lg sm:text-xl text-[var(--muted)] max-w-2xl mx-auto"
        >
          Upload your utility bills and instantly detect overcharges, anomalies,
          and hidden rate spikes. Track every dollar across electric, gas, and
          water.
        </p>

        {/* CTA Buttons */}
        <div data-testid="hero-cta" className="mt-10 flex justify-center gap-4">
          <Link
            href="/upload"
            data-testid="cta-upload-button"
            className="rounded-lg bg-[var(--primary)] px-8 py-3 font-medium text-white hover:bg-[var(--primary-hover)] transition-colors"
          >
            Upload Your First Bill
          </Link>
          <Link
            href="/demo"
            data-testid="cta-demo-button"
            className="rounded-lg border border-[var(--border)] px-8 py-3 font-medium text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors"
          >
            See a Demo
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
            <div data-testid="stat-bills-analyzed">
              <p className="text-3xl font-bold text-[var(--primary)]">0</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Bills Analyzed
              </p>
            </div>
            <div data-testid="stat-anomalies-found">
              <p className="text-3xl font-bold text-[var(--anomaly)]">0</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Anomalies Detected
              </p>
            </div>
            <div data-testid="stat-money-saved">
              <p className="text-3xl font-bold text-[var(--success)]">$0</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Potential Savings Found
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
            <div data-testid="step-upload" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">
                1
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">
                Upload Your Bill
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Snap a photo or upload a PDF of your utility bill. Our OCR
                extracts all the key data automatically.
              </p>
            </div>
            <div data-testid="step-analyze" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">
                2
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">
                Detect Anomalies
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                BillWatch compares your bill against your history and similar
                households to flag overcharges and rate spikes.
              </p>
            </div>
            <div data-testid="step-save" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">
                3
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">
                Save Money
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Get alerts before small billing errors compound. See trends,
                benchmark against neighbors, and find cheaper rates.
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
            Everything You Need
          </h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div data-testid="feature-ocr" className="rounded-lg bg-[var(--background)] p-6 border border-[var(--border)]">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                Smart OCR Extraction
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Automatically reads your bills and extracts amounts, usage, rates,
                and billing periods.
              </p>
            </div>
            <div data-testid="feature-trends" className="rounded-lg bg-[var(--background)] p-6 border border-[var(--border)]">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                Cost Trends
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Visualize your utility costs over months and years with
                interactive charts.
              </p>
            </div>
            <div data-testid="feature-anomalies" className="rounded-lg bg-[var(--background)] p-6 border border-[var(--border)]">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                Anomaly Alerts
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Get notified when a bill deviates significantly from your
                historical pattern.
              </p>
            </div>
            <div data-testid="feature-benchmark" className="rounded-lg bg-[var(--background)] p-6 border border-[var(--border)]">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                Household Benchmarking
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Compare your usage against similar homes in your area to see
                where you stand.
              </p>
            </div>
            <div data-testid="feature-multi-utility" className="rounded-lg bg-[var(--background)] p-6 border border-[var(--border)]">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                All Utilities
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Track electric, gas, water, and sewer bills all in one place.
              </p>
            </div>
            <div data-testid="feature-export" className="rounded-lg bg-[var(--background)] p-6 border border-[var(--border)]">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                CSV Export
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Export your complete bill history for tax records, disputes, or
                budgeting.
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
            Stop Overpaying for Utilities
          </h2>
          <p className="mt-4 text-lg text-[var(--muted)] max-w-2xl mx-auto">
            Most households overpay by $200-400/year on utility bills due to
            billing errors, rate changes, and inefficiencies they never notice.
            BillWatch catches them all.
          </p>
          <Link
            href="/upload"
            data-testid="cta-start-button"
            className="mt-8 inline-block rounded-lg bg-[var(--primary)] px-8 py-3 font-medium text-white hover:bg-[var(--primary-hover)] transition-colors"
          >
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  );
}
