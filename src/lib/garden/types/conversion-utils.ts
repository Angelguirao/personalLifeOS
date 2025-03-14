import { GardenNote } from './legacy-types';
import { MentalModel } from './mental-model-types';

// Helper function to convert legacy GardenNote to new MentalModel
export const convertNoteToMentalModel = (note: GardenNote): MentalModel => {
  // Map stage to development stage
  const developmentStage = (() => {
    switch(note.stage) {
      case 'seedling': return 'seedling';
      case 'growing': return 'growing';
      case 'evergreen': return 'mature';
      default: return 'seedling';
    }
  })();

  return {
    id: note.id.toString(),
    title: note.title,
    summary: note.summary,
    fullContent: note.fullContent,
    developmentStage,
    confidenceLevel: 'working', // Default
    tags: note.connections,
    timestamps: {
      created: note.lastUpdated,
      modified: note.lastUpdated,
    },
    latchAttributes: {
      hierarchyLevel: 3, // Default middle level
    },
    visibility: 'public', // Default
    // Keep legacy fields for compatibility
    stage: note.stage,
    lastUpdated: note.lastUpdated,
  };
};

export const convertMentalModelToNote = (model: MentalModel): GardenNote => {
  return {
    id: typeof model.id === 'string' ? parseInt(model.id.replace(/-/g, '').substring(0, 9), 16) % 100000 : parseInt(model.id),
    title: model.title,
    subtitle: model.subtitle,
    summary: model.summary,
    fullContent: model.fullContent,
    stage: model.stage || (model.developmentStage as 'seedling' | 'growing' | 'evergreen'),
    lastUpdated: model.lastUpdated || model.timestamps.modified,
    connections: model.tags,
    // We no longer automatically create bookInfo, as our mental models now treat books as references
    // rather than being directly about books
    bookInfo: undefined
  };
};
