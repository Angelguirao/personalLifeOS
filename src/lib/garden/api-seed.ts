
import supabase from './client';
import { gardenNotes, connections, mentalModels, questions, inspirations, modelVersions } from './data';
import { tableExists, transformNoteToSupabase, transformMentalModelToSupabase } from './utils';
import { toast } from 'sonner';
import { SupabaseConnection } from './types';

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

// Helper function to seed legacy data
const seedLegacyData = async () => {
  // Check if the notes table has data
  const { count: notesCount, error: countError } = await supabase
    .from('garden_notes')
    .select('*', { count: 'exact', head: true });
  
  if (countError) {
    console.error('Error checking table data:', countError);
    toast.error('Error checking database. Using local data instead.');
    return;
  }
  
  // If we have data, no need to seed
  if (notesCount && notesCount > 0) {
    // Let's also check if connections exist
    const { count: connectionsCount, error: connectionsCountError } = await supabase
      .from('garden_connections')
      .select('*', { count: 'exact', head: true });
      
    if (connectionsCountError) {
      console.error('Error checking connections data:', connectionsCountError);
    } else if (connectionsCount && connectionsCount > 0) {
      console.log('Legacy tables already contain data. Skipping seed operation.');
      return;
    } else {
      console.log('Notes exist but connections are missing. Seeding connections...');
      // If we have notes but no connections, only seed the connections
      await seedConnections();
      return;
    }
  }
  
  // If we get here, we need to seed both notes and connections
  // Transform notes to Supabase format
  const notesData = gardenNotes.map(note => transformNoteToSupabase(note));
  
  // Insert notes
  const { error: notesError } = await supabase
    .from('garden_notes')
    .insert(notesData)
    .select();
  
  if (notesError) {
    console.error('Error seeding notes:', notesError);
    toast.error('Error seeding notes to database');
    return;
  }
  
  // After notes are inserted, seed connections
  await seedConnections();
};

// Helper function to seed connections
const seedConnections = async () => {
  // Transform connections to snake_case for Supabase
  // Convert strength to integers (0-10 scale) for Supabase
  const connectionsData: Omit<SupabaseConnection, 'id'>[] = connections.map(conn => {
    // Multiply decimal strength by 10 and round to get an integer
    const strengthAsInteger = Math.round(Number(conn.strength) * 10);
    
    return {
      source_id: conn.sourceId,
      target_id: conn.targetId,
      strength: strengthAsInteger, // Store as integer
      relationship: conn.relationship
    };
  });
  
  console.log('Seeding connections with data:', connectionsData);
  
  // Insert connections
  const { error: connectionsError } = await supabase
    .from('garden_connections')
    .insert(connectionsData);
  
  if (connectionsError) {
    console.error('Error seeding connections:', connectionsError);
    toast.error('Error seeding connections to database');
    return false;
  }
  
  return true;
};

// Helper function to seed mental models
const seedMentalModels = async () => {
  // Check if the mental_models table has data
  const { count, error: countError } = await supabase
    .from('mental_models')
    .select('*', { count: 'exact', head: true });
  
  if (countError) {
    console.error('Error checking mental_models data:', countError);
    return false;
  }
  
  // If we already have data, no need to seed
  if (count && count > 0) {
    console.log('Mental models table already contains data. Skipping seed operation.');
    return true;
  }
  
  // Transform mental models to Supabase format
  const modelsData = mentalModels.map(model => transformMentalModelToSupabase(model));
  
  // Insert mental models
  const { error } = await supabase
    .from('mental_models')
    .insert(modelsData);
  
  if (error) {
    console.error('Error seeding mental models:', error);
    toast.error('Error seeding mental models to database');
    return false;
  }
  
  console.log('Mental models seeded successfully');
  return true;
};

// Helper function to seed model versions
const seedModelVersions = async () => {
  // Check if the versions table has data
  const { count, error: countError } = await supabase
    .from('mental_model_versions')
    .select('*', { count: 'exact', head: true });
  
  if (countError) {
    console.error('Error checking versions data:', countError);
    return false;
  }
  
  // If we already have data, no need to seed
  if (count && count > 0) {
    console.log('Versions table already contains data. Skipping seed operation.');
    return true;
  }
  
  // Insert versions
  const { error } = await supabase
    .from('mental_model_versions')
    .insert(modelVersions);
  
  if (error) {
    console.error('Error seeding model versions:', error);
    toast.error('Error seeding model versions to database');
    return false;
  }
  
  console.log('Model versions seeded successfully');
  return true;
};

// Helper function to seed questions
const seedQuestions = async () => {
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
  
  // Insert questions
  const { error } = await supabase
    .from('questions')
    .insert(questions);
  
  if (error) {
    console.error('Error seeding questions:', error);
    toast.error('Error seeding questions to database');
    return false;
  }
  
  console.log('Questions seeded successfully');
  return true;
};

// Helper function to seed inspirations
const seedInspirations = async () => {
  // Check if the inspirations table has data
  const { count, error: countError } = await supabase
    .from('inspirations')
    .select('*', { count: 'exact', head: true });
  
  if (countError) {
    console.error('Error checking inspirations data:', countError);
    return false;
  }
  
  // If we already have data, no need to seed
  if (count && count > 0) {
    console.log('Inspirations table already contains data. Skipping seed operation.');
    return true;
  }
  
  // Insert inspirations
  const { error } = await supabase
    .from('inspirations')
    .insert(inspirations);
  
  if (error) {
    console.error('Error seeding inspirations:', error);
    toast.error('Error seeding inspirations to database');
    return false;
  }
  
  console.log('Inspirations seeded successfully');
  return true;
};
