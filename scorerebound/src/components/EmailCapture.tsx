"use client";

import { useState, useCallback } from "react";

interface EmailCaptureProps {
  planId: string | null;
  recoveryPath: string | null;
}

export default function EmailCapture({ planId, recoveryPath }: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!email.trim() || status === "submitting") return;

      setStatus("submitting");
      setErrorMessage("");

      try {
        const res = await fetch("/api/email/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.trim(),
            plan_id: planId,
            recovery_path: recoveryPath,
          }),
        });

        if (!res.ok) {
          const body = await res.json().catch(() => ({ error: "Server error" }));
          throw new Error(body.error ?? `Server returned ${res.status}`);
        }

        setStatus("success");
      } catch (err) {
        setStatus("error");
        setErrorMessage(
          err instanceof Error ? err.message : "Something went wrong. Please try again.",
        );
      }
    },
    [email, planId, recoveryPath, status],
  );

  if (status === "success") {
    return (
      <div
        data-testid="email-capture-success"
        className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center"
      >
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600">
          <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-emerald-800">
          Check your inbox!
        </h3>
        <p className="mt-1 text-sm text-emerald-700">
          We&apos;ve sent your personalized recovery tips. Look for an email from ScoreRebound.
        </p>
      </div>
    );
  }

  return (
    <div
      data-testid="email-capture-section"
      className="rounded-xl border border-gray-200 bg-gradient-to-b from-white to-gray-50 p-6"
    >
      <div className="flex items-start gap-4">
        <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100">
          <svg className="h-5 w-5 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
            <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
          </svg>
        </div>
        <div className="flex-1">
          <h3
            data-testid="email-capture-title"
            className="text-lg font-semibold text-gray-900"
          >
            Get recovery tips in your inbox
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            We&apos;ll send personalized guidance at key milestones — IBR enrollment steps,
            progress check-ins, and refinancing eligibility updates. Unsubscribe anytime.
          </p>
          <form
            data-testid="email-capture-form"
            onSubmit={handleSubmit}
            className="mt-4 flex flex-col gap-3 sm:flex-row"
          >
            <input
              data-testid="email-capture-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
            <button
              data-testid="email-capture-submit"
              type="submit"
              disabled={status === "submitting"}
              className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition-all ${
                status === "submitting"
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-emerald-600 text-white shadow-sm hover:bg-emerald-500"
              }`}
            >
              {status === "submitting" ? (
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Subscribing...
                </span>
              ) : (
                "Send Me Tips"
              )}
            </button>
          </form>
          {status === "error" && (
            <p
              data-testid="email-capture-error"
              className="mt-2 text-sm text-red-600"
            >
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
