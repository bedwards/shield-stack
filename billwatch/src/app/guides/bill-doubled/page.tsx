import type { Metadata } from "next";
import Link from "next/link";

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://billwatch.pages.dev";

export const metadata: Metadata = {
  title:
    "Electric Bill Doubled? Here's What's Happening and How to Fix It [2026] | BillWatch",
  description:
    "Your electric bill doubled unexpectedly? Bills up 35% in 2026, with some exceeding $1,000. Learn the 7 most common causes, how to verify each one, and exactly what to do next.",
  keywords: [
    "electric bill doubled",
    "electric bill doubled unexplained",
    "why did my electric bill double",
    "electric bill spike",
    "electric bill suddenly high",
    "electricity bill doubled 2026",
    "high electric bill causes",
    "electric bill doubled overnight",
  ],
  alternates: {
    canonical: `${BASE_URL}/guides/bill-doubled`,
  },
  openGraph: {
    type: "article",
    url: `${BASE_URL}/guides/bill-doubled`,
    siteName: "BillWatch",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const CAUSES = [
  {
    id: "rate-increase",
    title: "Your Rate Increased Without You Knowing",
    symptoms:
      "Your kWh usage is the same or lower than last month, but the total bill is significantly higher. You may see a new line item like 'fuel cost adjustment' or 'infrastructure surcharge.'",
    verify:
      "Compare the per-kWh rate on your current bill to the previous bill. Check your utility's website for recent rate filing announcements. Look for a 'rate change notice' that may have arrived as a small insert in a previous bill.",
    action:
      "If you're in a deregulated state (TX, OH, PA, IL, etc.), shop for a cheaper provider immediately. If you're in a regulated state, file a comment with your state's Public Utility Commission (PUC) during the next rate case. Upload both bills to BillWatch to see exactly how the rate change affected your total.",
  },
  {
    id: "broken-meter",
    title: "Your Meter Is Malfunctioning",
    symptoms:
      "Your usage shows a dramatic jump (50%+ increase in kWh) that doesn't match any change in your habits. The bill may show impossible usage levels for your home size.",
    verify:
      "Read your meter yourself on two consecutive days at the same time and compare the difference to what you'd expect for 24 hours. Most homes use 20-40 kWh per day. If you see 80+ kWh with no explanation, the meter may be faulty. Also check if the meter reading on your bill is 'estimated' (marked with an 'E').",
    action:
      "Call your utility and request a free meter test — they're required to provide one in most states. If the meter is faulty, you're entitled to a billing adjustment for the overcharged period. Document everything in writing.",
  },
  {
    id: "hvac-failure",
    title: "Your HVAC System Is Failing",
    symptoms:
      "Your bill spiked during a heating or cooling season. Your home doesn't reach the thermostat temperature as quickly as it used to. You hear unusual sounds from your furnace, heat pump, or AC unit. Some rooms are noticeably warmer or cooler than others.",
    verify:
      "Check your HVAC filter — a clogged filter forces the system to run longer, consuming up to 15% more energy. Look at the outdoor unit for ice buildup (heat pump) or debris blocking airflow. Check if the system is short-cycling (turning on and off rapidly).",
    action:
      "Replace your air filter immediately (costs $5-15). If the problem persists, schedule an HVAC inspection ($75-150). A failing compressor or refrigerant leak can double your electric bill. Many utilities offer free or subsidized energy audits that include HVAC inspection.",
  },
  {
    id: "phantom-loads",
    title: "Phantom Loads Are Draining Power",
    symptoms:
      "Your bill crept up gradually over several months rather than spiking suddenly. You've added new devices or appliances recently. Your home has many devices with standby lights, chargers left plugged in, or older appliances.",
    verify:
      "Use a $20 electricity usage monitor (like Kill-A-Watt) to measure individual appliances. Common culprits: old refrigerators (can use 3x more than new ones), pool pumps, space heaters left running, dehumidifiers in basements, and cryptocurrency mining rigs (yes, really).",
    action:
      "Plug non-essential electronics into smart power strips that cut standby power. Replace any appliance over 15 years old — the energy savings often pay for the upgrade within 2 years. Check if your utility offers rebates for Energy Star appliances.",
  },
  {
    id: "seasonal-shift",
    title: "Seasonal Weather Shift Hit Harder Than Usual",
    symptoms:
      "Your bill spiked in summer (June-August) or winter (December-February). The spike roughly coincides with a heat wave, polar vortex, or unusually cold/hot stretch in your area.",
    verify:
      "Check local weather data for the billing period — were temperatures significantly above or below normal? Compare your usage to the same month last year. In 2025-2026, many regions experienced record heat and record cold, with 28 states setting peak demand records.",
    action:
      "Weatherize your home: seal windows and doors ($50-200 in supplies), add insulation to the attic ($500-1,500), and set your thermostat to 68\u00b0F in winter / 78\u00b0F in summer. A smart thermostat ($100-250) can reduce heating/cooling costs by 10-15%. These investments pay for themselves within one to two seasons.",
  },
  {
    id: "billing-error",
    title: "Your Utility Made a Billing Error",
    symptoms:
      "The usage on your bill doesn't match your meter reading. Your bill arrived late or covers a longer-than-normal period (e.g., 35 days instead of 30). You see charges for services you didn't authorize or fees that don't appear on previous bills.",
    verify:
      "Read your meter on the day you receive your bill and compare the reading to what's printed. Check the billing period dates — is this bill covering more days than usual? Call your utility and ask them to verify the reading. Billing errors affect an estimated 1-3% of residential bills nationwide.",
    action:
      "Call your utility's customer service and request a billing audit. If they confirm an error, request a corrected bill in writing. If they refuse, file a complaint with your state's Public Utility Commission (PUC). Every state has a PUC complaint process — it's free and utilities take these seriously.",
  },
  {
    id: "rate-plan-change",
    title: "You Were Moved to a More Expensive Rate Plan",
    symptoms:
      "Your per-kWh rate jumped significantly between bills. You may have been moved from a fixed rate to a variable rate, from a promotional rate to a standard rate, or onto a time-of-use plan where peak hours cost 2-3x more.",
    verify:
      "Look at the rate plan name on your current bill vs. the previous one. Check your email/mail for any 'plan change' notices from your utility. If you're on a variable rate plan, your rate may have spiked due to wholesale market conditions — winter 2026 saw wholesale prices surge in many regions.",
    action:
      "Call your utility and ask what rate plans are available. In deregulated states, you can switch providers entirely. In regulated states, ask about time-of-use plans (shift usage to off-peak hours) or budget billing (fixed monthly amount based on annual average). Upload your bill to BillWatch to see which rate plan would have saved you the most.",
  },
];

const FAQ_ITEMS = [
  {
    question: "Why did my electric bill double for no apparent reason?",
    answer:
      "The most common causes are: a rate increase you weren't notified about, a malfunctioning meter reporting inflated usage, an HVAC system failing and running constantly, or a billing error by your utility. Start by comparing the per-kWh rate and total kWh usage on your current bill to the previous one — this tells you whether the problem is price, usage, or both.",
  },
  {
    question:
      "Is it normal for electric bills to double in winter or summer?",
    answer:
      "Seasonal increases of 30-50% are common due to heating and cooling demand. However, a full doubling (100%+ increase) usually indicates something beyond normal seasonal variation — such as a failing HVAC system, extreme weather event, or rate plan change on top of the seasonal shift. Compare your bill to the same month last year, not just the previous month.",
  },
  {
    question: "How do I know if my electric meter is broken?",
    answer:
      "Read your meter yourself: note the reading, wait 24 hours, and read it again. Most homes use 20-40 kWh per day. If you see dramatically higher usage (80+ kWh/day) with no change in habits, request a free meter test from your utility. Also check if your bill shows an 'estimated' reading (marked with 'E') rather than an actual reading — estimated bills can be wildly inaccurate.",
  },
  {
    question: "Can I dispute a doubled electric bill?",
    answer:
      "Yes. Call your utility and request a billing audit and meter test. If they find an error, you're entitled to a corrected bill. If they refuse to investigate or you disagree with their findings, file a formal complaint with your state's Public Utility Commission (PUC). The PUC process is free, and utilities are required to respond. You can also request a payment plan while the dispute is under review.",
  },
  {
    question: "How much have electric bills gone up in 2026?",
    answer:
      "The average US electric bill is $163/month in 2026, up 35% from $121 in 2021. Some regions have been hit much harder: Pittsburgh-area consumers reported $800+ bills in winter 2026, Virginia residents saw bills double year-over-year to $343, and Fortune reported cases exceeding $1,000. The average residential rate is 18.05 cents per kWh, up 21% from 2022.",
  },
];

const HOWTO_STEPS = [
  {
    name: "Compare your current bill to the previous bill",
    text: "Look at two numbers: total kWh used and the per-kWh rate. If usage spiked, the problem is in your home (appliance, HVAC, meter). If the rate spiked, the problem is your utility or rate plan.",
  },
  {
    name: "Check your meter reading",
    text: "Go to your meter and note the current reading. Compare it to the 'current reading' on your bill. If they don't match, you may have an estimated bill or a meter error.",
  },
  {
    name: "Inspect your HVAC system",
    text: "Check the air filter (replace if dirty), inspect the outdoor unit for ice or debris, and listen for unusual sounds. A failing HVAC system is the #1 cause of bill doubling in heating and cooling seasons.",
  },
  {
    name: "Look for phantom loads",
    text: "Walk through your home and note every plugged-in device. Use a $20 electricity monitor on suspicious appliances. Old refrigerators, space heaters, dehumidifiers, and pool pumps are common culprits.",
  },
  {
    name: "Upload your bill to BillWatch",
    text: "Take a photo or upload a PDF of your current and previous bills. BillWatch's OCR extracts the data and pinpoints exactly what changed — rate, usage, or both — and compares you to similar households.",
  },
  {
    name: "Take action based on what you find",
    text: "If it's a rate increase: shop for providers (deregulated states) or file with your PUC. If it's usage: fix the appliance or weatherize. If it's an error: dispute with your utility and file a PUC complaint if needed.",
  },
];

const EMERGENCY_ACTIONS = [
  {
    title: "Check your meter right now",
    description:
      "Go to your electric meter and note the reading. Wait 1 hour with normal usage, then read again. Multiply the difference by 24 — that's your estimated daily kWh. If it's over 60 kWh for a typical home, something is wrong.",
    testId: "emergency-check-meter",
  },
  {
    title: "Call your utility company",
    description:
      "Request a billing audit and meter test. These are free in most states. Ask: 'Was my reading estimated or actual?' and 'Has my rate plan changed?' Write down the representative's name and confirmation number.",
    testId: "emergency-call-utility",
  },
  {
    title: "Request a billing audit",
    description:
      "If your utility can't explain the increase, ask for a formal billing audit in writing. They must review your account and respond. While the audit is pending, ask about a payment plan to avoid late fees or disconnection.",
    testId: "emergency-billing-audit",
  },
  {
    title: "File a PUC complaint if needed",
    description:
      "Every state has a Public Utility Commission (PUC) that regulates electric utilities. Filing a complaint is free and utilities are legally required to respond. Search '[your state] public utility commission complaint' to find the form.",
    testId: "emergency-puc-complaint",
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

function howToJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to find out why your electric bill doubled",
    description:
      "A step-by-step guide to diagnosing why your electric bill doubled and what to do about it.",
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
        item: `${BASE_URL}/guides/electric-bill-high`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Electric Bill Doubled",
        item: `${BASE_URL}/guides/bill-doubled`,
      },
    ],
  };
}

