"use client";

import { useState, useMemo } from "react";
import type { CreditBuilderProduct } from "@/data/credit-builder-products";

type SortColumn =
  | "name"
  | "type"
  | "monthly_cost"
  | "credit_bureaus_reported"
  | "min_credit_score"
  | "time_to_build_credit";

type SortDirection = "asc" | "desc";

const COLUMN_HEADERS: { key: SortColumn; label: string }[] = [
  { key: "name", label: "Product Name" },
  { key: "type", label: "Type" },
  { key: "monthly_cost", label: "Monthly Cost" },
  { key: "credit_bureaus_reported", label: "Bureaus Reported" },
  { key: "min_credit_score", label: "Min Score" },
  { key: "time_to_build_credit", label: "Time to Results" },
];

const TYPE_DISPLAY: Record<string, string> = {
  "credit-builder-loan": "Credit Builder Loan",
  "secured-card": "Secured Card",
  "credit-monitoring": "Monitoring",
};

function sortProducts(
  products: CreditBuilderProduct[],
  column: SortColumn,
  direction: SortDirection,
): CreditBuilderProduct[] {
  return [...products].sort((a, b) => {
    let comparison = 0;
    switch (column) {
      case "name":
        comparison = a.name.localeCompare(b.name);
        break;
      case "type":
        comparison = a.type.localeCompare(b.type);
        break;
      case "monthly_cost":
        comparison = parseCost(a.monthly_cost) - parseCost(b.monthly_cost);
        break;
      case "credit_bureaus_reported":
        comparison =
          a.credit_bureaus_reported.length - b.credit_bureaus_reported.length;
        break;
      case "min_credit_score":
        comparison = a.min_credit_score.localeCompare(b.min_credit_score);
        break;
      case "time_to_build_credit":
        comparison = parseTime(a.time_to_build_credit) - parseTime(b.time_to_build_credit);
        break;
    }
    return direction === "asc" ? comparison : -comparison;
  });
}

/** Extract numeric cost for sorting ("$25–$48/mo" → 25, "$0" → 0) */
function parseCost(cost: string): number {
  const match = cost.match(/\$(\d+)/);
  return match?.[1] != null ? parseInt(match[1], 10) : 0;
}

/** Extract numeric months for sorting ("3–6 months" → 3, "N/A" → 999) */
function parseTime(time: string): number {
  const match = time.match(/(\d+)/);
  return match?.[1] != null ? parseInt(match[1], 10) : 999;
}

interface ComparisonTableProps {
  products: CreditBuilderProduct[];
}

export default function ComparisonTable({ products }: ComparisonTableProps) {
  const [sortColumn, setSortColumn] = useState<SortColumn>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const sorted = useMemo(
    () => sortProducts(products, sortColumn, sortDirection),
    [products, sortColumn, sortDirection],
  );

  function handleSort(column: SortColumn) {
    if (column === sortColumn) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  }

  return (
    <div data-testid="comparison-table" className="overflow-x-auto">
      <table className="w-full min-w-[700px] border-collapse text-sm">
        <thead>
          <tr className="border-b-2 border-gray-200">
            {COLUMN_HEADERS.map(({ key, label }) => (
              <th key={key} className="py-3 px-3 text-left font-semibold text-gray-700">
                <button
                  data-testid={`sort-${key}`}
                  type="button"
                  onClick={() => handleSort(key)}
                  className="inline-flex items-center gap-1 hover:text-emerald-700 transition-colors"
                >
                  {label}
                  <SortIndicator
                    active={sortColumn === key}
                    direction={sortColumn === key ? sortDirection : "asc"}
                  />
                </button>
              </th>
            ))}
            <th className="py-3 px-3 text-left font-semibold text-gray-700">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((product) => (
            <tr
              key={product.slug}
              data-testid={`table-row-${product.slug}`}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td className="py-3 px-3 font-medium text-gray-900">
                <a
                  href={`#${product.slug}`}
                  data-testid={`table-link-${product.slug}`}
                  className="hover:text-emerald-700 transition-colors"
                >
                  {product.name}
                </a>
                {product.editors_pick && (
                  <span className="ml-2 inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                    Best for Recovery
                  </span>
                )}
              </td>
              <td className="py-3 px-3 text-gray-600">
                {TYPE_DISPLAY[product.type] ?? product.type}
              </td>
              <td className="py-3 px-3 text-gray-600">{product.monthly_cost}</td>
              <td className="py-3 px-3 text-gray-600">
                {product.credit_bureaus_reported.length === 3
                  ? "All 3"
                  : product.credit_bureaus_reported.join(", ")}
              </td>
              <td className="py-3 px-3 text-gray-600">{product.min_credit_score}</td>
              <td className="py-3 px-3 text-gray-600">
                {product.time_to_build_credit}
              </td>
              <td className="py-3 px-3">
                <a
                  href={`/api/affiliate/click?slug=${encodeURIComponent(product.affiliate_slug)}&referrer=${encodeURIComponent("/compare/credit-builders")}`}
                  data-testid={`table-cta-${product.slug}`}
                  className="inline-flex items-center rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-500 transition-colors"
                  rel="noopener noreferrer sponsored"
                >
                  Learn More
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SortIndicator({
  active,
  direction,
}: {
  active: boolean;
  direction: SortDirection;
}) {
  return (
    <svg
      className={`h-4 w-4 ${active ? "text-emerald-600" : "text-gray-400"}`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      {direction === "asc" ? (
        <path
          fillRule="evenodd"
          d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3z"
          clipRule="evenodd"
        />
      ) : (
        <path
          fillRule="evenodd"
          d="M10 17a.75.75 0 01-.55-.24l-3.25-3.5a.75.75 0 111.1-1.02L10 15.148l2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5A.75.75 0 0110 17z"
          clipRule="evenodd"
        />
      )}
    </svg>
  );
}
