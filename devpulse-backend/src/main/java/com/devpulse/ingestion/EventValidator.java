package com.devpulse.ingestion;

import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class EventValidator {
  private static final List<String> TYPES = List.of(
    "session_start", "session_end", "file_open", "file_edit", "file_switch",
    "git_branch", "idle_start", "idle_end"
  );

  public List<String> validate(EventRequest event) {
    List<String> errors = new ArrayList<>();
    if (event.sessionId() == null || event.sessionId().isBlank()) {
      errors.add("sessionId is required");
    }
    if (event.eventType() == null || !TYPES.contains(event.eventType())) {
      errors.add("eventType is invalid");
    }
    if (event.timestamp() == null) {
      errors.add("timestamp is required");
    } else {
      Instant now = Instant.now();
      if (event.timestamp().isBefore(now.minus(Duration.ofHours(24))) || event.timestamp().isAfter(now.plus(Duration.ofMinutes(5)))) {
        errors.add("timestamp must be within the last 24 hours");
      }
    }
    boolean repoScoped = event.eventType() != null && (event.eventType().startsWith("file_") || "git_branch".equals(event.eventType()));
    if ((event.repo() == null || event.repo().isBlank()) && repoScoped) {
      errors.add("repo is required for activity events");
    }
    return errors;
  }
}
