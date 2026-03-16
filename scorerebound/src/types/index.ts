import type {
  LoanType,
  RecoveryPath,
  DelinquencyStatus,
  ScoreRange,
} from "@/lib/constants";

export interface QuizResponse {
  id: string;
  userId: string | null;
  loanType: LoanType;
  servicer: string | null;
  delinquencyMonths: number | null;
  delinquencyStatus: DelinquencyStatus;
  currentScoreRange: ScoreRange;
  goals: string[];
  sessionId: string | null;
  createdAt: string;
}

export interface RecoveryPlan {
  id: string;
  quizResponseId: string;
  userId: string | null;
  recoveryPath: RecoveryPath;
  planSteps: PlanStep[];
  estimatedRecoveryMonths: number | null;
  recommendedProducts: AffiliateProduct[];
  createdAt: string;
}

export interface PlanStep {
  order: number;
  title: string;
  description: string;
  actionItems: string[];
  estimatedDays: number | null;
  category: RecoveryPath;
}

export interface AffiliateProduct {
  slug: string;
  name: string;
  description: string;
  category: string;
  url: string;
}

export interface ProgressEntry {
  id: string;
  userId: string;
  planId: string;
  actionType: string;
  actionDescription: string | null;
  scoreSnapshot: number | null;
  completedAt: string;
}
