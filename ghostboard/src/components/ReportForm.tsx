"use client";

import { useState } from "react";

const STATUSES = [
  { value: "ghosted", label: "Ghosted — Never heard back" },
  { value: "heard_back", label: "Heard Back — Got a response" },
  { value: "interviewed", label: "Interviewed — Had an interview" },
  { value: "offered", label: "Offered — Received an offer" },
  { value: "rejected", label: "Rejected — Got a rejection" },
  { value: "applied", label: "Applied — Just submitted" },
] as const;

const ROLE_LEVELS = [
  { value: "intern", label: "Intern" },
  { value: "entry", label: "Entry Level" },
  { value: "mid", label: "Mid Level" },
  { value: "senior", label: "Senior" },
  { value: "lead", label: "Lead / Staff" },
  { value: "executive", label: "Executive" },
] as const;

const APPLICATION_METHODS = [
  { value: "online", label: "Online Application" },
  { value: "referral", label: "Employee Referral" },
  { value: "recruiter", label: "Recruiter Outreach" },
  { value: "career_fair", label: "Career Fair" },
  { value: "other", label: "Other" },
] as const;

interface ReportFormProps {
  companyId: string;
  companyName: string;
}

type FormState = "idle" | "submitting" | "success" | "error";

export default function ReportForm({ companyId, companyName }: ReportFormProps) {
  const [status, setStatus] = useState("");
  const [appliedDate, setAppliedDate] = useState("");
  const [responseDate, setResponseDate] = useState("");
  const [roleLevel, setRoleLevel] = useState("");
  const [applicationMethod, setApplicationMethod] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const needsResponseDate = status && status !== "ghosted" && status !== "applied";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company_id: companyId,
          status,
          applied_date: appliedDate,
          response_date: needsResponseDate ? responseDate : null,
          role_level: roleLevel || null,
          application_method: applicationMethod || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setFormState("error");
        setErrorMessage(data.error || "Failed to submit report");
        return;
      }

      setFormState("success");
    } catch {
      setFormState("error");
      setErrorMessage("Network error. Please try again.");
    }
  }

  if (formState === "success") {
    return (
      <div data-testid="report-success" className="rounded-lg border border-green-500 bg-green-50 dark:bg-green-950 p-6 text-center">
        <h3 className="text-lg font-semibold text-green-700 dark:text-green-300">Report Submitted!</h3>
        <p className="mt-2 text-sm text-green-600 dark:text-green-400">
          Thank you for sharing your experience with {companyName}. Your report helps other job seekers.
        </p>
        <button
          data-testid="report-another-button"
          onClick={() => {
            setFormState("idle");
            setStatus("");
            setAppliedDate("");
            setResponseDate("");
            setRoleLevel("");
            setApplicationMethod("");
          }}
          className="mt-4 rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--primary-hover)] transition-colors"
        >
          Submit Another Report
        </button>
      </div>
    );
  }

  return (
    <form data-testid="report-form" onSubmit={handleSubmit} className="space-y-6">
      {errorMessage && (
        <div data-testid="report-error" className="rounded-lg border border-[var(--destructive)] bg-red-50 dark:bg-red-950 p-4">
          <p className="text-sm text-[var(--destructive)]">{errorMessage}</p>
        </div>
      )}

      {/* Status */}
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-[var(--foreground)]">
          Application Outcome <span className="text-[var(--destructive)]">*</span>
        </label>
        <select
          id="status"
          data-testid="report-status-select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
          className="mt-1 block w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        >
          <option value="">Select outcome...</option>
          {STATUSES.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>

      {/* Applied Date */}
      <div>
        <label htmlFor="applied-date" className="block text-sm font-medium text-[var(--foreground)]">
          Date Applied <span className="text-[var(--destructive)]">*</span>
        </label>
        <input
          type="date"
          id="applied-date"
          data-testid="report-applied-date"
          value={appliedDate}
          onChange={(e) => setAppliedDate(e.target.value)}
          required
          max={new Date().toISOString().split("T")[0]}
          className="mt-1 block w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />
      </div>

      {/* Response Date (conditional) */}
      {needsResponseDate && (
        <div>
          <label htmlFor="response-date" className="block text-sm font-medium text-[var(--foreground)]">
            Date of Response
          </label>
          <input
            type="date"
            id="response-date"
            data-testid="report-response-date"
            value={responseDate}
            onChange={(e) => setResponseDate(e.target.value)}
            min={appliedDate}
            max={new Date().toISOString().split("T")[0]}
            className="mt-1 block w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
        </div>
      )}

      {/* Role Level */}
      <div>
        <label htmlFor="role-level" className="block text-sm font-medium text-[var(--foreground)]">
          Role Level
        </label>
        <select
          id="role-level"
          data-testid="report-role-level"
          value={roleLevel}
          onChange={(e) => setRoleLevel(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        >
          <option value="">Select level (optional)...</option>
          {ROLE_LEVELS.map((r) => (
            <option key={r.value} value={r.value}>{r.label}</option>
          ))}
        </select>
      </div>

      {/* Application Method */}
      <div>
        <label htmlFor="application-method" className="block text-sm font-medium text-[var(--foreground)]">
          How Did You Apply?
        </label>
        <select
          id="application-method"
          data-testid="report-application-method"
          value={applicationMethod}
          onChange={(e) => setApplicationMethod(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        >
          <option value="">Select method (optional)...</option>
          {APPLICATION_METHODS.map((m) => (
            <option key={m.value} value={m.value}>{m.label}</option>
          ))}
        </select>
      </div>

      {/* Submit */}
      <button
        type="submit"
        data-testid="report-submit-button"
        disabled={formState === "submitting"}
        className="w-full rounded-lg bg-[var(--primary)] px-4 py-3 font-medium text-white hover:bg-[var(--primary-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {formState === "submitting" ? "Submitting..." : "Submit Report"}
      </button>
    </form>
  );
}
