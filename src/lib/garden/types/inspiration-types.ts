
import { SourceType } from './basic-types';

export interface Inspiration {
  id: string;
  sourceType: SourceType;
  sourceName: string;
  quote?: string;
  authorName?: string;
  link?: string;
}
