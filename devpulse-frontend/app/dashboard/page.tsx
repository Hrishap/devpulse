"use client";

import { ContextSwitchChart } from "@/components/dashboard/ContextSwitchChart";
import { FlowScoreCard } from "@/components/dashboard/FlowScoreCard";
import { FlowTimeline } from "@/components/dashboard/FlowTimeline";
import { StatCard } from "@/components/dashboard/StatCard";
import { TopReposTable } from "@/components/dashboard/TopReposTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { Skeleton } from "@/components/ui/Skeleton";
import { useTodayDashboard } from "@/hooks/useTodayDashboard";
import { formatDuration } from "@/lib/formatters";

export default function DashboardPage() {
  const { data, error, isLoading, mutate } = useTodayDashboard();
  if (isLoading) {
    return (
      <>
        <Skeleton className="col-span-12 h-40 md:col-span-4" />
        <Skeleton className="col-span-12 h-40 md:col-span-2" />
        <Skeleton className="col-span-12 h-40 md:col-span-2" />
        <Skeleton className="col-span-12 h-36" />
        <Skeleton className="col-span-12 h-80 md:col-span-6" />
        <Skeleton className="col-span-12 h-80 md:col-span-6" />
      </>
    );
  }
  if (error) {
    return (
      <div className="col-span-12 rounded-lg border border-danger/30 bg-surface p-5 text-sm text-text-2">
        Couldn&apos;t load dashboard data.
        <button className="ml-3 text-brand-light" onClick={() => mutate()}>Retry</button>
      </div>
    );
  }
  if (!data || data.totalActiveMs === 0) {
    return <div className="col-span-12"><EmptyState /></div>;
  }
  return (
    <>
      <FlowScoreCard score={data.flowScore} delta={data.delta} sparkline={data.sparkline} />
      <StatCard label="Streak" value={`${data.streak}d`} />
      <StatCard label="Flow time" value={formatDuration(data.totalActiveMs)} />
      <FlowTimeline blocks={data.timeline} />
      <ContextSwitchChart data={data.contextSwitches} />
      <TopReposTable repos={data.topRepos} />
    </>
  );
}
