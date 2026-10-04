import { useCallback, useRef, useState } from 'react';
import type { Meta } from '@storybook/nextjs-vite';
import { UIVirtualGrid } from './UIVirtualGrid';
import { UIButton } from '../UIButton';
import { UIBadge } from '../UIBadge';

const meta = {
  component: UIVirtualGrid,
  tags: ['autodocs'],
  title: 'Kit/Lists/UIVirtualGrid',
} satisfies Meta<typeof UIVirtualGrid>;

export default meta;

interface Card {
  id: number;
  title: string;
  gradient: string;
  price: number;
}

const GRADIENTS = [
  'from-fuchsia-500 to-purple-500',
  'from-orange-400 to-rose-500',
  'from-sky-400 to-indigo-500',
  'from-emerald-400 to-teal-500',
  'from-amber-400 to-orange-500',
  'from-pink-400 to-rose-400',
  'from-cyan-400 to-blue-500',
  'from-lime-400 to-emerald-500',
];

function makeCards(from: number, count: number): Card[] {
  return Array.from({ length: count }, (_, i) => {
    const id = from + i;
    return {
      id,
      title: `Item #${String(id + 1).padStart(4, '0')}`,
      gradient: GRADIENTS[id % GRADIENTS.length],
      price: 100 + ((id * 37) % 900),
    };
  });
}

const CardView = ({ card }: { card: Card }): React.ReactNode => (
  <div className="group cursor-pointer overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
    <div
      className={`aspect-square w-full bg-linear-to-br ${card.gradient} transition-transform duration-500 group-hover:scale-105`}
    />
    <div className="flex items-center justify-between p-2.5">
      <div className="min-w-0">
        <p className="truncate text-xs font-medium">{card.title}</p>
        <p className="text-xs text-muted-foreground">${card.price}</p>
      </div>
      <UIBadge>NEW</UIBadge>
    </div>
  </div>
);

export const Basic = {
  parameters: {
    docs: {
      source: {
        code: `<UIVirtualGrid<Card>
  items={items}
  getItemKey={(c) => c.id}
  renderItem={(c) => <CardView card={c} />}
  gridClassName="grid-cols-4 gap-3 p-3"
  height={520}
/>`,
      },
    },
  },
  render: () => {
    const items = makeCards(0, 5_000);
    return (
      <div className="w-[720px]">
        <p className="mb-2 text-xs text-muted-foreground">5 000 карточек · сетка 4×N</p>
        <UIVirtualGrid<Card>
          items={items}
          getItemKey={(c) => c.id}
          renderItem={(c) => <CardView card={c} />}
          gridClassName="grid-cols-4 gap-3 p-3"
          height={520}
        />
      </div>
    );
  },
};

export const InfiniteGrid = {
  parameters: {
    docs: {
      source: {
        code: `const [items, setItems] = useState<Card[]>(() => makeCards(0, 30));
const [loading, setLoading] = useState(false);
const cursor = useRef(30);

const loadMore = useCallback(async () => {
  if (loading) return;
  setLoading(true);
  const chunk = await fetchCards(cursor.current, 30); // ваш запрос
  setItems((prev) => [...prev, ...chunk]);
  cursor.current += 30;
  setLoading(false);
}, [loading]);

return (
  <UIVirtualGrid<Card>
    items={items}
    getItemKey={(c) => c.id}
    renderItem={(c) => <CardView card={c} />}
    gridClassName="grid-cols-3 gap-4 p-4"
    height={520}
    hasMore={cursor.current < 300}
    onEndReached={loadMore}
  />
);`,
      },
    },
  },
  render: () => {
    const [items, setItems] = useState<Card[]>(() => makeCards(0, 30));
    const [loading, setLoading] = useState(false);
    const cursor = useRef(30);

    const loadMore = useCallback(async () => {
      if (loading) return;
      setLoading(true);
      await new Promise((r) => setTimeout(r, 700));
      setItems((prev) => [...prev, ...makeCards(cursor.current, 30)]);
      cursor.current += 30;
      setLoading(false);
    }, [loading]);

    return (
      <div className="w-[720px]">
        <p className="mb-2 text-xs text-muted-foreground">
          Скролль вниз, чтобы подгрузить · всего 300 · загружено {items.length}
        </p>
        <UIVirtualGrid<Card>
          items={items}
          getItemKey={(c) => c.id}
          renderItem={(c) => <CardView card={c} />}
          gridClassName="grid-cols-3 gap-4 p-4"
          height={520}
          hasMore={cursor.current < 300}
          onEndReached={loadMore}
        />
      </div>
    );
  },
};

export const ResponsiveColumns = {
  parameters: {
    docs: {
      source: {
        code: `// число колонок задаётся Tailwind-брейкпоинтами в gridClassName
<UIVirtualGrid<Card>
  items={items}
  getItemKey={(c) => c.id}
  renderItem={(c) => <CardView card={c} />}
  gridClassName="grid-cols-2 gap-3 p-3 sm:grid-cols-3 lg:grid-cols-5"
  height={520}
/>`,
      },
    },
  },
  render: () => {
    const items = makeCards(0, 2_000);
    return (
      <div className="w-[720px]">
        <p className="mb-2 text-xs text-muted-foreground">Адаптивная сетка: 2 / 3 / 5 колонок</p>
        <UIVirtualGrid<Card>
          items={items}
          getItemKey={(c) => c.id}
          renderItem={(c) => <CardView card={c} />}
          gridClassName="grid-cols-2 gap-3 p-3 sm:grid-cols-3 lg:grid-cols-5"
          height={520}
        />
      </div>
    );
  },
};

export const ScrollControl = {
  parameters: {
    docs: {
      source: {
        code: `// сетка скроллится внутри окна — управляйте нативным scrollIntoView по контейнеру
<UIVirtualGrid<Card>
  items={items}
  getItemKey={(c) => c.id}
  renderItem={(c) => <CardView card={c} />}
  gridClassName="grid-cols-4 gap-3 p-3"
  height={520}
/>`,
      },
    },
  },
  render: () => {
    const items = makeCards(0, 5_000);
    return (
      <div className="w-[720px] space-y-2">
        <div className="flex gap-2">
          <UIButton size="sm" variant="outline" onClick={() => window.scrollTo({ top: 0 })}>
            Скролл окна ↑
          </UIButton>
          <UIButton
            size="sm"
            variant="outline"
            onClick={() => {
              const el = document.querySelector('[data-name="UIVirtualGrid"]');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            В сетку
          </UIButton>
        </div>
        <UIVirtualGrid<Card>
          items={items}
          getItemKey={(c) => c.id}
          renderItem={(c) => <CardView card={c} />}
          gridClassName="grid-cols-4 gap-3 p-3"
          height={520}
        />
      </div>
    );
  },
};
