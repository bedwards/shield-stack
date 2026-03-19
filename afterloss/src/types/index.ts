/**
 * Shared type definitions for AfterLoss.
 * Note: AfterLoss is a 100% free product with affiliate revenue only.
 */

export type TaskCategory = "immediate" | "first_week" | "first_month" | "first_quarter" | "ongoing";
export type TaskStatus = "not_started" | "in_progress" | "completed" | "skipped";

export interface EstateTask {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  stateSpecific: boolean;
  requiredDocuments: string[];
  helpfulLinks: string[];
  order: number;
}

export interface UserChecklist {
  id: string;
  userId: string;
  taskId: string;
  status: TaskStatus;
  notes: string | null;
  completedAt: string | null;
  createdAt: string;
}

export interface StateGuide {
  id: string;
  stateCode: string;
  stateName: string;
  probateRequired: boolean;
  probateThreshold: number | null;
  smallEstateLimit: number | null;
  probateTimeline: string;
  keyDeadlines: Record<string, string>;
}

export interface DeceasedProfile {
  id: string;
  userId: string;
  name: string;
  dateOfDeath: string;
  stateCode: string;
  hasWill: boolean | null;
  estimatedEstateValue: string | null;
  createdAt: string;
}

export type DeadlineCategory =
  | "probate"
  | "tax"
  | "insurance"
  | "benefits"
  | "notification";

export interface Deadline {
  id: string;
  title: string;
  /** ISO 8601 date string */
  dueDate: string;
  category: DeadlineCategory;
  description: string;
  consequence: string;
  completed: boolean;
  stateSpecific: boolean;
}
