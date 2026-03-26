"use client";

import { useEffect, useState } from "react";

import AdminShell from "@/components/admin/admin-shell";
import type { ContactData, GalleryData, OfferData } from "@/lib/types";

export default function AdminHomePage() {
  const [offer, setOffer] = useState<OfferData | null>(null);
  const [gallery, setGallery] = useState<GalleryData | null>(null);
  const [contact, setContact] = useState<ContactData | null>(null);

  useEffect(() => {
    void (async () => {
      const [o, g, c] = await Promise.all([
        fetch("/api/oferta").then((r) => r.json()),
        fetch("/api/galeria").then((r) => r.json()),
        fetch("/api/kontakt").then((r) => r.json()),
      ]);

      setOffer(o as OfferData);
      setGallery(g as GalleryData);
      setContact(c as ContactData);
    })();
  }, []);

  return (
    <AdminShell
      title="Pulpit"
      description="Podgląd danych demo: oferta, galeria i formularze kontaktowe. Przejdź do sekcji po lewej, żeby edytować treści."
    >
      <div className="grid gap-4 md:grid-cols-3">
        <a
          href="/admin/oferta"
          className="rounded-3xl bg-white p-6 ring-1 ring-black/10 transition-colors hover:bg-pink-500/5"
        >
          <div className="text-xs font-semibold text-black/60">Oferta</div>
          <div className="mt-2 text-2xl font-semibold text-black">
            {offer ? offer.sections.length : "…"}
          </div>
          <div className="mt-1 text-sm text-black/70">sekcje do edycji</div>
        </a>

        <a
          href="/admin/galeria"
          className="rounded-3xl bg-white p-6 ring-1 ring-black/10 transition-colors hover:bg-pink-500/5"
        >
          <div className="text-xs font-semibold text-black/60">Galeria</div>
          <div className="mt-2 text-2xl font-semibold text-black">
            {gallery ? gallery.images.length : "…"}
          </div>
          <div className="mt-1 text-sm text-black/70">zdjęcia</div>
        </a>

        <a
          href="/admin/wiadomosci"
          className="rounded-3xl bg-white p-6 ring-1 ring-black/10 transition-colors hover:bg-pink-500/5"
        >
          <div className="text-xs font-semibold text-black/60">Formularze</div>
          <div className="mt-2 text-2xl font-semibold text-black">
            {contact ? contact.messages.length : "…"}
          </div>
          <div className="mt-1 text-sm text-black/70">zgłoszenia</div>
        </a>
      </div>

      <div className="mt-6 rounded-3xl bg-black px-6 py-8 text-white">
        <div className="text-lg font-semibold">Tip</div>
        <div className="mt-2 text-sm leading-6 text-white/80">
          To wersja demo bez autoryzacji. Dane zapisują się lokalnie w folderze
          <span className="mx-1 rounded-md bg-white/10 px-2 py-1 font-mono text-xs">
            data/
          </span>
          i możesz je łatwo podmienić lub podpiąć pod prawdziwą bazę.
        </div>
      </div>
    </AdminShell>
  );
}
