
import supabase from '../client';
import { gardenNotes, connections } from '../data';
import { SupabaseConnection } from '../types';
import { tableExists, transformNoteToSupabase } from '../utils';
import { toast } from 'sonner';
import { seedConnections } from './seed-connections';

export const seedLegacyData = async () => {
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
