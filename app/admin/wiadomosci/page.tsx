"use client";

import { useEffect, useMemo, useState } from "react";

import AdminShell from "@/components/admin/admin-shell";
import type { ContactData, ContactMessage } from "@/lib/types";

export default function AdminMessagesPage() {
  const [data, setData] = useState<ContactData | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      const res = await fetch("/api/kontakt");
      const json = (await res.json()) as ContactData;
      setData(json);
      setSelectedId((prev) => prev ?? json.messages[0]?.id ?? null);
    })();
  }, []);

  const selected = useMemo(
    () => data?.messages.find((m) => m.id === selectedId) ?? null,
    [data, selectedId],
  );

  return (
    <AdminShell
      title="Formularze kontaktowe"
      description="Lista zgłoszeń z formularza /kontakt. Kliknij pozycję, aby podejrzeć wiadomość."
    >
      <style>{`
        .am-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        @media (min-width: 768px) {
          .am-layout { grid-template-columns: 1fr 2fr; gap: 2rem; }
        }
        .am-panel {
          background: var(--surface-elevated);
          border: 1px solid var(--border);
          border-radius: 1.25rem;
          padding: 1rem;
        }
        .am-panel-title {
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 1rem;
        }
        .am-list { display: flex; flex-direction: column; gap: 0.4rem; }
        .am-item {
          width: 100%;
          text-align: left;
          padding: 0.875rem 1rem;
          border-radius: 0.875rem;
          border: 1px solid transparent;
          background: transparent;
          cursor: pointer;
          transition: all 180ms ease;
        }
        .am-item:hover { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.08); }
        .am-item.active {
          background: rgba(240,23,122,0.12);
          border-color: rgba(240,23,122,0.3);
        }
        .am-item-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
        }
        .am-item-date {
          font-size: 0.7rem;
          color: var(--text-muted);
          margin-top: 0.2rem;
        }
        .am-status {
          display: inline-block;
          padding: 0.15rem 0.5rem;
          border-radius: 9999px;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          background: var(--surface);
          border: 1px solid var(--border);
          color: var(--text-secondary);
          flex-shrink: 0;
        }
        .am-item.active .am-status {
          background: rgba(240,23,122,0.2);
          color: var(--pink-light);
        }
        .am-empty {
          padding: 1.5rem 1rem;
          text-align: center;
          font-size: 0.8rem;
          color: var(--text-muted);
          border-radius: 0.75rem;
          border: 1px dashed var(--border);
        }
        .am-preview-row {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          margin-bottom: 1.25rem;
        }
        @media (min-width: 480px) {
          .am-preview-row { flex-direction: row; align-items: flex-start; justify-content: space-between; }
        }
        .am-preview-name {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 0.25rem;
        }
        .am-preview-sub {
          font-size: 0.8rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        .am-date-badge {
          display: inline-block;
          padding: 0.375rem 0.75rem;
          border-radius: 0.625rem;
          background: var(--surface);
          border: 1px solid var(--border);
          font-size: 0.72rem;
          color: var(--text-secondary);
          white-space: nowrap;
          flex-shrink: 0;
          font-family: var(--font-mono);
        }
        .am-message-box {
          background: rgba(240,23,122,0.05);
          border: 1px solid rgba(240,23,122,0.12);
          border-radius: 1rem;
          padding: 1.25rem;
          margin-bottom: 1.25rem;
        }
        .am-message-label {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 0.75rem;
        }
        .am-message-text {
          font-size: 0.875rem;
          color: var(--text);
          line-height: 1.8;
          white-space: pre-wrap;
        }
        .am-actions {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.75rem;
        }
        @media (min-width: 480px) {
          .am-actions { grid-template-columns: 1fr 1fr; gap: 1rem; }
        }
        .am-btn-primary {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 2.5rem;
          border-radius: 9999px;
          background: linear-gradient(135deg, #f0177a, #ff4fa3);
          color: #fff;
          font-size: 0.8rem;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 0 4px 16px rgba(240,23,122,0.35);
          transition: all 200ms ease;
        }
        .am-btn-primary:hover { box-shadow: 0 6px 24px rgba(240,23,122,0.55); transform: translateY(-1px); }
        .am-btn-outline {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 2.5rem;
          border-radius: 9999px;
          background: var(--surface);
          border: 1px solid var(--border);
          color: var(--text-secondary);
          font-size: 0.8rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 200ms ease;
        }
        .am-btn-outline:hover { background: var(--surface-elevated); color: var(--text); }
        .am-form-link {
          display: inline-flex;
          align-items: center;
          padding: 0.3rem 0.75rem;
          border-radius: 9999px;
          background: var(--surface);
          border: 1px solid var(--border);
          color: var(--text-secondary);
          font-size: 0.7rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 180ms ease;
        }
        .am-form-link:hover { color: var(--text); }
      `}</style>

      <div className="am-layout">
        {/* ── LIST PANEL ── */}
        <div className="am-panel">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <div className="am-panel-title" style={{ marginBottom: 0 }}>Zgłoszenia</div>
            <a href="/kontakt" className="am-form-link">Formularz →</a>
          </div>

          {data && data.messages.length > 0 ? (
            <div className="am-list">
              {data.messages.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedId(m.id)}
                  className={`am-item${m.id === selectedId ? " active" : ""}`}
                >
                  <div className="am-item-name">
                    {m.name}
                    <span className="am-status">{m.status}</span>
                  </div>
                  <div className="am-item-date">{new Date(m.createdAt).toLocaleString()}</div>
                </button>
              ))}
            </div>
          ) : (
            <div className="am-empty">
              {data ? "Brak zgłoszeń." : "Wczytywanie…"}
            </div>
          )}
        </div>

        {/* ── PREVIEW PANEL ── */}
        <div className="am-panel">
          {selected ? (
            <>
              <div className="am-preview-row">
                <div>
                  <div className="am-preview-name">{selected.name}</div>
                  <div className="am-preview-sub">
                    {selected.email}<br />{selected.phone}
                  </div>
                </div>
                <span className="am-date-badge">
                  {new Date(selected.createdAt).toLocaleString()}
                </span>
              </div>

              <div className="am-message-box">
                <div className="am-message-label">Wiadomość</div>
                <div className="am-message-text">{selected.message}</div>
              </div>

              <div className="am-actions">
                <a
                  href={`mailto:${encodeURIComponent(selected.email)}?subject=${encodeURIComponent("Różowy Event — odpowiedź na zapytanie")}`}
                  className="am-btn-primary"
                >
                  Odpowiedz mailem
                </a>
                <a href={`tel:${selected.phone}`} className="am-btn-outline">
                  Zadzwoń
                </a>
              </div>
            </>
          ) : (
            <div style={{ padding: "2rem 0", textAlign: "center" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "0.75rem", opacity: 0.4 }}>◎</div>
              <div style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.35)" }}>
                Wybierz zgłoszenie z listy.
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  );
}