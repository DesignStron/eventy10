import type { OfferData, OfferSection } from "@/lib/types";
import Link from "next/link";

export const metadata = { title: "Oferta" };

const FALLBACK: OfferData = { updatedAt: new Date().toISOString(), sections: [] };

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

function SectionCard({ s }: { s: OfferSection }) {
  const label = CAT_LABELS[s.key] ?? s.key;
  const icon  = CAT_ICONS[s.key] ?? "✦";

  return (
    <article id={s.key} className="offer-card" style={{ scrollMarginTop:"6rem" }}>
      <style>{`
        #${s.key}:hover { border-color:rgba(240,23,122,0.3) !important; box-shadow:0 24px 80px rgba(240,23,122,0.1), 0 4px 24px rgba(0,0,0,0.25) !important; }
        html[data-theme="light"] #${s.key}:hover { border-color:rgba(240,23,122,0.35) !important; box-shadow:0 24px 80px rgba(240,23,122,0.12), 0 4px 24px rgba(0,0,0,0.08) !important; }
      `}</style>

      {/* Header */}
      <div className="offer-card-head">
        <div className="offer-card-head-inner">
          <div style={{ display:"flex", alignItems:"center", gap:"1rem", marginBottom:"1rem" }}>
            <div className="offer-icon-box">
              <span style={{ fontSize:"1.3rem" }}>{icon}</span>
            </div>
            <span className="offer-badge">{label}</span>
          </div>
          <h2 className="offer-title">{s.title}</h2>
          <p className="offer-desc">{s.description}</p>
        </div>

        <div className="offer-price-box">
          <div className="offer-price-label">Cena od</div>
          <div className="offer-price-value">{s.price}<span className="offer-price-unit"> zł</span></div>
        </div>
      </div>

      {/* Divider */}
      <div className="offer-inner-divider"/>

      {/* Bullets */}
      {s.bullets?.length > 0 && (
        <div className="offer-bullets">
          {s.bullets.map((b) => (
            <div key={b} className="offer-bullet">
              <span className="offer-bullet-dot">
                <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                  <path d="M1.5 5.5L4 8L8.5 2" stroke="#f0177a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span className="offer-bullet-text">{b}</span>
            </div>
          ))}
        </div>
      )}

      {/* CTA */}
      <div className="offer-cta-row">
        <Link href="/kontakt" className="offer-btn-primary">Zapytaj o wycenę →</Link>
        <Link href="/galeria" className="offer-btn-ghost">Zobacz realizacje</Link>
      </div>
    </article>
  );
}

const NAV_ITEMS = [
  { key:"urodziny",         label:"Urodziny",          icon:"🎂" },
  { key:"animacje",         label:"Animacje",           icon:"🎪" },
  { key:"komunie",          label:"Komunie",            icon:"✨" },
  { key:"wesela",           label:"Wesela",             icon:"💍" },
  { key:"pikniki",          label:"Pikniki",            icon:"🌿" },
  { key:"bale",             label:"Bale",               icon:"🎭" },
  { key:"mikolajki",        label:"Mikołajki",          icon:"🎅" },
  { key:"oprawa-muzyczna",  label:"Oprawa muzyczna",    icon:"🎵", href:"/oprawa-muzyczna" },
];

