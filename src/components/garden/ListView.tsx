
import React from 'react';
import NoteCard from './NoteCard';
import { MentalModel } from '@/lib/garden/types';

interface ListViewProps {
  notes: MentalModel[];
  onSelectModel?: (model: MentalModel) => void;
  selectedModelId?: string;
}

const ListView = ({ notes, onSelectModel, selectedModelId }: ListViewProps) => {
  const handleCardClick = (note: MentalModel) => {
    if (onSelectModel) {
      onSelectModel(note);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {notes.length === 0 ? (
        <div className="md:col-span-2 p-6 text-center">
          <h3 className="text-lg font-medium mb-2">No mental models found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or create a new mental model.
          </p>
        </div>
      ) : (
        notes.map((note, index) => (
          <div 
            key={note.id} 
            onClick={() => handleCardClick(note)}
            className={`${selectedModelId === note.id ? 'ring-2 ring-primary ring-offset-2' : ''} rounded-lg transition-all hover:cursor-pointer`}
          >
            <NoteCard note={note} index={index} />
          </div>
        ))
      )}
    </div>
  );
};

export default ListView;
