
import { 
  GardenNote, 
  MentalModel, 
  convertNoteToMentalModel, 
  convertMentalModelToNote,
  Connection
} from './types';

/**
 * Adapter to ensure backward compatibility during the migration
 * from the old GardenNote model to the new MentalModel structure.
 */
export class DataModelAdapter {
  /**
   * Convert an array of legacy GardenNotes to MentalModels
   */
  static notesToModels(notes: GardenNote[]): MentalModel[] {
    return notes.map(note => convertNoteToMentalModel(note));
  }
  
  /**
   * Convert an array of MentalModels back to legacy GardenNotes
   */
  static modelsToNotes(models: MentalModel[]): GardenNote[] {
    return models.map(model => convertMentalModelToNote(model));
  }
  
  /**
   * Find a MentalModel by ID in an array
   */
  static findModelById(models: MentalModel[], id: string): MentalModel | undefined {
    return models.find(model => model.id === id);
  }
  
  /**
   * Find a legacy GardenNote by ID in an array
   */
  static findNoteById(notes: GardenNote[], id: number): GardenNote | undefined {
    return notes.find(note => note.id === id);
  }
  
  /**
   * Enhance connections with additional attributes based on mental models
   */
  static enhanceConnections(
    connections: Connection[], 
    models: MentalModel[]
  ): Connection[] {
    return connections.map(connection => {
      // Here we could enhance each connection with additional information
      // from the mental models, but for now we'll just return the original
      return connection;
    });
  }
}
