import { useCallback, useRef, useState } from 'react';
import type { Meta } from '@storybook/nextjs-vite';
import { UIVirtualList, type UIVirtualListHandle } from './UIVirtualList';
import { UIButton } from '../UIButton';
import { UIAvatar } from '../UIAvatar';

const meta = {
  component: UIVirtualList,
  tags: ['autodocs'],
  title: 'Kit/Lists/UIVirtualList',
} satisfies Meta<typeof UIVirtualList>;

export default meta;

interface Row {
  id: number;
  name: string;
  role: string;
  color: string;
}

// 600–700 оттенки: белые инициалы поверх дают ≥4.6:1 (WCAG AA), светлые 500-е не давали
const PALETTE = ['#c2410c', '#15803d', '#2563eb', '#9333ea', '#be185d', '#a16207'];
const ROLES = ['Frontend', 'Backend', 'Design', 'QA', 'PM', 'DevOps'];

function makeRows(from: number, count: number): Row[] {
  return Array.from({ length: count }, (_, i) => {
    const id = from + i;
    return {
      id,
      name: `Пользователь #${String(id + 1).padStart(4, '0')}`,
      role: ROLES[id % ROLES.length],
      color: PALETTE[id % PALETTE.length],
    };
  });
}

const RowView = ({ row }: { row: Row }): React.ReactNode => (
  <div className="flex items-center gap-3 px-4 py-3">
    <UIAvatar style={{ backgroundColor: row.color }} className="text-white">
      {row.name.slice(-2)}
    </UIAvatar>
    <div className="min-w-0 flex-1">
      <p className="truncate text-sm font-medium text-foreground">{row.name}</p>
      <p className="truncate text-xs text-muted-foreground">{row.role}</p>
    </div>
    <span className="text-xs tabular-nums text-muted-foreground">#{row.id + 1}</span>
  </div>
);

export const Basic = {
  parameters: {
    docs: {
      source: {
        code: `// items: Row[] — рендерятся только видимые строки, длина массива не важна
<UIVirtualList<Row>
  items={items}
  getItemKey={(r) => r.id}
  renderItem={(r) => <RowView row={r} />}
  separator={<div className="h-px bg-border" />}
/>`,
      },
    },
  },
  render: () => {
    const items = makeRows(0, 10_000);
    return (
      <div className="w-[420px]">
        <p className="mb-2 text-xs text-muted-foreground">10 000 записей — рендерится ≈ 20</p>
        <UIVirtualList<Row>
          items={items}
          getItemKey={(r) => r.id}
          renderItem={(r) => <RowView row={r} />}
          separator={<div className="h-px bg-border" />}
        />
      </div>
    );
  },
};

export const InfiniteScroll = {
  parameters: {
    docs: {
      source: {
        code: `const [items, setItems] = useState<Row[]>(() => makeRows(0, 40));
const [loading, setLoading] = useState(false);
const cursor = useRef(40);

const loadMore = useCallback(async () => {
  if (loading) return;
  setLoading(true);
  const chunk = await fetchRows(cursor.current, 40); // ваш запрос
  cursor.current += 40;
  setItems((prev) => [...prev, ...chunk]);
  setLoading(false);
}, [loading]);

return (
  <UIVirtualList<Row>
    items={items}
    getItemKey={(r) => r.id}
    renderItem={(r) => <RowView row={r} />}
    hasMore={cursor.current < 500}
    onEndReached={loadMore}
    separator={<div className="h-px bg-border" />}
  />
);`,
      },
    },
  },
  render: () => {
    const [items, setItems] = useState<Row[]>(() => makeRows(0, 40));
    const [loading, setLoading] = useState(false);
    const cursor = useRef(40);

    const loadMore = useCallback(async () => {
      if (loading) return;
      setLoading(true);
      await new Promise((r) => setTimeout(r, 700));
      const chunk = makeRows(cursor.current, 40);
      cursor.current += 40;
      setItems((prev) => [...prev, ...chunk]);
      setLoading(false);
    }, [loading]);

    const hasMore = cursor.current < 500;

    return (
      <div className="w-[420px]">
        <p className="mb-2 text-xs text-muted-foreground">
          Скролль вниз — подгружает батчами по 40, всего 500. Загружено: {items.length}
        </p>
        <UIVirtualList<Row>
          items={items}
          getItemKey={(r) => r.id}
          renderItem={(r) => <RowView row={r} />}
          hasMore={hasMore}
          onEndReached={loadMore}
          separator={<div className="h-px bg-border" />}
        />
      </div>
    );
  },
};

export const ScrollToIndex = {
  parameters: {
    docs: {
      source: {
        code: `const ref = useRef<UIVirtualListHandle>(null);

return (
  <>
    <UIButton onClick={() => ref.current?.scrollToIndex(0, 'smooth')}>В начало</UIButton>
    <UIButton onClick={() => ref.current?.scrollToIndex(2500, 'smooth')}>К #2500</UIButton>
    <UIButton onClick={() => ref.current?.scrollToIndex(4999, 'smooth')}>В конец</UIButton>

    <UIVirtualList<Row>
      ref={ref}
      items={items}
      getItemKey={(r) => r.id}
      renderItem={(r) => <RowView row={r} />}
      separator={<div className="h-px bg-border" />}
    />
  </>
);`,
      },
    },
  },
  render: () => {
    const ref = useRef<UIVirtualListHandle>(null);
    const items = makeRows(0, 5_000);
    return (
      <div className="w-[420px] space-y-2">
        <div className="flex gap-2">
          <UIButton size="sm" variant="outline" onClick={() => ref.current?.scrollToIndex(0, 'smooth')}>
            В начало
          </UIButton>
          <UIButton size="sm" variant="outline" onClick={() => ref.current?.scrollToIndex(2500, 'smooth')}>
            К #2500
          </UIButton>
          <UIButton size="sm" variant="outline" onClick={() => ref.current?.scrollToIndex(4999, 'smooth')}>
            В конец
          </UIButton>
        </div>
        <UIVirtualList<Row>
          ref={ref}
          items={items}
          getItemKey={(r) => r.id}
          renderItem={(r) => <RowView row={r} />}
          separator={<div className="h-px bg-border" />}
        />
      </div>
    );
  },
};

export const Empty = {
  parameters: {
    docs: {
      source: {
        code: `<UIVirtualList<Row>
  items={[]}
  renderItem={(r) => <RowView row={r} />}
  empty="Здесь пока пусто"
/>`,
      },
    },
  },
  render: () => (
    <div className="w-[420px]">
      <UIVirtualList<Row>
        items={[]}
        renderItem={(r) => <RowView row={r} />}
        empty="Здесь пока пусто"
      />
    </div>
  ),
};
