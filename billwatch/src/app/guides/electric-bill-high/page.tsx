import type { Metadata } from "next";
import Link from "next/link";
import ProviderComparison from "@/components/ProviderComparison";

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://billwatch.pages.dev";

export const metadata: Metadata = {
  title: "Why Is My Electric Bill So High? [2026 Guide] | BillWatch",
  description:
    "Average US electric bills hit $163/month in 2026 — up 35% since 2021. Learn the 5 real reasons your bill is rising and what you can do about it.",
  keywords: [
    "why is my electric bill so high",
    "high electric bill 2026",
    "electric bill increase",
    "average electric bill",
    "electricity rates 2026",
    "electric bill causes",
    "reduce electric bill",
  ],
  alternates: {
    canonical: `${BASE_URL}/guides/electric-bill-high`,
  },
  openGraph: {
    type: "article",
    url: `${BASE_URL}/guides/electric-bill-high`,
    siteName: "BillWatch",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const FAQ_ITEMS = [
  {
    question: "Why did my electric bill double?",
    answer:
      "A sudden doubling typically indicates a rate plan change, a malfunctioning appliance (especially HVAC, water heater, or pool pump), extreme weather driving heating or cooling demand, or a billing error by your utility. Upload your bill to BillWatch to compare it against your historical pattern and pinpoint the cause.",
  },
  {
    question: "What is the average electric bill in the US in 2026?",
    answer:
      "The average US residential electric bill is $163 per month as of 2026, according to EIA data. That is up 35% from the 2021 average of $121 per month. The average residential rate is 18.05 cents per kWh, up 21% from 14.92 cents in 2022.",
  },
  {
    question: "Why are electricity prices going up in 2026?",
    answer:
      "Five main factors drive the 2026 increase: aging grid infrastructure requiring billions in upgrades, surging electricity demand from AI data centers, fuel price volatility from global natural gas markets, extreme weather events straining the grid, and utility capital investments being passed through to ratepayers.",
  },
  {
    question: "How can I lower my electric bill?",
    answer:
      "Start by understanding where your money goes — upload your bills to BillWatch to spot anomalies and trends. Common savings: switch to a time-of-use rate plan, seal air leaks, upgrade to a smart thermostat, replace old appliances with Energy Star models, and in deregulated states, compare provider rates.",
  },
  {
    question: "Is my electric company overcharging me?",
    answer:
      "Billing errors are more common than most people realize — utilities process millions of bills monthly and mistakes happen. BillWatch compares your bill against your historical pattern and similar households in your area. If your bill is a statistical outlier, we flag it so you can dispute it with your provider.",
  },
  {
    question: "Which states have the highest electric bills?",
    answer:
      "Hawaii leads at $203/month, followed by Connecticut ($198), Massachusetts ($187), Alaska ($179), and New Hampshire ($173). These states face a combination of high fuel costs, transmission expenses, and limited local generation. The cheapest states include Utah ($99), Idaho ($105), and Washington ($108).",
  },
  {
    question: "Do AI data centers really affect my electric bill?",
    answer:
      "Yes. AI data centers consumed an estimated 4.4% of total US electricity in 2025, up from under 2% in 2022. This surge in demand tightens the grid, especially in regions like Northern Virginia and central Texas, pushing wholesale prices up. Utilities pass these costs to all residential customers through rate increases.",
  },
];

const HOWTO_STEPS = [
  {
    name: "Gather your recent bills",
    text: "Collect your last 12 months of electric bills. You can download these from your utility company's online portal or find paper copies.",
  },
  {
    name: "Upload bills to BillWatch",
    text: "Take a photo or upload a PDF of each bill. BillWatch's OCR automatically extracts the amount, usage (kWh), rate, and billing period.",
  },
  {
    name: "Review your usage trends",
    text: "BillWatch charts your costs and usage over time so you can spot seasonal patterns, gradual increases, and sudden spikes at a glance.",
  },
  {
    name: "Check for anomalies",
    text: "BillWatch's algorithm flags any bill that deviates significantly from your historical pattern, separating usage anomalies from rate changes.",
  },
  {
    name: "Compare against similar households",
    text: "See how your usage compares to homes with similar square footage, household size, and climate zone in your area.",
  },
  {
    name: "Take action",
    text: "Use your insights to dispute billing errors, switch to a better rate plan, upgrade inefficient appliances, or compare providers in deregulated states.",
  },
];

const STATE_DATA_HIGHEST = [
  { state: "Hawaii", abbr: "HI", avg: 203, rate: 43.18, deregulated: false },
  {
    state: "Connecticut",
    abbr: "CT",
    avg: 198,
    rate: 30.47,
    deregulated: true,
  },
  {
    state: "Massachusetts",
    abbr: "MA",
    avg: 187,
    rate: 28.58,
    deregulated: true,
  },
  { state: "Alaska", abbr: "AK", avg: 179, rate: 28.21, deregulated: false },
  {
    state: "New Hampshire",
    abbr: "NH",
    avg: 173,
    rate: 27.13,
    deregulated: true,
  },
  {
    state: "Rhode Island",
    abbr: "RI",
    avg: 168,
    rate: 27.02,
    deregulated: true,
  },
  { state: "California", abbr: "CA", avg: 165, rate: 28.4, deregulated: false },
  { state: "New York", abbr: "NY", avg: 162, rate: 23.49, deregulated: true },
  { state: "New Jersey", abbr: "NJ", avg: 158, rate: 19.75, deregulated: true },
  { state: "Maine", abbr: "ME", avg: 155, rate: 24.91, deregulated: true },
];

const STATE_DATA_LOWEST = [
  { state: "Utah", abbr: "UT", avg: 99, rate: 11.45, deregulated: false },
  { state: "Idaho", abbr: "ID", avg: 105, rate: 10.88, deregulated: false },
  {
    state: "Washington",
    abbr: "WA",
    avg: 108,
    rate: 11.19,
    deregulated: false,
  },
  { state: "Nevada", abbr: "NV", avg: 112, rate: 13.48, deregulated: false },
  { state: "Nebraska", abbr: "NE", avg: 113, rate: 12.35, deregulated: false },
  { state: "Oregon", abbr: "OR", avg: 115, rate: 12.76, deregulated: false },
  { state: "Montana", abbr: "MT", avg: 117, rate: 12.13, deregulated: false },
  { state: "Wyoming", abbr: "WY", avg: 118, rate: 11.92, deregulated: false },
  { state: "Colorado", abbr: "CO", avg: 119, rate: 14.1, deregulated: false },
  {
    state: "North Dakota",
    abbr: "ND",
    avg: 121,
    rate: 12.52,
    deregulated: false,
  },
];

const DEREGULATED_STATES = [
  "Texas",
  "Ohio",
  "Pennsylvania",
  "Illinois",
  "New York",
  "New Jersey",
  "Connecticut",
  "Massachusetts",
  "Maine",
  "New Hampshire",
  "Rhode Island",
  "Maryland",
  "Delaware",
  "Virginia",
];

function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

function howToJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to find out why your electric bill is high",
    description:
      "A step-by-step guide to diagnosing why your electric bill increased and what to do about it.",
    step: HOWTO_STEPS.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

function breadcrumbJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Guides",
        item: `${BASE_URL}/guides`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Why Is My Electric Bill So High?",
        item: `${BASE_URL}/guides/electric-bill-high`,
      },
    ],
  };
}

