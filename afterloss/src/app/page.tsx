import type { Metadata } from "next";
import HeroSection from "@/components/landing/HeroSection";
import ValuePropSection from "@/components/landing/ValuePropSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import TrustSection from "@/components/landing/TrustSection";
import FaqSection, { faqs } from "@/components/landing/FaqSection";
import CtaSection from "@/components/landing/CtaSection";

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://afterloss.pages.dev";

export const metadata: Metadata = {
  title: "AfterLoss \u2014 Free After-Death Estate Settlement Guide",
  description:
    "Free step-by-step guide for settling an estate after someone dies. Personalized state-specific checklists, AI-generated document templates, deadline tracking, and compassionate guidance.",
  keywords: [
    "what to do when someone dies",
    "what to do when someone dies checklist",
    "after death checklist",
    "estate settlement checklist",
    "probate guide",
    "settling an estate",
    "how to close bank account after death",
    "cancel subscription after someone dies",
    "notify social security of death",
  ],
  openGraph: {
    title: "AfterLoss \u2014 Free After-Death Estate Settlement Guide",
    description:
      "Free step-by-step guide for settling an estate after someone dies. Personalized state-specific checklists, document templates, and compassionate guidance.",
    type: "website",
    siteName: "AfterLoss",
    url: BASE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "AfterLoss \u2014 Free After-Death Estate Settlement Guide",
    description:
      "Free step-by-step guide for settling an estate after someone dies. Personalized checklists, document templates, and compassionate guidance.",
  },
  alternates: {
    canonical: BASE_URL,
  },
};

function JsonLd() {
  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "AfterLoss",
    url: BASE_URL,
    description:
      "Free step-by-step guide for settling an estate after someone dies. Personalized state-specific checklists, AI-generated document templates, and deadline tracking.",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "State-specific estate settlement checklists",
      "AI-generated personalized letters and forms",
      "Deadline tracking and reminders",
      "Subscription cancellation templates",
      "Government form guidance",
      "Probate guides for all 50 states + DC",
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webApplicationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  );
}

export default function Home() {
  return (
    <div data-testid="landing-page">
      <JsonLd />
      <HeroSection />
      <ValuePropSection />
      <HowItWorksSection />
      <TrustSection />
      <FaqSection />
      <CtaSection />
    </div>
  );
}
