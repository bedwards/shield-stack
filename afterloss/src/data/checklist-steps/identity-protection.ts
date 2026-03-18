/**
 * Identity protection checklist steps for AfterLoss.
 *
 * These steps are consumed by the checklist engine (issue #254) when built.
 * Each step follows the ChecklistStep interface defined below.
 *
 * Category "first_week" — identity protection should happen within the first
 * week after death to minimize the risk window for criminals.
 */

/** A single step in the identity protection checklist. */
export interface ChecklistStep {
  /** Unique identifier for this step */
  id: string;
  /** Short action title displayed in the checklist */
  title: string;
  /** Detailed description of what to do and why */
  description: string;
  /** Timeline category for when this step should be completed */
  category: "immediate" | "first_week" | "first_month" | "first_quarter" | "first_year";
  /** Estimated time to complete this step (e.g., "15 minutes", "1 hour") */
  estimatedTime: string;
  /** Documents or information needed to complete this step */
  requiredDocuments: string[];
}

/** Identity protection checklist steps, ordered by priority. */
export const identityProtectionSteps: ChecklistStep[] = [
  {
    id: "id-protect-001",
    title: "Report the death to Social Security",
    description:
      "Call Social Security at 800-772-1213 (TTY: 1-800-325-0778) or visit your local office to report the death. This cannot be done online. The funeral home may have submitted an Electronic Death Registration — call SSA to confirm. An unflagged SSN is the primary tool criminals use for identity theft of the deceased.",
    category: "first_week",
    estimatedTime: "30 minutes",
    requiredDocuments: [
      "Death certificate (certified copy)",
      "Deceased's Social Security Number",
    ],
  },
  {
    id: "id-protect-002",
    title: "Contact Equifax to place deceased alert",
    description:
      "Call Equifax at 800-685-1111 or mail a request to Equifax Information Services LLC, P.O. Box 105069, Atlanta, GA 30348-5069. Ask them to place a 'deceased — do not issue credit' alert on the file and request a copy of the credit report to check for unauthorized activity.",
    category: "first_week",
    estimatedTime: "20 minutes",
    requiredDocuments: [
      "Death certificate (certified copy)",
      "Deceased's Social Security Number",
      "Deceased's full legal name and last known address",
    ],
  },
  {
    id: "id-protect-003",
    title: "Contact Experian to place deceased alert",
    description:
      "Call Experian at 888-397-3742 or mail a request to Experian, P.O. Box 4500, Allen, TX 75013. Request a deceased alert on the credit file and a copy of the credit report.",
    category: "first_week",
    estimatedTime: "20 minutes",
    requiredDocuments: [
      "Death certificate (certified copy)",
      "Deceased's Social Security Number",
      "Deceased's full legal name and last known address",
    ],
  },
  {
    id: "id-protect-004",
    title: "Contact TransUnion to place deceased alert",
    description:
      "Call TransUnion at 800-916-8800 or mail a request to TransUnion LLC, P.O. Box 2000, Chester, PA 19016. Request a deceased alert on the credit file and a copy of the credit report.",
    category: "first_week",
    estimatedTime: "20 minutes",
    requiredDocuments: [
      "Death certificate (certified copy)",
      "Deceased's Social Security Number",
      "Deceased's full legal name and last known address",
    ],
  },
  {
    id: "id-protect-005",
    title: "Secure all financial accounts",
    description:
      "Contact every bank, credit card company, and investment firm where the deceased held accounts. Request account freezes (do not close joint accounts the surviving spouse needs). Change passwords on digital accounts, revoke authorized user access, and cancel direct deposits. Lock the deceased's email account to prevent password reset exploits.",
    category: "first_week",
    estimatedTime: "2-4 hours",
    requiredDocuments: [
      "Death certificate (certified copies — one per institution)",
      "Letters testamentary or letters of administration (if available)",
      "Account numbers and statements",
      "List of digital accounts and known passwords",
    ],
  },
  {
    id: "id-protect-006",
    title: "File IRS Form 14039 if fraud is suspected",
    description:
      "If you discover unauthorized tax filings, unfamiliar accounts, or other identity fraud, file IRS Form 14039 (Identity Theft Affidavit). Download from irs.gov, complete the form, attach a death certificate copy, and mail to IRS P.O. Box 9039, Andover, MA 01810-0939 (or fax to 855-807-5720). Also file a report at IdentityTheft.gov and your local police department.",
    category: "first_week",
    estimatedTime: "1 hour",
    requiredDocuments: [
      "Death certificate (certified copy)",
      "Deceased's Social Security Number",
      "Evidence of the fraud (statements, letters, etc.)",
      "Your government-issued ID (as the reporting family member)",
    ],
  },
  {
    id: "id-protect-007",
    title: "Consider identity protection service for the deceased",
    description:
      "Even after notifying SSA and credit bureaus, the deceased's information remains vulnerable for months or years. An identity protection service (such as Aura) can continuously monitor for new fraud attempts, alert you if the deceased's information is misused, and provide recovery support if theft occurs.",
    category: "first_week",
    estimatedTime: "15 minutes",
    requiredDocuments: [
      "Deceased's Social Security Number",
      "Deceased's full legal name and date of birth",
    ],
  },
];
