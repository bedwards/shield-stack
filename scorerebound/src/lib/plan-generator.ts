import type {
  LoanType,
  DelinquencyStatus,
  ScoreRange,
  RecoveryPath,
  RecoveryPlanJson,
} from "./database.types";
import {
  determineRecoveryPath,
  getEstimatedMonths,
  RECOVERY_PATHS,
} from "./recovery-paths";
import { getServicerInfo } from "./servicer-data";

// ============================================================================
// Quiz options — used by QuizFunnel component and validation
// ============================================================================

export const LOAN_TYPE_OPTIONS = [
  { value: "federal_direct", label: "Federal Direct Loans" },
  { value: "federal_ffel", label: "Federal FFEL Loans" },
  { value: "federal_perkins", label: "Federal Perkins Loans" },
  { value: "parent_plus", label: "Parent PLUS Loans" },
  { value: "private", label: "Private Student Loans" },
] as const;

export const DELINQUENCY_OPTIONS = [
  { value: "current", label: "Current (on time)" },
  { value: "30_days", label: "30 days behind" },
  { value: "60_days", label: "60 days behind" },
  { value: "90_plus", label: "90+ days behind" },
  { value: "default", label: "In default" },
  { value: "collections", label: "In collections" },
] as const;

export const SCORE_RANGE_OPTIONS = [
  { value: "300_499", label: "300–499 (Very Poor)" },
  { value: "500_579", label: "500–579 (Poor)" },
  { value: "580_619", label: "580–619 (Fair)" },
  { value: "620_659", label: "620–659 (Good)" },
  { value: "660_699", label: "660–699 (Good)" },
  { value: "700_749", label: "700–749 (Very Good)" },
  { value: "750_plus", label: "750+ (Excellent)" },
] as const;

export const GOAL_OPTIONS = [
  { value: "improve_credit_score", label: "Improve my credit score" },
  { value: "get_out_of_default", label: "Get out of default" },
  { value: "lower_monthly_payments", label: "Lower my monthly payments" },
  { value: "buy_a_home", label: "Buy a home" },
  { value: "refinance_loans", label: "Refinance my loans" },
  { value: "stop_collections", label: "Stop collections/garnishment" },
] as const;

// ============================================================================
// Types
// ============================================================================

export interface QuizInput {
  loan_type: LoanType;
  servicer: string;
  delinquency_status: DelinquencyStatus;
  current_score_range: ScoreRange;
  goals: string[];
}

export interface GeneratedStep {
  step_order: number;
  title: string;
  description: string;
  action_url: string | null;
}

export interface GeneratedPlan {
  plan_json: RecoveryPlanJson;
  recovery_path: RecoveryPath;
  estimated_months: number;
  steps: GeneratedStep[];
}

// ============================================================================
// Validation
// ============================================================================

type ValidationSuccess = { valid: true; data: QuizInput };
type ValidationError = { valid: false; error: string };
export type ValidationResult = ValidationSuccess | ValidationError;

const VALID_LOAN_TYPES: Set<string> = new Set(LOAN_TYPE_OPTIONS.map((o) => o.value));
const VALID_DELINQUENCY: Set<string> = new Set(DELINQUENCY_OPTIONS.map((o) => o.value));
const VALID_SCORE_RANGES: Set<string> = new Set(SCORE_RANGE_OPTIONS.map((o) => o.value));

export function validateQuizInput(body: unknown): ValidationResult {
  if (typeof body !== "object" || body === null) {
    return { valid: false, error: "Request body must be an object" };
  }

  const data = body as Record<string, unknown>;

  if (!VALID_LOAN_TYPES.has(data["loan_type"] as string)) {
    return { valid: false, error: "Invalid loan_type" };
  }

  if (typeof data["servicer"] !== "string" || data["servicer"].trim() === "") {
    return { valid: false, error: "servicer is required" };
  }

  if (!VALID_DELINQUENCY.has(data["delinquency_status"] as string)) {
    return { valid: false, error: "Invalid delinquency_status" };
  }

  if (!VALID_SCORE_RANGES.has(data["current_score_range"] as string)) {
    return { valid: false, error: "Invalid current_score_range" };
  }

  if (
    !Array.isArray(data["goals"]) ||
    data["goals"].length === 0 ||
    !data["goals"].every((g: unknown) => typeof g === "string")
  ) {
    return { valid: false, error: "goals must be a non-empty array of strings" };
  }

  return {
    valid: true,
    data: {
      loan_type: data["loan_type"] as LoanType,
      servicer: data["servicer"] as string,
      delinquency_status: data["delinquency_status"] as DelinquencyStatus,
      current_score_range: data["current_score_range"] as ScoreRange,
      goals: data["goals"] as string[],
    },
  };
}

