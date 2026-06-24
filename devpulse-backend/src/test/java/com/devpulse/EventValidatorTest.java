package com.devpulse;

import static org.assertj.core.api.Assertions.assertThat;

import com.devpulse.ingestion.EventRequest;
import com.devpulse.ingestion.EventValidator;
import java.time.Instant;
import org.junit.jupiter.api.Test;

class EventValidatorTest {
  @Test
  void acceptsValidActivityEvent() {
    EventRequest request = new EventRequest(null, "s1", "file_edit", Instant.now(), "repo", "main", "a.ts", "typescript");
    assertThat(new EventValidator().validate(request)).isEmpty();
  }
}
