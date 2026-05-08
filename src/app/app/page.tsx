"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "@/components/Logo";
import CsvUploader, { ParsedCsv } from "@/components/CsvUploader";
import CsvPreview from "@/components/CsvPreview";
import { ColumnMapping } from "@/lib/csv";

type Step = "upload" | "preview" | "configure";

export default function AppPage() {
  const [step, setStep] = useState<Step>("upload");
  const [parsed, setParsed] = useState<ParsedCsv | null>(null);
  const [mapping, setMapping] = useState<ColumnMapping[] | null>(null);

  function reset() {
    setStep("upload");
    setParsed(null);
    setMapping(null);
  }

  return (
    <div className="min-h-screen bg-[#fdf8f1] text-zinc-900">
      <header className="border-b border-zinc-200/60 bg-[#fdf8f1]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">
              Beta
            </span>
            <Link
              href="/"
              className="text-zinc-600 hover:text-[#ff5b2e]"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">
        <Stepper step={step} />

        <div className="mt-10">
          {step === "upload" && (
            <div className="mx-auto max-w-2xl">
              <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Score your prospect list
                </h1>
                <p className="mt-3 text-zinc-600">
                  Upload your Sales Navigator, Apollo, or LinkedIn export to get started.
                </p>
              </div>
              <div className="mt-8">
                <CsvUploader
                  onParsed={(data) => {
                    setParsed(data);
                    setStep("preview");
                  }}
                />
              </div>
            </div>
          )}

          {step === "preview" && parsed && (
            <CsvPreview
              data={parsed}
              onConfirm={(m) => {
                setMapping(m);
                setStep("configure");
              }}
              onCancel={reset}
            />
          )}

          {step === "configure" && mapping && parsed && (
            <ConfigurePlaceholder
              fileName={parsed.fileName}
              rowCount={parsed.totalRows}
              mapping={mapping}
              onReset={reset}
            />
          )}
        </div>
      </main>
    </div>
  );
}

function Stepper({ step }: { step: Step }) {
  const steps = [
    { id: "upload", label: "Upload CSV" },
    { id: "preview", label: "Map columns" },
    { id: "configure", label: "Configure scoring" },
  ];

  const currentIndex = steps.findIndex((s) => s.id === step);

  return (
    <ol className="mx-auto flex max-w-2xl items-center justify-between gap-2">
      {steps.map((s, i) => {
        const isActive = i === currentIndex;
        const isDone = i < currentIndex;
        return (
          <li key={s.id} className="flex flex-1 items-center">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  isDone
                    ? "bg-emerald-500 text-white"
                    : isActive
                    ? "bg-[#ff5b2e] text-white"
                    : "bg-zinc-200 text-zinc-500"
                }`}
              >
                {isDone ? "✓" : i + 1}
              </div>
              <span
                className={`text-sm font-medium ${
                  isActive
                    ? "text-zinc-900"
                    : isDone
                    ? "text-zinc-700"
                    : "text-zinc-400"
                }`}
              >
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`mx-3 h-px flex-1 ${
                  isDone ? "bg-emerald-500" : "bg-zinc-200"
                }`}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

function ConfigurePlaceholder({
  fileName,
  rowCount,
  mapping,
  onReset,
}: {
  fileName: string;
  rowCount: number;
  mapping: ColumnMapping[];
  onReset: () => void;
}) {
  const detected = mapping.filter((m) => m.field !== "unknown");

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-2xl border-2 border-dashed border-[#ff5b2e]/40 bg-[#fff5f0] p-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ff5b2e]/15 text-[#ff5b2e]">
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </div>
        <h2 className="mt-5 text-2xl font-bold tracking-tight">Coming next: scoring rules</h2>
        <p className="mt-2 text-zinc-600">
          The scoring configurator is the next piece I&apos;ll build. For now, here&apos;s what
          Topykit understood from your file.
        </p>

        <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-5 text-left">
          <div className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            File
          </div>
          <div className="mt-1 font-mono text-sm">{fileName}</div>
          <div className="mt-3 text-xs font-bold uppercase tracking-wider text-zinc-500">
            Rows
          </div>
          <div className="mt-1 text-sm">{rowCount.toLocaleString()} prospects</div>
          <div className="mt-3 text-xs font-bold uppercase tracking-wider text-zinc-500">
            Mapped fields ({detected.length})
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {detected.map((m) => (
              <span
                key={m.index}
                className="rounded-md bg-[#ff5b2e]/10 px-2 py-1 text-xs font-semibold text-[#c43a14]"
              >
                {m.header}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={onReset}
          className="mt-8 rounded-full border-2 border-zinc-900 px-5 py-2.5 text-sm font-semibold hover:bg-zinc-900 hover:text-white"
        >
          Try another file
        </button>
      </div>
    </div>
  );
}
