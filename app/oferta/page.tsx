import type { OfferData, OfferSection } from "@/lib/types";
import { nowIso, readJsonFile } from "@/lib/data-store";

export const metadata = {
  title: "Oferta",
};

const FALLBACK: OfferData = {
  updatedAt: nowIso(),
  sections: [],
};

function SectionCard({ section }: { section: OfferSection }) {
  return (
    <section
      id={section.key}
      className="scroll-mt-28 rounded-3xl bg-white p-6 ring-1 ring-black/10"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-pink-500/10 px-3 py-1 text-xs font-semibold text-black">
            {section.key === "urodziny" && "Dla dzieci"}
            {section.key === "szkolne" && "Dla szkół"}
            {section.key === "firmowe" && "Dla firm"}
          </div>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-black">
            {section.title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-black/70">
            {section.description}
          </p>
        </div>

        <div className="rounded-3xl bg-black px-5 py-4 text-white">
          <div className="text-xs font-semibold text-white/80">Cena od</div>
          <div className="mt-1 text-2xl font-semibold">
            {section.priceFromPLN} zł
          </div>
          <div className="mt-1 text-xs text-white/70">Wycena zależna od terminu i zakresu</div>
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {section.bullets.map((b) => (
          <div
            key={b}
            className="rounded-2xl bg-pink-500/5 px-4 py-3 text-sm text-black/80"
          >
            {b}
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <a
          href="/kontakt"
          className="inline-flex h-12 items-center justify-center rounded-full bg-pink-500 px-6 text-sm font-semibold text-white shadow-sm shadow-pink-500/30 transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Poproś o wycenę
        </a>
        <a
          href="/galeria"
          className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-black ring-1 ring-black/10 transition-colors hover:bg-pink-500/10"
        >
          Zobacz realizacje
        </a>
      </div>
    </section>
  );
}

export default async function OfferPage() {
  const data = await readJsonFile<OfferData>("oferta.json", FALLBACK);

  return (
    <div className="app-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-xs font-semibold text-white">
            <span className="h-2 w-2 rounded-full bg-pink-500" />
            Oferta
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-black md:text-5xl">
            Pakiety dopasowane do Twojego wydarzenia
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-black/70 md:text-lg">
            Poniżej widzisz przykładowe pakiety i ceny startowe. W panelu admina (demo)
            można edytować opisy oraz ceny, a zmiany od razu pojawiają się na stronie.
          </p>

          <div className="mt-6 grid gap-3 rounded-3xl bg-white p-6 ring-1 ring-black/10 md:grid-cols-3">
            <a
              href="#urodziny"
              className="rounded-2xl bg-pink-500/10 px-4 py-3 text-sm font-semibold text-black transition-colors hover:bg-pink-500/15"
            >
              Urodziny dla dzieci
            </a>
            <a
              href="#szkolne"
              className="rounded-2xl bg-pink-500/10 px-4 py-3 text-sm font-semibold text-black transition-colors hover:bg-pink-500/15"
            >
              Eventy szkolne
            </a>
            <a
              href="#firmowe"
              className="rounded-2xl bg-pink-500/10 px-4 py-3 text-sm font-semibold text-black transition-colors hover:bg-pink-500/15"
            >
              Imprezy firmowe
            </a>
          </div>
        </div>

        <div className="mt-8 grid gap-5">
          {data.sections.map((section) => (
            <SectionCard key={section.key} section={section} />
          ))}
        </div>
      </div>
    </div>
  );
}
