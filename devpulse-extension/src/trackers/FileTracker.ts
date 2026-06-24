import * as vscode from "vscode";
import { v4 as uuid } from "uuid";
import { EventBuffer } from "../buffer/EventBuffer";
import { GitTracker } from "./GitTracker";
import { DevPulseEvent, EventType } from "../models/Event";

export class FileTracker {
  constructor(
    private readonly sessionId: string,
    private readonly buffer: EventBuffer,
    private readonly gitTracker: GitTracker
  ) {}

  register(context: vscode.ExtensionContext): void {
    context.subscriptions.push(
      vscode.window.onDidChangeActiveTextEditor((editor) => this.emitForEditor("file_switch", editor)),
      vscode.workspace.onDidChangeTextDocument((event) => this.emitForDocument("file_edit", event.document))
    );
    void this.emitForEditor("file_open", vscode.window.activeTextEditor);
  }

  private async emitForEditor(eventType: EventType, editor?: vscode.TextEditor): Promise<void> {
    if (editor) {
      await this.emitForDocument(eventType, editor.document);
    }
  }

  private async emitForDocument(eventType: EventType, document: vscode.TextDocument): Promise<void> {
    if (document.uri.scheme !== "file" && document.uri.scheme !== "untitled") {
      return;
    }
    const git = await this.gitTracker.current(document);
    const event: DevPulseEvent = {
      id: uuid(),
      sessionId: this.sessionId,
      eventType,
      timestamp: new Date().toISOString(),
      filename: vscode.workspace.asRelativePath(document.uri, false),
      language: document.languageId,
      ...git
    };
    await this.buffer.enqueue(event);

    const branchChange = await this.gitTracker.detectBranchChange(document);
    if (branchChange?.branch) {
      await this.buffer.enqueue({
        id: uuid(),
        sessionId: this.sessionId,
        eventType: "git_branch",
        timestamp: new Date().toISOString(),
        ...branchChange
      });
    }
  }
}
