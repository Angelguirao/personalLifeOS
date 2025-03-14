
// Connection type constants and enums
export type RelationshipType = 
  | 'related' 
  | 'supports' 
  | 'contradicts' 
  | 'extends' 
  | 'example' 
  | 'implementation' 
  | 'question';

// Connection interface for the frontend
export interface Connection {
  id: number;
  sourceId: string | number;
  targetId: string | number;
  strength: number; // 0.0 to 1.0
  relationship: string; // Type of connection
}

// Connection type for Supabase database
export interface SupabaseConnection {
  id: number;
  source_id: string | number;
  target_id: string | number;
  strength: number; // 0-10 integer scale
  relationship: RelationshipType;
}
