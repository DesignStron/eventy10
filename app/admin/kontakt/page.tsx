"use client";

import { useEffect, useMemo, useState } from "react";

import AdminShell from "@/components/admin/admin-shell";
import type { ContactData, ContactMessage } from "@/lib/types";

export default function AdminContactPage() {
  const [data, setData] = useState<ContactData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      try {
        const res = await fetch("/api/kontakt");
        if (!res.ok) {
          throw new Error("Failed to fetch contact messages");
        }
        const json = (await res.json()) as ContactData;
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Bd pobierania danych");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const messageCount = useMemo(() => data?.messages.length || 0, [data]);

  if (loading) {
    return (
      <AdminShell title="Kontakt">
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <div>adowanie wiadomoci...</div>
        </div>
      </AdminShell>
    );
  }

  if (error) {
    return (
      <AdminShell title="Kontakt">
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <div style={{ color: "#ef4444", marginBottom: "1rem" }}>Bd: {error}</div>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "0.75rem 1.5rem",
              background: "linear-gradient(135deg, #f0177a, #ff4fa3)",
              color: "#fff",
              border: "none",
              borderRadius: "0.75rem",
              cursor: "pointer",
              fontSize: "0.875rem",
              fontWeight: 600,
            }}
          >
            Ponów
          </button>
        </div>
      </AdminShell>
    );
  }

  return (
    <>
      <style>{`
        .ac-card {
          background: var(--surface-elevated);
          border: 1px solid var(--border);
          border-radius: 1.25rem;
          padding: 1.5rem;
        }
        .ac-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 1.5rem;
        }
        .ac-title {
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin-bottom: 0.25rem;
        }
        .ac-count {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text);
        }
        .ac-meta {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.3);
        }
        .ac-messages {
          display: grid;
          gap: 1rem;
        }
        .ac-message {
          background: rgba(240,23,122,0.05);
          border: 1px solid rgba(240,23,122,0.12);
          border-radius: 1rem;
          padding: 1.25rem;
        }
        .ac-message-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        .ac-message-name {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text);
        }
        .ac-message-email {
          font-size: 0.875rem;
          color: rgba(255,255,255,0.6);
        }
        .ac-message-time {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.4);
        }
        .ac-message-phone {
          font-size: 0.875rem;
          color: rgba(255,255,255,0.5);
          margin-bottom: 0.5rem;
        }
        .ac-message-content {
          font-size: 0.875rem;
          color: var(--text);
          line-height: 1.5;
          white-space: pre-wrap;
        }
        .ac-empty {
          text-align: center;
          padding: 3rem 1rem;
          color: rgba(255,255,255,0.4);
        }
        .ac-empty-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        .ac-empty-text {
          font-size: 1rem;
          margin-bottom: 0.5rem;
        }
        .ac-empty-sub {
          font-size: 0.875rem;
          color: rgba(255,255,255,0.3);
        }
      `}</style>

      <AdminShell title="Kontakt">
        <div className="ac-card">
          {/* Header */}
          <div className="ac-header">
            <div>
              <div className="ac-title">Wiadomoci kontaktowe</div>
              <div className="ac-count">{messageCount}</div>
              <div className="ac-meta">
                {data ? `Ostatnia aktualizacja: ${new Date(data.updatedAt).toLocaleString()}` : "Brak danych"}
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="ac-messages">
            {data?.messages.length === 0 ? (
              <div className="ac-empty">
                <div className="ac-empty-icon"> </div>
                <div className="ac-empty-text">Brak wiadomoci</div>
                <div className="ac-empty-sub">Nie ma jeszcze adnych wiadomoci z formularza kontaktowego</div>
              </div>
            ) : (
              data?.messages.map((message) => (
                <div key={message.id} className="ac-message">
                  <div className="ac-message-header">
                    <div>
                      <div className="ac-message-name">{message.name}</div>
                      <div className="ac-message-email">{message.email}</div>
                    </div>
                    <div className="ac-message-time">
                      {message.created_at 
                        ? new Date(message.created_at).toLocaleString()
                        : "Brak daty"
                      }
                    </div>
                  </div>
                  {message.phone && (
                    <div className="ac-message-phone">
                      <strong>Telefon:</strong> {message.phone}
                    </div>
                  )}
                  <div className="ac-message-content">{message.message}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </AdminShell>
    </>
  );
}
