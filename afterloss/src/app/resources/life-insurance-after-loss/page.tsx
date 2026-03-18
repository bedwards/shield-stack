import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { generateFaqPageSchema } from "@/lib/structured-data";

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://afterloss.pages.dev";
const CANONICAL_PATH = "/resources/life-insurance-after-loss";
const POLICYGENIUS_URL =
  process.env.NEXT_PUBLIC_POLICYGENIUS_AFFILIATE_URL ||
  "https://www.policygenius.com/?ref=afterloss";

export const metadata: Metadata = {
  title:
    "Life Insurance After Losing a Loved One (2026 Guide)",
  description:
    "Lost a spouse or family breadwinner? Learn when and how to get life insurance for surviving family members. Compare term vs whole life, estimate coverage needs, and get free quotes.",
  keywords: [
    "life insurance after spouse dies",
    "do I need life insurance after death in family",
    "life insurance for surviving spouse",
    "life insurance after losing a loved one",
    "term life insurance after death",
    "life insurance coverage calculator",
  ],
  alternates: {
    canonical: `${BASE_URL}${CANONICAL_PATH}`,
  },
  openGraph: {
    title: "Life Insurance After Losing a Loved One (2026 Guide)",
    description:
      "Lost a spouse or family breadwinner? Learn when and how to get life insurance for surviving family members. Compare term vs whole life, estimate coverage needs, and get free quotes.",
    type: "article",
    url: `${BASE_URL}${CANONICAL_PATH}`,
    siteName: "AfterLoss",
  },
};

const LIFE_INSURANCE_FAQS = [
  {
    question:
      "Do I need life insurance after my spouse dies?",
    answer:
      "If anyone depends on your income — children, aging parents, or a co-signer on debts — then yes, life insurance protects them if something happens to you. This is especially important if you were a dual-income household and now rely on a single income.",
  },
  {
    question:
      "How much life insurance do I need as a surviving spouse?",
    answer:
      "A common rule of thumb is 10-12 times your annual income. For example, if you earn $60,000 per year, you would need $600,000 to $720,000 in coverage. Adjust upward for outstanding debts like a mortgage, and for future expenses like children's college education.",
  },
  {
    question: "What is the difference between term and whole life insurance?",
    answer:
      "Term life insurance covers you for a set period (10, 20, or 30 years) and is significantly cheaper. Whole life insurance covers you for your entire life and builds cash value, but costs 5-15 times more. For most surviving spouses, term life insurance is the better choice because it provides the most coverage per dollar during the years your dependents need it most.",
  },
  {
    question:
      "Can I get life insurance if I have health issues?",
    answer:
      "Yes. Many insurers offer policies for people with common health conditions like high blood pressure, diabetes, or a history of depression. Guaranteed issue policies require no medical exam, though they cost more and have lower coverage limits. Working with a broker who shops multiple carriers can help you find the best rate for your situation.",
  },
  {
    question:
      "Does my employer's life insurance cover me after my spouse dies?",
    answer:
      "If your employer offers group life insurance, check your current coverage — it typically provides 1-2 times your salary. However, employer coverage usually ends if you leave the job. Most financial advisors recommend having a personal policy in addition to employer coverage to ensure your family is protected regardless of your employment status.",
  },
  {
    question:
      "How soon after a death should I get life insurance?",
    answer:
      "There is no rush — take care of immediate needs first. Most people review their insurance needs 1-3 months after a loss, when they are assessing their new financial situation. Life insurance rates are based on your age and health at the time you apply, so applying sooner rather than later can lock in a lower rate, but waiting a few months will not significantly change your premium.",
  },
];

function BreadcrumbNav() {
  return (
    <nav
      data-testid="breadcrumb-nav"
      aria-label="Breadcrumb"
      className="mb-8 text-sm text-muted"
    >
      <ol className="flex items-center gap-2">
        <li>
          <Link
            href="/"
            data-testid="breadcrumb-home"
            className="hover:text-foreground transition-colors"
          >
            Home
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <span data-testid="breadcrumb-resources" className="text-foreground">
            Resources
          </span>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <span
            data-testid="breadcrumb-current"
            aria-current="page"
            className="text-foreground font-medium"
          >
            Life Insurance After Loss
          </span>
        </li>
      </ol>
    </nav>
  );
}

