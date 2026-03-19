import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { requiresAuth, requiresPremium } from "@/lib/features";

/**
 * Next.js middleware for feature gating.
 *
 * Checks authentication and premium subscription status for protected routes.
 * - Auth-required routes redirect to /login if no valid session
 * - Premium routes redirect to /pricing if user is on the free plan
 *
 * Uses Supabase auth cookies to verify the user's session.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip public routes and static assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/stripe/webhook") ||
    pathname.startsWith("/api/health") ||
    pathname.startsWith("/api/affiliate") ||
    pathname.startsWith("/api/rates") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // Check if this route requires auth
  if (!requiresAuth(pathname)) {
    return NextResponse.next();
  }

  // Extract Supabase auth token from cookie or Authorization header
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    // Supabase not configured yet — allow access in development
    if (process.env.NODE_ENV === "development") {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Try to get auth token from cookies (Supabase Auth stores tokens in cookies)
  // Cookie names follow: sb-{project-ref}-auth-token
  const cookies = request.cookies;
  let accessToken: string | null = null;

  // Look for Supabase auth cookies
  for (const [name, cookie] of cookies) {
    if (name.startsWith("sb-") && name.endsWith("-auth-token")) {
      try {
        // Supabase stores a JSON array [access_token, refresh_token]
        const parsed = JSON.parse(cookie.value);
        if (Array.isArray(parsed) && parsed.length > 0) {
          accessToken = parsed[0];
        }
      } catch {
        // Not JSON — try as raw token
        accessToken = cookie.value;
      }
      break;
    }
  }

  // Also check Authorization header
  if (!accessToken) {
    const authHeader = request.headers.get("authorization");
    if (authHeader?.startsWith("Bearer ")) {
      accessToken = authHeader.slice(7);
    }
  }

  if (!accessToken) {
    // Not authenticated — redirect to login
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Verify the token and get user
  const supabase = createClient(supabaseUrl, serviceRoleKey);
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(accessToken);

  if (error || !user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Auth OK — check premium requirement
  if (requiresPremium(pathname)) {
    const { data: sub } = await supabase
      .from("subscriptions")
      .select("plan, status")
      .eq("user_id", user.id)
      .eq("status", "active")
      .eq("plan", "premium")
      .limit(1)
      .single();

    if (!sub) {
      // User is on free plan — redirect to pricing
      const pricingUrl = new URL("/pricing", request.url);
      pricingUrl.searchParams.set("upgrade", "true");
      pricingUrl.searchParams.set("feature", pathname);
      return NextResponse.redirect(pricingUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (browser icon)
     * - public files (images, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|images/).*)",
  ],
};
