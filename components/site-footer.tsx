import Link from "next/link";

const NAV = [
  { href: "/",                label: "Start" },
  { href: "/o-nas",           label: "O nas" },
  { href: "/oferta",          label: "Oferta" },
  { href: "/oprawa-muzyczna", label: "Oprawa muzyczna" },
  { href: "/galeria",         label: "Galeria" },
  { href: "/kontakt",         label: "Kontakt" },
];

const SOCIAL = [
  {
    href: "https://www.instagram.com/pinkyparty.eventy",
    title: "Instagram",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-3.35-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
      </svg>
    ),
  },
  {
    href: "https://www.facebook.com/pinkyparty.eventy",
    title: "Facebook",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    href: "https://www.youtube.com/@PinkyPartyAnimacjeEventy",
    title: "YouTube",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
];

export default function SiteFooter() {
  return (
    <footer style={{ background: "var(--surface)", borderTop: "1px solid rgba(240,23,122,0.12)", position: "relative", overflow: "hidden" }}>
      <style>{`
        .ft-glow {
          position:absolute; top:0; left:50%; transform:translateX(-50%);
          width:55%; height:1px;
          background:linear-gradient(90deg,transparent,rgba(240,23,122,0.45) 40%,rgba(255,79,163,0.35) 60%,transparent);
          pointer-events:none;
        }

        /* ── INNER WRAPPER ── */
        .ft-inner {
          max-width:76rem; margin:0 auto;
          padding:2.5rem 1.25rem 0;
          position:relative; z-index:1;
        }

        /* ── TOP: brand strip ── */
        .ft-brand {
          margin-bottom:1.75rem;
          padding-bottom:1.5rem;
          border-bottom:1px solid rgba(240,23,122,0.08);
          /* mobile: center everything */
          display:flex; flex-direction:column; align-items:center; text-align:center;
        }
        .ft-brand-top {
          display:flex; align-items:center; flex-direction:column;
          gap:0.65rem; margin-bottom:0.65rem;
        }
        .ft-logo-wrap {
          display:flex; align-items:center; gap:0.5rem; text-decoration:none; flex-shrink:0;
        }
        .ft-logo-img {
          width:auto; height:3rem; object-fit:contain; display:block;
        }
        .ft-tagline {
          font-size:0.8rem; color:var(--text-secondary); line-height:1.65;
          margin:0 0 0.75rem; max-width:22rem;
        }
        .ft-brand-actions {
          display:flex; align-items:center; justify-content:center; gap:0.75rem; flex-wrap:wrap;
        }
        .ft-cta {
          display:inline-flex; align-items:center; gap:0.4rem;
          padding:0.6rem 1.25rem; border-radius:9999px;
          background:linear-gradient(135deg,#f0177a,#ff4fa3); color:#fff;
          font-size:0.8rem; font-weight:700; text-decoration:none;
          box-shadow:0 3px 14px rgba(240,23,122,0.35);
          transition:all 180ms ease; white-space:nowrap; flex-shrink:0;
        }
        .ft-cta:hover { box-shadow:0 5px 22px rgba(240,23,122,0.55); transform:translateY(-1px); }
        /* desktop: switch to horizontal row */
        @media(min-width:768px){
          .ft-brand { flex-direction:row; align-items:center; justify-content:space-between; gap:1.5rem; text-align:left; }
          .ft-brand-left { flex:1; }
          .ft-brand-top { flex-direction:row; align-items:center; justify-content:flex-start; }
          .ft-brand-actions { justify-content:flex-start; }
        }

        /* ── GRID: 2 cols on mobile, 3 on desktop ── */
        .ft-grid {
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:1.5rem 1rem;
          margin-bottom:2rem;
          justify-items:center;
        }
        .ft-grid > div { width:100%; }
        @media(min-width:768px){
          .ft-grid { grid-template-columns:1fr 1fr 1fr; gap:2rem; justify-items:start; }
        }

        .ft-col-title {
          font-size:0.58rem; font-weight:700; letter-spacing:0.13em;
          text-transform:uppercase; color:var(--text-muted); margin-bottom:0.75rem;
        }
        .ft-link {
          display:block; color:var(--text-secondary); text-decoration:none;
          font-size:0.82rem; font-weight:500; padding:0.22rem 0;
          transition:color 150ms ease; line-height:1.5;
        }
        .ft-link:hover { color:var(--pink); }

        .ft-contact-lbl {
          font-size:0.56rem; font-weight:700; letter-spacing:0.1em;
          text-transform:uppercase; color:var(--text-muted); margin-bottom:0.1rem;
        }
        .ft-contact-val {
          font-size:0.8rem; color:var(--text-secondary); font-weight:500;
          text-decoration:none; display:block; transition:color 150ms; margin-bottom:0.7rem;
          word-break:break-all;
        }
        a.ft-contact-val:hover { color:var(--pink); }

        /* social icons */
        .ft-social-row { display:flex; gap:0.4rem; margin-top:0.5rem; }
        .ft-soc-btn {
          display:flex; align-items:center; justify-content:center;
          width:1.9rem; height:1.9rem; border-radius:0.4rem;
          background:var(--surface-elevated); border:1px solid var(--border);
          color:var(--text-secondary); text-decoration:none;
          transition:color 150ms, border-color 150ms;
        }
        .ft-soc-btn:hover { color:var(--pink); border-color:rgba(240,23,122,0.4); }

        /* badge */
        .ft-badge {
          display:inline-flex; align-items:center; gap:0.38rem;
          padding:0.25rem 0.65rem; border-radius:9999px;
          background:rgba(240,23,122,0.08); border:1px solid rgba(240,23,122,0.18);
        }
        @keyframes pulseDot { 0%,100%{opacity:1}50%{opacity:0.3} }
        .pdot {
          width:5px; height:5px; border-radius:50%;
          background:#f0177a; animation:pulseDot 2s ease-in-out infinite;
        }

        /* ── BOTTOM BAR ── */
        .ft-divider { border:none; border-top:1px solid var(--border); margin:0; }
        .ft-bottom {
          max-width:76rem; margin:0 auto;
          padding:1rem 1.25rem 1.5rem;
          display:flex; align-items:center; justify-content:space-between;
          gap:0.75rem; flex-wrap:wrap;
          position:relative; z-index:1;
        }
        .ft-copy { font-size:0.7rem; color:var(--text-muted); }
        .ft-credit { font-size:0.65rem; color:var(--text-muted); font-family:var(--font-mono); }
      `}</style>

      <div className="ft-glow" />

      <div className="ft-inner">

        {/* ── brand strip ── */}
        <div className="ft-brand">
          <div className="ft-brand-left">
            <div className="ft-brand-top">
              <Link href="/" className="ft-logo-wrap">
                <img src="/Logo_1_raster_lowres.png" alt="Pinky Party Logo" className="ft-logo-img" />
              </Link>
              <div className="ft-badge">
                <span className="pdot" />
                <span style={{ fontSize:"0.58rem", fontWeight:700, color:"#ff4fa3", letterSpacing:"0.06em", textTransform:"uppercase" }}>
                  Przyjmujemy rezerwacje
                </span>
              </div>
            </div>

            <p className="ft-tagline">
              Tworzymy niezapomniane wydarzenia z&nbsp;energią i&nbsp;klasą —
              od urodzin dla dzieci po imprezy firmowe i&nbsp;szkolne.
            </p>
          </div>

          <div className="ft-brand-actions">
            <Link href="/kontakt" className="ft-cta">
              Zarezerwuj termin →
            </Link>
          </div>
        </div>

        {/* ── 2/3 col grid ── */}
        <div className="ft-grid">

          {/* Nawigacja */}
          <div>
            <div className="ft-col-title">Strony</div>
            <nav style={{ display:"flex", flexDirection:"column" }}>
              {NAV.map((l) => (
                <Link key={l.href} href={l.href} className="ft-link">{l.label}</Link>
              ))}
            </nav>
          </div>

          {/* Kontakt */}
          <div>
            <div className="ft-col-title">Kontakt</div>

            <div className="ft-contact-lbl">Telefon</div>
            <a href="tel:+48792987499" className="ft-contact-val">+48 792 987 499</a>

            <div className="ft-contact-lbl">E-mail</div>
            <a href="mailto:pinkyparty.eventy@gmail.com" className="ft-contact-val">
              pinkyparty.eventy@gmail.com
            </a>

            <div className="ft-contact-lbl">Obszar</div>
            <span className="ft-contact-val">Wrocław i okolice</span>
          </div>

          {/* Social + NIP — na mobile zajmuje obie kolumny */}
          <div style={{ gridColumn:"1 / -1" } as React.CSSProperties}>
            <div className="ft-col-title">Social media</div>
            <div className="ft-social-row">
              {SOCIAL.map((s) => (
                <a key={s.title} href={s.href} target="_blank" rel="noopener noreferrer"
                   className="ft-soc-btn" title={s.title}>
                  {s.icon}
                </a>
              ))}
            </div>
            <div style={{ marginTop:"0.65rem", fontSize:"0.62rem", color:"var(--text-muted)" }}>
              NIP: 8961648798 | REGON: 540977001
            </div>
          </div>

        </div>
      </div>

      <hr className="ft-divider" />

      <div className="ft-bottom">
        <span className="ft-copy">
          © {new Date().getFullYear()} Pinky Party Animacje & Eventy. Wszelkie prawa zastrzeżone.
        </span>
        <span className="ft-credit">Projekt i realizacja — z pasją</span>
      </div>
    </footer>
  );
}