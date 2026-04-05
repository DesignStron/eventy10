export const metadata = { title: "O nas" };

const VALUES = [
  {
    icon: "✦",
    title: "Dopasowanie do grupy",
    desc: "Każde wydarzenie projektujemy od zera — biorąc pod uwagę wiek, charakter i oczekiwania uczestników.",
  },
  {
    icon: "◈",
    title: "Dynamiczne prowadzenie",
    desc: "Energia i profesjonalizm w jednym. Dbamy o to, żeby każda minuta była angażująca.",
  },
  {
    icon: "◉",
    title: "Sprawna logistyka",
    desc: "Przejmujemy pełną odpowiedzialność — od planowania po realizację. Ty tylko cieszysz się imprezą.",
  },
  {
    icon: "◎",
    title: "Nowoczesna oprawa",
    desc: "Muzyka, światło, dekoracje i atrakcje dobierane są spójnie, tworząc jedną całość.",
  },
];

const STATS = [
  { num: "250+", label: "Zrealizowanych wydarzeń" },
  { num: "10+",  label: "Lat doświadczenia" },
  { num: "5★",   label: "Średnia ocen klientów" },
  { num: "24h",  label: "Czas odpowiedzi" },
];

const PROCESS = [
  { n: "01", title: "Konsultacja",   desc: "Rozmawiamy o Twoich potrzebach, grupie docelowej i budżecie." },
  { n: "02", title: "Koncepcja",     desc: "Przygotowujemy indywidualny scenariusz wydarzenia i wycenę." },
  { n: "03", title: "Przygotowanie", desc: "Kompletujemy atrakcje, sprzęt i koordynujemy wszystkie szczegóły." },
  { n: "04", title: "Realizacja",    desc: "Przyjeżdżamy i prowadzimy event — profesjonalnie i z pełną energią." },
];

