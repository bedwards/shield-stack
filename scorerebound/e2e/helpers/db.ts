import { expect } from "@playwright/test";
import { getAdminClient } from "./auth";

const TEST_USER_EMAIL = "e2e-test@scorerebound.example.com";

/**
 * Verify that a quiz_responses row exists for the given user.
 *
 * @param userId - The Supabase auth user ID
 * @returns The quiz response row (for chaining with verifyRecoveryPlan)
 */
export async function verifyQuizResponse(userId: string) {
  const admin = getAdminClient();

  const { data, error } = await admin
    .from("quiz_responses")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  expect(error).toBeNull();
  expect(data).not.toBeNull();
  expect(data!.user_id).toBe(userId);
  expect(data!.loan_type).toBeTruthy();
  expect(data!.servicer).toBeTruthy();
  expect(data!.delinquency_status).toBeTruthy();
  expect(data!.current_score_range).toBeTruthy();
  expect(data!.goals).toBeTruthy();

  return data!;
}

/**
 * Verify that a recovery_plans row exists for the given quiz response.
 *
 * @param quizResponseId - The ID of the quiz_response row
 * @returns The recovery plan row
 */
export async function verifyRecoveryPlan(quizResponseId: string) {
  const admin = getAdminClient();

  const { data, error } = await admin
    .from("recovery_plans")
    .select("*")
    .eq("quiz_response_id", quizResponseId)
    .single();

  expect(error).toBeNull();
  expect(data).not.toBeNull();
  expect(data!.quiz_response_id).toBe(quizResponseId);
  expect(data!.recovery_path).toBeTruthy();
  expect(data!.estimated_months).toBeGreaterThan(0);
  expect(data!.plan_json).toBeTruthy();

  return data!;
}

/**
 * Verify that plan_steps rows exist for a recovery plan.
 *
 * @param planId - The ID of the recovery_plans row
 * @returns Array of plan step rows
 */
export async function verifyPlanSteps(planId: string) {
  const admin = getAdminClient();

  const { data, error } = await admin
    .from("plan_steps")
    .select("*")
    .eq("plan_id", planId)
    .order("step_order", { ascending: true });

  expect(error).toBeNull();
  expect(data).not.toBeNull();
  expect(data!.length).toBeGreaterThan(0);

  // Verify steps are ordered correctly
  for (let i = 0; i < data!.length; i++) {
    expect(data![i]!.step_order).toBe(i + 1);
    expect(data![i]!.title).toBeTruthy();
    expect(data![i]!.description).toBeTruthy();
  }

  return data!;
}

/**
 * Clean up all test data created by E2E tests.
 * Deletes quiz_responses, recovery_plans, plan_steps, and the test user.
 *
 * Uses cascading deletes via the admin client (bypasses RLS).
 * This is idempotent — safe to call even if no test data exists.
 */
export async function cleanupTestUser() {
  const admin = getAdminClient();

  // Find the test user
  const { data: listData, error: listError } =
    await admin.auth.admin.listUsers();

  if (listError) {
    console.error("Failed to list users for cleanup:", listError.message);
    return;
  }

  const testUser = listData.users.find(
    (u) => u.email === TEST_USER_EMAIL,
  );

  if (!testUser) {
    // No test user found — nothing to clean up
    return;
  }

  const userId = testUser.id;

  // Delete test data in dependency order (child tables first)

  // 1. Get plan IDs for this user to clean up plan_steps
  const { data: plans } = await admin
    .from("recovery_plans")
    .select("id")
    .eq("user_id", userId);

  if (plans && plans.length > 0) {
    const planIds = plans.map((p) => p.id);

    // Delete plan_steps for these plans
    await admin.from("plan_steps").delete().in("plan_id", planIds);
  }

  // 2. Delete recovery_plans
  await admin.from("recovery_plans").delete().eq("user_id", userId);

  // 3. Delete quiz_responses
  await admin.from("quiz_responses").delete().eq("user_id", userId);

  // 4. Delete affiliate_clicks if any
  await admin.from("affiliate_clicks").delete().eq("user_id", userId);

  // 5. Delete progress_entries if any
  await admin.from("progress_entries").delete().eq("user_id", userId);

  // 6. Delete email_sequences if any
  await admin.from("email_sequences").delete().eq("user_id", userId);

  // 7. Delete profile if any
  await admin.from("profiles").delete().eq("id", userId);

  // 8. Delete the auth user
  const { error: deleteError } =
    await admin.auth.admin.deleteUser(userId);

  if (deleteError) {
    console.error("Failed to delete test user:", deleteError.message);
  }
}
