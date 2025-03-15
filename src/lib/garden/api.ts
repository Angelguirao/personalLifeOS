
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

// Export questions API functions (new)
export {
  getQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestionsForModel
} from './api-questions';

// Export inspirations API functions
export {
  getInspirations,
  getModelInspirations,
  createInspiration,
  updateInspiration,
  deleteInspiration
} from './api-inspirations';

// Export systems API functions
export {
  getSystems,
  getSystemById,
  createSystem,
  updateSystem,
  deleteSystem,
  getSystemModelRelations,
  createSystemModelRelation,
  deleteSystemModelRelation
} from './systems';

// Export utility functions if needed externally
export {
  tableExists,
  transformNoteFromSupabase,
  transformNoteToSupabase,
  transformMentalModelFromSupabase,
  transformMentalModelToSupabase
} from './utils';

// Export seeding functionality - maintaining this export but with reduced functionality
export { seedInitialData } from './api-seed';

// Export adapter for data model conversion
export { DataModelAdapter } from './adapters';
