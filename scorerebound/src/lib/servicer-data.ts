export interface ServicerInfo {
  name: string;
  shortName: string;
  phone: string;
  website: string;
  hours: string;
  specialNotes: string[];
  rehabilitationContact?: string;
  consolidationUrl: string;
}

export const SERVICERS: Record<string, ServicerInfo> = {
  mohela: {
    name: "MOHELA (Missouri Higher Education Loan Authority)",
    shortName: "MOHELA",
    phone: "1-888-866-4352",
    website: "https://www.mohela.com",
    hours: "Monday-Friday, 7am-9pm CT",
    specialNotes: [
      "Largest federal loan servicer as of 2024",
      "Handles most PSLF accounts",
      "Can process IBR applications by phone",
    ],
    rehabilitationContact: "1-888-866-4352 (select rehabilitation option)",
    consolidationUrl: "https://studentaid.gov/app/launchConsolidation.action",
  },
  nelnet: {
    name: "Nelnet",
    shortName: "Nelnet",
    phone: "1-888-486-4722",
    website: "https://www.nelnet.com",
    hours: "Monday-Friday, 7am-10pm CT; Saturday, 8am-4pm CT",
    specialNotes: [
      "Strong online portal for managing repayment plans",
      "Offers auto-debit discount (0.25% rate reduction)",
      "Income-driven repayment applications available online",
    ],
    consolidationUrl: "https://studentaid.gov/app/launchConsolidation.action",
  },
  aidvantage: {
    name: "Aidvantage (formerly Navient federal loans)",
    shortName: "Aidvantage",
    phone: "1-800-722-1300",
    website: "https://www.aidvantage.com",
    hours: "Monday-Friday, 8am-9pm ET",
    specialNotes: [
      "Took over Navient's federal loan portfolio in 2021",
      "If you had Navient federal loans, they are now here",
      "Supports online IDR plan applications",
    ],
    consolidationUrl: "https://studentaid.gov/app/launchConsolidation.action",
  },
  edfinancial: {
    name: "EdFinancial Services",
    shortName: "EdFinancial",
    phone: "1-855-337-6884",
    website: "https://www.edfinancial.com",
    hours: "Monday-Friday, 7:30am-9pm ET",
    specialNotes: [
      "Servicer for a smaller portfolio of federal loans",
      "Online portal supports repayment plan changes",
      "Phone wait times are typically shorter than larger servicers",
    ],
    consolidationUrl: "https://studentaid.gov/app/launchConsolidation.action",
  },
  ecsi: {
    name: "ECSI/Heartland",
    shortName: "ECSI",
    phone: "1-888-549-3274",
    website: "https://www.heartland.ecsi.net",
    hours: "Monday-Friday, 7:30am-8pm ET",
    specialNotes: [
      "Services Perkins loans and institutional loans",
      "Perkins loans have different rehabilitation rules",
      "Contact your school's financial aid office for Perkins loan issues",
    ],
    consolidationUrl: "https://studentaid.gov/app/launchConsolidation.action",
  },
  default_resolution: {
    name: "Default Resolution Group (Dept. of Education)",
    shortName: "Default Resolution Group",
    phone: "1-800-621-3115",
    website: "https://myeddebt.ed.gov",
    hours: "Monday-Friday, 8am-8pm ET",
    specialNotes: [
      "Handles loans that have gone to default",
      "Contact here if your loan has been transferred to collections",
      "Can set up rehabilitation agreements",
      "Can arrange affordable payment plans based on income",
    ],
    rehabilitationContact: "1-800-621-3115",
    consolidationUrl: "https://studentaid.gov/app/launchConsolidation.action",
  },
  other: {
    name: "Other / Not Sure",
    shortName: "Other",
    phone: "1-800-433-3243",
    website: "https://studentaid.gov",
    hours: "Monday-Friday, 8am-11pm ET",
    specialNotes: [
      "Call Federal Student Aid to find your servicer",
      "Log into studentaid.gov to see your loan details",
      "Your servicer is listed in your studentaid.gov dashboard",
    ],
    consolidationUrl: "https://studentaid.gov/app/launchConsolidation.action",
  },
};

/**
 * Get servicer info by key or name (case-insensitive, fuzzy match).
 */
export function getServicerInfo(servicerName: string): ServicerInfo {
  const normalized = servicerName.toLowerCase().trim();

  // Direct key match
  const directMatch = SERVICERS[normalized];
  if (directMatch) {
    return directMatch;
  }

  // Fuzzy match by short name or full name
  for (const info of Object.values(SERVICERS)) {
    if (
      info.shortName.toLowerCase() === normalized ||
      info.name.toLowerCase().includes(normalized)
    ) {
      return info;
    }
  }

  // Fallback to "other"
  return SERVICERS["other"]!;
}

/**
 * Get all servicer names for the quiz dropdown.
 */
export function getServicerOptions(): Array<{
  value: string;
  label: string;
}> {
  return [
    { value: "mohela", label: "MOHELA" },
    { value: "nelnet", label: "Nelnet" },
    { value: "aidvantage", label: "Aidvantage" },
    { value: "edfinancial", label: "EdFinancial" },
    { value: "ecsi", label: "ECSI / Heartland (Perkins loans)" },
    { value: "default_resolution", label: "Default Resolution Group" },
    { value: "other", label: "Other / Not sure" },
  ];
}
