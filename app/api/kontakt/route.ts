import { NextResponse } from "next/server";

import { nowIso, randomId, readJsonFile, writeJsonFile } from "@/lib/data-store";
import type { ContactData, ContactMessage } from "@/lib/types";

const FILE = "kontakt.json";

const FALLBACK: ContactData = {
  updatedAt: nowIso(),
  messages: [],
};

export async function GET() {
  const data = await readJsonFile<ContactData>(FILE, FALLBACK);
  return NextResponse.json(data);
}

type ContactCreatePayload = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export async function POST(req: Request) {
  const payload = (await req.json()) as ContactCreatePayload;

  if (!payload?.name || !payload?.email || !payload?.message) {
    return NextResponse.json(
      { error: "Uzupełnij wymagane pola: imię, email, wiadomość." },
      { status: 400 },
    );
  }

  const data = await readJsonFile<ContactData>(FILE, FALLBACK);

  const nextMessage: ContactMessage = {
    id: randomId("msg"),
    name: payload.name,
    email: payload.email,
    phone: payload.phone ?? "",
    message: payload.message,
    createdAt: nowIso(),
    status: "nowe",
  };

  const next: ContactData = {
    ...data,
    updatedAt: nowIso(),
    messages: [nextMessage, ...data.messages],
  };

  await writeJsonFile(FILE, next);

  return NextResponse.json({ ok: true, message: nextMessage });
}
