package com.devpulse;

import static org.assertj.core.api.Assertions.assertThat;

import com.devpulse.aggregation.FlowDetector;
import com.devpulse.model.RawEvent;
import java.time.Instant;
import java.util.List;
import org.junit.jupiter.api.Test;

class FlowDetectorTest {
  @Test
  void detectsSustainedSession() {
    Instant start = Instant.parse("2026-06-13T09:00:00Z");
    RawEvent a = event(start, "devpulse-backend");
    RawEvent b = event(start.plusSeconds(360), "devpulse-backend");
    assertThat(new FlowDetector().detect(List.of(a, b))).hasSize(1);
  }

  private RawEvent event(Instant ts, String repo) {
    RawEvent event = new RawEvent();
    event.setSessionId("s1");
    event.setEventType("file_edit");
    event.setTimestamp(ts);
    event.setRepo(repo);
    return event;
  }
}
