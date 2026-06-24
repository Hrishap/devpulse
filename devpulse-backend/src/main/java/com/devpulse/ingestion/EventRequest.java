package com.devpulse.ingestion;

import java.time.Instant;
import java.util.UUID;

public record EventRequest(
  UUID id,
  String sessionId,
  String eventType,
  Instant timestamp,
  String repo,
  String branch,
  String filename,
  String language
) {}
