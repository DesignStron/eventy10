export const metadata = { title: "Oprawa muzyczna" };

const EVENTS = [
  {
    key: "studniowki",
    title: "Studniówki",
    desc: "Elegancka oprawa muzyczna i prowadzenie wieczoru. Dobieramy repertuar dopasowany do gustu maturzystów i tradycji.",
    features: ["Repertuar taneczny i okolicznościowy","Profesjonalne prowadzenie imprezy","Oświetlenie i efekty świetlne","Współpraca z fotografem"],
  },
  {
    key: "wesela",
    title: "Wesela",
    desc: "Kompleksowa oprawa muzyczna wesela — od pierwszego tańca po oczepiny. Dbamy o każdy moment tego wyjątkowego dnia.",
    features: ["Konsultacja i dobór repertuaru","Prowadzenie ceremonii i przyjęcia","Zabawy i konkursy weselne","Sprzęt nagłośnieniowy i oświetlenie"],
  },
  {
    key: "urodziny",
    title: "Urodziny i przyjęcia",
    desc: "Muzyczna oprawa przyjęć urodzinowych, rocznic i spotkań rodzinnych. Dopasujemy klimat do charakteru imprezy i gości.",
    features: ["Różne gatunki muzyczne","Możliwość dedykacji i życzeń","Nagłośnienie dostosowane do sali","Opcjonalnie animacje dla dzieci"],
  },
  {
    key: "firmowe",
    title: "Eventy firmowe",
    desc: "Profesjonalna oprawa muzyczna na imprezy integracyjne, bankiety, gale i konferencje.",
    features: ["Muzyka tła i taneczna","Prowadzenie programu","Nagłośnienie konferencji","Oświetlenie sceniczne"],
  },
  {
    key: "bale",
    title: "Bale karnawałowe",
    desc: "Dynamiczna oprawa muzyczna balów karnawałowych dla dzieci i dorosłych. Wiele gatunków i klimatów w jednym wieczorze.",
    features: ["Repertuar taneczny i zabawowy","Konkursy muzyczne z nagrodami","Światła i efekty specjalne","Współpraca z animatorami"],
  },
  {
    key: "swiateczne",
    title: "Eventy świąteczne",
    desc: "Magiczna atmosfera świąt Bożego Narodzenia z odpowiednią oprawą muzyczną. Kolędy, nowoczesne świąteczne hity i klimatyczne aranżacje.",
    features: ["Repertuar świąteczny","Oświetlenie dekoracyjne","Możliwość nagłośnienia na zewnątrz","Współpraca z Mikołajem"],
  },
];

const EQUIPMENT = [
  { title:"Nagłośnienie",  desc:"Systemy głośnikowe dostosowane do wielkości i charakteru pomieszczenia." },
  { title:"Oświetlenie",   desc:"Profesjonalne zestawy świateł — od subtelnego tła po pełne show." },
  { title:"DJ i prowadzący", desc:"Doświadczony DJ z bogatym repertuarem i umiejętnościami MC." },
  { title:"Mikrofony",     desc:"Bezprzewodowe mikrofony dla prowadzących i gości." },
  { title:"Efekty",        desc:"Dym, konfetti, bańki mydlane i inne efekty specjalne na życzenie." },
  { title:"Transport",     desc:"Pełny montaż i demontaż sprzętu — bez stresu dla organizatora." },
];

