import * as vscode from "vscode";

const KEY = "devpulse.apiKey";

export class ApiKeyStore {
  constructor(private readonly context: vscode.ExtensionContext) {}

  async get(): Promise<string | undefined> {
    const stored = this.context.globalState.get<string>(KEY);
    const configured = vscode.workspace.getConfiguration("devpulse").get<string>("apiKey");
    return stored || configured || undefined;
  }

  async promptAndStore(): Promise<string | undefined> {
    const value = await vscode.window.showInputBox({
      title: "DevPulse API key",
      prompt: "Paste the API key from your DevPulse dashboard.",
      password: true,
      ignoreFocusOut: true
    });
    if (value) {
      await this.context.globalState.update(KEY, value.trim());
      await vscode.window.showInformationMessage("DevPulse API key saved.");
    }
    return value?.trim();
  }
}
