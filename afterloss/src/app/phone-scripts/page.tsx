import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { generateBreadcrumbSchema } from "@/lib/structured-data";
import { PHONE_SCRIPTS } from "@/data/phone-scripts";

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://afterloss.pages.dev";

const CURRENT_YEAR = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Phone Scripts for Calling After Someone Dies (${CURRENT_YEAR}) — What to Say`,
  description:
    "Free word-for-word phone scripts for every call you need to make after someone dies. Know exactly what to say when calling Social Security, banks, insurance companies, credit bureaus, and employers.",
  keywords: [
    "what to say when calling social security about a death",
    "how to call bank about deceased account holder",
    "what to tell insurance company when someone dies",
    "phone script after death",
    "what to say when reporting a death",
    "how to notify credit bureau of death",
  ],
  alternates: {
    canonical: `${BASE_URL}/phone-scripts`,
  },
  openGraph: {
    title: `Phone Scripts for Calling After Someone Dies (${CURRENT_YEAR})`,
    description:
      "Free word-for-word phone scripts for every call you need to make after someone dies.",
    type: "website",
    url: `${BASE_URL}/phone-scripts`,
    siteName: "AfterLoss",
  },
};

function estimateTotalTime(): string {
  const durations = PHONE_SCRIPTS.map((s) => {
    const match = s.expectedDuration.match(/(\d+)/);
    return match ? parseInt(match[1]) : 30;
  });
  const totalMin = durations.reduce((sum, d) => sum + d, 0);
  const totalMax = durations.reduce((sum, d) => sum + d + 15, 0);
  const hours = Math.floor(totalMax / 60);
  return `${totalMin}\u2013${totalMax} minutes (~${hours}+ hours)`;
}

export default function PhoneScriptsIndexPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: BASE_URL },
    { name: "Phone Scripts", url: `${BASE_URL}/phone-scripts` },
  ]);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Phone Scripts for Calling After Someone Dies (${CURRENT_YEAR})`,
    description:
      "Free word-for-word phone scripts for every call you need to make after someone dies.",
    url: `${BASE_URL}/phone-scripts`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: PHONE_SCRIPTS.length,
      itemListElement: PHONE_SCRIPTS.map((script, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: script.title,
        url: `${BASE_URL}/phone-scripts/${script.slug}`,
      })),
    },
  };

  return (
    <div data-testid="phone-scripts-index-page">
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={collectionSchema} />

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav
          data-testid="breadcrumb-nav"
          aria-label="Breadcrumb"
          className="mb-8 text-sm text-muted"
        >
          <ol className="flex items-center gap-2">
            <li>
              <Link
                href="/"
                data-testid="breadcrumb-home"
                className="hover:text-foreground transition-colors"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <span
                data-testid="breadcrumb-current"
                aria-current="page"
                className="text-foreground font-medium"
              >
                Phone Scripts
              </span>
            </li>
          </ol>
        </nav>

        {/* Header */}
        <header data-testid="phone-scripts-header" className="mb-10">
          <h1
            data-testid="phone-scripts-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground"
          >
            Phone Scripts for Calling After Someone Dies ({CURRENT_YEAR})
          </h1>
          <p
            data-testid="phone-scripts-subtitle"
            className="mt-4 text-lg text-muted max-w-2xl"
          >
            Making calls after losing someone is overwhelming. These scripts
            tell you exactly what to say, word for word. Read them before you
            call, or keep them open during the conversation.
          </p>
        </header>

        {/* Summary stats */}
        <section
          data-testid="phone-scripts-summary"
          className="mb-10 rounded-lg bg-secondary p-6"
        >
          <h2 className="text-lg font-bold text-foreground mb-3">
            How Many Calls Will I Need to Make?
          </h2>
          <p className="text-sm text-muted mb-4">
            Most people need to make at least {PHONE_SCRIPTS.length} major
            calls after a death. Estimated total time across all calls:{" "}
            <strong className="text-foreground">{estimateTotalTime()}</strong>.
            You don&apos;t have to make them all at once.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="rounded-md bg-background p-3 text-center">
              <p className="text-2xl font-bold text-primary">
                {PHONE_SCRIPTS.length}
              </p>
              <p className="text-xs text-muted">Essential Calls</p>
            </div>
            <div className="rounded-md bg-background p-3 text-center">
              <p className="text-2xl font-bold text-primary">
                {estimateTotalTime().split("~")[1]?.trim() || "3+ hours"}
              </p>
              <p className="text-xs text-muted">Estimated Total</p>
            </div>
            <div className="rounded-md bg-background p-3 text-center col-span-2 sm:col-span-1">
              <p className="text-2xl font-bold text-accent">Free</p>
              <p className="text-xs text-muted">Always</p>
            </div>
          </div>
        </section>

        {/* Script cards */}
        <section data-testid="phone-scripts-list">
          <h2 className="sr-only">Available Phone Scripts</h2>
          <div className="space-y-4">
            {PHONE_SCRIPTS.map((script, index) => (
              <Link
                key={script.slug}
                href={`/phone-scripts/${script.slug}`}
                data-testid={`phone-script-card-${script.slug}`}
                className="group block rounded-lg border border-border p-5 hover:border-primary hover:bg-secondary transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
                        {index + 1}
                      </span>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {script.institution}
                      </h3>
                    </div>
                    <p className="mt-1 text-sm text-muted pl-8">
                      {script.description.split(".")[0]}.
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted pl-8">
                      {script.phoneNumber && (
                        <span
                          data-testid={`phone-script-phone-${script.slug}`}
                          className="flex items-center gap-1"
                        >
                          <svg
                            className="h-3.5 w-3.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                            />
                          </svg>
                          {script.phoneNumber}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <svg
                          className="h-3.5 w-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                        {script.expectedDuration}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg
                          className="h-3.5 w-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                          />
                        </svg>
                        {script.documentsNeeded.length} docs needed
                      </span>
                    </div>
                    {script.urgencyNote && (
                      <div
                        data-testid={`phone-script-urgency-${script.slug}`}
                        className="mt-3 rounded-md bg-destructive/10 px-3 py-2 text-xs font-medium text-destructive ml-8"
                      >
                        {script.urgencyNote.split(".")[0]}.
                      </div>
                    )}
                  </div>
                  <svg
                    className="mt-1 h-5 w-5 shrink-0 text-muted group-hover:text-primary transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Checklist CTA */}
        <section
          data-testid="phone-scripts-cta"
          className="mt-12 rounded-lg border border-border p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-foreground">
            Get Your Complete Personalized Checklist
          </h2>
          <p className="mt-3 text-muted max-w-xl mx-auto">
            Phone calls are just one part of settling an estate. AfterLoss
            provides a complete step-by-step checklist covering everything from
            death certificates to probate \u2014 personalized for your state.
          </p>
          <Link
            href="/onboard"
            data-testid="phone-scripts-cta-button"
            className="mt-6 inline-block rounded-lg bg-primary px-8 py-3 font-medium text-white hover:bg-primary-hover transition-colors"
          >
            Get Your Complete Personalized Checklist \u2192
          </Link>
        </section>

        {/* Grief support */}
        <section
          data-testid="phone-scripts-grief-support"
          className="mt-8 rounded-lg bg-secondary p-6 text-center"
        >
          <p className="text-sm text-muted">
            Calling institutions after a loss is emotionally draining. It&apos;s
            okay to ask for help or take breaks between calls.{" "}
            <Link
              href="/resources/grief-counseling"
              data-testid="grief-counseling-link"
              className="text-primary hover:underline font-medium"
            >
              Find grief counseling support \u2192
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
