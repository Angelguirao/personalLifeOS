
// Export all types
export * from './types';

// Export data for direct access if needed
export { 
  gardenNotes, 
  connections,
  mentalModels,
  questions,
  inspirations,
  modelVersions
} from './data';

// Export the Supabase client and helper functions
export { default as supabase, isSupabaseAvailable } from './client';

// Export notes API functions (legacy)
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

// Export mental models API functions (new)
export {
  getMentalModels,
  getMentalModelById,
  createMentalModel,
  updateMentalModel,
  deleteMentalModel
} from './api-mental-models';

// Export inspirations API functions
export {
  getInspirations,
  getModelInspirations,
  createInspiration,
  updateInspiration,
  deleteInspiration
} from './api-inspirations';

// Export utility functions if needed externally
export {
  tableExists,
  createTablesIfNotExist,
  transformNoteFromSupabase,
  transformNoteToSupabase,
  transformMentalModelFromSupabase,
  transformMentalModelToSupabase
} from './utils';

// Export seeding functionality
export { seedInitialData } from './api-seed';
export { seedLegacyData } from './seed/seed-legacy';
export { seedConnections } from './seed/seed-connections';
export { seedMentalModels } from './seed/seed-models';
export { seedModelVersions } from './seed/seed-versions';
export { seedQuestions } from './seed/seed-questions';
export { seedInspirations } from './seed/seed-inspirations';

// Export adapter for data model conversion
export { DataModelAdapter } from './adapters';
