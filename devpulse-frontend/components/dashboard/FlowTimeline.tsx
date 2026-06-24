"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/Card";
import type { FlowBlock } from "@/types/dashboard";
import { formatHour } from "@/lib/formatters";

const fill: Record<string, string> = {
  flow: "#7A4CF6",
  active: "#9B72F7",
  idle: "#31284A",
  none: "transparent"
};

export function FlowTimeline({ blocks }: { blocks: FlowBlock[] }) {
  const [hovered, setHovered] = useState<FlowBlock | null>(null);
  const normalized = useMemo(() => blocks.length ? blocks : Array.from({ length: 96 }, (_, slot) => ({ slot, state: "none" as const })), [blocks]);
  return (
    <Card className="col-span-12">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Flow Timeline</h2>
        <div className="h-5 text-xs text-text-2">{hovered ? `${formatHour(Math.floor(hovered.slot / 4))}: ${hovered.state}${hovered.repo ? ` (${hovered.repo})` : ""}` : "15-minute slots"}</div>
      </div>
      <svg viewBox="0 0 960 74" className="h-20 w-full overflow-visible" role="img" aria-label="Daily flow timeline">
        {normalized.map((block) => (
          <rect
            key={block.slot}
            x={block.slot * 10}
            y={0}
            width={10}
            height={42}
            rx={block.state === "flow" ? 2 : 0}
            fill={fill[block.state]}
            stroke={block.state === "none" ? "#241F3A" : "transparent"}
            onMouseEnter={() => setHovered(block)}
            onMouseLeave={() => setHovered(null)}
          />
        ))}
        {[0, 3, 6, 9, 12, 15, 18, 21].map((hour) => (
          <text key={hour} x={hour * 40} y={66} fill="#5E5880" fontSize="10" fontFamily="monospace">
            {formatHour(hour)}
          </text>
        ))}
      </svg>
    </Card>
  );
}
