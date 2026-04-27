# spawarkilaserowe.com

Repozytorium startowe dla serwisu spawarkilaserowe.com budowanego w Next.js + Tailwind CSS, z możliwością podpięcia Supabase jako CMS/backendu.

## Cel projektu

Stworzenie nowoczesnej strony B2B dla porównania i prezentacji modeli spawarek laserowych (ręcznych i automatycznych), z blogiem SEO, panelem CMS. Sklonowane i zaadaptowane z projektu wycinarkilaserowe.com.

## Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- GitHub jako source of truth
- Opcjonalnie: Supabase (auth, storage, posts, admin)

## Priorytety

- SEO-first
- czytelność dla człowieka
- semantyka dobra dla LLM
- prosty CMS
- szybkie wdrożenie
- maksymalne ograniczenie kosztu tokenów podczas dalszej pracy

## Struktura repo

- `docs/` — brief, strategia, specyfikacje
- `prompts/` — gotowe prompty do dalszej pracy implementacyjnej
- `content/` — treści strony i szkielety wpisów
- `seo/` — słowa kluczowe, metadata, linkowanie
- `src/` — kod aplikacji
- `supabase/` — opcjonalny schemat bazy i polityki

## Workflow

1. Uzupełnij dane marki i modeli w `content/site/`.
2. Uzupełnij finalne treści lub rozbuduj szkielety wpisów w `content/posts/`.
3. Uruchom implementację na podstawie `prompts/master-implementation.md`.
4. Jeśli potrzebny jest dynamiczny CMS, podłącz Supabase.
5. Podmień finalne grafiki i assety z Figma Make.

## Ważne zasady

- Nie komunikujemy nigdzie publicznie procesu tworzenia kodu, tekstów ani grafik.
- Finalny produkt ma wyglądać jak standardowy proces projektowo-wdrożeniowy.
- Projekt jest adaptacją wycinarkilaserowe.com na segment spawarek laserowych.
