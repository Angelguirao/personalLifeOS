
import { SourceType } from './basic-types';

export interface Inspiration {
  id: string;
  sourceType: SourceType;
  sourceName: string;
  quote?: string;
  authorName?: string;
  link?: string;
  // Reference to mental model
  mentalModelId?: string; // Foreign key to link to mental models
}
