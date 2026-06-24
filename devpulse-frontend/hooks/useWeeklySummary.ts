"use client";

import useSWR from "swr";
import { apiFetch } from "@/lib/api";
import type { WeeklySummary } from "@/types/dashboard";

export function useWeeklySummary() {
  return useSWR<WeeklySummary>("/api/dashboard/weekly", apiFetch, { refreshInterval: 300_000 });
}