// ============================================================================
// Plan generation — pure logic, no database or external calls
// ============================================================================

export function generatePlan(input: QuizInput): GeneratedPlan {
  const recoveryPath = determineRecoveryPath(
    input.loan_type,
    input.delinquency_status,
    input.goals,
  );
  const estimatedMonths = getEstimatedMonths(
    recoveryPath,
    input.current_score_range,
  );
  const pathInfo = RECOVERY_PATHS[recoveryPath];
  const servicerInfo = getServicerInfo(input.servicer);

  const steps = generateSteps(recoveryPath, input, servicerInfo.shortName);
  const scoreImprovement = estimateScoreImprovement(
    input.current_score_range,
    recoveryPath,
  );
  const warnings = generateWarnings(input);

  const plan_json: RecoveryPlanJson = {
    title: `Your ${pathInfo.title} Recovery Plan`,
    summary: buildSummary(input, pathInfo.title, estimatedMonths),
    steps_overview: steps.map((s) => s.title),
    estimated_score_improvement: scoreImprovement,
    warnings,
  };

  return {
    plan_json,
    recovery_path: recoveryPath,
    estimated_months: estimatedMonths,
    steps,
  };
}

// ============================================================================
// Internal helpers
// ============================================================================

const LOAN_TYPE_LABELS: Record<LoanType, string> = {
  federal_direct: "Federal Direct",
  federal_ffel: "Federal FFEL",
  federal_perkins: "Federal Perkins",
  parent_plus: "Parent PLUS",
  private: "private",
};

const DELINQUENCY_LABELS: Record<DelinquencyStatus, string> = {
  current: "your loans are currently in good standing",
  "30_days": "you are 30 days behind on payments",
  "60_days": "you are 60 days behind on payments",
  "90_plus": "you are 90+ days behind on payments",
  default: "your loans are in default",
  collections: "your loans are in collections",
};

function buildSummary(
  input: QuizInput,
  pathTitle: string,
  estimatedMonths: number,
): string {
  const situation = DELINQUENCY_LABELS[input.delinquency_status];
  const loanLabel = LOAN_TYPE_LABELS[input.loan_type];
  return `Based on your situation — ${situation} with ${loanLabel} loans — we recommend the ${pathTitle} approach. Following this plan, you can expect meaningful credit score improvement within ${estimatedMonths} months.`;
}

function generateSteps(
  path: RecoveryPath,
  input: QuizInput,
  servicerName: string,
): GeneratedStep[] {
  const steps: GeneratedStep[] = [];

  // Step 1: Always check credit reports
  steps.push({
    step_order: 1,
    title: "Check your credit reports for errors",
    description: `Pull your free credit reports from AnnualCreditReport.com. Look for inaccurate late payment dates, wrong loan balances, or accounts that aren't yours. Dispute any errors — this alone can improve your score. As a ${LOAN_TYPE_LABELS[input.loan_type]} loan borrower serviced by ${servicerName}, verify that your loan status is reported correctly.`,
    action_url: "https://www.annualcreditreport.com",
  });

  // Path-specific steps
  switch (path) {
    case "ibr_enrollment":
      steps.push(...generateIBRSteps(servicerName));
      break;
    case "rehabilitation":
      steps.push(...generateRehabilitationSteps(input, servicerName));
      break;
    case "consolidation":
      steps.push(...generateConsolidationSteps());
      break;
    case "credit_building":
      steps.push(...generateCreditBuildingSteps());
      break;
    case "mixed":
      steps.push(...generateMixedSteps(input, servicerName));
      break;
  }

  // Final step: Monitor progress
  steps.push({
    step_order: steps.length + 1,
    title: "Monitor your progress monthly",
    description:
      "Set a monthly reminder to check your credit score (free through Credit Karma, Capital One, or your bank). Track each on-time payment and watch for your score to climb. Most borrowers see meaningful improvement within 3-6 months of consistent action.",
    action_url: null,
  });

  return steps;
}

