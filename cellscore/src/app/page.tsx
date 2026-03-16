import Link from "next/link";

export default function Home() {
  return (
    <div data-testid="landing-page">
      <section data-testid="hero-section" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 text-center">
        <h1 data-testid="hero-title" className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--foreground)]">
          The best cell plan{" "}<span className="text-[var(--primary)]">for your address</span>
        </h1>
        <p data-testid="hero-subtitle" className="mt-6 text-lg sm:text-xl text-[var(--muted)] max-w-2xl mx-auto">
          Real coverage data from real users, not carrier marketing. Enter your address and find the plan that actually works where you live.
        </p>
        <div data-testid="hero-cta" className="mt-10 flex justify-center gap-4">
          <Link href="/compare" data-testid="cta-compare-button" className="rounded-lg bg-[var(--primary)] px-8 py-3 font-medium text-white hover:bg-[var(--primary-hover)] transition-colors">Find My Best Plan</Link>
          <Link href="/coverage" data-testid="cta-coverage-button" className="rounded-lg border border-[var(--border)] px-8 py-3 font-medium text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors">Check Coverage</Link>
        </div>
      </section>

      <section data-testid="stats-section" className="bg-[var(--secondary)] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div data-testid="stat-carriers"><p className="text-3xl font-bold text-[var(--primary)]">5+</p><p className="mt-2 text-sm text-[var(--muted)]">Carriers Compared</p></div>
            <div data-testid="stat-plans"><p className="text-3xl font-bold text-[var(--primary)]">0</p><p className="mt-2 text-sm text-[var(--muted)]">Plans Analyzed</p></div>
            <div data-testid="stat-reports"><p className="text-3xl font-bold text-[var(--accent)]">0</p><p className="mt-2 text-sm text-[var(--muted)]">Coverage Reports</p></div>
          </div>
        </div>
      </section>

      <section data-testid="how-it-works-section" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[var(--foreground)]">How It Works</h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div data-testid="step-address" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">1</div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">Enter Your Address</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">Tell us where you live, work, and spend time so we can check real coverage at your locations.</p>
            </div>
            <div data-testid="step-compare" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">2</div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">Compare Plans</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">See all carrier plans side-by-side with real coverage scores and true monthly costs.</p>
            </div>
            <div data-testid="step-switch" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">3</div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">Switch & Save</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">Pick the best plan for your needs and switch with confidence knowing coverage is verified.</p>
            </div>
          </div>
        </div>
      </section>

      <section data-testid="cta-section" className="bg-[var(--secondary)] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[var(--foreground)]">Stop Overpaying for Bad Coverage</h2>
          <p className="mt-4 text-lg text-[var(--muted)] max-w-2xl mx-auto">Most people pick a carrier based on ads. CellScore shows you which carrier actually works best at your address.</p>
          <Link href="/compare" data-testid="cta-bottom-button" className="mt-8 inline-block rounded-lg bg-[var(--primary)] px-8 py-3 font-medium text-white hover:bg-[var(--primary-hover)] transition-colors">Find My Best Plan</Link>
        </div>
      </section>
    </div>
  );
}
