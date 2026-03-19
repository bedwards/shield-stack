import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "GhostBoard — Employer Ghosting Rate Database",
  description:
    "Search any company and see its ghosting rate. Find out if employers actually respond to job applicants before you apply.",
  keywords: [
    "employer ghosting",
    "job application response rate",
    "company ghosting rate",
    "does company ghost applicants",
    "hiring process transparency",
  ],
  openGraph: {
    type: "website",
    siteName: "GhostBoard",
  },
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
          className="border-b border-border bg-background"
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
                  className="text-xl font-bold text-primary"
                >
                  GhostBoard
                </Link>
              </div>
              <div className="hidden sm:flex items-center gap-4">
                <Link
                  href="/search"
                  data-testid="nav-search"
                  className="text-sm text-muted hover:text-foreground transition-colors"
                >
                  Search Companies
                </Link>
                <Link
                  href="/report"
                  data-testid="nav-report"
                  className="text-sm text-muted hover:text-foreground transition-colors"
                >
                  Submit Report
                </Link>
                <Link
                  href="/pricing"
                  data-testid="nav-pricing"
                  className="text-sm text-muted hover:text-foreground transition-colors"
                >
                  Pricing
                </Link>
                <Link
                  href="/blog"
                  data-testid="nav-blog"
                  className="text-sm text-muted hover:text-foreground transition-colors"
                >
                  Blog
                </Link>
                <Link
                  href="/login"
                  data-testid="nav-login"
                  className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary-hover transition-colors"
                >
                  Sign In
                </Link>
              </div>
              {/* Mobile menu button */}
              <div className="sm:hidden flex items-center gap-2">
                <Link
                  href="/login"
                  data-testid="nav-login-mobile"
                  className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary-hover transition-colors"
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
          className="border-t border-border bg-background"
        >
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div>
                <p className="font-semibold text-foreground">GhostBoard</p>
                <p className="mt-2 text-sm text-muted">
                  The crowdsourced employer accountability platform.
                </p>
              </div>
              <div>
                <p className="font-semibold text-foreground">Product</p>
                <div className="mt-2 flex flex-col gap-2">
                  <Link
                    href="/search"
                    data-testid="footer-search"
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    Search Companies
                  </Link>
                  <Link
                    href="/pricing"
                    data-testid="footer-pricing"
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    Pricing
                  </Link>
                  <Link
                    href="/blog"
                    data-testid="footer-blog"
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    Blog
                  </Link>
                </div>
              </div>
              <div>
                <p className="font-semibold text-foreground">Legal</p>
                <div className="mt-2 flex flex-col gap-2">
                  <Link
                    href="/privacy"
                    data-testid="footer-privacy"
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/terms"
                    data-testid="footer-terms"
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    Terms of Service
                  </Link>
                  <Link
                    href="/contact"
                    data-testid="footer-contact"
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-8 border-t border-border pt-6 text-center">
              <p className="text-sm text-muted" suppressHydrationWarning>
                &copy; {new Date().getFullYear()} GhostBoard. All rights
                reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
