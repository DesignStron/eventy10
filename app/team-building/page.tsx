import SiteFooter from "@/components/site-footer";
import Link from "next/link";

export const metadata = { title: "Team Building & Integracja" };
export const dynamic = 'force-dynamic';

export default function TeamBuildingPage() {
  return (
    <>
      <style>{`
        @keyframes pulseDot  { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.35)} }
        @keyframes fadeUp    { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeLeft  { from{opacity:0;transform:translateX(-22px)} to{opacity:1;transform:translateX(0)} }
        @keyframes floatY    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes shimBar   { 0%{background-position:-200% center} 100%{background-position:200% center} }

        .fu { animation:fadeUp  0.75s cubic-bezier(0.16,1,0.3,1) both; }
        .fl { animation:fadeLeft 0.75s cubic-bezier(0.16,1,0.3,1) both; }
        .d1{animation-delay:.06s} .d2{animation-delay:.16s}
        .d3{animation-delay:.28s} .d4{animation-delay:.42s}

        .tb-wrap { max-width:72rem; margin:0 auto; padding:0 1.5rem; }

        /* ── HERO BADGE ── */
        .tb-hero-badge {
          display:inline-flex; align-items:center; gap:0.5rem;
          padding:0.38rem 1rem; border-radius:9999px;
          background:rgba(240,23,122,0.1); border:1px solid rgba(240,23,122,0.25);
          font-size:0.63rem; font-weight:800; letter-spacing:0.12em;
          text-transform:uppercase; color:var(--pink-light);
          margin-bottom:1.5rem; backdrop-filter:blur(8px);
        }
        html[data-theme="light"] .tb-hero-badge {
          background:rgba(240,23,122,0.08); border:1px solid rgba(240,23,122,0.3);
          color:var(--pink);
        }

        /* ── HERO TITLE ── */
        .tb-hero-title {
          font-family:var(--font-display);
          font-size:clamp(2.6rem,5.5vw,4.5rem);
          font-weight:700; color:#fff; line-height:1.25;
          letter-spacing:-0.028em; margin-bottom:1.35rem;
        }
        html[data-theme="light"] .tb-hero-title { color:#0d0b10; }

        .tb-hero-accent {
          display:inline-block;
          background:linear-gradient(105deg,#f0177a 0%,#ff6bb5 50%,#f0177a 80%);
          background-size:200% auto;
          -webkit-background-clip:text; background-clip:text;
          -webkit-text-fill-color:transparent;
          animation:shimBar 3.5s linear infinite;
        }

        .tb-hero-desc {
          color:rgba(255,255,255,0.52); font-size:clamp(1rem,1.8vw,1.12rem);
          line-height:1.85; max-width:600px;
        }
        html[data-theme="light"] .tb-hero-desc { color:rgba(13,11,16,0.58); }

        /* ── SECTION EYEBROW ── */
        .tb-eyebrow {
          display:flex; align-items:center; gap:0.6rem;
          font-size:0.62rem; font-weight:800; letter-spacing:0.15em;
          text-transform:uppercase; color:var(--pink); margin-bottom:0.85rem;
        }
        .tb-eyebrow::before {
          content:''; display:inline-block; width:22px; height:2px;
          background:var(--pink); border-radius:2px; flex-shrink:0;
        }

        .tb-sec-title {
          font-family:var(--font-display);
          font-size:clamp(1.7rem,3.2vw,2.5rem);
          font-weight:700; color:#fff; line-height:1.1;
          letter-spacing:-0.02em; margin-bottom:1rem;
        }
        html[data-theme="light"] .tb-sec-title { color:#0d0b10; }

        .tb-sec-sub {
          font-size:0.95rem; color:rgba(255,255,255,0.5);
          line-height:1.85; max-width:42rem; margin-bottom:3rem;
        }
        html[data-theme="light"] .tb-sec-sub { color:rgba(13,11,16,0.58); }

        /* ── GRID ── */
        .tb-grid {
          display:grid; grid-template-columns:1fr; gap:1.5rem;
        }
        @media(min-width:768px)  { .tb-grid { grid-template-columns:repeat(2,1fr); } }

        /* ── CARD ── */
        .tb-card {
          border-radius:1.4rem;
          background:rgba(255,255,255,0.025);
          border:1px solid rgba(255,255,255,0.07);
          overflow:hidden; display:flex; flex-direction:column;
          transition:border-color 280ms ease, transform 280ms cubic-bezier(0.16,1,0.3,1), box-shadow 280ms ease;
          position:relative;
          padding: 2.5rem;
        }
        .tb-card::after {
          content:''; position:absolute; top:0; left:1.5rem; right:1.5rem; height:2px;
          background:linear-gradient(90deg,transparent,rgba(240,23,122,0.55),transparent);
          opacity:0; transition:opacity 280ms ease; border-radius:0 0 2px 2px;
        }
        .tb-card:hover {
          border-color:rgba(240,23,122,0.28);
          transform:translateY(-4px);
          box-shadow:0 20px 60px rgba(0,0,0,0.3), 0 4px 16px rgba(240,23,122,0.1);
        }
        .tb-card:hover::after { opacity:1; }

        html[data-theme="light"] .tb-card {
          background:#ffffff;
          border:1px solid rgba(0,0,0,0.07);
          box-shadow:0 4px 20px rgba(0,0,0,0.05);
        }
        html[data-theme="light"] .tb-card:hover {
          border-color:rgba(240,23,122,0.3);
          box-shadow:0 20px 60px rgba(240,23,122,0.1), 0 4px 16px rgba(0,0,0,0.06);
        }

        .tb-card-icon {
          width:3.5rem; height:3.5rem; border-radius:1rem;
          background:rgba(240,23,122,0.1); border:1px solid rgba(240,23,122,0.2);
          display:flex; align-items:center; justify-content:center;
          font-size:1.5rem; margin-bottom:1.5rem;
          transition:transform 300ms ease, box-shadow 300ms ease, background 300ms ease;
          animation:floatY 6s ease-in-out infinite;
        }
        .tb-card:nth-child(2) .tb-card-icon { animation-delay:1s; }
        .tb-card:hover .tb-card-icon {
          transform:scale(1.1) rotate(-4deg);
          box-shadow:0 8px 24px rgba(240,23,122,0.3);
          background:rgba(240,23,122,0.18);
        }
        html[data-theme="light"] .tb-card-icon {
          background:rgba(240,23,122,0.08); border:1px solid rgba(240,23,122,0.18);
        }

        .tb-card-title {
          font-family:var(--font-display); font-size:1.4rem;
          font-weight:700; color:#fff; margin-bottom:1rem; line-height:1.15;
          position:relative;
        }
        html[data-theme="light"] .tb-card-title { color:#0d0b10; }

        .tb-card-desc {
          font-size:0.95rem; color:rgba(255,255,255,0.6); line-height:1.75;
          position:relative; margin-bottom: 1.5rem;
        }
        html[data-theme="light"] .tb-card-desc { color:rgba(13,11,16,0.65); }

        .tb-feat {
          display:flex; align-items:flex-start; gap:0.65rem;
          padding:0.55rem 0;
          border-bottom:1px solid rgba(255,255,255,0.04);
          transition:padding-left 200ms ease;
        }
        .tb-feat:last-child { border-bottom:none; padding-bottom:0; }
        .tb-feat:first-child { padding-top:0; }
        .tb-card:hover .tb-feat { padding-left:2px; }
        html[data-theme="light"] .tb-feat { border-bottom:1px solid rgba(240,23,122,0.07); }

        .tb-check {
          width:18px; height:18px; border-radius:50%; flex-shrink:0;
          background:rgba(240,23,122,0.12); border:1px solid rgba(240,23,122,0.28);
          display:flex; align-items:center; justify-content:center; margin-top:1px;
        }
        html[data-theme="light"] .tb-check {
          background:rgba(240,23,122,0.1); border:1px solid rgba(240,23,122,0.25);
        }

        .tb-feat-txt {
          font-size:0.85rem; color:rgba(255,255,255,0.65); font-weight:500; line-height:1.55;
        }
        html[data-theme="light"] .tb-feat-txt { color:rgba(13,11,16,0.7); }

        /* ── LOCATIONS GRID ── */
        .tb-loc-grid {
          display:flex; flex-wrap:wrap; gap:0.8rem;
        }
        .tb-loc-item {
          display:inline-flex; align-items:center; gap:0.5rem;
          padding:0.6rem 1.2rem; border-radius:9999px;
          background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1);
          color:rgba(255,255,255,0.8); font-size:0.9rem; font-weight:500;
          transition:all 200ms ease;
        }
        .tb-loc-item:hover {
          background:rgba(240,23,122,0.1); border-color:rgba(240,23,122,0.3);
          color:#fff; transform:translateY(-2px);
        }
        html[data-theme="light"] .tb-loc-item {
          background:rgba(0,0,0,0.03); border-color:rgba(0,0,0,0.1); color:rgba(13,11,16,0.8);
        }
        html[data-theme="light"] .tb-loc-item:hover {
          background:rgba(240,23,122,0.08); border-color:rgba(240,23,122,0.25); color:var(--pink);
        }

        /* ── DIVIDER ── */
        .tb-divider {
          height:1px; position:relative; overflow:visible; margin:0;
          background:linear-gradient(90deg,transparent,rgba(240,23,122,0.25),transparent);
        }
        .tb-divider::after {
          content:''; position:absolute; left:50%; top:50%;
          transform:translate(-50%,-50%);
          width:8px; height:8px; border-radius:50%;
          background:var(--pink); box-shadow:0 0 12px rgba(240,23,122,0.7);
        }

        /* ── CTA ── */
        .tb-cta {
          border-radius:1.5rem; padding:3.5rem 2.5rem; text-align:center;
          border:1px solid rgba(240,23,122,0.18);
          background:rgba(255,255,255,0.025);
          position:relative; overflow:hidden;
        }
        html[data-theme="light"] .tb-cta {
          background:#ffffff;
          border:1px solid rgba(240,23,122,0.2);
          box-shadow:0 12px 50px rgba(240,23,122,0.1), 0 4px 16px rgba(0,0,0,0.04);
        }
        .tb-cta-title {
          font-family:var(--font-display); font-size:clamp(1.6rem,3.2vw,2.4rem);
          font-weight:700; color:#fff; line-height:1.1;
          letter-spacing:-0.02em; margin-bottom:0.875rem; position:relative;
        }
        html[data-theme="light"] .tb-cta-title { color:#0d0b10; }
        .tb-cta-desc {
          color:rgba(255,255,255,0.48); font-size:0.95rem;
          line-height:1.8; max-width:420px; margin:0 auto 2.25rem; position:relative;
        }
        html[data-theme="light"] .tb-cta-desc { color:rgba(13,11,16,0.55); }

        /* ── BUTTON ── */
        .tb-btn {
          display:inline-flex; align-items:center; gap:0.5rem;
          height:3.2rem; padding:0 2.2rem; border-radius:9999px;
          background:var(--pink); color:#fff;
          font-size:0.9rem; font-weight:700; text-decoration:none;
          box-shadow:0 8px 28px rgba(240,23,122,0.4);
          transition:transform 200ms ease, box-shadow 200ms ease, background 200ms ease;
          position:relative; overflow:hidden;
        }
        .tb-btn::after {
          content:''; position:absolute; inset:0;
          background:linear-gradient(135deg,rgba(255,255,255,0.15) 0%,transparent 60%);
          pointer-events:none;
        }
        .tb-btn:hover {
          transform:translateY(-3px) scale(1.02);
          box-shadow:0 16px 44px rgba(240,23,122,0.55);
          background:var(--pink-light);
        }
      `}</style>

      <div className="page-bg noise">

        {/* ── HERO ── */}
        <section style={{ maxWidth:"72rem", margin:"0 auto", padding:"6rem 1.5rem 5rem", position:"relative" }}>
          <div style={{
            position:"absolute", top:"-60px", right:"-60px",
            width:"380px", height:"380px", borderRadius:"50%", pointerEvents:"none",
            background:"radial-gradient(circle,rgba(240,23,122,0.14) 0%,transparent 70%)",
            filter:"blur(40px)", animation:"floatY 9s ease-in-out infinite",
          }}/>

          <div className="fu" style={{ display:"block" }}>
            <span className="tb-hero-badge">
              <span style={{
                width:"5px", height:"5px", borderRadius:"50%",
                background:"var(--pink)", display:"inline-block",
                animation:"pulseDot 2.2s ease-in-out infinite",
              }}/>
              Team Building & Integracja
            </span>
          </div>

          <h1 className="tb-hero-title fu d1">
            Zgrana grupa to<br/>
            <span className="tb-hero-accent">klucz do sukcesu</span>
          </h1>

          <p className="tb-hero-desc fu d2">
            Integracja to dziś jeden z kluczowych elementów pracy z młodzieżą. W świecie, w którym naturalne budowanie relacji jest coraz trudniejsze, dobrze zaplanowany team building pomaga stworzyć zgraną, bezpieczną i współpracującą grupę, zarówno w szkole, jak i podczas wyjazdów.
          </p>
        </section>

        {/* ── CO OFERUJEMY ── */}
        <section className="tb-wrap" style={{ paddingBottom:"5rem" }}>
          <div className="fl d1">
            <div className="tb-eyebrow">Nasze podejście</div>
            <h2 className="tb-sec-title">Dla kogo pracujemy?</h2>
            <p className="tb-sec-sub">
              Dopasowujemy formę i narzędzia do grupy docelowej, aby osiągnąć najlepsze efekty.
            </p>
          </div>

          <div className="tb-grid">
            {/* Pracujemy z młodzieżą */}
            <div className="tb-card fu d1">
              <div className="tb-card-icon">🤝</div>
              <div className="tb-card-title">Pracujemy z młodzieżą</div>
              <div className="tb-card-desc">
                Prowadzimy działania integracyjne dla szkół, klas i grup młodzieżowych, zarówno w szkołach, jak i podczas wyjazdów. Tworzymy przestrzeń do poznania się poprzez współpracę i zabawę. Budujemy relację w naturalny sposób bez sztuczności, za to z realnym efektem dla grupy.
              </div>
            </div>

            {/* Pracujemy również z kadrą */}
            <div className="tb-card fu d2">
              <div className="tb-card-icon">🎓</div>
              <div className="tb-card-title">Pracujemy również z kadrą</div>
              <div className="tb-card-desc">
                Oferujemy szkolenia dla nauczycieli, wychowawców, animatorów i osób pracujących z grupami. Możesz zamówić szkolenie np. podczas rady pedagogicznej lub spotkania szkoleniowego.
              </div>
              <div style={{ flex: 1 }}>
                <div className="tb-feat">
                  <div className="tb-check"><svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M1.5 5.5L4 8L8.5 2" stroke="#ff4fa3" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                  <span className="tb-feat-txt">Jak wspierać proces integracji</span>
                </div>
                <div className="tb-feat">
                  <div className="tb-check"><svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M1.5 5.5L4 8L8.5 2" stroke="#ff4fa3" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                  <span className="tb-feat-txt">Jak budować relacje w grupie</span>
                </div>
                <div className="tb-feat">
                  <div className="tb-check"><svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M1.5 5.5L4 8L8.5 2" stroke="#ff4fa3" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                  <span className="tb-feat-txt">Jakie aktywności sprawdzają się w różnych sytuacjach</span>
                </div>
                <div className="tb-feat">
                  <div className="tb-check"><svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M1.5 5.5L4 8L8.5 2" stroke="#ff4fa3" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                  <span className="tb-feat-txt">Jak dobierać działania do wieku i dynamiki zespołu</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="tb-wrap" style={{ paddingBottom:"4rem" }}>
          <div className="tb-divider"/>
        </div>

        {/* ── GDZIE REALIZUJEMY DZIAŁANIA ── */}
        <section className="tb-wrap" style={{ paddingBottom:"5rem" }}>
          <div className="fl d1">
            <div className="tb-eyebrow">Lokalizacje</div>
            <h2 className="tb-sec-title">Gdzie realizujemy działania?</h2>
            <p className="tb-sec-sub">
              Działamy tam, gdzie jesteśmy najbardziej potrzebni - na miejscu i na wyjazdach.
            </p>
          </div>

          <div className="tb-loc-grid fu d2">
            <div className="tb-loc-item">🏫 Szkoły</div>
            <div className="tb-loc-item">👋 Integracja na początku roku szkolnego</div>
            <div className="tb-loc-item">🚌 Wyjazdy szkolne i zielone szkoły</div>
            <div className="tb-loc-item">🏕️ Kolonie i półkolonie</div>
            <div className="tb-loc-item">💼 Rady pedagogiczne i spotkania zespołów</div>
          </div>
        </section>

        {/* Divider */}
        <div className="tb-wrap" style={{ paddingBottom:"4rem" }}>
          <div className="tb-divider"/>
        </div>

        {/* ── DLACZEGO TO DZIAŁA ── */}
        <section className="tb-wrap" style={{ paddingBottom:"5rem" }}>
          <div className="tb-card fu d1" style={{ padding: "3rem", alignItems: "center", textAlign: "center" }}>
            <div className="tb-card-icon" style={{ width: "4rem", height: "4rem", fontSize: "2rem" }}>💡</div>
            <h2 className="tb-sec-title" style={{ marginBottom: "1.5rem" }}>Dlaczego to działa?</h2>
            <p className="tb-card-desc" style={{ maxWidth: "800px", margin: "0 auto", fontSize: "1.1rem", lineHeight: "1.9" }}>
              Łączymy doświadczenie pracy z młodzieżą z rozumieniem procesów grupowych i realiów szkolnych. Dzięki temu integracja nie jest jednorazowym wydarzeniem, ale realnym wsparciem w budowaniu relacji, współpracy i dobrej atmosfery w grupie.
            </p>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="tb-wrap" style={{ paddingBottom:"8rem" }}>
          <div className="tb-cta fu d2">
            <div style={{
              position:"absolute", inset:0, pointerEvents:"none",
              background:"radial-gradient(ellipse 70% 80% at 50% 110%,rgba(240,23,122,0.1) 0%,transparent 65%)",
            }}/>
            <h2 className="tb-cta-title">Zaplanujmy wspólną integrację</h2>
            <p className="tb-cta-desc">
              Skontaktuj się z nami - omówimy potrzeby Twojej grupy i przygotujemy propozycję działań.
            </p>
            <Link href="/kontakt" className="tb-btn">Napisz do nas →</Link>
          </div>
        </section>

      </div>
      <SiteFooter />
    </>
  );
}