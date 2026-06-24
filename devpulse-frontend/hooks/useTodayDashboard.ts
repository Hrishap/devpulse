"use client";

import useSWR from "swr";
import { apiFetch } from "@/lib/api";
import type { TodayDashboard } from "@/types/dashboard";

export function useTodayDashboard() {
  return useSWR<TodayDashboard>("/api/dashboard/today", apiFetch, { refreshInterval: 60_000 });
}
