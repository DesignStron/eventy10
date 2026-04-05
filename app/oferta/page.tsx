import type { OfferData, OfferSection } from "@/lib/types";
import { nowIso, readJsonFile } from "@/lib/data-store";
import Link from "next/link";

export const metadata = { title: "Oferta" };

const FALLBACK: OfferData = { updatedAt: nowIso(), sections: [] };

/* map category key → readable label */
const CAT_LABELS: Record<string, string> = {
  urodziny:  "Urodziny",
  animacje:  "Animacje",
  komunie:   "Komunie",
  wesela:    "Wesela",
  pikniki:   "Pikniki szkolne",
  bale:      "Bale karnawałowe",
  mikolajki: "Mikołajki",
};

/* category accent colours (subtle) */
const CAT_COLORS: Record<string, string> = {
  urodziny:  "rgba(240,23,122,0.12)",
  animacje:  "rgba(130,40,200,0.1)",
  komunie:   "rgba(40,130,220,0.1)",
  wesela:    "rgba(200,100,40,0.1)",
  pikniki:   "rgba(30,160,80,0.1)",
  bale:      "rgba(200,40,160,0.1)",
  mikolajki: "rgba(200,60,30,0.1)",
};

function SectionCard({ s }: { s: OfferSection }) {
  const bg    = CAT_COLORS[s.key] ?? "rgba(255,255,255,0.04)";
  const label = CAT_LABELS[s.key] ?? s.key;

  return (
    <article
      id={s.key}
      className="offerta-section"
      style={{
        scrollMarginTop:"6rem",
        borderRadius:"1.25rem",
        border:"1px solid rgba(255,255,255,0.07)",
        background:"rgba(255,255,255,0.025)",
        overflow:"hidden",
        transition:"border-color 240ms",
      }}
    >
      <style>{`
        #${s.key}:hover { border-color:rgba(240,23,122,0.22) !important; }
      `}</style>

      {/* header strip */}
      <div className="offerta-header" style={{
        padding:"2rem 2rem 1.75rem",
        borderBottom:"1px solid rgba(255,255,255,0.06)",
        background: bg,
        display:"flex", alignItems:"flex-start",
        justifyContent:"space-between", gap:"1rem", flexWrap:"wrap",
      }}>
        <div>
          <span className="offerta-badge" style={{
            display:"inline-block", marginBottom:"0.75rem",
            padding:"0.3rem 0.8rem", borderRadius:"9999px",
            background:"rgba(240,23,122,0.12)", border:"1px solid rgba(240,23,122,0.25)",
            fontSize:"0.66rem", fontWeight:700, letterSpacing:"0.1em",
            textTransform:"uppercase", color:"var(--pink-light)",
          }}>
            {label}
          </span>
          <h2 className="offerta-title" style={{
            fontFamily:"var(--font-display)", fontSize:"clamp(1.4rem,3vw,1.9rem)",
            fontWeight:700, color:"#fff", lineHeight:1.12, letterSpacing:"-0.02em",
            margin:0, marginBottom:"0.6rem",
          }}>
            {s.title}
          </h2>
          <p className="offerta-desc" style={{ color:"rgba(255,255,255,0.52)", fontSize:"0.9rem", lineHeight:1.75, margin:0, maxWidth:"44rem" }}>
            {s.description}
          </p>
        </div>

        {/* price badge */}
        <div className="offerta-price" style={{
          flexShrink:0, padding:"1rem 1.25rem", borderRadius:"0.875rem",
          background:"rgba(0,0,0,0.35)", border:"1px solid rgba(255,255,255,0.09)",
          textAlign:"center", minWidth:"110px",
        }}>
          <div className="offerta-price-label" style={{ fontSize:"0.6rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(255,255,255,0.3)", marginBottom:"0.3rem" }}>
            Cena od
          </div>
          <div className="offerta-price-value" style={{ fontFamily:"var(--font-display)", fontSize:"1.6rem", fontWeight:700, color:"#fff", lineHeight:1 }}>
            {s.priceFromPLN}
            <span style={{ fontSize:"0.8rem", fontWeight:500, color:"rgba(255,255,255,0.5)" }}>&nbsp;zł</span>
          </div>
        </div>
      </div>

      {/* bullets */}
      {s.bullets?.length > 0 && (
        <div style={{
          padding:"1.75rem 2rem",
          display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:"0.7rem",
          borderBottom:"1px solid rgba(255,255,255,0.06)",
        }}>
          {s.bullets.map((b) => (
            <div key={b} className="offerta-bullet" style={{
              display:"flex", alignItems:"flex-start", gap:"0.65rem",
              padding:"0.875rem 1rem", borderRadius:"0.75rem",
              background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)",
            }}>
              <span style={{
                width:"18px", height:"18px", borderRadius:"50%", flexShrink:0,
                background:"rgba(240,23,122,0.15)", border:"1px solid rgba(240,23,122,0.28)",
                display:"flex", alignItems:"center", justifyContent:"center",
                marginTop:"1px",
              }}>
                <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                  <path d="M1.5 5.5L4 8L8.5 2" stroke="#ff4fa3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span className="offerta-bullet-text" style={{ fontSize:"0.84rem", color:"rgba(255,255,255,0.72)", fontWeight:500, lineHeight:1.55 }}>
                {b}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* cta row */}
      <div style={{ padding:"1.25rem 2rem", display:"flex", gap:"0.75rem", flexWrap:"wrap" }}>
        <Link href="/kontakt" className="btn-pink" style={{
          height:"2.75rem", padding:"0 1.5rem",
          fontSize:"0.84rem",
        }}>
          Zapytaj o wycenę →
        </Link>
        <Link href="/galeria" className="btn-outline" style={{
          height:"2.75rem", padding:"0 1.5rem",
          fontSize:"0.84rem",
        }}>
          Zobacz realizacje
        </Link>
      </div>
    </article>
  );
}

/* category navigation */
const NAV_ITEMS = [
  { key:"urodziny",         label:"Urodziny" },
  { key:"animacje",         label:"Animacje" },
  { key:"komunie",          label:"Komunie" },
  { key:"wesela",           label:"Wesela" },
  { key:"pikniki",          label:"Pikniki szkolne" },
  { key:"bale",             label:"Bale karnawałowe" },
  { key:"mikolajki",        label:"Mikołajki" },
  { key:"oprawa-muzyczna",  label:"Oprawa muzyczna", href:"/oprawa-muzyczna" },
];

export default async function OfferPage() {
  const data = await readJsonFile<OfferData>("oferta.json", FALLBACK);

  return (
    <>
      <style>{`
        @keyframes pulseDot{0%,100%{opacity:1}50%{opacity:.35}}
        .off-nav-btn {
          padding:0.45rem 1rem; border-radius:9999px;
          font-size:0.8rem; font-weight:600;
          color:rgba(255,255,255,0.6); text-decoration:none;
          background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08);
          transition:all 180ms ease; white-space:nowrap;
          display:inline-block;
        }
        .off-nav-btn:hover {
          background:rgba(240,23,122,0.1); border-color:rgba(240,23,122,0.28);
          color:var(--pink-light);
        }
        .off-nav-btn.music {
          background:rgba(240,23,122,0.1); border-color:rgba(240,23,122,0.25);
          color:var(--pink-light);
        }
      `}</style>

      <div className="page-bg noise offerta-page">
        <div style={{ maxWidth:"72rem", margin:"0 auto", padding:"6rem 1.5rem 8rem" }}>

          {/* page header */}
          <div style={{ marginBottom:"3rem" }}>
            <div className="badge badge-pink" style={{ marginBottom:"1.25rem" }}>
              <span style={{
                width:"5px", height:"5px", borderRadius:"50%",
                background:"var(--pink)", display:"inline-block",
                animation:"pulseDot 2.2s ease-in-out infinite",
              }}/>
              Oferta
            </div>

            <h1 className="heading-xl" style={{ color:"#fff", marginBottom:"1rem" }}>
              Profesjonalna organizacja<br/>
              <span style={{ color:"var(--pink-light)" }}>każdego wydarzenia</span>
            </h1>

            <p style={{
              color:"rgba(255,255,255,0.52)", fontSize:"1rem", lineHeight:1.8,
              maxWidth:"520px", marginBottom:"2.5rem",
            }}>
              Specjalizujemy się w różnych typach wydarzeń — od przyjęć prywatnych
              po eventy firmowe. Każdą usługę dopasowujemy indywidualnie.
            </p>

            {/* category nav */}
            <div style={{ display:"flex", flexWrap:"wrap", gap:"0.5rem" }}>
              {NAV_ITEMS.map((n) => (
                <a
                  key={n.key}
                  href={n.href ?? `#${n.key}`}
                  className={`off-nav-btn offerta-nav-btn${n.href ? " music" : ""}`}
                >
                  {n.label}
                </a>
              ))}
            </div>
          </div>

          {/* divider */}
          <div className="divider-pink" style={{ marginBottom:"3rem" }}/>

          {/* sections */}
          {data.sections.length > 0 ? (
            <div style={{ display:"flex", flexDirection:"column", gap:"1.5rem" }}>
              {data.sections.map((s) => (
                <SectionCard key={s.key} s={s} />
              ))}
            </div>
          ) : (
            /* fallback when no data yet */
            <div style={{ display:"flex", flexDirection:"column", gap:"1.5rem" }}>
              {Object.entries(CAT_LABELS).map(([key, label]) => (
                <article
                  key={key}
                  id={key}
                  className="offerta-section"
                  style={{
                    scrollMarginTop:"6rem",
                    borderRadius:"1.25rem",
                    border:"1px solid rgba(255,255,255,0.07)",
                    background:"rgba(255,255,255,0.025)",
                    overflow:"hidden",
                  }}
                >
                  <div className="offerta-header" style={{
                    padding:"2rem",
                    borderBottom:"1px solid rgba(255,255,255,0.06)",
                    background: CAT_COLORS[key] ?? "rgba(255,255,255,0.04)",
                  }}>
                    <span className="offerta-badge" style={{
                      display:"inline-block", marginBottom:"0.75rem",
                      padding:"0.3rem 0.8rem", borderRadius:"9999px",
                      background:"rgba(240,23,122,0.12)", border:"1px solid rgba(240,23,122,0.25)",
                      fontSize:"0.66rem", fontWeight:700, letterSpacing:"0.1em",
                      textTransform:"uppercase", color:"var(--pink-light)",
                    }}>
                      {label}
                    </span>
                    <h2 className="offerta-title" style={{
                      fontFamily:"var(--font-display)", fontSize:"1.6rem",
                      fontWeight:700, color:"#fff", margin:0, marginBottom:"0.5rem",
                    }}>
                      {label}
                    </h2>
                    <p className="offerta-desc" style={{ color:"rgba(255,255,255,0.45)", fontSize:"0.875rem", margin:0, lineHeight:1.7 }}>
                      Treść tej sekcji zostanie uzupełniona — skontaktuj się, aby dowiedzieć się więcej.
                    </p>
                  </div>
                  <div style={{ padding:"1.25rem 2rem" }}>
                    <Link href="/kontakt" className="btn-pink" style={{
                      height:"2.75rem", padding:"0 1.5rem",
                      fontSize:"0.84rem",
                    }}>
                      Zapytaj o wycenę →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* bottom CTA */}
          <div className="offerta-cta-banner" style={{
            marginTop:"4rem", borderRadius:"1.25rem",
            border:"1px solid rgba(240,23,122,0.18)",
            background:"rgba(255,255,255,0.025)",
            padding:"2.5rem", textAlign:"center",
            position:"relative", overflow:"hidden",
          }}>
            <div style={{
              position:"absolute", inset:0, pointerEvents:"none",
              background:"radial-gradient(ellipse 70% 80% at 50% 120%,rgba(240,23,122,0.1) 0%,transparent 65%)",
            }}/>
            <h2 className="offerta-cta-title" style={{
              fontFamily:"var(--font-display)", fontSize:"clamp(1.5rem,3vw,2.2rem)",
              fontWeight:700, color:"#fff", marginBottom:"0.75rem", position:"relative",
            }}>
              Nie widzisz tego czego szukasz?
            </h2>
            <p className="offerta-cta-desc" style={{ color:"rgba(255,255,255,0.5)", fontSize:"0.95rem", lineHeight:1.75, maxWidth:"400px", margin:"0 auto 2rem", position:"relative" }}>
              Skontaktuj się z nami — organizujemy również niestandardowe wydarzenia.
            </p>
            <Link href="/kontakt" className="btn-pink" style={{
              display:"inline-flex", alignItems:"center", gap:"0.5rem",
              height:"3rem", padding:"0 2rem", borderRadius:"9999px",
              fontSize:"0.9rem", fontWeight:700, textDecoration:"none",
              position:"relative",
            }}>
              Napisz do nas →
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}