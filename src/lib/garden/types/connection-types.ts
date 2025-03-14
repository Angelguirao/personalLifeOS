
import { RelationshipType } from './basic-types';

// Connection data types
export interface Connection {
  id: number;
  sourceId: string; // Changed to string for UUID compatibility
  targetId: string; // Changed to string for UUID compatibility
  strength: number; // Decimal 0.0 to 1.0 in frontend, stored as integer 0-10 in DB
  relationship: RelationshipType;
}

// Define the database representation for better type safety
export interface SupabaseConnection {
  id: number;
  source_id: string; // Changed to string for UUID compatibility
  target_id: string; // Changed to string for UUID compatibility
  strength: number; // Integer 0-10 in database
  relationship: RelationshipType;
}
