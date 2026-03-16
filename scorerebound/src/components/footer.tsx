import Link from "next/link";

export function Footer() {
  return (
    <footer
      className="border-t border-gray-200 bg-gray-50"
      data-testid="footer"
    >
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-gray-500" data-testid="footer-brand">
            ScoreRebound &mdash; Student Loan Credit Score Recovery Planner
          </p>
          <div className="flex gap-6">
            <Link
              href="/about"
              className="text-sm text-gray-500 hover:text-gray-700"
              data-testid="footer-about"
            >
              About
            </Link>
            <Link
              href="/faq"
              className="text-sm text-gray-500 hover:text-gray-700"
              data-testid="footer-faq"
            >
              FAQ
            </Link>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-gray-400">
          This tool provides educational information only. It is not financial or
          legal advice. Consult a qualified professional for advice specific to
          your situation.
        </p>
      </div>
    </footer>
  );
}
