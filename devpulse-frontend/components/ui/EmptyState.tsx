import Link from "next/link";
import { Card } from "./Card";

export function EmptyState() {
  return (
    <Card className="flex min-h-40 flex-col justify-center gap-2">
      <h2 className="font-mono text-3xl font-bold text-text-1">Nothing tracked yet today.</h2>
      <p className="max-w-xl text-sm text-text-2">Make sure the extension is active in VS Code and the API key matches this dashboard.</p>
      <Link className="text-sm font-medium text-brand-light" href="/dashboard/settings">Open settings</Link>
    </Card>
  );
}
