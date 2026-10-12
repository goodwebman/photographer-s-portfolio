# apollinaria — сайт фотографа

Одностраничный сайт-портфолио Аполлинарии (Полины), фотографа из Омска:
первый экран, «Обо мне», портфолио с фильтром и полноэкранным просмотром,
услуги и цены, контакты. Только на русском, тёмная («Ночь») и светлая
(«День») темы.

**Стек:** Next.js 16 (App Router, RSC) · React 19 · TypeScript strict ·
Tailwind CSS v4 · Motion · вендоренный UI-кит · Vitest · Storybook 10

---

## Быстрый старт

```bash
npm install
npm run dev                  # http://localhost:3000
```

| Команда | Что делает |
| --- | --- |
| `npm run dev` | Дев-сервер (Turbopack) |
| `npm run build` | Продакшн-сборка |
| `npm start` | Запуск собранного приложения |
| `npm run lint` | ESLint (`eslint-config-next` + typescript) |
| `npm run test:run` | Vitest одним прогоном |
| `npm run storybook` | Storybook на `:6006` |
| `npm run build-storybook` | Статическая сборка Storybook |

### Переменные окружения

| Переменная | Обязательна | Назначение |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | в проде — да | Адрес сайта: канонический URL, `sitemap.xml`, `robots.txt`, OG-теги, JSON-LD |

Без неё адрес берётся из `VERCEL_PROJECT_PRODUCTION_URL`, локально —
`http://localhost:3000`. **В проде задать явно**, иначе поисковик
проиндексирует несуществующий домен.

---

## Как поменять контент

| Что | Где |
| --- | --- |
| Любой текст на сайте | `src/shared/config/copy.ts` — все тексты в одном файле |
| Ссылки, ник, имя, город | `src/shared/config/site.ts` |
| Пункты меню и якоря секций | `src/shared/config/nav.ts` |
| Цены и тарифы | `src/entities/service/model/services.ts` |
| Фотографии | `src/entities/photo/` (ниже) |

**Добавить фото.** Положить файл в `src/entities/photo/assets/<серия>-NN.webp`
(до 2560px по длинной стороне — `next/image` сам сделает AVIF/WebP нужных
размеров), импортировать его в `src/entities/photo/model/photos.ts` и добавить
запись в `PHOTOS`: `id`, `src`, `category`, `alt` (описание кадра — его читает
скринридер и показывает лайтбокс). Если кадр кадрируется неудачно, задать
`focal` (`object-position`, напр. `'50% 30%'`). Порядок в массиве = порядок
в сетке.

**Новый жанр** — добавить id в `PhotoCategory` (`model/types.ts`) и подпись в
`PHOTO_CATEGORIES`. Вкладка фильтра появится сама.

**Новый тариф** — запись в `SERVICES`. Карточка, «от N ₽» в «Обо мне» и
разметка `Offer` для поисковиков подхватятся автоматически.

Правило контента: только факты из брифа Полины. Стаж, число клиентов,
отзывы, адреса студий не выдумывать. У каждого упоминания Instagram —
сноска про Meta (`COPY.common.metaDisclaimer`).

---

## Архитектура

