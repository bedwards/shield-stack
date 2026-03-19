"use client";

import { useState, useEffect } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STORAGE_KEY = "afterloss-email-subscribed";

interface EmailCaptureProps {
  sourcePage: string;
}

export default function EmailCapture({ sourcePage }: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "true") {
        setStatus("success");
      }
    } catch {
      // localStorage unavailable — continue with form
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");

    const trimmed = email.trim();
    if (!trimmed || !EMAIL_REGEX.test(trimmed)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/email/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, source_page: sourcePage }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(
          data.error || "Something went wrong. Please try again."
        );
        setStatus("error");
        return;
      }

      setStatus("success");
      try {
        localStorage.setItem(STORAGE_KEY, "true");
      } catch {
        // localStorage unavailable — success still shown
      }
    } catch {
      setErrorMessage("Unable to connect. Please try again later.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section
        data-testid="email-capture-form"
        className="rounded-lg bg-primary-light border border-primary/20 px-6 py-8 text-center"
      >
        <p
          data-testid="email-success"
          className="text-lg font-medium text-foreground"
        >
          Thank you. We&apos;ll be here when you&apos;re ready.
        </p>
        <p className="mt-2 text-sm text-muted">
          We&apos;ll send gentle reminders and helpful resources — no spam, ever.
        </p>
      </section>
    );
  }

  return (
    <section
      data-testid="email-capture-form"
      className="rounded-lg bg-primary-light border border-primary/20 px-6 py-8"
    >
      <div className="mx-auto max-w-xl text-center">
        <h3 className="text-lg font-semibold text-foreground">
          Not ready to start yet? That&apos;s okay.
        </h3>
        <p className="mt-2 text-sm text-muted">
          Get gentle reminders and helpful resources — at your own pace, when
          you&apos;re ready.
        </p>
        <form
          onSubmit={handleSubmit}
          className="mt-5 flex flex-col sm:flex-row gap-3 justify-center"
        >
          <input
            data-testid="email-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            aria-label="Email address"
            required
            className="flex-1 max-w-sm rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-warm-gray focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <button
            data-testid="email-submit"
            type="submit"
            disabled={status === "submitting"}
            className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-primary-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "submitting" ? "Sending..." : "Get Gentle Reminders"}
          </button>
        </form>
        {errorMessage && (
          <p
            data-testid="email-error"
            className="mt-3 text-sm text-destructive"
            role="alert"
          >
            {errorMessage}
          </p>
        )}
        <p className="mt-3 text-xs text-muted">
          No spam. Unsubscribe anytime. We respect your privacy and your grief.
        </p>
      </div>
    </section>
  );
}
