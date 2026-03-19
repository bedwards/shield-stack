import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EmailCapture from "./EmailCapture";

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    clear: () => {
      store = {};
    },
  };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("EmailCapture", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
    mockFetch.mockReset();
  });

  it("renders the form with correct data-testid attributes", () => {
    render(<EmailCapture sourcePage="landing" />);
    expect(screen.getByTestId("email-capture-form")).toBeInTheDocument();
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("email-submit")).toBeInTheDocument();
  });

  it("renders empathetic heading and description", () => {
    render(<EmailCapture sourcePage="landing" />);
    expect(
      screen.getByText(/Not ready to start yet\? That's okay\./)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/gentle reminders and helpful resources/)
    ).toBeInTheDocument();
  });

  it("shows the CTA button text", () => {
    render(<EmailCapture sourcePage="landing" />);
    expect(screen.getByTestId("email-submit")).toHaveTextContent(
      "Get Gentle Reminders"
    );
  });

  it("shows error for empty email submission", async () => {
    render(<EmailCapture sourcePage="landing" />);
    // Use fireEvent.submit to bypass HTML5 required validation in jsdom
    const form = screen
      .getByTestId("email-capture-form")
      .querySelector("form")!;
    fireEvent.submit(form);
    await waitFor(() => {
      expect(screen.getByTestId("email-error")).toHaveTextContent(
        "Please enter a valid email address."
      );
    });
  });

  it("shows error for invalid email format", async () => {
    render(<EmailCapture sourcePage="landing" />);
    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "not-an-email" },
    });
    // Use fireEvent.submit to bypass HTML5 type=email validation in jsdom
    const form = screen
      .getByTestId("email-capture-form")
      .querySelector("form")!;
    fireEvent.submit(form);
    await waitFor(() => {
      expect(screen.getByTestId("email-error")).toHaveTextContent(
        "Please enter a valid email address."
      );
    });
  });

  it("submits valid email and shows success state", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<EmailCapture sourcePage="landing" />);
    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(screen.getByTestId("email-submit"));

    await waitFor(() => {
      expect(screen.getByTestId("email-success")).toBeInTheDocument();
    });

    expect(screen.getByTestId("email-success")).toHaveTextContent(
      /Thank you\. We'll be here when you're ready\./
    );

    expect(mockFetch).toHaveBeenCalledWith("/api/email/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "test@example.com",
        source_page: "landing",
      }),
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "afterloss-email-subscribed",
      "true"
    );
  });

  it("shows error when API returns non-OK response", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Unable to subscribe." }),
    });

    render(<EmailCapture sourcePage="landing" />);
    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(screen.getByTestId("email-submit"));

    await waitFor(() => {
      expect(screen.getByTestId("email-error")).toHaveTextContent(
        "Unable to subscribe."
      );
    });
  });

  it("shows network error when fetch fails", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    render(<EmailCapture sourcePage="landing" />);
    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(screen.getByTestId("email-submit"));

    await waitFor(() => {
      expect(screen.getByTestId("email-error")).toHaveTextContent(
        "Unable to connect. Please try again later."
      );
    });
  });

  it("shows success state when localStorage indicates already subscribed", async () => {
    localStorageMock.getItem.mockReturnValueOnce("true");
    render(<EmailCapture sourcePage="landing" />);

    await waitFor(() => {
      expect(screen.getByTestId("email-success")).toBeInTheDocument();
    });
  });

  it("disables button while submitting", async () => {
    let resolvePromise: (value: unknown) => void;
    const fetchPromise = new Promise((resolve) => {
      resolvePromise = resolve;
    });
    mockFetch.mockReturnValueOnce(fetchPromise);

    render(<EmailCapture sourcePage="landing" />);
    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(screen.getByTestId("email-submit"));

    expect(screen.getByTestId("email-submit")).toBeDisabled();
    expect(screen.getByTestId("email-submit")).toHaveTextContent("Sending...");

    resolvePromise!({ ok: true, json: async () => ({ success: true }) });
    await waitFor(() => {
      expect(screen.getByTestId("email-success")).toBeInTheDocument();
    });
  });

  it("includes privacy notice text", () => {
    render(<EmailCapture sourcePage="landing" />);
    expect(
      screen.getByText(/No spam\. Unsubscribe anytime\./)
    ).toBeInTheDocument();
  });

  it("passes source_page to the API", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<EmailCapture sourcePage="grief-counseling" />);
    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "user@test.com" },
    });
    fireEvent.click(screen.getByTestId("email-submit"));

    await waitFor(() => {
      expect(screen.getByTestId("email-success")).toBeInTheDocument();
    });

    expect(mockFetch).toHaveBeenCalledWith(
      "/api/email/subscribe",
      expect.objectContaining({
        body: JSON.stringify({
          email: "user@test.com",
          source_page: "grief-counseling",
        }),
      })
    );
  });
});
