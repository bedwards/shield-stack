import { describe, it, expect, beforeEach } from "vitest";
import type {
  Database,
  Company,
  CompanyInsert,
  CompanyUpdate,
  Report,
  ReportInsert,
  UserProfile,
  UserProfileInsert,
  Subscription,
  SubscriptionInsert,
  CompanyClaim,
  CompanyClaimInsert,
  CompanyStats,
} from "./database.types";

/**
 * Type-level tests for the GhostBoard database schema.
 * These tests validate that the TypeScript types are correctly defined
 * and match the SQL migration schema.
 */
describe("Database types", () => {
  describe("Company types", () => {
    let company: Company;

    beforeEach(() => {
      company = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        slug: "acme-corp",
        name: "Acme Corp",
        domain: "acme.com",
        industry: "Technology",
        company_size: "large",
        headquarters: "San Francisco, CA",
        logo_url: null,
        is_claimed: false,
        created_at: "2026-01-01T00:00:00Z",
        updated_at: "2026-01-01T00:00:00Z",
      };
    });

    it("has all required Row fields", () => {
      expect(company.id).toBeDefined();
      expect(company.slug).toBe("acme-corp");
      expect(company.name).toBe("Acme Corp");
      expect(company.is_claimed).toBe(false);
      expect(company.created_at).toBeDefined();
      expect(company.updated_at).toBeDefined();
    });

    it("allows nullable fields to be null", () => {
      company.domain = null;
      company.industry = null;
      company.company_size = null;
      company.headquarters = null;
      company.logo_url = null;
      expect(company.domain).toBeNull();
      expect(company.industry).toBeNull();
      expect(company.company_size).toBeNull();
      expect(company.headquarters).toBeNull();
      expect(company.logo_url).toBeNull();
    });

    it("Insert type requires only slug and name", () => {
      const insert: CompanyInsert = {
        slug: "test-co",
        name: "Test Co",
      };
      expect(insert.slug).toBe("test-co");
      expect(insert.name).toBe("Test Co");
      expect(insert.id).toBeUndefined();
    });

    it("Update type makes all fields optional", () => {
      const update: CompanyUpdate = { name: "Updated Name" };
      expect(update.name).toBe("Updated Name");
      expect(update.slug).toBeUndefined();
    });
  });

  describe("Report types", () => {
    let report: Report;

    beforeEach(() => {
      report = {
        id: "660e8400-e29b-41d4-a716-446655440000",
        user_id: null,
        company_id: "550e8400-e29b-41d4-a716-446655440000",
        status: "ghosted",
        applied_date: "2026-01-15",
        response_date: null,
        response_days: null,
        role_level: "mid",
        application_method: "online",
        is_verified: false,
        is_flagged: false,
        created_at: "2026-01-20T00:00:00Z",
      };
    });

    it("has all required Row fields", () => {
      expect(report.id).toBeDefined();
      expect(report.company_id).toBeDefined();
      expect(report.status).toBe("ghosted");
      expect(report.applied_date).toBe("2026-01-15");
    });

    it("allows anonymous reports (user_id is nullable)", () => {
      expect(report.user_id).toBeNull();
    });

    it("supports all valid statuses", () => {
      const statuses: Report["status"][] = [
        "applied",
        "heard_back",
        "interviewed",
        "offered",
        "rejected",
        "ghosted",
      ];
      for (const s of statuses) {
        report.status = s;
        expect(report.status).toBe(s);
      }
    });

    it("Insert type requires company_id, status, and applied_date", () => {
      const insert: ReportInsert = {
        company_id: "550e8400-e29b-41d4-a716-446655440000",
        status: "applied",
        applied_date: "2026-03-01",
      };
      expect(insert.company_id).toBeDefined();
      expect(insert.status).toBe("applied");
      expect(insert.applied_date).toBe("2026-03-01");
      expect(insert.user_id).toBeUndefined();
    });
  });

  describe("UserProfile types", () => {
    let profile: UserProfile;

    beforeEach(() => {
      profile = {
        id: "770e8400-e29b-41d4-a716-446655440000",
        display_name: "Jane Doe",
        user_type: "job_seeker",
        reports_submitted: 5,
        reports_remaining_today: 3,
        rate_limit_reset_at: null,
        created_at: "2026-01-01T00:00:00Z",
      };
    });

    it("has all required Row fields", () => {
      expect(profile.id).toBeDefined();
      expect(profile.user_type).toBe("job_seeker");
      expect(profile.reports_submitted).toBe(5);
      expect(profile.reports_remaining_today).toBe(3);
    });

    it("supports recruiter user type", () => {
      profile.user_type = "recruiter";
      expect(profile.user_type).toBe("recruiter");
    });

    it("Insert type requires id (FK to auth.users)", () => {
      const insert: UserProfileInsert = {
        id: "770e8400-e29b-41d4-a716-446655440000",
      };
      expect(insert.id).toBeDefined();
      expect(insert.display_name).toBeUndefined();
    });
  });

  describe("Subscription types", () => {
    let subscription: Subscription;

    beforeEach(() => {
      subscription = {
        id: "880e8400-e29b-41d4-a716-446655440000",
        user_id: "770e8400-e29b-41d4-a716-446655440000",
        stripe_customer_id: "cus_test123",
        plan: "premium",
        status: "active",
        current_period_start: "2026-01-01T00:00:00Z",
        current_period_end: "2026-02-01T00:00:00Z",
        created_at: "2026-01-01T00:00:00Z",
      };
    });

    it("has all required Row fields", () => {
      expect(subscription.user_id).toBeDefined();
      expect(subscription.plan).toBe("premium");
      expect(subscription.status).toBe("active");
    });

    it("supports all valid plans", () => {
      const plans: Subscription["plan"][] = ["free", "premium", "recruiter"];
      for (const p of plans) {
        subscription.plan = p;
        expect(subscription.plan).toBe(p);
      }
    });

    it("supports all valid statuses", () => {
      const statuses: Subscription["status"][] = ["active", "cancelled", "past_due"];
      for (const s of statuses) {
        subscription.status = s;
        expect(subscription.status).toBe(s);
      }
    });

    it("Insert type requires user_id, plan, and status", () => {
      const insert: SubscriptionInsert = {
        user_id: "770e8400-e29b-41d4-a716-446655440000",
        plan: "free",
        status: "active",
      };
      expect(insert.user_id).toBeDefined();
      expect(insert.plan).toBe("free");
      expect(insert.status).toBe("active");
    });
  });

  describe("CompanyClaim types", () => {
    let claim: CompanyClaim;

    beforeEach(() => {
      claim = {
        id: "990e8400-e29b-41d4-a716-446655440000",
        company_id: "550e8400-e29b-41d4-a716-446655440000",
        user_id: "770e8400-e29b-41d4-a716-446655440000",
        verification_method: "email_domain",
        status: "pending",
        created_at: "2026-01-01T00:00:00Z",
      };
    });

    it("has all required Row fields", () => {
      expect(claim.company_id).toBeDefined();
      expect(claim.user_id).toBeDefined();
      expect(claim.status).toBe("pending");
    });

    it("supports all valid statuses", () => {
      const statuses: CompanyClaim["status"][] = ["pending", "approved", "rejected"];
      for (const s of statuses) {
        claim.status = s;
        expect(claim.status).toBe(s);
      }
    });

    it("Insert type requires company_id and user_id", () => {
      const insert: CompanyClaimInsert = {
        company_id: "550e8400-e29b-41d4-a716-446655440000",
        user_id: "770e8400-e29b-41d4-a716-446655440000",
      };
      expect(insert.company_id).toBeDefined();
      expect(insert.user_id).toBeDefined();
    });
  });

  describe("CompanyStats view type", () => {
    let stats: CompanyStats;

    beforeEach(() => {
      stats = {
        company_id: "550e8400-e29b-41d4-a716-446655440000",
        total_reports: 42,
        ghosting_rate: 35.7,
        avg_response_days: 14.2,
        interview_to_offer_ratio: 25.0,
        last_report_at: "2026-03-01T00:00:00Z",
      };
    });

    it("has all expected fields", () => {
      expect(stats.company_id).toBeDefined();
      expect(stats.total_reports).toBe(42);
      expect(stats.ghosting_rate).toBe(35.7);
      expect(stats.avg_response_days).toBe(14.2);
      expect(stats.interview_to_offer_ratio).toBe(25.0);
      expect(stats.last_report_at).toBeDefined();
    });

    it("allows nullable numeric fields", () => {
      stats.ghosting_rate = null;
      stats.avg_response_days = null;
      stats.interview_to_offer_ratio = null;
      stats.last_report_at = null;
      expect(stats.ghosting_rate).toBeNull();
      expect(stats.avg_response_days).toBeNull();
    });
  });

  describe("Database type structure", () => {
    it("has Tables namespace with all 5 tables", () => {
      type Tables = Database["public"]["Tables"];
      type TableNames = keyof Tables;
      const tables: TableNames[] = [
        "companies",
        "reports",
        "user_profiles",
        "subscriptions",
        "company_claims",
      ];
      expect(tables).toHaveLength(5);
    });

    it("has Views namespace with company_stats", () => {
      type Views = Database["public"]["Views"];
      type ViewNames = keyof Views;
      const views: ViewNames[] = ["company_stats"];
      expect(views).toHaveLength(1);
    });

    it("has Functions namespace with refresh_company_stats", () => {
      type Functions = Database["public"]["Functions"];
      type FunctionNames = keyof Functions;
      const functions: FunctionNames[] = ["refresh_company_stats"];
      expect(functions).toHaveLength(1);
    });
  });
});
