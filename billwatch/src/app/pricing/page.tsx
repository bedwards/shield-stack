import type { Metadata } from "next";
import Link from "next/link";
import { PRICING_FEATURES, PREMIUM_PRICE } from "@/lib/features";

export const metadata: Metadata = {
  title: "Pricing — BillWatch",
  description:
    "BillWatch premium gives you unlimited utility accounts, household benchmarking, rate comparison, anomaly alerts, and more for just $3.99/month.",
};

function CheckIcon() {
  return (
    <svg
      className="h-5 w-5 text-[var(--success)] flex-shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      className="h-5 w-5 text-[var(--muted)] flex-shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

export default function PricingPage() {
  return (
    <div data-testid="pricing-page" className="py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            data-testid="pricing-title"
            className="text-3xl sm:text-4xl font-bold text-[var(--foreground)]"
          >
            Simple, Transparent Pricing
          </h1>
          <p className="mt-4 text-lg text-[var(--muted)] max-w-2xl mx-auto">
            Start free. Upgrade when you need benchmarking, alerts, and provider
            comparison.
          </p>
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Free Plan */}
          <div
            data-testid="plan-free"
            className="rounded-xl border border-[var(--border)] p-8 flex flex-col"
          >
            <h2 className="text-xl font-bold text-[var(--foreground)]">Free</h2>
            <p className="mt-2 text-[var(--muted)] text-sm">
              Track your bills and catch anomalies.
            </p>
            <p className="mt-6">
              <span className="text-4xl font-bold text-[var(--foreground)]">
                $0
              </span>
              <span className="text-[var(--muted)] ml-1">/month</span>
            </p>

            <Link
              href="/upload"
              data-testid="cta-free-plan"
              className="mt-6 block rounded-lg border border-[var(--border)] px-4 py-3 text-center font-medium text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors"
            >
              Get Started Free
            </Link>

            <ul className="mt-8 space-y-3 flex-1">
              {PRICING_FEATURES.map((feature) => (
                <li key={feature.name} className="flex items-start gap-3">
                  {feature.free === "Not included" ? <XIcon /> : <CheckIcon />}
                  <span className="text-sm text-[var(--muted)]">
                    <span className="text-[var(--foreground)] font-medium">
                      {feature.name}:
                    </span>{" "}
                    {feature.free}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Premium Plan */}
          <div
            data-testid="plan-premium"
            className="rounded-xl border-2 border-[var(--primary)] p-8 flex flex-col relative"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span
                data-testid="premium-badge"
                className="rounded-full bg-[var(--primary)] px-3 py-1 text-xs font-semibold text-white"
              >
                Most Popular
              </span>
            </div>

            <h2 className="text-xl font-bold text-[var(--foreground)]">
              Premium
            </h2>
            <p className="mt-2 text-[var(--muted)] text-sm">
              Benchmarking, alerts, and provider comparison.
            </p>
            <p className="mt-6">
              <span className="text-4xl font-bold text-[var(--foreground)]">
                ${PREMIUM_PRICE.amount.toFixed(2)}
              </span>
              <span className="text-[var(--muted)] ml-1">/month</span>
            </p>

            <Link
              href="/login?redirect=/api/stripe/checkout"
              data-testid="cta-premium-plan"
              className="mt-6 block rounded-lg bg-[var(--primary)] px-4 py-3 text-center font-medium text-white hover:bg-[var(--primary-hover)] transition-colors"
            >
              Start Premium
            </Link>

            <ul className="mt-8 space-y-3 flex-1">
              {PRICING_FEATURES.map((feature) => (
                <li key={feature.name} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-sm text-[var(--muted)]">
                    <span className="text-[var(--foreground)] font-medium">
                      {feature.name}:
                    </span>{" "}
                    {feature.premium}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16 max-w-2xl mx-auto">
          <h2
            data-testid="pricing-faq-title"
            className="text-2xl font-bold text-[var(--foreground)] text-center mb-8"
          >
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div
              data-testid="faq-cancel"
              className="rounded-lg border border-[var(--border)] p-5"
            >
              <h3 className="font-semibold text-[var(--foreground)]">
                Can I cancel anytime?
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Yes. You can cancel your premium subscription at any time. You
                will retain premium access until the end of your current billing
                period.
              </p>
            </div>
            <div
              data-testid="faq-free-limit"
              className="rounded-lg border border-[var(--border)] p-5"
            >
              <h3 className="font-semibold text-[var(--foreground)]">
                What are the limits on the free plan?
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                The free plan lets you track 1 utility account with 12 months of
                history. You get basic anomaly detection and full bill upload &
                OCR. Premium unlocks unlimited accounts, 10 years of history,
                benchmarking, and more.
              </p>
            </div>
            <div
              data-testid="faq-payment"
              className="rounded-lg border border-[var(--border)] p-5"
            >
              <h3 className="font-semibold text-[var(--foreground)]">
                How does payment work?
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                We use Stripe for secure payment processing. Your subscription
                renews monthly at {PREMIUM_PRICE.displayPrice}. You can manage
                your subscription, update payment methods, or cancel through the
                Stripe customer portal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
