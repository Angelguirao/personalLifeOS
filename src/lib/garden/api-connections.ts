
import supabase from './client';
import { gardenConnections } from './data';
import { Connection } from './types';
import { tableExists } from './utils';
import { toast } from 'sonner';

export const getConnections = async (): Promise<Connection[]> => {
  console.log('Fetching connections...');
  
  // If Supabase is not initialized, return fallback data
  if (!supabase) {
    console.log('Using fallback connections data');
    return gardenConnections;
  }
  
  try {
    // Check if tables exist
    const connectionsExist = await tableExists('garden_connections');
    if (!connectionsExist) {
      console.log('Connections table does not exist, using fallback data');
      return gardenConnections;
    }
    
    console.log('Fetching connections from Supabase...');
    const { data, error } = await supabase
      .from('garden_connections')
      .select('*');
    
    if (error) {
      console.error('Supabase error:', error);
      toast.error('Failed to load connections from database');
      return gardenConnections; // Return fallback data on error
    }
    
    console.log('Supabase connections data:', data);
    
    if (!data || data.length === 0) {
      console.log('No connections found in Supabase, using fallback data');
      return gardenConnections;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching connections:', error);
    toast.error('Error fetching connections');
    // Fallback to the sample data if there's an error
    return gardenConnections;
  }
};

export const createConnection = async (connection: Omit<Connection, 'id'>): Promise<Connection> => {
  if (!supabase || !(await tableExists('garden_connections'))) {
    throw new Error('Cannot create connection: Supabase connection or table not available');
  }
  
  const { data, error } = await supabase
    .from('garden_connections')
    .insert(connection)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};
