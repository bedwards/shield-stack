/**
 * Custom hook for localStorage persistence.
 *
 * Provides a useState-like API that automatically persists
 * values to localStorage. Supports SSR by falling back to
 * the initial value when window is not available.
 */

import { useState, useEffect, useCallback, useRef } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const removedRef = useRef(false);

  // Initialize from localStorage or fall back to initial value.
  // Use a function initializer to avoid reading localStorage on every render.
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // Persist to localStorage whenever the value changes
  useEffect(() => {
    if (typeof window === "undefined" || removedRef.current) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      // Quota exceeded or other localStorage error — fail silently
    }
  }, [key, storedValue]);

  // Setter that accepts a value or updater function
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      removedRef.current = false;
      setStoredValue((prev) => {
        const nextValue =
          value instanceof Function ? value(prev) : value;
        return nextValue;
      });
    },
    [],
  );

  // Remove the key from localStorage
  const removeValue = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      removedRef.current = true;
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch {
      // fail silently
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}
