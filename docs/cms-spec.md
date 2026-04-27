# CMS spec

## Cel

Zapewnić bardzo prosty panel do zarządzania treściami bez technicznego progu wejścia.

## Funkcje

- lista wpisów,
- dodawanie wpisu,
- edycja wpisu,
- usuwanie wpisu,
- status draft / published,
- pola SEO,
- upload lub podpięcie meta image,
- zarządzanie slugiem,
- możliwość ustawienia H1 osobno od meta title,
- data publikacji,
- kategorie i tagi.

## Pola posta

- id
- title
- h1
- slug
- excerpt
- content
- coverImage
- metaTitle
- metaDescription
- metaImage
- socialTitle
- socialDescription
- category
- tags
- publishedAt
- status

## Warianty wdrożenia

### Wariant 1
Pliki lokalne md/json w repo.

### Wariant 2
Supabase:
- tabela posts,
- tabela pages,
- tabela settings,
- storage na obrazy,
- auth do panelu.
