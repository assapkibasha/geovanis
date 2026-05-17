"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@karambizi.tech");
  const [password, setPassword] = useState("Admin123!");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/admin",
    });
    setLoading(false);
    if (result?.error) {
      setError("Invalid admin credentials.");
      return;
    }
    router.push(result?.url ?? "/admin");
    router.refresh();
  }

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-md items-center px-5 py-16">
      <form className="w-full rounded-[2rem] border border-line bg-card p-8 text-card-foreground premium-shadow" onSubmit={submit}>
        <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">Admin access</p>
        <h1 className="mt-3 text-3xl">Sign in</h1>
        <div className="mt-8 grid gap-4">
          <label className="grid gap-2 text-sm">
            Email
            <input className="h-12 rounded-2xl border border-line bg-background px-4 outline-none focus:border-primary" value={email} onChange={(event) => setEmail(event.target.value)} type="email" />
          </label>
          <label className="grid gap-2 text-sm">
            Password
            <input className="h-12 rounded-2xl border border-line bg-background px-4 outline-none focus:border-primary" value={password} onChange={(event) => setPassword(event.target.value)} type="password" />
          </label>
        </div>
        {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
        <button className="mt-6 h-12 w-full rounded-full bg-primary text-sm font-semibold text-primary-foreground disabled:opacity-60" disabled={loading}>
          {loading ? "Checking..." : "Enter dashboard"}
        </button>
      </form>
    </section>
  );
}
