
import { QuestionCategory } from './basic-types';

export interface Question {
  id: string;
  questionText: string;
  clarificationNeeded: boolean;
  relatedModels: string[];
  category: QuestionCategory;
  importanceRank: number; // 1-10 scale
}

// Export the QuestionCategory to make it available to other files
export { QuestionCategory };
