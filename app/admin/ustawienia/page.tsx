"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import AdminShell from "@/components/admin/admin-shell";

type SiteSettings = Record<string, string>;

export default function AdminUstawieniaPage() {
  const [settings, setSettings] = useState<SiteSettings>({});
  const [heroImage, setHeroImage] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/site-settings");
      const json = await res.json();
      setSettings(json.settings || {});
      setHeroImage(json.settings?.hero_image || "");
    } catch (e) {
      console.error("Failed to fetch settings:", e);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Upload to Supabase Storage
      uploadImage(file);
    }
  };

  const uploadImage = async (file: File) => {
    setBusy(true);
    setError("");

    try {
      // Convert file to base64
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve) => {
        reader.onload = () => {
          const result = reader.result as string;
          resolve(result);
        };
        reader.readAsDataURL(file);
      });
      
      const base64Url = await base64Promise;

      // Save to site settings
      const res = await fetch("/api/site-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "hero_image",
          value: base64Url
        })
      });

      if (res.ok) {
        setHeroImage(base64Url);
      } else {
        throw new Error("Failed to save setting");
      }
    } catch (e) {
      console.error("Upload error:", e);
      setError("Nie udało się załadować zdjęcia");
    } finally {
      setBusy(false);
    }
  };

  return (
    <AdminShell 
      title="Ustawienia strony"
      description="Zarządzaj ustawieniami globalnymi strony głównej"
    >
      <div className="page-bg noise">
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        <style>{`
          .settings-card {
            background: var(--surface-elevated);
            border: 1px solid var(--border);
            border-radius: 1rem;
            padding: 2rem;
            margin-bottom: 2rem;
          }
          .settings-title {
            font-family: var(--font-display);
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--text);
            margin-bottom: 1.5rem;
          }
          .form-group {
            margin-bottom: 1.5rem;
          }
          .form-label {
            display: block;
            font-size: 0.875rem;
            font-weight: 600;
            color: var(--text);
            margin-bottom: 0.5rem;
          }
          .file-input {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid var(--border);
            border-radius: 0.5rem;
            background: var(--surface);
            color: var(--text);
            font-size: 0.875rem;
          }
          .btn-primary {
            background: var(--pink);
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s;
          }
          .btn-primary:hover:not(:disabled) {
            background: var(--pink-light);
          }
          .btn-primary:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
          .error {
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 0.5rem;
          }
          .preview {
            margin-top: 1rem;
            border-radius: 0.5rem;
            overflow: hidden;
            aspect-ratio: 16/9;
          }
          .preview img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        `}</style>

        <div className="settings-card">
          <h1 className="settings-title">Ustawienia strony</h1>
          
          <div className="form-group">
            <label className="form-label">
              Zdjęcie główne (hero)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="file-input"
              disabled={busy}
            />
            {error && <div className="error">{error}</div>}
          </div>

          {heroImage && (
            <div className="preview">
              <img src={heroImage} alt="Podgląd zdjęcia głównego" />
            </div>
          )}

          <div style={{ marginTop: "1rem" }}>
            <button 
              onClick={() => document.querySelector<HTMLInputElement>('.file-input')?.click()}
              disabled={busy}
              className="btn-primary"
            >
              {busy ? "Przetwarzanie..." : "Zmień zdjęcie główne"}
            </button>
          </div>
        </div>
      </div>
    </div>
    </AdminShell>
  );
}
