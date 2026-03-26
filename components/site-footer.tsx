import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/o-nas", label: "O nas" },
  { href: "/oferta", label: "Oferta" },
  { href: "/galeria", label: "Galeria" },
  { href: "/kontakt", label: "Kontakt" },
  { href: "/admin", label: "Panel admina" },
] as const;

export default function SiteFooter() {
  return (
    <footer
      style={{
        background: "#060508",
        borderTop: "1px solid rgba(240,23,122,0.14)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow top */}
      <div style={{
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "50%",
        height: "1px",
        background: "linear-gradient(90deg, transparent, var(--pink), transparent)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "75rem", margin: "0 auto", padding: "4rem 1.5rem 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "3rem", marginBottom: "3rem" }} className="grid-cols-1 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", textDecoration: "none", marginBottom: "1.25rem" }}>
              <div style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "0.75rem",
                background: "linear-gradient(135deg, #f0177a, #ff4fa3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "0.95rem",
                color: "#fff",
                boxShadow: "0 4px 20px rgba(240,23,122,0.4)",
                flexShrink: 0,
              }}>
                RE
              </div>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", color: "#fff" }}>
                Różowy Event
              </span>
            </Link>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem", lineHeight: 1.75, maxWidth: "22rem", marginBottom: "1.5rem" }}>
              Organizujemy wydarzenia z energią i klasą — od urodzin dla dzieci, po eventy szkolne i imprezy firmowe.
            </p>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              padding: "0.5rem 1rem",
              borderRadius: "9999px",
              background: "rgba(240,23,122,0.1)",
              border: "1px solid rgba(240,23,122,0.2)",
            }}>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--pink)", boxShadow: "0 0 8px var(--pink)" }} />
              <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--pink-light)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                Demo projektu
              </span>
            </div>
          </div>

          {/* Links */}
          <div>
            <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "1.25rem" }}>
              Nawigacja
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
              {FOOTER_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  style={{
                    color: "rgba(255,255,255,0.55)",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                    padding: "0.375rem 0",
                    transition: "color 180ms ease",
                    fontWeight: 500,
                  }}
                  className="hover:text-pink-400"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "1.25rem" }}>
              Kontakt
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                { label: "Telefon", value: "+48 000 000 000" },
                { label: "Email", value: "kontakt@rozowyevent.pl" },
                { label: "Obszar", value: "Warszawa i okolice" },
              ].map((c) => (
                <div key={c.label}>
                  <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", fontWeight: 600, marginBottom: "0.1rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{c.label}</div>
                  <div style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>{c.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "1.75rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
          <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.3)" }}>
            © {new Date().getFullYear()} Różowy Event. Wszelkie prawa zastrzeżone.
          </div>
          <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-mono)" }}>
            Next.js App Router · Demo
          </div>
        </div>
      </div>
    </footer>
  );
}