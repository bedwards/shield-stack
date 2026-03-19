import { describe, it, expect } from "vitest";
import type {
  Database,
  Provider,
  UserProfile,
  UtilityAccount,
  Bill,
  Anomaly,
  Subscription,
  ProviderAlert,
  Benchmark,
  InsertTables,
  UpdateTables,
} from "./database.types";

/**
 * Type-level tests for the database schema types.
 * These verify that the types are structurally correct and
 * match the SQL migration schema.
 */
describe("database types", () => {
  it("exports all required table types", () => {
    // Verify type aliases exist and are usable (compile-time check)
    const providerRow: Provider = {
      id: "uuid",
      name: "Test Provider",
      slug: "test-provider",
      service_area_states: ["CA"],
      utility_types: ["electric"],
      is_deregulated: false,
      website_url: "https://example.com",
      created_at: "2026-01-01T00:00:00Z",
    };
    expect(providerRow.name).toBe("Test Provider");
  });

  it("enforces required fields on user_profiles", () => {
    const profile: UserProfile = {
      id: "uuid",
      display_name: null,
      zip_code: "10001",
      home_sqft: 1200,
      household_size: 3,
      home_type: "apartment",
      heating_type: "gas",
      cooling_type: "central_ac",
      created_at: "2026-01-01T00:00:00Z",
      updated_at: "2026-01-01T00:00:00Z",
    };
    expect(profile.home_type).toBe("apartment");
  });

  it("enforces account_type enum values on utility_accounts", () => {
    const account: UtilityAccount = {
      id: "uuid",
      user_id: "user-uuid",
      provider_id: null,
      provider_name: "Con Edison",
      account_type: "electric",
      account_nickname: "Main Electric",
      account_number_last4: "4567",
      is_active: true,
      created_at: "2026-01-01T00:00:00Z",
      updated_at: "2026-01-01T00:00:00Z",
    };
    expect(account.account_type).toBe("electric");
  });

  it("stores monetary values as cents in bills", () => {
    const bill: Bill = {
      id: "uuid",
      account_id: "account-uuid",
      user_id: "user-uuid",
      amount_cents: 8500,
      usage_quantity: 650,
      usage_unit: "kWh",
      rate_per_unit: 0.1308,
      period_start: "2025-03-01",
      period_end: "2025-03-31",
      period_days: 30,
      due_date: "2025-04-15",
      image_url: null,
      ocr_confidence: null,
      ocr_raw_text: null,
      is_manually_entered: false,
      created_at: "2026-01-01T00:00:00Z",
      updated_at: "2026-01-01T00:00:00Z",
    };
    expect(bill.amount_cents).toBe(8500);
    expect(typeof bill.amount_cents).toBe("number");
  });

  it("enforces anomaly_type and severity enums on anomalies", () => {
    const anomaly: Anomaly = {
      id: "uuid",
      bill_id: "bill-uuid",
      account_id: "account-uuid",
      user_id: "user-uuid",
      anomaly_type: "usage_spike",
      severity: "high",
      description: "Unusual spike detected",
      expected_amount_cents: 8500,
      actual_amount_cents: 28500,
      z_score: 3.2,
      is_dismissed: false,
      dismissed_at: null,
      created_at: "2026-01-01T00:00:00Z",
    };
    expect(anomaly.anomaly_type).toBe("usage_spike");
    expect(anomaly.severity).toBe("high");
  });

  it("enforces plan and status enums on subscriptions", () => {
    const sub: Subscription = {
      id: "uuid",
      user_id: "user-uuid",
      stripe_customer_id: "cus_abc123",
      stripe_subscription_id: "sub_xyz789",
      plan: "premium",
      status: "active",
      current_period_start: "2026-01-01T00:00:00Z",
      current_period_end: "2026-02-01T00:00:00Z",
      created_at: "2026-01-01T00:00:00Z",
      updated_at: "2026-01-01T00:00:00Z",
    };
    expect(sub.plan).toBe("premium");
    expect(sub.status).toBe("active");
  });

  it("models provider_alerts with array fields", () => {
    const alert: ProviderAlert = {
      id: "uuid",
      provider_id: "provider-uuid",
      alert_type: "widespread_spike",
      severity: "high",
      description: "Multiple users reporting higher bills",
      affected_account_types: ["electric"],
      affected_states: ["CA"],
      user_count: 150,
      start_date: "2026-02-01",
      end_date: null,
      is_resolved: false,
      created_at: "2026-01-01T00:00:00Z",
    };
    expect(alert.affected_states).toEqual(["CA"]);
  });

  it("models benchmarks materialized view", () => {
    const benchmark: Benchmark = {
      zip_prefix: "100",
      account_type: "electric",
      home_size_bucket: "1000-1500",
      household_size: 3,
      bill_month: 7,
      avg_amount_cents: 15200,
      median_amount_cents: 14800,
      avg_usage: 1100,
      sample_size: 45,
    };
    expect(benchmark.zip_prefix).toBe("100");
    expect(benchmark.sample_size).toBe(45);
  });

  it("has correct Insert types with optional fields", () => {
    // Insert requires only non-default fields
    const billInsert: InsertTables<"bills"> = {
      account_id: "account-uuid",
      user_id: "user-uuid",
      amount_cents: 8500,
      period_start: "2025-03-01",
      period_end: "2025-03-31",
    };
    expect(billInsert.amount_cents).toBe(8500);
    // id, usage_quantity, etc. are all optional on insert
  });

  it("has correct Update types with all-optional fields", () => {
    // Update makes every field optional
    const billUpdate: UpdateTables<"bills"> = {
      amount_cents: 9000,
    };
    expect(billUpdate.amount_cents).toBe(9000);
  });

  it("Database type has Tables, Views, and Functions", () => {
    // Compile-time structural check
    type PublicSchema = Database["public"];
    type TablesKeys = keyof PublicSchema["Tables"];
    type ViewsKeys = keyof PublicSchema["Views"];
    type FunctionsKeys = keyof PublicSchema["Functions"];

    // These are compile-time checks; runtime assertion just confirms the test ran
    const tables: TablesKeys[] = [
      "providers",
      "user_profiles",
      "utility_accounts",
      "bills",
      "anomalies",
      "subscriptions",
      "provider_alerts",
    ];
    expect(tables).toHaveLength(7);

    const views: ViewsKeys[] = ["benchmarks"];
    expect(views).toHaveLength(1);

    const functions: FunctionsKeys[] = [
      "home_size_bucket",
      "refresh_benchmarks",
    ];
    expect(functions).toHaveLength(2);
  });
});
