import * as vscode from "vscode";

export const IDLE_THRESHOLD_MS = 120_000;
export const FLUSH_INTERVAL_MS = 30_000;
export const MAX_BATCH_SIZE = 50;
export const API_TIMEOUT_MS = 5_000;

export function getApiUrl(): string {
  return vscode.workspace.getConfiguration("devpulse").get<string>("apiUrl", "https://devpulse-backend-production-aed6.up.railway.app");
}
