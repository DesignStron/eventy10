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
    () => {
      const nameValid = form.name.trim().length >= 2;
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
      const phoneValid = !form.phone.trim() || /^[+]?[\d\s\-\(\)]+$/.test(form.phone.trim());
      const messageValid = form.message.trim().length >= 10;
      
      return nameValid && emailValid && phoneValid && messageValid;
    },
    [form]
  );

  const fieldErrors = useMemo(() => {
    const errors: Record<string, string> = {};
    
    if (form.name.trim() && form.name.trim().length < 2) {
      errors.name = "Imię musi mieć co najmniej 2 znaki";
    }
    
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errors.email = "Podaj poprawny adres email";
    }
    
    if (form.phone.trim() && !/^[+]?[\d\s\-\(\)]+$/.test(form.phone.trim())) {
      errors.phone = "Podaj poprawny numer telefonu";
    }
    
    if (form.message.trim() && form.message.trim().length < 10) {
      errors.message = "Wiadomość musi mieć co najmniej 10 znaków";
    }
    
    return errors;
  }, [form]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResult(null);

    if (!canSubmit) {
      const errorMessages = Object.values(fieldErrors);
      setResult({ ok: false, message: errorMessages[0] || "Uzupełnij wymagane pola: imię, email i wiadomość." });
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
        /* ── FORM HEADER ── */
        .cf-form-title {
          font-family:var(--font-display); font-weight:700;
          font-size:1.5rem; color:#fff; margin-bottom:0.4rem;
          letter-spacing:-0.015em;
        }
        html[data-theme="light"] .cf-form-title { color:#0d0b10; }

        .cf-form-sub {
          font-size:0.84rem; color:rgba(255,255,255,0.42); line-height:1.65;
          margin-bottom:2.25rem;
        }
        html[data-theme="light"] .cf-form-sub { color:rgba(13,11,16,0.52); }

        /* ── LABEL ── */
        .cf-label {
          display:grid; gap:0.55rem;
          font-size:0.7rem; font-weight:800;
          color:rgba(255,255,255,0.45);
          letter-spacing:0.08em; text-transform:uppercase;
        }
        html[data-theme="light"] .cf-label { color:rgba(13,11,16,0.5); }

        /* ── INPUT ── */
        .cf-input {
          width:100%; height:3.1rem;
          padding:0 1.1rem;
          border-radius:0.875rem;
          border:1.5px solid rgba(255,255,255,0.08);
          background:rgba(255,255,255,0.04);
          font-family:var(--font-body); font-size:0.9rem;
          color:#fff; outline:none;
          transition:border-color 200ms ease, box-shadow 200ms ease, background 200ms ease;
          -webkit-appearance:none;
        }
        .cf-input::placeholder { color:rgba(255,255,255,0.2); }
        .cf-input:hover {
          border-color:rgba(255,255,255,0.14);
          background:rgba(255,255,255,0.06);
        }
        .cf-input:focus {
          border-color:rgba(240,23,122,0.55);
          box-shadow:0 0 0 4px rgba(240,23,122,0.1);
          background:rgba(255,255,255,0.06);
        }

        html[data-theme="light"] .cf-input {
          border:1.5px solid rgba(0,0,0,0.1);
          background:rgba(0,0,0,0.02);
          color:#0d0b10;
        }
        html[data-theme="light"] .cf-input::placeholder { color:rgba(13,11,16,0.3); }
        html[data-theme="light"] .cf-input:hover {
          border-color:rgba(0,0,0,0.16);
          background:rgba(0,0,0,0.04);
        }
        html[data-theme="light"] .cf-input:focus {
          border-color:rgba(240,23,122,0.5);
          box-shadow:0 0 0 4px rgba(240,23,122,0.1);
          background:rgba(240,23,122,0.03);
        }

        /* ── INPUT ERROR ── */
        .cf-input-error {
          border-color:rgba(239,68,68,0.5) !important;
          box-shadow:0 0 0 4px rgba(239,68,68,0.1) !important;
        }
        .cf-textarea.cf-input-error {
          border-color:rgba(239,68,68,0.5) !important;
          box-shadow:0 0 0 4px rgba(239,68,68,0.1) !important;
        }
        .cf-error {
          margin-top:0.25rem;
          font-size:0.75rem;
          color:#ef4444;
          font-weight:500;
        }
        html[data-theme="light"] .cf-error {
          color:#dc2626;
        }

        /* ── TEXTAREA ── */
        .cf-textarea {
          width:100%; min-height:8.5rem;
          padding:0.95rem 1.1rem;
          border-radius:0.875rem;
          border:1.5px solid rgba(255,255,255,0.08);
          background:rgba(255,255,255,0.04);
          font-family:var(--font-body); font-size:0.9rem;
          color:#fff; outline:none; resize:vertical;
          transition:border-color 200ms ease, box-shadow 200ms ease, background 200ms ease;
          -webkit-appearance:none;
        }
        .cf-textarea::placeholder { color:rgba(255,255,255,0.2); }
        .cf-textarea:hover {
          border-color:rgba(255,255,255,0.14);
          background:rgba(255,255,255,0.06);
        }
        .cf-textarea:focus {
          border-color:rgba(240,23,122,0.55);
          box-shadow:0 0 0 4px rgba(240,23,122,0.1);
          background:rgba(255,255,255,0.06);
        }

        html[data-theme="light"] .cf-textarea {
          border:1.5px solid rgba(0,0,0,0.1);
          background:rgba(0,0,0,0.02);
          color:#0d0b10;
        }
        html[data-theme="light"] .cf-textarea::placeholder { color:rgba(13,11,16,0.3); }
        html[data-theme="light"] .cf-textarea:hover {
          border-color:rgba(0,0,0,0.16);
          background:rgba(0,0,0,0.04);
        }
        html[data-theme="light"] .cf-textarea:focus {
          border-color:rgba(240,23,122,0.5);
          box-shadow:0 0 0 4px rgba(240,23,122,0.1);
          background:rgba(240,23,122,0.03);
        }

        /* ── SUBMIT BUTTON ── */
        .cf-btn {
          display:inline-flex; align-items:center; gap:0.5rem;
          height:3.1rem; padding:0 2rem; border-radius:9999px;
          background:var(--pink); color:#fff;
          font-size:0.875rem; font-weight:700; font-family:var(--font-body);
          border:none; cursor:pointer; letter-spacing:0.01em;
          box-shadow:0 8px 28px rgba(240,23,122,0.42);
          transition:transform 200ms ease, box-shadow 200ms ease,
                      background 200ms ease, opacity 200ms;
          position:relative; overflow:hidden;
        }
        .cf-btn::before {
          content:''; position:absolute; inset:0;
          background:linear-gradient(135deg,rgba(255,255,255,0.15) 0%,transparent 55%);
          pointer-events:none;
        }
        .cf-btn:hover:not(:disabled) {
          background:var(--pink-light);
          transform:translateY(-2px) scale(1.02);
          box-shadow:0 14px 40px rgba(240,23,122,0.56);
        }
        .cf-btn:disabled { opacity:0.6; cursor:not-allowed; }

        /* ── RESULT ── */
        .cf-result {
          margin-top:1.25rem; padding:1rem 1.25rem; border-radius:0.875rem;
          font-size:0.84rem; font-weight:600;
          display:flex; align-items:center; gap:0.65rem;
        }
        .cf-result-ok  {
          background:rgba(240,23,122,0.08); border:1px solid rgba(240,23,122,0.25);
          color:#ff4fa3;
        }
        .cf-result-err {
          background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.09);
          color:rgba(255,255,255,0.78);
        }
        html[data-theme="light"] .cf-result-err {
          background:rgba(0,0,0,0.03); border:1px solid rgba(0,0,0,0.1);
          color:rgba(13,11,16,0.72);
        }

        .cf-result-icon {
          width:22px; height:22px; border-radius:50%; flex-shrink:0;
          display:flex; align-items:center; justify-content:center;
          font-size:0.72rem; font-weight:800;
        }
        .cf-result-ok  .cf-result-icon { background:rgba(240,23,122,0.18); color:#ff4fa3; }
        .cf-result-err .cf-result-icon { background:rgba(255,255,255,0.1); color:rgba(255,255,255,0.7); }
        html[data-theme="light"] .cf-result-err .cf-result-icon {
          background:rgba(0,0,0,0.08); color:rgba(13,11,16,0.6);
        }

        /* ── REQUIRED NOTE ── */
        .cf-required-note {
          font-size:0.68rem; color:rgba(255,255,255,0.24); line-height:1.5;
        }
        html[data-theme="light"] .cf-required-note { color:rgba(13,11,16,0.35); }

        /* ── DIVIDER INSIDE FORM ── */
        .cf-inner-divider {
          height:1px; margin:2rem 0;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent);
        }
        html[data-theme="light"] .cf-inner-divider {
          background:linear-gradient(90deg,transparent,rgba(240,23,122,0.12),transparent);
        }
      `}</style>

      <form onSubmit={onSubmit} noValidate>

        {/* Form header */}
        <div>
          <h2 className="cf-form-title">Wyślij zapytanie</h2>
          <p className="cf-form-sub">Wypełnij formularz - odezwiemy się w ciągu 24h z wyceną.</p>
        </div>

        <div className="cf-inner-divider"/>

        {/* Fields */}
        <div style={{ display:"grid", gap:"1.25rem", gridTemplateColumns:"1fr 1fr" }}>

          <label className="cf-label">
            Imię i nazwisko *
            <input
              className={`cf-input ${fieldErrors.name ? 'cf-input-error' : ''}`}
              value={form.name}
              onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
              placeholder="np. Anna Kowalska"
              autoComplete="name"
            />
            {fieldErrors.name && (
              <div className="cf-error">{fieldErrors.name}</div>
            )}
          </label>

          <label className="cf-label">
            E-mail *
            <input
              className={`cf-input ${fieldErrors.email ? 'cf-input-error' : ''}`}
              type="email"
              value={form.email}
              onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
              placeholder="anna@firma.pl"
              autoComplete="email"
            />
            {fieldErrors.email && (
              <div className="cf-error">{fieldErrors.email}</div>
            )}
          </label>

          <label className="cf-label" style={{ gridColumn:"1 / -1" }}>
            Telefon <span style={{ opacity:0.5, fontWeight:500, textTransform:"none", letterSpacing:0 }}>(opcjonalnie)</span>
            <input
              className={`cf-input ${fieldErrors.phone ? 'cf-input-error' : ''}`}
              type="tel"
              value={form.phone}
              onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
              placeholder="+48 600 000 000"
              autoComplete="tel"
            />
            {fieldErrors.phone && (
              <div className="cf-error">{fieldErrors.phone}</div>
            )}
          </label>

          <label className="cf-label" style={{ gridColumn:"1 / -1" }}>
            Wiadomość *
            <textarea
              className={`cf-textarea ${fieldErrors.message ? 'cf-input-error' : ''}`}
              value={form.message}
              onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
              placeholder="Opisz event: termin, liczba osób, miejsce, oczekiwania…"
            />
            {fieldErrors.message && (
              <div className="cf-error">{fieldErrors.message}</div>
            )}
          </label>

        </div>

        {/* Result */}
        {result && (
          <div className={`cf-result ${result.ok ? "cf-result-ok" : "cf-result-err"}`}>
            <div className="cf-result-icon">{result.ok ? "✓" : "!"}</div>
            {result.message}
          </div>
        )}

        {/* Bottom row */}
        <div style={{
          display:"flex", alignItems:"center", justifyContent:"space-between",
          marginTop:"1.75rem", gap:"1rem", flexWrap:"wrap",
        }}>
          <p className="cf-required-note">* pola wymagane</p>
          <button type="submit" disabled={submitting} className="cf-btn">
            {submitting ? "Wysyłanie…" : "Wyślij wiadomość →"}
          </button>
        </div>

      </form>
    </>
  );
}