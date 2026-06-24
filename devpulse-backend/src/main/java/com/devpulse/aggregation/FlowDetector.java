package com.devpulse.aggregation;

import com.devpulse.model.RawEvent;
import java.time.Duration;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class FlowDetector {
  public static final long IDLE_BREAK_MS = 120_000;
  public static final long MIN_FLOW_MS = 10_000; // Reduced to 10 seconds for testing

  public List<FlowSession> detect(List<RawEvent> events) {
    List<RawEvent> ordered = events.stream()
      .filter(event -> !"idle_start".equals(event.getEventType()) && !"session_end".equals(event.getEventType()))
      .sorted(Comparator.comparing(RawEvent::getTimestamp))
      .toList();
    List<FlowSession> sessions = new ArrayList<>();
    if (ordered.isEmpty()) {
      return sessions;
    }
    RawEvent start = ordered.get(0);
    RawEvent previous = start;
    int count = 1;
    for (int i = 1; i < ordered.size(); i++) {
      RawEvent current = ordered.get(i);
      long gap = Duration.between(previous.getTimestamp(), current.getTimestamp()).toMillis();
      boolean repoSwitch = previous.getRepo() != null && current.getRepo() != null && !previous.getRepo().equals(current.getRepo());
      if (gap > IDLE_BREAK_MS || repoSwitch) {
        addIfFlow(sessions, start, previous, count);
        start = current;
        count = 1;
      } else {
        count++;
      }
      previous = current;
    }
    addIfFlow(sessions, start, previous, count);
    return sessions;
  }

  private void addIfFlow(List<FlowSession> sessions, RawEvent start, RawEvent end, int count) {
    long duration = Math.max(0, Duration.between(start.getTimestamp(), end.getTimestamp()).toMillis());
    if (duration >= MIN_FLOW_MS) {
      sessions.add(new FlowSession(start.getTimestamp(), end.getTimestamp(), start.getRepo(), count, duration));
    }
  }
}
