"use client";

import { useEffect, useMemo, useState } from "react";
import AdminShell from "@/components/admin/admin-shell";

type SaveState =
  | { state: "idle" }
  | { state: "saving" }
  | { state: "saved"; at: string }
  | { state: "error"; message: string };

type OfferSection = {
  key: string;
  keyLabel: string;
  title: string;
  description: string;
  price: string;
  bullets: string[];
  images: string[];
};

type OfferData = {
  updatedAt: string;
  sections: OfferSection[];
};

type DeleteConfirm = {
  show: boolean;
  key: string;
  title: string;
};

export default function AdminOfferPage() {
  const [data, setData] = useState<OfferData | null>(null);
  const [save, setSave] = useState<SaveState>({ state: "idle" });
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<DeleteConfirm>({ show: false, key: "", title: "" });
  const [uploading, setUploading] = useState<string | null>(null);

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

  function updateSection(key: string, patch: Partial<OfferSection>) {
    setData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        sections: prev.sections.map((s) => (s.key === key ? { ...s, ...patch } : s)),
      };
    });
  }

  function addNewSection() {
    if (!data) return;
    const newKey = `oferta-${Date.now()}`;
    const newSection: OfferSection = {
      key: newKey,
      keyLabel: "Nowa kategoria",
      title: "Tytuł oferty",
      description: "Opis nowej oferty...",
      price: "0 PLN",
      bullets: ["Usługa 1"],
      images: []
    };
    setData((prev) => {
      if (!prev) return prev;
      return { ...prev, sections: [...prev.sections, newSection] };
    });
    setEditingKey(newKey);
  }

  function askRemoveSection(key: string, title: string) {
    setDeleteConfirm({ show: true, key, title });
  }

  function confirmRemove() {
    if (!data || !deleteConfirm.key) return;
    setData((prev) => {
      if (!prev) return prev;
      return { ...prev, sections: prev.sections.filter((s) => s.key !== deleteConfirm.key) };
    });
    if (editingKey === deleteConfirm.key) setEditingKey(null);
    setDeleteConfirm({ show: false, key: "", title: "" });
  }

  function cancelRemove() {
    setDeleteConfirm({ show: false, key: "", title: "" });
  }

  function addBullet(key: string) {
    setData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        sections: prev.sections.map((s) =>
          s.key === key ? { ...s, bullets: [...s.bullets, ""] } : s
        )
      };
    });
  }

  function removeBullet(key: string, idx: number) {
    setData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        sections: prev.sections.map((s) =>
          s.key === key ? { ...s, bullets: s.bullets.filter((_, i) => i !== idx) } : s
        )
      };
    });
  }

  async function handleFileUpload(key: string, file: File) {
    if (!file) return;
    setUploading(key);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const json = await res.json();
      if (res.ok && json.url) {
        setData((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            sections: prev.sections.map((s) =>
              s.key === key ? { ...s, images: [...(s.images || []), json.url] } : s
            )
          };
        });
      } else {
        setSave({ state: "error", message: "Błąd uploadu zdjęcia" });
      }
    } catch {
      setSave({ state: "error", message: "Błąd uploadu zdjęcia" });
    } finally {
      setUploading(null);
    }
  }

  function removeImage(key: string, idx: number) {
    setData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        sections: prev.sections.map((s) =>
          s.key === key ? { ...s, images: s.images.filter((_, i) => i !== idx) } : s
        )
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
      description="Edytuj treści i ceny. Zapis aktualizuje dane w JSON i widoki publiczne (/oferta)."
    >
      <style>{`
        .ao-card {
          background: var(--surface-elevated);
          border: 1px solid var(--border);
          border-radius: 1.25rem;
          padding: 1.5rem;
        }
        .ao-section {
          background: rgba(240,23,122,0.05);
          border: 1px solid rgba(240,23,122,0.12);
          border-radius: 1rem;
          padding: 1.25rem;
          transition: all 200ms ease;
        }
        .ao-section.editing {
          border-color: rgba(240,23,122,0.4);
          box-shadow: 0 0 20px rgba(240,23,122,0.15);
        }
        .ao-section.readonly {
          opacity: 0.7;
          pointer-events: none;
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
          color: var(--text);
          line-height: 1.4;
          padding: 0.25rem 0;
        }
        .ao-key-pill {
          display: inline-block;
          padding: 0.2rem 0.6rem;
          border-radius: 9999px;
          background: var(--surface);
          border: 1px solid var(--border);
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--text-secondary);
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
          color: var(--text-secondary);
          line-height: 1.4;
        }
        .ao-input, .ao-textarea {
          line-height: 1.5;
          font-family: var(--font-body), system-ui, sans-serif;
        }
        .ao-input {
          height: 2.75rem;
          width: 100%;
          border-radius: 0.75rem;
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 0 1rem;
          font-size: 0.875rem;
          color: var(--text);
          outline: none;
          transition: border-color 180ms ease, background 180ms ease;
          box-sizing: border-box;
        }
        .ao-input::placeholder { color: var(--text-muted); }
        .ao-input:focus {
          border-color: rgba(240,23,122,0.5);
          background: rgba(240,23,122,0.06);
        }
        .ao-textarea {
          width: 100%;
          min-height: 7rem;
          border-radius: 0.75rem;
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          color: var(--text);
          outline: none;
          resize: vertical;
          transition: border-color 180ms ease, background 180ms ease;
          box-sizing: border-box;
        }
        .ao-textarea:focus {
          border-color: rgba(240,23,122,0.5);
          background: rgba(240,23,122,0.06);
        }
        .ao-bullets-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
          line-height: 1.4;
        }
        .ao-bullet-row {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .ao-bullet-row input {
          flex: 1;
        }
        .ao-btn-remove-bullet {
          height: 2.75rem;
          padding: 0 0.75rem;
          border-radius: 0.75rem;
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.3);
          color: #ef4444;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 200ms ease;
          white-space: nowrap;
        }
        .ao-btn-remove-bullet:hover {
          background: rgba(239,68,68,0.2);
          border-color: rgba(239,68,68,0.5);
        }
        .ao-btn-add {
          height: 2.5rem;
          padding: 0 1rem;
          border-radius: 0.75rem;
          background: rgba(16,185,129,0.1);
          border: 1px solid rgba(16,185,129,0.3);
          color: #10b981;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 200ms ease;
          margin-top: 0.5rem;
        }
        .ao-btn-add:hover {
          background: rgba(16,185,129,0.2);
          border-color: rgba(16,185,129,0.5);
        }
        .ao-images-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 0.75rem;
          margin-top: 0.5rem;
        }
        .ao-image-item {
          position: relative;
          aspect-ratio: 1;
          border-radius: 0.5rem;
          overflow: hidden;
          border: 1px solid var(--border);
        }
        .ao-image-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .ao-image-remove {
          position: absolute;
          top: 4px;
          right: 4px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(239,68,68,0.9);
          border: none;
          color: white;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ao-upload-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 2.75rem;
          padding: 0 1rem;
          border-radius: 0.75rem;
          background: var(--surface);
          border: 1px dashed var(--border);
          color: var(--text-secondary);
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 200ms ease;
          margin-top: 0.5rem;
        }
        .ao-upload-btn:hover {
          border-color: rgba(240,23,122,0.5);
          color: var(--pink);
        }
        .ao-msg-error {
          margin-top: 1rem;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          background: rgba(240,23,122,0.1);
          border: 1px solid rgba(240,23,122,0.3);
          color: #ff4fa3;
          font-size: 0.8rem;
          font-weight: 500;
          line-height: 1.4;
        }
        .ao-msg-saved {
          margin-top: 1rem;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          background: var(--surface);
          border: 1px solid var(--border);
          color: var(--text-secondary);
          font-size: 0.8rem;
          font-weight: 500;
          line-height: 1.4;
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
        .ao-btn-edit {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 2rem;
          padding: 0 1rem;
          border-radius: 9999px;
          background: rgba(59,130,246,0.1);
          border: 1px solid rgba(59,130,246,0.3);
          color: #3b82f6;
          font-size: 0.75rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 200ms ease;
        }
        .ao-btn-edit:hover {
          background: rgba(59,130,246,0.2);
          border-color: rgba(59,130,246,0.5);
        }
        .ao-btn-edit.active {
          background: rgba(16,185,129,0.1);
          border-color: rgba(16,185,129,0.3);
          color: #10b981;
        }
        .ao-btn-delete {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 2rem;
          padding: 0 1rem;
          border-radius: 9999px;
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.3);
          color: #ef4444;
          font-size: 0.75rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 200ms ease;
        }
        .ao-btn-delete:hover {
          background: rgba(239,68,68,0.2);
          border-color: rgba(239,68,68,0.5);
        }
        .ao-meta {
          font-size: 0.75rem;
          color: var(--text);
          line-height: 1.4;
        }
        .ao-hint {
          font-size: 0.75rem;
          color: var(--text);
          margin-top: 1rem;
          line-height: 1.4;
        }
        .ao-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }
        .ao-modal {
          background: var(--surface-elevated);
          border: 1px solid var(--border);
          border-radius: 1rem;
          padding: 1.5rem;
          max-width: 400px;
          width: 100%;
          text-align: center;
        }
        .ao-modal-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 0.5rem;
          line-height: 1.4;
        }
        .ao-modal-text {
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
          line-height: 1.5;
        }
        .ao-modal-buttons {
          display: flex;
          gap: 0.75rem;
          justify-content: center;
        }
      `}</style>

      <div className="ao-card">
        {/* Header row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
          <div>
            <div style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: "0.25rem" }}>
              Sekcje oferty
            </div>
            <div className="ao-meta">
              {data ? `Ostatnia aktualizacja: ${new Date(data.updatedAt).toLocaleString()}` : "Wczytywanie…"}
            </div>
          </div>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <button onClick={addNewSection} disabled={!data || save.state === "saving"} className="ao-btn-save" style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}>
              + Dodaj ofertę
            </button>
            <button onClick={onSave} disabled={!data || save.state === "saving"} className="ao-btn-save">
              {save.state === "saving" ? "Zapisywanie…" : "Zapisz zmiany"}
            </button>
          </div>
        </div>

        {save.state === "error" && <div className="ao-msg-error">{save.message}</div>}
        {save.state === "saved" && <div className="ao-msg-saved">✓ Zapisano ({save.at})</div>}

        <div style={{ display: "grid", gap: "1rem", marginTop: "0.5rem" }}>
          {data?.sections.map((s) => {
            const isEditing = editingKey === s.key;
            const isLocked = editingKey !== null && editingKey !== s.key;
            return (
              <div key={s.key} className={`ao-section ${isEditing ? "editing" : ""} ${isLocked ? "readonly" : ""}`}>
                <div className="ao-section-header">
                  <span className="ao-section-title">{s.keyLabel || s.title}</span>
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                    <span className="ao-key-pill">{s.key}</span>
                    <button 
                      onClick={() => setEditingKey(isEditing ? null : s.key)} 
                      disabled={save.state === "saving" || isLocked} 
                      className={`ao-btn-edit ${isEditing ? "active" : ""}`}
                    >
                      {isEditing ? "Zakończ edycję" : "Edytuj"}
                    </button>
                    <button 
                      onClick={() => askRemoveSection(s.key, s.keyLabel || s.title)} 
                      disabled={save.state === "saving"} 
                      className="ao-btn-delete"
                    >
                      Usuń
                    </button>
                  </div>
                </div>

                {isEditing && (
                  <div className="ao-grid">
                    <label className="ao-label">
                      Nazwa kategorii (widoczna w menu)
                      <input
                        value={s.keyLabel}
                        onChange={(e) => updateSection(s.key, { keyLabel: e.target.value })}
                        className="ao-input"
                        placeholder="Np. Urodziny, Wesela..."
                      />
                    </label>

                    <label className="ao-label">
                      Tytuł oferty
                      <input
                        value={s.title}
                        onChange={(e) => updateSection(s.key, { title: e.target.value })}
                        className="ao-input"
                      />
                    </label>

                    <label className="ao-label">
                      Cena od (zł)
                      <input
                        value={s.price}
                        onChange={(e) => updateSection(s.key, { price: e.target.value })}
                        inputMode="numeric"
                        className="ao-input"
                      />
                    </label>

                    <div className="ao-label span-2">
                      <span>Zdjęcia</span>
                      <div className="ao-images-grid">
                        {(s.images || []).map((img, idx) => (
                          <div key={idx} className="ao-image-item">
                            <img src={img} alt={`Zdjęcie ${idx + 1}`} />
                            <button 
                              className="ao-image-remove" 
                              onClick={() => removeImage(s.key, idx)}
                              title="Usuń zdjęcie"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                      <label className="ao-upload-btn">
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: "none" }}
                          onChange={(e) => e.target.files?.[0] && handleFileUpload(s.key, e.target.files[0])}
                        />
                        {uploading === s.key ? "Przesyłanie..." : "+ Dodaj zdjęcie"}
                      </label>
                    </div>

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
                      {s.bullets.map((b, idx) => (
                        <div key={`${s.key}_${idx}`} className="ao-bullet-row">
                          <input
                            value={b}
                            onChange={(e) => {
                              const next = s.bullets.slice();
                              next[idx] = e.target.value;
                              updateSection(s.key, { bullets: next });
                            }}
                            className="ao-input"
                            placeholder={`Punkt ${idx + 1}`}
                          />
                          <button 
                            className="ao-btn-remove-bullet" 
                            onClick={() => removeBullet(s.key, idx)}
                            disabled={s.bullets.length <= 1}
                          >
                            Usuń
                          </button>
                        </div>
                      ))}
                      <button className="ao-btn-add" onClick={() => addBullet(s.key)}>
                        + Dodaj punkt
                      </button>
                    </div>
                  </div>
                )}

                {!isEditing && (
                  <div style={{ color: "var(--text-secondary)", fontSize: "0.8rem", lineHeight: "1.4" }}>
                    <div>Cena: {s.price}</div>
                    <div>Punkty pakietu: {s.bullets.length}</div>
                    <div>Zdjęcia: {(s.images || []).length}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!canSave && data && (
          <div className="ao-hint">Uzupełnij tytuł i opis w każdej sekcji, aby móc zapisać.</div>
        )}

        {/* Modal potwierdzenia usunięcia */}
        {deleteConfirm.show && (
          <div className="ao-modal-overlay" onClick={cancelRemove}>
            <div className="ao-modal" onClick={(e) => e.stopPropagation()}>
              <div className="ao-modal-title">Czy na pewno chcesz usunąć?</div>
              <div className="ao-modal-text">
                <strong>{deleteConfirm.title}</strong><br/>
                Tej operacji nie można cofnąć.
              </div>
              <div className="ao-modal-buttons">
                <button onClick={cancelRemove} className="ao-btn-save" style={{ background: "var(--surface)", color: "var(--text)" }}>
                  Nie, anuluj
                </button>
                <button onClick={confirmRemove} className="ao-btn-save" style={{ background: "linear-gradient(135deg, #ef4444, #dc2626)" }}>
                  Tak, potwierdzam usunięcie
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}