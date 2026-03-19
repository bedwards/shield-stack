import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import {
  generateFaqPageSchema,
  generateBreadcrumbSchema,
} from "@/lib/structured-data";
import { GuideHero } from "@/components/guides/GuideHero";
import {
  TimelineSection,
  type TimelineTask,
} from "@/components/guides/TimelineSection";
import { FaqSection, guideFaqs } from "@/components/guides/FaqSection";
import { GuideCtaSection } from "@/components/guides/GuideCtaSection";

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://afterloss.pages.dev";
const CANONICAL_PATH =
  "/guides/what-to-do-when-someone-dies-checklist";

export const revalidate = 2592000; // 30 days ISR

export const metadata: Metadata = {
  title: "What to Do When Someone Dies: The Complete 2026 Checklist",
  description:
    "Free step-by-step checklist of what to do when someone dies in 2026. Covers the first 24 hours through the first year: death certificates, Social Security, probate, taxes, and more. Personalized to your state.",
  keywords: [
    "what to do when someone dies checklist",
    "what to do when someone dies",
    "after death checklist",
    "when someone dies what to do",
    "after someone dies checklist",
    "estate settlement checklist 2026",
    "death checklist for family",
    "steps to take when someone dies",
  ],
  alternates: {
    canonical: `${BASE_URL}${CANONICAL_PATH}`,
  },
  openGraph: {
    title: "What to Do When Someone Dies: The Complete 2026 Checklist",
    description:
      "Free step-by-step checklist covering everything from the first 24 hours to the first year. Death certificates, Social Security, probate, taxes — personalized to your state.",
    type: "article",
    url: `${BASE_URL}${CANONICAL_PATH}`,
    siteName: "AfterLoss",
  },
  twitter: {
    card: "summary_large_image",
    title: "What to Do When Someone Dies: The Complete 2026 Checklist",
    description:
      "Free step-by-step checklist covering everything from the first 24 hours to the first year.",
  },
};

// --- Timeline data ---

const first24HoursTasks: TimelineTask[] = [
  {
    title: "Get a legal pronouncement of death",
    description:
      "If the death occurs at home, call 911 (or the non-emergency line if expected/hospice). A doctor, coroner, or medical examiner must legally pronounce the death. If in a hospital or nursing facility, staff will handle this. The pronouncement is required before a death certificate can be issued.",
    documentsNeeded: ["Government-issued ID of the deceased"],
    mistakesToAvoid:
      "Don't assume the funeral home handles this — the pronouncement must happen first, before the body can be moved.",
  },
  {
    title: "Contact a funeral home or cremation service",
    description:
      "The funeral home will transport the deceased, help you plan services, and file the death certificate with the state vital records office. You are not required to use the hospital's recommended funeral home — you can choose any licensed provider. Ask for an itemized price list (required by FTC Funeral Rule).",
    whoToCall:
      "Any licensed funeral home in your area. Compare prices — costs vary significantly.",
    mistakesToAvoid:
      "Don't feel pressured into expensive add-ons at the funeral home. The FTC Funeral Rule requires itemized pricing — ask for it.",
  },
  {
    title: "Notify immediate family and close friends",
    description:
      "Call or visit close family members and friends. Designate one person to be the point of contact so you're not fielding dozens of calls. Consider creating a group text or using a service like CaringBridge to share updates with a wider circle.",
    mistakesToAvoid:
      "Don't post on social media before notifying close family — finding out through a Facebook post adds unnecessary pain.",
  },
  {
    title: "Secure the deceased's home and property",
    description:
      "If the deceased lived alone, secure the home immediately. Lock doors, collect mail, adjust thermostat, and ensure pets are cared for. Remove visible valuables if the home will be empty. Don't throw anything away — even junk mail can contain account information you'll need later.",
    mistakesToAvoid:
      "Don't let anyone remove items from the home until the executor/administrator is appointed and an inventory is done.",
  },
  {
    title: "Order certified death certificates",
    description:
      "Request 10-15 certified copies through the funeral home (easiest) or directly from the county vital records office. You'll need originals for banks, insurance companies, government agencies, and the probate court. Additional copies typically cost $5-25 each. It's much easier to order extras now than to request more later.",
    whoToCall:
      "Your funeral home (they can order for you) or your county vital records office.",
    documentsNeeded: [
      "Your government-issued ID",
      "Proof of your relationship to the deceased",
    ],
    mistakesToAvoid:
      "Don't order too few. Running out of certified copies causes delays with banks and insurers. Order at least 10.",
  },
];

