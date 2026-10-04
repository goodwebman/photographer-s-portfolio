# Портфолио — Данил Шебалов

Персональный сайт-портфолио фронтенд-разработчика: главная с анимированным hero,
страница «Обо мне», технологический стек, кейсы проектов с галереями и контакты.
Двуязычный (ru/en), с тёмной и светлой темами и WebGL-фоном на шейдерах.

**Стек:** Next.js 16 (App Router, RSC) · React 19 · TypeScript strict ·
Tailwind CSS v4 · next-intl · Motion · GSAP · Radix UI · Vitest · Storybook 10

---

## Быстрый старт

```bash
npm install
npm run dev                  # http://localhost:3000 → редирект на /ru
```

### Скрипты

| Команда | Что делает |
| --- | --- |
| `npm run dev` | Дев-сервер (Turbopack) |
| `npm run build` | Продакшн-сборка |
| `npm start` | Запуск собранного приложения |
| `npm run lint` | ESLint (`eslint-config-next` + typescript) |
| `npm test` | Vitest в watch-режиме |
| `npm run test:run` | Vitest одним прогоном (для CI) |
| `npm run storybook` | Storybook на `:6006` |
| `npm run build-storybook` | Статическая сборка Storybook |

### Переменные окружения

| Переменная | Обязательна | Назначение |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | в проде — да | Базовый адрес сайта. Из него строятся канонические URL, hreflang, `sitemap.xml`, `robots.txt` и OG-теги |

Если переменная не задана, адрес берётся из `VERCEL_PROJECT_PRODUCTION_URL`
(системная переменная Vercel), а в локальной разработке — `http://localhost:3000`.
**В продакшене её нужно задать явно:** иначе поисковик проиндексирует ссылки
на несуществующий домен.

---

## Архитектура

