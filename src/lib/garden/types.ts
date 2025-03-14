// Type definitions for the Digital Garden

// Enumerated types for mental models
export type DevelopmentStage = 'seedling' | 'growing' | 'evergreen' | 'mature' | 'refined';
export type ConfidenceLevel = 'hypothesis' | 'working' | 'established' | 'fundamental';
export type VisibilityLevel = 'private' | 'public' | 'restricted';
export type SourceType = 'book' | 'article' | 'author' | 'other' | 'experience';
export type QuestionCategory = 'philosophical' | 'technical' | 'scientific' | 'ethical' | 'personal' | 'other';

// Legacy type definitions (kept for reference but will be phased out)
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

// Updated to use string IDs for mental models
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

// New Enhanced Data Models
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

export interface Inspiration {
  id: string;
  sourceType: SourceType;
  sourceName: string;
  quote?: string;
  authorName?: string;
  link?: string;
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
}

export interface MentalModelVersion {
  id: string;
  mentalModelId: string;
  versionNumber: number;
  contentSnapshot: string;
  changeLog: string;
  timestamp: string;
}

export interface Question {
  id: string;
  questionText: string;
  clarificationNeeded: boolean;
  relatedModels: string[];
  category: QuestionCategory;
  importanceRank: number; // 1-10 scale
}

// Helper function to convert legacy GardenNote to new MentalModel
export const convertNoteToMentalModel = (note: GardenNote): MentalModel => {
  // Map stage to development stage
  const developmentStage: DevelopmentStage = (() => {
    switch(note.stage) {
      case 'seedling': return 'seedling';
      case 'growing': return 'growing';
      case 'evergreen': return 'mature';
      default: return 'seedling';
    }
  })();

  return {
    id: note.id.toString(),
    title: note.title,
    summary: note.summary,
    fullContent: note.fullContent,
    developmentStage,
    confidenceLevel: 'working', // Default
    tags: note.connections,
    timestamps: {
      created: note.lastUpdated,
      modified: note.lastUpdated,
    },
    latchAttributes: {
      hierarchyLevel: 3, // Default middle level
    },
    visibility: 'public', // Default
    // Keep legacy fields for compatibility
    stage: note.stage,
    lastUpdated: note.lastUpdated,
  };
};

export const convertMentalModelToNote = (model: MentalModel): GardenNote => {
  return {
    id: parseInt(model.id),
    title: model.title,
    summary: model.summary,
    fullContent: model.fullContent,
    stage: model.stage || (model.developmentStage as 'seedling' | 'growing' | 'evergreen'),
    lastUpdated: model.lastUpdated || model.timestamps.modified,
    connections: model.tags,
    // Optionally convert bookInfo if present
    bookInfo: model.tags.includes('book') ? {
      title: model.title.split(' by ')[0] || '',
      author: model.title.split(' by ')[1] || 'Unknown',
      link: '#' // Default link
    } : undefined
  };
};
