import { NextResponse } from "next/server";
import {
  generatePlan,
  validateQuizInput,
} from "@/lib/plan-generator";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";
import type {
  QuizResponseInsert,
  RecoveryPlanInsert,
  PlanStepInsert,
} from "@/lib/database.types";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON in request body" },
      { status: 400 },
    );
  }

  const validation = validateQuizInput(body);
  if (!validation.valid) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const plan = generatePlan(validation.data);

  // Try to persist to Supabase (best-effort — plan generation always succeeds)
  let planId: string | null = null;

  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseClient();

      const quizInsert: QuizResponseInsert = {
        user_id: null,
        loan_type: validation.data.loan_type,
        servicer: validation.data.servicer,
        delinquency_status: validation.data.delinquency_status,
        current_score_range: validation.data.current_score_range,
        goals: validation.data.goals,
      };

      const { data: quizRow, error: quizError } = await supabase
        .from("quiz_responses")
        .insert(quizInsert as never)
        .select("id")
        .single();

      if (quizError || !quizRow) {
        throw new Error(
          quizError?.message ?? "Failed to insert quiz response",
        );
      }

      const quizId = (quizRow as { id: string }).id;

      const planInsert: RecoveryPlanInsert = {
        quiz_response_id: quizId,
        user_id: null,
        plan_json: plan.plan_json,
        recovery_path: plan.recovery_path,
        estimated_months: plan.estimated_months,
      };

      const { data: planRow, error: planError } = await supabase
        .from("recovery_plans")
        .insert(planInsert as never)
        .select("id")
        .single();

      if (planError || !planRow) {
        throw new Error(
          planError?.message ?? "Failed to insert recovery plan",
        );
      }

      const newPlanId = (planRow as { id: string }).id;

      const stepsToInsert: PlanStepInsert[] = plan.steps.map((step) => ({
        plan_id: newPlanId,
        step_order: step.step_order,
        title: step.title,
        description: step.description,
        action_url: step.action_url,
      }));

      const { error: stepsError } = await supabase
        .from("plan_steps")
        .insert(stepsToInsert as never);

      if (stepsError) {
        throw new Error(stepsError.message);
      }

      planId = newPlanId;
    } catch (error) {
      console.error("Failed to persist plan to database:", error);
    }
  }

  return NextResponse.json({
    plan_id: planId,
    plan,
  });
}
