"use client";

import { useMemo, useState } from "react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<null | { ok: boolean; message: string }>(null);

  const canSubmit = useMemo(() => {
    return form.name.trim() && form.email.trim() && form.message.trim();
  }, [form]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResult(null);

    if (!canSubmit) {
      setResult({ ok: false, message: "Uzupełnij wymagane pola: imię, email i wiadomość." });
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/kontakt", {
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
    <form
      onSubmit={onSubmit}
      style={{
        background: "#fff",
        borderRadius: "2rem",
        padding: "2.5rem",
        boxShadow: "0 40px 100px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)",
      }}
    >
      <div style={{ marginBottom: "2rem" }}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "1.5rem",
            color: "#060508",
            marginBottom: "0.4rem",
          }}
        >
          Wyślij zapytanie
        </h2>
        <p style={{ fontSize: "0.875rem", color: "rgba(6,5,8,0.55)", lineHeight: 1.6 }}>
          Wypełnij formularz — odezwiemy się w ciągu 24h z wyceną.
        </p>
      </div>

      <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "1fr 1fr" }}>
        <label style={{ display: "grid", gap: "0.5rem", fontSize: "0.8rem", fontWeight: 700, color: "#060508", letterSpacing: "0.03em" }}>
          Imię i nazwisko *
          <input
            value={form.name}
            onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
            className="input-field"
            placeholder="np. Anna Kowalska"
            autoComplete="name"
          />
        </label>

        <label style={{ display: "grid", gap: "0.5rem", fontSize: "0.8rem", fontWeight: 700, color: "#060508", letterSpacing: "0.03em" }}>
          Email *
          <input
            value={form.email}
            onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
            className="input-field"
            placeholder="anna@firma.pl"
            autoComplete="email"
            type="email"
          />
        </label>

        <label style={{ display: "grid", gap: "0.5rem", fontSize: "0.8rem", fontWeight: 700, color: "#060508", letterSpacing: "0.03em", gridColumn: "1 / -1" }}>
          Telefon
          <input
            value={form.phone}
            onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
            className="input-field"
            placeholder="+48 600 000 000"
            autoComplete="tel"
          />
        </label>

        <label style={{ display: "grid", gap: "0.5rem", fontSize: "0.8rem", fontWeight: 700, color: "#060508", letterSpacing: "0.03em", gridColumn: "1 / -1" }}>
          Wiadomość *
          <textarea
            value={form.message}
            onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
            className="textarea-field"
            placeholder="Opisz event: termin, liczba osób, miejsce, oczekiwania…"
          />
        </label>
      </div>

      {result && (
        <div
          style={{
            marginTop: "1.25rem",
            padding: "1rem 1.25rem",
            borderRadius: "1rem",
            background: result.ok ? "rgba(240,23,122,0.08)" : "#060508",
            border: result.ok ? "1px solid rgba(240,23,122,0.25)" : "1px solid rgba(255,255,255,0.1)",
            color: result.ok ? "#b5004e" : "#fff",
            fontSize: "0.875rem",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span>{result.ok ? "✅" : "⚠️"}</span>
          {result.message}
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "1.75rem", gap: "1rem", flexWrap: "wrap" }}>
        <p style={{ fontSize: "0.72rem", color: "rgba(6,5,8,0.4)", lineHeight: 1.5 }}>
          * pola wymagane · dane zapisują się lokalnie (demo)
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="btn-pink"
          style={{ opacity: submitting ? 0.65 : 1, cursor: submitting ? "not-allowed" : "pointer" }}
        >
          {submitting ? "Wysyłanie…" : "Wyślij wiadomość →"}
        </button>
      </div>
    </form>
  );
}