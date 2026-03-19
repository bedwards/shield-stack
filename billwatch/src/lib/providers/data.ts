/**
 * Provider registry for BillWatch.
 *
 * Static data seeded with the top utilities per deregulated state
 * (TX, OH, PA, IL, NY, NJ, CT, MA) plus the 10 largest regulated
 * utilities nationwide. Will migrate to database-backed after DB
 * schema is in place.
 */

export type ProviderType = "utility" | "retail_provider";

export interface Provider {
  /** Unique identifier */
  id: string;
  /** Display name */
  name: string;
  /** State codes where this provider operates */
  states_served: string[];
  /** Whether this provider operates in a deregulated market */
  is_deregulated_market: boolean;
  /** Provider type: incumbent utility or competitive retail provider */
  provider_type: ProviderType;
  /** Provider website */
  website_url: string;
  /** ISO 8601 date string when this record was last verified */
  last_verified: string;
}

/**
 * Full provider registry.
 *
 * Includes:
 * - Top 5 utilities per major deregulated state (TX, OH, PA, IL, NY, NJ, CT, MA)
 * - 10 largest regulated utilities nationwide
 */
export const PROVIDERS: readonly Provider[] = [
  // ── Texas (deregulated) ─────────────────────────────────────────
  {
    id: "tx-txu-energy",
    name: "TXU Energy",
    states_served: ["TX"],
    is_deregulated_market: true,
    provider_type: "retail_provider",
    website_url: "https://www.txu.com",
    last_verified: "2026-03-19",
  },
  {
    id: "tx-reliant",
    name: "Reliant Energy",
    states_served: ["TX"],
    is_deregulated_market: true,
    provider_type: "retail_provider",
    website_url: "https://www.reliant.com",
    last_verified: "2026-03-19",
  },
  {
    id: "tx-direct-energy",
    name: "Direct Energy",
    states_served: ["TX"],
    is_deregulated_market: true,
    provider_type: "retail_provider",
    website_url: "https://www.directenergy.com",
    last_verified: "2026-03-19",
  },
  {
    id: "tx-green-mountain",
    name: "Green Mountain Energy",
    states_served: ["TX"],
    is_deregulated_market: true,
    provider_type: "retail_provider",
    website_url: "https://www.greenmountainenergy.com",
    last_verified: "2026-03-19",
  },
  {
    id: "tx-gexa-energy",
    name: "Gexa Energy",
    states_served: ["TX"],
    is_deregulated_market: true,
    provider_type: "retail_provider",
    website_url: "https://www.gexaenergy.com",
    last_verified: "2026-03-19",
  },

  // ── Ohio (deregulated) ──────────────────────────────────────────
  {
    id: "oh-firstenergy",
    name: "FirstEnergy (Ohio Edison)",
    states_served: ["OH"],
    is_deregulated_market: true,
    provider_type: "utility",
    website_url: "https://www.firstenergycorp.com",
    last_verified: "2026-03-19",
  },
  {
    id: "oh-aep-ohio",
    name: "AEP Ohio",
    states_served: ["OH"],
    is_deregulated_market: true,
    provider_type: "utility",
    website_url: "https://www.aepohio.com",
    last_verified: "2026-03-19",
  },
  {
    id: "oh-duke-ohio",
    name: "Duke Energy Ohio",
    states_served: ["OH"],
    is_deregulated_market: true,
    provider_type: "utility",
    website_url: "https://www.duke-energy.com",
    last_verified: "2026-03-19",
  },
  {
    id: "oh-dayton-power",
    name: "Dayton Power & Light",
    states_served: ["OH"],
    is_deregulated_market: true,
    provider_type: "utility",
    website_url: "https://www.aes-ohio.com",
    last_verified: "2026-03-19",
  },
  {
    id: "oh-igsenergy",
    name: "IGS Energy",
    states_served: ["OH"],
    is_deregulated_market: true,
    provider_type: "retail_provider",
    website_url: "https://www.igsenergy.com",
    last_verified: "2026-03-19",
  },

  // ── Pennsylvania (deregulated) ──────────────────────────────────
  {
    id: "pa-ppl-electric",
    name: "PPL Electric Utilities",
    states_served: ["PA"],
    is_deregulated_market: true,
    provider_type: "utility",
    website_url: "https://www.pplelectric.com",
    last_verified: "2026-03-19",
  },
  {
    id: "pa-peco",
    name: "PECO Energy",
    states_served: ["PA"],
    is_deregulated_market: true,
    provider_type: "utility",
    website_url: "https://www.peco.com",
    last_verified: "2026-03-19",
  },
  {
    id: "pa-duquesne-light",
    name: "Duquesne Light",
    states_served: ["PA"],
    is_deregulated_market: true,
    provider_type: "utility",
    website_url: "https://www.duquesnelight.com",
    last_verified: "2026-03-19",
  },
  {
    id: "pa-met-ed",
    name: "Met-Ed (FirstEnergy)",
    states_served: ["PA"],
    is_deregulated_market: true,
    provider_type: "utility",
    website_url: "https://www.firstenergycorp.com",
    last_verified: "2026-03-19",
  },
  {
    id: "pa-penelec",
    name: "Penelec (FirstEnergy)",
    states_served: ["PA"],
    is_deregulated_market: true,
    provider_type: "utility",
    website_url: "https://www.firstenergycorp.com",
    last_verified: "2026-03-19",
  },

  // ── Illinois (deregulated) ──────────────────────────────────────
  {
    id: "il-comed",
    name: "ComEd (Commonwealth Edison)",
    states_served: ["IL"],
    is_deregulated_market: true,
    provider_type: "utility",
    website_url: "https://www.comed.com",
    last_verified: "2026-03-19",
  },
  {
    id: "il-ameren",
    name: "Ameren Illinois",
    states_served: ["IL"],
    is_deregulated_market: true,
    provider_type: "utility",
    website_url: "https://www.ameren.com",
    last_verified: "2026-03-19",
  },
  {
    id: "il-midamerican",
    name: "MidAmerican Energy",
    states_served: ["IL"],
    is_deregulated_market: true,
    provider_type: "utility",
    website_url: "https://www.midamericanenergy.com",
    last_verified: "2026-03-19",
  },
  {
    id: "il-constellation",
    name: "Constellation Energy",
    states_served: ["IL", "MD", "NJ", "NY", "PA", "TX", "OH"],
    is_deregulated_market: true,
    provider_type: "retail_provider",
    website_url: "https://www.constellation.com",
    last_verified: "2026-03-19",
  },
  {
    id: "il-verde-energy",
    name: "Verde Energy",
    states_served: ["IL", "CT", "MA", "NJ", "NY", "OH", "PA"],
    is_deregulated_market: true,
    provider_type: "retail_provider",
    website_url: "https://www.verdeenergy.com",
    last_verified: "2026-03-19",
  },

  // ── New York (deregulated) ──────────────────────────────────────
  {
    id: "ny-coned",
    name: "Con Edison",
    states_served: ["NY"],
    is_deregulated_market: true,
    provider_type: "utility",
    website_url: "https://www.coned.com",
    last_verified: "2026-03-19",
  },
  {
    id: "ny-national-grid",
    name: "National Grid",
    states_served: ["NY", "MA", "RI"],
    is_deregulated_market: true,
    provider_type: "utility",
    website_url: "https://www.nationalgrid.com",
    last_verified: "2026-03-19",
  },
  {
    id: "ny-nyseg",
    name: "NYSEG (Avangrid)",
    states_served: ["NY"],
    is_deregulated_market: true,
    provider_type: "utility",
    website_url: "https://www.nyseg.com",
    last_verified: "2026-03-19",
  },
  {
    id: "ny-rge",
    name: "RG&E (Avangrid)",
    states_served: ["NY"],
    is_deregulated_market: true,
    provider_type: "utility",
    website_url: "https://www.rge.com",
    last_verified: "2026-03-19",
  },
  {
    id: "ny-central-hudson",
    name: "Central Hudson",
    states_served: ["NY"],
    is_deregulated_market: true,
    provider_type: "utility",
    website_url: "https://www.centralhudson.com",
    last_verified: "2026-03-19",
  },

  // ── New Jersey (deregulated) ────────────────────────────────────
  {
    id: "nj-pseg",
    name: "PSE&G",
    states_served: ["NJ"],
    is_deregulated_market: true,
    provider_type: "utility",
    website_url: "https://www.pseg.com",
    last_verified: "2026-03-19",
  },
  {
    id: "nj-jcpl",
    name: "JCP&L (FirstEnergy)",
    states_served: ["NJ"],
    is_deregulated_market: true,
    provider_type: "utility",
    website_url: "https://www.firstenergycorp.com",
    last_verified: "2026-03-19",
  },
  {
    id: "nj-atlantic-city",
    name: "Atlantic City Electric",
    states_served: ["NJ"],
    is_deregulated_market: true,
    provider_type: "utility",
    website_url: "https://www.atlanticcityelectric.com",
    last_verified: "2026-03-19",
  },
  {
    id: "nj-rockland-electric",
    name: "Rockland Electric",
    states_served: ["NJ"],
    is_deregulated_market: true,
    provider_type: "utility",
    website_url: "https://www.oru.com",
    last_verified: "2026-03-19",
  },
  {
    id: "nj-direct-energy-nj",
    name: "Direct Energy NJ",
    states_served: ["NJ"],
    is_deregulated_market: true,
    provider_type: "retail_provider",
    website_url: "https://www.directenergy.com",
    last_verified: "2026-03-19",
  },

  // ── Connecticut (deregulated) ───────────────────────────────────
  {
    id: "ct-eversource",
    name: "Eversource Connecticut",
    states_served: ["CT", "MA", "NH"],
    is_deregulated_market: true,
    provider_type: "utility",
    website_url: "https://www.eversource.com",
    last_verified: "2026-03-19",
  },
  {
    id: "ct-ui",
    name: "United Illuminating",
    states_served: ["CT"],
    is_deregulated_market: true,
    provider_type: "utility",
    website_url: "https://www.uinet.com",
    last_verified: "2026-03-19",
  },
  {
    id: "ct-town-square",
    name: "Town Square Energy",
    states_served: ["CT", "MA", "NY", "PA"],
    is_deregulated_market: true,
    provider_type: "retail_provider",
    website_url: "https://www.townsquareenergy.com",
    last_verified: "2026-03-19",
  },
  {
    id: "ct-direct-energy-ct",
    name: "Direct Energy CT",
    states_served: ["CT"],
    is_deregulated_market: true,
    provider_type: "retail_provider",
    website_url: "https://www.directenergy.com",
    last_verified: "2026-03-19",
  },
  {
    id: "ct-constellation-ct",
    name: "Constellation CT",
    states_served: ["CT"],
    is_deregulated_market: true,
    provider_type: "retail_provider",
    website_url: "https://www.constellation.com",
    last_verified: "2026-03-19",
  },

  // ── Massachusetts (deregulated) ─────────────────────────────────
  {
    id: "ma-eversource-ma",
    name: "Eversource Massachusetts",
    states_served: ["MA"],
    is_deregulated_market: true,
    provider_type: "utility",
    website_url: "https://www.eversource.com",
    last_verified: "2026-03-19",
  },
  {
    id: "ma-national-grid-ma",
    name: "National Grid Massachusetts",
    states_served: ["MA"],
    is_deregulated_market: true,
    provider_type: "utility",
    website_url: "https://www.nationalgrid.com",
    last_verified: "2026-03-19",
  },
  {
    id: "ma-unitil",
    name: "Unitil",
    states_served: ["MA", "NH"],
    is_deregulated_market: true,
    provider_type: "utility",
    website_url: "https://www.unitil.com",
    last_verified: "2026-03-19",
  },
  {
    id: "ma-direct-energy-ma",
    name: "Direct Energy MA",
    states_served: ["MA"],
    is_deregulated_market: true,
    provider_type: "retail_provider",
    website_url: "https://www.directenergy.com",
    last_verified: "2026-03-19",
  },
  {
    id: "ma-constellation-ma",
    name: "Constellation MA",
    states_served: ["MA"],
    is_deregulated_market: true,
    provider_type: "retail_provider",
    website_url: "https://www.constellation.com",
    last_verified: "2026-03-19",
  },

  // ── 10 Largest Regulated Utilities (nationwide) ─────────────────
  {
    id: "reg-florida-power",
    name: "Florida Power & Light",
    states_served: ["FL"],
    is_deregulated_market: false,
    provider_type: "utility",
    website_url: "https://www.fpl.com",
    last_verified: "2026-03-19",
  },
  {
    id: "reg-southern-co",
    name: "Southern Company (Georgia Power)",
    states_served: ["GA", "AL", "MS"],
    is_deregulated_market: false,
    provider_type: "utility",
    website_url: "https://www.southerncompany.com",
    last_verified: "2026-03-19",
  },
  {
    id: "reg-duke-energy",
    name: "Duke Energy",
    states_served: ["NC", "SC", "FL", "IN", "KY"],
    is_deregulated_market: false,
    provider_type: "utility",
    website_url: "https://www.duke-energy.com",
    last_verified: "2026-03-19",
  },
  {
    id: "reg-dominion",
    name: "Dominion Energy",
    states_served: ["VA", "NC", "SC"],
    is_deregulated_market: false,
    provider_type: "utility",
    website_url: "https://www.dominionenergy.com",
    last_verified: "2026-03-19",
  },
  {
    id: "reg-entergy",
    name: "Entergy",
    states_served: ["LA", "AR", "MS", "TX"],
    is_deregulated_market: false,
    provider_type: "utility",
    website_url: "https://www.entergy.com",
    last_verified: "2026-03-19",
  },
  {
    id: "reg-xcel-energy",
    name: "Xcel Energy",
    states_served: ["MN", "CO", "WI", "ND", "SD", "MI", "TX", "NM"],
    is_deregulated_market: false,
    provider_type: "utility",
    website_url: "https://www.xcelenergy.com",
    last_verified: "2026-03-19",
  },
  {
    id: "reg-dte-energy",
    name: "DTE Energy",
    states_served: ["MI"],
    is_deregulated_market: false,
    provider_type: "utility",
    website_url: "https://www.dteenergy.com",
    last_verified: "2026-03-19",
  },
  {
    id: "reg-aps",
    name: "Arizona Public Service (APS)",
    states_served: ["AZ"],
    is_deregulated_market: false,
    provider_type: "utility",
    website_url: "https://www.aps.com",
    last_verified: "2026-03-19",
  },
  {
    id: "reg-consumers-energy",
    name: "Consumers Energy",
    states_served: ["MI"],
    is_deregulated_market: false,
    provider_type: "utility",
    website_url: "https://www.consumersenergy.com",
    last_verified: "2026-03-19",
  },
  {
    id: "reg-pacificorp",
    name: "PacifiCorp (Rocky Mountain Power)",
    states_served: ["UT", "WY", "ID", "OR", "WA", "CA"],
    is_deregulated_market: false,
    provider_type: "utility",
    website_url: "https://www.pacificorp.com",
    last_verified: "2026-03-19",
  },
] as const;

/** Map of id → provider for O(1) lookup */
const PROVIDER_MAP = new Map<string, Provider>(
  PROVIDERS.map((p) => [p.id, p]),
);

/**
 * Look up a provider by id.
 */
export function getProvider(id: string): Provider | undefined {
  return PROVIDER_MAP.get(id);
}

/**
 * Get all providers that serve a specific state.
 */
export function getProvidersForState(stateCode: string): Provider[] {
  const upper = stateCode.toUpperCase();
  return PROVIDERS.filter((p) => p.states_served.includes(upper));
}

/**
 * Get providers by type.
 */
export function getProvidersByType(type: ProviderType): Provider[] {
  return PROVIDERS.filter((p) => p.provider_type === type);
}

/**
 * Get only deregulated-market providers.
 */
export function getDeregulatedProviders(): Provider[] {
  return PROVIDERS.filter((p) => p.is_deregulated_market);
}
