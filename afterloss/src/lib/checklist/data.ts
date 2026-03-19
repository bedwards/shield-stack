/**
 * Master checklist template for AfterLoss.
 *
 * Contains 45+ checklist items organized by timeline category.
 * Items are filtered by the engine based on user's state, relationship,
 * and estate complexity. This data is embedded in the bundle for
 * offline-first operation — no network needed.
 *
 * Data structure aligns with the `checklist_templates` table from #111
 * so migration to Supabase is seamless later.
 */

export type ChecklistCategory =
  | "immediate"
  | "first_week"
  | "first_month"
  | "first_quarter"
  | "first_year";

export interface ChecklistItem {
  /** Unique identifier (e.g., "immediate-001") */
  id: string;
  /** Short action title displayed in the checklist */
  title: string;
  /** Detailed description of what to do */
  description: string;
  /** Why this step matters — shown to help users prioritize */
  whyItMatters: string;
  /** Timeline category */
  category: ChecklistCategory;
  /** Estimated time to complete */
  estimatedTime: string;
  /** Whether this item applies only to specific states */
  stateSpecific: boolean;
  /** If stateSpecific, which state codes this applies to */
  applicableStates?: string[];
  /** Minimum estate complexity level to show this item (undefined = all) */
  minComplexity?: "moderate" | "complex";
}

/** Community property states */
const COMMUNITY_PROPERTY_STATES = [
  "AZ",
  "CA",
  "ID",
  "LA",
  "NV",
  "NM",
  "TX",
  "WA",
  "WI",
];

/** States with estate tax */
const ESTATE_TAX_STATES = [
  "CT",
  "DC",
  "HI",
  "IL",
  "ME",
  "MA",
  "MN",
  "NY",
  "OR",
  "RI",
  "VT",
  "WA",
];

/** States with inheritance tax */
const INHERITANCE_TAX_STATES = ["IA", "KY", "MD", "NE", "NJ", "PA"];

export const CATEGORY_LABELS: Record<ChecklistCategory, string> = {
  immediate: "Immediate (First 48 Hours)",
  first_week: "First Week",
  first_month: "First Month",
  first_quarter: "First 3 Months",
  first_year: "First Year",
};

export const CATEGORY_ORDER: ChecklistCategory[] = [
  "immediate",
  "first_week",
  "first_month",
  "first_quarter",
  "first_year",
];

