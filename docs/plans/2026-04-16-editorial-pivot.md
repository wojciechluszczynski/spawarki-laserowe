# Editorial Pivot — Obiektywna strona ekspercka

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Przebudować spawarkilaserowe.com z witryny dealera na niezależny serwis ekspercki w stylu przecisksterowany.com — poradniki, porównania, tabele decyzyjne, linki afiliacyjne do sklepu BLink Laser.

**Architecture:** Next.js 16 App Router, content-first. Nowe strony statyczne (`/porownaj`, `/dla-kogo`, `/poradniki`). Formularz kontaktowy przez API route + Resend. Ceny synchronizowane przy buildzie przez scraper Cheerio z sklep.blinklaser.com. Redirect `/blog` → `/poradniki`.

**Tech Stack:** Next.js 16, Tailwind CSS v4, Resend (email API), Cheerio (build-time scraper), TypeScript.

---

## FAZA 1 — Fundament Redakcyjny

### Task 1: Nowa nawigacja i rebrand "Poradniki"

**Files:**
- Modify: `content/site/navigation.json`
- Modify: `src/components/ui/Header.tsx`
- Create: `src/app/poradniki/page.tsx`
- Create: `src/app/poradniki/[slug]/page.tsx`
- Modify: `src/app/blog/page.tsx` (redirect)
- Modify: `src/app/blog/[slug]/page.tsx` (redirect)
- Modify: `src/lib/posts.ts`

**Step 1: Zaktualizuj nawigację**

```json
{
  "main": [
    { "label": "Poradniki", "href": "/poradniki" },
    { "label": "Porównaj", "href": "/porownaj" },
    { "label": "Modele", "href": "/modele" },
    { "label": "Kontakt", "href": "/kontakt" }
  ]
}
```

**Step 2: Stwórz `/poradniki/page.tsx`**

Kopiuj logikę z `src/app/blog/page.tsx`, zmień tytuł i meta na "Poradniki — Spawarki Laserowe". Dodaj kategoryzację artykułów (tag w frontmatter):
- `zakup` — poradniki zakupowe
- `porownania` — techniczne porównania
- `eksploatacja` — koszty, serwis, ROI

**Step 3: Stwórz `/poradniki/[slug]/page.tsx`**

Kopiuj logikę z `src/app/blog/[slug]/page.tsx`. Upewnij się że `posts.ts` szuka plików z folderu `content/posts/` (bez zmian w FS, tylko nowe route).

**Step 4: Dodaj redirecty w starych route'ach**

```tsx
// src/app/blog/page.tsx
import { redirect } from 'next/navigation'
export default function BlogPage() { redirect('/poradniki') }

// src/app/blog/[slug]/page.tsx
import { redirect } from 'next/navigation'
export default function BlogPostPage({ params }: { params: { slug: string } }) {
  redirect(`/poradniki/${params.slug}`)
}
```

**Step 5: Dodaj `tag` do frontmatter w postach**

Edytuj każdy z 9 plików `.md` w `content/posts/` — dodaj `tag:` (zakup/porownania/eksploatacja). Przykład:
```yaml
---
title: "Jak wybrać spawarkę laserową do firmy - 5 kluczowych kryteriów"
tag: zakup
---
```

**Step 6: Commit**
```bash
git add content/site/navigation.json src/app/poradniki/ src/app/blog/
git commit -m "feat: rename blog to poradniki + add nav redirect"
```

---

### Task 2: Nowa strona główna — pozycjonowanie eksperckie

**Files:**
- Modify: `src/components/home/Hero.tsx`
- Modify: `src/components/home/WhyUs.tsx`
- Modify: `src/components/home/CtaBanner.tsx`
- Modify: `src/app/page.tsx` — kolejność sekcji
- Create: `src/components/home/EditorialBanner.tsx` — pasek "Niezależna informacja"

**Step 1: Nowy Hero.tsx**

Stary Hero: "Spawarki laserowe dla Twojego zakładu — Kup teraz"
Nowy Hero:

