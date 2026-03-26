"use client";

import { useEffect, useMemo, useState } from "react";

import AdminShell from "@/components/admin/admin-shell";
import type { OfferData, OfferKey, OfferSection } from "@/lib/types";

type SaveState =
  | { state: "idle" }
  | { state: "saving" }
  | { state: "saved"; at: string }
  | { state: "error"; message: string };

function labelForKey(key: OfferKey) {
  if (key === "urodziny") return "Urodziny";
  if (key === "szkolne") return "Szkolne";
  return "Firmowe";
}

export default function AdminOfferPage() {
  const [data, setData] = useState<OfferData | null>(null);
  const [save, setSave] = useState<SaveState>({ state: "idle" });

  useEffect(() => {
    void (async () => {
      const res = await fetch("/api/oferta");
      const json = (await res.json()) as OfferData;
      setData(json);
    })();
  }, []);

  const canSave = useMemo(() => {
    if (!data) return false;
    return data.sections.every((s) => s.title.trim() && s.description.trim());
  }, [data]);

  function updateSection(key: OfferKey, patch: Partial<OfferSection>) {
    setData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        sections: prev.sections.map((s) => (s.key === key ? { ...s, ...patch } : s)),
      };
    });
  }

  async function onSave() {
    if (!data) return;
    if (!canSave) {
      setSave({ state: "error", message: "Uzupełnij tytuł i opis w każdej sekcji." });
      return;
    }

    setSave({ state: "saving" });

    try {
      const res = await fetch("/api/oferta", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = (await res.json()) as OfferData;

      if (!res.ok) {
        setSave({ state: "error", message: "Nie udało się zapisać." });
        return;
      }

      setData(json);
      setSave({ state: "saved", at: new Date().toLocaleTimeString() });
      setTimeout(() => setSave({ state: "idle" }), 2000);
    } catch {
      setSave({ state: "error", message: "Błąd połączenia." });
    }
  }

  return (
    <AdminShell
      title="Zarządzanie ofertą"
      description="Edytuj treści i ceny. Zapis powoduje aktualizację danych w JSON oraz widoków publicznych (/oferta)."
    >
      <div className="rounded-3xl bg-white p-6 ring-1 ring-black/10">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-semibold text-black">Sekcje oferty</div>
            <div className="mt-1 text-sm text-black/70">
              {data ? `Ostatnia aktualizacja: ${new Date(data.updatedAt).toLocaleString()}` : "Wczytywanie…"}
            </div>
          </div>
          <button
            onClick={onSave}
            disabled={!data || save.state === "saving"}
            className="inline-flex h-11 items-center justify-center rounded-full bg-pink-500 px-6 text-sm font-semibold text-white shadow-sm shadow-pink-500/30 transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {save.state === "saving" ? "Zapisywanie…" : "Zapisz zmiany"}
          </button>
        </div>

        {save.state === "error" ? (
          <div className="mt-4 rounded-2xl bg-black px-4 py-3 text-sm font-medium text-white">
            {save.message}
          </div>
        ) : null}
        {save.state === "saved" ? (
          <div className="mt-4 rounded-2xl bg-pink-500/10 px-4 py-3 text-sm font-medium text-black">
            Zapisano ({save.at})
          </div>
        ) : null}

        <div className="mt-6 grid gap-5">
          {data?.sections.map((s) => (
            <div key={s.key} className="rounded-3xl bg-pink-500/5 p-5">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div className="text-sm font-semibold text-black">
                  {labelForKey(s.key)}
                </div>
                <div className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-black ring-1 ring-black/10">
                  Klucz: {s.key}
                </div>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium text-black">
                  Tytuł
                  <input
                    value={s.title}
                    onChange={(e) => updateSection(s.key, { title: e.target.value })}
                    className="h-12 rounded-2xl border border-black/10 bg-white px-4 text-sm text-black outline-none ring-pink-500/30 focus:ring-4"
                  />
                </label>

                <label className="grid gap-2 text-sm font-medium text-black">
                  Cena od (zł)
                  <input
                    value={s.priceFromPLN}
                    onChange={(e) =>
                      updateSection(s.key, {
                        priceFromPLN: Number(e.target.value || 0),
                      })
                    }
                    inputMode="numeric"
                    className="h-12 rounded-2xl border border-black/10 bg-white px-4 text-sm text-black outline-none ring-pink-500/30 focus:ring-4"
                  />
                </label>

                <label className="grid gap-2 text-sm font-medium text-black md:col-span-2">
                  Opis
                  <textarea
                    value={s.description}
                    onChange={(e) => updateSection(s.key, { description: e.target.value })}
                    className="min-h-28 rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black outline-none ring-pink-500/30 focus:ring-4"
                  />
                </label>

                <div className="md:col-span-2">
                  <div className="text-sm font-medium text-black">Punkty pakietu</div>
                  <div className="mt-2 grid gap-2 md:grid-cols-2">
                    {s.bullets.map((b, idx) => (
                      <input
                        key={`${s.key}_${idx}`}
                        value={b}
                        onChange={(e) => {
                          const next = s.bullets.slice();
                          next[idx] = e.target.value;
                          updateSection(s.key, { bullets: next });
                        }}
                        className="h-11 rounded-2xl border border-black/10 bg-white px-4 text-sm text-black outline-none ring-pink-500/30 focus:ring-4"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-xs text-black/60">
          {canSave
            ? ""
            : "Wskazówka: uzupełnij tytuł i opis w każdej sekcji, aby móc zapisać."}
        </div>
      </div>
    </AdminShell>
  );
}
