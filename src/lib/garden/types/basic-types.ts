
// Enumerated types for mental models
export type DevelopmentStage = 'seedling' | 'growing' | 'evergreen' | 'mature' | 'refined';
export type ConfidenceLevel = 'hypothesis' | 'working' | 'established' | 'fundamental';
export type VisibilityLevel = 'private' | 'public' | 'restricted';
export type SourceType = 'book' | 'article' | 'author' | 'other' | 'experience';
export type QuestionCategory = 'philosophical' | 'technical' | 'scientific' | 'ethical' | 'personal' | 'other';

// Define specific relationship types for better type safety
export type RelationshipType = 'related' | 'inspires' | 'builds_on' | 'contrasts' | 'references' | 'questions';
