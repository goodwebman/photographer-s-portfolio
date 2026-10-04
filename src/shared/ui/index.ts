// Вендоренный UI-кит: базовые компоненты (UIButton, UIDialog, UITabs, …).
// Виджеты импортируют всё из `@/shared/ui` — и кит, и site-компоненты.
export * from '@/shared/kit';

// Site-компоненты: то, чего в ките нет.
export { JsonLd, type IJsonLdProps } from './json-ld';
export { UIContainer, type IUIContainerProps } from './ui-container';
export { UIFab, type IUIFabProps } from './ui-fab';
export {
  UIIconLink,
  type IUIIconLinkProps,
  type UIIconLinkVariant,
} from './ui-icon-link';
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
export { UIReveal, type IUIRevealProps } from './ui-reveal';
export { UISection, type IUISectionProps } from './ui-section';
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
  type UIWordRevealTag,
} from './ui-word-reveal';
