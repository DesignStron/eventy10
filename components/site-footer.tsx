import Link from "next/link";

const NAV = [
  { href: "/",                label: "Start" },
  { href: "/o-nas",           label: "O nas" },
  { href: "/oferta",          label: "Oferta" },
  { href: "/oprawa-muzyczna", label: "Oprawa muzyczna" },
  { href: "/galeria",         label: "Galeria" },
  { href: "/kontakt",         label: "Kontakt" },
];

const SERVICES = [
  "Urodziny dla dzieci",
  "Animacje",
  "Imprezy firmowe",
  "Eventy szkolne",
  "Komunie & Wesela",
  "Bale karnawałowe",
  "Mikołajki",
  "Oprawa muzyczna",
];

export default function SiteFooter() {
  return (
    <footer style={{ background:"var(--surface)", borderTop:"1px solid rgba(240,23,122,0.1)", position:"relative", overflow:"hidden" }}>
      <style>{`
        .ft-glow {
          position:absolute; top:0; left:50%; transform:translateX(-50%);
          width:55%; height:1px;
          background:linear-gradient(90deg,transparent,rgba(240,23,122,0.45) 40%,rgba(255,79,163,0.35) 60%,transparent);
          pointer-events:none;
        }
        .ft-orb {
          position:absolute; border-radius:50%; pointer-events:none; filter:blur(72px);
        }
        .ft-inner { max-width:76rem; margin:0 auto; padding:3.5rem 1.5rem 0; position:relative; z-index:1; }
        .ft-grid {
          display:grid; grid-template-columns:1fr; gap:2.5rem; margin-bottom:3rem;
        }
        @media(min-width:640px){ .ft-grid { grid-template-columns:repeat(2,1fr); } }
        @media(min-width:1024px){ .ft-grid { grid-template-columns:2fr 1fr 1fr 1.3fr; gap:2.5rem; } }
        .ft-col-title {
          font-size:0.62rem; font-weight:700; letter-spacing:0.13em;
          text-transform:uppercase; color:var(--text-muted); margin-bottom:1.1rem;
        }
        .ft-link {
          display:block; color:var(--text-secondary); text-decoration:none;
          font-size:0.84rem; font-weight:500; padding:0.28rem 0;
          transition:color 160ms ease; line-height:1.5;
        }
        .ft-link:hover { color:var(--pink); }
        .ft-svc {
          display:flex; align-items:center; gap:0.45rem;
          padding:0.28rem 0; color:var(--text-secondary);
          font-size:0.84rem; font-weight:500; line-height:1.5;
        }
        .ft-svc-dot {
          width:3px; height:3px; border-radius:50%;
          background:rgba(240,23,122,0.5); flex-shrink:0;
        }
        .ft-contact-lbl {
          font-size:0.58rem; font-weight:700; letter-spacing:0.1em;
          text-transform:uppercase; color:var(--text-muted); margin-bottom:0.18rem;
        }
        .ft-contact-val {
          font-size:0.84rem; color:var(--text-secondary); font-weight:500;
          text-decoration:none; display:block; transition:color 160ms;
        }
        a.ft-contact-val:hover { color:var(--pink); }
        .ft-divider { border:none; border-top:1px solid var(--border); margin:0; }
        .ft-bottom {
          max-width:76rem; margin:0 auto; padding:1.25rem 1.5rem 2rem;
          display:flex; align-items:center; justify-content:space-between;
          gap:1rem; flex-wrap:wrap; position:relative; z-index:1;
        }
        .ft-logo-mark {
          width:2.1rem; height:2.1rem; border-radius:0.5rem;
          background:linear-gradient(135deg,#f0177a,#ff4fa3);
          display:flex; align-items:center; justify-content:center;
          font-weight:900; font-size:0.72rem; color:#fff;
          box-shadow:0 4px 18px rgba(240,23,122,0.44), inset 0 1px 0 rgba(255,255,255,0.18);
          flex-shrink:0;
        }
        .ft-cta {
          display:inline-flex; align-items:center; gap:0.45rem;
          padding:0.7rem 1.4rem; border-radius:9999px;
          background:linear-gradient(135deg,#f0177a,#ff4fa3); color:#fff;
          font-size:0.82rem; font-weight:700; text-decoration:none;
          box-shadow:0 4px 18px rgba(240,23,122,0.38);
          transition:all 180ms ease; white-space:nowrap; margin-top:1.25rem;
          display:inline-flex;
        }
        .ft-cta:hover { box-shadow:0 6px 26px rgba(240,23,122,0.58); transform:translateY(-1px); }
        .ft-badge {
          display:inline-flex; align-items:center; gap:0.42rem;
          padding:0.32rem 0.8rem; border-radius:9999px;
          background:rgba(240,23,122,0.09); border:1px solid rgba(240,23,122,0.2);
          margin-top:1.1rem;
        }
        @keyframes pulseDot { 0%,100%{opacity:1}50%{opacity:0.35} }
        .pdot {
          width:5px; height:5px; border-radius:50%;
          background:#f0177a; box-shadow:0 0 5px #f0177a;
          animation:pulseDot 2s ease-in-out infinite;
        }

        /* Light theme overrides */
        html[data-theme="light"] .ft-link { color:var(--text-secondary); }
        html[data-theme="light"] .ft-link:hover { color:var(--pink); }
        html[data-theme="light"] .ft-svc { color:var(--text-secondary); }
        html[data-theme="light"] .ft-contact-val { color:var(--text-secondary); }
        html[data-theme="light"] .ft-contact-val:hover { color:var(--pink); }
        html[data-theme="light"] .ft-divider { border-top-color:var(--border); }
      `}</style>

      <div className="ft-glow"/>
      <div className="ft-orb" style={{ width:"350px",height:"350px",left:"-80px",top:"-80px",background:"rgba(240,23,122,0.05)" }}/>
      <div className="ft-orb" style={{ width:"250px",height:"250px",right:"-40px",bottom:"0",background:"rgba(240,23,122,0.04)" }}/>

      <div className="ft-inner">
        <div className="ft-grid">

          {/* brand */}
          <div>
            <Link href="/" style={{ display:"inline-flex",alignItems:"center",gap:"0.65rem",textDecoration:"none",marginBottom:"1.1rem" }}>
              <div className="ft-logo-mark">RE</div>
              <div>
                <div style={{ fontFamily:"var(--font-display)",fontWeight:700,fontSize:"1rem",color:"var(--text)",lineHeight:1.2,letterSpacing:"-0.02em" }}>
                  Różowy Event
                </div>
                <div style={{ fontSize:"0.57rem",color:"var(--text-muted)",letterSpacing:"0.1em",textTransform:"uppercase",fontWeight:500 }}>
                  Organizacja imprez
                </div>
              </div>
            </Link>

            <p style={{ color:"var(--text-secondary)",fontSize:"0.84rem",lineHeight:1.8,maxWidth:"21rem" }}>
              Tworzymy niezapomniane wydarzenia z&nbsp;energią i&nbsp;klasą —
              od urodzin dla dzieci po imprezy firmowe i&nbsp;szkolne.
            </p>

            <div className="ft-badge">
              <span className="pdot"/>
              <span style={{ fontSize:"0.62rem",fontWeight:700,color:"#ff4fa3",letterSpacing:"0.06em",textTransform:"uppercase" }}>
                Przyjmujemy rezerwacje
              </span>
            </div>

            <div>
              <Link href="/kontakt" className="ft-cta">
                Zarezerwuj termin →
              </Link>
            </div>
          </div>

          {/* nav */}
          <div>
            <div className="ft-col-title">Strony</div>
            <nav style={{ display:"flex",flexDirection:"column" }}>
              {NAV.map((l) => (
                <Link key={l.href} href={l.href} className="ft-link">{l.label}</Link>
              ))}
            </nav>
          </div>

          {/* services */}
          <div>
            <div className="ft-col-title">Usługi</div>
            <div style={{ display:"flex",flexDirection:"column" }}>
              {SERVICES.map((s) => (
                <span key={s} className="ft-svc">
                  <span className="ft-svc-dot"/>
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* contact */}
          <div>
            <div className="ft-col-title">Kontakt</div>

            {[
              { lbl:"Telefon", val:"+48 000 000 000", href:"tel:+48000000000" },
              { lbl:"E-mail",  val:"kontakt@rozowyevent.pl", href:"mailto:kontakt@rozowyevent.pl" },
              { lbl:"Obszar",  val:"Łódź i okolice", href:null },
            ].map((c) => (
              <div key={c.lbl} style={{ marginBottom:"0.875rem" }}>
                <div className="ft-contact-lbl">{c.lbl}</div>
                {c.href
                  ? <a href={c.href} className="ft-contact-val">{c.val}</a>
                  : <span className="ft-contact-val">{c.val}</span>
                }
              </div>
            ))}

            <div style={{
              marginTop:"1.1rem", display:"inline-flex", alignItems:"center", gap:"0.5rem",
              padding:"0.5rem 0.8rem", borderRadius:"0.625rem",
              background:"var(--surface-elevated)", border:"1px solid var(--border)",
            }}>
              <span style={{ fontSize:"0.9rem" }}>⚡</span>
              <div>
                <div style={{ fontSize:"0.62rem",fontWeight:700,color:"var(--pink)",letterSpacing:"0.04em",textTransform:"uppercase" }}>
                  Szybka odpowiedź
                </div>
                <div style={{ fontSize:"0.68rem",color:"var(--text-muted)" }}>
                  Wycena w 24h
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="ft-divider"/>

      <div className="ft-bottom">
        <div style={{ fontSize:"0.75rem",color:"var(--text-muted)" }}>
          © {new Date().getFullYear()} Różowy Event. Wszelkie prawa zastrzeżone.
        </div>
        <div style={{ fontSize:"0.7rem",color:"var(--text-muted)",fontFamily:"var(--font-mono)" }}>
          Projekt i realizacja — z pasją
        </div>
      </div>
    </footer>
  );
}