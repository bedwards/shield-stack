import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "./useLocalStorage";

describe("useLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns the initial value when localStorage is empty", () => {
    const { result } = renderHook(() =>
      useLocalStorage("test-key", "default"),
    );
    expect(result.current[0]).toBe("default");
  });

  it("returns the stored value from localStorage", () => {
    localStorage.setItem("test-key", JSON.stringify("stored-value"));
    const { result } = renderHook(() =>
      useLocalStorage("test-key", "default"),
    );
    expect(result.current[0]).toBe("stored-value");
  });

  it("persists value to localStorage when updated", () => {
    const { result } = renderHook(() =>
      useLocalStorage("test-key", "initial"),
    );

    act(() => {
      result.current[1]("updated");
    });

    expect(result.current[0]).toBe("updated");
    expect(JSON.parse(localStorage.getItem("test-key")!)).toBe("updated");
  });

  it("supports updater function", () => {
    const { result } = renderHook(() =>
      useLocalStorage("test-counter", 0),
    );

    act(() => {
      result.current[1]((prev) => prev + 1);
    });

    expect(result.current[0]).toBe(1);
  });

  it("removes value from localStorage", () => {
    localStorage.setItem("test-key", JSON.stringify("value"));
    const { result } = renderHook(() =>
      useLocalStorage("test-key", "default"),
    );

    act(() => {
      result.current[2](); // removeValue
    });

    expect(result.current[0]).toBe("default");
    expect(localStorage.getItem("test-key")).toBeNull();
  });

  it("handles object values", () => {
    const initialObj = { name: "test", count: 0 };
    const { result } = renderHook(() =>
      useLocalStorage("test-obj", initialObj),
    );

    act(() => {
      result.current[1]({ name: "updated", count: 1 });
    });

    expect(result.current[0]).toEqual({ name: "updated", count: 1 });
  });

  it("handles array values", () => {
    const { result } = renderHook(() =>
      useLocalStorage<string[]>("test-arr", []),
    );

    act(() => {
      result.current[1]((prev) => [...prev, "item1"]);
    });

    expect(result.current[0]).toEqual(["item1"]);
  });

  it("handles invalid JSON in localStorage gracefully", () => {
    localStorage.setItem("test-key", "not-valid-json{");
    const { result } = renderHook(() =>
      useLocalStorage("test-key", "fallback"),
    );
    expect(result.current[0]).toBe("fallback");
  });
});
