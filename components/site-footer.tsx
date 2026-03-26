import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Start" },
  { href: "/o-nas", label: "O nas" },
  { href: "/oferta", label: "Oferta" },
  { href: "/galeria", label: "Galeria" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

const SERVICES = [
  "Urodziny dla dzieci",
  "Eventy szkolne",
  "Imprezy firmowe",
  "Animacje i prowadzenie",
  "Dekoracje",
] as const;

const CONTACT = [
  { label: "Telefon", value: "+48 000 000 000", href: "tel:+48000000000" },
  { label: "Email", value: "kontakt@rozowyevent.pl", href: "mailto:kontakt@rozowyevent.pl" },
  { label: "Obszar", value: "Warszawa i okolice", href: null },
] as const;

export default function SiteFooter() {
  return (
    <footer
      style={{
        background: "#07050a",
        borderTop: "1px solid rgba(240,23,122,0.12)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        .footer-glow {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 60%;
          height: 1px;
          background: linear-gradient(90deg, transparent, #f0177a 40%, #ff4fa3 60%, transparent);
          pointer-events: none;
        }
        .footer-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(80px);
        }
        .footer-inner {
          max-width: 76rem;
          margin: 0 auto;
          padding: 4rem 1.5rem 0;
          position: relative;
          z-index: 1;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          margin-bottom: 3rem;
        }
        @media (min-width: 640px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .footer-grid {
            grid-template-columns: 2fr 1fr 1fr 1.2fr;
            gap: 3rem;
          }
        }
        .footer-col-title {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.28);
          margin-bottom: 1.25rem;
        }
        .footer-link {
          display: block;
          color: rgba(255,255,255,0.55);
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 500;
          padding: 0.3rem 0;
          transition: color 180ms ease;
          line-height: 1.5;
        }
        .footer-link:hover {
          color: #ff4fa3;
        }
        .footer-contact-item {
          margin-bottom: 1rem;
        }
        .footer-contact-label {
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          margin-bottom: 0.2rem;
        }
        .footer-contact-value {
          font-size: 0.875rem;
          color: rgba(255,255,255,0.65);
          font-weight: 500;
          text-decoration: none;
          transition: color 180ms ease;
          display: block;
        }
        a.footer-contact-value:hover {
          color: #ff4fa3;
        }
        .footer-divider {
          border: none;
          border-top: 1px solid rgba(255,255,255,0.06);
          margin: 0;
        }
        .footer-bottom {
          max-width: 76rem;
          margin: 0 auto;
          padding: 1.5rem 1.5rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }
        .footer-badge-live {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0.875rem;
          border-radius: 9999px;
          background: rgba(240,23,122,0.1);
          border: 1px solid rgba(240,23,122,0.22);
          margin-top: 1.25rem;
        }
        .footer-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #f0177a;
          box-shadow: 0 0 6px #f0177a;
          animation: pulsePink 2s ease-in-out infinite;
        }
        .footer-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border-radius: 9999px;
          background: linear-gradient(135deg, #f0177a, #ff4fa3);
          color: #fff;
          font-size: 0.875rem;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 0 4px 20px rgba(240,23,122,0.4);
          transition: all 200ms ease;
          white-space: nowrap;
          margin-top: 1.5rem;
        }
        .footer-cta-btn:hover {
          box-shadow: 0 6px 28px rgba(240,23,122,0.6);
          transform: translateY(-1px);
        }
        .footer-logo-mark {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 0.625rem;
          background: linear-gradient(135deg, #f0177a, #ff4fa3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          font-size: 0.8rem;
          color: #fff;
          box-shadow: 0 4px 24px rgba(240,23,122,0.5), inset 0 1px 0 rgba(255,255,255,0.2);
          flex-shrink: 0;
          letter-spacing: 0.02em;
        }
      `}</style>

      {/* Decorative glow line at top */}
      <div className="footer-glow" />

      {/* Ambient orbs */}
      <div
        className="footer-orb"
        style={{
          width: "400px",
          height: "400px",
          left: "-100px",
          top: "-100px",
          background: "rgba(240,23,122,0.06)",
        }}
      />
      <div
        className="footer-orb"
        style={{
          width: "300px",
          height: "300px",
          right: "-50px",
          bottom: "0",
          background: "rgba(240,23,122,0.04)",
        }}
      />

      <div className="footer-inner">
        <div className="footer-grid">

          {/* ── BRAND COLUMN ── */}
          <div>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                textDecoration: "none",
                marginBottom: "1.25rem",
              }}
            >
              <div className="footer-logo-mark">RE</div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    color: "#fff",
                    lineHeight: 1.2,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Różowy Event
                </div>
                <div
                  style={{
                    fontSize: "0.6rem",
                    color: "rgba(255,255,255,0.38)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    marginTop: "0.1rem",
                  }}
                >
                  Organizacja imprez
                </div>
              </div>
            </Link>

            <p
              style={{
                color: "rgba(255,255,255,0.45)",
                fontSize: "0.875rem",
                lineHeight: 1.8,
                maxWidth: "22rem",
              }}
            >
              Tworzymy niezapomniane wydarzenia z energią i klasą —
              od urodzin dla dzieci, po eventy szkolne i imprezy firmowe.
            </p>

            <div className="footer-badge-live">
              <span className="footer-badge-dot" />
              <span
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  color: "#ff4fa3",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                Demo projektu
              </span>
            </div>

            <div>
              <Link href="/kontakt" className="footer-cta-btn">
                Zarezerwuj termin
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* ── NAVIGATION ── */}
          <div>
            <div className="footer-col-title">Nawigacja</div>
            <nav style={{ display: "flex", flexDirection: "column" }}>
              {NAV_LINKS.map((l) => (
                <Link key={l.href} href={l.href} className="footer-link">
                  {l.label}
                </Link>
              ))}
              <Link href="/admin" className="footer-link" style={{ marginTop: "0.5rem", color: "rgba(255,255,255,0.3)" }}>
                Panel admina
              </Link>
            </nav>
          </div>

          {/* ── SERVICES ── */}
          <div>
            <div className="footer-col-title">Usługi</div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {SERVICES.map((s) => (
                <span
                  key={s}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.3rem 0",
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    lineHeight: 1.5,
                  }}
                >
                  <span
                    style={{
                      width: "4px",
                      height: "4px",
                      borderRadius: "50%",
                      background: "rgba(240,23,122,0.6)",
                      flexShrink: 0,
                    }}
                  />
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* ── CONTACT ── */}
          <div>
            <div className="footer-col-title">Kontakt</div>
            {CONTACT.map((c) => (
              <div key={c.label} className="footer-contact-item">
                <div className="footer-contact-label">{c.label}</div>
                {c.href ? (
                  <a href={c.href} className="footer-contact-value">
                    {c.value}
                  </a>
                ) : (
                  <span className="footer-contact-value">{c.value}</span>
                )}
              </div>
            ))}

            {/* Response time badge */}
            <div
              style={{
                marginTop: "1.25rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 0.875rem",
                borderRadius: "0.75rem",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <span style={{ fontSize: "1rem" }}>⚡</span>
              <div>
                <div
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    color: "#ff4fa3",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  Szybka odpowiedź
                </div>
                <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)" }}>
                  Wycena w&nbsp;24h
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="footer-divider" />

      <div className="footer-bottom">
        <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.28)" }}>
          © {new Date().getFullYear()} Różowy Event. Wszelkie prawa zastrzeżone.
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.375rem",
            fontSize: "0.72rem",
            color: "rgba(255,255,255,0.2)",
            fontFamily: "var(--font-mono)",
          }}
        >
          <span
            style={{
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: "rgba(240,23,122,0.5)",
              display: "inline-block",
            }}
          />
          Next.js · App Router · Demo
        </div>
      </div>
    </footer>
  );
}