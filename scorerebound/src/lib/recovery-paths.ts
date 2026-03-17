import type {
  LoanType,
  DelinquencyStatus,
  RecoveryPath,
  ScoreRange,
} from "./database.types";

export interface RecoveryPathInfo {
  id: RecoveryPath;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  eligibility: string[];
  pros: string[];
  cons: string[];
  estimatedMonths: { min: number; max: number };
  bestFor: string[];
}

export const RECOVERY_PATHS: Record<RecoveryPath, RecoveryPathInfo> = {
  ibr_enrollment: {
    id: "ibr_enrollment",
    title: "Income-Based Repayment (IBR)",
    shortDescription:
      "Lower your monthly payment based on your income and family size.",
    detailedDescription:
      "Income-Based Repayment caps your monthly payment at 10-15% of discretionary income. If your income is low enough, your payment could be $0. This immediately makes your loans manageable and stops further delinquency from appearing on your credit report.",
    eligibility: [
      "Must have federal Direct or FFEL loans",
      "Must demonstrate partial financial hardship",
      "Not available for Parent PLUS loans (unless consolidated first)",
      "Private loans not eligible",
    ],
    pros: [
      "Immediately lowers monthly payment",
      "Payment could be $0 if income is very low",
      "Remaining balance forgiven after 20-25 years",
      "Stops further late payments from appearing",
    ],
    cons: [
      "Does not remove existing delinquencies from credit report",
      "Interest may capitalize (be added to principal)",
      "Forgiven amount may be taxable as income",
      "Must recertify income annually",
    ],
    estimatedMonths: { min: 3, max: 9 },
    bestFor: [
      "Borrowers with income below their loan payments",
      "Those 30-90 days delinquent on federal loans",
      "Borrowers who want to prevent default",
    ],
  },
  rehabilitation: {
    id: "rehabilitation",
    title: "Loan Rehabilitation",
    shortDescription:
      "Make 9 affordable payments to remove default from your credit report.",
    detailedDescription:
      "Loan rehabilitation is a one-time opportunity to remove a default from your credit report. You agree to make 9 on-time, voluntary payments within 10 consecutive months. The payment amount is based on your income (often as low as $5/month). Once completed, the default notation is removed from your credit report — the only recovery path that does this.",
    eligibility: [
      "Must be in default on federal loans",
      "One-time opportunity per loan",
      "Not available for private loans",
      "Cannot be in active bankruptcy",
    ],
    pros: [
      "Removes default notation from credit report (unique benefit)",
      "Payments based on income (can be as low as $5/month)",
      "Stops wage garnishment and tax refund offsets",
      "Restores eligibility for federal student aid",
    ],
    cons: [
      "One-time opportunity — can only rehabilitate each loan once",
      "Takes 9-10 months to complete",
      "Late payment history before default stays on credit report",
      "Collection costs (up to 16%) may be added to balance",
    ],
    estimatedMonths: { min: 9, max: 12 },
    bestFor: [
      "Borrowers in default on federal loans",
      "Those who want the default removed from their credit report",
      "Borrowers who can commit to 9 consecutive monthly payments",
    ],
  },
  consolidation: {
    id: "consolidation",
    title: "Direct Consolidation Loan",
    shortDescription:
      "Combine multiple loans into one new loan that brings you current immediately.",
    detailedDescription:
      "A Direct Consolidation Loan combines multiple federal loans into one new loan with a weighted average interest rate. If your loans are in default, consolidation immediately brings them to current status and makes you eligible for income-driven repayment plans. Unlike rehabilitation, it doesn't remove the default notation, but it is faster.",
    eligibility: [
      "Must have federal loans (Direct or FFEL)",
      "Available even for loans in default",
      "Parent PLUS loans can be consolidated",
      "Must agree to an income-driven repayment plan (if in default)",
    ],
    pros: [
      "Immediately brings defaulted loans to current status",
      "One monthly payment instead of multiple",
      "Access to income-driven repayment plans",
      "Faster than rehabilitation (processed in weeks, not months)",
    ],
    cons: [
      "Default notation stays on credit report (unlike rehabilitation)",
      "May lose credit for payments toward IBR/PSLF forgiveness",
      "Interest rate is weighted average (rounded up to nearest 1/8%)",
      "Cannot consolidate private loans",
    ],
    estimatedMonths: { min: 1, max: 3 },
    bestFor: [
      "Borrowers with multiple federal loans in default",
      "Parent PLUS loan borrowers seeking income-driven plans",
      "Those who need to get current status quickly",
      "Borrowers who have already used their rehabilitation opportunity",
    ],
  },
  credit_building: {
    id: "credit_building",
    title: "Credit Building Strategy",
    shortDescription:
      "Proactive steps to rebuild your credit score while managing loans.",
    detailedDescription:
      "A credit building strategy focuses on the factors that make up your credit score: payment history (35%), amounts owed (30%), length of credit history (15%), new credit (10%), and credit mix (10%). By establishing positive payment history with credit-builder products, keeping utilization low, and monitoring your reports for errors, you can significantly improve your score.",
    eligibility: [
      "Available to everyone regardless of loan status",
      "Works alongside any other recovery path",
      "Most effective when loans are at least current or being addressed",
    ],
    pros: [
      "Can start immediately, no approval needed",
      "Works alongside other recovery paths",
      "Builds positive history that outlasts the negative marks",
      "Secured cards and credit-builder loans have high approval rates",
    ],
    cons: [
      "Takes time — credit improvement is gradual",
      "Requires discipline and consistent on-time payments",
      "Some products have fees (secured card deposits, credit-builder loan interest)",
      "Does not address the underlying loan default directly",
    ],
    estimatedMonths: { min: 6, max: 18 },
    bestFor: [
      "Everyone — complements any other recovery path",
      "Borrowers whose loans are already current",
      "Those preparing for a mortgage or auto loan application",
      "Borrowers who want to maximize their score recovery",
    ],
  },
  mixed: {
    id: "mixed",
    title: "Combined Recovery Plan",
    shortDescription:
      "A multi-pronged approach combining loan resolution with active credit building.",
    detailedDescription:
      "A combined plan addresses your student loan situation through the most appropriate path (IBR, rehabilitation, or consolidation) while simultaneously building credit through complementary strategies. This approach yields the fastest and most comprehensive recovery because you're addressing both the root cause (loan delinquency) and actively building positive credit history.",
    eligibility: [
      "Available to most borrowers",
      "Specific loan resolution path depends on loan type and status",
      "Credit building component available to everyone",
    ],
    pros: [
      "Fastest overall credit recovery",
      "Addresses root cause and builds new positive history",
      "Multiple paths provide backup if one encounters delays",
      "Comprehensive approach maximizes score improvement",
    ],
    cons: [
      "More complex — requires managing multiple strategies",
      "May require more administrative work",
      "Need to track progress across multiple fronts",
    ],
    estimatedMonths: { min: 6, max: 18 },
    bestFor: [
      "Borrowers who want the fastest possible recovery",
      "Those with moderate-to-severe delinquency",
      "Borrowers with specific goals (home purchase, refinancing)",
    ],
  },
};

