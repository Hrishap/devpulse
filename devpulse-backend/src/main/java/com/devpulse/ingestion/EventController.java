package com.devpulse.ingestion;

import com.devpulse.model.User;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/events")
public class EventController {
  private final EventService events;

  public EventController(EventService events) {
    this.events = events;
  }

  @PostMapping("/batch")
  public ResponseEntity<EventService.IngestionResult> batch(
      @AuthenticationPrincipal User user,
      @RequestBody List<EventRequest> requests) {
    EventService.IngestionResult result = events.ingest(user, requests);
    HttpStatus status = result.errors().isEmpty() ? HttpStatus.ACCEPTED : HttpStatus.BAD_REQUEST;
    return ResponseEntity.status(status).body(result);
  }
}
