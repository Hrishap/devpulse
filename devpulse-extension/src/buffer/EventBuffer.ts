import * as vscode from "vscode";
import { MAX_BATCH_SIZE } from "../config/constants";
import { Client } from "../api/Client";
import { DevPulseEvent } from "../models/Event";

const BUFFER_KEY = "devpulse.eventBuffer";

export class EventBuffer {
  private events: DevPulseEvent[] = [];
  private flushing = false;

  constructor(
    private readonly context: vscode.ExtensionContext,
    private readonly client: Client
  ) {
    this.events = this.context.globalState.get<DevPulseEvent[]>(BUFFER_KEY, []);
  }

  async enqueue(event: DevPulseEvent): Promise<void> {
    this.events.push(event);
    await this.persist();
    if (this.events.length >= MAX_BATCH_SIZE) {
      await this.flush();
    }
  }

  async flush(): Promise<void> {
    if (this.flushing || this.events.length === 0) {
      return;
    }
    this.flushing = true;
    const batch = this.events.splice(0, MAX_BATCH_SIZE);
    await this.persist();
    try {
      await this.client.post(batch);
    } catch (error) {
      this.events = [...batch, ...this.events].slice(0, 500);
      await this.persist();
      throw error;
    } finally {
      this.flushing = false;
    }
  }

  private async persist(): Promise<void> {
    await this.context.globalState.update(BUFFER_KEY, this.events);
  }
}
