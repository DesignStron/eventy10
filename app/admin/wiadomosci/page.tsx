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

  const selected = useMemo(() => {
    return data?.messages.find((m) => m.id === selectedId) ?? null;
  }, [data, selectedId]);

  return (
    <AdminShell
      title="Formularze kontaktowe"
      description="Lista zgłoszeń z formularza /kontakt. Kliknij pozycję, aby podejrzeć wiadomość." 
    >
      <div className="grid gap-6 md:grid-cols-[360px_1fr]">
        <div className="rounded-3xl bg-white p-4 ring-1 ring-black/10">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-black">Zgłoszenia</div>
            <a
              href="/kontakt"
              className="rounded-full bg-pink-500/10 px-3 py-2 text-xs font-semibold text-black transition-colors hover:bg-pink-500/15"
            >
              Formularz
            </a>
          </div>

          <div className="mt-3 grid gap-2">
            {data?.messages.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedId(m.id)}
                className={
                  "rounded-2xl px-4 py-3 text-left transition-colors ring-1 " +
                  (m.id === selectedId
                    ? "bg-black text-white ring-black"
                    : "bg-white text-black ring-black/10 hover:bg-pink-500/10")
                }
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-semibold">{m.name}</div>
                  <div className={
                    "rounded-full px-3 py-1 text-xs font-semibold " +
                    (m.id === selectedId ? "bg-white/10" : "bg-pink-500/10")
                  }>
                    {m.status}
                  </div>
                </div>
                <div className={
                  "mt-1 text-xs " +
                  (m.id === selectedId ? "text-white/70" : "text-black/60")
                }>
                  {new Date(m.createdAt).toLocaleString()}
                </div>
              </button>
            ))}
          </div>

          {data && data.messages.length === 0 ? (
            <div className="mt-4 rounded-2xl bg-pink-500/5 px-4 py-4 text-sm text-black/70">
              Brak zgłoszeń.
            </div>
          ) : null}
        </div>

        <MessagePreview message={selected} />
      </div>
    </AdminShell>
  );
}

function MessagePreview({ message }: { message: ContactMessage | null }) {
  if (!message) {
    return (
      <div className="rounded-3xl bg-white p-6 ring-1 ring-black/10">
        <div className="text-sm font-semibold text-black">Podgląd wiadomości</div>
        <div className="mt-2 text-sm text-black/70">Wybierz zgłoszenie z listy.</div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white p-6 ring-1 ring-black/10">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="text-sm font-semibold text-black">{message.name}</div>
          <div className="mt-1 text-sm text-black/70">{message.email}</div>
          <div className="mt-1 text-sm text-black/70">{message.phone}</div>
        </div>
        <div className="rounded-2xl bg-black px-4 py-3 text-xs font-semibold text-white">
          {new Date(message.createdAt).toLocaleString()}
        </div>
      </div>

      <div className="mt-6 rounded-3xl bg-pink-500/5 p-5">
        <div className="text-xs font-semibold text-black/60">Wiadomość</div>
        <div className="mt-2 whitespace-pre-wrap text-sm leading-6 text-black/80">
          {message.message}
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        <a
          href={`mailto:${encodeURIComponent(message.email)}?subject=${encodeURIComponent(
            "Różowy Event — odpowiedź na zapytanie",
          )}`}
          className="inline-flex h-11 items-center justify-center rounded-full bg-pink-500 px-6 text-sm font-semibold text-white shadow-sm shadow-pink-500/30 transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Odpowiedz mailem
        </a>
        <a
          href={`tel:${message.phone}`}
          className="inline-flex h-11 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-black ring-1 ring-black/10 transition-colors hover:bg-pink-500/10"
        >
          Zadzwoń
        </a>
      </div>
    </div>
  );
}
