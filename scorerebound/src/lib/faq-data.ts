export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    question:
      "Why did my credit score drop after the student loan forbearance ended?",
    answer:
      "During the COVID-19 pandemic, federal student loan payments were paused (forbearance). When the on-ramp period ended in late 2024, borrowers who didn't resume payments became delinquent. Loan servicers reported these missed payments to credit bureaus, causing drops of 100+ points for many borrowers. This affected over 2.2 million people.",
  },
  {
    question: "What is loan rehabilitation and how does it work?",
    answer:
      "Loan rehabilitation is a one-time opportunity to remove a federal loan default from your credit report. You make 9 voluntary, on-time monthly payments within 10 consecutive months. Payments are income-based and can be as low as $5/month. Once completed, the default notation is removed — this is the only recovery path that does this.",
  },
  {
    question: "What is the difference between rehabilitation and consolidation?",
    answer:
      "Rehabilitation removes the default from your credit report but takes 9-10 months. Consolidation brings defaulted loans current immediately (processed in weeks) but the default notation stays on your report. Rehabilitation is a one-time opportunity per loan; consolidation can be done anytime. Choose rehabilitation if removing the default is your priority, consolidation if you need to get current quickly.",
  },
  {
    question: "Can I use Income-Based Repayment (IBR) if I'm in default?",
    answer:
      "Not directly. You must first get out of default through rehabilitation or consolidation. Once your loans are in good standing, you can apply for IBR, which caps payments at 10-15% of your discretionary income. If you're delinquent but not yet in default, you can apply for IBR immediately to prevent default.",
  },
  {
    question: "How long does it take to recover my credit score?",
    answer:
      "Recovery timelines vary based on your situation. With loan rehabilitation, expect 9-12 months to complete the process and see the default removed. Credit building strategies typically show results in 6-12 months. Most borrowers following a recovery plan see significant improvement within 12-18 months. The earlier you start, the faster you recover.",
  },
  {
    question: "Is ScoreRebound free to use?",
    answer:
      "Yes, ScoreRebound is completely free. Our recovery quiz, personalized plan, and educational resources cost nothing. We may recommend third-party products (like credit-builder loans or secured credit cards) that could help your recovery — these are optional and we may earn a referral fee if you sign up, but this never affects our recommendations.",
  },
  {
    question: "Do I need to create an account to get my recovery plan?",
    answer:
      "No. You can take the quiz and receive your personalized recovery plan without creating an account. If you want to save your plan and track your progress over time, you can optionally create a free account later.",
  },
  {
    question:
      "What if I have private student loans instead of federal loans?",
    answer:
      "Federal recovery programs (rehabilitation, consolidation, IBR) only apply to federal student loans. For private loans, your options include negotiating directly with your lender, exploring refinancing, or focusing on credit-building strategies. Our quiz accounts for private loans and will recommend appropriate steps for your situation.",
  },
];

/**
 * Generate Schema.org FAQPage structured data.
 */
export function generateFAQSchema(items: FAQItem[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
