"use client";

const KEY = "devpulse.apiKey";

export function getApiKey(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(KEY);
}

export function setApiKey(value: string): void {
  window.localStorage.setItem(KEY, value);
}

export function clearApiKey(): void {
  window.localStorage.removeItem(KEY);
}
