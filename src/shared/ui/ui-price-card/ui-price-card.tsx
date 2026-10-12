import type { FC, ReactNode } from 'react';

import type { cnParams } from '@/shared/lib/cn';
import { cn } from '@/shared/lib/cn';

import { UISpotlight } from '../ui-spotlight';

/**
 * # Интерфейс пропсов для компонента UIPriceCard
 * @interface IUIPriceCardProps
 * @property {string} title - название тарифа (рендерится капсом)
 * @property {string} price - отформатированная цена первого часа («3 000 ₽»)
 * @property {string} unit - единица («/ час»)
 * @property {ReactNode} extra - строка про следующий час
 * @property {string} [index] - номер карточки («01»)
 * @property {string} [note] - уточнение под названием
 * @property {ReactNode} [action] - действие внизу карточки (ссылка «Записаться»)
 * @property {cnParams | string} [className] - доп. классы
 * @property {string} [dataName] - суффикс для `data-name`
 */
export interface IUIPriceCardProps {
  readonly title: string;
  readonly price: string;
  readonly unit: string;
  readonly extra: ReactNode;
  readonly index?: string;
  readonly note?: string;
  readonly action?: ReactNode;
  readonly className?: cnParams | string;
  readonly dataName?: string;
}

/** Пятно подсветки — бренд-цвет темы, едва заметно (реф. 3, светлые плашки услуг). */
const SPOTLIGHT = 'color-mix(in srgb, var(--brand) 14%, transparent)';

/**
 * Карточка тарифа: номер и название капсом, крупная serif-цена, строка про
 * следующий час, действие. Поверхность — `UISpotlight`: пятно бренд-цвета
 * следует за курсором. Острые углы, волосяная рамка, без теней.
 * Server component (интерактив только в клиентском `UISpotlight`).
 *
 * @component
 */
export const UIPriceCard: FC<IUIPriceCardProps> = ({
  title,
  price,
  unit,
  extra,
  index,
  note,
  action,
  className,
  dataName,
}) => (
  <UISpotlight
    color={SPOTLIGHT}
    size={420}
    dataName={dataName}
    className={cn(
      'h-full border border-border bg-card text-card-foreground transition-colors duration-300 hover:border-brand-emphasis/40',
      className,
    )}
  >
    <article className="flex h-full flex-col p-6 md:p-5 lg:p-8">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h3 className="text-eyebrow uppercase text-foreground">{title}</h3>
          {note ? <p className="mt-2 text-small text-muted-foreground">{note}</p> : null}
        </div>
        {index ? (
          <span aria-hidden="true" className="font-serif text-small text-brand-emphasis lining-nums">
            {index}
          </span>
        ) : null}
      </div>

      <p className="mt-auto pt-10 font-serif text-[clamp(2rem,3.6vw,3.25rem)] leading-none whitespace-nowrap lining-nums sm:pt-16">
        {price}
        <span className="ml-2 font-sans text-small text-muted-foreground">{unit}</span>
      </p>
      <p className="mt-3 text-small text-muted-foreground">{extra}</p>

      {action !== undefined ? <div className="mt-8">{action}</div> : null}
    </article>
  </UISpotlight>
);
