import Image from "next/image";
import type { GalleryData, GalleryImage } from "@/lib/types";
import { nowIso, readJsonFile } from "@/lib/data-store";

export const metadata = { title: "Galeria" };

const FALLBACK: GalleryData = { updatedAt: nowIso(), images: [] };

const CATEGORY_LABELS: Record<string, string> = {
  urodziny: "Urodziny",
  szkolne:  "Eventy szkolne",
  firmowe:  "Firmowe",
  inne:     "Inne",
};

function ImageCard({ img }: { img: GalleryImage }) {
  return (
    <div className="gal-item">
      <div className="gal-img-wrap">
        <Image
          src={img.url}
          alt={img.title}
          width={800}
          height={600}
          className="gal-img"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="gal-overlay">
          <span className="gal-cat">
            {CATEGORY_LABELS[img.category] ?? img.category}
          </span>
          <span className="gal-title">{img.title}</span>
        </div>
      </div>
    </div>
  );
}

export default async function GalleryPage() {
  const data = await readJsonFile<GalleryData>("galeria.json", FALLBACK);

  return (
    <>
      <style>{`
        @keyframes pulseDot { 0%,100%{opacity:1} 50%{opacity:.35} }

        /* ── masonry via CSS columns ── */
        .gal-grid {
          columns: 1;
          column-gap: 0.75rem;
        }
        @media(min-width: 540px)  { .gal-grid { columns: 2; } }
        @media(min-width: 900px)  { .gal-grid { columns: 3; } }
        @media(min-width: 1200px) { .gal-grid { columns: 4; } }

        .gal-item {
          break-inside: avoid;
          margin-bottom: 0.75rem;
        }

        .gal-img-wrap {
          position: relative;
          border-radius: 0.75rem;
          overflow: hidden;
          background: #111;
          cursor: pointer;
          display: block;
        }

        .gal-img {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 400ms ease;
        }

        .gal-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(6,5,8,0.75) 0%,
            rgba(6,5,8,0.15) 45%,
            transparent 100%
          );
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 1rem;
          opacity: 0;
          transition: opacity 300ms ease;
        }

        .gal-img-wrap:hover .gal-overlay { opacity: 1; }
        .gal-img-wrap:hover .gal-img     { transform: scale(1.04); }

        .gal-cat {
          display: inline-flex;
          align-self: flex-start;
          padding: 0.2rem 0.55rem;
          border-radius: 9999px;
          background: rgba(240,23,122,0.25);
          border: 1px solid rgba(240,23,122,0.4);
          color: #ff4fa3;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          margin-bottom: 0.35rem;
        }

        .gal-title {
          font-size: 0.84rem;
          font-weight: 600;
          color: #fff;
          line-height: 1.3;
        }
      `}</style>

      <div className="page-bg noise">
        <div style={{ maxWidth:"72rem", margin:"0 auto", padding:"6rem 1.5rem 8rem" }}>

          {/* ── HEADER ── */}
          <div style={{ marginBottom:"3rem" }}>
            <span style={{
              display:"inline-flex", alignItems:"center", gap:"0.42rem",
              padding:"0.36rem 0.9rem", borderRadius:"9999px",
              background:"rgba(240,23,122,0.1)", border:"1px solid rgba(240,23,122,0.22)",
              fontSize:"0.67rem", fontWeight:700, letterSpacing:"0.1em",
              textTransform:"uppercase", color:"var(--pink-light)", marginBottom:"1.5rem",
            }}>
              <span style={{
                width:"5px", height:"5px", borderRadius:"50%",
                background:"var(--pink)", display:"inline-block",
                animation:"pulseDot 2.2s ease-in-out infinite",
              }}/>
              Galeria
            </span>

            <h1 style={{
              fontFamily:"var(--font-display)",
              fontSize:"clamp(2.6rem,5.5vw,4.5rem)",
              fontWeight:700, color:"#fff", lineHeight:1.06,
              letterSpacing:"-0.025em", marginBottom:"1rem",
            }}>
              Nasze realizacje
            </h1>

            <p style={{
              color:"rgba(255,255,255,0.5)",
              fontSize:"clamp(0.95rem,1.8vw,1.1rem)",
              lineHeight:1.8, maxWidth:"460px",
            }}>
              Każde zdjęcie to kawałek historii — imprez, uśmiechów
              i&nbsp;momentów, które zostały w&nbsp;pamięci.
            </p>
          </div>

          {/* divider */}
          <div style={{
            height:"1px", marginBottom:"3rem",
            background:"linear-gradient(90deg,transparent,rgba(240,23,122,0.25),transparent)",
          }}/>

          {/* ── MASONRY GRID ── */}
          {data.images.length > 0 ? (
            <div className="gal-grid">
              {data.images.map((img) => (
                <ImageCard key={img.id} img={img} />
              ))}
            </div>
          ) : (
            <div style={{
              borderRadius:"1.25rem",
              border:"1px dashed rgba(240,23,122,0.2)",
              background:"rgba(240,23,122,0.03)",
              padding:"6rem 1.5rem",
              textAlign:"center",
              display:"flex", flexDirection:"column", alignItems:"center", gap:"1rem",
            }}>
              <div style={{
                width:"3.5rem", height:"3.5rem", borderRadius:"0.875rem",
                background:"rgba(240,23,122,0.1)", border:"1px solid rgba(240,23,122,0.2)",
                display:"flex", alignItems:"center", justifyContent:"center",
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ff4fa3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="3"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <path d="M21 15l-5-5L5 21"/>
                </svg>
              </div>
              <div style={{ fontFamily:"var(--font-display)", fontWeight:700, color:"#fff", fontSize:"1.25rem" }}>
                Galeria jest w przygotowaniu
              </div>
              <p style={{ color:"rgba(255,255,255,0.45)", fontSize:"0.875rem", maxWidth:"22rem", lineHeight:1.7 }}>
                Wkrótce pojawią się tu zdjęcia z naszych realizacji.
              </p>
              <a href="/kontakt" style={{
                display:"inline-flex", alignItems:"center", gap:"0.5rem",
                marginTop:"0.5rem", height:"3rem", padding:"0 1.75rem",
                borderRadius:"9999px", background:"var(--pink)", color:"#fff",
                fontSize:"0.875rem", fontWeight:700, textDecoration:"none",
                boxShadow:"0 6px 24px rgba(240,23,122,0.4)",
              }}>
                Skontaktuj się →
              </a>
            </div>
          )}

        </div>
      </div>
    </>
  );
}