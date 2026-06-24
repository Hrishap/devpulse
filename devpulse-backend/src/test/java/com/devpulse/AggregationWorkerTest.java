package com.devpulse;

import static org.assertj.core.api.Assertions.assertThat;

import com.devpulse.aggregation.AggregationWorker;
import org.junit.jupiter.api.Test;

class AggregationWorkerTest {
  @Test
  void workerCanRunWithoutQueue() {
    AggregationWorker worker = new AggregationWorker();
    worker.aggregate();
    assertThat(worker).isNotNull();
  }
}
