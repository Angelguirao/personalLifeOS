
// Type definitions for the Digital Garden

export interface BookInfo {
  title: string;
  author: string;
  link: string;
}

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

export interface Connection {
  id: number;
  sourceId: number;
  targetId: number;
  strength: number; // Explicitly defined as number
  relationship: string;
}
