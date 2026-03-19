const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://afterloss.pages.dev";

export interface WebSiteSchema {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  url: string;
  description: string;
  potentialAction?: {
    "@type": "SearchAction";
    target: string;
    "query-input": string;
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqPageSchema {
  "@context": "https://schema.org";
  "@type": "FAQPage";
  mainEntity: {
    "@type": "Question";
    name: string;
    acceptedAnswer: {
      "@type": "Answer";
      text: string;
    };
  }[];
}

export interface HowToStep {
  name: string;
  text: string;
}

export interface HowToSchema {
  "@context": "https://schema.org";
  "@type": "HowTo";
  name: string;
  description: string;
  step: {
    "@type": "HowToStep";
    name: string;
    text: string;
  }[];
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface BreadcrumbSchema {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: {
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }[];
}

export function generateWebSiteSchema(): WebSiteSchema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AfterLoss",
    url: BASE_URL,
    description:
      "Free step-by-step guide for settling an estate after someone dies. State-specific checklists, document templates, and compassionate guidance.",
  };
}

export function generateFaqPageSchema(faqs: FaqItem[]): FaqPageSchema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question" as const,
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: faq.answer,
      },
    })),
  };
}

export function generateHowToSchema(
  name: string,
  description: string,
  steps: HowToStep[]
): HowToSchema {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((s) => ({
      "@type": "HowToStep" as const,
      name: s.name,
      text: s.text,
    })),
  };
}

export function generateBreadcrumbSchema(
  items: BreadcrumbItem[]
): BreadcrumbSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem" as const,
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export interface GovernmentOfficeSchema {
  "@context": "https://schema.org";
  "@type": "GovernmentOffice";
  name: string;
  description: string;
  address: {
    "@type": "PostalAddress";
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
  };
  telephone: string;
  url?: string;
}

export function generateGovernmentOfficeSchema(params: {
  name: string;
  description: string;
  streetAddress: string;
  city: string;
  stateCode: string;
  phone: string;
  url?: string;
}): GovernmentOfficeSchema {
  return {
    "@context": "https://schema.org",
    "@type": "GovernmentOffice",
    name: params.name,
    description: params.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: params.streetAddress,
      addressLocality: params.city,
      addressRegion: params.stateCode,
    },
    telephone: params.phone,
    ...(params.url ? { url: params.url } : {}),
  };
}
