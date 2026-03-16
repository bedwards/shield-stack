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
          Fight unfair HOA fines{" "}
          <span className="text-[var(--primary)]">with AI on your side</span>
        </h1>
        <p
          data-testid="hero-subtitle"
          className="mt-6 text-lg sm:text-xl text-[var(--muted)] max-w-2xl mx-auto"
        >
          Upload your CC&amp;Rs, get an instant AI analysis of your rights, and
          generate legally-grounded dispute letters that cite the exact rules
          your HOA is misapplying.
        </p>

        {/* CTA Buttons */}
        <div data-testid="hero-cta" className="mt-10 flex justify-center gap-4">
          <Link
            href="/upload"
            data-testid="cta-upload-button"
            className="rounded-lg bg-[var(--primary)] px-8 py-3 font-medium text-white hover:bg-[var(--primary-hover)] transition-colors"
          >
            Upload Your CC&amp;Rs
          </Link>
          <Link
            href="/states"
            data-testid="cta-states-button"
            className="rounded-lg border border-[var(--border)] px-8 py-3 font-medium text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors"
          >
            Check Your State Laws
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
            <div data-testid="stat-homeowners">
              <p className="text-3xl font-bold text-[var(--primary)]">75M+</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Americans in HOAs
              </p>
            </div>
            <div data-testid="stat-fines">
              <p className="text-3xl font-bold text-[var(--accent)]">$1,000+</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Avg Unfair Fine Amount
              </p>
            </div>
            <div data-testid="stat-success">
              <p className="text-3xl font-bold text-[var(--success)]">--</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Disputes Generated
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
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">
                1
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">
                Upload Your CC&amp;Rs
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Upload your HOA&apos;s CC&amp;R document. Our AI extracts every
                rule, restriction, and your rights as a homeowner.
              </p>
            </div>
            <div data-testid="step-analyze" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">
                2
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">
                Get AI Analysis
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Receive a plain-language summary of your rights, enforcement
                procedures, and potential weaknesses in the HOA&apos;s position.
              </p>
            </div>
            <div data-testid="step-dispute" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">
                3
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">
                Generate Dispute Letter
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Get a professionally written dispute letter that cites your
                CC&amp;Rs, state law, and legal precedent to challenge unfair
                fines.
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
            Stop Paying Unfair HOA Fines
          </h2>
          <p className="mt-4 text-lg text-[var(--muted)] max-w-2xl mx-auto">
            Your HOA has lawyers. Now you have AI. Upload your CC&amp;Rs today
            and understand exactly what your HOA can and cannot do.
          </p>
          <Link
            href="/upload"
            data-testid="cta-bottom-button"
            className="mt-8 inline-block rounded-lg bg-[var(--primary)] px-8 py-3 font-medium text-white hover:bg-[var(--primary-hover)] transition-colors"
          >
            Analyze My CC&amp;Rs Free
          </Link>
        </div>
      </section>
    </div>
  );
}
