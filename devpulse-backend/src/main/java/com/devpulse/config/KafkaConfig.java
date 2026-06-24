package com.devpulse.config;

import org.springframework.context.annotation.Configuration;

@Configuration
public class KafkaConfig {
  // Local Kafka is intentionally optional for v1; EventPublisher hides the queue boundary.
}
