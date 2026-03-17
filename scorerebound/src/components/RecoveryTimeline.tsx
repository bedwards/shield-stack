"use client";

import type { GeneratedStep } from "@/lib/plan-generator";

interface RecoveryTimelineProps {
  steps: GeneratedStep[];
  estimatedMonths: number;
}

export default function RecoveryTimeline({ steps, estimatedMonths }: RecoveryTimelineProps) {
  return (
    <div data-testid="recovery-timeline" className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Recovery Timeline</h2>
        <span
          data-testid="timeline-estimate"
          className="text-sm font-medium text-gray-500"
        >
          Estimated: ~{estimatedMonths} months
        </span>
      </div>

      {/* Visual timeline */}
      <div data-testid="timeline-steps" className="relative">
        {/* Connecting line */}
        <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-emerald-200" />

        <div className="space-y-4">
          {steps.map((step, index) => {
            const isFirst = index === 0;
            const isLast = index === steps.length - 1;

            return (
              <div
                key={step.step_order}
                data-testid={`timeline-step-${step.step_order}`}
                className="relative flex items-start gap-4 pl-0"
              >
                {/* Timeline dot */}
                <div
                  className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                    isFirst
                      ? "bg-emerald-600 text-white"
                      : isLast
                        ? "bg-emerald-100 text-emerald-700 ring-2 ring-emerald-300"
                        : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {step.step_order}
                </div>

                {/* Step content */}
                <div className="flex-1 pb-2">
                  <p
                    data-testid={`timeline-step-title-${step.step_order}`}
                    className="font-medium text-gray-900 text-sm"
                  >
                    {step.title}
                  </p>
                  {step.action_url && (
                    <span className="mt-0.5 inline-block text-xs text-emerald-600">
                      Action link available
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
