import Link from "next/link";

export function Footer() {
  return (
    <footer
      data-testid="footer"
      className="border-t border-gray-200 dark:border-gray-800"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
        <div className="flex items-center gap-2">
          <span
            data-testid="footer-brand"
            className="text-sm font-semibold"
          >
            CliffCheck
          </span>
          <span className="text-sm text-gray-500" suppressHydrationWarning>
            &copy; {new Date().getFullYear()}
          </span>
        </div>
        <div className="flex items-center gap-6">
          <Link
            href="/calculator"
            data-testid="footer-calculator-link"
            className="text-sm text-gray-500 transition-colors hover:text-gray-900 dark:hover:text-gray-100"
          >
            Calculator
          </Link>
          <Link
            href="/faq"
            data-testid="footer-faq-link"
            className="text-sm text-gray-500 transition-colors hover:text-gray-900 dark:hover:text-gray-100"
          >
            FAQ
          </Link>
          <Link
            href="/about"
            data-testid="footer-about-link"
            className="text-sm text-gray-500 transition-colors hover:text-gray-900 dark:hover:text-gray-100"
          >
            About
          </Link>
        </div>
        <p
          data-testid="footer-disclaimer"
          className="text-xs text-gray-400"
        >
          Not financial or legal advice. Estimates only.
        </p>
      </div>
    </footer>
  );
}
