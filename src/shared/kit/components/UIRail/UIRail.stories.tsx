import { useCallback, useState } from 'react';
import type { Meta } from '@storybook/nextjs-vite';
import { UIRail } from './UIRail';
import { UITiltCard } from '../UITiltCard';

const meta = {
  component: UIRail,
  tags: ['autodocs'],
  title: 'Kit/Lists/UIRail',
  parameters: { layout: 'padded' },
} satisfies Meta<typeof UIRail>;

export default meta;

// ─── Данные ─────────────────────────────────────────────────────────────────
interface Poster {
  id: number;
  title: string;
  meta: string;
  gradient: string;
}

const GRADIENTS = [
  'from-indigo-500 via-violet-600 to-fuchsia-700',
  'from-sky-500 via-blue-700 to-slate-900',
  'from-emerald-500 via-green-700 to-teal-900',
  'from-rose-500 via-red-700 to-neutral-900',
  'from-amber-500 via-orange-700 to-stone-900',
  'from-cyan-500 via-teal-700 to-slate-900',
];

const makePosters = (count: number, offset = 0): Poster[] =>
  Array.from({ length: count }, (_, i) => {
    const n = offset + i;
    return {
      id: n,
      title: `Тайтл ${String(n + 1)}`,
      meta: `2026 · ${String(90 + ((n * 7) % 60))} мин`,
      gradient: GRADIENTS[n % GRADIENTS.length],
    };
  });

const PosterCard = ({ poster }: { poster: Poster }): React.ReactNode => (
  <div className="group flex h-full cursor-pointer flex-col gap-2">
    <div
      className={`relative flex-1 overflow-hidden rounded-xl bg-linear-to-br ${poster.gradient} shadow-md transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-xl`}
    >
      <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
      <div className="absolute inset-x-3 bottom-3">
        <p className="truncate text-sm font-semibold text-white drop-shadow">{poster.title}</p>
        <p className="text-[11px] text-white/70">{poster.meta}</p>
      </div>
    </div>
  </div>
);

// ─── Stories ────────────────────────────────────────────────────────────────

/** Рельс с заголовком и действием. Стрелки проявляются при наведении, края растворяются. */
export const Default = {
  parameters: {
    docs: {
      source: {
        code: `<UIRail<Poster>
  title="Рекомендуем сегодня"
  action={<a href="#" className="font-medium text-primary">Показать все</a>}
  items={posters}
  getItemKey={(p) => p.id}
  renderItem={(p) => <PosterCard poster={p} />}
  itemWidth={190}
  height={280}
/>`,
      },
    },
  },
  render: () => (
    <div className="max-w-4xl">
      <UIRail<Poster>
        title="Рекомендуем сегодня"
        action={
          <a href="#top" className="font-medium text-primary hover:text-primary/80">
            Показать все
          </a>
        }
        items={makePosters(20)}
        getItemKey={(p) => p.id}
        renderItem={(p) => <PosterCard poster={p} />}
        itemWidth={190}
        height={280}
      />
    </div>
  ),
};

/** Карточки-элементы обёрнуты в UITiltCard — рельс + 3D-наклон. */
export const WithTiltCards = {
  parameters: {
    docs: {
      source: {
        code: `<UIRail<Poster>
  title="С 3D-наклоном"
  items={posters}
  getItemKey={(p) => p.id}
  renderItem={(p) => (
    <UITiltCard maxTilt={14} className="h-full rounded-xl">
      <PosterCard poster={p} />
    </UITiltCard>
  )}
  itemWidth={200}
  height={300}
/>`,
      },
    },
  },
  render: () => (
    <div className="max-w-4xl">
      <UIRail<Poster>
        title="С 3D-наклоном"
        items={makePosters(16)}
        getItemKey={(p) => p.id}
        renderItem={(p) => (
          <UITiltCard maxTilt={14} className="h-full rounded-xl">
            <PosterCard poster={p} />
          </UITiltCard>
        )}
        itemWidth={200}
        height={300}
      />
    </div>
  ),
};

/** Бесконечная лента: `onEndReached` докидывает элементы при прокрутке к концу. */
export const Infinite = {
  parameters: {
    docs: {
      source: {
        code: `const [posters, setPosters] = useState<Poster[]>(() => makePosters(20));

const loadMore = useCallback(() => {
  setPosters((prev) =>
    prev.length >= 200 ? prev : [...prev, ...makePosters(20, prev.length)],
  );
}, []);

return (
  <UIRail<Poster>
    title="Бесконечная лента"
    items={posters}
    getItemKey={(p) => p.id}
    renderItem={(p) => <PosterCard poster={p} />}
    onEndReached={loadMore}
    itemWidth={190}
    height={280}
  />
);`,
      },
    },
  },
  render: () => {
    const [posters, setPosters] = useState<Poster[]>(() => makePosters(20));
    const loadMore = useCallback(() => {
      setPosters((prev) =>
        prev.length >= 200 ? prev : [...prev, ...makePosters(20, prev.length)],
      );
    }, []);
    return (
      <div className="max-w-4xl">
        <UIRail<Poster>
          title="Бесконечная лента"
          items={posters}
          getItemKey={(p) => p.id}
          renderItem={(p) => <PosterCard poster={p} />}
          onEndReached={loadMore}
          itemWidth={190}
          height={280}
        />
      </div>
    );
  },
};

/** Без стрелок и без градиентных краёв — «голый» скролл-ряд. */
export const Minimal = {
  parameters: {
    docs: {
      source: {
        code: `<UIRail<Poster>
  items={posters}
  getItemKey={(p) => p.id}
  renderItem={(p) => <PosterCard poster={p} />}
  showArrows={false}
  fade={false}
  itemWidth={160}
  height={240}
/>`,
      },
    },
  },
  render: () => (
    <div className="max-w-4xl">
      <UIRail<Poster>
        items={makePosters(20)}
        getItemKey={(p) => p.id}
        renderItem={(p) => <PosterCard poster={p} />}
        showArrows={false}
        fade={false}
        itemWidth={160}
        height={240}
      />
    </div>
  ),
};
