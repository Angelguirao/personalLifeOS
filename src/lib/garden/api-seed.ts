
import supabase from './client';
import { tableExists } from './utils';
import { toast } from 'sonner';
import { seedLegacyData } from './seed/seed-legacy';
import { seedMentalModels } from './seed/seed-models';
import { seedModelVersions } from './seed/seed-versions';
import { seedQuestions } from './seed/seed-questions';
import { seedInspirations } from './seed/seed-inspirations';

export const seedInitialData = async () => {
  if (!supabase) return;
  
  console.log('Seeding initial data to Supabase...');
  
  try {
    // First, check if tables exist (legacy tables)
    const notesTableExists = await tableExists('garden_notes');
    const connectionsTableExists = await tableExists('garden_connections');
    
    // Check if new tables exist
    const mentalModelsTableExists = await tableExists('mental_models');
    const versionsTableExists = await tableExists('mental_model_versions');
    const questionsTableExists = await tableExists('questions');
    const inspirationsTableExists = await tableExists('inspirations');
    
    // If neither legacy nor new tables exist, warn the user
    if (!notesTableExists && !mentalModelsTableExists) {
      console.warn('Required tables do not exist in Supabase. Please create them manually in the Supabase dashboard.');
      console.warn('Using fallback data for now.');
      toast.warning('Database tables not found. Using local data instead.');
      return;
    }
    
    // Handle legacy tables first for backward compatibility
    if (notesTableExists && connectionsTableExists) {
      await seedLegacyData();
    }
    
    // Handle new tables if they exist
    if (mentalModelsTableExists) {
      await seedMentalModels();
      
      if (versionsTableExists) {
        await seedModelVersions();
      }
      
      if (questionsTableExists) {
        await seedQuestions();
      }
      
      if (inspirationsTableExists) {
        await seedInspirations();
      }
    }
    
    console.log('Initial data seeding completed');
    toast.success('Data seeded to database successfully');
  } catch (error) {
    console.error('Error during seeding process:', error);
    toast.error('Error seeding data to database');
  }
};
