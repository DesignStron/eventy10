import Image from "next/image";

export const metadata = {
  title: "O nas",
};

export default function AboutPage() {
  return (
    <div className="page-bg noise">
      <div style={{ maxWidth: "75rem", margin: "0 auto", padding: "5rem 1.5rem 6rem" }}>

        {/* Header */}
        <div style={{ maxWidth: "52rem", marginBottom: "5rem" }}>
          <div className="badge badge-pink animate-fade-up" style={{ marginBottom: "1.5rem" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--pink)", display: "inline-block" }} />
            Poznaj nas bliżej
          </div>
          <h1 className="heading-xl animate-fade-up delay-100" style={{ color: "#fff", marginBottom: "1.5rem" }}>
            Łączymy kreatywność z{" "}
            <span style={{ color: "var(--pink-light)" }}>perfekcją</span>
          </h1>
          <p className="animate-fade-up delay-200" style={{ color: "rgba(255,255,255,0.62)", fontSize: "1.0625rem", lineHeight: 1.75 }}>
            Różowy Event to zespół, który kocha dobrą energię, ale jeszcze bardziej kocha
            dopięte na ostatni guzik szczegóły. Projektujemy wydarzenia od koncepcji po realizację.
          </p>
        </div>

        {/* Main grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center", marginBottom: "5rem" }} className="md:grid-cols-2">
          <div className="animate-slide-left">
            <div
              style={{
                borderRadius: "2rem",
                overflow: "hidden",
                position: "relative",
                aspectRatio: "4/3",
                boxShadow: "0 40px 100px rgba(0,0,0,0.6)",
                border: "1px solid rgba(240,23,122,0.18)",
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1400&q=80"
                alt="Zespół Różowy Event"
                fill
                className="object-cover"
                priority
              />
              <div className="img-overlay" />
              <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem" }}>
                <div className="badge badge-pink">Nasz zespół w akcji</div>
              </div>
            </div>
          </div>

          <div className="animate-slide-right" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div
              className="card-dark"
              style={{ borderRadius: "1.5rem", padding: "2rem" }}
            >
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "#fff", fontSize: "1.125rem", marginBottom: "0.75rem" }}>
                Jak pracujemy
              </h3>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem", lineHeight: 1.75 }}>
                Zbieramy potrzeby, proponujemy scenariusz, dobieramy atrakcje i planujemy harmonogram.
                W dniu eventu koordynujemy wszystko na miejscu — Ty tylko cieszysz się imprezą.
              </p>
            </div>

            <div
              className="card-dark"
              style={{ borderRadius: "1.5rem", padding: "2rem" }}
            >
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "#fff", fontSize: "1.125rem", marginBottom: "1rem" }}>
                Co nas wyróżnia
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.625rem" }}>
                {["Dynamiczne prowadzenie", "Nowoczesna oprawa", "Dopasowanie do grupy", "Sprawna logistyka"].map((item) => (
                  <div
                    key={item}
                    style={{
                      padding: "0.75rem 1rem",
                      borderRadius: "0.875rem",
                      background: "rgba(240,23,122,0.1)",
                      border: "1px solid rgba(240,23,122,0.2)",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.8)",
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.875rem" }}>
              <a href="/oferta" className="btn-pink">
                Zobacz ofertę
              </a>
              <a href="/kontakt" className="btn-outline">
                Umów konsultację
              </a>
            </div>
          </div>
        </div>

        {/* Numbers row */}
        <div
          style={{
            borderRadius: "2rem",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            padding: "3rem",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "2rem",
          }}
          className="grid-cols-2 md:grid-cols-4"
        >
          {[
            { num: "250+", label: "Zrealizowanych eventów" },
            { num: "5 ★", label: "Średnia ocen klientów" },
            { num: "6 lat", label: "Doświadczenia" },
            { num: "24h", label: "Czas odpowiedzi" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div className="counter-num">{s.num}</div>
              <div style={{ fontSize: "0.825rem", color: "rgba(255,255,255,0.5)", marginTop: "0.5rem", lineHeight: 1.4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}