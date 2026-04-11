import { supabase } from "@/lib/supabase";
import SiteFooter from "@/components/site-footer";

export const metadata = { title: "Oprawa muzyczna" };
export const dynamic = 'force-dynamic';

const EQUIPMENT = [
  { icon:"", title:"Nagłośnienie",    desc:"Systemy głośnikowe dostosowane do wielkości i charakteru pomieszczenia." },
  { icon:"", title:"Oświetlenie",     desc:"Profesjonalne zestawy świateł - od subtelnego tła po pełen show." },
  { icon:"", title:"DJ i prowadzący", desc:"Doświadczony DJ z bogatym repertuarem i umiejętnościami MC." },
  { icon:"", title:"Mikrofony",       desc:"Bezprzewodowe mikrofony dla prowadzących i gości." },
  { icon:"", title:"Efekty",          desc:"Dym, konfetti, bańki mydlane i inne efekty specjalne na życzenie." },
  { icon:"", title:"Transport",       desc:"Pełny montaż i demontaż sprzętu - bez stresu dla organizatora." },
];

type MusicService = {
  key: string;
  categoryLabel: string;
  title: string;
  description: string;
  features: string[];
  image?: string;
}

async function fetchMusicData() {
  try {
    const { data, error } = await supabase
      .from('music_services')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      return {
        updatedAt: new Date().toISOString(),
        services: [
          {
            key: "studniowki",
            categoryLabel: "Studniówki",
            title: "Studniówki",
            description: "Elegancka oprawa muzyczna i prowadzenie wieczoru. Dobieramy repertuar dopasowany do gustu maturzystów i tradycji.",
            features: ["Repertuar taneczny i okolicznościowy", "Profesjonalne prowadzenie imprezy", "Oświetlenie i efekty świetlne", "Współpraca z fotografem"]
          },
          {
            key: "wesela",
            categoryLabel: "Wesela",
            title: "Wesela",
            description: "Kompleksowa oprawa muzyczna wesela - od pierwszego tańca po oczepiny. Dbamy o każdy moment tego wyjątkowego dnia.",
            features: ["Konsultacja i dobór repertuaru", "Prowadzenie ceremonii i przyjęcia", "Zabawy i konkursy weselne", "Sprzęt nagłośnieniowy i oświetlenie"]
          },
          {
            key: "urodziny",
            categoryLabel: "Urodziny",
            title: "Urodziny i przyjęcia",
            description: "Muzyczna oprawa przyjęć urodzinowych, rocznic i spotkań rodzinnych. Dopasujemy klimat do charakteru imprezy i gości.",
            features: ["Różne gatunki muzyczne", "Możliwość dedykacji i życzeń", "Nagłośnienie dostosowane do sali", "Opcjonalnie animacje dla dzieci"]
          },
          {
            key: "firmowe",
            categoryLabel: "Eventy firmowe",
            title: "Eventy firmowe",
            description: "Profesjonalna oprawa muzyczna na imprezy integracyjne, bankiety, gale i konferencje.",
            features: ["Muzyka tła i taneczna", "Prowadzenie programu", "Nagłośnienie konferencji", "Oświetlenie sceniczne"]
          },
          {
            key: "bale",
            categoryLabel: "Bale",
            title: "Bale karnawałowe",
            description: "Dynamiczna oprawa muzyczna balów karnawałowych dla dzieci i dorosłych. Wiele gatunków i klimatów w jednym wieczorze.",
            features: ["Repertuar taneczny i zabawowy", "Konkursy muzyczne z nagrodami", "Światła i efekty specjalne", "Współpraca z animatorami"]
          },
          {
            key: "swiateczne",
            categoryLabel: "Świąteczne",
            title: "Eventy świąteczne",
            description: "Magiczna atmosfera świąt Bożego Narodzenia z odpowiednią oprawą muzyczną. Kolędy, nowoczesne hity i klimatyczne aranżacje.",
            features: ["Repertuar świąteczny", "Oświetlenie dekoracyjne", "Możliwość nagłośnienia na zewnątrz", "Współpraca z Mikołajem"]
          }
        ]
      };
    }

    const services: MusicService[] = (data || []).map((item: any) => ({
      key: item.key,
      categoryLabel: item.category_label || item.title,
      title: item.title,
      description: item.description,
      features: item.features || [],
      image: item.image || ''
    }));

    return {
      updatedAt: new Date().toISOString(),
      services
    };
  } catch (error) {
    console.error('Failed to fetch music data:', error);
    return {
      updatedAt: new Date().toISOString(),
      services: [
        {
          key: "studniowki",
          title: "Studniówki",
          description: "Elegancka oprawa muzyczna i prowadzenie wieczoru. Dobieramy repertuar dopasowany do gustu maturzystów i tradycji.",
          features: ["Repertuar taneczny i okoliczosciowy", "Profesjonalne prowadzenie imprezy", "Oswietlenie i efekty swietlne", "Wspolpraca z fotografem"]
        },
        {
          key: "wesela",
          title: "Wesela",
          description: "Kompleksowa oprawa muzyczna wesela - od pierwszego taca po oczepiny. Dbamy o kazdy moment tego wyjatkowego dnia.",
          features: ["Konsultacja i dobór repertuaru", "Prowadzenie ceremonii i przyjcia", "Zabawy i konkursy weselne", "Sprzet naglosnieniowy i oswietlenie"]
        },
        {
          key: "urodziny",
          title: "Urodziny i przyjcia",
          description: "Muzyczna oprawa przyjec urodzinowych, rocznic i spotkan rodzinnych. Dopasujemy klimat do charakteru imprezy i gosci.",
          features: ["Rózne gatunki muzyczne", "Mozliwosc dedykacji i zyczen", "Naglosnienie dostosowane do sali", "Opcjonalnie animacje dla dzieci"]
        },
        {
          key: "firmowe",
          title: "Eventy firmowe",
          description: "Profesjonalna oprawa muzyczna na imprezy integracyjne, bankiety, gale i konferencje.",
          features: ["Muzyka tla i taneczna", "Prowadzenie programu", "Naglosnienie konferencji", "Oswietlenie sceniczne"]
        },
        {
          key: "bale",
          title: "Bale karnawaowe",
          description: "Dynamiczna oprawa muzyczna balów karnawaowych dla dzieci i doroslych. Wiele gatunków i klimatów w jednym wieczorze.",
          features: ["Repertuar taneczny i zabawowy", "Konkursy muzyczne z nagrodami", "Swiatla i efekty specjalne", "Wspolpraca z animatorami"]
        },
        {
          key: "swiateczne",
          title: "Eventy witeczne",
          description: "Magiczna atmosfera swiat Bozego Narodzenia z odpowiednia oprawa muzyczna. Koledy, nowoczesne hity i klimatyczne aranacje.",
          features: ["Repertuar witeczny", "Oswietlenie dekoracyjne", "Mozliwosc naglosnienia na zewnatrz", "Wspolpraca z Mikolajem"]
        }
      ]
    };
  }
}

