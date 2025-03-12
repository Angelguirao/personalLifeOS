
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
      return gardenConnections;
    }
    
    console.log('Supabase connections data:', data);
    
    if (!data || data.length === 0) {
      console.log('No connections found in Supabase, using fallback data');
      return gardenConnections;
    }
    
    // Transform from snake_case to camelCase and ensure strength is a number
    return data.map(conn => ({
      id: conn.id,
      sourceId: conn.source_id,
      targetId: conn.target_id,
      strength: Number(conn.strength), // Ensure strength is a number
      relationship: conn.relationship
    }));
  } catch (error) {
    console.error('Error fetching connections:', error);
    toast.error('Error fetching connections');
    return gardenConnections;
  }
};

export const createConnection = async (connection: Omit<Connection, 'id'>): Promise<Connection> => {
  if (!supabase || !(await tableExists('garden_connections'))) {
    throw new Error('Cannot create connection: Supabase connection or table not available');
  }
  
  // Transform to snake_case for Supabase and ensure strength is a number
  const supabaseConnection = {
    source_id: connection.sourceId,
    target_id: connection.targetId,
    strength: Number(connection.strength), // Convert to number to ensure proper format
    relationship: connection.relationship
  };
  
  const { data, error } = await supabase
    .from('garden_connections')
    .insert(supabaseConnection)
    .select()
    .single();
  
  if (error) throw error;
  
  // Transform back to camelCase
  return {
    id: data.id,
    sourceId: data.source_id,
    targetId: data.target_id,
    strength: Number(data.strength), // Ensure strength is a number
    relationship: data.relationship
  };
};
