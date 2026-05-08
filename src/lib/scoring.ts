import { ColumnMapping, DetectedField } from "@/lib/csv";

export type RuleOperator =
  | "contains_any"
  | "contains_none"
  | "equals_any"
  | "greater_than"
  | "less_than"
  | "between";

export type ScoringRule = {
  id: string;
  field: DetectedField;
  operator: RuleOperator;
  values: string[];
  points: number;
  label?: string;
  templateId?: string;
};

export const OPERATOR_LABELS: Record<RuleOperator, string> = {
  contains_any: "contains any of",
  contains_none: "contains none of",
  equals_any: "is exactly",
  greater_than: "is greater than",
  less_than: "is less than",
  between: "is between",
};

export const TEXT_OPERATORS: RuleOperator[] = [
  "contains_any",
  "contains_none",
  "equals_any",
];
export const NUMBER_OPERATORS: RuleOperator[] = [
  "greater_than",
  "less_than",
  "between",
];

export const NUMERIC_FIELDS: DetectedField[] = ["companySize"];

export function isNumericField(field: DetectedField): boolean {
  return NUMERIC_FIELDS.includes(field);
}

export function getValidOperators(field: DetectedField): RuleOperator[] {
  return isNumericField(field) ? NUMBER_OPERATORS : TEXT_OPERATORS;
}

export function newRuleId(): string {
  return `r_${Math.random().toString(36).slice(2, 10)}`;
}

function getCellValue(
  row: Record<string, string>,
  mapping: ColumnMapping[],
  field: DetectedField
): string | null {
  const col = mapping.find((m) => m.field === field);
  if (!col) return null;
  const value = row[col.header];
  if (value === undefined || value === null) return null;
  const trimmed = value.toString().trim();
  return trimmed === "" ? null : trimmed;
}

function parseNumber(value: string | null): number | null {
  if (value === null) return null;
  const cleaned = value.replace(/[^\d.-]/g, "");
  if (cleaned === "" || cleaned === "-") return null;
  const num = parseFloat(cleaned);
  return Number.isNaN(num) ? null : num;
}

export function ruleMatches(
  row: Record<string, string>,
  mapping: ColumnMapping[],
  rule: ScoringRule
): boolean {
  const cell = getCellValue(row, mapping, rule.field);

  if (cell === null) {
    return rule.operator === "contains_none";
  }

  const cellLower = cell.toLowerCase();

  switch (rule.operator) {
    case "contains_any":
      return rule.values.some((v) =>
        cellLower.includes(v.toLowerCase().trim())
      );
    case "contains_none":
      return !rule.values.some((v) =>
        cellLower.includes(v.toLowerCase().trim())
      );
    case "equals_any":
      return rule.values.some(
        (v) => cellLower === v.toLowerCase().trim()
      );
    case "greater_than": {
      const num = parseNumber(cell);
      const target = parseNumber(rule.values[0] ?? null);
      if (num === null || target === null) return false;
      return num > target;
    }
    case "less_than": {
      const num = parseNumber(cell);
      const target = parseNumber(rule.values[0] ?? null);
      if (num === null || target === null) return false;
      return num < target;
    }
    case "between": {
      const num = parseNumber(cell);
      const min = parseNumber(rule.values[0] ?? null);
      const max = parseNumber(rule.values[1] ?? null);
      if (num === null || min === null || max === null) return false;
      return num >= min && num <= max;
    }
  }
}

export type ProspectScore = {
  rowIndex: number;
  rawScore: number;
  finalScore: number;
  matchedRuleIds: string[];
};

export function scoreProspect(
  row: Record<string, string>,
  rowIndex: number,
  mapping: ColumnMapping[],
  rules: ScoringRule[]
): ProspectScore {
  let raw = 50;
  const matched: string[] = [];

  for (const rule of rules) {
    if (ruleMatches(row, mapping, rule)) {
      raw += rule.points;
      matched.push(rule.id);
    }
  }

  const final = Math.max(0, Math.min(100, Math.round(raw)));

  return {
    rowIndex,
    rawScore: raw,
    finalScore: final,
    matchedRuleIds: matched,
  };
}

export function scoreAll(
  rows: Record<string, string>[],
  mapping: ColumnMapping[],
  rules: ScoringRule[]
): ProspectScore[] {
  return rows
    .map((row, i) => scoreProspect(row, i, mapping, rules))
    .sort((a, b) => b.finalScore - a.finalScore);
}

export type RuleTemplate = {
  id: string;
  name: string;
  description: string;
  rules: Omit<ScoringRule, "id">[];
};

export const RULE_TEMPLATES: RuleTemplate[] = [
  {
    id: "decision_makers",
    name: "🎯 Decision makers",
    description: "Boost senior titles, deprioritize juniors",
    rules: [
      {
        field: "title",
        operator: "contains_any",
        values: ["CEO", "CTO", "CMO", "CFO", "Founder", "Head of", "VP", "Director"],
        points: 30,
        label: "Senior decision maker",
      },
      {
        field: "title",
        operator: "contains_any",
        values: ["Junior", "Intern", "Assistant", "Trainee"],
        points: -25,
        label: "Junior role",
      },
    ],
  },
  {
    id: "saas_target",
    name: "💻 SaaS / Tech focus",
    description: "Prioritize software & tech companies",
    rules: [
      {
        field: "industry",
        operator: "contains_any",
        values: ["SaaS", "Software", "Tech", "AI", "FinTech"],
        points: 20,
        label: "Tech industry",
      },
    ],
  },
  {
    id: "mid_market",
    name: "🏢 Mid-market sweet spot",
    description: "Companies between 50 and 500 employees",
    rules: [
      {
        field: "companySize",
        operator: "between",
        values: ["50", "500"],
        points: 25,
        label: "Mid-market company",
      },
      {
        field: "companySize",
        operator: "less_than",
        values: ["20"],
        points: -15,
        label: "Too small",
      },
    ],
  },
  {
    id: "europe_focus",
    name: "🌍 Europe focus",
    description: "Boost European prospects",
    rules: [
      {
        field: "location",
        operator: "contains_any",
        values: [
          "Paris", "London", "Berlin", "Madrid", "Amsterdam",
          "Lisbon", "Munich", "Lyon", "Edinburgh", "Dublin", "France",
          "UK", "Germany", "Spain", "Netherlands", "Portugal",
        ],
        points: 15,
        label: "European location",
      },
    ],
  },
];