export default function AboutPage() {
  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes pulseDot { 0%,100%{opacity:1}50%{opacity:0.35} }
        .fu  { animation: fadeUp 0.75s cubic-bezier(0.16,1,0.3,1) both; }
        .d1{animation-delay:0.08s} .d2{animation-delay:0.18s}
        .d3{animation-delay:0.3s}  .d4{animation-delay:0.44s}

        .about-section { max-width:72rem; margin:0 auto; padding:0 1.5rem; }

        /* value cards */
        .val-grid {
          display:grid; grid-template-columns:1fr; gap:1px;
          border-radius:1.25rem; overflow:hidden;
          border:1px solid rgba(255,255,255,0.07);
        }
        @media(min-width:640px){ .val-grid { grid-template-columns:repeat(2,1fr); } }
        .val-card {
          background:rgba(255,255,255,0.025); padding:2rem;
          transition:background 220ms ease;
        }
        .val-card:hover { background:rgba(255,255,255,0.04); }
        .val-icon {
          width:2.5rem; height:2.5rem; border-radius:0.625rem;
          background:rgba(240,23,122,0.12); border:1px solid rgba(240,23,122,0.22);
          display:flex; align-items:center; justify-content:center;
          font-size:0.9rem; color:var(--pink-light); margin-bottom:1.1rem;
        }
        .val-title { font-size:1rem; font-weight:700; color:#fff; margin-bottom:0.5rem; font-family:var(--font-display); }
        .val-desc  { font-size:0.84rem; color:rgba(255,255,255,0.5); line-height:1.75; }

        /* stats */
        .stat-grid {
          display:grid; grid-template-columns:repeat(2,1fr); gap:1px;
          border-radius:1.25rem; overflow:hidden;
          border:1px solid rgba(255,255,255,0.07);
        }
        @media(min-width:768px){ .stat-grid { grid-template-columns:repeat(4,1fr); } }
        .stat-cell {
          background:rgba(255,255,255,0.025); padding:2rem 1.5rem; text-align:center;
          transition:background 200ms;
        }
        .stat-cell:hover { background:rgba(255,255,255,0.04); }
        .stat-num {
          font-family:var(--font-display); font-size:clamp(1.8rem,3vw,2.5rem);
          font-weight:700; color:#fff; line-height:1; letter-spacing:-0.02em;
        }
        .stat-lbl { font-size:0.78rem; color:rgba(255,255,255,0.42); margin-top:0.5rem; font-weight:500; }

        /* process */
        .proc-grid {
          display:grid; grid-template-columns:1fr; gap:0;
        }
        @media(min-width:768px){ .proc-grid { grid-template-columns:repeat(4,1fr); } }
        .proc-item {
          padding:2rem; position:relative;
          border-right:1px solid rgba(255,255,255,0.06);
          border-bottom:1px solid rgba(255,255,255,0.06);
        }
        @media(min-width:768px){
          .proc-item:last-child { border-right:none; }
          .proc-item { border-bottom:none; }
        }
        .proc-n {
          font-family:var(--font-display); font-size:2rem; font-weight:700;
          color:rgba(240,23,122,0.18); line-height:1; margin-bottom:1rem;
          letter-spacing:-0.02em;
        }
        .proc-title { font-size:0.95rem; font-weight:700; color:#fff; margin-bottom:0.5rem; }
        .proc-desc  { font-size:0.82rem; color:rgba(255,255,255,0.45); line-height:1.75; }

        /* section label */
        .sec-lbl {
          font-size:0.63rem; font-weight:700; letter-spacing:0.13em;
          text-transform:uppercase; color:rgba(255,255,255,0.22); margin-bottom:0.75rem;
        }
        .sec-title {
          font-family:var(--font-display);
          font-size:clamp(1.6rem,3.5vw,2.4rem);
          font-weight:700; color:#fff; line-height:1.12;
          letter-spacing:-0.02em; margin-bottom:1rem;
        }
        .sec-sub { font-size:0.95rem; color:rgba(255,255,255,0.5); line-height:1.8; max-width:42rem; }

        .div-h { height:1px; background:linear-gradient(90deg,transparent,rgba(240,23,122,0.25),transparent); }

        /* cta strip */
        .cta-strip {
          border-radius:1.25rem;
          background:rgba(255,255,255,0.025);
          border:1px solid rgba(255,255,255,0.07);
          padding:2.5rem;
          display:flex; flex-direction:column; gap:1.5rem;
          align-items:flex-start;
        }
        @media(min-width:640px){
          .cta-strip { flex-direction:row; align-items:center; justify-content:space-between; }
        }
        .btn-p {
          display:inline-flex; align-items:center; gap:0.5rem;
          height:3rem; padding:0 1.75rem; border-radius:9999px;
          background:var(--pink); color:#fff;
          font-size:0.875rem; font-weight:700; text-decoration:none;
          box-shadow:0 6px 24px rgba(240,23,122,0.4);
          transition:transform 200ms, box-shadow 200ms, background 200ms;
          white-space:nowrap;
        }
        .btn-p:hover { transform:translateY(-2px); box-shadow:0 10px 36px rgba(240,23,122,0.55); background:var(--pink-light); }
        .btn-g {
          display:inline-flex; align-items:center;
          height:3rem; padding:0 1.75rem; border-radius:9999px;
          border:1.5px solid rgba(255,255,255,0.12);
          color:rgba(255,255,255,0.7); font-size:0.875rem; font-weight:600;
          text-decoration:none; background:rgba(255,255,255,0.03);
          transition:border-color 200ms, background 200ms, color 200ms, transform 200ms;
          white-space:nowrap;
        }
        .btn-g:hover { border-color:rgba(240,23,122,0.4); background:rgba(240,23,122,0.07); color:#fff; transform:translateY(-1px); }

        html[data-theme="light"] .val-grid { border: 1px solid rgba(0,0,0,0.10); }
        html[data-theme="light"] .val-card { background: rgba(0,0,0,0.02); }
        html[data-theme="light"] .val-card:hover { background: rgba(0,0,0,0.04); }
        html[data-theme="light"] .val-title { color: var(--black); }
        html[data-theme="light"] .val-desc { color: rgba(0,0,0,0.6); }

        html[data-theme="light"] .stat-grid { border: 1px solid rgba(0,0,0,0.10); }
        html[data-theme="light"] .stat-cell { background: rgba(0,0,0,0.02); }
        html[data-theme="light"] .stat-cell:hover { background: rgba(0,0,0,0.04); }
        html[data-theme="light"] .stat-num { color: var(--black); }
        html[data-theme="light"] .stat-lbl { color: rgba(0,0,0,0.55); }

        html[data-theme="light"] .proc-item {
          border-right: 1px solid rgba(0,0,0,0.08);
          border-bottom: 1px solid rgba(0,0,0,0.08);
        }
        @media(min-width:768px){
          html[data-theme="light"] .proc-item:last-child { border-right:none; }
          html[data-theme="light"] .proc-item { border-bottom:none; }
        }
        html[data-theme="light"] .proc-title { color: var(--black); }
        html[data-theme="light"] .proc-desc { color: rgba(0,0,0,0.6); }

        html[data-theme="light"] .sec-lbl { color: rgba(0,0,0,0.45); }
        html[data-theme="light"] .sec-title { color: var(--black); }
        html[data-theme="light"] .sec-sub { color: rgba(0,0,0,0.6); }

        html[data-theme="light"] .cta-strip {
          background: rgba(0,0,0,0.02);
          border: 1px solid rgba(0,0,0,0.10);
        }
      `}</style>

      <div className="page-bg noise">

        {/* ── HERO ── */}
        <section style={{ maxWidth:"72rem", margin:"0 auto", padding:"6rem 1.5rem 5rem" }}>
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
              Poznaj nas bliżej
            </span>
          </div>

          <h1 className="fu d1" style={{
            fontFamily:"var(--font-display)",
            fontSize:"clamp(2.8rem,6vw,5rem)",
            fontWeight:700, color:"#fff", lineHeight:1.06,
            letterSpacing:"-0.025em", marginBottom:"1.5rem",
          }}>
            Tworzymy wydarzenia,<br/>
            <span style={{ color:"var(--pink-light)" }}>które zostają w pamięci</span>
          </h1>

          <p className="fu d2" style={{
            color:"rgba(255,255,255,0.55)", fontSize:"clamp(1rem,2vw,1.15rem)",
            lineHeight:1.8, maxWidth:"560px", marginBottom:"0",
          }}>
            Różowy Event to zespół z ponad 10-letnim doświadczeniem w organizacji
            imprez dla dzieci, firm i instytucji. Robimy to z pełnym zaangażowaniem
            i dbałością o każdy detal.
          </p>
        </section>

        {/* ── STATS ── */}
        <section className="about-section" style={{ paddingBottom:"4rem" }}>
          <div className="stat-grid">
            {STATS.map((s) => (
              <div key={s.label} className="stat-cell">
                <div className="stat-num">{s.num}</div>
                <div className="stat-lbl">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="about-section" style={{ paddingBottom:"4rem" }}>
          <div className="div-h"/>
        </div>

        {/* ── VALUES ── */}
        <section className="about-section" style={{ paddingBottom:"5rem" }}>
          <p className="sec-lbl">Co nas wyróżnia</p>
          <h2 className="sec-title">Podejście, które robi różnicę</h2>
          <p className="sec-sub" style={{ marginBottom:"2.5rem" }}>
            Nie robimy eventów „z szablonu". Każde wydarzenie planujemy od podstaw,
            dopasowując każdy element do konkretnej grupy i okazji.
          </p>
          <div className="val-grid">
            {VALUES.map((v) => (
              <div key={v.title} className="val-card">
                <div className="val-icon">{v.icon}</div>
                <div className="val-title">{v.title}</div>
                <div className="val-desc">{v.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="about-section" style={{ paddingBottom:"4rem" }}>
          <div className="div-h"/>
        </div>

        {/* ── PROCESS ── */}
        <section className="about-section" style={{ paddingBottom:"5rem" }}>
          <p className="sec-lbl">Jak pracujemy</p>
          <h2 className="sec-title">Od pomysłu do realizacji</h2>
          <p className="sec-sub" style={{ marginBottom:"2.5rem" }}>
            Nasz proces jest prosty i przejrzysty — żebyś wiedział/a dokładnie,
            czego się spodziewać na każdym etapie.
          </p>
          <div style={{
            borderRadius:"1.25rem", overflow:"hidden",
            border:"1px solid rgba(255,255,255,0.07)",
          }}>
            <div className="proc-grid">
              {PROCESS.map((p) => (
                <div key={p.n} className="proc-item">
                  <div className="proc-n">{p.n}</div>
                  <div className="proc-title">{p.title}</div>
                  <div className="proc-desc">{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="about-section" style={{ paddingBottom:"4rem" }}>
          <div className="div-h"/>
        </div>

        {/* ── CTA ── */}
        <section className="about-section" style={{ paddingBottom:"8rem" }}>
          <div className="cta-strip">
            <div>
              <div style={{ fontFamily:"var(--font-display)",fontSize:"1.4rem",fontWeight:700,color:"#fff",marginBottom:"0.4rem" }}>
                Masz pytania? Chętnie porozmawiamy.
              </div>
              <div style={{ fontSize:"0.875rem",color:"rgba(255,255,255,0.48)" }}>
                Odpiszemy w ciągu 24 godzin i przygotujemy bezpłatną wycenę.
              </div>
            </div>
            <div style={{ display:"flex", gap:"0.75rem", flexWrap:"wrap", flexShrink:0 }}>
              <a href="/kontakt" className="btn-p">Skontaktuj się →</a>
              <a href="/oferta"  className="btn-g">Zobacz ofertę</a>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}