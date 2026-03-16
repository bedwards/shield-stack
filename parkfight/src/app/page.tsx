import Link from "next/link";

export default function Home() {
  return (
    <div data-testid="landing-page">
      <section data-testid="hero-section" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 text-center">
        <h1 data-testid="hero-title" className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--foreground)]">
          Fight your parking ticket{" "}<span className="text-[var(--primary)]">in minutes</span>
        </h1>
        <p data-testid="hero-subtitle" className="mt-6 text-lg sm:text-xl text-[var(--muted)] max-w-2xl mx-auto">
          AI-generated dispute letters customized to your city, violation type, and circumstances. Most people just pay — but you can fight back.
        </p>
        <div data-testid="hero-cta" className="mt-10 flex justify-center gap-4">
          <Link href="/fight" data-testid="cta-fight-button" className="rounded-lg bg-[var(--primary)] px-8 py-3 font-medium text-white hover:bg-[var(--primary-hover)] transition-colors">Fight My Ticket</Link>
          <Link href="/cities" data-testid="cta-cities-button" className="rounded-lg border border-[var(--border)] px-8 py-3 font-medium text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors">City Guides</Link>
        </div>
      </section>

      <section data-testid="stats-section" className="bg-[var(--secondary)] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div data-testid="stat-tickets"><p className="text-3xl font-bold text-[var(--primary)]">30M+</p><p className="mt-2 text-sm text-[var(--muted)]">Tickets Issued Per Year</p></div>
            <div data-testid="stat-disputes"><p className="text-3xl font-bold text-[var(--primary)]">0</p><p className="mt-2 text-sm text-[var(--muted)]">Disputes Generated</p></div>
            <div data-testid="stat-saved"><p className="text-3xl font-bold text-[var(--accent)]">$0</p><p className="mt-2 text-sm text-[var(--muted)]">Saved for Users</p></div>
          </div>
        </div>
      </section>

      <section data-testid="how-it-works-section" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[var(--foreground)]">How It Works</h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div data-testid="step-upload" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">1</div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">Upload Your Ticket</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">Take a photo of your ticket or enter the details. We identify the violation and your city&apos;s rules.</p>
            </div>
            <div data-testid="step-generate" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">2</div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">Get Your Dispute Letter</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">AI generates a professional dispute letter with the best defense strategy for your specific situation.</p>
            </div>
            <div data-testid="step-submit" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">3</div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">Submit & Win</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">Follow our step-by-step submission guide. We track your dispute and notify you of the outcome.</p>
            </div>
          </div>
        </div>
      </section>

      <section data-testid="cta-section" className="bg-[var(--secondary)] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[var(--foreground)]">Don&apos;t Just Pay That Ticket</h2>
          <p className="mt-4 text-lg text-[var(--muted)] max-w-2xl mx-auto">Most parking tickets can be disputed. ParkFight makes it easy with AI-powered dispute letters that actually work.</p>
          <Link href="/fight" data-testid="cta-bottom-button" className="mt-8 inline-block rounded-lg bg-[var(--primary)] px-8 py-3 font-medium text-white hover:bg-[var(--primary-hover)] transition-colors">Fight My Ticket Now</Link>
        </div>
      </section>
    </div>
  );
}
