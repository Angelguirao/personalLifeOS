
import React from 'react';
import { GardenNote } from '../../lib/garden/types';
import NoteCard from './NoteCard';

interface ListViewProps {
  notes: GardenNote[];
}

const ListView = ({ notes }: ListViewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {notes.map((note, index) => (
        <NoteCard key={note.id} note={note} index={index} />
      ))}
    </div>
  );
};

export default ListView;
