package com.devpulse.ingestion;

import com.devpulse.model.RawEvent;
import com.devpulse.repository.RawEventRepository;
import org.springframework.stereotype.Component;

@Component
public class EventPublisher {
  private final RawEventRepository rawEvents;

  public EventPublisher(RawEventRepository rawEvents) {
    this.rawEvents = rawEvents;
  }

  public void publish(RawEvent event) {
    rawEvents.save(event);
  }
}
