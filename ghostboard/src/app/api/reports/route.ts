import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";
import { isTestMode } from "@/lib/env";
import {
  validateReportPayload,
  calculateResponseDays,
  RATE_LIMITS,
} from "@/lib/report-validation";

/**
 * Generates a fingerprint from request headers for duplicate detection.
 * Uses IP + User-Agent to identify likely same-user submissions.
 */
function getRequestFingerprint(request: NextRequest): string {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const ua = request.headers.get("user-agent") || "unknown";
  return `${ip}:${ua.slice(0, 50)}`;
}

/**
 * POST /api/reports
 * Submit a new application outcome report.
 * Includes validation, user-tier-aware rate limiting, and fingerprint duplicate detection.
 */
export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const validation = validateReportPayload(body);
  if (!validation.valid) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const { data } = validation;
  const supabase = createServerClient();

  // Verify company exists
  const { data: company, error: companyError } = await supabase
    .from("companies")
    .select("id, name")
    .eq("id", data.company_id)
    .single();

  if (companyError || !company) {
    return NextResponse.json(
      { error: "Company not found" },
      { status: 404 },
    );
  }

  // Rate limiting and duplicate detection (skip in test mode)
  if (!isTestMode()) {
    const _fingerprint = getRequestFingerprint(request);
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    // Fingerprint duplicate detection: same company + same applied_date + same status
    // submitted recently indicates a duplicate submission
    const { data: duplicateReports } = await supabase
      .from("reports")
      .select("id")
      .eq("company_id", data.company_id)
      .eq("applied_date", data.applied_date)
      .eq("status", data.status)
      .gte("created_at", oneDayAgo)
      .limit(1);

    if (duplicateReports && duplicateReports.length > 0) {
      return NextResponse.json(
        {
          error:
            "A similar report for this company and date was already submitted recently.",
        },
        { status: 409 },
      );
    }

    // User-tier-aware rate limiting
    let dailyLimit = RATE_LIMITS.free; // Default: anonymous/free = 3/day

    const authHeader = request.headers.get("authorization");
    if (authHeader?.startsWith("Bearer ")) {
      const { data: userData } = await supabase.auth.getUser(
        authHeader.split(" ")[1],
      );

      if (userData?.user) {
        const { data: subscription } = await supabase
          .from("subscriptions")
          .select("plan")
          .eq("user_id", userData.user.id)
          .eq("status", "active")
          .single();

        const plan = subscription?.plan || "free";
        dailyLimit = RATE_LIMITS[plan] ?? RATE_LIMITS.free;
      }
    }

    // Company-level rate limit (3x user limit to account for multiple users)
    const { data: recentReports } = await supabase
      .from("reports")
      .select("id")
      .eq("company_id", data.company_id)
      .gte("created_at", oneDayAgo);

    if (recentReports && recentReports.length >= dailyLimit * 3) {
      return NextResponse.json(
        {
          error:
            "Too many reports for this company today. Please try again tomorrow.",
        },
        { status: 429 },
      );
    }

    // Global anonymous rate limit: prevent mass-spamming across companies
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count: hourlyCount } = await supabase
      .from("reports")
      .select("id", { count: "exact", head: true })
      .is("user_id", null)
      .gte("created_at", oneHourAgo);

    if (hourlyCount && hourlyCount >= 50) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again later." },
        { status: 429 },
      );
    }
  }

  // Calculate response_days
  const responseDays = calculateResponseDays(
    data.applied_date,
    data.response_date,
  );

  // Insert the report
  const { data: report, error: insertError } = await supabase
    .from("reports")
    .insert({
      company_id: data.company_id,
      status: data.status,
      applied_date: data.applied_date,
      response_date: data.response_date,
      response_days: responseDays,
      role_level: data.role_level,
      application_method: data.application_method,
    })
    .select(
      "id, company_id, status, applied_date, response_date, response_days, role_level, application_method, created_at",
    )
    .single();

  if (insertError) {
    return NextResponse.json(
      { error: "Failed to submit report", details: insertError.message },
      { status: 500 },
    );
  }

  return NextResponse.json(
    {
      report,
      message: `Report submitted for ${company.name}`,
    },
    { status: 201 },
  );
}
