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

function ImageCard({ img, index }: { img: GalleryImage; index: number }) {
  const tall = index % 5 === 0 || index % 5 === 3;
  return (
    <div
      className="group hover-lift"
      style={{
        borderRadius: "1.25rem",
        overflow: "hidden",
        background: "#0c0a10",
        border: "1px solid rgba(255,255,255,0.07)",
        position: "relative",
        transition: "transform 300ms ease, box-shadow 300ms ease, border-color 300ms ease",
        gridRow: tall ? "span 2" : "span 1",
      }}
    >
      <div
        style={{
          position: "relative",
          height: tall ? "100%" : "220px",
          minHeight: tall ? "320px" : "220px",
          overflow: "hidden",
        }}
      >
        <Image
          src={img.url}
          alt={img.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {/* gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(6,5,8,0.85) 0%, rgba(6,5,8,0.1) 55%, transparent 100%)",
          }}
        />
        {/* category pill */}
        <div style={{ position: "absolute", top: "0.875rem", left: "0.875rem" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "0.25rem 0.625rem",
              borderRadius: "9999px",
              background: "rgba(240,23,122,0.2)",
              border: "1px solid rgba(240,23,122,0.35)",
              color: "#ff4fa3",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              backdropFilter: "blur(8px)",
            }}
          >
            {CATEGORY_LABELS[img.category] ?? img.category}
          </span>
        </div>
        {/* title on image */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "1rem 1.125rem",
          }}
        >
          <div
            style={{
              fontWeight: 600,
              color: "#fff",
              fontSize: "0.875rem",
              lineHeight: 1.3,
              textShadow: "0 1px 8px rgba(0,0,0,0.5)",
            }}
          >
            {img.title}
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function GalleryPage() {
  const data = await readJsonFile<GalleryData>("galeria.json", FALLBACK);

  return (
    <div className="page-bg noise">
      <div
        style={{
          maxWidth: "75rem",
          margin: "0 auto",
          padding: "3.5rem 1.5rem 5rem",
        }}
      >
        {/* ── PAGE HEADER ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginBottom: "3rem",
          }}
        >
          {/* badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.375rem 0.875rem",
              borderRadius: "9999px",
              background: "rgba(240,23,122,0.1)",
              border: "1px solid rgba(240,23,122,0.25)",
              width: "fit-content",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "var(--pink)",
                display: "inline-block",
                animation: "pulsePink 2s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#ff4fa3",
              }}
            >
              Galeria
            </span>
          </div>

          {/* title row */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "1.5rem",
              flexWrap: "wrap",
            }}
          >
            <div>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.75rem, 4vw, 3rem)",
                  fontWeight: 700,
                  color: "#fff",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  marginBottom: "0.75rem",
                }}
              >
                Zobacz klimat naszych{" "}
                <span style={{ color: "var(--pink-light)" }}>realizacji</span>
              </h1>
              <p
                style={{
                  color: "rgba(255,255,255,0.55)",
                  fontSize: "clamp(0.875rem, 1.5vw, 1rem)",
                  lineHeight: 1.7,
                  maxWidth: "36rem",
                }}
              >
                Galeria zarządzana z panelu admina. Każde zdjęcie to kawałek naszej historii.
              </p>
            </div>
            <a
              href="/admin/galeria"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.625rem 1.25rem",
                borderRadius: "9999px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.65)",
                fontSize: "0.8rem",
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 200ms ease",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              Zarządzaj galerią →
            </a>
          </div>
        </div>

        {/* ── GALLERY GRID ── */}
        {data.images.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gridAutoRows: "220px",
              gap: "1rem",
            }}
          >
            {data.images.map((img, i) => (
              <ImageCard key={img.id} img={img} index={i} />
            ))}
          </div>
        ) : (
          /* ── EMPTY STATE ── */
          <div
            style={{
              borderRadius: "1.5rem",
              border: "1px dashed rgba(240,23,122,0.25)",
              background: "rgba(240,23,122,0.04)",
              padding: "5rem 1.5rem",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <div style={{ fontSize: "3rem" }}>📸</div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                color: "#fff",
                fontSize: "1.25rem",
              }}
            >
              Brak zdjęć w galerii
            </div>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem", maxWidth: "24rem", lineHeight: 1.6 }}>
              Dodaj zdjęcia w panelu admina, aby wypełnić galerię.
            </p>
            <a
              href="/admin/galeria"
              style={{
                display: "inline-flex",
                alignItems: "center",
                marginTop: "0.5rem",
                padding: "0.75rem 1.5rem",
                borderRadius: "9999px",
                background: "linear-gradient(135deg, #f0177a, #ff4fa3)",
                color: "#fff",
                fontSize: "0.875rem",
                fontWeight: 700,
                textDecoration: "none",
                boxShadow: "0 4px 20px rgba(240,23,122,0.4)",
              }}
            >
              Dodaj pierwsze zdjęcie →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}