
import React from 'react';
import { GardenNote, MentalModel, convertMentalModelToNote } from '../../lib/garden/types';
import NoteCard from './NoteCard';
import { DataModelAdapter } from '../../lib/garden/adapters';

interface ListViewProps {
  notes: GardenNote[] | MentalModel[];
}

const ListView = ({ notes }: ListViewProps) => {
  // Check if the notes are already GardenNotes or if we need to convert from MentalModels
  const gardensNotes: GardenNote[] = 
    notes.length > 0 && 'developmentStage' in notes[0] 
      ? DataModelAdapter.modelsToNotes(notes as MentalModel[])
      : notes as GardenNote[];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {gardensNotes.map((note, index) => (
        <NoteCard key={note.id} note={note} index={index} />
      ))}
    </div>
  );
};

export default ListView;
