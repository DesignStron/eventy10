import Image from "next/image";
import type { GalleryData, GalleryImage } from "@/lib/types";

export const metadata = { title: "Galeria" };

const FALLBACK: GalleryData = { updatedAt: new Date().toISOString(), images: [] };

const CATEGORY_LABELS: Record<string, string> = {
  urodziny: "Urodziny",
  szkolne:  "Eventy szkolne",
  firmowe:  "Firmowe",
  inne:     "Inne",
};

function ImageCard({ img, index }: { img: GalleryImage; index: number }) {
  return (
    <div className="gal-item" style={{ animationDelay: `${0.04 + (index % 12) * 0.055}s` }}>
      <div className="gal-img-wrap">
        <Image
          src={img.url}
          alt={img.title}
          width={800}
          height={600}
          className="gal-img"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Overlay */}
        <div className="gal-overlay">
          <div className="gal-overlay-inner">
            <span className="gal-cat">
              {CATEGORY_LABELS[img.category] ?? img.category}
            </span>
            <span className="gal-title">{img.title}</span>
          </div>
        </div>

        {/* Corner accent */}
        <div className="gal-corner"/>
      </div>
    </div>
  );
}

async function fetchGalleryData() {
  try {
    const res = await fetch('http://localhost:3000/api/galeria', { cache: 'no-store' });
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.error('Failed to fetch gallery data:', error);
  }
  // Fallback data
  return {
    updatedAt: new Date().toISOString(),
    images: []
  };
}

