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
          {{PRODUCT_NAME}}
        </h1>
        <p
          data-testid="hero-subtitle"
          className="mt-6 text-lg sm:text-xl text-[var(--muted)] max-w-2xl mx-auto"
        >
          {{PRODUCT_TAGLINE}}
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex justify-center gap-4">
          <Link
            href="/get-started"
            data-testid="cta-primary-button"
            className="rounded-lg bg-[var(--primary)] px-8 py-3 font-medium text-white hover:bg-[var(--primary-hover)] transition-colors"
          >
            Get Started
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

      {/* How It Works Section */}
      <section
        data-testid="how-it-works-section"
        className="bg-[var(--secondary)] py-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[var(--foreground)]">
            How It Works
          </h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div data-testid="step-1" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">
                1
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">
                Step One
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Description of the first step.
              </p>
            </div>
            <div data-testid="step-2" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">
                2
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">
                Step Two
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Description of the second step.
              </p>
            </div>
            <div data-testid="step-3" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">
                3
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">
                Step Three
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Description of the third step.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section data-testid="features-section" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[var(--foreground)]">
            Features
          </h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              data-testid="feature-1"
              className="rounded-lg bg-[var(--secondary)] p-6 border border-[var(--border)]"
            >
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                Feature One
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Description of the first feature.
              </p>
            </div>
            <div
              data-testid="feature-2"
              className="rounded-lg bg-[var(--secondary)] p-6 border border-[var(--border)]"
            >
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                Feature Two
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Description of the second feature.
              </p>
            </div>
            <div
              data-testid="feature-3"
              className="rounded-lg bg-[var(--secondary)] p-6 border border-[var(--border)]"
            >
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                Feature Three
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Description of the third feature.
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
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-lg text-[var(--muted)] max-w-2xl mx-auto">
            {{PRODUCT_TAGLINE}}
          </p>
          <Link
            href="/get-started"
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
