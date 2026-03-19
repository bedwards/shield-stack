import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * POST /api/auth/claim
 *
 * Claims anonymous quiz data by linking it to the authenticated user.
 * Updates quiz_responses and recovery_plans where user_id IS NULL
 * and the plan_id matches.
 *
 * This is called after a user signs up/logs in from the SavePlanCTA.
 * Uses the server Supabase client which has the user's auth context.
 *
 * @remarks Server-side only.
 */
export async function POST(request: Request) {
  const supabase = await createClient();

  // Verify user is authenticated
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401 },
    );
  }

  let body: { plan_id?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  const { plan_id } = body;
  if (!plan_id) {
    return NextResponse.json(
      { error: "plan_id is required" },
      { status: 400 },
    );
  }

  // Use service role key for claim operations since the RLS policies
  // for anon rows with user_id=NULL need admin access to update
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!serviceRoleKey || !supabaseUrl) {
    return NextResponse.json(
      { error: "Server configuration missing" },
      { status: 500 },
    );
  }

  const { createClient: createAdminClientFn } = await import("@supabase/supabase-js");
  const admin = createAdminClientFn(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // Claim the recovery plan (only if it's currently unclaimed)
  const { data: plan, error: planError } = await admin
    .from("recovery_plans")
    .update({ user_id: user.id })
    .eq("id", plan_id)
    .is("user_id", null)
    .select("id, quiz_response_id")
    .single();

  if (planError || !plan) {
    // Plan may already be claimed or doesn't exist — not an error for the user
    return NextResponse.json({
      claimed: false,
      reason: "Plan not found or already claimed",
    });
  }

  // Also claim the linked quiz response
  if (plan.quiz_response_id) {
    await admin
      .from("quiz_responses")
      .update({ user_id: user.id })
      .eq("id", plan.quiz_response_id)
      .is("user_id", null);
  }

  // Claim any plan_steps linked to this plan (they don't have user_id,
  // but they're linked via plan_id which is now claimed)

  return NextResponse.json({
    claimed: true,
    plan_id: plan.id,
  });
}
