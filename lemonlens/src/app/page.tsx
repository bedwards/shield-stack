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
          Spot hidden damage{" "}
          <span className="text-[var(--primary)]">before you buy</span>
        </h1>
        <p
          data-testid="hero-subtitle"
          className="mt-6 text-lg sm:text-xl text-[var(--muted)] max-w-2xl mx-auto"
        >
          Upload photos of any used car and our AI instantly detects paint
          repairs, panel gaps, overspray, and structural damage that sellers try
          to hide. Decode VINs and check recalls in seconds.
        </p>

        {/* CTA Buttons */}
        <div data-testid="hero-cta" className="mt-10 flex justify-center gap-4">
          <Link
            href="/scan"
            data-testid="cta-scan-button"
            className="rounded-lg bg-[var(--primary)] px-8 py-3 font-medium text-black hover:bg-[var(--primary-hover)] transition-colors"
          >
            Scan a Car Now
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
            <div data-testid="stat-cars-scanned">
              <p className="text-3xl font-bold text-[var(--primary)]">0</p>
              <p className="mt-2 text-sm text-[var(--muted)]">Cars Scanned</p>
            </div>
            <div data-testid="stat-damage-found">
              <p className="text-3xl font-bold text-[var(--danger)]">0</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Hidden Damage Found
              </p>
            </div>
            <div data-testid="stat-money-saved">
              <p className="text-3xl font-bold text-[var(--success)]">$0</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Saved in Bad Deals Avoided
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
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-black font-bold">
                1
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">
                Upload Photos
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Upload up to 20 photos of the car or paste a listing URL. We
                grab every angle automatically.
              </p>
            </div>
            <div data-testid="step-analyze" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-black font-bold">
                2
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">
                AI Damage Scan
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Our AI analyzes every photo for paint inconsistencies, panel
                gaps, overspray, rust, and structural repair signs.
              </p>
            </div>
            <div data-testid="step-report" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-black font-bold">
                3
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">
                Get Your Report
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Receive a detailed damage report with confidence scores, VIN
                recalls, and a shareable link for your mechanic.
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
            Everything You Need Before Buying
          </h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              data-testid="feature-ai-vision"
              className="rounded-lg bg-[var(--background)] p-6 border border-[var(--border)]"
            >
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                AI Damage Detection
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Gemini Vision AI spots paint repairs, panel misalignment,
                overspray, and structural damage invisible to the naked eye.
              </p>
            </div>
            <div
              data-testid="feature-vin-decode"
              className="rounded-lg bg-[var(--background)] p-6 border border-[var(--border)]"
            >
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                VIN Decoder
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Decode any VIN to get year, make, model, trim, engine, and
                safety ratings from the official NHTSA database.
              </p>
            </div>
            <div
              data-testid="feature-recall-check"
              className="rounded-lg bg-[var(--background)] p-6 border border-[var(--border)]"
            >
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                Recall Alerts
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Instantly check for open recalls on the specific vehicle before
                you buy. Never inherit someone else&#39;s safety risk.
              </p>
            </div>
            <div
              data-testid="feature-listing-import"
              className="rounded-lg bg-[var(--background)] p-6 border border-[var(--border)]"
            >
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                Listing URL Import
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Paste a link from Facebook Marketplace, Craigslist, or Cars.com
                and we auto-grab all photos and the VIN.
              </p>
            </div>
            <div
              data-testid="feature-shareable-reports"
              className="rounded-lg bg-[var(--background)] p-6 border border-[var(--border)]"
            >
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                Shareable Reports
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Generate a unique link to share your damage report with a
                mechanic, friend, or family member for a second opinion.
              </p>
            </div>
            <div
              data-testid="feature-scan-history"
              className="rounded-lg bg-[var(--background)] p-6 border border-[var(--border)]"
            >
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                Scan History
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Save and compare past scans. Add notes, asking prices, and your
                decision to build a car shopping journal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section data-testid="cta-section" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[var(--foreground)]">
            Don&#39;t Buy a Lemon
          </h2>
          <p className="mt-4 text-lg text-[var(--muted)] max-w-2xl mx-auto">
            40 million used cars are sold in the US each year. Many have
            undisclosed damage from accidents, floods, or poor repairs.
            LemonLens gives you an AI-powered pre-inspection before you even
            visit the lot.
          </p>
          <Link
            href="/scan"
            data-testid="cta-start-button"
            className="mt-8 inline-block rounded-lg bg-[var(--primary)] px-8 py-3 font-medium text-black hover:bg-[var(--primary-hover)] transition-colors"
          >
            Start Your Free Scan
          </Link>
        </div>
      </section>
    </div>
  );
}
