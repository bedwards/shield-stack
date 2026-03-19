import type { Metadata } from "next";
import Link from "next/link";
import AffiliateLink from "@/components/AffiliateLink";

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://billwatch.pages.dev";

export const metadata: Metadata = {
  title:
    "Why Is My Electric Bill So High This Winter? [2026 Guide] | BillWatch",
  description:
    "Winter electric bills hit $250-$800+ in 2026 for many US households. Learn why heating costs spike, how to tell if your bill is normal or suspicious, and 8 ways to cut winter energy costs.",
  keywords: [
    "why is my electric bill so high this winter",
    "high winter electric bill",
    "winter electric bill 2026",
    "heating bill too high",
    "winter electricity costs",
    "reduce winter electric bill",
    "winter heating costs 2026",
    "electric bill spike winter",
  ],
  alternates: {
    canonical: `${BASE_URL}/guides/winter-electric-bill`,
  },
  openGraph: {
    type: "article",
    url: `${BASE_URL}/guides/winter-electric-bill`,
    siteName: "BillWatch",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const FAQ_ITEMS = [
  {
    question: "Why is my electric bill so high in winter?",
    answer:
      "Winter electric bills spike due to increased heating demand, shorter daylight hours requiring more lighting, holiday cooking and entertaining, and space heaters or supplemental heating. If you use electric heating (heat pump, baseboard, or furnace), your winter bill can be 2-3x your summer bill. Upload your bill to BillWatch to see if your increase is within the normal seasonal range for your area.",
  },
  {
    question: "How much should my electric bill go up in winter?",
    answer:
      "A 30-60% increase from your fall bill is typical for homes with electric heating. Bills exceeding double your average may indicate a problem — a failing heat pump, poor insulation, a stuck thermostat, or a rate increase. In 2026, the national average winter bill is $210-$250/month, but homes in the Northeast and Midwest often see $300-$500+.",
  },
  {
    question: "Is a $500 electric bill normal in winter?",
    answer:
      "It depends on your location, home size, and heating type. A $500 winter bill is common for larger homes (2,500+ sqft) in cold climates with electric heating. However, if your bill jumped from $150 to $500 without a change in habits, something may be wrong — check your heat pump, insulation, and rate plan. BillWatch can compare your bill to similar homes in your area.",
  },
  {
    question:
      "Why did my electric bill double in winter when I have a heat pump?",
    answer:
      "Heat pumps lose efficiency as temperatures drop below 30-35°F. When this happens, most systems activate 'emergency heat' (electric resistance strips) which costs 2-3x more to run. If your area experienced extended cold snaps, your heat pump likely ran on emergency heat for days or weeks. Check your thermostat — if it shows 'EM HEAT' or 'AUX HEAT' was active, that explains the spike.",
  },
];

const WINTER_CAUSES = [
  {
    id: "heating-demand",
    title: "Heating Demand Surge",
    description:
      "Electric heating (heat pumps, baseboard heaters, electric furnaces) is the #1 driver of winter bill spikes. Every degree you set your thermostat above 68°F adds roughly 3% to your heating costs. In 2026, heating degree days ran 12% above the 30-year average in the Northeast and Midwest, meaning furnaces and heat pumps ran significantly longer than normal winters.",
  },
  {
    id: "heat-pump-emergency",
    title: "Heat Pump Emergency/Auxiliary Heat",
    description:
      "Heat pumps are efficient above 35°F but switch to electric resistance 'emergency heat' in extreme cold — consuming 2-3x more electricity. Winter 2025-2026 saw extended sub-freezing stretches across the Southeast and Mid-Atlantic where heat pumps are common. If your thermostat showed 'EM HEAT' or 'AUX' for days at a time, that is likely driving a massive bill increase.",
  },
  {
    id: "insulation-gaps",
    title: "Poor Insulation and Air Leaks",
    description:
      "Drafty windows, unsealed doors, and inadequate attic insulation force your heating system to work overtime. The Department of Energy estimates that air leaks account for 25-30% of heating energy loss in a typical home. Older homes (pre-1980) are especially vulnerable. A home energy audit ($200-400, often subsidized by utilities) can identify where heat is escaping.",
  },
  {
    id: "rate-increases",
    title: "Winter Rate Increases",
    description:
      "Many utilities implement seasonal rate adjustments, with higher per-kWh prices in winter when demand peaks. Some areas saw rate increases of 15-25% effective January 2026 due to natural gas price spikes and infrastructure investments. Check your bill's per-kWh rate against previous months — if the rate went up, your usage didn't necessarily change.",
  },
  {
    id: "shorter-days",
    title: "Shorter Days and Holiday Usage",
    description:
      "Winter days are 4-6 hours shorter than summer, meaning more hours of artificial lighting. Add holiday cooking, decorations (outdoor lights can add $20-50/month), and guests visiting, and December-January bills carry extra load beyond heating alone. Space heaters in guest rooms or home offices are silent bill inflators — a single 1,500W space heater running 8 hours/day costs $35-45/month.",
  },
  {
    id: "thermostat-settings",
    title: "Thermostat Misconfiguration",
    description:
      "A thermostat set too high, a schedule that heats the home while you are away, or a smart thermostat that lost its programmed schedule after a power outage can all cause unnecessary heating. The ideal winter setting is 68°F when home and 60-62°F when sleeping or away. Every degree above 68°F adds approximately 3% to your heating bill.",
  },
];

const WINTER_TIPS = [
  {
    title: "Set thermostat to 68°F (day) / 62°F (night)",
    description:
      "The DOE recommends 68°F when home and awake. Lowering by 7-10°F for 8 hours/day saves up to 10% on annual heating costs.",
    savings: "Up to 10%",
    testId: "tip-thermostat",
  },
  {
    title: "Seal air leaks around windows and doors",
    description:
      "Apply weatherstripping ($5-15/door) and caulk around window frames ($3-5/window). Saves $100-200/year for a typical home.",
    savings: "$100-200/yr",
    testId: "tip-seal-leaks",
  },
  {
    title: "Reverse ceiling fan direction",
    description:
      "Set ceiling fans to clockwise (low speed) in winter. This pushes warm air pooled at the ceiling back down, reducing heating demand by up to 15%.",
    savings: "Up to 15%",
    testId: "tip-ceiling-fan",
  },
  {
    title: "Check your heat pump's emergency heat indicator",
    description:
      "If 'EM HEAT' or 'AUX' shows on your thermostat frequently, your heat pump may need servicing. A properly functioning heat pump should rarely use emergency heat above 30°F.",
    savings: "50-60% vs EM heat",
    testId: "tip-heat-pump",
  },
  {
    title: "Replace or clean your HVAC filter",
    description:
      "A clogged filter forces your system to work harder, using up to 15% more energy. Replace filters every 1-3 months during heating season ($5-15 each).",
    savings: "Up to 15%",
    testId: "tip-hvac-filter",
  },
  {
    title: "Use a smart thermostat",
    description:
      "Smart thermostats learn your schedule and adjust automatically. They prevent heating an empty home and optimize overnight temperatures.",
    savings: "10-15%",
    testId: "tip-smart-thermostat",
  },
  {
    title: "Add attic insulation",
    description:
      "If you can see floor joists in your attic, you need more insulation. Adding insulation to R-38 costs $500-1,500 and saves $200-500/year on heating.",
    savings: "$200-500/yr",
    testId: "tip-insulation",
  },
  {
    title: "Eliminate space heater dependency",
    description:
      "A single 1,500W space heater costs $35-45/month running 8 hrs/day. If you are using space heaters to supplement, your main heating system may need repair.",
    savings: "$35-45/mo each",
    testId: "tip-space-heaters",
  },
];

const REGIONAL_DATA = [
  {
    region: "Northeast",
    avgWinterBill: "$310-$450",
    topCause: "Fuel oil / natural gas price spikes + older housing stock",
  },
  {
    region: "Midwest",
    avgWinterBill: "$250-$380",
    topCause: "Extended sub-zero temps + electric furnace reliance",
  },
  {
    region: "Southeast",
    avgWinterBill: "$200-$350",
    topCause: "Heat pump emergency mode during cold snaps",
  },
  {
    region: "Mountain West",
    avgWinterBill: "$180-$300",
    topCause: "High elevation + poor insulation in older homes",
  },
  {
    region: "Pacific Northwest",
    avgWinterBill: "$150-$250",
    topCause: "Electric heating in mild-but-damp climate",
  },
  {
    region: "Southwest",
    avgWinterBill: "$130-$220",
    topCause: "Overnight heating in desert climates (40°F+ swings)",
  },
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
        name: "Winter Electric Bill Guide",
        item: `${BASE_URL}/guides/winter-electric-bill`,
      },
    ],
  };
}

