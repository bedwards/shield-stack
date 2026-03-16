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
          Is your grocery store{" "}
          <span className="text-[var(--overcharge)]">overcharging</span> you?
        </h1>
        <p
          data-testid="hero-subtitle"
          className="mt-6 text-lg sm:text-xl text-[var(--muted)] max-w-2xl mx-auto"
        >
          Scan your receipt, detect pricing errors instantly, and get your money
          back. US grocery stores overcharge consumers over $1 billion every
          year.
        </p>

        {/* CTA Buttons */}
        <div data-testid="hero-cta" className="mt-10 flex justify-center gap-4">
          <Link
            href="/scan"
            data-testid="cta-scan-button"
            className="rounded-lg bg-[var(--primary)] px-8 py-3 font-medium text-white hover:bg-[var(--primary-hover)] transition-colors"
          >
            Scan Your Receipt
          </Link>
          <Link
            href="/demo"
            data-testid="cta-demo-button"
            className="rounded-lg border border-[var(--border)] px-8 py-3 font-medium text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors"
          >
            See How It Works
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
            <div data-testid="stat-receipts-scanned">
              <p className="text-3xl font-bold text-[var(--primary)]">0</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Receipts Scanned
              </p>
            </div>
            <div data-testid="stat-overcharges-found">
              <p className="text-3xl font-bold text-[var(--overcharge)]">0</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Overcharges Detected
              </p>
            </div>
            <div data-testid="stat-money-saved">
              <p className="text-3xl font-bold text-[var(--success)]">$0</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Money Saved by Users
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
                Scan Your Receipt
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Snap a photo of your grocery receipt. Our OCR technology extracts
                every line item automatically.
              </p>
            </div>
            <div data-testid="step-detect" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">
                2
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">
                Detect Overcharges
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                ReceiptGuard compares prices against store circulars, known
                prices, and advertised deals to flag discrepancies.
              </p>
            </div>
            <div data-testid="step-save" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">
                3
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">
                Get Your Money Back
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Present the evidence at customer service. Many stores have
                scanner accuracy guarantees that give you the item free.
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
                Smart Receipt OCR
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Automatically reads your receipt and extracts product names,
                quantities, prices, and tax amounts.
              </p>
            </div>
            <div data-testid="feature-price-check" className="rounded-lg bg-[var(--background)] p-6 border border-[var(--border)]">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                Price Comparison
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Cross-reference charged prices against store circulars, weekly
                ads, and our crowdsourced price database.
              </p>
            </div>
            <div data-testid="feature-overcharge-alerts" className="rounded-lg bg-[var(--background)] p-6 border border-[var(--border)]">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                Overcharge Alerts
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Get instant notifications when a scanned item was charged more
                than the advertised or expected price.
              </p>
            </div>
            <div data-testid="feature-store-policies" className="rounded-lg bg-[var(--background)] p-6 border border-[var(--border)]">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                Store Guarantee Lookup
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Know your store&apos;s scanner accuracy policy. Some stores give
                the item free if the price scans wrong.
              </p>
            </div>
            <div data-testid="feature-savings-tracker" className="rounded-lg bg-[var(--background)] p-6 border border-[var(--border)]">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                Savings Tracker
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Track how much money you&apos;ve recovered from overcharges over
                time with a running savings dashboard.
              </p>
            </div>
            <div data-testid="feature-receipt-history" className="rounded-lg bg-[var(--background)] p-6 border border-[var(--border)]">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                Receipt History
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Archive all your scanned receipts with overcharge flags for
                reference, disputes, and budgeting.
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
            Stop Losing Money at the Grocery Store
          </h2>
          <p className="mt-4 text-lg text-[var(--muted)] max-w-2xl mx-auto">
            The average family loses $100-300/year to grocery scanner errors and
            pricing mistakes they never notice. ReceiptGuard catches them all in
            seconds.
          </p>
          <Link
            href="/scan"
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
