import type { Meta } from '@storybook/nextjs-vite';
import { UIShowcase } from './UIShowcase';

const meta = {
  component: UIShowcase,
  tags: ['autodocs'],
  title: 'Kit/Effects/UIShowcase',
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof UIShowcase>;

export default meta;

// ─── Иконки-заглушки ────────────────────────────────────────────────────────
const StarIcon = (): React.ReactNode => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="size-3.5 text-emerald-500" aria-hidden>
    <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.77l-5.2 2.73.99-5.79-4.21-4.1 5.82-.85L10 1.5z" />
  </svg>
);

const PinIcon = (): React.ReactNode => (
  <svg viewBox="0 0 24 24" fill="none" className="size-3.5 shrink-0" aria-hidden>
    <path
      d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const ArrowIcon = (): React.ReactNode => (
  <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden>
    <path d="M5 12h14m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

// ─── Карточка места (по мотивам примера) ────────────────────────────────────
interface Place {
  title: string;
  location: string;
  tags: string[];
  price: number;
  rating: number;
  gradient: string;
}

const PLACES: Place[] = [
  {
    title: 'Лесная гавань',
    location: 'Тихий бор',
    tags: ['Приватная стоянка', 'Костровище', 'Душ на солнце'],
    price: 85,
    rating: 4.9,
    gradient: 'from-emerald-600 via-green-800 to-emerald-950',
  },
  {
    title: 'У озера',
    location: 'Горная долина',
    tags: ['Первая линия', 'Каяк в комплекте', 'Эко-туалет'],
    price: 95,
    rating: 5.0,
    gradient: 'from-sky-500 via-blue-800 to-slate-900',
  },
  {
    title: 'Горные луга',
    location: 'Альпийский хребет',
    tags: ['Панорама', 'Тропы', 'Наблюдение за птицами'],
    price: 78,
    rating: 4.8,
    gradient: 'from-lime-500 via-emerald-700 to-teal-900',
  },
];

const PlaceCard = ({ place }: { place: Place }): React.ReactNode => (
  <article className="w-[300px] overflow-hidden rounded-2xl border border-border bg-card">
    <div className={`relative h-44 bg-linear-to-br ${place.gradient}`}>
      <div className="absolute inset-0 bg-linear-to-t from-black/25 to-transparent" />
      <div className="absolute right-3 top-3 flex items-center gap-1 rounded-lg bg-card/95 px-2 py-1 shadow-sm backdrop-blur">
        <StarIcon />
        <span className="text-xs font-semibold tabular-nums text-foreground">
          {place.rating.toFixed(1)}
        </span>
      </div>
    </div>

    <div className="flex flex-col gap-3 p-5">
      <div>
        <h3 className="text-lg font-semibold text-foreground">{place.title}</h3>
        <p className="mt-0.5 flex items-center gap-1 text-sm text-muted-foreground">
          <PinIcon />
          {place.location}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {place.tags.map((t) => (
          <span
            key={t}
            className="rounded-md border border-border px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-1 flex items-center justify-between">
        <p className="text-xl font-bold text-foreground">
          ${place.price}
          <span className="text-sm font-normal text-muted-foreground">/ночь</span>
        </p>
        <button
          type="button"
          className="flex items-center gap-1 rounded-md text-sm font-medium text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Подробнее
          <ArrowIcon />
        </button>
      </div>
    </div>
  </article>
);

// ─── Stories ────────────────────────────────────────────────────────────────

/** Веер карточек. Наведи (или протабай) на карту — выпрямляется, поднимается и выходит вперёд. */
export const Places = {
  parameters: {
    docs: {
      source: {
        code: `<UIShowcase>
  {places.map((p) => (
    <PlaceCard key={p.title} place={p} />
  ))}
</UIShowcase>`,
      },
    },
  },
  render: () => (
    <div className="flex min-h-[560px] items-center justify-center bg-background px-8 py-16">
      <UIShowcase>
        {PLACES.map((p) => (
          <PlaceCard key={p.title} place={p} />
        ))}
      </UIShowcase>
    </div>
  ),
};

/** Больше карт и сильнее наклон — плотная «колода». */
export const WideFan = {
  parameters: {
    docs: {
      source: {
        code: `<UIShowcase maxRotation={12} overlap={90} arc={16} spread={26}>
  {places.map((p) => (
    <PlaceCard key={p.title} place={p} />
  ))}
</UIShowcase>`,
      },
    },
  },
  render: () => (
    <div className="flex min-h-[560px] items-center justify-center bg-background px-8 py-16">
      <UIShowcase maxRotation={12} overlap={90} arc={16} spread={26}>
        {[...PLACES, ...PLACES.map((p) => ({ ...p, title: `${p.title} II` }))].map((p) => (
          <PlaceCard key={p.title} place={p} />
        ))}
      </UIShowcase>
    </div>
  ),
};

/** Мягкий вариант: чуть заметный наклон, крупное перекрытие. */
export const Subtle = {
  parameters: {
    docs: {
      source: {
        code: `<UIShowcase maxRotation={4} overlap={40} arc={4}>
  {places.map((p) => (
    <PlaceCard key={p.title} place={p} />
  ))}
</UIShowcase>`,
      },
    },
  },
  render: () => (
    <div className="flex min-h-[560px] items-center justify-center bg-background px-8 py-16">
      <UIShowcase maxRotation={4} overlap={40} arc={4}>
        {PLACES.map((p) => (
          <PlaceCard key={p.title} place={p} />
        ))}
      </UIShowcase>
    </div>
  ),
};
