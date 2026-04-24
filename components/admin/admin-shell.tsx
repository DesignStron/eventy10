"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV = [
  { href: "/admin", label: "Pulpit", icon: "◈" },
  { href: "/admin/oferta", label: "Oferta", icon: "✦" },
  { href: "/admin/galeria", label: "Galeria", icon: "◻" },
  { href: "/admin/ustawienia", label: "Ustawienia", icon: "⚙" },
  { href: "/admin/kontakt", label: "Kontakt", icon: "" },
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
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div style={{ background: "var(--surface)", minHeight: "100vh" }}>
      <style>{`
        .as-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }
        .as-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.3rem 0.875rem;
          border-radius: 9999px;
          background: rgba(240,23,122,0.1);
          border: 1px solid rgba(240,23,122,0.2);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #ff4fa3;
          margin-bottom: 0.75rem;
        }
        .as-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #f0177a;
          box-shadow: 0 0 6px #f0177a;
        }
        .as-page-title {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text);
          letter-spacing: -0.02em;
          margin: 0;
        }
        .as-page-desc {
          margin-top: 0.375rem;
          font-size: 0.8rem;
          color: var(--text-secondary);
          line-height: 1.65;
          max-width: 36rem;
        }
        .as-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.5rem 1.1rem;
          border-radius: 9999px;
          background: var(--surface);
          border: 1px solid var(--border);
          color: var(--text-secondary);
          font-size: 0.8rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 200ms ease;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .as-back-btn:hover {
          background: rgba(240,23,122,0.08);
          border-color: rgba(240,23,122,0.3);
          color: var(--pink);
        }

        /* mobile nav toggle */
        .as-mobile-toggle {
          display: none;
          align-items: center;
          justify-content: center;
          width: 2.25rem;
          height: 2.25rem;
          border-radius: 0.625rem;
          background: var(--surface);
          border: 1px solid var(--border);
          color: var(--text-secondary);
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 200ms ease;
          flex-shrink: 0;
        }
        @media (max-width: 767px) {
          .as-mobile-toggle { display: flex; }
        }

        /* layout */
        .as-body {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 1.25rem;
          align-items: start;
        }
        @media (max-width: 767px) {
          .as-body { grid-template-columns: 1fr; }
          .as-sidebar { display: none; }
          .as-sidebar.open { display: block; }
        }

        /* sidebar */
        .as-sidebar {
          border-radius: 1.25rem;
          background: var(--surface-elevated);
          border: 1px solid var(--border);
          padding: 0.875rem;
          position: sticky;
          top: 6rem;
        }
        .as-nav-label {
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-muted);
          padding: 0.25rem 0.5rem;
          margin-bottom: 0.5rem;
        }
        .as-nav-link {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          padding: 0.625rem 0.875rem;
          border-radius: 0.75rem;
          font-size: 0.825rem;
          font-weight: 500;
          text-decoration: none;
          transition: all 180ms ease;
          color: var(--text-secondary);
          border: 1px solid transparent;
          margin-bottom: 0.2rem;
        }
        .as-nav-link:hover {
          background: var(--surface-elevated);
          color: var(--text);
        }
        .as-nav-link.active {
          background: rgba(240,23,122,0.12);
          border-color: rgba(240,23,122,0.25);
          color: var(--pink-light);
          font-weight: 700;
        }
        .as-nav-icon {
          font-size: 0.875rem;
          flex-shrink: 0;
          opacity: 0.7;
        }
        .as-nav-link.active .as-nav-icon { opacity: 1; }
        .as-nav-arrow {
          margin-left: auto;
          font-size: 0.7rem;
          opacity: 0.4;
        }
      `}</style>

      <div style={{ maxWidth: "75rem", margin: "0 auto", padding: "2.5rem 1.5rem" }}>

        {/* ── TOP BAR ── */}
        <div className="as-topbar">
          <div>
            <div className="as-badge">
              <span className="as-dot" />
              Panel admina
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <h1 className="as-page-title">{title}</h1>
              {/* mobile nav toggle */}
              <button
                className="as-mobile-toggle"
                onClick={() => setMobileNavOpen((v) => !v)}
                aria-label="Menu nawigacji"
              >
                {mobileNavOpen ? "✕" : "☰"}
              </button>
            </div>
            {description && <p className="as-page-desc">{description}</p>}
          </div>

          <Link href="/" className="as-back-btn">
            ← Wróć do strony
          </Link>
        </div>

        {/* ── BODY ── */}
        <div className="as-body">

          {/* Sidebar */}
          <aside className={`as-sidebar${mobileNavOpen ? " open" : ""}`}>
            <div className="as-nav-label">Nawigacja</div>
            <nav>
              {NAV.map((n) => {
                const active = isActive(pathname, n.href);
                return (
                  <Link
                    key={n.href}
                    href={n.href}
                    className={`as-nav-link${active ? " active" : ""}`}
                    onClick={() => setMobileNavOpen(false)}
                  >
                    <span className="as-nav-icon">{n.icon}</span>
                    {n.label}
                    {active && <span className="as-nav-arrow">›</span>}
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Content */}
          <div style={{ minWidth: 0 }}>{children}</div>
        </div>
      </div>
    </div>
  );
}