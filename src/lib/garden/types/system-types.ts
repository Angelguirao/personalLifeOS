
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
  relatedModels: string[]; // Array of model IDs
  parentSystem?: string; // ID of parent system
  distinctions?: string[]; // Array of distinctions (experiences, thoughts, actions, etc.)
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

// Define the system-model relationship types
export type SystemModelRelationshipType = 
  'contains' | 
  'influences' | 
  'implements' | 
  'extends' | 
  'contradicts' | 
  'references';

// Define the system-model relationship interface
export interface SystemModelRelation {
  id: number;
  systemId: string;
  modelId: string;
  relationshipType: SystemModelRelationshipType;
  strength: number; // 1-10 scale
  createdAt: string;
}