const firstWeekTasks: TimelineTask[] = [
  {
    title: "Locate the will, trust, and important documents",
    description:
      "Search for the will, any trust documents, life insurance policies, financial account statements, tax returns, property deeds, vehicle titles, and the Social Security card. Check the home, a safe deposit box, an attorney's office, or an online vault. The will names the executor — the person legally responsible for settling the estate.",
    documentsNeeded: [
      "Death certificate (to access safe deposit box)",
      "Your ID",
    ],
    mistakesToAvoid:
      "Don't assume there's no will. Check with the deceased's attorney, bank, and close family members. Some states have will registries.",
  },
  {
    title: "Report the death to Social Security",
    description:
      "Social Security must be notified to stop benefit payments and flag the Social Security Number. This is critical — an unflagged SSN is the primary tool identity thieves use. The funeral home may have already submitted an Electronic Death Registration (EDR), but always call to confirm.",
    whoToCall:
      "Social Security Administration: 800-772-1213 (TTY: 1-800-325-0778). Cannot be done online. You can also visit your local SSA office.",
    documentsNeeded: [
      "Deceased's Social Security Number",
      "Certified death certificate",
    ],
    mistakesToAvoid:
      "Don't skip this step even if the funeral home said they reported it. Call SSA to confirm — delays allow identity theft.",
  },
  {
    title: "Notify the deceased's employer and union",
    description:
      "Contact HR to ask about final paychecks, unused PTO payout, employer life insurance, pension or retirement plan survivor benefits, and COBRA health insurance continuation for dependents. Ask about any Employee Assistance Program (EAP) grief counseling available to family members.",
    whoToCall:
      "The deceased's HR department or direct supervisor. For union members, also contact the union office.",
    documentsNeeded: ["Certified death certificate", "Your ID"],
  },
  {
    title: "Contact life insurance companies",
    description:
      "File claims on all known life insurance policies — including employer group life insurance, which is easy to overlook. Benefits are typically paid within 30-60 days of filing. Life insurance proceeds generally go directly to named beneficiaries and do not pass through probate.",
    whoToCall:
      "Each insurance company's claims department. Check employer benefits, personal policies, and any mortgage protection policies.",
    documentsNeeded: [
      "Certified death certificate",
      "Policy number (if known)",
      "Beneficiary's ID and Social Security Number",
    ],
    mistakesToAvoid:
      "Don't forget to check for employer group life insurance, accidental death policies, mortgage protection insurance, and credit card death benefits.",
  },
  {
    title: "Notify banks and financial institutions",
    description:
      "Contact every bank, credit union, brokerage, and retirement account holder. For joint accounts, update the account to the surviving owner's name — do not close them if the survivor needs access. For individual accounts, request a freeze until the executor is appointed by the court.",
    whoToCall:
      "Each bank's bereavement or estate services department (most large banks have a dedicated team).",
    documentsNeeded: [
      "Certified death certificate",
      "Your ID",
      "Letters Testamentary or Letters of Administration (once available from probate court)",
    ],
    mistakesToAvoid:
      "Don't close joint accounts the surviving spouse needs for bill payments. Request a freeze on individual accounts instead of immediate closure.",
  },
];