function generateIBRSteps(servicerName: string): GeneratedStep[] {
  return [
    {
      step_order: 2,
      title: `Contact ${servicerName} about income-driven repayment`,
      description: `Call ${servicerName} or log into your account to request an Income-Based Repayment (IBR) plan. You can also apply online through studentaid.gov. You'll need your most recent tax return or pay stubs to verify income. If your income is low, your payment could be as little as $0/month.`,
      action_url: "https://studentaid.gov/app/ibrInstructions.action",
    },
    {
      step_order: 3,
      title: "Submit your IDR application",
      description:
        "Complete the Income-Driven Repayment application on studentaid.gov. Select IBR (or SAVE/PAYE if eligible for a lower payment). The application takes about 10 minutes. Your servicer will notify you of your new payment amount within 1-2 weeks.",
      action_url: "https://studentaid.gov/app/ibrInstructions.action",
    },
    {
      step_order: 4,
      title: "Set up automatic payments",
      description: `Once approved, set up autopay with ${servicerName} to ensure you never miss a payment. Most servicers offer a 0.25% interest rate reduction for autopay enrollment. Consistent on-time payments are the #1 factor in credit score recovery.`,
      action_url: null,
    },
    {
      step_order: 5,
      title: "Start a credit-builder account",
      description:
        "While your IBR plan handles your student loans, open a credit-builder loan or secured credit card to establish additional positive payment history. Products like Self, MoneyLion, or Discover Secured Card are designed for people rebuilding credit.",
      action_url: null,
    },
  ];
}

function generateRehabilitationSteps(
  input: QuizInput,
  servicerName: string,
): GeneratedStep[] {
  const isCollections = input.delinquency_status === "collections";
  const contactEntity = isCollections
    ? "the Default Resolution Group"
    : servicerName;
  return [
    {
      step_order: 2,
      title: `Contact ${contactEntity} to start rehabilitation`,
      description: `Call ${contactEntity} to request loan rehabilitation. They will calculate a "reasonable and affordable" monthly payment based on your income (often as low as $5/month). You must agree to make 9 voluntary, on-time payments within 10 consecutive months. This is a one-time opportunity per loan — don't waste it.`,
      action_url: isCollections ? "https://myeddebt.ed.gov" : null,
    },
    {
      step_order: 3,
      title: "Make your 9 rehabilitation payments on time",
      description:
        "Set calendar reminders for each payment. Payments must be made within 20 days of the due date to count. If you miss a payment, you have to start the 10-month window over (but previous payments still count if within the window). After 9 successful payments, your default will be removed from your credit report.",
      action_url: null,
    },
    {
      step_order: 4,
      title: "Enroll in an income-driven repayment plan",
      description:
        "After rehabilitation completes, your loan will be transferred to a regular servicer. Immediately enroll in an income-driven repayment plan (IBR, SAVE, or PAYE) to keep your payments affordable. Don't wait — the default payment after rehabilitation could be high.",
      action_url: "https://studentaid.gov/app/ibrInstructions.action",
    },
    {
      step_order: 5,
      title: "Build credit while rehabilitating",
      description:
        "Don't wait for rehabilitation to complete to start building credit. Open a secured credit card or credit-builder loan now. Each on-time payment adds positive history to your report, compounding the benefit when the default is removed.",
      action_url: null,
    },
  ];
}

