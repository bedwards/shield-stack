"use client";

import { useState, useCallback } from "react";
import type { FAQItem } from "@/lib/faq-data";

function FAQAccordionItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      data-testid={`faq-item-${index}`}
      className="border-b border-gray-200"
    >
      <button
        data-testid={`faq-toggle-${index}`}
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-base font-medium text-gray-900 pr-4">
          {item.question}
        </span>
        <svg
          className={`h-5 w-5 shrink-0 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div
          data-testid={`faq-answer-${index}`}
          className="pb-5 text-sm leading-relaxed text-gray-600"
        >
          {item.answer}
        </div>
      )}
    </div>
  );
}

export default function FAQSection({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <div data-testid="faq-list" className="mx-auto max-w-3xl divide-y divide-gray-200">
      {items.map((item, index) => (
        <FAQAccordionItem
          key={index}
          item={item}
          index={index}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
}
