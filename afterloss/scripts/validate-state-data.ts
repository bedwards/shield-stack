#!/usr/bin/env bun
/**
 * Validates the state probate rules dataset.
 *
 * Checks:
 * 1. All 51 jurisdictions present (50 states + DC)
 * 2. No null/undefined core fields
 * 3. Thresholds within reasonable ranges
 * 4. At least 10 verified states
 * 5. All state codes are valid 2-letter USPS codes
 *
 * Usage: bun run scripts/validate-state-data.ts
 */

import { STATE_PROBATE_RULES, type StateProbateRule } from "../src/lib/probate/state-data";

const EXPECTED_COUNT = 51; // 50 states + DC
const MIN_VERIFIED = 10;

const EXPECTED_CODES = new Set([
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL",
  "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME",
  "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH",
  "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI",
  "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI",
  "WY",
]);

let errors = 0;

function fail(msg: string): void {
  console.error(`  FAIL: ${msg}`);
  errors++;
}

function pass(msg: string): void {
  console.log(`  PASS: ${msg}`);
}

// ── Count ──────────────────────────────────────────────────────────────
console.log("\n=== State Probate Rules Validation ===\n");

if (STATE_PROBATE_RULES.length === EXPECTED_COUNT) {
  pass(`${STATE_PROBATE_RULES.length} records present (expected ${EXPECTED_COUNT})`);
} else {
  fail(`${STATE_PROBATE_RULES.length} records present (expected ${EXPECTED_COUNT})`);
}

// ── Missing / extra state codes ────────────────────────────────────────
const actualCodes = new Set(STATE_PROBATE_RULES.map((s) => s.stateCode));
const missing = [...EXPECTED_CODES].filter((c) => !actualCodes.has(c));
const extra = [...actualCodes].filter((c) => !EXPECTED_CODES.has(c));

if (missing.length === 0) {
  pass("All expected state codes present");
} else {
  fail(`Missing state codes: ${missing.join(", ")}`);
}

if (extra.length === 0) {
  pass("No unexpected state codes");
} else {
  fail(`Unexpected state codes: ${extra.join(", ")}`);
}

// ── Duplicates ─────────────────────────────────────────────────────────
const codeList = STATE_PROBATE_RULES.map((s) => s.stateCode);
const dupes = codeList.filter((c, i) => codeList.indexOf(c) !== i);
if (dupes.length === 0) {
  pass("No duplicate state codes");
} else {
  fail(`Duplicate state codes: ${dupes.join(", ")}`);
}

// ── Core field validation ──────────────────────────────────────────────
let coreErrors = 0;
for (const rule of STATE_PROBATE_RULES) {
  const check = (field: string, value: unknown, condition: boolean) => {
    if (!condition) {
      fail(`${rule.stateCode}: ${field} invalid (${JSON.stringify(value)})`);
      coreErrors++;
    }
  };

  check("stateCode", rule.stateCode, /^[A-Z]{2}$/.test(rule.stateCode));
  check("stateName", rule.stateName, rule.stateName.length > 0);
  check("probateThreshold", rule.probateThreshold, rule.probateThreshold > 0);
  check("smallEstateAffidavitLimit", rule.smallEstateAffidavitLimit, rule.smallEstateAffidavitLimit > 0);
  check("filingDeadlineDays", rule.filingDeadlineDays, rule.filingDeadlineDays > 0);
  check("estimatedTimelineMonths", rule.estimatedTimelineMonths, rule.estimatedTimelineMonths > 0);
  check("filingFeesMin <= filingFeesMax", `${rule.filingFeesMin}-${rule.filingFeesMax}`, rule.filingFeesMin <= rule.filingFeesMax);
  check("probateCourtWebsiteUrl", rule.probateCourtWebsiteUrl, rule.probateCourtWebsiteUrl.startsWith("https://"));
  check("requiredDocuments", rule.requiredDocuments.length, rule.requiredDocuments.length > 0);
  check("sourceUrl", rule.sourceUrl, rule.sourceUrl.startsWith("https://"));
  check("lastVerifiedDate", rule.lastVerifiedDate, /^\d{4}-\d{2}-\d{2}$/.test(rule.lastVerifiedDate));
}

if (coreErrors === 0) {
  pass("All core fields valid for all records");
}

// ── Verified count ─────────────────────────────────────────────────────
const verifiedCount = STATE_PROBATE_RULES.filter((s) => s.dataVerified).length;
if (verifiedCount >= MIN_VERIFIED) {
  pass(`${verifiedCount} states verified (minimum ${MIN_VERIFIED})`);
} else {
  fail(`Only ${verifiedCount} states verified (minimum ${MIN_VERIFIED})`);
}

// ── Summary ────────────────────────────────────────────────────────────
console.log("\n---");
if (errors === 0) {
  console.log(`\nAll checks passed. ${STATE_PROBATE_RULES.length} state records validated.\n`);
  process.exit(0);
} else {
  console.error(`\n${errors} error(s) found.\n`);
  process.exit(1);
}
