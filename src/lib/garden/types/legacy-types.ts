
import { BookInfo } from './mental-model-types';

// Legacy types for backward compatibility
export interface GardenNote {
  id: string | number; // Support both string and number IDs
  title: string;
  subtitle?: string; // Add subtitle property
  summary: string;
  fullContent?: string;
  stage: 'seedling' | 'growing' | 'evergreen';
  lastUpdated: string;
  connections?: string[];
  bookInfo?: BookInfo;
}

export interface RelationshipData {
  from: number;
  to: number;
  type: string;
}
