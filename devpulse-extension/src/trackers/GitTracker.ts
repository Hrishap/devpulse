import * as vscode from "vscode";
import simpleGit from "simple-git";

export interface GitInfo {
  repo?: string;
  branch?: string;
}

export class GitTracker {
  private lastBranch?: string;

  async current(document?: vscode.TextDocument): Promise<GitInfo> {
    const folder = document ? vscode.workspace.getWorkspaceFolder(document.uri) : vscode.workspace.workspaceFolders?.[0];
    if (!folder) {
      return {};
    }
    try {
      const git = simpleGit(folder.uri.fsPath);
      const root = await git.revparse(["--show-toplevel"]);
      const branch = (await git.branch()).current;
      return { repo: root.split(/[\\/]/).pop(), branch };
    } catch {
      return { repo: folder.name };
    }
  }

  async detectBranchChange(document?: vscode.TextDocument): Promise<GitInfo | undefined> {
    const info = await this.current(document);
    if (info.branch && info.branch !== this.lastBranch) {
      this.lastBranch = info.branch;
      return info;
    }
    return undefined;
  }
}
