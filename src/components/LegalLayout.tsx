import Link from "next/link";
import { ReactNode } from "react";
import Logo from "@/components/Logo";

type Props = {
  title: string;
  lastUpdated: string;
  children: ReactNode;
};

export default function LegalLayout({ title, lastUpdated, children }: Props) {
  return (
    <div className="min-h-screen bg-[#fdf8f1] text-zinc-900">
      <header className="border-b border-zinc-200/60 bg-[#fdf8f1]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>
          <Link
            href="/"
            className="text-sm text-zinc-600 hover:text-[#ff5b2e]"
          >
            ← Back to home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-12 border-b border-zinc-200 pb-6">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            {title}
          </h1>
          <p className="mt-3 text-sm text-zinc-500">
            Last updated: {lastUpdated}
          </p>
        </div>

        <article className="prose-legal space-y-6 text-zinc-700">
          {children}
        </article>

        <nav className="mt-16 border-t border-zinc-200 pt-8">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-500">
            Other legal pages
          </h2>
          <ul className="mt-3 space-y-1.5 text-sm">
            <li>
              <Link href="/legal/privacy" className="text-zinc-700 hover:text-[#ff5b2e]">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/legal/terms" className="text-zinc-700 hover:text-[#ff5b2e]">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/legal/cookies" className="text-zinc-700 hover:text-[#ff5b2e]">
                Cookie Policy
              </Link>
            </li>
            <li>
              <Link href="/legal/notice" className="text-zinc-700 hover:text-[#ff5b2e]">
                Legal Notice
              </Link>
            </li>
          </ul>
        </nav>
      </main>

      <footer className="border-t border-zinc-200/60 py-8">
        <div className="mx-auto max-w-4xl px-6 text-center text-xs text-zinc-500">
          © 2026 Topykit · Have a question?{" "}
          <a
            href="mailto:hello@topykit.com"
            className="text-[#ff5b2e] hover:underline"
          >
            hello@topykit.com
          </a>
        </div>
      </footer>
    </div>
  );
}
