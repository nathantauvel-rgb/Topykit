"use client";

import { useState } from "react";

type Props = {
  variant?: "light" | "dark";
};

export default function WaitlistForm({ variant = "light" }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Something went wrong");
      }

      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  const isDark = variant === "dark";

  if (status === "success") {
    return (
      <div
        className={`rounded-2xl border p-5 text-center text-sm font-medium ${
          isDark
            ? "border-white/30 bg-white/10 text-white"
            : "border-emerald-200 bg-emerald-50 text-emerald-800"
        }`}
      >
        ✓ You&apos;re on the list. We&apos;ll be in touch soon.
      </div>
    );
  }

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col gap-2 sm:flex-row sm:gap-0 sm:rounded-full sm:border sm:p-1.5 sm:shadow-lg ${
          isDark
            ? "sm:border-white/20 sm:bg-white/10 sm:shadow-black/20"
            : "sm:border-zinc-200 sm:bg-white sm:shadow-zinc-900/5"
        }`}
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className={`flex-1 rounded-full px-5 py-3.5 text-sm outline-none transition-colors sm:bg-transparent ${
            isDark
              ? "border border-white/30 bg-white/10 text-white placeholder-white/60 focus:border-white sm:border-0"
              : "border border-zinc-200 bg-white text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 sm:border-0 sm:focus:border-0"
          }`}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={`rounded-full px-6 py-3.5 text-sm font-bold transition-all disabled:opacity-50 ${
            isDark
              ? "bg-white text-[#ff5b2e] hover:bg-zinc-100"
              : "bg-[#ff5b2e] text-white shadow-md shadow-[#ff5b2e]/30 hover:bg-[#e84d24] hover:shadow-lg"
          }`}
        >
          {status === "loading" ? "Joining..." : "Get early access →"}
        </button>
      </form>
      {status === "error" && (
        <div className="mt-2 text-xs text-red-500">{errorMessage}</div>
      )}
    </div>
  );
}
