
import supabase from './client';
import { gardenNotes, gardenConnections } from './data';
import { tableExists, transformNoteToSupabase } from './utils';
import { toast } from 'sonner';

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
      toast.warning('Database tables not found. Using local data instead.');
      return;
    }
    
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
        console.log('Tables already contain data. Skipping seed operation.');
        toast.success('Using data from database');
        return;
      } else {
        console.log('Notes exist but connections are missing. Seeding connections...');
        // If we have notes but no connections, only seed the connections
        await seedConnections();
        toast.success('Connections seeded successfully');
        return;
      }
    }
    
    // If we get here, we need to seed both notes and connections
    // Transform notes to Supabase format
    const notesData = gardenNotes.map(note => transformNoteToSupabase(note));
    
    // Insert notes
    const { error: notesError, data: insertedNotes } = await supabase
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
    
    console.log('Initial data seeded successfully');
    toast.success('Data seeded to database successfully');
  } catch (error) {
    console.error('Error during seeding process:', error);
    toast.error('Error seeding data to database');
  }
};

// Helper function to seed only connections
const seedConnections = async () => {
  // Transform connections to snake_case for Supabase
  const connectionsData = gardenConnections.map(conn => ({
    source_id: conn.sourceId,
    target_id: conn.targetId,
    strength: conn.strength,
    relationship: conn.relationship
  }));
  
  console.log('Seeding connections:', connectionsData);
  
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
