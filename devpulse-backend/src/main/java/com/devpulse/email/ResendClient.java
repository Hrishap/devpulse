package com.devpulse.email;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ResendClient {
  private final String apiKey;

  public ResendClient(@Value("${devpulse.resend-api-key:}") String apiKey) {
    this.apiKey = apiKey;
  }

  public void send(String to, String subject, String html) {
    if (apiKey == null || apiKey.isBlank()) {
      return;
    }
    // Wire the Resend SDK here when a verified domain is available.
  }
}
