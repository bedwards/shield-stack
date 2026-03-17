import Link from "next/link";

export default function Home() {
  return (
    <div data-testid="landing-page">
      <section data-testid="hero-section" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 text-center">
        <h1 data-testid="hero-title" className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
          A compassionate guide{" "}<span className="text-primary">through what comes next</span>
        </h1>
        <p data-testid="hero-subtitle" className="mt-6 text-lg sm:text-xl text-muted max-w-2xl mx-auto">
          Free, step-by-step guidance for settling an estate after someone dies. State-specific checklists, document templates, and everything you need — at no cost, ever.
        </p>
        <div data-testid="hero-cta" className="mt-10 flex justify-center gap-4">
          <Link href="/guide" data-testid="cta-guide-button" className="rounded-lg bg-primary px-8 py-3 font-medium text-white hover:bg-primary-hover transition-colors">Start the Guide</Link>
          <Link href="/states" data-testid="cta-states-button" className="rounded-lg border border-border px-8 py-3 font-medium text-foreground hover:bg-secondary transition-colors">Find Your State</Link>
        </div>
      </section>

      <section data-testid="stats-section" className="bg-secondary py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div data-testid="stat-states"><p className="text-3xl font-bold text-primary">50+</p><p className="mt-2 text-sm text-muted">State Guides</p></div>
            <div data-testid="stat-tasks"><p className="text-3xl font-bold text-primary">100+</p><p className="mt-2 text-sm text-muted">Guided Tasks</p></div>
            <div data-testid="stat-price"><p className="text-3xl font-bold text-accent">$0</p><p className="mt-2 text-sm text-muted">Always Free</p></div>
          </div>
        </div>
      </section>

      <section data-testid="how-it-works-section" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground">How AfterLoss Helps</h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div data-testid="step-start" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white font-bold">1</div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">Tell Us Your Situation</h3>
              <p className="mt-2 text-sm text-muted">Answer a few simple questions about your state, the estate, and your role. We personalize the guide.</p>
            </div>
            <div data-testid="step-follow" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white font-bold">2</div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">Follow the Checklist</h3>
              <p className="mt-2 text-sm text-muted">Work through tasks at your own pace — from immediate needs to long-term estate settlement.</p>
            </div>
            <div data-testid="step-complete" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white font-bold">3</div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">Track Your Progress</h3>
              <p className="mt-2 text-sm text-muted">Save your progress, add notes, and come back anytime. We keep track so you don&apos;t have to.</p>
            </div>
          </div>
        </div>
      </section>

      <section data-testid="cta-section" className="bg-secondary py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground">You Don&apos;t Have to Figure This Out Alone</h2>
          <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">Losing someone is hard enough. AfterLoss provides clear, compassionate guidance through the estate settlement process — completely free.</p>
          <Link href="/guide" data-testid="cta-bottom-button" className="mt-8 inline-block rounded-lg bg-primary px-8 py-3 font-medium text-white hover:bg-primary-hover transition-colors">Get Started — Free Forever</Link>
        </div>
      </section>
    </div>
  );
}
