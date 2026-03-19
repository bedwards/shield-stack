/**
 * Servicer-specific recovery guide data for /guides/servicer/[slug] pages.
 *
 * This file contains detailed, SEO-oriented content for each major federal
 * student loan servicer. It is separate from src/lib/servicer-data.ts which
 * provides shorter contact info for the quiz funnel and existing servicer pages.
 */

export interface ProcessingTimes {
  ibr: string;
  rehabilitation: string;
  consolidation: string;
}

export interface ServicerGuideData {
  slug: string;
  name: string;
  shortName: string;
  phone: string;
  website: string;
  portalUrl: string;
  mailingAddress: string;
  hours: string;
  processingTimes: ProcessingTimes;
  quirks: string[];
  /** ISO 8601 date string — when servicer info was last verified */
  lastVerified: string;
  overview: string;
  ibrSteps: string[];
  rehabSteps: string[];
  consolidationSteps: string[];
  faqs: Array<{ question: string; answer: string }>;
  /** If this servicer transitioned borrowers, where they went */
  transitionInfo?: {
    message: string;
    targetSlugs: string[];
  };
}

export const SERVICER_GUIDES: Record<string, ServicerGuideData> = {
  mohela: {
    slug: "mohela",
    name: "MOHELA (Missouri Higher Education Loan Authority)",
    shortName: "MOHELA",
    phone: "1-888-866-4352",
    website: "https://www.mohela.com",
    portalUrl: "https://www.mohela.com/DL/secure/account/loginStep1.aspx",
    mailingAddress: "MOHELA, 633 Spirit Drive, Chesterfield, MO 63005-1243",
    hours: "Monday-Friday, 7am-9pm CT",
    processingTimes: {
      ibr: "1-2 weeks by phone; 2-4 weeks online",
      rehabilitation: "9 months of on-time payments, then 30-60 days for credit report update",
      consolidation: "30-60 days (applied through studentaid.gov)",
    },
    quirks: [
      "MOHELA can process IBR applications by phone, which is often faster than online",
      "Largest federal loan servicer as of 2024 - expect longer hold times during peak hours",
      "Handles most Public Service Loan Forgiveness (PSLF) accounts",
      "If your loans were transferred from FedLoan (PHEAA), verify your payment count transferred correctly",
      "Call early in the morning (7am CT) or late afternoon for shorter wait times",
    ],
    lastVerified: "2026-03-15",
    overview:
      "MOHELA (Missouri Higher Education Loan Authority) is the largest federal student loan servicer in the United States, managing accounts for millions of borrowers. If your loans were previously serviced by FedLoan Servicing (PHEAA), they were likely transferred to MOHELA in 2022. MOHELA handles most Public Service Loan Forgiveness (PSLF) accounts and has dedicated teams for income-driven repayment applications. Many borrowers affected by the post-COVID forbearance credit score drop are serviced by MOHELA.",
    ibrSteps: [
      "Log into your MOHELA account at mohela.com or call 1-888-866-4352",
      "Request to switch to an Income-Based Repayment (IBR) plan",
      "Provide your most recent tax return or current pay stubs for income verification",
      "MOHELA can process IBR applications by phone — often faster than online submission",
      "Alternatively, apply through studentaid.gov and MOHELA will be notified automatically",
      "Once approved, set up autopay for a 0.25% interest rate reduction",
    ],
    rehabSteps: [
      "Call MOHELA at 1-888-866-4352 and select the rehabilitation option",
      "MOHELA will calculate your monthly rehabilitation payment based on your income",
      "Minimum rehabilitation payment can be as low as $5/month",
      "Make 9 voluntary, on-time payments within 10 consecutive months",
      "After completion, the default notation is removed from your credit report",
      "Your loan will be assigned to a regular servicer (possibly MOHELA again)",
    ],
    consolidationSteps: [
      "Apply for Direct Consolidation at studentaid.gov — not through MOHELA directly",
      "Select an income-driven repayment plan during the consolidation application",
      "Processing takes 30-60 days from submission",
      "Your consolidated loan may be assigned to MOHELA or another servicer",
      "Continue making your current MOHELA payments until consolidation is officially complete",
    ],
    faqs: [
      {
        question: "How do I contact MOHELA about my student loans?",
        answer:
          "You can reach MOHELA by phone at 1-888-866-4352 (Monday-Friday, 7am-9pm CT) or online at mohela.com. Log into your account to view loan details, make payments, and submit repayment plan change requests. For shorter wait times, call early morning or late afternoon.",
      },
      {
        question: "Can MOHELA process my IBR application by phone?",
        answer:
          "Yes. MOHELA can process income-driven repayment applications by phone, which is often faster than the online process. Have your most recent tax return or pay stubs ready when you call. You can also apply online through studentaid.gov.",
      },
      {
        question: "My loans were transferred to MOHELA from FedLoan. What do I need to do?",
        answer:
          "If your loans were transferred from FedLoan Servicing (PHEAA) to MOHELA, your loan terms, balances, and repayment plan remain the same. Create a MOHELA account at mohela.com if you haven't already, and verify that your payment count and autopay settings transferred correctly.",
      },
      {
        question: "Does MOHELA handle Public Service Loan Forgiveness (PSLF)?",
        answer:
          "Yes. MOHELA is the primary servicer for PSLF accounts. If you work for a qualifying employer and are making payments under an income-driven plan, submit your PSLF Employment Certification Form through MOHELA to track your qualifying payments.",
      },
      {
        question: "How long does MOHELA take to process an IBR application?",
        answer:
          "MOHELA typically processes IBR applications in 1-2 weeks by phone or 2-4 weeks for online submissions. During this time, request forbearance to prevent additional late payments while your application is being reviewed.",
      },
    ],
  },

  nelnet: {
    slug: "nelnet",
    name: "Nelnet",
    shortName: "Nelnet",
    phone: "1-888-486-4722",
    website: "https://www.nelnet.com",
    portalUrl: "https://www.nelnet.com/login",
    mailingAddress: "Nelnet, P.O. Box 82561, Lincoln, NE 68501-2561",
    hours: "Monday-Friday, 7am-10pm CT; Saturday, 8am-4pm CT",
    processingTimes: {
      ibr: "1-2 weeks online; 2-3 weeks by mail",
      rehabilitation: "9 months of on-time payments, then 30-60 days for credit report update",
      consolidation: "30-60 days (applied through studentaid.gov)",
    },
    quirks: [
      "Nelnet has one of the best online portals — you can preview projected payments under different plans before applying",
      "Extended Saturday hours (8am-4pm CT) — useful if you can't call during the week",
      "Online IDR applications available directly through the Nelnet portal",
      "Acquired many borrowers from Great Lakes after its wind-down in 2023-2024",
      "Autopay enrollment is straightforward through the online portal",
    ],
    lastVerified: "2026-03-15",
    overview:
      "Nelnet is one of the largest federal student loan servicers in the United States, known for its user-friendly online portal and extended customer service hours. If you fell behind on payments after the COVID forbearance ended, Nelnet's online tools make it straightforward to explore your options and get back on track. Nelnet also acquired many borrowers from Great Lakes during its transition in 2023-2024.",
    ibrSteps: [
      "Log into your Nelnet account at nelnet.com",
      "Navigate to Repayment Plans and explore income-driven options",
      "Nelnet's portal shows projected payments under each plan before you commit",
      "Submit your IDR application online through Nelnet or studentaid.gov",
      "Provide your most recent tax return or income documentation",
      "Enroll in auto-debit for a 0.25% interest rate reduction",
    ],
    rehabSteps: [
      "Call Nelnet at 1-888-486-4722 to discuss rehabilitation options",
      "If your loan is in default, Nelnet will calculate an affordable monthly payment",
      "Agree to the rehabilitation payment amount (can be as low as $5/month)",
      "Make 9 on-time payments within 10 consecutive months",
      "Once complete, the default notation is removed from your credit report",
      "Immediately enroll in an income-driven plan to keep payments affordable going forward",
    ],
    consolidationSteps: [
      "Apply at studentaid.gov/consolidation — the application is not through Nelnet directly",
      "Select which Nelnet-serviced loans you want to consolidate",
      "Choose an income-driven repayment plan during the application",
      "Continue making Nelnet payments until consolidation is finalized (30-60 days)",
      "Your new consolidated loan may be assigned to a different servicer",
    ],
    faqs: [
      {
        question: "How do I contact Nelnet about my student loans?",
        answer:
          "Contact Nelnet by phone at 1-888-486-4722 (Monday-Friday 7am-10pm CT, Saturday 8am-4pm CT) or online at nelnet.com. Their online portal lets you manage your account, view payment history, and change repayment plans.",
      },
      {
        question: "Can I change my repayment plan online through Nelnet?",
        answer:
          "Yes. Nelnet's online portal allows you to explore and apply for different repayment plans, including income-driven options. You can see projected payments under each plan before committing.",
      },
      {
        question: "Does Nelnet offer an auto-debit discount?",
        answer:
          "Yes. Nelnet offers a 0.25% interest rate reduction when you enroll in automatic debit payments. This saves you money over time and ensures you never miss a payment, which is critical for credit score recovery.",
      },
      {
        question: "My loans were with Great Lakes. Are they now at Nelnet?",
        answer:
          "Many Great Lakes borrowers were transferred to Nelnet during the Great Lakes wind-down in 2023-2024. If your loans were transferred, your loan terms and balances remain the same. Log into nelnet.com to verify your account and payment settings.",
      },
      {
        question: "How long does Nelnet take to process an IBR application?",
        answer:
          "Nelnet typically processes IBR applications in 1-2 weeks for online submissions and 2-3 weeks by mail. Request forbearance while waiting to prevent additional late payments from appearing on your credit report.",
      },
    ],
  },

  aidvantage: {
    slug: "aidvantage",
    name: "Aidvantage (formerly Navient federal loans)",
    shortName: "Aidvantage",
    phone: "1-800-722-1300",
    website: "https://www.aidvantage.com",
    portalUrl: "https://www.aidvantage.com/borrowers/Login.aspx",
    mailingAddress: "Aidvantage, P.O. Box 9635, Wilkes-Barre, PA 18773-9635",
    hours: "Monday-Friday, 8am-9pm ET",
    processingTimes: {
      ibr: "2-3 weeks online; 3-4 weeks by mail",
      rehabilitation: "9 months of on-time payments, then 30-60 days for credit report update",
      consolidation: "30-60 days (applied through studentaid.gov)",
    },
    quirks: [
      "Took over the federal student loan portfolio from Navient in December 2021",
      "If you had Navient federal loans, they are now at Aidvantage — your terms did not change",
      "Online IDR applications are available through the Aidvantage portal",
      "Some borrowers report longer processing times than MOHELA or Nelnet",
      "If you cannot find your account, try logging in with your old Navient credentials",
    ],
    lastVerified: "2026-03-15",
    overview:
      "Aidvantage took over the federal student loan portfolio from Navient in December 2021. If you previously had federal loans serviced by Navient, they are now with Aidvantage — your loan terms, balances, and repayment plan did not change during the transfer. If your credit score dropped after the COVID forbearance on-ramp ended, Aidvantage can help you explore options to get back on track, whether you need IBR enrollment, rehabilitation, or consolidation.",
    ibrSteps: [
      "Log into your Aidvantage account at aidvantage.com",
      "Navigate to repayment options and review income-driven plans available to you",
      "Submit an IDR application through aidvantage.com or studentaid.gov",
      "Provide your most recent tax return or proof of current income",
      "Aidvantage will process your application and notify you of your new payment amount",
      "Set up autopay to ensure on-time payments and receive a 0.25% rate reduction",
    ],
    rehabSteps: [
      "Call Aidvantage at 1-800-722-1300 to discuss rehabilitation options",
      "If in default, they will calculate an income-based rehabilitation payment amount",
      "Minimum rehabilitation payment can be as low as $5/month",
      "Make 9 on-time payments within 10 consecutive months",
      "After completion, the default notation is removed from your credit report",
      "Enroll in an income-driven plan immediately after rehabilitation is complete",
    ],
    consolidationSteps: [
      "Apply at studentaid.gov/consolidation — not through Aidvantage directly",
      "Select which Aidvantage-serviced loans you want to consolidate",
      "Choose an income-driven repayment plan if your loans are in default",
      "Continue making payments to Aidvantage until consolidation completes (30-60 days)",
      "Your new consolidated loan may be assigned to a different servicer",
    ],
    faqs: [
      {
        question: "How do I contact Aidvantage about my student loans?",
        answer:
          "Contact Aidvantage by phone at 1-800-722-1300 (Monday-Friday, 8am-9pm ET) or online at aidvantage.com. You can manage your account, make payments, and apply for repayment plan changes through their online portal.",
      },
      {
        question: "My loans were with Navient. Are they now at Aidvantage?",
        answer:
          "If you had federal student loans serviced by Navient, they were transferred to Aidvantage in December 2021. Your loan terms, interest rates, and repayment plan remained the same. Create an Aidvantage account at aidvantage.com to manage your loans.",
      },
      {
        question: "Can I apply for income-driven repayment through Aidvantage?",
        answer:
          "Yes. Aidvantage supports online IDR plan applications through their portal. You can also apply through studentaid.gov. Have your tax return ready to verify income.",
      },
      {
        question: "Does Aidvantage offer autopay discounts?",
        answer:
          "Yes. Like most federal loan servicers, Aidvantage offers a 0.25% interest rate reduction when you enroll in autopay. This saves money and ensures on-time payments, which is the most important factor in credit score recovery.",
      },
      {
        question: "How long does Aidvantage take to process an IBR application?",
        answer:
          "Aidvantage typically takes 2-3 weeks for online IBR applications and 3-4 weeks by mail. Request forbearance while waiting to prevent additional late payments from appearing on your credit report.",
      },
    ],
  },

  edfinancial: {
    slug: "edfinancial",
    name: "EdFinancial Services",
    shortName: "EdFinancial",
    phone: "1-855-337-6884",
    website: "https://www.edfinancial.com",
    portalUrl: "https://www.edfinancial.com/borrowers",
    mailingAddress: "EdFinancial Services, P.O. Box 36008, Knoxville, TN 37930-6008",
    hours: "Monday-Friday, 7:30am-9pm ET",
    processingTimes: {
      ibr: "1-2 weeks (smaller portfolio means faster processing)",
      rehabilitation: "9 months of on-time payments, then 30-60 days for credit report update",
      consolidation: "30-60 days (applied through studentaid.gov)",
    },
    quirks: [
      "Smaller portfolio means shorter phone wait times compared to larger servicers",
      "Online portal supports repayment plan changes and IDR applications",
      "EdFinancial processes IBR applications relatively quickly due to lower volume",
      "If your loans are in default, you may be redirected to the Default Resolution Group",
      "Set up autopay through the online portal for a 0.25% rate reduction",
    ],
    lastVerified: "2026-03-15",
    overview:
      "EdFinancial Services is a federal student loan servicer based in Knoxville, Tennessee. While smaller than MOHELA or Nelnet, EdFinancial services a significant number of federal student loan borrowers. One advantage of EdFinancial's smaller portfolio is that phone wait times are typically shorter and processing times for applications tend to be faster. If your credit score dropped after the COVID forbearance on-ramp ended, EdFinancial can help you enroll in IBR, start rehabilitation, or explore consolidation.",
    ibrSteps: [
      "Log into your EdFinancial account at edfinancial.com/borrowers",
      "Navigate to repayment plan options and review income-driven plans",
      "Submit your IDR application online through EdFinancial or studentaid.gov",
      "Provide your most recent tax return or current pay stubs",
      "EdFinancial typically processes applications faster due to their smaller portfolio",
      "Set up autopay for a 0.25% interest rate reduction once approved",
    ],
    rehabSteps: [
      "Call EdFinancial at 1-855-337-6884 to discuss rehabilitation options",
      "If in default, you may be directed to the Default Resolution Group (1-800-621-3115)",
      "Your monthly rehabilitation payment will be calculated based on your income",
      "Minimum payment can be as low as $5/month",
      "Make 9 on-time payments within 10 consecutive months",
      "After completion, the default is removed from your credit report",
    ],
    consolidationSteps: [
      "Apply at studentaid.gov/consolidation — not through EdFinancial directly",
      "Select which EdFinancial-serviced loans you want to consolidate",
      "Choose an income-driven repayment plan during the application",
      "Continue making payments to EdFinancial until consolidation completes (30-60 days)",
      "Your new consolidated loan may be assigned to a different servicer",
    ],
    faqs: [
      {
        question: "How do I contact EdFinancial about my student loans?",
        answer:
          "Contact EdFinancial by phone at 1-855-337-6884 (Monday-Friday, 7:30am-9pm ET) or online at edfinancial.com. Their online portal lets you manage your account, make payments, and apply for repayment plan changes.",
      },
      {
        question: "Is EdFinancial a legitimate student loan servicer?",
        answer:
          "Yes. EdFinancial Services is a legitimate federal student loan servicer contracted by the U.S. Department of Education. They are based in Knoxville, Tennessee, and service a portion of the federal student loan portfolio.",
      },
      {
        question: "Are EdFinancial's wait times shorter than other servicers?",
        answer:
          "Generally yes. EdFinancial has a smaller portfolio than MOHELA or Nelnet, which typically results in shorter phone wait times and faster processing for applications. Call during early morning hours for the shortest waits.",
      },
      {
        question: "Does EdFinancial offer autopay discounts?",
        answer:
          "Yes. EdFinancial offers a 0.25% interest rate reduction when you enroll in automatic debit payments. You can set up autopay through their online portal at edfinancial.com.",
      },
      {
        question: "How long does EdFinancial take to process an IBR application?",
        answer:
          "EdFinancial typically processes IBR applications in 1-2 weeks, which is often faster than larger servicers due to their smaller loan portfolio. Request forbearance while waiting to prevent additional late payments.",
      },
    ],
  },

  "great-lakes": {
    slug: "great-lakes",
    name: "Great Lakes Educational Loan Services",
    shortName: "Great Lakes",
    phone: "1-800-236-4300",
    website: "https://www.mygreatlakes.org",
    portalUrl: "https://www.mygreatlakes.org",
    mailingAddress: "Great Lakes, P.O. Box 7860, Madison, WI 53707-7860",
    hours: "Limited — most accounts have been transferred",
    processingTimes: {
      ibr: "N/A — contact your new servicer (MOHELA or Nelnet)",
      rehabilitation: "N/A — contact your new servicer",
      consolidation: "30-60 days (applied through studentaid.gov)",
    },
    quirks: [
      "Great Lakes wound down operations in 2023-2024 and transferred most borrowers to MOHELA or Nelnet",
      "If you still see Great Lakes on your account, check studentaid.gov to find your current servicer",
      "Your loan terms, balances, and repayment history were preserved during the transfer",
      "Some borrowers report confusion about which servicer now holds their loans — studentaid.gov is the definitive source",
      "If your credit score dropped during or after the transfer period, contact your new servicer immediately",
    ],
    lastVerified: "2026-03-15",
    overview:
      "Great Lakes Educational Loan Services was a major federal student loan servicer based in Madison, Wisconsin. In 2023-2024, Great Lakes wound down its federal loan servicing operations and transferred most borrower accounts to MOHELA and Nelnet. If your loans were previously with Great Lakes, they have been transferred to one of these servicers. Your loan terms, balances, and repayment history were preserved during the transfer. This guide helps you find your new servicer and get back on track with credit score recovery.",
    ibrSteps: [
      "Visit studentaid.gov and log in to find your current servicer (likely MOHELA or Nelnet)",
      "Create an account with your new servicer if you haven't already",
      "Verify your loan details, payment history, and any existing repayment plan transferred correctly",
      "Apply for IBR through your new servicer's portal or through studentaid.gov",
      "Provide your most recent tax return or income documentation",
      "Set up autopay with your new servicer for a 0.25% rate reduction",
    ],
    rehabSteps: [
      "Visit studentaid.gov to confirm which servicer now holds your loans",
      "If in default, contact the Default Resolution Group at 1-800-621-3115",
      "Your new servicer (MOHELA or Nelnet) can also assist with rehabilitation",
      "Rehabilitation payment will be calculated based on your income (as low as $5/month)",
      "Make 9 on-time payments within 10 consecutive months",
      "After completion, the default is removed from your credit report",
    ],
    consolidationSteps: [
      "Apply at studentaid.gov/consolidation regardless of which servicer now holds your loans",
      "Select which loans you want to consolidate",
      "Choose an income-driven repayment plan during the application",
      "Continue making payments to your current servicer until consolidation completes (30-60 days)",
      "Your consolidated loan will be assigned to a servicer — this may differ from your current one",
    ],
    faqs: [
      {
        question: "What happened to Great Lakes student loans?",
        answer:
          "Great Lakes Educational Loan Services wound down its federal student loan servicing operations in 2023-2024. Most borrower accounts were transferred to MOHELA or Nelnet. Your loan terms, balances, and repayment history were preserved during the transfer.",
      },
      {
        question: "How do I find out which servicer has my loans now?",
        answer:
          "Log into studentaid.gov with your FSA ID. Your current servicer is listed on your dashboard under loan details. Most former Great Lakes borrowers were transferred to either MOHELA (1-888-866-4352) or Nelnet (1-888-486-4722).",
      },
      {
        question: "Did my payment history transfer from Great Lakes?",
        answer:
          "Yes. Your complete payment history, including payments made toward income-driven repayment plan forgiveness and Public Service Loan Forgiveness (PSLF), should have transferred to your new servicer. Verify your payment count with your new servicer to confirm.",
      },
      {
        question: "My credit score dropped during the Great Lakes transfer. What should I do?",
        answer:
          "Contact your new servicer immediately. If payments were disrupted during the transfer, you may be eligible to have late payment records corrected. File a complaint with the Consumer Financial Protection Bureau (CFPB) if your new servicer cannot resolve the issue.",
      },
      {
        question: "Can I still access my Great Lakes account?",
        answer:
          "Great Lakes' online portal (mygreatlakes.org) may have limited functionality. For current loan management, create an account with your new servicer (MOHELA or Nelnet) and use studentaid.gov as the authoritative source for your loan information.",
      },
    ],
    transitionInfo: {
      message:
        "Great Lakes wound down operations in 2023-2024. Most borrowers were transferred to MOHELA or Nelnet. Find your current servicer at studentaid.gov.",
      targetSlugs: ["mohela", "nelnet"],
    },
  },
};

/**
 * Get all servicer guide slugs for generateStaticParams().
 */
export function getServicerGuideSlugs(): string[] {
  return Object.keys(SERVICER_GUIDES);
}

/**
 * Get a servicer guide by slug. Returns undefined if not found.
 */
export function getServicerGuide(slug: string): ServicerGuideData | undefined {
  return SERVICER_GUIDES[slug];
}
