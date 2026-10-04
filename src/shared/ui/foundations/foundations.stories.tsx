import type { FC } from 'react';
import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import {
  UIAccordion,
  UIAlert,
  UIBadge,
  UIButton,
  UICard,
  UISeparator,
  UIStat,
  UITabs,
} from '@/shared/kit';

import { PaletteBoard, ThemesSideBySide, TypeRow } from './foundations-parts';

/**
 * # Foundations
 *
 * Дизайн-система «День / Ночь»: токены палитры (имена совпадают с UI-китом),
 * гарнитуры и шкала, и то, как в новой палитре выглядят компоненты кита.
 * Палитра и превью кита показывают обе темы рядом — тулбар темы на них не влияет.
 */
const meta = {
  title: 'Foundations',
  parameters: { layout: 'fullscreen' },
  // обёртка декоратора даёт p-10 — на этой странице отступы свои
  decorators: [(Story) => <div className="-m-10">{Story()}</div>],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

/** Палитра обеих тем + живой расчёт контраста пар текст/фон. */
export const Palette: Story = {
  render: () => <PaletteBoard />,
};

/** Гарнитуры (Playfair Display + Inter Tight, latin + cyrillic) и шкала. */
export const Typography: Story = {
  render: () => (
    <div className="bg-background p-6 text-foreground sm:p-10">
      <TypeRow token="text-hero" spec="serif · clamp(2.25rem, 11.5vw, 11rem) · lh 0.9 · ls -0.02em">
        <p className="whitespace-nowrap font-serif text-hero">АПОЛЛИНАРИЯ</p>
      </TypeRow>
      <TypeRow token="text-display" spec="serif · clamp(2.5rem, 7vw, 6rem) · lh 1">
        <p className="font-serif text-display">ФОТОГРАФ</p>
      </TypeRow>
      <TypeRow token="text-h1" spec="serif · clamp(2rem, 4vw, 3rem)">
        <p className="font-serif text-h1">Хотите поработать вместе?</p>
      </TypeRow>
      <TypeRow token="text-h2" spec="serif · clamp(1.5rem, 3vw, 2.25rem)">
        <p className="font-serif text-h2">
          Качественные, эстетичные и <em className="italic text-brand-emphasis">живые</em> снимки
        </p>
      </TypeRow>
      <TypeRow token="text-h3" spec="serif · 1.5rem · цены и цифры">
        <p className="font-serif text-h3 lining-nums">3 000 ₽ / час</p>
      </TypeRow>
      <TypeRow token="text-body" spec="sans · 1rem · lh 1.6">
        <p className="max-w-prose text-body">
          Меня зовут Полина, и моя задача — создать для вас качественные, эстетичные и живые
          снимки, которыми вы будете гордиться.
        </p>
      </TypeRow>
      <TypeRow token="text-small" spec="sans · 0.875rem">
        <p className="text-small text-muted-foreground">
          Работаю в Омске: оборудованные студии и живописные локации города.
        </p>
      </TypeRow>
      <TypeRow token="text-caption" spec="sans · 0.75rem">
        <p className="text-caption text-muted-foreground">Студия оплачивается отдельно</p>
      </TypeRow>
      <TypeRow token="text-eyebrow" spec="sans · 0.75rem · 500 · ls 0.2em · uppercase">
        <p className="text-eyebrow uppercase">Фотограф · Омск</p>
      </TypeRow>
    </div>
  ),
};

const KitPreview: FC = () => {
  const [tab, setTab] = useState('all');
  const [faq, setFaq] = useState<string | readonly string[]>('photos');

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h3 className="text-eyebrow uppercase text-muted-foreground">UIButton</h3>
        <div className="flex flex-wrap items-center gap-3">
          <UIButton variant="primary">Записаться</UIButton>
          <UIButton variant="secondary">Смотреть работы</UIButton>
          <UIButton variant="outline">Все условия</UIButton>
          <UIButton variant="ghost">Подробнее</UIButton>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <UIButton size="sm">sm</UIButton>
          <UIButton size="md">md</UIButton>
          <UIButton size="lg">lg</UIButton>
          <UIButton variant="outline" disabled>
            disabled
          </UIButton>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-eyebrow uppercase text-muted-foreground">UITabs</h3>
        <UITabs value={tab} onValueChange={setTab}>
          <UITabs.List className="self-start">
            {[
              ['all', 'Все'],
              ['street', 'Стрит'],
              ['portrait', 'Портрет'],
              ['love-story', 'Love story'],
              ['kids', 'Детская'],
            ].map(([value, label]) => (
              <UITabs.Tab key={value} value={value}>
                {label}
              </UITabs.Tab>
            ))}
          </UITabs.List>
          <UITabs.Panel value={tab} className="text-small text-muted-foreground">
            Выбрана категория: {tab}
          </UITabs.Panel>
        </UITabs>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-eyebrow uppercase text-muted-foreground">UIAccordion</h3>
        <UIAccordion value={faq} onValueChange={setFaq}>
          <UIAccordion.Item value="photos">
            <UIAccordion.Trigger>Сколько фотографий я получу в обработке?</UIAccordion.Trigger>
            <UIAccordion.Content>10 отобранных вами кадров в авторской ретуши.</UIAccordion.Content>
          </UIAccordion.Item>
          <UIAccordion.Item value="studio">
            <UIAccordion.Trigger>Входит ли аренда студии в стоимость?</UIAccordion.Trigger>
            <UIAccordion.Content>Нет, студия оплачивается отдельно.</UIAccordion.Content>
          </UIAccordion.Item>
        </UIAccordion>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-eyebrow uppercase text-muted-foreground">UICard · UIBadge · UIAlert</h3>
        <UICard className="max-w-sm">
          <UICard.Header>
            <UIBadge variant="outline" className="self-start">
              Портрет
            </UIBadge>
            <UICard.Title className="mt-2 text-eyebrow uppercase">Индивидуальная съёмка</UICard.Title>
          </UICard.Header>
          <UICard.Content className="pt-4">
            <ul className="flex flex-col gap-1 text-small text-muted-foreground">
              <li>Ретушь 10 фотографий</li>
              <li>Готовность за 5 дней</li>
              <li>Помощь с образом</li>
            </ul>
            <p className="mt-6 font-serif text-h3 lining-nums">3 000 ₽ / час</p>
            <p className="text-caption text-muted-foreground">каждый следующий час +500 ₽</p>
          </UICard.Content>
        </UICard>
        <UIAlert className="max-w-sm">Студия оплачивается отдельно.</UIAlert>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-eyebrow uppercase text-muted-foreground">
          UIStat на красном блоке — токены переопределены на обёртке
        </h3>
        <div className="grid grid-cols-2 gap-3 bg-brand p-4 text-brand-foreground [--border:color-mix(in_srgb,var(--brand-foreground)_40%,transparent)] [--card-foreground:var(--brand-foreground)] [--card:transparent] [--muted-foreground:var(--brand-foreground)]">
          <UIStat
            label="фото в авторской ретуши"
            value={<span className="font-serif font-normal lining-nums">10</span>}
            className="rounded-none shadow-none"
          />
          <UIStat
            label="до готовности"
            value={<span className="font-serif font-normal lining-nums">5 дней</span>}
            className="rounded-none shadow-none"
          />
        </div>
      </div>

      <UISeparator />
    </div>
  );
};

/** Компоненты кита в палитре «День / Ночь»: кнопки, табы, аккордеон, карточка. */
export const KitInPalette: Story = {
  render: () => (
    <ThemesSideBySide>
      <KitPreview />
    </ThemesSideBySide>
  ),
};
