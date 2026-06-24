import * as vscode from "vscode";
import { v4 as uuid } from "uuid";
import { IDLE_THRESHOLD_MS } from "../config/constants";
import { EventBuffer } from "../buffer/EventBuffer";

export class IdleTracker {
  private timer?: NodeJS.Timeout;
  private idle = false;

  constructor(private readonly sessionId: string, private readonly buffer: EventBuffer) {}

  register(context: vscode.ExtensionContext): void {
    const reset = () => void this.activity();
    context.subscriptions.push(
      vscode.workspace.onDidChangeTextDocument(reset),
      vscode.window.onDidChangeActiveTextEditor(reset),
      vscode.window.onDidChangeWindowState((state) => {
        if (!state.focused) {
          void this.startIdle();
        } else {
          void this.activity();
        }
      })
    );
    this.arm();
  }

  dispose(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  private async activity(): Promise<void> {
    if (this.idle) {
      this.idle = false;
      await this.buffer.enqueue({
        id: uuid(),
        sessionId: this.sessionId,
        eventType: "idle_end",
        timestamp: new Date().toISOString()
      });
    }
    this.arm();
  }

  private arm(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => void this.startIdle(), IDLE_THRESHOLD_MS);
  }

  private async startIdle(): Promise<void> {
    if (this.idle) {
      return;
    }
    this.idle = true;
    await this.buffer.enqueue({
      id: uuid(),
      sessionId: this.sessionId,
      eventType: "idle_start",
      timestamp: new Date().toISOString()
    });
  }
}
