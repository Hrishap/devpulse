import { Fragment } from "react";
import { Card } from "@/components/ui/Card";
import { formatHour } from "@/lib/formatters";
import type { BestHourCell } from "@/types/dashboard";

export function BestHoursHeatmap({ cells }: { cells: BestHourCell[] }) {
  const max = Math.max(1, ...cells.map((cell) => cell.flowMinutes));
  const byKey = new Map(cells.map((cell) => [`${cell.day}:${cell.hour}`, cell.flowMinutes]));
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <Card className="col-span-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
      <h2 className="mb-4 text-lg font-semibold relative z-10">Best Hours</h2>
      <div className="overflow-x-auto">
        <div className="grid min-w-[760px] grid-cols-[44px_repeat(24,28px)] gap-0.5">
          <div />
          {Array.from({ length: 24 }, (_, hour) => (
            <div key={hour} className="h-5 text-center font-mono text-[10px] text-text-3">
              {[0, 6, 12, 18].includes(hour) ? formatHour(hour) : ""}
            </div>
          ))}
          {days.map((day, dayIndex) => (
            <Fragment key={day}>
              <div key={`${day}-label`} className="flex h-7 items-center text-xs text-brand-light font-medium">{day}</div>
              {Array.from({ length: 24 }, (_, hour) => {
                const value = byKey.get(`${dayIndex}:${hour}`) || 0;
                return (
                  <div
                    key={`${day}-${hour}`}
                    className="size-7 rounded border border-brand-pale/10 bg-gradient-to-br from-brand to-active transition-transform hover:scale-110 hover:z-10 hover:shadow-glow"
                    title={`${day} ${formatHour(hour)}: ${value} flow minutes`}
                    style={{ opacity: value === 0 ? 0.05 : Math.max(0.15, value / max) }}
                  />
                );
              })}
            </Fragment>
          ))}
        </div>
      </div>
    </Card>
  );
}
