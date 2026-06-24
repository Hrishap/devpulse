"use client";

import { BestHoursHeatmap } from "@/components/dashboard/BestHoursHeatmap";
import { TopReposTable } from "@/components/dashboard/TopReposTable";
import { WeeklyTrendChart } from "@/components/dashboard/WeeklyTrendChart";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { useWeeklySummary } from "@/hooks/useWeeklySummary";
import { formatDuration } from "@/lib/formatters";

export default function WeeklyPage() {
  const { data, error, isLoading, mutate } = useWeeklySummary();
  if (isLoading) {
    return <Skeleton className="col-span-12 h-[520px]" />;
  }
  if (error || !data) {
    return (
      <div className="col-span-12 rounded-lg border border-danger/30 bg-surface p-5 text-sm text-text-2">
        Couldn&apos;t load weekly data.
        <button className="ml-3 text-brand-light" onClick={() => mutate()}>Retry</button>
      </div>
    );
  }
  return (
    <>
      <WeeklyTrendChart days={data.days} />
      <Card className="col-span-12 grid gap-4 md:grid-cols-3">
        <div><div className="text-xs uppercase tracking-[0.1em] text-text-2">Total flow</div><div className="mt-2 font-mono text-3xl">{formatDuration(data.totalFlowMs)}</div></div>
        <div><div className="text-xs uppercase tracking-[0.1em] text-text-2">Best day</div><div className="mt-2 font-mono text-3xl">{data.bestDay || "-"}</div></div>
        <div><div className="text-xs uppercase tracking-[0.1em] text-text-2">Worst switches</div><div className="mt-2 font-mono text-3xl">{data.worstSwitches}</div></div>
      </Card>
      <BestHoursHeatmap cells={data.bestHours} />
      <Card className="col-span-12"><h2 className="mb-2 text-lg font-semibold">This Week&apos;s Insight</h2><p className="text-sm text-text-2">{data.insight}</p></Card>
      <TopReposTable repos={data.topRepos} />
    </>
  );
}
