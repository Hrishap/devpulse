"use client";

import { useEffect, useState } from "react";
import { KeyRound, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { clearApiKey, getApiKey, setApiKey } from "@/lib/auth";
import { API_URL } from "@/lib/api";

export default function SettingsPage() {
  const [key, setKey] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setKey(getApiKey() || "");
  }, []);

  return (
    <div className="col-span-12 grid gap-4 lg:grid-cols-2">
      <Card>
        <h2 className="mb-4 text-lg font-semibold">API Key</h2>
        <div className="flex gap-2">
          <input
            className="h-10 flex-1 rounded-md border border-brand-pale/20 bg-surface-2 px-3 font-mono text-sm text-text-1 outline-none focus:border-brand"
            value={key}
            onChange={(event) => setKey(event.target.value)}
            placeholder="dp_live_..."
          />
          <button className="inline-flex h-10 items-center gap-2 rounded-md bg-brand px-4 text-sm font-medium text-white" onClick={() => { setApiKey(key.trim()); setSaved(true); }}>
            <KeyRound size={16} />
            Save
          </button>
        </div>
        {saved && <p className="mt-3 text-sm text-success">API key saved locally.</p>}
        <p className="mt-4 text-xs text-text-3">Backend URL: {API_URL}</p>
      </Card>
      <Card>
        <h2 className="mb-4 text-lg font-semibold">Email Preferences</h2>
        <div className="grid gap-3">
          <label className="text-sm text-text-2">Digest day<select className="mt-1 h-10 w-full rounded-md border border-brand-pale/20 bg-surface-2 px-3 text-text-1"><option>Sunday</option></select></label>
          <label className="text-sm text-text-2">Timezone<select className="mt-1 h-10 w-full rounded-md border border-brand-pale/20 bg-surface-2 px-3 text-text-1"><option>Asia/Calcutta</option><option>UTC</option></select></label>
          <button className="inline-flex h-10 w-fit items-center gap-2 rounded-md border border-danger/40 px-4 text-sm text-danger" onClick={() => { clearApiKey(); setKey(""); }}>
            <Trash2 size={16} />
            Clear local API key
          </button>
        </div>
      </Card>
    </div>
  );
}
