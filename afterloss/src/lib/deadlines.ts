/**
 * Deadline computation engine for AfterLoss.
 *
 * Computes all relevant filing deadlines based on state probate rules
 * and date of death. Returns both universal deadlines (apply to all states)
 * and state-specific deadlines.
 *
 * @see https://github.com/bedwards/shield-stack/issues/262
 */

import type { Deadline } from "@/types";
import { getStateProbateRule } from "@/lib/probate/state-data";

/**
 * Add a number of days to a date and return an ISO 8601 date string.
 * Uses UTC methods to avoid local timezone offset issues.
 */
function addDays(date: Date, days: number): string {
  const result = new Date(date);
  result.setUTCDate(result.getUTCDate() + days);
  return result.toISOString().split("T")[0] + "T00:00:00.000Z";
}

/**
 * Add a number of months to a date and return an ISO 8601 date string.
 * Uses UTC methods to avoid local timezone offset issues.
 */
function addMonths(date: Date, months: number): string {
  const result = new Date(date);
  result.setUTCMonth(result.getUTCMonth() + months);
  return result.toISOString().split("T")[0] + "T00:00:00.000Z";
}

/**
 * Get April 15 of the year following the date of death.
 * This is the federal income tax filing deadline for the final return.
 */
function getNextApril15(dateOfDeath: Date): string {
  const year = dateOfDeath.getFullYear() + 1;
  return `${year}-04-15T00:00:00.000Z`;
}

/**
 * Universal deadlines that apply to all US states.
 * These are computed from the date of death regardless of state.
 */
function getUniversalDeadlines(dateOfDeath: Date): Deadline[] {
  return [
    {
      id: "universal-ss-notification",
      title: "Notify Social Security Administration",
      dueDate: addDays(dateOfDeath, 7),
      category: "notification",
      description:
        "Call SSA at 1-800-772-1213 or visit a local office to report the death. Funeral homes often do this via EDR, but confirm it was done.",
      consequence:
        "Continued benefit payments may need to be repaid. Delayed survivor benefit claims.",
      completed: false,
      stateSpecific: false,
    },
    {
      id: "universal-employer-notification",
      title: "Notify employer and HR department",
      dueDate: addDays(dateOfDeath, 14),
      category: "notification",
      description:
        "Contact the deceased's employer about final pay, benefits, life insurance through work, and COBRA eligibility.",
      consequence:
        "May lose access to employer life insurance benefits and COBRA health coverage window.",
      completed: false,
      stateSpecific: false,
    },
    {
      id: "universal-cobra-enrollment",
      title: "COBRA health insurance enrollment",
      dueDate: addDays(dateOfDeath, 60),
      category: "benefits",
      description:
        "Dependents have 60 days from loss of coverage to elect COBRA continuation of employer health insurance.",
      consequence:
        "Permanent loss of right to continue employer health insurance. Family members may have a gap in coverage.",
      completed: false,
      stateSpecific: false,
    },
    {
      id: "universal-life-insurance-claim",
      title: "File life insurance claims",
      dueDate: addMonths(dateOfDeath, 12),
      category: "insurance",
      description:
        "Contact all life insurance companies to file death benefit claims. Most policies allow 1-2 years, but filing sooner means receiving benefits sooner.",
      consequence:
        "Delayed receipt of death benefits. Some policies have specific claim windows — check each policy.",
      completed: false,
      stateSpecific: false,
    },
    {
      id: "universal-final-income-tax",
      title: "File final federal income tax return",
      dueDate: getNextApril15(dateOfDeath),
      category: "tax",
      description:
        "File the deceased's final Form 1040 for income earned from January 1 through the date of death.",
      consequence:
        "IRS penalties and interest on any taxes owed. Potential complications for estate settlement.",
      completed: false,
      stateSpecific: false,
    },
    {
      id: "universal-estate-tax-return",
      title: "File estate tax return (Form 706) if applicable",
      dueDate: addMonths(dateOfDeath, 9),
      category: "tax",
      description:
        "Required if the estate exceeds the federal exemption (~$15M). Even if under the threshold, filing preserves portability of unused exemption for surviving spouse.",
      consequence:
        "IRS penalties for late filing. Loss of portability election for surviving spouse if Form 706 not filed.",
      completed: false,
      stateSpecific: false,
    },
    {
      id: "universal-estate-income-tax",
      title: "File estate income tax return (Form 1041)",
      dueDate: getNextApril15(dateOfDeath),
      category: "tax",
      description:
        "Required if the estate earns gross income of $600 or more after death (from investments, rental income, etc.).",
      consequence:
        "IRS penalties and interest. Executor/administrator personal liability for unpaid estate taxes.",
      completed: false,
      stateSpecific: false,
    },
  ];
}

