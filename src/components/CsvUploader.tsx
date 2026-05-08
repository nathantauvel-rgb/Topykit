"use client";

import { useCallback, useRef, useState } from "react";
import Papa from "papaparse";

export type ParsedCsv = {
  fileName: string;
  headers: string[];
  rows: Record<string, string>[];
  totalRows: number;
};

type Props = {
  onParsed: (data: ParsedCsv) => void;
};

export default function CsvUploader({ onParsed }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      setError(null);

      if (!file.name.toLowerCase().match(/\.(csv|tsv|txt)$/)) {
        setError("Please upload a CSV file (.csv, .tsv, or .txt).");
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        setError("File too large. Maximum size is 10 MB.");
        return;
      }

      setIsParsing(true);

      Papa.parse<Record<string, string>>(file, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (h) => h.trim(),
        complete: (results) => {
          setIsParsing(false);

          if (results.errors.length > 0) {
            const fatal = results.errors.find((e) => e.type === "Delimiter");
            if (fatal) {
              setError(
                "We couldn't read this file. Make sure it's a valid CSV with a header row."
              );
              return;
            }
          }

          const headers = results.meta.fields ?? [];
          const rows = results.data;

          if (headers.length === 0) {
            setError("This file has no columns. Make sure the first row contains headers.");
            return;
          }

          if (rows.length === 0) {
            setError("This file has no data rows.");
            return;
          }

          onParsed({
            fileName: file.name,
            headers,
            rows,
            totalRows: rows.length,
          });
        },
        error: (err) => {
          setIsParsing(false);
          setError(`Parsing error: ${err.message}`);
        },
      });
    },
    [onParsed]
  );

  const onDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const file = e.dataTransfer.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const onSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
      e.target.value = "";
    },
    [handleFile]
  );

  return (
    <div className="w-full">
      <div
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center transition-all ${
          isDragging
            ? "border-[#ff5b2e] bg-[#fff5f0]"
            : "border-zinc-300 bg-white hover:border-[#ff5b2e]/50 hover:bg-[#fff9f6]"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".csv,.tsv,.txt"
          onChange={onSelect}
          className="hidden"
        />

        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ff5b2e]/10 text-[#ff5b2e]">
          {isParsing ? (
            <svg className="h-6 w-6 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
              <path fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
          ) : (
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          )}
        </div>

        <h3 className="mt-5 text-lg font-semibold">
          {isParsing
            ? "Parsing your file..."
            : isDragging
            ? "Drop your CSV here"
            : "Upload your prospect list"}
        </h3>
        <p className="mt-1 text-sm text-zinc-500">
          {isParsing
            ? "This usually takes less than 2 seconds."
            : "Drag & drop a CSV file, or click to browse."}
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-zinc-400">
          <span className="rounded-md bg-zinc-100 px-2 py-1 font-mono">.csv</span>
          <span className="rounded-md bg-zinc-100 px-2 py-1 font-mono">.tsv</span>
          <span className="rounded-md bg-zinc-100 px-2 py-1 font-mono">Sales Navigator</span>
          <span className="rounded-md bg-zinc-100 px-2 py-1 font-mono">Apollo</span>
          <span className="rounded-md bg-zinc-100 px-2 py-1 font-mono">max 10 MB</span>
        </div>
      </div>

      {error && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <strong className="font-semibold">Couldn&apos;t read this file.</strong> {error}
        </div>
      )}

      <div className="mt-6 text-center text-xs text-zinc-500">
        🔒 Your data stays in your browser. We never upload it to our servers.
      </div>
    </div>
  );
}
