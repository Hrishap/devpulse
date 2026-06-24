import * as vscode from "vscode";
import { ApiKeyStore } from "./auth/ApiKeyStore";
import { Client } from "./api/Client";
import { EventBuffer } from "./buffer/EventBuffer";
import { FLUSH_INTERVAL_MS } from "./config/constants";
import { FileTracker } from "./trackers/FileTracker";
import { GitTracker } from "./trackers/GitTracker";
import { IdleTracker } from "./trackers/IdleTracker";
import { SessionTracker } from "./trackers/SessionTracker";

let buffer: EventBuffer | undefined;
let sessionTracker: SessionTracker | undefined;
let idleTracker: IdleTracker | undefined;

export async function activate(context: vscode.ExtensionContext): Promise<void> {
  const apiKeyStore = new ApiKeyStore(context);
  context.subscriptions.push(
    vscode.commands.registerCommand("devpulse.setApiKey", () => apiKeyStore.promptAndStore())
  );

  if (!(await apiKeyStore.get())) {
    void vscode.window.showWarningMessage("DevPulse needs an API key to sync events.", "Set API Key").then((choice) => {
      if (choice === "Set API Key") {
        void apiKeyStore.promptAndStore();
      }
    });
  }

  const client = new Client(apiKeyStore);
  buffer = new EventBuffer(context, client);
  sessionTracker = new SessionTracker(buffer);
  await sessionTracker.start();

  const gitTracker = new GitTracker();
  const fileTracker = new FileTracker(sessionTracker.sessionId, buffer, gitTracker);
  idleTracker = new IdleTracker(sessionTracker.sessionId, buffer);
  fileTracker.register(context);
  idleTracker.register(context);

  const interval = setInterval(() => void buffer?.flush().catch(() => undefined), FLUSH_INTERVAL_MS);
  context.subscriptions.push(
    { dispose: () => clearInterval(interval) },
    vscode.commands.registerCommand("devpulse.flush", async () => {
      await buffer?.flush();
      vscode.window.showInformationMessage("DevPulse events flushed.");
    })
  );
}

export async function deactivate(): Promise<void> {
  idleTracker?.dispose();
  await sessionTracker?.end();
  await buffer?.flush().catch(() => undefined);
}
