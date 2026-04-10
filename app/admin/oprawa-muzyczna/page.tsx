"use client";

import { useEffect, useMemo, useState } from "react";

import AdminShell from "@/components/admin/admin-shell";

type MusicService = {
  key: string;
  categoryLabel: string;
  title: string;
  description: string;
  features: string[];
  image?: string;
};

type MusicData = {
  updatedAt: string;
  services: MusicService[];
};

type SaveState =
  | { state: "idle" }
  | { state: "saving" }
  | { state: "saved"; at: string }
  | { state: "error"; message: string };

const DEFAULT_SERVICES: MusicService[] = [
  {
    key: "studniowki",
    categoryLabel: "Studniówki",
    title: "Studniówki",
    description: "Elegancka oprawa muzyczna i prowadzenie wieczoru. Dobieramy repertuar dopasowany do gustu maturzystów i tradycji.",
    features: ["Repertuar taneczny i okolicznościowy", "Profesjonalne prowadzenie imprezy", "Oświetlenie i efekty świetlne", "Współpraca z fotografem"],
    image: ""
  },
  {
    key: "wesela",
    categoryLabel: "Wesela",
    title: "Wesela",
    description: "Kompleksowa oprawa muzyczna wesela - od pierwszego tańca po oczepiny. Dbamy o każdy moment tego wyjątkowego dnia.",
    features: ["Konsultacja i dobór repertuaru", "Prowadzenie ceremonii i przyjęcia", "Zabawy i konkursy weselne", "Sprzęt nagłośnieniowy i oświetlenie"],
    image: ""
  },
  {
    key: "urodziny",
    categoryLabel: "Urodziny",
    title: "Urodziny i przyjęcia",
    description: "Muzyczna oprawa przyjęć urodzinowych, rocznic i spotkań rodzinnych. Dopasujemy klimat do charakteru imprezy i gości.",
    features: ["Różne gatunki muzyczne", "Możliwość dedykacji i życzeń", "Nagłośnienie dostosowane do sali", "Opcjonalnie animacje dla dzieci"],
    image: ""
  },
  {
    key: "firmowe",
    categoryLabel: "Eventy firmowe",
    title: "Eventy firmowe",
    description: "Profesjonalna oprawa muzyczna na imprezy integracyjne, bankiety, gale i konferencje.",
    features: ["Muzyka tła i taneczna", "Prowadzenie programu", "Nagłośnienie konferencji", "Oświetlenie sceniczne"],
    image: ""
  },
  {
    key: "bale",
    categoryLabel: "Bale",
    title: "Bale karnawałowe",
    description: "Dynamiczna oprawa muzyczna balów karnawałowych dla dzieci i dorosłych. Wiele gatunków i klimatów w jednym wieczorze.",
    features: ["Repertuar taneczny i zabawowy", "Konkursy muzyczne z nagrodami", "Światła i efekty specjalne", "Współpraca z animatorami"],
    image: ""
  },
  {
    key: "swiateczne",
    categoryLabel: "Świąteczne",
    title: "Eventy świąteczne",
    description: "Magiczna atmosfera świąt Bożego Narodzenia z odpowiednią oprawą muzyczną. Kolędy, nowoczesne hity i klimatyczne aranżacje.",
    features: ["Repertuar świąteczny", "Oświetlenie dekoracyjne", "Możliwość nagłośnienia na zewnątrz", "Współpraca z Mikołajem"],
    image: ""
  }
];

