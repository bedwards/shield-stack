"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import PlanViewer from "@/components/PlanViewer";
import type { GeneratedPlan } from "@/lib/plan-generator";

type LoadState =
  | { status: "loading" }
  | { status: "loaded"; plan: GeneratedPlan }
  | { status: "error"; message: string };

export default function PlanPage() {
  const params = useParams<{ id: string }>();
  const [state, setState] = useState<LoadState>({ status: "loading" });

  useEffect(() => {
    const id = params.id;
    if (!id) {
      setState({ status: "error", message: "No plan ID provided" });
      return;
    }

    // Check sessionStorage for local plans first
    if (id.startsWith("local-")) {
      const stored = sessionStorage.getItem(`plan-${id}`);
      if (stored) {
        try {
          const plan = JSON.parse(stored) as GeneratedPlan;
          setState({ status: "loaded", plan });
        } catch {
          setState({ status: "error", message: "Failed to load plan from session" });
        }
      } else {
        setState({ status: "error", message: "Plan not found. It may have expired from your browser session." });
      }
      return;
    }

    // Fetch from API for database-stored plans
    fetch(`/api/plan/${id}`)
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json().catch(() => ({ error: "Server error" }));
          throw new Error(body.error ?? `Server returned ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        const plan: GeneratedPlan = {
          plan_json: data.plan.plan_json,
          recovery_path: data.plan.recovery_path,
          estimated_months: data.plan.estimated_months,
          steps: data.plan.steps.map((s: { step_order: number; title: string; description: string; action_url: string | null }) => ({
            step_order: s.step_order,
            title: s.title,
            description: s.description,
            action_url: s.action_url,
          })),
        };
        setState({ status: "loaded", plan });
      })
      .catch((err) => {
        setState({
          status: "error",
          message: err instanceof Error ? err.message : "Failed to load plan",
        });
      });
  }, [params.id]);

  if (state.status === "loading") {
    return (
      <div data-testid="plan-loading" className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <svg className="mx-auto h-8 w-8 animate-spin text-emerald-600" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="mt-4 text-gray-600">Loading your recovery plan...</p>
        </div>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div data-testid="plan-error" className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <svg className="h-6 w-6 text-red-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="mt-4 text-lg font-semibold text-gray-900">Plan Not Found</h2>
          <p data-testid="plan-error-message" className="mt-2 text-sm text-gray-600">
            {state.message}
          </p>
          <Link
            href="/"
            data-testid="plan-error-home-link"
            className="mt-6 inline-block rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500"
          >
            Take the Quiz Again
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <PlanViewer plan={state.plan} />
    </div>
  );
}
