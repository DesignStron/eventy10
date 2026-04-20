import type { OfferData, OfferSection } from "@/lib/types";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import SiteFooter from "@/components/site-footer";

export const metadata = { title: "Oferta" };
export const dynamic = "force-dynamic";

const CAT_LABELS: Record<string, string> = {
  urodziny:  "Urodziny",
  animacje:  "Animacje",
  komunie:   "Komunie",
  wesela:    "Wesela",
  pikniki:   "Pikniki szkolne",
  bale:      "Bale karnawałowe",
  mikolajki: "Mikołajki",
};

const CAT_ICONS: Record<string, string> = {
  urodziny:  "🎂",
  animacje:  "🎪",
  komunie:   "✨",
  wesela:    "💍",
  pikniki:   "🌿",
  bale:      "🎭",
  mikolajki: "🎅",
};

function SectionCard({ s, index }: { s: OfferSection; index: number }) {
  const label     = CAT_LABELS[s.category] ?? s.categoryLabel ?? s.key;
  const icon      = CAT_ICONS[s.category] ?? CAT_ICONS[s.key] ?? "✦";
  const hasImages = s.images && s.images.length > 0;
  const imgRight  = index % 2 !== 0;

  return (
    <article id={s.key} className={`sc${imgRight ? " sc--rev" : ""}`}>

      {/* ── IMAGE PANEL ── */}
      {hasImages ? (
        <div className="sc-img-panel">
          {/* Wrapper wypełnia panel poza miniaturami; zdjęcie absolute wewnątrz */}
          <div className="sc-img-main-wrap">
            <img src={s.images[0]} alt={s.title} className="sc-img-main" />
          </div>
          {s.images.length > 1 && (
            <div className="sc-img-thumbs">
              {s.images.slice(1, 3).map((src: string, i: number) => (
                <div key={i} className="sc-img-thumb">
                  <img src={src} alt={`${s.title} ${i + 2}`} />
                </div>
              ))}
              {s.images.length > 3 && (
                <div className="sc-img-thumb sc-img-thumb--more">
                  +{s.images.length - 3}
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="sc-img-panel sc-img-panel--empty">
          <span className="sc-no-img-icon">{icon}</span>
        </div>
      )}

      {/* ── BODY ── */}
      <div className="sc-body">
        <div className="sc-meta">
          <span className="sc-badge">{label}</span>
          {s.price && (
            <div className="sc-price">
              <span className="sc-price__from">od</span>
              <span className="sc-price__val">{s.price}</span>
            </div>
          )}
        </div>

        <h2 className="sc-title">{s.title}</h2>
        <p className="sc-desc">{s.description}</p>

        {s.bullets?.length > 0 && (
          <ul className="sc-bullets">
            {s.bullets.map((b: string) => (
              <li key={b} className="sc-bullet">
                <span className="sc-bullet__check" aria-hidden="true">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M1.5 5.5L4 8L8.5 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                {b}
              </li>
            ))}
          </ul>
        )}

        <div className="sc-cta">
          <Link href="/kontakt" className="sc-btn sc-btn--primary">
            Zapytaj o wycenę
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link href={`/oferta/szczegoly#${s.key}`} className="sc-btn sc-btn--outline">Szczegóły</Link>
          <Link href="/galeria" className="sc-btn sc-btn--ghost">Galeria</Link>
        </div>
      </div>
    </article>
  );
}

type NavItem = { key: string; label: string; icon: string; href?: string };

const getNavItems = (sections: OfferSection[]): NavItem[] => {
  const icons: Record<string, string> = {
    urodziny: "🎂", animacje: "🎪", komunie: "✨",
    wesela: "💍", pikniki: "🌿", bale: "🎭", mikolajki: "🎅",
  };
  const seen = new Set<string>();
  const items: NavItem[] = [];
  sections.forEach(s => {
    if (!seen.has(s.category)) {
      seen.add(s.category);
      items.push({ key: s.key, label: s.categoryLabel || s.title, icon: icons[s.category] || "✦" });
    }
  });
  return [...items, { key: "oprawa-muzyczna", label: "Oprawa muzyczna", icon: "🎵", href: "/oprawa-muzyczna" }];
};

export default async function OfferPage() {
  const { data: dbData } = await supabase
    .from("offer")
    .select("*")
    .order("created_at", { ascending: true });

  const sections: OfferSection[] = (dbData || []).map((item: any) => ({
    key:           item.key,
    category:      item.category || item.key,
    categoryLabel: item.category_label || item.keyLabel || item.key,
    title:         item.title,
    description:   item.description,
    price:         item.price || "",
    bullets:       item.bullets || [],
    images:        item.images || [],
  }));

  const offerData: OfferData = { updatedAt: new Date().toISOString(), sections };

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(28px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position:-200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulseDot {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:.4; transform:scale(1.6); }
        }
        @keyframes floatIcon {
          0%,100% { transform:translateY(0) rotate(0deg); }
          50%      { transform:translateY(-8px) rotate(-4deg); }
        }

        .op-wrap { max-width:78rem; margin:0 auto; padding:7rem 2rem 10rem; }

        /* ── HERO ── */
        .op-hero { margin-bottom:5rem; }
        .op-live-badge {
          display:inline-flex; align-items:center; gap:.5rem;
          padding:.35rem 1.1rem; border-radius:9999px;
          background:rgba(240,23,122,.1); border:1px solid rgba(240,23,122,.28);
          font-size:.65rem; font-weight:800; letter-spacing:.14em; text-transform:uppercase;
          color:#f0177a; margin-bottom:1.5rem;
          animation:fadeUp .6s cubic-bezier(.16,1,.3,1) both;
        }
        html[data-theme="light"] .op-live-badge { color:#c01060; }
        .op-live-dot {
          width:6px; height:6px; border-radius:50%; background:#f0177a;
          animation:pulseDot 2s ease-in-out infinite;
        }
        .op-hero-title {
          font-family:var(--font-display); font-size:clamp(3rem,6vw,5.5rem);
          font-weight:800; line-height:1.05; letter-spacing:-.04em; color:#fff;
          margin:0 0 1.75rem; animation:fadeUp .7s .08s cubic-bezier(.16,1,.3,1) both;
        }
        html[data-theme="light"] .op-hero-title { color:#0d0b10; }
        .op-hero-accent {
          display:block;
          background:linear-gradient(110deg,#f0177a 0%,#ff8cc8 42%,#f0177a 82%);
          background-size:220% auto; -webkit-background-clip:text; background-clip:text;
          -webkit-text-fill-color:transparent; animation:shimmer 4s linear infinite;
        }
        .op-hero-sub {
          font-size:1.1rem; line-height:1.9; color:rgba(255,255,255,.55);
          max-width:540px; margin:0 0 3rem;
          animation:fadeUp .7s .16s cubic-bezier(.16,1,.3,1) both;
        }
        html[data-theme="light"] .op-hero-sub { color:rgba(13,11,16,.55); }

        /* ── NAV ── */
        .op-nav { display:flex; flex-wrap:wrap; gap:.5rem; animation:fadeUp .7s .24s cubic-bezier(.16,1,.3,1) both; }
        .op-nav-pill {
          display:inline-flex; align-items:center; gap:.45rem; padding:.5rem 1.2rem;
          border-radius:9999px; font-size:.82rem; font-weight:600; text-decoration:none;
          border:1px solid rgba(255,255,255,.1); color:rgba(255,255,255,.65);
          background:rgba(255,255,255,.04); transition:all 200ms ease; white-space:nowrap;
        }
        .op-nav-pill:hover { border-color:rgba(240,23,122,.4); background:rgba(240,23,122,.1); color:#ff6bb5; transform:translateY(-2px); }
        .op-nav-pill--special { border-color:rgba(240,23,122,.3); background:rgba(240,23,122,.08); color:#ff6bb5; }
        html[data-theme="light"] .op-nav-pill { color:rgba(13,11,16,.6); background:rgba(0,0,0,.04); border-color:rgba(0,0,0,.1); }
        html[data-theme="light"] .op-nav-pill:hover,
        html[data-theme="light"] .op-nav-pill--special { background:rgba(240,23,122,.08); border-color:rgba(240,23,122,.3); color:#c01060; }

        /* ── DIVIDER ── */
        .op-divider {
          position:relative; height:1px; margin:3.5rem 0 4rem;
          background:linear-gradient(90deg,transparent,rgba(240,23,122,.3),transparent);
        }
        .op-divider::after {
          content:''; position:absolute; left:50%; top:50%; transform:translate(-50%,-50%);
          width:8px; height:8px; border-radius:50%; background:#f0177a;
          box-shadow:0 0 16px rgba(240,23,122,.8);
        }

        /* ── SECTION HEAD ── */
        .op-section-head { display:flex; align-items:flex-end; justify-content:space-between; gap:1rem; margin-bottom:3rem; flex-wrap:wrap; }
        .op-eyebrow {
          font-size:.65rem; font-weight:800; letter-spacing:.16em; text-transform:uppercase;
          color:#f0177a; display:flex; align-items:center; gap:.6rem; margin-bottom:.5rem;
        }
        .op-eyebrow::before { content:''; display:inline-block; width:24px; height:2px; background:#f0177a; border-radius:2px; }
        .op-section-title { font-family:var(--font-display); font-size:clamp(1.4rem,2.5vw,1.8rem); font-weight:700; color:#fff; margin:0; letter-spacing:-.02em; }
        html[data-theme="light"] .op-section-title { color:#0d0b10; }
        .op-count {
          display:inline-flex; align-items:center; padding:.28rem .85rem; border-radius:9999px;
          background:rgba(240,23,122,.1); border:1px solid rgba(240,23,122,.22);
          font-size:.68rem; font-weight:700; color:#ff6bb5; white-space:nowrap;
        }
        html[data-theme="light"] .op-count { color:#c01060; }

        /* ── CARDS ── */
        .op-cards { display:flex; flex-direction:column; gap:2rem; }

        /* ══════════════════════════════════════
           SECTION CARD
           Panel ze zdjęciem rozciąga się na
           pełną wysokość karty (align-items:stretch
           domyślne w grid). Zdjęcie wypełnia panel
           z object-fit:contain — zero przycinania.
        ══════════════════════════════════════ */
        .sc {
          display:grid;
          grid-template-columns:360px 1fr;
          /* align-items: stretch (domyślne) */
          border-radius:1.75rem;
          border:1px solid rgba(255,255,255,.08);
          background:rgba(255,255,255,.03);
          overflow:hidden;
          transition:border-color 300ms ease,box-shadow 300ms ease,transform 300ms cubic-bezier(.16,1,.3,1);
        }
        .sc:hover { transform:translateY(-3px); border-color:rgba(240,23,122,.25); box-shadow:0 28px 80px rgba(240,23,122,.1),0 4px 24px rgba(0,0,0,.3); }
        html[data-theme="light"] .sc { background:#fff; border-color:rgba(0,0,0,.07); box-shadow:0 2px 20px rgba(0,0,0,.05); }
        html[data-theme="light"] .sc:hover { border-color:rgba(240,23,122,.28); box-shadow:0 24px 60px rgba(240,23,122,.1),0 4px 16px rgba(0,0,0,.06); }

        .sc--rev { grid-template-columns:1fr 360px; }
        .sc--rev .sc-img-panel { order:2; }
        .sc--rev .sc-body      { order:1; }

        /* ── IMAGE PANEL ──
           Panel rozciąga się na pełną wysokość karty.
           Wewnątrz: wrapper flex:1 + zdjęcie absolute/contain.
        ── */
        .sc-img-panel {
  display:flex;
  flex-direction:column;
  overflow:hidden;
}
.sc-img-main-wrap {
  flex:1;
  overflow:hidden;
}

.sc-img-main {
  display:block;
  width:100%;
  height:100%;
  object-fit:cover;
  object-position:center top;
  transition:transform 600ms cubic-bezier(.16,1,.3,1);
}
        .sc:hover .sc-img-main { transform:scale(1.03); }

        /* Pasek miniatur */
        .sc-img-thumbs { display:flex; gap:2px; flex-shrink:0; height:72px; }
        .sc-img-thumb {
          flex:1; overflow:hidden; position:relative;
          background:rgba(0,0,0,.28);
          display:flex; align-items:center; justify-content:center;
        }
        .sc-img-thumb img {
  width:100%; height:100%;
  object-fit:cover;
  display:block;
  transition:transform 400ms ease;
}
        .sc-img-thumb:hover img { transform:scale(1.06); }
        .sc-img-thumb--more {
          display:flex; align-items:center; justify-content:center;
          background:rgba(240,23,122,.18); font-size:1rem; font-weight:700;
          color:rgba(255,255,255,.8); font-family:var(--font-display);
        }

        /* Panel bez zdjęcia */
        .sc-img-panel--empty {
          align-items:center; justify-content:center;
          background:rgba(240,23,122,.05); border-right:1px solid rgba(240,23,122,.1);
        }
        html[data-theme="light"] .sc-img-panel--empty { background:rgba(240,23,122,.04); border-right-color:rgba(240,23,122,.12); }
        .sc--rev .sc-img-panel--empty { border-right:none; border-left:1px solid rgba(240,23,122,.1); }
        .sc-no-img-icon { font-size:4rem; animation:floatIcon 7s ease-in-out infinite; filter:drop-shadow(0 8px 24px rgba(240,23,122,.3)); }

        /* ── BODY ── */
        .sc-body {
          padding:2.5rem 2.75rem; display:flex; flex-direction:column;
          justify-content:center; position:relative; min-width:0;
        }
        .sc-body::before {
          content:''; position:absolute; inset:0; pointer-events:none;
          background:radial-gradient(ellipse at 100% 0%,rgba(240,23,122,.06) 0%,transparent 55%);
        }

        .sc-meta { display:flex; align-items:center; gap:.85rem; margin-bottom:1.2rem; flex-wrap:wrap; }
        .sc-badge {
          display:inline-flex; align-items:center; padding:.3rem 1rem; border-radius:9999px;
          background:rgba(240,23,122,.12); border:1px solid rgba(240,23,122,.28);
          font-size:.65rem; font-weight:800; letter-spacing:.12em; text-transform:uppercase; color:#ff6bb5;
        }
        html[data-theme="light"] .sc-badge { color:#c01060; }

        .sc-price {
          display:flex; align-items:baseline; gap:.4rem; padding:.5rem 1rem;
          border-radius:.875rem; background:rgba(0,0,0,.22); border:1px solid rgba(255,255,255,.07);
          transition:border-color 280ms,box-shadow 280ms;
        }
        .sc:hover .sc-price { border-color:rgba(240,23,122,.28); box-shadow:0 0 0 3px rgba(240,23,122,.06); }
        html[data-theme="light"] .sc-price { background:rgba(240,23,122,.05); border-color:rgba(240,23,122,.15); }
        .sc-price__from { font-size:.6rem; font-weight:700; text-transform:uppercase; letter-spacing:.1em; color:rgba(255,255,255,.35); }
        html[data-theme="light"] .sc-price__from { color:rgba(13,11,16,.4); }
        .sc-price__val {
          font-family:var(--font-display); font-size:1.5rem; font-weight:700; letter-spacing:-.03em;
          background:linear-gradient(135deg,#fff 0%,rgba(255,255,255,.7) 100%);
          -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent;
        }
        html[data-theme="light"] .sc-price__val {
          background:linear-gradient(135deg,#0d0b10,#f0177a);
          -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent;
        }

        .sc-title {
          font-family:var(--font-display); font-size:clamp(1.5rem,2.2vw,2rem);
          font-weight:700; line-height:1.1; letter-spacing:-.03em; color:#fff; margin:0 0 .85rem; position:relative;
        }
        html[data-theme="light"] .sc-title { color:#0d0b10; }

        .sc-desc { font-size:.95rem; line-height:1.85; color:rgba(255,255,255,.58); margin:0 0 1.75rem; }
        html[data-theme="light"] .sc-desc { color:rgba(13,11,16,.6); }

        .sc-bullets { list-style:none; padding:0; margin:0 0 1.75rem; display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:.45rem; }
        .sc-bullet {
          display:flex; align-items:flex-start; gap:.65rem; padding:.75rem .95rem; border-radius:.875rem;
          background:rgba(255,255,255,.03); border:1px solid rgba(255,255,255,.055);
          font-size:.85rem; font-weight:500; color:rgba(255,255,255,.7); line-height:1.5;
          transition:background 200ms,border-color 200ms,color 200ms;
        }
        .sc-bullet:hover { background:rgba(240,23,122,.07); border-color:rgba(240,23,122,.22); color:rgba(255,255,255,.9); }
        html[data-theme="light"] .sc-bullet { background:rgba(240,23,122,.03); border-color:rgba(240,23,122,.1); color:rgba(13,11,16,.72); }
        html[data-theme="light"] .sc-bullet:hover { background:rgba(240,23,122,.07); border-color:rgba(240,23,122,.22); color:#0d0b10; }
        .sc-bullet__check {
          width:20px; height:20px; border-radius:50%; background:rgba(240,23,122,.14);
          border:1px solid rgba(240,23,122,.3); display:flex; align-items:center;
          justify-content:center; flex-shrink:0; margin-top:1px; color:#f0177a;
        }

        .sc-cta { display:flex; gap:.7rem; flex-wrap:wrap; align-items:center; margin-top:auto; padding-top:.25rem; }
        .sc-btn {
          display:inline-flex; align-items:center; gap:.45rem; height:2.85rem; padding:0 1.6rem;
          border-radius:9999px; font-size:.86rem; font-weight:700; text-decoration:none;
          transition:transform 200ms ease,box-shadow 200ms ease,background 200ms ease,border-color 200ms ease;
          position:relative; overflow:hidden;
        }
        .sc-btn::after { content:''; position:absolute; inset:0; background:linear-gradient(135deg,rgba(255,255,255,.14) 0%,transparent 60%); pointer-events:none; }
        .sc-btn--primary { background:#f0177a; color:#fff; box-shadow:0 6px 22px rgba(240,23,122,.4); }
        .sc-btn--primary:hover { transform:translateY(-2px) scale(1.02); box-shadow:0 14px 38px rgba(240,23,122,.55); background:#ff3d8d; }
        .sc-btn--outline { background:transparent; color:#ff6bb5; border:1.5px solid rgba(240,23,122,.4); }
        .sc-btn--outline:hover { background:rgba(240,23,122,.1); border-color:#f0177a; transform:translateY(-1px); color:#fff; }
        html[data-theme="light"] .sc-btn--outline { color:#c01060; }
        html[data-theme="light"] .sc-btn--outline:hover { color:#c01060; background:rgba(240,23,122,.08); }
        .sc-btn--ghost { background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.1); color:rgba(255,255,255,.6); }
        .sc-btn--ghost:hover { background:rgba(255,255,255,.08); border-color:rgba(255,255,255,.2); color:#fff; transform:translateY(-1px); }
        html[data-theme="light"] .sc-btn--ghost { border-color:rgba(0,0,0,.12); color:rgba(13,11,16,.6); background:rgba(0,0,0,.03); }
        html[data-theme="light"] .sc-btn--ghost:hover { background:rgba(0,0,0,.07); color:#0d0b10; }

        /* ── EMPTY STATE ── */
        .op-empty-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:1.25rem; }
        .op-empty-card {
          border-radius:1.5rem; border:1px solid rgba(255,255,255,.07);
          background:rgba(255,255,255,.025); padding:2rem;
          display:flex; flex-direction:column; gap:1.25rem;
          transition:border-color 250ms,transform 250ms;
        }
        .op-empty-card:hover { border-color:rgba(240,23,122,.25); transform:translateY(-2px); }
        html[data-theme="light"] .op-empty-card { background:#fff; border-color:rgba(0,0,0,.07); }

        /* ── BOTTOM CTA ── */
        .op-bottom-cta {
          margin-top:5rem; border-radius:2rem; border:1px solid rgba(240,23,122,.2);
          background:rgba(255,255,255,.025); padding:4.5rem 3rem;
          text-align:center; position:relative; overflow:hidden;
        }
        html[data-theme="light"] .op-bottom-cta { background:#fff; border-color:rgba(240,23,122,.22); box-shadow:0 16px 60px rgba(240,23,122,.1),0 4px 20px rgba(0,0,0,.04); }
        .op-bottom-cta-bg { position:absolute; inset:0; pointer-events:none; background:radial-gradient(ellipse 65% 90% at 50% 115%,rgba(240,23,122,.12) 0%,transparent 60%); }
        .op-bottom-cta-title { font-family:var(--font-display); font-size:clamp(1.75rem,3.5vw,2.75rem); font-weight:700; color:#fff; margin:0 0 1rem; letter-spacing:-.03em; position:relative; }
        html[data-theme="light"] .op-bottom-cta-title { color:#0d0b10; }
        .op-bottom-cta-desc { font-size:1.05rem; line-height:1.8; color:rgba(255,255,255,.5); max-width:420px; margin:0 auto 2.5rem; position:relative; }
        html[data-theme="light"] .op-bottom-cta-desc { color:rgba(13,11,16,.55); }

        /* ═══════════════════════ RESPONSIVE ═══════════════════════ */
        @media (min-width:769px) and (max-width:1100px) {
          .sc      { grid-template-columns:300px 1fr; }
          .sc--rev { grid-template-columns:1fr 300px; }
          .sc-body { padding:2rem 2.25rem; }
          .sc-title { font-size:1.55rem; }
          .sc-img-thumbs { height:64px; }
        }

        @media (max-width:768px) {
          .op-wrap { padding:5rem 1.1rem 7rem; }
          .op-hero-title { font-size:clamp(2.2rem,9vw,3rem); letter-spacing:-.03em; }
          .op-hero-sub { font-size:.95rem; max-width:100%; line-height:1.7; }
          .op-nav { 
            display: grid; 
            grid-template-columns: repeat(2, 1fr); 
            gap: 0.5rem;
            overflow-x: visible;
          }
          .op-nav-pill { 
            flex-shrink: 0; 
            justify-content: center;
            font-size: 0.8rem;
            padding: 0.6rem 0.8rem;
          }
          .op-divider { margin:2.5rem 0 3rem; }
          .op-section-head { margin-bottom:2rem; }
          .op-section-title { font-size:1.25rem; }

          .sc, .sc--rev { grid-template-columns:1fr; }
          .sc--rev .sc-img-panel { order:0; }
          .sc--rev .sc-body      { order:1; }

          /* Na mobile panel ma stałą wysokość (nie stretch od body) */
          .sc-img-panel { min-height:unset; max-height:unset; }
          .sc-img-panel--empty { min-height:160px; max-height:160px; }
          .sc-img-thumbs { height:60px; }

          .sc-body { padding:1.6rem 1.4rem 1.5rem; }
          .sc-meta { gap:.65rem; margin-bottom:1rem; }
          .sc-price { padding:.45rem .85rem; }
          .sc-price__val { font-size:1.3rem; }
          .sc-title { font-size:clamp(1.35rem,6vw,1.75rem); margin-bottom:.7rem; }
          .sc-desc { font-size:.88rem; margin-bottom:1.4rem; }
          .sc-bullets { grid-template-columns:1fr; gap:.45rem; margin-bottom:1.5rem; }
          .sc-bullet { font-size:.83rem; padding:.7rem .9rem; }
          .sc-cta { flex-direction:column; gap:.55rem; }
          .sc-btn { width:100%; justify-content:center; height:2.75rem; font-size:.84rem; }

          .op-bottom-cta { padding:3rem 1.5rem; margin-top:3.5rem; border-radius:1.5rem; }
          .op-bottom-cta-title { font-size:clamp(1.5rem,6vw,2rem); }
          .op-bottom-cta-desc { font-size:.9rem; }
        }

        @media (max-width:380px) {
          .op-nav { grid-template-columns: 1fr; }
        }

        @media (max-width:420px) {
          .op-hero-title { font-size:clamp(1.9rem,10vw,2.5rem); }
          .sc-img-panel { max-height:320px; }
        }
      `}</style>

      <div className="page-bg noise offerta-page">
        <div className="op-wrap">

          <div className="op-hero">
            <div className="op-live-badge">
              <span className="op-live-dot" />
              Oferta
            </div>
            <h1 className="op-hero-title">
              Sprawdź
              <span className="op-hero-accent">naszą ofertę</span>
            </h1>
            <p className="op-hero-sub">
              Poniżej znajdziesz standardową ofertę naszych usług. 
              Realizujemy animacje, warsztaty oraz oprawę muzyczną 
              dla dzieci i młodzieży, organizując wydarzenia 
              dla klientów prywatnych, szkół i firm.
            </p>
            <p className="op-hero-sub" style={{ marginTop: "1rem" }}>
              W ofercie znajdują się m.in. urodziny, animacje weselne, 
              komunijne, Mikołajki, bale karnawałowe, festyny i pikniki, 
              a także wydarzenia szkolne i młodzieżowe, takie jak 
              studniówki, bale 8-klasistów oraz dyskoteki.
            </p>
            <p className="op-hero-sub" style={{ marginTop: "1rem" }}>
              Ceny mogą się różnić w zależności od czasu trwania, 
              lokalizacji oraz zakresu wydarzenia. Działamy 
              na terenie Wrocławia i okolic. Dojazd do 20 km 
              wliczony jest w cenę.
            </p>
            <p className="op-hero-sub" style={{ marginTop: "1rem" }}>
              Jeśli nie widzisz w ofercie dokładnie tego, 
              czego potrzebujesz lub masz niestandardowe potrzeby 
              lub pomysły — napisz do nas. Ustalimy najlepsze 
              rozwiązanie dopasowane do Twojego wydarzenia.
            </p>
            <nav className="op-nav" aria-label="Nawigacja oferty">
              {getNavItems(sections).map((n) => (
                <a key={n.key} href={n.href ?? `#${n.key}`} className={`op-nav-pill${n.href ? " op-nav-pill--special" : ""}`}>
                  <span aria-hidden="true">{n.icon}</span>
                  {n.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="op-divider" role="separator" />

          {offerData.sections.length > 0 && (
            <div className="op-section-head">
              <div>
                <div className="op-eyebrow">Nasze usługi</div>
                <h2 className="op-section-title">Wszystko, czego potrzebujesz</h2>
              </div>
              <span className="op-count">{offerData.sections.length} kategorii</span>
            </div>
          )}

          {offerData.sections.length > 0 ? (
            <div className="op-cards">
              {offerData.sections.map((s: OfferSection, i: number) => (
                <SectionCard key={s.key} s={s} index={i} />
              ))}
            </div>
          ) : (
            <div>
              <div className="op-section-head">
                <div>
                  <div className="op-eyebrow">Nasze usługi</div>
                  <h2 className="op-section-title">Wszystko, czego potrzebujesz</h2>
                </div>
                <span className="op-count">{Object.keys(CAT_LABELS).length} kategorii</span>
              </div>
              <div className="op-empty-grid">
                {Object.entries(CAT_LABELS).map(([key, label]) => (
                  <article key={key} id={key} className="op-empty-card">
                    <div style={{ display:"flex", alignItems:"center", gap:".85rem" }}>
                      <span style={{ fontSize:"1.75rem" }}>{CAT_ICONS[key] ?? "✦"}</span>
                      <span className="sc-badge">{label}</span>
                    </div>
                    <h3 className="sc-title" style={{ fontSize:"1.3rem", margin:0 }}>{label}</h3>
                    <p className="sc-desc" style={{ margin:0, fontSize:".88rem" }}>
                      Skontaktuj się, aby dowiedzieć się więcej o tej kategorii.
                    </p>
                    <Link href="/kontakt" className="sc-btn sc-btn--primary" style={{ alignSelf:"flex-start" }}>Zapytaj →</Link>
                  </article>
                ))}
              </div>
            </div>
          )}

          <section className="op-process" style={{ marginTop: "5rem", marginBottom: "5rem" }}>
            <div className="op-section-head" style={{ marginBottom: "2.5rem" }}>
              <div>
                <div className="op-eyebrow">Jak pracujemy?</div>
                <h2 className="op-section-title">Od pomysłu<br/>do realizacji</h2>
              </div>
            </div>
            <p className="op-hero-sub" style={{ marginBottom: "2rem" }}>
              Współpraca z nami przebiega w kilku prostych krokach:
            </p>
            <div className="process-grid" style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1.5rem"
            }}>
              <div className="process-card" style={{ 
                padding: "2rem", 
                borderRadius: "1.5rem", 
                background: "rgba(255,255,255,0.03)", 
                border: "1px solid rgba(255,255,255,0.08)" 
              }}>
                <div style={{ 
                  fontSize: "2.5rem", 
                  fontWeight: 700, 
                  color: "rgba(240,23,122,0.3)", 
                  marginBottom: "1rem",
                  fontFamily: "var(--font-display)"
                }}>01</div>
                <div style={{ 
                  width: "2rem", 
                  height: "3px", 
                  borderRadius: "2px", 
                  background: "linear-gradient(90deg,#f0177a,#ff6bb5)", 
                  marginBottom: "1rem" 
                }} />
                <h3 style={{ 
                  fontSize: "1.1rem", 
                  fontWeight: 700, 
                  color: "#fff", 
                  marginBottom: "0.75rem",
                  fontFamily: "var(--font-display)"
                }}>Kontakt i ustalenie szczegółów</h3>
                <p style={{ 
                  fontSize: "0.9rem", 
                  color: "rgba(255,255,255,0.5)", 
                  lineHeight: 1.7 
                }}>Ustalamy termin, miejsce, liczbę uczestników oraz rodzaj wydarzenia.</p>
              </div>

              <div className="process-card" style={{ 
                padding: "2rem", 
                borderRadius: "1.5rem", 
                background: "rgba(255,255,255,0.03)", 
                border: "1px solid rgba(255,255,255,0.08)" 
              }}>
                <div style={{ 
                  fontSize: "2.5rem", 
                  fontWeight: 700, 
                  color: "rgba(240,23,122,0.3)", 
                  marginBottom: "1rem",
                  fontFamily: "var(--font-display)"
                }}>02</div>
                <div style={{ 
                  width: "2rem", 
                  height: "3px", 
                  borderRadius: "2px", 
                  background: "linear-gradient(90deg,#f0177a,#ff6bb5)", 
                  marginBottom: "1rem" 
                }} />
                <h3 style={{ 
                  fontSize: "1.1rem", 
                  fontWeight: 700, 
                  color: "#fff", 
                  marginBottom: "0.75rem",
                  fontFamily: "var(--font-display)"
                }}>Dobór formy animacji</h3>
                <p style={{ 
                  fontSize: "0.9rem", 
                  color: "rgba(255,255,255,0.5)", 
                  lineHeight: 1.7 
                }}>Dopasowujemy zakres animacji, warsztatów lub oprawy muzycznej do grupy i charakteru wydarzenia.</p>
              </div>

              <div className="process-card" style={{ 
                padding: "2rem", 
                borderRadius: "1.5rem", 
                background: "rgba(255,255,255,0.03)", 
                border: "1px solid rgba(255,255,255,0.08)" 
              }}>
                <div style={{ 
                  fontSize: "2.5rem", 
                  fontWeight: 700, 
                  color: "rgba(240,23,122,0.3)", 
                  marginBottom: "1rem",
                  fontFamily: "var(--font-display)"
                }}>03</div>
                <div style={{ 
                  width: "2rem", 
                  height: "3px", 
                  borderRadius: "2px", 
                  background: "linear-gradient(90deg,#f0177a,#ff6bb5)", 
                  marginBottom: "1rem" 
                }} />
                <h3 style={{ 
                  fontSize: "1.1rem", 
                  fontWeight: 700, 
                  color: "#fff", 
                  marginBottom: "0.75rem",
                  fontFamily: "var(--font-display)"
                }}>Rezerwacja terminu i przygotowanie</h3>
                <p style={{ 
                  fontSize: "0.9rem", 
                  color: "rgba(255,255,255,0.5)", 
                  lineHeight: 1.7 
                }}>Po akceptacji oferty rezerwujemy termin i przygotowujemy wszystkie elementy realizacji.</p>
              </div>

              <div className="process-card" style={{ 
                padding: "2rem", 
                borderRadius: "1.5rem", 
                background: "rgba(255,255,255,0.03)", 
                border: "1px solid rgba(255,255,255,0.08)" 
              }}>
                <div style={{ 
                  fontSize: "2.5rem", 
                  fontWeight: 700, 
                  color: "rgba(240,23,122,0.3)", 
                  marginBottom: "1rem",
                  fontFamily: "var(--font-display)"
                }}>04</div>
                <div style={{ 
                  width: "2rem", 
                  height: "3px", 
                  borderRadius: "2px", 
                  background: "linear-gradient(90deg,#f0177a,#ff6bb5)", 
                  marginBottom: "1rem" 
                }} />
                <h3 style={{ 
                  fontSize: "1.1rem", 
                  fontWeight: 700, 
                  color: "#fff", 
                  marginBottom: "0.75rem",
                  fontFamily: "var(--font-display)"
                }}>Realizacja wydarzenia</h3>
                <p style={{ 
                  fontSize: "0.9rem", 
                  color: "rgba(255,255,255,0.5)", 
                  lineHeight: 1.7 
                }}>Prowadzimy animacje na miejscu, dbając o atmosferę, energię i zaangażowanie uczestników.</p>
              </div>
            </div>
          </section>

          <div className="op-bottom-cta">
            <div className="op-bottom-cta-bg" />
            <h2 className="op-bottom-cta-title">Masz pytania? Napisz do nas.</h2>
            <p className="op-bottom-cta-desc">
              Chętnie odpowiemy i doradzimy w kwestii animacji, doboru atrakcji lub
              wspólnie ustalimy najlepszą opcję dla Twojego wydarzenia.
            </p>
            <Link
              href="/kontakt"
              className="sc-btn sc-btn--primary"
              style={{ height:"3.3rem", padding:"0 2.5rem", fontSize:".95rem", margin:"0 auto", display:"inline-flex", position:"relative" }}
            >
              Napisz do nas
              <svg width="15" height="15" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

        </div>
      </div>

      <SiteFooter />
    </>
  );
}