import Link from "next/link";

export function Header() {
  return (
    <header
      className="border-b border-gray-200 bg-white"
      data-testid="header"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-xl font-bold text-brand-700"
          data-testid="header-logo"
        >
          ScoreRebound
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/quiz"
            className="text-sm font-medium text-gray-700 hover:text-brand-600"
            data-testid="nav-quiz"
          >
            Recovery Quiz
          </Link>
          <Link
            href="/quiz"
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
            data-testid="nav-cta"
          >
            Get Your Plan
          </Link>
        </div>
      </nav>
    </header>
  );
}
