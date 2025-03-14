import supabase from './client';
import { connections } from './data';
import { Connection, SupabaseConnection, RelationshipType } from './types/connection-types';
import { tableExists } from './utils/table-utils';
import { toast } from 'sonner';

// Convert a database connection to a frontend connection
const mapToFrontendConnection = (dbConnection: SupabaseConnection): Connection => ({
  id: dbConnection.id,
  sourceId: dbConnection.source_id,
  targetId: dbConnection.target_id,
  // Convert integer strength (0-10) to decimal (0.0-1.0)
  strength: Number(dbConnection.strength) / 10,
  relationship: dbConnection.relationship
});

// Convert a frontend connection to a database connection
const mapToDatabaseConnection = (frontendConnection: Omit<Connection, 'id'>): Omit<SupabaseConnection, 'id'> => ({
  source_id: frontendConnection.sourceId,
  target_id: frontendConnection.targetId,
  // Convert decimal strength (0.0-1.0) to integer (0-10)
  strength: Math.round(Number(frontendConnection.strength) * 10),
  relationship: frontendConnection.relationship
});

export const getConnections = async (): Promise<Connection[]> => {
  console.log('Fetching connections...');
  
  // Ensure Supabase is initialized
  if (!supabase) {
    throw new Error('Supabase client not initialized');
  }
  
  try {
    // Check if table exists
    const connectionsExist = await tableExists('connections');
    if (!connectionsExist) {
      throw new Error('Connections table does not exist');
    }
    
    console.log('Fetching connections from Supabase...');
    const { data, error } = await supabase
      .from('connections')
      .select('*');
    
    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    
    console.log('Supabase connections data:', data);
    
    if (!data || data.length === 0) {
      console.log('No connections found in Supabase');
      return [];
    }
    
    // Transform from snake_case to camelCase using our mapping function
    return data.map(mapToFrontendConnection);
  } catch (error) {
    console.error('Error fetching connections:', error);
    toast.error('Error fetching connections. Please refresh.');
    // No fallback, just return an empty array
    return [];
  }
};

export const createConnection = async (connection: Omit<Connection, 'id'>): Promise<Connection> => {
  if (!supabase || !(await tableExists('connections'))) {
    throw new Error('Cannot create connection: Supabase connection or table not available');
  }
  
  // Transform to database format using our mapping function
  const supabaseConnection = mapToDatabaseConnection(connection);
  
  console.log('Creating connection with data:', supabaseConnection);
  
  const { data, error } = await supabase
    .from('connections')
    .insert(supabaseConnection)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating connection:', error);
    throw error;
  }
  
  // Transform back to frontend format
  return mapToFrontendConnection(data);
};

// Get all connections for a specific model (either as source or target)
export const getNoteConnections = async (modelId: string): Promise<Connection[]> => {
  if (!supabase || !(await tableExists('connections'))) {
    throw new Error('Supabase connection or table not available');
  }
  
  const { data, error } = await supabase
    .from('connections')
    .select('*')
    .or(`source_id.eq.${modelId},target_id.eq.${modelId}`);
  
  if (error) {
    console.error('Error fetching model connections:', error);
    throw error;
  }
  
  return data.map(mapToFrontendConnection);
};

// Delete a connection
export const deleteConnection = async (connectionId: number): Promise<void> => {
  if (!supabase || !(await tableExists('connections'))) {
    throw new Error('Cannot delete connection: Supabase connection or table not available');
  }
  
  const { error } = await supabase
    .from('connections')
    .delete()
    .eq('id', connectionId);
  
  if (error) {
    console.error('Error deleting connection:', error);
    throw error;
  }
};

// Update an existing connection
export const updateConnection = async (
  connectionId: number, 
  updates: Partial<Omit<Connection, 'id'>>
): Promise<Connection> => {
  if (!supabase || !(await tableExists('connections'))) {
    throw new Error('Cannot update connection: Supabase connection or table not available');
  }
  
  const supabaseUpdates: Partial<Omit<SupabaseConnection, 'id'>> = {};
  
  if (updates.sourceId !== undefined) supabaseUpdates.source_id = updates.sourceId;
  if (updates.targetId !== undefined) supabaseUpdates.target_id = updates.targetId;
  if (updates.relationship !== undefined) supabaseUpdates.relationship = updates.relationship as RelationshipType;
  if (updates.strength !== undefined) {
    // Convert decimal strength to integer for DB
    supabaseUpdates.strength = Math.round(Number(updates.strength) * 10);
  }
  
  const { data, error } = await supabase
    .from('connections')
    .update(supabaseUpdates)
    .eq('id', connectionId)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating connection:', error);
    throw error;
  }
  
  return mapToFrontendConnection(data);
};
