import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing — GhostBoard",
  description:
    "GhostBoard pricing plans: Free for job seekers, Premium for power users, and Recruiter tier for employers who want to improve their hiring reputation.",
};

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "For job seekers researching companies",
    features: [
      "Search any company's ghosting rate",
      "View aggregate stats & trends",
      "Submit up to 3 reports per month",
      "Basic company profiles",
    ],
    cta: "Get Started",
    href: "/login",
    highlighted: false,
    testId: "plan-free",
  },
  {
    name: "Premium",
    price: "$4.99",
    period: "/month",
    description: "For active job seekers who want full access",
    features: [
      "Everything in Free",
      "Unlimited report submissions",
      "Detailed analytics & response breakdowns",
      "Email alerts for tracked companies",
      "Role-level ghosting data",
      "Priority support",
    ],
    cta: "Start Premium",
    href: "/login?plan=premium",
    highlighted: true,
    testId: "plan-premium",
  },
  {
    name: "Recruiter",
    price: "$49",
    period: "/month",
    description: "For employers who want to improve their score",
    features: [
      "Claim your company profile",
      "Respond to candidate reports",
      "Analytics dashboard & benchmarks",
      "Responsiveness badge for careers page",
      "Competitor comparison tools",
      "Dedicated account support",
    ],
    cta: "Start Recruiter Plan",
    href: "/login?plan=recruiter",
    highlighted: false,
    testId: "plan-recruiter",
  },
];

export default function PricingPage() {
  return (
    <div data-testid="pricing-page" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1
          data-testid="pricing-title"
          className="text-3xl font-bold text-foreground sm:text-4xl"
        >
          Simple, Transparent Pricing
        </h1>
        <p className="mt-3 text-lg text-muted">
          Free for job seekers. Premium for power users. Built for recruiters who care.
        </p>
      </div>

      <div
        data-testid="pricing-grid"
        className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3"
      >
        {plans.map((plan) => (
          <div
            key={plan.name}
            data-testid={plan.testId}
            className={`relative rounded-2xl border p-8 ${
              plan.highlighted
                ? "border-primary bg-primary/5 shadow-lg"
                : "border-border bg-background"
            }`}
          >
            {plan.highlighted && (
              <span
                data-testid="popular-badge"
                className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-white"
              >
                Most Popular
              </span>
            )}

            <h2 className="text-xl font-bold text-foreground">{plan.name}</h2>
            <p className="mt-1 text-sm text-muted">{plan.description}</p>

            <div className="mt-6">
              <span className="text-4xl font-bold text-foreground">
                {plan.price}
              </span>
              <span className="text-sm text-muted">{plan.period}</span>
            </div>

            <ul className="mt-6 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-muted">
                  <span className="mt-0.5 text-primary">&#10003;</span>
                  {feature}
                </li>
              ))}
            </ul>

            <Link
              href={plan.href}
              data-testid={`${plan.testId}-cta`}
              className={`mt-8 block rounded-lg px-6 py-3 text-center font-medium transition-colors ${
                plan.highlighted
                  ? "bg-primary text-white hover:bg-primary-hover"
                  : "border border-border text-foreground hover:bg-secondary"
              }`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div
        data-testid="pricing-faq"
        className="mx-auto mt-16 max-w-3xl"
      >
        <h2 className="text-2xl font-bold text-center text-foreground">
          Frequently Asked Questions
        </h2>
        <div className="mt-8 space-y-6">
          <div data-testid="faq-cancel">
            <h3 className="font-semibold text-foreground">
              Can I cancel anytime?
            </h3>
            <p className="mt-1 text-sm text-muted">
              Yes. You can cancel your subscription at any time from your
              account settings. You&apos;ll retain access until the end of your
              billing period.
            </p>
          </div>
          <div data-testid="faq-free-limit">
            <h3 className="font-semibold text-foreground">
              Why limit free reports to 3/month?
            </h3>
            <p className="mt-1 text-sm text-muted">
              This helps prevent spam and ensures report quality. Most job
              seekers apply to a few companies at a time, so 3 reports covers
              typical usage.
            </p>
          </div>
          <div data-testid="faq-recruiter">
            <h3 className="font-semibold text-foreground">
              What does the Recruiter tier include?
            </h3>
            <p className="mt-1 text-sm text-muted">
              Recruiters can claim their company profile, respond to candidate
              reports, see analytics on their hiring process, and earn a
              responsiveness badge that signals commitment to candidate
              experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
