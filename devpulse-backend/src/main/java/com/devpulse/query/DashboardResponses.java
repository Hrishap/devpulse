package com.devpulse.query;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

public final class DashboardResponses {
  private DashboardResponses() {}

  public record FlowBlock(int slot, String state, String repo) {}
  public record RepoStat(int rank, String repo, long timeMs, String language, int flowPercent) {}
  public record HourSwitch(int hour, int switches) {}
  public record TodayDashboard(
    LocalDate day,
    int flowScore,
    int delta,
    int streak,
    long totalActiveMs,
    Instant lastSyncedAt,
    List<Integer> sparkline,
    List<FlowBlock> timeline,
    List<HourSwitch> contextSwitches,
    List<RepoStat> topRepos
  ) {}
  public record WeeklyDay(LocalDate day, int flowScore, long totalActiveMs) {}
  public record BestHourCell(int day, int hour, int flowMinutes) {}
  public record WeeklySummary(
    List<WeeklyDay> days,
    List<BestHourCell> bestHours,
    long totalFlowMs,
    String bestDay,
    int worstSwitches,
    String insight,
    List<RepoStat> topRepos
  ) {}
}