Проект следует [Feature-Sliced Design](https://feature-sliced.design/). Слои
сверху вниз, импорт разрешён только «вниз»:

```
src/
├── app/         роутинг, layout'ы, провайдеры, SEO-роуты (sitemap/robots/manifest/OG)
├── widgets/     самостоятельные блоки страниц (шапка, hero, подвал, витрины)
├── entities/    предметные сущности: project, skill
└── shared/      переиспользуемое без привязки к домену: ui, lib, config, i18n, theme
```

Внутри слайса — сегменты `ui` / `model` / `lib`, наружу всё отдаётся через
`index.ts` (публичный API слайса). Импортировать «вглубь» слайса, минуя
`index.ts`, нельзя.

### Границы слоёв на практике

- **`shared/ui`** — вся вёрстка и все интерактивные примитивы. Виджеты не
  содержат ни голых `<button>`, ни ad-hoc наборов Tailwind-классов: они
  композируют готовые компоненты и отвечают за данные, i18n и поведение.
- **`entities/*/ui`** — компоненты, знающие про форму доменных данных
  (`ProjectCard` раскладывает `Project` в `UICardProject`, `SkillDetails`
  собирает карточку технологии). Про i18n сущности не знают — тексты приходят
  готовыми пропсами.
- **`widgets`** — сборка секций из shared/entities + работа с переводами и
  состоянием (скролл, открытые модалки, мобильное меню).
- **`app`** — только роутинг, метаданные и провайдеры.

### Server / Client Components

По умолчанию всё серверное. `'use client'` появляется там, где нужны
интерактив, браузерные API или хуки: `SiteHeader`, `SkillsGrid`, `UIGallery`,
`SceneBackground`, анимационные обёртки.

Есть один неочевидный момент, зафиксированный в коде: **иконки `react-icons`
рендерятся только на клиенте**. Они читают `IconContext` через
`Context.Consumer`, который ломается при передаче через RSC-границу — поэтому
`SOCIALS` и `SKILLS` импортируются прямо в клиентских компонентах, а не
прокидываются пропсами с сервера.

Чтобы стили кнопок при этом переиспользовались в серверных компонентах, они
вынесены в модули **без** `'use client'`: `uiButtonClassNames` и
`uiIconButtonClassNames`. На них построены server-safe `UILinkButton`,
`UITextLink`, `UIIconLink`.

---

## Дизайн-система

Токены живут в `src/app/globals.css`: рантайм-переменные тем
(`--background`, `--accent`, …) и статические токены в `@theme inline`
(типографическая шкала `--text-display … --text-caption`, радиусы
`--radius-card/pill`, easing, пропорции скриншотов).

Тёмная тема включается атрибутом, а не медиазапросом:

```css
@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));
```

### `cn` и кастомные токены

Классы склеиваются через `cn` / `useCn` (`clsx` + `tailwind-merge`).
`tailwind-merge` знает только стоковую шкалу Tailwind, поэтому кастомные токены
регистрируются явно в `src/shared/lib/cn/tw-merge.ts`.

> **Важно.** Без этой регистрации `tailwind-merge` считает `text-small` /
> `text-caption` цветом текста и вычёркивает их при встрече с
> `text-muted-foreground` — размер шрифта молча теряется. Поведение
> зафиксировано тестами в `cn.test.ts`.

### Компоненты `shared/ui`

Каждый компонент — папка с реализацией, `index.ts`, `*.test.tsx` и
`*.stories.tsx`.

| Группа | Компоненты |
| --- | --- |
| Раскладка | `UIContainer`, `UISection`, `UISectionHeading`, `UIShowcase` |
| Действия | `UIButton`, `UILinkButton`, `UIIconButton`, `UIIconLink`, `UITextLink`, `UIFab` |
| Контент | `UICardProject`, `UIContactCard`, `UIFactCard`, `UIGlassCard`, `UITag`, `UISkill`, `UIBadge`, `UIProgress`, `UIAvatar`, `UILogo` |
| Навигация | `UINavLink`, `UISelect`, `UIThemeToggle` |
| Оверлеи | `UIModal`, `UIGallery` |
| Анимации/декор | `UIReveal`, `UIWordReveal`, `UIIconStream`, `UIGradient`, `SceneBackground` |
| Служебное | `Show`, `JsonLd`, `icons` |

Соглашения:

- имя файла в `kebab-case`, компонент — `UIPascalCase`;
- пропсы — интерфейс `IUIComponentNameProps`, поля `readonly`;
- `className` принимается как `cnParams | string` и склеивается через `useCn`;
- `dataName` даёт `data-name="UIComponent-<suffix>"` — якорь для отладки и тестов;
- у иконочных кнопок `label` обязателен: без него у элемента нет доступного имени.

---

## Интернационализация

`next-intl` + сегмент `[locale]`. Локали: `ru` (по умолчанию) и `en`, префикс
в URL всегда явный (`/ru/...`, `/en/...`).

- конфиг маршрутизации — `src/shared/i18n/routing.ts`;
- словари — `src/shared/i18n/messages/{ru,en}.json`;
- навигация — **только** `Link` / `useRouter` / `usePathname` из
  `@/shared/i18n`: они сами проставляют префикс локали;
- проставляет и редиректит локаль `src/proxy.ts` (в Next.js 16 middleware-энтри
  называется `proxy.ts`).

Нелокализуемые данные (пути к картинкам, ссылки, год, стек) лежат в
`entities/*/model` и `shared/config`; всё, что переводится, — в словарях.
Контент проектов резолвится динамическими ключами (`Projects.<slug>.summary`),
поэтому строгая типизация ключей сообщений намеренно не включена
(`src/global.d.ts` типизирует только `Locale`).

---

## Темизация

Тема хранится в cookie и читается **на сервере** в `[locale]/layout.tsx`, после
чего `data-theme` попадает в разметку с первого байта. Отсюда: нет ни вспышки
неправильной темы (FOUC), ни рассинхрона при гидрации, ни блокирующего
inline-скрипта в `<head>`.

**Плата за это:** чтение cookie делает страницы динамическими (`ƒ` в выводе
сборки) — полностью статической выдачи с CDN не будет. Для сайта без БД и
внешних запросов рендер занимает единицы миллисекунд, поэтому размен сознательный:
корректная тема важнее пары миллисекунд TTFB. Если статика окажется критичнее,
тему придётся ставить inline-скриптом до первой отрисовки, а иконку
переключателя переводить на CSS-переключение — иначе будет hydration mismatch.

---

## Производительность

- **WebGL-фон грузится лениво.** `SceneBackgroundLazy` — `next/dynamic` с
  `ssr: false`: шейдеры и рендер-цикл уезжают в отдельный чанк и не блокируют
  интерактивность. До загрузки видна заливка `--background`, совпадающая с
  базовым цветом шейдера.
- **Анимации не крутятся вхолостую.** `UIIconStream` останавливает
  `requestAnimationFrame` вне вьюпорта (IntersectionObserver) и при
  `prefers-reduced-motion`; `SceneBackground` — при скрытой вкладке.
- **Скролл-подписки троттлятся через rAF** и вешаются с `passive: true`
  (`useScrolledPast`, `useScrolledRatio`).
- **Изображения** — `next/image` с `formats: ['image/avif', 'image/webp']`,
  честными `sizes` и годовым `minimumCacheTTL`; обложки первого экрана идут с
  `priority`.
- **Шрифты** — `next/font` (self-hosted, без обращений к Google на рантайме),
  подмножество `latin`: кириллица намеренно отрисовывается системным шрифтом,
  чтобы не тащить лишний файл.
- **Иконки** — `react-icons/lu` и `react-icons/si` входят в дефолтный
  `optimizePackageImports` Next.js, поэтому в бандл попадают только
  использованные иконки.
- **Reduced motion** уважается во всех анимациях: `MotionConfig
  reducedMotion="user"`, проверки `useReducedMotion`, а стартовые состояния
  GSAP-ревилов объявлены внутри `@media (prefers-reduced-motion: no-preference)`
  — при отключённых анимациях контент виден сразу.

---

## SEO

Всё, что строится из адреса сайта, собирается хелперами из `shared/lib/seo`.

- **Метаданные страниц** — `buildPageMetadata()`: title, description,
  канонический URL и Open Graph, у которого `og:url` совпадает с каноническим.
- **hreflang** — `buildAlternates()` отдаёт `alternates.languages` для всех
  локалей плюс `x-default`. Две языковые версии перестают выглядеть дублями.
- **Structured data** — `Person` и `WebSite` в layout'е, `BreadcrumbList` на
  внутренних страницах, `CreativeWork` на кейсах. Вставка через `<JsonLd>`,
  который экранирует `<` (иначе строка вида `</script>` в данных закрыла бы тег).
- **OG-картинка** генерируется на лету (`opengraph-image.tsx`, `next/og`),
  1200×630. Текст на ней латиницей: встроенный в `ImageResponse` шрифт не
  содержит кириллицы.
- **`sitemap.xml`** перечисляет все статические разделы и кейсы, у каждой
  записи — языковые альтернативы. **`robots.txt`** и **`manifest.webmanifest`**
  генерируются кодом.
- **404 закрыта от индексации** (`robots: { index: false }`).
- **Заголовки безопасности** (`nosniff`, `Referrer-Policy`,
  `X-Frame-Options`, `Permissions-Policy`, HSTS) выставляются в `next.config.ts`.
  Полноценного CSP нет намеренно: Next инлайнит бутстрап-скрипты, и корректный
  `script-src` требует nonce из proxy-слоя — это отдельная задача.

---

## Тесты и документация компонентов

- **Vitest + Testing Library**, окружение jsdom. Тесты лежат рядом с
  компонентом (`*.test.tsx`) и проверяют поведение и доступность
  (роли, `aria-*`, клавиатуру), а не разметку целиком.
- В `vitest.setup.ts` замоканы `matchMedia`, `IntersectionObserver`,
  `ResizeObserver` и `canvas.getContext` — в jsdom их нет.
- `renderWithIntl` из `shared/lib/testing` оборачивает дерево провайдером
  next-intl: без него locale-aware `Link` падает.
- **Storybook 10** с `@storybook/addon-a11y` и переключателем темы в тулбаре;
  каждый компонент `shared/ui` документирован сторисами.

```bash
npm run test:run      # весь прогон
npm run storybook     # витрина компонентов
```

---

## Как добавить контент

**Новый проект** — `src/entities/project/model/projects.data.ts`: добавить
запись (`slug`, `cover`, `gallery`, `stack`, `links`, `year`, `featured`),
положить картинки в `public/projects/<slug>/` и добавить тексты
(`summary`, `role`, `description`) в оба словаря под ключом `Projects.<slug>`.
Маршрут, sitemap и structured data подхватятся автоматически.

**Новая технология** — `src/entities/skill/model/skills.data.tsx` плюс описание
в `Skills.description.<id>` обоих словарей. Иконка для тега стека проекта —
`src/entities/project/ui/tech-icon.tsx`.

**Новый раздел** — страница в `src/app/[locale]/<route>/page.tsx`, пункт в
`src/shared/config/nav.ts`, подпись в `Nav.<key>` и запись в
`src/app/sitemap.ts`.

---

## Деплой

Собирается как обычное Next.js-приложение (`npm run build` → `npm start`).
На Vercel достаточно подключить репозиторий и задать `NEXT_PUBLIC_SITE_URL`.
