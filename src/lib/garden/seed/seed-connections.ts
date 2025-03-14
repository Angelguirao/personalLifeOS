
import supabase from '../client';
import { connections } from '../data';
import { SupabaseConnection } from '../types';
import { toast } from 'sonner';

export const seedConnections = async () => {
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
