
import { z } from 'zod';
import { RelationshipType } from '@/lib/garden/types/connection-types';

// Form schema for validation
export const mentalModelSchema = z.object({
  // Basic information
  title: z.string().min(1, 'Title is required'),
  subtitle: z.string().optional(),
  developmentStage: z.enum(['seedling', 'growing', 'evergreen', 'mature', 'refined']).optional().default('seedling'),
  confidenceLevel: z.enum(['hypothesis', 'working', 'established', 'fundamental']).optional().default('working'),
  summary: z.string().optional().default(''),
  fullContent: z.string().optional().default(''),
  
  // Tags and categories
  tags: z.string().optional(),
  domains: z.string().optional(),
  frameworks: z.string().optional(),
  applications: z.string().optional(),
  
  // LATCH Framework
  latchLocation: z.string().optional(),
  latchAlphabetical: z.string().optional(),
  latchTime: z.string().optional(),
  latchCategory: z.string().optional(),
  latchHierarchyLevel: z.string().optional().default('3'),
  
  // DSRP Structure
  dsrpDistinctions: z.string().optional(),
  dsrpSystems: z.string().optional(),
  dsrpRelationships: z.string().optional(),
  dsrpPerspectives: z.string().optional(),
  
  // Socratic Attributes
  socraticClarification: z.string().optional(),
  socraticAssumptions: z.string().optional(),
  socraticEvidence: z.string().optional(),
  socraticPerspectives: z.string().optional(),
  socraticImplications: z.string().optional(),
  
  // Consequences
  consequencesPersonal: z.string().optional(),
  consequencesInterpersonal: z.string().optional(),
  consequencesSocietal: z.string().optional(),
  
  // Origin Moment
  originDatetime: z.string().optional(),
  originLocation: z.string().optional(),
  originEmotions: z.string().optional(),
  originPerceptions: z.string().optional(),
  
  // Open Questions
  openQuestions: z.string().optional(),
  
  // Inspiration (Book Reference)
  bookTitle: z.string().optional(),
  bookAuthor: z.string().optional(),
  bookLink: z.string().optional(),
  
  // Connections to other models
  connections: z.array(
    z.object({
      targetId: z.string(),
      relationship: z.enum([
        'related', 'supports', 'contradicts', 'extends', 'example',
        'implementation', 'question', 'inspires', 'builds_on',
        'contrasts', 'references', 'questions'
      ]) as z.ZodEnum<[RelationshipType, ...RelationshipType[]]>,
      strength: z.number().min(1).max(10)
    })
  ).optional(),
  
  // Questions related to this model
  relatedQuestions: z.array(
    z.object({
      id: z.string().optional(),
      questionText: z.string(),
      isNew: z.boolean().optional()
    })
  ).optional(),
  
  // Versioning
  versionNote: z.string().optional(),
  createNewVersion: z.boolean().optional(),
  
  // Visibility and Metadata
  visibility: z.enum(['public', 'private', 'unlisted']).default('public'),
  imageUrl: z.string().optional(),
  
  // For JSON import/export
  jsonData: z.string().optional(),
});
