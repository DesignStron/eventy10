"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import SiteFooter from "@/components/site-footer";

function useCounter(target: number, duration = 1800) {
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || started) return;
      setStarted(true);
      obs.disconnect();
      let t: number | null = null;
      const step = (ts: number) => {
        if (!t) t = ts;
        const p = Math.min((ts - t) / duration, 1);
        setVal(Math.round((1 - Math.pow(1 - p, 4)) * target));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration, started]);
  return { val, ref };
}

function ImageCarousel() {
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("/api/galeria");
        const data = await res.json();
        if (data.images && data.images.length > 0) {
          const byCategory: Record<string, any[]> = {};
          data.images.forEach((img: any) => {
            const cat = (img.category || "").toString().trim();
            if (!cat) return;
            if (cat.toLowerCase() === "inne") return;
            if (!byCategory[cat]) byCategory[cat] = [];
            byCategory[cat].push(img);
          });

          const categories = Object.keys(byCategory);
          const maxPerCategory = 3;
          const categoryImages: any[][] = categories.map((cat) =>
            byCategory[cat].slice(0, maxPerCategory)
          );

          const interleaved: string[] = [];
          let index = 0;
          let hasMore = true;

          while (hasMore) {
            hasMore = false;
            for (let i = 0; i < categoryImages.length; i++) {
              if (index < categoryImages[i].length) {
                interleaved.push(categoryImages[i][index].url);
                hasMore = true;
              }
            }
            index++;
          }

          setImages(interleaved);
        }
      } catch (e) {
        console.error("Failed to fetch gallery images:", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, []);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe && images.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }
    if (isRightSwipe && images.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  if (isLoading) {
    return (
      <div style={{
        width:"100%",height:"100%",
        background:"linear-gradient(135deg,rgba(240,23,122,.08) 0%,rgba(240,23,122,.02) 100%)",
        display:"flex",alignItems:"center",justifyContent:"center",
      }}>
        <span style={{fontSize:"4rem",animation:"dot 1.5s ease-in-out infinite"}}>✦</span>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div style={{
        width:"100%",height:"100%",
        background:"linear-gradient(135deg,rgba(240,23,122,.08) 0%,rgba(240,23,122,.02) 100%)",
        display:"flex",alignItems:"center",justifyContent:"center",
      }}>
        <span style={{fontSize:"4rem",color:"rgba(240,23,122,.3)"}}>✦</span>
      </div>
    );
  }

  return (
    <div
      style={{ position: "relative", width: "100%", height: "100%" }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {images.map((img, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            inset: 0,
            opacity: index === currentIndex ? 1 : 0,
            transition: "opacity 800ms ease-in-out",
            zIndex: index === currentIndex ? 1 : 0,
          }}
        >
          <img
            src={img}
            alt={`Realizacja ${index + 1}`}
            style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}
          />
        </div>
      ))}
      <div style={{
        position:"absolute",inset:0,
        background:"linear-gradient(to top,rgba(6,5,8,.9) 0%,rgba(6,5,8,.3) 42%,rgba(6,5,8,.04) 100%)",
        zIndex: 2,
      }}/>
      <div style={{
        position:"absolute",bottom:"1rem",left:"50%",transform:"translateX(-50%)",
        display:"flex",gap:"0.5rem",zIndex:10,padding:"0.5rem",
      }}>
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            style={{
              width: index === currentIndex ? "1.5rem" : "0.5rem",
              height: "0.5rem",
              borderRadius: "9999px",
              border: "none",
              background: index === currentIndex ? "var(--pink)" : "rgba(255,255,255,.4)",
              cursor: "pointer",
              transition: "all 300ms ease",
              pointerEvents: "auto",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <style>{`
        @keyframes fadeUp   { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
        @keyframes dot      { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.35;transform:scale(.75)} }
        @keyframes lineGrow { from{transform:scaleX(0);opacity:0} to{transform:scaleX(1);opacity:1} }
        @keyframes float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes shimBar  { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes shine    { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes borderGlow {
          0%,100% { box-shadow: 0 0 0 1px rgba(240,23,122,0.15), 0 32px 80px rgba(0,0,0,0.5); }
          50%     { box-shadow: 0 0 0 1px rgba(240,23,122,0.4),  0 32px 80px rgba(0,0,0,0.5), 0 0 40px rgba(240,23,122,0.08); }
        }
        @keyframes tagPulse {
          0%,100% { border-color: rgba(240,23,122,0.3); }
          50%     { border-color: rgba(240,23,122,0.7); }
        }

        .fu{animation:fadeUp .8s cubic-bezier(.16,1,.3,1) both}
        .fi{animation:fadeIn .7s ease both}
        .d1{animation-delay:.08s}.d2{animation-delay:.2s}.d3{animation-delay:.34s}
        .d4{animation-delay:.5s}.d5{animation-delay:.65s}

        /* ── HERO GRID ── */
        .hg {
          display:grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          align-items: center;
          min-height: 55vh;
          padding: 4rem 0 2.5rem;
        }
        @media(max-width:900px){
          .hg { grid-template-columns:1fr; min-height:auto; padding:4rem 0 2rem; gap:2.5rem; }
          .hg-img { order:2; }
          .hg-txt { order:1; }
        }

        /* ── HEADLINE ── */
        .h1 {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 700;
          line-height: 1.25;
          letter-spacing: -0.028em;
          color: #fff;
          margin: 0 0 1.35rem;
          overflow: visible;
          padding-bottom:.06em;
        }
        @media(max-width:900px){
          .h1 { font-size: clamp(2.2rem, 8vw, 3rem); }
        }
        .h1 em {
          font-style: normal;
          color: #fff;
        }

        /* ── BADGE ── */
        .badge-pill {
          display:inline-flex; align-items:center; gap:.45rem;
          padding:.38rem 1rem; border-radius:9999px;
          background:rgba(240,23,122,.1); border:1px solid rgba(240,23,122,.25);
          font-size:.67rem; font-weight:700; letter-spacing:.1em;
          text-transform:uppercase; color:var(--pink-light);
          margin-bottom:1.75rem;
        }

        /* ── BUTTONS ── */
        .btn-hero {
          display:inline-flex; align-items:center; gap:.5rem;
          height:3.3rem; padding:0 2.2rem; border-radius:9999px;
          background:var(--pink); color:#fff;
          font-size:.92rem; font-weight:700; text-decoration:none;
          letter-spacing:.01em;
          box-shadow:0 8px 32px rgba(240,23,122,.48);
          transition:transform 220ms,box-shadow 220ms,background 220ms;
          position:relative; overflow:hidden; white-space:nowrap;
        }
        .btn-hero::before{content:"";position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,.16) 0%,transparent 55%);pointer-events:none}
        .btn-hero:hover{transform:translateY(-3px);box-shadow:0 14px 48px rgba(240,23,122,.62);background:var(--pink-light)}
        .btn-hero:hover .ar{transform:translateX(5px)}

        .btn-img-w{
          display:inline-flex;align-items:center;gap:.45rem;
          height:2.8rem;padding:0 1.4rem;border-radius:9999px;
          background:#fff;color:#0d0b10;font-size:.84rem;font-weight:700;
          text-decoration:none;box-shadow:0 4px 20px rgba(0,0,0,.35);
          transition:transform 200ms,box-shadow 200ms; white-space:nowrap;
        }
        .btn-img-w:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(0,0,0,.45)}
        .btn-img-w:hover .ar{transform:translateX(4px)}

        .btn-img-g{
          display:inline-flex;align-items:center;gap:.45rem;
          height:2.8rem;padding:0 1.4rem;border-radius:9999px;
          background:rgba(255,255,255,.16);border:1.5px solid rgba(255,255,255,.52);
          color:#fff;font-size:.84rem;font-weight:700;text-decoration:none;
          backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);
          transition:background 200ms,border-color 200ms,transform 200ms; white-space:nowrap;
        }
        .btn-img-g:hover{background:rgba(255,255,255,.26);border-color:rgba(255,255,255,.8);transform:translateY(-2px)}
        .btn-img-g:hover .ar{transform:translateX(4px)}

        /* ── IMAGE CARD ── */
        .img-card {
          border-radius:1.75rem;
          overflow:hidden;
          position:relative;
          aspect-ratio:4/5;
          animation:borderGlow 4s ease-in-out infinite, float 9s ease-in-out infinite;
        }
        @media(max-width:900px){
          .img-card{aspect-ratio:16/9;animation:none;}
        }
        @media(max-width:600px){
          .img-card{aspect-ratio:4/5;}
        }
        .img-glow{
          position:absolute;
          width:130%;height:130%;top:-15%;left:-15%;
          background:radial-gradient(ellipse at center,rgba(240,23,122,.2) 0%,transparent 65%);
          pointer-events:none;filter:blur(30px);z-index:0;
        }

        /* ── DIVIDER ── */
        .div-pink{
          height:1px;
          background:linear-gradient(90deg,transparent,rgba(240,23,122,.35),transparent);
          transform-origin:left;
          animation:lineGrow 1.1s cubic-bezier(.16,1,.3,1) .6s both;
        }

        /* ── SERVICE TAGS ── */
        .service-tags {
          display: flex;
          flex-wrap: wrap;
          gap: .6rem;
          margin-bottom: 2.5rem;
        }
        .service-tag {
          display: inline-flex;
          align-items: center;
          gap: .35rem;
          padding: .45rem 1rem;
          border-radius: 9999px;
          border: 1px solid rgba(240,23,122,.3);
          background: rgba(240,23,122,.07);
          color: var(--pink-light);
          font-size: .78rem;
          font-weight: 600;
          letter-spacing: .04em;
          animation: tagPulse 3s ease-in-out infinite;
          transition: background 200ms, transform 200ms;
        }
        .service-tag:nth-child(2) { animation-delay: .4s; }
        .service-tag:nth-child(3) { animation-delay: .8s; }
        .service-tag:nth-child(4) { animation-delay: 1.2s; }
        .service-tag:hover {
          background: rgba(240,23,122,.15);
          transform: translateY(-2px);
        }
        .service-tag-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--pink);
          display: inline-block;
        }

        /* ── LOCATION CHIP ── */
        .location-chip {
          display: inline-flex;
          align-items: center;
          gap: .5rem;
          padding: .45rem 1.1rem;
          border-radius: 9999px;
          background: rgba(255,255,255,.05);
          border: 1px solid rgba(255,255,255,.1);
          color: rgba(255,255,255,.5);
          font-size: .78rem;
          font-weight: 500;
          letter-spacing: .03em;
          margin-bottom: 2.5rem;
        }
        .location-chip-icon {
          font-size: .9rem;
          opacity: .7;
        }

        /* ── STATS ── */
        .stats-wrap{
          display:flex;flex-wrap:wrap;
          gap:0;
          border:1px solid rgba(255,255,255,.07);
          border-radius:1rem;
          overflow:hidden;
          margin:2.25rem auto 0;
          max-width:34rem;
        }
        .stat-cell{
          flex:1;min-width:100px;
          padding:1.5rem 1.25rem;
          border-right:1px solid rgba(255,255,255,.07);
          text-align:center;
          transition:background 200ms;
        }
        .stat-cell:last-child{border-right:none}
        .stat-cell:hover{background:rgba(255,255,255,.03)}
        .stat-n{
          font-family:var(--font-display);
          font-size:clamp(2rem,3.5vw,2.8rem);
          font-weight:700;line-height:1;letter-spacing:-.02em;
        }
        .stat-l{
          font-size:.75rem;font-weight:500;margin-top:.4rem;line-height:1.4;
        }

        /* ── BANNER ── */
        .bnr{
          border-radius:1.5rem;
          position:relative;overflow:hidden;
          background:rgba(255,255,255,.025);
          border:1px solid rgba(240,23,122,.18);
          padding:5rem 2rem;
          display:flex;flex-direction:column;align-items:center;text-align:center;
        }
        .bnr::before{
          content:"";position:absolute;inset:0;pointer-events:none;
          background:
            radial-gradient(ellipse 80% 100% at 50% 120%,rgba(240,23,122,.16) 0%,transparent 60%),
            radial-gradient(ellipse 50% 60% at 90% 0%,rgba(240,23,122,.06) 0%,transparent 55%);
        }
        .bnr::after{
          content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;
          background:linear-gradient(105deg,transparent 30%,rgba(240,23,122,.4) 50%,transparent 70%);
          background-size:300% 100%;
          animation:shine 4s linear infinite;
          mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
          mask-composite:exclude;
          -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
          -webkit-mask-composite:xor;
          padding:1px;
        }
        .bnr>*{position:relative;z-index:1}
        .bnr-btn{
          display:inline-flex;align-items:center;gap:.5rem;
          height:3.3rem;padding:0 2.2rem;border-radius:9999px;
          background:var(--pink);color:#fff;
          font-size:.9rem;font-weight:700;text-decoration:none;
          box-shadow:0 8px 32px rgba(240,23,122,.46);
          transition:transform 220ms,box-shadow 220ms,background 220ms;
          position:relative;overflow:hidden;
        }
        .bnr-btn::before{content:"";position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,.16) 0%,transparent 55%);pointer-events:none}
        .bnr-btn:hover{transform:translateY(-3px);box-shadow:0 16px 48px rgba(240,23,122,.64);background:var(--pink-light)}
        .bnr-btn:hover .ar{transform:translateX(5px)}

        /* ── SECTION LABEL ── */
        .sec-lbl{
          font-size:.62rem;font-weight:700;letter-spacing:.14em;
          text-transform:uppercase;color:rgba(255,255,255,.22);
          margin-bottom:.6rem;display:block;
        }

        /* arrow transition */
        .ar { display:inline-block; transition:transform 200ms ease; }
      `}</style>

      <div className="page-bg noise">
        <div style={{maxWidth:"76rem",margin:"0 auto",padding:"0 1.5rem"}}>

          {/* ══ HERO ══════════════════════════════ */}
          <div className="hg">

            {/* TEXT */}
            <div className="hg-txt">
              <div className="badge-pill fu">
                <span style={{width:"6px",height:"6px",borderRadius:"50%",background:"var(--pink)",display:"inline-block",animation:"dot 2s ease-in-out infinite"}}/>
                Organizacja rozrywki i animacji
              </div>

              <h1 className="h1 fu d1">
                Tworzymy wydarzenia <em>od najmłodszych lat</em>
              </h1>

              <p className="fu d2" style={{
                color:"rgba(255,255,255,.54)",
                fontSize:"clamp(0.95rem,1.6vw,1.05rem)",
                lineHeight:1.8,maxWidth:"55ch",marginBottom:"2rem",
                fontWeight: 500,
              }}>
                Pinky Party Animacje & Eventy organizuje animacje, warsztaty i oprawę muzyczną wydarzeń we Wrocławiu. Tworzymy wydarzenia na każdą okazję: od urodzin i wesel, przez festyny, Mikołajki, bale karnawałowe, aż po eventy szkolne i firmowe.
              </p>

              {/* ── SERVICE TAGS (zastąpienie dwóch osobnych <p>) ── */}
              <div className="service-tags fu d3">
                <span className="service-tag">
                  <span className="service-tag-dot"/>Animacje
                </span>
                <span className="service-tag">
                  <span className="service-tag-dot"/>Imprezy
                </span>
                <span className="service-tag">
                  <span className="service-tag-dot"/>DJ
                </span>
                <span className="service-tag">
                  <span className="service-tag-dot"/>Warsztaty
                </span>
              </div>

              {/* ── LOCATION CHIP ── */}
              <div className="fu d4" style={{marginBottom:"2.5rem"}}>
                <span className="location-chip">
                  <span className="location-chip-icon">📍</span>
                  Wrocław i okolice
                </span>
              </div>

              <div className="fu d4">
                <Link href="/oferta" className="btn-hero">
                  Zobacz ofertę <span className="ar">→</span>
                </Link>
              </div>

            </div>

            {/* IMAGE */}
            <div className="hg-img fu d5" style={{position:"relative"}}>
              <div className="img-glow"/>
              <div className="img-card" style={{position:"relative",zIndex:1}}>
                <ImageCarousel />
                <div style={{
                  position:"absolute",left:"1.4rem",right:"1.4rem",bottom:"4.5rem",
                  display:"flex",flexDirection:"column",gap:".75rem",zIndex:5,
                }}>
                  <span style={{
                    display:"inline-flex",alignItems:"center",gap:".4rem",
                    padding:".28rem .8rem",borderRadius:"9999px",
                    background:"rgba(255,255,255,.15)",border:"1px solid rgba(255,255,255,.32)",
                    backdropFilter:"blur(10px)",
                    fontSize:".62rem",fontWeight:700,letterSpacing:".09em",
                    textTransform:"uppercase",color:"#fff",width:"fit-content",
                  }}>
                    ✦ Nasze realizacje
                  </span>
                  <div style={{display:"flex",gap:".6rem",flexWrap:"wrap"}}>
                    <Link href="/galeria" className="btn-img-w">
                      Zobacz galerię <span className="ar">→</span>
                    </Link>
                    <Link href="/oferta" className="btn-img-g">
                      Oferta <span className="ar">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>{/* end .hg */}

          {/* ══ BANNER ════════════════════════════ */}
          <div style={{ paddingBottom: "8rem" }}>
            <div className="bnr">
              <span style={{
                display:"inline-flex",alignItems:"center",gap:".42rem",
                padding:".34rem .95rem",borderRadius:"9999px",
                background:"rgba(240,23,122,.12)",border:"1px solid rgba(240,23,122,.28)",
                fontSize:".67rem",fontWeight:700,letterSpacing:".1em",
                textTransform:"uppercase",color:"var(--pink-light)",marginBottom:"1.4rem",
              }}>
                <span style={{width:"6px",height:"6px",borderRadius:"50%",background:"var(--pink)",display:"inline-block",animation:"dot 2s ease-in-out infinite"}}/>
                Napisz do nas
              </span>

              <h2 style={{
                fontFamily:"var(--font-display)",
                fontSize:"clamp(2rem,4.5vw,3.2rem)",
                fontWeight:700,color:"#fff",lineHeight:1.08,
                letterSpacing:"-.025em",marginBottom:".875rem",
              }}>
                Gotowy na wyjątkowe wydarzenie?
              </h2>

              <p style={{
                color:"rgba(255,255,255,.5)",fontSize:"1.02rem",lineHeight:1.78,
                maxWidth:"45ch",marginBottom:"2.5rem",
              }}>
                W wiadomości podaj: termin, liczbę dzieci, rodzaj uroczystości oraz
                miejsce wydarzenia — to pomoże nam szybko potwierdzić dostępność i
                sprawnie wrócić z odpowiedzią.
              </p>

              <Link href="/kontakt" className="bnr-btn">
                Skontaktuj się <span className="ar">→</span>
              </Link>

            </div>
          </div>

        </div>{/* end inner container */}
      </div>{/* end .page-bg */}
      <SiteFooter />
    </>
  );
}

/* ── stat cell with counter ── */
function StatCell({ num, suffix, label, delay }: { num:number; suffix:string; label:string; delay:string }) {
  const { val, ref } = useCounter(num);
  return (
    <div ref={ref} className="stat-cell" style={{animationDelay:delay}}>
      <div className="home-stat-num stat-n">{val}{suffix}</div>
      <div className="home-stat-lbl stat-l">{label}</div>
    </div>
  );
}