import type { Metadata } from "next";
import Link from "next/link";

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://afterloss.pages.dev";
const CANONICAL_PATH = "/guides/protect-identity-after-death-2026";

export const metadata: Metadata = {
  title:
    "How to Protect a Deceased Person's Identity from Theft (2026 Guide) | AfterLoss",
  description:
    "2.5 million deceased Americans have their identities stolen annually. Follow these 5 steps to protect your loved one's identity after death — report to SSA, flag credit bureaus, secure accounts, and more.",
  keywords: [
    "protect identity after death",
    "how to protect deceased person's identity",
    "identity theft deceased",
    "deceased identity theft protection",
    "credit freeze deceased person",
    "report death to credit bureaus",
  ],
  alternates: {
    canonical: `${BASE_URL}${CANONICAL_PATH}`,
  },
  openGraph: {
    title:
      "How to Protect a Deceased Person's Identity from Theft (2026 Guide)",
    description:
      "2.5 million deceased Americans have their identities stolen annually. Follow these 5 steps to protect your loved one's identity after death.",
    type: "article",
    url: `${BASE_URL}${CANONICAL_PATH}`,
    siteName: "AfterLoss",
  },
};

function JsonLdSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Protect a Deceased Person's Identity from Theft",
    description:
      "Step-by-step guide to protecting a deceased person's identity from theft, including reporting to Social Security, flagging credit bureaus, securing accounts, and filing IRS Form 14039.",
    totalTime: "PT2H",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Report the Death to Social Security",
        text: "Call Social Security at 800-772-1213 or visit your local Social Security office to report the death. This cannot be done online. The funeral home may have already submitted an electronic death report, but confirm directly.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Contact All 3 Credit Bureaus",
        text: "Notify Equifax (800-685-1111), Experian (888-397-3742), and TransUnion (800-916-8800) to place a deceased alert on the credit reports. Request a copy of the credit report to check for unauthorized activity.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Secure All Financial Accounts",
        text: "Contact banks, credit card companies, and investment firms to notify them of the death. Change passwords on digital accounts, revoke shared access, and close unnecessary accounts.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "File IRS Form 14039 If Fraud Is Suspected",
        text: "If you discover unauthorized tax filings or other identity fraud, file IRS Form 14039 (Identity Theft Affidavit). Mail or fax the completed form to the IRS Identity Protection Specialized Unit.",
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "Consider Identity Protection for the Deceased",
        text: "An identity protection service can monitor the deceased person's information for ongoing fraud attempts, alert you to new account openings, and provide recovery support if theft occurs.",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function BreadcrumbNav() {
  return (
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
          <span data-testid="breadcrumb-guides" className="text-foreground">
            Guides
          </span>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <span
            data-testid="breadcrumb-current"
            aria-current="page"
            className="text-foreground font-medium"
          >
            Protect Identity After Death
          </span>
        </li>
      </ol>
    </nav>
  );
}

