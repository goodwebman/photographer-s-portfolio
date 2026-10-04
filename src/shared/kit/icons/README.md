# Иконки (`@/icons`)

Система иконок ui-кита: исходники в SVG → типизированные React-компоненты через
кодогенерацию. Одна конвенция, единый контракт (currentColor, stroke-стиль, a11y),
никаких разбросанных inline-SVG по компонентам.

## Структура

```
src/icons/
├── raw/              # исходные .svg (править тут) — источник правды
│   ├── chevron-down.svg
│   └── …
├── generated/        # автогенерация (НЕ править руками)
│   ├── chevron-down.tsx
│   └── index.ts
├── create-icon.tsx   # фабрика: svg → типизированный компонент
├── registry.ts       # автогенерация: UIIcons.{PascalName}
└── index.ts          # публичный barrel
```

## Workflow

1. Положить/отредактировать `src/icons/raw/<name>.svg` (имя **kebab-case**:
   `chevron-down.svg`, `arrow-left.svg`).
2. `npm run icons:build` — перегенерирует `generated/` и `registry.ts`.
3. Использовать: `<UIIcons.ChevronDown />`.

В CI: `npm run icons:check` падает, если сгенерированное разошлось с тем, что
на диске (гарантия, что генерация закоммичена).

## Использование

Два равноценных способа:

```tsx
// 1. Реестр-неймспейс — удобно, ключи PascalCase совпадают с компонентами
import { UIIcons } from 'my-ui-kit';
<UIIcons.ChevronDown className="size-4" />

// 2. Именованный импорт — tree-shakeable (в бандер попадёт только нужная иконка)
import { ChevronDown } from 'my-ui-kit';
<ChevronDown className="size-4" />
```

### Размер и цвет

- Размер — через `size` (px) или Tailwind-класс (`size-4`, `h-6 w-6`). Класс
  имеет приоритет над атрибутом.
- Цвет — `currentColor`: управляется через `text-*` родителя.

```tsx
<UIIcons.Search className="size-5 text-primary" />
<UIIcons.Check size={16} />
```

### Доступность

По умолчанию иконка **декоративная** (`aria-hidden="true"`). Чтобы сделать её
информативной — передай `title` / `aria-label` / `aria-labelledby`: иконка
получит `role="img"`.

```tsx
<UIIcons.Search title="Поиск" />            // role="img", <title>Поиск</title>
<UIIcons.X aria-label="Закрыть" />          // role="img"
<UIIcons.ChevronDown />                     // aria-hidden (декоративная)
```

## Контракт исходного SVG

- Корневой `<svg>` с `viewBox` (остальные презентационные атрибуты — `stroke`,
  `fill` и т.д. — навешивает обёртка `createIcon`, держать их в raw-файле
  необязательно).
- Внутри — примитивы: `path` / `circle` / `line` / `rect` / `polyline` / `polygon`.
- hyphen-case атрибуты (`stroke-width`, `stroke-linecap`) автоматически
  переводятся в camelCase для JSX при генерации.

## Добавление новой иконки

```bash
# 1. Положить svg
echo '<svg viewBox="0 0 24 24"><path d="M12 2 2 22h20Z"/></svg>' > src/icons/raw/triangle.svg

# 2. Перегенерировать
npm run icons:build

# 3. Готово
# <UIIcons.Triangle />
```
