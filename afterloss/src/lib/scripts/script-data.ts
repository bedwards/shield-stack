/** ISO 8601 date string */
type ISODateString = string;

export interface PhoneScript {
  id: string;
  category: ScriptCategory;
  title: string;
  shortDescription: string;
  openingStatement: string;
  keyPhrases: string[];
  informationNeeded: string[];
  whatToAskFor: string[];
  ifTheySayNo: string[];
  phoneNumber: string | null;
  bestCallTimes: string | null;
  estimatedDuration: string | null;
  notes: string[];
  lastVerified: ISODateString;
}

export type ScriptCategory =
  | "government"
  | "financial"
  | "insurance"
  | "subscriptions"
  | "employment";

export interface CategoryInfo {
  slug: ScriptCategory;
  name: string;
  description: string;
  icon: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    slug: "government",
    name: "Government",
    description:
      "Social Security, credit bureaus, DMV, and other government agencies.",
    icon: "landmark",
  },
  {
    slug: "financial",
    name: "Financial",
    description:
      "Banks, credit cards, mortgage servicers, and investment accounts.",
    icon: "building-columns",
  },
  {
    slug: "insurance",
    name: "Insurance",
    description:
      "Life insurance, health insurance, auto, and homeowners claims.",
    icon: "shield",
  },
  {
    slug: "subscriptions",
    name: "Subscriptions",
    description:
      "Streaming services, utilities, memberships, and recurring charges.",
    icon: "repeat",
  },
  {
    slug: "employment",
    name: "Employment",
    description:
      "Employer benefits, final paycheck, pension, and retirement accounts.",
    icon: "briefcase",
  },
];