export default async function OfferPage() {
  const res = await fetch('http://localhost:3000/api/oferta', { cache: 'no-store' });
  const data = await res.json();
  const offerData: OfferData = data || FALLBACK;

  return (
    <>
      <style>{`
        @keyframes pulseDot  { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.4)} }
        @keyframes fadeUp    { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes floatY    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes lineGrow  { from{width:0} to{width:100%} }
        @keyframes shimBar   { 0%{background-position:-200% center} 100%{background-position:200% center} }

        .fu  { animation: fadeUp 0.75s cubic-bezier(0.16,1,0.3,1) both; }
        .d1{animation-delay:0.06s} .d2{animation-delay:0.16s}
        .d3{animation-delay:0.28s} .d4{animation-delay:0.42s}

        /* ── OFFER CARD ── */
        .offer-card {
          border-radius:1.5rem;
          border:1px solid rgba(255,255,255,0.07);
          background:rgba(255,255,255,0.025);
          overflow:hidden;
          transition:border-color 280ms ease, box-shadow 280ms ease, transform 280ms cubic-bezier(0.16,1,0.3,1);
        }
        .offer-card:hover { transform:translateY(-2px); }

        html[data-theme="light"] .offer-card {
          background:#ffffff;
          border:1px solid rgba(0,0,0,0.07);
          box-shadow:0 4px 24px rgba(0,0,0,0.05);
        }

        /* ── CARD HEAD ── */
        .offer-card-head {
          padding:2.25rem 2.25rem 2rem;
          display:flex; align-items:flex-start;
          justify-content:space-between; gap:1.5rem; flex-wrap:wrap;
          position:relative; overflow:hidden;
        }
        /* Subtle gradient bg on head */
        .offer-card-head::before {
          content:''; position:absolute; inset:0; pointer-events:none;
          background:radial-gradient(ellipse at 90% -10%, rgba(240,23,122,0.07) 0%, transparent 55%);
        }
        html[data-theme="light"] .offer-card-head::before {
          background:radial-gradient(ellipse at 90% -10%, rgba(240,23,122,0.05) 0%, transparent 55%);
        }
        .offer-card-head-inner { flex:1; min-width:0; position:relative; }

        /* ── ICON BOX ── */
        .offer-icon-box {
          width:3rem; height:3rem; border-radius:1rem; flex-shrink:0;
          background:rgba(240,23,122,0.1); border:1px solid rgba(240,23,122,0.2);
          display:flex; align-items:center; justify-content:center;
          transition:transform 300ms ease, box-shadow 300ms ease, background 300ms ease;
          animation:floatY 6s ease-in-out infinite;
        }
        .offer-card:hover .offer-icon-box {
          transform:scale(1.08) rotate(-4deg);
          box-shadow:0 8px 24px rgba(240,23,122,0.3);
          background:rgba(240,23,122,0.18);
        }
        html[data-theme="light"] .offer-icon-box {
          background:rgba(240,23,122,0.08);
          border:1px solid rgba(240,23,122,0.18);
        }

        /* ── BADGE ── */
        .offer-badge {
          display:inline-flex; align-items:center;
          padding:0.28rem 0.85rem; border-radius:9999px;
          background:rgba(240,23,122,0.12); border:1px solid rgba(240,23,122,0.25);
          font-size:0.62rem; font-weight:800; letter-spacing:0.12em;
          text-transform:uppercase; color:var(--pink-light);
        }
        html[data-theme="light"] .offer-badge {
          background:rgba(240,23,122,0.1); border:1px solid rgba(240,23,122,0.28);
          color:var(--pink);
        }

        /* ── TITLE ── */
        .offer-title {
          font-family:var(--font-display);
          font-size:clamp(1.4rem,2.8vw,1.9rem);
          font-weight:700; line-height:1.1; letter-spacing:-0.02em;
          color:#fff; margin:0 0 0.65rem;
        }
        html[data-theme="light"] .offer-title { color:#0d0b10; }

        /* ── DESC ── */
        .offer-desc {
          color:rgba(255,255,255,0.5); font-size:0.875rem;
          line-height:1.8; margin:0; max-width:44rem;
        }
        html[data-theme="light"] .offer-desc { color:rgba(13,11,16,0.58); }

        /* ── PRICE BOX ── */
        .offer-price-box {
          flex-shrink:0; padding:1.25rem 1.5rem; border-radius:1.125rem;
          background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.08);
          text-align:center; min-width:120px; position:relative;
          transition:border-color 280ms ease, box-shadow 280ms ease;
        }
        .offer-card:hover .offer-price-box {
          border-color:rgba(240,23,122,0.3);
          box-shadow:0 0 0 3px rgba(240,23,122,0.08);
        }
        html[data-theme="light"] .offer-price-box {
          background:rgba(240,23,122,0.05);
          border:1px solid rgba(240,23,122,0.15);
        }
        html[data-theme="light"] .offer-card:hover .offer-price-box {
          border-color:rgba(240,23,122,0.35);
          box-shadow:0 0 0 3px rgba(240,23,122,0.07);
        }

        .offer-price-label {
          font-size:0.58rem; font-weight:800; letter-spacing:0.14em;
          text-transform:uppercase; color:rgba(255,255,255,0.3); margin-bottom:0.4rem;
        }
        html[data-theme="light"] .offer-price-label { color:rgba(13,11,16,0.45); }

        .offer-price-value {
          font-family:var(--font-display); font-size:1.9rem;
          font-weight:700; line-height:1; letter-spacing:-0.03em;
          background:linear-gradient(135deg,#fff 0%,rgba(255,255,255,0.75) 100%);
          -webkit-background-clip:text; background-clip:text;
          -webkit-text-fill-color:transparent;
        }
        html[data-theme="light"] .offer-price-value {
          background:linear-gradient(135deg,#0d0b10 0%,var(--pink) 140%);
          -webkit-background-clip:text; background-clip:text;
          -webkit-text-fill-color:transparent;
        }
        .offer-price-unit {
          font-size:0.9rem; font-weight:500;
          -webkit-text-fill-color:rgba(255,255,255,0.4);
        }
        html[data-theme="light"] .offer-price-unit {
          -webkit-text-fill-color:rgba(13,11,16,0.45);
        }

        /* ── INNER DIVIDER ── */
        .offer-inner-divider {
          height:1px;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent);
        }
        html[data-theme="light"] .offer-inner-divider {
          background:linear-gradient(90deg,transparent,rgba(240,23,122,0.12),transparent);
        }

        /* ── BULLETS ── */
        .offer-bullets {
          padding:1.75rem 2.25rem;
          display:grid; grid-template-columns:repeat(auto-fit,minmax(210px,1fr)); gap:0.65rem;
          border-bottom:1px solid rgba(255,255,255,0.05);
        }
        html[data-theme="light"] .offer-bullets {
          border-bottom:1px solid rgba(240,23,122,0.08);
        }

        .offer-bullet {
          display:flex; align-items:flex-start; gap:0.65rem;
          padding:0.9rem 1rem; border-radius:0.875rem;
          background:rgba(255,255,255,0.025); border:1px solid rgba(255,255,255,0.055);
          transition:background 220ms ease, border-color 220ms ease;
        }
        .offer-bullet:hover {
          background:rgba(240,23,122,0.06); border-color:rgba(240,23,122,0.2);
        }
        html[data-theme="light"] .offer-bullet {
          background:rgba(240,23,122,0.03); border:1px solid rgba(240,23,122,0.1);
        }
        html[data-theme="light"] .offer-bullet:hover {
          background:rgba(240,23,122,0.07); border-color:rgba(240,23,122,0.22);
        }

        .offer-bullet-dot {
          width:20px; height:20px; border-radius:50%; flex-shrink:0;
          background:rgba(240,23,122,0.12); border:1px solid rgba(240,23,122,0.28);
          display:flex; align-items:center; justify-content:center; margin-top:1px;
        }
        html[data-theme="light"] .offer-bullet-dot {
          background:rgba(240,23,122,0.1); border:1px solid rgba(240,23,122,0.25);
        }

        .offer-bullet-text {
          font-size:0.83rem; color:rgba(255,255,255,0.68);
          font-weight:500; line-height:1.55;
        }
        html[data-theme="light"] .offer-bullet-text { color:rgba(13,11,16,0.72); }

        /* ── CTA ROW ── */
        .offer-cta-row {
          padding:1.5rem 2.25rem; display:flex; gap:0.75rem; flex-wrap:wrap;
          align-items:center;
        }

        .offer-btn-primary {
          display:inline-flex; align-items:center; gap:0.4rem;
          height:2.85rem; padding:0 1.6rem; border-radius:9999px;
          background:var(--pink); color:#fff; font-size:0.84rem; font-weight:700;
          text-decoration:none;
          box-shadow:0 6px 22px rgba(240,23,122,0.38);
          transition:transform 200ms ease, box-shadow 200ms ease, background 200ms ease;
          position:relative; overflow:hidden;
        }
        .offer-btn-primary::after {
          content:''; position:absolute; inset:0;
          background:linear-gradient(135deg,rgba(255,255,255,0.15) 0%,transparent 60%);
          pointer-events:none;
        }
        .offer-btn-primary:hover {
          transform:translateY(-2px) scale(1.02);
          box-shadow:0 12px 36px rgba(240,23,122,0.5);
          background:var(--pink-light);
        }

        .offer-btn-ghost {
          display:inline-flex; align-items:center;
          height:2.85rem; padding:0 1.6rem; border-radius:9999px;
          border:1.5px solid rgba(255,255,255,0.12);
          color:rgba(255,255,255,0.65); font-size:0.84rem; font-weight:600;
          text-decoration:none; background:rgba(255,255,255,0.03);
          transition:border-color 200ms ease, background 200ms ease,
                      color 200ms ease, transform 200ms ease;
        }
        .offer-btn-ghost:hover {
          border-color:rgba(240,23,122,0.4); background:rgba(240,23,122,0.07);
          color:#fff; transform:translateY(-1px);
        }
        html[data-theme="light"] .offer-btn-ghost {
          border:1.5px solid rgba(240,23,122,0.22); color:var(--pink);
          background:rgba(240,23,122,0.04);
        }
        html[data-theme="light"] .offer-btn-ghost:hover {
          border-color:rgba(240,23,122,0.45); background:rgba(240,23,122,0.1); color:var(--pink);
        }

        /* ── PAGE HEADER ── */
        .offer-hero-badge {
          display:inline-flex; align-items:center; gap:0.5rem;
          padding:0.38rem 1rem; border-radius:9999px;
          background:rgba(240,23,122,0.1); border:1px solid rgba(240,23,122,0.25);
          font-size:0.63rem; font-weight:800; letter-spacing:0.12em;
          text-transform:uppercase; color:var(--pink-light);
        }
        html[data-theme="light"] .offer-hero-badge {
          background:rgba(240,23,122,0.08); border:1px solid rgba(240,23,122,0.3);
          color:var(--pink);
        }

        .offer-hero-title {
          font-family:var(--font-display);
          font-size:clamp(2.6rem,5.5vw,4.5rem);
          font-weight:700; line-height:1.06; letter-spacing:-0.03em;
          color:#fff; margin:0 0 1.5rem;
        }
        html[data-theme="light"] .offer-hero-title { color:#0d0b10; }

        .offer-hero-accent {
          display:inline-block;
          background:linear-gradient(105deg,#f0177a 0%,#ff6bb5 50%,#f0177a 80%);
          background-size:200% auto;
          -webkit-background-clip:text; background-clip:text;
          -webkit-text-fill-color:transparent;
          animation:shimBar 3.5s linear infinite;
        }

        .offer-hero-desc {
          color:rgba(255,255,255,0.52); font-size:1rem;
          line-height:1.85; max-width:500px; margin-bottom:2.75rem;
        }
        html[data-theme="light"] .offer-hero-desc { color:rgba(13,11,16,0.58); }

        /* ── NAV PILLS ── */
        .offer-nav-wrap {
          display:flex; flex-wrap:wrap; gap:0.5rem;
        }

        .offer-nav-pill {
          display:inline-flex; align-items:center; gap:0.4rem;
          padding:0.45rem 1.1rem; border-radius:9999px;
          font-size:0.79rem; font-weight:600;
          color:rgba(255,255,255,0.6); text-decoration:none;
          background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.09);
          transition:all 200ms ease; white-space:nowrap;
        }
        .offer-nav-pill:hover {
          background:rgba(240,23,122,0.1); border-color:rgba(240,23,122,0.3);
          color:var(--pink-light); transform:translateY(-1px);
        }
        .offer-nav-pill.special {
          background:rgba(240,23,122,0.1); border-color:rgba(240,23,122,0.28);
          color:var(--pink-light);
        }
        html[data-theme="light"] .offer-nav-pill {
          color:rgba(13,11,16,0.6); background:rgba(0,0,0,0.04);
          border:1px solid rgba(0,0,0,0.1);
        }
        html[data-theme="light"] .offer-nav-pill:hover {
          background:rgba(240,23,122,0.08); border-color:rgba(240,23,122,0.3);
          color:var(--pink);
        }
        html[data-theme="light"] .offer-nav-pill.special {
          background:rgba(240,23,122,0.1); border-color:rgba(240,23,122,0.28);
          color:var(--pink);
        }

        /* ── BOTTOM CTA ── */
        .offer-bottom-cta {
          margin-top:4rem; border-radius:1.5rem;
          border:1px solid rgba(240,23,122,0.18);
          background:rgba(255,255,255,0.025);
          padding:3.5rem 2.5rem; text-align:center; position:relative; overflow:hidden;
        }
        html[data-theme="light"] .offer-bottom-cta {
          background:#ffffff;
          border:1px solid rgba(240,23,122,0.2);
          box-shadow:0 12px 50px rgba(240,23,122,0.1), 0 4px 16px rgba(0,0,0,0.04);
        }
        .offer-bottom-cta-title {
          font-family:var(--font-display); font-size:clamp(1.5rem,3vw,2.2rem);
          font-weight:700; color:#fff; margin-bottom:0.75rem; position:relative;
        }
        html[data-theme="light"] .offer-bottom-cta-title { color:#0d0b10; }
        .offer-bottom-cta-desc {
          color:rgba(255,255,255,0.48); font-size:0.95rem;
          line-height:1.8; max-width:400px; margin:0 auto 2rem; position:relative;
        }
        html[data-theme="light"] .offer-bottom-cta-desc { color:rgba(13,11,16,0.55); }

        /* ── FANCY DIVIDER ── */
        .offer-divider {
          height:1px; position:relative; overflow:visible; margin:2.5rem 0 3rem;
          background:linear-gradient(90deg,transparent,rgba(240,23,122,0.25),transparent);
        }
        .offer-divider::after {
          content:''; position:absolute; left:50%; top:50%;
          transform:translate(-50%,-50%);
          width:8px; height:8px; border-radius:50%;
          background:var(--pink); box-shadow:0 0 12px rgba(240,23,122,0.7);
        }

        /* ── SECTION LABEL ── */
        .offer-section-eyebrow {
          display:flex; align-items:center; gap:0.6rem;
          font-size:0.62rem; font-weight:800; letter-spacing:0.15em;
          text-transform:uppercase; color:var(--pink); margin-bottom:0.5rem;
        }
        .offer-section-eyebrow::before {
          content:''; display:inline-block; width:22px; height:2px;
          background:var(--pink); border-radius:2px; flex-shrink:0;
        }

        /* count badge */
        .offer-count-badge {
          display:inline-flex; align-items:center; justify-content:center;
          padding:0.2rem 0.6rem; border-radius:9999px;
          background:rgba(240,23,122,0.1); border:1px solid rgba(240,23,122,0.2);
          font-size:0.65rem; font-weight:700; color:var(--pink-light);
        }
        html[data-theme="light"] .offer-count-badge {
          background:rgba(240,23,122,0.08); border:1px solid rgba(240,23,122,0.22);
          color:var(--pink);
        }
      `}</style>

      <div className="page-bg noise offerta-page">
        <div style={{ maxWidth:"72rem", margin:"0 auto", padding:"6rem 1.5rem 8rem" }}>

          {/* ── PAGE HERO ── */}
          <div style={{ marginBottom:"3.5rem" }}>

            <div className="fu" style={{ marginBottom:"1.25rem" }}>
              <span className="offer-hero-badge">
                <span style={{
                  width:"5px", height:"5px", borderRadius:"50%",
                  background:"var(--pink)", display:"inline-block",
                  animation:"pulseDot 2.2s ease-in-out infinite",
                }}/>
                Oferta
              </span>
            </div>

            <h1 className="offer-hero-title fu d1">
              Profesjonalna organizacja<br/>
              <span className="offer-hero-accent">każdego wydarzenia</span>
            </h1>

            <p className="offer-hero-desc fu d2">
              Specjalizujemy się w różnych typach wydarzeń — od przyjęć prywatnych
              po eventy firmowe. Każdą usługę dopasowujemy indywidualnie.
            </p>

            {/* Nav pills */}
            <div className="offer-nav-wrap fu d3">
              {NAV_ITEMS.map((n) => (
                <a
                  key={n.key}
                  href={n.href ?? `#${n.key}`}
                  className={`offer-nav-pill${n.href ? " special" : ""}`}
                >
                  <span>{n.icon}</span>
                  {n.label}
                </a>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="offer-divider"/>

          {/* ── SECTIONS HEADER ── */}
          {data.sections.length > 0 && (
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"2rem", flexWrap:"wrap", gap:"1rem" }}>
              <div>
                <div className="offer-section-eyebrow">Nasze usługi</div>
                <div style={{
                  fontFamily:"var(--font-display)", fontSize:"1.1rem", fontWeight:600,
                  color:"#fff",
                }} className="sec-title-sm">
                  Wszystko czego potrzebujesz
                </div>
              </div>
              <span className="offer-count-badge">{offerData.sections.length} kategorii</span>
            </div>
          )}

          {/* ── SECTIONS ── */}
          {offerData.sections.length > 0 ? (
            <div style={{ display:"flex", flexDirection:"column", gap:"1.5rem" }}>
              {offerData.sections.map((s: OfferSection) => (
                <SectionCard key={s.key} s={s} />
              ))}
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:"1.5rem" }}>
              {Object.entries(CAT_LABELS).map(([key, label]) => (
                <article
                  key={key} id={key}
                  className="offer-card"
                  style={{ scrollMarginTop:"6rem" }}
                >
                  <div className="offer-card-head">
                    <div className="offer-card-head-inner">
                      <div style={{ display:"flex", alignItems:"center", gap:"1rem", marginBottom:"1rem" }}>
                        <div className="offer-icon-box">
                          <span style={{ fontSize:"1.3rem" }}>{CAT_ICONS[key] ?? "✦"}</span>
                        </div>
                        <span className="offer-badge">{label}</span>
                      </div>
                      <h2 className="offer-title">{label}</h2>
                      <p className="offer-desc">
                        Treść tej sekcji zostanie uzupełniona — skontaktuj się, aby dowiedzieć się więcej.
                      </p>
                    </div>
                  </div>
                  <div className="offer-inner-divider"/>
                  <div className="offer-cta-row">
                    <Link href="/kontakt" className="offer-btn-primary">Zapytaj o wycenę →</Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          {offerData.sections.length === 0 && (
            <div className="offer-empty" style={{
              padding:"4rem 2rem", textAlign:"center",
              borderRadius:"1.5rem", border:"1px dashed rgba(240,23,122,0.2)",
              background:"rgba(240,23,122,0.03)"
            }}>
              <h3 style={{ fontSize:"1.2rem", fontWeight:600, marginBottom:"0.5rem", color:"var(--pink-light)" }}>Oferta w przygotowaniu</h3>
              <p style={{ color:"rgba(255,255,255,0.5)", lineHeight:1.6 }}>Skontaktuj się z nami, aby omówić szczegóły oferty dopasowanej do Twoich potrzeb.</p>
              <Link href="/kontakt" className="offer-btn-primary" style={{ marginTop:"1.5rem", display:"inline-flex" }}>Skontaktuj się →</Link>
            </div>
          )}

          {/* ── BOTTOM CTA ── */}
          <div className="offer-bottom-cta fu d4">
            <div style={{
              position:"absolute", inset:0, pointerEvents:"none",
              background:"radial-gradient(ellipse 70% 80% at 50% 110%,rgba(240,23,122,0.1) 0%,transparent 65%)",
            }}/>
            <h2 className="offer-bottom-cta-title">Nie widzisz tego czego szukasz?</h2>
            <p className="offer-bottom-cta-desc">
              Skontaktuj się z nami — organizujemy również niestandardowe wydarzenia.
            </p>
            <Link href="/kontakt" className="offer-btn-primary" style={{
              display:"inline-flex", alignItems:"center", gap:"0.5rem",
              height:"3.1rem", padding:"0 2.2rem", borderRadius:"9999px",
              fontSize:"0.9rem", fontWeight:700, textDecoration:"none",
              position:"relative",
            }}>
              Napisz do nas →
            </Link>
          </div>

        </div>
      </div>

      {/* Light theme inline overrides */}
      <style>{`
        html[data-theme="light"] .sec-title-sm { color: #0d0b10 !important; }
        html[data-theme="light"] .offer-count-badge { background: rgba(240,23,122,0.08); }
      `}</style>
    </>
  );
}