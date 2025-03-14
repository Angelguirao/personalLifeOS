
import { BookInfo } from './mental-model-types';

// Legacy type definitions (kept for reference but will be phased out)
export interface GardenNote {
  id: number;
  title: string;
  summary: string;
  fullContent: string;
  stage: 'seedling' | 'growing' | 'evergreen';
  lastUpdated: string;
  connections: string[];
  bookInfo?: BookInfo;
}

export interface SupabaseNote {
  id: number;
  title: string;
  summary: string;
  full_content: string;
  stage: 'seedling' | 'growing' | 'evergreen';
  last_updated: string;
  connections: string[];
  book_info?: BookInfo;
}