[Feature-Sliced Design](https://feature-sliced.design/), импорт только «вниз»:

```
src/
├── app/         layout, страница, 404, SEO-роуты (sitemap/robots/manifest/OG)
├── widgets/     секции: site-header, hero, marquee-strip, about-section,
│                portfolio-section, services-section, contact-section,
│                site-footer, back-to-top
├── entities/    photo (работы, жанры), service (тарифы, формат цены)
└── shared/      ui (+ вендоренный кит), lib, config, theme
```

Наружу слайс отдаётся через `index.ts`. Виджеты импортируют компоненты только
из `@/shared/ui` — там и кит, и site-компоненты.

### Одностраничник

Навигация — якоря `#about`, `#portfolio`, `#services`, `#contact` (id секций
в `SECTION_ID`). Плавность даёт CSS `scroll-behavior: smooth` (выключается при
`prefers-reduced-motion`), отступ под фиксированную шапку —
`scroll-padding-top` на `<html>`. Текущая секция подсвечивается в шапке
(`useActiveSection`, один `IntersectionObserver`). Мобильное меню скроллит к
секции уже после закрытия: пока открыт диалог, скролл документа заблокирован.

### Server / Client Components

По умолчанию всё серверное. `'use client'` — там, где интерактив или
браузерные API: шапка, портфолио (фильтр + лайтбокс), контакты, анимационные
обёртки.

**Иконки `react-icons` рендерятся только на клиенте**: они читают
`IconContext` через `Context.Consumer`, который ломается при передаче через
RSC-границу. Поэтому `SOCIALS` импортируется прямо в клиентских компонентах.
Классы кнопок (`buttonVariants` кита) — в модуле без `'use client'`, на них
построены server-safe `UILinkButton`, `UIIconLink`.

---

## Дизайн-система «Ночь / День»

Токены — `src/app/globals.css`. Имена совпадают с UI-китом, поэтому его
компоненты окрашиваются без правок.

- **Ночь** (по умолчанию — большинство кадров Полины ночные): тёплый
  плёночный графит `#100f0d`, костяной белый `#eee7db`.
- **День**: тёплая бумага `#f2ede4`, чернила `#1c1915`.
- **Акцент — терракота** (`--brand*`): рифма к рыжим волосам и натриевым
  фонарям на её кадрах, комплементарная пара к синим ночным снимкам.
  Дозированно: курсивные слова, eyebrow, номера, активный пункт меню.
- `--surface` — второй фон секций для ритма страницы.
- Контраст всех пар текст/фон — WCAG AA (расчёт в комментарии к токенам и на
  странице Storybook «Foundations»).
- Семантика кита: `--accent` — тихая hover-подложка, **не** бренд.

Гарнитуры: Playfair Display (serif, заголовки и цифры) и Inter Tight (UI и
текст), обе с кириллицей, через `next/font`. Шкала — `--text-hero …
--text-eyebrow`. Новые размеры регистрировать в `src/shared/lib/cn/tw-merge.ts`,
иначе `tailwind-merge` примет `text-small` за цвет и выкинет его.

Тема хранится в cookie и читается на сервере → `data-theme` на `<html>` с
первого байта: без вспышки темы и без hydration mismatch. Плата — страница
рендерится динамически (`ƒ` в выводе сборки). Секцию можно сделать локально
тёмной атрибутом `data-theme="dark"` на её корне.

Фото не перекрашиваются и не фильтруются. Поверх сайта — статичное плёночное
зерно (`UIFilmGrain`, 4%), под шапкой и лайтбоксом.

### Компоненты `shared/ui`

| Группа | Компоненты |
| --- | --- |
| Раскладка | `UIContainer`, `UISection`, `UISectionHeading` |
| Действия | `UILinkButton`, `UIIconLink`, `UITextLink`, `UIFab`, `UIThemeToggle` |
| Навигация | `UILogo`, `UINavLink` |
| Контент | `UIPhotoTile`, `UIPriceCard`, `UINumberedList` |
| Оверлеи | `UILightbox` (на `UIDialog` кита) |
| Декор и анимация | `UIColumnLines`, `UIFilmGrain`, `UIFrameLoader`, `UIReveal`, `UIWordReveal` |
| Служебное | `JsonLd` |

Соглашения: папка в `kebab-case`, компонент `UIPascalCase`, пропсы
`IUIXxxProps` с `readonly`-полями, `className: cnParams | string`, `dataName` →
`data-name="UIXxx-<suffix>"` (у компонентов кита — `testId`). Рядом
`*.test.tsx` и `*.stories.tsx`.

### UI-кит

Исходники [UI-KIT-goodwebman](https://github.com/goodwebman/UI-KIT-goodwebman)
скопированы в `src/shared/kit` (в npm кит не опубликован). Коммит, дата и все
локальные правки — в `src/shared/kit/README.md`. Код кита меняется только по
этому списку, ESLint его не линтит.

---

## Производительность

- **`"sideEffects": ["*.css"]` в `package.json` — не удалять.** Без него
  `export * from '@/shared/kit'` в `shared/ui/index.ts` тянет в клиентский
  бандл весь кит (карусель, телефонный инпут, `react-virtuoso` …): основной
  чанк был 346 КБ, стал 158 КБ. Если появится модуль, который нужен ради
  побочного эффекта при импорте, — добавить его в этот список.
- **Шрифты прелоадятся только кириллицей** (`subsets: ['cyrillic']` в
  `src/app/fonts.ts`): `subsets` в next/font решает лишь, что прелоадить,
  остальные наборы грузятся по `unicode-range`. 3 файла вместо 6 не отнимают
  канал у hero-фото.
- **Hero-фото — LCP:** `preload` + `fetchPriority="high"` (в Next 16
  `priority` устарел и `fetchpriority` не ставит), без анимации прозрачности.
- Изображения — `next/image` (AVIF/WebP, годовой кэш), static import даёт
  размеры и blur-плейсхолдер: CLS = 0.
- Lighthouse mobile (`/`, прод-сборка, троттлинг DevTools): Performance 96,
  Accessibility / Best Practices / SEO — 100. Симулированный режим локально
  показывает LCP ~5 с — артефакт Lantern: на быстрой машине скрипты успевают
  выполниться до первой отрисовки и засчитываются в путь LCP (реальный LCP в
  том же трейсе ~0.2 с). Мерить на задеплоенном сайте или с
  `--throttling-method=devtools`.

---

## SEO

- Метаданные в `src/app/layout.tsx`: title, description, keywords, Open Graph,
  канонический URL.
- JSON-LD: `Person`, `ProfessionalService` (город, `priceRange`, тарифы
  `Offer` с ценой за час в RUB), `WebSite` — `src/shared/lib/seo/json-ld.ts`.
- OG-картинка генерируется кодом (`opengraph-image.tsx`) латиницей: встроенный
  шрифт `ImageResponse` без кириллицы.
- `sitemap.xml`, `robots.txt`, `manifest.webmanifest` — кодом; 404 закрыта от
  индексации.
- Security-заголовки — `next.config.ts`.

---

## Тесты и Storybook

Vitest + Testing Library (jsdom), тесты рядом с кодом. Проверяют поведение и
доступность, а не разметку: фильтр портфолио, лайтбокс (клавиатура, фокус),
меню и якоря шапки, переключатель темы, данные цен.

Static import картинок в тестах подменяется объектом `StaticImageData`
(плагин в `vitest.config.ts`), для ручных фикстур — `TEST_IMAGE` из
`@/shared/lib/testing`.

Storybook: группы `Foundations` (палитра обеих тем, шкала, кит в палитре),
`Site/*`, `Kit/*`; тема — переключателем в тулбаре.

---

## Деплой

Обычное Next.js-приложение: `npm run build` → `npm start`. На Vercel —
подключить репозиторий и задать `NEXT_PUBLIC_SITE_URL`.

## TODO

- **Домен** для `NEXT_PUBLIC_SITE_URL`.
