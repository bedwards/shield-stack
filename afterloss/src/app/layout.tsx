import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { generateWebSiteSchema } from "@/lib/structured-data";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://afterloss.pages.dev";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: "%s | AfterLoss — Free Estate Settlement Guide",
    default: "AfterLoss — Free After-Death Estate Settlement Guide",
  },
  description:
    "Free step-by-step guide for settling an estate after someone dies. Get a personalized checklist of what to do when someone dies, with state-specific probate guidance, document templates, and compassionate support.",
  keywords: [
    "what to do when someone dies",
    "what to do when someone dies checklist",
    "after death checklist",
    "estate settlement checklist",
    "probate guide",
    "settling an estate",
    "death certificate",
    "notify social security of death",
  ],
  openGraph: {
    type: "website",
    siteName: "AfterLoss",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <JsonLd data={generateWebSiteSchema()} />
      </head>
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
                  href="/scripts"
                  data-testid="nav-scripts"
                  className="text-sm text-muted hover:text-foreground transition-colors hidden sm:inline"
                >
                  Phone Scripts
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
        <SpeedInsights />
        <Analytics />
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
