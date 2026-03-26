import Image from "next/image";

export const metadata = {
  title: "O nas",
};

export default function AboutPage() {
  return (
    <div className="page-bg noise">
      <div style={{ maxWidth: "75rem", margin: "0 auto", padding: "3rem 1rem 4rem" }} className="sm:px-1.5rem sm:py-20">

        {/* Header */}
        <div style={{ maxWidth: "48rem", marginBottom: "3rem" }} className="sm:mb-20">
          <div className="badge badge-pink animate-fade-up" style={{ marginBottom: "1rem" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--pink)", display: "inline-block" }} className="sm:w-2 sm:h-2" />
            Poznaj nas bliżej
          </div>
          <h1 className="heading-xl animate-fade-up delay-100" style={{ color: "#fff", marginBottom: "1rem", fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
            Łączymy kreatywność{" "}
            <span style={{ color: "var(--pink-light)" }}>perfekcją</span>
          </h1>
          <p className="animate-fade-up delay-200 sm:text-base" style={{ color: "rgba(255,255,255,0.62)", fontSize: "0.9rem", lineHeight: 1.75 }}>
            Różowy Event to zespół, który kocha dobrą energię, ale jeszcze bardziej kocha
            dopięte na ostatni guzik szczegóły. Projektujemy wydarzenia od koncepcji po realizację.
          </p>
        </div>

        {/* Main grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem", alignItems: "center", marginBottom: "3rem" }} className="md:grid-cols-2 md:gap-16 md:mb-20">
          <div className="animate-slide-left">
            <div
              style={{
                borderRadius: "1.5rem",
                overflow: "hidden",
                position: "relative",
                aspectRatio: "4/3",
                boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
                border: "1px solid rgba(240,23,122,0.18)",
              }}
              className="sm:rounded-2xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1400&q=80"
                alt="Zespół Różowy Event"
                fill
                className="object-cover"
                priority
              />
              <div className="img-overlay" />
              <div style={{ position: "absolute", bottom: "1rem", left: "1rem" }} className="sm:bottom-6 sm:left-6">
                <div className="badge badge-pink">Nasz zespół w akcji</div>
              </div>
            </div>
          </div>

          <div className="animate-slide-right sm:gap-6" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div
              className="card-dark sm:p-8"
              style={{ borderRadius: "1.5rem", padding: "1.5rem" }}
            >
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "#fff", fontSize: "1rem", marginBottom: "0.75rem" }} className="sm:text-xl sm:mb-4">
                Jak pracujemy
              </h3>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8rem", lineHeight: 1.75 }} className="sm:text-base">
                Zbieramy potrzeby, proponujemy scenariusz, dobieramy atrakcje i planujemy harmonogram.
                W dniu eventu koordynujemy wszystko na miejscu — Ty tylko cieszysz się imprezą.
              </p>
            </div>

            <div
              className="card-dark sm:p-8"
              style={{ borderRadius: "1.5rem", padding: "1.5rem" }}
            >
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "#fff", fontSize: "1rem", marginBottom: "0.75rem" }} className="sm:text-xl sm:mb-4">
                Co nas wyróżnia
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0.5rem" }} className="sm:grid-cols-2 sm:gap-2">
                {["Dynamiczne prowadzenie", "Nowoczesna oprawa", "Dopasowanie do grupy", "Sprawna logistyka"].map((item) => (
                  <div
                    key={item}
                    style={{
                      padding: "0.6rem 0.8rem",
                      borderRadius: "0.75rem",
                      background: "rgba(240,23,122,0.1)",
                      border: "1px solid rgba(240,23,122,0.2)",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.8)",
                    }}
                    className="sm:p-4 sm:rounded-xl sm:text-sm"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.75rem" }} className="sm:gap-4">
              <a href="/oferta" className="btn-pink">Zobacz ofertę</a>
              <a href="/kontakt" className="btn-outline">Umów konsultację</a>
            </div>
          </div>
        </div>

        {/* Numbers row */}
        <div
          style={{
            borderRadius: "1.5rem",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            padding: "2rem",
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1.5rem",
          }}
          className="sm:rounded-2xl sm:p-8 sm:grid-cols-4 sm:gap-8"
        >
          {[
            { num: "250+", label: "Zrealizowanych eventów" },
            { num: "5 ★", label: "Średnia ocen klientów" },
            { num: "6 lat", label: "Doświadczenia" },
            { num: "24h", label: "Czas odpowiedzi" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div className="counter-num" style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}>{s.num}</div>
              <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", marginTop: "0.5rem", lineHeight: 1.4 }} className="sm:text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}