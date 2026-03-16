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
          How much should your{" "}
          <span className="text-[var(--primary)]">repair cost?</span>
        </h1>
        <p
          data-testid="hero-subtitle"
          className="mt-6 text-lg sm:text-xl text-[var(--muted)] max-w-2xl mx-auto"
        >
          Describe your appliance problem in plain English. Get an AI-powered
          diagnosis and a fair price estimate based on real repair data.
        </p>

        {/* Symptom Input CTA */}
        <div data-testid="hero-cta" className="mt-10 max-w-xl mx-auto">
          <form
            data-testid="symptom-form"
            className="flex flex-col gap-3"
            action="/diagnose"
            method="GET"
          >
            <input
              type="text"
              name="symptoms"
              data-testid="symptom-input"
              placeholder="e.g., My refrigerator is making a loud buzzing noise..."
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
            />
            <button
              type="submit"
              data-testid="diagnose-button"
              className="rounded-lg bg-[var(--primary)] px-6 py-3 font-medium text-white hover:bg-[var(--primary-hover)] transition-colors"
            >
              Get Free Diagnosis
            </button>
          </form>
          <p className="mt-3 text-xs text-[var(--muted)]">
            3 free diagnoses per month. No credit card required.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section
        data-testid="stats-section"
        className="bg-[var(--secondary)] py-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div data-testid="stat-diagnoses">
              <p className="text-3xl font-bold text-[var(--primary)]">0</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                AI Diagnoses Made
              </p>
            </div>
            <div data-testid="stat-appliances">
              <p className="text-3xl font-bold text-[var(--primary)]">0</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Appliances Covered
              </p>
            </div>
            <div data-testid="stat-savings">
              <p className="text-3xl font-bold text-[var(--accent)]">$0</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Saved by Users
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
            <div data-testid="step-describe" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">
                1
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">
                Describe the Problem
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Tell us what&#39;s wrong with your appliance in plain English.
                No technical knowledge needed.
              </p>
            </div>
            <div data-testid="step-diagnose" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">
                2
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">
                Get AI Diagnosis
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Our AI identifies the probable issue and what repair is needed,
                including parts and labor.
              </p>
            </div>
            <div data-testid="step-estimate" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">
                3
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">
                See Fair Price
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Get a location-adjusted price range so you know exactly what the
                repair should cost.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Repairs Section */}
      <section
        data-testid="popular-repairs-section"
        className="bg-[var(--secondary)] py-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[var(--foreground)]">
            Popular Repair Estimates
          </h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                appliance: "Refrigerator",
                repair: "Compressor Replacement",
                range: "$200 - $600",
              },
              {
                appliance: "Washer",
                repair: "Drain Pump Replacement",
                range: "$150 - $350",
              },
              {
                appliance: "Dishwasher",
                repair: "Control Board Repair",
                range: "$150 - $400",
              },
              {
                appliance: "Dryer",
                repair: "Heating Element",
                range: "$100 - $250",
              },
              {
                appliance: "Oven",
                repair: "Igniter Replacement",
                range: "$100 - $300",
              },
              {
                appliance: "AC Unit",
                repair: "Refrigerant Recharge",
                range: "$150 - $500",
              },
            ].map((item) => (
              <Link
                key={`${item.appliance}-${item.repair}`}
                href={`/cost/${item.appliance.toLowerCase().replace(/ /g, "-")}/${item.repair.toLowerCase().replace(/ /g, "-")}`}
                data-testid={`repair-card-${item.appliance.toLowerCase().replace(/ /g, "-")}`}
                className="block rounded-lg border border-[var(--border)] bg-[var(--background)] p-6 hover:border-[var(--primary)] transition-colors"
              >
                <h3 className="font-semibold text-[var(--foreground)]">
                  {item.appliance}
                </h3>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  {item.repair}
                </p>
                <p className="mt-3 text-lg font-bold text-[var(--primary)]">
                  {item.range}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section data-testid="cta-section" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[var(--foreground)]">
            Help Build Fair Repair Pricing
          </h2>
          <p className="mt-4 text-lg text-[var(--muted)] max-w-2xl mx-auto">
            Share what you paid for your repair and help other homeowners avoid
            getting overcharged. Every submission makes our estimates more
            accurate.
          </p>
          <Link
            href="/submit-price"
            data-testid="cta-submit-button"
            className="mt-8 inline-block rounded-lg bg-[var(--primary)] px-8 py-3 font-medium text-white hover:bg-[var(--primary-hover)] transition-colors"
          >
            Submit Your Repair Price
          </Link>
        </div>
      </section>
    </div>
  );
}
