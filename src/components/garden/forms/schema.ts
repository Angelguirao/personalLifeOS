
import { z } from 'zod';

// Form schema for validation
export const mentalModelSchema = z.object({
  // Basic information
  title: z.string().min(1, 'Title is required'),
  subtitle: z.string().optional(),
  developmentStage: z.enum(['seedling', 'growing', 'evergreen', 'mature', 'refined']),
  confidenceLevel: z.enum(['hypothesis', 'working', 'established', 'fundamental']),
  summary: z.string().min(1, 'Summary is required'),
  fullContent: z.string().min(1, 'Content is required'),
  
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
  latchHierarchyLevel: z.string().optional(),
  
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
  
  // Open Questions
  openQuestions: z.string().optional(),
  
  // Inspiration
  bookTitle: z.string().optional(),
  bookAuthor: z.string().optional(),
  bookLink: z.string().optional(),
  
  // Visibility and Metadata
  visibility: z.enum(['public', 'private', 'unlisted']).default('public'),
  imageUrl: z.string().optional(),
});
