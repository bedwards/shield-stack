import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase-server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * POST /api/email/subscribe
 *
 * Subscribes an email address for the gentle drip sequence.
 * Stores in Supabase email_subscribers table.
 *
 * Body: { email: string, source_page?: string }
 * Returns: { success: true } or { error: string }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, source_page } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    const trimmed = email.trim().toLowerCase();

    if (!EMAIL_REGEX.test(trimmed)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const supabase = createServiceRoleClient();

    const { error } = await supabase.from("email_subscribers").upsert(
      {
        email: trimmed,
        source_page: source_page || null,
      },
      {
        onConflict: "email",
        ignoreDuplicates: true,
      }
    );

    if (error) {
      console.error("Failed to store email subscriber:", error);
      return NextResponse.json(
        { error: "Unable to subscribe. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }
}
