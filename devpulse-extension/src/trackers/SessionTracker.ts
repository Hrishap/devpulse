import * as vscode from "vscode";
import { v4 as uuid } from "uuid";
import { EventBuffer } from "../buffer/EventBuffer";

export class SessionTracker {
  readonly sessionId = uuid();

  constructor(private readonly buffer: EventBuffer) {}

  async start(): Promise<void> {
    await this.buffer.enqueue({
      id: uuid(),
      sessionId: this.sessionId,
      eventType: "session_start",
      timestamp: new Date().toISOString()
    });
  }

  async end(): Promise<void> {
    await this.buffer.enqueue({
      id: uuid(),
      sessionId: this.sessionId,
      eventType: "session_end",
      timestamp: new Date().toISOString()
    });
  }
}
