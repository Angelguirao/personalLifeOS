
import supabase from '../client';
import { connections } from '../data';
import { SupabaseConnection, RelationshipType } from '../types/connection-types';
import { tableExists } from '../utils/table-utils';
import { toast } from 'sonner';

export const seedConnections = async () => {
  // Check if we already have connection data
  const { count, error: countError } = await supabase
    .from('connections')
    .select('*', { count: 'exact', head: true });
  
  if (countError) {
    console.error('Error checking connections data:', countError);
    return false;
  }
  
  // If we already have data, no need to seed
  if (count && count > 0) {
    console.log('Connections table already contains data. Skipping seed operation.');
    return true;
  }
  
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
    .from('connections')
    .insert(connectionsData);
  
  if (connectionsError) {
    console.error('Error seeding connections:', connectionsError);
    toast.error('Error seeding connections to database');
    return false;
  }
  
  console.log('Successfully seeded connections data');
  return true;
};
