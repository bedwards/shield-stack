import Link from "next/link";

export default function Home() {
  return (
    <div data-testid="landing-page">
      <section data-testid="hero-section" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 text-center">
        <h1 data-testid="hero-title" className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--foreground)]">
          Claim money{" "}
          <span className="text-[var(--primary)]">you&apos;re owed</span>
        </h1>
        <p data-testid="hero-subtitle" className="mt-6 text-lg sm:text-xl text-[var(--muted)] max-w-2xl mx-auto">
          Billions in class action settlements go unclaimed every year. SettleScan
          automatically matches you to settlements and files claims for you.
        </p>
        <div data-testid="hero-cta" className="mt-10 flex justify-center gap-4">
          <Link href="/match" data-testid="cta-match-button" className="rounded-lg bg-[var(--primary)] px-8 py-3 font-medium text-white hover:bg-[var(--primary-hover)] transition-colors">
            Find My Claims
          </Link>
          <Link href="/settlements" data-testid="cta-browse-button" className="rounded-lg border border-[var(--border)] px-8 py-3 font-medium text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors">
            Browse Settlements
          </Link>
        </div>
      </section>

      <section data-testid="stats-section" className="bg-[var(--secondary)] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div data-testid="stat-settlements">
              <p className="text-3xl font-bold text-[var(--primary)]">0</p>
              <p className="mt-2 text-sm text-[var(--muted)]">Active Settlements</p>
            </div>
            <div data-testid="stat-claims">
              <p className="text-3xl font-bold text-[var(--primary)]">0</p>
              <p className="mt-2 text-sm text-[var(--muted)]">Claims Filed</p>
            </div>
            <div data-testid="stat-recovered">
              <p className="text-3xl font-bold text-[var(--accent)]">$0</p>
              <p className="mt-2 text-sm text-[var(--muted)]">Recovered for Users</p>
            </div>
          </div>
        </div>
      </section>

      <section data-testid="how-it-works-section" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[var(--foreground)]">How It Works</h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div data-testid="step-match" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">1</div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">We Match You</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">Tell us about your purchases and services. We automatically find settlements you qualify for.</p>
            </div>
            <div data-testid="step-file" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">2</div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">We File for You</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">One click to file your claim. We handle the paperwork and submission process.</p>
            </div>
            <div data-testid="step-collect" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">3</div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">You Get Paid</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">When the settlement pays out, you receive your share. We only earn a small percentage of what you recover.</p>
            </div>
          </div>
        </div>
      </section>

      <section data-testid="cta-section" className="bg-[var(--secondary)] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[var(--foreground)]">Stop Leaving Money on the Table</h2>
          <p className="mt-4 text-lg text-[var(--muted)] max-w-2xl mx-auto">
            The average American qualifies for multiple class action settlements and never claims them. Let SettleScan do the work.
          </p>
          <Link href="/match" data-testid="cta-bottom-button" className="mt-8 inline-block rounded-lg bg-[var(--primary)] px-8 py-3 font-medium text-white hover:bg-[var(--primary-hover)] transition-colors">
            Find My Settlements
          </Link>
        </div>
      </section>
    </div>
  );
}
