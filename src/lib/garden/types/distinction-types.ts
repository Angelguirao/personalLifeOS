
import { VisibilityLevel, QuestionCategory } from './basic-types';

// Distinction types
export type DistinctionType = 'mentalModel' | 'question' | 'experience';

// Base interface for all distinction types
export interface BaseDistinction {
  id: string;
  type: DistinctionType;
  title: string;
  subtitle?: string;
  content?: string;
  summary?: string;
  tags?: string[];
  visibility: VisibilityLevel;
  relatedItems?: string[]; // IDs of related distinctions
  createdAt: string;
  updatedAt: string;
}

// Mental Model specific properties
export interface MentalModelDistinction extends BaseDistinction {
  type: 'mentalModel';
  developmentStage?: 'seedling' | 'growing' | 'evergreen' | 'mature' | 'refined';
  confidenceLevel?: 'hypothesis' | 'working' | 'established' | 'fundamental';
  fullContent?: string;
  latchAttributes?: {
    location?: string;
    alphabetical?: string;
    time?: string;
    category?: string;
    hierarchyLevel?: string;
  };
  dsrpStructure?: {
    distinctions?: string;
    systems?: string;
    relationships?: string;
    perspectives?: string;
  };
  socraticAttributes?: {
    clarification?: string;
    assumptions?: string;
    evidence?: string;
    perspectives?: string;
    implications?: string;
  };
  originMoment?: {
    datetime?: string;
    location?: string;
    emotions?: string;
    perceptions?: string;
  };
  consequences?: {
    personal?: string;
    interpersonal?: string;
    societal?: string;
  };
  openQuestions?: string[];
}

// Question specific properties
export interface QuestionDistinction extends BaseDistinction {
  type: 'question';
  questionText: string;
  category: QuestionCategory;
  clarificationNeeded: boolean;
  importanceRank: number; // 1-10
}

// Experience specific properties
export interface ExperienceDistinction extends BaseDistinction {
  type: 'experience';
  dateExperienced?: string;
  location?: string;
  emotionalResponse?: string;
  lessons?: string[];
  impact?: number; // 1-10
}

// Union type for all distinction types
export type Distinction = 
  | MentalModelDistinction
  | QuestionDistinction
  | ExperienceDistinction;
