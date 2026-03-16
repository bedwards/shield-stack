import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZoneAlert - Neighborhood Zoning & Development Alerts",
  description:
    "Get instant alerts when zoning changes, development proposals, or public hearings are scheduled near your home. Never be blindsided by neighborhood changes again.",
  keywords: [
    "zoning change near me",
    "zoning hearing",
    "development proposal alerts",
    "neighborhood zoning",
    "public hearing schedule",
    "zoning application tracker",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <header
          data-testid="header"
          className="border-b border-[var(--border)] bg-[var(--background)]"
        >
          <nav
            data-testid="nav"
            className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          >
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <Link
                  href="/"
                  data-testid="logo-link"
                  className="text-xl font-bold text-[var(--primary)]"
                >
                  ZoneAlert
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  href="/alerts"
                  data-testid="nav-alerts"
                  className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                >
                  My Alerts
                </Link>
                <Link
                  href="/map"
                  data-testid="nav-map"
                  className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                >
                  Map View
                </Link>
                <Link
                  href="/login"
                  data-testid="nav-login"
                  className="rounded-md bg-[var(--primary)] px-3 py-2 text-sm font-medium text-white hover:bg-[var(--primary-hover)] transition-colors"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </nav>
        </header>

        <main data-testid="main-content" className="flex-1">
          {children}
        </main>

        <footer
          data-testid="footer"
          className="border-t border-[var(--border)] bg-[var(--background)]"
        >
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-[var(--muted)]">
                &copy; {new Date().getFullYear()} ZoneAlert. All rights
                reserved.
              </p>
              <div className="flex gap-6">
                <Link
                  href="/privacy"
                  data-testid="footer-privacy"
                  className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                >
                  Privacy
                </Link>
                <Link
                  href="/terms"
                  data-testid="footer-terms"
                  className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                >
                  Terms
                </Link>
                <Link
                  href="/contact"
                  data-testid="footer-contact"
                  className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
