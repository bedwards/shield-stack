import { HeroSection } from "@/components/HeroSection";
import { StatsSection } from "@/components/StatsSection";
import { TrendingCompanies } from "@/components/TrendingCompanies";
import { RecentReports } from "@/components/RecentReports";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { CtaSection } from "@/components/CtaSection";
import { getTrendingCompanies, getRecentReports } from "@/lib/companies";

/** Revalidate landing page data every hour */
export const revalidate = 3600;

export default async function Home() {
  const [trendingRaw, reportsRaw] = await Promise.all([
    getTrendingCompanies(6),
    getRecentReports(5),
  ]);

  const trending = trendingRaw.map((c) => ({
    slug: c.slug,
    name: c.name,
    ghostingRate: c.stats?.ghosting_rate ?? null,
    totalReports: c.stats?.total_reports ?? 0,
  }));

  const reports = reportsRaw.map((r) => ({
    id: r.id,
    status: r.status,
    role_level: r.role_level,
    created_at: r.created_at,
    company: r.company ? { name: r.company.name, slug: r.company.slug } : null,
  }));

  return (
    <div data-testid="landing-page">
      <HeroSection />
      <StatsSection />
      <TrendingCompanies companies={trending} />
      <RecentReports reports={reports} />
      <HowItWorksSection />
      <CtaSection />
    </div>
  );
}
