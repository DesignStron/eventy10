"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const NAV_ITEMS = [
  { href: "/", label: "Start" },
  { href: "/o-nas", label: "O nas" },
  { href: "/oferta", label: "Oferta" },
  { href: "/galeria", label: "Galeria" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setMobileOpen(false), 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          transition: "all 300ms ease",
          background: scrolled
            ? "rgba(6,5,8,0.88)"
            : "rgba(6,5,8,0.5)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: scrolled
            ? "1px solid rgba(240,23,122,0.18)"
            : "1px solid rgba(255,255,255,0.06)",
          boxShadow: scrolled ? "0 8px 40px rgba(0,0,0,0.5)" : "none",
        }}
      >
        <div
          style={{
            maxWidth: "75rem",
            margin: "0 auto",
            padding: "0 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "4.5rem",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <div
              style={{
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
                boxShadow: "0 4px 20px rgba(240,23,122,0.5)",
                flexShrink: 0,
              }}
            >
              RE
            </div>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1.05rem",
                  color: "#fff",
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                }}
              >
                Różowy Event
              </div>
              <div
                style={{
                  fontSize: "0.65rem",
                  color: "rgba(255,255,255,0.45)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                }}
              >
                Organizacja imprez
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: "0.25rem" }} className="hidden md:flex">
            {NAV_ITEMS.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "9999px",
                    fontSize: "0.875rem",
                    fontWeight: active ? 600 : 500,
                    textDecoration: "none",
                    transition: "all 200ms ease",
                    background: active
                      ? "rgba(240,23,122,0.15)"
                      : "transparent",
                    color: active ? "#ff4fa3" : "rgba(255,255,255,0.75)",
                    border: active
                      ? "1px solid rgba(240,23,122,0.3)"
                      : "1px solid transparent",
                    letterSpacing: "0.01em",
                  }}
                  className={
                    active
                      ? ""
                      : "hover:bg-white/10 hover:text-white"
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Link
              href="/admin"
              style={{
                padding: "0.4rem 0.9rem",
                borderRadius: "9999px",
                fontSize: "0.75rem",
                fontWeight: 600,
                textDecoration: "none",
                color: "rgba(255,255,255,0.5)",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "transparent",
                transition: "all 200ms ease",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
              className="hidden md:inline-flex items-center hover:text-pink-400 hover:border-pink-400/40"
            >
              Admin
            </Link>

            <Link href="/kontakt" className="btn-pink" style={{ height: "2.5rem", padding: "0 1.25rem", fontSize: "0.8rem" }}>
              Skontaktuj się
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden"
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "0.75rem",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
                cursor: "pointer",
                transition: "all 200ms ease",
              }}
              aria-label="Menu"
            >
              <span style={{ width: "18px", height: "2px", background: mobileOpen ? "var(--pink)" : "#fff", borderRadius: "2px", transition: "all 200ms ease", transform: mobileOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
              <span style={{ width: "18px", height: "2px", background: mobileOpen ? "transparent" : "#fff", borderRadius: "2px", transition: "all 200ms ease", opacity: mobileOpen ? 0 : 1 }} />
              <span style={{ width: "18px", height: "2px", background: mobileOpen ? "var(--pink)" : "#fff", borderRadius: "2px", transition: "all 200ms ease", transform: mobileOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          style={{
            maxHeight: mobileOpen ? "400px" : "0",
            overflow: "hidden",
            transition: "max-height 350ms cubic-bezier(0.16,1,0.3,1)",
            borderTop: mobileOpen ? "1px solid rgba(240,23,122,0.12)" : "none",
          }}
          className="md:hidden"
        >
          <div style={{ padding: "1rem 1.5rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.375rem" }}>
            {NAV_ITEMS.map((item, i) => {
              const active = isActivePath(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    padding: "0.875rem 1.25rem",
                    borderRadius: "1rem",
                    fontSize: "0.925rem",
                    fontWeight: active ? 700 : 500,
                    textDecoration: "none",
                    background: active ? "rgba(240,23,122,0.15)" : "rgba(255,255,255,0.04)",
                    color: active ? "#ff4fa3" : "rgba(255,255,255,0.85)",
                    border: active ? "1px solid rgba(240,23,122,0.3)" : "1px solid rgba(255,255,255,0.07)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    animationDelay: `${i * 40}ms`,
                  }}
                  className="animate-fade-up"
                >
                  {item.label}
                  <span style={{ opacity: 0.4, fontSize: "1rem" }}>→</span>
                </Link>
              );
            })}
            <Link
              href="/admin"
              style={{
                padding: "0.875rem 1.25rem",
                borderRadius: "1rem",
                fontSize: "0.8rem",
                fontWeight: 600,
                textDecoration: "none",
                background: "rgba(255,255,255,0.03)",
                color: "rgba(255,255,255,0.45)",
                border: "1px solid rgba(255,255,255,0.07)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--pink)", display: "inline-block" }} />
              Panel Admina
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}