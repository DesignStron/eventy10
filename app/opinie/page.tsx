import type { Metadata } from "next";
import SiteFooter from "@/components/site-footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Opinie klientów – Pinky Party | Animacje dla dzieci Wrocław",
  description:
    "Przeczytaj opinie klientów Pinky Party. Prawdziwe rekomendacje rodziców i organizatorów o animacjach dla dzieci, urodzinach, weselach i eventach we Wrocławiu i okolicach.",
  alternates: {
    canonical: "/opinie",
  },
  openGraph: {
    title: "Opinie klientów – Pinky Party Animacje & Eventy",
    description:
      "Opinie klientów o animacjach Pinky Party we Wrocławiu. Co mówią rodzice i organizatorzy po współpracy z Magdą?",
    url: "/opinie",
  },
  twitter: {
    title: "Opinie klientów – Pinky Party",
    description:
      "Prawdziwe opinie klientów Pinky Party – animacje dla dzieci we Wrocławiu.",
  },
};

const REVIEWS = [
  {
    author: "Kasia P.",
    initial: "K",
    text: "Magda ma rewelacyjne podejście nie tylko do dzieci, ale i do klienta. Można się z nią bez problemu dogadać w różnych kwestiach. Miła, uśmiechnięta, radosna i odpowiedzialna osoba. Z całego serca polecam!",
  },
  {
    author: "Maja K.",
    initial: "M",
    text: "Bardzo polecam Panią Magdę! Pomogła przy organizacji imprezy naszej ulicy, co wiązało się z ogarnięciem kilkudziesięciu dzieciaczków. Wszystkie były zachwycone, a rodzice mieli czas dla siebie. Pozdrawiamy i zapraszamy za rok!",
  },
  {
    author: "Magdalena K.",
    initial: "M",
    text: "Bardzo polecam, Pani Magda zajmowała się dziećmi na festynie, który organizował mój chór. Wszystkie buźki uśmiechnięte, zadowolone, zabawy różnorodne i angażujące każdego maluszka. Pełen profesjonalizm!",
  },
  {
    author: "Marzena M.",
    initial: "M",
    text: "Pani Magda to przeurocza osoba, pełna wdzięku, z pasją, posiadająca wykształcenie pedagogiczne, psychologiczne i uzdolnienia artystyczne. Jest osobą otwartą, kreatywną, obdarzoną anielską cierpliwością do dzieci. Praca z maluchami sprawia Jej szczerą radość, robi to z wielkim zaangażowaniem.",
  },
  {
    author: "Gośka D.",
    initial: "G",
    text: "Polecam! Przy Pani Magdzie nie ma czasu na nudę.",
  },
];