const firstMonthTasks: TimelineTask[] = [
  {
    title: "Apply for survivor benefits",
    description:
      "File for Social Security survivor benefits (spouse, children, dependent parents), the $255 lump-sum death payment, veterans benefits (VA DIC, burial allowance, headstone), and any state-specific survivor benefits. Some benefits are not retroactive — apply as soon as possible.",
    whoToCall:
      "SSA: 800-772-1213 for survivor benefits. VA: 800-827-1000 for veteran benefits. Your state's benefits office for state programs.",
    documentsNeeded: [
      "Certified death certificate",
      "Your Social Security Number",
      "Deceased's Social Security Number",
      "Marriage certificate (for spousal benefits)",
      "Birth certificates (for children's benefits)",
      "DD-214 (for veteran benefits)",
    ],
    mistakesToAvoid:
      "Don't wait to apply for survivor benefits. Some Social Security benefits are not retroactive, so delays cost you money.",
  },
  {
    title: "Begin the probate process (if required)",
    description:
      "File the will with the probate court in the county where the deceased lived. The court will appoint the executor (named in the will) or an administrator (if no will). Many small estates qualify for simplified procedures — for example, California allows a small estate affidavit for estates under $208,850. Check your state's threshold.",
    whoToCall:
      "Your county probate court clerk's office. They can tell you what forms to file and whether simplified probate applies.",
    documentsNeeded: [
      "Original will",
      "Certified death certificate",
      "Petition for probate (court-specific form)",
      "Inventory of assets (estimated values)",
    ],
    mistakesToAvoid:
      "Don't assume you need a lawyer for probate. Many courts have self-help centers, and small estates often qualify for simplified procedures that skip formal probate.",
  },
  {
    title: "Cancel subscriptions, memberships, and services",
    description:
      "Cancel streaming services, gym memberships, magazines, meal kits, software subscriptions, phone plans, and any other recurring charges. Check credit card and bank statements for the last 3 months to identify all recurring charges. Many services require a death certificate for cancellation.",
    documentsNeeded: [
      "Account information or login credentials",
      "Certified death certificate (some services require this)",
    ],
    mistakesToAvoid:
      "Don't just cancel the credit card and assume subscriptions stop — many will send to collections. Cancel each service individually.",
  },
  {
    title: "Notify credit bureaus and protect against identity theft",
    description:
      "Contact all three credit bureaus (Equifax, Experian, TransUnion) to place a deceased alert on the credit file. Request a copy of the credit report to check for unauthorized activity. 2.5 million deceased Americans have their identities stolen annually — this step is essential.",
    whoToCall:
      "Equifax: 800-685-1111. Experian: 888-397-3742. TransUnion: 800-916-8800. Each must be contacted separately.",
    documentsNeeded: [
      "Certified death certificate",
      "Deceased's Social Security Number",
      "Your ID and proof of authority (executor appointment letter)",
    ],
  },
  {
    title: "Redirect mail and update address",
    description:
      "File a change of address with the USPS to redirect mail to the executor's address. This ensures you receive all account statements, bills, tax documents, and creditor notices. Continue collecting mail for at least 12 months — important documents arrive throughout the year.",
    whoToCall:
      "USPS: file online at usps.com or visit your local post office.",
    documentsNeeded: [
      "Deceased's name and address",
      "Executor's name and forwarding address",
    ],
  },
];