```tsx
// Headline:
"Wszystko, co musisz wiedzieć przed zakupem spawarki laserowej"

// Subheadline:
"Niezależne porównania, tabele decyzyjne i kalkulacje ROI. Bez zbędnych technikaliów — tylko to, co pomaga podjąć właściwą decyzję."

// CTA primary: "Porównaj modele" → /porownaj
// CTA secondary: "Czytaj poradniki" → /poradniki
```

Usuń wszelki język "kup teraz", "zamów", "oferta". Zamień na "sprawdź cenę" i "dowiedz się więcej".

**Step 2: Nowy EditorialBanner.tsx**

Pasek nad/po Hero z komunikatem wiarygodności:

```tsx
// Krótki pasek z ikonami i tekstem:
// "Niezależna analiza"  |  "Dane z rynku 2025"  |  "Bez ukrytych prowizji"
```

Styl: jasne tło `--bg`, border bottom, małe ikonki SVG, tekst `--muted`.

**Step 3: Nowy WhyUs.tsx — "Jak wybieramy"**

Zamiast "Dlaczego my", zmień na "Jak testujemy i oceniamy maszyny". Treść:
- Co sprawdzamy: precyzja, koszt eksploatacji, serwis, czas dostawy
- Skąd dane: rozmowy z operatorami, dane techniczne producentów, porównania na hali
- Pozycja: "Współpracujemy z BlinkLaser jako autoryzowanym dostawcą"

**Step 4: Nowa kolejność sekcji w page.tsx**

```tsx
<Hero />
<EditorialBanner />
<PopularnePorownaniaPreview />  {/* nowy komponent, placeholder tymczasowy */}
<MachinesShowcase />            {/* pozostaje */}
<FeaturedPoradniki />           {/* zastępuje statyczny blog widget */}
<Industries />                  {/* pozostaje */}
<FaqSection />                  {/* pozostaje */}
<CtaBanner />
```

**Step 5: Commit**
```bash
git add src/components/home/ src/app/page.tsx
git commit -m "feat: editorial homepage pivot — expert positioning"
```

---

### Task 3: Strona "O serwisie" → Manifest redakcyjny

**Files:**
- Modify: `src/app/o-serwisie/page.tsx`

**Step 1: Przepisz treść**

Nowa treść strony `/o-serwisie`:

```
## O tym serwisie

Spawarkilaserowe.com to niezależna baza wiedzy dla firm rozważających zakup
lub wymianę spawarki laserowej do metalu.

Piszemy dla: właścicieli zakładów ślusarskich, technologów produkcji,
kierowników inwestycji — ludzi, którym zależy na właściwej decyzji, nie na
kolejnej broszurze sprzedażowej.

## Co tu znajdziesz

- Porównania modeli bez faworyzowania jednego producenta
- Kalkulatory ROI i koszty eksploatacji w liczbach
- Poradniki zakupowe pisane z perspektywy operatora, nie sprzedawcy
- Tabele specyfikacji gotowe do druku i wewnętrznych prezentacji

## Nasze zasady

Treści są pisane niezależnie. Linki do sklepu BlinkLaser.com są oznaczone jako
partnerskie — współpracujemy z tym dystrybutorem, co pozwala nam pokrywać
koszty serwisu. Nie zmienia to jednak naszej oceny — opisujemy wady i zalety
uczciwie.

## Kontakt

Jeśli masz pytanie techniczne albo chcesz podzielić się doświadczeniem
z użytkowania maszyny — napisz. Czytamy każdą wiadomość.
```

**Step 2: Dodaj link do nawigacji stopki**

W `Footer.tsx` dodaj "O serwisie" jako link.

**Step 3: Commit**
```bash
git add src/app/o-serwisie/ src/components/ui/Footer.tsx
git commit -m "feat: editorial manifesto on o-serwisie"
```

---

## FAZA 2 — Nowe Strony Kluczowe

