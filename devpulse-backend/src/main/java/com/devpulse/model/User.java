package com.devpulse.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "users")
public class User {
  @Id
  private UUID id = UUID.randomUUID();
  @Column(nullable = false, unique = true)
  private String email;
  @Column(name = "password_hash", nullable = false)
  private String passwordHash;
  @Column(name = "api_key_hash", nullable = false, unique = true)
  private String apiKeyHash;
  private boolean active = true;
  @Column(name = "created_at", nullable = false)
  private Instant createdAt = Instant.now();

  public UUID getId() { return id; }
  public void setId(UUID id) { this.id = id; }
  public String getEmail() { return email; }
  public void setEmail(String email) { this.email = email; }
  public String getPasswordHash() { return passwordHash; }
  public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }
  public String getApiKeyHash() { return apiKeyHash; }
  public void setApiKeyHash(String apiKeyHash) { this.apiKeyHash = apiKeyHash; }
  public boolean isActive() { return active; }
  public void setActive(boolean active) { this.active = active; }
  public Instant getCreatedAt() { return createdAt; }
  public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
