import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import {
  SCRIPTS,
  CATEGORIES,
  getScriptById,
  getCategoryBySlug,
  getScriptsByCategory,
} from "@/lib/scripts/script-data";
import { CopyButton } from "./CopyButton";
import { PrintButton } from "./PrintButton";

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://afterloss.pages.dev";

interface PageProps {
  params: Promise<{ category: string; scriptId: string }>;
}

export function generateStaticParams() {
  return SCRIPTS.map((script) => ({
    category: script.category,
    scriptId: script.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { scriptId, category } = await params;
  const script = getScriptById(scriptId);
  if (!script || script.category !== category) {
    return { title: "Script Not Found" };
  }

  const canonicalPath = `/scripts/${category}/${scriptId}`;

  return {
    title: `${script.title} — Phone Script | AfterLoss`,
    description: script.shortDescription,
    keywords: [
      script.title.toLowerCase(),
      `what to say when calling ${script.title.toLowerCase()}`,
      "phone script after death",
      "what to say executor",
      `${script.category} after death`,
    ],
    alternates: {
      canonical: `${BASE_URL}${canonicalPath}`,
    },
    openGraph: {
      title: `${script.title} — Phone Script`,
      description: script.shortDescription,
      type: "article",
      url: `${BASE_URL}${canonicalPath}`,
      siteName: "AfterLoss",
    },
  };
}

export default async function ScriptDetailPage({ params }: PageProps) {
  const { scriptId, category } = await params;
  const script = getScriptById(scriptId);
  const categoryInfo = getCategoryBySlug(category);

  if (!script || !categoryInfo || script.category !== category) {
    notFound();
  }

  const relatedScripts = getScriptsByCategory(script.category).filter(
    (s) => s.id !== script.id
  );

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: script.title,
    description: script.shortDescription,
    totalTime: script.estimatedDuration
      ? `PT${parseInt(script.estimatedDuration)}M`
      : undefined,
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Gather your documents",
        text: script.informationNeeded.join(". "),
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Call and state your purpose",
        text: script.openingStatement,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Use key phrases",
        text: script.keyPhrases.join(". "),
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Request specific items",
        text: script.whatToAskFor.join(". "),
      },
    ],
    tool: script.informationNeeded.map((item) => ({
      "@type": "HowToTool",
      name: item,
    })),
  };

  return (
    <div data-testid="script-detail-page">
      <JsonLd data={howToSchema} />

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav data-testid="breadcrumb-nav" aria-label="Breadcrumb" className="mb-8 text-sm text-muted">
          <ol className="flex items-center gap-2 flex-wrap">
            <li>
              <Link href="/" data-testid="breadcrumb-home" className="hover:text-foreground transition-colors">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/scripts" data-testid="breadcrumb-scripts" className="hover:text-foreground transition-colors">Phone Scripts</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href={`/scripts#${category}`}
                data-testid="breadcrumb-category"
                className="hover:text-foreground transition-colors"
              >
                {categoryInfo.name}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <span data-testid="breadcrumb-current" aria-current="page" className="text-foreground font-medium">
                {script.title}
              </span>
            </li>
          </ol>
        </nav>

        {/* Header */}
        <header data-testid="script-detail-header" className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span
              data-testid="script-detail-category-badge"
              className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary"
            >
              {categoryInfo.name}
            </span>
            {script.lastVerified && (
              <span data-testid="script-detail-verified" className="text-xs text-muted">
                Verified {script.lastVerified}
              </span>
            )}
          </div>
          <h1 data-testid="script-detail-title" className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            {script.title}
          </h1>
          <p data-testid="script-detail-description" className="mt-3 text-lg text-muted">
            {script.shortDescription}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted">
            {script.phoneNumber && (
              <a
                href={`tel:${script.phoneNumber.replace(/-/g, "")}`}
                data-testid="script-detail-phone"
                className="flex items-center gap-1.5 text-primary hover:underline"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
                {script.phoneNumber}
              </a>
            )}
            {script.estimatedDuration && (
              <span data-testid="script-detail-duration" className="flex items-center gap-1.5">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                {script.estimatedDuration}
              </span>
            )}
            {script.bestCallTimes && (
              <span data-testid="script-detail-best-times" className="flex items-center gap-1.5">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
                {script.bestCallTimes}
              </span>
            )}
          </div>
        </header>

        {/* What to have ready */}
        <section data-testid="script-detail-info-needed" className="mb-8 rounded-lg bg-secondary p-6">
          <h2 className="text-lg font-bold text-foreground mb-3">What to Have Ready Before You Call</h2>
          <ul className="space-y-2">
            {script.informationNeeded.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                <input type="checkbox" data-testid={`checklist-item-${item.slice(0, 20).replace(/\s+/g, "-").toLowerCase()}`} className="mt-0.5 h-4 w-4 rounded border-border" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Opening statement */}
        <section data-testid="script-detail-opening" className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-3">Opening Statement</h2>
          <p className="text-sm text-muted mb-2">
            This is what to say when the representative answers. Replace the bracketed items with your information.
          </p>
          <div className="relative rounded-lg border-2 border-primary/30 bg-primary/5 p-5">
            <p className="text-foreground leading-relaxed italic pr-10">
              &ldquo;{script.openingStatement}&rdquo;
            </p>
            <div className="absolute top-3 right-3">
              <CopyButton text={script.openingStatement} label="opening statement" />
            </div>
          </div>
        </section>

        {/* Key phrases */}
        <section data-testid="script-detail-key-phrases" className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-3">Key Phrases to Use</h2>
          <p className="text-sm text-muted mb-3">
            These specific words and phrases help you get the right result. Click any phrase to copy it.
          </p>
          <div className="space-y-2">
            {script.keyPhrases.map((phrase, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-2 rounded-lg border border-border p-3 hover:border-primary/50 transition-colors"
              >
                <p data-testid={`key-phrase-${index}`} className="text-sm text-foreground">
                  &ldquo;{phrase}&rdquo;
                </p>
                <CopyButton text={phrase} label={`key phrase ${index + 1}`} />
              </div>
            ))}
          </div>
        </section>

        {/* What to ask for */}
        <section data-testid="script-detail-ask-for" className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-3">What to Ask For</h2>
          <p className="text-sm text-muted mb-3">
            Make sure you get all of these before ending the call.
          </p>
          <ul className="space-y-2">
            {script.whatToAskFor.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-foreground">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                  {index + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* If they say no */}
        <section data-testid="script-detail-escalation" className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-3">If They Push Back</h2>
          <p className="text-sm text-muted mb-3">
            If the representative says no, hesitates, or redirects you, try these responses.
          </p>
          <div className="space-y-3">
            {script.ifTheySayNo.map((response, index) => (
              <div key={index} className="rounded-lg bg-secondary p-4">
                <div className="flex items-center justify-between gap-2">
                  <p data-testid={`escalation-${index}`} className="text-sm text-foreground">{response}</p>
                  <CopyButton text={response} label={`escalation ${index + 1}`} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Notes */}
        {script.notes.length > 0 && (
          <section data-testid="script-detail-notes" className="mb-8">
            <h2 className="text-xl font-bold text-foreground mb-3">Important Notes</h2>
            <div className="rounded-lg border border-border p-4">
              <ul className="space-y-2">
                {script.notes.map((note, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-foreground">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                    </svg>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Print button */}
        <div data-testid="script-detail-actions" className="mb-8 flex gap-3">
          <PrintButton />
          {script.phoneNumber && (
            <a
              href={`tel:${script.phoneNumber.replace(/-/g, "")}`}
              data-testid="call-button"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover transition-colors print:hidden"
            >
              Call {script.phoneNumber}
            </a>
          )}
        </div>

        {/* Related scripts */}
        {relatedScripts.length > 0 && (
          <section data-testid="script-detail-related" className="mt-12 pt-8 border-t border-border">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Other {categoryInfo.name} Scripts
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedScripts.map((related) => (
                <Link
                  key={related.id}
                  href={`/scripts/${related.category}/${related.id}`}
                  data-testid={`related-script-${related.id}`}
                  className="group block rounded-lg border border-border p-4 hover:border-primary hover:bg-secondary transition-colors"
                >
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm">
                    {related.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted line-clamp-2">{related.shortDescription}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back to scripts */}
        <div className="mt-8">
          <Link
            href="/scripts"
            data-testid="back-to-scripts"
            className="text-sm text-primary hover:underline"
          >
            &larr; Back to all phone scripts
          </Link>
        </div>
      </article>
    </div>
  );
}
