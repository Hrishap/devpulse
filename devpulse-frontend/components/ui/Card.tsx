import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <section 
      className={cn(
        "rounded-xl border border-brand-pale/10 bg-surface/40 p-5 shadow-card backdrop-blur-md transition-all duration-300 hover:border-brand-pale/30 hover:shadow-glow",
        className
      )} 
      {...props} 
    />
  );
}
