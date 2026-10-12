import type { FC, ReactNode, SVGProps } from 'react';

/**
 * # Пропсы иконки
 * Обычные атрибуты `<svg>`. Размер по умолчанию — `1em` (как у `react-icons`):
 * иконка берёт размер шрифта родителя, Tailwind-класс `size-*` его перебивает.
 */
export type IconProps = SVGProps<SVGSVGElement>;

/**
 * Иконки сайта — чистые SVG без хуков и контекста. Server-safe: рендерятся в
 * RSC и не тянут в клиентский бандл ни рантайм `react-icons`, ни
 * `tailwind-merge`. Декоративные по умолчанию (`aria-hidden`): доступное имя
 * даёт кнопка или ссылка вокруг.
 *
 * Контуры: lucide (stroke-иконки, `./stroke-icons`) и Simple Icons (логотипы
 * соцсетей, `./brand-icons`). Разные модули — не ради порядка: Turbopack не
 * вырезает неиспользуемые экспорты внутри модуля, и клиентский остров с
 * одной иконкой тянул бы все контуры, включая длинные логотипы.
 */
export const stroke = (paths: ReactNode, name: string): FC<IconProps> => {
  const Icon: FC<IconProps> = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {paths}
    </svg>
  );
  Icon.displayName = name;

  return Icon;
};

export const brand = (d: string, name: string): FC<IconProps> => {
  const Icon: FC<IconProps> = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d={d} />
    </svg>
  );
  Icon.displayName = name;

  return Icon;
};

