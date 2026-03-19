import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import {
  generateBreadcrumbSchema,
  generateHowToSchema,
} from "@/lib/structured-data";
import {
  PHONE_SCRIPTS,
  getPhoneScriptBySlug,
} from "@/data/phone-scripts";
import { CopyButton } from "./CopyButton";
import { PrintButton } from "./PrintButton";

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://afterloss.pages.dev";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PHONE_SCRIPTS.map((script) => ({
    slug: script.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const script = getPhoneScriptBySlug(slug);
  if (!script) {
    return { title: "Script Not Found" };
  }

  return {
    title: script.seoTitle,
    description: script.description,
    keywords: [
      script.title.toLowerCase(),
      `what to say when calling ${script.institution.toLowerCase()}`,
      "phone script after death",
      `${script.institution.toLowerCase()} death notification`,
      "what to say executor",
    ],
    alternates: {
      canonical: `${BASE_URL}/phone-scripts/${slug}`,
    },
    openGraph: {
      type: "article",
      url: `${BASE_URL}/phone-scripts/${slug}`,
      siteName: "AfterLoss",
    },
  };
}

export default async function PhoneScriptPage({ params }: PageProps) {
  const { slug } = await params;
  const script = getPhoneScriptBySlug(slug);

  if (!script) {
    notFound();
  }

  const relatedScripts = script.relatedSlugs
    .map((s) => getPhoneScriptBySlug(s))
    .filter(Boolean);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: BASE_URL },
    { name: "Phone Scripts", url: `${BASE_URL}/phone-scripts` },
    { name: script.institution, url: `${BASE_URL}/phone-scripts/${slug}` },
  ]);

  const howToSchema = generateHowToSchema(
    script.title,
    script.description,
    [
      {
        name: "Gather your documents",
        text: script.documentsNeeded.join(". "),
      },
      {
        name: "Call and state your purpose",
        text: script.openingScript,
      },
      ...script.scriptSections.map((section) => ({
        name: section.heading,
        text: section.text,
      })),
      {
        name: "Confirm and document everything",
        text: script.whatToAskFor.join(". "),
      },
    ]
  );

  // Build an enhanced HowTo schema with totalTime and tools
  const enhancedHowToSchema = {
    ...howToSchema,
    step: howToSchema.step.map((step, i) => ({
      ...step,
      position: i + 1,
    })),
    totalTime: script.expectedDuration
      ? `PT${parseInt(script.expectedDuration)}M`
      : undefined,
    tool: script.documentsNeeded.map((item) => ({
      "@type": "HowToTool",
      name: item,
    })),
  };

  return (
    <div data-testid="phone-script-detail-page">
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={enhancedHowToSchema} />

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav
          data-testid="breadcrumb-nav"
          aria-label="Breadcrumb"
          className="mb-8 text-sm text-muted"
        >
          <ol className="flex items-center gap-2 flex-wrap">
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
              <Link
                href="/phone-scripts"
                data-testid="breadcrumb-phone-scripts"
                className="hover:text-foreground transition-colors"
              >
                Phone Scripts
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <span
                data-testid="breadcrumb-current"
                aria-current="page"
                className="text-foreground font-medium"
              >
                {script.institution}
              </span>
            </li>
          </ol>
        </nav>

        {/* Header */}
        <header data-testid="phone-script-header" className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span
              data-testid="phone-script-verified-badge"
              className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary"
            >
              Verified {script.lastVerified}
            </span>
          </div>
          <h1
            data-testid="phone-script-h1"
            className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground"
          >
            {script.seoTitle}
          </h1>
          <p
            data-testid="phone-script-description"
            className="mt-3 text-lg text-muted"
          >
            {script.description}
          </p>

          {/* Quick info bar */}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted">
            {script.phoneNumber && (
              <a
                href={`tel:${script.phoneNumber.replace(/-/g, "")}`}
                data-testid="phone-script-phone-link"
                className="flex items-center gap-1.5 text-primary hover:underline"
              >
                <svg
                  className="h-4 w-4"
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
              </a>
            )}
            <span
              data-testid="phone-script-duration"
              className="flex items-center gap-1.5"
            >
              <svg
                className="h-4 w-4"
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
            <span
              data-testid="phone-script-hours"
              className="flex items-center gap-1.5"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                />
              </svg>
              {script.hours.split(".")[0]}
            </span>
          </div>
        </header>

        {/* Urgency note */}
        {script.urgencyNote && (
          <div
            data-testid="phone-script-urgency-note"
            className="mb-8 rounded-lg border-2 border-destructive/30 bg-destructive/5 p-5"
          >
            <div className="flex items-start gap-3">
              <svg
                className="mt-0.5 h-5 w-5 shrink-0 text-destructive"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
              </svg>
              <p className="text-sm font-medium text-destructive">
                {script.urgencyNote}
              </p>
            </div>
          </div>
        )}

        {/* What to have ready */}
        <section
          data-testid="phone-script-documents"
          className="mb-8 rounded-lg bg-secondary p-6"
        >
          <h2 className="text-lg font-bold text-foreground mb-3">
            What to Have Ready Before You Call
          </h2>
          <ul className="space-y-2">
            {script.documentsNeeded.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-foreground"
              >
                <input
                  type="checkbox"
                  data-testid={`doc-checklist-${item.slice(0, 20).replace(/\s+/g, "-").toLowerCase()}`}
                  className="mt-0.5 h-4 w-4 rounded border-border"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Opening script */}
        <section data-testid="phone-script-opening" className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-3">
            Opening Statement
          </h2>
          <p className="text-sm text-muted mb-2">
            This is what to say when the representative answers. Replace the
            bracketed items with your information.
          </p>
          <div className="relative rounded-lg border-2 border-primary/30 bg-primary/5 p-5">
            <p className="text-foreground leading-relaxed italic pr-10">
              &ldquo;{script.openingScript}&rdquo;
            </p>
            <div className="absolute top-3 right-3">
              <CopyButton text={script.openingScript} label="opening-statement" />
            </div>
          </div>
        </section>

        {/* Script sections */}
        {script.scriptSections.map((section, index) => (
          <section
            key={index}
            data-testid={`phone-script-section-${index}`}
            className="mb-8"
          >
            <h2 className="text-xl font-bold text-foreground mb-3">
              {section.heading}
            </h2>
            <div className="relative rounded-lg border border-border p-5">
              <p className="text-foreground leading-relaxed text-sm pr-10">
                &ldquo;{section.text}&rdquo;
              </p>
              <div className="absolute top-3 right-3">
                <CopyButton
                  text={section.text}
                  label={`section-${index}`}
                />
              </div>
            </div>
          </section>
        ))}

        {/* What to expect */}
        <section data-testid="phone-script-what-to-expect" className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-3">
            What to Expect on the Call
          </h2>
          <div className="rounded-lg bg-secondary p-5">
            <ul className="space-y-2">
              {script.whatToExpect.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-foreground"
                >
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                    />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* What to ask for */}
        <section data-testid="phone-script-ask-for" className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-3">
            What to Ask For
          </h2>
          <p className="text-sm text-muted mb-3">
            Make sure you get all of these before ending the call.
          </p>
          <ul className="space-y-2">
            {script.whatToAskFor.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-foreground"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                  {index + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* If they push back */}
        <section data-testid="phone-script-pushback" className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-3">
            If They Push Back
          </h2>
          <p className="text-sm text-muted mb-3">
            If the representative says no, hesitates, or redirects you, try
            these responses.
          </p>
          <div className="space-y-3">
            {script.ifTheyPushBack.map((response, index) => (
              <div key={index} className="rounded-lg bg-secondary p-4">
                <div className="flex items-center justify-between gap-2">
                  <p
                    data-testid={`pushback-response-${index}`}
                    className="text-sm text-foreground"
                  >
                    {response}
                  </p>
                  <CopyButton
                    text={response}
                    label={`pushback-${index}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tips */}
        <section data-testid="phone-script-tips" className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-3">
            Tips & Important Notes
          </h2>
          <div className="rounded-lg border border-border p-4">
            <ul className="space-y-2">
              {script.tips.map((tip, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-foreground"
                >
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                    />
                  </svg>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Action buttons */}
        <div data-testid="phone-script-actions" className="mb-8 flex gap-3">
          <PrintButton />
          {script.phoneNumber && (
            <a
              href={`tel:${script.phoneNumber.replace(/-/g, "")}`}
              data-testid="call-now-button"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover transition-colors print:hidden"
            >
              Call {script.phoneNumber}
            </a>
          )}
        </div>

        {/* CTA */}
        <section
          data-testid="phone-script-cta"
          className="mt-8 rounded-lg border border-border p-6 text-center"
        >
          <h2 className="text-xl font-bold text-foreground">
            Get Your Complete Personalized Checklist
          </h2>
          <p className="mt-2 text-sm text-muted max-w-lg mx-auto">
            Phone calls are just one part of settling an estate. Get a
            step-by-step checklist covering everything from death certificates
            to probate.
          </p>
          <Link
            href="/onboard"
            data-testid="phone-script-cta-button"
            className="mt-4 inline-block rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-primary-hover transition-colors"
          >
            Get Your Complete Personalized Checklist &rarr;
          </Link>
        </section>

        {/* Related scripts */}
        {relatedScripts.length > 0 && (
          <section
            data-testid="phone-script-related"
            className="mt-10 pt-8 border-t border-border"
          >
            <h2 className="text-xl font-bold text-foreground mb-4">
              Related Phone Scripts
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedScripts.map(
                (related) =>
                  related && (
                    <Link
                      key={related.slug}
                      href={`/phone-scripts/${related.slug}`}
                      data-testid={`related-script-${related.slug}`}
                      className="group block rounded-lg border border-border p-4 hover:border-primary hover:bg-secondary transition-colors"
                    >
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm">
                        {related.institution}
                      </h3>
                      <p className="mt-1 text-xs text-muted line-clamp-2">
                        {related.description.split(".")[0]}.
                      </p>
                      {related.phoneNumber && (
                        <p className="mt-2 text-xs text-primary">
                          {related.phoneNumber}
                        </p>
                      )}
                    </Link>
                  )
              )}
            </div>
          </section>
        )}

        {/* Grief support */}
        <section
          data-testid="phone-script-grief-support"
          className="mt-8 rounded-lg bg-secondary p-6 text-center"
        >
          <p className="text-sm text-muted">
            Calling institutions after a loss is emotionally draining. It&apos;s
            okay to ask for help.{" "}
            <Link
              href="/resources/grief-counseling"
              data-testid="grief-counseling-link"
              className="text-primary hover:underline font-medium"
            >
              Find grief counseling support &rarr;
            </Link>
          </p>
        </section>

        {/* Back link */}
        <div className="mt-8">
          <Link
            href="/phone-scripts"
            data-testid="back-to-phone-scripts"
            className="text-sm text-primary hover:underline"
          >
            &larr; Back to all phone scripts
          </Link>
        </div>
      </article>
    </div>
  );
}
