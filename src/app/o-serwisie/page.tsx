import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'O serwisie - Spawarki Laserowe',
  description:
    'Informacje o serwisie spawarkilaserowe.com - niezaleznym portalu porownan i poradnikow zakupowych dla firm produkcyjnych wybierajacych spawarke laserowa.',
  openGraph: {
    title: 'O serwisie spawarkilaserowe.com',
    description:
      'Niezalezny serwis porownawczy spawarek laserowych BLink Laser. Katalog modeli, poradniki i bezplatne doradztwo techniczne.',
  },
}

const sectionStyle: React.CSSProperties = {
  marginBottom: '3rem',
}

const headingStyle: React.CSSProperties = {
  fontSize: '1.25rem',
  fontWeight: 700,
  color: 'var(--fg)',
  marginBottom: '0.75rem',
}

const textStyle: React.CSSProperties = {
  color: 'var(--fg-secondary)',
  lineHeight: '1.8',
  marginBottom: '1rem',
}

const mutedStyle: React.CSSProperties = {
  color: 'var(--muted)',
  lineHeight: '1.8',
  marginBottom: '1rem',
}

const cardStyle: React.CSSProperties = {
  backgroundColor: 'var(--bg-card)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius-md)',
  padding: '1.5rem',
  marginBottom: '1rem',
}

const accentLineStyle: React.CSSProperties = {
  borderLeft: '3px solid var(--accent)',
  paddingLeft: '1rem',
  marginBottom: '1.5rem',
}

const faqQuestionStyle: React.CSSProperties = {
  fontWeight: 600,
  color: 'var(--fg)',
  marginBottom: '0.4rem',
}

