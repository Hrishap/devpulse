"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, CalendarDays, Gauge, Settings } from "lucide-react";
import { cn } from "@/lib/cn";

const nav = [
  { href: "/dashboard", label: "Today", icon: Gauge },
  { href: "/dashboard/weekly", label: "Weekly", icon: CalendarDays },
  { href: "/dashboard/settings", label: "Settings", icon: Settings }
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-[220px] flex-col border-r border-brand-pale/10 bg-surface/40 backdrop-blur-xl px-4 py-5 md:flex shadow-[4px_0_24px_rgba(0,0,0,0.2)]">
      <div className="mb-8 flex items-center gap-3">
        <div className="grid size-9 place-items-center rounded-lg bg-gradient-to-br from-brand to-active shadow-glow">
          <BarChart3 size={20} className="text-white" />
        </div>
        <div>
          <div className="font-semibold text-text-1">DevPulse</div>
          <div className="text-xs text-text-3">Developer intelligence</div>
        </div>
      </div>
      <nav className="flex flex-1 flex-col gap-1">
        {nav.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn("flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-all duration-300", active ? "bg-brand/20 text-text-1 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]" : "text-text-2 hover:bg-surface-2 hover:text-text-1 hover:translate-x-1")}
            >
              <Icon size={17} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-brand-pale/10 pt-4 text-sm text-text-2">
        <div className="font-medium text-text-1">Hrishap</div>
        <div className="text-xs text-text-3">Local workspace</div>
      </div>
    </aside>
  );
}
