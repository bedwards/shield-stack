import { RECOVERY_PATHS, type RecoveryPathInfo } from "./recovery-paths";
import type { RecoveryPath } from "./database.types";

export interface GuideStep {
  title: string;
  description: string;
}

export interface GuideData {
  slug: string;
  pathInfo: RecoveryPathInfo;
  steps: GuideStep[];
  faqs: Array<{ question: string; answer: string }>;
}

const GUIDE_STEPS: Record<string, GuideStep[]> = {
  ibr: [
    {
      title: "Check your eligibility",
      description:
        "Confirm you have federal Direct or FFEL loans and can demonstrate partial financial hardship. Parent PLUS loans must be consolidated first. Log into studentaid.gov to verify your loan types.",
    },
    {
      title: "Gather your income documentation",
      description:
        "Collect your most recent tax return or pay stubs. Your IDR payment is based on your adjusted gross income (AGI) and family size. If your income has dropped since your last tax filing, you can use current income instead.",
    },
    {
      title: "Submit your IBR application",
      description:
        "Apply at studentaid.gov/idr or through your loan servicer. The online application takes about 10 minutes. Your servicer will process the application within 1-2 weeks.",
    },
    {
      title: "Make your new lower payments on time",
      description:
        "Once approved, your payment will be capped at 10-15% of your discretionary income. Set up auto-pay to ensure you never miss a payment — this also earns a 0.25% interest rate reduction with most servicers.",
    },
    {
      title: "Recertify annually",
      description:
        "You must recertify your income and family size every year to stay on IBR. Your servicer will send a reminder, but set your own calendar reminder too. Missing recertification can cause your payment to jump back up.",
    },
  ],
  rehabilitation: [
    {
      title: "Contact your loan holder",
      description:
        "Call the Default Resolution Group at 1-800-621-3115 or your current collection agency. Tell them you want to rehabilitate your loan. They are required to offer this option.",
    },
    {
      title: "Negotiate your payment amount",
      description:
        "Your rehabilitation payment is based on your income — it can be as low as $5/month. Provide income documentation (pay stubs or tax return). Do not agree to a payment you cannot afford. If you disagree with their calculation, you can request a review.",
    },
    {
      title: "Sign the rehabilitation agreement",
      description:
        "Review the agreement carefully. It will outline your payment amount, due dates, and the 9-payment requirement within 10 consecutive months. Make sure you understand all terms before signing.",
    },
    {
      title: "Make 9 on-time monthly payments",
      description:
        "Pay the agreed amount by the due date for 9 out of 10 consecutive months. Set up automatic payments if possible. Even one additional missed payment resets the count if you fall below 9 of 10.",
    },
    {
      title: "Verify default removal from credit report",
      description:
        "After completing rehabilitation, the default notation will be removed from your credit report within 30-60 days. Check all three credit bureaus (Equifax, Experian, TransUnion) to confirm. If it is not removed, dispute it with documentation of your completed rehabilitation.",
    },
  ],
  consolidation: [
    {
      title: "Review your loans at studentaid.gov",
      description:
        "Log into studentaid.gov and review all your federal loans. Identify which loans are in default and which you want to consolidate. Note: you cannot consolidate private loans into a federal consolidation loan.",
    },
    {
      title: "Apply for a Direct Consolidation Loan",
      description:
        "Apply at studentaid.gov/app/launchConsolidation.action. If your loans are in default, you must agree to enroll in an income-driven repayment plan. The application takes about 30 minutes to complete online.",
    },
    {
      title: "Choose your repayment plan",
      description:
        "If consolidating out of default, you must select an income-driven repayment plan (IBR, PAYE, REPAYE/SAVE, or ICR). Compare plans to find the lowest payment for your situation. Consider your long-term forgiveness goals as well.",
    },
    {
      title: "Wait for processing",
      description:
        "Consolidation typically takes 30-60 days to process. During this time, continue making any payments you are currently making. Once complete, your old loans will be paid off and replaced by the new consolidation loan.",
    },
    {
      title: "Set up auto-pay on your new loan",
      description:
        "Your new loan starts in current status immediately. Set up auto-pay with your new servicer to ensure on-time payments going forward. Each on-time payment helps rebuild your credit score.",
    },
  ],
};

