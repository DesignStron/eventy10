import { NextResponse } from "next/server";

import { nowIso, randomId, readJsonFile, writeJsonFile } from "@/lib/data-store";
import type { GalleryData, GalleryImage } from "@/lib/types";

const FILE = "galeria.json";

const FALLBACK: GalleryData = {
  updatedAt: nowIso(),
  images: [],
};

export async function GET() {
  const data = await readJsonFile<GalleryData>(FILE, FALLBACK);
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const payload = (await req.json()) as Omit<GalleryImage, "id" | "createdAt">;

  const data = await readJsonFile<GalleryData>(FILE, FALLBACK);

  const nextImage: GalleryImage = {
    id: randomId("img"),
    title: payload.title,
    url: payload.url,
    category: payload.category,
    createdAt: nowIso(),
  };

  const next: GalleryData = {
    ...data,
    updatedAt: nowIso(),
    images: [nextImage, ...data.images],
  };

  await writeJsonFile(FILE, next);

  return NextResponse.json(next);
}

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Brak parametru id" }, { status: 400 });
  }

  const data = await readJsonFile<GalleryData>(FILE, FALLBACK);

  const next: GalleryData = {
    ...data,
    updatedAt: nowIso(),
    images: data.images.filter((img) => img.id !== id),
  };

  await writeJsonFile(FILE, next);

  return NextResponse.json(next);
}
