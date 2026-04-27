import SiteFooter from "@/components/site-footer";

export const metadata = { title: "O nas" };

const DiscIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const VALUES = [
  {
    icon: <DiscIcon />,
    title: "Dopasowanie do grupy",
    desc: "Nie korzystamy z gotowych scenariuszy. Dopasowujemy animacje do grupy, jej energii i zaangażowania. Jesteśmy elastyczni i reagujemy na potrzeby uczestników na bieżąco.",
    gradient: "from-pink-500/20 to-rose-500/10",
  },
  {
    icon: <DiscIcon />,
    title: "Dynamiczne prowadzenie",
    desc: "Energia i profesjonalizm w jednym. Dbamy o to, żeby każda minuta była angażująca.",
    gradient: "from-fuchsia-500/20 to-pink-500/10",
  },
  {
    icon: <DiscIcon />,
    title: "Bezpieczeństwo i profesjonalizm",
    desc: "Korzystamy wyłącznie ze sprawdzonego, certyfikowanego sprzętu: bez kompromisów i przypadkowych rozwiązań.",
    gradient: "from-rose-500/20 to-pink-400/10",
  },
  {
    icon: <DiscIcon />,
    title: "Nowoczesna oprawa",
    desc: "Muzyka, światło, dekoracje i atrakcje dobierane są spójnie, tworząc jedną całość.",
    gradient: "from-pink-400/20 to-fuchsia-500/10",
  },
];

const STATS = [
  { num: "250+", label: "Zrealizowanych wydarzeń", icon: "🎉" },
  { num: "10+",   label: "Lat doświadczenia",        icon: "⭐" },
  { num: "5★",   label: "Średnia ocen klientów",    icon: "💎" },
  { num: "24h",  label: "Czas odpowiedzi",           icon: "⚡" },
];

const PROCESS = [
  { n: "01", title: "Kontakt i ustalenie szczegółów", desc: "Ustalamy termin, miejsce, liczbę uczestników oraz rodzaj wydarzenia.", color: "#f0177a" },
  { n: "02", title: "Dobór formy animacji", desc: "Dopasowujemy zakres animacji, warsztatów lub oprawy muzycznej do grupy i charakteru wydarzenia.", color: "#e0156e" },
  { n: "03", title: "Rezerwacja i przygotowanie", desc: "Po akceptacji oferty rezerwujemy termin i przygotowujemy wszystkie elementy realizacji.", color: "#d01462" },
  { n: "04", title: "Realizacja wydarzenia", desc: "Prowadzimy animacje na miejscu, dbając o atmosferę, energię i zaangażowanie uczestników.", color: "#c01256" },
];

