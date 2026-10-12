// Вендоренный UI-кит: базовые компоненты (UIButton, UIDialog, UITabs, …).
// Виджеты импортируют всё из `@/shared/ui` — и кит, и site-компоненты.
export * from '@/shared/kit';

// Site-компоненты: то, чего в ките нет.
export * from './icons';
export { JsonLd, type IJsonLdProps } from './json-ld';
export { UIColumnLines, type IUIColumnLinesProps } from './ui-column-lines';
export { UIContainer, type IUIContainerProps } from './ui-container';
export { UIFab, type IUIFabProps } from './ui-fab';
export {
  FILM_GRAIN_IMAGE,
  UIFilmGrain,
  type IUIFilmGrainProps,
} from './ui-film-grain';
export {
  UIFrameLoader,
  type IUIFrameLoaderProps,
  type UIFrameLoaderSize,
} from './ui-frame-loader';
export {
  UIIconLink,
  type IUIIconLinkProps,
  type UIIconLinkVariant,
} from './ui-icon-link';
export {
  UILightbox,
  type IUILightboxItem,
  type IUILightboxLabels,
  type IUILightboxProps,
} from './ui-lightbox';
export {
  UILinkButton,
  type IUILinkButtonProps,
  type UILinkButtonSize,
  type UILinkButtonVariant,
} from './ui-link-button';
export { UILogo, type IUILogoProps, type UILogoVariant } from './ui-logo';
export {
  UINavLink,
  type IUINavLinkProps,
  type UINavLinkVariant,
} from './ui-nav-link';
export { UINumberedList, type IUINumberedListProps } from './ui-numbered-list';
export { UIPhotoTile, type IUIPhotoTileProps, type UIPhotoTileFit } from './ui-photo-tile';
export { UIPriceCard, type IUIPriceCardProps } from './ui-price-card';
export { UIReveal, type IUIRevealProps } from './ui-reveal';
export { UISection, type IUISectionProps, type UISectionTone } from './ui-section';
export { UISpotlight, type IUISpotlightProps } from './ui-spotlight';
export {
  UISectionHeading,
  type IUISectionHeadingProps,
} from './ui-section-heading';
export {
  UITextLink,
  type IUITextLinkProps,
  type UITextLinkTone,
} from './ui-text-link';
export { UIThemeToggle, type IUIThemeToggleProps } from './ui-theme-toggle';
export {
  UIWordReveal,
  type IUIWordRevealProps,
  type UIWordRevealSplit,
  type UIWordRevealTag,
} from './ui-word-reveal';
