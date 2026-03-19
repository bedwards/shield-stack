"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface SearchResult {
  id: string;
  slug: string;
  name: string;
  industry: string | null;
  headquarters: string | null;
  stats: { ghosting_rate: number | null; total_reports: number } | null;
}

interface CompanySearchProps {
  /** If true, navigates to /company/[slug] on selection instead of just selecting */
  navigateOnSelect?: boolean;
  /** Callback when a company is selected */
  onSelect?: (company: SearchResult) => void;
  /** Placeholder text */
  placeholder?: string;
}

export default function CompanySearch({
  navigateOnSelect = true,
  onSelect,
  placeholder = "Search company name...",
}: CompanySearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/companies/search?q=${encodeURIComponent(query)}&limit=8`);
        const data = await res.json();
        setResults(data.companies ?? []);
        setIsOpen(true);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(company: SearchResult) {
    setQuery(company.name);
    setIsOpen(false);
    if (onSelect) onSelect(company);
    if (navigateOnSelect) router.push(`/company/${company.slug}`);
  }

  return (
    <div ref={containerRef} className="relative" data-testid="company-search">
      <div className="flex gap-2">
        <input
          type="text"
          data-testid="company-search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
          autoComplete="off"
        />
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--primary)] border-t-transparent" />
          </div>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div
          data-testid="company-search-results"
          className="absolute z-10 mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] shadow-lg max-h-80 overflow-y-auto"
        >
          {results.map((company) => (
            <button
              key={company.id}
              data-testid={`search-result-${company.slug}`}
              onClick={() => handleSelect(company)}
              className="w-full px-4 py-3 text-left hover:bg-[var(--secondary)] transition-colors flex items-center justify-between border-b border-[var(--border)] last:border-b-0"
            >
              <div>
                <p className="font-medium text-[var(--foreground)]">{company.name}</p>
                <p className="text-xs text-[var(--muted)]">
                  {[company.industry, company.headquarters].filter(Boolean).join(" · ")}
                </p>
              </div>
              {company.stats && company.stats.total_reports >= 5 && (
                <span className="text-sm font-semibold text-[var(--destructive)]">
                  {company.stats.ghosting_rate}% ghosted
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {isOpen && results.length === 0 && query.length >= 2 && !loading && (
        <div
          data-testid="company-search-no-results"
          className="absolute z-10 mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] shadow-lg p-4 text-center text-sm text-[var(--muted)]"
        >
          No companies found for &ldquo;{query}&rdquo;
        </div>
      )}
    </div>
  );
}