export default async function GalleryPage() {
  const data = await fetchGalleryData();

  const counts = Object.entries(CATEGORY_LABELS).map(([key, label]) => ({
    key, label,
    count: data.images.filter((img: GalleryImage) => img.category === key).length,
  })).filter(c => c.count > 0);

  return (
    <>
      <style>{`
        @keyframes pulseDot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.35)} }
        @keyframes fadeUp   { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimBar  { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes floatY   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }

        .fu { animation:fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both; }
        .d1{animation-delay:.06s} .d2{animation-delay:.16s} .d3{animation-delay:.28s}

        /* ── HERO BADGE ── */
        .gal-hero-badge {
          display:inline-flex; align-items:center; gap:0.5rem;
          padding:0.38rem 1rem; border-radius:9999px;
          background:rgba(240,23,122,0.1); border:1px solid rgba(240,23,122,0.25);
          font-size:0.63rem; font-weight:800; letter-spacing:0.12em;
          text-transform:uppercase; color:var(--pink-light);
          margin-bottom:1.5rem;
        }
        html[data-theme="light"] .gal-hero-badge {
          background:rgba(240,23,122,0.08); border:1px solid rgba(240,23,122,0.3);
          color:var(--pink);
        }

        /* ── HERO TITLE ── */
        .gal-hero-title {
          font-family:var(--font-display);
          font-size:clamp(2.6rem,5.5vw,4.5rem);
          font-weight:700; color:#fff; line-height:1.06;
          letter-spacing:-0.028em; margin-bottom:1.25rem;
        }
        html[data-theme="light"] .gal-hero-title { color:#0d0b10; }

        .gal-hero-accent {
          display:inline-block;
          background:linear-gradient(105deg,#f0177a 0%,#ff6bb5 50%,#f0177a 80%);
          background-size:200% auto;
          -webkit-background-clip:text; background-clip:text;
          -webkit-text-fill-color:transparent;
          animation:shimBar 3.5s linear infinite;
        }

        .gal-hero-desc {
          color:rgba(255,255,255,0.5); font-size:clamp(0.95rem,1.8vw,1.1rem);
          line-height:1.85; max-width:460px;
        }
        html[data-theme="light"] .gal-hero-desc { color:rgba(13,11,16,0.56); }

        /* ── STATS ROW ── */
        .gal-stats {
          display:flex; flex-wrap:wrap; gap:0.75rem; margin-top:2.5rem;
        }
        .gal-stat-pill {
          display:inline-flex; align-items:center; gap:0.5rem;
          padding:0.5rem 1.1rem; border-radius:9999px;
          background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08);
          font-size:0.8rem; font-weight:600; color:rgba(255,255,255,0.65);
          transition:border-color 200ms, background 200ms, color 200ms;
        }
        .gal-stat-pill:hover {
          border-color:rgba(240,23,122,0.3); background:rgba(240,23,122,0.07);
          color:var(--pink-light);
        }
        .gal-stat-num {
          font-family:var(--font-display); font-size:1rem; font-weight:700;
          color:#fff;
        }
        html[data-theme="light"] .gal-stat-pill {
          background:rgba(0,0,0,0.03); border:1px solid rgba(0,0,0,0.09);
          color:rgba(13,11,16,0.6);
        }
        html[data-theme="light"] .gal-stat-pill:hover {
          border-color:rgba(240,23,122,0.3); background:rgba(240,23,122,0.07);
          color:var(--pink);
        }
        html[data-theme="light"] .gal-stat-num { color:#0d0b10; }

        /* ── DIVIDER ── */
        .gal-divider {
          height:1px; position:relative; overflow:visible;
          background:linear-gradient(90deg,transparent,rgba(240,23,122,0.25),transparent);
          margin:3rem 0;
        }
        .gal-divider::after {
          content:''; position:absolute; left:50%; top:50%;
          transform:translate(-50%,-50%);
          width:8px; height:8px; border-radius:50%;
          background:var(--pink); box-shadow:0 0 12px rgba(240,23,122,0.7);
        }

        /* ── MASONRY GRID ── */
        .gal-grid {
          columns:1; column-gap:1rem;
        }
        @media(min-width:540px)  { .gal-grid { columns:2; } }
        @media(min-width:900px)  { .gal-grid { columns:3; } }
        @media(min-width:1200px) { .gal-grid { columns:4; } }

        /* ── ITEM ── */
        .gal-item {
          break-inside:avoid; margin-bottom:1rem;
          animation:fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both;
        }

        /* ── IMAGE WRAPPER ── */
        .gal-img-wrap {
          position:relative; border-radius:1.1rem; overflow:hidden;
          background:rgba(255,255,255,0.03); cursor:pointer; display:block;
          border:1px solid rgba(255,255,255,0.06);
          transition:border-color 300ms ease, box-shadow 300ms ease, transform 300ms cubic-bezier(0.16,1,0.3,1);
        }
        .gal-img-wrap:hover {
          border-color:rgba(240,23,122,0.3);
          box-shadow:0 20px 60px rgba(0,0,0,0.4), 0 4px 16px rgba(240,23,122,0.12);
          transform:translateY(-3px);
        }
        html[data-theme="light"] .gal-img-wrap {
          border:1px solid rgba(0,0,0,0.07);
          background:#f8f8f8;
          box-shadow:0 2px 10px rgba(0,0,0,0.06);
        }
        html[data-theme="light"] .gal-img-wrap:hover {
          border-color:rgba(240,23,122,0.3);
          box-shadow:0 20px 60px rgba(240,23,122,0.1), 0 4px 16px rgba(0,0,0,0.08);
        }

        /* ── IMAGE ── */
        .gal-img {
          width:100%; height:auto; display:block;
          transition:transform 500ms cubic-bezier(0.16,1,0.3,1);
        }
        .gal-img-wrap:hover .gal-img { transform:scale(1.06); }

        /* ── OVERLAY ── */
        .gal-overlay {
          position:absolute; inset:0;
          background:linear-gradient(
            to top,
            rgba(6,5,8,0.88) 0%,
            rgba(6,5,8,0.25) 40%,
            transparent 70%
          );
          display:flex; align-items:flex-end;
          opacity:0; transition:opacity 320ms ease;
        }
        .gal-img-wrap:hover .gal-overlay { opacity:1; }

        .gal-overlay-inner {
          padding:1.1rem; display:flex; flex-direction:column; gap:0.35rem;
          transform:translateY(6px); transition:transform 320ms cubic-bezier(0.16,1,0.3,1);
        }
        .gal-img-wrap:hover .gal-overlay-inner { transform:translateY(0); }

        /* ── CATEGORY BADGE ── */
        .gal-cat {
          display:inline-flex; align-self:flex-start;
          padding:0.22rem 0.65rem; border-radius:9999px;
          background:rgba(240,23,122,0.28); border:1px solid rgba(240,23,122,0.45);
          color:#ff4fa3; font-size:0.58rem; font-weight:800;
          letter-spacing:0.1em; text-transform:uppercase;
        }

        /* ── IMAGE TITLE ── */
        .gal-title {
          font-size:0.88rem; font-weight:600; color:#fff;
          line-height:1.35; font-family:var(--font-display);
        }

        /* ── CORNER ACCENT (permanent) ── */
        .gal-corner {
          position:absolute; top:0; right:0;
          width:0; height:0;
          border-style:solid;
          border-width:0 28px 28px 0;
          border-color:transparent rgba(240,23,122,0.35) transparent transparent;
          opacity:0; transition:opacity 280ms ease;
        }
        .gal-img-wrap:hover .gal-corner { opacity:1; }

        /* ── EMPTY STATE ── */
        .gal-empty {
          border-radius:1.5rem;
          border:1.5px dashed rgba(240,23,122,0.2);
          background:rgba(240,23,122,0.03);
          padding:6rem 1.5rem; text-align:center;
          display:flex; flex-direction:column; align-items:center; gap:1.25rem;
        }
        html[data-theme="light"] .gal-empty {
          background:rgba(240,23,122,0.02);
          border:1.5px dashed rgba(240,23,122,0.18);
        }

        .gal-empty-icon {
          width:4rem; height:4rem; border-radius:1.25rem;
          background:rgba(240,23,122,0.1); border:1px solid rgba(240,23,122,0.22);
          display:flex; align-items:center; justify-content:center; font-size:1.6rem;
          animation:floatY 6s ease-in-out infinite;
        }
        html[data-theme="light"] .gal-empty-icon {
          background:rgba(240,23,122,0.08); border:1px solid rgba(240,23,122,0.18);
        }

        .gal-empty-title {
          font-family:var(--font-display); font-weight:700;
          color:#fff; font-size:1.3rem; letter-spacing:-0.01em;
        }
        html[data-theme="light"] .gal-empty-title { color:#0d0b10; }

        .gal-empty-desc {
          color:rgba(255,255,255,0.42); font-size:0.875rem;
          max-width:22rem; line-height:1.75;
        }
        html[data-theme="light"] .gal-empty-desc { color:rgba(13,11,16,0.5); }

        .gal-empty-btn {
          display:inline-flex; align-items:center; gap:0.5rem;
          height:3.1rem; padding:0 2rem; border-radius:9999px;
          background:var(--pink); color:#fff;
          font-size:0.875rem; font-weight:700; text-decoration:none;
          box-shadow:0 8px 28px rgba(240,23,122,0.42);
          transition:transform 200ms ease, box-shadow 200ms ease, background 200ms ease;
          position:relative; overflow:hidden;
        }
        .gal-empty-btn::after {
          content:''; position:absolute; inset:0;
          background:linear-gradient(135deg,rgba(255,255,255,0.15) 0%,transparent 60%);
          pointer-events:none;
        }
        .gal-empty-btn:hover {
          transform:translateY(-2px) scale(1.02);
          box-shadow:0 14px 40px rgba(240,23,122,0.55);
          background:var(--pink-light);
        }

        /* ── COUNT BADGE ── */
        .gal-count-tag {
          display:inline-flex; align-items:center; justify-content:center;
          padding:0.2rem 0.65rem; border-radius:9999px;
          background:rgba(240,23,122,0.1); border:1px solid rgba(240,23,122,0.2);
          font-size:0.65rem; font-weight:700; color:var(--pink-light);
        }
        html[data-theme="light"] .gal-count-tag {
          background:rgba(240,23,122,0.08); border:1px solid rgba(240,23,122,0.2);
          color:var(--pink);
        }
      `}</style>

      <div className="page-bg noise">
        <div style={{ maxWidth:"72rem", margin:"0 auto", padding:"6rem 1.5rem 8rem" }}>

          {/* ── HERO ── */}
          <div style={{ marginBottom:"0", position:"relative" }}>

            {/* Orb */}
            <div style={{
              position:"absolute", top:"-60px", right:"-40px",
              width:"320px", height:"320px", borderRadius:"50%", pointerEvents:"none",
              background:"radial-gradient(circle,rgba(240,23,122,0.12) 0%,transparent 70%)",
              filter:"blur(40px)", animation:"floatY 9s ease-in-out infinite",
            }}/>

            <div className="fu">
              <span className="gal-hero-badge">
                <span style={{
                  width:"5px", height:"5px", borderRadius:"50%",
                  background:"var(--pink)", display:"inline-block",
                  animation:"pulseDot 2.2s ease-in-out infinite",
                }}/>
                Galeria
              </span>
            </div>

            <h1 className="gal-hero-title fu d1">
              Nasze <span className="gal-hero-accent">realizacje</span>
            </h1>

            <p className="gal-hero-desc fu d2">
              Każde zdjęcie to kawałek historii — imprez, uśmiechów
              i&nbsp;momentów, które zostały w&nbsp;pamięci.
            </p>

            {/* Stats pills */}
            {data.images.length > 0 && (
              <div className="gal-stats fu d3">
                <div className="gal-stat-pill">
                  <span className="gal-stat-num">{data.images.length}</span>
                  zdjęć
                </div>
                {counts.map(c => (
                  <div key={c.key} className="gal-stat-pill">
                    <span className="gal-stat-num">{c.count}</span>
                    {c.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="gal-divider"/>

          {/* ── GRID or EMPTY ── */}
          {data.images.length > 0 ? (
            <>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"2rem", flexWrap:"wrap", gap:"1rem" }}>
                <div style={{
                  fontFamily:"var(--font-display)", fontSize:"1rem", fontWeight:600,
                  color:"rgba(255,255,255,0.6)", letterSpacing:"-0.01em",
                }} className="gal-sub-label">
                  Przeglądaj kolekcję
                </div>
                <span className="gal-count-tag">{data.images.length} realizacji</span>
              </div>

              <div className="gal-grid">
                {data.images.map((img: GalleryImage, i: number) => (
                  <ImageCard key={img.id} img={img} index={i} />
                ))}
              </div>
            </>
          ) : (
            <div className="gal-empty">
              <div className="gal-empty-icon">📷</div>
              <div className="gal-empty-title">Galeria jest w przygotowaniu</div>
              <p className="gal-empty-desc">
                Wkrótce pojawią się tu zdjęcia z naszych realizacji.
              </p>
              <a href="/kontakt" className="gal-empty-btn">
                Skontaktuj się →
              </a>
            </div>
          )}

        </div>
      </div>

      <style>{`
        html[data-theme="light"] .gal-sub-label { color: rgba(13,11,16,0.5) !important; }
      `}</style>
    </>
  );
}