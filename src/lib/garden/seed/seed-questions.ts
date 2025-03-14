
import supabase from '../client';
import { questions } from '../data';
import { toast } from 'sonner';

export const seedQuestions = async () => {
  // Check if the questions table has data
  const { count, error: countError } = await supabase
    .from('questions')
    .select('*', { count: 'exact', head: true });
  
  if (countError) {
    console.error('Error checking questions data:', countError);
    return false;
  }
  
  // If we already have data, no need to seed
  if (count && count > 0) {
    console.log('Questions table already contains data. Skipping seed operation.');
    return true;
  }
  
  // Format the questions data for Supabase (using snake_case for column names)
  const questionsData = questions.map(question => ({
    id: question.id,
    question_text: question.questionText,
    clarification_needed: question.clarificationNeeded, // Use snake_case for Supabase
    related_models: question.relatedModels,
    category: question.category,
    importance_rank: question.importanceRank
  }));
  
  // Insert questions
  const { error } = await supabase
    .from('questions')
    .insert(questionsData);
  
  if (error) {
    console.error('Error seeding questions:', error);
    toast.error('Error seeding questions to database');
    return false;
  }
  
  console.log('Questions seeded successfully');
  return true;
};