export default async function MusicPage() {
  const musicData = await fetchMusicData();

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

        .mu-wrap { max-width:72rem; margin:0 auto; padding:0 1.5rem; }

        /* ── HERO BADGE ── */
        .mu-hero-badge {
          display:inline-flex; align-items:center; gap:0.5rem;
          padding:0.38rem 1rem; border-radius:9999px;
          background:rgba(240,23,122,0.1); border:1px solid rgba(240,23,122,0.25);
          font-size:0.63rem; font-weight:800; letter-spacing:0.12em;
          text-transform:uppercase; color:var(--pink-light);
          margin-bottom:1.5rem; backdrop-filter:blur(8px);
        }
        html[data-theme="light"] .mu-hero-badge {
          background:rgba(240,23,122,0.08); border:1px solid rgba(240,23,122,0.3);
          color:var(--pink);
        }

        /* ── HERO TITLE ── */
        .mu-hero-title {
          font-family:var(--font-display);
          font-size:clamp(2.6rem,5.5vw,4.5rem);
          font-weight:700; color:#fff; line-height:1.25;
          letter-spacing:-0.028em; margin-bottom:1.35rem;
        }
        html[data-theme="light"] .mu-hero-title { color:#0d0b10; }

        .mu-hero-accent {
          display:inline-block;
          background:linear-gradient(105deg,#f0177a 0%,#ff6bb5 50%,#f0177a 80%);
          background-size:200% auto;
          -webkit-background-clip:text; background-clip:text;
          -webkit-text-fill-color:transparent;
          animation:shimBar 3.5s linear infinite;
        }

        .mu-hero-desc {
          color:rgba(255,255,255,0.52); font-size:clamp(1rem,1.8vw,1.12rem);
          line-height:1.85; max-width:520px;
        }
        html[data-theme="light"] .mu-hero-desc { color:rgba(13,11,16,0.58); }

        /* ── SECTION EYEBROW ── */
        .mu-eyebrow {
          display:flex; align-items:center; gap:0.6rem;
          font-size:0.62rem; font-weight:800; letter-spacing:0.15em;
          text-transform:uppercase; color:var(--pink); margin-bottom:0.85rem;
        }
        .mu-eyebrow::before {
          content:''; display:inline-block; width:22px; height:2px;
          background:var(--pink); border-radius:2px; flex-shrink:0;
        }

        .mu-sec-title {
          font-family:var(--font-display);
          font-size:clamp(1.7rem,3.2vw,2.5rem);
          font-weight:700; color:#fff; line-height:1.1;
          letter-spacing:-0.02em; margin-bottom:1rem;
        }
        html[data-theme="light"] .mu-sec-title { color:#0d0b10; }

        .mu-sec-sub {
          font-size:0.95rem; color:rgba(255,255,255,0.5);
          line-height:1.85; max-width:42rem; margin-bottom:3rem;
        }
        html[data-theme="light"] .mu-sec-sub { color:rgba(13,11,16,0.58); }

        /* ── EVENT GRID ── */
        .mu-event-grid {
          display:grid; grid-template-columns:1fr; gap:1.25rem;
        }
        @media(min-width:768px)  { .mu-event-grid { grid-template-columns:repeat(2,1fr); } }
        @media(min-width:1100px) { .mu-event-grid { grid-template-columns:repeat(3,1fr); } }

        /* ── EVENT CARD ── */
        .mu-card {
          border-radius:1.4rem;
          background:rgba(255,255,255,0.025);
          border:1px solid rgba(255,255,255,0.07);
          overflow:hidden; display:flex; flex-direction:column;
          transition:border-color 280ms ease, transform 280ms cubic-bezier(0.16,1,0.3,1), box-shadow 280ms ease;
          position:relative;
        }
        .mu-card::after {
          content:''; position:absolute; top:0; left:1.5rem; right:1.5rem; height:2px;
          background:linear-gradient(90deg,transparent,rgba(240,23,122,0.55),transparent);
          opacity:0; transition:opacity 280ms ease; border-radius:0 0 2px 2px;
        }
        .mu-card:hover {
          border-color:rgba(240,23,122,0.28);
          transform:translateY(-4px);
          box-shadow:0 20px 60px rgba(0,0,0,0.3), 0 4px 16px rgba(240,23,122,0.1);
        }
        .mu-card:hover::after { opacity:1; }

        html[data-theme="light"] .mu-card {
          background:#ffffff;
          border:1px solid rgba(0,0,0,0.07);
          box-shadow:0 4px 20px rgba(0,0,0,0.05);
        }
        html[data-theme="light"] .mu-card:hover {
          border-color:rgba(240,23,122,0.3);
          box-shadow:0 20px 60px rgba(240,23,122,0.1), 0 4px 16px rgba(0,0,0,0.06);
        }

        /* Card head */
        .mu-card-hd {
          padding:1.75rem 1.75rem 1.5rem;
          border-bottom:1px solid rgba(255,255,255,0.06);
          position:relative; overflow:hidden;
        }
        .mu-card-hd::before {
          content:''; position:absolute; inset:0; pointer-events:none;
          background:radial-gradient(ellipse at 100% 0%, rgba(240,23,122,0.08) 0%, transparent 55%);
        }
        html[data-theme="light"] .mu-card-hd {
          border-bottom:1px solid rgba(240,23,122,0.08);
        }
        html[data-theme="light"] .mu-card-hd::before {
          background:radial-gradient(ellipse at 100% 0%, rgba(240,23,122,0.05) 0%, transparent 55%);
        }

        /* Icon */
        .mu-card-icon {
          width:2.75rem; height:2.75rem; border-radius:0.9rem;
          background:rgba(240,23,122,0.1); border:1px solid rgba(240,23,122,0.2);
          display:flex; align-items:center; justify-content:center;
          font-size:1.2rem; margin-bottom:1rem;
          transition:transform 300ms ease, box-shadow 300ms ease, background 300ms ease;
          animation:floatY 6s ease-in-out infinite;
        }
        .mu-card:nth-child(2) .mu-card-icon { animation-delay:1s; }
        .mu-card:nth-child(3) .mu-card-icon { animation-delay:2s; }
        .mu-card:nth-child(4) .mu-card-icon { animation-delay:3s; }
        .mu-card:nth-child(5) .mu-card-icon { animation-delay:4s; }
        .mu-card:nth-child(6) .mu-card-icon { animation-delay:5s; }
        .mu-card:hover .mu-card-icon {
          transform:scale(1.1) rotate(-4deg);
          box-shadow:0 8px 24px rgba(240,23,122,0.3);
          background:rgba(240,23,122,0.18);
        }
        html[data-theme="light"] .mu-card-icon {
          background:rgba(240,23,122,0.08); border:1px solid rgba(240,23,122,0.18);
        }

        .mu-card-title {
          font-family:var(--font-display); font-size:1.15rem;
          font-weight:700; color:#fff; margin-bottom:0.55rem; line-height:1.15;
          position:relative;
        }
        html[data-theme="light"] .mu-card-title { color:#0d0b10; }

        .mu-card-desc {
          font-size:0.83rem; color:rgba(255,255,255,0.48); line-height:1.75;
          position:relative;
        }
        html[data-theme="light"] .mu-card-desc { color:rgba(13,11,16,0.58); }

        /* Features */
        .mu-card-ft { padding:1.4rem 1.75rem 1.75rem; flex:1; }

        .mu-feat {
          display:flex; align-items:flex-start; gap:0.65rem;
          padding:0.55rem 0;
          border-bottom:1px solid rgba(255,255,255,0.04);
          transition:padding-left 200ms ease;
        }
        .mu-feat:last-child { border-bottom:none; padding-bottom:0; }
        .mu-feat:first-child { padding-top:0; }
        .mu-card:hover .mu-feat { padding-left:2px; }
        html[data-theme="light"] .mu-feat { border-bottom:1px solid rgba(240,23,122,0.07); }

        .mu-check {
          width:18px; height:18px; border-radius:50%; flex-shrink:0;
          background:rgba(240,23,122,0.12); border:1px solid rgba(240,23,122,0.28);
          display:flex; align-items:center; justify-content:center; margin-top:1px;
        }
        html[data-theme="light"] .mu-check {
          background:rgba(240,23,122,0.1); border:1px solid rgba(240,23,122,0.25);
        }

        .mu-feat-txt {
          font-size:0.82rem; color:rgba(255,255,255,0.65); font-weight:500; line-height:1.55;
        }
        html[data-theme="light"] .mu-feat-txt { color:rgba(13,11,16,0.7); }

        /* ── EQUIPMENT GRID ── */
        .mu-eq-grid {
          display:grid; grid-template-columns:repeat(2,1fr); gap:1.25rem;
        }
        @media(min-width:768px) { .mu-eq-grid { grid-template-columns:repeat(3,1fr); } }

        .mu-eq-cell {
          padding:1.75rem; border-radius:1.25rem;
          background:rgba(255,255,255,0.025);
          border:1px solid rgba(255,255,255,0.07);
          transition:border-color 240ms ease, background 240ms ease, transform 240ms ease;
        }
        .mu-eq-cell:hover {
          background:rgba(255,255,255,0.04);
          border-color:rgba(240,23,122,0.22);
          transform:translateY(-2px);
        }
        html[data-theme="light"] .mu-eq-cell {
          background:#ffffff; border:1px solid rgba(0,0,0,0.07);
          box-shadow:0 2px 12px rgba(0,0,0,0.04);
        }
        html[data-theme="light"] .mu-eq-cell:hover {
          border-color:rgba(240,23,122,0.3); background:#fff;
          box-shadow:0 8px 32px rgba(240,23,122,0.1);
        }

        .mu-eq-icon-box {
          width:2.75rem; height:2.75rem; border-radius:0.875rem; margin-bottom:1rem;
          background:rgba(240,23,122,0.1); border:1px solid rgba(240,23,122,0.2);
          display:flex; align-items:center; justify-content:center; font-size:1.2rem;
          transition:transform 280ms ease, box-shadow 280ms ease, background 280ms ease;
        }
        .mu-eq-cell:hover .mu-eq-icon-box {
          transform:scale(1.08) rotate(-3deg);
          box-shadow:0 6px 20px rgba(240,23,122,0.25);
          background:rgba(240,23,122,0.16);
        }
        html[data-theme="light"] .mu-eq-icon-box {
          background:rgba(240,23,122,0.08); border:1px solid rgba(240,23,122,0.18);
        }

        .mu-eq-title {
          font-size:0.975rem; font-weight:700; color:#fff; margin-bottom:0.45rem;
          font-family:var(--font-display);
        }
        html[data-theme="light"] .mu-eq-title { color:#0d0b10; }

        .mu-eq-desc {
          font-size:0.81rem; color:rgba(255,255,255,0.44); line-height:1.7;
        }
        html[data-theme="light"] .mu-eq-desc { color:rgba(13,11,16,0.56); }

        /* ── DIVIDER ── */
        .mu-divider {
          height:1px; position:relative; overflow:visible; margin:0;
          background:linear-gradient(90deg,transparent,rgba(240,23,122,0.25),transparent);
        }
        .mu-divider::after {
          content:''; position:absolute; left:50%; top:50%;
          transform:translate(-50%,-50%);
          width:8px; height:8px; border-radius:50%;
          background:var(--pink); box-shadow:0 0 12px rgba(240,23,122,0.7);
        }

        /* ── CTA ── */
        .mu-cta {
          border-radius:1.5rem; padding:3.5rem 2.5rem; text-align:center;
          border:1px solid rgba(240,23,122,0.18);
          background:rgba(255,255,255,0.025);
          position:relative; overflow:hidden;
        }
        html[data-theme="light"] .mu-cta {
          background:#ffffff;
          border:1px solid rgba(240,23,122,0.2);
          box-shadow:0 12px 50px rgba(240,23,122,0.1), 0 4px 16px rgba(0,0,0,0.04);
        }
        .mu-cta-title {
          font-family:var(--font-display); font-size:clamp(1.6rem,3.2vw,2.4rem);
          font-weight:700; color:#fff; line-height:1.1;
          letter-spacing:-0.02em; margin-bottom:0.875rem; position:relative;
        }
        html[data-theme="light"] .mu-cta-title { color:#0d0b10; }
        .mu-cta-desc {
          color:rgba(255,255,255,0.48); font-size:0.95rem;
          line-height:1.8; max-width:420px; margin:0 auto 2.25rem; position:relative;
        }
        html[data-theme="light"] .mu-cta-desc { color:rgba(13,11,16,0.55); }

        /* ── BUTTON ── */
        .mu-btn {
          display:inline-flex; align-items:center; gap:0.5rem;
          height:3.2rem; padding:0 2.2rem; border-radius:9999px;
          background:var(--pink); color:#fff;
          font-size:0.9rem; font-weight:700; text-decoration:none;
          box-shadow:0 8px 28px rgba(240,23,122,0.4);
          transition:transform 200ms ease, box-shadow 200ms ease, background 200ms ease;
          position:relative; overflow:hidden;
        }
        .mu-btn::after {
          content:''; position:absolute; inset:0;
          background:linear-gradient(135deg,rgba(255,255,255,0.15) 0%,transparent 60%);
          pointer-events:none;
        }
        .mu-btn:hover {
          transform:translateY(-3px) scale(1.02);
          box-shadow:0 16px 44px rgba(240,23,122,0.55);
          background:var(--pink-light);
        }
      `}</style>

      <div className="page-bg noise">

        {/* ── HERO ── */}
        <section style={{ maxWidth:"72rem", margin:"0 auto", padding:"6rem 1.5rem 5rem", position:"relative" }}>
          {/* Orb */}
          <div style={{
            position:"absolute", top:"-60px", right:"-60px",
            width:"380px", height:"380px", borderRadius:"50%", pointerEvents:"none",
            background:"radial-gradient(circle,rgba(240,23,122,0.14) 0%,transparent 70%)",
            filter:"blur(40px)", animation:"floatY 9s ease-in-out infinite",
          }}/>

          <div className="fu" style={{ display:"block" }}>
            <span className="mu-hero-badge">
              <span style={{
                width:"5px", height:"5px", borderRadius:"50%",
                background:"var(--pink)", display:"inline-block",
                animation:"pulseDot 2.2s ease-in-out infinite",
              }}/>
              Oprawa muzyczna
            </span>
          </div>

          <h1 className="mu-hero-title fu d1">
            Muzyka, która tworzy<br/>
            <span className="mu-hero-accent">niezapomnianą atmosferę</span>
          </h1>

          <p className="mu-hero-desc fu d2">
            Zapewniamy kompleksową obsługę muzyczną dla każdego typu wydarzenia -
            od kameralnych przyjęć po wielkie imprezy plenerowe.
          </p>
        </section>

        {/* ── EVENT TYPES ── */}
        <section className="mu-wrap" style={{ paddingBottom:"5rem" }}>
          <div className="fl d1">
            <div className="mu-eyebrow">Typy wydarzeń</div>
            <h2 className="mu-sec-title">Dla kogo gramy</h2>
            <p className="mu-sec-sub">
              Dostosowujemy repertuar, sprzęt i styl prowadzenia do konkretnego wydarzenia.
            </p>
          </div>

          <div className="mu-event-grid">
            {musicData.services.map((service: any, i: number) => (
              <div key={`${service.key}-${i}`} className="mu-card fu" style={{ animationDelay:`${0.08 + i * 0.1}s` }}>
                <div className="mu-card-hd">
                  <div className="mu-card-icon" style={{ animationDelay:`${i * 1.2}s` }}>
                    {service.image ? (
                      <img 
                        src={service.image} 
                        alt={service.title}
                        style={{ 
                          width: "100%", 
                          height: "100%", 
                          objectFit: "cover",
                          borderRadius: "0.875rem"
                        }}
                      />
                    ) : (
                      service.key === 'studniowki' ? '🎓' : service.key === 'wesela' ? '💍' : service.key === 'urodziny' ? '🎂' : service.key === 'firmowe' ? '💼' : service.key === 'bale' ? '🎭' : service.key === 'swiateczne' ? '✨' : '🎵'
                    )}
                  </div>
                  <div className="mu-card-title">{service.title}</div>
                  <div className="mu-card-desc">{service.description}</div>
                </div>
                <div className="mu-card-ft">
                  {service.features.map((f: any) => (
                    <div key={f} className="mu-feat">
                      <div className="mu-check">
                        <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
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

        {/* Divider */}
        <div className="mu-wrap" style={{ paddingBottom:"4rem" }}>
          <div className="mu-divider"/>
        </div>

        {/* ── EQUIPMENT ── */}
        <section className="mu-wrap" style={{ paddingBottom:"5rem" }}>
          <div className="fl d1">
            <div className="mu-eyebrow">Sprzęt i zaplecze</div>
            <h2 className="mu-sec-title">Profesjonalne wyposażenie</h2>
            <p className="mu-sec-sub">
              Przywozimy wszystko co potrzebne - montujemy, obsługujemy i demontujemy.
            </p>
          </div>

          <div className="mu-eq-grid">
            {EQUIPMENT.map((eq, i) => (
              <div key={eq.title} className="mu-eq-cell fu" style={{ animationDelay:`${0.1 + i * 0.09}s` }}>
                <div className="mu-eq-icon-box">{eq.icon}</div>
                <div className="mu-eq-title">{eq.title}</div>
                <div className="mu-eq-desc">{eq.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="mu-wrap" style={{ paddingBottom:"4rem" }}>
          <div className="mu-divider"/>
        </div>

        {/* ── CTA ── */}
        <section className="mu-wrap" style={{ paddingBottom:"8rem" }}>
          <div className="mu-cta fu d2">
            <div style={{
              position:"absolute", inset:0, pointerEvents:"none",
              background:"radial-gradient(ellipse 70% 80% at 50% 110%,rgba(240,23,122,0.1) 0%,transparent 65%)",
            }}/>
            <h2 className="mu-cta-title">Chcesz wyjątkową oprawę muzyczną?</h2>
            <p className="mu-cta-desc">
              Skontaktuj się z nami - omówimy szczegóły, dobierzemy repertuar
              i&nbsp;przygotujemy wycenę.
            </p>
            <a href="/kontakt" className="mu-btn">Wyślij zapytanie →</a>
          </div>
        </section>

      </div>
      <SiteFooter />
    </>
  );
}