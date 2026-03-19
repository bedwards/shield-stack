/**
 * State-level electricity data for BillWatch programmatic SEO pages.
 *
 * Data source: U.S. Energy Information Administration (EIA),
 * Electric Power Monthly, March 2026.
 *
 * National averages (2026):
 *   Average monthly bill: $163
 *   Average rate: 18.05 cents/kWh
 */

export interface StateData {
  /** Full state name */
  name: string;
  /** Two-letter state abbreviation */
  code: string;
  /** URL-friendly slug (lowercase, hyphenated) */
  slug: string;
  /** Average monthly residential electric bill ($) */
  avgMonthlyBill: number;
  /** Average residential rate (cents per kWh) */
  avgRate: number;
  /** Year-over-year rate trend (% change, positive = increase) */
  rateTrend: number;
  /** Whether this state has a fully deregulated electricity market */
  isDeregulated: boolean;
  /** Top 3 electric utilities serving this state */
  topUtilities: [string, string, string];
}

export const NATIONAL_AVG_BILL = 163;
export const NATIONAL_AVG_RATE = 18.05;

export const STATES: readonly StateData[] = [
  {
    name: "Alabama",
    code: "AL",
    slug: "alabama",
    avgMonthlyBill: 150,
    avgRate: 14.21,
    rateTrend: 5.8,
    isDeregulated: false,
    topUtilities: [
      "Alabama Power",
      "Tennessee Valley Authority",
      "Huntsville Utilities",
    ],
  },
  {
    name: "Alaska",
    code: "AK",
    slug: "alaska",
    avgMonthlyBill: 179,
    avgRate: 28.21,
    rateTrend: 4.2,
    isDeregulated: false,
    topUtilities: [
      "Alaska Electric Light & Power",
      "Matanuska Electric Association",
      "Chugach Electric Association",
    ],
  },
  {
    name: "Arizona",
    code: "AZ",
    slug: "arizona",
    avgMonthlyBill: 148,
    avgRate: 14.87,
    rateTrend: 7.1,
    isDeregulated: false,
    topUtilities: [
      "Arizona Public Service",
      "Salt River Project",
      "Tucson Electric Power",
    ],
  },
  {
    name: "Arkansas",
    code: "AR",
    slug: "arkansas",
    avgMonthlyBill: 125,
    avgRate: 12.18,
    rateTrend: 4.9,
    isDeregulated: false,
    topUtilities: [
      "Entergy Arkansas",
      "Arkansas Electric Cooperative",
      "Empire District Electric",
    ],
  },
  {
    name: "California",
    code: "CA",
    slug: "california",
    avgMonthlyBill: 165,
    avgRate: 28.4,
    rateTrend: 8.3,
    isDeregulated: false,
    topUtilities: [
      "Pacific Gas & Electric",
      "Southern California Edison",
      "San Diego Gas & Electric",
    ],
  },
  {
    name: "Colorado",
    code: "CO",
    slug: "colorado",
    avgMonthlyBill: 119,
    avgRate: 14.1,
    rateTrend: 6.2,
    isDeregulated: false,
    topUtilities: [
      "Xcel Energy",
      "Black Hills Energy",
      "Colorado Springs Utilities",
    ],
  },
  {
    name: "Connecticut",
    code: "CT",
    slug: "connecticut",
    avgMonthlyBill: 198,
    avgRate: 30.47,
    rateTrend: 9.1,
    isDeregulated: true,
    topUtilities: ["Eversource", "United Illuminating", "Direct Energy"],
  },
  {
    name: "Delaware",
    code: "DE",
    slug: "delaware",
    avgMonthlyBill: 142,
    avgRate: 16.83,
    rateTrend: 5.5,
    isDeregulated: true,
    topUtilities: [
      "Delmarva Power",
      "Delaware Electric Cooperative",
      "Direct Energy",
    ],
  },
  {
    name: "District of Columbia",
    code: "DC",
    slug: "district-of-columbia",
    avgMonthlyBill: 141,
    avgRate: 16.55,
    rateTrend: 6.3,
    isDeregulated: false,
    topUtilities: ["Pepco", "Washington Gas Light", "Constellation Energy"],
  },
  {
    name: "Florida",
    code: "FL",
    slug: "florida",
    avgMonthlyBill: 155,
    avgRate: 15.78,
    rateTrend: 6.7,
    isDeregulated: false,
    topUtilities: [
      "Florida Power & Light",
      "Duke Energy Florida",
      "Tampa Electric",
    ],
  },
  {
    name: "Georgia",
    code: "GA",
    slug: "georgia",
    avgMonthlyBill: 147,
    avgRate: 14.39,
    rateTrend: 5.3,
    isDeregulated: false,
    topUtilities: [
      "Georgia Power",
      "Georgia EMC",
      "Municipal Electric Authority of Georgia",
    ],
  },
  {
    name: "Hawaii",
    code: "HI",
    slug: "hawaii",
    avgMonthlyBill: 203,
    avgRate: 43.18,
    rateTrend: 3.8,
    isDeregulated: false,
    topUtilities: [
      "Hawaiian Electric",
      "Kauai Island Utility Cooperative",
      "Hawaii Electric Light",
    ],
  },
  {
    name: "Idaho",
    code: "ID",
    slug: "idaho",
    avgMonthlyBill: 105,
    avgRate: 10.88,
    rateTrend: 4.1,
    isDeregulated: false,
    topUtilities: ["Idaho Power", "Avista", "Rocky Mountain Power"],
  },
  {
    name: "Illinois",
    code: "IL",
    slug: "illinois",
    avgMonthlyBill: 137,
    avgRate: 16.52,
    rateTrend: 6.9,
    isDeregulated: true,
    topUtilities: ["ComEd", "Ameren Illinois", "MidAmerican Energy"],
  },
  {
    name: "Indiana",
    code: "IN",
    slug: "indiana",
    avgMonthlyBill: 139,
    avgRate: 14.75,
    rateTrend: 5.6,
    isDeregulated: false,
    topUtilities: [
      "Indiana Michigan Power",
      "Duke Energy Indiana",
      "Indianapolis Power & Light",
    ],
  },
  {
    name: "Iowa",
    code: "IA",
    slug: "iowa",
    avgMonthlyBill: 127,
    avgRate: 13.42,
    rateTrend: 4.4,
    isDeregulated: false,
    topUtilities: [
      "MidAmerican Energy",
      "Alliant Energy",
      "Iowa Lakes Electric Cooperative",
    ],
  },
  {
    name: "Kansas",
    code: "KS",
    slug: "kansas",
    avgMonthlyBill: 133,
    avgRate: 14.57,
    rateTrend: 5.1,
    isDeregulated: false,
    topUtilities: [
      "Evergy",
      "Kansas Gas & Electric",
      "Empire District Electric",
    ],
  },
  {
    name: "Kentucky",
    code: "KY",
    slug: "kentucky",
    avgMonthlyBill: 131,
    avgRate: 12.84,
    rateTrend: 4.7,
    isDeregulated: false,
    topUtilities: [
      "Kentucky Utilities",
      "Louisville Gas & Electric",
      "Duke Energy Kentucky",
    ],
  },
  {
    name: "Louisiana",
    code: "LA",
    slug: "louisiana",
    avgMonthlyBill: 136,
    avgRate: 12.67,
    rateTrend: 5.9,
    isDeregulated: false,
    topUtilities: ["Entergy Louisiana", "CLECO", "SWEPCO"],
  },
  {
    name: "Maine",
    code: "ME",
    slug: "maine",
    avgMonthlyBill: 155,
    avgRate: 24.91,
    rateTrend: 7.8,
    isDeregulated: true,
    topUtilities: ["Central Maine Power", "Versant Power", "Fox Islands Electric"],
  },
  {
    name: "Maryland",
    code: "MD",
    slug: "maryland",
    avgMonthlyBill: 149,
    avgRate: 17.82,
    rateTrend: 6.4,
    isDeregulated: true,
    topUtilities: ["BGE", "Pepco", "Delmarva Power"],
  },
  {
    name: "Massachusetts",
    code: "MA",
    slug: "massachusetts",
    avgMonthlyBill: 187,
    avgRate: 28.58,
    rateTrend: 8.7,
    isDeregulated: true,
    topUtilities: ["Eversource", "National Grid", "Unitil"],
  },
  {
    name: "Michigan",
    code: "MI",
    slug: "michigan",
    avgMonthlyBill: 132,
    avgRate: 18.53,
    rateTrend: 5.8,
    isDeregulated: false,
    topUtilities: [
      "DTE Energy",
      "Consumers Energy",
      "Indiana Michigan Power",
    ],
  },
  {
    name: "Minnesota",
    code: "MN",
    slug: "minnesota",
    avgMonthlyBill: 126,
    avgRate: 14.31,
    rateTrend: 4.6,
    isDeregulated: false,
    topUtilities: ["Xcel Energy", "Minnesota Power", "Great River Energy"],
  },
  {
    name: "Mississippi",
    code: "MS",
    slug: "mississippi",
    avgMonthlyBill: 140,
    avgRate: 13.29,
    rateTrend: 5.2,
    isDeregulated: false,
    topUtilities: [
      "Mississippi Power",
      "Entergy Mississippi",
      "Cooperative Energy",
    ],
  },
  {
    name: "Missouri",
    code: "MO",
    slug: "missouri",
    avgMonthlyBill: 134,
    avgRate: 13.15,
    rateTrend: 5.0,
    isDeregulated: false,
    topUtilities: ["Ameren Missouri", "Evergy Missouri", "Empire District Electric"],
  },
  {
    name: "Montana",
    code: "MT",
    slug: "montana",
    avgMonthlyBill: 117,
    avgRate: 12.13,
    rateTrend: 4.3,
    isDeregulated: false,
    topUtilities: [
      "NorthWestern Energy",
      "Flathead Electric Cooperative",
      "Montana-Dakota Utilities",
    ],
  },
  {
    name: "Nebraska",
    code: "NE",
    slug: "nebraska",
    avgMonthlyBill: 113,
    avgRate: 12.35,
    rateTrend: 3.9,
    isDeregulated: false,
    topUtilities: [
      "Nebraska Public Power District",
      "Omaha Public Power District",
      "Lincoln Electric System",
    ],
  },
  {
    name: "Nevada",
    code: "NV",
    slug: "nevada",
    avgMonthlyBill: 112,
    avgRate: 13.48,
    rateTrend: 6.5,
    isDeregulated: false,
    topUtilities: [
      "NV Energy",
      "Valley Electric Association",
      "Mt. Wheeler Power",
    ],
  },
  {
    name: "New Hampshire",
    code: "NH",
    slug: "new-hampshire",
    avgMonthlyBill: 173,
    avgRate: 27.13,
    rateTrend: 8.4,
    isDeregulated: true,
    topUtilities: ["Eversource", "Liberty Utilities", "Unitil"],
  },
  {
    name: "New Jersey",
    code: "NJ",
    slug: "new-jersey",
    avgMonthlyBill: 158,
    avgRate: 19.75,
    rateTrend: 7.2,
    isDeregulated: true,
    topUtilities: [
      "PSE&G",
      "Jersey Central Power & Light",
      "Atlantic City Electric",
    ],
  },
  {
    name: "New Mexico",
    code: "NM",
    slug: "new-mexico",
    avgMonthlyBill: 107,
    avgRate: 13.95,
    rateTrend: 5.4,
    isDeregulated: false,
    topUtilities: [
      "PNM",
      "El Paso Electric",
      "Southwestern Public Service",
    ],
  },
  {
    name: "New York",
    code: "NY",
    slug: "new-york",
    avgMonthlyBill: 162,
    avgRate: 23.49,
    rateTrend: 7.5,
    isDeregulated: true,
    topUtilities: ["Con Edison", "National Grid", "NYSEG"],
  },
  {
    name: "North Carolina",
    code: "NC",
    slug: "north-carolina",
    avgMonthlyBill: 138,
    avgRate: 13.47,
    rateTrend: 5.1,
    isDeregulated: false,
    topUtilities: [
      "Duke Energy Carolinas",
      "Duke Energy Progress",
      "Dominion Energy North Carolina",
    ],
  },
  {
    name: "North Dakota",
    code: "ND",
    slug: "north-dakota",
    avgMonthlyBill: 121,
    avgRate: 12.52,
    rateTrend: 3.7,
    isDeregulated: false,
    topUtilities: [
      "Montana-Dakota Utilities",
      "Xcel Energy",
      "Basin Electric Power Cooperative",
    ],
  },
  {
    name: "Ohio",
    code: "OH",
    slug: "ohio",
    avgMonthlyBill: 143,
    avgRate: 15.26,
    rateTrend: 6.1,
    isDeregulated: true,
    topUtilities: ["Ohio Edison", "AEP Ohio", "Duke Energy Ohio"],
  },
  {
    name: "Oklahoma",
    code: "OK",
    slug: "oklahoma",
    avgMonthlyBill: 128,
    avgRate: 12.49,
    rateTrend: 5.3,
    isDeregulated: false,
    topUtilities: [
      "Oklahoma Gas & Electric",
      "Public Service Company of Oklahoma",
      "Oklahoma Electric Cooperative",
    ],
  },
  {
    name: "Oregon",
    code: "OR",
    slug: "oregon",
    avgMonthlyBill: 115,
    avgRate: 12.76,
    rateTrend: 4.5,
    isDeregulated: false,
    topUtilities: [
      "Portland General Electric",
      "PacifiCorp",
      "Eugene Water & Electric Board",
    ],
  },
  {
    name: "Pennsylvania",
    code: "PA",
    slug: "pennsylvania",
    avgMonthlyBill: 152,
    avgRate: 18.29,
    rateTrend: 6.8,
    isDeregulated: true,
    topUtilities: ["PECO", "PPL Electric", "Duquesne Light"],
  },
  {
    name: "Rhode Island",
    code: "RI",
    slug: "rhode-island",
    avgMonthlyBill: 168,
    avgRate: 27.02,
    rateTrend: 8.9,
    isDeregulated: true,
    topUtilities: [
      "Rhode Island Energy",
      "Block Island Utility District",
      "Pascoag Utility District",
    ],
  },
  {
    name: "South Carolina",
    code: "SC",
    slug: "south-carolina",
    avgMonthlyBill: 145,
    avgRate: 14.71,
    rateTrend: 5.0,
    isDeregulated: false,
    topUtilities: [
      "Duke Energy Carolinas",
      "Dominion Energy South Carolina",
      "Santee Cooper",
    ],
  },
  {
    name: "South Dakota",
    code: "SD",
    slug: "south-dakota",
    avgMonthlyBill: 124,
    avgRate: 13.09,
    rateTrend: 3.8,
    isDeregulated: false,
    topUtilities: [
      "Black Hills Energy",
      "Xcel Energy",
      "East River Electric",
    ],
  },
  {
    name: "Tennessee",
    code: "TN",
    slug: "tennessee",
    avgMonthlyBill: 136,
    avgRate: 12.42,
    rateTrend: 4.8,
    isDeregulated: false,
    topUtilities: [
      "Tennessee Valley Authority",
      "Nashville Electric Service",
      "Memphis Light Gas and Water",
    ],
  },
  {
    name: "Texas",
    code: "TX",
    slug: "texas",
    avgMonthlyBill: 157,
    avgRate: 14.63,
    rateTrend: 8.2,
    isDeregulated: true,
    topUtilities: ["Oncor", "TXU Energy", "Reliant Energy"],
  },
  {
    name: "Utah",
    code: "UT",
    slug: "utah",
    avgMonthlyBill: 99,
    avgRate: 11.45,
    rateTrend: 4.0,
    isDeregulated: false,
    topUtilities: [
      "Rocky Mountain Power",
      "Murray City Power",
      "Provo City Power",
    ],
  },
  {
    name: "Vermont",
    code: "VT",
    slug: "vermont",
    avgMonthlyBill: 129,
    avgRate: 21.87,
    rateTrend: 4.5,
    isDeregulated: false,
    topUtilities: [
      "Green Mountain Power",
      "Vermont Electric Cooperative",
      "Burlington Electric Department",
    ],
  },
  {
    name: "Virginia",
    code: "VA",
    slug: "virginia",
    avgMonthlyBill: 144,
    avgRate: 14.18,
    rateTrend: 5.7,
    isDeregulated: false,
    topUtilities: [
      "Dominion Energy",
      "Appalachian Power",
      "Rappahannock Electric Cooperative",
    ],
  },
  {
    name: "Washington",
    code: "WA",
    slug: "washington",
    avgMonthlyBill: 108,
    avgRate: 11.19,
    rateTrend: 4.2,
    isDeregulated: false,
    topUtilities: [
      "Puget Sound Energy",
      "Seattle City Light",
      "Avista",
    ],
  },
  {
    name: "West Virginia",
    code: "WV",
    slug: "west-virginia",
    avgMonthlyBill: 135,
    avgRate: 13.14,
    rateTrend: 4.6,
    isDeregulated: false,
    topUtilities: ["Appalachian Power", "Mon Power", "Wheeling Power"],
  },
  {
    name: "Wisconsin",
    code: "WI",
    slug: "wisconsin",
    avgMonthlyBill: 120,
    avgRate: 16.47,
    rateTrend: 4.8,
    isDeregulated: false,
    topUtilities: [
      "We Energies",
      "Wisconsin Public Service",
      "Alliant Energy",
    ],
  },
  {
    name: "Wyoming",
    code: "WY",
    slug: "wyoming",
    avgMonthlyBill: 118,
    avgRate: 11.92,
    rateTrend: 3.6,
    isDeregulated: false,
    topUtilities: [
      "Rocky Mountain Power",
      "Black Hills Energy",
      "Cheyenne Light Fuel & Power",
    ],
  },
] as const;

/** Map from slug to state data for O(1) lookup */
export const STATE_BY_SLUG = new Map<string, StateData>(
  STATES.map((s) => [s.slug, s]),
);

/** Map from state code to state data for O(1) lookup */
export const STATE_BY_CODE = new Map<string, StateData>(
  STATES.map((s) => [s.code, s]),
);

/** Get all state slugs for generateStaticParams */
export function getAllStateSlugs(): string[] {
  return STATES.map((s) => s.slug);
}

/** Format a bill comparison vs national average */
export function getBillComparison(bill: number): {
  direction: "above" | "below" | "at";
  diff: number;
  percent: number;
} {
  const diff = bill - NATIONAL_AVG_BILL;
  const percent = Math.round(Math.abs((diff / NATIONAL_AVG_BILL) * 100));
  if (diff > 2) return { direction: "above", diff: Math.abs(diff), percent };
  if (diff < -2) return { direction: "below", diff: Math.abs(diff), percent };
  return { direction: "at", diff: 0, percent: 0 };
}
