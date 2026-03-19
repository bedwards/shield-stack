/**
 * Checklist engine for AfterLoss.
 *
 * Generates a personalized checklist by filtering the master template
 * based on the user's state, relationship, and estate complexity.
 */

import type { EstateComplexity } from "@/lib/store";
import {
  masterChecklist,
  CATEGORY_ORDER,
  type ChecklistItem,
  type ChecklistCategory,
} from "./data";

export interface GeneratedChecklist {
  items: ChecklistItem[];
  byCategory: Record<ChecklistCategory, ChecklistItem[]>;
  totalItems: number;
}

const COMPLEXITY_RANK: Record<EstateComplexity, number> = {
  simple: 0,
  moderate: 1,
  complex: 2,
};

/**
 * Generate a personalized checklist based on onboarding answers.
 *
 * Filtering rules:
 * 1. Non-state-specific items are always included
 * 2. State-specific items are included only if the user's state matches
 * 3. Items with a minComplexity are included only if the user's complexity
 *    is at or above that level (simple < moderate < complex)
 */
export function generateChecklist(
  state: string,
  complexity: EstateComplexity,
): GeneratedChecklist {
  const userComplexityRank = COMPLEXITY_RANK[complexity];

  const items = masterChecklist.filter((item) => {
    // Filter by state specificity
    if (item.stateSpecific && item.applicableStates) {
      if (!item.applicableStates.includes(state)) {
        return false;
      }
    }

    // Filter by complexity level
    if (item.minComplexity) {
      const minRank = COMPLEXITY_RANK[item.minComplexity];
      if (userComplexityRank < minRank) {
        return false;
      }
    }

    return true;
  });

  // Group by category
  const byCategory = {} as Record<ChecklistCategory, ChecklistItem[]>;
  for (const cat of CATEGORY_ORDER) {
    byCategory[cat] = items.filter((item) => item.category === cat);
  }

  return {
    items,
    byCategory,
    totalItems: items.length,
  };
}

/**
 * Calculate progress statistics for the checklist.
 */
export function calculateProgress(
  totalItems: number,
  checklistProgress: Record<
    string,
    { status: string; completedAt?: string }
  >,
): {
  completed: number;
  skipped: number;
  remaining: number;
  percentage: number;
} {
  let completed = 0;
  let skipped = 0;

  for (const entry of Object.values(checklistProgress)) {
    if (entry.status === "completed") completed++;
    else if (entry.status === "skipped") skipped++;
  }

  const remaining = totalItems - completed - skipped;
  const percentage =
    totalItems > 0 ? Math.round((completed / totalItems) * 100) : 0;

  return { completed, skipped, remaining, percentage };
}
