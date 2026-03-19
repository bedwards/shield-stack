import { NextResponse } from "next/server";
import { isTestMode } from "@/lib/env";

/**
 * Test auth endpoint — provides a mock session for E2E tests.
 * Only available when TEST_MODE=true.
 */
export async function POST() {
  if (!isTestMode()) {
    return NextResponse.json(
      { error: "Test auth is only available in test mode" },
      { status: 403 },
    );
  }

  return NextResponse.json({
    user: {
      id: "test-user-00000000-0000-0000-0000-000000000001",
      email: "testuser@ghostboard.test",
      user_type: "job_seeker",
    },
    session: {
      access_token: "test-access-token",
      refresh_token: "test-refresh-token",
      expires_at: Date.now() + 3600_000,
    },
  });
}
