export interface FlowBlock {
  slot: number;
  state: "flow" | "active" | "idle" | "none";
  repo?: string | null;
}

export interface RepoStat {
  rank: number;
  repo: string;
  timeMs: number;
  language: string;
  flowPercent: number;
}

export interface HourSwitch {
  hour: number;
  switches: number;
}

export interface TodayDashboard {
  day: string;
  flowScore: number;
  delta: number;
  streak: number;
  totalActiveMs: number;
  lastSyncedAt?: string | null;
  sparkline: number[];
  timeline: FlowBlock[];
  contextSwitches: HourSwitch[];
  topRepos: RepoStat[];
}

export interface WeeklyDay {
  day: string;
  flowScore: number;
  totalActiveMs: number;
}

export interface BestHourCell {
  day: number;
  hour: number;
  flowMinutes: number;
}

export interface WeeklySummary {
  days: WeeklyDay[];
  bestHours: BestHourCell[];
  totalFlowMs: number;
  bestDay: string;
  worstSwitches: number;
  insight: string;
  topRepos: RepoStat[];
}
