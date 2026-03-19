"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";
import { createClient } from "@/lib/supabase/client";
import type { Profile, RecoveryPlan, RecoveryPlanJson } from "@/lib/database.types";
import { RECOVERY_PATHS } from "@/lib/recovery-paths";

interface PlanWithQuiz extends RecoveryPlan {
  quiz_responses?: {
    current_score_range: string;
    loan_type: string;
    servicer: string;
  } | null;
}

export default function AccountPage() {
  const { user, loading: authLoading, signOut } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [plans, setPlans] = useState<PlanWithQuiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [notifEmail, setNotifEmail] = useState(true);
  const [saving, setSaving] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push("/auth/login?redirect=/account");
      return;
    }

    const fetchData = async () => {
      const supabase = createClient();

      // Fetch profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileData) {
        setProfile(profileData as Profile);
        setNotifEmail(
          (profileData as Profile).notification_prefs?.email ?? true,
        );
      }

      // Fetch recovery plans with quiz data
      const { data: plansData } = await supabase
        .from("recovery_plans")
        .select("*, quiz_responses(current_score_range, loan_type, servicer)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (plansData) {
        setPlans(plansData as unknown as PlanWithQuiz[]);
      }

      // Check for pending plan claim from OAuth flow
      const pendingPlanId = sessionStorage.getItem("pending-claim-plan-id");
      if (pendingPlanId) {
        sessionStorage.removeItem("pending-claim-plan-id");
        try {
          await fetch("/api/auth/claim", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ plan_id: pendingPlanId }),
          });
          // Refetch plans after claim
          const { data: refreshedPlans } = await supabase
            .from("recovery_plans")
            .select("*, quiz_responses(current_score_range, loan_type, servicer)")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false });
          if (refreshedPlans) {
            setPlans(refreshedPlans as unknown as PlanWithQuiz[]);
          }
        } catch {
          // Claim failed silently — plan may already be claimed
        }
      }

      setLoading(false);
    };

    fetchData();
  }, [user, authLoading, router]);

  const handleSavePrefs = async () => {
    if (!user) return;
    setSaving(true);

    const supabase = createClient();
    await supabase
      .from("profiles")
      .update({
        notification_prefs: { email: notifEmail, push: false },
      })
      .eq("id", user.id);

    setSaving(false);
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  // Guard against hydration mismatch (Zustand persist pattern from learnings)
  if (!mounted) {
    return (
      <div data-testid="account-loading" className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
      </div>
    );
  }

  if (authLoading || loading) {
    return (
      <div data-testid="account-loading" className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div data-testid="account-page" className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 data-testid="account-title" className="text-2xl font-bold text-gray-900">
          My Account
        </h1>
        <button
          data-testid="account-signout"
          onClick={handleSignOut}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Sign out
        </button>
      </div>

      {/* Account Info */}
      <section data-testid="account-info" className="mb-8 rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Details</h2>
        <div className="space-y-3">
          <div>
            <span className="text-sm font-medium text-gray-500">Email</span>
            <p data-testid="account-email" className="text-gray-900">{user.email}</p>
          </div>
          {profile?.display_name && (
            <div>
              <span className="text-sm font-medium text-gray-500">Display name</span>
              <p data-testid="account-display-name" className="text-gray-900">{profile.display_name}</p>
            </div>
          )}
          <div>
            <span className="text-sm font-medium text-gray-500">Member since</span>
            <p data-testid="account-created" className="text-gray-900">
              {new Date(user.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </section>

      {/* Saved Recovery Plans */}
      <section data-testid="account-plans" className="mb-8 rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Saved Recovery Plans</h2>
        {plans.length === 0 ? (
          <div data-testid="account-no-plans" className="text-center py-8">
            <p className="text-gray-600 mb-4">You haven&apos;t saved any recovery plans yet.</p>
            <Link
              href="/"
              data-testid="account-take-quiz"
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500"
            >
              Take the Quiz
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {plans.map((plan) => {
              const pathInfo = RECOVERY_PATHS[plan.recovery_path];
              const planJson = plan.plan_json as RecoveryPlanJson;
              return (
                <Link
                  key={plan.id}
                  href={`/plan/${plan.id}`}
                  data-testid={`account-plan-${plan.id}`}
                  className="block rounded-lg border border-gray-200 p-4 hover:border-emerald-300 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">
                        {pathInfo?.title ?? plan.recovery_path}
                      </span>
                      <h3 className="mt-1 font-medium text-gray-900">{planJson.title}</h3>
                      <p className="text-sm text-gray-600">~{plan.estimated_months} months</p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(plan.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* Email Notification Preferences */}
      <section data-testid="account-settings" className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">Email notifications</p>
            <p className="text-sm text-gray-600">Receive recovery tips and progress reminders</p>
          </div>
          <label data-testid="account-email-toggle" className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={notifEmail}
              onChange={(e) => setNotifEmail(e.target.checked)}
              className="peer sr-only"
              data-testid="account-email-checkbox"
            />
            <div className="h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-emerald-600 peer-checked:after:translate-x-full peer-checked:after:border-white" />
          </label>
        </div>
        <button
          data-testid="account-save-settings"
          onClick={handleSavePrefs}
          disabled={saving}
          className="mt-4 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save preferences"}
        </button>
      </section>
    </div>
  );
}
