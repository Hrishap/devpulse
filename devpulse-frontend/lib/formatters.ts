import { formatDistanceToNowStrict, parseISO } from "date-fns";

export function formatDuration(ms: number): string {
  const minutes = Math.floor(ms / 60_000);
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (hours === 0) return `${rest}m`;
  return `${hours}h ${rest}m`;
}

export function formatFlowDelta(delta: number): string {
  if (delta > 0) return `up ${delta}`;
  if (delta < 0) return `down ${Math.abs(delta)}`;
  return "no change";
}

export function formatHour(hour: number): string {
  if (hour === 0) return "12am";
  if (hour < 12) return `${hour}am`;
  if (hour === 12) return "12pm";
  return `${hour - 12}pm`;
}

export function formatLastSynced(value?: string | null): string {
  if (!value) return "No sync yet";
  return `Last synced ${formatDistanceToNowStrict(parseISO(value), { addSuffix: true })}`;
}
