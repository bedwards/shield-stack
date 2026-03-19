import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import {
  CATEGORIES,
  SCRIPTS,
  getScriptsByCategory,
} from "@/lib/scripts/script-data";
import type { ScriptCategory } from "@/lib/scripts/script-data";

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://afterloss.pages.dev";

export const metadata: Metadata = {
  title:
    "Phone Scripts for Calling After Someone Dies — What to Say to Banks, SSA, Insurance",
  description:
    "Free pre-written phone scripts for every call you need to make after someone dies. Know exactly what to say when calling Social Security, banks, insurance companies, and more.",
  keywords: [
    "what to say when calling bank after death",
    "how to notify social security of death",
    "what to say when calling insurance after death",
    "phone script executor estate",
    "how to cancel subscription after death",
    "what to say calling credit bureau after death",
  ],
  alternates: {
    canonical: `${BASE_URL}/scripts`,
  },
  openGraph: {
    title:
      "Phone Scripts for Calling After Someone Dies — What to Say",
    description:
      "Free pre-written phone scripts for every call you need to make after someone dies.",
    type: "website",
    url: `${BASE_URL}/scripts`,
    siteName: "AfterLoss",
  },
};

const CATEGORY_ICONS: Record<ScriptCategory, React.ReactNode> = {
  government: (
    <svg data-testid="icon-government" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21" />
    </svg>
  ),
  financial: (
    <svg data-testid="icon-financial" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
    </svg>
  ),
  insurance: (
    <svg data-testid="icon-insurance" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
    </svg>
  ),
  subscriptions: (
    <svg data-testid="icon-subscriptions" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
    </svg>
  ),
  employment: (
    <svg data-testid="icon-employment" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
    </svg>
  ),
};

function BreadcrumbNav() {
  return (
    <nav data-testid="breadcrumb-nav" aria-label="Breadcrumb" className="mb-8 text-sm text-muted">
      <ol className="flex items-center gap-2">
        <li>
          <Link href="/" data-testid="breadcrumb-home" className="hover:text-foreground transition-colors">Home</Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <span data-testid="breadcrumb-current" aria-current="page" className="text-foreground font-medium">Phone Scripts</span>
        </li>
      </ol>
    </nav>
  );
}

function CategorySection({ categorySlug }: { categorySlug: ScriptCategory }) {
  const category = CATEGORIES.find((c) => c.slug === categorySlug);
  if (!category) return null;

  const scripts = getScriptsByCategory(categorySlug);

  return (
    <section data-testid={`script-category-${categorySlug}`} className="mb-12">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
          {CATEGORY_ICONS[categorySlug]}
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">{category.name}</h2>
          <p className="text-sm text-muted">{category.description}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {scripts.map((script) => (
          <Link
            key={script.id}
            href={`/scripts/${script.category}/${script.id}`}
            data-testid={`script-card-${script.id}`}
            className="group block rounded-lg border border-border p-4 hover:border-primary hover:bg-secondary transition-colors"
          >
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {script.title}
            </h3>
            <p className="mt-1 text-sm text-muted line-clamp-2">{script.shortDescription}</p>
            <div className="mt-3 flex items-center gap-3 text-xs text-muted">
              {script.phoneNumber && (
                <span data-testid={`script-phone-${script.id}`} className="flex items-center gap-1">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                  {script.phoneNumber}
                </span>
              )}
              {script.estimatedDuration && (
                <span className="flex items-center gap-1">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  {script.estimatedDuration}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function ScriptsPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Phone Scripts for Calling After Someone Dies",
    description:
      "Free pre-written phone scripts for every call you need to make after someone dies.",
    url: `${BASE_URL}/scripts`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: SCRIPTS.length,
      itemListElement: SCRIPTS.map((script, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: script.title,
        url: `${BASE_URL}/scripts/${script.category}/${script.id}`,
      })),
    },
  };

  return (
    <div data-testid="scripts-page">
      <JsonLd data={collectionSchema} />

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <BreadcrumbNav />

        <header data-testid="scripts-header" className="mb-10">
          <h1 data-testid="scripts-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Phone Scripts — Know Exactly What to Say
          </h1>
          <p data-testid="scripts-subtitle" className="mt-4 text-lg text-muted max-w-2xl">
            Making calls after a death is stressful. These scripts tell you exactly what to say, what to ask for, and how to respond if they push back. Read them before you call, or keep them in front of you during the conversation.
          </p>
        </header>

        <div data-testid="scripts-stats" className="mb-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded-lg bg-secondary p-4 text-center">
            <p className="text-2xl font-bold text-primary">{SCRIPTS.length}</p>
            <p className="text-xs text-muted">Scripts</p>
          </div>
          <div className="rounded-lg bg-secondary p-4 text-center">
            <p className="text-2xl font-bold text-primary">{CATEGORIES.length}</p>
            <p className="text-xs text-muted">Categories</p>
          </div>
          <div className="rounded-lg bg-secondary p-4 text-center">
            <p className="text-2xl font-bold text-accent">Free</p>
            <p className="text-xs text-muted">Always</p>
          </div>
          <div className="rounded-lg bg-secondary p-4 text-center">
            <p className="text-2xl font-bold text-primary">Copy</p>
            <p className="text-xs text-muted">Key Phrases</p>
          </div>
        </div>

        <nav data-testid="script-category-nav" className="mb-10">
          <h2 className="sr-only">Jump to category</h2>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <a
                key={category.slug}
                href={`#${category.slug}`}
                data-testid={`script-category-link-${category.slug}`}
                className="rounded-full border border-border px-4 py-1.5 text-sm text-foreground hover:border-primary hover:bg-secondary transition-colors"
              >
                {category.name} ({getScriptsByCategory(category.slug).length})
              </a>
            ))}
          </div>
        </nav>

        {CATEGORIES.map((category) => (
          <div key={category.slug} id={category.slug}>
            <CategorySection categorySlug={category.slug} />
          </div>
        ))}

        <section data-testid="scripts-tips" className="mt-8 rounded-lg bg-secondary p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Tips Before You Call</h2>
          <ul className="space-y-2 text-foreground text-sm">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">1</span>
              <span>Have the death certificate, your ID, and any account numbers ready before dialing.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">2</span>
              <span>Write down the name of every person you speak with and the date/time of the call.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">3</span>
              <span>Ask for a reference or confirmation number before you hang up.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">4</span>
              <span>Request written confirmation (email or mail) of any changes made.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">5</span>
              <span>Take your time. If you feel overwhelmed, it&apos;s okay to say &quot;I need a moment&quot; or call back later.</span>
            </li>
          </ul>
        </section>

        <section data-testid="scripts-cta" className="mt-8 rounded-lg border border-border p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground">Need the Full Estate Settlement Guide?</h2>
          <p className="mt-3 text-muted max-w-xl mx-auto">
            Phone calls are just one part of settling an estate. AfterLoss provides a complete checklist covering everything from death certificates to probate.
          </p>
          <Link
            href="/guide"
            data-testid="scripts-cta-button"
            className="mt-6 inline-block rounded-lg bg-primary px-8 py-3 font-medium text-white hover:bg-primary-hover transition-colors"
          >
            Start the Full Guide — Free
          </Link>
        </section>
      </div>
    </div>
  );
}
