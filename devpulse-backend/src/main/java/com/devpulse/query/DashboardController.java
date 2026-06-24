package com.devpulse.query;

import com.devpulse.model.User;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {
  private final DashboardService dashboard;

  public DashboardController(DashboardService dashboard) {
    this.dashboard = dashboard;
  }

  @GetMapping("/today")
  public DashboardResponses.TodayDashboard today(@AuthenticationPrincipal User user) {
    return dashboard.today(user);
  }

  @GetMapping("/weekly")
  public DashboardResponses.WeeklySummary weekly(@AuthenticationPrincipal User user) {
    return dashboard.weekly(user);
  }
}
