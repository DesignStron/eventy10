"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";

interface OfferSection {
  key: string;
  category: string;
  categoryLabel?: string;
  title?: string;
  order_index?: number;
}

const STATIC_LINKS = [
  { href: "/", label: "Home" },
  { href: "/o-nas", label: "O nas" },
  { href: "/oferta", label: "Oferta", hasDropdown: true },
  { href: "/team-building", label: "TEAM BUILDING" },
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
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [offerSections, setOfferSections] = useState<OfferSection[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Pobierz oferty z Supabase - tabela "offer" - sortowanie po created_at
  useEffect(() => {
    async function fetchOffers() {
      const { data, error } = await supabase
        .from("offer")
        .select("key, category, title, category_label")
        .order("created_at", { ascending: true });

      if (data) {
        // Mapuj dane tak jak w oferta/page.tsx
        const mapped = data.map((item: any) => ({
          key: item.key,
          category: item.category || item.key,
          title: item.title,
          categoryLabel: item.category_label,
        }));
        setOfferSections(mapped);
        console.log("Pobrano oferty:", mapped);
      }
      if (error) {
        console.error("Błąd pobierania ofert:", error);
      }
    }
    fetchOffers();
  }, []);

  const applyTheme = (next: "dark" | "light") => {
    const root = document.documentElement;
    root.setAttribute("data-theme", next);
    root.classList.toggle("theme-light", next === "light");
    root.classList.toggle("theme-dark", next === "dark");

    document.body.setAttribute("data-theme", next);
    document.body.classList.toggle("theme-light", next === "light");
    document.body.classList.toggle("theme-dark", next === "dark");
  };

  useEffect(() => {
    setMounted(true);
    const saved = window.localStorage.getItem("theme");
    const next = saved === "light" ? "light" : "dark";
    setTheme(next);
    // Don't apply theme here - it's already applied by the script in layout.tsx
  }, []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next: "dark" | "light" = prev === "dark" ? "light" : "dark";
      applyTheme(next);
      window.localStorage.setItem("theme", next);
      return next;
    });
  };

  // Close on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close on outside click
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [mobileOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [dropdownOpen]);

  return (
    <>
      <style>{`
        :root {
          --pink: #f0177a;
          --pink-light: #ff4fa3;
          --pink-glow: rgba(240,23,122,0.35);
          --bg-dark: #060508;
          --surface: rgba(255,255,255,0.05);
          --border: rgba(255,255,255,0.08);
          --text-muted: rgba(255,255,255,0.5);
        }

        .header-root {
          position: sticky;
          top: 0;
          z-index: 100;
          transition: background 150ms ease, border-color 150ms ease, box-shadow 150ms ease;
        }
        .header-root.scrolled {
          background: rgba(6,5,8,0.92);
          border-bottom: 1px solid rgba(240,23,122,0.2);
          box-shadow: 0 1px 0 rgba(240,23,122,0.08), 0 8px 48px rgba(0,0,0,0.6);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        .header-root:not(.scrolled) {
          background: rgba(6,5,8,0.4);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .header-inner {
          max-width: 76rem;
          margin: 0 auto;
          padding: 0 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 4.5rem;
        }

        /* ── LOGO ── */
        .logo {
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-shrink: 0;
        }
        .logo-mark {
          width: 2.4rem;
          height: 2.4rem;
          border-radius: 0.6rem;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          flex-shrink: 0;
        }
        .logo-text-name {
          font-weight: 700;
          font-size: 1rem;
          color: #fff;
          line-height: 1.6;
          letter-spacing: -0.02em;
          padding: 2px 0;
        }
        .logo-text-sub {
          font-size: 0.6rem;
          color: var(--text-muted);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 500;
          line-height: 1.6;
        }

        /* ── DESKTOP NAV ── */
        .desktop-nav {
          display: none;
          align-items: center;
          gap: 0.25rem;
        }
        @media (min-width: 860px) {
          .desktop-nav { display: flex; }
          .mobile-btn { display: none; }
        }

        .theme-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2.6rem;
          height: 2.6rem;
          border-radius: 9999px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.85);
          cursor: pointer;
          transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;
        }
        .theme-btn:hover {
          transform: translateY(-1px);
          border-color: rgba(240,23,122,0.3);
          background: rgba(240,23,122,0.08);
        }
        .theme-btn:active { transform: translateY(0px) scale(0.98); }

        /* Light theme overrides */
        html[data-theme="light"] .header-root {
          background: rgba(255,255,255,0.92);
          border-bottom: 1px solid rgba(240,23,122,0.12);
          box-shadow: 0 1px 0 rgba(240,23,122,0.06), 0 4px 24px rgba(0,0,0,0.04);
        }
        html[data-theme="light"] .header-root:not(.scrolled) {
          background: rgba(255,255,255,0.85);
          border-bottom: 1px solid rgba(240,23,122,0.08);
        }
        html[data-theme="light"] .logo-text-name {
          color: var(--black);
        }
        html[data-theme="light"] .logo-text-sub {
          color: rgba(0,0,0,0.45);
        }
        html[data-theme="light"] .nav-link {
          color: rgba(0,0,0,0.7);
          border: 1px solid transparent;
        }
        html[data-theme="light"] .nav-link:hover {
          color: var(--pink);
          background: rgba(240,23,122,0.06);
          border-color: rgba(240,23,122,0.15);
        }
        html[data-theme="light"] .nav-link.active {
          color: var(--pink);
          background: rgba(240,23,122,0.1);
          border-color: rgba(240,23,122,0.25);
        }
        html[data-theme="light"] .cta-btn {
          background: var(--pink);
          color: #fff;
          border: 1px solid var(--pink);
          box-shadow: 0 4px 14px rgba(240,23,122,0.35);
        }
        html[data-theme="light"] .cta-btn:hover {
          background: var(--pink-light);
          border-color: var(--pink-light);
          box-shadow: 0 6px 20px rgba(240,23,122,0.5);
        }
        html[data-theme="light"] .theme-btn {
          background: rgba(0,0,0,0.04);
          border: 1px solid rgba(0,0,0,0.12);
          color: rgba(0,0,0,0.8);
        }
        html[data-theme="light"] .theme-btn:hover {
          border-color: rgba(240,23,122,0.3);
          background: rgba(240,23,122,0.08);
          color: var(--pink);
        }
        html[data-theme="light"] .hamburger .bar {
          background: var(--black);
        }
        html[data-theme="light"] .mobile-drawer {
          background: rgba(255,255,255,0.98);
          border: 1px solid rgba(0,0,0,0.08);
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
        }
        html[data-theme="light"] .drawer-title {
          color: var(--black);
        }
        html[data-theme="light"] .drawer-link {
          color: rgba(0,0,0,0.75);
        }
        html[data-theme="light"] .drawer-link:hover {
          color: var(--pink);
          background: rgba(240,23,122,0.06);
        }
        html[data-theme="light"] .drawer-link.active {
          color: var(--pink);
          background: rgba(240,23,122,0.1);
        }
        html[data-theme="light"] .drawer-link-label {
          color: inherit;
        }
        html[data-theme="light"] .drawer-close {
          color: rgba(0,0,0,0.6);
          border-color: rgba(0,0,0,0.15);
        }
        html[data-theme="light"] .drawer-close:hover {
          color: var(--pink);
          border-color: rgba(240,23,122,0.3);
        }

        .nav-link {
          padding: 0.45rem 1rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 500;
          text-decoration: none;
          transition: all 150ms ease;
          color: rgba(255,255,255,0.7);
          border: 1px solid transparent;
          letter-spacing: 0.01em;
          white-space: nowrap;
        }
        .nav-link:hover {
          background: rgba(255,255,255,0.08);
          color: #fff;
        }
        .nav-link.active {
          background: rgba(240,23,122,0.14);
          color: #ff4fa3;
          border-color: rgba(240,23,122,0.3);
          font-weight: 600;
        }

        /* ── RIGHT SIDE ── */
        .header-right {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        /* CTA button (desktop) */
        .cta-btn {
          display: none;
          padding: 0.45rem 1.1rem;
          border-radius: 9999px;
          font-size: 0.8rem;
          font-weight: 600;
          text-decoration: none;
          background: linear-gradient(135deg, #f0177a, #ff4fa3);
          color: #fff;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(240,23,122,0.4);
          letter-spacing: 0.02em;
          transition: all 150ms ease;
          white-space: nowrap;
        }
        .cta-btn:hover {
          box-shadow: 0 6px 24px rgba(240,23,122,0.6);
          transform: translateY(-1px);
        }
        @media (min-width: 768px) {
          .cta-btn { display: block; }
        }

        /* ── HAMBURGER ── */
        .hamburger {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          width: 2.4rem;
          height: 2.4rem;
          border-radius: 0.6rem;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          cursor: pointer;
          transition: all 150ms ease;
          flex-shrink: 0;
          padding: 0;
        }
        .hamburger:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(240,23,122,0.3);
        }
        .hamburger.open {
          background: rgba(240,23,122,0.12);
          border-color: rgba(240,23,122,0.4);
        }
        @media (min-width: 768px) {
          .hamburger { display: none; }
        }
        .bar {
          width: 16px;
          height: 1.5px;
          background: #fff;
          border-radius: 2px;
          transition: all 150ms cubic-bezier(0.16,1,0.3,1);
          transform-origin: center;
        }
        .hamburger.open .bar:nth-child(1) {
          transform: translateY(6.5px) rotate(45deg);
          background: var(--pink-light);
        }
        .hamburger.open .bar:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }
        .hamburger.open .bar:nth-child(3) {
          transform: translateY(-6.5px) rotate(-45deg);
          background: var(--pink-light);
        }

        /* ── MOBILE OVERLAY ── */
        .mobile-backdrop {
          position: fixed;
          inset: 0;
          z-index: 90;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          opacity: 0;
          pointer-events: none;
          transition: opacity 300ms ease;
        }
        .mobile-backdrop.open {
          opacity: 1;
          pointer-events: all;
        }

        /* ── MOBILE DRAWER ── */
        .mobile-drawer {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          z-index: 99;
          width: min(340px, 88vw);
          background: #0c0a10;
          border-left: 1px solid rgba(240,23,122,0.15);
          box-shadow: -16px 0 80px rgba(0,0,0,0.7);
          transform: translateX(100%);
          transition: transform 200ms cubic-bezier(0.16,1,0.3,1);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .mobile-drawer.open {
          transform: translateX(0);
        }

        /* drawer glow strip */
        .mobile-drawer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 2px;
          height: 100%;
          background: linear-gradient(180deg, transparent 0%, rgba(240,23,122,0.6) 30%, rgba(255,79,163,0.4) 70%, transparent 100%);
        }

        .drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .drawer-title {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .drawer-close {
          width: 2rem;
          height: 2rem;
          border-radius: 0.5rem;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: rgba(255,255,255,0.7);
          font-size: 1rem;
          transition: all 150ms ease;
        }
        .drawer-close:hover {
          background: rgba(240,23,122,0.15);
          border-color: rgba(240,23,122,0.4);
          color: #ff4fa3;
        }

        .drawer-nav {
          flex: 1;
          padding: 1rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          overflow-y: auto;
        }

        .drawer-link {
          display: flex;
          align-items: center;
          gap: 0.875rem;
          padding: 0.875rem 1rem;
          border-radius: 0.75rem;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          color: rgba(255,255,255,0.75);
          border: 1px solid transparent;
          transition: all 150ms ease;
          position: relative;
          overflow: hidden;
          transform: translateX(20px);
          opacity: 0;
          animation: slideIn 200ms cubic-bezier(0.16,1,0.3,1) forwards;
        }
        .drawer-link:hover {
          background: rgba(255,255,255,0.07);
          color: #fff;
          border-color: rgba(255,255,255,0.08);
        }
        .drawer-link.active {
          background: rgba(240,23,122,0.12);
          color: #ff4fa3;
          border-color: rgba(240,23,122,0.25);
          font-weight: 600;
        }
        .drawer-link.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 60%;
          border-radius: 0 2px 2px 0;
          background: var(--pink);
        }
        .drawer-icon {
          width: 2rem;
          height: 2rem;
          border-radius: 0.5rem;
          background: rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 150ms ease;
          overflow: hidden;
        }
        .drawer-icon img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .drawer-link.active .drawer-icon {
          background: rgba(240,23,122,0.2);
        }
        .drawer-link-label { flex: 1; }
        .drawer-arrow {
          font-size: 0.7rem;
          opacity: 0.3;
          transition: all 150ms ease;
        }
        .drawer-link:hover .drawer-arrow,
        .drawer-link.active .drawer-arrow { opacity: 0.7; transform: translateX(2px); }

        @keyframes slideIn {
          to { transform: translateX(0); opacity: 1; }
        }

        .drawer-footer {
          padding: 1rem 1rem 1.5rem;
          border-top: 1px solid rgba(255,255,255,0.06);
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .drawer-cta {
          display: block;
          padding: 0.875rem 1rem;
          border-radius: 0.75rem;
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 700;
          text-align: center;
          background: linear-gradient(135deg, #f0177a, #ff4fa3);
          color: #fff;
          box-shadow: 0 4px 20px rgba(240,23,122,0.4);
          letter-spacing: 0.02em;
          transition: all 150ms ease;
        }
        .drawer-cta:hover { box-shadow: 0 6px 28px rgba(240,23,122,0.6); }
        .drawer-admin {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.625rem 1rem;
          border-radius: 0.75rem;
          text-decoration: none;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.02);
          transition: all 150ms ease;
        }
        .drawer-admin:hover { color: rgba(255,255,255,0.5); border-color: rgba(255,255,255,0.1); }
        .dot { width: 5px; height: 5px; border-radius: 50%; background: var(--pink); flex-shrink: 0; }

        /* ── DROPDOWN ── */
        .nav-item-dropdown {
          position: relative;
        }
        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          margin-top: 0.5rem;
          min-width: 220px;
          background: rgba(6,5,8,0.95);
          border: 1px solid rgba(240,23,122,0.2);
          border-radius: 1rem;
          padding: 0.5rem;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
          backdrop-filter: blur(20px);
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 200ms cubic-bezier(0.16,1,0.3,1);
          z-index: 200;
        }
        .dropdown-menu.open {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        html[data-theme="light"] .dropdown-menu {
          background: rgba(255,255,255,0.98);
          border-color: rgba(240,23,122,0.15);
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
        }
        .dropdown-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 500;
          color: rgba(255,255,255,0.8);
          transition: all 150ms ease;
          white-space: nowrap;
        }
        .dropdown-link:hover {
          background: rgba(240,23,122,0.1);
          color: #ff4fa3;
        }
        html[data-theme="light"] .dropdown-link {
          color: rgba(0,0,0,0.75);
        }
        html[data-theme="light"] .dropdown-link:hover {
          color: var(--pink);
        }
        .dropdown-icon {
          width: 1.5rem;
          height: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* ── MOBILE DROPDOWN ── */
        .mobile-dropdown-toggle {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 0.875rem 1rem;
          border-radius: 0.75rem;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          color: rgba(255,255,255,0.75);
          border: 1px solid transparent;
          transition: all 150ms ease;
          background: transparent;
          cursor: pointer;
        }
        .mobile-dropdown-toggle:hover {
          background: rgba(255,255,255,0.07);
          color: #fff;
          border-color: rgba(255,255,255,0.08);
        }
        .mobile-dropdown-toggle.active {
          background: rgba(240,23,122,0.12);
          color: #ff4fa3;
          border-color: rgba(240,23,122,0.25);
          font-weight: 600;
        }
        html[data-theme="light"] .mobile-dropdown-toggle {
          color: rgba(0,0,0,0.75);
        }
        html[data-theme="light"] .mobile-dropdown-toggle:hover {
          color: var(--pink);
          background: rgba(240,23,122,0.06);
        }
        html[data-theme="light"] .mobile-dropdown-toggle.active {
          color: var(--pink);
          background: rgba(240,23,122,0.1);
        }
        .mobile-dropdown-icon {
          width: 2rem;
          height: 2rem;
          border-radius: 0.5rem;
          background: rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .mobile-dropdown-toggle.active .mobile-dropdown-icon {
          background: rgba(240,23,122,0.2);
        }
        .mobile-dropdown-chevron {
          transition: transform 200ms ease;
        }
        .mobile-dropdown-chevron.open {
          transform: rotate(180deg);
        }
        .mobile-dropdown-menu {
          max-height: 0;
          overflow: hidden;
          transition: max-height 300ms cubic-bezier(0.16,1,0.3,1);
          margin-left: 2.5rem;
        }
        .mobile-dropdown-menu.open {
          max-height: 500px;
        }
        .mobile-dropdown-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.6rem 1rem;
          border-radius: 0.5rem;
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 500;
          color: rgba(255,255,255,0.6);
          transition: all 150ms ease;
        }
        .mobile-dropdown-link:hover {
          color: #ff4fa3;
          background: rgba(240,23,122,0.08);
        }
        html[data-theme="light"] .mobile-dropdown-link {
          color: rgba(0,0,0,0.6);
        }
        html[data-theme="light"] .mobile-dropdown-link:hover {
          color: var(--pink);
        }
      `}</style>

      {/* Backdrop */}
      <div
        className={`mobile-backdrop${mobileOpen ? " open" : ""}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Drawer */}
      <div ref={menuRef} className={`mobile-drawer${mobileOpen ? " open" : ""}`}>
        <div className="drawer-header">
          <span className="drawer-title">Nawigacja</span>
          <button className="drawer-close" onClick={() => setMobileOpen(false)}>✕</button>
        </div>

        <nav className="drawer-nav">
          {STATIC_LINKS.map((item, i) => {
            const active = isActivePath(pathname, item.href);
            
            // Dropdown dla Oferta w mobile
            if ('hasDropdown' in item && item.hasDropdown) {
              return (
                <div key={item.href} style={{ animationDelay: `${i * 50 + 60}ms` }}>
                  <button
                    onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                    className={`mobile-dropdown-toggle${active ? " active" : ""}`}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                      <span className="mobile-dropdown-icon">
                        <img src="/Plyta_raster_lowres.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </span>
                      <span>{item.label}</span>
                    </div>
                    <svg 
                      width="12" 
                      height="12" 
                      viewBox="0 0 12 12" 
                      fill="none" 
                      className={`mobile-dropdown-chevron${mobileDropdownOpen ? " open" : ""}`}
                    >
                      <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <div className={`mobile-dropdown-menu${mobileDropdownOpen ? " open" : ""}`}>
                    {offerSections.map((section) => (
                      <Link
                        key={section.key}
                        href={`/oferta#${section.key}`}
                        className="mobile-dropdown-link"
                        onClick={() => {
                          setMobileDropdownOpen(false);
                          setMobileOpen(false);
                        }}
                      >
                        {section.title || section.categoryLabel || section.category}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`drawer-link${active ? " active" : ""}`}
                style={{ animationDelay: `${i * 50 + 60}ms` }}
                onClick={() => setMobileOpen(false)}
              >
                <span className="drawer-icon">
                  <img src="/Plyta_raster_lowres.png" alt="" />
                </span>
                <span className="drawer-link-label">{item.label}</span>
                <span className="drawer-arrow">›</span>
              </Link>
            );
          })}
        </nav>

        <div className="drawer-footer">
          <Link href="/kontakt" className="drawer-cta">Skontaktuj się</Link>
          <Link href="/admin" className="drawer-admin">
            <span className="dot" />
            Panel Admina
          </Link>
        </div>
      </div>

      {/* Main Header */}
      <header className={`header-root${scrolled ? " scrolled" : ""}`}>
        <div className="header-inner">
          {/* Logo */}
          <Link href="/" className="logo">
            <div className="logo-mark">
              <img 
                src="/Plyta_raster_lowres.png" 
                alt="Pinky Party Logo" 
                style={{ width: "100%", height: "100%", objectFit: "cover", aspectRatio: "16/9" }}
              />
            </div>
            <div className="logo-text">
              <div className="logo-text-name" style={{ lineHeight: 1.4, padding: '2px 0' }}>Pinky Party</div>
              <div className="logo-text-sub" style={{ lineHeight: 1.4 }}>Animacje & Eventy</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="desktop-nav">
            {STATIC_LINKS.map((item) => {
              const active = isActivePath(pathname, item.href);
              
              // Dropdown dla Oferta
              if ('hasDropdown' in item && item.hasDropdown) {
                return (
                  <div key={item.href} className="nav-item-dropdown" ref={dropdownRef}>
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className={`nav-link${active ? " active" : ""}`}
                      style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "transparent", cursor: "pointer" }}
                    >
                      {item.label}
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: dropdownOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 200ms" }}>
                        <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <div className={`dropdown-menu${dropdownOpen ? " open" : ""}`}>
                      {offerSections.map((section) => (
                        <Link
                          key={section.key}
                          href={`/oferta#${section.key}`}
                          className="dropdown-link"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <span className="dropdown-icon">
                            <img src="/Plyta_raster_lowres.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          </span>
                          {section.title || section.categoryLabel || section.category}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link${active ? " active" : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            className="theme-btn"
            onClick={toggleTheme}
            aria-label={mounted && theme === "dark" ? "Włącz jasny motyw" : "Włącz ciemny motyw"}
            title={mounted && theme === "dark" ? "Jasny motyw" : "Ciemny motyw"}
          >
            {mounted && theme === "dark" ? "☀" : "☾"}
          </button>

          {/* Right */}
          <div className="header-right">
            <Link href="/kontakt" className="cta-btn">Skontaktuj się</Link>
            <button
              className={`hamburger${mobileOpen ? " open" : ""}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Otwórz menu"
              aria-expanded={mobileOpen}
            >
              <span className="bar" />
              <span className="bar" />
              <span className="bar" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}