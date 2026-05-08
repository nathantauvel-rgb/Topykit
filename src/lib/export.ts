import Papa from "papaparse";
import { ProspectScore } from "@/lib/scoring";

export function exportScoredCsv(
  fileName: string,
  headers: string[],
  rows: Record<string, string>[],
  scores: ProspectScore[]
) {
  const scoreByIndex = new Map(scores.map((s) => [s.rowIndex, s]));

  const enriched = scores.map((s) => {
    const original = rows[s.rowIndex];
    const out: Record<string, string | number> = {};
    out["Topykit Score"] = s.finalScore;
    out["Topykit Rank"] = scores.findIndex((x) => x.rowIndex === s.rowIndex) + 1;
    for (const h of headers) {
      out[h] = original[h] ?? "";
    }
    return out;
  });

  void scoreByIndex;

  const csv = Papa.unparse(enriched, {
    quotes: true,
    header: true,
  });

  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  const base = fileName.replace(/\.[^.]+$/, "");
  a.download = `${base}_scored_topykit.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
