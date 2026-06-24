"use client";

import Link from "next/link";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { apiFetch } from "@/lib/api";
import { setApiKey } from "@/lib/auth";

interface RegisterResponse {
  email: string;
  apiKey: string;
}

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apiKey, setApiKeyState] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    try {
      const response = await apiFetch<RegisterResponse>("/api/auth/register", { method: "POST", body: JSON.stringify({ email, password }) });
      setApiKey(response.apiKey);
      setApiKeyState(response.apiKey);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Registration failed.");
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-bg p-4">
      <Card className="w-full max-w-md">
        <h1 className="mb-1 text-2xl font-semibold">Create DevPulse Account</h1>
        <p className="mb-6 text-sm text-text-2">Your API key is shown once and saved in this browser.</p>
        {!apiKey ? (
          <form className="grid gap-3" onSubmit={submit}>
            <input className="h-11 rounded-md border border-brand-pale/20 bg-surface-2 px-3 text-sm outline-none focus:border-brand" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
            <input className="h-11 rounded-md border border-brand-pale/20 bg-surface-2 px-3 text-sm outline-none focus:border-brand" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 8 characters" />
            <button className="h-11 rounded-md bg-brand text-sm font-medium text-white">Register</button>
          </form>
        ) : (
          <div className="rounded-md border border-brand-pale/20 bg-surface-2 p-3">
            <div className="text-xs uppercase tracking-[0.1em] text-text-2">API key</div>
            <code className="mt-2 block break-all font-mono text-sm text-text-1">{apiKey}</code>
            <Link className="mt-4 inline-block text-sm text-brand-light" href="/dashboard">Open dashboard</Link>
          </div>
        )}
        {error && <p className="mt-4 text-sm text-danger">{error}</p>}
        <Link href="/login" className="mt-5 block text-sm text-brand-light">Already registered?</Link>
      </Card>
    </main>
  );
}
