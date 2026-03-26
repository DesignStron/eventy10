"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import AdminShell from "@/components/admin/admin-shell";
import type { GalleryData, OfferKey } from "@/lib/types";

type CreateState = {
  title: string;
  url: string;
  category: OfferKey | "inne";
};

export default function AdminGalleryPage() {
  const [data, setData] = useState<GalleryData | null>(null);
  const [form, setForm] = useState<CreateState>({
    title: "",
    url: "",
    category: "inne",
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      const res = await fetch("/api/galeria");
      const json = (await res.json()) as GalleryData;
      setData(json);
    })();
  }, []);

  const canAdd = useMemo(() => {
    return form.title.trim() && form.url.trim();
  }, [form]);

  async function addImage() {
    setError(null);

    if (!canAdd) {
      setError("Uzupełnij tytuł i URL zdjęcia.");
      return;
    }

    setBusy(true);

    try {
      const res = await fetch("/api/galeria", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const json = (await res.json()) as GalleryData;

      if (!res.ok) {
        setError("Nie udało się dodać zdjęcia.");
        return;
      }

      setData(json);
      setForm({ title: "", url: "", category: "inne" });
    } catch {
      setError("Błąd połączenia.");
    } finally {
      setBusy(false);
    }
  }

  async function removeImage(id: string) {
    setError(null);
    setBusy(true);

    try {
      const res = await fetch(`/api/galeria?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });

      const json = (await res.json()) as GalleryData;

      if (!res.ok) {
        setError("Nie udało się usunąć zdjęcia.");
        return;
      }

      setData(json);
    } catch {
      setError("Błąd połączenia.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AdminShell
      title="Zarządzanie galerią"
      description="Dodawaj i usuwaj zdjęcia. Galeria publiczna (/galeria) korzysta z tych samych danych." 
    >
      <div className="grid gap-6">
        <div className="rounded-3xl bg-white p-6 ring-1 ring-black/10">
          <div className="text-sm font-semibold text-black">Dodaj zdjęcie</div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-black">
              Tytuł
              <input
                value={form.title}
                onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
                className="h-12 rounded-2xl border border-black/10 bg-white px-4 text-sm text-black outline-none ring-pink-500/30 focus:ring-4"
                placeholder="np. Mini disco i bańki"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-black">
              Kategoria
              <select
                value={form.category}
                onChange={(e) =>
                  setForm((s) => ({
                    ...s,
                    category: e.target.value as CreateState["category"],
                  }))
                }
                className="h-12 rounded-2xl border border-black/10 bg-white px-4 text-sm text-black outline-none ring-pink-500/30 focus:ring-4"
              >
                <option value="urodziny">Urodziny</option>
                <option value="szkolne">Szkolne</option>
                <option value="firmowe">Firmowe</option>
                <option value="inne">Inne</option>
              </select>
            </label>

            <label className="grid gap-2 text-sm font-medium text-black md:col-span-2">
              URL zdjęcia
              <input
                value={form.url}
                onChange={(e) => setForm((s) => ({ ...s, url: e.target.value }))}
                className="h-12 rounded-2xl border border-black/10 bg-white px-4 text-sm text-black outline-none ring-pink-500/30 focus:ring-4"
                placeholder="https://images.unsplash.com/..."
              />
            </label>
          </div>

          {error ? (
            <div className="mt-4 rounded-2xl bg-black px-4 py-3 text-sm font-medium text-white">
              {error}
            </div>
          ) : null}

          <div className="mt-5 flex items-center justify-end">
            <button
              onClick={addImage}
              disabled={busy}
              className="inline-flex h-11 items-center justify-center rounded-full bg-pink-500 px-6 text-sm font-semibold text-white shadow-sm shadow-pink-500/30 transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {busy ? "Przetwarzanie…" : "Dodaj"}
            </button>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 ring-1 ring-black/10">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-sm font-semibold text-black">Lista zdjęć</div>
              <div className="mt-1 text-sm text-black/70">
                {data ? `${data.images.length} elementów` : "Wczytywanie…"}
              </div>
            </div>
            <a
              href="/galeria"
              className="inline-flex h-11 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-black ring-1 ring-black/10 transition-colors hover:bg-pink-500/10"
            >
              Podgląd publiczny
            </a>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data?.images.map((img) => (
              <div
                key={img.id}
                className="overflow-hidden rounded-3xl bg-white ring-1 ring-black/10"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={img.url}
                    alt={img.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <div className="text-sm font-semibold text-black">{img.title}</div>
                  <div className="mt-1 text-xs text-black/60">ID: {img.id}</div>
                  <button
                    onClick={() => removeImage(img.id)}
                    disabled={busy}
                    className="mt-3 inline-flex h-10 w-full items-center justify-center rounded-2xl bg-black px-4 text-sm font-semibold text-white transition-colors hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Usuń
                  </button>
                </div>
              </div>
            ))}
          </div>

          {data && data.images.length === 0 ? (
            <div className="mt-6 rounded-3xl bg-pink-500/5 p-8 text-center">
              <div className="text-sm font-semibold text-black">Brak zdjęć</div>
              <div className="mt-2 text-sm text-black/70">
                Dodaj pierwsze zdjęcie powyżej.
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </AdminShell>
  );
}
