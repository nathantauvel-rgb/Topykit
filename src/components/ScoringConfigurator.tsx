"use client";

import { useMemo, useState } from "react";
import { ColumnMapping, DetectedField, FIELD_LABELS } from "@/lib/csv";
import { ParsedCsv } from "@/components/CsvUploader";
import {
  OPERATOR_LABELS,
  RULE_TEMPLATES,
  RuleOperator,
  ScoringRule,
  getValidOperators,
  isNumericField,
  newRuleId,
  scoreAll,
} from "@/lib/scoring";

type Props = {
  data: ParsedCsv;
  mapping: ColumnMapping[];
  onConfirm: (rules: ScoringRule[]) => void;
  onBack: () => void;
};

export default function ScoringConfigurator({
  data,
  mapping,
  onConfirm,
  onBack,
}: Props) {
  const [rules, setRules] = useState<ScoringRule[]>([]);
  const [appliedTemplates, setAppliedTemplates] = useState<Set<string>>(
    new Set()
  );

  const availableFields = useMemo(
    () =>
      mapping
        .filter((m) => m.field !== "unknown")
        .map((m) => m.field)
        .filter((f, i, arr) => arr.indexOf(f) === i),
    [mapping]
  );

  const previewScores = useMemo(
    () => scoreAll(data.rows.slice(0, 50), mapping, rules).slice(0, 5),
    [data.rows, mapping, rules]
  );

  function addRule(field?: DetectedField) {
    const targetField = field ?? availableFields[0] ?? "title";
    const operators = getValidOperators(targetField);
    const newRule: ScoringRule = {
      id: newRuleId(),
      field: targetField,
      operator: operators[0],
      values: isNumericField(targetField) ? ["100"] : [""],
      points: 10,
    };
    setRules((prev) => [...prev, newRule]);
  }

  function applyTemplate(templateId: string) {
    const template = RULE_TEMPLATES.find((t) => t.id === templateId);
    if (!template) return;
    if (appliedTemplates.has(templateId)) return;

    const usable = template.rules.filter((r) => availableFields.includes(r.field));
    const newRules = usable.map((r) => ({ ...r, id: newRuleId() }));
    setRules((prev) => [...prev, ...newRules]);
    setAppliedTemplates((prev) => new Set(prev).add(templateId));
  }

  function updateRule(id: string, updates: Partial<ScoringRule>) {
    setRules((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const next = { ...r, ...updates };
        if (updates.field && updates.field !== r.field) {
          const ops = getValidOperators(updates.field);
          next.operator = ops[0];
          next.values = isNumericField(updates.field) ? ["100"] : [""];
        }
        if (updates.operator && updates.operator !== r.operator) {
          next.values =
            updates.operator === "between"
              ? ["50", "500"]
              : isNumericField(next.field)
              ? ["100"]
              : [""];
        }
        return next;
      })
    );
  }

  function deleteRule(id: string) {
    setRules((prev) => prev.filter((r) => r.id !== id));
  }

  const totalPoints = rules.reduce((sum, r) => sum + Math.abs(r.points), 0);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">Scoring rules</h2>
              <p className="mt-1 text-sm text-zinc-500">
                Add rules that match what makes a great lead for you. Each
                matched rule adds (or subtracts) points.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={onBack}
                className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
              >
                ← Back
              </button>
              <button
                onClick={() => onConfirm(rules)}
                disabled={rules.length === 0}
                className="rounded-full bg-[#ff5b2e] px-5 py-2 text-sm font-bold text-white shadow-md shadow-[#ff5b2e]/20 hover:bg-[#e84d24] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
              >
                Score {data.totalRows.toLocaleString()} prospects →
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-dashed border-[#ff5b2e]/30 bg-[#fff9f6] p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#ff5b2e]">
                Quick-start templates
              </h3>
              <p className="mt-1 text-sm text-zinc-600">
                Click multiple templates to combine them. Edit any rule after.
              </p>
            </div>
            {appliedTemplates.size > 0 && (
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                {appliedTemplates.size} applied
              </span>
            )}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {RULE_TEMPLATES.map((t) => {
              const usable = t.rules.filter((r) =>
                availableFields.includes(r.field)
              );
              const disabled = usable.length === 0;
              const isApplied = appliedTemplates.has(t.id);
              return (
                <button
                  key={t.id}
                  onClick={() => applyTemplate(t.id)}
                  disabled={disabled || isApplied}
                  className={`group relative rounded-xl border p-4 text-left transition-all disabled:cursor-not-allowed ${
                    isApplied
                      ? "border-emerald-400 bg-emerald-50"
                      : disabled
                      ? "border-zinc-200 bg-white opacity-40"
                      : "border-zinc-200 bg-white hover:border-[#ff5b2e] hover:shadow-md"
                  }`}
                >
                  {isApplied && (
                    <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">
                      ✓
                    </div>
                  )}
                  <div className="font-semibold">{t.name}</div>
                  <div className="mt-1 text-xs text-zinc-500">
                    {t.description}
                  </div>
                  <div
                    className={`mt-2 text-[10px] font-medium ${
                      isApplied ? "text-emerald-700" : "text-zinc-400"
                    }`}
                  >
                    {isApplied
                      ? "Applied — see rules below"
                      : disabled
                      ? "Required column not in your file"
                      : `Adds ${usable.length} rule${usable.length > 1 ? "s" : ""}`}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          {rules.map((rule, i) => (
            <RuleCard
              key={rule.id}
              rule={rule}
              index={i}
              availableFields={availableFields}
              onChange={(updates) => updateRule(rule.id, updates)}
              onDelete={() => deleteRule(rule.id)}
            />
          ))}

          <button
            onClick={() => addRule()}
            disabled={availableFields.length === 0}
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-zinc-300 bg-white py-4 text-sm font-semibold text-zinc-600 hover:border-[#ff5b2e] hover:bg-[#fff9f6] hover:text-[#ff5b2e] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add a rule
          </button>
        </div>
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500">
            Live preview
          </h3>
          <p className="mt-2 text-xs text-zinc-500">
            Top 5 prospects scored with current rules.
          </p>

          {rules.length === 0 ? (
            <div className="mt-6 rounded-xl border border-dashed border-zinc-200 bg-zinc-50 p-6 text-center text-xs text-zinc-500">
              Add a rule to see how your prospects rank.
            </div>
          ) : (
            <div className="mt-4 space-y-2">
              {previewScores.map((s, i) => {
                const row = data.rows[s.rowIndex];
                const nameCol = mapping.find((m) => m.field === "name");
                const companyCol = mapping.find((m) => m.field === "company");
                const titleCol = mapping.find((m) => m.field === "title");
                const name =
                  (nameCol && row[nameCol.header]) ||
                  `Prospect ${s.rowIndex + 1}`;
                const company =
                  (companyCol && row[companyCol.header]) || "—";
                const title = titleCol && row[titleCol.header];

                const color =
                  s.finalScore >= 75
                    ? "bg-emerald-500"
                    : s.finalScore >= 50
                    ? "bg-amber-500"
                    : "bg-zinc-400";

                return (
                  <div
                    key={s.rowIndex}
                    className="flex items-center gap-3 rounded-lg border border-zinc-100 p-2.5"
                  >
                    <div className="font-mono text-xs font-bold text-zinc-400">
                      #{i + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-xs font-semibold">
                        {name}
                      </div>
                      <div className="truncate text-[10px] text-zinc-500">
                        {company}
                        {title ? ` · ${title}` : ""}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="h-1.5 w-8 overflow-hidden rounded-full bg-zinc-100">
                        <div className={`h-full ${color}`} style={{ width: `${s.finalScore}%` }}></div>
                      </div>
                      <span className="min-w-[2rem] text-right text-xs font-bold tabular-nums">
                        {s.finalScore}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="mt-5 border-t border-zinc-100 pt-4 text-xs text-zinc-500">
            <div className="flex justify-between">
              <span>Active rules</span>
              <span className="font-semibold text-zinc-900">{rules.length}</span>
            </div>
            <div className="mt-1.5 flex justify-between">
              <span>Score weight</span>
              <span className="font-semibold text-zinc-900">
                {totalPoints} pts
              </span>
            </div>
            <div className="mt-1.5 flex justify-between">
              <span>Baseline</span>
              <span className="font-semibold text-zinc-900">50 pts</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

function RuleCard({
  rule,
  index,
  availableFields,
  onChange,
  onDelete,
}: {
  rule: ScoringRule;
  index: number;
  availableFields: DetectedField[];
  onChange: (updates: Partial<ScoringRule>) => void;
  onDelete: () => void;
}) {
  const operators = getValidOperators(rule.field);
  const isNumeric = isNumericField(rule.field);
  const valuesAsString = rule.values.join(", ");

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-xs font-bold text-zinc-600">
          {index + 1}
        </div>
        <div className="flex-1 space-y-3">
          <div className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
            <select
              value={rule.field}
              onChange={(e) =>
                onChange({ field: e.target.value as DetectedField })
              }
              className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-medium outline-none focus:border-[#ff5b2e]"
            >
              {availableFields.map((f) => (
                <option key={f} value={f}>
                  {FIELD_LABELS[f]}
                </option>
              ))}
            </select>

            <select
              value={rule.operator}
              onChange={(e) =>
                onChange({ operator: e.target.value as RuleOperator })
              }
              className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#ff5b2e]"
            >
              {operators.map((op) => (
                <option key={op} value={op}>
                  {OPERATOR_LABELS[op]}
                </option>
              ))}
            </select>

            <button
              onClick={onDelete}
              className="rounded-lg p-2 text-zinc-400 hover:bg-red-50 hover:text-red-600"
              title="Remove rule"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3" />
              </svg>
            </button>
          </div>

          {rule.operator === "between" ? (
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                value={rule.values[0] ?? ""}
                onChange={(e) =>
                  onChange({ values: [e.target.value, rule.values[1] ?? ""] })
                }
                placeholder="min"
                className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#ff5b2e]"
              />
              <input
                type="number"
                value={rule.values[1] ?? ""}
                onChange={(e) =>
                  onChange({ values: [rule.values[0] ?? "", e.target.value] })
                }
                placeholder="max"
                className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#ff5b2e]"
              />
            </div>
          ) : isNumeric ? (
            <input
              type="number"
              value={rule.values[0] ?? ""}
              onChange={(e) => onChange({ values: [e.target.value] })}
              placeholder="Enter a number"
              className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#ff5b2e]"
            />
          ) : (
            <input
              type="text"
              value={valuesAsString}
              onChange={(e) =>
                onChange({
                  values: e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
              placeholder='e.g. CEO, Founder, Head of'
              className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#ff5b2e]"
            />
          )}

          {!isNumeric && rule.operator !== "between" && (
            <p className="text-xs text-zinc-400">
              Separate multiple values with commas. Match is case-insensitive.
            </p>
          )}

          <div className="flex items-center gap-3 border-t border-zinc-100 pt-3">
            <span className="text-xs font-medium text-zinc-500">
              When matched, score:
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onChange({ points: rule.points - 5 })}
                className="flex h-7 w-7 items-center justify-center rounded-md border border-zinc-200 text-zinc-600 hover:bg-zinc-50"
              >
                −
              </button>
              <input
                type="number"
                value={rule.points}
                onChange={(e) =>
                  onChange({ points: parseInt(e.target.value, 10) || 0 })
                }
                className={`w-16 rounded-md border px-2 py-1 text-center text-sm font-bold tabular-nums outline-none ${
                  rule.points > 0
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : rule.points < 0
                    ? "border-red-200 bg-red-50 text-red-700"
                    : "border-zinc-200 text-zinc-700"
                }`}
              />
              <button
                onClick={() => onChange({ points: rule.points + 5 })}
                className="flex h-7 w-7 items-center justify-center rounded-md border border-zinc-200 text-zinc-600 hover:bg-zinc-50"
              >
                +
              </button>
              <span className="text-xs text-zinc-500">points</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
