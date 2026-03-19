import { describe, it, expect } from "vitest";
import type {
  Database,
  CarrierType,
  PlanFeatures,
} from "./database.types";

describe("database types", () => {
  describe("CarrierType", () => {
    it("accepts mno and mvno", () => {
      const mno: CarrierType = "mno";
      const mvno: CarrierType = "mvno";
      expect(mno).toBe("mno");
      expect(mvno).toBe("mvno");
    });
  });

  describe("PlanFeatures", () => {
    it("accepts valid feature objects", () => {
      const features: PlanFeatures = {
        five_g: true,
        wifi_calling: true,
        international: false,
        hotspot: true,
        streaming_quality: "HD",
        streaming_perks: "Netflix Standard",
        contract_required: false,
        data_priority_level: undefined,
      };
      expect(features.five_g).toBe(true);
      expect(features.streaming_quality).toBe("HD");
    });

    it("accepts mvno-specific features", () => {
      const features: PlanFeatures = {
        network_choice: true,
        annual_billing: true,
        requires_xfinity_internet: false,
        aarp_discount: true,
      };
      expect(features.network_choice).toBe(true);
      expect(features.aarp_discount).toBe(true);
    });
  });

  describe("carriers table types", () => {
    it("Row has all required fields", () => {
      const carrier: Database["public"]["Tables"]["carriers"]["Row"] = {
        id: "test-id",
        name: "AT&T",
        slug: "att",
        type: "mno",
        parent_carrier_id: null,
        logo_url: null,
        website: "https://www.att.com",
        affiliate_url: null,
        created_at: "2026-03-15T00:00:00Z",
        updated_at: "2026-03-15T00:00:00Z",
      };
      expect(carrier.name).toBe("AT&T");
      expect(carrier.type).toBe("mno");
      expect(carrier.parent_carrier_id).toBeNull();
    });

    it("Insert allows optional fields", () => {
      const insert: Database["public"]["Tables"]["carriers"]["Insert"] = {
        name: "Mint Mobile",
        slug: "mint-mobile",
        type: "mvno",
        website: "https://www.mintmobile.com",
      };
      expect(insert.id).toBeUndefined();
      expect(insert.parent_carrier_id).toBeUndefined();
    });

    it("MVNO can reference parent carrier", () => {
      const mvno: Database["public"]["Tables"]["carriers"]["Row"] = {
        id: "mvno-id",
        name: "Visible",
        slug: "visible",
        type: "mvno",
        parent_carrier_id: "verizon-id",
        logo_url: null,
        website: "https://www.visible.com",
        affiliate_url: "https://www.visible.com/?utm_source=cellscore",
        created_at: "2026-03-15T00:00:00Z",
        updated_at: "2026-03-15T00:00:00Z",
      };
      expect(mvno.parent_carrier_id).toBe("verizon-id");
      expect(mvno.affiliate_url).toContain("cellscore");
    });
  });

  describe("plans table types", () => {
    it("Row has all required fields including data_priority_level", () => {
      const plan: Database["public"]["Tables"]["plans"]["Row"] = {
        id: "plan-id",
        carrier_id: "carrier-id",
        plan_name: "Go5G Plus",
        monthly_price: 90.0,
        data_limit_gb: null,
        throttle_speed_after: null,
        hotspot_gb: 50,
        num_lines_min: 1,
        num_lines_max: 6,
        features: {
          five_g: true,
          wifi_calling: true,
          international: true,
          hotspot: true,
          streaming_quality: "4K",
        },
        data_priority_level: "QCI 6",
        affiliate_url: null,
        last_verified_at: "2026-03-15T00:00:00Z",
        created_at: "2026-03-15T00:00:00Z",
        updated_at: "2026-03-15T00:00:00Z",
      };
      expect(plan.plan_name).toBe("Go5G Plus");
      expect(plan.monthly_price).toBe(90.0);
      expect(plan.data_limit_gb).toBeNull();
      expect(plan.data_priority_level).toBe("QCI 6");
    });

    it("unlimited plan has null data_limit_gb", () => {
      const plan: Database["public"]["Tables"]["plans"]["Row"] = {
        id: "plan-id",
        carrier_id: "carrier-id",
        plan_name: "Unlimited",
        monthly_price: 30.0,
        data_limit_gb: null,
        throttle_speed_after: "128 kbps after 40GB",
        hotspot_gb: 10,
        num_lines_min: 1,
        num_lines_max: 1,
        features: { five_g: true, annual_billing: true },
        data_priority_level: "QCI 9",
        affiliate_url: "https://example.com/?utm_source=cellscore",
        last_verified_at: "2026-03-15T00:00:00Z",
        created_at: "2026-03-15T00:00:00Z",
        updated_at: "2026-03-15T00:00:00Z",
      };
      expect(plan.data_limit_gb).toBeNull();
      expect(plan.throttle_speed_after).toContain("40GB");
    });

    it("capped plan has numeric data_limit_gb", () => {
      const insert: Database["public"]["Tables"]["plans"]["Insert"] = {
        carrier_id: "carrier-id",
        plan_name: "5GB",
        monthly_price: 15.0,
        data_limit_gb: 5,
      };
      expect(insert.data_limit_gb).toBe(5);
    });
  });

  describe("affiliate_clicks table types", () => {
    it("Row tracks click with plan and carrier references", () => {
      const click: Database["public"]["Tables"]["affiliate_clicks"]["Row"] = {
        id: "click-id",
        search_id: "search-id",
        plan_id: "plan-id",
        carrier_id: "carrier-id",
        clicked_at: "2026-03-15T00:00:00Z",
      };
      expect(click.plan_id).toBe("plan-id");
      expect(click.carrier_id).toBe("carrier-id");
    });

    it("Insert allows null search_id for direct clicks", () => {
      const insert: Database["public"]["Tables"]["affiliate_clicks"]["Insert"] = {
        plan_id: "plan-id",
        carrier_id: "carrier-id",
      };
      expect(insert.search_id).toBeUndefined();
    });
  });

  describe("coverage_aggregates view types", () => {
    it("Row has aggregated coverage data", () => {
      const agg: Database["public"]["Views"]["coverage_aggregates"]["Row"] = {
        carrier_slug: "tmobile",
        city: "San Francisco",
        state: "CA",
        zip: null,
        avg_signal: -78.5,
        avg_download: 125.3,
        sample_count: 42,
        technology: "5G",
      };
      expect(agg.avg_signal).toBeLessThan(0);
      expect(agg.sample_count).toBe(42);
    });
  });

  describe("cities table types", () => {
    it("Row has location data for SEO pages", () => {
      const city: Database["public"]["Tables"]["cities"]["Row"] = {
        id: "city-id",
        name: "New York",
        state: "NY",
        slug: "new-york-ny",
        lat: 40.7128,
        lng: -74.006,
        population: 8336817,
        created_at: "2026-03-15T00:00:00Z",
      };
      expect(city.name).toBe("New York");
      expect(city.population).toBeGreaterThan(0);
    });
  });
});