/**
 * Determine the recommended recovery path based on quiz responses.
 */
export function determineRecoveryPath(
  loanType: LoanType,
  delinquencyStatus: DelinquencyStatus,
  goals: string[],
): RecoveryPath {
  const isFederal = loanType !== "private";
  const isDefaulted =
    delinquencyStatus === "default" || delinquencyStatus === "collections";
  const isParentPlus = loanType === "parent_plus";

  // Private loans: limited to credit building
  if (!isFederal) {
    return "credit_building";
  }

  // Defaulted federal loans
  if (isDefaulted) {
    if (isParentPlus) {
      return "consolidation";
    }
    if (goals.includes("get_out_of_default")) {
      return "rehabilitation";
    }
    if (goals.length > 2) {
      return "mixed";
    }
    return "rehabilitation";
  }

  // Severely delinquent (90+ days) but not yet defaulted
  if (delinquencyStatus === "90_plus") {
    return "mixed";
  }

  // Moderate delinquency (30-60 days)
  if (delinquencyStatus === "30_days" || delinquencyStatus === "60_days") {
    if (isParentPlus) {
      return "consolidation";
    }
    return "ibr_enrollment";
  }

  // Current on payments
  if (delinquencyStatus === "current") {
    if (goals.includes("lower_monthly_payments") && !isParentPlus) {
      return "ibr_enrollment";
    }
    return "credit_building";
  }

  return "mixed";
}

/**
 * Get estimated recovery months based on path and current score.
 */
export function getEstimatedMonths(
  path: RecoveryPath,
  currentScore: ScoreRange,
): number {
  const pathInfo = RECOVERY_PATHS[path];
  const { min, max } = pathInfo.estimatedMonths;

  const scoreSeverity: Record<ScoreRange, number> = {
    "300_499": 1.0,
    "500_579": 0.8,
    "580_619": 0.6,
    "620_659": 0.4,
    "660_699": 0.3,
    "700_749": 0.2,
    "750_plus": 0.1,
  };

  const severity = scoreSeverity[currentScore];
  return Math.round(min + (max - min) * severity);
}
