import type { Metadata } from "next";
import Link from "next/link";
import AffiliateLink from "@/components/AffiliateLink";

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://billwatch.pages.dev";

export const metadata: Metadata = {
  title:
    "Why Is My Electric Bill So High This Summer? [2026 Guide] | BillWatch",
  description:
    "Summer AC bills hit $300-$600+ in 2026 for many US households. Learn why cooling costs spike, peak pricing traps, and 8 ways to lower your summer electric bill.",
  keywords: [
    "why is my electric bill so high this summer",
    "high summer electric bill",
    "summer electric bill 2026",
    "air conditioning bill too high",
    "summer electricity costs",
    "reduce summer electric bill",
    "summer cooling costs 2026",
    "electric bill spike summer",
    "peak pricing electric bill",
  ],
  alternates: {
    canonical: `${BASE_URL}/guides/summer-electric-bill`,
  },
  openGraph: {
    type: "article",
    url: `${BASE_URL}/guides/summer-electric-bill`,
    siteName: "BillWatch",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const FAQ_ITEMS = [
  {
    question: "Why is my electric bill so high in summer?",
    answer:
      "Air conditioning is the #1 driver of summer electric bills, accounting for up to 50% of total summer electricity use. Combined with peak pricing (rates 2-3x higher during afternoon hours in some markets), longer daylight hours don't offset the massive cooling demand. In 2026, record heat waves across the South and West pushed AC systems to run 14-18 hours/day in many areas.",
  },
  {
    question: "How much does AC add to my electric bill?",
    answer:
      "A central AC system running during a typical summer month adds $100-$250 to your bill depending on your climate, home size, and system efficiency. A 3-ton central AC unit uses about 3,000 watts per hour. Running 8 hours/day at 18 cents/kWh costs approximately $130/month. In extreme heat where AC runs 12-16 hours/day, costs can reach $200-$400/month for AC alone.",
  },
  {
    question: "What is peak pricing and is it raising my summer bill?",
    answer:
      "Peak pricing (also called time-of-use or TOU rates) charges more for electricity during high-demand hours, typically 2-7 PM on weekdays in summer. Peak rates can be 2-3x the off-peak rate. If you run AC, laundry, and cooking during peak hours, you pay premium prices. Check your bill for 'peak' vs 'off-peak' charges. Shifting heavy usage to before 2 PM or after 7 PM can save 20-30% on summer bills.",
  },
  {
    question: "Is a $400 electric bill normal in summer?",
    answer:
      "In hot climates (Texas, Arizona, Florida, Georgia), a $400 summer bill is common for a 2,000+ sqft home with central AC. The national average summer bill in 2026 is $230-$280. If your bill exceeds double your spring bill without a change in habits, investigate your AC system efficiency, thermostat settings, and whether you were moved to a higher rate plan. Upload your bill to BillWatch for an instant comparison.",
  },
];

const SUMMER_CAUSES = [
  {
    id: "ac-demand",
    title: "Air Conditioning Demand",
    description:
      "Air conditioning accounts for up to 50% of summer residential electricity use. A central AC system uses 3,000-5,000 watts per hour — the single largest load in most homes. In 2026, 28 states set new peak electricity demand records during summer heat waves. When temperatures stay above 95°F for multiple days, AC systems run nearly continuously, and your bill reflects every hour.",
  },
  {
    id: "peak-pricing",
    title: "Peak/Time-of-Use Pricing Traps",
    description:
      "Many utilities charge 2-3x higher rates during peak hours (typically 2-7 PM weekdays) when AC demand strains the grid. If you are on a time-of-use plan and running AC, cooking, and laundry during peak hours, you are paying premium rates for your heaviest usage. Some utilities automatically enrolled customers in TOU plans — check your rate schedule.",
  },
  {
    id: "aging-ac",
    title: "Aging or Inefficient AC System",
    description:
      "AC systems lose 5-10% efficiency per year without maintenance. A 15-year-old system may use 30-50% more electricity than a modern unit for the same cooling output. Low refrigerant, dirty coils, a failing compressor, or a clogged condensate drain all force the system to work harder. If your AC runs constantly but your home doesn't cool down, your system needs service.",
  },
  {
    id: "heat-gain",
    title: "Solar Heat Gain Through Windows",
    description:
      "South- and west-facing windows can add 2-5°F to indoor temperatures during afternoon sun. Without adequate window treatments, your AC fights against continuous solar heat gain. This is especially pronounced in homes with single-pane or older double-pane windows. Blackout curtains or exterior shading can reduce solar heat gain by 40-70%.",
  },
  {
    id: "pool-pump",
    title: "Pool Equipment and Outdoor Loads",
    description:
      "Pool pumps are silent bill inflators — a standard 1.5 HP pool pump running 8-12 hours/day costs $80-$120/month. Add pool heaters, hot tubs, landscape lighting, and outdoor entertainment setups, and summer outdoor loads can add $150-$250/month to your bill. Variable-speed pool pumps use 75% less electricity than single-speed models.",
  },
  {
    id: "humidity",
    title: "High Humidity Forces AC Overtime",
    description:
      "Your AC system dehumidifies as it cools. In humid climates (Southeast, Gulf Coast, Mid-Atlantic), the system runs longer because it has to remove moisture before it can effectively cool the air. A relative humidity above 60% indoors means your AC is struggling. A standalone dehumidifier ($200-$400) can reduce AC runtime by 20-30% in humid climates.",
  },
];

const SUMMER_TIPS = [
  {
    title: "Set thermostat to 78°F when home, higher when away",
    description:
      "The DOE recommends 78°F when home in summer. Every degree below 78°F adds 3-5% to cooling costs. Set to 85°F when away for 4+ hours.",
    savings: "Up to 15%",
    testId: "tip-thermostat",
  },
  {
    title: "Shift heavy usage to off-peak hours",
    description:
      "Run dishwasher, laundry, and oven before 2 PM or after 7 PM. On time-of-use plans, this alone can cut your bill by 20-30%.",
    savings: "20-30%",
    testId: "tip-peak-shift",
  },
  {
    title: "Close blinds on south and west windows",
    description:
      "Blackout curtains or reflective film on sun-facing windows can reduce solar heat gain by 40-70%, significantly reducing AC load.",
    savings: "Up to 10%",
    testId: "tip-window-treatments",
  },
  {
    title: "Service your AC before summer",
    description:
      "Annual AC maintenance ($75-$150) ensures optimal efficiency. Technicians check refrigerant levels, clean coils, and verify airflow. A well-maintained system uses 15-20% less energy.",
    savings: "15-20%",
    testId: "tip-ac-service",
  },
  {
    title: "Use ceiling fans to feel 4°F cooler",
    description:
      "Ceiling fans cost pennies per hour to run and create a wind-chill effect that lets you set the thermostat 4°F higher without losing comfort.",
    savings: "4-8%",
    testId: "tip-ceiling-fans",
  },
  {
    title: "Upgrade to a variable-speed pool pump",
    description:
      "Variable-speed pool pumps use 75% less electricity than single-speed models. If your pool pump runs 8+ hours/day, upgrading pays for itself in 1-2 summers.",
    savings: "75% pump cost",
    testId: "tip-pool-pump",
  },
  {
    title: "Cook outside or use microwave",
    description:
      "Ovens add 3-5°F to kitchen temperature, forcing your AC to work harder. Grilling outside, using a microwave, or cooking during cooler hours reduces indoor heat gain.",
    savings: "$15-25/mo",
    testId: "tip-cooking",
  },
  {
    title: "Check for duct leaks",
    description:
      "Leaky ductwork in attics or crawlspaces can waste 20-30% of cooled air before it reaches your rooms. Duct sealing ($300-$500) often pays for itself in one summer.",
    savings: "20-30%",
    testId: "tip-duct-leaks",
  },
];

const REGIONAL_DATA = [
  {
    region: "Texas",
    avgSummerBill: "$350-$500",
    topCause: "Extreme heat (100°F+ days) + deregulated rate volatility",
  },
  {
    region: "Southeast (FL, GA, LA)",
    avgSummerBill: "$280-$420",
    topCause: "Humidity forces AC overtime + long cooling season (Apr-Oct)",
  },
  {
    region: "Southwest (AZ, NV)",
    avgSummerBill: "$300-$450",
    topCause: "110°F+ heat waves + peak pricing during afternoon hours",
  },
  {
    region: "California",
    avgSummerBill: "$250-$400",
    topCause: "TOU pricing + wildfire-related grid surcharges",
  },
  {
    region: "Mid-Atlantic",
    avgSummerBill: "$200-$320",
    topCause: "Humidity + aging housing stock with poor insulation",
  },
  {
    region: "Midwest",
    avgSummerBill: "$180-$280",
    topCause: "Heat/humidity combo + older AC systems",
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
        name: "Summer Electric Bill Guide",
        item: `${BASE_URL}/guides/summer-electric-bill`,
      },
    ],
  };
}