export const SCRIPTS: PhoneScript[] = [
  // ─── GOVERNMENT ──────────────────────────────────────────────
  {
    id: "ssa-death-notification",
    category: "government",
    title: "Social Security Death Notification",
    shortDescription:
      "Report a death to the Social Security Administration to stop benefits and flag the SSN.",
    openingStatement:
      "Hello, I'm calling to report the death of a family member and need to notify Social Security. The deceased's name is [FULL NAME] and their Social Security Number is [SSN]. They passed away on [DATE OF DEATH].",
    keyPhrases: [
      "I'm calling to report a death",
      "I need to notify Social Security of a death",
      "I need to request Form SSA-721, Statement of Death by Funeral Director",
      "I'm the [RELATIONSHIP] and I'm handling the estate",
      "I need to stop any benefit payments",
      "Can you confirm the death has been recorded in your system?",
    ],
    informationNeeded: [
      "Deceased's full legal name",
      "Deceased's Social Security Number",
      "Date of death",
      "Place of death (city and state)",
      "Your relationship to the deceased",
      "Your name and contact information",
      "Funeral home name and phone number",
      "Death certificate (have it nearby for reference)",
    ],
    whatToAskFor: [
      "Confirmation that the death is recorded in SSA's system",
      "Any survivor benefits you or other family members may be eligible for",
      "The $255 lump-sum death benefit (for surviving spouse or dependent child)",
      "A written confirmation letter of the death report",
      "Information about any overpayments that may need to be returned",
    ],
    ifTheySayNo: [
      "Ask to speak with a supervisor or claims representative",
      "Say: 'I understand this may require verification. What documentation do you need from me to process this?'",
      "If they say the funeral home already reported it, ask: 'Can you confirm the exact date the report was processed and that the SSN is now flagged?'",
      "If hold times are too long, ask: 'Can I schedule a callback or an in-person appointment at my local SSA office?'",
    ],
    phoneNumber: "800-772-1213",
    bestCallTimes:
      "Early morning (8 AM) or late afternoon (after 4 PM). Avoid Mondays and the first week of the month. TTY: 1-800-325-0778.",
    estimatedDuration: "30-60 minutes (hold times vary significantly)",
    notes: [
      "SSA cannot be notified online — only by phone or in person.",
      "The funeral home may have already filed an Electronic Death Registration (EDR), but always call to confirm.",
      "SSA hours: Monday-Friday, 8 AM - 7 PM local time.",
      "If the deceased was receiving Social Security benefits, any payments received after the date of death must be returned.",
    ],
    lastVerified: "2026-03-01",
  },
  {
    id: "credit-bureau-equifax",
    category: "government",
    title: "Equifax Deceased Alert",
    shortDescription:
      "Place a deceased alert on the Equifax credit report to prevent identity theft.",
    openingStatement:
      "Hello, I'm calling to report the death of [FULL NAME] and request a deceased alert be placed on their credit file. Their Social Security Number is [SSN] and they passed away on [DATE OF DEATH].",
    keyPhrases: [
      "I need to place a deceased alert on a credit file",
      "I'm requesting the credit report be flagged as deceased",
      "I'd like a copy of the credit report to check for unauthorized activity",
      "Please flag this account to prevent new credit applications",
    ],
    informationNeeded: [
      "Deceased's full legal name",
      "Deceased's Social Security Number",
      "Deceased's date of birth",
      "Date of death",
      "Deceased's last known address",
      "Certified copy of the death certificate (mail-in required)",
      "Your name, relationship, and contact information",
      "Letters testamentary or court appointment (if executor)",
    ],
    whatToAskFor: [
      "Confirmation that the deceased alert has been placed",
      "A copy of the deceased's credit report",
      "A reference number for this request",
      "Written confirmation sent to your address",
      "Mailing address to send the death certificate if required",
    ],
    ifTheySayNo: [
      "Say: 'I have a certified death certificate and can provide proof of my authority as executor/administrator. What is the process to submit these documents?'",
      "Ask: 'Can I submit this request in writing if you cannot process it by phone?'",
      "Request a supervisor if the representative cannot assist",
    ],
    phoneNumber: "800-685-1111",
    bestCallTimes: "Early morning. Equifax phone hours: 8 AM - 11 PM ET.",
    estimatedDuration: "15-30 minutes",
    notes: [
      "Mail address: Equifax Information Services LLC, P.O. Box 105069, Atlanta, GA 30348-5069",
      "You may also need to submit a written request with a certified death certificate.",
      "Request credit reports from all three bureaus to check for fraud.",
    ],
    lastVerified: "2026-03-01",
  },
  {
    id: "credit-bureau-experian",
    category: "government",
    title: "Experian Deceased Alert",
    shortDescription:
      "Place a deceased alert on the Experian credit report to prevent identity theft.",
    openingStatement:
      "Hello, I'm calling to report the death of [FULL NAME] and request a deceased notification be placed on their Experian credit file. Their Social Security Number is [SSN] and the date of death was [DATE OF DEATH].",
    keyPhrases: [
      "I need to place a deceased notification on a credit file",
      "I need the credit report flagged as deceased",
      "I'd like a copy of the final credit report",
      "Please block any new credit applications using this identity",
    ],
    informationNeeded: [
      "Deceased's full legal name",
      "Deceased's Social Security Number",
      "Deceased's date of birth",
      "Date of death",
      "Deceased's last known address",
      "Certified copy of the death certificate",
      "Your name, relationship, and contact information",
    ],
    whatToAskFor: [
      "Confirmation that the deceased notification has been placed",
      "A copy of the credit report",
      "A reference or confirmation number",
      "Instructions for submitting the death certificate by mail",
    ],
    ifTheySayNo: [
      "Say: 'I'm the executor and I have legal authority to manage the deceased's affairs. What documentation do you need?'",
      "Ask for the mailing address to submit a written request with the death certificate",
      "Request a supervisor if needed",
    ],
    phoneNumber: "888-397-3742",
    bestCallTimes: "Early morning or late afternoon. Hours: 8 AM - 8 PM ET.",
    estimatedDuration: "15-30 minutes",
    notes: [
      "Mail address: Experian, P.O. Box 4500, Allen, TX 75013",
      "Experian may also process notifications received through the SSA Death Master File, but this can take months.",
    ],
    lastVerified: "2026-03-01",
  },
  {
    id: "credit-bureau-transunion",
    category: "government",
    title: "TransUnion Deceased Alert",
    shortDescription:
      "Place a deceased alert on the TransUnion credit report to prevent identity theft.",
    openingStatement:
      "Hello, I'm calling to report the death of [FULL NAME] and request their TransUnion credit file be flagged as deceased. Their Social Security Number is [SSN] and the date of death was [DATE OF DEATH].",
    keyPhrases: [
      "I need to report a death and place a deceased indicator on the credit file",
      "I need a copy of the credit report for the deceased",
      "Please freeze this credit file to prevent new applications",
    ],
    informationNeeded: [
      "Deceased's full legal name",
      "Deceased's Social Security Number",
      "Deceased's date of birth",
      "Date of death",
      "Deceased's last known address",
      "Certified copy of the death certificate",
      "Your name, relationship, and contact information",
    ],
    whatToAskFor: [
      "Confirmation that the deceased indicator has been placed",
      "A copy of the credit report",
      "A reference number",
      "Mailing address for submitting the death certificate",
    ],
    ifTheySayNo: [
      "Say: 'I have the legal authority as executor/next of kin. What proof do you need from me?'",
      "Ask to submit the request in writing if phone processing is unavailable",
      "Request a supervisor",
    ],
    phoneNumber: "800-916-8800",
    bestCallTimes: "Early morning. Hours: 8 AM - 11 PM ET.",
    estimatedDuration: "15-30 minutes",
    notes: [
      "Mail address: TransUnion LLC, P.O. Box 2000, Chester, PA 19016",
      "TransUnion may also accept online submissions through their website for deceased notifications.",
    ],
    lastVerified: "2026-03-01",
  },
  {
    id: "dmv-title-transfer",
    category: "government",
    title: "DMV Vehicle Registration / Title Transfer",
    shortDescription:
      "Notify the DMV of a death to transfer or cancel vehicle registration and titles.",
    openingStatement:
      "Hello, I'm calling about transferring vehicle registration and title for a deceased family member. The registered owner, [FULL NAME], passed away on [DATE OF DEATH]. I'm the [RELATIONSHIP] and I need to transfer the title to [MY NAME / the estate].",
    keyPhrases: [
      "I need to transfer a vehicle title due to the death of the owner",
      "I need to update the vehicle registration for a deceased person",
      "What forms do I need to complete the title transfer?",
      "I'm the executor/administrator of the estate",
    ],
    informationNeeded: [
      "Deceased's full legal name",
      "Vehicle identification number (VIN)",
      "Current vehicle registration",
      "Original vehicle title (if available)",
      "Certified copy of the death certificate",
      "Letters testamentary or letters of administration",
      "Your valid driver's license or ID",
      "Proof of insurance for the vehicle",
    ],
    whatToAskFor: [
      "The specific forms required for title transfer due to death",
      "Whether you need to visit in person or can submit by mail",
      "Any fees for the title transfer",
      "Whether the vehicle registration needs to be renewed or can be transferred",
      "Timeline for processing the transfer",
    ],
    ifTheySayNo: [
      "Say: 'I have letters testamentary from the court appointing me as executor. What additional documentation do you require?'",
      "Ask: 'Can I make an appointment to handle this in person with all documents?'",
      "If they require probate, ask: 'Is there a simplified process for vehicles under a certain value (small estate affidavit)?'",
    ],
    phoneNumber: null,
    bestCallTimes:
      "Call your state's DMV. Hours vary by state. Check your state DMV website for the phone number.",
    estimatedDuration: "20-40 minutes",
    notes: [
      "DMV procedures vary significantly by state.",
      "Some states allow title transfer with just a death certificate for surviving spouses.",
      "If the vehicle was jointly owned, the surviving owner may just need to update the title.",
      "Consider whether the estate needs to maintain insurance on the vehicle during probate.",
    ],
    lastVerified: "2026-03-01",
  },

  // ─── FINANCIAL ───────────────────────────────────────────────
  {
    id: "bank-account-closure",
    category: "financial",
    title: "Bank Account Closure / Freeze",
    shortDescription:
      "Notify the bank of a death and close or freeze the deceased's accounts.",
    openingStatement:
      "Hello, I'm calling to report the death of an account holder, [FULL NAME]. They passed away on [DATE OF DEATH]. I'm the [RELATIONSHIP / executor of the estate] and I need to discuss the next steps for their accounts.",
    keyPhrases: [
      "I'm calling to report the death of an account holder",
      "I need to freeze the accounts to prevent unauthorized transactions",
      "I'm the executor/administrator of the estate",
      "I need a list of all accounts held by the deceased at this institution",
      "I need the current balance and any pending transactions on each account",
    ],
    informationNeeded: [
      "Deceased's full legal name",
      "Account numbers (if known)",
      "Deceased's Social Security Number",
      "Date of death",
      "Certified copy of the death certificate",
      "Letters testamentary or letters of administration",
      "Your valid photo ID",
      "Your authority documentation (will, trust, court appointment)",
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
    ifTheySayNo: [
      "Say: 'I have letters testamentary granting me authority over the estate. Can I bring these to a branch to process this request?'",
      "If they won't freeze: 'I'm requesting a freeze to prevent unauthorized transactions. I'm willing to provide the death certificate and court documents immediately.'",
      "Ask to speak with the estate services or probate department specifically",
      "Say: 'I understand you need to verify my authority. What specific documents do I need to bring to a branch?'",
    ],
    phoneNumber: null,
    bestCallTimes:
      "Call your bank's main customer service line. Ask to be transferred to the estate or bereavement department.",
    estimatedDuration: "30-45 minutes",
    notes: [
      "Joint accounts with right of survivorship pass directly to the surviving owner — these should NOT be closed.",
      "Payable-on-death (POD) accounts go directly to the named beneficiary.",
      "Do not deposit any estate checks into personal accounts.",
      "Ask about automatic payments (autopay) on the accounts — these may need to be individually cancelled.",
      "Consider opening an estate checking account for managing estate finances.",
    ],
    lastVerified: "2026-03-01",
  },
  {
    id: "mortgage-servicer-notification",
    category: "financial",
    title: "Mortgage Servicer Notification",
    shortDescription:
      "Notify the mortgage company of a death and discuss payment options during estate settlement.",
    openingStatement:
      "Hello, I'm calling to report the death of the borrower on a mortgage account. The borrower, [FULL NAME], passed away on [DATE OF DEATH]. I'm the [RELATIONSHIP / executor] and I need to discuss the status of the mortgage and next steps.",
    keyPhrases: [
      "I'm notifying you of the death of the mortgage borrower",
      "I need to discuss successorship options under the Garn-St. Germain Act",
      "I'm a qualifying successor and I intend to assume the mortgage",
      "I need to understand the current loan balance and payment status",
      "Please do not initiate foreclosure proceedings — I'm actively settling the estate",
    ],
    informationNeeded: [
      "Deceased's full name",
      "Mortgage account or loan number",
      "Property address",
      "Date of death",
      "Certified death certificate",
      "Letters testamentary or letters of administration",
      "Your relationship to the deceased",
      "Whether you intend to keep, sell, or transfer the property",
    ],
    whatToAskFor: [
      "Current loan balance and payment status",
      "Whether there is mortgage life insurance on the loan",
      "The process for assuming the mortgage (successorship)",
      "Any forbearance or hardship options during estate settlement",
      "Whether payments need to continue during probate (usually yes)",
      "A written confirmation of your notification",
      "The loss mitigation department contact if payments will be disrupted",
    ],
    ifTheySayNo: [
      "Say: 'Under the Garn-St. Germain Depository Institutions Act, a surviving spouse or heir has the right to assume the mortgage. I'm requesting you process this assumption.'",
      "If they threaten foreclosure: 'Please note that federal law protects successors from due-on-sale enforcement. I'd like to speak with your loss mitigation department.'",
      "Ask: 'Can you place a hold on any foreclosure proceedings while the estate is being settled?'",
    ],
    phoneNumber: null,
    bestCallTimes:
      "Call the number on your mortgage statement. Ask for the loss mitigation or bereavement department.",
    estimatedDuration: "30-45 minutes",
    notes: [
      "The Garn-St. Germain Act (1982) prohibits lenders from enforcing due-on-sale clauses when property transfers to a spouse, child, or relative upon death.",
      "Keep making mortgage payments if at all possible to avoid foreclosure.",
      "If there is a co-borrower, the mortgage continues as normal for them.",
      "Check if there is Private Mortgage Insurance (PMI) or mortgage life insurance.",
    ],
    lastVerified: "2026-03-01",
  },

  // ─── INSURANCE ───────────────────────────────────────────────
  {
    id: "life-insurance-claim",
    category: "insurance",
    title: "Life Insurance Claim",
    shortDescription:
      "File a life insurance claim as a beneficiary of a deceased policyholder.",
    openingStatement:
      "Hello, I'm calling to file a death claim on a life insurance policy. The policyholder, [FULL NAME], passed away on [DATE OF DEATH]. I'm [YOUR NAME], a named beneficiary on the policy. The policy number is [POLICY NUMBER].",
    keyPhrases: [
      "I need to file a death claim on a life insurance policy",
      "I'm a named beneficiary on this policy",
      "I need a claim form mailed or emailed to me",
      "What is the timeline for claim processing and payment?",
      "I need to understand the payout options — lump sum vs. installments",
    ],
    informationNeeded: [
      "Policy number",
      "Policyholder's full legal name",
      "Policyholder's date of birth",
      "Date and cause of death",
      "Certified copy of the death certificate",
      "Your full name as it appears on the beneficiary designation",
      "Your Social Security Number (for tax reporting on the payout)",
      "Your mailing address and phone number",
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
    ifTheySayNo: [
      "If they can't find the policy: 'Can you search by the policyholder's Social Security Number or date of birth? The policy may be under a previous name.'",
      "If the policy lapsed: 'Was there a grace period at the time of death? Many policies have a 30-day grace period where coverage continues.'",
      "If they question your beneficiary status: 'I can provide identification and the death certificate. What documentation do you need to verify my claim?'",
      "Say: 'I'd like to understand my appeal options if the claim is denied.'",
    ],
    phoneNumber: null,
    bestCallTimes:
      "Call the insurer's claims department. Most are available 8 AM - 6 PM. Check the policy documents for the specific claims phone number.",
    estimatedDuration: "20-30 minutes",
    notes: [
      "Life insurance proceeds are generally not taxable income for the beneficiary.",
      "If you don't know the insurer, check with the state insurance department or search the NAIC Life Policy Locator.",
      "Claim filing deadlines vary but most insurers require claims within 1-2 years.",
      "If the death occurred within the contestability period (first 2 years of the policy), the insurer may investigate before paying.",
    ],
    lastVerified: "2026-03-01",
  },
  {
    id: "health-insurance-notification",
    category: "insurance",
    title: "Health Insurance Notification",
    shortDescription:
      "Notify the health insurer of a death and understand coverage for surviving dependents.",
    openingStatement:
      "Hello, I'm calling to report the death of a policyholder, [FULL NAME], who passed away on [DATE OF DEATH]. I need to understand the impact on coverage for any remaining dependents and settle any outstanding claims.",
    keyPhrases: [
      "I'm reporting the death of the primary policyholder",
      "I need to understand coverage continuation options for dependents",
      "Are there any outstanding claims or balances?",
      "I need information about COBRA continuation coverage",
      "What are the deadlines for any required actions?",
    ],
    informationNeeded: [
      "Policyholder's full name and member/subscriber ID",
      "Group number (if employer-sponsored)",
      "Date of death",
      "Certified death certificate",
      "List of covered dependents",
      "Any pending medical claims or outstanding bills",
    ],
    whatToAskFor: [
      "Whether dependents can continue coverage and for how long",
      "COBRA eligibility and deadlines (60 days to elect, then 36 months of coverage for death-related qualifying events)",
      "Any outstanding claims that need to be filed or resolved",
      "The deadline for submitting any remaining medical claims",
      "Whether the estate owes any premiums or if a refund is due",
      "A written summary of coverage termination and continuation options",
    ],
    ifTheySayNo: [
      "Say: 'Under COBRA, a qualifying event such as death of the covered employee entitles dependents to 36 months of continuation coverage. Please confirm the deadlines.'",
      "If employer-sponsored: 'Can you direct me to the employer's HR or benefits department for COBRA election forms?'",
      "Ask: 'If COBRA is too expensive, what are my options for marketplace coverage or Medicaid?'",
    ],
    phoneNumber: null,
    bestCallTimes:
      "Call the number on the insurance card. Ask for the member services or bereavement department.",
    estimatedDuration: "20-30 minutes",
    notes: [
      "COBRA allows dependents of a deceased employee to continue group health coverage for up to 36 months.",
      "COBRA election deadline is typically 60 days from the qualifying event notification.",
      "If the deceased was on Medicare, notify Medicare at 1-800-633-4227.",
      "Outstanding medical bills are debts of the estate, not of the surviving family members (except in community property states).",
    ],
    lastVerified: "2026-03-01",
  },
  {
    id: "auto-insurance-notification",
    category: "insurance",
    title: "Auto Insurance Notification",
    shortDescription:
      "Notify the auto insurer and update or cancel the deceased's auto policy.",
    openingStatement:
      "Hello, I'm calling to report the death of a policyholder, [FULL NAME], who passed away on [DATE OF DEATH]. I need to update the auto insurance policy — either transfer it to another driver, update the vehicle ownership, or cancel the policy.",
    keyPhrases: [
      "I'm reporting the death of the auto insurance policyholder",
      "I need to transfer the policy to a surviving spouse/family member",
      "I need to understand coverage on vehicles in the estate",
      "Is there a refund for any unused premium?",
    ],
    informationNeeded: [
      "Policy number",
      "Policyholder's full name",
      "Date of death",
      "Certified death certificate",
      "VIN and description of insured vehicles",
      "Whether vehicles will be kept, sold, or transferred",
      "New driver information (if transferring the policy)",
    ],
    whatToAskFor: [
      "Whether coverage continues during estate settlement",
      "How to transfer the policy to a surviving family member",
      "A pro-rated refund for any unused premium if cancelling",
      "Whether there are any pending claims on the policy",
      "A written confirmation of any policy changes",
    ],
    ifTheySayNo: [
      "Say: 'The vehicle is part of the estate and must remain insured until it's sold or transferred. What are my options for maintaining coverage?'",
      "If they want to cancel immediately: 'I need coverage to remain active while the estate is being settled. Can we transfer the policy to me as executor?'",
    ],
    phoneNumber: null,
    bestCallTimes:
      "Call the number on the insurance card or policy documents.",
    estimatedDuration: "15-20 minutes",
    notes: [
      "Do not let auto insurance lapse on estate vehicles — the estate could be liable for accidents.",
      "If the deceased was the only insured driver, you may need a new policy.",
      "Check if the auto policy has any death benefit or accidental death coverage.",
    ],
    lastVerified: "2026-03-01",
  },
  {
    id: "homeowners-insurance-notification",
    category: "insurance",
    title: "Homeowners Insurance Notification",
    shortDescription:
      "Notify the homeowners insurer and ensure the property remains covered during estate settlement.",
    openingStatement:
      "Hello, I'm calling to report the death of the policyholder, [FULL NAME], on the homeowners insurance policy for [PROPERTY ADDRESS]. They passed away on [DATE OF DEATH]. I'm the [RELATIONSHIP / executor] and I need to ensure the property remains insured during estate settlement.",
    keyPhrases: [
      "I'm reporting the death of the homeowners insurance policyholder",
      "I need to ensure continuous coverage on the property during probate",
      "I need to update the named insured to the estate or successor",
      "Will the current policy remain in force?",
    ],
    informationNeeded: [
      "Policy number",
      "Property address",
      "Policyholder's full name",
      "Date of death",
      "Certified death certificate",
      "Your name and relationship to the deceased",
      "Whether the property is occupied or vacant",
    ],
    whatToAskFor: [
      "Confirmation that coverage will continue during estate settlement",
      "Whether the policy needs to be re-written in the estate's name",
      "The vacant property clause — some policies void coverage if the home is unoccupied for 30-60 days",
      "Whether you need to add yourself as an additional insured or named insured",
      "Any premium adjustments or refunds",
    ],
    ifTheySayNo: [
      "Say: 'The property is part of the estate and must remain insured. What do I need to provide to keep coverage active?'",
      "If they cite a vacancy clause: 'Can we add a vacancy endorsement to the existing policy?'",
      "Ask: 'What are the consequences if the home is left uninsured during probate? I want to ensure the estate is protected.'",
    ],
    phoneNumber: null,
    bestCallTimes: "Call the number on the policy documents.",
    estimatedDuration: "15-20 minutes",
    notes: [
      "Most homeowners policies have a vacancy clause that limits or voids coverage if the home is unoccupied for 30-60 days.",
      "If the home will be vacant, ask about a vacancy endorsement or a separate vacant property policy.",
      "The mortgage servicer will also need to know about any insurance changes.",
      "Keep the property maintained (lawn, mail, winterization) to prevent insurance issues.",
    ],
    lastVerified: "2026-03-01",
  },

  // ─── SUBSCRIPTIONS ──────────────────────────────────────────
  {
    id: "streaming-service-cancellation",
    category: "subscriptions",
    title: "Streaming Service Cancellation",
    shortDescription:
      "Cancel streaming subscriptions (Netflix, Hulu, Disney+, Spotify, etc.) for a deceased person.",
    openingStatement:
      "Hello, I'm calling to cancel the account of a deceased subscriber. The account holder, [FULL NAME], passed away on [DATE OF DEATH]. I'm the [RELATIONSHIP / executor] handling their affairs.",
    keyPhrases: [
      "I need to cancel a deceased person's account",
      "I'm requesting account cancellation due to death of the account holder",
      "I need any remaining balance refunded to the estate",
      "Can you stop any future charges immediately?",
    ],
    informationNeeded: [
      "Account holder's full name",
      "Email address associated with the account",
      "Date of death",
      "Your name and relationship",
      "Death certificate (some services may request it by email or fax)",
    ],
    whatToAskFor: [
      "Immediate cancellation and confirmation",
      "A refund for any unused portion of the current billing period",
      "Cancellation confirmation sent to your email",
      "Confirmation that no further charges will be made",
      "Whether the account can be accessed for a limited time to download content or save data",
    ],
    ifTheySayNo: [
      "Say: 'I can provide a copy of the death certificate. What is the best way to submit it — email, fax, or mail?'",
      "If they require the account holder to call: 'The account holder is deceased and cannot call. I'm requesting cancellation on behalf of the estate. Please escalate this to a supervisor.'",
      "If they won't refund: 'I understand your refund policy, but these charges occurred after the date of death. The estate is requesting a goodwill credit.'",
    ],
    phoneNumber: null,
    bestCallTimes:
      "Many streaming services can be cancelled online. If phone is needed, call during off-peak hours.",
    estimatedDuration: "10-20 minutes",
    notes: [
      "Many streaming services (Netflix, Hulu, Disney+) can be cancelled online if you have the login credentials.",
      "Check the deceased's email for subscription confirmation emails to find all active services.",
      "Check bank/credit card statements for recurring charges you may have missed.",
      "Some services (Spotify, Apple Music) may require a death certificate emailed to a specific address.",
    ],
    lastVerified: "2026-03-01",
  },
  {
    id: "utility-account-transfer",
    category: "subscriptions",
    title: "Utility Account Transfer / Cancellation",
    shortDescription:
      "Transfer or cancel utility accounts (electric, gas, water, internet) for a deceased person.",
    openingStatement:
      "Hello, I'm calling about the utility account for [PROPERTY ADDRESS]. The account holder, [FULL NAME], passed away on [DATE OF DEATH]. I need to [transfer the account to my name / cancel the account / discuss final billing].",
    keyPhrases: [
      "I need to transfer a utility account due to the death of the account holder",
      "I need to close this account and get a final bill sent to the estate",
      "I'm the executor/surviving family member responsible for the property",
      "When can the account be transferred or service discontinued?",
    ],
    informationNeeded: [
      "Account holder's full name",
      "Account number",
      "Service address",
      "Date of death",
      "Whether the property will remain occupied or be vacated",
      "Your name and contact information for the new account or final billing",
    ],
    whatToAskFor: [
      "A final bill for any outstanding balance",
      "Whether a deposit refund is owed to the estate",
      "The timeline for transferring the account to a new name",
      "Whether service will be interrupted during the transfer",
      "A written confirmation of the account change",
    ],
    ifTheySayNo: [
      "Say: 'I'm the executor of the estate and have legal authority to manage the deceased's affairs. What documentation do you need?'",
      "If they require the account holder: 'The account holder is deceased. I'm requesting this change under executor authority.'",
      "Ask: 'Can I handle this at your local office with documentation?'",
    ],
    phoneNumber: null,
    bestCallTimes:
      "Call the utility company's customer service number on the latest bill.",
    estimatedDuration: "15-25 minutes",
    notes: [
      "Do not cancel utilities if someone is still living in the home.",
      "If the property will be vacant during estate settlement, consider keeping minimum service to prevent pipe freezing and maintain the property.",
      "Check for auto-pay on the deceased's bank account or credit card.",
      "Utility deposits may be refundable to the estate.",
    ],
    lastVerified: "2026-03-01",
  },
  {
    id: "gym-membership-cancellation",
    category: "subscriptions",
    title: "Gym / Membership Cancellation",
    shortDescription:
      "Cancel gym memberships and other recurring memberships for a deceased person.",
    openingStatement:
      "Hello, I'm calling to cancel the membership of [FULL NAME], who passed away on [DATE OF DEATH]. I'm the [RELATIONSHIP / executor] and I'm requesting immediate cancellation and a refund for any charges after the date of death.",
    keyPhrases: [
      "I need to cancel a deceased member's membership",
      "I'm requesting cancellation due to death — the member cannot complete a notice period",
      "I need a refund for any charges after the date of death",
      "Please waive any early termination fees given the circumstances",
    ],
    informationNeeded: [
      "Member's full name",
      "Membership or account number",
      "Date of death",
      "Death certificate (some gyms require this)",
      "Your name and relationship",
    ],
    whatToAskFor: [
      "Immediate cancellation effective on the date of death",
      "A refund for any charges after the date of death",
      "Waiver of any early termination or cancellation fees",
      "Written confirmation of cancellation",
      "Confirmation that no further charges will be billed",
    ],
    ifTheySayNo: [
      "Say: 'I can provide a death certificate. Federal and state consumer protection rules do not require a deceased person to serve a cancellation notice period.'",
      "If they insist on an ETF: 'I'm requesting a waiver of the early termination fee due to the death of the member. Please escalate this to a manager.'",
      "If they require in-person cancellation: 'The member is deceased and cannot appear in person. I'm the executor and I'm requesting cancellation by phone or mail.'",
    ],
    phoneNumber: null,
    bestCallTimes: "Call during regular business hours.",
    estimatedDuration: "10-20 minutes",
    notes: [
      "Some gyms (particularly Planet Fitness, LA Fitness) are notoriously difficult about cancellations — be persistent.",
      "If the gym charges after you've requested cancellation, dispute the charges with the credit card company.",
      "Check if the membership was paid through a credit card or bank draft — cancel the payment method as well.",
      "Some gyms have a clause allowing cancellation due to death with proof — ask about this specifically.",
    ],
    lastVerified: "2026-03-01",
  },

  // ─── EMPLOYMENT ──────────────────────────────────────────────
  {
    id: "employer-benefits-inquiry",
    category: "employment",
    title: "Employer Benefits / Final Paycheck",
    shortDescription:
      "Contact the employer to inquire about final pay, benefits, and any death benefits owed.",
    openingStatement:
      "Hello, I'm calling about an employee who recently passed away. [FULL NAME] was employed at [COMPANY NAME] and passed away on [DATE OF DEATH]. I'm the [RELATIONSHIP / executor of their estate] and I need to discuss final compensation, benefits, and any death benefits.",
    keyPhrases: [
      "I'm calling about a deceased employee's final pay and benefits",
      "I need to understand what benefits are owed to the estate or beneficiaries",
      "Is there employer-provided life insurance or an accidental death benefit?",
      "I need the final paycheck and any accrued vacation/PTO payout",
      "Are there any retirement account beneficiary designations on file?",
    ],
    informationNeeded: [
      "Employee's full name and employee ID (if known)",
      "Department and supervisor name (if known)",
      "Date of death",
      "Certified death certificate",
      "Your name, relationship, and contact information",
      "Letters testamentary (if you're the executor)",
    ],
    whatToAskFor: [
      "Final paycheck including any accrued but unpaid wages",
      "Payout for accrued vacation, PTO, or sick time",
      "Employer-provided life insurance (often 1-2x salary at no cost to the employee)",
      "Any supplemental life insurance the employee may have purchased",
      "Accidental death and dismemberment (AD&D) insurance",
      "401(k) or pension beneficiary designation on file",
      "COBRA information for dependents' health coverage continuation",
      "Any outstanding expense reimbursements",
      "Stock options, RSUs, or equity that may be owed",
    ],
    ifTheySayNo: [
      "Say: 'I have a death certificate and letters testamentary. What is the process for the estate to receive the final paycheck?'",
      "If they can't discuss with you: 'I understand privacy concerns. Can you direct me to the HR department or benefits administrator who handles deceased employee affairs?'",
      "Ask: 'Is there a bereavement or estate services contact in HR?'",
    ],
    phoneNumber: null,
    bestCallTimes:
      "Call the company's main number and ask for Human Resources or the benefits department.",
    estimatedDuration: "30-45 minutes",
    notes: [
      "Many employers provide basic life insurance (1-2x salary) at no cost — the employee may not have mentioned it.",
      "State laws require employers to pay final wages within a specific timeframe (varies by state).",
      "If the employee had a 401(k), the beneficiary designation on file with the plan administrator controls who receives the funds — regardless of the will.",
      "Ask about any ESOP, profit-sharing, or deferred compensation plans.",
    ],
    lastVerified: "2026-03-01",
  },
  {
    id: "pension-retirement-notification",
    category: "employment",
    title: "Pension / Retirement Account Notification",
    shortDescription:
      "Notify pension administrators and retirement account custodians of a death.",
    openingStatement:
      "Hello, I'm calling to report the death of a plan participant. [FULL NAME] passed away on [DATE OF DEATH]. Their account number is [ACCOUNT NUMBER]. I'm the [RELATIONSHIP / executor / named beneficiary] and I need to discuss the beneficiary distribution process.",
    keyPhrases: [
      "I'm reporting the death of a plan participant",
      "I need to begin the beneficiary distribution process",
      "I'm a named beneficiary on this account",
      "What are the distribution options and tax implications?",
      "Is there a survivor annuity or pension benefit for a surviving spouse?",
    ],
    informationNeeded: [
      "Participant's full name",
      "Account or participant number",
      "Participant's Social Security Number",
      "Date of death",
      "Certified death certificate",
      "Your name and relationship to the deceased",
      "Your Social Security Number (for tax reporting on distributions)",
    ],
    whatToAskFor: [
      "The beneficiary designation on file",
      "Distribution options (lump sum, inherited IRA rollover, annuity)",
      "Whether there is a surviving spouse pension benefit",
      "Tax implications of each distribution option",
      "Required Minimum Distribution (RMD) rules for inherited accounts",
      "Any death benefits in addition to the account balance",
      "The timeline for processing the distribution",
      "Claim forms and required documentation",
    ],
    ifTheySayNo: [
      "Say: 'I can provide a death certificate, my ID, and letters testamentary. What additional documentation is needed?'",
      "If they question your beneficiary status: 'Please check the beneficiary designation on file. If I'm not the named beneficiary, who should I contact?'",
      "Ask: 'Can I arrange a meeting with a plan administrator to review the options in person?'",
    ],
    phoneNumber: null,
    bestCallTimes:
      "Call the plan administrator or custodian listed on account statements.",
    estimatedDuration: "30-45 minutes",
    notes: [
      "Beneficiary designations on retirement accounts override the will.",
      "Surviving spouses have special rollover options for inherited 401(k)/IRA accounts.",
      "The SECURE Act (2019/2024) changed RMD rules — most non-spouse beneficiaries must distribute the account within 10 years.",
      "If the deceased had a government pension (federal, state, military), contact OPM (1-888-767-6738) or the specific pension office.",
      "If there's no beneficiary on file, the account goes through probate.",
    ],
    lastVerified: "2026-03-01",
  },
];

export function getScriptsByCategory(
  category: ScriptCategory
): PhoneScript[] {
  return SCRIPTS.filter((s) => s.category === category);
}

export function getScriptById(id: string): PhoneScript | undefined {
  return SCRIPTS.find((s) => s.id === id);
}

export function getCategoryBySlug(
  slug: string
): CategoryInfo | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getAllCategories(): ScriptCategory[] {
  return [...new Set(SCRIPTS.map((s) => s.category))];
}
