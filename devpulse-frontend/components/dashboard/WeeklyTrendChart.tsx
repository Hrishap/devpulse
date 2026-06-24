"use client";

import { Bar, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "@/components/ui/Card";
import { formatDuration } from "@/lib/formatters";
import type { WeeklyDay } from "@/types/dashboard";

export function WeeklyTrendChart({ days }: { days: WeeklyDay[] }) {
  const data = days.map((day) => ({
    label: new Date(day.day).toLocaleDateString(undefined, { weekday: "short" }),
    score: day.flowScore,
    hours: Math.round(day.totalActiveMs / 36_000) / 100
  }));
  return (
    <Card className="col-span-12">
      <h2 className="mb-4 text-lg font-semibold">Weekly Trend</h2>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <CartesianGrid stroke="#241F3A" />
            <XAxis dataKey="label" stroke="#5E5880" />
            <YAxis yAxisId="left" stroke="#5E5880" />
            <YAxis yAxisId="right" orientation="right" stroke="#5E5880" />
            <Tooltip
              contentStyle={{ background: "#1A1730", border: "1px solid #D4CCF033", color: "#F0EEFF" }}
              formatter={(value, name) => name === "hours" ? [formatDuration(Number(value) * 3_600_000), "Active time"] : [value, "Flow score"]}
            />
            <Bar yAxisId="right" dataKey="hours" fill="#7B5EA7" radius={[4, 4, 0, 0]} />
            <Line yAxisId="left" dataKey="score" stroke="#582CDB" strokeWidth={2} dot />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
