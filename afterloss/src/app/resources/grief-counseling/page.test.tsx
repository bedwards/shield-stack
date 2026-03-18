import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import GriefCounselingPage from "./page";

describe("Grief Counseling Page", () => {
  beforeEach(() => {
    render(<GriefCounselingPage />);
  });

  it("renders the hero section with page title", () => {
    expect(screen.getByTestId("grief-counseling-hero")).toBeInTheDocument();
    expect(
      screen.getByText(/Online Grief Counseling Guide/i)
    ).toBeInTheDocument();
  });

  it("renders the what-is-grief-counseling section", () => {
    expect(
      screen.getByTestId("what-is-grief-counseling")
    ).toBeInTheDocument();
  });

  it("renders the when-to-seek-help section with signs checklist", () => {
    expect(screen.getByTestId("when-to-seek-help")).toBeInTheDocument();
    expect(screen.getByTestId("signs-checklist")).toBeInTheDocument();
  });

  it("renders crisis resources with hotline numbers", () => {
    expect(screen.getByTestId("crisis-resources")).toBeInTheDocument();
    expect(screen.getByText(/Call or text 988/)).toBeInTheDocument();
    expect(screen.getByText(/Text HOME to 741741/)).toBeInTheDocument();
  });

  it("renders the online-vs-inperson section", () => {
    expect(screen.getByTestId("online-vs-inperson")).toBeInTheDocument();
  });

  it("renders the what-to-expect section", () => {
    expect(screen.getByTestId("what-to-expect")).toBeInTheDocument();
  });

  it("renders the insurance-coverage section", () => {
    expect(screen.getByTestId("insurance-coverage")).toBeInTheDocument();
  });

  it("renders the therapy comparison table", () => {
    expect(
      screen.getByTestId("therapy-comparison-table")
    ).toBeInTheDocument();
  });

  it("renders Talkspace and BetterHelp affiliate CTAs", () => {
    expect(screen.getByTestId("talkspace-cta")).toBeInTheDocument();
    expect(screen.getByTestId("betterhelp-cta")).toBeInTheDocument();
  });

  it("marks affiliate links with sponsored rel and disclosure text", () => {
    const talkspaceCta = screen.getByTestId("talkspace-cta");
    expect(talkspaceCta).toHaveAttribute("rel", "noopener noreferrer sponsored");
    expect(talkspaceCta).toHaveAttribute("target", "_blank");

    const betterhelpCta = screen.getByTestId("betterhelp-cta");
    expect(betterhelpCta).toHaveAttribute("rel", "noopener noreferrer sponsored");
    expect(betterhelpCta).toHaveAttribute("target", "_blank");

    const disclosures = screen.getAllByText(/affiliate link/i);
    expect(disclosures.length).toBeGreaterThanOrEqual(2);
  });

  it("renders the grief counseling for children section", () => {
    expect(
      screen.getByTestId("grief-counseling-children")
    ).toBeInTheDocument();
  });

  it("renders the FAQ section with 7 questions", () => {
    expect(screen.getByTestId("faq-section")).toBeInTheDocument();
    const faqSection = screen.getByTestId("faq-section");
    const questions = faqSection.querySelectorAll("h3");
    expect(questions.length).toBe(7);
  });

  it("renders internal links to checklist and state guides", () => {
    expect(screen.getByTestId("cta-checklist-link")).toBeInTheDocument();
    expect(screen.getByTestId("cta-states-link")).toBeInTheDocument();
  });

  it("renders breadcrumb navigation", () => {
    expect(screen.getByTestId("breadcrumb-home")).toBeInTheDocument();
  });
});
