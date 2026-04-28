import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Zastosowania spawarek laserowych — konstrukcje, nierdzewka, automotive, HVAC',
  description: 'Jak spawarka laserowa Blink sprawdza się w konstrukcjach stalowych, stali nierdzewnej, aluminium, automotive i HVAC. Konkretne zastosowania, grubości, modele.',
}

const NAV_ITEMS = [
  { id: 'konstrukcje', label: 'Konstrukcje stalowe' },
  { id: 'nierdzewka', label: 'Stal nierdzewna' },
  { id: 'automotive', label: 'Automotive' },
  { id: 'hvac', label: 'HVAC i wentylacja' },
  { id: 'aluminium', label: 'Aluminium' },
  { id: 'migracja', label: 'Migracja z TIG/MIG' },
]

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
      style={{ backgroundColor: 'rgba(6,182,212,0.1)', color: '#06B6D4', border: '1px solid rgba(6,182,212,0.2)' }}
    >
      {children}
    </span>
  )
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b last:border-0" style={{ borderColor: 'var(--border)' }}>
      <span className="text-sm" style={{ color: 'var(--muted)' }}>{label}</span>
      <span className="text-sm font-bold" style={{ color: 'var(--fg)' }}>{value}</span>
    </div>
  )
}

function ModelChip({ power, priceFrom, href }: { power: string; priceFrom: string; href: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-3 px-5 py-3 rounded-xl border-2 transition-all hover:border-[#06B6D4] hover:shadow-lg group"
      style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)' }}
    >
      <span className="text-sm font-black px-2.5 py-0.5 rounded-full" style={{ backgroundColor: '#06B6D4', color: '#0D1117' }}>
        {power}
      </span>
      <div>
        <p className="text-xs" style={{ color: 'var(--muted)' }}>od</p>
        <p className="text-base font-black leading-tight" style={{ color: 'var(--fg)', fontFamily: 'var(--font-rubik)' }}>
          {priceFrom} zł netto
        </p>
      </div>
      <span className="ml-1 text-sm font-bold transition-colors" style={{ color: '#06B6D4' }}>→</span>
    </Link>
  )
}

