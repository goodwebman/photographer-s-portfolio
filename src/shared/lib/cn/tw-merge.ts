import { extendTailwindMerge } from 'tailwind-merge';

/**
 * Кастомная типографическая шкала из `@theme` (`--text-display`, `--text-h1`…).
 *
 * Регистрируем её как группу `font-size`, иначе tailwind-merge принимает
 * `text-small` за цвет текста и вычёркивает его при встрече с
 * `text-muted-foreground` — размер молча теряется. Из-за этого до регистрации
 * `UITag`, `UISkill`, `UISelect`, `UINavLink` и мелкие `UIButton` рендерились
 * унаследованным размером вместо заданного токеном.
 */
const FONT_SIZES = ['display', 'h1', 'h2', 'h3', 'h4', 'body', 'small', 'caption'];

/** Кастомные радиусы из `@theme` (`--radius-card`, `--radius-pill`). */
const RADII = ['card', 'pill'];

/**
 * # tailwind-merge, знающий про токены проекта
 *
 * Дефолтный конфиг знает только стоковую шкалу Tailwind. Наши токены живут в
 * `@theme` и для него — произвольные значения, поэтому попадают не в те группы
 * и конфликтуют не с тем. Здесь мы дорегистрируем их явно.
 */
export const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: FONT_SIZES }],
      rounded: [{ rounded: RADII }],
    },
  },
});
