import type { MetadataRoute } from "next";
import { PHONE_SCRIPTS } from "@/data/phone-scripts";
import { getAllCountyParams } from "@/lib/county-data/county-slugs";

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://afterloss.pages.dev";

const US_STATES = [
  "alabama", "alaska", "arizona", "arkansas", "california",
  "colorado", "connecticut", "delaware", "florida", "georgia",
  "hawaii", "idaho", "illinois", "indiana", "iowa",
  "kansas", "kentucky", "louisiana", "maine", "maryland",
  "massachusetts", "michigan", "minnesota", "mississippi", "missouri",
  "montana", "nebraska", "nevada", "new-hampshire", "new-jersey",
  "new-mexico", "new-york", "north-carolina", "north-dakota", "ohio",
  "oklahoma", "oregon", "pennsylvania", "rhode-island", "south-carolina",
  "south-dakota", "tennessee", "texas", "utah", "vermont",
  "virginia", "washington", "west-virginia", "wisconsin", "wyoming",
  "district-of-columbia",
] as const;

const STATE_GUIDE_TYPES = ["probate", "small-estate", "death-certificate"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/guide`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/onboard`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/checklist`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/states`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/guides/protect-identity-after-death-2026`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/guides/what-to-do-when-someone-dies-checklist`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/resources/life-insurance-after-loss`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/resources/grief-counseling`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const statePages: MetadataRoute.Sitemap = US_STATES.flatMap((state) =>
    STATE_GUIDE_TYPES.map((guideType) => ({
      url: `${BASE_URL}/states/${state}/${guideType}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  const phoneScriptPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/phone-scripts`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...PHONE_SCRIPTS.map((script) => ({
      url: `${BASE_URL}/phone-scripts/${script.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];

  const countyPages: MetadataRoute.Sitemap = getAllCountyParams().map(
    ({ state, county }) => ({
      url: `${BASE_URL}/probate/${state}/${county}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }),
  );

  return [...staticPages, ...statePages, ...phoneScriptPages, ...countyPages];
}
