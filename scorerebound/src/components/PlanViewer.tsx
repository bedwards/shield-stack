"use client";

import { useState } from "react";
import type { GeneratedPlan } from "@/lib/plan-generator";
import RecoveryTimeline from "./RecoveryTimeline";
import { RECOVERY_PATHS } from "@/lib/recovery-paths";
import { getAffiliateRecommendations } from "@/lib/affiliates";
import AffiliateCard, { AffiliateDisclosure } from "./AffiliateCard";
import EmailCapture from "./EmailCapture";
import SavePlanCTA from "./auth/SavePlanCTA";
import type { ScoreRange } from "@/lib/database.types";

interface PlanViewerProps {
  plan: GeneratedPlan;
  planId?: string;
  scoreRange?: ScoreRange;
}

export default function PlanViewer({ plan, planId, scoreRange }: PlanViewerProps) {
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(
    new Set([0]),
  );
  const pathInfo = RECOVERY_PATHS[plan.recovery_path];
  const affiliateProducts = getAffiliateRecommendations(
    plan.recovery_path,
    scoreRange ?? "580_619",
  );
  const referrerPage = planId ? `/plan/${planId}` : undefined;

  const toggleStep = (index: number) => {
    setExpandedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div data-testid="plan-viewer" className="mx-auto max-w-3xl">
      {/* Plan header */}
      <div data-testid="plan-header" className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span
            data-testid="plan-path-badge"
            className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800"
          >
            {pathInfo.title}
          </span>
          <span
            data-testid="plan-timeline-badge"
            className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
          >
            ~{plan.estimated_months} months
          </span>
        </div>
        <h1
          data-testid="plan-title"
          className="text-3xl font-bold text-gray-900 mb-3"
        >
          {plan.plan_json.title}
        </h1>
        <p data-testid="plan-summary" className="text-lg text-gray-600 leading-relaxed">
          {plan.plan_json.summary}
        </p>
      </div>

      {/* Score improvement estimate */}
      <div
        data-testid="plan-score-estimate"
        className="mb-8 rounded-xl border border-emerald-200 bg-emerald-50 p-6"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-emerald-800">Estimated Score Improvement</p>
            <p data-testid="plan-score-improvement" className="text-2xl font-bold text-emerald-700">
              {plan.plan_json.estimated_score_improvement}
            </p>
          </div>
        </div>
      </div>

      {/* Warnings */}
      {plan.plan_json.warnings.length > 0 && (
        <div data-testid="plan-warnings" className="mb-8 space-y-3">
          {plan.plan_json.warnings.map((warning, i) => (
            <div
              key={i}
              data-testid={`plan-warning-${i}`}
              className="flex gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4"
            >
              <svg className="h-5 w-5 shrink-0 text-amber-600 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.168 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-amber-800">{warning}</p>
            </div>
          ))}
        </div>
      )}

      {/* Recovery Timeline */}
      <RecoveryTimeline steps={plan.steps} estimatedMonths={plan.estimated_months} />

      {/* Step details */}
      <div data-testid="plan-steps" className="space-y-3">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Your Action Steps</h2>
        {plan.steps.map((step, index) => {
          const isExpanded = expandedSteps.has(index);
          return (
            <div
              key={step.step_order}
              data-testid={`plan-step-${step.step_order}`}
              className="rounded-xl border border-gray-200 overflow-hidden transition-shadow hover:shadow-sm"
            >
              <button
                data-testid={`plan-step-toggle-${step.step_order}`}
                onClick={() => toggleStep(index)}
                className="flex w-full items-center gap-4 p-4 text-left"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                  {step.step_order}
                </span>
                <span className="flex-1 font-medium text-gray-900">
                  {step.title}
                </span>
                <svg
                  className={`h-5 w-5 shrink-0 text-gray-400 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {isExpanded && (
                <div
                  data-testid={`plan-step-detail-${step.step_order}`}
                  className="border-t border-gray-100 bg-gray-50 px-4 pb-4 pt-3"
                >
                  <p className="text-sm text-gray-700 leading-relaxed pl-12">
                    {step.description}
                  </p>
                  {step.action_url && (
                    <div className="mt-3 pl-12">
                      <a
                        href={step.action_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`plan-step-link-${step.step_order}`}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 transition-colors"
                      >
                        Take Action
                        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Path details */}
      <div data-testid="plan-path-details" className="mt-10 rounded-xl border border-gray-200 bg-gray-50 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-3">
          About {pathInfo.title}
        </h3>
        <p className="text-sm text-gray-600 mb-4">{pathInfo.detailedDescription}</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <h4 className="text-sm font-semibold text-emerald-700 mb-2">Pros</h4>
            <ul className="space-y-1">
              {pathInfo.pros.map((pro, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-600">
                  <svg className="h-4 w-4 shrink-0 text-emerald-500 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  {pro}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-red-600 mb-2">Considerations</h4>
            <ul className="space-y-1">
              {pathInfo.cons.map((con, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-600">
                  <svg className="h-4 w-4 shrink-0 text-red-400 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                  </svg>
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Affiliate Recommendations */}
      {affiliateProducts.length > 0 && (
        <div data-testid="plan-affiliate-section" className="mt-10">
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            Recommended Tools for Your Recovery
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Based on your recovery path and score range, these products can help accelerate your progress.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {affiliateProducts.map((product) => (
              <AffiliateCard
                key={product.slug}
                product={product}
                referrerPage={referrerPage}
              />
            ))}
          </div>
          <div className="mt-4">
            <AffiliateDisclosure />
          </div>
        </div>
      )}

      {/* Email Capture */}
      <div data-testid="plan-email-section" className="mt-10">
        <EmailCapture
          planId={planId ?? null}
          recoveryPath={plan.recovery_path}
        />
      </div>

      {/* CTA — Save Plan (triggers auth modal for anonymous users) */}
      <SavePlanCTA planId={planId} />
    </div>
  );
}
