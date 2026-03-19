import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Social proof data                                                   */
/* ------------------------------------------------------------------ */

const TESTIMONIALS = [
  {
    id: "sarah-t",
    quote:
      "BillWatch caught a $47 overcharge on my electric bill that I never would have noticed. It paid for itself the first month.",
    name: "Sarah T.",
    location: "Austin, TX",
  },
  {
    id: "marcus-r",
    quote:
      "I switched providers after BillWatch showed me I was paying 22% more than the state average. Saving about $35 a month now.",
    name: "Marcus R.",
    location: "Columbus, OH",
  },
  {
    id: "jennifer-l",
    quote:
      "The anomaly alerts are great. My January bill was way higher than normal and BillWatch flagged it immediately — turned out my meter was misread.",
    name: "Jennifer L.",
    location: "Philadelphia, PA",
  },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                      */
/* ------------------------------------------------------------------ */

function HeroSection() {
  return (
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
      <div data-testid="hero-cta" className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
        <Link
          href="/upload"
          data-testid="cta-upload-button"
          className="rounded-lg bg-[var(--primary)] px-8 py-3 font-medium text-white hover:bg-[var(--primary-hover)] transition-colors"
        >
          Upload Your First Bill
        </Link>
        <Link
          href="/dashboard"
          data-testid="cta-demo-button"
          className="rounded-lg border border-[var(--border)] px-8 py-3 font-medium text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors"
        >
          See a Demo
        </Link>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section
      data-testid="stats-section"
      className="bg-[var(--secondary)] py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div data-testid="stat-bills-analyzed">
            <p className="text-3xl font-bold text-[var(--primary)]">50</p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              State Rate Guides
            </p>
          </div>
          <div data-testid="stat-anomalies-found">
            <p className="text-3xl font-bold text-[var(--anomaly)]">$200–400</p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Avg. Annual Savings Found
            </p>
          </div>
          <div data-testid="stat-money-saved">
            <p className="text-3xl font-bold text-[var(--success)]">Free</p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              To Get Started
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
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
  );
}

function FeaturesSection() {
  return (
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
  );
}

function SocialProofSection() {
  return (
    <section data-testid="social-proof-section" className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-[var(--foreground)] mb-12">
          What BillWatch Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              data-testid={`testimonial-${t.id}`}
              className="rounded-lg border border-[var(--border)] p-6"
            >
              <div className="flex items-center gap-1 mb-3" aria-label={`5 star rating from ${t.name}`}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="h-4 w-4 text-[var(--accent)]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-sm text-[var(--foreground)] leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-4 pt-4 border-t border-[var(--border)]">
                <p className="text-sm font-semibold text-[var(--foreground)]">
                  {t.name}
                </p>
                <p className="text-xs text-[var(--muted)]">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section
      data-testid="cta-section"
      className="bg-[var(--secondary)] py-16"
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
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <div data-testid="landing-page">
      <HeroSection />
      <StatsSection />
      <HowItWorksSection />
      <FeaturesSection />
      <SocialProofSection />
      <CtaSection />
    </div>
  );
}
