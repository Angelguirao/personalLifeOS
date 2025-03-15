
import { v4 as uuidv4 } from 'uuid';
import supabase from './client';
import { Question } from './types/question-types';
import { questions as sampleQuestions } from './data/questions';

// In-memory store for questions when Supabase is not available
let localQuestions = [...sampleQuestions];

// Get all questions
export const getQuestions = async (): Promise<Question[]> => {
  if (!supabase) {
    console.log('Using local questions data (Supabase not available)');
    return localQuestions;
  }

  try {
    const { data, error } = await supabase.from('questions').select('*');
    
    if (error) {
      console.error('Error fetching questions:', error);
      return localQuestions;
    }
    
    return data as Question[];
  } catch (error) {
    console.error('Error in getQuestions:', error);
    return localQuestions;
  }
};

// Get a specific question by ID
export const getQuestionById = async (id: string): Promise<Question | null> => {
  if (!supabase) {
    const question = localQuestions.find(q => q.id === id);
    return question || null;
  }

  try {
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching question by ID:', error);
      return localQuestions.find(q => q.id === id) || null;
    }
    
    return data as Question;
  } catch (error) {
    console.error('Error in getQuestionById:', error);
    return localQuestions.find(q => q.id === id) || null;
  }
};

// Create a new question
export const createQuestion = async (questionData: Omit<Question, 'id'>): Promise<Question> => {
  const newQuestion: Question = {
    id: uuidv4(),
    ...questionData
  };

  if (!supabase) {
    localQuestions.push(newQuestion);
    return newQuestion;
  }

  try {
    const { data, error } = await supabase
      .from('questions')
      .insert([newQuestion])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating question:', error);
      localQuestions.push(newQuestion);
      return newQuestion;
    }
    
    return data as Question;
  } catch (error) {
    console.error('Error in createQuestion:', error);
    localQuestions.push(newQuestion);
    return newQuestion;
  }
};

// Update an existing question
export const updateQuestion = async (id: string, questionData: Partial<Question>): Promise<Question | null> => {
  if (!supabase) {
    const index = localQuestions.findIndex(q => q.id === id);
    if (index === -1) return null;
    
    localQuestions[index] = { ...localQuestions[index], ...questionData };
    return localQuestions[index];
  }

  try {
    const { data, error } = await supabase
      .from('questions')
      .update(questionData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating question:', error);
      
      // Fallback to local update
      const index = localQuestions.findIndex(q => q.id === id);
      if (index === -1) return null;
      
      localQuestions[index] = { ...localQuestions[index], ...questionData };
      return localQuestions[index];
    }
    
    return data as Question;
  } catch (error) {
    console.error('Error in updateQuestion:', error);
    
    // Fallback to local update
    const index = localQuestions.findIndex(q => q.id === id);
    if (index === -1) return null;
    
    localQuestions[index] = { ...localQuestions[index], ...questionData };
    return localQuestions[index];
  }
};

// Delete a question
export const deleteQuestion = async (id: string): Promise<boolean> => {
  if (!supabase) {
    const index = localQuestions.findIndex(q => q.id === id);
    if (index === -1) return false;
    
    localQuestions.splice(index, 1);
    return true;
  }

  try {
    const { error } = await supabase
      .from('questions')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting question:', error);
      
      // Fallback to local delete
      const index = localQuestions.findIndex(q => q.id === id);
      if (index === -1) return false;
      
      localQuestions.splice(index, 1);
      return true;
    }
    
    return true;
  } catch (error) {
    console.error('Error in deleteQuestion:', error);
    
    // Fallback to local delete
    const index = localQuestions.findIndex(q => q.id === id);
    if (index === -1) return false;
    
    localQuestions.splice(index, 1);
    return true;
  }
};

// Get questions related to a specific model
export const getQuestionsForModel = async (modelId: string): Promise<Question[]> => {
  if (!supabase) {
    return localQuestions.filter(q => q.relatedModels.includes(modelId));
  }

  try {
    // This is a simplification - in a real DB you might want to handle this differently
    // depending on your schema (e.g., using a junction table or array contains)
    const { data, error } = await supabase
      .from('questions')
      .select('*');
    
    if (error) {
      console.error('Error fetching questions for model:', error);
      return localQuestions.filter(q => q.relatedModels.includes(modelId));
    }
    
    // Filter questions that have the modelId in their relatedModels array
    return (data as Question[]).filter(q => 
      q.relatedModels && q.relatedModels.includes(modelId)
    );
  } catch (error) {
    console.error('Error in getQuestionsForModel:', error);
    return localQuestions.filter(q => q.relatedModels.includes(modelId));
  }
};
