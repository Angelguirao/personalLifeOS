
// This file contains adapter functions for different data formats
import { MentalModel } from './types/mental-model-types';
import { GardenNote } from './types/legacy-types';

/**
 * Adapters for converting between different data models
 */
export class DataModelAdapter {
  /**
   * Convert a mental model to a garden note (for backward compatibility)
   */
  static modelToNote(model: MentalModel): GardenNote {
    return {
      id: model.id, // Keep ID exactly as is
      title: model.title,
      content: model.fullContent || model.summary || '',
      stage: model.developmentStage || model.stage || 'seedling',
      tags: model.tags || [],
      lastUpdated: model.timestamps?.modified || model.lastUpdated || new Date().toISOString(),
      url: '', // Not applicable in new model
    };
  }

  /**
   * Convert multiple mental models to garden notes
   */
  static modelsToNotes(models: MentalModel[]): GardenNote[] {
    return models.map(model => this.modelToNote(model));
  }

  /**
   * Convert a garden note to a minimal mental model
   */
  static noteToModel(note: GardenNote): MentalModel {
    return {
      id: note.id, // Keep ID exactly as is
      title: note.title,
      subtitle: '',
      summary: note.content,
      fullContent: note.content,
      developmentStage: note.stage,
      stage: note.stage, // For backward compatibility
      confidenceLevel: 'working',
      tags: note.tags || [],
      timestamps: {
        created: note.lastUpdated,
        modified: note.lastUpdated
      },
      lastUpdated: note.lastUpdated,
      visibility: 'public'
    };
  }

  /**
   * Convert multiple garden notes to mental models
   */
  static notesToModels(notes: GardenNote[]): MentalModel[] {
    return notes.map(note => this.noteToModel(note));
  }
}
