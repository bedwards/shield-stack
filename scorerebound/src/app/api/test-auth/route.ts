import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/database.types";

export const runtime = "edge";

const TEST_USER_EMAIL = "e2e-test@scorerebound.example.com";
const TEST_USER_PASSWORD = "e2e-test-password-scorerebound-2026";

/**
 * POST /api/test-auth
 *
 * Test-only endpoint that creates/signs in a test user and returns session cookies.
 * Returns 404 unless TEST_MODE=true.
 * Uses SUPABASE_SERVICE_ROLE_KEY (server-only) to create users with email_confirm: true.
 *
 * @remarks Server-side only — do not import in client components.
 */
export async function POST() {
  // Gate: only available in test mode
  if (process.env.TEST_MODE !== "true") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json(
      { error: "Supabase configuration missing. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY." },
      { status: 500 },
    );
  }

  // Admin client with service role key — bypasses RLS
  const adminClient = createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  try {
    // Step 1: Try to create the test user (idempotent — if exists, we catch and sign in)
    const { data: createData, error: createError } =
      await adminClient.auth.admin.createUser({
        email: TEST_USER_EMAIL,
        password: TEST_USER_PASSWORD,
        email_confirm: true,
        user_metadata: {
          display_name: "E2E Test User",
          is_test_user: true,
        },
      });

    let userId: string;

    if (createError) {
      // User already exists — this is expected on subsequent calls
      if (
        createError.message.includes("already been registered") ||
        createError.message.includes("already exists")
      ) {
        // Look up the existing user
        const { data: listData, error: listError } =
          await adminClient.auth.admin.listUsers();

        if (listError) {
          return NextResponse.json(
            { error: `Failed to list users: ${listError.message}` },
            { status: 500 },
          );
        }

        const existingUser = listData.users.find(
          (u) => u.email === TEST_USER_EMAIL,
        );

        if (!existingUser) {
          return NextResponse.json(
            { error: "Test user reported as existing but not found in list" },
            { status: 500 },
          );
        }

        userId = existingUser.id;
      } else {
        return NextResponse.json(
          { error: `Failed to create test user: ${createError.message}` },
          { status: 500 },
        );
      }
    } else {
      userId = createData.user.id;
    }

    // Step 2: Sign in the test user to get a session
    // Use a separate client (not admin) for sign-in so we get proper auth tokens
    const authClient = createClient<Database>(
      supabaseUrl,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? serviceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      },
    );

    const { data: signInData, error: signInError } =
      await authClient.auth.signInWithPassword({
        email: TEST_USER_EMAIL,
        password: TEST_USER_PASSWORD,
      });

    if (signInError || !signInData.session) {
      return NextResponse.json(
        {
          error: `Failed to sign in test user: ${signInError?.message ?? "No session returned"}`,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      user_id: userId,
      email: TEST_USER_EMAIL,
      access_token: signInData.session.access_token,
      refresh_token: signInData.session.refresh_token,
      expires_at: signInData.session.expires_at,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: `Unexpected error: ${error instanceof Error ? error.message : "Unknown error"}`,
      },
      { status: 500 },
    );
  }
}
