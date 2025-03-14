
// Export all types
export * from './types';

// Export data for direct access if needed
export { 
  gardenNotes, 
  gardenConnections,
  mentalModels,
  questions,
  inspirations 
} from './data';

// Export the Supabase client
export { default as supabase } from './client';

// Export notes API functions
export {
  getNotes,
  getNoteById,
  createNote,
  updateNote
} from './api-notes';

// Export connections API functions
export {
  getConnections,
  createConnection,
  getNoteConnections,
  updateConnection,
  deleteConnection
} from './api-connections';

// Export utility functions if needed externally
export {
  tableExists,
  createTablesIfNotExist,
  transformNoteFromSupabase,
  transformNoteToSupabase
} from './utils';

// Export seeding functionality
export { seedInitialData } from './api-seed';

// Export adapter for data model conversion
export { DataModelAdapter } from './adapters';
