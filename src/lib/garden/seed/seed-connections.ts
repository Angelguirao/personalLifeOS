
import supabase from '../client';
import { connections } from '../data';
import { SupabaseConnection } from '../types/connection-types';
import { tableExists } from '../utils/table-utils';
import { toast } from 'sonner';

export const seedConnections = async () => {
  if (supabase === null) {
    console.log('Supabase client not initialized, cannot seed connections');
    return false;
  }
  
  try {
    // First, delete existing connections
    console.log('Deleting existing connections...');
    const { error: deleteError } = await supabase
      .from('connections')
      .delete()
      .not('id', 'is', null); // Fix syntax: use .not() instead of .is('id', 'not.null')
    
    if (deleteError) {
      console.error('Error deleting existing connections:', deleteError);
      toast.error('Failed to clear existing connections');
      return false;
    }
    
    console.log('Connections table cleared. Seeding with initial data...');
    
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
    
    // Insert connections in batches to avoid request size limits
    const batchSize = 10;
    for (let i = 0; i < connectionsData.length; i += batchSize) {
      const batch = connectionsData.slice(i, i + batchSize);
      const { error } = await supabase
        .from('connections')
        .insert(batch);
      
      if (error) {
        console.error(`Error seeding connections batch ${i}:`, error);
        toast.error('Error seeding connections to database');
        return false;
      }
    }
    
    console.log('Successfully seeded connections data');
    return true;
  } catch (error) {
    console.error('Unexpected error seeding connections:', error);
    toast.error('Error seeding connections to database');
    return false;
  }
};
