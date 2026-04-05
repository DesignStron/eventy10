import ContactForm from "@/components/contact-form";

export const metadata = { title: "Kontakt" };

const CONTACT_ITEMS = [
  { label: "Telefon",           value: "+48 000 000 000",       href: "tel:+48000000000" },
  { label: "E-mail",            value: "kontakt@rozowyevent.pl", href: "mailto:kontakt@rozowyevent.pl" },
  { label: "Obszar działania",  value: "Łódź i okolice",         href: null },
  { label: "Czas odpowiedzi",   value: "Do 24 godzin",           href: null },
];

export default function ContactPage() {
  return (
    <>
      <style>{`
        @keyframes pulseDot { 0%,100%{opacity:1} 50%{opacity:.35} }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .fu  { animation: fadeUp 0.75s cubic-bezier(0.16,1,0.3,1) both; }
        .d1  { animation-delay:.08s } .d2 { animation-delay:.18s } .d3 { animation-delay:.3s }

        .kt-wrap { max-width:72rem; margin:0 auto; padding:0 1.5rem; }

        /* contact info cells */
        .ci-grid {
          display:grid; grid-template-columns:1fr; gap:1px;
          border-radius:1.1rem; overflow:hidden;
          border:1px solid rgba(255,255,255,0.07);
        }
        @media(min-width:540px){ .ci-grid { grid-template-columns:repeat(2,1fr); } }
        @media(min-width:900px){ .ci-grid { grid-template-columns:repeat(4,1fr); } }
        .ci-cell {
          background:rgba(255,255,255,0.025); padding:1.5rem 1.75rem;
          transition:background 180ms;
        }
        .ci-cell:hover { background:rgba(255,255,255,0.04); }
        .ci-lbl {
          font-size:0.6rem; font-weight:700; letter-spacing:0.12em;
          text-transform:uppercase; color:rgba(255,255,255,0.25); margin-bottom:0.35rem;
        }
        .ci-val {
          font-size:0.9rem; font-weight:600; color:rgba(255,255,255,0.82);
          text-decoration:none; display:block; transition:color 160ms;
        }
        a.ci-val:hover { color:var(--pink-light); }

        /* response promise strip */
        .promise {
          border-radius:1.1rem;
          background:rgba(240,23,122,0.07);
          border:1px solid rgba(240,23,122,0.16);
          padding:1.5rem 2rem;
          display:flex; align-items:center; gap:1rem; flex-wrap:wrap;
        }
        .promise-icon {
          width:2.5rem; height:2.5rem; border-radius:0.625rem; flex-shrink:0;
          background:rgba(240,23,122,0.13); border:1px solid rgba(240,23,122,0.25);
          display:flex; align-items:center; justify-content:center;
        }

        .div-h { height:1px; background:linear-gradient(90deg,transparent,rgba(240,23,122,0.25),transparent); }
        .sec-lbl { font-size:0.63rem; font-weight:700; letter-spacing:0.13em; text-transform:uppercase; color:rgba(255,255,255,0.22); margin-bottom:0.75rem; }

        html[data-theme="light"] .ci-grid { border: 1px solid rgba(0,0,0,0.10); }
        html[data-theme="light"] .ci-cell { background: rgba(0,0,0,0.02); }
        html[data-theme="light"] .ci-cell:hover { background: rgba(0,0,0,0.04); }
        html[data-theme="light"] .ci-lbl { color: rgba(0,0,0,0.45); }
        html[data-theme="light"] .ci-val { color: rgba(0,0,0,0.78); }

        html[data-theme="light"] .promise {
          background: rgba(240,23,122,0.06);
          border: 1px solid rgba(240,23,122,0.16);
        }
        html[data-theme="light"] .sec-lbl { color: rgba(0,0,0,0.45); }

        html[data-theme="light"] .promise-title { color: var(--black) !important; }
        html[data-theme="light"] .promise-desc { color: rgba(0,0,0,0.6) !important; }
      `}</style>

      <div className="page-bg noise">

        {/* ── PAGE HEADER ── */}
        <section style={{ maxWidth:"72rem", margin:"0 auto", padding:"6rem 1.5rem 4rem" }}>
          <div className="fu" style={{ marginBottom:"1.5rem" }}>
            <span style={{
              display:"inline-flex", alignItems:"center", gap:"0.42rem",
              padding:"0.36rem 0.9rem", borderRadius:"9999px",
              background:"rgba(240,23,122,0.1)", border:"1px solid rgba(240,23,122,0.22)",
              fontSize:"0.67rem", fontWeight:700, letterSpacing:"0.1em",
              textTransform:"uppercase", color:"var(--pink-light)",
            }}>
              <span style={{
                width:"5px", height:"5px", borderRadius:"50%",
                background:"var(--pink)", display:"inline-block",
                animation:"pulseDot 2.2s ease-in-out infinite",
              }}/>
              Kontakt
            </span>
          </div>

          <h1 className="fu d1" style={{
            fontFamily:"var(--font-display)",
            fontSize:"clamp(2.6rem,5.5vw,4.5rem)",
            fontWeight:700, color:"#fff", lineHeight:1.06,
            letterSpacing:"-0.025em", marginBottom:"1.25rem",
          }}>
            Napisz do nas —<br/>
            <span style={{ color:"var(--pink-light)" }}>wrócimy z wyceną</span>
          </h1>

          <p className="fu d2" style={{
            color:"rgba(255,255,255,0.52)",
            fontSize:"clamp(1rem,2vw,1.12rem)",
            lineHeight:1.8, maxWidth:"500px",
          }}>
            Opisz krótko typ wydarzenia, termin i liczbę uczestników.
            Odpiszemy w ciągu 24 godzin z konkretną propozycją.
          </p>
        </section>

        {/* ── FORM ── */}
        <section className="kt-wrap" style={{ paddingBottom:"4rem" }}>
          <div style={{
            borderRadius:"1.25rem",
            background:"rgba(255,255,255,0.025)",
            border:"1px solid rgba(255,255,255,0.07)",
            padding:"2.5rem",
          }}>
            <ContactForm />
          </div>
        </section>

        {/* ── DIVIDER ── */}
        <div className="kt-wrap" style={{ paddingBottom:"4rem" }}>
          <div className="div-h"/>
        </div>

        {/* ── CONTACT INFO ── */}
        <section className="kt-wrap" style={{ paddingBottom:"4rem" }}>
          <p className="sec-lbl">Dane kontaktowe</p>
          <div className="ci-grid">
            {CONTACT_ITEMS.map((c) => (
              <div key={c.label} className="ci-cell">
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
          <div className="promise">
            <div className="promise-icon">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm.75 8.75h-1.5V6h1.5v4.75zm0 3h-1.5v-1.5h1.5v1.5z" fill="#ff4fa3"/>
              </svg>
            </div>
            <div style={{ flex:1 }}>
              <div className="promise-title" style={{ fontSize:"0.9rem", fontWeight:700, color:"#fff", marginBottom:"0.2rem" }}>
                Odpiszemy w ciągu 24 godzin
              </div>
              <div className="promise-desc" style={{ fontSize:"0.82rem", color:"rgba(255,255,255,0.45)", lineHeight:1.6 }}>
                Skontaktuj się z nami — przygotujemy bezpłatną wycenę i indywidualny scenariusz
                dopasowany do Twojego wydarzenia.
              </div>
            </div>
            <a href="tel:+48000000000" style={{
              display:"inline-flex", alignItems:"center", gap:"0.5rem",
              height:"2.75rem", padding:"0 1.5rem", borderRadius:"9999px",
              background:"var(--pink)", color:"#fff",
              fontSize:"0.84rem", fontWeight:700, textDecoration:"none",
              boxShadow:"0 6px 22px rgba(240,23,122,0.4)",
              transition:"transform 200ms, box-shadow 200ms",
              whiteSpace:"nowrap", flexShrink:0,
            }}>
              Zadzwoń teraz →
            </a>
          </div>
        </section>

      </div>
    </>
  );
}