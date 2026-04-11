import ContactForm from "@/components/contact-form";
import SiteFooter from "@/components/site-footer";

export const metadata = { title: "Kontakt" };

const CONTACT_ITEMS = [
  { label: "Telefon",           value: "+48 792 987 499",              href: "tel:+48792987499",                       icon: "📞" },
  { label: "E-mail",            value: "pinkyparty.eventy@gmail.com",  href: "mailto:pinkyparty.eventy@gmail.com",      icon: "✉️" },
  { label: "Obszar działania",  value: "Wrocław i okolice",            href: null,                                      icon: "📍" },
  { label: "Czas odpowiedzi",   value: "Do 24 godzin",                 href: null,                                      icon: "⚡" },
];

export default function ContactPage() {
  return (
    <>
      <style>{`
        @keyframes pulseDot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.35)} }
        @keyframes fadeUp   { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeLeft { from{opacity:0;transform:translateX(-22px)} to{opacity:1;transform:translateX(0)} }
        @keyframes floatY   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes shimBar  { 0%{background-position:-200% center} 100%{background-position:200% center} }

        .fu { animation:fadeUp  0.75s cubic-bezier(0.16,1,0.3,1) both; }
        .fl { animation:fadeLeft 0.75s cubic-bezier(0.16,1,0.3,1) both; }
        .d1{animation-delay:.06s} .d2{animation-delay:.16s}
        .d3{animation-delay:.28s} .d4{animation-delay:.42s}

        .kt-wrap { max-width:72rem; margin:0 auto; padding:0 1.5rem; }

        /* ── HERO BADGE ── */
        .kt-hero-badge {
          display:inline-flex; align-items:center; gap:0.5rem;
          padding:0.38rem 1rem; border-radius:9999px;
          background:rgba(240,23,122,0.1); border:1px solid rgba(240,23,122,0.25);
          font-size:0.63rem; font-weight:800; letter-spacing:0.12em;
          text-transform:uppercase; color:var(--pink-light);
          margin-bottom:1.5rem;
        }
        html[data-theme="light"] .kt-hero-badge {
          background:rgba(240,23,122,0.08); border:1px solid rgba(240,23,122,0.3);
          color:var(--pink);
        }

        /* ── HERO TITLE ── */
        .kt-hero-title {
          font-family:var(--font-display);
          font-size:clamp(2.6rem,5.5vw,4.5rem);
          font-weight:700; color:#fff; line-height:1.25;
          letter-spacing:-0.028em; margin-bottom:1.35rem;
        }
        html[data-theme="light"] .kt-hero-title { color:#0d0b10; }

        .kt-hero-accent {
          display:inline-block;
          background:linear-gradient(105deg,#f0177a 0%,#ff6bb5 50%,#f0177a 80%);
          background-size:200% auto;
          -webkit-background-clip:text; background-clip:text;
          -webkit-text-fill-color:transparent;
          animation:shimBar 3.5s linear infinite;
        }

        .kt-hero-desc {
          color:rgba(255,255,255,0.52); font-size:clamp(1rem,1.8vw,1.12rem);
          line-height:1.85; max-width:500px;
        }
        html[data-theme="light"] .kt-hero-desc { color:rgba(13,11,16,0.58); }

        /* ── FORM CARD ── */
        .kt-form-card {
          border-radius:1.5rem;
          background:rgba(255,255,255,0.025);
          border:1px solid rgba(255,255,255,0.07);
          padding:2.75rem;
          position:relative; overflow:hidden;
        }
        .kt-form-card::before {
          content:''; position:absolute; inset:0; pointer-events:none;
          background:radial-gradient(ellipse at 100% 0%, rgba(240,23,122,0.07) 0%, transparent 55%);
        }
        html[data-theme="light"] .kt-form-card {
          background:#ffffff;
          border:1px solid rgba(240,23,122,0.12);
          box-shadow:0 8px 40px rgba(240,23,122,0.08), 0 2px 12px rgba(0,0,0,0.05);
        }
        html[data-theme="light"] .kt-form-card::before {
          background:radial-gradient(ellipse at 100% 0%, rgba(240,23,122,0.04) 0%, transparent 55%);
        }

        /* ── EYEBROW ── */
        .kt-eyebrow {
          display:flex; align-items:center; gap:0.6rem;
          font-size:0.62rem; font-weight:800; letter-spacing:0.15em;
          text-transform:uppercase; color:var(--pink); margin-bottom:0.75rem;
        }
        .kt-eyebrow::before {
          content:''; display:inline-block; width:22px; height:2px;
          background:var(--pink); border-radius:2px; flex-shrink:0;
        }

        /* ── CONTACT GRID ── */
        .ci-grid {
          display:grid; grid-template-columns:1fr; gap:1rem;
        }
        @media(min-width:540px) { .ci-grid { grid-template-columns:repeat(2,1fr); } }
        @media(min-width:900px) { .ci-grid { grid-template-columns:repeat(4,1fr); } }

        .ci-cell {
          padding:1.6rem 1.5rem; border-radius:1.25rem;
          background:rgba(255,255,255,0.025);
          border:1px solid rgba(255,255,255,0.07);
          transition:border-color 250ms ease, transform 250ms ease, box-shadow 250ms ease, background 250ms ease;
          display:flex; flex-direction:column; gap:0.5rem;
        }
        .ci-cell:hover {
          border-color:rgba(240,23,122,0.28);
          transform:translateY(-3px);
          box-shadow:0 12px 36px rgba(240,23,122,0.1), 0 4px 12px rgba(0,0,0,0.25);
          background:rgba(255,255,255,0.04);
        }
        html[data-theme="light"] .ci-cell {
          background:#ffffff; border:1px solid rgba(0,0,0,0.07);
          box-shadow:0 2px 12px rgba(0,0,0,0.04);
        }
        html[data-theme="light"] .ci-cell:hover {
          border-color:rgba(240,23,122,0.3);
          box-shadow:0 12px 36px rgba(240,23,122,0.1), 0 4px 12px rgba(0,0,0,0.06);
        }

        .ci-icon {
          width:2.5rem; height:2.5rem; border-radius:0.75rem; flex-shrink:0;
          background:rgba(240,23,122,0.1); border:1px solid rgba(240,23,122,0.2);
          display:flex; align-items:center; justify-content:center; font-size:1.1rem;
          margin-bottom:0.25rem;
          animation:floatY 7s ease-in-out infinite;
          transition:transform 280ms ease, box-shadow 280ms ease, background 280ms ease;
        }
        .ci-cell:nth-child(2) .ci-icon { animation-delay:1.75s; }
        .ci-cell:nth-child(3) .ci-icon { animation-delay:3.5s; }
        .ci-cell:nth-child(4) .ci-icon { animation-delay:5.25s; }
        .ci-cell:hover .ci-icon {
          transform:scale(1.1) rotate(-4deg);
          box-shadow:0 6px 20px rgba(240,23,122,0.25);
          background:rgba(240,23,122,0.18);
        }
        html[data-theme="light"] .ci-icon {
          background:rgba(240,23,122,0.08); border:1px solid rgba(240,23,122,0.18);
        }

        .ci-lbl {
          font-size:0.6rem; font-weight:800; letter-spacing:0.14em;
          text-transform:uppercase; color:rgba(255,255,255,0.28);
        }
        html[data-theme="light"] .ci-lbl { color:rgba(13,11,16,0.42); }

        .ci-val {
          font-size:0.92rem; font-weight:700;
          color:rgba(255,255,255,0.84); text-decoration:none;
          display:block; transition:color 180ms ease;
          font-family:var(--font-display); letter-spacing:-0.01em;
        }
        a.ci-val:hover { color:var(--pink-light); }
        html[data-theme="light"] .ci-val { color:#0d0b10; }
        html[data-theme="light"] a.ci-val:hover { color:var(--pink); }

        /* ── PROMISE STRIP ── */
        .kt-promise {
          border-radius:1.5rem; padding:2rem 2.25rem;
          background:rgba(240,23,122,0.06);
          border:1px solid rgba(240,23,122,0.18);
          display:flex; align-items:center; gap:1.25rem; flex-wrap:wrap;
          position:relative; overflow:hidden;
        }
        .kt-promise::before {
          content:''; position:absolute; inset:0; pointer-events:none;
          background:radial-gradient(ellipse at 80% 50%, rgba(240,23,122,0.08) 0%, transparent 60%);
        }
        html[data-theme="light"] .kt-promise {
          background:#ffffff;
          border:1px solid rgba(240,23,122,0.2);
          box-shadow:0 8px 32px rgba(240,23,122,0.08), 0 2px 8px rgba(0,0,0,0.04);
        }
        html[data-theme="light"] .kt-promise::before {
          background:radial-gradient(ellipse at 80% 50%, rgba(240,23,122,0.05) 0%, transparent 60%);
        }

        .kt-promise-icon {
          width:3rem; height:3rem; border-radius:1rem; flex-shrink:0;
          background:rgba(240,23,122,0.14); border:1px solid rgba(240,23,122,0.28);
          display:flex; align-items:center; justify-content:center; font-size:1.3rem;
          position:relative;
        }
        html[data-theme="light"] .kt-promise-icon {
          background:rgba(240,23,122,0.1); border:1px solid rgba(240,23,122,0.25);
        }

        .kt-promise-title {
          font-size:0.95rem; font-weight:700; color:#fff; margin-bottom:0.25rem;
          font-family:var(--font-display); letter-spacing:-0.01em;
        }
        html[data-theme="light"] .kt-promise-title { color:#0d0b10 !important; }

        .kt-promise-desc {
          font-size:0.82rem; color:rgba(255,255,255,0.46); line-height:1.65;
        }
        html[data-theme="light"] .kt-promise-desc { color:rgba(13,11,16,0.55) !important; }

        /* ── CALL BUTTON ── */
        .kt-call-btn {
          display:inline-flex; align-items:center; gap:0.5rem;
          height:2.9rem; padding:0 1.6rem; border-radius:9999px;
          background:var(--pink); color:#fff;
          font-size:0.84rem; font-weight:700; text-decoration:none;
          box-shadow:0 6px 22px rgba(240,23,122,0.4);
          transition:transform 200ms ease, box-shadow 200ms ease, background 200ms ease;
          white-space:nowrap; flex-shrink:0; position:relative; overflow:hidden;
        }
        .kt-call-btn::after {
          content:''; position:absolute; inset:0;
          background:linear-gradient(135deg,rgba(255,255,255,0.15) 0%,transparent 60%);
          pointer-events:none;
        }
        .kt-call-btn:hover {
          transform:translateY(-2px) scale(1.02);
          box-shadow:0 12px 36px rgba(240,23,122,0.52);
          background:var(--pink-light);
        }

        /* ── DIVIDER ── */
        .kt-divider {
          height:1px; position:relative; overflow:visible; margin:0;
          background:linear-gradient(90deg,transparent,rgba(240,23,122,0.25),transparent);
        }
        .kt-divider::after {
          content:''; position:absolute; left:50%; top:50%;
          transform:translate(-50%,-50%);
          width:8px; height:8px; border-radius:50%;
          background:var(--pink); box-shadow:0 0 12px rgba(240,23,122,0.7);
        }
      `}</style>

      <div className="page-bg noise">

        {/* ── HERO ── */}
        <section style={{ maxWidth:"72rem", margin:"0 auto", padding:"6rem 1.5rem 4rem", position:"relative" }}>
          {/* Orb */}
          <div style={{
            position:"absolute", top:"-80px", right:"-60px",
            width:"360px", height:"360px", borderRadius:"50%", pointerEvents:"none",
            background:"radial-gradient(circle,rgba(240,23,122,0.13) 0%,transparent 70%)",
            filter:"blur(40px)", animation:"floatY 9s ease-in-out infinite",
          }}/>

          <div className="fu">
            <span className="kt-hero-badge">
              <span style={{
                width:"5px", height:"5px", borderRadius:"50%",
                background:"var(--pink)", display:"inline-block",
                animation:"pulseDot 2.2s ease-in-out infinite",
              }}/>
              Kontakt
            </span>
          </div>

          <h1 className="kt-hero-title fu d1">
            Napisz do nas -<br/>
            <span className="kt-hero-accent">wrócimy z wyceną</span>
          </h1>

          <p className="kt-hero-desc fu d2">
            Opisz krótko typ wydarzenia, termin i liczbę uczestników.
            Odpiszemy w ciągu 24 godzin z konkretną propozycją.
          </p>
        </section>

        {/* ── FORM ── */}
        <section className="kt-wrap" style={{ paddingBottom:"4rem" }}>
          <div className="kt-form-card fu d2">
            <ContactForm />
          </div>
        </section>

        {/* ── DIVIDER ── */}
        <div className="kt-wrap" style={{ paddingBottom:"4rem" }}>
          <div className="kt-divider"/>
        </div>

        {/* ── CONTACT INFO ── */}
        <section className="kt-wrap" style={{ paddingBottom:"3rem" }}>
          <div className="fl d1" style={{ marginBottom:"2rem" }}>
            <div className="kt-eyebrow">Dane kontaktowe</div>
          </div>
          <div className="ci-grid">
            {CONTACT_ITEMS.map((c, i) => (
              <div key={c.label} className="ci-cell fu" style={{ animationDelay:`${0.08 + i * 0.1}s` }}>
                <div className="ci-icon" style={{ animationDelay:`${i * 1.75}s` }}>{c.icon}</div>
                <div className="ci-lbl">{c.label}</div>
                {c.href
                  ? <a href={c.href} className="ci-val">{c.value}</a>
                  : <span className="ci-val">{c.value}</span>
                }
              </div>
            ))}
          </div>
        </section>

        {/* ── PROMISE STRIP ── */}
        <section className="kt-wrap" style={{ paddingBottom:"8rem" }}>
          <div className="kt-promise fu d3">
            <div className="kt-promise-icon">⏱️</div>
            <div style={{ flex:1, position:"relative" }}>
              <div className="kt-promise-title">Odpiszemy w ciągu 24 godzin</div>
              <div className="kt-promise-desc">
                Skontaktuj się z nami - przygotujemy bezpłatną wycenę i indywidualny scenariusz
                dopasowany do Twojego wydarzenia.
              </div>
            </div>
            <a href="tel:+48000000000" className="kt-call-btn">
              Zadzwoń teraz →
            </a>
          </div>
        </section>

      </div>
      <SiteFooter />
    </>
  );
}