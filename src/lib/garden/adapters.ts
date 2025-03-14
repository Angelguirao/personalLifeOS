
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
    // Instead of converting ID to number, preserve string ID for connection mapping
    return {
      id: model.id, // Keep ID as string to maintain connections
      title: model.title,
      subtitle: model.subtitle, // Include subtitle
      summary: model.summary || '',
      fullContent: model.fullContent || model.summary || '',
      stage: this.normalizeDevelopmentStage(model.developmentStage || model.stage),
      lastUpdated: model.timestamps?.modified || model.lastUpdated || new Date().toISOString(),
      connections: model.tags || [],
      // Only add bookInfo if it exists in the model
      ...(model.bookInfo ? { bookInfo: model.bookInfo } : {})
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
      id: note.id.toString(), // Ensure ID is a string
      title: note.title,
      subtitle: note.subtitle || '',
      summary: note.summary || '',
      fullContent: note.fullContent || note.summary || '',
      developmentStage: this.normalizeStage(note.stage),
      stage: note.stage, // For backward compatibility
      confidenceLevel: 'working',
      tags: note.connections || [],
      timestamps: {
        created: note.lastUpdated,
        modified: note.lastUpdated
      },
      lastUpdated: note.lastUpdated,
      visibility: 'public',
      latchAttributes: {
        hierarchyLevel: 3
      },
      // Only add bookInfo if it exists in the note
      ...(note.bookInfo ? { bookInfo: note.bookInfo } : {})
    };
  }

  /**
   * Convert multiple garden notes to mental models
   */
  static notesToModels(notes: GardenNote[]): MentalModel[] {
    return notes.map(note => this.noteToModel(note));
  }

  /**
   * Helper to normalize development stage to ensure compatibility
   */
  private static normalizeDevelopmentStage(stage: string | undefined): 'seedling' | 'growing' | 'evergreen' {
    if (!stage) return 'seedling';
    
    if (stage === 'mature' || stage === 'refined') {
      return 'evergreen';
    }
    
    if (stage === 'seedling' || stage === 'growing' || stage === 'evergreen') {
      return stage;
    }
    
    return 'seedling'; // Default fallback
  }

  /**
   * Helper to normalize stage to full development stage type
   */
  private static normalizeStage(stage: string | undefined): 'seedling' | 'growing' | 'evergreen' | 'mature' | 'refined' {
    if (!stage) return 'seedling';
    
    if (stage === 'seedling' || 
        stage === 'growing' || 
        stage === 'evergreen' || 
        stage === 'mature' || 
        stage === 'refined') {
      return stage as 'seedling' | 'growing' | 'evergreen' | 'mature' | 'refined';
    }
    
    return 'seedling'; // Default fallback
  }
}
