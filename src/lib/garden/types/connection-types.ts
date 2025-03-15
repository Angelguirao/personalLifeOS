
// Connection type constants and enums
export type RelationshipType = 
  | 'related' 
  | 'supports' 
  | 'contradicts' 
  | 'extends' 
  | 'example' 
  | 'implementation' 
  | 'question'
  | 'inspires'
  | 'builds_on'
  | 'contrasts'
  | 'references'
  | 'questions';

// Connection interface for the frontend
export interface Connection {
  id: number;
  sourceId: string | number;
  targetId: string | number;
  strength: number; // 0.0 to 1.0
  relationship: RelationshipType; // Type of connection
}

// Connection type for Supabase database
export interface SupabaseConnection {
  id: number;
  source_id: string | number;
  target_id: string | number;
  strength: number; // 0-10 integer scale
  relationship: RelationshipType;
}

// Descriptions for each relationship type
export const relationshipDescriptions: Record<RelationshipType, string> = {
  related: "A general connection between models with shared concepts",
  supports: "This model provides evidence or reasoning that strengthens the connected model",
  contradicts: "This model presents ideas that oppose or challenge the connected model",
  extends: "This model builds upon or elaborates concepts in the connected model",
  example: "This model provides a concrete example of the connected model",
  implementation: "This model shows how to apply or implement the connected model",
  question: "This model raises questions about the connected model",
  inspires: "This model was inspired by or derived from the connected model",
  builds_on: "This model incorporates and advances ideas from the connected model",
  contrasts: "This model shows differences when compared to the connected model",
  references: "This model refers to or cites the connected model",
  questions: "This model raises specific questions about the connected model"
};

// Strength descriptions based on numeric values
export const getStrengthDescription = (value: number): string => {
  if (value >= 9) return "Very strong connection, inseparable concepts";
  if (value >= 7) return "Strong connection with significant overlap";
  if (value >= 5) return "Moderate connection with clear relationship";
  if (value >= 3) return "Weak connection with some relevance";
  return "Minimal connection, loosely related";
};

// Get description for a relationship type
export const getRelationshipDescription = (type: RelationshipType): string => {
  return relationshipDescriptions[type] || "Connection between models";
};
