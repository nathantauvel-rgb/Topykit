"use client";

import { ScoringRule, migrateRule } from "@/lib/scoring";

const RULES_KEY = "topykit:current-rules:v1";
const TEMPLATES_KEY = "topykit:user-templates:v1";

export type UserTemplate = {
  id: string;
  name: string;
  description?: string;
  rules: Omit<ScoringRule, "id" | "templateId">[];
  createdAt: string;
};

function migrateUserTemplate(t: UserTemplate): UserTemplate {
  return {
    ...t,
    rules: t.rules.map((r) => {
      const migrated = migrateRule({ ...r, id: "tmp" });
      const { id, templateId, ...rest } = migrated;
      void id;
      void templateId;
      return rest;
    }),
  };
}

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function saveCurrentRules(rules: ScoringRule[]) {
  if (!isBrowser()) return;
  try {
    if (rules.length === 0) {
      localStorage.removeItem(RULES_KEY);
      return;
    }
    localStorage.setItem(RULES_KEY, JSON.stringify(rules));
  } catch {
    // Silently fail (quota, private mode, etc.)
  }
}

export function loadCurrentRules(): ScoringRule[] | null {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(RULES_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    return parsed.map(migrateRule);
  } catch {
    return null;
  }
}

export function clearCurrentRules() {
  if (!isBrowser()) return;
  try {
    localStorage.removeItem(RULES_KEY);
  } catch {
    /* noop */
  }
}

export function loadUserTemplates(): UserTemplate[] {
  if (!isBrowser()) return [];
  try {
    const raw = localStorage.getItem(TEMPLATES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return (parsed as UserTemplate[]).map(migrateUserTemplate);
  } catch {
    return [];
  }
}

function saveUserTemplates(templates: UserTemplate[]) {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(TEMPLATES_KEY, JSON.stringify(templates));
  } catch {
    /* noop */
  }
}

export function addUserTemplate(
  name: string,
  rules: ScoringRule[],
  description?: string
): UserTemplate {
  const template: UserTemplate = {
    id: `ut_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
    name: name.trim() || "Untitled template",
    description: description?.trim() || undefined,
    rules: rules.map((r) => {
      const { id, templateId, ...rest } = r;
      void id;
      void templateId;
      return rest;
    }),
    createdAt: new Date().toISOString(),
  };
  const all = loadUserTemplates();
  saveUserTemplates([...all, template]);
  return template;
}

export function deleteUserTemplate(id: string) {
  const all = loadUserTemplates().filter((t) => t.id !== id);
  saveUserTemplates(all);
}

export function renameUserTemplate(id: string, name: string) {
  const all = loadUserTemplates().map((t) =>
    t.id === id ? { ...t, name: name.trim() || t.name } : t
  );
  saveUserTemplates(all);
}
