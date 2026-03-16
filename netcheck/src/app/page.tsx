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
          Is your{" "}
          <span className="text-[var(--primary)]">entire care team</span>{" "}
          in-network?
        </h1>
        <p
          data-testid="hero-subtitle"
          className="mt-6 text-lg sm:text-xl text-[var(--muted)] max-w-2xl mx-auto"
        >
          Your surgeon might be in-network, but what about the anesthesiologist?
          The pathologist? Verify ALL providers before your procedure and avoid
          surprise bills.
        </p>

        {/* CTA Button */}
        <div className="mt-10">
          <Link
            href="/verify"
            data-testid="hero-cta-button"
            className="inline-block rounded-lg bg-[var(--primary)] px-8 py-4 text-lg font-medium text-white hover:bg-[var(--primary-hover)] transition-colors"
          >
            Start Verification
          </Link>
        </div>
      </section>

      {/* Risk Stats Section */}
      <section
        data-testid="stats-section"
        className="bg-[var(--secondary)] py-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div data-testid="stat-surprise-bills">
              <p className="text-3xl font-bold text-[var(--destructive)]">
                1 in 5
              </p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                ER visits result in a surprise bill
              </p>
            </div>
            <div data-testid="stat-avg-bill">
              <p className="text-3xl font-bold text-[var(--accent)]">$2,000+</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Average surprise out-of-network bill
              </p>
            </div>
            <div data-testid="stat-providers">
              <p className="text-3xl font-bold text-[var(--primary)]">5-12</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Providers typically involved in a surgery
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
            <div data-testid="step-enter" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">
                1
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">
                Enter Your Details
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Add your insurance plan, facility, and planned procedure. We
                identify every provider type who may be involved.
              </p>
            </div>
            <div data-testid="step-check" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">
                2
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">
                We Check Every Provider
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                NetCheck verifies the network status of ALL provider types --
                surgeon, anesthesiologist, pathologist, radiologist, and more.
              </p>
            </div>
            <div data-testid="step-protect" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">
                3
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">
                Get Protected
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Receive a risk report and verification request letters to send
                to your facility and insurer for written confirmation.
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
            $9.99 Could Save You Thousands
          </h2>
          <p className="mt-4 text-lg text-[var(--muted)] max-w-2xl mx-auto">
            A single verification check costs less than a copay -- but could
            prevent a surprise bill worth thousands. Know before you go.
          </p>
          <Link
            href="/verify"
            data-testid="cta-verify-button"
            className="mt-8 inline-block rounded-lg bg-[var(--primary)] px-8 py-3 font-medium text-white hover:bg-[var(--primary-hover)] transition-colors"
          >
            Verify My Providers
          </Link>
        </div>
      </section>
    </div>
  );
}
