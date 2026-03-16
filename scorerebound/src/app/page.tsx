export default function HomePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="text-center" data-testid="hero-section">
        <h1
          className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl"
          data-testid="hero-heading"
        >
          Recover Your Credit Score After{" "}
          <span className="text-brand-600">Student Loan</span> Delinquency
        </h1>
        <p
          className="mx-auto mt-6 max-w-2xl text-lg text-gray-600"
          data-testid="hero-description"
        >
          Take our free 5-question quiz to get a personalized recovery plan.
          Learn which path — IBR enrollment, rehabilitation, or consolidation —
          is right for your situation.
        </p>
        <div className="mt-10">
          <a
            href="/quiz"
            className="inline-block rounded-lg bg-brand-600 px-8 py-4 text-lg font-semibold text-white shadow-sm hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            data-testid="cta-start-quiz"
          >
            Start Your Free Recovery Plan
          </a>
        </div>
      </section>

      <section className="mt-24 grid gap-8 sm:grid-cols-3" data-testid="features-section">
        <div className="text-center" data-testid="feature-quiz">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-brand-600">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">5-Question Quiz</h3>
          <p className="mt-2 text-sm text-gray-600">
            Answer five quick questions about your loan situation to get a tailored plan.
          </p>
        </div>
        <div className="text-center" data-testid="feature-plan">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success-50 text-success-600">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">Personalized Plan</h3>
          <p className="mt-2 text-sm text-gray-600">
            Get step-by-step guidance for IBR, rehabilitation, consolidation, or credit building.
          </p>
        </div>
        <div className="text-center" data-testid="feature-track">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-warning-50 text-warning-600">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">Track Progress</h3>
          <p className="mt-2 text-sm text-gray-600">
            Log your recovery actions and watch your credit score climb back up.
          </p>
        </div>
      </section>
    </div>
  );
}