export default function AboutPage() {
  return (
    <>
      <style>{`
        /* ── KEYFRAMES ── */
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(32px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes fadeLeft {
          from { opacity:0; transform:translateX(-24px); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes fadeRight {
          from { opacity:0; transform:translateX(24px); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes pulseDot { 0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(1.3)} }
        @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes shimmerBar {
          0%{background-position:-200% center}
          100%{background-position:200% center}
        }
        @keyframes rotateHalo {
          from{transform:rotate(0deg)}
          to{transform:rotate(360deg)}
        }
        @keyframes scaleIn {
          from{opacity:0;transform:scale(0.88)}
          to{opacity:1;transform:scale(1)}
        }
        @keyframes lineExpand {
          from{width:0}
          to{width:100%}
        }
        @keyframes countUp {
          from{opacity:0;transform:translateY(20px) scale(0.8)}
          to{opacity:1;transform:translateY(0) scale(1)}
        }
        @keyframes borderGlow {
          0%,100%{box-shadow:0 0 0 0 rgba(240,23,122,0)}
          50%{box-shadow:0 0 0 4px rgba(240,23,122,0.15)}
        }
        @keyframes gradientShift {
          0%{background-position:0% 50%}
          50%{background-position:100% 50%}
          100%{background-position:0% 50%}
        }

        /* ── ANIMATIONS ── */
        .fu  { animation: fadeUp  0.8s cubic-bezier(0.16,1,0.3,1) both; }
        .fl  { animation: fadeLeft  0.8s cubic-bezier(0.16,1,0.3,1) both; }
        .fr  { animation: fadeRight 0.8s cubic-bezier(0.16,1,0.3,1) both; }
        .si  { animation: scaleIn 0.7s cubic-bezier(0.16,1,0.3,1) both; }
        .d1{animation-delay:0.05s} .d2{animation-delay:0.15s}
        .d3{animation-delay:0.26s} .d4{animation-delay:0.38s}
        .d5{animation-delay:0.52s} .d6{animation-delay:0.66s}

        /* ── LAYOUT ── */
        .ab-wrap { max-width:72rem; margin:0 auto; padding:0 1.5rem; }

        /* ── HERO BADGE ── */
        .hero-badge {
          display:inline-flex; align-items:center; gap:0.5rem;
          padding:0.4rem 1rem; border-radius:9999px;
          background:rgba(240,23,122,0.1);
          border:1px solid rgba(240,23,122,0.25);
          font-size:0.65rem; font-weight:700; letter-spacing:0.12em;
          text-transform:uppercase; color:var(--pink-light);
          backdrop-filter:blur(8px);
        }
        html[data-theme="light"] .hero-badge {
          background:rgba(240,23,122,0.08);
          border:1px solid rgba(240,23,122,0.3);
          color:var(--pink);
        }
        .dot-pulse {
          width:6px; height:6px; border-radius:50%;
          background:var(--pink); display:inline-block;
          animation:pulseDot 2.2s ease-in-out infinite;
        }

        /* ── HERO TITLE ── */
        .hero-title {
          font-family:var(--font-display);
          font-size:clamp(2.8rem,6.5vw,5.5rem);
          font-weight:700; color:#fff; line-height:1.25;
          letter-spacing:-0.03em; margin-bottom:1.5rem;
        }
        html[data-theme="light"] .hero-title { color:#0d0b10; }

        .hero-accent {
          display:inline-block;
          background: linear-gradient(105deg, #f0177a 0%, #ff6bb5 45%, #f0177a 80%);
          background-size:200% auto;
          -webkit-background-clip:text; background-clip:text;
          -webkit-text-fill-color:transparent;
          animation:shimmerBar 3.5s linear infinite;
        }

        /* ── HERO DESCRIPTION ── */
        .hero-desc {
          color:rgba(255,255,255,0.55); font-size:clamp(0.95rem,1.35vw,1.05rem);
          line-height:1.85; width: 100%; max-width: 1200px;
          text-align: left; margin: 0 0 1rem; padding: 0;
        }
        @media(max-width:768px){
          .hero-desc {
            font-size: clamp(0.9rem,1.2vw,1rem); line-height: 1.75; padding: 0;
          }
        }
        html[data-theme="light"] .hero-desc { color:rgba(13,11,16,0.6); }

        /* ── HERO IMAGE ── */
        .hero-img-wrap {
          position:relative;
          border-radius:1.5rem;
          overflow:hidden;
          background:linear-gradient(135deg, rgba(240,23,122,0.1) 0%, rgba(20,15,30,0.8) 100%);
          border:1px solid rgba(240,23,122,0.2);
          box-shadow:0 20px 60px rgba(240,23,122,0.15), 0 8px 24px rgba(0,0,0,0.3);
        }
        html[data-theme="light"] .hero-img-wrap {
          background:linear-gradient(135deg, rgba(240,23,122,0.08) 0%, rgba(255,255,255,0.9) 100%);
          border:1px solid rgba(240,23,122,0.25);
          box-shadow:0 20px 60px rgba(240,23,122,0.12), 0 8px 24px rgba(0,0,0,0.08);
        }
        .hero-img {
          width:100%;
          height:100%;
          object-fit:contain;
          object-position:center;
          display:block;
        }
        .hero-img-glow {
          position:absolute;
          inset:0;
          background:radial-gradient(ellipse at 50% 100%, rgba(240,23,122,0.3) 0%, transparent 70%);
          pointer-events:none;
          opacity:0.6;
        }
        .hero-img-frame {
          position:absolute;
          inset:0;
          border:1px solid rgba(255,255,255,0.1);
          border-radius:1.5rem;
          pointer-events:none;
        }

        /* ── FLOATING ORBS (decoration) ── */
        .orb {
          position:absolute; border-radius:50%;
          background:radial-gradient(circle, rgba(240,23,122,0.18) 0%, transparent 70%);
          pointer-events:none; filter:blur(40px);
        }
        .orb-1 { width:400px; height:400px; top:-100px; right:-80px; animation:floatY 8s ease-in-out infinite; }
        .orb-2 { width:280px; height:280px; bottom:0; left:-60px; animation:floatY 10s ease-in-out infinite 2s; opacity:0.6; }

        /* ── DECORATIVE LINE ── */
        .pink-rule {
          display:inline-block; height:3px; border-radius:2px;
          background:linear-gradient(90deg,var(--pink),var(--pink-light),transparent);
          animation:lineExpand 1.2s cubic-bezier(0.16,1,0.3,1) both;
        }

        /* ── VALUES ── */
        .val-grid {
          display:grid; grid-template-columns:1fr; gap:1.5rem;
          margin-top:3rem;
        }
        @media(min-width:640px){ .val-grid { grid-template-columns:repeat(2,1fr); } }

        .val-card {
          position:relative; padding:2.2rem; border-radius:1.5rem;
          background:rgba(255,255,255,0.025);
          border:1px solid rgba(255,255,255,0.07);
          overflow:hidden;
          transition:transform 300ms cubic-bezier(0.16,1,0.3,1),
                      border-color 300ms ease,
                      box-shadow 300ms ease;
        }
        .val-card::before {
          content:''; position:absolute; inset:0; opacity:0;
          background:radial-gradient(ellipse at 30% 40%, rgba(240,23,122,0.1), transparent 60%);
          transition:opacity 400ms ease;
        }
        .val-card:hover::before { opacity:1; }
        .val-card:hover {
          transform:translateY(-4px);
          border-color:rgba(240,23,122,0.25);
          box-shadow:0 20px 60px rgba(240,23,122,0.12), 0 4px 20px rgba(0,0,0,0.3);
        }

        /* Accent line top */
        .val-card::after {
          content:''; position:absolute; top:0; left:2rem; right:2rem; height:2px;
          background:linear-gradient(90deg,transparent,rgba(240,23,122,0.5),transparent);
          opacity:0; transition:opacity 300ms ease;
          border-radius:0 0 2px 2px;
        }
        .val-card:hover::after { opacity:1; }

        html[data-theme="light"] .val-card {
          background:#ffffff;
          border:1px solid rgba(240,23,122,0.12);
          box-shadow:0 4px 24px rgba(0,0,0,0.04);
        }
        html[data-theme="light"] .val-card:hover {
          border-color:rgba(240,23,122,0.35);
          box-shadow:0 20px 60px rgba(240,23,122,0.12), 0 4px 20px rgba(0,0,0,0.06);
        }

        .val-icon-wrap {
          width:3rem; height:3rem; border-radius:1rem;
          background:rgba(240,23,122,0.1);
          border:1px solid rgba(240,23,122,0.2);
          display:flex; align-items:center; justify-content:center;
          font-size:1rem; color:var(--pink-light);
          margin-bottom:1.25rem;
          transition:background 300ms ease, transform 300ms ease, box-shadow 300ms ease;
        }
        .val-card:hover .val-icon-wrap {
          background:rgba(240,23,122,0.18);
          transform:scale(1.1) rotate(-3deg);
          box-shadow:0 8px 24px rgba(240,23,122,0.25);
        }
        html[data-theme="light"] .val-icon-wrap {
          background:rgba(240,23,122,0.08);
          border:1px solid rgba(240,23,122,0.2);
        }

        .val-title {
          font-size:1.05rem; font-weight:700; color:#fff;
          margin-bottom:0.6rem; font-family:var(--font-display);
          letter-spacing:-0.01em;
        }
        html[data-theme="light"] .val-title { color:#0d0b10; }

        .val-desc {
          font-size:0.84rem; color:rgba(255,255,255,0.48); line-height:1.8;
        }
        html[data-theme="light"] .val-desc { color:rgba(13,11,16,0.58); }

        /* Card number watermark */
        .val-watermark {
          position:absolute; bottom:1rem; right:1.5rem;
          font-family:var(--font-display); font-size:4rem; font-weight:700;
          color:rgba(255,255,255,0.02); line-height:1; pointer-events:none;
          transition:color 300ms;
        }
        html[data-theme="light"] .val-watermark { color:rgba(240,23,122,0.04); }
        .val-card:hover .val-watermark { color:rgba(240,23,122,0.06); }

        /* ── PROCESS ── */
        .proc-wrap {
          display:grid; grid-template-columns:1fr; gap:0;
          border-radius:1.5rem; overflow:hidden;
          border:1px solid rgba(255,255,255,0.07);
          margin-top:3rem;
        }
        @media(min-width:768px){ .proc-wrap { grid-template-columns:repeat(4,1fr); } }

        html[data-theme="light"] .proc-wrap {
          border:1px solid rgba(240,23,122,0.15);
          box-shadow:0 8px 40px rgba(240,23,122,0.06);
        }

        .proc-step {
          padding:2.5rem 2rem; position:relative; overflow:hidden;
          border-right:1px solid rgba(255,255,255,0.06);
          border-bottom:1px solid rgba(255,255,255,0.06);
          transition:background 280ms ease;
          cursor:default;
        }
        .proc-step:last-child { border-right:none; }
        @media(max-width:767px) { .proc-step:last-child { border-bottom:none; } }

        .proc-step::before {
          content:''; position:absolute; inset:0;
          background:linear-gradient(135deg, rgba(240,23,122,0.08) 0%, transparent 60%);
          opacity:0; transition:opacity 280ms ease;
        }
        .proc-step:hover::before { opacity:1; }

        html[data-theme="light"] .proc-step {
          border-right:1px solid rgba(240,23,122,0.1);
          border-bottom:1px solid rgba(240,23,122,0.1);
          background:rgba(255,255,255,0.85);
        }
        html[data-theme="light"] .proc-step:last-child { border-right:none; }
        html[data-theme="light"] .proc-step:hover { background:rgba(240,23,122,0.03); }

        /* Connector dot */
        .proc-connector {
          position:absolute; top:2.5rem; right:-1px;
          width:2px; height:calc(100% - 5rem);
          background:linear-gradient(180deg, rgba(240,23,122,0.4) 0%, transparent 100%);
          opacity:0; transition:opacity 280ms ease;
        }
        @media(max-width:767px) { .proc-connector { display:none; } }
        .proc-step:hover .proc-connector { opacity:1; }

        .proc-num {
          font-family:var(--font-display); font-size:2.5rem; font-weight:700;
          color:rgba(240,23,122,0.15); line-height:1; margin-bottom:1rem;
          letter-spacing:-0.03em; transition:color 280ms ease;
        }
        html[data-theme="light"] .proc-num { color:rgba(240,23,122,0.2); }
        .proc-step:hover .proc-num { color:rgba(240,23,122,0.35); }

        .proc-bar {
          width:2rem; height:3px; border-radius:2px;
          background:linear-gradient(90deg,var(--pink),var(--pink-light));
          margin-bottom:1rem;
          transform-origin:left; transform:scaleX(0);
          transition:transform 400ms cubic-bezier(0.16,1,0.3,1);
        }
        .proc-step:hover .proc-bar { transform:scaleX(1); }

        .proc-title {
          font-size:1rem; font-weight:700; color:#fff;
          margin-bottom:0.5rem; font-family:var(--font-display);
        }
        html[data-theme="light"] .proc-title { color:#0d0b10; }

        .proc-desc {
          font-size:0.82rem; color:rgba(255,255,255,0.42); line-height:1.8;
        }
        html[data-theme="light"] .proc-desc { color:rgba(13,11,16,0.55); }

        /* ── DIVIDER ── */
        .fancy-divider {
          height:1px; position:relative; overflow:visible;
          background:linear-gradient(90deg,transparent,rgba(240,23,122,0.25),transparent);
          margin:0;
        }
        .fancy-divider::after {
          content:''; position:absolute; left:50%; top:50%;
          transform:translate(-50%,-50%);
          width:8px; height:8px; border-radius:50%;
          background:var(--pink);
          box-shadow:0 0 12px rgba(240,23,122,0.6);
        }

        /* ── CTA STRIP ── */
        .cta-wrap {
          border-radius:1.5rem; padding:3rem;
          background:rgba(255,255,255,0.025);
          border:1px solid rgba(255,255,255,0.07);
          display:flex; flex-direction:column; gap:1.75rem;
          align-items:flex-start; position:relative; overflow:hidden;
        }
        .cta-wrap::before {
          content:''; position:absolute; inset:0;
          background:radial-gradient(ellipse at 70% 50%, rgba(240,23,122,0.08) 0%, transparent 60%);
          pointer-events:none;
        }
        html[data-theme="light"] .cta-wrap {
          background:#ffffff;
          border:1px solid rgba(240,23,122,0.18);
          box-shadow:0 12px 50px rgba(240,23,122,0.1), 0 4px 16px rgba(0,0,0,0.04);
        }
        html[data-theme="light"] .cta-wrap::before {
          background:radial-gradient(ellipse at 70% 50%, rgba(240,23,122,0.05) 0%, transparent 60%);
        }
        @media(min-width:640px){
          .cta-wrap { flex-direction:row; align-items:center; justify-content:space-between; }
        }

        .cta-title {
          font-family:var(--font-display); font-size:1.5rem; font-weight:700;
          color:#fff; margin-bottom:0.4rem; letter-spacing:-0.01em;
        }
        html[data-theme="light"] .cta-title { color:#0d0b10; }

        .cta-sub {
          font-size:0.875rem; color:rgba(255,255,255,0.45);
        }
        html[data-theme="light"] .cta-sub { color:rgba(13,11,16,0.55); }

        .btn-p {
          display:inline-flex; align-items:center; gap:0.5rem;
          height:3.2rem; padding:0 2rem; border-radius:9999px;
          background:var(--pink); color:#fff; text-decoration:none;
          font-size:0.875rem; font-weight:700;
          box-shadow:0 8px 28px rgba(240,23,122,0.4);
          transition:transform 200ms cubic-bezier(0.16,1,0.3,1),
                      box-shadow 200ms ease, background 200ms ease;
          white-space:nowrap; position:relative; overflow:hidden;
        }
        .btn-p::after {
          content:''; position:absolute; inset:0;
          background:linear-gradient(135deg,rgba(255,255,255,0.15) 0%,transparent 60%);
          pointer-events:none;
        }
        .btn-p:hover {
          transform:translateY(-3px) scale(1.02);
          box-shadow:0 16px 44px rgba(240,23,122,0.55);
          background:var(--pink-light);
        }

        .btn-g {
          display:inline-flex; align-items:center;
          height:3.2rem; padding:0 2rem; border-radius:9999px;
          border:1.5px solid rgba(255,255,255,0.14);
          color:rgba(255,255,255,0.72); font-size:0.875rem; font-weight:600;
          text-decoration:none;
          background:rgba(255,255,255,0.04);
          transition:border-color 200ms ease, background 200ms ease,
                      color 200ms ease, transform 200ms ease;
          white-space:nowrap;
        }
        .btn-g:hover {
          border-color:rgba(240,23,122,0.45);
          background:rgba(240,23,122,0.08);
          color:#fff; transform:translateY(-2px);
        }
        html[data-theme="light"] .btn-g {
          border:1.5px solid rgba(240,23,122,0.25);
          color:var(--pink); background:rgba(240,23,122,0.04);
        }
        html[data-theme="light"] .btn-g:hover {
          border-color:rgba(240,23,122,0.5);
          background:rgba(240,23,122,0.1);
          color:var(--pink);
        }

        /* ── DECORATIVE DOTS ── */
        .dot-grid {
          position:absolute; right:3rem; top:50%; transform:translateY(-50%);
          display:grid; grid-template-columns:repeat(4,1fr); gap:6px; opacity:0.25;
          pointer-events:none;
        }
        .dot-grid span {
          width:4px; height:4px; border-radius:50%;
          background:var(--pink-light); display:block;
        }

        /* ── THEME SPECIFIC BACKGROUND OVERRIDE ── */
        html[data-theme="light"] .hero-bg-overlay {
          background:rgba(255,255,255,0.0);
        }
      `}</style>

      <div className="page-bg noise" style={{ position:"relative", overflow:"hidden" }}>

        {/* ── HERO ── */}
        <section style={{ maxWidth:"72rem", margin:"0 auto", padding:"6rem 1.5rem 5rem", position:"relative" }}>

          {/* Decorative orbs */}
          <div className="orb orb-1" />
          <div className="orb orb-2" />

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3rem", alignItems:"center" }} className="hero-grid">
            {/* Lewa kolumna - tekst */}
            <div>
              <h1 className="hero-title fu d2">Poznajmy się</h1>

              {/* Short intro in hero */}
              <p className="hero-desc fu d3" style={{ marginTop: "-0.5rem" }}>
                Cześć! Z tej strony Magda Gałkowska - założycielka Pinky Party. Animatorka, DJ-ka, wodzirejka oraz nauczycielka edukacji wczesnoszkolnej.
              </p>
              <p className="hero-desc fu d4" style={{ marginTop: "1rem" }}>
                Od 10 lat działam w branży eventowej i edukacyjnej. To połączenie doświadczenia pedagogicznego i scenicznego jest kluczowe, bo pozwala tworzyć wydarzenia, które są nie tylko atrakcyjne, ale też świadomie dopasowane do wieku, potrzeb i emocji uczestników.
              </p>
              <p className="hero-desc fu d5" style={{ marginTop: "1rem" }}>
                Łączę wiedzę o rozwoju dzieci z praktyką prowadzenia wydarzeń, dzięki czemu animacje mają nie tylko bawić, ale też budować relacje, angażować i zostawiać wartościowe doświadczenia.
              </p>
              <p className="hero-desc fu d6" style={{ marginTop: "1rem" }}>
                Prywatnie jestem mamą dwójki dzieci, co jeszcze bardziej wzmacnia moje podejście do tworzenia jakościowych i dobrze przemyślanych animacji.
              </p>
            </div>

            {/* Prawa kolumna - grafika */}
            <div className="hero-img-wrap fr d2" style={{ aspectRatio:"2 / 3", maxWidth:"400px", justifySelf:"end" }}>
              <img src="/onas.jpg" alt="Pinky Party - O nas" className="hero-img" />
              <div className="hero-img-glow" />
              <div className="hero-img-frame" />
            </div>
          </div>

          {/* Responsive styles dla hero grid */}
          <style>{`
            @media (max-width: 900px) {
              .hero-grid {
                grid-template-columns: 1fr !important;
                gap: 2.5rem !important;
              }
              .hero-grid .hero-img-wrap {
                height: 320px !important;
                min-height: 320px !important;
                max-width: 500px;
                margin: 0 auto;
                width: 100%;
              }
            }
            @media (max-width: 640px) {
              .hero-grid .hero-img-wrap {
                height: 280px !important;
                min-height: 280px !important;
              }
            }
          `}</style>
        </section>

        
        {/* ── PROCESS ── */}
        <section className="ab-wrap" style={{ paddingBottom:"5rem" }}>
          <div className="fr d1">
            <p className="sec-eyebrow">Jak pracujemy</p>
            <h2 className="sec-heading sec-heading--nowrap">Od pomysłu do realizacji</h2>
            <p className="sec-body">
              Nasz proces jest prosty i przejrzysty - żebyś wiedział/a dokładnie,
              czego się spodziewać na każdym etapie.
            </p>
          </div>

          <div className="proc-wrap fu d3">
            {PROCESS.map((p, i) => (
              <div key={p.n} className="proc-step">
                <div className="proc-connector"/>
                <div className="proc-num">{p.n}</div>
                <div className="proc-bar"/>
                <div className="proc-title">{p.title}</div>
                <div className="proc-desc">{p.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="ab-wrap" style={{ paddingBottom:"4rem" }}>
          <div className="fancy-divider"/>
        </div>

        {/* ── CTA ── */}
        <section className="ab-wrap" style={{ paddingBottom:"8rem" }}>
          <div className="cta-wrap fu d2">
            {/* Decorative dot grid */}
            <div className="dot-grid" aria-hidden="true">
              {Array.from({length:16}).map((_,i) => <span key={i}/>)}
            </div>

            <div style={{ position:"relative", zIndex:1 }}>
              <div className="cta-title">Masz pytania? Napisz do nas.</div>
              <div className="cta-sub">Chętnie odpowiemy i doradzimy w kwestii animacji, doboru atrakcji lub wspólnie ustalimy najlepszą opcję dla Twojego wydarzenia.</div>
            </div>

            <div style={{ display:"flex", gap:"0.875rem", flexWrap:"wrap", flexShrink:0, position:"relative", zIndex:1 }}>
              <a href="/kontakt" className="btn-p">Skontaktuj się →</a>
              <a href="/oferta"  className="btn-g">Zobacz ofertę</a>
            </div>
          </div>
        </section>

      </div>
      <SiteFooter />
    </>
  );
}