/**
 * Affiliate partner registry for BillWatch.
 *
 * All affiliate links MUST go through /api/affiliate/click — never embed
 * raw affiliate URLs in components or templates.
 *
 * Categories:
 *   - energy_switching: Deregulated market enrollment
 *   - solar: Solar panel quotes & community solar
 *   - efficiency: Energy efficiency products
 */

export type AffiliateCategory = "energy_switching" | "solar" | "efficiency";

export interface AffiliatePartner {
  /** Unique slug used in /api/affiliate/click?slug=... */
  slug: string;
  /** Display name */
  name: string;
  /** Partner category */
  category: AffiliateCategory;
  /** Base redirect URL (placeholder until affiliate accounts are approved) */
  baseUrl: string;
  /** State codes where this partner operates, or "nationwide" */
  states: string[] | "nationwide";
  /** Short description shown to users */
  description: string;
}

/**
 * All registered affiliate partners.
 * Update this registry when new affiliate accounts are approved.
 */
export const AFFILIATE_PARTNERS: readonly AffiliatePartner[] = [
  {
    slug: "chooseenergy",
    name: "Choose Energy",
    category: "energy_switching",
    baseUrl: "https://placeholder.example.com/chooseenergy",
    states: ["TX", "CT", "PA", "MA", "NJ", "NY", "IL"],
    description:
      "Compare and switch energy providers in deregulated markets. Find lower rates in minutes.",
  },
  {
    slug: "electricityrates",
    name: "ElectricityRates.com",
    category: "energy_switching",
    baseUrl: "https://placeholder.example.com/electricityrates",
    states: [
      "TX", "CT", "PA", "MA", "NJ", "NY", "IL", "OH", "MD", "DE",
      "ME", "NH", "RI", "DC", "GA", "VA",
    ],
    description:
      "Shop electricity rates from top providers. Lock in a lower rate today.",
  },
  {
    slug: "electricchoice",
    name: "Electric Choice",
    category: "energy_switching",
    baseUrl: "https://placeholder.example.com/electricchoice",
    states: [
      "TX", "CT", "PA", "MA", "NJ", "NY", "IL", "OH", "MD", "DE",
      "ME", "NH", "RI", "DC", "GA", "VA",
    ],
    description:
      "Explore energy plans side by side. Switch providers with zero interruption.",
  },
  {
    slug: "energysage",
    name: "EnergySage",
    category: "solar",
    baseUrl: "https://placeholder.example.com/energysage",
    states: "nationwide",
    description:
      "Get free solar quotes from pre-vetted installers. Average savings of 20% vs going direct.",
  },
  {
    slug: "sunpower",
    name: "SunPower",
    category: "solar",
    baseUrl: "https://placeholder.example.com/sunpower",
    states: "nationwide",
    description:
      "Premium solar panels with industry-leading efficiency and 25-year warranty.",
  },
  {
    slug: "arcadia",
    name: "Arcadia",
    category: "solar",
    baseUrl: "https://placeholder.example.com/arcadia",
    states: "nationwide",
    description:
      "Community solar — save on your electric bill without rooftop panels.",
  },
  {
    slug: "homedepot",
    name: "Home Depot Energy Products",
    category: "efficiency",
    baseUrl: "https://placeholder.example.com/homedepot",
    states: "nationwide",
    description:
      "Smart thermostats, insulation, energy-efficient appliances and more.",
  },
] as const;

/** Map of slug → partner for O(1) lookup */
const PARTNER_MAP = new Map<string, AffiliatePartner>(
  AFFILIATE_PARTNERS.map((p) => [p.slug, p]),
);

/** All registered partner slugs */
export const PARTNER_SLUGS = AFFILIATE_PARTNERS.map((p) => p.slug);

/**
 * Look up a partner by slug. Returns undefined if not found.
 */
export function getPartner(slug: string): AffiliatePartner | undefined {
  return PARTNER_MAP.get(slug);
}

/**
 * Get the redirect URL for a partner slug.
 * Returns undefined if the slug is not registered.
 */
export function getPartnerUrl(slug: string): string | undefined {
  return PARTNER_MAP.get(slug)?.baseUrl;
}

/**
 * Get partners available in a specific state.
 */
export function getPartnersForState(stateCode: string): AffiliatePartner[] {
  const upper = stateCode.toUpperCase();
  return AFFILIATE_PARTNERS.filter(
    (p) => p.states === "nationwide" || p.states.includes(upper),
  );
}

/**
 * Get partners by category.
 */
export function getPartnersByCategory(
  category: AffiliateCategory,
): AffiliatePartner[] {
  return AFFILIATE_PARTNERS.filter((p) => p.category === category);
}