const firstThreeMonthsTasks: TimelineTask[] = [
  {
    title: "File insurance claims beyond life insurance",
    description:
      "File claims on all other insurance policies: health insurance (final medical bills), auto insurance (remove or transfer vehicles), homeowner's/renter's insurance (update or cancel), long-term care insurance, and any accidental death or travel insurance policies.",
    whoToCall:
      "Each insurance company's claims department. Check the deceased's files, email, and mail for policy documents.",
    documentsNeeded: [
      "Certified death certificate",
      "Policy numbers",
      "Relevant medical records (for health insurance disputes)",
    ],
    mistakesToAvoid:
      "Don't pay outstanding medical bills before verifying them — medical billing errors are extremely common. Dispute anything that looks wrong.",
  },
  {
    title: "Manage estate finances and open an estate bank account",
    description:
      "Open a dedicated estate bank account to manage income and expenses during settlement. Deposit any incoming funds (final paychecks, insurance payouts, investment dividends) into this account. Pay legitimate estate debts from this account — not from your personal funds.",
    whoToCall:
      "Any bank — bring your Letters Testamentary / Letters of Administration and an EIN (apply at irs.gov).",
    documentsNeeded: [
      "Letters Testamentary or Letters of Administration",
      "EIN (Employer Identification Number) for the estate — apply free at irs.gov",
      "Your ID",
    ],
    mistakesToAvoid:
      "Don't pay estate debts from your personal account. Always use the estate account — commingling funds creates legal and tax problems.",
  },
  {
    title: "Handle real property (house, land, vehicles)",
    description:
      "Determine what happens to each property: transfer to a beneficiary, sell, or maintain. For houses, continue insurance and maintenance during settlement. For vehicles, contact the DMV to transfer title. If selling property, the executor typically needs court approval unless the will grants this authority.",
    documentsNeeded: [
      "Property deeds",
      "Vehicle titles",
      "Letters Testamentary",
      "Court order (if selling property without will authority)",
    ],
    mistakesToAvoid:
      "Don't distribute assets or sell property before debts are settled — the executor can be personally liable for unpaid estate debts.",
  },
  {
    title: "Notify all creditors and publish notice to creditors",
    description:
      "Many states require the executor to publish a notice to creditors in a local newspaper, giving unknown creditors a deadline to file claims (typically 3-6 months). Also send direct written notice to all known creditors. This establishes a claims deadline — after which creditors cannot file new claims against the estate.",
    documentsNeeded: [
      "List of all known debts",
      "Letters Testamentary",
      "Funds for newspaper publication (usually $50-200)",
    ],
  },
];

const firstYearTasks: TimelineTask[] = [
  {
    title: "File the decedent's final income tax return (Form 1040)",
    description:
      "The deceased's final personal income tax return covers January 1 through the date of death. It's due April 15 of the following year. Report all income earned before death. The surviving spouse can file a joint return for the year of death. Include any income in respect of a decedent (IRD) items.",
    documentsNeeded: [
      "W-2s and 1099s",
      "Prior year tax returns",
      "Records of all income through date of death",
    ],
    mistakesToAvoid:
      "Don't forget to claim the deceased as a taxpayer on the final return. A surviving spouse can file jointly for the year of death.",
  },
  {
    title: "File estate income tax return if needed (Form 1041)",
    description:
      "If the estate earns more than $600 in income after the date of death (from interest, dividends, rental income, asset sales), you must file Form 1041. The estate is a separate tax entity with its own EIN. This return is due April 15 of the following year.",
    documentsNeeded: [
      "Estate EIN",
      "Records of all estate income after date of death",
      "Records of deductible estate expenses",
    ],
  },
  {
    title: "File estate tax return if needed (Form 706)",
    description:
      "Required only if the gross estate exceeds $15 million (2026 threshold). Due 9 months after death, with a 6-month extension available via Form 4768. Important: even if the estate is under $15 million, filing Form 706 preserves the unused exemption for a surviving spouse through the portability election — this can save the surviving spouse millions in future estate taxes.",
    documentsNeeded: [
      "Complete inventory and appraisal of all assets",
      "Certified death certificate",
      "Appraisals for real estate, businesses, and unique assets",
    ],
    mistakesToAvoid:
      "Don't skip Form 706 for married couples even if under $15 million — the portability election preserves the unused exemption for the surviving spouse. This is NOT automatic.",
  },
  {
    title: "Settle debts and distribute remaining assets",
    description:
      "After the creditor claims period expires and all debts/taxes are paid, the executor can distribute remaining assets to beneficiaries according to the will (or state intestacy laws if no will). Get receipts from each beneficiary. File a final accounting with the probate court if required by your state.",
    documentsNeeded: [
      "Final accounting of all estate transactions",
      "Signed receipts from each beneficiary",
      "Court approval (if required by your state)",
    ],
    mistakesToAvoid:
      "Don't distribute assets before all debts, taxes, and claims are settled. The executor can be personally liable for premature distributions.",
  },
  {
    title: "Close the estate",
    description:
      "File a final accounting and petition to close the estate with the probate court. Once approved, the executor's duties are complete. Cancel the estate's EIN with the IRS, close the estate bank account, and file a final Form 1041 if applicable. Keep estate records for at least 7 years.",
    documentsNeeded: [
      "Final accounting",
      "Receipts from all beneficiaries",
      "Court petition to close estate",
    ],
  },
];

