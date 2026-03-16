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
          Know what&apos;s being{" "}
          <span className="text-[var(--primary)]">built near you</span>
        </h1>
        <p
          data-testid="hero-subtitle"
          className="mt-6 text-lg sm:text-xl text-[var(--muted)] max-w-2xl mx-auto"
        >
          Get instant alerts when zoning changes, development proposals, or
          public hearings are scheduled near your home. Never be blindsided by
          neighborhood changes again.
        </p>

        {/* CTA Buttons */}
        <div data-testid="hero-cta" className="mt-10 flex justify-center gap-4">
          <Link
            href="/register"
            data-testid="cta-monitor-button"
            className="rounded-lg bg-[var(--primary)] px-8 py-3 font-medium text-white hover:bg-[var(--primary-hover)] transition-colors"
          >
            Monitor My Address
          </Link>
          <Link
            href="/demo"
            data-testid="cta-demo-button"
            className="rounded-lg border border-[var(--border)] px-8 py-3 font-medium text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors"
          >
            See a Demo
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
            <div data-testid="stat-addresses-monitored">
              <p className="text-3xl font-bold text-[var(--primary)]">0</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Addresses Monitored
              </p>
            </div>
            <div data-testid="stat-alerts-sent">
              <p className="text-3xl font-bold text-[var(--alert)]">0</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Alerts Sent
              </p>
            </div>
            <div data-testid="stat-cities-covered">
              <p className="text-3xl font-bold text-[var(--success)]">0</p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Cities Covered
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
            <div data-testid="step-register" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">
                1
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">
                Enter Your Address
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Register the addresses you want to monitor. We geocode them and
                set up a watchzone around each one.
              </p>
            </div>
            <div data-testid="step-monitor" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">
                2
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">
                We Scan Municipal Data
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                ZoneAlert scrapes public agendas, zoning applications, and
                development proposals from your city&apos;s government portals.
              </p>
            </div>
            <div data-testid="step-alert" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold">
                3
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">
                Get Alerted Instantly
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Receive push notifications and emails when new zoning activity
                is detected near your home. Attend hearings, voice opinions, stay
                informed.
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
            <div data-testid="feature-radius" className="rounded-lg bg-[var(--background)] p-6 border border-[var(--border)]">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                Customizable Radius
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Set your monitoring radius from 0.5 to 25 miles. Get alerts for
                what matters to your neighborhood.
              </p>
            </div>
            <div data-testid="feature-map" className="rounded-lg bg-[var(--background)] p-6 border border-[var(--border)]">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                Interactive Map
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                See all nearby zoning activity on an interactive map. Visualize
                your monitoring zone and active proposals.
              </p>
            </div>
            <div data-testid="feature-hearings" className="rounded-lg bg-[var(--background)] p-6 border border-[var(--border)]">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                Hearing Calendar
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Never miss a public hearing. Get calendar reminders for meetings
                where your neighborhood is on the agenda.
              </p>
            </div>
            <div data-testid="feature-push" className="rounded-lg bg-[var(--background)] p-6 border border-[var(--border)]">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                Push Notifications
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Real-time web push alerts the moment new zoning activity is
                detected. No app install required.
              </p>
            </div>
            <div data-testid="feature-history" className="rounded-lg bg-[var(--background)] p-6 border border-[var(--border)]">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                Alert History
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Full archive of past alerts with outcomes. Track which proposals
                were approved, denied, or withdrawn.
              </p>
            </div>
            <div data-testid="feature-multi-address" className="rounded-lg bg-[var(--background)] p-6 border border-[var(--border)]">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                Multiple Addresses
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Monitor your home, investment properties, and other locations of
                interest all from one dashboard.
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
            Stop Finding Out Too Late
          </h2>
          <p className="mt-4 text-lg text-[var(--muted)] max-w-2xl mx-auto">
            Most homeowners only learn about nearby zoning changes after
            construction starts. ZoneAlert gives you advance notice so you can
            attend hearings, voice concerns, and protect your neighborhood.
          </p>
          <Link
            href="/register"
            data-testid="cta-start-button"
            className="mt-8 inline-block rounded-lg bg-[var(--primary)] px-8 py-3 font-medium text-white hover:bg-[var(--primary-hover)] transition-colors"
          >
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  );
}
