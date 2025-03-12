
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

// Define specific relationship types for better type safety
export type RelationshipType = 'related' | 'inspires' | 'builds_on' | 'contrasts' | 'references' | 'questions';

export interface Connection {
  id: number;
  sourceId: number;
  targetId: number;
  strength: number; // Decimal 0.0 to 1.0 in frontend, stored as integer 0-10 in DB
  relationship: RelationshipType;
}

// Define the database representation for better type safety
export interface SupabaseConnection {
  id: number;
  source_id: number;
  target_id: number;
  strength: number; // Integer 0-10 in database
  relationship: RelationshipType;
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
