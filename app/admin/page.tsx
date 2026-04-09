"use client";

import { useEffect, useState } from "react";

import AdminShell from "@/components/admin/admin-shell";
import type { ContactData, GalleryData, OfferData } from "@/lib/types";

export default function AdminHomePage() {
  const [offer, setOffer] = useState<OfferData | null>(null);
  const [gallery, setGallery] = useState<GalleryData | null>(null);
  const [contact, setContact] = useState<ContactData | null>(null);
  const [music, setMusic] = useState<any>(null);

  useEffect(() => {
    void (async () => {
      const [o, g, c, m] = await Promise.all([
        fetch("/api/oferta").then((r) => r.json()),
        fetch("/api/galeria").then((r) => r.json()),
        fetch("/api/kontakt").then((r) => r.json()),
        fetch("/api/oprawa-muzyczna").then((r) => r.json()),
      ]);
      setOffer(o as OfferData);
      setGallery(g as GalleryData);
      setContact(c as ContactData);
      setMusic(m);
    })();
  }, []);

  const stats = [
    { label: "Oferta", value: offer ? offer.sections.length : null, sub: "sekcje do edycji", href: "/admin/oferta", icon: "✦" },
    { label: "Oprawa muzyczna", value: music ? music.services.length : null, sub: "usługi do edycji", href: "/admin/oprawa-muzyczna", icon: "" },
    { label: "Galeria", value: gallery ? gallery.images.length : null, sub: "zdjęcia", href: "/admin/galeria", icon: "◻" },
    { label: "Formularze", value: contact ? contact.messages.length : null, sub: "zgłoszenia", href: "/admin/kontakt", icon: "◎" },
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
            <div className="dash-stat-value">{s.value ?? "…"}</div>
            <div className="dash-stat-sub">{s.sub}</div>
          </a>
        ))}
      </div>

    </AdminShell>
  );
}