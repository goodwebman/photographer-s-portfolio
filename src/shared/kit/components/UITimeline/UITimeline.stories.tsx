import type { Meta } from '@storybook/nextjs-vite';
import { UITimeline } from '.';
import { UIBadge } from '../UIBadge';

const meta = {
  component: UITimeline,
  tags: ['autodocs'],
  title: 'Kit/Data Display/UITimeline',
} satisfies Meta<typeof UITimeline>;

export default meta;

const CheckIcon = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="m5 12 5 5 9-11" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Лента статусов заказа/деплоя. Цвет точки задаётся `variant`. */
export const Default = {
  parameters: {
    docs: {
      source: {
        code: `<UITimeline>
  <UITimeline.Item title="Заявка создана" time="09:41" variant="success">
    Оплата прошла, заказ принят в обработку.
  </UITimeline.Item>
  <UITimeline.Item title="Собран на складе" time="11:20" variant="primary">
    Курьер получил посылку.
  </UITimeline.Item>
  <UITimeline.Item title="В пути" time="14:05">
    Ожидаемая доставка — сегодня до 18:00.
  </UITimeline.Item>
  <UITimeline.Item title="Доставлено" time="—" variant="default" />
</UITimeline>`,
      },
    },
  },
  render: () => (
    <div className="w-96">
      <UITimeline>
        <UITimeline.Item title="Заявка создана" time="09:41" variant="success">
          Оплата прошла, заказ принят в обработку.
        </UITimeline.Item>
        <UITimeline.Item title="Собран на складе" time="11:20" variant="primary">
          Курьер получил посылку.
        </UITimeline.Item>
        <UITimeline.Item title="В пути" time="14:05">
          Ожидаемая доставка — сегодня до 18:00.
        </UITimeline.Item>
        <UITimeline.Item title="Доставлено" time="—" />
      </UITimeline>
    </div>
  ),
};

/** С иконками в маркере вместо точек. */
export const WithIcons = {
  parameters: {
    docs: {
      source: {
        code: `<UITimeline>
  <UITimeline.Item title="Тесты пройдены" time="2 мин назад" variant="success" icon={<CheckIcon />}>
    42 passed, 0 failed.
  </UITimeline.Item>
  <UITimeline.Item title="Собрано" time="1 мин назад" variant="primary" icon={<CheckIcon />} />
  <UITimeline.Item title="Задеплоено" time="только что" variant="success" icon={<CheckIcon />} />
</UITimeline>`,
      },
    },
  },
  render: () => (
    <div className="w-96">
      <UITimeline>
        <UITimeline.Item title="Тесты пройдены" time="2 мин назад" variant="success" icon={CheckIcon}>
          42 passed, 0 failed.
        </UITimeline.Item>
        <UITimeline.Item title="Собрано" time="1 мин назад" variant="primary" icon={CheckIcon} />
        <UITimeline.Item title="Задеплоено" time="только что" variant="success" icon={CheckIcon} />
      </UITimeline>
    </div>
  ),
};

/** Произвольный контент внутри события — не только текст. */
export const RichContent = {
  parameters: {
    docs: {
      source: {
        code: `<UITimeline>
  <UITimeline.Item title="Релиз v2.4.0" time="12 июля" variant="primary">
    <div className="flex flex-wrap gap-1.5">
      <UIBadge variant="secondary">feature</UIBadge>
      <UIBadge variant="outline">a11y</UIBadge>
    </div>
  </UITimeline.Item>
  <UITimeline.Item title="Хотфикс v2.3.1" time="8 июля" variant="warning">
    Починили race condition в автоплее карусели.
  </UITimeline.Item>
</UITimeline>`,
      },
    },
  },
  render: () => (
    <div className="w-96">
      <UITimeline>
        <UITimeline.Item title="Релиз v2.4.0" time="12 июля" variant="primary">
          <div className="flex flex-wrap gap-1.5">
            <UIBadge variant="secondary">feature</UIBadge>
            <UIBadge variant="outline">a11y</UIBadge>
          </div>
        </UITimeline.Item>
        <UITimeline.Item title="Хотфикс v2.3.1" time="8 июля" variant="warning">
          Починили race condition в автоплее карусели.
        </UITimeline.Item>
      </UITimeline>
    </div>
  ),
};
