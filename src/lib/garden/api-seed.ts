
import supabase from './client';
import { gardenNotes, gardenConnections } from './data';
import { tableExists, createTablesIfNotExist } from './utils';

// Seed initial data into Supabase if tables are empty
export const seedInitialData = async () => {
  if (!supabase) return;
  
  console.log('Seeding initial data to Supabase...');
  
  try {
    // First, check if tables exist
    const notesTableExists = await tableExists('garden_notes');
    const connectionsTableExists = await tableExists('garden_connections');
    
    if (!notesTableExists || !connectionsTableExists) {
      console.warn('One or more required tables do not exist in Supabase. Attempting to create...');
      if (!(await createTablesIfNotExist())) {
        console.warn('Failed to create tables. Skipping data seeding.');
        return;
      }
    }
    
    // Directly check if the notes table has data instead of querying column metadata
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
    
    // Insert notes with adjusted field names to match Supabase schema
    const notesData = gardenNotes.map(note => ({
      title: note.title,
      summary: note.summary,
      content: note.fullContent, // Changed from full_content to content
      stage: note.stage,
      last_updated: note.lastUpdated,
      connections: note.connections,
      // Removed book_info field
    }));
    
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