export const masterChecklist: ChecklistItem[] = [
  // ── Immediate (First 48 Hours) ──────────────────────────────────────
  {
    id: "immediate-001",
    title: "Obtain certified copies of the death certificate",
    description:
      "Order 10-15 certified copies from the funeral home or county vital records office. Nearly every institution will require an original certified copy — photocopies are not accepted.",
    whyItMatters:
      "You will need certified copies for banks, insurance companies, the Social Security Administration, courts, and more. Running out causes costly delays.",
    category: "immediate",
    estimatedTime: "30 minutes",
    stateSpecific: false,
  },
  {
    id: "immediate-002",
    title: "Notify immediate family and close friends",
    description:
      "Contact family members, close friends, and anyone who should know right away. Consider designating one person to spread the word to extended circles so you are not overwhelmed with calls.",
    whyItMatters:
      "Loved ones deserve to hear directly from family, not through social media. A designated contact person protects your time during the hardest moments.",
    category: "immediate",
    estimatedTime: "1-2 hours",
    stateSpecific: false,
  },
  {
    id: "immediate-003",
    title: "Arrange care for dependents and pets",
    description:
      "If the deceased was caring for children, elderly parents, or pets, arrange immediate temporary care. Check for existing care plans or guardianship designations in their will.",
    whyItMatters:
      "Dependents need uninterrupted care. Acting quickly prevents gaps that could lead to emergencies or legal complications.",
    category: "immediate",
    estimatedTime: "1 hour",
    stateSpecific: false,
  },
  {
    id: "immediate-004",
    title: "Secure the home and personal property",
    description:
      "Lock the home, collect mail, secure vehicles, and safeguard valuables such as jewelry, cash, and important documents. If the deceased lived alone, consider changing locks.",
    whyItMatters:
      "Sadly, break-ins targeting homes of the recently deceased are common. Obituaries can signal an empty home to criminals.",
    category: "immediate",
    estimatedTime: "1 hour",
    stateSpecific: false,
  },
  {
    id: "immediate-005",
    title: "Locate the will and estate planning documents",
    description:
      "Search the home, safe deposit boxes, and the deceased's attorney's office for the will, trust documents, power of attorney, and any advance directives. Check for a digital copy in email or cloud storage.",
    whyItMatters:
      "The will determines who manages the estate and how assets are distributed. Finding it quickly avoids delays in probate and prevents disputes.",
    category: "immediate",
    estimatedTime: "1-2 hours",
    stateSpecific: false,
  },
  {
    id: "immediate-006",
    title: "Contact the funeral home and arrange services",
    description:
      "Choose a funeral home and begin planning services. The funeral home will help with death certificate applications, body transportation, and coordination with the cemetery or crematorium.",
    whyItMatters:
      "Funeral homes handle critical legal paperwork including the death certificate application. Early contact ensures timely processing.",
    category: "immediate",
    estimatedTime: "2-3 hours",
    stateSpecific: false,
  },
  {
    id: "immediate-007",
    title: "Contact the deceased's employer",
    description:
      "Notify the employer's HR department. Ask about final paychecks, accrued vacation pay, life insurance through the employer, retirement accounts (401k/pension), and any death benefits.",
    whyItMatters:
      "Employer benefits like group life insurance and retirement accounts can be substantial. Timely notification ensures nothing is forfeited.",
    category: "immediate",
    estimatedTime: "30 minutes",
    stateSpecific: false,
  },
  {
    id: "immediate-008",
    title: "Contact a religious or spiritual leader",
    description:
      "If desired, reach out to a clergy member, pastor, rabbi, imam, or spiritual advisor to discuss memorial services and grief support for the family.",
    whyItMatters:
      "Spiritual leaders can provide immediate emotional support and help coordinate memorial services according to the family's traditions.",
    category: "immediate",
    estimatedTime: "15 minutes",
    stateSpecific: false,
  },

  // ── First Week ──────────────────────────────────────────────────────
  {
    id: "week-001",
    title: "Report the death to Social Security",
    description:
      "Call Social Security at 800-772-1213 (TTY: 1-800-325-0778) or visit your local office. This cannot be done online. The funeral home may have submitted an Electronic Death Registration — call SSA to confirm.",
    whyItMatters:
      "An unflagged SSN is the primary tool criminals use for identity theft of the deceased. SSA also stops benefit payments and processes survivor benefits.",
    category: "first_week",
    estimatedTime: "30 minutes",
    stateSpecific: false,
  },
  {
    id: "week-002",
    title: "Place deceased alerts with all three credit bureaus",
    description:
      "Contact Equifax (800-685-1111), Experian (888-397-3742), and TransUnion (800-916-8800). Request a 'deceased — do not issue credit' alert on each file and obtain copies of the credit reports to check for unauthorized activity.",
    whyItMatters:
      "Credit alerts prevent criminals from opening new accounts in the deceased's name. The credit reports reveal any existing fraud.",
    category: "first_week",
    estimatedTime: "1 hour",
    stateSpecific: false,
  },
  {
    id: "week-003",
    title: "Secure all financial accounts",
    description:
      "Contact every bank, credit card company, and investment firm. Request account freezes (do not close joint accounts the surviving spouse needs). Change passwords on digital accounts and cancel direct deposits.",
    whyItMatters:
      "Unsecured accounts are vulnerable to unauthorized withdrawals and fraud. Joint accounts may be needed by the surviving spouse for ongoing expenses.",
    category: "first_week",
    estimatedTime: "2-4 hours",
    stateSpecific: false,
  },
  {
    id: "week-004",
    title: "Contact life insurance companies",
    description:
      "Gather all life insurance policies and contact each company to begin the claims process. Check for policies through the employer, unions, professional organizations, and mortgage companies.",
    whyItMatters:
      "Life insurance proceeds can provide critical financial support for the family. Claims should be filed promptly to avoid delays in payment.",
    category: "first_week",
    estimatedTime: "1-2 hours",
    stateSpecific: false,
  },
  {
    id: "week-005",
    title: "Notify health insurance provider",
    description:
      "Contact the health insurance company to remove the deceased from the policy. If the deceased was the policyholder, survivors may need COBRA or marketplace coverage. Check for any outstanding medical claims.",
    whyItMatters:
      "Continued premiums on the deceased's policy waste money. Surviving family members need uninterrupted health coverage.",
    category: "first_week",
    estimatedTime: "30 minutes",
    stateSpecific: false,
  },
  {
    id: "week-006",
    title: "Set up mail forwarding",
    description:
      "Visit USPS.com or your local post office to forward the deceased's mail to a responsible party. This ensures you receive bills, account statements, and legal notices that would otherwise be missed.",
    whyItMatters:
      "Missed mail can mean missed bills, tax notices, or legal deadlines. Mail forwarding prevents important correspondence from going unnoticed.",
    category: "first_week",
    estimatedTime: "15 minutes",
    stateSpecific: false,
  },
  {
    id: "week-007",
    title: "Begin an inventory of assets and debts",
    description:
      "Start documenting all assets (bank accounts, investments, real estate, vehicles, valuables) and debts (mortgage, loans, credit cards, medical bills). Check tax returns for income sources and account interest.",
    whyItMatters:
      "A complete inventory is required for probate and ensures no assets are overlooked. It also helps determine whether the estate qualifies for simplified probate.",
    category: "first_week",
    estimatedTime: "2-4 hours",
    stateSpecific: false,
  },
  {
    id: "week-008",
    title: "Consult an estate attorney",
    description:
      "Schedule a consultation with a probate attorney in the deceased's state of residence. Many offer a free initial consultation. Bring the will, death certificate, and your asset inventory.",
    whyItMatters:
      "An attorney can advise whether probate is required, estimate timelines and costs, and help avoid costly mistakes. Early legal guidance saves time and money.",
    category: "first_week",
    estimatedTime: "1-2 hours",
    stateSpecific: false,
  },
  {
    id: "week-009",
    title: "Contact Veterans Affairs (if veteran)",
    description:
      "If the deceased was a veteran, contact the VA at 800-827-1000 to report the death and inquire about burial benefits, survivor benefits, and a burial flag. Visit va.gov for forms.",
    whyItMatters:
      "Veterans and their survivors may be entitled to burial allowances, headstones, survivor pensions, and education benefits for dependents.",
    category: "first_week",
    estimatedTime: "30 minutes",
    stateSpecific: false,
  },
  {
    id: "week-010",
    title: "Notify the DMV and return driver's license",
    description:
      "Contact the state DMV to cancel the deceased's driver's license and vehicle registration. Some states require the license to be returned or destroyed.",
    whyItMatters:
      "An active driver's license can be used for identity theft. Canceling it also prevents fraudulent vehicle transactions.",
    category: "first_week",
    estimatedTime: "30 minutes",
    stateSpecific: false,
  },

  // ── First Month ─────────────────────────────────────────────────────
  {
    id: "month-001",
    title: "File life insurance claims",
    description:
      "Complete and submit claim forms for all life insurance policies. Include certified death certificates and any required supporting documentation. Track claim numbers and expected payment timelines.",
    whyItMatters:
      "Life insurance payouts are typically processed within 30-60 days of filing. Delays in filing mean delays in receiving funds the family may need urgently.",
    category: "first_month",
    estimatedTime: "2-3 hours",
    stateSpecific: false,
  },
  {
    id: "month-002",
    title: "Apply for survivor benefits",
    description:
      "File for Social Security survivor benefits, pension benefits, and any other survivor/death benefits. Surviving spouses and dependent children may be eligible for monthly payments.",
    whyItMatters:
      "Survivor benefits can provide ongoing financial support. Some benefits must be applied for within specific timeframes to avoid losing payments.",
    category: "first_month",
    estimatedTime: "1-2 hours",
    stateSpecific: false,
  },
  {
    id: "month-003",
    title: "Transfer utility accounts",
    description:
      "Contact utility companies (electric, gas, water, internet, phone) to transfer accounts to the surviving resident's name or cancel services if the home will be vacated.",
    whyItMatters:
      "Utilities in the deceased's name can accumulate debt or be shut off unexpectedly. Transferring ensures uninterrupted service.",
    category: "first_month",
    estimatedTime: "1-2 hours",
    stateSpecific: false,
  },
  {
    id: "month-004",
    title: "Cancel or transfer subscriptions and memberships",
    description:
      "Review bank and credit card statements to identify recurring charges. Cancel streaming services, gym memberships, magazine subscriptions, professional memberships, and any other recurring payments.",
    whyItMatters:
      "Subscriptions continue charging indefinitely unless canceled. Identifying and stopping all recurring charges prevents ongoing financial drain.",
    category: "first_month",
    estimatedTime: "2-3 hours",
    stateSpecific: false,
  },
  {
    id: "month-005",
    title: "Notify credit card companies and close accounts",
    description:
      "Contact each credit card issuer with a certified death certificate. Pay outstanding balances from the estate. Keep joint accounts open if the surviving spouse is a co-applicant (not just an authorized user).",
    whyItMatters:
      "Open credit accounts are vulnerable to fraud. However, prematurely closing joint accounts can hurt the surviving spouse's credit score.",
    category: "first_month",
    estimatedTime: "1-2 hours",
    stateSpecific: false,
  },
  {
    id: "month-006",
    title: "Open an estate bank account",
    description:
      "Open a dedicated bank account in the estate's name to receive incoming funds (insurance payouts, refunds, owed wages) and pay estate expenses (funeral, debts, legal fees). This separates estate finances from personal finances.",
    whyItMatters:
      "Commingling estate and personal funds creates legal liability for the executor and complicates probate accounting.",
    category: "first_month",
    estimatedTime: "1 hour",
    stateSpecific: false,
    minComplexity: "moderate",
  },
  {
    id: "month-007",
    title: "Begin the probate process",
    description:
      "File the will with the probate court in the county where the deceased lived. Petition to be appointed executor or administrator. The court will issue Letters Testamentary (with a will) or Letters of Administration (without a will).",
    whyItMatters:
      "Without court appointment, you have no legal authority to manage the estate's assets, close accounts, or distribute property. Delays in filing extend the entire process.",
    category: "first_month",
    estimatedTime: "2-4 hours",
    stateSpecific: false,
    minComplexity: "moderate",
  },
  {
    id: "month-008",
    title: "Notify investment and retirement account holders",
    description:
      "Contact brokerages, 401(k)/IRA custodians, and pension administrators. Determine beneficiary designations and begin transfer or rollover processes. Get current account valuations for estate accounting.",
    whyItMatters:
      "Beneficiary designations on retirement accounts supersede the will. Confirming designations ensures assets go to the intended recipients.",
    category: "first_month",
    estimatedTime: "2-3 hours",
    stateSpecific: false,
  },
  {
    id: "month-009",
    title: "Update beneficiaries on your own accounts",
    description:
      "If the deceased was named as beneficiary on your life insurance, retirement accounts, or financial accounts, update these designations immediately.",
    whyItMatters:
      "A deceased beneficiary designation can cause assets to pass through probate instead of directly to your intended heirs, adding time and cost.",
    category: "first_month",
    estimatedTime: "1 hour",
    stateSpecific: false,
  },
  {
    id: "month-010",
    title: "Review community property rules",
    description:
      "In community property states, most assets acquired during marriage are owned equally by both spouses. Consult an attorney about how this affects asset distribution, especially for real property and business interests.",
    whyItMatters:
      "Community property rules significantly affect how assets pass to heirs and may simplify or complicate probate. Misunderstanding them can lead to incorrect distributions.",
    category: "first_month",
    estimatedTime: "1 hour",
    stateSpecific: true,
    applicableStates: COMMUNITY_PROPERTY_STATES,
  },

  // ── First 3 Months ─────────────────────────────────────────────────
  {
    id: "quarter-001",
    title: "Complete probate court filings",
    description:
      "File all required probate documents including the petition for probate, inventory of assets, and notice to creditors. Attend any required court hearings. Publish notice to creditors as required by your state.",
    whyItMatters:
      "Probate courts have strict deadlines and requirements. Missing filings can delay the process by months and may result in sanctions.",
    category: "first_quarter",
    estimatedTime: "4-8 hours",
    stateSpecific: false,
    minComplexity: "moderate",
  },
  {
    id: "quarter-002",
    title: "Pay estate debts and final bills",
    description:
      "After the creditor notice period expires, pay legitimate debts from the estate account. Prioritize in this order: funeral expenses, estate administration costs, taxes, secured debts, then unsecured debts.",
    whyItMatters:
      "Paying debts in the wrong order can create personal liability for the executor. Some debts have higher legal priority than others.",
    category: "first_quarter",
    estimatedTime: "2-4 hours",
    stateSpecific: false,
  },
  {
    id: "quarter-003",
    title: "Handle digital assets and online accounts",
    description:
      "Close or memorialize social media accounts (Facebook, Instagram, Twitter/X). Transfer or close email accounts, cloud storage, and digital purchases. Check for cryptocurrency wallets or digital assets.",
    whyItMatters:
      "Unmanaged online accounts are targets for hackers and can expose personal information. Digital assets like cryptocurrency may have significant value.",
    category: "first_quarter",
    estimatedTime: "2-4 hours",
    stateSpecific: false,
  },
  {
    id: "quarter-004",
    title: "Transfer vehicle titles",
    description:
      "Visit the DMV with a death certificate and vehicle title to transfer ownership. If the vehicle had a loan, contact the lender. Joint-owned vehicles may transfer automatically in some states.",
    whyItMatters:
      "Vehicles cannot be legally sold without a title in the new owner's name. Delays can affect insurance coverage and liability.",
    category: "first_quarter",
    estimatedTime: "1-2 hours",
    stateSpecific: false,
  },
  {
    id: "quarter-005",
    title: "File property tax exemption changes",
    description:
      "Notify the county assessor's office about the death. Homestead exemptions, senior exemptions, and other property tax benefits may need to be updated or reapplied for by the surviving owner.",
    whyItMatters:
      "Losing property tax exemptions without reapplying can result in significantly higher property tax bills for the surviving family.",
    category: "first_quarter",
    estimatedTime: "1 hour",
    stateSpecific: false,
  },
  {
    id: "quarter-006",
    title: "Cancel professional licenses and memberships",
    description:
      "Contact professional licensing boards, trade organizations, and membership clubs to cancel the deceased's memberships. Some may have refundable dues or death benefits.",
    whyItMatters:
      "Active professional licenses can be misused for fraud. Some organizations offer death benefits or refunds that should be claimed.",
    category: "first_quarter",
    estimatedTime: "1 hour",
    stateSpecific: false,
  },
  {
    id: "quarter-007",
    title: "Address real property transfers",
    description:
      "Work with an attorney to transfer real property (houses, land, condos). This may require probate court approval, recording deeds, and updating property records with the county.",
    whyItMatters:
      "Real property transfers have strict legal requirements. Incorrect transfers can result in title problems that are expensive to fix later.",
    category: "first_quarter",
    estimatedTime: "4-8 hours",
    stateSpecific: false,
    minComplexity: "moderate",
  },
  {
    id: "quarter-008",
    title: "Review and update your own estate plan",
    description:
      "After experiencing the complexity of estate settlement firsthand, review your own will, beneficiary designations, powers of attorney, and advance directives. Update them to reflect your current wishes.",
    whyItMatters:
      "This experience shows how much easier estate settlement is with proper planning. Updating your own plan protects your family from the same difficulties.",
    category: "first_quarter",
    estimatedTime: "2-4 hours",
    stateSpecific: false,
  },
  {
    id: "quarter-009",
    title: "File state estate tax return",
    description:
      "File the state estate tax return if the estate exceeds your state's threshold. State thresholds are much lower than the federal $15M exemption. Deadlines vary by state but are typically 9 months after death.",
    whyItMatters:
      "State estate tax thresholds can be as low as $1M (Oregon, Massachusetts). Missing the deadline triggers penalties and interest.",
    category: "first_quarter",
    estimatedTime: "2-4 hours",
    stateSpecific: true,
    applicableStates: ESTATE_TAX_STATES,
  },
  {
    id: "quarter-010",
    title: "File state inheritance tax return",
    description:
      "File the state inheritance tax return. Unlike estate tax (which taxes the estate), inheritance tax is paid by the beneficiary. Rates and exemptions vary by relationship to the deceased.",
    whyItMatters:
      "Inheritance tax is owed by the recipients, not the estate. Spouses are typically exempt, but other heirs may owe significant amounts if they miss the filing deadline.",
    category: "first_quarter",
    estimatedTime: "2-4 hours",
    stateSpecific: true,
    applicableStates: INHERITANCE_TAX_STATES,
  },
  {
    id: "quarter-011",
    title: "Handle business interests",
    description:
      "If the deceased owned a business, review operating agreements, partnership agreements, or corporate bylaws. Determine if there is a buy-sell agreement. Notify business partners, clients, and vendors.",
    whyItMatters:
      "Business interests require immediate attention to prevent loss of value, maintain client relationships, and honor legal obligations to partners.",
    category: "first_quarter",
    estimatedTime: "4-8 hours",
    stateSpecific: false,
    minComplexity: "complex",
  },

  // ── First Year ──────────────────────────────────────────────────────
  {
    id: "year-001",
    title: "File the decedent's final income tax return",
    description:
      "File Form 1040 for the deceased's final year. Report income from January 1 through the date of death. The surviving spouse (if filing jointly) or executor signs the return.",
    whyItMatters:
      "The IRS requires a final tax return. Filing jointly with a surviving spouse often results in a lower tax bill than filing separately.",
    category: "first_year",
    estimatedTime: "2-4 hours",
    stateSpecific: false,
  },
  {
    id: "year-002",
    title: "File estate income tax return (Form 1041)",
    description:
      "If the estate earned gross income of $600 or more after the date of death, file Form 1041. This covers income from estate assets like interest, dividends, rent, and business income.",
    whyItMatters:
      "Required by the IRS if estate income exceeds $600. Failure to file results in penalties and interest on taxes owed.",
    category: "first_year",
    estimatedTime: "2-4 hours",
    stateSpecific: false,
    minComplexity: "moderate",
  },
  {
    id: "year-003",
    title: "File federal estate tax return (Form 706) if applicable",
    description:
      "File Form 706 if the gross estate exceeds $15M (2026 threshold). Even if under the threshold, filing preserves the unused exemption for the surviving spouse (portability election). Due 9 months after death, with a 6-month extension via Form 4768.",
    whyItMatters:
      "99%+ of families will NOT owe federal estate tax. However, filing for portability preserves the deceased's unused exemption for the surviving spouse — potentially saving millions in future taxes.",
    category: "first_year",
    estimatedTime: "4-8 hours",
    stateSpecific: false,
    minComplexity: "complex",
  },
  {
    id: "year-004",
    title: "Distribute assets to beneficiaries",
    description:
      "After all debts are paid, taxes filed, and the creditor period expires, distribute remaining assets according to the will or state intestacy laws. Get receipts from all beneficiaries.",
    whyItMatters:
      "Distributing assets before debts and taxes are settled creates personal liability for the executor. Receipts protect against future claims from beneficiaries.",
    category: "first_year",
    estimatedTime: "2-4 hours",
    stateSpecific: false,
  },
  {
    id: "year-005",
    title: "File final accounting with probate court",
    description:
      "Prepare and file a final accounting showing all assets received, debts paid, taxes filed, and distributions made. The court will review and approve the accounting before the estate can be closed.",
    whyItMatters:
      "The final accounting is the legal record of your stewardship of the estate. It protects you from future claims of mismanagement.",
    category: "first_year",
    estimatedTime: "2-4 hours",
    stateSpecific: false,
    minComplexity: "moderate",
  },
  {
    id: "year-006",
    title: "Close the estate",
    description:
      "After distributions are complete and the court approves the final accounting, file a petition to close the estate. The court will issue an order discharging the executor from further duties.",
    whyItMatters:
      "Closing the estate formally ends your legal responsibility and liability as executor. Leaving it open indefinitely creates ongoing obligations.",
    category: "first_year",
    estimatedTime: "1-2 hours",
    stateSpecific: false,
    minComplexity: "moderate",
  },
  {
    id: "year-007",
    title: "Review your own financial plan",
    description:
      "After settling the estate, review your own financial situation. Consider meeting with a financial advisor about changes in your income, assets, tax situation, and insurance needs.",
    whyItMatters:
      "A death in the family often significantly changes your financial picture. Professional guidance ensures you make informed decisions during this transition.",
    category: "first_year",
    estimatedTime: "2 hours",
    stateSpecific: false,
  },
];
