package com.devpulse.ingestion;

import com.devpulse.model.RawEvent;
import com.devpulse.model.User;
import com.devpulse.repository.RawEventRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EventService {
  private final EventValidator validator;
  private final EventPublisher publisher;
  private final RawEventRepository rawEvents;

  public EventService(EventValidator validator, EventPublisher publisher, RawEventRepository rawEvents) {
    this.validator = validator;
    this.publisher = publisher;
    this.rawEvents = rawEvents;
  }

  @Transactional
  public IngestionResult ingest(User user, List<EventRequest> requests) {
    if (requests.size() > 100) {
      return new IngestionResult(0, List.of("Batch limit is 100 events"));
    }
    List<String> errors = new ArrayList<>();
    int accepted = 0;
    for (int i = 0; i < requests.size(); i++) {
      EventRequest request = requests.get(i);
      List<String> eventErrors = validator.validate(request);
      if (!eventErrors.isEmpty()) {
        errors.add("event[" + i + "]: " + String.join(", ", eventErrors));
        continue;
      }
      if (rawEvents.existsByUserIdAndSessionIdAndTimestampAndEventType(user.getId(), request.sessionId(), request.timestamp(), request.eventType())) {
        continue;
      }
      publisher.publish(toRawEvent(user.getId(), request));
      accepted++;
    }
    return new IngestionResult(accepted, errors);
  }

  private RawEvent toRawEvent(UUID userId, EventRequest request) {
    RawEvent event = new RawEvent();
    event.setId(request.id() == null ? UUID.randomUUID() : request.id());
    event.setUserId(userId);
    event.setSessionId(request.sessionId());
    event.setEventType(request.eventType());
    event.setTimestamp(request.timestamp());
    event.setRepo(blankToNull(request.repo()));
    event.setBranch(blankToNull(request.branch()));
    event.setFilename(blankToNull(request.filename()));
    event.setLanguage(blankToNull(request.language()));
    return event;
  }

  private String blankToNull(String value) {
    return value == null || value.isBlank() ? null : value;
  }

  public record IngestionResult(int accepted, List<String> errors) {}
}
