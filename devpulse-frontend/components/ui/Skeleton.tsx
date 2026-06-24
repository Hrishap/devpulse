import { cn } from "@/lib/cn";

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("motion-safe-pulse rounded-md bg-surface-2", className)} />;
}