export default function OSerwisiePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1
        style={{
          fontSize: '2rem',
          fontWeight: 800,
          color: 'var(--fg)',
          marginBottom: '0.5rem',
          lineHeight: '1.25',
        }}
      >
        O serwisie spawarkilaserowe.com
      </h1>
      <p style={{ ...mutedStyle, marginBottom: '3rem' }}>
        Katalog, porownania i poradniki zakupowe dla firm wybierajacych spawarke laserowa fiber.
      </p>

      {/* Czym jest ten serwis */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>Czym jest ten serwis</h2>
        <p style={textStyle}>
          spawarkilaserowe.com to niezalezny serwis informacyjny poswiecony spawarkam laserowym
          fiber dla przemyslu. Zbieramy specyfikacje, piszemy porownania i poradniki zakupowe, zeby
          firmy produkcyjne mogly swiadomie wybrac model dopasowany do swojej produkcji.
        </p>
        <p style={textStyle}>
          Serwis powstał z obserwacji, że rynek spawarek laserowych w Polsce jest trudny do
          nawigacji dla kupującego - ceny są dostępne tylko na zapytanie, oferty są trudno
          porównywalne, a materiał edukacyjny w języku polskim jest rozproszony lub powierzchowny.
          Staramy się to zmieniać, dostarczając rzetelne informacje i bezpłatne doradztwo przed
          zakupem.
        </p>
        <p style={textStyle}>
          Odpowiadamy na pytania przez formularz kontaktowy w ciągu jednego dnia roboczego. Nie
          wywieramy presji sprzedażowej - naszym sukcesem jest firma, która kupiła maszynę
          dopasowaną do swoich potrzeb.
        </p>
      </section>

      {/* Dla kogo */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>Dla kogo jest ten serwis</h2>
        <p style={textStyle}>
          Serwis skierowany jest przede wszystkim do właścicieli firm, kierowników produkcji i
          specjalistów ds. inwestycji w polskich przedsiębiorstwach z sektora MŚP, które pracują z
          metalem lub rozważają wejście w technologię spawania laserowego.
        </p>
        <p style={textStyle}>
          Typowy odbiorca to firma zatrudniająca od kilku do kilkuset pracowników, działająca w
          jednej z następujących branż: obróbka metalu i blach, konstrukcje stalowe, podwykonawstwo
          dla motoryzacji, branża HVAC (klimatyzacja, wentylacja, ogrzewanie), produkcja elementów
          ze stali nierdzewnej lub aluminium, a także ogólna produkcja kontraktowa i serwisowanie.
        </p>
        <p style={textStyle}>
          Odpowiadamy zarówno na pytania firm, które nigdy nie miały spawarkę laserową i
          rozważają pierwszą inwestycję, jak i tych, które już posiadają maszynę i zastanawiają się
          nad rozbudową parku maszynowego lub zmianą dostawcy.
        </p>
      </section>

      {/* Co znajdziesz */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>Co znajdziesz na tej stronie</h2>
        <p style={textStyle}>
          Serwis składa się z kilku obszarów treściowych, z których każdy odpowiada na inny etap
          procesu decyzyjnego.
        </p>

        <div style={accentLineStyle}>
          <p style={{ ...textStyle, marginBottom: 0 }}>
            <strong>Katalog modeli (/modele)</strong> - zestawienie 6 modeli spawarek laserowych w 2
            kategoriach (ręczne handheld 1–3 kW, automatyczne stacje spawalnicze)
            z opisem przeznaczenia, specyfikacjami i grubościami spawania. Służy jako punkt wyjścia do
            rozmowy o doborze maszyny.
          </p>
        </div>

        <div style={accentLineStyle}>
          <p style={{ ...textStyle, marginBottom: 0 }}>
            <strong>Blog edukacyjny (/blog)</strong> - pogłębione artykuły poruszające następujące
            tematy: kryteria wyboru spawarki laserowej, spawanie stali nierdzewnej, całkowity koszt
            posiadania (TCO) i ceny maszyn, porównanie lasera z TIG/MIG, koszty eksploatacji i
            materiały eksploatacyjne, najczęstsze błędy przy zakupie, przygotowanie hali
            produkcyjnej pod instalację maszyny, serwis i wsparcie techniczne, a także obliczanie
            zwrotu z inwestycji (ROI).
          </p>
        </div>

        <div style={accentLineStyle}>
          <p style={{ ...textStyle, marginBottom: 0 }}>
            <strong>Bezpłatne doradztwo (/kontakt)</strong> - formularz, przez który można opisać
            swoją sytuację produkcyjną i zapytać o rekomendację konkretnego modelu. Odpowiadamy
            merytorycznie, z uzasadnieniem wyboru.
          </p>
        </div>
      </section>

      {/* Trzy klasy maszyn */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>Trzy klasy spawarek laserowych</h2>
        <p style={{ ...mutedStyle, marginBottom: '1.5rem' }}>
          Kategoryzujemy maszyny w trzech klasach odpowiadających realnym potrzebom produkcyjnym
          polskich firm. Każda klasa to zbiór cech i kompromisów dopasowanych do skali i charakteru
          produkcji.
        </p>

        <div style={cardStyle}>
          <h3 style={{ fontWeight: 700, color: 'var(--fg)', marginBottom: '0.5rem' }}>
            Ręczne 1–1,5 kW - dla mniejszych zakładów
          </h3>
          <p style={textStyle}>
            Spawarki ręczne SL1000H i SL1500H to punkt wejścia w technologię laserową. Operator
            prowadzi głowicę ręcznie, co daje elastyczność przy spawaniu dużych lub nieregularnych
            detali. Sprawdzają się przy spawaniu stali nierdzewnej do 5–6 mm i aluminium do 4 mm.
          </p>
          <p style={{ ...textStyle, marginBottom: 0 }}>
            Prosta obsługa — operator samodzielnie pracuje po 1–2 dniach szkolenia.
            Ceny od ok. 28 000 zł netto.
          </p>
        </div>

        <div style={cardStyle}>
          <h3 style={{ fontWeight: 700, color: 'var(--fg)', marginBottom: '0.5rem' }}>
            Ręczne 2–3 kW - do intensywnej produkcji
          </h3>
          <p style={textStyle}>
            Spawarki SL2000H i SL3000H przeznaczone są dla zakładów z wyższym wolumenem i grubszymi
            materiałami. Moc 2 kW pozwala spawać stal do 12 mm, nierdzewną do 8 mm. Model 3 kW
            obsługuje stal do 20 mm i jest wybierany przez kooperantów pracujących na dwie zmiany.
          </p>
          <p style={{ ...textStyle, marginBottom: 0 }}>
            Najwyższy zakres ręcznych spawarek laserowych - zachowują elastyczność przy zachowaniu
            wysokiej przepustowości. Ceny od ok. 65 000 zł netto.
          </p>
        </div>

        <div style={cardStyle}>
          <h3 style={{ fontWeight: 700, color: 'var(--fg)', marginBottom: '0.5rem' }}>
            Automatyczne stacje spawalnicze - do produkcji seryjnej
          </h3>
          <p style={textStyle}>
            SL2000A i SL3000A wyposażone są w stolik CNC z uchwytem i programowalnym sterownikiem.
            Powtarzalność 0,02 mm — każda sztuka identyczna. SL3000A z podwójnym wymiennym stołem
            umożliwia ciągłą produkcję bez przestoju przy załadunku.
          </p>
          <p style={{ ...textStyle, marginBottom: 0 }}>
            Dla zakładów z produkcją seryjną standaryzowanych detali. Ceny od ok. 180 000 zł netto.
          </p>
        </div>
      </section>

      {/* Jak działamy */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>Jak działamy</h2>
        <p style={textStyle}>
          Proces jest prosty. Firma wypełnia formularz na stronie /kontakt, opisując swoją
          sytuację: branżę, skalę produkcji, rodzaj spawanych materiałów, budżet inwestycji i
          oczekiwany czas zwrotu. Można też po prostu opisać problem, który firma chce rozwiązać.
        </p>
        <p style={textStyle}>
          Odpowiadamy w ciągu jednego dnia roboczego. Nasza odpowiedź jest merytoryczna - zawiera
          rekomendację konkretnego modelu z uzasadnieniem, ewentualne pytania doprecyzowujące lub
          wskazanie artykułów z naszego bloga, które odpowiadają na pytanie bardziej szczegółowo.
        </p>
        <p style={textStyle}>
          Jeśli firma zdecyduje się na zakup, prowadzimy ją przez cały proces - od wyboru
          konfiguracji, przez zamówienie, dostawę, aż po instalację i szkolenie. Jako autoryzowany
          dealer BLink Laser zapewniamy gwarancję producenta i serwis w Polsce.
        </p>
      </section>

      {/* FAQ redakcyjne */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>Częste pytania o ten serwis</h2>

        <div style={{ marginBottom: '1.5rem' }}>
          <p style={faqQuestionStyle}>Czy jesteście autoryzowanym dealerem BLink Laser?</p>
          <p style={{ ...mutedStyle, marginBottom: 0 }}>
            Tak. Jesteśmy autoryzowanym dealerem BLink Laser w Polsce. Sprzedajemy maszyny z
            gwarancją producenta, prowadzimy instalację i szkolenia, zapewniamy serwis pogwarancyjny.
          </p>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <p style={faqQuestionStyle}>Skąd pochodzi wiedza prezentowana na stronie?</p>
          <p style={{ ...mutedStyle, marginBottom: 0 }}>
            Treści przygotowywane są w oparciu o dokumentację techniczną producenta, doświadczenie
            z instalacji maszyn u klientów oraz rozmowy z firmami produkcyjnymi. Staramy się być
            rzetelni i zaznaczamy, kiedy coś jest naszą oceną, a kiedy faktem technicznym.
          </p>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <p style={faqQuestionStyle}>Czy doradztwo przed zakupem jest bezpłatne?</p>
          <p style={{ ...mutedStyle, marginBottom: 0 }}>
            Tak, doradztwo i konsultacja doboru maszyny są bezpłatne i bez zobowiązań. Formularz
            kontaktowy nie wymaga podawania danych firmy poza adresem e-mail lub telefonem.
          </p>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <p style={faqQuestionStyle}>Czy można zamówić maszynę przez ten serwis?</p>
          <p style={{ ...mutedStyle, marginBottom: 0 }}>
            Tak. Obsługujemy cały proces zakupu - od wyboru modelu, przez
            złożenie zamówienia u producenta, po dostawę, instalację i odbiór maszyny w Polsce.
          </p>
        </div>

        <div style={{ marginBottom: 0 }}>
          <p style={faqQuestionStyle}>Jak się z wami skontaktować?</p>
          <p style={{ ...mutedStyle, marginBottom: 0 }}>
            Przez formularz na stronie /kontakt lub telefonicznie pod numer +48 570 854 886.
            Odpowiadamy w ciągu jednego dnia roboczego.
          </p>
        </div>
      </section>
    </div>
  )
}
