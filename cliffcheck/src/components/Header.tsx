import Link from "next/link";

export function Header() {
  return (
    <header
      data-testid="header"
      className="border-b border-gray-200 dark:border-gray-800"
    >
      <nav
        data-testid="header-nav"
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4"
      >
        <Link
          href="/"
          data-testid="header-logo"
          className="text-xl font-bold"
        >
          CliffCheck
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/calculator"
            data-testid="nav-calculator"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            Calculator
          </Link>
          <Link
            href="/calculator"
            data-testid="nav-cta"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Get Started
          </Link>
        </div>
      </nav>
    </header>
  );
}
