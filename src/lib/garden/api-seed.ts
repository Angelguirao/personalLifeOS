
import supabase from './client';
import { gardenNotes, gardenConnections } from './data';
import { tableExists, transformNoteToSupabase } from './utils';

// Seed initial data into Supabase if tables are empty
export const seedInitialData = async () => {
  if (!supabase) return;
  
  console.log('Seeding initial data to Supabase...');
  
  try {
    // First, check if tables exist
    const notesTableExists = await tableExists('garden_notes');
    const connectionsTableExists = await tableExists('garden_connections');
    
    if (!notesTableExists || !connectionsTableExists) {
      console.warn('Required tables do not exist in Supabase. Please create them manually in the Supabase dashboard.');
      console.warn('Using fallback data for now.');
      return;
    }
    
    // Check if the notes table has data
    const { count: notesCount, error: countError } = await supabase
      .from('garden_notes')
      .select('*', { count: 'exact', head: true });
    
    if (countError) {
      console.error('Error checking table data:', countError);
      return;
    }
    
    // If we have data, no need to seed
    if (notesCount && notesCount > 0) {
      console.log('Tables already contain data. Skipping seed operation.');
      return;
    }
    
    // Transform notes to Supabase format
    const notesData = gardenNotes.map(note => transformNoteToSupabase(note));
    console.log('notesData', notesData);
    
    // Insert notes
    const { error: notesError } = await supabase
      .from('garden_notes')
      .insert(notesData);
    
    if (notesError) {
      console.error('Error seeding notes:', notesError);
      return;
    }
    
    // Insert connections
    const { error: connectionsError } = await supabase
      .from('garden_connections')
      .insert(gardenConnections);
    
    if (connectionsError) {
      console.error('Error seeding connections:', connectionsError);
      return;
    }
    
    console.log('Initial data seeded successfully');
  } catch (error) {
    console.error('Error during seeding process:', error);
  }
};
