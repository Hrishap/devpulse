package com.devpulse.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "raw_events")
public class RawEvent {
  @Id
  private UUID id = UUID.randomUUID();
  @Column(name = "user_id", nullable = false)
  private UUID userId;
  @Column(name = "session_id", nullable = false)
  private String sessionId;
  @Column(name = "event_type", nullable = false)
  private String eventType;
  @Column(name = "ts", nullable = false)
  private Instant timestamp;
  private String repo;
  private String branch;
  private String filename;
  private String language;
  @Column(name = "created_at", nullable = false)
  private Instant createdAt = Instant.now();

  public UUID getId() { return id; }
  public void setId(UUID id) { this.id = id; }
  public UUID getUserId() { return userId; }
  public void setUserId(UUID userId) { this.userId = userId; }
  public String getSessionId() { return sessionId; }
  public void setSessionId(String sessionId) { this.sessionId = sessionId; }
  public String getEventType() { return eventType; }
  public void setEventType(String eventType) { this.eventType = eventType; }
  public Instant getTimestamp() { return timestamp; }
  public void setTimestamp(Instant timestamp) { this.timestamp = timestamp; }
  public String getRepo() { return repo; }
  public void setRepo(String repo) { this.repo = repo; }
  public String getBranch() { return branch; }
  public void setBranch(String branch) { this.branch = branch; }
  public String getFilename() { return filename; }
  public void setFilename(String filename) { this.filename = filename; }
  public String getLanguage() { return language; }
  public void setLanguage(String language) { this.language = language; }
  public Instant getCreatedAt() { return createdAt; }
  public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
