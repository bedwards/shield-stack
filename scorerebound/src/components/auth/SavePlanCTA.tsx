"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { createClient } from "@/lib/supabase/client";

interface SavePlanCTAProps {
  planId?: string;
}

export default function SavePlanCTA({ planId }: SavePlanCTAProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"signup" | "login">("signup");

  const handleSaveClick = useCallback(() => {
    if (user) {
      // Already authenticated — claim the plan directly
      claimPlan();
    } else {
      setShowModal(true);
    }
  }, [user]);

  const claimPlan = useCallback(async () => {
    if (!planId) return;

    try {
      const res = await fetch("/api/auth/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan_id: planId }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({ error: "Claim failed" }));
        console.error("Claim failed:", body.error);
      }

      router.push("/account");
      router.refresh();
    } catch (err) {
      console.error("Claim error:", err);
    }
  }, [planId, router]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();

    if (mode === "signup") {
      if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        setLoading(false);
        return;
      }

      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?redirect=/account`,
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      // After signup, try to claim the plan
      await claimPlan();
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }

      // After login, claim the plan
      await claimPlan();
    }

    setLoading(false);
    setShowModal(false);
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    setError(null);

    // Store plan ID in sessionStorage so we can claim after OAuth redirect
    if (planId) {
      sessionStorage.setItem("pending-claim-plan-id", planId);
    }

    const supabase = createClient();
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?redirect=/account`,
      },
    });

    if (oauthError) {
      setError(oauthError.message);
      setLoading(false);
    }
  };

  return (
    <>
      <div data-testid="plan-cta" className="mt-10 text-center">
        <p className="text-gray-600 mb-4">
          {user
            ? "Save this plan to your account to track your progress."
            : "Want to save your plan and track your progress?"}
        </p>
        <button
          data-testid="plan-save-cta"
          onClick={handleSaveClick}
          className="rounded-lg bg-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-emerald-500 transition-colors"
        >
          {user ? "Save Plan to My Account" : "Create Free Account to Save Plan"}
        </button>
      </div>

      {/* Auth Modal */}
      {showModal && (
        <div
          data-testid="save-plan-modal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowModal(false);
          }}
        >
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 data-testid="save-plan-modal-title" className="text-lg font-bold text-gray-900">
                {mode === "signup" ? "Create your account" : "Sign in to your account"}
              </h2>
              <button
                data-testid="save-plan-modal-close"
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <p className="mb-4 text-sm text-gray-600">
              Save your recovery plan and track your credit score improvement over time.
            </p>

            <form onSubmit={handleAuth} className="space-y-3">
              <div>
                <input
                  data-testid="save-plan-email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div>
                <input
                  data-testid="save-plan-password"
                  type="password"
                  autoComplete={mode === "signup" ? "new-password" : "current-password"}
                  required
                  minLength={6}
                  placeholder={mode === "signup" ? "Create a password (min 6 characters)" : "Your password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              {error && (
                <div data-testid="save-plan-error" className="rounded-lg bg-red-50 border border-red-200 p-2 text-sm text-red-700">
                  {error}
                </div>
              )}

              <button
                data-testid="save-plan-submit"
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Please wait..."
                  : mode === "signup"
                    ? "Create account & save plan"
                    : "Sign in & save plan"}
              </button>
            </form>

            <div className="mt-4">
              <button
                data-testid="save-plan-google"
                type="button"
                onClick={handleGoogleAuth}
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Continue with Google
              </button>
            </div>

            <p className="mt-4 text-center text-xs text-gray-500">
              {mode === "signup" ? (
                <>
                  Already have an account?{" "}
                  <button
                    data-testid="save-plan-switch-login"
                    onClick={() => { setMode("login"); setError(null); }}
                    className="font-medium text-emerald-600 hover:text-emerald-500"
                  >
                    Sign in
                  </button>
                </>
              ) : (
                <>
                  Need an account?{" "}
                  <button
                    data-testid="save-plan-switch-signup"
                    onClick={() => { setMode("signup"); setError(null); }}
                    className="font-medium text-emerald-600 hover:text-emerald-500"
                  >
                    Create one
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
