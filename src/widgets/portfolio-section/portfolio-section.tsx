import type { FC } from 'react';

import { filterPhotos, PHOTO_CATEGORIES, PHOTOS, type PhotoCategory } from '@/entities/photo';
import { COPY, SECTION_ID } from '@/shared/config';
import { UIContainer, UIPhotoTile, UISection, UISectionHeading } from '@/shared/ui';

import { PortfolioCta } from './portfolio-cta';
import { PortfolioFilter, type IPortfolioTab } from './portfolio-filter';
import { PortfolioFrameNumber } from './portfolio-frame-number';
import { PortfolioGrid } from './portfolio-grid';
import { PortfolioProvider, type IPortfolioItem } from './portfolio-provider';

const TITLE_ID = 'portfolio-title';

const TABS: readonly IPortfolioTab[] = [
  { id: 'all', label: COPY.portfolio.all, count: PHOTOS.length },
  ...PHOTO_CATEGORIES.map((item) => ({ ...item, count: filterPhotos(item.id).length })),
];

const CATEGORY_LABEL = Object.fromEntries(
  PHOTO_CATEGORIES.map((item) => [item.id, item.label]),
) as Record<PhotoCategory, string>;

const TILE_SIZES = '(min-width: 1460px) 430px, (min-width: 1024px) 31vw, 48vw';

const ITEMS: readonly IPortfolioItem[] = PHOTOS.map(({ id, src, alt, category }) => ({
  id,
  src,
  alt,
  category,
}));

const IDS = PHOTOS.map((photo) => photo.id);

const LIGHTBOX_LABELS = {
  dialog: COPY.portfolio.lightbox.label,
  close: COPY.portfolio.lightbox.close,
  prev: COPY.portfolio.lightbox.prev,
  next: COPY.portfolio.lightbox.next,
  loading: COPY.portfolio.lightbox.loading,
};

/**
 * Портфолио: фильтр по жанрам (вкладки с числом кадров), ровная сетка 2:3,
 * клик по кадру — полноэкранный `UILightbox` (там кадр целиком). Неполный
 * последний ряд закрывает текстовая плитка-CTA (реф. 2), поэтому в сетке не
 * бывает дыр при любом фильтре.
 *
 * Server component: заголовок, плитки и CTA рендерятся на сервере, все кадры
 * сразу в HTML (видны краулеру и без JS). Клиентские острова — состояние
 * (`PortfolioProvider`), вкладки (`PortfolioFilter`), сетка (`PortfolioGrid`:
 * прячет плитки чужих жанров) и номер CTA; лайтбокс — отдельный чанк по
 * первому клику.
 */
export const PortfolioSection: FC = () => {
  const tiles = Object.fromEntries(
    PHOTOS.map((photo) => [
      photo.id,
      <UIPhotoTile
        key={photo.id}
        src={photo.src}
        alt={photo.alt}
        fit="portrait"
        focal={photo.focal}
        caption={CATEGORY_LABEL[photo.category]}
        sizes={TILE_SIZES}
        itemId={photo.id}
        dataName={photo.id}
      />,
    ]),
  );

  return (
    <UISection id={SECTION_ID.portfolio} ariaLabelledby={TITLE_ID} dataName="portfolio">
      <UIContainer>
        <PortfolioProvider items={ITEMS} labels={LIGHTBOX_LABELS}>
          <UISectionHeading
            id={TITLE_ID}
            index="02"
            eyebrow={COPY.portfolio.eyebrow}
            title={COPY.portfolio.title}
            description={COPY.portfolio.description}
            action={<PortfolioFilter tabs={TABS} label={COPY.portfolio.filter} />}
          />
          <PortfolioGrid
            ids={IDS}
            tiles={tiles}
            cta={<PortfolioCta frame={<PortfolioFrameNumber />} />}
          />
        </PortfolioProvider>
      </UIContainer>
    </UISection>
  );
};
