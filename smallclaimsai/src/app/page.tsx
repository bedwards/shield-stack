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
          File small claims court{" "}
          <span className="text-[var(--primary)]">in any state</span>
        </h1>
        <p
          data-testid="hero-subtitle"
          className="mt-6 text-lg sm:text-xl text-[var(--muted)] max-w-2xl mx-auto"
        >
          AI-generated court documents, step-by-step guidance, and hearing
          preparation — all customized to your state and dispute.
        </p>

        {/* CTA Buttons */}
        <div data-testid="hero-cta" className="mt-10 flex justify-center gap-4">
          <Link
            href="/start"
            data-testid="cta-start-button"
            className="rounded-lg bg-[var(--primary)] px-8 py-3 font-medium text-white hover:bg-[var(--primary-hover)] transition-colors"
          >
            Start Your Case
          </Link>
          <Link
            href="/states"
            data-testid="cta-states-button"
            className="rounded-lg border border-[var(--border)] px-8 py-3 font-medium text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors"
          >
            Browse State Guides
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
            <div data-testid="stat-states">
              <p className="text-3xl font-bold text-[var(--primary)]">50+</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                State Jurisdictions Covered
              </p>
            </div>
            <div data-testid="stat-documents">
              <p className="text-3xl font-bold text-[var(--primary)]">7</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Document Types Generated
              </p>
            </div>
            <div data-testid="stat-price">
              <p className="text-3xl font-bold text-[var(--accent)]">$29.99</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Per Case — Full Document Package
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
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-4 gap-8">
            <div data-testid="step-describe" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">
                1
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">
                Describe Your Dispute
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Tell us your state, dispute type, amount, and what happened. Our
                wizard guides you through every detail.
              </p>
            </div>
            <div data-testid="step-generate" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">
                2
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">
                Get Your Documents
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                AI generates your demand letter, complaint, and all required
                court forms for your state.
              </p>
            </div>
            <div data-testid="step-file" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">
                3
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">
                File & Serve
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Follow step-by-step instructions specific to your courthouse for
                filing and serving the defendant.
              </p>
            </div>
            <div data-testid="step-win" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">
                4
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">
                Win Your Case
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Get AI-powered hearing prep with talking points, evidence
                organization, and Q&A practice.
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
            <div data-testid="feature-documents" className="rounded-lg bg-[var(--background)] p-6 border border-[var(--border)]">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">Court Documents</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                AI-generated demand letters, complaints, service affidavits, and subpoenas tailored to your case.
              </p>
            </div>
            <div data-testid="feature-state-rules" className="rounded-lg bg-[var(--background)] p-6 border border-[var(--border)]">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">State-Specific Rules</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Filing limits, fees, deadlines, and service requirements for all 50 states plus DC.
              </p>
            </div>
            <div data-testid="feature-hearing-prep" className="rounded-lg bg-[var(--background)] p-6 border border-[var(--border)]">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">Hearing Preparation</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                AI-generated talking points, evidence checklists, and practice Q&A for your court date.
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
            Ready to Fight for What You&apos;re Owed?
          </h2>
          <p className="mt-4 text-lg text-[var(--muted)] max-w-2xl mx-auto">
            Stop letting disputes go unresolved. SmallClaimsAI gives you
            everything you need to file and win your small claims case.
          </p>
          <Link
            href="/start"
            data-testid="cta-bottom-button"
            className="mt-8 inline-block rounded-lg bg-[var(--primary)] px-8 py-3 font-medium text-white hover:bg-[var(--primary-hover)] transition-colors"
          >
            Start Your Case — $29.99
          </Link>
        </div>
      </section>
    </div>
  );
}
