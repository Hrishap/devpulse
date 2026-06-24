"use client";

import { format } from "date-fns";
import { RefreshCw } from "lucide-react";
import { useTodayDashboard } from "@/hooks/useTodayDashboard";
import { formatLastSynced } from "@/lib/formatters";

export function Topbar() {
  const { data, mutate } = useTodayDashboard();
  const lastSyncedAt = data?.lastSyncedAt;
  return (
    <header className="sticky top-0 z-10 flex min-h-16 items-center justify-between border-b border-brand-pale/10 bg-surface/40 px-4 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.2)] md:px-8">
      <div>
        <h1 className="text-2xl font-semibold text-text-1">Today</h1>
        <p className="text-xs text-text-2">{format(new Date(), "EEEE, MMM d")}</p>
      </div>
      <button
        className="inline-flex h-9 items-center gap-2 rounded-full border border-brand-pale/20 bg-surface/50 px-4 text-xs font-medium text-text-2 transition-all hover:bg-surface-2 hover:border-brand-pale/40 hover:shadow-[0_0_10px_rgba(122,76,246,0.2)]"
        onClick={() => mutate()}
      >
        <RefreshCw size={15} />
        <span className={lastSyncedAt ? "text-text-2" : "text-warning"}>{formatLastSynced(lastSyncedAt)}</span>
      </button>
    </header>
  );
}