export default function AdminMusicPage() {
  const [data, setData] = useState<MusicData | null>(null);
  const [save, setSave] = useState<SaveState>({ state: "idle" });
  const [uploading, setUploading] = useState<string | null>(null);
  const [showUrlInput, setShowUrlInput] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/oprawa-muzyczna");
        if (res.ok) {
          const json = (await res.json()) as MusicData;
          setData(json);
        } else {
          // Fallback to default data if API doesn't exist yet
          setData({
            updatedAt: new Date().toISOString(),
            services: DEFAULT_SERVICES
          });
        }
      } catch (error) {
        setData({
          updatedAt: new Date().toISOString(),
          services: DEFAULT_SERVICES
        });
      }
    };

    // Refresh every 5 seconds
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  const canSave = useMemo(() => {
    if (!data) return false;
    return data.services.every((s) => s.title.trim() && s.description.trim());
  }, [data]);

  function updateService(key: string, patch: Partial<MusicService>) {
    setData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        services: prev.services.map((s) => (s.key === key ? { ...s, ...patch } : s)),
      };
    });
  }

  function updateServiceFeatures(key: string, features: string[]) {
    setData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        services: prev.services.map((s) => (s.key === key ? { ...s, features } : s)),
      };
    });
  }

  function addNewService() {
    if (!data) return;
    
    const newKey = `service-${Date.now()}`;
    const newService: MusicService = {
      key: newKey,
      categoryLabel: "Nowa kategoria",
      title: "Nowa usługa",
      description: "Opis nowej usługi muzycznej",
      features: [""],
      image: ""
    };
    
    setData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        services: [newService, ...prev.services]
      };
    });
  }

  function removeService(key: string) {
    if (!data) return;
    
    setData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        services: prev.services.filter(s => s.key !== key)
      };
    });
  }

  async function handleImageUpload(key: string, file: File) {
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
            services: prev.services.map((s) =>
              s.key === key ? { ...s, image: json.url } : s
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

  async function handleImageUrl(key: string, imageUrl: string) {
    if (!imageUrl.trim()) return;
    setUploading(key);
    try {
      const formData = new FormData();
      formData.append("imageUrl", imageUrl.trim());
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const json = await res.json();
      if (res.ok && json.url) {
        setData((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            services: prev.services.map((s) =>
              s.key === key ? { ...s, image: json.url } : s
            )
          };
        });
      } else {
        setSave({ state: "error", message: "Błąd dodawania linku do zdjęcia" });
      }
    } catch {
      setSave({ state: "error", message: "Błąd dodawania linku do zdjęcia" });
    } finally {
      setUploading(null);
    }
  }

  async function onSave() {
    if (!data) return;
    if (!canSave) {
      setSave({ state: "error", message: "Uzupełnij tytuł i opis w każdej usłudze." });
      return;
    }
    setSave({ state: "saving" });
    try {
      const res = await fetch("/api/oprawa-muzyczna", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as MusicData;
      if (!res.ok) {
        setSave({ state: "error", message: "Nie udało się zapisać danych." });
        return;
      }
      setData(json);
      setSave({ state: "saved", at: new Date().toLocaleTimeString() });
    } catch {
      setSave({ state: "error", message: "Błąd połączenia." });
    } finally {
      setTimeout(() => setSave({ state: "idle" }), 2000);
    }
  }

  return (
    <>
      <style>{`
        .am-card {
          background: var(--surface-elevated);
          border: 1px solid var(--border);
          border-radius: 1.25rem;
          padding: 1.5rem;
        }
        .am-section-title {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 1.25rem;
        }
        .am-service {
          background: rgba(240,23,122,0.05);
          border: 1px solid rgba(240,23,122,0.12);
          border-radius: 1rem;
          padding: 1.25rem;
        }
        .am-service-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 1.25rem;
        }
        .am-service-title {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--text);
        }
        .am-key-pill {
          display: inline-block;
          padding: 0.2rem 0.6rem;
          border-radius: 9999px;
          background: var(--surface);
          border: 1px solid var(--border);
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--text-secondary);
        }
        .am-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        @media (min-width: 640px) { .am-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1024px) { .am-grid { grid-template-columns: 1fr 1fr 1fr; } }
        .am-span-2 { grid-column: span 2; }
        .am-span-3 { grid-column: span 3; }
        .am-label {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-secondary);
        }
        .am-input {
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
        .am-input:focus {
          border-color: rgba(240,23,122,0.5);
          background: rgba(240,23,122,0.06);
        }
        .am-textarea {
          width: 100%;
          min-height: 5rem;
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
          font-family: inherit;
        }
        .am-textarea:focus {
          border-color: rgba(240,23,122,0.5);
          background: rgba(240,23,122,0.06);
        }
        .am-features-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
        }
        .am-feature-input {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .am-feature-input input {
          flex: 1;
        }
        .am-btn-remove {
          height: 2.75rem;
          padding: 0 1rem;
          border-radius: 0.75rem;
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.3);
          color: #ef4444;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 200ms ease;
        }
        .am-btn-remove:hover {
          background: rgba(239,68,68,0.2);
          border-color: rgba(239,68,68,0.5);
        }
        .am-btn-add {
          height: 2.75rem;
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
        .am-btn-add:hover {
          background: rgba(16,185,129,0.2);
          border-color: rgba(16,185,129,0.5);
        }
        .am-msg-error {
          margin-top: 1rem;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.3);
          color: #ef4444;
          font-size: 0.8rem;
          font-weight: 500;
        }
        .am-msg-saved {
          margin-top: 1rem;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          background: rgba(16,185,129,0.1);
          border: 1px solid rgba(16,185,129,0.3);
          color: #10b981;
          font-size: 0.8rem;
          font-weight: 500;
        }
        .am-btn-save {
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
        .am-btn-save:hover:not(:disabled) {
          box-shadow: 0 6px 24px rgba(240,23,122,0.55);
          transform: translateY(-1px);
        }
        .am-btn-save:disabled { opacity: 0.5; cursor: not-allowed; }
        .am-meta {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }
      `}</style>

      <AdminShell title="Oprawa muzyczna">
        <div className="am-card">
          {/* Header row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
            <div>
              <div style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: "0.25rem" }}>
                Usługi muzyczne
              </div>
              <div className="am-meta">
                {data ? `Ostatnia aktualizacja: ${new Date(data.updatedAt).toLocaleString()}` : "Wczytywanie..."}
              </div>
            </div>
            <button onClick={onSave} disabled={!data || save.state === "saving"} className="am-btn-save">
              {save.state === "saving" ? "Zapisywanie..." : "Zapisz zmiany"}
            </button>
          </div>

          {save.state === "error" && <div className="am-msg-error">{save.message}</div>}
          {save.state === "saved" && <div className="am-msg-saved">Zapisano ({save.at})</div>}

          <button onClick={addNewService} disabled={save.state === "saving"} className="am-btn-add" style={{ width: "100%", marginBottom: "1rem" }}>
            + Dodaj nową oprawę muzyczną
          </button>

          <div style={{ display: "grid", gap: "1rem", marginTop: "0.5rem" }}>
            {data?.services.map((service) => (
              <div key={service.key} className="am-service">
                <div className="am-service-header">
                  <span className="am-service-title">{service.categoryLabel || service.title}</span>
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                    <span className="am-key-pill">{service.key}</span>
                    <button onClick={() => removeService(service.key)} disabled={save.state === "saving"} className="am-btn-remove" style={{ height: "2rem", padding: "0 1rem", fontSize: "0.75rem" }}>
                      Usuń
                    </button>
                  </div>
                </div>

                <div className="am-grid">
                  <label className="am-label am-span-2">
                    Nazwa kategorii (widoczna w menu)
                    <input
                      value={service.categoryLabel}
                      onChange={(e) => updateService(service.key, { categoryLabel: e.target.value })}
                      className="am-input"
                      placeholder="Np. Studniówki, Wesela..."
                    />
                  </label>

                  <label className="am-label am-span-2">
                    Tytuł usługi
                    <input
                      value={service.title}
                      onChange={(e) => updateService(service.key, { title: e.target.value })}
                      className="am-input"
                    />
                  </label>

                  <div className="am-label am-span-2">
                    <span>Zdjęcie</span>
                    <div className="am-upload-options" style={{ marginTop: "0.5rem" }}>
                      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
                        <button 
                          className={`ao-upload-type-btn ${!showUrlInput[service.key] ? 'active' : ''}`}
                          onClick={() => setShowUrlInput(prev => ({ ...prev, [service.key]: false }))}
                          style={{ flex: 1 }}
                        >
                          📁 Z komputera
                        </button>
                        <button 
                          className={`ao-upload-type-btn ${showUrlInput[service.key] ? 'active' : ''}`}
                          onClick={() => setShowUrlInput(prev => ({ ...prev, [service.key]: true }))}
                          style={{ flex: 1 }}
                        >
                          🔗 Z linku
                        </button>
                      </div>
                      
                      {!showUrlInput[service.key] ? (
                        <label className="ao-upload-btn">
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(e) => e.target.files?.[0] && handleImageUpload(service.key, e.target.files[0])}
                          />
                          {uploading === service.key ? "Przesyłanie..." : "Wybierz plik"}
                        </label>
                      ) : (
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          <input
                            type="text"
                            placeholder="Wklej link do zdjęcia..."
                            className="am-input"
                            style={{ flex: 1 }}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                e.currentTarget.blur();
                                handleImageUrl(service.key, e.currentTarget.value);
                                e.currentTarget.value = '';
                              }
                            }}
                          />
                          <button
                            className="am-btn-add"
                            onClick={(e) => {
                              const input = e.currentTarget.parentElement?.querySelector('input');
                              if (input?.value.trim()) {
                                handleImageUrl(service.key, input.value);
                                input.value = '';
                              }
                            }}
                            disabled={uploading === service.key}
                          >
                            Dodaj
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <label className="am-label am-span-2">
                    Opis
                    <textarea
                      value={service.description}
                      onChange={(e) => updateService(service.key, { description: e.target.value })}
                      className="am-textarea"
                    />
                  </label>

                  <div className="am-label am-span-3">
                    <div className="am-features-label">Cechy usługi</div>
                    {service.features.map((feature, index) => (
                      <div key={index} className="am-feature-input">
                        <input
                          value={feature}
                          onChange={(e) => {
                            const newFeatures = [...service.features];
                            newFeatures[index] = e.target.value;
                            updateServiceFeatures(service.key, newFeatures);
                          }}
                          className="am-input"
                          placeholder="Cecha usługi..."
                        />
                        <button
                          onClick={() => {
                            const newFeatures = service.features.filter((_, i) => i !== index);
                            updateServiceFeatures(service.key, newFeatures);
                          }}
                          className="am-btn-remove"
                        >
                          Usuń
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const newFeatures = [...service.features, ""];
                        updateServiceFeatures(service.key, newFeatures);
                      }}
                      className="am-btn-add"
                    >
                      + Dodaj cechę
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AdminShell>
    </>
  );
}
