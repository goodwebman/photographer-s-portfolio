# Вендоренный UI-кит

Исходники UI-кита автора, скопированные в проект. Кит не опубликован в npm (имя
`my-ui-kit` там занято чужим пакетом), а собранного `dist` в репозитории нет,
поэтому код лежит здесь как есть, с короткой фиксированной сверкой.

| | |
| --- | --- |
| Источник | https://github.com/goodwebman/UI-KIT-goodwebman |
| Коммит | `5d5130c77500ae13309a62c892e9a1e97e5af2b9` (2026-07-31, «fix: обрезка карточек в UICarousel, drag в UIRail, отступ в UIVirtualGrid») |
| Дата вендоринга | 2026-10-04 |
| Скопировано | `src/components` → `components/`, `src/lib` → `lib/`, `src/icons` → `icons/` |
| Не скопировано | `src/styles/tokens.css` (токены проекта живут в `src/app/globals.css`), `src/index.ts`, скрипт генерации иконок |

Публичный API — `./index.ts` (`components` + `icons`). Наружу кит отдаётся через
`@/shared/ui`: виджеты импортируют оттуда и кит, и site-компоненты.

ESLint этот каталог не линтит (`globalIgnores` в `eslint.config.mjs`): у кита
свой набор правил в апстриме, а здесь код меняется только по списку ниже.

---

## Локальные правки

Всё, что отличает этот каталог от апстрима. При синхронизации с новой версией
кита: скопировать каталоги заново и повторить пункты 1–4.

### 1. `lib/cn.ts` → `cn` проекта

```ts
export { cn } from '@/shared/lib/cn';
```

В ките голый `twMerge`: он считает `text-caption` / `text-small` цветом текста
и молча выкидывает их при встрече с `text-muted-foreground` (тот же баг, что
описан в README проекта). Расширенный `twMerge` с токенами проекта —
`src/shared/lib/cn/tw-merge.ts`, новые кастомные токены регистрируются там.

### 2. `'use client'`

В апстриме директивы нет ни в одном файле, а в Next App Router импорт
компонента с хуками из серверного кода падает. Директива добавлена первой
строкой в каждый файл, где есть хуки, `createContext` или собственные
обработчики событий:

- **компоненты:** UIAccordion (Root, Item, Trigger, Content), UIAvatar (Root,
  Image, Fallback), UICarousel, UICheckbox, UIDialog (Root, Content, Close,
  Title, Description), UIDropdownMenu (Root, Item), UIInput, UIOtpInput,
  UIPagination (Root), UIPhoneInput (Root, Country, Number), UIPopover (Root),
  UIRadioGroup, UIRadio, UIRail, UIRating, UISearchInput, UISelect (Root,
  Option), UIShow (`Show`/`Hide` с media-query зовут `useMediaQuery`),
  UIShowcase, UISlider, UISpotlightCard, UISwitch, UITabs (Root, Tab, Panel),
  UITextarea, UITiltCard, UIToast (Provider, Item), UITooltip, UIVirtualGrid,
  UIVirtualList;
- **контексты:** `accordion-context`, `avatar-context`, `dialog-context`,
  `dropdown-menu-context`, `phone-context`, `select-context`, `tabs-context`,
  `toast-context`;
- **хуки `lib/`:** `portal`, `use-escape`, `use-floating-position`,
  `use-focus-trap`, `use-media-query`, `use-outside-click`,
  `use-reduced-motion`, `use-scroll-lock`.

Серверными намеренно остались презентационные компоненты: UIButton (и
`buttonVariants` — его импортируют server-safe `UILinkButton`/`UIIconLink`),
UIBadge, UICard\*, UIAlert, UISeparator, UISkeleton, UIProgress, UISpinner,
UIStat, UITimeline\*, UIBreadcrumb, UIKbd, UILabel, UIMarquee, UITabsList,
UIDialogOverlay, UIPaginationButton, иконки и чистые утилиты (`position`,
`cn`, `use-isomorphic-layout-effect` — последний только выбирает хук, не
вызывая его).

**Компаунд-`index.ts` (`Object.assign(Root, { Item, … })`) оставлены без
директивы — проверено экспериментом на Turbopack.** С `'use client'` в
`index.ts` весь объект становится client reference, и точечный доступ из
серверного компонента (`UIDialog.Content`, `UITabs.Panel`) возвращает
`undefined` — рендер падает. Без директивы `index.ts` остаётся серверным
модулем, `Object.assign` работает поверх client reference корня, а под-
компоненты остаются полноценными client references: компаунды можно
использовать и из RSC, и из клиентских компонентов.

### 3. Глобальные стили — в `src/app/globals.css`

Без них компоненты кита ломаются, а `tokens.css` целиком не копируется:

- `@keyframes ui-marquee` (без него `UIMarquee` стоит на месте), `ui-shimmer`,
  `ui-progress`;
- `--animate-shimmer` и `--animate-progress` в `@theme`;
- глобальный блок `@media (prefers-reduced-motion: reduce)`;
- имена токенов (`--background`, `--primary`, `--popover`, `--accent`,
  `--success-emphasis` …) и привязки `@theme inline` совпадают с китом, поэтому
  его компоненты окрашиваются палитрой проекта без правок. Радиусы кита
  (`radius-sm/md/lg/xl`) считаются от `--radius` проекта.

Тёмная тема кита в апстриме — класс `.dark`; здесь `dark:`-вариант работает по
`data-theme="dark"` (`@custom-variant` в `globals.css`), классы кита с `dark:`
от этого не меняются.

### 4. Stories и тесты

- Stories: `@storybook/react-vite` → `@storybook/nextjs-vite`, title с префиксом
  `Kit/` (`Kit/Forms/UIButton`). Site-компоненты проекта живут в группе `Site/`.
- Тесты перенесены без изменений и гоняются общим `npm run test:run`. Моки
  jsdom (`matchMedia`, `ResizeObserver`, `IntersectionObserver`) уже есть в
  `vitest.setup.ts` проекта; апстримный `vitest.setup.ts` кита не нужен.

---

## Известные особенности апстрима

Не правились (логика кита меняется только по пунктам выше), учтены на стороне
проекта:

- `UIDropdownMenu` не закрывается по клику снаружи — только Esc, выбор пункта
  или повторный клик по триггеру. Для списков выбора брать `UISelect`.
- `UISelect` показывает в триггере само значение (`value`), а не подпись
  опции.
- `UIAlert` в вариантах `info`/`success`/`warning` и `UIToast` красят себя
  захардкоженными палитрами Tailwind (`bg-blue-50 …`), а не токенами. На сайте
  используется только нейтральный `UIAlert variant="default"`.
- `UIAlert` всегда ставит `role="alert"` (assertive live region). Для
  статичной сноски это неверно — скринридер зачитает её при загрузке, —
  поэтому на сайте роль переопределяется пропсом: `<UIAlert role="note">`.
- `UIDialog.Content` центрирует панель `max-w-lg` с паддингами. Полноэкранные
  оверлеи (мобильное меню, лайтбокс) переопределяют это классами
  (`h-dvh max-w-none rounded-none border-0 p-0`), логику кита не трогая.
- Классы `animate-in` / `slide-in-from-*` в UIDialogOverlay/UIToast/UIDropdownMenu
  рассчитаны на `tailwindcss-animate`, которого нет ни в ките, ни здесь, —
  это no-op.
