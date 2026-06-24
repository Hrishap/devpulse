package com.devpulse.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "daily_summaries")
public class DailySummary {
  @Id
  private UUID id = UUID.randomUUID();
  @Column(name = "user_id", nullable = false)
  private UUID userId;
  private LocalDate day;
  @Column(name = "total_active_ms")
  private long totalActiveMs;
  @Column(name = "flow_sessions_json")
  private String flowSessionsJson = "[]";
  private int contextSwitches;
  private String topRepo;
  private String topLanguage;
  private int flowScore;
  private Instant updatedAt = Instant.now();
}