function CoverageCalculator() {
  return (
    <div
      data-testid="coverage-calculator"
      className="my-10 rounded-lg border-2 border-primary/20 bg-secondary p-6"
    >
      <h2 className="text-2xl font-bold text-foreground mb-2">
        Quick Coverage Estimate
      </h2>
      <p className="text-muted mb-4">
        A common rule of thumb: multiply your annual income by 10. Then adjust
        for your specific situation.
      </p>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-secondary">
            <tr>
              <th className="px-4 py-3 font-semibold text-foreground">
                Your Annual Income
              </th>
              <th className="px-4 py-3 font-semibold text-foreground">
                Suggested Coverage (10x)
              </th>
              <th className="px-4 py-3 font-semibold text-foreground">
                Est. Monthly Cost (Term, Age 35)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr>
              <td className="px-4 py-3 text-foreground">$40,000</td>
              <td className="px-4 py-3 text-foreground">$400,000</td>
              <td className="px-4 py-3 text-foreground">$18 - $25/mo</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-foreground">$60,000</td>
              <td className="px-4 py-3 text-foreground">$600,000</td>
              <td className="px-4 py-3 text-foreground">$22 - $32/mo</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-foreground">$80,000</td>
              <td className="px-4 py-3 text-foreground">$800,000</td>
              <td className="px-4 py-3 text-foreground">$28 - $40/mo</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-foreground">$100,000</td>
              <td className="px-4 py-3 text-foreground">$1,000,000</td>
              <td className="px-4 py-3 text-foreground">$35 - $50/mo</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-muted">
        Add more coverage if you have a mortgage, student loans, or plan to fund
        your children&apos;s education. Subtract if you have significant savings
        or other assets.
      </p>
    </div>
  );
}

