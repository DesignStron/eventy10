"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type ConsentState = {
  necessary: true;
  preferences: boolean;
  analytics: boolean;
  marketing: boolean;
};

type StoredConsent =
  | { v: 1; mode: "all"; updatedAt: string }
  | { v: 1; mode: "necessary"; updatedAt: string }
  | { v: 1; mode: "custom"; updatedAt: string; settings: ConsentState };

const STORAGE_KEY = "cookie_consent";

function safeParse(json: string | null): StoredConsent | null {
  if (!json) return null;
  try {
    return JSON.parse(json) as StoredConsent;
  } catch {
    return null;
  }
}

function buildConsent(mode: StoredConsent["mode"], settings?: ConsentState): StoredConsent {
  const updatedAt = new Date().toISOString();
  if (mode === "custom") {
    return { v: 1, mode, updatedAt, settings: settings! };
  }
  return { v: 1, mode, updatedAt };
}

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [settings, setSettings] = useState<ConsentState>({
    necessary: true,
    preferences: false,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = safeParse(window.localStorage.getItem(STORAGE_KEY));
    if (!stored) {
      setOpen(true);
      return;
    }

    if (stored.mode === "custom") {
      setSettings(stored.settings);
    }

    setOpen(false);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onOpen = () => {
      setOpen(true);
      setExpanded(true);
    };

    window.addEventListener("open-cookie-settings", onOpen);
    return () => window.removeEventListener("open-cookie-settings", onOpen);
  }, []);

  if (!open) return null;

  const acceptAll = () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(buildConsent("all")));
    setSettings({ necessary: true, preferences: true, analytics: true, marketing: true });
    setOpen(false);
  };

  const reject = () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(buildConsent("necessary")));
    setSettings({ necessary: true, preferences: false, analytics: false, marketing: false });
    setOpen(false);
  };

  const saveCustom = () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(buildConsent("custom", settings)));
    setOpen(false);
  };

  return (
    <>
      <style>{`
        .cc-wrap{position:fixed;right:1rem;bottom:1rem;z-index:9999;width:min(420px,calc(100vw - 2rem))}
        .cc-card{border-radius:1.25rem;overflow:hidden;position:relative}
        .cc-card::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 70% 90% at 20% 0%,rgba(240,23,122,.16) 0%,transparent 55%),linear-gradient(180deg,rgba(255,255,255,.04),rgba(255,255,255,.02));pointer-events:none}
        .cc-card{background:rgba(10,8,12,.78);border:1px solid rgba(255,255,255,.09);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);box-shadow:0 18px 60px rgba(0,0,0,.55)}
        html[data-theme="light"] .cc-card{background:rgba(255,255,255,.92);border-color:rgba(0,0,0,.08);box-shadow:0 18px 60px rgba(0,0,0,.12)}
        .cc-inner{position:relative;padding:1.2rem 1.2rem 1rem}
        .cc-top{display:flex;align-items:flex-start;justify-content:space-between;gap:1rem;margin-bottom:.85rem}
        .cc-title{font-family:var(--font-display);font-size:1.05rem;letter-spacing:-.02em;font-weight:700;color:#fff;margin:0}
        html[data-theme="light"] .cc-title{color:#0d0b10}
        .cc-x{border:none;background:transparent;color:rgba(255,255,255,.6);cursor:pointer;padding:.25rem;border-radius:.5rem;line-height:1;transition:background 150ms,color 150ms}
        .cc-x:hover{background:rgba(255,255,255,.06);color:#fff}
        html[data-theme="light"] .cc-x{color:rgba(13,11,16,.55)}
        html[data-theme="light"] .cc-x:hover{background:rgba(0,0,0,.05);color:#0d0b10}

        .cc-desc{color:rgba(255,255,255,.55);font-size:.86rem;line-height:1.65;margin:0 0 .9rem}
        html[data-theme="light"] .cc-desc{color:rgba(13,11,16,.62)}

        .cc-actions{display:flex;gap:.6rem;flex-wrap:wrap}
        .cc-btn{height:2.65rem;padding:0 1.1rem;border-radius:9999px;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.04);color:rgba(255,255,255,.82);font-size:.82rem;font-weight:700;cursor:pointer;transition:transform 150ms,box-shadow 150ms,border-color 150ms,background 150ms;color:rgba(255,255,255,.8)}
        .cc-btn:hover{transform:translateY(-1px);border-color:rgba(240,23,122,.35);box-shadow:0 10px 26px rgba(0,0,0,.32)}
        html[data-theme="light"] .cc-btn{background:rgba(0,0,0,.03);border-color:rgba(0,0,0,.1);color:rgba(13,11,16,.72)}
        html[data-theme="light"] .cc-btn:hover{border-color:rgba(240,23,122,.4);box-shadow:0 10px 26px rgba(0,0,0,.12)}

        .cc-btn-primary{background:linear-gradient(135deg,#f0177a,#ff4fa3);border-color:rgba(240,23,122,.35);color:#fff;box-shadow:0 10px 30px rgba(240,23,122,.28)}
        .cc-btn-primary:hover{box-shadow:0 16px 44px rgba(240,23,122,.38)}

        .cc-link{display:inline-block;margin-top:.75rem;font-size:.75rem;text-decoration:none;color:rgba(255,255,255,.55)}
        .cc-link:hover{color:var(--pink-light)}
        html[data-theme="light"] .cc-link{color:rgba(13,11,16,.6)}
        html[data-theme="light"] .cc-link:hover{color:var(--pink)}

        .cc-panel{margin-top:1rem;padding-top:1rem;border-top:1px solid rgba(255,255,255,.08)}
        html[data-theme="light"] .cc-panel{border-top-color:rgba(0,0,0,.08)}
        .cc-row{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:.55rem .65rem;border-radius:.85rem;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);margin-bottom:.55rem}
        html[data-theme="light"] .cc-row{background:rgba(0,0,0,.02);border-color:rgba(0,0,0,.08)}
        .cc-row strong{font-size:.82rem;color:rgba(255,255,255,.86)}
        html[data-theme="light"] .cc-row strong{color:#0d0b10}
        .cc-row span{display:block;font-size:.72rem;color:rgba(255,255,255,.46);margin-top:.12rem;line-height:1.35}
        html[data-theme="light"] .cc-row span{color:rgba(13,11,16,.52)}

        .cc-switch{position:relative;width:44px;height:24px;border-radius:9999px;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.16);cursor:pointer;flex-shrink:0;transition:background 180ms,border-color 180ms}
        html[data-theme="light"] .cc-switch{background:rgba(0,0,0,.08);border-color:rgba(0,0,0,.12)}
        .cc-switch[data-on="true"]{background:rgba(240,23,122,.28);border-color:rgba(240,23,122,.45)}
        .cc-dot{position:absolute;top:50%;transform:translateY(-50%);left:3px;width:18px;height:18px;border-radius:50%;background:#fff;transition:left 180ms}
        .cc-switch[data-on="true"] .cc-dot{left:21px}
        .cc-switch[aria-disabled="true"]{opacity:.6;cursor:not-allowed}
      `}</style>

      <div className="cc-wrap" role="dialog" aria-modal="true" aria-label="Ustawienia cookies">
        <div className="cc-card">
          <div className="cc-inner">
            <div className="cc-top">
              <h2 className="cc-title">Pliki cookies</h2>
              <button
                className="cc-x"
                onClick={() => {
                  setOpen(false);
                }}
                aria-label="Zamknij"
              >
                ✕
              </button>
            </div>

            <p className="cc-desc">
              Używamy cookies, aby zapewnić prawidłowe działanie strony oraz (za Twoją zgodą) analizować ruch i dopasowywać treści.
            </p>

            <div className="cc-actions">
              <button className="cc-btn" onClick={reject}>Odmowa</button>
              <button className="cc-btn" onClick={() => setExpanded((v) => !v)}>Zmień ustawienia</button>
              <button className="cc-btn cc-btn-primary" onClick={acceptAll}>OK, zgoda</button>
            </div>

            <Link className="cc-link" href="/polityka-prywatnosci">
              Polityka prywatności i cookies
            </Link>

            {expanded && (
              <div className="cc-panel">
                <div className="cc-row">
                  <div>
                    <strong>Niezbędne</strong>
                    <span>Zawsze aktywne — wymagane do działania strony.</span>
                  </div>
                  <div className="cc-switch" data-on="true" aria-disabled="true" role="switch" aria-checked="true">
                    <span className="cc-dot" />
                  </div>
                </div>

                <div className="cc-row">
                  <div>
                    <strong>Preferencje</strong>
                    <span>Zapamiętują ustawienia i wybory użytkownika.</span>
                  </div>
                  <button
                    type="button"
                    className="cc-switch"
                    data-on={String(settings.preferences)}
                    role="switch"
                    aria-checked={settings.preferences}
                    onClick={() => setSettings((s) => ({ ...s, preferences: !s.preferences }))}
                  >
                    <span className="cc-dot" />
                  </button>
                </div>

                <div className="cc-row">
                  <div>
                    <strong>Statystyka</strong>
                    <span>Pozwalają analizować ruch na stronie (po zgodzie).</span>
                  </div>
                  <button
                    type="button"
                    className="cc-switch"
                    data-on={String(settings.analytics)}
                    role="switch"
                    aria-checked={settings.analytics}
                    onClick={() => setSettings((s) => ({ ...s, analytics: !s.analytics }))}
                  >
                    <span className="cc-dot" />
                  </button>
                </div>

                <div className="cc-row" style={{ marginBottom: 0 }}>
                  <div>
                    <strong>Marketing</strong>
                    <span>Służą do dopasowywania reklam i treści.</span>
                  </div>
                  <button
                    type="button"
                    className="cc-switch"
                    data-on={String(settings.marketing)}
                    role="switch"
                    aria-checked={settings.marketing}
                    onClick={() => setSettings((s) => ({ ...s, marketing: !s.marketing }))}
                  >
                    <span className="cc-dot" />
                  </button>
                </div>

                <div className="cc-actions" style={{ marginTop: "0.9rem" }}>
                  <button className="cc-btn" onClick={reject}>Odrzuć</button>
                  <button className="cc-btn cc-btn-primary" onClick={saveCustom}>Zapisz ustawienia</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
