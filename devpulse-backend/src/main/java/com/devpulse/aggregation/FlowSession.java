package com.devpulse.aggregation;

import java.time.Instant;

public record FlowSession(Instant startTime, Instant endTime, String repo, int eventCount, long durationMs) {}
