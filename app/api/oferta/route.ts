import { NextResponse } from "next/server";

import { nowIso, readJsonFile, writeJsonFile } from "@/lib/data-store";
import type { OfferData } from "@/lib/types";

const FILE = "oferta.json";

const FALLBACK: OfferData = {
  updatedAt: nowIso(),
  sections: [],
};

export async function GET() {
  const data = await readJsonFile<OfferData>(FILE, FALLBACK);
  return NextResponse.json(data);
}

export async function PUT(req: Request) {
  const body = (await req.json()) as OfferData;

  const next: OfferData = {
    ...body,
    updatedAt: nowIso(),
  };

  await writeJsonFile(FILE, next);

  return NextResponse.json(next);
}
