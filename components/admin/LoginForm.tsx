"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginForm({ token }: { token: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Login gagal.");
        return;
      }
      router.push(`/admin/${token}/dashboard`);
      router.refresh();
    } catch {
      setError("Terjadi kesalahan jaringan.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm rounded-2xl border border-border bg-[var(--card)] p-8 shadow-lg"
    >
      <div className="flex flex-col items-center text-center">
        <Image src="/logo.svg" alt="Lambang PMII" width={56} height={56} className="h-14 w-14 object-contain" />
        <h1 className="mt-3 text-lg font-bold text-[var(--brand)]">Portal Admin</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Masuk untuk mengelola isi website RASYA.
        </p>
      </div>

      <label className="mt-6 block text-sm font-medium">
        Password
        <input
          type="password"
          autoFocus
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-border bg-[var(--background)] px-3 py-2 text-sm outline-none focus:border-[var(--brand)]"
        />
      </label>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-5 w-full rounded-lg bg-[var(--brand)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-dark)] disabled:opacity-60"
      >
        {loading ? "Memproses..." : "Masuk"}
      </button>
    </form>
  );
}
