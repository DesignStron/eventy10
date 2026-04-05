"use client";

import { useMemo, useState } from "react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<null | { ok: boolean; message: string }>(null);

  const canSubmit = useMemo(
    () => form.name.trim() && form.email.trim() && form.message.trim(),
    [form]
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResult(null);

    if (!canSubmit) {
      setResult({ ok: false, message: "Uzupełnij wymagane pola: imię, email i wiadomość." });
      return;
    }

    setSubmitting(true);
    try {
      const res  = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        setResult({ ok: false, message: data.error ?? "Wystąpił błąd." });
        return;
      }

      setResult({ ok: true, message: "Dziękujemy! Odezwiemy się najszybciej jak to możliwe." });
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setResult({ ok: false, message: "Nie udało się wysłać formularza." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <style>{`
        @keyframes pulseDot{0%,100%{opacity:1}50%{opacity:.35}}

        .cf-label {
          display: grid;
          gap: 0.5rem;
          font-size: 0.75rem;
          font-weight: 700;
          color: rgba(255,255,255,0.55);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .cf-input {
          width: 100%;
          height: 3rem;
          padding: 0 1rem;
          border-radius: 0.75rem;
          border: 1.5px solid rgba(255,255,255,0.09);
          background: rgba(255,255,255,0.05);
          font-family: var(--font-body);
          font-size: 0.9rem;
          color: #fff;
          outline: none;
          transition: border-color 180ms ease, box-shadow 180ms ease, background 180ms ease;
          -webkit-appearance: none;
        }
        .cf-input::placeholder { color: rgba(255,255,255,0.25); }
        .cf-input:hover { border-color: rgba(255,255,255,0.16); background: rgba(255,255,255,0.07); }
        .cf-input:focus {
          border-color: rgba(240,23,122,0.55);
          box-shadow: 0 0 0 3px rgba(240,23,122,0.1);
          background: rgba(255,255,255,0.07);
        }

        .cf-textarea {
          width: 100%;
          min-height: 8rem;
          padding: 0.875rem 1rem;
          border-radius: 0.75rem;
          border: 1.5px solid rgba(255,255,255,0.09);
          background: rgba(255,255,255,0.05);
          font-family: var(--font-body);
          font-size: 0.9rem;
          color: #fff;
          outline: none;
          resize: vertical;
          transition: border-color 180ms ease, box-shadow 180ms ease, background 180ms ease;
          -webkit-appearance: none;
        }
        .cf-textarea::placeholder { color: rgba(255,255,255,0.25); }
        .cf-textarea:hover { border-color: rgba(255,255,255,0.16); background: rgba(255,255,255,0.07); }
        .cf-textarea:focus {
          border-color: rgba(240,23,122,0.55);
          box-shadow: 0 0 0 3px rgba(240,23,122,0.1);
          background: rgba(255,255,255,0.07);
        }

        .cf-btn {
          display: inline-flex; align-items: center; gap: 0.5rem;
          height: 3rem; padding: 0 1.75rem; border-radius: 9999px;
          background: var(--pink); color: #fff;
          font-size: 0.875rem; font-weight: 700; font-family: var(--font-body);
          border: none; cursor: pointer; letter-spacing: 0.01em;
          box-shadow: 0 6px 24px rgba(240,23,122,0.42);
          transition: transform 200ms ease, box-shadow 200ms ease, background 200ms ease, opacity 200ms;
          position: relative; overflow: hidden;
        }
        .cf-btn::before {
          content: "";
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.13) 0%, transparent 55%);
          pointer-events: none;
        }
        .cf-btn:hover:not(:disabled) {
          background: var(--pink-light);
          transform: translateY(-2px);
          box-shadow: 0 10px 36px rgba(240,23,122,0.56);
        }
        .cf-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .cf-result-ok  { background:rgba(240,23,122,0.08); border:1px solid rgba(240,23,122,0.25); color:#ff4fa3; }
        .cf-result-err { background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); color:rgba(255,255,255,0.8); }
        .cf-result {
          margin-top: 1.25rem; padding: 0.9rem 1.1rem; border-radius: 0.75rem;
          font-size: 0.84rem; font-weight: 600; display: flex; align-items: center; gap: 0.6rem;
        }
        .cf-result-icon {
          width: 20px; height: 20px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center; font-size: 0.7rem;
        }
        .cf-result-ok  .cf-result-icon { background: rgba(240,23,122,0.2); color:#ff4fa3; }
        .cf-result-err .cf-result-icon { background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.6); }

        html[data-theme="light"] .cf-label { color: rgba(0,0,0,0.55); }

        html[data-theme="light"] .cf-input,
        html[data-theme="light"] .cf-textarea {
          border: 1.5px solid rgba(0,0,0,0.12);
          background: rgba(0,0,0,0.03);
          color: var(--black);
        }
        html[data-theme="light"] .cf-input::placeholder,
        html[data-theme="light"] .cf-textarea::placeholder { color: rgba(0,0,0,0.35); }
        html[data-theme="light"] .cf-input:hover,
        html[data-theme="light"] .cf-textarea:hover {
          border-color: rgba(0,0,0,0.18);
          background: rgba(0,0,0,0.04);
        }
        html[data-theme="light"] .cf-input:focus,
        html[data-theme="light"] .cf-textarea:focus {
          border-color: rgba(240,23,122,0.55);
          box-shadow: 0 0 0 3px rgba(240,23,122,0.12);
          background: rgba(240,23,122,0.05);
        }

        html[data-theme="light"] .cf-result-err {
          background: rgba(0,0,0,0.03);
          border: 1px solid rgba(0,0,0,0.10);
          color: rgba(0,0,0,0.75);
        }
        html[data-theme="light"] .cf-result-err .cf-result-icon {
          background: rgba(0,0,0,0.08);
          color: rgba(0,0,0,0.6);
        }
      `}</style>

      <form onSubmit={onSubmit} noValidate>

        {/* form title */}
        <div style={{ marginBottom:"2rem" }}>
          <h2 style={{
            fontFamily:"var(--font-display)", fontWeight:700,
            fontSize:"1.4rem", color:"#fff", marginBottom:"0.35rem",
          }}>
            Wyślij zapytanie
          </h2>
          <p style={{ fontSize:"0.84rem", color:"rgba(255,255,255,0.45)", lineHeight:1.65 }}>
            Wypełnij formularz — odezwiemy się w ciągu 24h z wyceną.
          </p>
        </div>

        {/* fields */}
        <div style={{ display:"grid", gap:"1.1rem", gridTemplateColumns:"1fr 1fr" }}>

          <label className="cf-label">
            Imię i nazwisko *
            <input
              className="cf-input"
              value={form.name}
              onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
              placeholder="np. Anna Kowalska"
              autoComplete="name"
            />
          </label>

          <label className="cf-label">
            E-mail *
            <input
              className="cf-input"
              type="email"
              value={form.email}
              onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
              placeholder="anna@firma.pl"
              autoComplete="email"
            />
          </label>

          <label className="cf-label" style={{ gridColumn:"1 / -1" }}>
            Telefon
            <input
              className="cf-input"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
              placeholder="+48 600 000 000"
              autoComplete="tel"
            />
          </label>

          <label className="cf-label" style={{ gridColumn:"1 / -1" }}>
            Wiadomość *
            <textarea
              className="cf-textarea"
              value={form.message}
              onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
              placeholder="Opisz event: termin, liczba osób, miejsce, oczekiwania…"
            />
          </label>

        </div>

        {/* feedback */}
        {result && (
          <div className={`cf-result ${result.ok ? "cf-result-ok" : "cf-result-err"}`}>
            <div className="cf-result-icon">
              {result.ok ? "✓" : "!"}
            </div>
            {result.message}
          </div>
        )}

        {/* bottom row */}
        <div style={{
          display:"flex", alignItems:"center", justifyContent:"space-between",
          marginTop:"1.75rem", gap:"1rem", flexWrap:"wrap",
        }}>
          <p style={{ fontSize:"0.7rem", color:"rgba(255,255,255,0.28)", lineHeight:1.5 }}>
            * pola wymagane
          </p>
          <button type="submit" disabled={submitting} className="cf-btn">
            {submitting ? "Wysyłanie…" : "Wyślij wiadomość →"}
          </button>
        </div>

      </form>
    </>
  );
}