function TableOfContents() {
  const sections = [
    { id: "summer-stats", label: "2026 Summer Numbers" },
    { id: "causes", label: "Why Summer Bills Spike" },
    { id: "regional", label: "Regional Breakdown" },
    { id: "tips", label: "8 Ways to Cut Summer Costs" },
    { id: "peak-pricing-explained", label: "Peak Pricing Explained" },
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

export default function SummerElectricBillGuide() {
  return (
    <div data-testid="guide-summer-electric-bill">
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
              Summer Electric Bill
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
          Why Is My Electric Bill So High This Summer?{" "}
          <span className="text-[var(--primary)]">[2026 Guide]</span>
        </h1>
        <p
          data-testid="guide-subtitle"
          className="mt-4 text-lg text-[var(--muted)] max-w-3xl"
        >
          Summer 2026 is shaping up to shatter records. With{" "}
          <strong className="text-[var(--foreground)]">
            28 states setting new peak demand records
          </strong>{" "}
          in 2025, air conditioning costs are climbing fast. Texas households
          reported bills of{" "}
          <strong className="text-[var(--anomaly)]">$500+</strong>, and peak
          pricing is hitting consumers who don&apos;t know they&apos;re on
          time-of-use plans. Here&apos;s what&apos;s driving your summer bill
          and how to fight back.
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
              BillWatch compares your summer bill to your history and similar
              homes &mdash; and flags peak pricing traps you might not know
              about.
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

        {/* Summer 2026 Stats Section */}
        <section
          id="summer-stats"
          data-testid="summer-stats-section"
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            Summer 2026: The Numbers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div
              data-testid="stat-summer-avg"
              className="rounded-lg border border-[var(--border)] p-5 text-center"
            >
              <p className="text-3xl font-bold text-[var(--anomaly)]">
                $230-280
              </p>
              <p className="text-sm text-[var(--muted)] mt-1">
                National avg summer monthly bill
              </p>
            </div>
            <div
              data-testid="stat-ac-share"
              className="rounded-lg border border-[var(--border)] p-5 text-center"
            >
              <p className="text-3xl font-bold text-[var(--primary)]">50%</p>
              <p className="text-sm text-[var(--muted)] mt-1">
                Of summer bill goes to AC
              </p>
            </div>
            <div
              data-testid="stat-peak-records"
              className="rounded-lg border border-[var(--border)] p-5 text-center"
            >
              <p className="text-3xl font-bold text-[var(--anomaly)]">28</p>
              <p className="text-sm text-[var(--muted)] mt-1">
                States set new peak demand records
              </p>
            </div>
            <div
              data-testid="stat-peak-multiplier"
              className="rounded-lg border border-[var(--border)] p-5 text-center"
            >
              <p className="text-3xl font-bold text-[var(--anomaly)]">2-3x</p>
              <p className="text-sm text-[var(--muted)] mt-1">
                Peak vs off-peak rate multiplier
              </p>
            </div>
          </div>
          <p className="text-[var(--muted)] leading-relaxed">
            Summer electricity demand is surging nationwide. Air conditioning
            accounts for{" "}
            <strong className="text-[var(--foreground)]">
              up to 50% of residential electricity use
            </strong>{" "}
            during peak summer months, and the growth of time-of-use pricing
            means many consumers are unknowingly paying{" "}
            <strong className="text-[var(--foreground)]">
              2-3x the standard rate
            </strong>{" "}
            during afternoon peak hours. In hot-climate states like Texas,
            Arizona, and Florida, summer bills routinely exceed{" "}
            <strong className="text-[var(--foreground)]">
              $350-$500/month
            </strong>
            .
          </p>
        </section>

        {/* Causes Section */}
        <section id="causes" data-testid="causes-section" className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            6 Reasons Your Summer Electric Bill Spiked
          </h2>
          <div className="space-y-8">
            {SUMMER_CAUSES.map((cause, i) => (
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
            Summer Bills by Region (2026)
          </h2>
          <p className="text-[var(--muted)] mb-6">
            Summer bill impact varies dramatically by region. These ranges
            reflect typical homes with central AC during the 2026 summer season.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left py-3 px-4 font-semibold text-[var(--foreground)]">
                    Region
                  </th>
                  <th className="text-right py-3 px-4 font-semibold text-[var(--foreground)]">
                    Avg. Summer Bill
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
                    data-testid={`region-${row.region.toLowerCase().replace(/[\s(),]+/g, "-").replace(/-+$/, "")}`}
                    className="border-b border-[var(--border)] hover:bg-[var(--secondary)] transition-colors"
                  >
                    <td className="py-3 px-4 font-medium text-[var(--foreground)]">
                      {row.region}
                    </td>
                    <td className="py-3 px-4 text-right font-medium text-[var(--primary)]">
                      {row.avgSummerBill}
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
            8 Ways to Cut Your Summer Electric Bill
          </h2>
          <div className="space-y-4">
            {SUMMER_TIPS.map((tip, i) => (
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

          {/* Affiliate recommendations */}
          <div
            data-testid="affiliate-recommendations"
            className="mt-8 rounded-lg border border-[var(--border)] bg-[var(--secondary)] p-6"
          >
            <h3 className="font-semibold text-[var(--foreground)] mb-3">
              Recommended Energy-Saving Products
            </h3>
            <p className="text-sm text-[var(--muted)] mb-4">
              These products can help reduce your summer cooling costs. Links
              support BillWatch at no extra cost to you.
            </p>
            <div className="flex flex-wrap gap-3">
              <AffiliateLink
                slug="smart-thermostat"
                referrer="/guides/summer-electric-bill"
                className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-sm font-medium text-[var(--primary)] hover:border-[var(--primary)] transition-colors"
              >
                Smart Thermostats
              </AffiliateLink>
              <AffiliateLink
                slug="blackout-curtains"
                referrer="/guides/summer-electric-bill"
                className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-sm font-medium text-[var(--primary)] hover:border-[var(--primary)] transition-colors"
              >
                Blackout Curtains
              </AffiliateLink>
              <AffiliateLink
                slug="window-film"
                referrer="/guides/summer-electric-bill"
                className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-sm font-medium text-[var(--primary)] hover:border-[var(--primary)] transition-colors"
              >
                Window Reflective Film
              </AffiliateLink>
              <AffiliateLink
                slug="ceiling-fan"
                referrer="/guides/summer-electric-bill"
                className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-sm font-medium text-[var(--primary)] hover:border-[var(--primary)] transition-colors"
              >
                Energy-Efficient Ceiling Fans
              </AffiliateLink>
            </div>
          </div>
        </section>

        {/* Peak Pricing Explained Section */}
        <section
          id="peak-pricing-explained"
          data-testid="peak-pricing-section"
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            Peak Pricing: The Hidden Summer Bill Inflator
          </h2>
          <div className="rounded-lg border border-[var(--border)] p-6 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div data-testid="peak-off-peak" className="text-center">
                <p className="text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
                  Off-Peak (9PM-2PM)
                </p>
                <p className="text-2xl font-bold text-[var(--success)] mt-1">
                  10-14&cent;/kWh
                </p>
              </div>
              <div data-testid="peak-shoulder" className="text-center">
                <p className="text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
                  Shoulder (12-2PM, 7-9PM)
                </p>
                <p className="text-2xl font-bold text-[var(--warning)] mt-1">
                  18-22&cent;/kWh
                </p>
              </div>
              <div data-testid="peak-on-peak" className="text-center">
                <p className="text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
                  Peak (2-7PM weekdays)
                </p>
                <p className="text-2xl font-bold text-[var(--anomaly)] mt-1">
                  30-45&cent;/kWh
                </p>
              </div>
            </div>
          </div>
          <p className="text-[var(--muted)] leading-relaxed mb-4">
            Time-of-use (TOU) rates are spreading rapidly. California, Arizona,
            and many utilities in Texas, Illinois, and the Southeast now default
            new customers to TOU plans. The problem: peak hours (2-7 PM) overlap
            exactly with the hottest part of the day when your AC works hardest.
          </p>
          <p className="text-[var(--muted)] leading-relaxed">
            <strong className="text-[var(--foreground)]">
              How to check:
            </strong>{" "}
            Look at your bill for &quot;peak,&quot; &quot;off-peak,&quot; or
            &quot;time-of-use&quot; charges. If you see different rates for
            different time periods, you are on a TOU plan. Upload your bill to
            BillWatch and we&apos;ll show you exactly how much peak pricing is
            costing you.
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
              href="/guides/winter-electric-bill"
              data-testid="link-winter-guide"
              className="rounded-lg border border-[var(--border)] p-5 hover:border-[var(--primary)] transition-colors block"
            >
              <h3 className="font-semibold text-[var(--primary)]">
                Winter Electric Bill Guide [2026]
              </h3>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Heating costs, emergency heat traps, and how to keep your winter
                electric bill under control.
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
              Don&apos;t Let Summer Bills Surprise You
            </h2>
            <p className="mt-3 text-[var(--muted)] max-w-xl mx-auto">
              Upload your electric bill and BillWatch will compare it to
              seasonal norms, flag peak pricing traps, and show you exactly
              where your money is going this summer.
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