function TermVsWholeComparison() {
  return (
    <div
      data-testid="term-vs-whole-section"
      className="my-10 overflow-x-auto rounded-lg border border-border"
    >
      <table className="w-full text-left text-sm">
        <thead className="bg-secondary">
          <tr>
            <th className="px-4 py-3 font-semibold text-foreground">Feature</th>
            <th className="px-4 py-3 font-semibold text-foreground">
              Term Life Insurance
            </th>
            <th className="px-4 py-3 font-semibold text-foreground">
              Whole Life Insurance
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          <tr>
            <td className="px-4 py-3 font-medium text-foreground">Duration</td>
            <td className="px-4 py-3 text-foreground">
              10, 20, or 30 years
            </td>
            <td className="px-4 py-3 text-foreground">Your entire life</td>
          </tr>
          <tr>
            <td className="px-4 py-3 font-medium text-foreground">
              Monthly cost (example)
            </td>
            <td className="px-4 py-3 text-foreground">
              $25 - $50/mo for $500K
            </td>
            <td className="px-4 py-3 text-foreground">
              $200 - $400/mo for $500K
            </td>
          </tr>
          <tr>
            <td className="px-4 py-3 font-medium text-foreground">
              Builds cash value?
            </td>
            <td className="px-4 py-3 text-foreground">No</td>
            <td className="px-4 py-3 text-foreground">
              Yes (slowly, over decades)
            </td>
          </tr>
          <tr>
            <td className="px-4 py-3 font-medium text-foreground">
              Best for
            </td>
            <td className="px-4 py-3 text-foreground">
              Most surviving spouses and parents
            </td>
            <td className="px-4 py-3 text-foreground">
              Estate planning, high net worth
            </td>
          </tr>
          <tr>
            <td className="px-4 py-3 font-medium text-foreground">
              Our take
            </td>
            <td className="px-4 py-3 text-primary font-medium">
              Recommended for most families
            </td>
            <td className="px-4 py-3 text-foreground">
              Usually not necessary
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default function LifeInsuranceAfterLossPage() {
  return (
    <div data-testid="life-insurance-page">
      <JsonLd data={generateFaqPageSchema(LIFE_INSURANCE_FAQS)} />

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <BreadcrumbNav />

        {/* Hero */}
        <header data-testid="life-insurance-hero" className="mb-10">
          <h1
            data-testid="page-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground"
          >
            Life Insurance After Losing a Loved One (2026 Guide)
          </h1>
          <p
            data-testid="page-subtitle"
            className="mt-4 text-lg text-muted max-w-2xl"
          >
            When a breadwinner or spouse dies, surviving family members often
            need to reassess their own financial protection. This guide explains
            your options — gently, with no pressure.
          </p>
          <p data-testid="last-verified" className="mt-2 text-sm text-muted">
            Last verified: March 2026
          </p>
        </header>

        {/* Why consider life insurance now */}
        <section data-testid="why-section" className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Why Consider Life Insurance Now?
          </h2>
          <p className="text-foreground leading-relaxed">
            After losing a spouse or partner, your family&apos;s financial
            picture changes dramatically. If anyone depends on your income —
            children, aging parents, or others — life insurance ensures they are
            protected if something happens to you too.
          </p>
          <div className="mt-4 rounded-lg bg-secondary p-4">
            <h3 className="font-semibold text-foreground mb-2">
              Common reasons surviving family members get coverage:
            </h3>
            <ul className="list-disc list-inside space-y-1 text-foreground">
              <li>
                You are now the sole income earner for your household
              </li>
              <li>
                You have a mortgage or other debts that would burden your family
              </li>
              <li>
                You have children who depend on you for financial support
              </li>
              <li>
                You want to ensure funeral and final expenses are covered
              </li>
              <li>
                The deceased&apos;s life insurance payout is being used for
                immediate needs
              </li>
            </ul>
          </div>
          <p className="mt-4 text-sm text-muted">
            There is no rush. Take care of immediate needs first. Most people
            review their insurance needs 1-3 months after a loss.
          </p>
        </section>

        {/* Types of life insurance */}
        <section data-testid="types-section" className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Types of Life Insurance Explained Simply
          </h2>
          <p className="text-foreground leading-relaxed mb-4">
            Life insurance can feel confusing, but there are really only two main
            types you need to know about. For most families grieving a loss,{" "}
            <strong>term life insurance</strong> is the right choice.
          </p>

          <TermVsWholeComparison />

          <div className="rounded-lg bg-secondary p-4">
            <h3 className="font-semibold text-foreground mb-2">
              Why term is usually the better choice after a loss:
            </h3>
            <p className="text-foreground">
              You need maximum coverage at minimum cost during the years your
              dependents rely on you most. A 20-year term policy covers your
              children until they are financially independent, your mortgage
              until it is paid off, and costs a fraction of whole life. You can
              invest the savings difference.
            </p>
          </div>
        </section>

        {/* How much coverage */}
        <section data-testid="coverage-section" className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            How Much Coverage Do You Need?
          </h2>
          <p className="text-foreground leading-relaxed">
            The &quot;10 times income&quot; rule is a good starting point, but
            your actual needs depend on your situation. Consider these factors:
          </p>
          <div className="mt-4 space-y-3">
            <div className="rounded-lg bg-secondary p-4">
              <h3 className="font-semibold text-foreground">Add up:</h3>
              <ul className="mt-2 list-disc list-inside space-y-1 text-foreground">
                <li>
                  <strong>Income replacement:</strong> Your annual income times
                  the number of years your dependents need support
                </li>
                <li>
                  <strong>Outstanding debts:</strong> Mortgage balance, car
                  loans, student loans, credit card debt
                </li>
                <li>
                  <strong>Future expenses:</strong> Children&apos;s college
                  education, childcare costs
                </li>
                <li>
                  <strong>Final expenses:</strong> Funeral costs, medical bills,
                  estate settlement
                </li>
              </ul>
            </div>
            <div className="rounded-lg bg-secondary p-4">
              <h3 className="font-semibold text-foreground">Subtract:</h3>
              <ul className="mt-2 list-disc list-inside space-y-1 text-foreground">
                <li>
                  <strong>Existing savings:</strong> Retirement accounts,
                  investments, emergency fund
                </li>
                <li>
                  <strong>Social Security survivor benefits:</strong> If you have
                  minor children, you may receive benefits
                </li>
                <li>
                  <strong>Existing life insurance:</strong> Employer group
                  coverage or other policies you already have
                </li>
              </ul>
            </div>
          </div>

          <CoverageCalculator />
        </section>

        {/* Employer-provided life insurance and COBRA */}
        <section data-testid="employer-section" className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Employer Life Insurance and COBRA
          </h2>
          <p className="text-foreground leading-relaxed">
            If your deceased spouse had employer-provided life insurance, that
            payout is separate from any personal policy. But there are important
            things to check about your own employer coverage:
          </p>
          <div className="mt-4 rounded-lg bg-secondary p-4">
            <ul className="list-disc list-inside space-y-2 text-foreground">
              <li>
                <strong>Check your own employer coverage:</strong> Most employers
                offer 1-2x your salary in group life insurance, sometimes for
                free. Log into your benefits portal or ask HR.
              </li>
              <li>
                <strong>Employer coverage has limits:</strong> It typically ends
                when you leave the job. It may not be enough on its own. You
                cannot take it with you.
              </li>
              <li>
                <strong>COBRA for health insurance:</strong> If you were on your
                spouse&apos;s health plan, you can continue coverage for up to 36
                months through COBRA. Contact the employer&apos;s benefits
                administrator within 60 days.
              </li>
              <li>
                <strong>Portability option:</strong> Some group life policies
                allow you to convert to an individual policy when you leave. Ask
                HR about &quot;portability&quot; or &quot;conversion&quot;
                options.
              </li>
            </ul>
          </div>
        </section>

        {/* How to apply */}
        <section data-testid="how-to-apply-section" className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            How to Apply for Life Insurance
          </h2>
          <p className="text-foreground leading-relaxed mb-4">
            Applying for life insurance is simpler than most people expect.
            Here&apos;s the process:
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">
                1
              </span>
              <div>
                <h3 className="font-semibold text-foreground">
                  Get quotes from multiple insurers
                </h3>
                <p className="text-foreground text-sm mt-1">
                  Use a comparison tool or broker to see rates from multiple
                  companies at once. Rates vary significantly — shopping around
                  can save 30-50%.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">
                2
              </span>
              <div>
                <h3 className="font-semibold text-foreground">
                  Choose your coverage amount and term length
                </h3>
                <p className="text-foreground text-sm mt-1">
                  Most families choose a 20 or 30-year term. Match the term to
                  how long your dependents will need support.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">
                3
              </span>
              <div>
                <h3 className="font-semibold text-foreground">
                  Complete the application
                </h3>
                <p className="text-foreground text-sm mt-1">
                  Most applications take 15-30 minutes online. You will answer
                  health questions and may need a brief medical exam (some
                  policies skip the exam entirely).
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">
                4
              </span>
              <div>
                <h3 className="font-semibold text-foreground">
                  Get approved and start coverage
                </h3>
                <p className="text-foreground text-sm mt-1">
                  Approval typically takes 1-4 weeks. Some &quot;instant
                  issue&quot; policies can be approved in minutes for healthy
                  applicants.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Cost factors */}
        <section data-testid="cost-section" className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            What Affects Life Insurance Cost?
          </h2>
          <p className="text-foreground leading-relaxed mb-4">
            Your premium is based on how likely the insurer thinks they will need
            to pay out during the term. The main factors:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-lg bg-secondary p-4">
              <h3 className="font-semibold text-foreground">Age</h3>
              <p className="text-sm text-foreground mt-1">
                Younger applicants pay less. Every year you wait increases the
                premium slightly.
              </p>
            </div>
            <div className="rounded-lg bg-secondary p-4">
              <h3 className="font-semibold text-foreground">Health</h3>
              <p className="text-sm text-foreground mt-1">
                Blood pressure, cholesterol, BMI, and family medical history all
                factor in.
              </p>
            </div>
            <div className="rounded-lg bg-secondary p-4">
              <h3 className="font-semibold text-foreground">Tobacco use</h3>
              <p className="text-sm text-foreground mt-1">
                Smokers pay 2-3x more than non-smokers. Most insurers require 12
                months tobacco-free.
              </p>
            </div>
            <div className="rounded-lg bg-secondary p-4">
              <h3 className="font-semibold text-foreground">Coverage amount</h3>
              <p className="text-sm text-foreground mt-1">
                Higher coverage costs more, but the per-dollar cost often
                decreases at higher amounts.
              </p>
            </div>
            <div className="rounded-lg bg-secondary p-4">
              <h3 className="font-semibold text-foreground">Term length</h3>
              <p className="text-sm text-foreground mt-1">
                Longer terms (30 years) cost more than shorter terms (10 years)
                because the risk increases.
              </p>
            </div>
            <div className="rounded-lg bg-secondary p-4">
              <h3 className="font-semibold text-foreground">Gender</h3>
              <p className="text-sm text-foreground mt-1">
                Women typically pay less than men due to longer average life
                expectancy.
              </p>
            </div>
          </div>
        </section>

        {/* Policygenius affiliate CTA */}
        <section data-testid="policygenius-cta" className="mb-12">
          <div className="rounded-lg border-2 border-primary/20 bg-secondary p-6">
            <p className="text-xs text-muted mb-3">
              <em>
                Affiliate Disclosure: AfterLoss may earn a commission at no cost
                to you.{" "}
                <Link
                  href="/privacy"
                  data-testid="affiliate-disclosure-link"
                  className="underline hover:text-foreground"
                >
                  Learn more
                </Link>
              </em>
            </p>
            <h2 className="font-semibold text-foreground text-lg">
              Compare Life Insurance Quotes with Policygenius
            </h2>
            <p className="mt-2 text-foreground">
              Policygenius is a free, independent insurance marketplace that
              compares quotes from top-rated insurers. No sales pressure — you
              answer questions online and see your options. If you decide to buy,
              their licensed agents help you through the process.
            </p>
            <ul className="mt-3 list-disc list-inside space-y-1 text-foreground text-sm">
              <li>Compare quotes from 30+ top-rated insurance companies</li>
              <li>Free to use — Policygenius is paid by insurers, not you</li>
              <li>Licensed agents available to answer questions</li>
              <li>A+ rating from Better Business Bureau</li>
              <li>No obligation — get quotes without committing</li>
            </ul>
            <a
              href={POLICYGENIUS_URL}
              data-testid="policygenius-affiliate-link"
              data-affiliate="policygenius"
              rel="noopener noreferrer sponsored"
              target="_blank"
              className="mt-4 inline-block rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-primary-hover transition-colors"
            >
              Compare Free Quotes on Policygenius
            </a>
          </div>
        </section>

        {/* FAQ Section */}
        <section data-testid="faq-section" className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {LIFE_INSURANCE_FAQS.map((faq) => (
              <div key={faq.question} className="rounded-lg bg-secondary p-4">
                <h3 className="font-semibold text-foreground">
                  {faq.question}
                </h3>
                <p className="mt-2 text-foreground text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Internal links */}
        <section data-testid="related-resources" className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Related Resources
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/guide"
              data-testid="link-checklist"
              className="rounded-lg border border-border p-4 hover:bg-secondary transition-colors"
            >
              <h3 className="font-semibold text-foreground">
                Full Estate Settlement Checklist
              </h3>
              <p className="mt-1 text-sm text-muted">
                Step-by-step guide covering everything after a death
              </p>
            </Link>
            <Link
              href="/guides/protect-identity-after-death-2026"
              data-testid="link-identity-protection"
              className="rounded-lg border border-border p-4 hover:bg-secondary transition-colors"
            >
              <h3 className="font-semibold text-foreground">
                Protect Identity After Death
              </h3>
              <p className="mt-1 text-sm text-muted">
                Prevent identity theft of the deceased
              </p>
            </Link>
            <Link
              href="/states"
              data-testid="link-state-guides"
              className="rounded-lg border border-border p-4 hover:bg-secondary transition-colors"
            >
              <h3 className="font-semibold text-foreground">
                State Probate Guides
              </h3>
              <p className="mt-1 text-sm text-muted">
                Probate rules and thresholds for your state
              </p>
            </Link>
            <Link
              href="/checklist"
              data-testid="link-deadline-tracker"
              className="rounded-lg border border-border p-4 hover:bg-secondary transition-colors"
            >
              <h3 className="font-semibold text-foreground">
                Deadline Tracker
              </h3>
              <p className="mt-1 text-sm text-muted">
                Never miss an important filing deadline
              </p>
            </Link>
          </div>
        </section>

        {/* Bottom CTA */}
        <section
          data-testid="page-cta-section"
          className="rounded-lg bg-secondary p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-foreground">
            Need Help With the Full Estate Settlement Process?
          </h2>
          <p className="mt-3 text-muted max-w-xl mx-auto">
            Life insurance is just one part of protecting your family&apos;s
            future. AfterLoss provides a free, step-by-step guide covering
            everything from death certificates to probate to tax filings.
          </p>
          <Link
            href="/guide"
            data-testid="page-cta-button"
            className="mt-6 inline-block rounded-lg bg-primary px-8 py-3 font-medium text-white hover:bg-primary-hover transition-colors"
          >
            Start the Full Guide — Free
          </Link>
        </section>
      </article>
    </div>
  );
}
