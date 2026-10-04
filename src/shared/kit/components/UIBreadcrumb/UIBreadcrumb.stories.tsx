import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { UIBreadcrumb } from './UIBreadcrumb';

const meta = {
  component: UIBreadcrumb,
  tags: ['autodocs'],
  title: 'Kit/Navigation/UIBreadcrumb',
} satisfies Meta<typeof UIBreadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Главная', href: '#' },
      { label: 'Фильмы', href: '#' },
      { label: 'Фантастика', href: '#' },
      { label: 'Дюна' },
    ],
  },
};

/** Длинный путь сворачивается в «…»: первая крошка + последние `maxItems - 1`. */
export const Collapsed: Story = {
  parameters: {
    docs: {
      source: {
        code: `<UIBreadcrumb
  maxItems={3}
  items={[
    { label: 'Главная', href: '#' },
    { label: 'Каталог', href: '#' },
    { label: 'Сериалы', href: '#' },
    { label: 'Драмы', href: '#' },
    { label: 'Сезон 2', href: '#' },
    { label: 'Эпизод 5' },
  ]}
/>`,
      },
    },
  },
  args: {
    maxItems: 3,
    items: [
      { label: 'Главная', href: '#' },
      { label: 'Каталог', href: '#' },
      { label: 'Сериалы', href: '#' },
      { label: 'Драмы', href: '#' },
      { label: 'Сезон 2', href: '#' },
      { label: 'Эпизод 5' },
    ],
  },
};

/** Свой разделитель — например, слэш. */
export const CustomSeparator: Story = {
  parameters: {
    docs: {
      source: {
        code: `<UIBreadcrumb
  separator={<span className="px-0.5">/</span>}
  items={[
    { label: 'app', href: '#' },
    { label: 'components', href: '#' },
    { label: 'UIBreadcrumb.tsx' },
  ]}
/>`,
      },
    },
  },
  args: {
    separator: <span className="px-0.5">/</span>,
    items: [
      { label: 'app', href: '#' },
      { label: 'components', href: '#' },
      { label: 'UIBreadcrumb.tsx' },
    ],
  },
};

/** С иконкой у первой крошки (напр. «дом»). */
export const WithIcon: Story = {
  parameters: {
    docs: {
      source: {
        code: `<UIBreadcrumb
  items={[
    { label: 'Главная', href: '#', icon: <HomeIcon /> },
    { label: 'Профиль', href: '#' },
    { label: 'Настройки' },
  ]}
/>`,
      },
    },
  },
  args: {
    items: [
      {
        label: 'Главная',
        href: '#',
        icon: (
          <svg viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M3 10.5 12 3l9 7.5M5.5 9.5V20h13V9.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
      },
      { label: 'Профиль', href: '#' },
      { label: 'Настройки' },
    ],
  },
};