### Task 4: Strona `/porownaj` — tabele porównawcze

**Files:**
- Create: `src/app/porownaj/page.tsx`
- Create: `src/components/compare/ComparisonTable.tsx`
- Create: `src/components/compare/UseCaseMatrix.tsx`

**Step 1: ComparisonTable.tsx**

Komponent renderujący tabelę porównawczą. Props:
```typescript
interface ComparisonTableProps {
  title: string
  headers: string[]
  rows: { label: string; values: (string | boolean | number)[] }[]
  footnote?: string
}
```

Styl: sticky header, alternating rows (`--bg-card` / `--bg`), checkmark SVG dla boolean true, cross SVG dla false. Kolor akcentu `--accent` dla CTA w ostatniej kolumnie.

**Step 2: UseCaseMatrix.tsx**

Tabela "Dla kogo co":
```typescript
interface UseCase {
  profile: string        // "Mały zakład do 10 osób"
  volumePerMonth: string // "do 50 zleceń/mies."
  materialMax: string    // "do 10 mm"
  recommended: string    // "BL1510 2000W"
  shopUrl: string
}
```

**Step 3: `/porownaj/page.tsx` — pełna treść**

Sekcje strony:
1. **Kompaktowe vs. Przemysłowe** — `ComparisonTable` z danymi BL1313/1390/1510 vs BL3015L/S/GL
2. **Po mocy lasera: 1500W vs 2000W vs 3000W vs 6000W+** — kiedy wybrać co
3. **Laser vs Plazma** — niezależne porównanie technologii
4. **Dla kogo co** — `UseCaseMatrix`

Dane tabeli Kompaktowe vs Przemysłowe:
```typescript
const compactVsIndustrial = {
  title: "Kompaktowe vs. Przemysłowe — porównanie kluczowych parametrów",
  headers: ["Parametr", "Kompaktowe (BL1313–1510)", "Przemysłowe (BL3015)"],
  rows: [
    { label: "Pole robocze", values: ["do 1500×1000 mm", "3000×1500 mm"] },
    { label: "Maks. grubość stali", values: ["22 mm", "30 mm"] },
    { label: "Obudowa", values: [true, "opcjonalna"] },
    { label: "Wymienny stół", values: [false, "opcja (BL3015S)"] },
    { label: "Cena od (netto)", values: ["150 000 PLN", "159 000 PLN"] },
    { label: "Wymagana powierzchnia hali", values: ["~20 m²", "~60 m²"] },
    { label: "Idealna dla", values: ["rzemiosło, edukacja, CNC-on-demand", "seryjne cięcie, stalowe konstrukcje, outsourcing"] },
  ]
}
```

Dane tabeli Laser vs Plazma:
```typescript
// laser fiber vs. plasma — niezależna analiza
rows: [
  { label: "Precyzja cięcia", values: ["0,05 mm", "0,5–2 mm"] },
  { label: "Jakość krawędzi", values: ["gotowa, bez szlifowania", "wymaga wykończenia"] },
  { label: "Koszt zakupu", values: ["150–400 tys. PLN", "30–80 tys. PLN"] },
  { label: "Koszt eksploatacji/h", values: ["niższy przy grubości do 12mm", "niższy przy grubości 15mm+"] },
  { label: "Materiały", values: ["stal, nierdzewna, alu, mosiądz", "głównie stal węglowa"] },
  { label: "Hałas", values: ["niski", "wysoki"] },
]
```

**Step 4: Commit**
```bash
git add src/app/porownaj/ src/components/compare/
git commit -m "feat: /porownaj — tabele porownawcze laser vs plasma, kompaktowe vs przemyslowe"
```

---

### Task 5: Przeprojektowanie `/modele` — katalog badawczy

**Files:**
- Modify: `src/app/modele/page.tsx`
- Modify: `src/components/models/VariantCard.tsx`

**Step 1: Zmień nagłówek i framing strony**

