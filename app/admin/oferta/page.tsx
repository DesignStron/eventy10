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
      if (!res.ok) { setSave({ state: "error", message: "Nie udało się zapisać." }); return; }
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
      description="Edytuj treści i ceny. Zapis aktualizuje dane w JSON i widoki publiczne (/oferta)."
    >
      <style>{`
        .ao-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 1.25rem;
          padding: 1.5rem;
        }
        .ao-section {
          background: rgba(240,23,122,0.05);
          border: 1px solid rgba(240,23,122,0.12);
          border-radius: 1rem;
          padding: 1.25rem;
        }
        .ao-section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 1.25rem;
        }
        .ao-section-title {
          font-size: 0.875rem;
          font-weight: 700;
          color: #fff;
        }
        .ao-key-pill {
          display: inline-block;
          padding: 0.2rem 0.6rem;
          border-radius: 9999px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          font-size: 0.65rem;
          font-weight: 700;
          color: rgba(255,255,255,0.4);
          font-family: var(--font-mono);
          letter-spacing: 0.04em;
        }
        .ao-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        @media (min-width: 640px) {
          .ao-grid { grid-template-columns: 1fr 1fr; }
          .ao-grid .span-2 { grid-column: span 2; }
        }
        .ao-label {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          font-size: 0.8rem;
          font-weight: 600;
          color: rgba(255,255,255,0.5);
        }
        .ao-input {
          height: 2.75rem;
          width: 100%;
          border-radius: 0.75rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 0 1rem;
          font-size: 0.875rem;
          color: #fff;
          outline: none;
          transition: border-color 180ms ease, background 180ms ease;
          box-sizing: border-box;
        }
        .ao-input::placeholder { color: rgba(255,255,255,0.2); }
        .ao-input:focus {
          border-color: rgba(240,23,122,0.5);
          background: rgba(240,23,122,0.06);
        }
        .ao-textarea {
          width: 100%;
          min-height: 7rem;
          border-radius: 0.75rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          color: #fff;
          outline: none;
          resize: vertical;
          transition: border-color 180ms ease, background 180ms ease;
          box-sizing: border-box;
          font-family: inherit;
        }
        .ao-textarea:focus {
          border-color: rgba(240,23,122,0.5);
          background: rgba(240,23,122,0.06);
        }
        .ao-bullets-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: rgba(255,255,255,0.5);
          margin-bottom: 0.5rem;
        }
        .ao-bullets-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.5rem;
        }
        @media (min-width: 640px) { .ao-bullets-grid { grid-template-columns: 1fr 1fr; } }
        .ao-msg-error {
          margin-top: 1rem;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          background: rgba(240,23,122,0.1);
          border: 1px solid rgba(240,23,122,0.3);
          color: #ff4fa3;
          font-size: 0.8rem;
          font-weight: 500;
        }
        .ao-msg-saved {
          margin-top: 1rem;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.6);
          font-size: 0.8rem;
          font-weight: 500;
        }
        .ao-btn-save {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 2.5rem;
          padding: 0 1.5rem;
          border-radius: 9999px;
          background: linear-gradient(135deg, #f0177a, #ff4fa3);
          color: #fff;
          font-size: 0.8rem;
          font-weight: 700;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(240,23,122,0.35);
          transition: all 200ms ease;
          white-space: nowrap;
        }
        .ao-btn-save:hover:not(:disabled) {
          box-shadow: 0 6px 24px rgba(240,23,122,0.55);
          transform: translateY(-1px);
        }
        .ao-btn-save:disabled { opacity: 0.5; cursor: not-allowed; }
        .ao-meta {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.3);
        }
        .ao-hint {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.3);
          margin-top: 1rem;
        }
      `}</style>

      <div className="ao-card">
        {/* Header row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
          <div>
            <div style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "0.25rem" }}>
              Sekcje oferty
            </div>
            <div className="ao-meta">
              {data ? `Ostatnia aktualizacja: ${new Date(data.updatedAt).toLocaleString()}` : "Wczytywanie…"}
            </div>
          </div>
          <button onClick={onSave} disabled={!data || save.state === "saving"} className="ao-btn-save">
            {save.state === "saving" ? "Zapisywanie…" : "Zapisz zmiany"}
          </button>
        </div>

        {save.state === "error" && <div className="ao-msg-error">{save.message}</div>}
        {save.state === "saved" && <div className="ao-msg-saved">✓ Zapisano ({save.at})</div>}

        <div style={{ display: "grid", gap: "1rem", marginTop: "0.5rem" }}>
          {data?.sections.map((s) => (
            <div key={s.key} className="ao-section">
              <div className="ao-section-header">
                <span className="ao-section-title">{labelForKey(s.key)}</span>
                <span className="ao-key-pill">{s.key}</span>
              </div>

              <div className="ao-grid">
                <label className="ao-label">
                  Tytuł
                  <input
                    value={s.title}
                    onChange={(e) => updateSection(s.key, { title: e.target.value })}
                    className="ao-input"
                  />
                </label>

                <label className="ao-label">
                  Cena od (zł)
                  <input
                    value={s.priceFromPLN}
                    onChange={(e) => updateSection(s.key, { priceFromPLN: Number(e.target.value || 0) })}
                    inputMode="numeric"
                    className="ao-input"
                  />
                </label>

                <label className="ao-label span-2">
                  Opis
                  <textarea
                    value={s.description}
                    onChange={(e) => updateSection(s.key, { description: e.target.value })}
                    className="ao-textarea"
                  />
                </label>

                <div className="span-2">
                  <div className="ao-bullets-label">Punkty pakietu</div>
                  <div className="ao-bullets-grid">
                    {s.bullets.map((b, idx) => (
                      <input
                        key={`${s.key}_${idx}`}
                        value={b}
                        onChange={(e) => {
                          const next = s.bullets.slice();
                          next[idx] = e.target.value;
                          updateSection(s.key, { bullets: next });
                        }}
                        className="ao-input"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!canSave && data && (
          <div className="ao-hint">Uzupełnij tytuł i opis w każdej sekcji, aby móc zapisać.</div>
        )}
      </div>
    </AdminShell>
  );
}