// --- Comparison table data ---

const comparisonRows = [
  {
    feature: "Price",
    afterloss: "Free — forever",
    others: "Free to $199+ (Atticus $15/mo, SwiftProbate $39, EverSettled $199)",
  },
  {
    feature: "Account required",
    afterloss: "No — works without signup",
    others: "Yes (all competitors require account creation)",
  },
  {
    feature: "Platform",
    afterloss: "Web — works on any device",
    others: "Varies (Atticus: iOS only, Sunset: app required)",
  },
  {
    feature: "AI document generation",
    afterloss: "Yes — personalized letters and forms",
    others: "No (competitors provide templates, not personalized documents)",
  },
  {
    feature: "Phone scripts",
    afterloss: "Yes — word-for-word scripts for every call",
    others: "No (no competitor offers this)",
  },
  {
    feature: "State-specific guidance",
    afterloss: "51 state guides (all 50 states + DC)",
    others: "Varies (SwiftProbate: 3,200+ county pages, most others: limited)",
  },
];

// --- HowTo schema steps (for structured data) ---

const howToSteps = [
  {
    name: "First 24 Hours: Immediate Steps",
    text: "Get a legal pronouncement of death, contact a funeral home, notify immediate family, secure the home and property, and order 10-15 certified death certificates.",
  },
  {
    name: "First Week: Notifications and Documents",
    text: "Locate the will and important documents, report the death to Social Security (800-772-1213), notify the employer and life insurance companies, and contact banks and financial institutions.",
  },
  {
    name: "First Month: Benefits, Probate, and Protection",
    text: "Apply for survivor benefits (Social Security, VA, employer), begin probate if required, cancel subscriptions and memberships, notify credit bureaus to prevent identity theft, and redirect mail.",
  },
  {
    name: "First 3 Months: Financial Settlement",
    text: "File remaining insurance claims, open an estate bank account, handle real property and vehicles, notify creditors, and publish a notice to creditors.",
  },
  {
    name: "First Year: Taxes and Closing the Estate",
    text: "File the decedent's final Form 1040 income tax return, file Form 1041 estate income tax if needed, file Form 706 estate tax return if estate exceeds $15 million (and for portability election), settle all debts, distribute assets to beneficiaries, and close the estate with the probate court.",
  },
];

function HowToJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "What to Do When Someone Dies: Complete 2026 Checklist",
    description:
      "Step-by-step guide to everything you need to do when someone dies, organized by timeline from the first 24 hours through the first year. Covers death certificates, Social Security, probate, taxes, and estate settlement.",
    totalTime: "P365D",
    step: howToSteps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function TableOfContents() {
  const sections = [
    { id: "first-24-hours", label: "First 24 Hours" },
    { id: "first-week", label: "First Week" },
    { id: "first-month", label: "First Month" },
    { id: "first-3-months", label: "First 3 Months" },
    { id: "first-year", label: "First Year" },
    { id: "comparison", label: "How AfterLoss Compares" },
    { id: "faq", label: "FAQ" },
  ];

  return (
    <nav
      data-testid="table-of-contents"
      aria-label="Table of contents"
      className="my-10 rounded-lg border border-border p-5"
    >
      <h2 className="text-lg font-semibold text-foreground mb-3">
        In this guide
      </h2>
      <ol className="space-y-2">
        {sections.map((section, index) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              data-testid={`toc-link-${section.id}`}
              className="text-primary hover:underline text-sm"
            >
              {index + 1}. {section.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function ComparisonSection() {
  return (
    <section
      data-testid="comparison-section"
      className="mt-16"
      id="comparison"
    >
      <h2
        data-testid="comparison-heading"
        className="text-2xl font-bold text-foreground mb-4"
      >
        How AfterLoss Compares
      </h2>
      <p className="text-muted mb-6">
        There are several tools for estate settlement. Here&apos;s how
        AfterLoss is different.
      </p>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table
          data-testid="comparison-table"
          className="w-full text-left text-sm"
        >
          <thead className="bg-secondary">
            <tr>
              <th className="px-4 py-3 font-semibold text-foreground">
                Feature
              </th>
              <th className="px-4 py-3 font-semibold text-primary">
                AfterLoss
              </th>
              <th className="px-4 py-3 font-semibold text-foreground">
                Other Tools
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {comparisonRows.map((row) => (
              <tr key={row.feature}>
                <td className="px-4 py-3 font-medium text-foreground">
                  {row.feature}
                </td>
                <td className="px-4 py-3 text-foreground">
                  {row.afterloss}
                </td>
                <td className="px-4 py-3 text-muted">{row.others}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function WhatToDoWhenSomeoneDiesGuide() {
  return (
    <div data-testid="what-to-do-guide">
      <HowToJsonLd />
      <JsonLd
        data={generateFaqPageSchema(
          guideFaqs.map((f) => ({
            question: f.question,
            answer: f.answer,
          }))
        )}
      />
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: "Home", url: BASE_URL },
          { name: "Guides", url: `${BASE_URL}/guides` },
          {
            name: "What to Do When Someone Dies",
            url: `${BASE_URL}${CANONICAL_PATH}`,
          },
        ])}
      />

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <GuideHero />

        <TableOfContents />

        {/* Inline CTA to interactive checklist */}
        <div
          data-testid="inline-cta-checklist"
          className="my-10 rounded-lg bg-primary-light border border-primary/20 p-5 text-center"
        >
          <p className="text-foreground font-medium">
            Want a personalized checklist instead of a general guide?
          </p>
          <Link
            href="/onboard"
            data-testid="cta-personalized-checklist"
            className="mt-3 inline-block rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-primary-hover transition-colors"
          >
            Get your personalized checklist &rarr;
          </Link>
        </div>

        <TimelineSection
          id="first-24-hours"
          timeframe="First 24 Hours"
          title="Immediate Steps After a Death"
          description="Focus on the essentials. Everything else can wait."
          tasks={first24HoursTasks}
        />

        <TimelineSection
          id="first-week"
          timeframe="First Week"
          title="Notifications and Important Documents"
          description="Begin notifying key institutions and gathering critical paperwork."
          tasks={firstWeekTasks}
        />

        {/* Mid-page CTA to state guides */}
        <div
          data-testid="inline-cta-states"
          className="my-12 rounded-lg bg-secondary border border-border p-5 text-center"
        >
          <p className="text-foreground font-medium">
            Probate rules vary by state. See the specific rules for your state.
          </p>
          <Link
            href="/states"
            data-testid="cta-see-states"
            className="mt-3 inline-block rounded-lg border border-primary text-primary px-6 py-2.5 text-sm font-medium hover:bg-primary hover:text-white transition-colors"
          >
            See probate rules for your state &rarr;
          </Link>
        </div>

        <TimelineSection
          id="first-month"
          timeframe="First Month"
          title="Benefits, Probate, and Protection"
          description="Apply for benefits, begin probate if needed, and protect against identity theft."
          tasks={firstMonthTasks}
        />

        <TimelineSection
          id="first-3-months"
          timeframe="First 3 Months"
          title="Financial Settlement and Property"
          description="Manage estate finances, handle property, and notify creditors."
          tasks={firstThreeMonthsTasks}
        />

        <TimelineSection
          id="first-year"
          timeframe="First Year"
          title="Taxes, Distribution, and Closing"
          description="File tax returns, settle debts, distribute assets, and close the estate."
          tasks={firstYearTasks}
        />

        <ComparisonSection />

        <FaqSection />

        <GuideCtaSection />
      </article>
    </div>
  );
}