const GUIDE_FAQS: Record<string, Array<{ question: string; answer: string }>> =
  {
    ibr: [
      {
        question: "How much will my IBR payment be?",
        answer:
          "Your payment is capped at 10% (new IBR) or 15% (old IBR) of your discretionary income — your adjusted gross income minus 150% of the federal poverty guideline for your family size. If your income is low enough, your payment could be $0.",
      },
      {
        question: "Does IBR cover Parent PLUS loans?",
        answer:
          "Not directly. Parent PLUS loans must first be consolidated into a Direct Consolidation Loan, and then you can only enroll in the ICR plan (not IBR). ICR caps payments at 20% of discretionary income or a fixed 12-year payment adjusted for income.",
      },
      {
        question: "Will IBR hurt my credit score?",
        answer:
          "No. Being on IBR is reported the same as any standard repayment plan. As long as you make on-time payments, IBR helps your credit score by establishing positive payment history.",
      },
    ],
    rehabilitation: [
      {
        question: "Can I rehabilitate my loans more than once?",
        answer:
          "No. Loan rehabilitation is a one-time opportunity per loan. If you default again after rehabilitation, your only option to get out of default would be consolidation.",
      },
      {
        question: "What if I miss a payment during rehabilitation?",
        answer:
          "You need 9 on-time payments within 10 consecutive months. That means you can miss one month and still complete rehabilitation. However, if you miss more than one month, the count may reset depending on when the misses occur.",
      },
      {
        question:
          "Will wage garnishment stop during rehabilitation?",
        answer:
          "Wage garnishment can be reduced or suspended once you enter a rehabilitation agreement. However, complete cessation typically requires completing the full rehabilitation process. Contact the Default Resolution Group to discuss your specific situation.",
      },
    ],
    consolidation: [
      {
        question: "Will consolidation affect my interest rate?",
        answer:
          "Your new interest rate is the weighted average of your consolidated loans, rounded up to the nearest one-eighth of a percent. It will not be higher or lower than your current rates — just an average.",
      },
      {
        question:
          "Can I consolidate if I have already used rehabilitation?",
        answer:
          "Yes. Consolidation has no limit on how many times it can be used. If you have already rehabilitated and then defaulted again, consolidation is your remaining option to get out of default.",
      },
      {
        question:
          "Will I lose credit toward Public Service Loan Forgiveness (PSLF)?",
        answer:
          "Yes, consolidation resets your qualifying payment count for PSLF and other income-driven repayment forgiveness programs. If you have significant progress toward forgiveness, consider rehabilitation instead.",
      },
    ],
  };

const VALID_SLUGS = ["ibr", "rehabilitation", "consolidation"] as const;

export type GuideSlug = (typeof VALID_SLUGS)[number];

const SLUG_TO_PATH: Record<GuideSlug, RecoveryPath> = {
  ibr: "ibr_enrollment",
  rehabilitation: "rehabilitation",
  consolidation: "consolidation",
};

export function isValidGuideSlug(slug: string): slug is GuideSlug {
  return VALID_SLUGS.includes(slug as GuideSlug);
}

export function getGuideData(slug: GuideSlug): GuideData {
  const pathKey = SLUG_TO_PATH[slug];
  return {
    slug,
    pathInfo: RECOVERY_PATHS[pathKey],
    steps: GUIDE_STEPS[slug] ?? [],
    faqs: GUIDE_FAQS[slug] ?? [],
  };
}

export function getAllGuideSlugs(): GuideSlug[] {
  return [...VALID_SLUGS];
}
