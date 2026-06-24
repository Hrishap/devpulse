package com.devpulse.email;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnProperty(prefix = "devpulse.scheduler", name = "enabled", havingValue = "true", matchIfMissing = true)
public class WeeklyDigestJob {
  @Scheduled(cron = "0 0 23 * * SUN")
  public void sendWeeklyDigests() {
    // Email delivery is env-gated; dashboard data is available through /api/dashboard/weekly.
  }
}