function generateConsolidationSteps(): GeneratedStep[] {
  return [
    {
      step_order: 2,
      title: "Apply for a Direct Consolidation Loan",
      description:
        "Submit your consolidation application on studentaid.gov. You'll need to select an income-driven repayment plan as part of the application (required if consolidating defaulted loans). The process typically takes 30-60 days. Once complete, your loans will show as current immediately.",
      action_url: "https://studentaid.gov/app/launchConsolidation.action",
    },
    {
      step_order: 3,
      title: "Choose the right repayment plan",
      description:
        "During consolidation, select an income-driven repayment plan that fits your budget. IBR caps payments at 10-15% of discretionary income. If you have Parent PLUS loans, consolidation is your path to accessing income-driven plans (choose Income-Contingent Repayment, or ICR).",
      action_url: null,
    },
    {
      step_order: 4,
      title: "Set up autopay on your consolidated loan",
      description:
        "Once your new consolidated loan is active with your new servicer, immediately enroll in autopay. This prevents any new missed payments and often qualifies you for a 0.25% interest rate reduction.",
      action_url: null,
    },
    {
      step_order: 5,
      title: "Start building positive credit history",
      description:
        "With your loans now current, focus on building positive credit. Open a secured credit card, keep utilization below 30%, and make every payment on time. The consolidation brought you current, but active credit building accelerates your score recovery.",
      action_url: null,
    },
  ];
}

function generateCreditBuildingSteps(): GeneratedStep[] {
  return [
    {
      step_order: 2,
      title: "Open a secured credit card",
      description:
        "A secured credit card requires a deposit (typically $200-$500) that becomes your credit limit. Use it for small purchases and pay the full balance monthly. Cards like Discover it Secured or Capital One Platinum Secured report to all three bureaus and have no annual fee.",
      action_url: null,
    },
    {
      step_order: 3,
      title: "Consider a credit-builder loan",
      description:
        "A credit-builder loan deposits your loan amount into a savings account. You make monthly payments, and once paid off, you get the money back. It builds payment history without requiring a lump sum upfront. Self and MoneyLion offer these starting at $25/month.",
      action_url: null,
    },
    {
      step_order: 4,
      title: "Become an authorized user",
      description:
        "Ask a family member or trusted friend with a long, positive credit history to add you as an authorized user on their oldest credit card. Their positive payment history will appear on your credit report, immediately boosting your average account age and payment history.",
      action_url: null,
    },
    {
      step_order: 5,
      title: "Keep credit utilization below 30%",
      description:
        "Credit utilization (how much credit you use vs. your limit) accounts for 30% of your score. Keep all card balances below 30% of their limits — below 10% is ideal. Pay balances before the statement closing date if needed to keep reported utilization low.",
      action_url: null,
    },
  ];
}

