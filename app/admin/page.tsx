"use client";

import { useEffect, useState } from "react";

import AdminShell from "@/components/admin/admin-shell";
import type { ContactData, GalleryData, OfferData } from "@/lib/types";

export default function AdminHomePage() {
  const [offer, setOffer] = useState<OfferData | null>(null);
  const [gallery, setGallery] = useState<GalleryData | null>(null);
  const [contact, setContact] = useState<ContactData | null>(null);
  const [music, setMusic] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      try {
        const [o, g, c] = await Promise.all([
          fetch("/api/oferta").then((r) => r.ok ? r.json() : null).catch(() => null),
          fetch("/api/galeria").then((r) => r.ok ? r.json() : null).catch(() => null),
          fetch("/api/kontakt").then((r) => r.ok ? r.json() : null).catch(() => null),
        ]);
        setOffer(o);
        setGallery(g);
        setContact(c);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const stats = [
    { label: "Oferta", value: offer?.sections?.length ?? null, sub: "sekcje do edycji", href: "/admin/oferta", icon: "✦" },
    { label: "Galeria", value: gallery?.images?.length ?? null, sub: "zdjęcia", href: "/admin/galeria", icon: "◻" },
    { label: "Formularze", value: contact?.messages?.length ?? null, sub: "zgłoszenia", href: "/admin/kontakt", icon: "◎" },
  ];

  return (
    <AdminShell
      title="Pulpit"
      description="Zarządzaj treścią strony. Przejdź do sekcji, aby edytować dane."
    >
      <style>{`
        .dash-stat {
          display: block;
          padding: 1.5rem;
          border-radius: 1.25rem;
          background: var(--surface-elevated);
          border: 1px solid var(--border);
          text-decoration: none;
          transition: all 200ms ease;
        }
        .dash-stat:hover {
          background: rgba(240,23,122,0.07);
          border-color: rgba(240,23,122,0.25);
          transform: translateY(-2px);
        }
        .dash-stat-icon {
          font-size: 1rem;
          color: rgba(240,23,122,0.7);
          margin-bottom: 1rem;
        }
        .dash-stat-label {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 0.5rem;
        }
        .dash-stat-value {
          font-size: 2rem;
          font-weight: 700;
          color: var(--text);
          line-height: 1;
          font-family: var(--font-display);
        }
        .dash-stat-sub {
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin-top: 0.35rem;
        }
      `}</style>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem" }}>
        {stats.map((s) => (
          <a key={s.href} href={s.href} className="dash-stat">
            <div className="dash-stat-icon">{s.icon}</div>
            <div className="dash-stat-label">{s.label}</div>
            <div className="dash-stat-value">{loading ? "…" : (s.value ?? "-")}</div>
            <div className="dash-stat-sub">{s.sub}</div>
          </a>
        ))}
      </div>

    </AdminShell>
  );
}