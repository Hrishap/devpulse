package com.devpulse.query;

import com.devpulse.aggregation.FlowDetector;
import com.devpulse.aggregation.FlowSession;
import com.devpulse.model.RawEvent;
import com.devpulse.model.User;
import com.devpulse.query.DashboardResponses.BestHourCell;
import com.devpulse.query.DashboardResponses.FlowBlock;
import com.devpulse.query.DashboardResponses.HourSwitch;
import com.devpulse.query.DashboardResponses.RepoStat;
import com.devpulse.query.DashboardResponses.TodayDashboard;
import com.devpulse.query.DashboardResponses.WeeklyDay;
import com.devpulse.query.DashboardResponses.WeeklySummary;
import com.devpulse.repository.RawEventRepository;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.IntStream;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {
  private final RawEventRepository rawEvents;
  private final FlowDetector flowDetector = new FlowDetector();

  public DashboardService(RawEventRepository rawEvents) {
    this.rawEvents = rawEvents;
  }

  public TodayDashboard today(User user) {
    LocalDate today = LocalDate.now(ZoneOffset.UTC);
    DayStats stats = statsFor(user, today);
    DayStats yesterday = statsFor(user, today.minusDays(1));
    return new TodayDashboard(
      today,
      stats.flowScore(),
      stats.flowScore() - yesterday.flowScore(),
      stats.flowScore() > 0 ? 1 : 0,
      stats.totalActiveMs(),
      stats.events().stream().map(RawEvent::getCreatedAt).max(Comparator.naturalOrder()).orElse(null),
      lastSevenScores(user),
      timeline(stats),
      contextSwitches(stats),
      topRepos(stats)
    );
  }

  public WeeklySummary weekly(User user) {
    LocalDate today = LocalDate.now(ZoneOffset.UTC);
    List<WeeklyDay> days = new ArrayList<>();
    List<BestHourCell> heatmap = new ArrayList<>();
    long total = 0;
    int worstSwitches = 0;
    String bestDay = "";
    int bestScore = -1;
    Map<String, Long> repoTotals = new HashMap<>();
    for (int i = 6; i >= 0; i--) {
      LocalDate day = today.minusDays(i);
      DayStats stats = statsFor(user, day);
      days.add(new WeeklyDay(day, stats.flowScore(), stats.totalActiveMs()));
      total += stats.totalActiveMs();
      if (stats.flowScore() > bestScore) {
        bestScore = stats.flowScore();
        bestDay = day.getDayOfWeek().toString();
      }
      worstSwitches = Math.max(worstSwitches, countSwitches(stats));
      stats.flowSessions().forEach(session -> {
        int hour = session.startTime().atZone(ZoneOffset.UTC).getHour();
        heatmap.add(new BestHourCell(day.getDayOfWeek().getValue() - 1, hour, (int) (session.durationMs() / 60_000)));
      });
      topRepos(stats).forEach(repo -> repoTotals.merge(repo.repo(), repo.timeMs(), Long::sum));
    }
    long finalTotal = total;
    List<RepoStat> repos = repoTotals.entrySet().stream()
      .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
      .limit(5)
      .map(entry -> new RepoStat(0, entry.getKey(), entry.getValue(), "Mixed", finalTotal == 0 ? 0 : (int) (entry.getValue() * 100 / finalTotal)))
      .toList();
    return new WeeklySummary(days, heatmap, total, bestDay, worstSwitches, insight(total, worstSwitches, bestDay), repos);
  }

  private DayStats statsFor(User user, LocalDate day) {
    Instant start = day.atStartOfDay().toInstant(ZoneOffset.UTC);
    Instant end = day.plusDays(1).atStartOfDay().toInstant(ZoneOffset.UTC);
    List<RawEvent> events = rawEvents.findByUserIdAndTimestampBetweenOrderByTimestampAsc(user.getId(), start, end);
    List<FlowSession> sessions = flowDetector.detect(events);
    long activeMs = sessions.stream().mapToLong(FlowSession::durationMs).sum();
    int switchCount = countRepoSwitches(events);
    int score = Math.min(100, (int) (activeMs / 60_000 / 3) + Math.max(0, 30 - switchCount * 3));
    return new DayStats(day, events, sessions, activeMs, score);
  }

  private List<Integer> lastSevenScores(User user) {
    LocalDate today = LocalDate.now(ZoneOffset.UTC);
    return IntStream.rangeClosed(6, 0).mapToObj(i -> statsFor(user, today.minusDays(i)).flowScore()).toList();
  }

  private List<FlowBlock> timeline(DayStats stats) {
    List<FlowBlock> blocks = new ArrayList<>();
    for (int slot = 0; slot < 96; slot++) {
      int hour = slot / 4;
      boolean active = stats.events().stream().anyMatch(e -> e.getTimestamp().atZone(ZoneOffset.UTC).getHour() == hour);
      FlowSession flow = stats.flowSessions().stream()
        .filter(s -> s.startTime().atZone(ZoneOffset.UTC).getHour() <= hour && s.endTime().atZone(ZoneOffset.UTC).getHour() >= hour)
        .findFirst().orElse(null);
      blocks.add(new FlowBlock(slot, flow != null ? "flow" : active ? "active" : "none", flow == null ? null : flow.repo()));
    }
    return blocks;
  }

  private List<HourSwitch> contextSwitches(DayStats stats) {
    return IntStream.range(0, 24)
      .mapToObj(hour -> new HourSwitch(hour, (int) stats.events().stream()
        .filter(e -> "file_switch".equals(e.getEventType()) && e.getTimestamp().atZone(ZoneOffset.UTC).getHour() == hour)
        .count()))
      .toList();
  }

  private List<RepoStat> topRepos(DayStats stats) {
    Map<String, Long> totals = new HashMap<>();
    Map<String, String> languages = new HashMap<>();
    stats.flowSessions().forEach(session -> totals.merge(session.repo() == null ? "unknown" : session.repo(), session.durationMs(), Long::sum));
    stats.events().forEach(event -> {
      if (event.getRepo() != null && event.getLanguage() != null) {
        languages.putIfAbsent(event.getRepo(), event.getLanguage());
      }
    });
    long total = Math.max(1, stats.totalActiveMs());
    int[] rank = {1};
    return totals.entrySet().stream()
      .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
      .limit(5)
      .map(entry -> new RepoStat(rank[0]++, entry.getKey(), entry.getValue(), languages.getOrDefault(entry.getKey(), "Mixed"), (int) (entry.getValue() * 100 / total)))
      .toList();
  }

  private int countSwitches(DayStats stats) {
    return contextSwitches(stats).stream().mapToInt(HourSwitch::switches).sum();
  }

  private int countRepoSwitches(List<RawEvent> events) {
    int switches = 0;
    String previous = null;
    for (RawEvent event : events) {
      if (event.getRepo() != null && previous != null && !previous.equals(event.getRepo())) {
        switches++;
      }
      if (event.getRepo() != null) {
        previous = event.getRepo();
      }
    }
    return switches;
  }

  private String insight(long total, int switches, String bestDay) {
    if (total == 0) {
      return "No flow sessions were detected this week. Open VS Code with the extension enabled to start collecting activity.";
    }
    if (switches > 12) {
      return "Context switching was the largest drag this week. Protect your strongest block on " + bestDay + " and batch shallow work outside it.";
    }
    return "Your strongest focus window clustered around " + bestDay + ". Keep that block clear next week to preserve momentum.";
  }

  private record DayStats(LocalDate day, List<RawEvent> events, List<FlowSession> flowSessions, long totalActiveMs, int flowScore) {}
}