function generateMixedSteps(
  input: QuizInput,
  servicerName: string,
): GeneratedStep[] {
  const isDefaulted =
    input.delinquency_status === "default" ||
    input.delinquency_status === "collections";
  const isParentPlus = input.loan_type === "parent_plus";

  if (isDefaulted) {
    const loanStep: GeneratedStep = isParentPlus
      ? {
          step_order: 2,
          title: "Apply for Direct Consolidation",
          description:
            "As a Parent PLUS borrower, consolidation is your path to getting current. Apply on studentaid.gov and select an income-driven repayment plan. This will immediately bring your loans to current status.",
          action_url:
            "https://studentaid.gov/app/launchConsolidation.action",
        }
      : {
          step_order: 2,
          title: `Start loan rehabilitation with ${servicerName}`,
          description: `Contact ${servicerName} to begin rehabilitation. Make 9 on-time payments (as low as $5/month based on income) to remove the default from your credit report. This is a one-time opportunity.`,
          action_url: null,
        };

    return [
      loanStep,
      {
        step_order: 3,
        title: "Open a secured credit card immediately",
        description:
          "Don't wait for loan resolution to start building credit. A secured credit card lets you establish positive payment history right now. Apply for a Discover it Secured or Capital One Platinum Secured card — they report to all three bureaus.",
        action_url: null,
      },
      {
        step_order: 4,
        title: "Enroll in income-driven repayment after resolution",
        description:
          "Once your loans are current (via rehabilitation or consolidation), immediately enroll in an income-driven repayment plan to keep payments affordable. Apply on studentaid.gov.",
        action_url: "https://studentaid.gov/app/ibrInstructions.action",
      },
      {
        step_order: 5,
        title: "Set up all payments on autopay",
        description:
          "Automate every payment — student loans, secured card, credit-builder loan. Autopay eliminates the risk of missed payments and many lenders offer rate reductions for enrollment.",
        action_url: null,
      },
    ];
  }

  // Mixed for non-defaulted: IBR + credit building
  return [
    {
      step_order: 2,
      title: `Apply for income-driven repayment with ${servicerName}`,
      description: `Contact ${servicerName} to switch to an income-driven repayment plan. This will lower your monthly payment and help you avoid default. Apply online through studentaid.gov.`,
      action_url: "https://studentaid.gov/app/ibrInstructions.action",
    },
    {
      step_order: 3,
      title: "Catch up on any missed payments",
      description:
        "While your IDR application processes, make at least the minimum payment to stop further delinquency. If you can't afford the current payment, ask your servicer about forbearance as a temporary bridge.",
      action_url: null,
    },
    {
      step_order: 4,
      title: "Open a credit-builder product",
      description:
        "Open a secured credit card or credit-builder loan to establish additional positive payment history. This dual approach — fixing your loans AND building new credit — yields the fastest score recovery.",
      action_url: null,
    },
    {
      step_order: 5,
      title: "Set up all payments on autopay",
      description:
        "Once your IDR plan is approved, automate all payments. Autopay prevents future missed payments and many lenders offer a 0.25% rate reduction for enrollment.",
      action_url: null,
    },
  ];
}

function estimateScoreImprovement(
  currentScore: ScoreRange,
  path: RecoveryPath,
): string {
  const baseImprovement: Record<RecoveryPath, { min: number; max: number }> = {
    ibr_enrollment: { min: 30, max: 80 },
    rehabilitation: { min: 50, max: 150 },
    consolidation: { min: 30, max: 100 },
    credit_building: { min: 20, max: 60 },
    mixed: { min: 50, max: 130 },
  };

  const improvement = baseImprovement[path];

  const multiplier: Record<ScoreRange, number> = {
    "300_499": 1.3,
    "500_579": 1.2,
    "580_619": 1.0,
    "620_659": 0.9,
    "660_699": 0.7,
    "700_749": 0.5,
    "750_plus": 0.3,
  };

  const mult = multiplier[currentScore];
  const min = Math.round(improvement.min * mult);
  const max = Math.round(improvement.max * mult);
  return `${min}-${max} points`;
}

function generateWarnings(input: QuizInput): string[] {
  const warnings: string[] = [];

  if (input.loan_type === "private") {
    warnings.push(
      "Private loans are not eligible for federal programs like IBR, rehabilitation, or consolidation. Your options are limited to negotiating with your lender and building credit independently.",
    );
  }

  if (input.delinquency_status === "collections") {
    warnings.push(
      "Your loans are in collections. The Department of Education can garnish up to 15% of your disposable pay and offset your tax refund. Starting rehabilitation or consolidation can stop these actions.",
    );
  }

  if (input.delinquency_status === "default") {
    warnings.push(
      "Your loans are in default. Act quickly — the longer you wait, the more collection costs accumulate (up to 25% of the outstanding balance).",
    );
  }

  if (input.loan_type === "parent_plus") {
    warnings.push(
      "Parent PLUS loans cannot be directly rehabilitated or enrolled in most income-driven plans. Consolidation is usually the required first step to access income-contingent repayment (ICR).",
    );
  }

  if (input.loan_type === "federal_perkins") {
    warnings.push(
      "Perkins loans have different rehabilitation rules — you may need to contact your school's financial aid office rather than a federal servicer.",
    );
  }

  if (
    input.goals.includes("buy_a_home") &&
    (input.delinquency_status === "default" ||
      input.delinquency_status === "collections")
  ) {
    warnings.push(
      "Most mortgage lenders require that student loan defaults be resolved before approving a home loan. FHA loans may be available sooner if you enter a rehabilitation agreement.",
    );
  }

  return warnings;
}
