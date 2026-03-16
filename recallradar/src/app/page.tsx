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
          Is your child&apos;s{" "}
          <span className="text-[var(--primary)]">product safe</span>?
        </h1>
        <p
          data-testid="hero-subtitle"
          className="mt-6 text-lg sm:text-xl text-[var(--muted)] max-w-2xl mx-auto"
        >
          Scan any product barcode to instantly check for CPSC recalls. Build
          your product inventory and get push alerts when new recalls affect
          items you own.
        </p>

        {/* CTA Buttons */}
        <div data-testid="hero-cta" className="mt-10 flex justify-center gap-4">
          <Link
            href="/scan"
            data-testid="cta-scan-button"
            className="rounded-lg bg-[var(--primary)] px-8 py-3 font-medium text-white hover:bg-[var(--primary-hover)] transition-colors"
          >
            Scan a Barcode
          </Link>
          <Link
            href="/recalls"
            data-testid="cta-browse-button"
            className="rounded-lg border border-[var(--border)] px-8 py-3 font-medium text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors"
          >
            Browse Recalls
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
            <div data-testid="stat-products-scanned">
              <p className="text-3xl font-bold text-[var(--primary)]">0</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Products Scanned
              </p>
            </div>
            <div data-testid="stat-recalls-tracked">
              <p className="text-3xl font-bold text-[var(--danger)]">0</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Recalls Tracked
              </p>
            </div>
            <div data-testid="stat-families-protected">
              <p className="text-3xl font-bold text-[var(--success)]">0</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Families Protected
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
                Point your camera at any product barcode. RecallRadar decodes
                UPC, EAN, and other standard formats instantly.
              </p>
            </div>
            <div data-testid="step-check" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">
                2
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">
                Check Recall Status
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                We check the CPSC database in real time. Green means safe, red
                means recalled with full details and remedy instructions.
              </p>
            </div>
            <div data-testid="step-protect" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">
                3
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">
                Stay Protected
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Save products to your inventory and get push notifications if
                any of your items are recalled in the future.
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
            Built for Parents
          </h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div data-testid="feature-scanner" className="rounded-lg bg-[var(--background)] p-6 border border-[var(--border)]">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                Instant Barcode Scanning
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Camera-based scanning works offline. No app download needed —
                runs right in your browser as a PWA.
              </p>
            </div>
            <div data-testid="feature-cpsc" className="rounded-lg bg-[var(--background)] p-6 border border-[var(--border)]">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                Official CPSC Data
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Recall data comes directly from the Consumer Product Safety
                Commission — the authoritative source for US recalls.
              </p>
            </div>
            <div data-testid="feature-inventory" className="rounded-lg bg-[var(--background)] p-6 border border-[var(--border)]">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                Product Inventory
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Save products you own and organize by room. Get notified
                automatically when a future recall affects your items.
              </p>
            </div>
            <div data-testid="feature-alerts" className="rounded-lg bg-[var(--background)] p-6 border border-[var(--border)]">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                Push Alerts
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Receive instant push notifications when a new recall matches
                a product in your inventory. Never miss a safety alert.
              </p>
            </div>
            <div data-testid="feature-history" className="rounded-lg bg-[var(--background)] p-6 border border-[var(--border)]">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                Scan History
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Review every product you have scanned with timestamps and the
                recall status at the time of each scan.
              </p>
            </div>
            <div data-testid="feature-search" className="rounded-lg bg-[var(--background)] p-6 border border-[var(--border)]">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                Search by Name
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                No barcode? Search by product name, brand, or category to
                check recall status manually.
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
            Protect Your Family Today
          </h2>
          <p className="mt-4 text-lg text-[var(--muted)] max-w-2xl mx-auto">
            Over 300 product recalls happen every year in the US. Most parents
            never hear about them until it is too late. RecallRadar keeps you
            informed and your family safe.
          </p>
          <Link
            href="/scan"
            data-testid="cta-start-button"
            className="mt-8 inline-block rounded-lg bg-[var(--primary)] px-8 py-3 font-medium text-white hover:bg-[var(--primary-hover)] transition-colors"
          >
            Start Scanning Free
          </Link>
        </div>
      </section>
    </div>
  );
}
