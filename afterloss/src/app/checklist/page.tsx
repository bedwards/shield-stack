"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useEstateStore } from "@/lib/store";
import { US_STATES } from "@/lib/states";
import {
  generateChecklist,
  calculateProgress,
} from "@/lib/checklist/engine";
import {
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  type ChecklistCategory,
} from "@/lib/checklist/data";

function ProgressBar({
  completed,
  total,
  percentage,
}: {
  completed: number;
  total: number;
  percentage: number;
}) {
  return (
    <div data-testid="checklist-progress" className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">
          {completed} of {total} tasks completed &mdash; {percentage}%
        </span>
      </div>
      <div className="h-3 w-full rounded-full bg-secondary overflow-hidden">
        <div
          data-testid="checklist-progress-bar"
          className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function MilestoneMessage({ completed }: { completed: number }) {
  if (completed === 0) return null;

  let message: string | null = null;
  if (completed === 1) {
    message = "You've taken the first step. That's the hardest part.";
  } else if (completed === 5) {
    message = "Five tasks done. You're making real progress.";
  } else if (completed === 10) {
    message = "Ten tasks complete. You're doing an incredible job.";
  } else if (completed === 20) {
    message = "Twenty tasks done. The hardest part is behind you.";
  }

  if (!message) return null;

  return (
    <div
      data-testid="milestone-message"
      className="rounded-lg border border-accent bg-accent/10 px-4 py-3 text-sm text-foreground"
    >
      {message}
    </div>
  );
}

function SavePrompt({ completed }: { completed: number }) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || completed < 5) return null;

  return (
    <div
      data-testid="save-prompt"
      className="rounded-lg border border-primary bg-primary-light px-4 py-3 flex items-center justify-between gap-4"
    >
      <p className="text-sm text-foreground">
        You&apos;ve made great progress. Want to save your checklist across
        devices?{" "}
        <span className="text-muted">(Coming soon)</span>
      </p>
      <button
        type="button"
        data-testid="save-prompt-dismiss"
        onClick={() => setDismissed(true)}
        className="shrink-0 text-sm text-muted hover:text-foreground transition-colors"
      >
        Dismiss
      </button>
    </div>
  );
}