export default function ZastosowaniaPage() {
  return (
    <div>
      {/* Hero */}
      <div style={{ backgroundColor: '#0D1117' }} className="py-14">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#06B6D4' }}>
            Spawarki laserowe Blink
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ letterSpacing: '-0.03em', fontFamily: 'var(--font-rubik)' }}>
            Zastosowania spawarek laserowych
          </h1>
          <p className="text-lg max-w-2xl" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Który model do jakiej branży i dlaczego. Konkretne materiały, grubości, problemy i rozwiązania
            z rzeczywistej produkcji.
          </p>
        </div>
      </div>

      {/* Anchor nav */}
      <div className="sticky top-[71px] z-40 border-b overflow-x-auto" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <nav className="flex gap-1 py-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="px-3.5 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors hover:text-[#06B6D4]"
                style={{ color: 'var(--muted)' }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col gap-24">

        {/* ── 1. Konstrukcje stalowe ── */}
        <section id="konstrukcje" className="scroll-mt-32">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <SectionBadge>Konstrukcje stalowe</SectionBadge>
              <h2 className="text-2xl md:text-3xl font-black mb-4" style={{ letterSpacing: '-0.02em' }}>
                Ramy, kratownice, trawersy — gruba stal bez kompromisów
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--fg-secondary)' }}>
                Producenci konstrukcji stalowych przez lata traktowali laser jako technologię wyłącznie dla cienkich blach.
                Blink 3000W zmienia to równanie: stal węglowa do 20 mm z jednej głowicy, bez zmiany urządzenia między detalami.
              </p>
              <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--fg-secondary)' }}>
                Spoina jest szersza i lepiej wtopiona niż przy TIG, a prędkość spawania kratownicy 6 mm stali to
                45–60 cm/min przy laserze vs 15–20 cm/min przy TIG. Różnica na zleceniu 200 kratownic to kilkanaście
                roboczogodzin tygodniowo.
              </p>

              <div className="rounded-2xl overflow-hidden border mb-6" style={{ borderColor: 'var(--border)' }}>
                <div className="px-4 py-2 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: 'var(--bg)', color: 'var(--muted)' }}>
                  Parametry dla konstrukcji stalowych
                </div>
                <div className="px-4 py-2">
                  <SpecRow label="Stal węglowa (maks.)" value="do 20 mm" />
                  <SpecRow label="Prędkość spawania 6 mm" value="45–60 cm/min" />
                  <SpecRow label="Szlifowanie po spawaniu" value="nie jest wymagane" />
                  <SpecRow label="Gaz osłonowy" value="argon lub mieszanka" />
                  <SpecRow label="Rekomendowana moc" value="2000W lub 3000W" />
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <ModelChip power="Blink 2000W" priceFrom="45 000" href="/modele" />
                <ModelChip power="Blink 3000W" priceFrom="54 000" href="/modele" />
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#F7F8FC', border: '1px solid var(--border)' }}>
              <div className="relative" style={{ height: '280px' }}>
                <Image src="/images/spawarka-blink-3.jpg" alt="Spawarka laserowa do konstrukcji stalowych" fill className="object-cover" sizes="50vw" />
              </div>
              <div className="p-5">
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>Typowe zastosowania</p>
                <div className="flex flex-wrap gap-2">
                  {['Ramy maszyn', 'Kratownice', 'Trawersy', 'Uchwyty', 'Wsporniki', 'Belki HEB'].map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-1 rounded-full" style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--fg-secondary)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr style={{ borderColor: 'var(--border)' }} />

        {/* ── 2. Stal nierdzewna ── */}
        <section id="nierdzewka" className="scroll-mt-32">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="md:order-2">
              <SectionBadge>Stal nierdzewna</SectionBadge>
              <h2 className="text-2xl md:text-3xl font-black mb-4" style={{ letterSpacing: '-0.02em' }}>
                Zero przebarwień, spoina gotowa — prosto do klienta
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--fg-secondary)' }}>
                Nierdzewka to naturalne środowisko dla spawarki laserowej. Minimalna strefa wpływu ciepła
                eliminuje przebarwienia, które przy TIG wymagają późniejszego trawienia lub polerowania.
                Spoina po laserze jest gotowa do odbioru przez klienta — bez dodatkowych operacji.
              </p>
              <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--fg-secondary)' }}>
                Dla producentów elementów gastronomicznych, farmaceutycznych i architektonicznych ze stali
                AISI 304/316 laser skraca czas realizacji zlecenia o 30–50% — nie przez szybsze spawanie,
                ale przez eliminację szlifowania i trawienia.
              </p>

              <div className="rounded-2xl overflow-hidden border mb-6" style={{ borderColor: 'var(--border)' }}>
                <div className="px-4 py-2 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: 'var(--bg)', color: 'var(--muted)' }}>
                  Parametry dla stali nierdzewnej
                </div>
                <div className="px-4 py-2">
                  <SpecRow label="Nierdzewka 304/316 (maks.)" value="do 12 mm" />
                  <SpecRow label="Przebarwienia po spawaniu" value="brak" />
                  <SpecRow label="Trawienie po spawaniu" value="zbędne" />
                  <SpecRow label="Gaz osłonowy" value="czysty argon" />
                  <SpecRow label="Rekomendowana opcja" value="podwójna oscylacja" />
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <ModelChip power="Blink 1500W" priceFrom="39 000" href="/modele" />
                <ModelChip power="Blink 2000W" priceFrom="45 000" href="/modele" />
              </div>
            </div>

            <div className="md:order-1 rounded-2xl overflow-hidden" style={{ backgroundColor: '#F7F8FC', border: '1px solid var(--border)' }}>
              <div className="relative" style={{ height: '280px' }}>
                <Image src="/images/spawarka-blink.jpg" alt="Spawarka laserowa do stali nierdzewnej" fill className="object-cover" sizes="50vw" />
              </div>
              <div className="p-5">
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>Typowe zastosowania</p>
                <div className="flex flex-wrap gap-2">
                  {['Gastronomia', 'Meble ze stali', 'Farmacja', 'Architektura', 'Balustrady', 'AISI 304/316'].map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-1 rounded-full" style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--fg-secondary)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr style={{ borderColor: 'var(--border)' }} />

        {/* ── 3. Automotive ── */}
        <section id="automotive" className="scroll-mt-32">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <SectionBadge>Automotive i kooperacja</SectionBadge>
              <h2 className="text-2xl md:text-3xl font-black mb-4" style={{ letterSpacing: '-0.02em' }}>
                Cienka blacha, zero odkształceń — wymóg, nie opcja
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--fg-secondary)' }}>
                Kooperanci dla motoryzacji pracują z tolerancjami, które MIG po prostu nie jest w stanie utrzymać
                przy cienkiej blasze. Odkształcenia termiczne przy spawaniu wsporników z blachy 1–2 mm MIG-iem
                oznaczają prostowanie każdej sztuki — lub odrzut od klienta.
              </p>
              <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--fg-secondary)' }}>
                Laser działa z minimalną strefą wpływu ciepła: blacha 1 mm wychodzi płaska. Powtarzalność
                wymiarowa na serii 500 wsporników jest identyczna — co przy odbiorze u dostawcy Tier 1
                jest często warunkiem koniecznym kontraktu.
              </p>

              <div className="rounded-2xl overflow-hidden border mb-6" style={{ borderColor: 'var(--border)' }}>
                <div className="px-4 py-2 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: 'var(--bg)', color: 'var(--muted)' }}>
                  Parametry dla automotive
                </div>
                <div className="px-4 py-2">
                  <SpecRow label="Minimalna grubość" value="od 0,5 mm" />
                  <SpecRow label="Odkształcenia" value="brak / znikome" />
                  <SpecRow label="Powtarzalność seryjna" value="tak" />
                  <SpecRow label="Materiały" value="stal, nierdzewka, alu" />
                  <SpecRow label="Rekomendowany model" value="Blink 1500W lub 2000W" />
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <ModelChip power="Blink 1500W" priceFrom="39 000" href="/modele" />
                <ModelChip power="Blink 2000W" priceFrom="45 000" href="/modele" />
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#F7F8FC', border: '1px solid var(--border)' }}>
              <div className="relative" style={{ height: '280px' }}>
                <Image src="/images/spawarka-blink-2.jpg" alt="Spawarka laserowa automotive" fill className="object-cover" sizes="50vw" />
              </div>
              <div className="p-5">
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>Typowe zastosowania</p>
                <div className="flex flex-wrap gap-2">
                  {['Wsporniki', 'Uchwyty', 'Obudowy ECU', 'Elementy podwozia', 'Kooperacja Tier 2', 'Prototypy'].map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-1 rounded-full" style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--fg-secondary)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr style={{ borderColor: 'var(--border)' }} />

        {/* ── 4. HVAC ── */}
        <section id="hvac" className="scroll-mt-32">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="md:order-2">
              <SectionBadge>HVAC i wentylacja</SectionBadge>
              <h2 className="text-2xl md:text-3xl font-black mb-4" style={{ letterSpacing: '-0.02em' }}>
                Kanały i kołnierze — nierdzewka 1–4 mm szybko i estetycznie
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--fg-secondary)' }}>
                Producenci systemów wentylacyjnych i klimatyzacyjnych mają do czynienia z dużymi wolumenami
                prostych złączy na cienkiej nierdzewce. To idealne środowisko dla Blink 1500W lub 2000W
                z podwójną oscylacją głowicy.
              </p>
              <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--fg-secondary)' }}>
                Spoina na kanale wentylacyjnym ze stali 1.4301 (AISI 304) wychodzi bez przebarwień
                i jest gotowa do montażu u klienta. Przy produkcji 30–50 elementów dziennie
                eliminacja szlifowania to 2–3 roboczogodziny oszczędności w ciągu dnia roboczego.
              </p>

              <div className="rounded-2xl overflow-hidden border mb-6" style={{ borderColor: 'var(--border)' }}>
                <div className="px-4 py-2 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: 'var(--bg)', color: 'var(--muted)' }}>
                  Parametry dla HVAC
                </div>
                <div className="px-4 py-2">
                  <SpecRow label="Typowa grubość" value="0,8–4 mm" />
                  <SpecRow label="Materiał" value="nierdzewka AISI 304/316" />
                  <SpecRow label="Rekomendowana opcja" value="podwójna oscylacja" />
                  <SpecRow label="Obróbka po spawaniu" value="brak" />
                  <SpecRow label="Rekomendowany model" value="Blink 1500W" />
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <ModelChip power="Blink 1500W" priceFrom="39 000" href="/modele" />
              </div>
            </div>

            <div className="md:order-1 rounded-2xl overflow-hidden" style={{ backgroundColor: '#F7F8FC', border: '1px solid var(--border)' }}>
              <div className="relative" style={{ height: '280px' }}>
                <Image src="/images/spawarka-blink.jpg" alt="Spawarka laserowa HVAC" fill className="object-cover" sizes="50vw" />
              </div>
              <div className="p-5">
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>Typowe zastosowania</p>
                <div className="flex flex-wrap gap-2">
                  {['Kanały prostokątne', 'Kanały okrągłe', 'Kołnierze', 'Skrzynki rozdzielcze', 'Czerpnie', 'Tłumiki'].map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-1 rounded-full" style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--fg-secondary)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr style={{ borderColor: 'var(--border)' }} />

        {/* ── 5. Aluminium ── */}
        <section id="aluminium" className="scroll-mt-32">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <SectionBadge>Aluminium</SectionBadge>
              <h2 className="text-2xl md:text-3xl font-black mb-4" style={{ letterSpacing: '-0.02em' }}>
                Refleksyjny, wymagający materiał — laser fiber radzi sobie dobrze
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--fg-secondary)' }}>
                Aluminium jest refleksyjne i wymaga maszyny z odpowiednio zabezpieczonym torem optycznym.
                Blink fiber ma wbudowane zabezpieczenia przed powrotnym odblaskiem — spawanie aluminium
                serii 1xxx, 5xxx i 6xxx jest standardowym zastosowaniem.
              </p>
              <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--fg-secondary)' }}>
                Największa zaleta lasera nad TIG na aluminium: prędkość i brak nasiąkania materiału.
                Aluminium przy TIG-u szybko się nagrzewa, co prowadzi do przepaleń.
                Laser działa impulsowo z minimalnym ciepłem wejściowym — spoina jest czysta i bez porowatości.
              </p>

              <div className="rounded-2xl overflow-hidden border mb-6" style={{ borderColor: 'var(--border)' }}>
                <div className="px-4 py-2 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: 'var(--bg)', color: 'var(--muted)' }}>
                  Parametry dla aluminium
                </div>
                <div className="px-4 py-2">
                  <SpecRow label="Aluminium (maks. Blink 3000W)" value="do 10 mm" />
                  <SpecRow label="Aluminium (maks. Blink 2000W)" value="do 6 mm" />
                  <SpecRow label="Aluminium (maks. Blink 1500W)" value="do 4 mm" />
                  <SpecRow label="Ryzyko przepaleń vs TIG" value="znacznie niższe" />
                  <SpecRow label="Gaz osłonowy" value="czysty argon" />
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <ModelChip power="Blink 1500W" priceFrom="39 000" href="/modele" />
                <ModelChip power="Blink 2000W" priceFrom="45 000" href="/modele" />
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#F7F8FC', border: '1px solid var(--border)' }}>
              <div className="relative" style={{ height: '280px' }}>
                <Image src="/images/spawarka-blink-2.jpg" alt="Spawarka laserowa do aluminium" fill className="object-cover" sizes="50vw" />
              </div>
              <div className="p-5">
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>Typowe zastosowania</p>
                <div className="flex flex-wrap gap-2">
                  {['Profile alum.', 'Obudowy', 'Zbiorniki', 'Ramy rowerowe', 'Elementy lotnicze', 'Radiatory'].map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-1 rounded-full" style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--fg-secondary)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr style={{ borderColor: 'var(--border)' }} />

        {/* ── 6. Migracja z TIG/MIG ── */}
        <section id="migracja" className="scroll-mt-32">
          <SectionBadge>Migracja z TIG i MIG</SectionBadge>
          <h2 className="text-2xl md:text-3xl font-black mb-4" style={{ letterSpacing: '-0.02em' }}>
            Kiedy zamiana TIG/MIG na laser ma sens finansowy
          </h2>
          <p className="text-base leading-relaxed mb-4 max-w-2xl" style={{ color: 'var(--fg-secondary)' }}>
            Zakłady z 2–3 operatorami TIG pracującymi pełną zmianę zwracają inwestycję w laser
            w 6–18 miesięcy. Liczą się trzy rzeczy: oszczędności czasu spawania, oszczędności na gazie
            i eliminacja kosztu szlifowania.
          </p>

          {/* ROI table */}
          <div className="grid md:grid-cols-3 gap-4 mb-8 mt-8">
            {[
              {
                title: 'Mały zakład (1 operator TIG)',
                items: [
                  { label: 'Czas spawania dziennie', val: '4–5h' },
                  { label: 'Oszczędność czasu (laser)', val: '~60%' },
                  { label: 'Oszczędność gazu (miesięcznie)', val: 'ok. 800 zł' },
                  { label: 'Szacowany ROI', val: '14–20 mies.' },
                ],
                model: 'Blink 1500W',
              },
              {
                title: 'Zakład średni (2–3 operatorów)',
                items: [
                  { label: 'Czas spawania dziennie', val: '8–12h' },
                  { label: 'Oszczędność czasu (laser)', val: '~60%' },
                  { label: 'Oszczędność gazu (miesięcznie)', val: 'ok. 1 800 zł' },
                  { label: 'Szacowany ROI', val: '6–10 mies.' },
                ],
                model: 'Blink 2000W',
                highlight: true,
              },
              {
                title: 'Zakład produkcyjny (4+ operatorów)',
                items: [
                  { label: 'Czas spawania dziennie', val: '16h (2 zmiany)' },
                  { label: 'Oszczędność czasu (laser)', val: '~65%' },
                  { label: 'Oszczędność gazu (miesięcznie)', val: 'ok. 3 500 zł' },
                  { label: 'Szacowany ROI', val: '4–7 mies.' },
                ],
                model: 'Blink 3000W',
              },
            ].map((col) => (
              <div
                key={col.title}
                className="rounded-2xl p-6 border-2"
                style={{
                  borderColor: col.highlight ? '#06B6D4' : 'var(--border)',
                  backgroundColor: col.highlight ? 'rgba(6,182,212,0.03)' : 'var(--bg-card)',
                }}
              >
                {col.highlight && (
                  <div className="text-[10px] font-black uppercase tracking-widest mb-3 text-center" style={{ color: '#06B6D4' }}>
                    Najczęstszy przypadek
                  </div>
                )}
                <p className="font-bold text-sm mb-4" style={{ color: 'var(--fg)' }}>{col.title}</p>
                <div className="flex flex-col gap-2 mb-4">
                  {col.items.map((item) => (
                    <div key={item.label} className="flex justify-between text-sm">
                      <span style={{ color: 'var(--muted)' }}>{item.label}</span>
                      <span className="font-semibold" style={{ color: item.label.includes('ROI') ? '#06B6D4' : 'var(--fg)' }}>{item.val}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/modele"
                  className="block text-center text-xs font-black py-2 rounded-xl transition-all hover:opacity-90"
                  style={{ backgroundColor: col.highlight ? '#06B6D4' : 'var(--bg)', color: col.highlight ? '#0D1117' : 'var(--muted)', border: col.highlight ? 'none' : '1px solid var(--border)' }}
                >
                  {col.model} →
                </Link>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-2xl text-sm" style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--muted)' }}>
            Dane szacunkowe dla stali nierdzewnej 3 mm, argon 8 zł/m³, stawka operatora 35 zł/h brutto.
            Rzeczywisty ROI zależy od wolumenu, materiału i aktualnych cen gazu.{' '}
            <Link href="/kontakt" className="font-semibold" style={{ color: '#06B6D4' }}>
              Oblicz ROI dla swojego zakładu →
            </Link>
          </div>
        </section>

        {/* Bottom CTA */}
        <div
          className="rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-8"
          style={{ backgroundColor: '#0D1117', border: '1px solid rgba(6,182,212,0.15)' }}
        >
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#06B6D4' }}>Bezpłatna konsultacja</p>
            <h2 className="text-2xl font-black text-white mb-2" style={{ fontFamily: 'var(--font-rubik)' }}>
              Twoja branża, Twój materiał — dobierzemy model.
            </h2>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Wypełnij formularz — opisz co spawasz, w jakiej grubości i ile sztuk. Odpiszemy z konkretnym wariantem.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/kontakt" className="inline-flex items-center gap-2 font-black px-6 py-3.5 rounded-xl transition-all hover:opacity-90" style={{ backgroundColor: '#06B6D4', color: '#0D1117' }}>
              Wyślij zapytanie →
            </Link>
            <Link href="/modele" className="inline-flex items-center gap-2 font-semibold px-6 py-3.5 rounded-xl border transition-all hover:border-[rgba(255,255,255,0.4)]" style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)' }}>
              Zobacz katalog
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
