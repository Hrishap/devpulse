package com.devpulse.aggregation;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class AggregationWorker {
  @Scheduled(fixedDelayString = "PT10M")
  public void aggregate() {
    // DashboardService computes live summaries in v1; this hook is ready for queue-backed rollups.
  }
}
