"use client";

import { useState, useCallback } from "react";

export function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [text]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      data-testid={`copy-button-${label.replace(/\s+/g, "-")}`}
      className="shrink-0 rounded-md border border-border px-2 py-1 text-xs text-muted hover:bg-secondary hover:text-foreground transition-colors print:hidden"
      aria-label={`Copy ${label}`}
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