function TableOfContents() {
  const sections = [
    { id: "crisis-stats", label: "2026 Crisis Numbers" },
    { id: "emergency-actions", label: "Emergency Actions" },
    { id: "causes", label: "7 Causes of Bill Doubling" },
    { id: "self-check", label: "Quick Self-Check" },
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

export default function BillDoubledGuide() {
  return (
    <div data-testid="guide-bill-doubled">
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
              Electric Bill Doubled
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
          Electric Bill Doubled?{" "}
          <span className="text-[var(--primary)]">
            Here&apos;s What&apos;s Happening and How to Fix It [2026]
          </span>
        </h1>
        <p
          data-testid="guide-subtitle"
          className="mt-4 text-lg text-[var(--muted)] max-w-3xl"
        >
          You&apos;re not imagining it. In 2026, average US electric bills hit{" "}
          <strong className="text-[var(--foreground)]">$163/month</strong>{" "}
          &mdash; up 35% since 2021. Some households are seeing bills{" "}
          <strong className="text-[var(--anomaly)]">
            exceeding $1,000
          </strong>
          . Here are the 7 most common reasons your bill doubled, how to verify
          each one, and exactly what to do next.
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
              Upload your bill &mdash; we&apos;ll tell you exactly what changed
            </p>
            <p className="text-sm text-[var(--muted)] mt-1">
              BillWatch compares your current bill to your history and pinpoints
              whether the spike is from rate increases, usage changes, or
              billing errors.
            </p>
          </div>
          <Link
            href="/upload"
            data-testid="cta-upload-doubled"
            className="rounded-lg bg-[var(--primary)] px-6 py-3 font-medium text-white hover:bg-[var(--primary-hover)] transition-colors whitespace-nowrap"
          >
            Upload Your Bill
          </Link>
        </div>
      </div>

      <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-16">
        <TableOfContents />

        {/* 2026 Crisis Stats Section */}
        <section
          id="crisis-stats"
          data-testid="crisis-stats-section"
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            The 2026 Electric Bill Crisis in Numbers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div
              data-testid="stat-avg-increase"
              className="rounded-lg border border-[var(--border)] p-5 text-center"
            >
              <p className="text-3xl font-bold text-[var(--anomaly)]">+35%</p>
              <p className="text-sm text-[var(--muted)] mt-1">
                Average bill increase since 2021
              </p>
            </div>
            <div
              data-testid="stat-fortune-bills"
              className="rounded-lg border border-[var(--border)] p-5 text-center"
            >
              <p className="text-3xl font-bold text-[var(--anomaly)]">
                $1,000+
              </p>
              <p className="text-sm text-[var(--muted)] mt-1">
                Bills reported by Fortune in 2026
              </p>
            </div>
            <div
              data-testid="stat-pittsburgh"
              className="rounded-lg border border-[var(--border)] p-5 text-center"
            >
              <p className="text-3xl font-bold text-[var(--anomaly)]">$800+</p>
              <p className="text-sm text-[var(--muted)] mt-1">
                Pittsburgh-area winter bills
              </p>
            </div>
            <div
              data-testid="stat-virginia"
              className="rounded-lg border border-[var(--border)] p-5 text-center"
            >
              <p className="text-3xl font-bold text-[var(--anomaly)]">2x</p>
              <p className="text-sm text-[var(--muted)] mt-1">
                Virginia bills doubled YoY to $343
              </p>
            </div>
          </div>
          <p className="text-[var(--muted)] leading-relaxed">
            If your electric bill doubled, you&apos;re not alone. Winter
            2025-2026 saw some of the most extreme utility bills in US history.
            Fortune reported households receiving bills{" "}
            <strong className="text-[var(--foreground)]">
              exceeding $1,000
            </strong>
            . Pittsburgh-area consumers faced{" "}
            <strong className="text-[var(--foreground)]">$800+ bills</strong>.
            In Virginia, residential bills{" "}
            <strong className="text-[var(--foreground)]">
              doubled year-over-year
            </strong>{" "}
            to an average of $343. The national average is now{" "}
            <strong className="text-[var(--foreground)]">$163/month</strong>,
            up 35% from $121 in 2021.
          </p>
        </section>

        {/* Emergency Actions Section */}
        <section
          id="emergency-actions"
          data-testid="emergency-actions-section"
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">
            Emergency Actions: Do This Right Now
          </h2>
          <p className="text-[var(--muted)] mb-6">
            If your bill just doubled and you need to act fast, follow these
            steps in order.
          </p>
          <div className="space-y-4">
            {EMERGENCY_ACTIONS.map((action, i) => (
              <div
                key={action.testId}
                data-testid={action.testId}
                className="rounded-lg border border-[var(--border)] p-5 flex gap-4"
              >
                <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--anomaly)] text-white font-bold text-sm">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--foreground)]">
                    {action.title}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--muted)] leading-relaxed">
                    {action.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7 Causes Section */}
        <section id="causes" data-testid="causes-section" className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            7 Most Common Reasons Your Electric Bill Doubled
          </h2>
          <div className="space-y-8">
            {CAUSES.map((cause, i) => (
              <div
                key={cause.id}
                data-testid={`cause-${cause.id}`}
                className="rounded-lg border border-[var(--border)] p-6"
              >
                <h3 className="text-xl font-semibold text-[var(--foreground)] flex items-baseline gap-3">
                  <span className="text-[var(--primary)] font-bold">
                    {i + 1}.
                  </span>
                  {cause.title}
                </h3>
                <div className="mt-4 space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
                      Symptoms
                    </h4>
                    <p className="mt-1 text-sm text-[var(--foreground)] leading-relaxed">
                      {cause.symptoms}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
                      How to Verify
                    </h4>
                    <p className="mt-1 text-sm text-[var(--foreground)] leading-relaxed">
                      {cause.verify}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
                      What to Do
                    </h4>
                    <p className="mt-1 text-sm text-[var(--foreground)] leading-relaxed">
                      {cause.action}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Self-Check / HowTo Section */}
        <section
          id="self-check"
          data-testid="self-check-section"
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            How to Find Out Why Your Electric Bill Doubled
          </h2>
          <p className="text-[var(--muted)] mb-6">
            Follow this quick self-check before uploading your bill. It takes
            less than 15 minutes and can often identify the problem immediately.
          </p>
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

        {/* Internal Links Section */}
        <section
          data-testid="related-guides-section"
          className="mb-12"
        >
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
                The complete guide to understanding rising electric bills,
                state-by-state averages, and how to reduce your costs.
              </p>
            </Link>
            <Link
              href="/guides/texas"
              data-testid="link-state-guide-example"
              className="rounded-lg border border-[var(--border)] p-5 hover:border-[var(--primary)] transition-colors block"
            >
              <h3 className="font-semibold text-[var(--primary)]">
                Electric Bills in Your State
              </h3>
              <p className="mt-1 text-sm text-[var(--muted)]">
                See average bills, rates, and provider options specific to your
                state. Available for all 50 states.
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
              Don&apos;t Wait for Next Month&apos;s Bill
            </h2>
            <p className="mt-3 text-[var(--muted)] max-w-xl mx-auto">
              Upload your electric bill now and BillWatch will analyze it in
              seconds &mdash; showing you exactly what changed, whether it&apos;s
              a rate increase, usage spike, or billing error.
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
