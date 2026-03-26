"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/admin", label: "Pulpit", icon: "📊" },
  { href: "/admin/oferta", label: "Oferta", icon: "📋" },
  { href: "/admin/galeria", label: "Galeria", icon: "🖼️" },
  { href: "/admin/wiadomosci", label: "Formularze", icon: "✉️" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function AdminShell({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div style={{ background: "#f5f3f8", minHeight: "100vh" }}>
      <div style={{ maxWidth: "75rem", margin: "0 auto", padding: "2.5rem 1.5rem" }}>

        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "2rem", marginBottom: "2.5rem", flexWrap: "wrap" }}>
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.375rem 0.875rem",
                borderRadius: "9999px",
                background: "rgba(240,23,122,0.1)",
                border: "1px solid rgba(240,23,122,0.2)",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#c0075a",
                marginBottom: "0.875rem",
              }}
            >
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#f0177a", boxShadow: "0 0 6px #f0177a" }} />
              Panel admina · Demo
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                fontWeight: 700,
                color: "#060508",
                lineHeight: 1.15,
                letterSpacing: "-0.015em",
              }}
            >
              {title}
            </h1>
            {description && (
              <p style={{ marginTop: "0.5rem", fontSize: "0.875rem", color: "rgba(6,5,8,0.55)", lineHeight: 1.65, maxWidth: "38rem" }}>
                {description}
              </p>
            )}
          </div>

          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.625rem 1.25rem",
              borderRadius: "9999px",
              background: "#fff",
              border: "1.5px solid rgba(0,0,0,0.08)",
              color: "#060508",
              fontSize: "0.825rem",
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 200ms",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
            className="hover:border-pink-400 hover:text-pink-500"
          >
            ← Wróć do strony
          </Link>
        </div>

        {/* Body */}
        <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "1.5rem", alignItems: "start" }} className="md:grid-cols-[220px_1fr]">

          {/* Sidebar */}
          <aside
            style={{
              borderRadius: "1.5rem",
              background: "#fff",
              border: "1px solid rgba(0,0,0,0.07)",
              padding: "1rem",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
              position: "sticky",
              top: "6rem",
            }}
          >
            <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(6,5,8,0.35)", padding: "0.25rem 0.5rem", marginBottom: "0.5rem" }}>
              Nawigacja
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              {NAV.map((n) => {
                const active = isActive(pathname, n.href);
                return (
                  <Link
                    key={n.href}
                    href={n.href}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "0.75rem 1rem",
                      borderRadius: "0.875rem",
                      fontSize: "0.875rem",
                      fontWeight: active ? 700 : 500,
                      textDecoration: "none",
                      transition: "all 180ms ease",
                      background: active ? "#060508" : "transparent",
                      color: active ? "#fff" : "rgba(6,5,8,0.65)",
                      border: active ? "none" : "1px solid transparent",
                    }}
                    className={
                      active
                        ? ""
                        : "hover:bg-pink-500/10 hover:text-pink-500 hover:border-pink-500/15"
                    }
                  >
                    <span style={{ fontSize: "1rem" }}>{n.icon}</span>
                    {n.label}
                    {active && <span style={{ marginLeft: "auto", opacity: 0.5, fontSize: "0.75rem" }}>→</span>}
                  </Link>
                );
              })}
            </div>

            <div
              style={{
                marginTop: "1rem",
                padding: "0.875rem 1rem",
                borderRadius: "0.875rem",
                background: "rgba(240,23,122,0.07)",
                border: "1px solid rgba(240,23,122,0.15)",
                fontSize: "0.75rem",
                color: "rgba(6,5,8,0.55)",
                lineHeight: 1.6,
              }}
            >
              💾 Dane zapisywane lokalnie (JSON). Zmiany widoczne na stronie publicznej.
            </div>
          </aside>

          {/* Content */}
          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </div>
  );
}