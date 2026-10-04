import { UITimelineRoot } from './UITimelineRoot';
import { UITimelineItem } from './UITimelineItem';

export const UITimeline = Object.assign(UITimelineRoot, {
  Item: UITimelineItem,
});

export { timelineDotVariants } from './UITimelineItem';
export type { IUITimelineProps } from './UITimelineRoot';
export type { IUITimelineItemProps } from './UITimelineItem';
