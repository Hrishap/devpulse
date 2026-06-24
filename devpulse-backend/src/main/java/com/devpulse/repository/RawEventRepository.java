package com.devpulse.repository;

import com.devpulse.model.RawEvent;
import java.time.Instant;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RawEventRepository extends JpaRepository<RawEvent, UUID> {
  List<RawEvent> findByUserIdAndTimestampBetweenOrderByTimestampAsc(UUID userId, Instant start, Instant end);
  boolean existsByUserIdAndSessionIdAndTimestampAndEventType(UUID userId, String sessionId, Instant timestamp, String eventType);
}
