export type DetectedField =
  | "name"
  | "firstName"
  | "lastName"
  | "email"
  | "company"
  | "title"
  | "location"
  | "industry"
  | "companySize"
  | "seniority"
  | "linkedinUrl"
  | "phone"
  | "website"
  | "unknown";

export type ColumnMapping = {
  header: string;
  index: number;
  field: DetectedField;
  confidence: number;
};

const FIELD_PATTERNS: Record<Exclude<DetectedField, "unknown">, RegExp[]> = {
  name: [
    /^(full[\s_-]?name|contact[\s_-]?name|prospect[\s_-]?name|person|name)$/i,
  ],
  firstName: [/^(first[\s_-]?name|firstname|prenom|prénom|given[\s_-]?name)$/i],
  lastName: [
    /^(last[\s_-]?name|lastname|surname|family[\s_-]?name|nom)$/i,
  ],
  email: [/^(e[\s_-]?mail|email[\s_-]?address|work[\s_-]?email|email[\s_-]?\d*)$/i],
  company: [
    /^(company|company[\s_-]?name|organization|organisation|account|employer|entreprise|société|societe)$/i,
  ],
  title: [
    /^(title|job[\s_-]?title|position|role|headline|poste|fonction|current[\s_-]?position)$/i,
  ],
  location: [
    /^(location|city|country|region|pays|ville|address|adresse|geo|area)$/i,
  ],
  industry: [/^(industry|sector|vertical|secteur|domain|domaine|industrie)$/i],
  companySize: [
    /^(company[\s_-]?size|employees|headcount|staff|size|nb[\s_-]?employees|effectif)$/i,
  ],
  seniority: [/^(seniority|level|niveau|rank|grade)$/i],
  linkedinUrl: [
    /^(linkedin|linkedin[\s_-]?url|profile[\s_-]?url|profil[\s_-]?linkedin|li[\s_-]?url)$/i,
  ],
  phone: [/^(phone|telephone|téléphone|tel|mobile|cell)$/i],
  website: [/^(website|site|web|url|company[\s_-]?url|domain)$/i],
};

export function detectField(header: string): {
  field: DetectedField;
  confidence: number;
} {
  const cleaned = header.trim().replace(/^["']|["']$/g, "");

  for (const [field, patterns] of Object.entries(FIELD_PATTERNS) as [
    Exclude<DetectedField, "unknown">,
    RegExp[]
  ][]) {
    for (const pattern of patterns) {
      if (pattern.test(cleaned)) {
        return { field, confidence: 1 };
      }
    }
  }

  const lower = cleaned.toLowerCase();
  if (lower.includes("email")) return { field: "email", confidence: 0.6 };
  if (lower.includes("name")) return { field: "name", confidence: 0.5 };
  if (lower.includes("company")) return { field: "company", confidence: 0.6 };
  if (lower.includes("title") || lower.includes("position"))
    return { field: "title", confidence: 0.6 };
  if (lower.includes("city") || lower.includes("country"))
    return { field: "location", confidence: 0.6 };
  if (lower.includes("industry")) return { field: "industry", confidence: 0.7 };
  if (lower.includes("linkedin")) return { field: "linkedinUrl", confidence: 0.7 };

  return { field: "unknown", confidence: 0 };
}

export function detectColumnMapping(headers: string[]): ColumnMapping[] {
  return headers.map((header, index) => {
    const { field, confidence } = detectField(header);
    return { header, index, field, confidence };
  });
}

export const FIELD_LABELS: Record<DetectedField, string> = {
  name: "Full name",
  firstName: "First name",
  lastName: "Last name",
  email: "Email",
  company: "Company",
  title: "Job title",
  location: "Location",
  industry: "Industry",
  companySize: "Company size",
  seniority: "Seniority",
  linkedinUrl: "LinkedIn URL",
  phone: "Phone",
  website: "Website",
  unknown: "Ignored",
};

export const FIELD_OPTIONS: { value: DetectedField; label: string }[] = (
  Object.keys(FIELD_LABELS) as DetectedField[]
).map((value) => ({ value, label: FIELD_LABELS[value] }));
