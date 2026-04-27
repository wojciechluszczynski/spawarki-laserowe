# Master implementation prompt

Zbuduj produkcyjny projekt Next.js + TypeScript + Tailwind CSS dla spawarkilaserowe.com na podstawie plików w tym repozytorium.

## Zasady pracy

1. Najpierw przeczytaj:
- `docs/project-brief.md`
- `docs/content-strategy.md`
- `docs/seo-plan.md`
- `docs/cms-spec.md`
- `docs/design-direction.md`
- wszystkie pliki w `content/site/`
- wszystkie pliki w `seo/`

2. Repozytorium traktuj jako główne źródło prawdy.
3. Nie twórz zbędnych nowych założeń, jeśli dane istnieją już w plikach.
4. Nie dodawaj publicznie żadnych odniesień do procesu generowania, automatyzacji ani narzędzi użytych do stworzenia strony.
5. Twórz kod czysty, modułowy i gotowy do reużycia pod spawarkilaserowe.com.

## Cel

Zaimplementuj:
- stronę główną,
- blog index,
- template artykułu,
- prosty panel CMS lub strukturę gotową pod Supabase,
- metadata SEO,
- schema.org,
- komponenty porównania 3 modeli,
- FAQ,
- formularz kontaktowy,
- responsywny layout.

## Wymagania jakościowe

- semantyczny HTML,
- App Router,
- generateMetadata tam gdzie ma sens,
- obrazy optymalizowane,
- content oddzielony od komponentów,
- gotowość pod dwa serwisy z niemal identycznym layoutem.
