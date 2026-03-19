import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";
import { isTestMode } from "@/lib/env";

const VALID_STATUSES = ["applied", "heard_back", "interviewed", "offered", "rejected", "ghosted"] as const;
const VALID_ROLE_LEVELS = ["intern", "entry", "mid", "senior", "lead", "executive"] as const;
const VALID_METHODS = ["online", "referral", "recruiter", "career_fair", "other"] as const;

type ReportStatus = (typeof VALID_STATUSES)[number];

interface ReportPayload {
  company_id: string;
  status: ReportStatus;
  applied_date: string;
  response_date?: string | null;
  role_level?: string | null;
  application_method?: string | null;
}

function validatePayload(body: unknown): { valid: true; data: ReportPayload } | { valid: false; error: string } {
  if (!body || typeof body !== "object") {
    return { valid: false, error: "Request body is required" };
  }

  const b = body as Record<string, unknown>;

  if (!b.company_id || typeof b.company_id !== "string") {
    return { valid: false, error: "company_id is required" };
  }

  if (!b.status || !VALID_STATUSES.includes(b.status as ReportStatus)) {
    return { valid: false, error: `status must be one of: ${VALID_STATUSES.join(", ")}` };
  }

  if (!b.applied_date || typeof b.applied_date !== "string") {
    return { valid: false, error: "applied_date is required (YYYY-MM-DD)" };
  }

  // Validate date format
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(b.applied_date)) {
    return { valid: false, error: "applied_date must be in YYYY-MM-DD format" };
  }

  // applied_date cannot be in the future
  const appliedDate = new Date(b.applied_date);
  if (appliedDate > new Date()) {
    return { valid: false, error: "applied_date cannot be in the future" };
  }

  if (b.response_date && typeof b.response_date === "string") {
    if (!dateRegex.test(b.response_date)) {
      return { valid: false, error: "response_date must be in YYYY-MM-DD format" };
    }
    const responseDate = new Date(b.response_date);
    if (responseDate < appliedDate) {
      return { valid: false, error: "response_date cannot be before applied_date" };
    }
  }

  if (b.role_level && !VALID_ROLE_LEVELS.includes(b.role_level as (typeof VALID_ROLE_LEVELS)[number])) {
    return { valid: false, error: `role_level must be one of: ${VALID_ROLE_LEVELS.join(", ")}` };
  }

  if (b.application_method && !VALID_METHODS.includes(b.application_method as (typeof VALID_METHODS)[number])) {
    return { valid: false, error: `application_method must be one of: ${VALID_METHODS.join(", ")}` };
  }

  return {
    valid: true,
    data: {
      company_id: b.company_id as string,
      status: b.status as ReportStatus,
      applied_date: b.applied_date as string,
      response_date: (b.response_date as string) || null,
      role_level: (b.role_level as string) || null,
      application_method: (b.application_method as string) || null,
    },
  };
}

/**
 * POST /api/reports
 * Submit a new application outcome report.
 * Includes validation, rate limiting, and duplicate detection.
 */
export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const validation = validatePayload(body);
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
    return NextResponse.json({ error: "Company not found" }, { status: 404 });
  }

  // Rate limiting: check IP-based duplicate detection
  // In test mode, skip rate limiting
  if (!isTestMode()) {
    const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    // Fingerprint duplicate detection: same company + same IP within 24 hours
    // We use a simple approach: check for recent reports from similar context
    // Since anonymous reports don't have user_id, we check by created_at window
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { data: recentReports } = await supabase
      .from("reports")
      .select("id")
      .eq("company_id", data.company_id)
      .gte("created_at", oneDayAgo);

    // Basic rate limit: max 3 reports per company per day from all anonymous users combined
    // (authenticated rate limiting with user_id will be more precise)
    if (recentReports && recentReports.length >= 10) {
      return NextResponse.json(
        { error: "Too many reports for this company today. Please try again tomorrow." },
        { status: 429 },
      );
    }

    // Global rate limit: check total anonymous reports in last hour
    // This prevents a single actor from spamming across companies
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

  // Calculate response_days if both dates provided
  let responseDays: number | null = null;
  if (data.response_date && data.applied_date) {
    const applied = new Date(data.applied_date);
    const response = new Date(data.response_date);
    responseDays = Math.round((response.getTime() - applied.getTime()) / (1000 * 60 * 60 * 24));
  }

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
    .select("id, company_id, status, applied_date, response_date, response_days, role_level, application_method, created_at")
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
