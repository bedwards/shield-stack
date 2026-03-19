import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import AuthProvider from "@/components/auth/AuthProvider";
import NavAuth from "@/components/auth/NavAuth";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ScoreRebound — Student Loan Credit Score Recovery Planner",
  description:
    "Free personalized plan to recover your credit score after student loan delinquency. Get step-by-step guidance for IBR enrollment, rehabilitation, consolidation, and credit building.",
  keywords: [
    "student loan credit score",
    "credit score recovery",
    "student loan default",
    "student loan rehabilitation",
    "IBR enrollment",
    "credit score dropped",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-white text-gray-900 antialiased">
        <AuthProvider>
        <header
          data-testid="header"
          className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60"
        >
          <nav
            data-testid="main-nav"
            className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
          >
            <Link
              href="/"
              data-testid="logo-link"
              className="flex items-center gap-2 text-xl font-bold text-emerald-700"
            >
              <svg
                data-testid="logo-icon"
                className="h-8 w-8"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2.5" />
                <path
                  d="M10 20 L14 12 L18 18 L22 10"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              ScoreRebound
            </Link>
            <div className="flex items-center gap-6">
              <Link
                href="/#how-it-works"
                data-testid="nav-how-it-works"
                className="hidden text-sm font-medium text-gray-600 hover:text-emerald-700 sm:block"
              >
                How It Works
              </Link>
              <Link
                href="/#recovery-paths"
                data-testid="nav-recovery-paths"
                className="hidden text-sm font-medium text-gray-600 hover:text-emerald-700 sm:block"
              >
                Recovery Paths
              </Link>
              <Link
                href="/#faq"
                data-testid="nav-faq"
                className="hidden text-sm font-medium text-gray-600 hover:text-emerald-700 sm:block"
              >
                FAQ
              </Link>
              <Link
                href="/#quiz"
                data-testid="nav-cta"
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
              >
                Get My Free Plan
              </Link>
              <NavAuth />
            </div>
          </nav>
        </header>

        <main data-testid="main-content" className="flex-1">
          {children}
        </main>

        <footer
          data-testid="footer"
          className="border-t border-gray-200 bg-gray-50"
        >
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  ScoreRebound
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Free tools to help you recover your credit score after student
                  loan delinquency.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Recovery Paths
                </h3>
                <ul className="mt-2 space-y-2">
                  <li>
                    <Link
                      href="/recovery/ibr"
                      data-testid="footer-link-ibr"
                      className="text-sm text-gray-600 hover:text-emerald-700"
                    >
                      Income-Based Repayment
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/recovery/rehabilitation"
                      data-testid="footer-link-rehabilitation"
                      className="text-sm text-gray-600 hover:text-emerald-700"
                    >
                      Loan Rehabilitation
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/recovery/consolidation"
                      data-testid="footer-link-consolidation"
                      className="text-sm text-gray-600 hover:text-emerald-700"
                    >
                      Consolidation
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Resources
                </h3>
                <ul className="mt-2 space-y-2">
                  <li>
                    <Link
                      href="/resources/credit-building"
                      data-testid="footer-link-credit-building"
                      className="text-sm text-gray-600 hover:text-emerald-700"
                    >
                      Credit Building Guide
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/resources/servicer-contacts"
                      data-testid="footer-link-servicers"
                      className="text-sm text-gray-600 hover:text-emerald-700"
                    >
                      Servicer Contacts
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Legal</h3>
                <ul className="mt-2 space-y-2">
                  <li>
                    <Link
                      href="/privacy"
                      data-testid="footer-link-privacy"
                      className="text-sm text-gray-600 hover:text-emerald-700"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms"
                      data-testid="footer-link-terms"
                      className="text-sm text-gray-600 hover:text-emerald-700"
                    >
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 border-t border-gray-200 pt-8">
              <p
                data-testid="footer-copyright"
                className="text-center text-xs text-gray-500"
                suppressHydrationWarning
              >
                &copy; {new Date().getFullYear()} ScoreRebound. Not financial
                advice. Consult a qualified professional for your specific
                situation.
              </p>
            </div>
          </div>
        </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
