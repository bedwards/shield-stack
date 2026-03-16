import Link from "next/link";

export default function Home() {
  return (
    <div data-testid="landing-page">
      <section data-testid="hero-section" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 text-center">
        <h1 data-testid="hero-title" className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--foreground)]">
          Don&apos;t let FAFSA mistakes{" "}<span className="text-[var(--primary)]">cost you thousands</span>
        </h1>
        <p data-testid="hero-subtitle" className="mt-6 text-lg sm:text-xl text-[var(--muted)] max-w-2xl mx-auto">
          Real-time error detection catches costly FAFSA mistakes. Compare aid packages across schools and negotiate for more money with AI-powered appeal letters.
        </p>
        <div data-testid="hero-cta" className="mt-10 flex justify-center gap-4">
          <Link href="/check" data-testid="cta-check-button" className="rounded-lg bg-[var(--primary)] px-8 py-3 font-medium text-white hover:bg-[var(--primary-hover)] transition-colors">Check My FAFSA</Link>
          <Link href="/compare" data-testid="cta-compare-button" className="rounded-lg border border-[var(--border)] px-8 py-3 font-medium text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors">Compare Aid Packages</Link>
        </div>
      </section>

      <section data-testid="stats-section" className="bg-[var(--secondary)] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div data-testid="stat-applicants"><p className="text-3xl font-bold text-[var(--primary)]">17M+</p><p className="mt-2 text-sm text-[var(--muted)]">FAFSA Applicants Per Year</p></div>
            <div data-testid="stat-errors"><p className="text-3xl font-bold text-[var(--destructive)]">30%+</p><p className="mt-2 text-sm text-[var(--muted)]">Applications With Errors</p></div>
            <div data-testid="stat-savings"><p className="text-3xl font-bold text-[var(--accent)]">$0</p><p className="mt-2 text-sm text-[var(--muted)]">Saved for Users</p></div>
          </div>
        </div>
      </section>

      <section data-testid="how-it-works-section" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[var(--foreground)]">How It Works</h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div data-testid="step-check" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">1</div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">Check for Errors</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">Our AI reviews your FAFSA answers in real time and catches mistakes that could reduce your aid.</p>
            </div>
            <div data-testid="step-compare" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">2</div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">Compare Offers</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">Enter aid packages from multiple schools and see a clear side-by-side comparison of true costs.</p>
            </div>
            <div data-testid="step-negotiate" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">3</div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">Negotiate More Aid</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">Generate professional appeal letters to request more financial aid from your target schools.</p>
            </div>
          </div>
        </div>
      </section>

      <section data-testid="cta-section" className="bg-[var(--secondary)] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[var(--foreground)]">Maximize Your Financial Aid</h2>
          <p className="mt-4 text-lg text-[var(--muted)] max-w-2xl mx-auto">FAFSA errors cost families billions in lost aid every year. FAFSAcopilot helps you get every dollar you deserve.</p>
          <Link href="/check" data-testid="cta-bottom-button" className="mt-8 inline-block rounded-lg bg-[var(--primary)] px-8 py-3 font-medium text-white hover:bg-[var(--primary-hover)] transition-colors">Start Free Error Check</Link>
        </div>
      </section>
    </div>
  );
}
