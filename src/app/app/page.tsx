"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "@/components/Logo";
import CsvUploader, { ParsedCsv } from "@/components/CsvUploader";
import CsvPreview from "@/components/CsvPreview";
import ScoringConfigurator from "@/components/ScoringConfigurator";
import ResultsTable from "@/components/ResultsTable";
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
            <ResultsTable
              data={parsed}
              mapping={mapping}
              rules={rules}
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

