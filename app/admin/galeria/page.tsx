"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, useRef } from "react";

import AdminShell from "@/components/admin/admin-shell";
import { supabase } from "@/lib/supabase";
import type { GalleryData, OfferKey } from "@/lib/types";

type CreateState = {
  title: string;
  url: string;
  category: OfferKey | "inne";
  file?: File;
};

const CATEGORY_LABELS: Record<string, string> = {
  urodziny: "Urodziny",
  szkolne: "Szkolne",
  firmowe: "Firmowe",
  inne: "Inne",
};

export default function AdminGalleryPage() {
  const [data, setData] = useState<GalleryData | null>(null);
  const [form, setForm] = useState<CreateState>({ title: "", url: "", category: "inne" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    void (async () => {
      const res = await fetch("/api/galeria");
      const json = (await res.json()) as GalleryData;
      setData(json);
    })();
  }, []);

  const canAdd = useMemo(() => form.title.trim() && (form.url.trim() || form.file), [form]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm(prev => ({ ...prev, file }));
    }
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    console.log('📤 Starting upload for:', file.name, 'Size:', file.size, 'Type:', file.type);
    
    try {
      // Create unique filename
      const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
      
      // Upload to Supabase Storage directly as File
      const { data, error } = await supabase.storage
        .from('gallery-images')
        .upload(fileName, file, {
          contentType: file.type,
          cacheControl: '3600',
          upsert: false
        });
      
      if (error) {
        console.error('❌ Supabase storage upload error:', error);
        throw error;
      }
      
      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('gallery-images')
        .getPublicUrl(fileName);
      
      console.log('✅ Upload completed, public URL:', publicUrl);
      return publicUrl;
    } catch (error) {
      console.error('❌ Upload error:', error);
      throw error;
    }
  };

  async function addImage() {
    setError(null);
    if (!canAdd) { setError("Uzupełnij tytuł i wybierz plik lub podaj URL."); return; }
    setBusy(true);
    try {
      let imageUrl = form.url;
      
      console.log('🔍 Debug - form state:', {
        title: form.title,
        url: form.url,
        category: form.category,
        hasFile: !!form.file,
        fileName: form.file?.name
      });
      
      // If file is selected, upload it first
      if (form.file && !form.url) {
        console.log('📤 Uploading file:', form.file.name);
        imageUrl = await uploadToCloudinary(form.file);
        console.log('✅ Upload completed, URL:', imageUrl);
      }
      
      const submitData = {
        title: form.title,
        url: imageUrl,
        category: form.category
      };
      
      console.log('📤 Submitting data:', submitData);
      
      const res = await fetch("/api/galeria", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });
      const json = (await res.json()) as GalleryData;
      console.log('📥 API response:', { status: res.status, data: json });
      
      if (!res.ok) { 
        console.error('❌ API error response:', json);
        setError("Nie udało się dodać zdjęcia."); 
        return; 
      }
      
      console.log('✅ Image added successfully');
      setData(json);
      setForm({ title: "", url: "", category: "inne" });
      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('❌ Add image error:', error);
      setError("Błąd połączenia.");
    } finally {
      setBusy(false);
    }
  }

  async function removeImage(id: string) {
    setError(null);
    setBusy(true);
    try {
      const res = await fetch(`/api/galeria?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      const json = (await res.json()) as GalleryData;
      if (!res.ok) { setError("Nie udało się usunąć zdjęcia."); return; }
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
      description="Dodawaj i usuwaj zdjęcia widoczne na stronie publicznej /galeria."
    >
      <style>{`
        .ag-card {
          background: var(--surface-elevated);
          border: 1px solid var(--border);
          border-radius: 1.25rem;
          padding: 1.5rem;
        }
        .ag-section-title {
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-secondary);
          margin-bottom: 1.25rem;
        }
        .ag-label {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-secondary);
        }
        .ag-input {
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
        .ag-input::placeholder { color: var(--text-muted); }
        .ag-input:focus {
          border-color: rgba(240,23,122,0.5);
          background: rgba(240,23,122,0.06);
        }
        .ag-input option {
          background: var(--surface);
          color: var(--text);
        }
        .ag-input-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        @media (min-width: 640px) {
          .ag-input-grid { grid-template-columns: 1fr 1fr; }
          .ag-input-grid .span-2 { grid-column: span 2; }
        }
        .ag-error {
          margin-top: 1rem;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          background: rgba(240,23,122,0.1);
          border: 1px solid rgba(240,23,122,0.3);
          color: var(--pink-light);
          font-size: 0.8rem;
          font-weight: 500;
        }
        .ag-btn-primary {
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
        }
        .ag-btn-primary:hover:not(:disabled) {
          box-shadow: 0 6px 24px rgba(240,23,122,0.55);
          transform: translateY(-1px);
        }
        .ag-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
        .ag-btn-outline {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 2.5rem;
          padding: 0 1.25rem;
          border-radius: 9999px;
          background: var(--surface);
          border: 1px solid var(--border);
          color: var(--text-secondary);
          font-size: 0.8rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 200ms ease;
          white-space: nowrap;
        }
        .ag-btn-outline:hover {
          background: var(--surface-elevated);
          color: var(--text);
        }
        .ag-img-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
          margin-top: 1.25rem;
        }
        @media (min-width: 480px) { .ag-img-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .ag-img-grid { grid-template-columns: repeat(3, 1fr); } }
        .ag-img-card {
          border-radius: 1rem;
          overflow: hidden;
          background: var(--surface-elevated);
          border: 1px solid var(--border);
          transition: border-color 200ms ease;
        }
        .ag-img-card:hover { border-color: var(--border); }
        .ag-img-meta { padding: 0.875rem 1rem; }
        .ag-img-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .ag-img-id {
          font-size: 0.65rem;
          color: var(--text-muted);
          margin-top: 0.2rem;
          font-family: var(--font-mono);
        }
        .ag-btn-delete {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 2.25rem;
          margin-top: 0.75rem;
          border-radius: 0.625rem;
          background: var(--surface);
          border: 1px solid var(--border);
          color: var(--text-secondary);
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 200ms ease;
        }
        .ag-btn-delete:hover:not(:disabled) {
          background: rgba(240,23,122,0.12);
          border-color: rgba(240,23,122,0.3);
          color: var(--pink-light);
        }
        .ag-btn-delete:disabled { opacity: 0.4; cursor: not-allowed; }
        .ag-pill {
          display: inline-block;
          padding: 0.15rem 0.5rem;
          border-radius: 9999px;
          background: rgba(240,23,122,0.15);
          border: 1px solid rgba(240,23,122,0.25);
          color: var(--pink-light);
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .ag-empty {
          padding: 3rem 1rem;
          text-align: center;
          border-radius: 1rem;
          border: 1px dashed rgba(240,23,122,0.2);
          background: rgba(240,23,122,0.03);
          margin-top: 1.25rem;
        }
        .ag-file-input {
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
          cursor: pointer;
        }
        .ag-file-input:hover {
          border-color: rgba(240,23,122,0.5);
          background: rgba(240,23,122,0.06);
        }
        .ag-file-input::file-selector-button {
          background: var(--surface-elevated);
          border: 1px solid var(--border);
          color: var(--text);
          padding: 0.25rem 0.75rem;
          border-radius: 0.375rem;
          margin-right: 0.5rem;
          cursor: pointer;
        }
      `}</style>

      <div style={{ display: "grid", gap: "1.25rem" }}>

        {/* ── ADD FORM ── */}
        <div className="ag-card">
          <div className="ag-section-title">Dodaj zdjęcie</div>

          <div className="ag-input-grid">
            <label className="ag-label">
              Tytuł
              <input
                value={form.title}
                onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
                className="ag-input"
                placeholder="np. Mini disco i bańki"
              />
            </label>

            <label className="ag-label">
              Kategoria
              <select
                value={form.category}
                onChange={(e) => setForm((s) => ({ ...s, category: e.target.value as CreateState["category"] }))}
                className="ag-input"
                style={{ cursor: "pointer" }}
              >
                <option value="urodziny">Urodziny</option>
                <option value="szkolne">Szkolne</option>
                <option value="firmowe">Firmowe</option>
                <option value="inne">Inne</option>
              </select>
            </label>

            <label className="ag-label span-2">
              URL zdjęcia
              <input
                value={form.url}
                onChange={(e) => setForm((s) => ({ ...s, url: e.target.value }))}
                className="ag-input"
                placeholder="https://images.unsplash.com/..."
              />
            </label>

            <label className="ag-label span-2">
              Lub wybierz plik z komputera
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="ag-file-input"
              />
              {form.file && (
                <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
                  Wybrano: {form.file.name} ({Math.round(form.file.size / 1024)}KB)
                </div>
              )}
            </label>
          </div>

          {error && <div className="ag-error">{error}</div>}

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1.25rem" }}>
            <button onClick={addImage} disabled={busy} className="ag-btn-primary">
              {busy ? "Przetwarzanie…" : "Dodaj zdjęcie"}
            </button>
          </div>
        </div>

        {/* ── IMAGE LIST ── */}
        <div className="ag-card">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <div>
              <div className="ag-section-title" style={{ marginBottom: "0.1rem" }}>Lista zdjęć</div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                {data ? `${data.images.length} elementów` : "Wczytywanie…"}
              </div>
            </div>
            <a href="/galeria" className="ag-btn-outline">
              Podgląd publiczny →
            </a>
          </div>

          {data && data.images.length > 0 && (
            <div className="ag-img-grid">
              {data.images.map((img) => (
                <div key={img.id} className="ag-img-card">
                  <div style={{ position: "relative", aspectRatio: "4/3" }}>
                    <Image
                      src={img.url}
                      alt={img.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    {/* Category pill overlay */}
                    <div style={{ position: "absolute", top: "0.625rem", left: "0.625rem" }}>
                      <span className="ag-pill">
                        {CATEGORY_LABELS[img.category] ?? img.category}
                      </span>
                    </div>
                  </div>
                  <div className="ag-img-meta">
                    <div className="ag-img-title">{img.title}</div>
                    <div className="ag-img-id">{img.id}</div>
                    <button
                      onClick={() => removeImage(img.id)}
                      disabled={busy}
                      className="ag-btn-delete"
                    >
                      Usuń
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {data && data.images.length === 0 && (
            <div className="ag-empty">
              <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>📸</div>
              <div style={{ fontWeight: 700, color: "var(--text)", fontSize: "0.9rem", marginBottom: "0.35rem" }}>
                Brak zdjęć
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                Dodaj pierwsze zdjęcie powyżej.
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  );
}