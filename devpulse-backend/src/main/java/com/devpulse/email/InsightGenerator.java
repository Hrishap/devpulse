package com.devpulse.email;

import org.springframework.stereotype.Component;

@Component
public class InsightGenerator {
  public String generate(long flowMs, int switches, String bestDay) {
    if (flowMs == 0) {
      return "No activity was tracked this week. Confirm the VS Code extension is active and your API key is set.";
    }
    if (switches > 12) {
      return "High context switching likely cost recovery time. Defend your best block on " + bestDay + ".";
    }
    return "Your flow was strongest on " + bestDay + ". Keep that calendar window focused next week.";
  }
}
