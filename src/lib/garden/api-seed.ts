
import supabase, { isSupabaseAvailable } from './client';
import { tableExists, createTablesIfNotExist } from './utils/table-utils';
import { toast } from 'sonner';
import { seedMentalModels } from './seed/seed-models';
import { seedModelVersions } from './seed/seed-versions';
import { seedQuestions } from './seed/seed-questions';
import { seedInspirations } from './seed/seed-inspirations';
import { seedConnections } from './seed/seed-connections';

export const seedInitialData = async () => {
  // If supabase is null, just return without trying to seed
  if (!isSupabaseAvailable()) {
    console.log('Supabase client not initialized. Using fallback data.');
    return;
  }
  
  console.log('Checking Supabase tables and seeding data if needed...');
  
  try {
    // First, try to create tables if they don't exist
    await createTablesIfNotExist();
    
    // Check if tables exist
    const mentalModelsTableExists = await tableExists('mental_models');
    const connectionsTableExists = await tableExists('connections');
    const versionsTableExists = await tableExists('mental_model_versions');
    const questionsTableExists = await tableExists('questions');
    const inspirationsTableExists = await tableExists('inspirations');
    
    // If mental models table doesn't exist, warn the user
    if (!mentalModelsTableExists) {
      console.warn('Mental models table does not exist in Supabase. Please create it manually in the Supabase dashboard.');
      console.warn('Using fallback data for now.');
      toast.warning('Database tables not found. Using local data instead.');
      return;
    }
    
    // First seed the mental models (which also deletes existing model versions)
    console.log('Starting to seed mental models...');
    const modelsSeedResult = await seedMentalModels();
    console.log('Mental models seeding result:', modelsSeedResult);
    
    // Then seed model versions (must be before connections since they may reference versions)
    if (versionsTableExists && modelsSeedResult) {
      console.log('Starting to seed model versions...');
      await seedModelVersions();
    }
    
    // Then seed connections
    if (connectionsTableExists && modelsSeedResult) {
      console.log('Starting to seed connections...');
      await seedConnections();
    }
    
    // Seed other data
    if (questionsTableExists) {
      console.log('Starting to seed questions...');
      await seedQuestions();
    }
    
    if (inspirationsTableExists) {
      console.log('Starting to seed inspirations...');
      await seedInspirations();
    }
    
    console.log('Initial data seeding completed');
    toast.success('Data seeded to database successfully');
  } catch (error) {
    console.error('Error during seeding process:', error);
    toast.error('Error seeding data to database');
    throw error; // Re-throw to be caught by the Garden component
  }
};
