"use client";

import { useState, useEffect } from "react";
import type { Deadline } from "@/types";
import { useEstateStore } from "@/lib/store";
import { daysRemaining, getDeadlineUrgency } from "@/lib/deadlines";

/**
 * Category labels and icons for deadline categories.
 */
const CATEGORY_LABELS: Record<string, string> = {
  probate: "Probate",
  tax: "Tax Filing",
  insurance: "Insurance",
  benefits: "Benefits",
  notification: "Notification",
};

/**
 * CSS classes for urgency levels. Uses the empathetic palette from globals.css:
 * - Overdue: warm red (not harsh alarm colors)
 * - Urgent: amber/warm
 * - Upcoming: sage green/neutral
 */
function getUrgencyClasses(urgency: string, completed: boolean): string {
  if (completed) {
    return "border-border bg-secondary opacity-60";
  }
  switch (urgency) {
    case "overdue":
      return "border-destructive/40 bg-destructive/5";
    case "urgent":
      return "border-accent/40 bg-accent/5";
    case "upcoming":
      return "border-primary/30 bg-primary-light/30";
    default:
      return "border-border bg-card";
  }
}

function getUrgencyBadgeClasses(urgency: string): string {
  switch (urgency) {
    case "overdue":
      return "bg-destructive/10 text-destructive";
    case "urgent":
      return "bg-accent/10 text-accent-hover";
    case "upcoming":
      return "bg-primary-light text-primary";
    default:
      return "bg-secondary text-muted";
  }
}

function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatDaysRemaining(days: number): string {
  if (days < 0) {
    const absDays = Math.abs(days);
    return absDays === 1 ? "1 day overdue" : `${absDays} days overdue`;
  }
  if (days === 0) return "Due today";
  if (days === 1) return "Due tomorrow";
  return `${days} days remaining`;
}

interface DeadlineItemProps {
  deadline: Deadline;
  index: number;
  now: Date;
  onToggle: (id: string) => void;
}

