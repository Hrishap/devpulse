"use client";

import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "@/components/ui/Card";
import type { HourSwitch } from "@/types/dashboard";
import { formatHour } from "@/lib/formatters";

export function ContextSwitchChart({ data }: { data: HourSwitch[] }) {
  const workingHours = data.filter((item) => item.hour >= 9 && item.hour <= 18).map((item) => ({ ...item, label: formatHour(item.hour) }));
  return (
    <Card className="col-span-12 md:col-span-6">
      <h2 className="mb-4 text-lg font-semibold">Context Switches</h2>
      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={workingHours} layout="vertical" margin={{ left: 10 }}>
            <CartesianGrid stroke="#241F3A" horizontal={false} />
            <XAxis type="number" stroke="#5E5880" domain={[0, 10]} />
            <YAxis type="category" dataKey="label" stroke="#5E5880" width={42} />
            <Tooltip contentStyle={{ background: "rgba(26, 23, 48, 0.9)", border: "1px solid rgba(232, 224, 253, 0.2)", color: "#F8F7FF", backdropFilter: "blur(8px)" }} formatter={(value) => [`${value} switches`, ""]} />
            <Bar dataKey="switches" radius={[0, 4, 4, 0]}>
              {workingHours.map((item) => <Cell key={item.hour} fill={item.switches > 3 ? "#F59E0B" : "#CBB8F9"} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
