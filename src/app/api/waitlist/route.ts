import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const WAITLIST_FILE = path.join(process.cwd(), "data", "waitlist.json");

type Entry = {
  email: string;
  createdAt: string;
};

async function readEntries(): Promise<Entry[]> {
  try {
    const content = await fs.readFile(WAITLIST_FILE, "utf-8");
    return JSON.parse(content) as Entry[];
  } catch {
    return [];
  }
}

async function writeEntries(entries: Entry[]) {
  await fs.mkdir(path.dirname(WAITLIST_FILE), { recursive: true });
  await fs.writeFile(WAITLIST_FILE, JSON.stringify(entries, null, 2), "utf-8");
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = (body?.email || "").toString().trim().toLowerCase();

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const entries = await readEntries();

    if (entries.some((e) => e.email === email)) {
      return NextResponse.json({ ok: true, alreadyRegistered: true });
    }

    entries.push({ email, createdAt: new Date().toISOString() });
    await writeEntries(entries);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Server error. Please try again." },
      { status: 500 }
    );
  }
}
