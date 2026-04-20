import SiteFooter from "@/components/site-footer";

export const metadata = { title: "Polityka prywatności" };

export default function PrivacyPolicyPage() {
  return (
    <>
      <style>{`
        .pp-wrap{max-width:76rem;margin:0 auto;padding:6rem 1.5rem 5rem}
        .pp-hero{max-width:48rem;margin:0 0 2.5rem}
        .pp-badge{display:inline-flex;align-items:center;gap:.5rem;padding:.38rem 1rem;border-radius:9999px;background:rgba(240,23,122,.1);border:1px solid rgba(240,23,122,.25);font-size:.63rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--pink-light);margin-bottom:1.25rem}
        .pp-title{font-family:var(--font-display);font-size:clamp(2.4rem,5vw,3.6rem);font-weight:700;line-height:1.15;letter-spacing:-.03em;color:#fff;margin:0 0 1rem}
        html[data-theme="light"] .pp-title{color:#0d0b10}
        .pp-sub{color:rgba(255,255,255,.55);font-size:1.02rem;line-height:1.85;margin:0}
        html[data-theme="light"] .pp-sub{color:rgba(13,11,16,.6)}
        .pp-card{max-width:56rem;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:1.5rem;padding:2rem;margin:0 0 1.5rem}
        html[data-theme="light"] .pp-card{background:#fff;border-color:rgba(0,0,0,.08)}
        .pp-h2{font-family:var(--font-display);font-size:1.25rem;font-weight:700;letter-spacing:-.02em;color:#fff;margin:0 0 .75rem}
        html[data-theme="light"] .pp-h2{color:#0d0b10}
        .pp-p{color:rgba(255,255,255,.55);line-height:1.85;margin:.35rem 0}
        html[data-theme="light"] .pp-p{color:rgba(13,11,16,.6)}
        .pp-ul{margin:.6rem 0 0;padding-left:1.1rem;color:rgba(255,255,255,.55);line-height:1.85}
        html[data-theme="light"] .pp-ul{color:rgba(13,11,16,.6)}
        .pp-ul li{margin:.25rem 0}
        .pp-strong{color:rgba(255,255,255,.85);font-weight:700}
        html[data-theme="light"] .pp-strong{color:#0d0b10}
      `}</style>

      <div className="page-bg noise">
        <div className="pp-wrap">
          <header className="pp-hero">
            <div className="pp-badge">
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--pink)", display: "inline-block" }} />
              Dokumenty
            </div>
            <h1 className="pp-title">Polityka prywatności i plików cookies</h1>
            <p className="pp-sub">
              Poniżej znajdziesz informacje o zasadach przetwarzania danych osobowych oraz o tym, jak wykorzystujemy pliki cookies na stronie pinkyparty.pl.
            </p>
          </header>

          <section className="pp-card">
            <h2 className="pp-h2">Polityka prywatności</h2>

            <p className="pp-p">
              <span className="pp-strong">1. Informacje ogólne</span>
            </p>
            <p className="pp-p">
              Niniejsza polityka prywatności określa zasady przetwarzania i ochrony danych osobowych użytkowników korzystających ze strony internetowej pinkyparty.pl.
            </p>
            <p className="pp-p">
              Administratorem danych osobowych jest:
              <br />
              <span className="pp-strong">Pinky Party Magdalena Gałkowska</span>
              <br />
              Kontakt: <span className="pp-strong">pinkyparty.eventy@gmail.com</span>
            </p>

            <p className="pp-p">
              <span className="pp-strong">2. Zakres zbieranych danych</span>
            </p>
            <p className="pp-p">W zależności od sposobu korzystania ze strony możemy przetwarzać następujące dane:</p>
            <ul className="pp-ul">
              <li>imię i nazwisko,</li>
              <li>adres e-mail,</li>
              <li>numer telefonu,</li>
              <li>adres IP,</li>
              <li>dane dotyczące korzystania ze strony (np. podstrony, czas wizyty, typ urządzenia/przeglądarki).</li>
            </ul>

            <p className="pp-p">
              <span className="pp-strong">3. Cel przetwarzania danych</span>
            </p>
            <p className="pp-p">Dane przetwarzamy w celu:</p>
            <ul className="pp-ul">
              <li>kontaktu z użytkownikiem,</li>
              <li>realizacji usług,</li>
              <li>obsługi zapytań,</li>
              <li>analizy ruchu na stronie,</li>
              <li>poprawy działania i bezpieczeństwa strony.</li>
            </ul>

            <p className="pp-p">
              <span className="pp-strong">4. Podstawa prawna przetwarzania</span>
            </p>
            <p className="pp-p">Dane przetwarzane są zgodnie z obowiązującymi przepisami, w szczególności na podstawie:</p>
            <ul className="pp-ul">
              <li>zgody użytkownika (jeśli jest wymagana),</li>
              <li>konieczności wykonania umowy lub podjęcia działań przed jej zawarciem,</li>
              <li>obowiązków prawnych, które ciążą na administratorze.</li>
            </ul>

            <p className="pp-p">
              <span className="pp-strong">5. Udostępnianie danych</span>
            </p>
            <p className="pp-p">Dane mogą być przekazywane podmiotom wspierającym działanie strony lub realizację usług, w tym:</p>
            <ul className="pp-ul">
              <li>podmiotom obsługującym stronę (np. hosting, utrzymanie),</li>
              <li>dostawcom usług analitycznych (jeśli są używane i po uzyskaniu zgody, gdy jest wymagana),</li>
              <li>firmom wspierającym działanie strony i komunikację (np. narzędzia kontaktowe), w zakresie niezbędnym do realizacji celu.</li>
            </ul>

            <p className="pp-p">
              <span className="pp-strong">6. Prawa użytkownika</span>
            </p>
            <p className="pp-p">Użytkownik ma prawo do:</p>
            <ul className="pp-ul">
              <li>dostępu do swoich danych,</li>
              <li>sprostowania (poprawiania) danych,</li>
              <li>usunięcia danych,</li>
              <li>ograniczenia przetwarzania,</li>
              <li>wniesienia sprzeciwu,</li>
              <li>cofnięcia zgody w dowolnym momencie (jeśli przetwarzanie odbywa się na podstawie zgody).</li>
            </ul>

            <p className="pp-p">
              <span className="pp-strong">7. Okres przechowywania danych</span>
            </p>
            <p className="pp-p">
              Dane przechowywane są przez okres niezbędny do realizacji celu, dla którego zostały zebrane, lub do momentu wycofania zgody (jeżeli przetwarzanie odbywa się na jej podstawie), a także przez okres wymagany przepisami prawa.
            </p>

            <p className="pp-p">
              <span className="pp-strong">8. Bezpieczeństwo danych</span>
            </p>
            <p className="pp-p">
              Administrator stosuje odpowiednie środki techniczne i organizacyjne w celu ochrony danych osobowych przed utratą, nieuprawnionym dostępem oraz nieuprawnioną modyfikacją.
            </p>

            <p className="pp-p">
              <span className="pp-strong">9. Zmiany polityki</span>
            </p>
            <p className="pp-p">Polityka może być aktualizowana. Aktualna wersja dokumentu jest publikowana na tej stronie.</p>
          </section>

          <section className="pp-card">
            <h2 className="pp-h2">Polityka plików cookies</h2>

            <p className="pp-p">
              <span className="pp-strong">1. Czym są pliki cookies</span>
            </p>
            <p className="pp-p">
              Pliki cookies to małe pliki tekstowe zapisywane na urządzeniu użytkownika podczas korzystania ze strony pinkyparty.pl.
            </p>

            <p className="pp-p">
              <span className="pp-strong">2. Rodzaje cookies używane na stronie</span>
            </p>
            <ul className="pp-ul">
              <li>
                <span className="pp-strong">Niezbędne</span> — zapewniają prawidłowe działanie strony i nie wymagają zgody.
              </li>
              <li>
                <span className="pp-strong">Analityczne</span> — pozwalają analizować sposób korzystania ze strony (jeśli są używane, uruchamiane po uzyskaniu zgody, gdy jest wymagana).
              </li>
              <li>
                <span className="pp-strong">Funkcjonalne</span> — zapamiętują ustawienia użytkownika (jeśli są używane).
              </li>
              <li>
                <span className="pp-strong">Marketingowe</span> — służą do dopasowywania reklam i treści (jeśli są używane).
              </li>
            </ul>

            <p className="pp-p">
              <span className="pp-strong">3. Cel używania cookies</span>
            </p>
            <p className="pp-p">Pliki cookies mogą być wykorzystywane w celu:</p>
            <ul className="pp-ul">
              <li>zapewnienia poprawnego działania strony,</li>
              <li>analizy ruchu,</li>
              <li>dostosowania treści,</li>
              <li>działań marketingowych.</li>
            </ul>

            <p className="pp-p">
              <span className="pp-strong">4. Zarządzanie cookies</span>
            </p>
            <p className="pp-p">Użytkownik może:</p>
            <ul className="pp-ul">
              <li>zaakceptować wszystkie cookies,</li>
              <li>odrzucić cookies (poza niezbędnymi),</li>
              <li>dostosować ustawienia (jeśli mechanizm ustawień jest dostępny na stronie),</li>
              <li>zarządzać cookies poprzez ustawienia przeglądarki.</li>
            </ul>

            <p className="pp-p">
              <span className="pp-strong">5. Zmiany polityki</span>
            </p>
            <p className="pp-p">Polityka cookies może być aktualizowana. Aktualna wersja dokumentu jest publikowana na tej stronie.</p>
          </section>
        </div>
        <SiteFooter />
      </div>
    </>
  );
}
