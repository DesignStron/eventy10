"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

type OfferSection = {
  key: string;
  category: string;
  categoryLabel: string;
  title: string;
  description: string;
  price: string;
  bullets: string[];
  images: string[];
};

type GalleryImage = {
  id: string;
  title: string;
  url: string;
  category: string;
};

const categoryEmoji: Record<string, string> = {
  studniowki: "🎓",
  wesela: "💍",
  urodziny: "🎂",
  firmowe: "🏢",
  bale: "🎭",
  swiateczne: "🎄",
};

export default function OfferDetailsPage() {
  const [offer, setOffer] = useState<OfferSection | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    const parts = hash.split('#');
    const slug = parts[parts.length - 1];

    if (!slug) { setLoading(false); return; }

    const fetchData = async () => {
      try {
        const { data: offerData, error: offerError } = await supabase
          .from("offer").select("*").eq("key", slug).single();

        if (offerError || !offerData) {
          console.error('Offer not found:', { offerError, offerData, slug });
          setLoading(false);
          return;
        }

        setOffer({
          key: offerData.key,
          category: offerData.category || offerData.key,
          categoryLabel: offerData.category_label || offerData.key_label || offerData.key,
          title: offerData.title,
          description: offerData.description,
          price: offerData.price || "",
          bullets: offerData.bullets || [],
          images: offerData.images || [],
        });

        const { data: galleryData, error: galleryError } = await supabase
          .from("gallery").select("*").eq("category", slug)
          .order("created_at", { ascending: false });

        if (!galleryError && galleryData) setGalleryImages(galleryData);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="page-bg noise" style={{
        minHeight: "100vh", display: "flex",
        alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ display: "flex", gap: ".5rem" }}>
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              width: 8, height: 8, borderRadius: "50%",
              background: "var(--pink)",
              animation: "dot 1.2s ease-in-out infinite",
              animationDelay: `${i * .15}s`,
              display: "inline-block",
            }}/>
          ))}
        </div>
      </div>
    );
  }

  if (!offer) {
    return (
      <div className="page-bg noise" style={{
        minHeight: "100vh", display: "flex",
        alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ textAlign: "center" }}>
          <p style={{
            fontFamily: "var(--font-display)", fontSize: "6rem", fontWeight: 900,
            color: "rgba(240,23,122,.12)", margin: 0, lineHeight: 1,
          }}>404</p>
          <h1 style={{ color: "var(--text)", margin: ".5rem 0 1.5rem" }}>Oferta nie znaleziona</h1>
          <Link href="/oferta" style={{ color: "var(--pink)", textDecoration: "none", fontSize: ".9rem" }}>
            ← Powrót do oferty
          </Link>
        </div>
      </div>
    );
  }

  const images = offer.images || [];

  return (
    <>
      <style>{`
        @keyframes fadeUp  { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes dot     { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.35;transform:scale(.75)} }
        @keyframes shine   { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes borderGlow {
          0%,100% { box-shadow: 0 0 0 1px rgba(240,23,122,.15), 0 32px 80px rgba(0,0,0,.5); }
          50%     { box-shadow: 0 0 0 1px rgba(240,23,122,.4),  0 32px 80px rgba(0,0,0,.5), 0 0 40px rgba(240,23,122,.08); }
        }
        @keyframes lineGrow { from{transform:scaleX(0);opacity:0} to{transform:scaleX(1);opacity:1} }

        .fu{animation:fadeUp .8s cubic-bezier(.16,1,.3,1) both}
        .d1{animation-delay:.08s}.d2{animation-delay:.2s}.d3{animation-delay:.34s}
        .d4{animation-delay:.5s}.d5{animation-delay:.65s}

        /* ── HERO GRID ── */
        .od-hg {
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:4rem;
          align-items:center;
          min-height:88vh;
          padding:6rem 0 3rem;
        }
        @media(max-width:900px){
          .od-hg{grid-template-columns:1fr;min-height:auto;padding:4rem 0 2rem;gap:2.5rem;}
          .od-hg-img{order:2;width:100%;max-width:500px;margin:0 auto;}
          .od-hg-txt{order:1;}
          .od-img-card{aspect-ratio:3/4 !important;max-height:70vh;animation:none !important;}
        }
        @media(max-width:600px){
          .od-img-card{aspect-ratio:1/1 !important;max-height:60vh;}
        }

        /* ── HEADLINE ── */
        .od-h1 {
          font-family:var(--font-display);
          font-size:clamp(3rem,5.5vw,5.2rem);
          font-weight:700;
          line-height:1.06;
          letter-spacing:-.03em;
          color:var(--text);
          margin:0 0 1.75rem;
          overflow:visible;
          padding-bottom:.06em;
        }
        .od-h1 em {
          font-style:normal;
          background:linear-gradient(105deg,var(--text) 0%,var(--text) 18%,var(--pink-light) 38%,#ffb3d4 55%,var(--pink-light) 72%,var(--text) 88%,var(--text) 100%);
          background-size:220% auto;
          -webkit-background-clip:text;
          background-clip:text;
          -webkit-text-fill-color:transparent;
          animation:shine 5s linear infinite;
        }

        /* ── BADGE ── */
        .od-badge {
          display:inline-flex;align-items:center;gap:.45rem;
          padding:.38rem 1rem;border-radius:9999px;
          background:rgba(240,23,122,.1);border:1px solid rgba(240,23,122,.25);
          font-size:.67rem;font-weight:700;letter-spacing:.1em;
          text-transform:uppercase;color:var(--pink-light);
          margin-bottom:1.75rem;
        }

        /* ── DESCRIPTION ── */
        .od-desc {
          color:var(--text-secondary);
          font-size:clamp(1rem,1.8vw,1.1rem);
          line-height:1.85;
          max-width:46ch;
          margin-bottom:2rem;
        }

        /* ── PRICE BOX ── */
        .od-price-box {
          display:inline-flex;align-items:flex-end;gap:2rem;
          background:var(--surface-elevated);
          border:1px solid var(--border);
          border-radius:1rem;
          padding:1.25rem 1.75rem;
          margin-bottom:2rem;
        }
        .od-price-from {
          font-size:.65rem;letter-spacing:.12em;text-transform:uppercase;
          color:var(--text-muted);margin-bottom:.3rem;
        }
        .od-price-num {
          font-family:var(--font-display);font-size:3rem;
          font-weight:700;line-height:1;color:var(--text);
        }
        .od-price-cur {
          font-size:1.4rem;color:var(--text-muted);font-weight:400;
        }
        .od-price-sep {
          width:1px;height:3.5rem;background:var(--border);align-self:center;
        }
        .od-price-note {
          font-size:.75rem;color:var(--text-muted);line-height:1.6;max-width:14ch;
        }

        /* ── BULLETS ── */
        .od-bullets{display:flex;flex-direction:column;gap:.65rem;margin-bottom:2rem;}
        .od-bullet{
          display:flex;align-items:flex-start;gap:.8rem;
          padding:.7rem 1rem;
          background:var(--surface-elevated);
          border:1px solid var(--border);
          border-radius:.75rem;
          transition:border-color 200ms,background 200ms;
        }
        .od-bullet:hover{
          background:rgba(240,23,122,.06);
          border-color:rgba(240,23,122,.25);
        }
        .od-bullet-dot{
          width:20px;height:20px;flex-shrink:0;margin-top:2px;
          background:linear-gradient(135deg,var(--pink),var(--pink-light));
          border-radius:50%;display:flex;align-items:center;justify-content:center;
        }
        .od-bullet-dot svg{width:11px;height:11px;stroke:#fff;stroke-width:2.5;fill:none;}
        .od-bullet-text{font-size:.875rem;color:var(--text-secondary);line-height:1.5;}

        /* ── BUTTONS ── */
        .od-btn-primary{
          display:inline-flex;align-items:center;gap:.5rem;
          height:3.3rem;padding:0 2.2rem;border-radius:9999px;
          background:var(--pink);color:#fff;
          font-size:.92rem;font-weight:700;text-decoration:none;
          letter-spacing:.01em;
          box-shadow:0 8px 32px rgba(240,23,122,.48);
          transition:transform 220ms,box-shadow 220ms,background 220ms;
          position:relative;overflow:hidden;white-space:nowrap;
        }
        .od-btn-primary::before{
          content:"";position:absolute;inset:0;
          background:linear-gradient(135deg,rgba(255,255,255,.16) 0%,transparent 55%);
          pointer-events:none;
        }
        .od-btn-primary:hover{
          transform:translateY(-3px);
          box-shadow:0 14px 48px rgba(240,23,122,.62);
          background:var(--pink-light);
        }
        .od-btn-primary:hover .ar{transform:translateX(5px)}

        .od-btn-outline{
          display:inline-flex;align-items:center;gap:.45rem;
          height:3.3rem;padding:0 2rem;border-radius:9999px;
          background:var(--surface-elevated);
          border:1.5px solid var(--border);
          color:var(--text-secondary);
          font-size:.88rem;font-weight:600;text-decoration:none;
          transition:border-color 200ms,background 200ms,color 200ms,transform 200ms;
          white-space:nowrap;
        }
        .od-btn-outline:hover{
          border-color:rgba(240,23,122,.4);
          background:rgba(240,23,122,.06);
          color:var(--pink);
          transform:translateY(-2px);
        }

        .ar{display:inline-block;transition:transform 240ms ease}

        /* ── IMAGE CARD ── */
        .od-img-card{
          border-radius:1.75rem;
          overflow:hidden;
          position:relative;
          aspect-ratio:4/5;
          animation:borderGlow 4s ease-in-out infinite;
        }
        .od-img-glow{
          position:absolute;
          width:130%;height:130%;top:-15%;left:-15%;
          background:radial-gradient(ellipse at center,rgba(240,23,122,.2) 0%,transparent 65%);
          pointer-events:none;filter:blur(30px);z-index:0;
        }

        /* ── THUMB STRIP ── */
        .od-thumb-strip{display:flex;gap:.5rem;flex-wrap:wrap;}
        .od-thumb{
          width:52px;height:40px;border-radius:.5rem;overflow:hidden;cursor:pointer;
          border:1.5px solid transparent;opacity:.5;
          transition:opacity 200ms,border-color 200ms,transform 200ms;
          flex-shrink:0;background:none;padding:0;
        }
        .od-thumb.active{opacity:1;border-color:var(--pink);}
        .od-thumb:hover{opacity:.8;transform:scale(1.06);}
        .od-thumb img{width:100%;height:100%;object-fit:cover;display:block;}

        /* ── DIVIDER ── */
        .div-pink{
          height:1px;
          background:linear-gradient(90deg,transparent,rgba(240,23,122,.35),transparent);
          transform-origin:left;
          animation:lineGrow 1.1s cubic-bezier(.16,1,.3,1) .6s both;
        }

        /* ══════════════════════════════════════════════════════════════════
           ── GALERIA – MASONRY z naturalnymi proporcjami (CSS columns) ──
           ══════════════════════════════════════════════════════════════════ */
        .od-gallery-masonry {
          columns: 2;
          column-gap: 1rem;
        }
        @media(min-width:900px) {
          .od-gallery-masonry { columns: 3; }
        }
        @media(max-width:540px) {
          .od-gallery-masonry { columns: 1; }
        }

        /* Każdy element w kolumnowym masonry */
        .od-gi {
          break-inside: avoid;
          page-break-inside: avoid;
          -webkit-column-break-inside: avoid;
          margin-bottom: 1rem;
          border-radius: 1.25rem;
          overflow: hidden;
          position: relative;
          background: var(--surface-elevated);
          border: 1px solid var(--border);
          transition: transform 300ms, border-color 300ms, box-shadow 300ms;
          display: block; /* ważne dla column layout */
        }
        .od-gi:hover {
          transform: translateY(-4px);
          border-color: rgba(240,23,122,.3);
          box-shadow: 0 16px 48px rgba(240,23,122,.12), 0 4px 16px rgba(0,0,0,.3);
        }

        /* Zdjęcie zachowuje ORYGINALNE PROPORCJE – brak stałej wysokości */
        .od-gi img {
          width: 100%;
          height: auto;      /* naturalne proporcje */
          display: block;
          transition: transform 500ms cubic-bezier(.16,1,.3,1);
        }
        .od-gi:hover img { transform: scale(1.04); }

        /* Subtelny overlay z tytułem na hover */
        .od-gi-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(6,5,8,.8) 0%, rgba(6,5,8,.15) 40%, transparent 70%);
          opacity: 0;
          transition: opacity 300ms ease;
          display: flex;
          align-items: flex-end;
          pointer-events: none;
        }
        .od-gi:hover .od-gi-overlay { opacity: 1; }

        .od-gi-label {
          padding: .75rem 1rem;
          font-size: .8rem;
          font-weight: 600;
          color: #fff;
          font-family: var(--font-display);
          transform: translateY(4px);
          transition: transform 300ms ease;
        }
        .od-gi:hover .od-gi-label { transform: translateY(0); }

        /* ── CTA BANNER ── */
        .od-bnr{
          border-radius:1.5rem;
          position:relative;overflow:hidden;
          background:var(--surface-elevated);
          border:1px solid rgba(240,23,122,.18);
          padding:5rem 2rem;
          display:flex;flex-direction:column;align-items:center;text-align:center;
        }
        .od-bnr::before{
          content:"";position:absolute;inset:0;pointer-events:none;
          background:
            radial-gradient(ellipse 80% 100% at 50% 120%,rgba(240,23,122,.12) 0%,transparent 60%),
            radial-gradient(ellipse 50% 60% at 90% 0%,rgba(240,23,122,.06) 0%,transparent 55%);
        }
        .od-bnr::after{
          content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;
          background:linear-gradient(105deg,transparent 30%,rgba(240,23,122,.35) 50%,transparent 70%);
          background-size:300% 100%;
          animation:shine 4s linear infinite;
          mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
          mask-composite:exclude;
          -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
          -webkit-mask-composite:xor;
          padding:1px;
        }
        .od-bnr>*{position:relative;z-index:1;}
        .od-bnr-h2{
          font-family:var(--font-display);
          font-size:clamp(2rem,4.5vw,3.2rem);
          font-weight:700;color:var(--text);line-height:1.08;
          letter-spacing:-.025em;margin-bottom:.875rem;
        }
        .od-bnr-p{
          color:var(--text-secondary);font-size:1.02rem;
          line-height:1.78;max-width:38ch;margin-bottom:2.5rem;
        }
        .od-bnr-btn{
          display:inline-flex;align-items:center;gap:.5rem;
          height:3.3rem;padding:0 2.2rem;border-radius:9999px;
          background:var(--pink);color:#fff;
          font-size:.9rem;font-weight:700;text-decoration:none;
          box-shadow:0 8px 32px rgba(240,23,122,.46);
          transition:transform 220ms,box-shadow 220ms,background 220ms;
          position:relative;overflow:hidden;
        }
        .od-bnr-btn::before{
          content:"";position:absolute;inset:0;
          background:linear-gradient(135deg,rgba(255,255,255,.16) 0%,transparent 55%);
          pointer-events:none;
        }
        .od-bnr-btn:hover{
          transform:translateY(-3px);
          box-shadow:0 16px 48px rgba(240,23,122,.64);
          background:var(--pink-light);
        }
        .od-bnr-btn:hover .ar{transform:translateX(5px)}

        /* ── GALLERY HEADING ── */
        .od-sec-h2{
          font-family:var(--font-display);
          font-size:clamp(2rem,4vw,3rem);
          font-weight:700;color:var(--text);
          letter-spacing:-.025em;margin:0 0 .75rem;
        }
        .od-sec-p{
          color:var(--text-secondary);
          font-size:.95rem;max-width:40ch;line-height:1.7;margin:0;
        }

        html[data-theme="light"] .od-img-glow { opacity: 0.5; }
        html[data-theme="light"] .od-img-card {
          box-shadow: 0 20px 60px rgba(240,23,122,.15), 0 4px 20px rgba(0,0,0,.08);
          animation: none;
        }
      `}</style>

      <div className="page-bg noise">
        <div style={{ maxWidth: "76rem", margin: "0 auto", padding: "0 1.5rem" }}>

          {/* ══ HERO ══════════════════════════════════════════════════════ */}
          <div className="od-hg">

            {/* TEXT COLUMN */}
            <div className="od-hg-txt">
              <div className="od-badge fu">
                <span style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: "var(--pink)", display: "inline-block",
                  animation: "dot 2s ease-in-out infinite",
                }}/>
                {offer.categoryLabel}
              </div>

              <h1 className="od-h1 fu d1">
                <em>{offer.title}</em>
              </h1>

              <p className="od-desc fu d2">{offer.description}</p>

              {offer.price && (
                <div className="fu d3">
                  <div className="od-price-box">
                    <div>
                      <p className="od-price-from">Cena od</p>
                      <div className="od-price-num">
                        {offer.price}
                        <span className="od-price-cur"> zł</span>
                      </div>
                    </div>
                    <div className="od-price-sep"/>
                    <p className="od-price-note">wycena indywidualna na zapytanie</p>
                  </div>
                </div>
              )}

              {offer.bullets?.length > 0 && (
                <div className="od-bullets fu d4">
                  {offer.bullets.map((b, i) => (
                    <div key={i} className="od-bullet">
                      <div className="od-bullet-dot">
                        <svg viewBox="0 0 24 24">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span className="od-bullet-text">{b}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="fu d5" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link href="/kontakt" className="od-btn-primary">
                  Zapytaj o wycenę <span className="ar">→</span>
                </Link>
                <Link href="/oferta" className="od-btn-outline">
                  ← Wróć do oferty
                </Link>
              </div>
            </div>

            {/* IMAGE COLUMN */}
            <div className="od-hg-img fu d5" style={{ position: "relative" }}>
              <div className="od-img-glow"/>
              <div className="od-img-card" style={{ position: "relative", zIndex: 1 }}>
                {images[activeImg] ? (
                  <img
                    src={images[activeImg]}
                    alt={offer.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                ) : (
                  <div style={{
                    width: "100%", height: "100%",
                    background: "linear-gradient(135deg,rgba(240,23,122,.08) 0%,rgba(240,23,122,.02) 100%)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "6rem",
                  }}>
                    {categoryEmoji[offer.category] || "✦"}
                  </div>
                )}

                {images[activeImg] && (
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top,rgba(6,5,8,.85) 0%,rgba(6,5,8,.2) 40%,rgba(6,5,8,.04) 100%)",
                    pointerEvents: "none",
                  }}/>
                )}

                <div style={{
                  position: "absolute", left: "1.4rem", right: "1.4rem", bottom: "1.6rem",
                  display: "flex", flexDirection: "column", gap: ".75rem", zIndex: 2,
                }}>
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: ".4rem",
                    padding: ".28rem .8rem", borderRadius: "9999px",
                    background: "rgba(255,255,255,.15)", border: "1px solid rgba(255,255,255,.32)",
                    backdropFilter: "blur(10px)",
                    fontSize: ".62rem", fontWeight: 700, letterSpacing: ".09em",
                    textTransform: "uppercase", color: "#fff", width: "fit-content",
                  }}>
                    {categoryEmoji[offer.category] || "✦"} {offer.categoryLabel}
                  </span>

                  {images.length > 1 && (
                    <div className="od-thumb-strip">
                      {images.map((img, i) => (
                        <button
                          key={i}
                          className={`od-thumb${i === activeImg ? " active" : ""}`}
                          onClick={() => setActiveImg(i)}
                          aria-label={`Zdjęcie ${i + 1}`}
                        >
                          <img src={img} alt=""/>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ══ GALLERY – MASONRY Z NATURALNYMI PROPORCJAMI ═════════════ */}
          {galleryImages.length > 0 && (
            <div style={{ paddingBottom: "6rem" }}>
              <div className="div-pink" style={{ marginBottom: "4rem" }}/>

              <div style={{ marginBottom: "3rem" }}>
                <div className="od-badge" style={{ marginBottom: "1rem" }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: "var(--pink)", display: "inline-block",
                    animation: "dot 2s ease-in-out infinite",
                  }}/>
                  Realizacje
                </div>
                <h2 className="od-sec-h2">Galeria zdjęć</h2>
                <p className="od-sec-p">
                  {galleryImages.length} {galleryImages.length === 1 ? "zdjęcie" : galleryImages.length < 5 ? "zdjęcia" : "zdjęć"} z naszych realizacji.
                </p>
              </div>

              {/* CSS columns masonry – zdjęcia z naturalnymi proporcjami */}
              <div className="od-gallery-masonry">
                {galleryImages.map((image) => (
                  <div key={image.id} className="od-gi">
                    <img src={image.url} alt={image.title} loading="lazy"/>
                    <div className="od-gi-overlay">
                      <span className="od-gi-label">{image.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══ CTA BANNER ════════════════════════════════════════════════ */}
          <div style={{ paddingBottom: "8rem" }}>
            <div className="od-bnr">
              <span style={{
                display: "inline-flex", alignItems: "center", gap: ".42rem",
                padding: ".34rem .95rem", borderRadius: "9999px",
                background: "rgba(240,23,122,.12)", border: "1px solid rgba(240,23,122,.28)",
                fontSize: ".67rem", fontWeight: 700, letterSpacing: ".1em",
                textTransform: "uppercase", color: "var(--pink-light)", marginBottom: "1.4rem",
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: "var(--pink)", display: "inline-block",
                  animation: "dot 2s ease-in-out infinite",
                }}/>
                Wycena w 24 godziny
              </span>

              <h2 className="od-bnr-h2">Gotowy na wyjątkowe wydarzenie?</h2>

              <p className="od-bnr-p">
                Napisz do nas — przygotujemy indywidualny scenariusz
                i&nbsp;wycenę dopasowaną do Twoich potrzeb.
              </p>

              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/kontakt" className="od-bnr-btn">
                  Wyślij zapytanie <span className="ar">→</span>
                </Link>
                <Link href="/galeria" className="od-btn-outline">
                  Zobacz galerię
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}