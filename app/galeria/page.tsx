import Image from "next/image";
import type { GalleryData, GalleryImage } from "@/lib/types";
import { nowIso, readJsonFile } from "@/lib/data-store";

export const metadata = {
  title: "Galeria",
};

const FALLBACK: GalleryData = {
  updatedAt: nowIso(),
  images: [],
};

const CATEGORY_LABELS: Record<string, string> = {
  urodziny: "Urodziny",
  szkolne: "Szkoła",
  firmowe: "Firmowe",
  inne: "Inne",
};

function ImageCard({ img }: { img: GalleryImage }) {
  return (
    <div
      className="group hover-lift"
      style={{
        borderRadius: "1.5rem",
        overflow: "hidden",
        background: "#060508",
        border: "1px solid rgba(255,255,255,0.07)",
        position: "relative",
        transition: "transform 300ms ease, box-shadow 300ms ease, border-color 300ms ease",
      }}
    >
      <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
        <Image
          src={img.url}
          alt={img.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{ transition: "transform 500ms ease" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(6,5,8,0.8) 0%, rgba(6,5,8,0.1) 50%, transparent 100%)",
          }}
        />
        <div style={{ position: "absolute", top: "0.875rem", left: "0.875rem" }}>
          <span className="pill pill-pink" style={{ fontSize: "0.65rem" }}>
            {CATEGORY_LABELS[img.category] ?? img.category}
          </span>
        </div>
      </div>
      <div style={{ padding: "1.125rem 1.25rem" }}>
        <div style={{ fontWeight: 600, color: "#fff", fontSize: "0.9rem" }}>{img.title}</div>
      </div>
    </div>
  );
}

export default async function GalleryPage() {
  const data = await readJsonFile<GalleryData>("galeria.json", FALLBACK);

  return (
    <div className="page-bg noise">
      <div style={{ maxWidth: "75rem", margin: "0 auto", padding: "5rem 1.5rem 6rem" }}>

        {/* Header */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem", marginBottom: "3.5rem" }} className="md:flex-row md:items-end md:justify-between">
          <div>
            <div className="badge badge-pink animate-fade-up" style={{ marginBottom: "1.5rem" }}>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--pink)", display: "inline-block" }} />
              Galeria
            </div>
            <h1 className="heading-xl animate-fade-up delay-100" style={{ color: "#fff", marginBottom: "1rem" }}>
              Zobacz klimat naszych{" "}
              <span style={{ color: "var(--pink-light)" }}>realizacji</span>
            </h1>
            <p className="animate-fade-up delay-200" style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem", lineHeight: 1.75, maxWidth: "32rem" }}>
              Galeria zarządzana z panelu admina. Każde zdjęcie to kawałek naszej historii.
            </p>
          </div>
          <a
            href="/admin/galeria"
            className="btn-dark animate-fade-up delay-300"
            style={{ flexShrink: 0, whiteSpace: "nowrap" }}
          >
            Zarządzaj galerią →
          </a>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }} className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {data.images.map((img) => (
            <ImageCard key={img.id} img={img} />
          ))}
        </div>

        {data.images.length === 0 && (
          <div
            style={{
              borderRadius: "2rem",
              border: "1px dashed rgba(240,23,122,0.25)",
              background: "rgba(240,23,122,0.04)",
              padding: "5rem 2rem",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📸</div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "#fff", fontSize: "1.25rem", marginBottom: "0.5rem" }}>
              Brak zdjęć w galerii
            </div>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
              Dodaj zdjęcia w panelu admina, aby wypełnić galerię.
            </p>
            <a href="/admin/galeria" className="btn-pink" style={{ display: "inline-flex" }}>
              Dodaj pierwsze zdjęcie →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}