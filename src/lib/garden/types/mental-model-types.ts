import { DevelopmentStage, ConfidenceLevel, VisibilityLevel, SourceType } from './basic-types';

// Common and shared types
export interface BookInfo {
  title: string;
  author: string;
  link: string;
}

export interface Timestamp {
  created: string;
  modified: string;
  reviewed?: string;
}

export interface OriginMoment {
  datetime: string;
  location?: string;
  emotions?: string[];
  perceptions?: string;
}

export interface Consequences {
  personal?: string;
  interpersonal?: string;
  societal?: string;
}

export interface Applications {
  examples: Array<{
    domain: string;
    description: string;
  }>;
}

export interface LATCHAttributes {
  location?: string;
  alphabeticalIndex?: string; // Auto-generated
  category?: string;
  hierarchyLevel: number; // 1-5 scale
}

export interface DSRPStructure {
  distinctions?: string;
  systemStructure?: string;
  relationships?: Record<string, any>; // Complex structure for relationships
  perspectives?: string[];
}

export interface SocraticAttributes {
  clarification?: string;
  assumptions?: string[];
  evidence?: string;
  alternativePerspectives?: string[];
  implications?: string;
}

// Mental model definition
export interface MentalModel {
  id: string;
  title: string;
  subtitle?: string;
  developmentStage: DevelopmentStage;
  confidenceLevel: ConfidenceLevel;
  summary: string;
  fullContent: string;
  imageUrl?: string;
  tags: string[];
  timestamps: Timestamp;
  originMoment?: OriginMoment;
  applications?: Applications;
  consequences?: Consequences;
  openQuestions?: string[];
  // LATCH attributes
  latchAttributes: LATCHAttributes;
  // DSRP structure
  dsrpStructure?: DSRPStructure;
  // Socratic attributes
  socraticAttributes?: SocraticAttributes;
  // Hierarchy and visibility
  hierarchicalView?: Record<string, any>;
  visibility: VisibilityLevel;
  questionsLinked?: string[]; // Array of question IDs
  // Legacy compatibility
  stage?: 'seedling' | 'growing' | 'evergreen'; // For backward compatibility
  lastUpdated?: string; // For backward compatibility
  // Add bookInfo property
  bookInfo?: BookInfo;
}

export interface MentalModelVersion {
  id: string;
  mentalModelId: string;
  versionNumber: number;
  contentSnapshot: string;
  changeLog: string;
  timestamp: string;
}
