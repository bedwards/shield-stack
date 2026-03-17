import { NextResponse } from "next/server";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";
import type { RecoveryPlan } from "@/lib/database.types";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!id || id.startsWith("local-")) {
    return NextResponse.json(
      { error: "Plan not found. Local plans are stored in your browser." },
      { status: 404 },
    );
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 503 },
    );
  }

  try {
    const supabase = getSupabaseClient();

    const { data: plan, error: planError } = await supabase
      .from("recovery_plans")
      .select("*")
      .eq("id", id)
      .single();

    if (planError || !plan) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    const typedPlan = plan as RecoveryPlan;

    const { data: steps, error: stepsError } = await supabase
      .from("plan_steps")
      .select("*")
      .eq("plan_id", id)
      .order("step_order", { ascending: true });

    if (stepsError) {
      return NextResponse.json(
        { error: "Failed to fetch plan steps" },
        { status: 500 },
      );
    }

    const { data: quizResponse } = await supabase
      .from("quiz_responses")
      .select("*")
      .eq("id", typedPlan.quiz_response_id)
      .single();

    return NextResponse.json({
      plan: {
        id: typedPlan.id,
        quiz_response_id: typedPlan.quiz_response_id,
        user_id: typedPlan.user_id,
        plan_json: typedPlan.plan_json,
        recovery_path: typedPlan.recovery_path,
        estimated_months: typedPlan.estimated_months,
        created_at: typedPlan.created_at,
        steps: steps ?? [],
      },
      quiz_response: quizResponse ?? null,
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