function TableOfContents() {
  const sections = [
    { id: "statistics", label: "2026 Statistics" },
    { id: "causes", label: "5 Reasons Your Bill Is High" },
    { id: "state-averages", label: "State-by-State Averages" },
    { id: "how-to-diagnose", label: "How to Diagnose Your Bill" },
    { id: "deregulated-states", label: "Compare Providers" },
    { id: "faq", label: "FAQ" },
  ];

  return (
    <nav
      data-testid="table-of-contents"
      aria-label="Table of contents"
      className="rounded-lg border border-[var(--border)] bg-[var(--secondary)] p-6 my-8"
    >
      <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--muted)] mb-3">
        In This Guide
      </h2>
      <ol className="space-y-2">
        {sections.map((section) => (
          <li key={section.id}>
            <Link
              href={`#${section.id}`}
              data-testid={`toc-${section.id}`}
              className="text-[var(--primary)] hover:underline text-sm"
            >
              {section.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function StateTable({
  data,
  testId,
  title,
}: {
  data: typeof STATE_DATA_HIGHEST;
  testId: string;
  title: string;
}) {
  return (
    <div data-testid={testId}>
      <h3 className="text-xl font-semibold text-[var(--foreground)] mb-4">
        {title}
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="text-left py-3 px-4 font-semibold text-[var(--foreground)]">
                State
              </th>
              <th className="text-right py-3 px-4 font-semibold text-[var(--foreground)]">
                Avg. Monthly Bill
              </th>
              <th className="text-right py-3 px-4 font-semibold text-[var(--foreground)]">
                Rate (cents/kWh)
              </th>
              <th className="text-center py-3 px-4 font-semibold text-[var(--foreground)]">
                Can Compare Providers?
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr
                key={row.abbr}
                className="border-b border-[var(--border)] hover:bg-[var(--secondary)] transition-colors"
              >
                <td className="py-3 px-4">
                  <Link
                    href={`/guides/${row.state.toLowerCase().replace(/\s+/g, "-")}`}
                    data-testid={`state-link-${row.abbr.toLowerCase()}`}
                    className="text-[var(--primary)] hover:underline"
                  >
                    {row.state}
                  </Link>
                </td>
                <td className="py-3 px-4 text-right font-medium text-[var(--foreground)]">
                  ${row.avg}/mo
                </td>
                <td className="py-3 px-4 text-right text-[var(--muted)]">
                  {row.rate.toFixed(2)}
                </td>
                <td className="py-3 px-4 text-center">
                  {row.deregulated ? (
                    <span className="text-[var(--success)] font-medium">
                      Yes
                    </span>
                  ) : (
                    <span className="text-[var(--muted)]">No</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function ElectricBillHighGuide() {
  return (
    <div data-testid="guide-electric-bill-high">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd()) }}
      />

      {/* Breadcrumb Navigation */}
      <nav
        data-testid="breadcrumb"
        aria-label="Breadcrumb"
        className="mx-auto max-w-4xl px-4 pt-6 sm:px-6 lg:px-8"
      >
        <ol className="flex items-center gap-2 text-sm text-[var(--muted)]">
          <li>
            <Link
              href="/"
              data-testid="breadcrumb-home"
              className="hover:text-[var(--foreground)] transition-colors"
            >
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <span className="text-[var(--foreground)]">Guides</span>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <span className="text-[var(--foreground)] font-medium">
              Why Is My Electric Bill So High?
            </span>
          </li>
        </ol>
      </nav>

      {/* Hero / H1 */}
      <header className="mx-auto max-w-4xl px-4 pt-8 pb-4 sm:px-6 lg:px-8">
        <h1
          data-testid="guide-title"
          className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--foreground)]"
        >
          Why Is My Electric Bill So High?{" "}
          <span className="text-[var(--primary)]">[2026 Guide]</span>
        </h1>
        <p
          data-testid="guide-subtitle"
          className="mt-4 text-lg text-[var(--muted)] max-w-3xl"
        >
          The average American household now pays{" "}
          <strong className="text-[var(--foreground)]">$163/month</strong> for
          electricity &mdash; up 35% since 2021. Here are the real reasons your
          bill keeps climbing, and what you can actually do about it.
        </p>
      </header>

      {/* Upload CTA - Primary */}
      <div className="mx-auto max-w-4xl px-4 pb-8 sm:px-6 lg:px-8">
        <div
          data-testid="cta-upload-section"
          className="rounded-lg border-2 border-[var(--primary)] bg-[var(--secondary)] p-6 flex flex-col sm:flex-row items-center gap-4"
        >
          <div className="flex-1">
            <p className="font-semibold text-[var(--foreground)]">
              Stop guessing &mdash; upload your bill and know for sure
            </p>
            <p className="text-sm text-[var(--muted)] mt-1">
              BillWatch scans your bill in seconds to find overcharges,
              anomalies, and savings opportunities.
            </p>
          </div>
          <Link
            href="/upload"
            data-testid="cta-upload-bill"
            className="rounded-lg bg-[var(--primary)] px-6 py-3 font-medium text-white hover:bg-[var(--primary-hover)] transition-colors whitespace-nowrap"
          >
            Upload Your Bill
          </Link>
        </div>
      </div>

      <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-16">
        <TableOfContents />

        {/* 2026 Statistics Section */}
        <section id="statistics" data-testid="statistics-section" className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            The Numbers: US Electric Bills in 2026
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div
              data-testid="stat-avg-bill"
              className="rounded-lg border border-[var(--border)] p-5 text-center"
            >
              <p className="text-3xl font-bold text-[var(--primary)]">$163</p>
              <p className="text-sm text-[var(--muted)] mt-1">
                Average monthly bill
              </p>
            </div>
            <div
              data-testid="stat-rate"
              className="rounded-lg border border-[var(--border)] p-5 text-center"
            >
              <p className="text-3xl font-bold text-[var(--primary)]">
                18.05&cent;
              </p>
              <p className="text-sm text-[var(--muted)] mt-1">
                Average rate per kWh
              </p>
            </div>
            <div
              data-testid="stat-increase"
              className="rounded-lg border border-[var(--border)] p-5 text-center"
            >
              <p className="text-3xl font-bold text-[var(--anomaly)]">+35%</p>
              <p className="text-sm text-[var(--muted)] mt-1">
                Increase since 2021
              </p>
            </div>
          </div>
          <p className="text-[var(--muted)] leading-relaxed">
            According to the U.S. Energy Information Administration (EIA), the
            average residential electricity rate hit{" "}
            <strong className="text-[var(--foreground)]">
              18.05 cents per kWh
            </strong>{" "}
            in 2026 &mdash; up 21% from 14.92 cents in 2022. Combined with
            rising consumption from electric vehicles, heat pumps, and home
            electronics, the average household electric bill now stands at{" "}
            <strong className="text-[var(--foreground)]">
              $163 per month
            </strong>
            , compared to $121 in 2021.
          </p>
        </section>

        {/* 5 Causes Section */}
        <section id="causes" data-testid="causes-section" className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            5 Reasons Your Electric Bill Is So High in 2026
          </h2>

          <div className="space-y-8">
            <div data-testid="cause-aging-grid">
              <h3 className="text-xl font-semibold text-[var(--foreground)] flex items-baseline gap-3">
                <span className="text-[var(--primary)] font-bold">1.</span>
                Aging Grid Infrastructure
              </h3>
              <p className="mt-2 text-[var(--muted)] leading-relaxed">
                Much of America&apos;s electrical grid was built in the 1960s
                and 1970s. Utilities are spending hundreds of billions to replace
                aging transformers, poles, and transmission lines before they
                fail. These capital costs are passed directly to ratepayers
                through &quot;infrastructure surcharges&quot; and base rate
                increases. In some states, grid modernization alone adds $15-25
                to monthly bills.
              </p>
            </div>

            <div data-testid="cause-ai-demand">
              <h3 className="text-xl font-semibold text-[var(--foreground)] flex items-baseline gap-3">
                <span className="text-[var(--primary)] font-bold">2.</span>
                AI Data Center Demand
              </h3>
              <p className="mt-2 text-[var(--muted)] leading-relaxed">
                The AI boom is consuming staggering amounts of electricity. Data
                centers used an estimated 4.4% of total US electricity in 2025,
                up from under 2% in 2022. A single large AI training run can
                consume as much electricity as 30,000 homes for a day. This
                surge tightens the grid, pushing wholesale electricity prices up
                in regions like Northern Virginia, central Texas, and the Pacific
                Northwest &mdash; and utilities pass those costs to all
                customers.
              </p>
            </div>

            <div data-testid="cause-fuel-prices">
              <h3 className="text-xl font-semibold text-[var(--foreground)] flex items-baseline gap-3">
                <span className="text-[var(--primary)] font-bold">3.</span>
                Fuel Price Whiplash
              </h3>
              <p className="mt-2 text-[var(--muted)] leading-relaxed">
                Natural gas generates about 40% of US electricity. Global LNG
                demand, pipeline constraints, and geopolitical disruptions create
                volatile fuel costs that swing quarter to quarter. When gas
                prices spike, your electric bill follows &mdash; often with a
                1-2 month delay as utilities adjust their fuel cost recovery
                charges. Coal plant retirements have reduced fuel diversity,
                making more regions dependent on gas price swings.
              </p>
            </div>

            <div data-testid="cause-extreme-weather">
              <h3 className="text-xl font-semibold text-[var(--foreground)] flex items-baseline gap-3">
                <span className="text-[var(--primary)] font-bold">4.</span>
                Extreme Weather Events
              </h3>
              <p className="mt-2 text-[var(--muted)] leading-relaxed">
                Hotter summers and colder winter storms drive record electricity
                consumption. Air conditioning alone accounts for 17% of US
                residential electricity use, and that share grows with each
                record-breaking heat wave. Extreme weather also damages grid
                infrastructure, requiring emergency repairs that get folded into
                rates. The 2025 summer saw 28 states set peak demand records.
              </p>
            </div>

            <div data-testid="cause-infrastructure-investment">
              <h3 className="text-xl font-semibold text-[var(--foreground)] flex items-baseline gap-3">
                <span className="text-[var(--primary)] font-bold">5.</span>
                Infrastructure Investment Recovery
              </h3>
              <p className="mt-2 text-[var(--muted)] leading-relaxed">
                Utilities are investing in renewable energy buildouts, battery
                storage, wildfire mitigation (especially in California), grid
                hardening against storms, and smart meter deployments. While
                these investments pay off long-term through cheaper energy and
                fewer outages, the upfront capital costs are recovered through
                rate increases over 20-30 year periods. Your bill today includes
                a share of infrastructure that won&apos;t be fully operational
                for years.
              </p>
            </div>
          </div>
        </section>

        {/* State Averages Section */}
        <section
          id="state-averages"
          data-testid="state-averages-section"
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">
            Average Electric Bill by State (2026)
          </h2>
          <p className="text-[var(--muted)] mb-6">
            Source: U.S. Energy Information Administration (EIA). States marked
            &quot;Yes&quot; under &quot;Can Compare Providers?&quot; have
            deregulated electricity markets where you can shop for a cheaper
            rate.
          </p>

          <div className="space-y-8">
            <StateTable
              data={STATE_DATA_HIGHEST}
              testId="table-highest-states"
              title="10 Most Expensive States"
            />
            <StateTable
              data={STATE_DATA_LOWEST}
              testId="table-lowest-states"
              title="10 Least Expensive States"
            />
          </div>
        </section>

        {/* How to Diagnose Section */}
        <section
          id="how-to-diagnose"
          data-testid="how-to-diagnose-section"
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            How to Find Out Why Your Electric Bill Is High
          </h2>
          <ol className="space-y-6">
            {HOWTO_STEPS.map((step, i) => (
              <li
                key={i}
                data-testid={`howto-step-${i + 1}`}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold text-sm">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--foreground)]">
                    {step.name}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--muted)] leading-relaxed">
                    {step.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Deregulated States CTA */}
        <section
          id="deregulated-states"
          data-testid="deregulated-states-section"
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
            Live in a Deregulated State? Compare Providers
          </h2>
          <p className="text-[var(--muted)] leading-relaxed mb-4">
            If you live in one of the {DEREGULATED_STATES.length} states with
            deregulated electricity markets, you can choose your electricity
            supplier. This means you&apos;re not locked into your utility&apos;s
            default rate &mdash; you can shop for a cheaper plan.
          </p>
          <div
            data-testid="deregulated-states-list"
            className="flex flex-wrap gap-2 mb-6"
          >
            {DEREGULATED_STATES.map((state) => (
              <span
                key={state}
                className="rounded-full bg-[var(--secondary)] border border-[var(--border)] px-3 py-1 text-sm text-[var(--foreground)]"
              >
                {state}
              </span>
            ))}
          </div>
          <p className="text-[var(--muted)] leading-relaxed mb-6">
            Upload your bill to BillWatch and we&apos;ll show you what
            competitive rates are available in your area.
          </p>

          {/* Texas provider comparison — largest deregulated market */}
          <ProviderComparison
            stateCode="TX"
            referrer="/guides/electric-bill-high"
          />
        </section>

        {/* FAQ Section */}
        <section id="faq" data-testid="faq-section" className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {FAQ_ITEMS.map((item, i) => (
              <div
                key={i}
                data-testid={`faq-item-${i}`}
                className="rounded-lg border border-[var(--border)] p-5"
              >
                <h3 className="font-semibold text-[var(--foreground)]">
                  {item.question}
                </h3>
                <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Upload CTA */}
        <section data-testid="cta-bottom-section" className="mt-12">
          <div className="rounded-lg bg-[var(--secondary)] border border-[var(--border)] p-8 text-center">
            <h2 className="text-2xl font-bold text-[var(--foreground)]">
              Ready to Find Out What&apos;s Driving Your Bill?
            </h2>
            <p className="mt-3 text-[var(--muted)] max-w-xl mx-auto">
              Upload your electric bill and BillWatch will analyze it in seconds
              &mdash; flagging anomalies, comparing you to similar households,
              and showing where your money is going.
            </p>
            <Link
              href="/upload"
              data-testid="cta-bottom-upload"
              className="mt-6 inline-block rounded-lg bg-[var(--primary)] px-8 py-3 font-medium text-white hover:bg-[var(--primary-hover)] transition-colors"
            >
              Upload Your Bill Now
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}
