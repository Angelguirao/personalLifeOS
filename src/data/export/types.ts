
// Basic Types
export type DevelopmentStage = 'seedling' | 'growing' | 'evergreen' | 'mature' | 'refined';
export type ConfidenceLevel = 'hypothesis' | 'working' | 'established' | 'fundamental';
export type VisibilityLevel = 'public' | 'private' | 'unlisted';
export type SourceType = 'book' | 'article' | 'paper' | 'video' | 'podcast' | 'conversation' | 'experience' | 'other';
export type QuestionCategory = 'philosophical' | 'ethical' | 'practical' | 'scientific' | 'social' | 'personal';
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

// Mental Model Types
export interface Timestamp {
  created: string;
  modified: string;
  reviewed?: string;
}

export interface LATCHAttributes {
  location?: string;
  alphabeticalIndex?: string;
  time?: string;
  category?: string;
  hierarchyLevel: number;
}

export interface SocraticAttributes {
  clarification?: string;
  assumptions?: string[] | string;
  evidence?: string;
  perspectives?: string[] | string;
  implications?: string;
}

export interface BookInfo {
  title: string;
  author: string;
  link: string;
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
  latchAttributes: LATCHAttributes;
  socraticAttributes?: SocraticAttributes;
  visibility: VisibilityLevel;
  // For backward compatibility
  stage?: DevelopmentStage;
  lastUpdated?: string;
  bookInfo?: BookInfo;
}

// Question Type
export interface Question {
  id: string;
  questionText: string;
  clarificationNeeded: boolean;
  relatedModels: string[];
  category: QuestionCategory;
  importanceRank: number;
}

// Connection Type
export interface Connection {
  id: number;
  sourceId: string;
  targetId: string;
  strength: number;
  relationship: RelationshipType;
}

// Inspiration Type
export interface Inspiration {
  id: string;
  sourceType: SourceType;
  sourceName: string;
  authorName: string;
  link: string;
  quote: string;
  mentalModelId?: string;
}

// MongoDB Schema Helpers (for your new project)
export const mentalModelSchema = {
  title: { type: String, required: true },
  subtitle: { type: String },
  developmentStage: { type: String, enum: ['seedling', 'growing', 'evergreen', 'mature', 'refined'], default: 'seedling' },
  confidenceLevel: { type: String, enum: ['hypothesis', 'working', 'established', 'fundamental'], default: 'working' },
  summary: { type: String },
  fullContent: { type: String },
  imageUrl: { type: String },
  tags: [{ type: String }],
  timestamps: {
    created: { type: Date, default: Date.now },
    modified: { type: Date, default: Date.now },
    reviewed: { type: Date }
  },
  latchAttributes: {
    category: { type: String },
    hierarchyLevel: { type: Number, min: 1, max: 5, default: 3 }
  },
  socraticAttributes: {
    clarification: { type: String },
    assumptions: [{ type: String }],
    implications: { type: String }
  },
  visibility: { type: String, enum: ['public', 'private', 'unlisted'], default: 'public' }
};

export const questionSchema = {
  questionText: { type: String, required: true },
  clarificationNeeded: { type: Boolean, default: false },
  relatedModels: [{ type: String }],
  category: { type: String, enum: ['philosophical', 'ethical', 'practical', 'scientific', 'social', 'personal'] },
  importanceRank: { type: Number, min: 1, max: 10 }
};

export const connectionSchema = {
  sourceId: { type: String, required: true },
  targetId: { type: String, required: true },
  strength: { type: Number, min: 0, max: 1, default: 0.5 },
  relationship: { 
    type: String, 
    enum: [
      'related', 'supports', 'contradicts', 'extends', 'example',
      'implementation', 'question', 'inspires', 'builds_on',
      'contrasts', 'references', 'questions'
    ],
    default: 'related'
  }
};

export const inspirationSchema = {
  sourceType: { type: String, enum: ['book', 'article', 'paper', 'video', 'podcast', 'conversation', 'experience', 'other'] },
  sourceName: { type: String, required: true },
  authorName: { type: String },
  link: { type: String },
  quote: { type: String },
  mentalModelId: { type: String }
};
