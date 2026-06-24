import { Card } from "@/components/ui/Card";

export function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card className="col-span-12 h-40 md:col-span-2 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-tr from-brand/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative z-10 text-xs font-semibold uppercase tracking-[0.1em] text-brand-light">{label}</div>
      <div className="relative z-10 mt-8 font-mono text-4xl font-bold bg-gradient-to-r from-text-1 to-brand-pale bg-clip-text text-transparent group-hover:animate-pulse-slow">{value}</div>
    </Card>
  );
}
