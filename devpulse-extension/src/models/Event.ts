export type EventType =
  | "session_start"
  | "session_end"
  | "file_open"
  | "file_edit"
  | "file_switch"
  | "git_branch"
  | "idle_start"
  | "idle_end";

export interface DevPulseEvent {
  id: string;
  sessionId: string;
  eventType: EventType;
  timestamp: string;
  repo?: string;
  branch?: string;
  filename?: string;
  language?: string;
  metadata?: Record<string, string | number | boolean>;
}