Stary tytuł: "Modele spawarek laserowych"
Nowy:
```
h1: "Katalog spawarek laserowych BLink Laser"
Subheadline: "Pełne specyfikacje, zestawienia mocy i linki do aktualnych cen
w sklepie producenta. Dane aktualizowane przy każdym wydaniu."
```

Dodaj krótki disclaimer pod nagłówkiem:
```
"Dane techniczne pobierane od producenta. Ceny mogą różnić się od aktualnych
ofert sklepu — kliknij 'Sprawdź cenę' aby zobaczyć bieżącą ofertę."
```

**Step 2: Zmień CTA w VariantCard.tsx**

Stary przycisk: "Kup w sklepie" / "Zamów"
Nowy: "Sprawdź cenę →" z `target="_blank"` i atrybutem `rel="sponsored noopener"`

Dodaj małą etykietkę "link partnerski" pod przyciskiem — `text-[11px] text-muted`.

**Step 3: Dodaj sekcję "Jak czytać tę tabelę"**

Pod nagłówkiem strony, przed kartami produktów:
```tsx
<div className="...tip-box...">
  <h3>Jak korzystać z katalogu</h3>
  <ul>
    <li>Moc lasera (W) — wyższe W = szybsze cięcie i większa grubość, nie zawsze lepsza opcja</li>
    <li>Pole robocze — standardowy arkusz blachy to 3000×1500mm; mniejsze maszyny nie zmieszczą go w całości</li>
    <li>Pełne porównanie → <Link href="/porownaj">Tabela porównawcza</Link></li>
  </ul>
</div>
```

**Step 4: Commit**
```bash
git add src/app/modele/ src/components/models/
git commit -m "feat: reframe /modele as research catalog, add editorial context"
```

---

## FAZA 3 — Formularz kontaktowy z prawdziwym mailem

### Task 6: Instalacja Resend i API route

**Files:**
- Create: `src/app/api/contact/route.ts`
- Modify: `src/components/ContactForm.tsx`
- Modify: `.env.local` (dodać RESEND_API_KEY)
- Create: `.env.example`

**Step 1: Zainstaluj Resend**

```bash
npm install resend
```

**Step 2: Stwórz API route**

```typescript
// src/app/api/contact/route.ts
import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { name, company, phone, message } = await request.json()

    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Podaj imię i nazwisko' },
        { status: 400 }
      )
    }

    await resend.emails.send({
      from: 'Formularz <formularz@spawarkilaserowe.com>',
      to: ['kontakt@spawarkilaserowe.com'],
      replyTo: undefined,
      subject: `Zapytanie z spawarkilaserowe.com — ${name}`,
      text: [
        `Imię i nazwisko: ${name}`,
        `Firma: ${company || '—'}`,
        `Telefon: ${phone || '—'}`,
        `Wiadomość:\n${message || '—'}`,
      ].join('\n'),
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('contact route error', err)
    return NextResponse.json(
      { error: 'Błąd serwera. Spróbuj ponownie lub zadzwoń.' },
      { status: 500 }
    )
  }
}
```

**Uwaga dla wdrożenia Resend:**
1. Zarejestruj konto na resend.com (darmowy plan: 3000 maili/mies.)
2. Zweryfikuj domenę `spawarkilaserowe.com` przez DNS (TXT record)
3. Wygeneruj API key
4. Dodaj do `.env.local`: `RESEND_API_KEY=re_xxxx`
5. Dodaj na Vercel: Settings → Environment Variables → `RESEND_API_KEY`

**Step 3: Stwórz `.env.example`**

```bash
# Email via Resend (resend.com)
RESEND_API_KEY=re_your_key_here
```

**Step 4: Przepisz ContactForm.tsx**

Nowy formularz z pełnymi stanami:

