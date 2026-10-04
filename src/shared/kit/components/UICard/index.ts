import { UICardRoot } from './UICardRoot';
import { UICardHeader } from './UICardHeader';
import { UICardTitle } from './UICardTitle';
import { UICardDescription } from './UICardDescription';
import { UICardContent } from './UICardContent';
import { UICardFooter } from './UICardFooter';

export const UICard = Object.assign(UICardRoot, {
  Header: UICardHeader,
  Title: UICardTitle,
  Description: UICardDescription,
  Content: UICardContent,
  Footer: UICardFooter,
});

export type { IUICardProps } from './UICardRoot';
export type { IUICardHeaderProps } from './UICardHeader';
export type { IUICardTitleProps } from './UICardTitle';
export type { IUICardDescriptionProps } from './UICardDescription';
export type { IUICardContentProps } from './UICardContent';
export type { IUICardFooterProps } from './UICardFooter';
