import type { MetadataRoute } from "next";
import { getServicerGuideSlugs } from "@/data/servicers";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://scorerebound.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const servicerGuideSlugs = getServicerGuideSlugs();

  return [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    // Recovery path guides
    {
      url: `${BASE_URL}/guides/ibr-enrollment`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/guides/loan-rehabilitation`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/guides/loan-consolidation`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    // Servicer-specific recovery guide pages
    ...servicerGuideSlugs.map((slug) => ({
      url: `${BASE_URL}/guides/servicer/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    // Servicer contact pages (legacy)
    {
      url: `${BASE_URL}/servicers/mohela`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/servicers/nelnet`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/servicers/aidvantage`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