function ChecklistItemRow({
  item,
  status,
  onToggle,
  onSkip,
}: {
  item: {
    id: string;
    title: string;
    description: string;
    whyItMatters: string;
    estimatedTime: string;
    stateSpecific: boolean;
  };
  status: "pending" | "completed" | "skipped" | undefined;
  onToggle: () => void;
  onSkip: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const isCompleted = status === "completed";
  const isSkipped = status === "skipped";

  return (
    <div
      data-testid={`checklist-item-${item.id}`}
      className={`rounded-lg border transition-colors ${
        isCompleted
          ? "border-primary/30 bg-primary-light/50"
          : isSkipped
            ? "border-border/50 bg-secondary/50 opacity-60"
            : "border-border bg-card"
      }`}
    >
      <div className="flex items-start gap-3 p-4">
        <button
          type="button"
          data-testid={`checklist-toggle-${item.id}`}
          onClick={onToggle}
          className={`mt-0.5 shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
            isCompleted
              ? "bg-primary border-primary text-white"
              : "border-warm-gray hover:border-primary"
          }`}
          aria-label={isCompleted ? `Mark "${item.title}" as pending` : `Mark "${item.title}" as completed`}
        >
          {isCompleted && (
            <svg
              className="w-3 h-3"
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

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <button
              type="button"
              data-testid={`checklist-expand-${item.id}`}
              onClick={() => setExpanded(!expanded)}
              className="text-left"
            >
              <h3
                className={`text-sm font-medium transition-colors ${
                  isCompleted
                    ? "text-muted line-through"
                    : isSkipped
                      ? "text-muted"
                      : "text-foreground"
                }`}
              >
                {item.title}
              </h3>
            </button>
            <div className="flex items-center gap-2 shrink-0">
              {item.stateSpecific && (
                <span className="text-xs text-accent font-medium">
                  State-specific
                </span>
              )}
              <span className="text-xs text-muted">
                {item.estimatedTime}
              </span>
            </div>
          </div>

          {expanded && (
            <div className="mt-3 space-y-2">
              <p className="text-sm text-muted">{item.description}</p>
              <p className="text-sm text-primary italic">
                Why it matters: {item.whyItMatters}
              </p>
            </div>
          )}
        </div>

        <button
          type="button"
          data-testid={`checklist-skip-${item.id}`}
          onClick={onSkip}
          className={`shrink-0 text-xs px-2 py-1 rounded transition-colors ${
            isSkipped
              ? "bg-muted/20 text-foreground"
              : "text-muted hover:text-foreground hover:bg-secondary"
          }`}
          aria-label={isSkipped ? `Unskip "${item.title}"` : `Skip "${item.title}"`}
        >
          {isSkipped ? "Unskip" : "Skip"}
        </button>
      </div>
    </div>
  );
}

function CategorySection({
  category,
  items,
  checklistProgress,
  onToggle,
  onSkip,
  defaultExpanded,
}: {
  category: ChecklistCategory;
  items: {
    id: string;
    title: string;
    description: string;
    whyItMatters: string;
    estimatedTime: string;
    stateSpecific: boolean;
  }[];
  checklistProgress: Record<
    string,
    { status: string; completedAt?: string }
  >;
  onToggle: (id: string) => void;
  onSkip: (id: string) => void;
  defaultExpanded: boolean;
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const completedCount = items.filter(
    (item) => checklistProgress[item.id]?.status === "completed",
  ).length;
  const skippedCount = items.filter(
    (item) => checklistProgress[item.id]?.status === "skipped",
  ).length;
  const doneCount = completedCount + skippedCount;

  return (
    <div data-testid={`category-${category}`}>
      <button
        type="button"
        data-testid={`category-toggle-${category}`}
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between py-3 px-1 text-left group"
      >
        <div className="flex items-center gap-3">
          <svg
            className={`w-4 h-4 text-muted transition-transform ${
              expanded ? "rotate-90" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
          <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {CATEGORY_LABELS[category]}
          </h2>
        </div>
        <span className="text-sm text-muted">
          {doneCount === items.length ? (
            <span className="text-primary font-medium">Complete</span>
          ) : (
            `${completedCount}/${items.length}`
          )}
        </span>
      </button>

      {expanded && (
        <div className="space-y-2 pb-4">
          {items.map((item) => (
            <ChecklistItemRow
              key={item.id}
              item={item}
              status={
                checklistProgress[item.id]?.status as
                  | "pending"
                  | "completed"
                  | "skipped"
                  | undefined
              }
              onToggle={() => onToggle(item.id)}
              onSkip={() => onSkip(item.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ChecklistPage() {
  const currentCase = useEstateStore((s) => s.currentCase);
  const toggleItem = useEstateStore((s) => s.toggleItem);
  const skipItem = useEstateStore((s) => s.skipItem);

  const checklist = useMemo(() => {
    if (!currentCase) return null;
    return generateChecklist(currentCase.state, currentCase.estateComplexity);
  }, [currentCase]);

  if (!currentCase || !checklist) {
    return (
      <div data-testid="checklist-page" className="min-h-[calc(100vh-8rem)]">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8 text-center space-y-6">
          <h1
            data-testid="checklist-heading"
            className="text-2xl sm:text-3xl font-bold text-foreground"
          >
            Let&apos;s get you started
          </h1>
          <p className="text-muted text-lg">
            We need a few details to create your personalized checklist.
          </p>
          <Link
            href="/onboard"
            data-testid="checklist-start-link"
            className="inline-block rounded-lg bg-primary px-8 py-3 text-sm font-medium text-white hover:bg-primary-hover transition-colors"
          >
            Begin Onboarding
          </Link>
        </div>
      </div>
    );
  }

  const stateName =
    US_STATES.find((s) => s.code === currentCase.state)?.name ??
    currentCase.state;

  const progress = calculateProgress(
    checklist.totalItems,
    currentCase.checklistProgress,
  );

  return (
    <div data-testid="checklist-page" className="min-h-[calc(100vh-8rem)]">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-8">
          <h1
            data-testid="checklist-heading"
            className="text-2xl sm:text-3xl font-bold text-foreground"
          >
            Your Estate Settlement Checklist
          </h1>
          <p className="text-muted">
            Personalized for {stateName} &middot;{" "}
            {currentCase.estateComplexity.charAt(0).toUpperCase() +
              currentCase.estateComplexity.slice(1)}{" "}
            estate
            {currentCase.deceasedName && (
              <span> &middot; In memory of {currentCase.deceasedName}</span>
            )}
          </p>
        </div>

        {/* Progress */}
        <div className="space-y-4 mb-8">
          <ProgressBar
            completed={progress.completed}
            total={checklist.totalItems}
            percentage={progress.percentage}
          />
          <MilestoneMessage completed={progress.completed} />
          <SavePrompt completed={progress.completed} />
        </div>

        {/* Checklist Sections */}
        <div className="divide-y divide-border">
          {CATEGORY_ORDER.map((category) => {
            const items = checklist.byCategory[category];
            if (items.length === 0) return null;
            return (
              <CategorySection
                key={category}
                category={category}
                items={items}
                checklistProgress={currentCase.checklistProgress}
                onToggle={toggleItem}
                onSkip={skipItem}
                defaultExpanded={category === "immediate"}
              />
            );
          })}
        </div>

        {/* Footer note */}
        <p className="mt-8 text-center text-xs text-muted">
          Your progress is saved on this device. No account needed.
        </p>
      </div>
    </div>
  );
}
