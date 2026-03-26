import ContactForm from "@/components/contact-form";

export const metadata = {
  title: "Kontakt",
};

export default function ContactPage() {
  return (
    <div className="page-bg noise">
      <div style={{ maxWidth: "75rem", margin: "0 auto", padding: "3rem 1rem 4rem" }} className="sm:px-1.5rem sm:py-20">
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem", alignItems: "start" }} className="md:grid-cols-2 md:gap-16">

          {/* Left */}
          <div className="animate-slide-left">
            <div className="badge badge-pink animate-slide-left" style={{ marginBottom: "1rem" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--pink)", display: "inline-block" }} className="sm:w-2 sm:h-2" />
              Kontakt
            </div>
            <h1 className="heading-xl animate-slide-left" style={{ color: "#fff", marginBottom: "1rem", fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
              Napisz do nas —{" "}
              <span style={{ color: "var(--pink-light)" }}>wrócimy z wyceną</span>
            </h1>
            <p className="animate-slide-left sm:text-base" style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", lineHeight: 1.75, marginBottom: "2rem" }}>
              Opisz krótko typ wydarzenia, termin i liczbę uczestników.
              Odpiszemy w ciągu24 godzin z konkretną propozycją.
            </p>

            {/* Contact info card */}
            <div
              style={{
                borderRadius: "1.5rem",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "1.5rem",
                marginBottom: "1rem",
              }}
              className="sm:p-8 sm:mb-6"
            >
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "#fff", fontSize: "0.9rem", marginBottom: "1rem" }} className="sm:text-lg sm:mb-6">
                Dane kontaktowe
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }} className="sm:gap-4">
                {[
                  { icon: "📞", label: "Telefon", value: "+48 000 000 000" },
                  { icon: "✉️", label: "Email", value: "kontakt@rozowyevent.pl" },
                  { icon: "📍", label: "Obszar działania", value: "Warszawa i okolice" },
                  { icon: "⏰", label: "Godziny kontaktu", value: "Pn–Pt, 9:00–18:00" },
                ].map((item) => (
                  <div key={item.label} style={{ display: "flex", gap: "0.75rem", alignItems: "center" }} className="sm:gap-4">
                    <div style={{ width: "2.25rem", height: "2.25rem", borderRadius: "0.75rem", background: "rgba(240,23,122,0.12)", border: "1px solid rgba(240,23,122,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", flexShrink: 0 }} className="sm:w-12 sm:h-12 sm:rounded-xl sm:text-xl">
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "0.1rem" }} className="sm:text-xs">{item.label}</div>
                      <div style={{ fontSize: "0.85rem", fontWeight: 500, color: "rgba(255,255,255,0.85)" }} className="sm:text-base">{item.value}</div>
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
                padding: "0.6rem 1rem",
                borderRadius: "9999px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.6)",
                fontSize: "0.75rem",
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 200ms",
              }}
              className="hover-lift hover:text-pink-400 sm:px-5 sm:py-3 sm:text-sm"
            >
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--pink)" }} className="sm:w-2 sm:h-2" />
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