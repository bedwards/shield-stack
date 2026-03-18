import Link from "next/link";

export function GuideCtaSection() {
  return (
    <section data-testid="guide-cta-section" className="mt-16">
      {/* Phone Scripts Differentiator */}
      <div
        data-testid="phone-scripts-callout"
        className="rounded-lg border-2 border-primary/20 bg-primary-light p-6 mb-8"
      >
        <h3 className="text-xl font-bold text-foreground">
          We provide word-for-word scripts for every phone call
        </h3>
        <p className="mt-2 text-foreground leading-relaxed">
          Calling Social Security, banks, and insurance companies is one of the
          hardest parts. AfterLoss gives you word-for-word phone scripts so you
          know exactly what to say — including what information to have ready and
          what to ask for. No other service offers this.
        </p>
        <Link
          href="/onboard"
          data-testid="cta-phone-scripts"
          className="mt-4 inline-block rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-primary-hover transition-colors"
        >
          Get Your Phone Scripts — Free
        </Link>
      </div>

      {/* AI Document Generation Differentiator */}
      <div
        data-testid="doc-gen-callout"
        className="rounded-lg border-2 border-accent/20 bg-secondary p-6 mb-8"
      >
        <h3 className="text-xl font-bold text-foreground">
          We generate every letter and form you need — for free
        </h3>
        <p className="mt-2 text-foreground leading-relaxed">
          Employer notifications, bank closure letters, insurance claims,
          subscription cancellations, creditor notices — AfterLoss uses AI to
          generate personalized letters and forms for your specific situation.
          Just answer a few questions and download your documents.
        </p>
        <Link
          href="/onboard"
          data-testid="cta-doc-gen"
          className="mt-4 inline-block rounded-lg bg-accent px-6 py-2.5 text-sm font-medium text-white hover:bg-accent-hover transition-colors"
        >
          Generate Your Documents — Free
        </Link>
      </div>

      {/* Main CTA */}
      <div
        data-testid="guide-main-cta"
        className="rounded-lg bg-secondary p-8 text-center"
      >
        <h2 className="text-2xl font-bold text-foreground">
          Get your personalized checklist
        </h2>
        <p className="mt-3 text-muted max-w-xl mx-auto">
          Answer a few gentle questions about your situation, and we&apos;ll
          create a step-by-step plan customized to your state — with deadlines,
          phone scripts, and every document you need.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/onboard"
            data-testid="cta-main-checklist"
            className="rounded-lg bg-primary px-8 py-3 font-medium text-white hover:bg-primary-hover transition-colors"
          >
            Start Your Personalized Checklist
          </Link>
          <Link
            href="/states"
            data-testid="cta-main-states"
            className="rounded-lg border border-border px-8 py-3 font-medium text-foreground hover:bg-secondary transition-colors"
          >
            See Probate Rules for Your State
          </Link>
        </div>
        <p className="mt-4 text-sm text-muted">
          100% free. No account required. Your progress stays in your browser.
        </p>
      </div>
    </section>
  );
}
