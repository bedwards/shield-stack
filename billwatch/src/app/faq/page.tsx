import type { Metadata } from "next";
import Link from "next/link";

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://billwatch.pages.dev";

export const metadata: Metadata = {
  title: "Frequently Asked Questions — BillWatch",
  description:
    "Answers to common questions about utility bill tracking, anomaly detection, rate comparison, and how BillWatch helps you save on electric, gas, and water bills.",
  alternates: {
    canonical: `${BASE_URL}/faq`,
  },
};

/* ------------------------------------------------------------------ */
/*  FAQ data                                                            */
/* ------------------------------------------------------------------ */

const FAQ_CATEGORIES = [
  {
    title: "About BillWatch",
    faqs: [
      {
        question: "What is BillWatch?",
        answer:
          "BillWatch is a free utility bill tracking tool that helps you detect overcharges, anomalies, and rate spikes on your electric, gas, and water bills. Upload a photo or PDF of your bill and BillWatch automatically extracts the data, tracks your costs over time, and alerts you when something looks off.",
      },
      {
        question: "Is BillWatch free?",
        answer:
          "Yes. BillWatch offers a free plan that lets you track 1 utility account with 12 months of history, full bill upload and OCR, and basic anomaly detection. The Premium plan ($3.99/month) adds unlimited accounts, 10 years of history, household benchmarking, rate comparison, and CSV export.",
      },
      {
        question: "How does the bill upload work?",
        answer:
          "Take a photo of your paper bill or upload a PDF. BillWatch uses OCR (optical character recognition) to automatically read and extract key data like the amount due, usage (kWh, therms, gallons), rate per unit, and billing period dates. You can review and correct any OCR errors before saving.",
      },
    ],
  },
  {
    title: "Anomaly Detection",
    faqs: [
      {
        question: "How does BillWatch detect billing anomalies?",
        answer:
          "BillWatch uses a statistical algorithm (z-score) to compare each new bill against your rolling 12-month average. Bills that deviate more than 2 standard deviations from your historical pattern are flagged. The algorithm adjusts for seasonal patterns (heating and cooling seasons) and separates usage anomalies from rate anomalies.",
      },
      {
        question: "What types of anomalies does BillWatch catch?",
        answer:
          "BillWatch detects: sudden cost spikes (e.g., bill 30% higher than usual), rate changes (your per-kWh rate increased), usage anomalies (your consumption jumped without explanation), and provider-level patterns (when many users on the same utility see simultaneous spikes, suggesting a billing error).",
      },
      {
        question: "What should I do when BillWatch flags an anomaly?",
        answer:
          "First, check if there is a legitimate reason (extreme weather, new appliance, guests visiting). If the anomaly is unexplained, contact your utility provider to request a bill audit. Common causes include estimated meter reads, rate class errors, and broken meters. BillWatch provides specific suggestions for each anomaly type.",
      },
    ],
  },
  {
    title: "Rates & Providers",
    faqs: [
      {
        question: "Why is my electric bill so high?",
        answer:
          "The most common reasons for a high electric bill are: increased usage from heating/cooling (especially during extreme weather), rate increases from your utility, estimated meter reads that catch up later, new appliances or electric vehicles, and billing errors. BillWatch helps you identify which of these factors is driving your bill up by tracking your usage and rates separately over time.",
      },
      {
        question: "Can I switch my electricity provider?",
        answer:
          "It depends on your state. In deregulated states (Texas, Ohio, Pennsylvania, Illinois, New York, New Jersey, Connecticut, Massachusetts, and others), you can choose your electricity supplier. Your local utility still delivers the power, but a competitive supplier may offer a lower rate. BillWatch shows you which states are deregulated and helps you compare your current rate against available plans.",
      },
      {
        question: "How do I compare electricity rates in my state?",
        answer:
          "Visit BillWatch's state guide pages to see the average electricity rate and monthly bill for your state, compared to the national average. Upload your bill to see exactly how your rate compares. In deregulated states, BillWatch can show you competitive providers offering lower rates in your area.",
      },
    ],
  },
  {
    title: "Privacy & Security",
    faqs: [
      {
        question: "Is my billing data secure?",
        answer:
          "Yes. BillWatch uses Supabase with row-level security (RLS) to ensure your data is only accessible to you. Bill images are stored with signed URLs that expire. We never share your personal billing data with third parties. All connections use HTTPS encryption.",
      },
      {
        question: "Can I delete my data?",
        answer:
          "Yes. You can delete individual bills or your entire account at any time. When you delete your account, all associated data (bills, anomalies, utility accounts) is permanently removed from our database. Bill images are also deleted from storage.",
      },
    ],
  },
];

/** Flatten all FAQs for JSON-LD */
const ALL_FAQS = FAQ_CATEGORIES.flatMap((cat) => cat.faqs);

/* ------------------------------------------------------------------ */
/*  JSON-LD structured data                                             */
/* ------------------------------------------------------------------ */

function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ALL_FAQS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/* ------------------------------------------------------------------ */
/*  Page component                                                      */
/* ------------------------------------------------------------------ */

export default function FaqPage() {
  return (
    <div data-testid="faq-page">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }}
      />

      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            data-testid="faq-title"
            className="text-3xl sm:text-4xl font-bold text-[var(--foreground)]"
          >
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg text-[var(--muted)] max-w-2xl mx-auto">
            Everything you need to know about tracking your utility bills,
            detecting anomalies, and saving money with BillWatch.
          </p>
        </div>

        {/* FAQ sections */}
        {FAQ_CATEGORIES.map((category, catIdx) => (
          <section
            key={category.title}
            data-testid={`faq-category-${catIdx}`}
            className="mb-12"
          >
            <h2
              className="text-2xl font-bold text-[var(--foreground)] mb-6"
            >
              {category.title}
            </h2>
            <div className="space-y-4">
              {category.faqs.map((faq, faqIdx) => (
                <div
                  key={faqIdx}
                  data-testid={`faq-item-${catIdx}-${faqIdx}`}
                  className="rounded-lg border border-[var(--border)] p-5"
                >
                  <h3 className="font-semibold text-[var(--foreground)]">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Bottom CTA */}
        <div
          data-testid="faq-cta"
          className="rounded-lg bg-[var(--secondary)] border border-[var(--border)] p-8 text-center"
        >
          <h2 className="text-xl font-bold text-[var(--foreground)]">
            Still Have Questions?
          </h2>
          <p className="mt-2 text-[var(--muted)]">
            Upload your first bill and see BillWatch in action — it&apos;s free.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/upload"
              data-testid="faq-cta-upload"
              className="rounded-lg bg-[var(--primary)] px-6 py-3 font-medium text-white hover:bg-[var(--primary-hover)] transition-colors"
            >
              Upload Your First Bill
            </Link>
            <Link
              href="/contact"
              data-testid="faq-cta-contact"
              className="rounded-lg border border-[var(--border)] px-6 py-3 font-medium text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
