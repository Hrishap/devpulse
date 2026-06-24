"use client";

import { Line, LineChart, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/Card";
import { formatFlowDelta } from "@/lib/formatters";

export function FlowScoreCard({ score, delta, sparkline }: { score: number; delta: number; sparkline: number[] }) {
  const trend = sparkline.map((value, index) => ({ index, value }));
  return (
    <Card className="col-span-12 h-40 md:col-span-4 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-brand/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative z-10 mb-2 text-xs font-semibold uppercase tracking-[0.1em] text-brand-light">Flow score today</div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="font-mono text-6xl font-bold leading-none text-text-1">{score}</div>
          <div className={delta > 0 ? "mt-2 text-sm text-success" : delta < 0 ? "mt-2 text-sm text-danger" : "mt-2 text-sm text-text-2"}>
            {formatFlowDelta(delta)}
          </div>
        </div>
        <div className="h-12 min-w-28 flex-1 transition-transform duration-500 group-hover:scale-105">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trend}>
              <Line 
                dataKey="value" 
                type="monotone" 
                stroke="var(--color-brand)" 
                strokeWidth={3} 
                dot={false}
                style={{ filter: "drop-shadow(0 0 4px rgba(122, 76, 246, 0.5))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}
