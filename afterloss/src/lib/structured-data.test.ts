import { describe, it, expect } from "vitest";
import {
  generateWebSiteSchema,
  generateFaqPageSchema,
  generateHowToSchema,
  generateBreadcrumbSchema,
} from "./structured-data";

describe("generateWebSiteSchema", () => {
  it("returns valid WebSite schema", () => {
    const schema = generateWebSiteSchema();

    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("WebSite");
    expect(schema.name).toBe("AfterLoss");
    expect(schema.url).toBe("https://afterloss.pages.dev");
    expect(schema.description).toBeTruthy();
  });

  it("produces valid JSON-LD", () => {
    const schema = generateWebSiteSchema();
    const json = JSON.stringify(schema);
    const parsed = JSON.parse(json);

    expect(parsed["@context"]).toBe("https://schema.org");
    expect(parsed["@type"]).toBe("WebSite");
  });
});

describe("generateFaqPageSchema", () => {
  const faqs = [
    { question: "What do I do first?", answer: "Get the death certificate." },
    { question: "Do I need a lawyer?", answer: "It depends on the estate." },
  ];

  it("returns valid FAQPage schema", () => {
    const schema = generateFaqPageSchema(faqs);

    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("FAQPage");
    expect(schema.mainEntity).toHaveLength(2);
  });

  it("maps questions and answers correctly", () => {
    const schema = generateFaqPageSchema(faqs);

    expect(schema.mainEntity[0]["@type"]).toBe("Question");
    expect(schema.mainEntity[0].name).toBe("What do I do first?");
    expect(schema.mainEntity[0].acceptedAnswer["@type"]).toBe("Answer");
    expect(schema.mainEntity[0].acceptedAnswer.text).toBe(
      "Get the death certificate."
    );
  });

  it("handles empty FAQ list", () => {
    const schema = generateFaqPageSchema([]);

    expect(schema["@type"]).toBe("FAQPage");
    expect(schema.mainEntity).toHaveLength(0);
  });

  it("produces valid JSON-LD", () => {
    const schema = generateFaqPageSchema(faqs);
    const json = JSON.stringify(schema);
    const parsed = JSON.parse(json);

    expect(parsed.mainEntity).toHaveLength(2);
    expect(parsed.mainEntity[0]["@type"]).toBe("Question");
  });
});

describe("generateHowToSchema", () => {
  const steps = [
    { name: "Get death certificate", text: "Order certified copies." },
    { name: "Notify SSA", text: "Call Social Security Administration." },
    { name: "Contact employer", text: "Ask about benefits and final pay." },
  ];

  it("returns valid HowTo schema", () => {
    const schema = generateHowToSchema(
      "Estate Settlement Guide",
      "Steps to settle an estate",
      steps
    );

    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("HowTo");
    expect(schema.name).toBe("Estate Settlement Guide");
    expect(schema.description).toBe("Steps to settle an estate");
    expect(schema.step).toHaveLength(3);
  });

  it("maps steps correctly with HowToStep type", () => {
    const schema = generateHowToSchema("Guide", "Desc", steps);

    expect(schema.step[0]["@type"]).toBe("HowToStep");
    expect(schema.step[0].name).toBe("Get death certificate");
    expect(schema.step[0].text).toBe("Order certified copies.");
  });

  it("handles empty steps list", () => {
    const schema = generateHowToSchema("Guide", "Desc", []);

    expect(schema["@type"]).toBe("HowTo");
    expect(schema.step).toHaveLength(0);
  });

  it("produces valid JSON-LD", () => {
    const schema = generateHowToSchema("Guide", "Desc", steps);
    const json = JSON.stringify(schema);
    const parsed = JSON.parse(json);

    expect(parsed["@type"]).toBe("HowTo");
    expect(parsed.step[2].name).toBe("Contact employer");
  });
});

describe("generateBreadcrumbSchema", () => {
  const items = [
    { name: "Home", url: "https://afterloss.pages.dev" },
    { name: "States", url: "https://afterloss.pages.dev/states" },
    {
      name: "California",
      url: "https://afterloss.pages.dev/states/california/probate",
    },
  ];

  it("returns valid BreadcrumbList schema", () => {
    const schema = generateBreadcrumbSchema(items);

    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("BreadcrumbList");
    expect(schema.itemListElement).toHaveLength(3);
  });

  it("assigns correct 1-based positions", () => {
    const schema = generateBreadcrumbSchema(items);

    expect(schema.itemListElement[0].position).toBe(1);
    expect(schema.itemListElement[1].position).toBe(2);
    expect(schema.itemListElement[2].position).toBe(3);
  });

  it("maps names and URLs correctly", () => {
    const schema = generateBreadcrumbSchema(items);

    expect(schema.itemListElement[0]["@type"]).toBe("ListItem");
    expect(schema.itemListElement[0].name).toBe("Home");
    expect(schema.itemListElement[0].item).toBe(
      "https://afterloss.pages.dev"
    );
    expect(schema.itemListElement[2].name).toBe("California");
  });

  it("handles single-item breadcrumb", () => {
    const schema = generateBreadcrumbSchema([
      { name: "Home", url: "https://afterloss.pages.dev" },
    ]);

    expect(schema.itemListElement).toHaveLength(1);
    expect(schema.itemListElement[0].position).toBe(1);
  });

  it("produces valid JSON-LD", () => {
    const schema = generateBreadcrumbSchema(items);
    const json = JSON.stringify(schema);
    const parsed = JSON.parse(json);

    expect(parsed["@type"]).toBe("BreadcrumbList");
    expect(parsed.itemListElement[1].position).toBe(2);
  });
});