export default function MusicPage() {
  return (
    <>
      <style>{`
        @keyframes pulseDot{0%,100%{opacity:1}50%{opacity:.35}}

        .mu-section { max-width:72rem; margin:0 auto; padding:0 1.5rem; }

        .mu-event-grid {
          display:grid; grid-template-columns:1fr; gap:1.25rem;
        }
        @media(min-width:768px){ .mu-event-grid { grid-template-columns:repeat(2,1fr); } }
        @media(min-width:1024px){ .mu-event-grid { grid-template-columns:repeat(3,1fr); } }

        .mu-card {
          border-radius:1.1rem;
          background:rgba(255,255,255,0.025);
          border:1px solid rgba(255,255,255,0.07);
          overflow:hidden;
          transition:border-color 220ms, transform 220ms, box-shadow 220ms;
          display:flex; flex-direction:column;
        }
        .mu-card:hover {
          border-color:rgba(240,23,122,0.25);
          transform:translateY(-3px);
          box-shadow:0 16px 40px rgba(0,0,0,0.3), 0 4px 12px rgba(240,23,122,0.08);
        }
        .mu-card-hd {
          padding:1.5rem 1.5rem 1.25rem;
          border-bottom:1px solid rgba(255,255,255,0.06);
          background:rgba(240,23,122,0.05);
        }
        .mu-card-title {
          font-family:var(--font-display); font-size:1.15rem;
          font-weight:700; color:#fff; margin-bottom:0.5rem; line-height:1.2;
        }
        .mu-card-desc { font-size:0.82rem; color:rgba(255,255,255,0.5); line-height:1.7; }
        .mu-card-ft { padding:1.25rem 1.5rem; flex:1; }
        .mu-feat {
          display:flex; align-items:flex-start; gap:0.6rem;
          padding:0.4rem 0; border-bottom:1px solid rgba(255,255,255,0.05);
        }
        .mu-feat:last-child { border-bottom:none; padding-bottom:0; }
        .mu-feat:first-child { padding-top:0; }
        .mu-check {
          width:16px; height:16px; border-radius:50%; flex-shrink:0;
          background:rgba(240,23,122,0.13); border:1px solid rgba(240,23,122,0.28);
          display:flex; align-items:center; justify-content:center; margin-top:1px;
        }
        .mu-feat-txt { font-size:0.81rem; color:rgba(255,255,255,0.65); font-weight:500; line-height:1.5; }

        .mu-eq-grid {
          display:grid; grid-template-columns:repeat(2,1fr); gap:1px;
          border-radius:1.1rem; overflow:hidden;
          border:1px solid rgba(255,255,255,0.07);
        }
        @media(min-width:768px){ .mu-eq-grid { grid-template-columns:repeat(3,1fr); } }
        .mu-eq-cell {
          background:rgba(255,255,255,0.025); padding:1.75rem;
          transition:background 180ms;
        }
        .mu-eq-cell:hover { background:rgba(255,255,255,0.04); }
        .mu-eq-title { font-size:0.95rem; font-weight:700; color:#fff; margin-bottom:0.4rem; }
        .mu-eq-desc  { font-size:0.8rem; color:rgba(255,255,255,0.45); line-height:1.65; }
        .mu-eq-icon  {
          width:2.2rem; height:2.2rem; border-radius:0.5rem;
          background:rgba(240,23,122,0.1); border:1px solid rgba(240,23,122,0.2);
          display:flex; align-items:center; justify-content:center;
          margin-bottom:0.875rem;
        }

        .sec-lbl { font-size:0.63rem; font-weight:700; letter-spacing:0.13em; text-transform:uppercase; color:rgba(255,255,255,0.22); margin-bottom:0.75rem; }
        .sec-title { font-family:var(--font-display); font-size:clamp(1.6rem,3.5vw,2.4rem); font-weight:700; color:#fff; line-height:1.12; letter-spacing:-0.02em; margin-bottom:1rem; }
        .sec-sub { font-size:0.95rem; color:rgba(255,255,255,0.5); line-height:1.8; max-width:42rem; }
        .div-h { height:1px; background:linear-gradient(90deg,transparent,rgba(240,23,122,0.25),transparent); }

        .btn-p {
          display:inline-flex; align-items:center; gap:0.5rem;
          height:3rem; padding:0 1.75rem; border-radius:9999px;
          background:var(--pink); color:#fff;
          font-size:0.875rem; font-weight:700; text-decoration:none;
          box-shadow:0 6px 24px rgba(240,23,122,0.4);
          transition:transform 200ms, box-shadow 200ms, background 200ms;
        }
        .btn-p:hover { transform:translateY(-2px); box-shadow:0 10px 36px rgba(240,23,122,0.55); background:var(--pink-light); }

        html[data-theme="light"] .mu-card {
          background: rgba(0,0,0,0.02);
          border: 1px solid rgba(0,0,0,0.10);
        }
        html[data-theme="light"] .mu-card-hd {
          border-bottom: 1px solid rgba(0,0,0,0.08);
          background: rgba(240,23,122,0.06);
        }
        html[data-theme="light"] .mu-card-title { color: var(--black); }
        html[data-theme="light"] .mu-card-desc { color: rgba(0,0,0,0.6); }
        html[data-theme="light"] .mu-feat { border-bottom: 1px solid rgba(0,0,0,0.06); }
        html[data-theme="light"] .mu-feat-txt { color: rgba(0,0,0,0.7); }

        html[data-theme="light"] .mu-eq-grid { border: 1px solid rgba(0,0,0,0.10); }
        html[data-theme="light"] .mu-eq-cell { background: rgba(0,0,0,0.02); }
        html[data-theme="light"] .mu-eq-cell:hover { background: rgba(0,0,0,0.04); }
        html[data-theme="light"] .mu-eq-title { color: var(--black); }
        html[data-theme="light"] .mu-eq-desc { color: rgba(0,0,0,0.6); }

        html[data-theme="light"] .sec-lbl { color: rgba(0,0,0,0.45); }
        html[data-theme="light"] .sec-title { color: var(--black); }
        html[data-theme="light"] .sec-sub { color: rgba(0,0,0,0.6); }
      `}</style>

      <div className="page-bg noise">

        {/* ── HERO ── */}
        <section style={{ maxWidth:"72rem", margin:"0 auto", padding:"6rem 1.5rem 5rem" }}>
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
            Oprawa muzyczna
          </span>

          <h1 style={{
            fontFamily:"var(--font-display)", fontSize:"clamp(2.6rem,5.5vw,4.5rem)",
            fontWeight:700, color:"#fff", lineHeight:1.06,
            letterSpacing:"-0.025em", marginBottom:"1.25rem",
          }}>
            Muzyka, która tworzy<br/>
            <span style={{ color:"var(--pink-light)" }}>niezapomnianą atmosferę</span>
          </h1>

          <p style={{
            color:"rgba(255,255,255,0.52)", fontSize:"clamp(1rem,2vw,1.12rem)",
            lineHeight:1.8, maxWidth:"520px",
          }}>
            Zapewniamy kompleksową obsługę muzyczną dla każdego typu wydarzenia —
            od kameralnych przyjęć po wielkie imprezy plenerowe.
          </p>
        </section>

        {/* ── EVENT TYPES ── */}
        <section className="mu-section" style={{ paddingBottom:"5rem" }}>
          <p className="sec-lbl">Typy wydarzeń</p>
          <h2 className="sec-title">Dla kogo gramy</h2>
          <p className="sec-sub" style={{ marginBottom:"2.5rem" }}>
            Dostosowujemy repertuar, sprzęt i styl prowadzenia do konkretnego wydarzenia.
          </p>
          <div className="mu-event-grid">
            {EVENTS.map((e) => (
              <div key={e.key} className="mu-card">
                <div className="mu-card-hd">
                  <div className="mu-card-title">{e.title}</div>
                  <div className="mu-card-desc">{e.desc}</div>
                </div>
                <div className="mu-card-ft">
                  {e.features.map((f) => (
                    <div key={f} className="mu-feat">
                      <div className="mu-check">
                        <svg width="7" height="7" viewBox="0 0 10 10" fill="none">
                          <path d="M1.5 5.5L4 8L8.5 2" stroke="#ff4fa3" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span className="mu-feat-txt">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mu-section" style={{ paddingBottom:"4rem" }}>
          <div className="div-h"/>
        </div>

        {/* ── EQUIPMENT ── */}
        <section className="mu-section" style={{ paddingBottom:"5rem" }}>
          <p className="sec-lbl">Sprzęt i zaplecze</p>
          <h2 className="sec-title">Profesjonalne wyposażenie</h2>
          <p className="sec-sub" style={{ marginBottom:"2.5rem" }}>
            Przywozimy wszystko co potrzebne — montujemy, obsługujemy i demontujemy.
          </p>
          <div className="mu-eq-grid">
            {EQUIPMENT.map((eq) => (
              <div key={eq.title} className="mu-eq-cell">
                <div className="mu-eq-icon">
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="3" fill="#ff4fa3"/>
                    <circle cx="10" cy="10" r="7" stroke="#ff4fa3" strokeOpacity="0.4" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div className="mu-eq-title">{eq.title}</div>
                <div className="mu-eq-desc">{eq.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="mu-section" style={{ paddingBottom:"4rem" }}>
          <div className="div-h"/>
        </div>

        {/* ── CTA ── */}
        <section className="mu-section" style={{ paddingBottom:"8rem" }}>
          <div style={{
            borderRadius:"1.25rem",
            border:"1px solid rgba(240,23,122,0.18)",
            background:"rgba(255,255,255,0.025)",
            padding:"3.5rem 2.5rem", textAlign:"center",
            position:"relative", overflow:"hidden",
          }}>
            <div style={{
              position:"absolute", inset:0, pointerEvents:"none",
              background:"radial-gradient(ellipse 70% 80% at 50% 120%,rgba(240,23,122,0.1) 0%,transparent 65%)",
            }}/>
            <h2 style={{
              fontFamily:"var(--font-display)", fontSize:"clamp(1.6rem,3.5vw,2.4rem)",
              fontWeight:700, color:"#fff", lineHeight:1.1,
              letterSpacing:"-0.02em", marginBottom:"0.875rem", position:"relative",
            }}>
              Chcesz wyjątkową oprawę muzyczną?
            </h2>
            <p style={{
              color:"rgba(255,255,255,0.5)", fontSize:"0.95rem", lineHeight:1.75,
              maxWidth:"420px", margin:"0 auto 2rem", position:"relative",
            }}>
              Skontaktuj się z nami — omówimy szczegóły, dobierzemy repertuar
              i&nbsp;przygotujemy wycenę.
            </p>
            <a href="/kontakt" className="btn-p" style={{ position:"relative" }}>
              Wyślij zapytanie →
            </a>
          </div>
        </section>

      </div>
    </>
  );
}