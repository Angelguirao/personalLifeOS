
import supabase, { isSupabaseAvailable } from './client';
import { Connection } from './types';
import { tableExists } from './utils/table-utils';
import { toast } from 'sonner';

// Transform a Supabase connection to our Connection type
const transformConnectionFromSupabase = (data: any): Connection => {
  return {
    id: data.id,
    sourceId: data.source_id,
    targetId: data.target_id,
    strength: data.strength / 10, // Convert 0-10 scale to 0-1
    relationship: data.relationship_type_id // Map relationship type ID to name if needed
  };
};

// Transform our Connection type to Supabase format
const transformConnectionToSupabase = (connection: Omit<Connection, 'id'>): any => {
  return {
    source_id: connection.sourceId,
    target_id: connection.targetId,
    strength: Math.round(connection.strength * 10), // Convert 0-1 scale to 0-10
    relationship_type_id: connection.relationship
  };
};

// Get all connections
export const getConnections = async (): Promise<Connection[]> => {
  console.log('Fetching connections...');
  
  if (!isSupabaseAvailable()) {
    console.error('Supabase client not initialized.');
    toast.error('Database connection not available');
    return [];
  }
  
  try {
    const connectionsTableExists = await tableExists('relationships.connections');
    if (!connectionsTableExists) {
      console.error('Connections table does not exist');
      toast.error('Database tables not properly configured');
      return [];
    }
    
    console.log('Fetching connections from Supabase...');
    const { data, error } = await supabase
      .from('relationships.connections')
      .select('*');
    
    if (error) {
      console.error('Supabase error:', error);
      toast.error('Failed to load connections from database');
      return [];
    }
    
    console.log('Supabase connections data:', data);
    
    if (!data || data.length === 0) {
      console.log('No connections found in Supabase');
      return [];
    }
    
    return data.map(transformConnectionFromSupabase);
  } catch (error) {
    console.error('Error fetching connections:', error);
    toast.error('Error fetching connections');
    return [];
  }
};

// The rest of the functions follow the same pattern - update table name to 'relationships.connections'
// Only showing the modified sections

// Create a new connection
export const createConnection = async (connection: Omit<Connection, 'id'>): Promise<Connection> => {
  if (!isSupabaseAvailable()) {
    throw new Error('Cannot create connection: Supabase connection not available');
  }
  
  const supabaseConnection = transformConnectionToSupabase(connection);
  
  const { data, error } = await supabase
    .from('relationships.connections')
    .insert(supabaseConnection)
    .select()
    .single();
  
  if (error) throw error;
  return transformConnectionFromSupabase(data);
};

// Get connections for a specific note
export const getNoteConnections = async (noteId: string): Promise<Connection[]> => {
  if (!isSupabaseAvailable()) {
    return [];
  }
  
  const { data, error } = await supabase
    .from('relationships.connections')
    .select('*')
    .or(`source_id.eq.${noteId},target_id.eq.${noteId}`);
  
  if (error) {
    console.error('Error fetching note connections:', error);
    throw error;
  }
  
  return data.map(transformConnectionFromSupabase);
};

// Update an existing connection
export const updateConnection = async (id: string, updates: Partial<Omit<Connection, 'id'>>): Promise<Connection> => {
  if (!isSupabaseAvailable()) {
    throw new Error('Cannot update connection: Supabase connection not available');
  }
  
  const supabaseUpdates: any = {};
  
  if (updates.sourceId !== undefined) supabaseUpdates.source_id = updates.sourceId;
  if (updates.targetId !== undefined) supabaseUpdates.target_id = updates.targetId;
  if (updates.strength !== undefined) supabaseUpdates.strength = Math.round(updates.strength * 10);
  if (updates.relationship !== undefined) supabaseUpdates.relationship_type_id = updates.relationship;
  
  const { data, error } = await supabase
    .from('relationships.connections')
    .update(supabaseUpdates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return transformConnectionFromSupabase(data);
};

// Delete a connection
export const deleteConnection = async (id: string): Promise<void> => {
  if (!isSupabaseAvailable()) {
    throw new Error('Cannot delete connection: Supabase connection not available');
  }
  
  const { error } = await supabase
    .from('relationships.connections')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};