export default function OpiniePage() {
  return (
    <>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
        @keyframes shimBar{0%{background-position:-200% center}100%{background-position:200% center}}
        @keyframes pulseDot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.35)}}
        .fu{animation:fadeUp .8s cubic-bezier(.16,1,.3,1) both}
        .d1{animation-delay:.05s}.d2{animation-delay:.15s}.d3{animation-delay:.26s}
        .d4{animation-delay:.38s}.d5{animation-delay:.52s}.d6{animation-delay:.66s}
        .op-wrap{max-width:72rem;margin:0 auto;padding:0 1.5rem}
        .op-badge{display:inline-flex;align-items:center;gap:.5rem;padding:.38rem 1rem;border-radius:9999px;background:rgba(240,23,122,.1);border:1px solid rgba(240,23,122,.25);font-size:.63rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--pink-light);margin-bottom:1.5rem}
        html[data-theme="light"] .op-badge{background:rgba(240,23,122,.08);border-color:rgba(240,23,122,.3);color:var(--pink)}
        .op-dot{width:6px;height:6px;border-radius:50%;background:var(--pink);display:inline-block;animation:pulseDot 2.2s ease-in-out infinite}
        .op-title{font-family:var(--font-display);font-size:clamp(2.6rem,6vw,5rem);font-weight:700;color:#fff;line-height:1.2;letter-spacing:-.03em;margin:0 0 1.25rem}
        html[data-theme="light"] .op-title{color:#0d0b10}
        .op-accent{display:inline-block;background:linear-gradient(105deg,#f0177a 0%,#ff6bb5 45%,#f0177a 80%);background-size:200% auto;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:shimBar 3.5s linear infinite}
        .op-lead{color:rgba(255,255,255,.55);font-size:1.05rem;line-height:1.85;max-width:52rem;margin:0 0 2rem}
        html[data-theme="light"] .op-lead{color:rgba(13,11,16,.6)}
        .op-infobar{margin-bottom:3.5rem;padding:1.25rem 1.75rem;border-radius:1rem;background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.06);display:flex;flex-wrap:wrap;gap:1.5rem;align-items:center}
        html[data-theme="light"] .op-infobar{background:rgba(240,23,122,.04);border-color:rgba(240,23,122,.12)}
        .op-infoitem{display:flex;align-items:center;gap:.5rem;font-size:.82rem;color:rgba(255,255,255,.55)}
        html[data-theme="light"] .op-infoitem{color:rgba(13,11,16,.55)}
        .op-infoitem strong{color:#fff;font-weight:700}
        html[data-theme="light"] .op-infoitem strong{color:#0d0b10}
        .op-grid{display:grid;grid-template-columns:1fr;gap:1.25rem;padding-bottom:5rem}
        @media(min-width:640px){.op-grid{grid-template-columns:repeat(2,1fr)}}
        @media(min-width:1024px){.op-grid{grid-template-columns:repeat(3,1fr)}}
        .op-card{padding:2rem;border-radius:1.5rem;background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.07);display:flex;flex-direction:column;transition:border-color 250ms,box-shadow 250ms,transform 250ms}
        .op-card:hover{border-color:rgba(240,23,122,.25);box-shadow:0 16px 48px rgba(240,23,122,.1);transform:translateY(-3px)}
        html[data-theme="light"] .op-card{background:#fff;border:1px solid rgba(240,23,122,.1);box-shadow:0 2px 16px rgba(0,0,0,.04)}
        html[data-theme="light"] .op-card:hover{border-color:rgba(240,23,122,.3);box-shadow:0 16px 48px rgba(240,23,122,.1)}
        .op-qmark{font-family:Georgia,serif;font-size:3rem;line-height:1;color:var(--pink);opacity:.3;margin-bottom:.5rem}
        .op-bq{font-size:.9rem;color:rgba(255,255,255,.68);line-height:1.9;flex:1;margin:0 0 1.5rem}
        html[data-theme="light"] .op-bq{color:rgba(13,11,16,.68)}
        .op-footer{display:flex;align-items:center;gap:.75rem;border-top:1px solid rgba(255,255,255,.06);padding-top:1.125rem;margin-top:auto}
        html[data-theme="light"] .op-footer{border-top-color:rgba(0,0,0,.07)}
        .op-av{width:2.5rem;height:2.5rem;border-radius:50%;flex-shrink:0;background:linear-gradient(135deg,#f0177a,#ff4fa3);display:flex;align-items:center;justify-content:center;font-size:.85rem;font-weight:700;color:#fff}
        .op-aname{font-size:.85rem;font-weight:700;color:#fff;line-height:1.3}
        html[data-theme="light"] .op-aname{color:#0d0b10}
        .op-src{font-size:.7rem;color:rgba(255,255,255,.35);display:flex;align-items:center;gap:.3rem;margin-top:.1rem}
        html[data-theme="light"] .op-src{color:rgba(13,11,16,.4)}
        .op-fbdot{width:.45rem;height:.45rem;border-radius:50%;background:#1877F2;display:inline-block;flex-shrink:0}
        .op-fbcard{padding:2rem;border-radius:1.5rem;background:rgba(24,119,242,.07);border:1px solid rgba(24,119,242,.2);display:flex;flex-direction:column;align-items:flex-start;justify-content:center;gap:1rem}
        html[data-theme="light"] .op-fbcard{background:rgba(24,119,242,.05);border-color:rgba(24,119,242,.2)}
        .op-fbh{font-family:var(--font-display);font-size:1.1rem;font-weight:700;color:#fff;line-height:1.4}
        html[data-theme="light"] .op-fbh{color:#0d0b10}
        .op-fbs{font-size:.82rem;color:rgba(255,255,255,.45);line-height:1.7}
        html[data-theme="light"] .op-fbs{color:rgba(13,11,16,.5)}
        .op-fbbtn{display:inline-flex;align-items:center;gap:.5rem;padding:.65rem 1.4rem;border-radius:9999px;background:#1877F2;color:#fff;font-size:.82rem;font-weight:700;text-decoration:none;transition:opacity 150ms,transform 150ms}
        .op-fbbtn:hover{opacity:.88;transform:translateY(-1px)}
        .op-cta{padding:3rem;border-radius:1.5rem;margin-bottom:6rem;background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.07);display:flex;flex-wrap:wrap;gap:1.5rem;align-items:center;justify-content:space-between;position:relative;overflow:hidden}
        .op-cta::before{content:'';position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at 80% 50%,rgba(240,23,122,.08) 0%,transparent 60%)}
        html[data-theme="light"] .op-cta{background:#fff;border:1px solid rgba(240,23,122,.12);box-shadow:0 4px 24px rgba(0,0,0,.04)}
        .op-ctatitle{font-family:var(--font-display);font-size:clamp(1.4rem,3vw,2rem);font-weight:700;color:#fff;line-height:1.3}
        html[data-theme="light"] .op-ctatitle{color:#0d0b10}
        .op-ctasub{font-size:.875rem;color:rgba(255,255,255,.45);line-height:1.7;margin-top:.4rem}
        html[data-theme="light"] .op-ctasub{color:rgba(13,11,16,.5)}
        .btn-p{display:inline-flex;align-items:center;gap:.45rem;padding:.8rem 1.75rem;border-radius:9999px;background:var(--pink);color:#fff;font-size:.875rem;font-weight:700;text-decoration:none;box-shadow:0 6px 24px rgba(240,23,122,.4);transition:transform 180ms,box-shadow 180ms}
        .btn-p:hover{transform:translateY(-2px);box-shadow:0 10px 32px rgba(240,23,122,.55)}
        .btn-g{display:inline-flex;align-items:center;gap:.45rem;padding:.8rem 1.75rem;border-radius:9999px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);color:#fff;font-size:.875rem;font-weight:700;text-decoration:none;transition:background 180ms}
        .btn-g:hover{background:rgba(255,255,255,.14)}
        html[data-theme="light"] .btn-g{background:rgba(13,11,16,.05);border-color:rgba(13,11,16,.15);color:#0d0b10}
        html[data-theme="light"] .btn-g:hover{background:rgba(13,11,16,.09)}
      `}</style>

      <div className="page-bg noise">

        {/* HERO */}
        <div className="op-wrap" style={{ paddingTop: "5rem", paddingBottom: "3rem" }}>
          <div className="fu d1">
            <div className="op-badge">
              <span className="op-dot" aria-hidden="true" />
              Opinie klientów
            </div>
          </div>
          <h1 className="op-title fu d2">
            Co mówią o nas <span className="op-accent">klienci</span>
          </h1>
          <p className="op-lead fu d3">
            Poniżej znajdziesz opinie rodziców, organizatorów i klientów, którzy zaufali Pinky Party
            przy organizacji animacji dla dzieci, urodzin, festynów i imprez we Wrocławiu i okolicach.
            Opinie pochodzą z profilu Pinky Party na Facebooku.
          </p>
          <div className="op-infobar fu d4">
            <div className="op-infoitem"><span aria-hidden="true">📍</span><span>Obszar działania: <strong>Wrocław i okolice</strong></span></div>
            <div className="op-infoitem"><span aria-hidden="true">🎉</span><span>Zrealizowanych wydarzeń: <strong>250+</strong></span></div>
            <div className="op-infoitem"><span aria-hidden="true">💬</span><span>Źródło opinii: <strong>Facebook</strong></span></div>
          </div>
        </div>

        {/* OPINIE */}
        <div className="op-wrap">
          <div className="op-grid">
            {REVIEWS.map((r, i) => (
              <article key={r.author} className={`op-card fu d${(i % 4) + 2}`}>
                <div className="op-qmark" aria-hidden="true">&ldquo;</div>
                <blockquote className="op-bq">{r.text}</blockquote>
                <footer className="op-footer">
                  <div className="op-av" aria-hidden="true">{r.initial}</div>
                  <div>
                    <div className="op-aname">{r.author}</div>
                    <div className="op-src"><span className="op-fbdot" aria-hidden="true" />Facebook</div>
                  </div>
                </footer>
              </article>
            ))}

            {/* FB CTA card */}
            <div className="op-fbcard fu d6">
              <div className="op-fbh">Więcej opinii na Facebooku</div>
              <p className="op-fbs">
                Profil Pinky Party na Facebooku zawiera pełną listę rekomendacji od klientów.
                Możesz też zostawić własną opinię po współpracy z nami.
              </p>
              <a
                href="https://www.facebook.com/pinkyparty.eventy"
                target="_blank"
                rel="noopener noreferrer"
                className="op-fbbtn"
                aria-label="Odwiedź profil Pinky Party na Facebooku i przeczytaj wszystkie opinie"
              >
                <span>Facebook Pinky Party</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="op-wrap">
          <div className="op-cta fu d2">
            <div style={{ position: "relative", zIndex: 1 }}>
              <div className="op-ctatitle">Chcesz zarezerwować animacje?</div>
              <div className="op-ctasub">
                Skontaktuj się z Pinky Party i omów szczegóły swojego wydarzenia we Wrocławiu i okolicach.
              </div>
            </div>
            <div style={{ display: "flex", gap: ".875rem", flexWrap: "wrap", position: "relative", zIndex: 1 }}>
              <Link href="/kontakt" className="btn-p">Skontaktuj się →</Link>
              <Link href="/oferta" className="btn-g">Zobacz ofertę</Link>
            </div>
          </div>
        </div>

      </div>
      <SiteFooter />
    </>
  );
}
