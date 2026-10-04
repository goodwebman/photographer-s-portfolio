import { extendTailwindMerge } from 'tailwind-merge';

/**
 * Кастомная типографическая шкала из `@theme` (`--text-hero`, `--text-display`,
 * `--text-h1`…, `--text-eyebrow`).
 *
 * Регистрируем её как группу `font-size`, иначе tailwind-merge принимает
 * `text-small` за цвет текста и вычёркивает его при встрече с
 * `text-muted-foreground` — размер молча теряется. Тот же баг был в голом
 * `twMerge` UI-кита — поэтому кит тоже ходит через этот `cn`.
 */
const FONT_SIZES = [
  'hero',
  'display',
  'h1',
  'h2',
  'h3',
  'body',
  'small',
  'caption',
  'eyebrow',
];

/**
 * Кастомные радиусы из `@theme`. `sm`/`md`/`lg`/`xl` кита — стоковые имена
 * шкалы Tailwind и уже известны tailwind-merge; дорегистрировать нужно только
 * `pill`.
 */
const RADII = ['pill'];

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
