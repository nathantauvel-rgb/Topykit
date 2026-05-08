"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "@/components/Logo";
import CsvUploader, { ParsedCsv } from "@/components/CsvUploader";
import CsvPreview from "@/components/CsvPreview";
import ScoringConfigurator from "@/components/ScoringConfigurator";
import { ColumnMapping } from "@/lib/csv";
import { ScoringRule } from "@/lib/scoring";

type Step = "upload" | "preview" | "configure" | "results";

export default function AppPage() {
  const [step, setStep] = useState<Step>("upload");
  const [parsed, setParsed] = useState<ParsedCsv | null>(null);
  const [mapping, setMapping] = useState<ColumnMapping[] | null>(null);
  const [rules, setRules] = useState<ScoringRule[] | null>(null);

  function reset() {
    setStep("upload");
    setParsed(null);
    setMapping(null);
    setRules(null);
  }

  return (
    <div className="min-h-screen bg-[#fdf8f1] text-zinc-900">
      <header className="sticky top-0 z-30 border-b border-zinc-200/60 bg-[#fdf8f1]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">
              Beta
            </span>
            <Link href="/" className="text-zinc-600 hover:text-[#ff5b2e]">
              ← Back to home
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
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

          {step === "configure" && parsed && mapping && (
            <ScoringConfigurator
              data={parsed}
              mapping={mapping}
              onConfirm={(r) => {
                setRules(r);
                setStep("results");
              }}
              onBack={() => setStep("preview")}
            />
          )}

          {step === "results" && rules && parsed && mapping && (
            <ResultsPlaceholder
              rulesCount={rules.length}
              rowCount={parsed.totalRows}
              onReset={reset}
              onBack={() => setStep("configure")}
            />
          )}
        </div>
      </main>
    </div>
  );
}

function Stepper({ step }: { step: Step }) {
  const steps = [
    { id: "upload", label: "Upload" },
    { id: "preview", label: "Map columns" },
    { id: "configure", label: "Configure scoring" },
    { id: "results", label: "Results" },
  ];

  const currentIndex = steps.findIndex((s) => s.id === step);

  return (
    <ol className="mx-auto flex max-w-3xl items-center justify-between gap-2">
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
                className={`hidden text-sm font-medium sm:inline ${
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

function ResultsPlaceholder({
  rulesCount,
  rowCount,
  onReset,
  onBack,
}: {
  rulesCount: number;
  rowCount: number;
  onReset: () => void;
  onBack: () => void;
}) {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-2xl border-2 border-dashed border-[#ff5b2e]/40 bg-[#fff5f0] p-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ff5b2e]/15 text-[#ff5b2e]">
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h2 className="mt-5 text-2xl font-bold tracking-tight">Scoring is configured!</h2>
        <p className="mt-2 text-zinc-600">
          {rulesCount} rule{rulesCount > 1 ? "s" : ""} ready to score{" "}
          {rowCount.toLocaleString()} prospects.
        </p>
        <p className="mt-3 text-sm text-zinc-500">
          The full results table + CSV export is the next piece I&apos;ll build (Session 3).
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={onBack}
            className="rounded-full border-2 border-zinc-900 px-5 py-2.5 text-sm font-semibold hover:bg-zinc-900 hover:text-white"
          >
            ← Adjust rules
          </button>
          <button
            onClick={onReset}
            className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#ff5b2e]"
          >
            Try another file
          </button>
        </div>
      </div>
    </div>
  );
}
