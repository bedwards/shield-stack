"use client";

export function PrintButton() {
  return (
    <button
      data-testid="print-button"
      type="button"
      onClick={() => window.print()}
      className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary transition-colors print:hidden"
    >
      Print This Script
    </button>
  );
}
