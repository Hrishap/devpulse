package com.devpulse.query;

import org.springframework.stereotype.Component;

@Component
public class SummaryMapper {
  // DailySummary persistence is reserved for background aggregation; live dashboard reads raw events in v1.
}