function TableOfContents() {
  const sections = [
    { id: "winter-stats", label: "2026 Winter Numbers" },
    { id: "causes", label: "Why Winter Bills Spike" },
    { id: "regional", label: "Regional Breakdown" },
    { id: "tips", label: "8 Ways to Cut Winter Costs" },
    { id: "normal-vs-suspicious", label: "Normal vs. Suspicious" },
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

export default function WinterElectricBillGuide() {
  return (
    <div data-testid="guide-winter-electric-bill">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd()),
        }}
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
            <Link
              href="/guides/electric-bill-high"
              data-testid="breadcrumb-guides"
              className="hover:text-[var(--foreground)] transition-colors"
            >
              Guides
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <span className="text-[var(--foreground)] font-medium">
              Winter Electric Bill
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
          Why Is My Electric Bill So High This Winter?{" "}
          <span className="text-[var(--primary)]">[2026 Guide]</span>
        </h1>
        <p
          data-testid="guide-subtitle"
          className="mt-4 text-lg text-[var(--muted)] max-w-3xl"
        >
          Winter 2025-2026 brought some of the highest electric bills in US
          history. Households across the Northeast and Midwest reported bills of{" "}
          <strong className="text-[var(--anomaly)]">$500-$800+</strong>, with
          Pittsburgh-area consumers hitting{" "}
          <strong className="text-[var(--foreground)]">$800+</strong> and
          Virginia bills{" "}
          <strong className="text-[var(--foreground)]">
            doubling year-over-year
          </strong>
          . Here&apos;s what&apos;s driving winter bill spikes and how to tell
          if yours is seasonal or suspicious.
        </p>
      </header>

      {/* Primary Upload CTA */}
      <div className="mx-auto max-w-4xl px-4 pb-8 sm:px-6 lg:px-8">
        <div
          data-testid="cta-upload-section"
          className="rounded-lg border-2 border-[var(--primary)] bg-[var(--secondary)] p-6 flex flex-col sm:flex-row items-center gap-4"
        >
          <div className="flex-1">
            <p className="font-semibold text-[var(--foreground)]">
              Upload your bill to see if it&apos;s seasonal or suspicious
            </p>
            <p className="text-sm text-[var(--muted)] mt-1">
              BillWatch compares your winter bill to your history and similar
              homes in your area &mdash; instantly flagging anything unusual.
            </p>
          </div>
          <Link
            href="/upload"
            data-testid="cta-upload-seasonal"
            className="rounded-lg bg-[var(--primary)] px-6 py-3 font-medium text-white hover:bg-[var(--primary-hover)] transition-colors whitespace-nowrap"
          >
            Upload Your Bill
          </Link>
        </div>
      </div>

      <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-16">
        <TableOfContents />

        {/* Winter 2026 Stats Section */}
        <section
          id="winter-stats"
          data-testid="winter-stats-section"
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            Winter 2025-2026: The Numbers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div
              data-testid="stat-winter-avg"
              className="rounded-lg border border-[var(--border)] p-5 text-center"
            >
              <p className="text-3xl font-bold text-[var(--anomaly)]">
                $210-250
              </p>
              <p className="text-sm text-[var(--muted)] mt-1">
                National avg winter monthly bill
              </p>
            </div>
            <div
              data-testid="stat-heating-pct"
              className="rounded-lg border border-[var(--border)] p-5 text-center"
            >
              <p className="text-3xl font-bold text-[var(--primary)]">45%</p>
              <p className="text-sm text-[var(--muted)] mt-1">
                Of winter bill goes to heating
              </p>
            </div>
            <div
              data-testid="stat-heating-degree-days"
              className="rounded-lg border border-[var(--border)] p-5 text-center"
            >
              <p className="text-3xl font-bold text-[var(--anomaly)]">+12%</p>
              <p className="text-sm text-[var(--muted)] mt-1">
                Heating degree days above 30-yr avg
              </p>
            </div>
            <div
              data-testid="stat-em-heat-cost"
              className="rounded-lg border border-[var(--border)] p-5 text-center"
            >
              <p className="text-3xl font-bold text-[var(--anomaly)]">2-3x</p>
              <p className="text-sm text-[var(--muted)] mt-1">
                Cost of emergency heat vs normal
              </p>
            </div>
          </div>
          <p className="text-[var(--muted)] leading-relaxed">
            Winter 2025-2026 was colder than average across much of the US.
            Heating degree days ran{" "}
            <strong className="text-[var(--foreground)]">
              12% above the 30-year average
            </strong>{" "}
            in the Northeast and Midwest, meaning furnaces and heat pumps ran
            significantly longer than in typical winters. Combined with rate
            increases averaging{" "}
            <strong className="text-[var(--foreground)]">8-15%</strong> across
            major utilities, winter bills hit record levels for millions of
            households.
          </p>
        </section>

        {/* Causes Section */}
        <section id="causes" data-testid="causes-section" className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            6 Reasons Your Winter Electric Bill Spiked
          </h2>
          <div className="space-y-8">
            {WINTER_CAUSES.map((cause, i) => (
              <div key={cause.id} data-testid={`cause-${cause.id}`}>
                <h3 className="text-xl font-semibold text-[var(--foreground)] flex items-baseline gap-3">
                  <span className="text-[var(--primary)] font-bold">
                    {i + 1}.
                  </span>
                  {cause.title}
                </h3>
                <p className="mt-2 text-[var(--muted)] leading-relaxed">
                  {cause.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Regional Breakdown Section */}
        <section
          id="regional"
          data-testid="regional-section"
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">
            Winter Bills by Region (2026)
          </h2>
          <p className="text-[var(--muted)] mb-6">
            Winter bill impact varies dramatically by region. These ranges
            reflect typical homes with electric heating during the 2025-2026
            winter season.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left py-3 px-4 font-semibold text-[var(--foreground)]">
                    Region
                  </th>
                  <th className="text-right py-3 px-4 font-semibold text-[var(--foreground)]">
                    Avg. Winter Bill
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-[var(--foreground)]">
                    Top Cost Driver
                  </th>
                </tr>
              </thead>
              <tbody>
                {REGIONAL_DATA.map((row) => (
                  <tr
                    key={row.region}
                    data-testid={`region-${row.region.toLowerCase().replace(/\s+/g, "-")}`}
                    className="border-b border-[var(--border)] hover:bg-[var(--secondary)] transition-colors"
                  >
                    <td className="py-3 px-4 font-medium text-[var(--foreground)]">
                      {row.region}
                    </td>
                    <td className="py-3 px-4 text-right font-medium text-[var(--primary)]">
                      {row.avgWinterBill}
                    </td>
                    <td className="py-3 px-4 text-[var(--muted)]">
                      {row.topCause}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Tips Section */}
        <section id="tips" data-testid="tips-section" className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            8 Ways to Cut Your Winter Electric Bill
          </h2>
          <div className="space-y-4">
            {WINTER_TIPS.map((tip, i) => (
              <div
                key={tip.testId}
                data-testid={tip.testId}
                className="rounded-lg border border-[var(--border)] p-5 flex gap-4"
              >
                <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--primary)] text-white font-bold text-sm">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-semibold text-[var(--foreground)]">
                      {tip.title}
                    </h3>
                    <span
                      data-testid={`${tip.testId}-savings`}
                      className="text-xs font-medium text-[var(--success)] bg-[var(--secondary)] rounded-full px-3 py-1 whitespace-nowrap"
                    >
                      Saves {tip.savings}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-[var(--muted)] leading-relaxed">
                    {tip.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Affiliate recommendations for energy efficiency products */}
          <div
            data-testid="affiliate-recommendations"
            className="mt-8 rounded-lg border border-[var(--border)] bg-[var(--secondary)] p-6"
          >
            <h3 className="font-semibold text-[var(--foreground)] mb-3">
              Recommended Energy-Saving Products
            </h3>
            <p className="text-sm text-[var(--muted)] mb-4">
              These products can help reduce your winter heating costs. Links
              support BillWatch at no extra cost to you.
            </p>
            <div className="flex flex-wrap gap-3">
              <AffiliateLink
                slug="smart-thermostat"
                referrer="/guides/winter-electric-bill"
                className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-sm font-medium text-[var(--primary)] hover:border-[var(--primary)] transition-colors"
              >
                Smart Thermostats
              </AffiliateLink>
              <AffiliateLink
                slug="weatherstripping"
                referrer="/guides/winter-electric-bill"
                className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-sm font-medium text-[var(--primary)] hover:border-[var(--primary)] transition-colors"
              >
                Weatherstripping Kits
              </AffiliateLink>
              <AffiliateLink
                slug="led-bulbs"
                referrer="/guides/winter-electric-bill"
                className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-sm font-medium text-[var(--primary)] hover:border-[var(--primary)] transition-colors"
              >
                LED Bulb Packs
              </AffiliateLink>
              <AffiliateLink
                slug="attic-insulation"
                referrer="/guides/winter-electric-bill"
                className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-sm font-medium text-[var(--primary)] hover:border-[var(--primary)] transition-colors"
              >
                Attic Insulation
              </AffiliateLink>
            </div>
          </div>
        </section>

        {/* Normal vs Suspicious Section */}
        <section
          id="normal-vs-suspicious"
          data-testid="normal-vs-suspicious-section"
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            Is Your Winter Bill Normal or Suspicious?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div
              data-testid="normal-signs"
              className="rounded-lg border border-[var(--success)] p-6"
            >
              <h3 className="font-semibold text-[var(--success)] mb-3">
                Likely Normal Seasonal Increase
              </h3>
              <ul className="space-y-2 text-sm text-[var(--muted)]">
                <li className="flex gap-2">
                  <span className="text-[var(--success)]">&#10003;</span>
                  Bill increased 30-60% from fall
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--success)]">&#10003;</span>
                  kWh usage rose proportionally to the bill amount
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--success)]">&#10003;</span>
                  Your area had colder-than-normal weather
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--success)]">&#10003;</span>
                  Per-kWh rate stayed the same as last month
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--success)]">&#10003;</span>
                  Similar to the same month last year
                </li>
              </ul>
            </div>
            <div
              data-testid="suspicious-signs"
              className="rounded-lg border border-[var(--anomaly)] p-6"
            >
              <h3 className="font-semibold text-[var(--anomaly)] mb-3">
                Possibly Suspicious — Investigate
              </h3>
              <ul className="space-y-2 text-sm text-[var(--muted)]">
                <li className="flex gap-2">
                  <span className="text-[var(--anomaly)]">&#9888;</span>
                  Bill doubled or tripled with no habit change
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--anomaly)]">&#9888;</span>
                  kWh usage jumped but rate also increased
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--anomaly)]">&#9888;</span>
                  Bill is much higher than the same month last year
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--anomaly)]">&#9888;</span>
                  Meter reading shows &quot;estimated&quot; (E)
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--anomaly)]">&#9888;</span>
                  Billing period covers more than 30 days
                </li>
              </ul>
            </div>
          </div>
          <p className="mt-4 text-sm text-[var(--muted)]">
            Not sure which category your bill falls into?{" "}
            <Link
              href="/upload"
              data-testid="link-upload-compare"
              className="text-[var(--primary)] hover:underline"
            >
              Upload it to BillWatch
            </Link>{" "}
            and we&apos;ll compare it to your history and similar homes
            automatically.
          </p>
        </section>

        {/* Related Guides Section */}
        <section data-testid="related-guides-section" className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
            Related Guides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/guides/electric-bill-high"
              data-testid="link-electric-bill-high"
              className="rounded-lg border border-[var(--border)] p-5 hover:border-[var(--primary)] transition-colors block"
            >
              <h3 className="font-semibold text-[var(--primary)]">
                Why Is My Electric Bill So High? [2026 Guide]
              </h3>
              <p className="mt-1 text-sm text-[var(--muted)]">
                The complete guide to rising electric bills — causes,
                state-by-state averages, and how to reduce your costs year-round.
              </p>
            </Link>
            <Link
              href="/guides/summer-electric-bill"
              data-testid="link-summer-guide"
              className="rounded-lg border border-[var(--border)] p-5 hover:border-[var(--primary)] transition-colors block"
            >
              <h3 className="font-semibold text-[var(--primary)]">
                Summer Electric Bill Guide [2026]
              </h3>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Air conditioning costs, peak pricing, and how to keep your
                summer electric bill under control.
              </p>
            </Link>
          </div>
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
              Is Your Winter Bill Normal?
            </h2>
            <p className="mt-3 text-[var(--muted)] max-w-xl mx-auto">
              Upload your electric bill and BillWatch will instantly compare it
              to your history, seasonal averages, and similar homes &mdash;
              telling you if it&apos;s a normal winter spike or something worth
              investigating.
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
