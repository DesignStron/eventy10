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
      className="scroll-mt-28 overflow-hidden rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-pink-500/30"
    >
      {/* Header with gradient background */}
      <div className="relative bg-gradient-to-r from-pink-500 to-pink-600 p-6 text-white sm:p-8">
        <div className="absolute inset-0 bg-black opacity-10" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-white sm:px-4 sm:py-2">
            {section.key === "urodziny" && (
              <>
                <span className="text-lg">🎂</span> Dla dzieci
              </>
            )}
            {section.key === "szkolne" && (
              <>
                <span className="text-lg">🏫</span> Dla szkół
              </>
            )}
            {section.key === "firmowe" && (
              <>
                <span className="text-lg">🏢</span> Dla firm
              </>
            )}
          </div>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-white sm:mt-6 sm:text-3xl">
            {section.title}
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/90 sm:mt-4 sm:text-base">
            {section.description}
          </p>
        </div>
      </div>

      {/* Price card */}
      <div className="relative px-6 py-4 sm:px-8 sm:py-6">
        <div className="absolute -top-6 right-4 rounded-2xl bg-black px-4 py-3 text-white shadow-lg ring-4 ring-white/10 sm:-top-8 sm:right-6 sm:px-6 sm:py-4 sm:max-w-36">
          <div className="text-xs font-semibold text-white/80 uppercase tracking-wide">Cena od</div>
          <div className="mt-1 text-xl font-bold sm:text-2xl">
            {section.priceFromPLN} zł
          </div>
          <div className="mt-1 text-xs text-white/70">Wycena zależna od terminu i zakresu</div>
        </div>
      </div>

      {/* Features grid */}
      <div className="px-6 pb-6 sm:px-8 sm:pb-8">
        <div className="mt-12 grid gap-3 sm:gap-4 md:grid-cols-2">
          {section.bullets.map((b, index) => (
            <div
              key={b}
              className="group flex items-start gap-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-4 text-white/80 transition-all duration-200 hover:bg-white/10 hover:border-pink-500/30 hover:shadow-md sm:p-5"
            >
              <div className="flex-shrink-0 rounded-full bg-pink-500 p-1.5 text-white">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-white sm:text-base">{b}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA buttons */}
      <div className="border-t border-white/10 bg-white/5 backdrop-blur-sm px-6 py-5 sm:px-8 sm:py-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
          <a
            href="/kontakt"
            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-pink-500 to-pink-600 px-8 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:from-pink-600 hover:to-pink-700 hover:shadow-xl active:scale-95 sm:h-14 sm:px-10 sm:text-base"
          >
            <span className="relative z-10 flex items-center gap-2">
              Poproś o wycenę
              <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </a>
          <a
            href="/galeria"
            className="inline-flex h-12 items-center justify-center rounded-full border-2 border-pink-500 bg-white/10 backdrop-blur-sm px-8 text-sm font-semibold text-pink-500 transition-all duration-200 hover:bg-pink-500/20 hover:border-pink-400 hover:shadow-md active:scale-95 sm:h-14 sm:px-10 sm:text-base"
          >
            Zobacz realizacje
          </a>
        </div>
      </div>
    </section>
  );
}

export default async function OfferPage() {
  const data = await readJsonFile<OfferData>("oferta.json", FALLBACK);

  return (
    <div className="page-bg noise">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-10">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-pink-500/10 px-3 py-1.5 text-xs font-semibold text-white sm:px-4 sm:py-2">
            <span className="h-2 w-2 rounded-full bg-pink-500" />
            Oferta
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:mt-5 sm:text-4xl md:text-5xl">
            Pakiety dopasowane do Twojego wydarzenia
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-white/70 sm:mt-4 sm:text-base md:text-lg">
            Poniżej widzisz przykładowe pakiety i ceny startowe. W panelu admina (demo)
            można edytować opisy oraz ceny, a zmiany od razu pojawiają się na stronie.
          </p>

          <div className="mt-4 grid gap-2 rounded-3xl bg-white/5 p-4 ring-1 ring-white/10 sm:mt-6 sm:gap-3 sm:p-6 md:grid-cols-3">
            <a
              href="#urodziny"
              className="rounded-2xl bg-pink-500/10 px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-pink-500/15 sm:px-4 sm:py-3"
            >
              Urodziny dla dzieci
            </a>
            <a
              href="#szkolne"
              className="rounded-2xl bg-pink-500/10 px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-pink-500/15 sm:px-4 sm:py-3"
            >
              Eventy szkolne
            </a>
            <a
              href="#firmowe"
              className="rounded-2xl bg-pink-500/10 px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-pink-500/15 sm:px-4 sm:py-3"
            >
              Imprezy firmowe
            </a>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:mt-8">
          {data.sections.map((section) => (
            <SectionCard key={section.key} section={section} />
          ))}
        </div>
      </div>
    </div>
  );
}
