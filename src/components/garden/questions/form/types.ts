
import { z } from 'zod';
import { QuestionCategory } from '@/lib/garden/types';

// Define the schema that matches our Question type requirements
export const questionSchema = z.object({
  questionText: z.string().min(1, 'Question text is required'),
  category: z.enum(['philosophical', 'ethical', 'practical', 'scientific', 'social', 'personal']) as z.ZodEnum<[QuestionCategory, ...QuestionCategory[]]>,
  clarificationNeeded: z.boolean().default(false),
  importanceRank: z.number().min(1).max(10),
  relatedModels: z.array(z.string()).default([]),
});

// This ensures the form values will match the expected Omit<Question, "id"> type
export type QuestionFormValues = z.infer<typeof questionSchema>;