```typescript
type Status = 'idle' | 'loading' | 'success' | 'error'

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    const data = new FormData(e.currentTarget)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          company: data.get('company'),
          phone: data.get('phone'),
          message: data.get('message'),
        }),
      })

      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Błąd serwera')
      setStatus('success')
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Błąd. Spróbuj ponownie.')
      setStatus('error')
    }
  }

  // Success state
  if (status === 'success') {
    return (
      <div className="rounded-xl border p-6 flex flex-col gap-2"
           style={{ borderColor: 'var(--accent)', background: 'var(--accent-subtle)' }}>
        <p className="font-semibold" style={{ color: 'var(--fg)' }}>
          Wiadomość wysłana.
        </p>
        <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>
          Odpiszemy na Twoje zapytanie w ciągu 1 dnia roboczego.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-lg">
      {/* pola formularza — te same co poprzednio */}

      {/* Error state */}
      {status === 'error' && (
        <p className="text-sm rounded-lg p-3"
           style={{ background: '#FEF2F2', color: '#B91C1C' }}>
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="..."
        style={{ background: 'var(--accent)' }}>
        {status === 'loading' ? 'Wysyłanie...' : 'Wyślij zapytanie'}
      </button>
    </form>
  )
}
```

**Step 5: Commit**
```bash
git add src/app/api/ src/components/ContactForm.tsx .env.example
git commit -m "feat: contact form via Resend API route — loading/success/error states"
```

---

## FAZA 4 — Synchronizacja cen przy buildzie

### Task 7: Build-time price scraper

**Files:**
- Create: `scripts/sync-prices.mjs`
- Modify: `package.json` — prebuild script
- Modify: `content/site/products.json` — remove hardcoded prices (or keep as fallback)
- Create: `content/site/prices-live.json` — generowany automatycznie

**Step 1: Zainstaluj Cheerio**

```bash
npm install --save-dev cheerio
```

**Step 2: Stwórz scraper**

```javascript
// scripts/sync-prices.mjs
import { writeFileSync } from 'fs'
import { load } from 'cheerio'

const SHOP_URL = 'https://sklep.blinklaser.com/spawarki-laserowe'

async function scrapeCategory(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'spawarkilaserowe.com price-sync/1.0' }
  })
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  return load(await res.text())
}

async function syncPrices() {
  console.log('Syncing prices from blinklaser.com...')
  try {
    const $ = await scrapeCategory(SHOP_URL)
    const prices = {}

    // Selektory mogą wymagać dostosowania do struktury sklepu
    // Logika: szukaj .product-card lub odpowiednika, wyciągnij nazwę i cenę
    $('[data-product-id], .product-item, .product-card').each((_, el) => {
      const name = $(el).find('.product-name, h2, h3').first().text().trim()
      const priceText = $(el).find('.price, .woocommerce-Price-amount').first().text().trim()
      const priceNet = parseInt(priceText.replace(/[^0-9]/g, ''), 10)
      if (name && priceNet) {
        prices[name] = { priceNet, priceGross: Math.round(priceNet * 1.23), scrapedAt: new Date().toISOString() }
      }
    })

    writeFileSync(
      'content/site/prices-live.json',
      JSON.stringify({ syncedAt: new Date().toISOString(), prices }, null, 2)
    )
    console.log(`Synced ${Object.keys(prices).length} prices.`)
  } catch (err) {
    console.warn('Price sync failed (using fallback from products.json):', err.message)
    // Nie rzucaj błędu — build kontynuuje z cenami z products.json
  }
}

syncPrices()
```

**Step 3: Dodaj prebuild do package.json**

```json
"scripts": {
  "dev": "next dev",
  "prebuild": "node scripts/sync-prices.mjs",
  "build": "next build",
  "start": "next start",
  "lint": "eslint"
}
```

**Step 4: Użyj prices-live.json w /modele**

W `src/app/modele/page.tsx` dodaj logikę merge'u:
```typescript
import productsData from '@/content/site/products.json'
import { existsSync, readFileSync } from 'fs'
import path from 'path'

function getLivePrices() {
  const p = path.join(process.cwd(), 'content/site/prices-live.json')
  if (!existsSync(p)) return {}
  return JSON.parse(readFileSync(p, 'utf-8')).prices ?? {}
}

// Merge live prices over product data during SSG
```

