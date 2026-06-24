import { cn } from "@/lib/cn";

const languageColor: Record<string, string> = {
  typescript: "border-blue-400/40 text-blue-200",
  javascript: "border-blue-400/40 text-blue-200",
  java: "border-orange-400/40 text-orange-200",
  python: "border-green-400/40 text-green-200",
  cpp: "border-purple-400/40 text-purple-200"
};

const languageLabel: Record<string, string> = {
  cpp: "C++",
  typescript: "TypeScript",
  javascript: "JavaScript",
  java: "Java",
  python: "Python"
};

export function Badge({ children }: { children: string }) {
  const key = children.toLowerCase();
  const label = languageLabel[key] || children;
  return (
    <span className={cn("rounded-full border bg-surface-2 px-2 py-1 text-xs font-medium text-text-2", languageColor[key] || "border-brand-pale/20")}>
      {label}
    </span>
  );
}
