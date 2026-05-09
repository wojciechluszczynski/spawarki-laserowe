# Spawarki Laserowe — szablon serwisu B2B

SEO-first serwis produktowy dla dealera spawarek laserowych BLink. Zaprojektowany jako szablon wielokrotnego użytku — ta sama architektura obsługuje dowolny niszowy segment B2B (maszyny, narzędzia, urządzenia przemysłowe).

**Live:** [spawarkilaserowe.vercel.app](https://spawarkilaserowe.vercel.app)

---

## Co to jest

Serwis ekspercki łączący katalog produktowy z redakcją poradnikową — zamiast typowej strony dealera, niezależny punkt wiedzy z linkami afiliacyjnymi do sklepu. Ceny synchronizowane automatycznie przy każdym buildzie przez scraper Cheerio z zewnętrznego sklepu Shoper.

---

## Funkcje

- **Katalog 3 modeli** — karty z konfiguratorem, specyfikacją i porównaniem side-by-side
- **Porównanie modeli** (`/porownaj`) — interaktywna tabela decyzyjna
- **Poradniki** (`/poradniki`) — artykuły SEO z tagami (zakup / porównania / eksploatacja)
- **Zastosowania** (`/zastosowania`) — sekcje branżowe z opisami zastosowań
- **Integracja Shoper** — build-time scraper Cheerio synchronizuje ceny przed każdym deployem
- **Formularz kontaktowy** — API route + Resend, walidacja serwerowa
- **Floating CTA** — sticky przycisk na wszystkich podstronach
- **Robots + sitemap** — auto-generowane przez Next.js
- **Filesystem CMS** — treści w Markdown, brak zewnętrznego backendu

---

## Integracja Shoper

Ceny produktów synchronizowane są przy buildzie — scraper Cheerio odpytuje sklep Shoper przed deployem, parsuje ceny z HTML i zapisuje do lokalnego cache JSON. Komponenty czytają z cache, nigdy live — build nie blokuje się gdy sklep jest niedostępny.

```
src/lib/shoper-prices.ts   ← punkt wejścia integracji
content/site/products/     ← cache cen + dane produktów
```

---

## Stack

| Warstwa | Technologia |
|---|---|
| Framework | Next.js 16 (App Router) + TypeScript |
| Styling | Tailwind CSS v4 |
| CMS | Filesystem Markdown (gray-matter + remark) |
| Email | Resend (API route) |
| Price sync | Cheerio (build-time scraper Shoper) |
| Analytics | Vercel Analytics |
| Hosting | Vercel |

---

## Jako szablon — klonowanie na nowy segment

Jeden plik steruje całą tożsamością serwisu:

```ts
// src/lib/content-config.ts
export const contentConfig = {
  siteKey: 'spawarkilaserowe',
  contentSource: 'filesystem-first',
  cmsMode: 'hybrid-ready',
};
```

**Kroki:**

1. Sklonuj repo
2. Zmień `siteKey` w `content-config.ts`
3. Podmień treści w `content/` (produkty, posty, metadata)
4. Zaktualizuj URL sklepu Shoper w `src/lib/shoper-prices.ts`
5. Ustaw zmienne środowiskowe (`.env.example`)
6. Deploy na Vercel

---

## Lokalne uruchomienie

```bash
npm install
cp .env.example .env.local
# Uzupełnij RESEND_API_KEY i SHOP_URL
npm run dev
# → http://localhost:3000
```

---

## Struktura

```
content/
  posts/        Artykuły Markdown (poradniki, porównania)
  site/         Nawigacja, metadata, dane produktów, cache cen
src/
  app/          Next.js App Router — strony i API routes
  components/
    home/       Sekcje landing page
    models/     Karty i warianty produktowe
    compare/    Tabela porównawcza
    ui/         Header, Footer, Button, FloatingCta
  lib/
    content-config.ts    Konfiguracja szablonu
    shoper-prices.ts     Integracja Shoper (build-time scraper)
    posts.ts             Parser Markdown
docs/           Brief, strategia SEO, plan treści
```
