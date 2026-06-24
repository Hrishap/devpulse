"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { apiFetch } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    try {
      await apiFetch("/api/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
      setMessage("Login verified. Paste your API key in settings to use this browser.");
      router.push("/dashboard/settings");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Login failed.");
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-bg p-4">
      <Card className="w-full max-w-md">
        <h1 className="mb-1 text-2xl font-semibold">DevPulse</h1>
        <p className="mb-6 text-sm text-text-2">Sign in, then paste the API key from registration.</p>
        <form className="grid gap-3" onSubmit={submit}>
          <input className="h-11 rounded-md border border-brand-pale/20 bg-surface-2 px-3 text-sm outline-none focus:border-brand" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
          <input className="h-11 rounded-md border border-brand-pale/20 bg-surface-2 px-3 text-sm outline-none focus:border-brand" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" />
          <button className="h-11 rounded-md bg-brand text-sm font-medium text-white">Login</button>
        </form>
        {message && <p className="mt-4 text-sm text-text-2">{message}</p>}
        <Link href="/register" className="mt-5 block text-sm text-brand-light">Create an account</Link>
      </Card>
    </main>
  );
}
