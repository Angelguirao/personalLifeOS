
import React from 'react';
import NoteCard from './NoteCard';
import { MentalModel } from '@/lib/garden/types';

interface ListViewProps {
  notes: MentalModel[];
  onSelectModel?: (model: MentalModel) => void;
  selectedModelId?: string;
  onRefresh?: () => void;
}

const ListView = ({ notes, onSelectModel, selectedModelId, onRefresh }: ListViewProps) => {
  const handleCardClick = (note: MentalModel) => {
    if (onSelectModel) {
      onSelectModel(note);
    }
  };

  // Sort notes by modified date (latest first)
  const sortedNotes = [...notes].sort((a, b) => {
    const dateA = new Date(a.timestamps?.modified || a.lastUpdated || '');
    const dateB = new Date(b.timestamps?.modified || b.lastUpdated || '');
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {sortedNotes.length === 0 ? (
        <div className="md:col-span-2 p-6 text-center">
          <h3 className="text-lg font-medium mb-2">No mental models found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or create a new mental model.
          </p>
        </div>
      ) : (
        sortedNotes.map((note, index) => (
          <div 
            key={note.id} 
            onClick={() => handleCardClick(note)}
            className={`${selectedModelId === note.id ? 'ring-2 ring-primary ring-offset-2' : ''} rounded-lg transition-all hover:cursor-pointer`}
          >
            <NoteCard note={note} index={index} onRefresh={onRefresh} />
          </div>
        ))
      )}
    </div>
  );
};

export default ListView;
