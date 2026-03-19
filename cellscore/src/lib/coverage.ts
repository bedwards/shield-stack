/**
 * Coverage check logic — geocodes address and queries PostGIS for signal data.
 * In TEST_MODE, returns deterministic mock data.
 */
import { isTestMode } from "./env";
import { getMockCoverageForAddress, getMockGeocode, type MockCoverageResult } from "./mock-data";

export interface GeocodedLocation {
  lat: number;
  lng: number;
  formatted: string;
}

export interface CoverageCheckResult {
  address: string;
  location: GeocodedLocation;
  carriers: MockCoverageResult[];
}

export async function geocodeAddress(address: string): Promise<GeocodedLocation> {
  if (isTestMode()) {
    return getMockGeocode(address);
  }

  const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  if (!token) {
    throw new Error("NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN is not set");
  }

  const encodedAddress = encodeURIComponent(address);
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${token}&limit=1&country=US`,
  );

  if (!response.ok) {
    throw new Error(`Geocoding failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  if (!data.features || data.features.length === 0) {
    throw new Error("No results found for this address");
  }

  const feature = data.features[0];
  return {
    lat: feature.center[1],
    lng: feature.center[0],
    formatted: feature.place_name,
  };
}

export async function checkCoverage(address: string): Promise<CoverageCheckResult> {
  const location = await geocodeAddress(address);

  if (isTestMode()) {
    return {
      address,
      location,
      carriers: getMockCoverageForAddress(address),
    };
  }

  // In production, this would query PostGIS via Supabase
  // For now, the FCC data import is a separate concern (no FCC data seeded yet)
  // Return empty array which the UI handles gracefully
  return {
    address,
    location,
    carriers: [],
  };
}

export function signalStrengthLabel(dbm: number): "excellent" | "good" | "fair" | "poor" {
  if (dbm >= -70) return "excellent";
  if (dbm >= -85) return "good";
  if (dbm >= -100) return "fair";
  return "poor";
}

export function signalStrengthPercent(dbm: number): number {
  // Map -120 to -50 dBm range to 0-100%
  const clamped = Math.max(-120, Math.min(-50, dbm));
  return Math.round(((clamped + 120) / 70) * 100);
}