function ComparisonTable() {
  return (
    <div
      data-testid="comparison-table"
      className="my-10 overflow-x-auto rounded-lg border border-border"
    >
      <table className="w-full text-left text-sm">
        <thead className="bg-secondary">
          <tr>
            <th className="px-4 py-3 font-semibold text-foreground">Action</th>
            <th className="px-4 py-3 font-semibold text-foreground">
              Happens Automatically?
            </th>
            <th className="px-4 py-3 font-semibold text-foreground">
              What You Must Do
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          <tr>
            <td className="px-4 py-3 text-foreground">
              SSA notified of death
            </td>
            <td className="px-4 py-3 text-muted">
              Sometimes (funeral home may file electronic report)
            </td>
            <td className="px-4 py-3 text-foreground">
              Call 800-772-1213 to confirm. Report if not already filed.
            </td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-foreground">
              Credit reports flagged
            </td>
            <td className="px-4 py-3 text-muted">
              No. SSA does not notify credit bureaus.
            </td>
            <td className="px-4 py-3 text-foreground">
              Contact all 3 bureaus individually to place deceased alert.
            </td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-foreground">Bank accounts frozen</td>
            <td className="px-4 py-3 text-muted">
              No. Banks act only when notified.
            </td>
            <td className="px-4 py-3 text-foreground">
              Notify each bank with death certificate. Request account freeze or
              closure.
            </td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-foreground">
              Credit cards cancelled
            </td>
            <td className="px-4 py-3 text-muted">
              No. Issuers must be contacted directly.
            </td>
            <td className="px-4 py-3 text-foreground">
              Call each card issuer. Request balance statement and account
              closure.
            </td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-foreground">
              IRS notified of death
            </td>
            <td className="px-4 py-3 text-muted">
              Yes (SSA shares data with IRS eventually)
            </td>
            <td className="px-4 py-3 text-foreground">
              File final tax return. File Form 14039 if fraud is suspected.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default function ProtectIdentityAfterDeathGuide() {
  return (
    <div data-testid="identity-protection-guide">
      <JsonLdSchema />

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <BreadcrumbNav />

        <header data-testid="guide-header" className="mb-10">
          <h1
            data-testid="guide-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground"
          >
            How to Protect a Deceased Person&apos;s Identity from Theft (2026
            Guide)
          </h1>
          <p
            data-testid="guide-subtitle"
            className="mt-4 text-lg text-muted max-w-2xl"
          >
            Identity theft doesn&apos;t stop at death. Here&apos;s how to
            protect your loved one.
          </p>
          <p
            data-testid="last-verified"
            className="mt-2 text-sm text-muted"
          >
            Last verified: March 2026
          </p>
        </header>

        {/* Key statistic callout */}
        <div
          data-testid="stat-callout"
          className="mb-10 rounded-lg bg-secondary border border-border p-6"
        >
          <p className="text-lg text-foreground">
            <strong>2.5 million deceased Americans</strong> have their
            identities stolen annually. Criminals exploit obituary details,
            stolen death certificates, and public records to open accounts, file
            fraudulent tax returns, and rack up debt in the deceased
            person&apos;s name.
          </p>
          <p className="mt-3 text-sm text-muted">
            Social Security and credit bureaus do{" "}
            <strong>not automatically</strong> prevent fraud after a death.
            Families must take proactive steps to protect their loved
            one&apos;s identity.
          </p>
        </div>

        {/* Comparison table */}
        <section data-testid="comparison-section">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            What Happens Automatically vs. What You Must Do
          </h2>
          <p className="text-muted mb-4">
            Many families assume government agencies handle everything. They
            don&apos;t. Here&apos;s the reality:
          </p>
          <ComparisonTable />
        </section>

        {/* Step 1 */}
        <section data-testid="step-1-section" className="mt-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">
              1
            </span>
            <h2 className="text-2xl font-bold text-foreground">
              Report the Death to Social Security
            </h2>
          </div>
          <p className="text-foreground leading-relaxed">
            The Social Security Administration (SSA) must be notified of the
            death to stop benefits and flag the Social Security Number.
            This is the most important first step — an unflagged SSN is the
            primary tool criminals use.
          </p>
          <div className="mt-4 rounded-lg bg-secondary p-4">
            <h3 className="font-semibold text-foreground mb-2">How to report:</h3>
            <ul className="list-disc list-inside space-y-1 text-foreground">
              <li>
                <strong>Phone:</strong> Call{" "}
                <a
                  href="tel:800-772-1213"
                  data-testid="ssa-phone-link"
                  className="text-primary hover:underline"
                >
                  800-772-1213
                </a>{" "}
                (TTY: 1-800-325-0778)
              </li>
              <li>
                <strong>In person:</strong> Visit your{" "}
                <a
                  href="https://secure.ssa.gov/ICON/main.jsp"
                  data-testid="ssa-office-link"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  local Social Security office
                </a>
              </li>
              <li>
                <strong>Not available online</strong> — deaths cannot be reported
                through the SSA website
              </li>
            </ul>
            <p className="mt-3 text-sm text-muted">
              The funeral home may have already submitted an Electronic Death
              Registration (EDR). Call SSA to confirm.
            </p>
          </div>
        </section>

        {/* Step 2 */}
        <section data-testid="step-2-section" className="mt-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">
              2
            </span>
            <h2 className="text-2xl font-bold text-foreground">
              Contact All 3 Credit Bureaus
            </h2>
          </div>
          <p className="text-foreground leading-relaxed">
            Notify each credit bureau to place a &quot;deceased alert&quot; on the
            credit file. This flags the account and makes it harder for
            criminals to open new lines of credit. Request a copy of the credit
            report to check for unauthorized activity.
          </p>
          <div className="mt-4 space-y-4">
            <div className="rounded-lg bg-secondary p-4">
              <h3 className="font-semibold text-foreground">Equifax</h3>
              <ul className="mt-2 list-disc list-inside space-y-1 text-foreground">
                <li>
                  Phone:{" "}
                  <a
                    href="tel:800-685-1111"
                    data-testid="equifax-phone-link"
                    className="text-primary hover:underline"
                  >
                    800-685-1111
                  </a>
                </li>
                <li>
                  Mail: Equifax Information Services LLC, P.O. Box 105069,
                  Atlanta, GA 30348-5069
                </li>
              </ul>
            </div>
            <div className="rounded-lg bg-secondary p-4">
              <h3 className="font-semibold text-foreground">Experian</h3>
              <ul className="mt-2 list-disc list-inside space-y-1 text-foreground">
                <li>
                  Phone:{" "}
                  <a
                    href="tel:888-397-3742"
                    data-testid="experian-phone-link"
                    className="text-primary hover:underline"
                  >
                    888-397-3742
                  </a>
                </li>
                <li>
                  Mail: Experian, P.O. Box 4500, Allen, TX 75013
                </li>
              </ul>
            </div>
            <div className="rounded-lg bg-secondary p-4">
              <h3 className="font-semibold text-foreground">TransUnion</h3>
              <ul className="mt-2 list-disc list-inside space-y-1 text-foreground">
                <li>
                  Phone:{" "}
                  <a
                    href="tel:800-916-8800"
                    data-testid="transunion-phone-link"
                    className="text-primary hover:underline"
                  >
                    800-916-8800
                  </a>
                </li>
                <li>
                  Mail: TransUnion LLC, P.O. Box 2000, Chester, PA 19016
                </li>
              </ul>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted">
            You will need a certified copy of the death certificate for each
            bureau. Order at least 10 certified copies — you will need them for
            banks, insurers, and government agencies too.
          </p>
        </section>

        {/* Step 3 */}
        <section data-testid="step-3-section" className="mt-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">
              3
            </span>
            <h2 className="text-2xl font-bold text-foreground">
              Secure All Financial Accounts
            </h2>
          </div>
          <p className="text-foreground leading-relaxed">
            Contact every financial institution where the deceased held accounts.
            Criminals often target accounts in the window between death and
            notification — especially accounts with autopay or recurring charges.
          </p>
          <div className="mt-4 rounded-lg bg-secondary p-4">
            <h3 className="font-semibold text-foreground mb-2">Action checklist:</h3>
            <ul className="list-disc list-inside space-y-1 text-foreground">
              <li>
                Notify all banks and request account freezes (do not close joint
                accounts the surviving spouse needs)
              </li>
              <li>
                Contact credit card companies to close cards and request final
                statements
              </li>
              <li>
                Change passwords on all digital accounts (email, social media,
                online banking)
              </li>
              <li>
                Revoke authorized user access on credit cards and shared accounts
              </li>
              <li>
                Contact investment firms and retirement account administrators
              </li>
              <li>
                Cancel direct deposits and redirect any pending payments
              </li>
              <li>
                Lock the deceased&apos;s email account to prevent password reset
                exploits
              </li>
            </ul>
          </div>
        </section>

        {/* Step 4 */}
        <section data-testid="step-4-section" className="mt-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">
              4
            </span>
            <h2 className="text-2xl font-bold text-foreground">
              File IRS Form 14039 If Fraud Is Suspected
            </h2>
          </div>
          <p className="text-foreground leading-relaxed">
            If you discover that someone has filed a tax return using the
            deceased person&apos;s Social Security Number, or if you notice other
            signs of identity fraud (new accounts opened, unfamiliar charges),
            file IRS Form 14039 — the Identity Theft Affidavit.
          </p>
          <div className="mt-4 rounded-lg bg-secondary p-4">
            <h3 className="font-semibold text-foreground mb-2">How to file:</h3>
            <ul className="list-disc list-inside space-y-1 text-foreground">
              <li>
                Download{" "}
                <a
                  href="https://www.irs.gov/pub/irs-pdf/f14039.pdf"
                  data-testid="irs-form-link"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  IRS Form 14039
                </a>{" "}
                from the IRS website
              </li>
              <li>Complete the form and attach a copy of the death certificate</li>
              <li>
                Mail to: Internal Revenue Service, P.O. Box 9039, Andover, MA
                01810-0939
              </li>
              <li>Or fax to: 855-807-5720</li>
            </ul>
            <p className="mt-3 text-sm text-muted">
              Also file a report at{" "}
              <a
                href="https://www.identitytheft.gov"
                data-testid="ftc-link"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                IdentityTheft.gov
              </a>{" "}
              (the FTC&apos;s identity theft reporting portal) and your local
              police department.
            </p>
          </div>
        </section>

        {/* Step 5 */}
        <section data-testid="step-5-section" className="mt-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">
              5
            </span>
            <h2 className="text-2xl font-bold text-foreground">
              Consider Identity Protection for the Deceased
            </h2>
          </div>
          <p className="text-foreground leading-relaxed">
            Even after notifying SSA and the credit bureaus, the deceased
            person&apos;s information remains vulnerable. Criminals may use it
            months or years later. An identity protection service continuously
            monitors for new fraud attempts and alerts you if the
            deceased&apos;s information is used.
          </p>

          {/* Aura affiliate recommendation */}
          <div
            data-testid="aura-affiliate-section"
            className="mt-6 rounded-lg border-2 border-primary/20 bg-secondary p-6"
          >
            <p className="text-xs text-muted mb-3">
              <em>
                AfterLoss may earn a commission at no cost to you.{" "}
                <Link
                  href="/privacy"
                  data-testid="affiliate-disclosure-link"
                  className="underline hover:text-foreground"
                >
                  Learn more
                </Link>
              </em>
            </p>
            <h3 className="font-semibold text-foreground text-lg">
              Aura Identity Protection
            </h3>
            <p className="mt-2 text-foreground">
              Aura monitors the deceased person&apos;s Social Security Number,
              financial accounts, and personal information across the dark web,
              data broker sites, and public records. If suspicious activity is
              detected, you&apos;ll receive an alert immediately.
            </p>
            <ul className="mt-3 list-disc list-inside space-y-1 text-foreground text-sm">
              <li>Monitors SSN, email, and financial accounts for fraud</li>
              <li>Dark web monitoring for stolen personal information</li>
              <li>Alerts for new account openings using the deceased&apos;s identity</li>
              <li>Up to $5 million identity theft insurance</li>
              <li>24/7 US-based fraud resolution support</li>
            </ul>
            <a
              href="https://www.aura.com/?ref=afterloss"
              data-testid="aura-affiliate-link"
              data-affiliate="aura"
              rel="noopener noreferrer sponsored"
              target="_blank"
              className="mt-4 inline-block rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-primary-hover transition-colors"
            >
              Learn More About Aura
            </a>
          </div>
        </section>

        {/* Printable checklist */}
        <section data-testid="printable-checklist-section" className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Quick Reference Checklist
          </h2>
          <p className="text-muted mb-4">
            Print this checklist or save it to your phone. Take your time — there
            is no wrong order.
          </p>
          <div className="rounded-lg border border-border p-6 print:border-black">
            <ul className="space-y-3">
              {[
                "Call Social Security at 800-772-1213 to report the death",
                "Contact Equifax (800-685-1111) to place deceased alert",
                "Contact Experian (888-397-3742) to place deceased alert",
                "Contact TransUnion (800-916-8800) to place deceased alert",
                "Request credit report from each bureau — check for unauthorized activity",
                "Notify all banks and request account freezes",
                "Contact credit card companies to close accounts",
                "Change passwords on all digital accounts",
                "Lock deceased's email account",
                "Cancel direct deposits and redirect pending payments",
                "File IRS Form 14039 if any fraud is discovered",
                "File report at IdentityTheft.gov if fraud is discovered",
                "Consider identity protection service for ongoing monitoring",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-border text-xs print:border-black">
                    &nbsp;
                  </span>
                  <span className="text-foreground text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA section */}
        <section
          data-testid="guide-cta-section"
          className="mt-12 rounded-lg bg-secondary p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-foreground">
            Need Help With the Full Estate Settlement Process?
          </h2>
          <p className="mt-3 text-muted max-w-xl mx-auto">
            Identity protection is just one part of settling an estate. AfterLoss
            provides a free, step-by-step guide covering everything from death
            certificates to probate to tax filings.
          </p>
          <Link
            href="/guide"
            data-testid="guide-cta-button"
            className="mt-6 inline-block rounded-lg bg-primary px-8 py-3 font-medium text-white hover:bg-primary-hover transition-colors"
          >
            Start the Full Guide — Free
          </Link>
        </section>
      </article>
    </div>
  );
}