/**
 * State-specific deadlines computed from state probate rules.
 */
function getStateSpecificDeadlines(
  dateOfDeath: Date,
  stateCode: string,
): Deadline[] {
  const stateRule = getStateProbateRule(stateCode);
  if (!stateRule) return [];

  const deadlines: Deadline[] = [
    {
      id: `state-probate-filing-${stateCode.toLowerCase()}`,
      title: `File for probate in ${stateRule.stateName}`,
      dueDate: addDays(dateOfDeath, stateRule.filingDeadlineDays),
      category: "probate",
      description: `${stateRule.stateName} requires probate filing within ${stateRule.filingDeadlineDays} days of death. Probate threshold: $${stateRule.probateThreshold.toLocaleString()}.`,
      consequence: `Late filing may result in court penalties, loss of executor priority, or complications with estate administration in ${stateRule.stateName}.`,
      completed: false,
      stateSpecific: true,
    },
  ];

  if (stateRule.simplifiedProbateAvailable) {
    deadlines.push({
      id: `state-small-estate-${stateCode.toLowerCase()}`,
      title: `Consider small estate affidavit in ${stateRule.stateName}`,
      dueDate: addDays(dateOfDeath, stateRule.filingDeadlineDays),
      category: "probate",
      description: `If the estate is under $${stateRule.smallEstateAffidavitLimit.toLocaleString()}, ${stateRule.stateName} offers a simplified procedure that avoids full probate.`,
      consequence:
        "Missing the small estate window may require going through full probate, which takes longer and costs more.",
      completed: false,
      stateSpecific: true,
    });
  }

  return deadlines;
}

/**
 * Compute all deadlines for a given state and date of death.
 *
 * Returns universal deadlines (applicable to all states) plus
 * state-specific deadlines based on the state's probate rules.
 * Sorted by due date (earliest first).
 *
 * @param state - 2-letter US state code (e.g., "CA", "NY")
 * @param dateOfDeath - ISO 8601 date string
 * @returns Array of Deadline objects sorted by urgency
 */
export function computeDeadlines(state: string, dateOfDeath: string): Deadline[] {
  const dod = new Date(dateOfDeath);

  if (isNaN(dod.getTime())) {
    return [];
  }

  const universal = getUniversalDeadlines(dod);
  const stateSpecific = getStateSpecificDeadlines(dod, state);

  const all = [...universal, ...stateSpecific];

  // Sort by due date ascending (most urgent first)
  all.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  return all;
}

/**
 * Calculate the number of days remaining until a deadline.
 * Returns negative numbers for overdue deadlines.
 *
 * @param dueDate - ISO 8601 date string
 * @param now - Current date (defaults to today)
 */
export function daysRemaining(dueDate: string, now: Date = new Date()): number {
  const due = new Date(dueDate);
  const diffMs = due.getTime() - now.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

/**
 * Urgency level for visual indicators.
 */
export type DeadlineUrgency = "overdue" | "urgent" | "upcoming";

/**
 * Determine the urgency level for a deadline.
 *
 * - overdue: past due date
 * - urgent: due within 7 days
 * - upcoming: more than 7 days away
 */
export function getDeadlineUrgency(
  dueDate: string,
  now: Date = new Date(),
): DeadlineUrgency {
  const days = daysRemaining(dueDate, now);
  if (days < 0) return "overdue";
  if (days <= 7) return "urgent";
  return "upcoming";
}
