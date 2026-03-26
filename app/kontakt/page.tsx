import ContactForm from "@/components/contact-form";

export const metadata = {
  title: "Kontakt",
};

export default function ContactPage() {
  return (
    <div className="page-bg noise">
      <div style={{ maxWidth: "75rem", margin: "0 auto", padding: "5rem 1.5rem 6rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }} className="md:grid-cols-2">

          {/* Left */}
          <div className="animate-slide-left">
            <div className="badge badge-pink" style={{ marginBottom: "1.5rem" }}>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--pink)", display: "inline-block" }} />
              Kontakt
            </div>
            <h1 className="heading-xl" style={{ color: "#fff", marginBottom: "1.5rem" }}>
              Napisz do nas —{" "}
              <span style={{ color: "var(--pink-light)" }}>wrócimy z wyceną</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem", lineHeight: 1.75, marginBottom: "2.5rem" }}>
              Opisz krótko typ wydarzenia, termin i liczbę uczestników.
              Odpiszemy w ciągu 24 godzin z konkretną propozycją.
            </p>

            {/* Contact info card */}
            <div
              style={{
                borderRadius: "1.5rem",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "2rem",
                marginBottom: "1.25rem",
              }}
            >
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "#fff", fontSize: "1rem", marginBottom: "1.5rem" }}>
                Dane kontaktowe
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.125rem" }}>
                {[
                  { icon: "📞", label: "Telefon", value: "+48 000 000 000" },
                  { icon: "✉️", label: "Email", value: "kontakt@rozowyevent.pl" },
                  { icon: "📍", label: "Obszar działania", value: "Warszawa i okolice" },
                  { icon: "⏰", label: "Godziny kontaktu", value: "Pn–Pt, 9:00–18:00" },
                ].map((item) => (
                  <div key={item.label} style={{ display: "flex", gap: "0.875rem", alignItems: "center" }}>
                    <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "0.75rem", background: "rgba(240,23,122,0.12)", border: "1px solid rgba(240,23,122,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "0.1rem" }}>{item.label}</div>
                      <div style={{ fontSize: "0.9rem", fontWeight: 500, color: "rgba(255,255,255,0.85)" }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="/admin/wiadomosci"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.25rem",
                borderRadius: "9999px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.6)",
                fontSize: "0.825rem",
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 200ms",
              }}
              className="hover-lift hover:text-pink-400"
            >
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--pink)" }} />
              Podgląd wiadomości (panel admina)
            </a>
          </div>

          {/* Right — form */}
          <div className="animate-slide-right">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}