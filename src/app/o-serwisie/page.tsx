import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'O serwisie — spawarkilaserowe.com',
  description:
    'Autoryzowany dealer BLink Laser w Polsce. Katalog spawarek laserowych 1500–3000W, porównania, poradniki zakupowe i bezpłatne doradztwo techniczne dla firm produkcyjnych.',
  openGraph: {
    title: 'O serwisie spawarkilaserowe.com',
    description:
      'Autoryzowany dealer BLink Laser. Katalog modeli, poradniki i bezpłatne doradztwo — dobieramy maszynę do Twojej produkcji.',
  },
}

export default function OSerwisiePage() {
  return (
    <div>
      {/* Header */}
      <div style={{ backgroundColor: '#0D1117' }} className="py-14">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#06B6D4' }}>
            spawarkilaserowe.com
          </p>
          <h1
            className="text-4xl md:text-5xl font-black text-white mb-3"
            style={{ letterSpacing: '-0.03em', fontFamily: 'var(--font-rubik)' }}
          >
            O serwisie
          </h1>
          <p className="text-lg" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Autoryzowany dealer BLink Laser w Polsce — katalog, porównania i bezpłatne doradztwo przed zakupem.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16 flex flex-col gap-12">

        {/* Czym jest */}
        <section>
          <h2 className="text-xl font-black mb-4" style={{ letterSpacing: '-0.01em' }}>Czym jest ten serwis</h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--fg-secondary)' }}>
            spawarkilaserowe.com to serwis informacyjny i sprzedażowy poświęcony spawarkom laserowym fiber marki BLink Laser.
            Jesteśmy autoryzowanym dealerem w Polsce — sprzedajemy maszyny z gwarancją producenta, prowadzimy instalację,
            szkolenia i serwis pogwarancyjny.
          </p>
          <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--fg-secondary)' }}>
            Serwis powstał z obserwacji, że rynek spawarek laserowych w Polsce jest trudny do nawigacji dla kupującego —
            ceny dostępne tylko na zapytanie, oferty trudno porównywalne, a materiał edukacyjny w polskim języku rozproszony
            i powierzchowny. Staramy się to zmieniać: jawne ceny, konkretne tabele specyfikacji i rzetelne odpowiedzi
            na pytania przed zakupem.
          </p>
          <p className="text-base leading-relaxed" style={{ color: 'var(--fg-secondary)' }}>
            Jeśli 1500W wystarczy do Twojej produkcji — powiemy to. Nie zaproponujemy droższego modelu dla wyższej marży.
            Naszym celem jest zakład, który kupił maszynę dopasowaną do potrzeb i zwrócił inwestycję w zakładanym czasie.
          </p>
        </section>

        {/* Dla kogo */}
        <section>
          <h2 className="text-xl font-black mb-4" style={{ letterSpacing: '-0.01em' }}>Dla kogo</h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--fg-secondary)' }}>
            Główny odbiorca to właściciele firm, kierownicy produkcji i specjaliści ds. inwestycji w polskich
            przedsiębiorstwach z sektora MŚP, które pracują z metalem lub rozważają wejście w technologię spawania laserowego.
          </p>
          <p className="text-base leading-relaxed" style={{ color: 'var(--fg-secondary)' }}>
            Typowy profil: firma od kilku do kilkuset pracowników, działająca w obróbce metalu, konstrukcjach stalowych,
            kooperacji dla motoryzacji, branży HVAC lub produkcji ze stali nierdzewnej i aluminium. Obsługujemy
            zarówno firmy przy pierwszej inwestycji w laser, jak i te rozbudowujące istniejący park maszynowy.
          </p>
        </section>

        {/* Trzy klasy maszyn */}
        <section>
          <h2 className="text-xl font-black mb-4" style={{ letterSpacing: '-0.01em' }}>Trzy klasy mocy</h2>
          <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--fg-secondary)' }}>
            Katalog obejmuje 12 konfiguracji w trzech klasach mocy — każda dostępna z kombinacją pojedynczej
            lub podwójnej oscylacji głowicy i pojedynczego lub podwójnego podajnika drutu.
          </p>

          <div className="flex flex-col gap-4">
            {[
              {
                model: 'Blink 1500W',
                subtitle: 'Wejście w technologię laserową',
                body: 'Stal węglowa do 10 mm, nierdzewka do 6 mm, aluminium do 4 mm. Optymalny wybór dla zakładów przechodzących z TIG/MIG po raz pierwszy. Operator samodzielnie pracuje po 1–2 dniach szkolenia. Ceny od 39 000 zł netto.',
              },
              {
                model: 'Blink 2000W',
                subtitle: 'Codzienna produkcja — najczęściej wybierany',
                body: 'Stal węglowa do 12 mm, nierdzewka do 8 mm, aluminium do 6 mm. Złoty środek dla zakładów z regularnym wolumenem — wyraźna przewaga prędkości nad 1500W na materiałach powyżej 5 mm. Ceny od 45 000 zł netto.',
              },
              {
                model: 'Blink 3000W',
                subtitle: 'Intensywna produkcja i grube elementy',
                body: 'Stal węglowa do 20 mm, nierdzewka do 12 mm, aluminium do 10 mm. Dla zakładów pracujących na dwie zmiany lub z regularnym zapotrzebowaniem na spawanie grubych detali stalowych. Ceny od 54 000 zł netto.',
              },
            ].map((tier) => (
              <div
                key={tier.model}
                className="p-6 rounded-2xl border"
                style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)' }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="text-sm font-black px-2.5 py-0.5 rounded-full"
                    style={{ backgroundColor: '#06B6D4', color: '#0D1117' }}
                  >
                    {tier.model}
                  </span>
                  <span className="text-sm font-semibold" style={{ color: 'var(--muted)' }}>{tier.subtitle}</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-secondary)' }}>{tier.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-xl font-black mb-6" style={{ letterSpacing: '-0.01em' }}>Częste pytania o serwis</h2>
          <div className="flex flex-col gap-6">
            {[
              {
                q: 'Czy jesteście autoryzowanym dealerem BLink Laser?',
                a: 'Tak. Sprzedajemy maszyny z gwarancją producenta, prowadzimy instalację i szkolenia, zapewniamy serwis pogwarancyjny. Kupujesz bezpośrednio — bez pośrednika.',
              },
              {
                q: 'Czy doradztwo przed zakupem jest bezpłatne?',
                a: 'Tak, bezpłatnie i bez zobowiązań. Formularz kontaktowy nie wymaga podawania danych firmy. Odpowiadamy merytorycznie — z rekomendacją konkretnego modelu i uzasadnieniem.',
              },
              {
                q: 'Jak szybko można otrzymać maszynę?',
                a: 'Standardowy czas dostawy to 4–6 tygodni od złożenia zamówienia. Przy dostępności z magazynu europejskiego — 2–3 tygodnie.',
              },
              {
                q: 'Co obejmuje serwis pogwarancyjny?',
                a: 'Przeglądy, wymiana elementów optycznych, naprawa układu chłodzenia i toru laserowego. Części na magazynie w Polsce — czas reakcji do 48h roboczych.',
              },
              {
                q: 'Jak się skontaktować?',
                a: 'Przez formularz na stronie /kontakt lub telefonicznie +48 570 854 886. Odpowiadamy w ciągu jednego dnia roboczego, Pn–Pt 8:00–17:00.',
              },
            ].map((item) => (
              <div key={item.q}>
                <p className="font-bold mb-1.5" style={{ color: 'var(--fg)' }}>{item.q}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{item.a}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
