import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "AfterLoss \u2014 Free After-Death Estate Settlement Guide",
    template: "%s | AfterLoss",
  },
  description:
    "Free step-by-step guide for settling an estate after someone dies. State-specific checklists, document templates, and compassionate guidance.",
  keywords: [
    "what to do when someone dies",
    "estate settlement checklist",
    "after death checklist",
    "probate guide",
    "settling an estate",
  ],
  openGraph: {
    title: "AfterLoss \u2014 Free After-Death Estate Settlement Guide",
    description:
      "Free step-by-step guide for settling an estate after someone dies. State-specific checklists, document templates, and compassionate guidance.",
    type: "website",
    siteName: "AfterLoss",
  },
  twitter: {
    card: "summary_large_image",
    title: "AfterLoss \u2014 Free After-Death Estate Settlement Guide",
    description:
      "Free step-by-step guide for settling an estate after someone dies.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <header data-testid="header" className="border-b border-border bg-background">
          <nav data-testid="nav" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <Link
                href="/"
                data-testid="logo-link"
                className="text-xl font-bold text-primary"
              >
                AfterLoss
              </Link>
              <div className="flex items-center gap-4">
                <Link
                  href="/#how-it-works-section"
                  data-testid="nav-how-it-works"
                  className="text-sm text-muted hover:text-foreground transition-colors hidden sm:inline"
                >
                  How It Works
                </Link>
                <Link
                  href="/states"
                  data-testid="nav-states"
                  className="text-sm text-muted hover:text-foreground transition-colors hidden sm:inline"
                >
                  State Guides
                </Link>
                <Link
                  href="/#faq-section"
                  data-testid="nav-faq"
                  className="text-sm text-muted hover:text-foreground transition-colors hidden sm:inline"
                >
                  FAQ
                </Link>
                <Link
                  href="/onboard"
                  data-testid="nav-start"
                  className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover transition-colors"
                >
                  Start Guide
                </Link>
              </div>
            </div>
          </nav>
        </header>
        <main data-testid="main-content" className="flex-1">
          {children}
        </main>
        <footer data-testid="footer" className="border-t border-border bg-background">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted" suppressHydrationWarning>
                &copy; {new Date().getFullYear()} AfterLoss. Free forever.
              </p>
              <div className="flex gap-6">
                <Link
                  href="/privacy"
                  data-testid="footer-privacy"
                  className="text-sm text-muted hover:text-foreground transition-colors"
                >
                  Privacy
                </Link>
                <Link
                  href="/terms"
                  data-testid="footer-terms"
                  className="text-sm text-muted hover:text-foreground transition-colors"
                >
                  Terms
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
        </footer>
      </body>
    </html>
  );
}