function DeadlineItem({ deadline, index, now, onToggle }: DeadlineItemProps) {
  const days = daysRemaining(deadline.dueDate, now);
  const urgency = getDeadlineUrgency(deadline.dueDate, now);

  const urgencyTestId = deadline.completed
    ? "deadline-completed"
    : `deadline-${urgency}`;

  return (
    <div
      data-testid={`deadline-item-${index}`}
      className={`rounded-lg border p-4 transition-all ${getUrgencyClasses(urgency, deadline.completed)}`}
    >
      <div className="flex items-start gap-3">
        <button
          data-testid={`deadline-complete-${index}`}
          onClick={() => onToggle(deadline.id)}
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
            deadline.completed
              ? "border-primary bg-primary text-white"
              : "border-warm-gray hover:border-primary"
          }`}
          aria-label={
            deadline.completed
              ? `Mark "${deadline.title}" as not done`
              : `Mark "${deadline.title}" as done`
          }
        >
          {deadline.completed && (
            <svg
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </button>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <h3
              className={`text-sm font-medium ${
                deadline.completed
                  ? "text-muted line-through"
                  : "text-foreground"
              }`}
            >
              {deadline.title}
            </h3>
            <span
              data-testid={urgencyTestId}
              className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${getUrgencyBadgeClasses(urgency)}`}
            >
              {deadline.completed ? "Done" : formatDaysRemaining(days)}
            </span>
            {deadline.stateSpecific && (
              <span className="inline-flex rounded-full bg-secondary px-2 py-0.5 text-xs text-muted">
                State-specific
              </span>
            )}
          </div>

          <p className="mb-1.5 text-xs text-muted">{deadline.description}</p>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="text-foreground/70">
              Due: {formatDate(deadline.dueDate)}
            </span>
            <span className="rounded bg-secondary px-1.5 py-0.5 text-muted">
              {CATEGORY_LABELS[deadline.category] || deadline.category}
            </span>
          </div>

          {!deadline.completed && urgency !== "upcoming" && (
            <p className="mt-1.5 text-xs italic text-destructive/80">
              {deadline.consequence}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

type FilterOption = "all" | "overdue" | "urgent" | "upcoming" | "completed";

/**
 * DeadlineTracker component — displays upcoming estate settlement deadlines
 * sorted by urgency with visual indicators.
 *
 * Reads deadlines from the zustand store (computed during onboarding from
 * state probate rules + date of death).
 */
export function DeadlineTracker() {
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState<FilterOption>("all");
  const currentCase = useEstateStore((s) => s.currentCase);
  const toggleDeadline = useEstateStore((s) => s.toggleDeadline);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        data-testid="deadline-tracker"
        className="animate-pulse rounded-lg bg-secondary p-6"
      >
        <div className="mb-4 h-6 w-48 rounded bg-border" />
        <div className="space-y-3">
          <div className="h-20 rounded bg-border" />
          <div className="h-20 rounded bg-border" />
          <div className="h-20 rounded bg-border" />
        </div>
      </div>
    );
  }

  const deadlines = currentCase?.deadlines ?? [];
  const now = new Date();

  if (deadlines.length === 0) {
    return (
      <div data-testid="deadline-tracker" className="rounded-lg bg-card p-6">
        <h2 className="mb-2 text-lg font-semibold text-foreground">
          Deadline Tracker
        </h2>
        <p className="text-sm text-muted">
          Complete the onboarding to see your personalized deadlines based on
          your state and date of loss.
        </p>
      </div>
    );
  }

  const filteredDeadlines = deadlines.filter((d) => {
    if (filter === "completed") return d.completed;
    if (filter === "all") return true;
    if (d.completed) return false;
    const urgency = getDeadlineUrgency(d.dueDate, now);
    return urgency === filter;
  });

  const overdueCount = deadlines.filter(
    (d) => !d.completed && getDeadlineUrgency(d.dueDate, now) === "overdue",
  ).length;
  const urgentCount = deadlines.filter(
    (d) => !d.completed && getDeadlineUrgency(d.dueDate, now) === "urgent",
  ).length;
  const completedCount = deadlines.filter((d) => d.completed).length;

  // Find the most urgent incomplete deadline for the countdown
  const mostUrgent = deadlines.find(
    (d) => !d.completed && getDeadlineUrgency(d.dueDate, now) !== "upcoming",
  );
  const mostUrgentDays = mostUrgent
    ? daysRemaining(mostUrgent.dueDate, now)
    : null;

  const filters: { key: FilterOption; label: string; count?: number }[] = [
    { key: "all", label: "All" },
    { key: "overdue", label: "Overdue", count: overdueCount },
    { key: "urgent", label: "Urgent", count: urgentCount },
    { key: "upcoming", label: "Upcoming" },
    { key: "completed", label: "Done", count: completedCount },
  ];

  return (
    <div data-testid="deadline-tracker" className="rounded-lg bg-card p-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Deadline Tracker
          </h2>
          <p className="text-sm text-muted">
            {completedCount} of {deadlines.length} completed
          </p>
        </div>

        {mostUrgent && mostUrgentDays !== null && (
          <div
            data-testid="deadline-countdown"
            className={`rounded-lg px-3 py-1.5 text-center text-sm font-medium ${
              mostUrgentDays < 0
                ? "bg-destructive/10 text-destructive"
                : "bg-accent/10 text-accent-hover"
            }`}
          >
            {mostUrgentDays < 0
              ? `${Math.abs(mostUrgentDays)} day${Math.abs(mostUrgentDays) !== 1 ? "s" : ""} overdue`
              : `Next deadline in ${mostUrgentDays} day${mostUrgentDays !== 1 ? "s" : ""}`}
          </div>
        )}
      </div>

      <div
        className="mb-4 flex flex-wrap gap-1.5"
        data-testid="deadline-filters"
      >
        {filters.map((f) => (
          <button
            key={f.key}
            data-testid={`deadline-filter-${f.key}`}
            onClick={() => setFilter(f.key)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              filter === f.key
                ? "bg-primary text-white"
                : "bg-secondary text-muted hover:bg-border"
            }`}
          >
            {f.label}
            {f.count !== undefined && f.count > 0 && (
              <span className="ml-1">({f.count})</span>
            )}
          </button>
        ))}
      </div>

      <div className="space-y-3" data-testid="deadline-list">
        {filteredDeadlines.length === 0 ? (
          <p className="py-4 text-center text-sm text-muted">
            No deadlines match this filter.
          </p>
        ) : (
          filteredDeadlines.map((deadline, index) => (
            <DeadlineItem
              key={deadline.id}
              deadline={deadline}
              index={index}
              now={now}
              onToggle={toggleDeadline}
            />
          ))
        )}
      </div>
    </div>
  );
}
