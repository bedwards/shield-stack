"use client";

import Link from "next/link";
import { useEstateStore } from "@/lib/store";
import { US_STATES } from "@/lib/states";

export default function ChecklistPage() {
  const currentCase = useEstateStore((s) => s.currentCase);

  if (!currentCase) {
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
    US_STATES.find((s) => s.code === currentCase.state)?.name ?? currentCase.state;

  return (
    <div data-testid="checklist-page" className="min-h-[calc(100vh-8rem)]">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
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

        <div className="bg-card rounded-xl border border-border p-6 sm:p-8 shadow-sm text-center space-y-4">
          <p className="text-lg text-foreground">
            Your personalized checklist is being built.
          </p>
          <p className="text-muted">
            This page will show your step-by-step estate settlement tasks,
            organized by timeline and tailored to {stateName}&apos;s probate
            requirements.
          </p>
          <div className="pt-4">
            <div data-testid="checklist-summary" className="inline-flex flex-wrap gap-3 justify-center">
              <span className="inline-flex items-center rounded-full bg-primary-light px-3 py-1 text-sm text-primary font-medium">
                {stateName}
              </span>
              <span className="inline-flex items-center rounded-full bg-primary-light px-3 py-1 text-sm text-primary font-medium">
                {currentCase.relationship}
              </span>
              <span className="inline-flex items-center rounded-full bg-primary-light px-3 py-1 text-sm text-primary font-medium">
                {currentCase.estateComplexity}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
