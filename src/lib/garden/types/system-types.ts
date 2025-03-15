
import { VisibilityLevel } from './basic-types';

// Define the basic system interface
export interface System {
  id: string;
  name: string;
  description: string;
  icon?: string;
  color?: string;
  category?: string;
  importanceLevel: number; // 1-5 scale
  visibility: VisibilityLevel;
  relatedModels: string[]; // Array of distinction IDs
  parentSystem?: string; // ID of parent system
  distinctions?: string[]; // Array of distinctions (experiences, thoughts, actions, etc.)
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

// Define the system-distinction relationship types
export type SystemDistinctionRelationshipType = 
  'contains' | 
  'influences' | 
  'implements' | 
  'extends' | 
  'contradicts' | 
  'references';

// Define the system-distinction relationship interface
export interface SystemDistinctionRelation {
  id: number;
  systemId: string;
  distinctionId: string;
  relationshipType: SystemDistinctionRelationshipType;
  strength: number; // 1-10 scale
  createdAt: string;
}

// Define the system-model relationship interface to fix the error
export interface SystemModelRelation {
  id: number;
  systemId: string;
  modelId: string;
  relationshipType: SystemDistinctionRelationshipType;
  strength: number; // 1-10 scale
  createdAt: string;
}
