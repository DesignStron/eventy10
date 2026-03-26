export default function Home() {
  return (
    <div className="page-bg noise">
      {/* ─── HERO ──────────────────────────────────────────────────── */}
      <section
        style={{
          maxWidth: "75rem",
          margin: "0 auto",
          padding: "6rem 1.5rem 4rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "center",
        }}
        className="md:grid-cols-2"
      >
        {/* Left */}
        <div>
          <div className="badge badge-pink animate-fade-up" style={{ marginBottom: "1.5rem" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--pink)", display: "inline-block", animation: "pulsePink 2s ease-in-out infinite" }} />
            Energia + Profesjonalizm
          </div>

          <h1
            className="heading-xl animate-fade-up delay-100"
            style={{ color: "#fff", marginBottom: "1.5rem" }}
          >
            Organizujemy imprezy,{" "}
            <span
              style={{
                background: "linear-gradient(135deg, var(--pink-light) 0%, #fff 60%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
              }}
            >
              które zostają w pamięci
            </span>
          </h1>

          <p
            className="animate-fade-up delay-200"
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: "1.0625rem",
              lineHeight: 1.75,
              maxWidth: "30rem",
              marginBottom: "2.25rem",
            }}
          >
            Różowy Event to nowoczesna agencja eventowa — tworzymy niezapomniane urodziny dla dzieci,
            eventy szkolne i imprezy firmowe. Kompleksowo: scenariusz, atrakcje, prowadzenie i oprawa.
          </p>

          <div
            className="animate-fade-up delay-300"
            style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap", marginBottom: "3rem" }}
          >
            <a href="/kontakt" className="btn-pink">
              Zarezerwuj termin
              <span style={{ marginLeft: "0.5rem" }}>→</span>
            </a>
            <a href="/oferta" className="btn-outline">
              Poznaj ofertę
            </a>
          </div>

          {/* Stats */}
          <div
            className="animate-fade-up delay-400"
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.875rem" }}
          >
            {[
              { num: "250+", label: "eventów", sub: "zrealizowanych" },
              { num: "5 ★", label: "opinie", sub: "średnia klientów" },
              { num: "24h", label: "wycena", sub: "szybka odpowiedź" },
            ].map((s) => (
              <div key={s.label} className="stat-box" style={{ textAlign: "center" }}>
                <div className="counter-num" style={{ fontSize: "1.75rem" }}>{s.num}</div>
                <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "#fff", marginTop: "0.2rem" }}>{s.label}</div>
                <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.4)", marginTop: "0.1rem" }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — hero image */}
        <div className="animate-scale-in delay-200" style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              inset: "-2rem",
              borderRadius: "3rem",
              background: "radial-gradient(ellipse at center, rgba(240,23,122,0.2) 0%, transparent 70%)",
              filter: "blur(30px)",
              zIndex: 0,
            }}
          />
          <div
            style={{
              position: "relative",
              borderRadius: "2rem",
              overflow: "hidden",
              aspectRatio: "4/3",
              border: "1px solid rgba(240,23,122,0.2)",
              boxShadow: "0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
              zIndex: 1,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundImage: "url(https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1400&q=80)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="img-overlay" />
            {/* Bottom label */}
            <div
              style={{
                position: "absolute",
                bottom: "1.25rem",
                left: "1.25rem",
                right: "1.25rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <div
                style={{
                  background: "rgba(6,5,8,0.75)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(240,23,122,0.25)",
                  borderRadius: "1rem",
                  padding: "0.75rem 1rem",
                  flex: 1,
                }}
              >
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#ff4fa3", marginBottom: "0.25rem" }}>Ostatni event</div>
                <div style={{ fontSize: "0.875rem", color: "#fff", fontWeight: 500 }}>Urodziny Zosi — 50 dzieci 🎉</div>
              </div>
            </div>
          </div>

          {/* Floating card */}
          <div
            className="animate-floaty"
            style={{
              position: "absolute",
              top: "-1.5rem",
              right: "-2rem",
              background: "rgba(13,11,16,0.85)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(240,23,122,0.25)",
              borderRadius: "1.25rem",
              padding: "1rem 1.25rem",
              boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
              zIndex: 2,
              minWidth: "160px",
            }}
          >
            <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>Kompleksowo</div>
            {["Scenariusz", "Atrakcje", "Prowadzenie", "Dekoracje"].map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--pink)", flexShrink: 0 }} />
                <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TICKER ──────────────────────────────────────────────────── */}
      <div
        style={{
          borderTop: "1px solid rgba(240,23,122,0.12)",
          borderBottom: "1px solid rgba(240,23,122,0.12)",
          padding: "1rem 0",
          overflow: "hidden",
          background: "rgba(240,23,122,0.04)",
        }}
      >
        <div className="marquee-inner" style={{ display: "inline-flex", gap: "4rem", whiteSpace: "nowrap" }}>
          {Array(6).fill(["🎂 Urodziny dla dzieci", "🏫 Eventy szkolne", "🏢 Imprezy firmowe", "🎉 Animacje", "🎤 Prowadzenie", "🎨 Dekoracje", "⚡ Kompleksowa obsługa"]).flat().map((item, i) => (
            <span
              key={i}
              style={{
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: i % 7 === 0 ? "var(--pink-light)" : "rgba(255,255,255,0.45)",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ─── OFFER CARDS ─────────────────────────────────────────────── */}
      <section style={{ maxWidth: "75rem", margin: "0 auto", padding: "5rem 1.5rem" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "2rem", marginBottom: "3rem", flexWrap: "wrap" }}>
          <div>
            <div className="badge badge-dark" style={{ marginBottom: "1rem" }}>Nasza oferta</div>
            <h2 className="heading-lg" style={{ color: "#fff" }}>
              3 specjalizacje —{" "}
              <span style={{ color: "var(--pink-light)" }}>1 zespół</span>
            </h2>
          </div>
          <a
            href="/oferta"
            style={{
              padding: "0.75rem 1.5rem",
              borderRadius: "9999px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.7)",
              fontSize: "0.875rem",
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 200ms",
              whiteSpace: "nowrap",
            }}
          >
            Pełna oferta →
          </a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }} className="grid-cols-1 md:grid-cols-3">
          {[
            {
              tag: "Dla dzieci",
              icon: "🎂",
              title: "Urodziny dla dzieci",
              desc: "Animacje, gry, bańki, mini-dyskoteka, konkursy i dekoracje. Program dopasowany do wieku i wybranego motywu.",
              href: "/oferta#urodziny",
              accent: true,
            },
            {
              tag: "Dla szkół",
              icon: "🏫",
              title: "Eventy szkolne",
              desc: "Dni dziecka, festyny, bale, zakończenia roku. Scena, konkursy, prowadzenie i pełna oprawa techniczna.",
              href: "/oferta#szkolne",
            },
            {
              tag: "Dla biznesu",
              icon: "🏢",
              title: "Imprezy firmowe",
              desc: "Integracje, premiery, jubileusze i eventy wizerunkowe. Koordynacja od A do Z, scenariusz i profesjonalna obsługa.",
              href: "/oferta#firmowe",
            },
          ].map((card) => (
            <a
              key={card.title}
              href={card.href}
              className="card-dark"
              style={{
                display: "block",
                borderRadius: "1.5rem",
                padding: "2rem",
                textDecoration: "none",
                position: "relative",
                overflow: "hidden",
                background: card.accent
                  ? "linear-gradient(135deg, rgba(240,23,122,0.12) 0%, rgba(255,255,255,0.03) 100%)"
                  : undefined,
                border: card.accent
                  ? "1px solid rgba(240,23,122,0.25)"
                  : undefined,
              }}
            >
              {card.accent && (
                <div style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "120px",
                  height: "120px",
                  background: "radial-gradient(circle, rgba(240,23,122,0.2), transparent 70%)",
                  filter: "blur(20px)",
                }} />
              )}
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{card.icon}</div>
              <div className="pill pill-pink" style={{ marginBottom: "1rem" }}>{card.tag}</div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: "0.75rem",
                  lineHeight: 1.25,
                }}
              >
                {card.title}
              </h3>
              <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                {card.desc}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--pink-light)", fontSize: "0.875rem", fontWeight: 700 }}>
                Zobacz szczegóły <span>→</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ─── WHY US SECTION ──────────────────────────────────────────── */}
      <section
        style={{
          maxWidth: "75rem",
          margin: "0 auto",
          padding: "0 1.5rem 5rem",
        }}
      >
        <div
          style={{
            borderRadius: "2.5rem",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            padding: "4rem",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
          }}
          className="md:grid-cols-2 px-6 py-10"
        >
          <div>
            <div className="badge badge-pink" style={{ marginBottom: "1.25rem" }}>Dlaczego my?</div>
            <h2 className="heading-lg" style={{ color: "#fff", marginBottom: "1.5rem" }}>
              Każdy event to{" "}
              <span style={{ color: "var(--pink-light)" }}>wyjątkowe przeżycie</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.75, fontSize: "0.95rem", marginBottom: "2rem" }}>
              Łączymy kreatywność z perfekcyjną organizacją. Nie tylko dostarczamy atrakcje —
              projektujemy pełne doświadczenia, które goście zapamiętują na długo.
            </p>
            <a href="/o-nas" className="btn-pink">
              Dowiedz się więcej
            </a>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {[
              { icon: "⚡", title: "Dynamika", desc: "Energetyczne prowadzenie i animacje, które wciągają wszystkich." },
              { icon: "🎯", title: "Precyzja", desc: "Każdy detail zaplanowany. Zero stresu po Twojej stronie." },
              { icon: "🎨", title: "Kreatywność", desc: "Unikalne scenariusze dopasowane do Twojego eventu." },
              { icon: "🤝", title: "Kompleksowość", desc: "Od pomysłu do realizacji — jedne ręce, jedna odpowiedzialność." },
            ].map((f) => (
              <div
                key={f.title}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "1.25rem",
                  padding: "1.5rem",
                  transition: "all 220ms",
                }}
                className="hover-lift"
              >
                <div style={{ fontSize: "1.75rem", marginBottom: "0.75rem" }}>{f.icon}</div>
                <div style={{ fontWeight: 700, color: "#fff", fontSize: "0.925rem", marginBottom: "0.4rem" }}>{f.title}</div>
                <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ──────────────────────────────────────────────── */}
      <section style={{ maxWidth: "75rem", margin: "0 auto", padding: "0 1.5rem 7rem" }}>
        <div
          style={{
            borderRadius: "2.5rem",
            background: "linear-gradient(135deg, #f0177a 0%, #c0075a 40%, #7d0040 100%)",
            padding: "4rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative circles */}
          <div style={{ position: "absolute", top: "-4rem", right: "-4rem", width: "18rem", height: "18rem", borderRadius: "50%", background: "rgba(255,255,255,0.06)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "-3rem", left: "-3rem", width: "14rem", height: "14rem", borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />

          <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "3rem", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", marginBottom: "0.75rem" }}>
                Gotowy na wyjątkowy event?
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                  fontWeight: 700,
                  color: "#fff",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  marginBottom: "1rem",
                }}
              >
                Masz termin? Zarezerwujmy go od razu.
              </h2>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.95rem", maxWidth: "32rem", lineHeight: 1.7 }}>
                Napisz do nas — wrócimy z propozycją scenariusza i wyceną w ciągu 24h.
              </p>
            </div>
            <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap", flexShrink: 0 }}>
              <a
                href="/kontakt"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  height: "3rem",
                  padding: "0 1.75rem",
                  borderRadius: "9999px",
                  background: "#fff",
                  color: "#c0075a",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  textDecoration: "none",
                  transition: "transform 180ms ease, box-shadow 180ms ease",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
                }}
                className="hover-lift"
              >
                Wyślij zapytanie →
              </a>
              <a
                href="/galeria"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  height: "3rem",
                  padding: "0 1.75rem",
                  borderRadius: "9999px",
                  border: "1.5px solid rgba(255,255,255,0.35)",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  textDecoration: "none",
                  transition: "background 180ms, border-color 180ms",
                }}
                className="hover:bg-white/10"
              >
                Zobacz galerię
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}