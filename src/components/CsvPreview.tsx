"use client";

import { useMemo, useState } from "react";
import {
  ColumnMapping,
  DetectedField,
  FIELD_LABELS,
  FIELD_OPTIONS,
  detectColumnMapping,
} from "@/lib/csv";
import { ParsedCsv } from "@/components/CsvUploader";

type Props = {
  data: ParsedCsv;
  onConfirm: (mapping: ColumnMapping[]) => void;
  onCancel: () => void;
};

export default function CsvPreview({ data, onConfirm, onCancel }: Props) {
  const initialMapping = useMemo(
    () => detectColumnMapping(data.headers),
    [data.headers]
  );
  const [mapping, setMapping] = useState<ColumnMapping[]>(initialMapping);

  const previewRows = data.rows.slice(0, 8);

  const detectedCount = mapping.filter((m) => m.field !== "unknown").length;

  function updateField(index: number, field: DetectedField) {
    setMapping((prev) =>
      prev.map((m) =>
        m.index === index ? { ...m, field, confidence: 1 } : m
      )
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">{data.fileName}</h2>
            <p className="mt-1 text-sm text-zinc-500">
              {data.totalRows.toLocaleString()} prospects · {data.headers.length} columns
              {" · "}
              <span className="font-medium text-emerald-600">
                {detectedCount} columns auto-detected
              </span>
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onCancel}
              className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            >
              ← Choose another file
            </button>
            <button
              onClick={() => onConfirm(mapping)}
              className="rounded-full bg-[#ff5b2e] px-5 py-2 text-sm font-bold text-white shadow-md shadow-[#ff5b2e]/20 hover:bg-[#e84d24]"
            >
              Confirm columns →
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <div className="mb-4 flex items-start gap-3 rounded-xl bg-amber-50 p-4 text-sm">
          <svg className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <strong className="font-semibold text-amber-900">Review the mapping below.</strong>
            <span className="text-amber-800">
              {" "}We auto-detected what we could. Adjust any column that&apos;s wrong, or set to &quot;Ignored&quot; for ones you don&apos;t need.
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-zinc-200">
                {mapping.map((m) => (
                  <th
                    key={m.index}
                    className="min-w-[180px] px-3 py-3 text-left align-top"
                  >
                    <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                      Column {m.index + 1}
                    </div>
                    <div className="mt-1 truncate font-mono text-xs text-zinc-600">
                      {m.header}
                    </div>
                    <select
                      value={m.field}
                      onChange={(e) =>
                        updateField(m.index, e.target.value as DetectedField)
                      }
                      className={`mt-2 w-full rounded-lg border px-2 py-1.5 text-xs font-semibold outline-none transition-colors ${
                        m.field === "unknown"
                          ? "border-zinc-200 bg-zinc-50 text-zinc-500"
                          : "border-[#ff5b2e]/30 bg-[#fff5f0] text-[#c43a14]"
                      }`}
                    >
                      {FIELD_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {previewRows.map((row, i) => (
                <tr
                  key={i}
                  className={`border-b border-zinc-100 ${
                    i % 2 === 0 ? "bg-white" : "bg-zinc-50/50"
                  }`}
                >
                  {mapping.map((m) => (
                    <td
                      key={m.index}
                      className="max-w-[240px] truncate px-3 py-3 text-zinc-700"
                      title={row[m.header]}
                    >
                      {row[m.header] || (
                        <span className="text-zinc-300">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {data.totalRows > previewRows.length && (
          <p className="mt-4 text-center text-xs text-zinc-500">
            Showing first {previewRows.length} of {data.totalRows.toLocaleString()} rows
          </p>
        )}
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500">
          Detection summary
        </h3>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {mapping.map((m) => (
            <div
              key={m.index}
              className="flex items-center justify-between rounded-lg border border-zinc-100 bg-zinc-50/60 px-3 py-2 text-xs"
            >
              <span className="truncate font-mono text-zinc-600" title={m.header}>
                {m.header}
              </span>
              <span
                className={`ml-2 shrink-0 rounded-md px-2 py-0.5 font-semibold ${
                  m.field === "unknown"
                    ? "bg-zinc-200 text-zinc-500"
                    : "bg-[#ff5b2e]/15 text-[#c43a14]"
                }`}
              >
                {FIELD_LABELS[m.field]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
