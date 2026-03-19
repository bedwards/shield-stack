/**
 * Phone Script SEO Landing Pages — /phone-scripts/{slug}
 *
 * These are flat, SEO-focused landing pages targeting high-value keywords
 * with zero competition. Each page provides a complete word-for-word script
 * for calling a specific institution after someone dies.
 *
 * Content sourced from the authoritative phone scripts library (src/lib/scripts/script-data.ts)
 * and adapted for SEO landing page format with year-stamped titles.
 */

/** ISO 8601 date string */
type ISODateString = string;

export interface ScriptSection {
  heading: string;
  text: string;
}

export interface PhoneScriptPage {
  slug: string;
  title: string;
  seoTitle: string;
  institution: string;
  description: string;
  phoneNumber: string | null;
  hours: string;
  expectedDuration: string;
  documentsNeeded: string[];
  openingScript: string;
  scriptSections: ScriptSection[];
  whatToExpect: string[];
  whatToAskFor: string[];
  ifTheyPushBack: string[];
  tips: string[];
  urgencyNote: string | null;
  relatedSlugs: string[];
  lastVerified: ISODateString;
}

const CURRENT_YEAR = new Date().getFullYear();

export const PHONE_SCRIPTS: PhoneScriptPage[] = [
  {
    slug: "social-security",
    title: `What to Say When Calling Social Security About a Death (${CURRENT_YEAR} Script)`,
    seoTitle: `What to Say When Calling Social Security About a Death (${CURRENT_YEAR} Script)`,
    institution: "Social Security Administration (SSA)",
    description:
      "Free word-for-word phone script for reporting a death to Social Security and claiming survivor benefits. Know exactly what to say, what documents to have ready, and what to ask for.",
    phoneNumber: "800-772-1213",
    hours: "Monday\u2013Friday, 8 AM \u2013 7 PM local time. TTY: 1-800-325-0778.",
    expectedDuration: "30\u201360 minutes (hold times vary significantly)",
    documentsNeeded: [
      "Deceased\u2019s full legal name",
      "Deceased\u2019s Social Security Number",
      "Date of death",
      "Place of death (city and state)",
      "Your relationship to the deceased",
      "Your name and contact information",
      "Funeral home name and phone number",
      "Death certificate (have it nearby for reference)",
      "Your own Social Security Number (for survivor benefits)",
      "Deceased\u2019s W-2 or self-employment tax return (for survivor benefits)",
    ],
    openingScript:
      "Hello, I\u2019m calling to report the death of a family member and need to notify Social Security. The deceased\u2019s name is [FULL NAME] and their Social Security Number is [SSN]. They passed away on [DATE OF DEATH].",
    scriptSections: [
      {
        heading: "Reporting the Death",
        text: "I\u2019m calling to report a death and stop any benefit payments. I need to notify Social Security of a death. The deceased\u2019s name is [FULL NAME], Social Security Number [SSN], and they passed away on [DATE]. I\u2019m the [RELATIONSHIP] and I\u2019m handling the estate.",
      },
      {
        heading: "Requesting Confirmation",
        text: "Can you confirm the death has been recorded in your system? I\u2019d like a written confirmation letter of the death report. I also need to know about any overpayments that may need to be returned.",
      },
      {
        heading: "Claiming the Lump-Sum Death Benefit",
        text: "I\u2019d like to apply for the $255 lump-sum death benefit. I am the [surviving spouse / dependent child] of the deceased. Can you walk me through Form SSA-8?",
      },
      {
        heading: "Asking About Survivor Benefits",
        text: "I need to find out what survivor benefits I or other family members may be eligible for. Can you explain the requirements for [widow/widower benefits, children\u2019s benefits, parent\u2019s benefits]? I\u2019d like to begin the application today if possible.",
      },
    ],
    whatToExpect: [
      "You\u2019ll navigate an automated phone menu \u2014 press 0 or say \u201Crepresentative\u201D to reach a person.",
      "Hold times are often 30+ minutes. Call early morning or late afternoon for shorter waits.",
      "The representative will verify your identity and ask for the deceased\u2019s information.",
      "They may tell you the funeral home already reported the death via Electronic Death Registration (EDR) \u2014 confirm it was processed.",
      "If the deceased was receiving benefits, any payments after the date of death must be returned.",
    ],
    whatToAskFor: [
      "Confirmation that the death is recorded in SSA\u2019s system",
      "Survivor benefits eligibility for you and other family members",
      "The $255 lump-sum death benefit (for surviving spouse or dependent child)",
      "A written confirmation letter of the death report",
      "Information about any overpayments that may need to be returned",
      "Whether you need to schedule an in-person appointment at your local office",
    ],
    ifTheyPushBack: [
      "Ask to speak with a supervisor or claims representative.",
      "Say: \u201CI understand this may require verification. What documentation do you need from me to process this?\u201D",
      "If they say the funeral home already reported it: \u201CCan you confirm the exact date the report was processed and that the SSN is now flagged?\u201D",
      "If hold times are too long: \u201CCan I schedule a callback or an in-person appointment at my local SSA office?\u201D",
    ],
    tips: [
      "SSA cannot be notified online \u2014 you must call or visit in person.",
      "The funeral home may have already filed an Electronic Death Registration (EDR), but always call to confirm.",
      "Avoid calling on Mondays and the first week of the month \u2014 these are the busiest times.",
      "If the deceased was receiving direct-deposit benefits, contact the bank to return any payments received after the date of death.",
      "You may need to visit your local SSA office in person for survivor benefit applications.",
    ],
    urgencyNote:
      "Survivor benefits are NOT retroactive \u2014 they are paid from the date of your application, not the date of death. Every day you delay costs real money. Call as soon as possible.",
    relatedSlugs: [
      "credit-bureaus",
      "bank-notification",
      "employer-benefits",
    ],
    lastVerified: "2026-03-01",
  },
  {
    slug: "bank-notification",
    title: `What to Say When Calling the Bank About a Death (${CURRENT_YEAR} Script)`,
    seoTitle: `What to Say When Calling the Bank About a Death (${CURRENT_YEAR} Script)`,
    institution: "Bank / Financial Institution",
    description:
      "Free word-for-word phone script for notifying a bank about an account holder\u2019s death. Learn what to say, what documents you need, and how to freeze accounts to prevent fraud.",
    phoneNumber: null,
    hours: "Call your bank\u2019s main customer service line. Ask to be transferred to the estate or bereavement department.",
    expectedDuration: "30\u201345 minutes",
    documentsNeeded: [
      "Deceased\u2019s full legal name",
      "Account numbers (if known)",
      "Deceased\u2019s Social Security Number",
      "Date of death",
      "Certified copy of the death certificate",
      "Letters testamentary or letters of administration",
      "Your valid photo ID",
      "Your authority documentation (will, trust, court appointment)",
    ],
    openingScript:
      "Hello, I\u2019m calling to report the death of an account holder, [FULL NAME]. They passed away on [DATE OF DEATH]. I\u2019m the [RELATIONSHIP / executor of the estate] and I need to discuss the next steps for their accounts.",
    scriptSections: [
      {
        heading: "Reporting the Death and Freezing Accounts",
        text: "I\u2019m calling to report the death of an account holder. I need to freeze the accounts to prevent unauthorized transactions. I\u2019m the executor/administrator of the estate and I have the death certificate and letters testamentary.",
      },
      {
        heading: "Getting Account Information",
        text: "I need a complete list of all accounts held by the deceased at this institution. Can you tell me the current balance and any pending transactions on each account? Are any of these accounts jointly held?",
      },
      {
        heading: "Asking About Beneficiary Designations",
        text: "Are there any beneficiaries named on these accounts \u2014 payable-on-death or transfer-on-death designations? I also need to know about any safe deposit boxes held at the bank.",
      },
      {
        heading: "Understanding the Release Process",
        text: "What is the process and timeline for releasing funds to the estate? What documents do I need to bring to a branch? Can I open an estate checking account for managing estate finances?",
      },
    ],
    whatToExpect: [
      "The representative will likely transfer you to a specialized estate or bereavement department.",
      "They will ask you to verify your identity and authority over the estate.",
      "Accounts will typically be frozen immediately upon notification \u2014 no debits or credits until the estate is resolved.",
      "You may need to visit a branch in person with original documents.",
      "Joint accounts with right of survivorship pass directly to the surviving owner and should NOT be closed.",
    ],
    whatToAskFor: [
      "A complete list of all accounts held by the deceased",
      "Current balances and any pending transactions",
      "Whether any accounts are jointly held (these pass to the survivor)",
      "Any outstanding loans or lines of credit",
      "Any safe deposit boxes held at the bank",
      "The process and timeline for releasing funds to the estate",
      "Whether any beneficiaries are named on accounts (POD/TOD designations)",
      "A written confirmation of account freezing",
    ],
    ifTheyPushBack: [
      "Say: \u201CI have letters testamentary granting me authority over the estate. Can I bring these to a branch to process this request?\u201D",
      "If they won\u2019t freeze: \u201CI\u2019m requesting a freeze to prevent unauthorized transactions. I\u2019m willing to provide the death certificate and court documents immediately.\u201D",
      "Ask to speak with the estate services or probate department specifically.",
      "Say: \u201CI understand you need to verify my authority. What specific documents do I need to bring to a branch?\u201D",
    ],
    tips: [
      "Joint accounts with right of survivorship pass directly to the surviving owner \u2014 these should NOT be closed.",
      "Payable-on-death (POD) accounts go directly to the named beneficiary.",
      "Do not deposit any estate checks into personal accounts.",
      "Ask about automatic payments (autopay) on the accounts \u2014 these may need to be individually cancelled.",
      "Consider opening an estate checking account for managing estate finances.",
      "Check for safe deposit boxes \u2014 the bank may require a court order to open them.",
    ],
    urgencyNote: null,
    relatedSlugs: [
      "social-security",
      "credit-bureaus",
      "life-insurance-claim",
    ],
    lastVerified: "2026-03-01",
  },
  {
    slug: "life-insurance-claim",
    title: `What to Say When Calling a Life Insurance Company About a Death (${CURRENT_YEAR} Script)`,
    seoTitle: `What to Say When Calling a Life Insurance Company About a Death (${CURRENT_YEAR} Script)`,
    institution: "Life Insurance Company",
    description:
      "Free word-for-word phone script for filing a life insurance claim after someone dies. Know exactly what to say, what documents to have ready, and the payout options available to you.",
    phoneNumber: null,
    hours: "Call the insurer\u2019s claims department. Most are available 8 AM \u2013 6 PM. Check the policy documents for the specific claims phone number.",
    expectedDuration: "20\u201330 minutes",
    documentsNeeded: [
      "Policy number",
      "Policyholder\u2019s full legal name",
      "Policyholder\u2019s date of birth",
      "Date and cause of death",
      "Certified copy of the death certificate",
      "Your full name as it appears on the beneficiary designation",
      "Your Social Security Number (for tax reporting on the payout)",
      "Your mailing address and phone number",
    ],
    openingScript:
      "Hello, I\u2019m calling to file a death claim on a life insurance policy. The policyholder, [FULL NAME], passed away on [DATE OF DEATH]. I\u2019m [YOUR NAME], a named beneficiary on the policy. The policy number is [POLICY NUMBER].",
    scriptSections: [
      {
        heading: "Filing the Claim",
        text: "I need to file a death claim on a life insurance policy. I\u2019m a named beneficiary on this policy. I need a claim form mailed or emailed to me. Can you confirm the policy is active and in good standing?",
      },
      {
        heading: "Understanding the Payout",
        text: "What is the policy face value and are there any riders or additional benefits? Is there an accidental death benefit (double indemnity)? What are the payout options \u2014 lump sum, annuity, or retained asset account? Will any outstanding policy loans reduce the payout?",
      },
      {
        heading: "Getting a Timeline",
        text: "What is the expected timeline for processing and payment? What is the claim reference number? Is there anything else I need to provide to expedite the claim?",
      },
    ],
    whatToExpect: [
      "The insurer will verify your identity and beneficiary status.",
      "They will mail or email a claim form for you to complete and return with the death certificate.",
      "Most claims are processed within 30\u201360 days of receiving all required documents.",
      "If the death occurred within the contestability period (first 2 years of the policy), the insurer may investigate before paying.",
      "Life insurance proceeds are generally NOT taxable income for the beneficiary.",
    ],
    whatToAskFor: [
      "A claim form (most insurers will mail or email this)",
      "The policy face value and any riders or additional benefits",
      "Whether there is an accidental death benefit (double indemnity)",
      "Payout options: lump sum, annuity, retained asset account",
      "The expected timeline for processing and payment",
      "Whether any outstanding policy loans will reduce the payout",
      "A claim reference number",
    ],
    ifTheyPushBack: [
      "If they can\u2019t find the policy: \u201CCan you search by the policyholder\u2019s Social Security Number or date of birth? The policy may be under a previous name.\u201D",
      "If the policy lapsed: \u201CWas there a grace period at the time of death? Many policies have a 30-day grace period where coverage continues.\u201D",
      "If they question your beneficiary status: \u201CI can provide identification and the death certificate. What documentation do you need to verify my claim?\u201D",
      "Say: \u201CI\u2019d like to understand my appeal options if the claim is denied.\u201D",
    ],
    tips: [
      "Life insurance proceeds are generally not taxable income for the beneficiary.",
      "If you don\u2019t know the insurer, check with the state insurance department or search the NAIC Life Policy Locator (free service).",
      "Claim filing deadlines vary but most insurers require claims within 1\u20132 years.",
      "Check if the deceased had employer-provided life insurance \u2014 many employers offer 1\u20132x salary at no cost to the employee.",
      "If the death occurred within the first 2 years of the policy (contestability period), the insurer may investigate before paying.",
      "Consider the tax implications of different payout options before choosing.",
    ],
    urgencyNote: null,
    relatedSlugs: [
      "employer-benefits",
      "bank-notification",
      "social-security",
    ],
    lastVerified: "2026-03-01",
  },
  {
    slug: "credit-bureaus",
    title: `What to Say When Calling Credit Bureaus About a Death (${CURRENT_YEAR} Script)`,
    seoTitle: `What to Say When Calling Credit Bureaus About a Death (${CURRENT_YEAR} Script)`,
    institution: "Equifax, Experian & TransUnion",
    description:
      "Free word-for-word phone scripts for notifying all three credit bureaus (Equifax, Experian, TransUnion) of a death. Protect the deceased from identity theft by placing deceased alerts on their credit files.",
    phoneNumber: null,
    hours: "Equifax: 800-685-1111 (8 AM \u2013 11 PM ET). Experian: 888-397-3742 (8 AM \u2013 8 PM ET). TransUnion: 800-916-8800 (8 AM \u2013 11 PM ET).",
    expectedDuration: "15\u201330 minutes per bureau (45\u201390 minutes total for all three)",
    documentsNeeded: [
      "Deceased\u2019s full legal name",
      "Deceased\u2019s Social Security Number",
      "Deceased\u2019s date of birth",
      "Date of death",
      "Deceased\u2019s last known address",
      "Certified copy of the death certificate (mail-in required for all three)",
      "Your name, relationship, and contact information",
      "Letters testamentary or court appointment (if executor)",
    ],
    openingScript:
      "Hello, I\u2019m calling to report the death of [FULL NAME] and request a deceased alert be placed on their credit file. Their Social Security Number is [SSN] and they passed away on [DATE OF DEATH].",
    scriptSections: [
      {
        heading: "Equifax (800-685-1111)",
        text: "I need to place a deceased alert on a credit file. I\u2019m requesting the credit report be flagged as deceased. I\u2019d like a copy of the credit report to check for unauthorized activity. Please flag this account to prevent new credit applications. Mail address: Equifax Information Services LLC, P.O. Box 105069, Atlanta, GA 30348-5069.",
      },
      {
        heading: "Experian (888-397-3742)",
        text: "I need to place a deceased notification on a credit file. I need the credit report flagged as deceased. I\u2019d like a copy of the final credit report. Please block any new credit applications using this identity. Mail address: Experian, P.O. Box 4500, Allen, TX 75013.",
      },
      {
        heading: "TransUnion (800-916-8800)",
        text: "I need to report a death and place a deceased indicator on the credit file. I need a copy of the credit report for the deceased. Please freeze this credit file to prevent new applications. Mail address: TransUnion LLC, P.O. Box 2000, Chester, PA 19016.",
      },
    ],
    whatToExpect: [
      "Each bureau has a similar process but separate phone lines \u2014 you must call all three.",
      "They will verify your identity and authority to make the request.",
      "Most bureaus require you to mail a certified copy of the death certificate as follow-up.",
      "The deceased alert is usually placed immediately by phone, but written confirmation takes 7\u201310 business days.",
      "Identity theft of deceased individuals is common \u2014 criminals target the gap between death and credit file flagging.",
    ],
    whatToAskFor: [
      "Confirmation that the deceased alert has been placed",
      "A copy of the deceased\u2019s credit report (to check for fraud)",
      "A reference or confirmation number for your request",
      "Written confirmation sent to your mailing address",
      "The mailing address to send the certified death certificate",
      "How long the flagging process takes to complete",
    ],
    ifTheyPushBack: [
      "Say: \u201CI have a certified death certificate and can provide proof of my authority as executor/administrator. What is the process to submit these documents?\u201D",
      "Ask: \u201CCan I submit this request in writing if you cannot process it by phone?\u201D",
      "If they say only the executor can request this: \u201CI\u2019m the executor and I have letters testamentary. What documentation do you need?\u201D",
      "Request a supervisor if the representative cannot assist.",
    ],
    tips: [
      "You must contact all three bureaus separately \u2014 they do not share information with each other.",
      "Request credit reports from all three bureaus to check for fraudulent activity.",
      "The SSA Death Master File eventually updates credit bureaus, but this can take months \u2014 calling speeds the process.",
      "Identity theft of deceased people (\u201Cghostwriting\u201D) is one of the fastest-growing forms of fraud.",
      "Keep copies of all confirmation numbers and correspondence.",
      "Consider placing a fraud alert in addition to the deceased alert for extra protection.",
    ],
    urgencyNote: null,
    relatedSlugs: [
      "social-security",
      "bank-notification",
      "employer-benefits",
    ],
    lastVerified: "2026-03-01",
  },
  {
    slug: "employer-benefits",
    title: `What to Say When Calling an Employer About a Death (${CURRENT_YEAR} Script)`,
    seoTitle: `What to Say When Calling an Employer About a Death (${CURRENT_YEAR} Script)`,
    institution: "Deceased\u2019s Employer (HR / Benefits Department)",
    description:
      "Free word-for-word phone script for contacting a deceased person\u2019s employer about final pay, life insurance, 401(k), pension, and other benefits. Know exactly what to ask for.",
    phoneNumber: null,
    hours: "Call the company\u2019s main number and ask for Human Resources or the benefits department. Most HR departments are available 9 AM \u2013 5 PM local time.",
    expectedDuration: "30\u201345 minutes",
    documentsNeeded: [
      "Employee\u2019s full name and employee ID (if known)",
      "Department and supervisor name (if known)",
      "Date of death",
      "Certified copy of the death certificate",
      "Your name, relationship, and contact information",
      "Letters testamentary (if you\u2019re the executor)",
      "Your Social Security Number (if you\u2019re a beneficiary for tax forms)",
    ],
    openingScript:
      "Hello, I\u2019m calling about an employee who recently passed away. [FULL NAME] was employed at [COMPANY NAME] and passed away on [DATE OF DEATH]. I\u2019m the [RELATIONSHIP / executor of their estate] and I need to discuss final compensation, benefits, and any death benefits.",
    scriptSections: [
      {
        heading: "Final Pay and Accrued Time",
        text: "I need to arrange for the final paycheck including any accrued but unpaid wages. Is there a payout for accrued vacation, PTO, or sick time? Are there any outstanding expense reimbursements? Who should the final check be made payable to \u2014 the estate or the beneficiary?",
      },
      {
        heading: "Life Insurance and Death Benefits",
        text: "Does the company provide employer-paid life insurance? Many employers offer 1\u20132x salary at no cost to the employee. Did the employee purchase any supplemental life insurance through the company? Is there accidental death and dismemberment (AD&D) insurance?",
      },
      {
        heading: "Retirement Accounts (401k, Pension)",
        text: "I need to know the beneficiary designation on file for the 401(k) or retirement plan. What are the distribution options? Is there a pension plan, and if so, is there a survivor benefit for the surviving spouse? Are there any stock options, RSUs, or equity that may be owed?",
      },
      {
        heading: "Health Insurance Continuation (COBRA)",
        text: "I need COBRA information for dependents\u2019 health coverage continuation. What is the deadline for electing COBRA coverage? Under federal law, dependents are entitled to 36 months of continuation coverage after the death of the covered employee.",
      },
    ],
    whatToExpect: [
      "You\u2019ll likely need to speak with the HR or benefits department specifically.",
      "They may ask you to provide documentation before releasing information.",
      "State laws require employers to pay final wages within a specific timeframe (varies by state).",
      "Beneficiary designations on retirement accounts override the will \u2014 whoever is named on the account gets the funds.",
      "COBRA election paperwork should be sent to dependents within 14 days of notification.",
    ],
    whatToAskFor: [
      "Final paycheck including any accrued but unpaid wages",
      "Payout for accrued vacation, PTO, or sick time",
      "Employer-provided life insurance (often 1\u20132x salary at no cost)",
      "Any supplemental life insurance the employee may have purchased",
      "Accidental death and dismemberment (AD&D) insurance",
      "401(k) or pension beneficiary designation on file",
      "COBRA information for dependents\u2019 health coverage",
      "Any outstanding expense reimbursements",
      "Stock options, RSUs, or equity that may be owed",
    ],
    ifTheyPushBack: [
      "Say: \u201CI have a death certificate and letters testamentary. What is the process for the estate to receive the final paycheck?\u201D",
      "If they can\u2019t discuss with you: \u201CI understand privacy concerns. Can you direct me to the HR department or benefits administrator who handles deceased employee affairs?\u201D",
      "Ask: \u201CIs there a bereavement or estate services contact in HR?\u201D",
      "If they require documentation: \u201CWhat specific documents do I need to provide, and can I email or fax them?\u201D",
    ],
    tips: [
      "Many employers provide basic life insurance (1\u20132x salary) at no cost \u2014 the employee may not have mentioned it.",
      "Beneficiary designations on retirement accounts override the will.",
      "If the employee had a 401(k), the beneficiary designation on file with the plan administrator controls who receives the funds.",
      "Ask about any ESOP, profit-sharing, or deferred compensation plans.",
      "COBRA allows dependents of a deceased employee to continue group health coverage for up to 36 months.",
      "COBRA election deadline is typically 60 days from the qualifying event notification.",
      "If the deceased had a government pension (federal, state, military), contact OPM at 1-888-767-6738.",
    ],
    urgencyNote: null,
    relatedSlugs: [
      "life-insurance-claim",
      "social-security",
      "bank-notification",
    ],
    lastVerified: "2026-03-01",
  },
];

export function getPhoneScriptBySlug(
  slug: string
): PhoneScriptPage | undefined {
  return PHONE_SCRIPTS.find((s) => s.slug === slug);
}

export function getAllPhoneScriptSlugs(): string[] {
  return PHONE_SCRIPTS.map((s) => s.slug);
}
