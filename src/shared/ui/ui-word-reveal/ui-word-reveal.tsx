import type { CSSProperties, FC } from 'react';
import { Fragment } from 'react';

/** Тег заголовка, которым рендерится ревил. */
export type UIWordRevealTag = 'h1' | 'h2';

/**
 * Единица каскада:
 * - `word` — по словам (заголовки секций)
 * - `char` — по буквам (одно длинное слово, имя в hero)
 */
export type UIWordRevealSplit = 'word' | 'char';

/**
 * # Интерфейс пропсов для компонента UIWordReveal
 * @interface IUIWordRevealProps
 * @property {string} text - видимый текст заголовка
 * @property {UIWordRevealTag} [as] - тег заголовка
 * @property {UIWordRevealSplit} [split] - по словам или по буквам
 * @property {string} [label] - полный текст заголовка для скринридеров и
 *   поисковиков, если видимого мало (имя → «имя — фотограф в Омске»)
 * @property {string} [id] - id заголовка — для `aria-labelledby` секции
 * @property {string} [className] - классы заголовка
 * @property {number} [delay] - задержка старта каскада, сек
 */
export interface IUIWordRevealProps {
  readonly text: string;
  readonly as?: UIWordRevealTag;
  readonly split?: UIWordRevealSplit;
  readonly label?: string;
  readonly id?: string;
  readonly className?: string;
  readonly delay?: number;
}

/** Шаг каскада: буквы идут плотнее слов, иначе длинное имя «тянется». */
const STAGGER: Record<UIWordRevealSplit, number> = { word: 0.06, char: 0.035 };

/**
 * Заголовок с каскадным появлением по словам или буквам (blur → в фокус,
 * снизу вверх). Отдельная от `UIReveal` анимация — «авторская подпись».
 *
 * Server component на CSS: `data-reveal="pieces"`, у каждого куска индекс
 * `--i`, задержка куска = `--pieces-delay + --i × --pieces-stagger`
 * (`globals.css`, REVEAL). Старт — по `data-revealed` от `revealBoot`.
 * Без JS и при `prefers-reduced-motion` текст виден сразу.
 *
 * Скринридер читает `label ?? text` целиком: куски `aria-hidden`, рядом —
 * `sr-only` копия (иначе в режиме `char` имя читалось бы по буквам). Между
 * словами — настоящие пробелы: текст страницы для поисковика не слипается.
 *
 * @component
 */
export const UIWordReveal: FC<IUIWordRevealProps> = ({
  text,
  as: Tag = 'h1',
  split = 'word',
  label,
  id,
  className,
  delay = 0,
}) => {
  const pieces = split === 'char' ? Array.from(text) : text.split(' ');
  const style = {
    '--pieces-delay': `${String(delay)}s`,
    '--pieces-stagger': `${String(STAGGER[split])}s`,
  } as CSSProperties;

  return (
    <Tag id={id} data-reveal="pieces" className={className} style={style} suppressHydrationWarning>
      <span className="sr-only">{label ?? text}</span>
      {pieces.map((item, index) => (
        <Fragment key={`${item}-${String(index)}`}>
          {split === 'word' && index > 0 ? ' ' : null}
          <span
            aria-hidden="true"
            data-piece=""
            className="inline-block"
            style={{ '--i': index } as CSSProperties}
          >
            {item}
          </span>
        </Fragment>
      ))}
    </Tag>
  );
};