**Step 5: Dodaj prices-live.json do .gitignore**

```
content/site/prices-live.json
```

**Step 6: Commit**
```bash
git add scripts/ package.json .gitignore
git commit -m "feat: build-time price scraper from blinklaser.com (graceful fallback)"
```

---

## FAZA 5 — SEO i polish

### Task 8: Zaktualizowane metadane i structured data

**Files:**
- Modify: `src/app/page.tsx` — metadata
- Modify: `src/app/porownaj/page.tsx` — metadata
- Modify: `src/app/poradniki/page.tsx` — metadata
- Modify: `src/app/modele/page.tsx` — metadata
- Modify: `src/app/kontakt/page.tsx` — metadata

**Step 1: Nowe metadata dla każdej strony**

```typescript
// Homepage
export const metadata: Metadata = {
  title: 'Spawarki Laserowe — Niezależne Porównania i Poradniki Zakupowe',
  description: 'Porównaj spawarki laserowe do metalu: tabele specyfikacji, kalkulacje ROI, poradniki eksperckie. Bez zbędnego marketingu — tylko dane.',
}

// /porownaj
export const metadata: Metadata = {
  title: 'Porównanie spawarek laserowych — Laser vs Plazma, Kompaktowe vs Przemysłowe',
  description: 'Tabele porównawcze spawarek laserowych: kompaktowe vs przemysłowe, 1500W vs 3000W vs 6000W, laser światłowodowy vs plazmowy.',
}

// /poradniki
export const metadata: Metadata = {
  title: 'Poradniki Zakupowe — Spawarki Laserowe',
  description: 'Ekspercie poradniki: jak wybrać spawarkę, koszty eksploatacji, ROI, przygotowanie hali. Pisane z perspektywy operatora.',
}
```

**Step 2: Dodaj FAQ structured data na /porownaj**

```typescript
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Kiedy laser lepszy niż plazma?",
      "acceptedAnswer": { "@type": "Answer", "text": "Laser światłowodowy przewyższa plazmę w precyzji (0,05 mm vs 0,5 mm), jakości krawędzi i różnorodności materiałów (aluminium, mosiądz, nierdzewna). Plazma jest tańsza przy grubościach powyżej 20mm stali węglowej." }
    }
  ]
}
```

**Step 3: Commit**
```bash
git add src/app/
git commit -m "feat: SEO metadata + FAQ structured data on /porownaj"
```

---

## Deployment checklist

Po ukończeniu wszystkich tasków:

- [ ] `RESEND_API_KEY` dodany w Vercel env vars
- [ ] Domena `spawarkilaserowe.com` zweryfikowana w Resend (DNS TXT)
- [ ] Sender `formularz@spawarkilaserowe.com` autoryzowany w Resend
- [ ] Testowy submit formularza na production
- [ ] Sprawdź czy `/blog` → `/poradniki` redirect działa
- [ ] Sprawdź czy build-time scraper loguje błąd ale nie blokuje buildu gdy sklep niedostępny
- [ ] `npm run build` lokalnie — zero errors
- [ ] Deploy na Vercel: `vercel --prod`

---

## Kolejność priorytetów

| # | Task | Czas | Impact |
|---|------|------|--------|
| 1 | Task 2 — Nowy homepage | 2h | Wysoki |
| 2 | Task 4 — /porownaj | 3h | Wysoki |
| 3 | Task 6 — Formularz + Resend | 2h | Krytyczny |
| 4 | Task 1 — Nawigacja + Poradniki | 1h | Średni |
| 5 | Task 5 — /modele reframe | 1h | Średni |
| 6 | Task 3 — O serwisie | 30min | Niski |
| 7 | Task 7 — Price scraper | 3h | Niski (nice-to-have) |
| 8 | Task 8 — SEO metadata | 1h | Niski |
