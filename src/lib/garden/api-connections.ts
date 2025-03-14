import supabase from './client';
import { connections } from './data';
import { Connection, SupabaseConnection, RelationshipType } from './types';
import { tableExists } from './utils';
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
  relationship: frontendConnection.relationship as RelationshipType
});

export const getConnections = async (): Promise<Connection[]> => {
  console.log('Fetching connections...');
  
  // If Supabase is not initialized, return fallback data
  if (!supabase) {
    console.log('Using fallback connections data');
    return connections;
  }
  
  try {
    // Check if tables exist
    const connectionsExist = await tableExists('garden_connections');
    if (!connectionsExist) {
      console.log('Connections table does not exist, using fallback data');
      return connections;
    }
    
    console.log('Fetching connections from Supabase...');
    const { data, error } = await supabase
      .from('garden_connections')
      .select('*');
    
    if (error) {
      console.error('Supabase error:', error);
      toast.error('Failed to load connections from database');
      return connections;
    }
    
    console.log('Supabase connections data:', data);
    
    if (!data || data.length === 0) {
      console.log('No connections found in Supabase, using fallback data');
      return connections;
    }
    
    // Transform from snake_case to camelCase using our mapping function
    return data.map(mapToFrontendConnection);
  } catch (error) {
    console.error('Error fetching connections:', error);
    toast.error('Error fetching connections');
    return connections;
  }
};

export const createConnection = async (connection: Omit<Connection, 'id'>): Promise<Connection> => {
  if (!supabase || !(await tableExists('garden_connections'))) {
    throw new Error('Cannot create connection: Supabase connection or table not available');
  }
  
  // Transform to database format using our mapping function
  const supabaseConnection = mapToDatabaseConnection(connection);
  
  console.log('Creating connection with data:', supabaseConnection);
  
  const { data, error } = await supabase
    .from('garden_connections')
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

// Get all connections for a specific note (either as source or target)
export const getNoteConnections = async (noteId: number): Promise<Connection[]> => {
  if (!supabase || !(await tableExists('garden_connections'))) {
    // Filter from local data if Supabase is not available
    return connections.filter(conn => 
      conn.sourceId === noteId || conn.targetId === noteId
    );
  }
  
  const { data, error } = await supabase
    .from('garden_connections')
    .select('*')
    .or(`source_id.eq.${noteId},target_id.eq.${noteId}`);
  
  if (error) {
    console.error('Error fetching note connections:', error);
    throw error;
  }
  
  return data.map(mapToFrontendConnection);
};

// Delete a connection
export const deleteConnection = async (connectionId: number): Promise<void> => {
  if (!supabase || !(await tableExists('garden_connections'))) {
    throw new Error('Cannot delete connection: Supabase connection or table not available');
  }
  
  const { error } = await supabase
    .from('garden_connections')
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
  if (!supabase || !(await tableExists('garden_connections'))) {
    throw new Error('Cannot update connection: Supabase connection or table not available');
  }
  
  const supabaseUpdates: Partial<Omit<SupabaseConnection, 'id'>> = {};
  
  if (updates.sourceId !== undefined) supabaseUpdates.source_id = updates.sourceId;
  if (updates.targetId !== undefined) supabaseUpdates.target_id = updates.targetId;
  if (updates.relationship !== undefined) supabaseUpdates.relationship = updates.relationship;
  if (updates.strength !== undefined) {
    // Convert decimal strength to integer for DB
    supabaseUpdates.strength = Math.round(Number(updates.strength) * 10);
  }
  
  const { data, error } = await supabase
    .from('garden_connections')
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
