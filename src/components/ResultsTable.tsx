"use client";

import { Fragment, useMemo, useState } from "react";
import { ColumnMapping } from "@/lib/csv";
import { ParsedCsv } from "@/components/CsvUploader";
import {
  ScoringRule,
  ProspectScore,
  scoreAll,
} from "@/lib/scoring";
import { exportScoredCsv } from "@/lib/export";

type Props = {
  data: ParsedCsv;
  mapping: ColumnMapping[];
  rules: ScoringRule[];
  onBack: () => void;
  onReset: () => void;
};

type Filter = "all" | "hot" | "warm" | "cold";

const PAGE_SIZE = 25;

export default function ResultsTable({
  data,
  mapping,
  rules,
  onBack,
  onReset,
}: Props) {
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const allScores = useMemo(
    () => scoreAll(data.rows, mapping, rules),
    [data.rows, mapping, rules]
  );

  const stats = useMemo(() => {
    const hot = allScores.filter((s) => s.finalScore >= 75).length;
    const warm = allScores.filter(
      (s) => s.finalScore >= 50 && s.finalScore < 75
    ).length;
    const cold = allScores.filter((s) => s.finalScore < 50).length;
    const avg =
      allScores.length === 0
        ? 0
        : Math.round(
            allScores.reduce((sum, s) => sum + s.finalScore, 0) / allScores.length
          );
    return { total: allScores.length, hot, warm, cold, avg };
  }, [allScores]);

  const filteredScores = useMemo(() => {
    const searchLower = search.trim().toLowerCase();

    return allScores.filter((s) => {
      if (filter === "hot" && s.finalScore < 75) return false;
      if (filter === "warm" && (s.finalScore < 50 || s.finalScore >= 75))
        return false;
      if (filter === "cold" && s.finalScore >= 50) return false;

      if (searchLower) {
        const row = data.rows[s.rowIndex];
        const haystack = mapping
          .map((m) => row[m.header] ?? "")
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(searchLower)) return false;
      }

      return true;
    });
  }, [allScores, filter, search, data.rows, mapping]);

  const pageCount = Math.max(1, Math.ceil(filteredScores.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount - 1);
  const visibleScores = filteredScores.slice(
    currentPage * PAGE_SIZE,
    (currentPage + 1) * PAGE_SIZE
  );

  const nameCol = mapping.find((m) => m.field === "name");
  const companyCol = mapping.find((m) => m.field === "company");
  const titleCol = mapping.find((m) => m.field === "title");
  const locationCol = mapping.find((m) => m.field === "location");
  const industryCol = mapping.find((m) => m.field === "industry");

  function getName(s: ProspectScore) {
    const row = data.rows[s.rowIndex];
    if (nameCol) return row[nameCol.header] || `Prospect ${s.rowIndex + 1}`;
    const firstNameCol = mapping.find((m) => m.field === "firstName");
    const lastNameCol = mapping.find((m) => m.field === "lastName");
    if (firstNameCol || lastNameCol) {
      return [
        firstNameCol && row[firstNameCol.header],
        lastNameCol && row[lastNameCol.header],
      ]
        .filter(Boolean)
        .join(" ") || `Prospect ${s.rowIndex + 1}`;
    }
    return `Prospect ${s.rowIndex + 1}`;
  }

  function scoreColor(score: number) {
    if (score >= 75) return { bg: "bg-emerald-50", text: "text-emerald-700", bar: "bg-gradient-to-r from-emerald-500 to-emerald-400" };
    if (score >= 50) return { bg: "bg-amber-50", text: "text-amber-700", bar: "bg-gradient-to-r from-amber-500 to-amber-400" };
    return { bg: "bg-zinc-100", text: "text-zinc-600", bar: "bg-zinc-300" };
  }

  function handleExport() {
    exportScoredCsv(data.fileName, data.headers, data.rows, filteredScores);
  }

  const isFiltered = filter !== "all" || search.trim().length > 0;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Your scored prospects
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              {stats.total.toLocaleString()} prospects · Average score{" "}
              <span className="font-bold text-zinc-900">{stats.avg}</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={onBack}
              className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            >
              ← Adjust rules
            </button>
            <button
              onClick={onReset}
              className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            >
              New file
            </button>
            <button
              onClick={handleExport}
              className="rounded-full bg-[#ff5b2e] px-5 py-2 text-sm font-bold text-white shadow-md shadow-[#ff5b2e]/20 hover:bg-[#e84d24]"
            >
              ↓ Export {isFiltered ? `${filteredScores.length} filtered` : "CSV"}
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <FilterCard
            label="🔥 Hot leads"
            count={stats.hot}
            sub="Score 75+"
            active={filter === "hot"}
            onClick={() => {
              setFilter(filter === "hot" ? "all" : "hot");
              setPage(0);
            }}
            color="emerald"
          />
          <FilterCard
            label="🌡️ Warm leads"
            count={stats.warm}
            sub="Score 50–74"
            active={filter === "warm"}
            onClick={() => {
              setFilter(filter === "warm" ? "all" : "warm");
              setPage(0);
            }}
            color="amber"
          />
          <FilterCard
            label="❄️ Cold leads"
            count={stats.cold}
            sub="Score < 50"
            active={filter === "cold"}
            onClick={() => {
              setFilter(filter === "cold" ? "all" : "cold");
              setPage(0);
            }}
            color="zinc"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 p-4">
          <div className="flex items-center gap-2">
            {filter !== "all" && (
              <button
                onClick={() => {
                  setFilter("all");
                  setPage(0);
                }}
                className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-200"
              >
                Filter: {filter} ✕
              </button>
            )}
            <span className="text-xs text-zinc-500">
              Showing {filteredScores.length.toLocaleString()} of{" "}
              {stats.total.toLocaleString()}
            </span>
          </div>
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(0);
              }}
              placeholder="Search name, company…"
              className="w-64 rounded-lg border border-zinc-200 bg-white py-1.5 pl-9 pr-3 text-sm outline-none placeholder:text-zinc-400 focus:border-[#ff5b2e]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50/50 text-left text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                <th className="w-12 px-4 py-3">#</th>
                <th className="px-4 py-3">Prospect</th>
                <th className="hidden px-4 py-3 md:table-cell">Company</th>
                <th className="hidden px-4 py-3 lg:table-cell">Role</th>
                <th className="hidden px-4 py-3 lg:table-cell">Location</th>
                <th className="px-4 py-3 text-right">Score</th>
              </tr>
            </thead>
            <tbody>
              {visibleScores.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-sm text-zinc-500">
                    No prospects match these filters.
                  </td>
                </tr>
              )}
              {visibleScores.map((s, i) => {
                const row = data.rows[s.rowIndex];
                const rank =
                  allScores.findIndex((x) => x.rowIndex === s.rowIndex) + 1;
                const c = scoreColor(s.finalScore);
                const isExpanded = expandedRow === s.rowIndex;
                const matchedRules = rules.filter((r) =>
                  s.matchedRuleIds.includes(r.id)
                );

                return (
                  <Fragment key={s.rowIndex}>
                    <tr
                      onClick={() =>
                        setExpandedRow(isExpanded ? null : s.rowIndex)
                      }
                      className={`cursor-pointer border-b border-zinc-50 transition-colors hover:bg-[#fff9f6] ${
                        isExpanded ? "bg-[#fff9f6]" : ""
                      }`}
                    >
                      <td className="px-4 py-3 align-middle">
                        <span
                          className={`inline-flex h-7 w-7 items-center justify-center rounded-md font-mono text-xs font-bold ${
                            rank <= 3
                              ? "bg-[#ff5b2e] text-white"
                              : "bg-zinc-100 text-zinc-600"
                          }`}
                        >
                          {rank}
                        </span>
                      </td>
                      <td className="px-4 py-3 align-middle">
                        <div className="font-semibold">{getName(s)}</div>
                        <div className="text-xs text-zinc-500 md:hidden">
                          {companyCol && row[companyCol.header]}
                        </div>
                      </td>
                      <td className="hidden px-4 py-3 align-middle text-zinc-700 md:table-cell">
                        {(companyCol && row[companyCol.header]) || "—"}
                      </td>
                      <td className="hidden px-4 py-3 align-middle text-zinc-600 lg:table-cell">
                        {(titleCol && row[titleCol.header]) || "—"}
                      </td>
                      <td className="hidden px-4 py-3 align-middle text-zinc-600 lg:table-cell">
                        {(locationCol && row[locationCol.header]) || "—"}
                      </td>
                      <td className="px-4 py-3 align-middle">
                        <div className="flex items-center justify-end gap-2">
                          <div className="h-1.5 w-12 overflow-hidden rounded-full bg-zinc-100">
                            <div
                              className={`h-full ${c.bar}`}
                              style={{ width: `${s.finalScore}%` }}
                            ></div>
                          </div>
                          <span
                            className={`min-w-[2.5rem] rounded-md px-2 py-0.5 text-center text-xs font-bold tabular-nums ${c.bg} ${c.text}`}
                          >
                            {s.finalScore}
                          </span>
                        </div>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr className="bg-[#fff9f6]">
                        <td colSpan={6} className="px-4 pb-4">
                          <div className="grid gap-4 rounded-xl border border-zinc-200 bg-white p-4 md:grid-cols-2">
                            <div>
                              <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                                All fields
                              </div>
                              <dl className="mt-2 space-y-1 text-xs">
                                {mapping
                                  .filter((m) => m.field !== "unknown" && row[m.header])
                                  .map((m) => (
                                    <div key={m.index} className="flex gap-2">
                                      <dt className="w-28 shrink-0 text-zinc-500">
                                        {m.header}
                                      </dt>
                                      <dd className="font-medium text-zinc-800">
                                        {row[m.header]}
                                      </dd>
                                    </div>
                                  ))}
                              </dl>
                            </div>
                            <div>
                              <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                                Score breakdown
                              </div>
                              <div className="mt-2 space-y-1 text-xs">
                                <div className="flex justify-between rounded-md bg-zinc-50 px-2 py-1">
                                  <span className="text-zinc-500">Baseline</span>
                                  <span className="font-mono font-semibold">+50</span>
                                </div>
                                {matchedRules.length === 0 && (
                                  <div className="rounded-md bg-zinc-50 px-2 py-1 text-zinc-400">
                                    No rules matched
                                  </div>
                                )}
                                {matchedRules.map((r) => (
                                  <div
                                    key={r.id}
                                    className={`flex justify-between rounded-md px-2 py-1 ${
                                      r.points >= 0
                                        ? "bg-emerald-50 text-emerald-700"
                                        : "bg-red-50 text-red-700"
                                    }`}
                                  >
                                    <span>
                                      {r.label || `${r.field} rule`}
                                    </span>
                                    <span className="font-mono font-semibold">
                                      {r.points >= 0 ? "+" : ""}
                                      {r.points}
                                    </span>
                                  </div>
                                ))}
                                <div className="flex justify-between border-t border-zinc-200 px-2 pt-2 font-bold">
                                  <span>Final score</span>
                                  <span className="font-mono">{s.finalScore}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        {pageCount > 1 && (
          <div className="flex items-center justify-between border-t border-zinc-100 px-4 py-3 text-sm">
            <span className="text-zinc-500">
              Page {currentPage + 1} of {pageCount}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
                className="rounded-md border border-zinc-200 bg-white px-3 py-1 text-xs font-medium hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                ← Prev
              </button>
              <button
                onClick={() => setPage(Math.min(pageCount - 1, currentPage + 1))}
                disabled={currentPage >= pageCount - 1}
                className="rounded-md border border-zinc-200 bg-white px-3 py-1 text-xs font-medium hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>

      <p className="text-center text-xs text-zinc-500">
        💡 Click any prospect to see their score breakdown · {industryCol ? "Industry data detected" : "No industry data in this file"}
      </p>
    </div>
  );
}

function FilterCard({
  label,
  count,
  sub,
  active,
  onClick,
  color,
}: {
  label: string;
  count: number;
  sub: string;
  active: boolean;
  onClick: () => void;
  color: "emerald" | "amber" | "zinc";
}) {
  const styles = {
    emerald: {
      activeBorder: "border-emerald-500 bg-emerald-50",
      activeText: "text-emerald-700",
      idleHover: "hover:border-emerald-300",
    },
    amber: {
      activeBorder: "border-amber-500 bg-amber-50",
      activeText: "text-amber-700",
      idleHover: "hover:border-amber-300",
    },
    zinc: {
      activeBorder: "border-zinc-500 bg-zinc-100",
      activeText: "text-zinc-700",
      idleHover: "hover:border-zinc-400",
    },
  }[color];

  return (
    <button
      onClick={onClick}
      className={`rounded-xl border-2 p-4 text-left transition-all ${
        active
          ? `${styles.activeBorder} shadow-sm`
          : `border-zinc-200 bg-white ${styles.idleHover}`
      }`}
    >
      <div className="text-sm font-semibold">{label}</div>
      <div
        className={`mt-1 text-3xl font-bold tabular-nums ${
          active ? styles.activeText : "text-zinc-900"
        }`}
      >
        {count}
      </div>
      <div className="text-xs text-zinc-500">{sub}</div>
    </button>
  );
}
