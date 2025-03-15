
import React from 'react';
import { Book } from 'lucide-react';
import { MentalModel } from '@/lib/garden/types/mental-model-types';

interface BookReferenceSectionProps {
  note: MentalModel;
}

const BookReferenceSection = ({ note }: BookReferenceSectionProps) => {
  if (!note.bookInfo) return null;
  
  return (
    <div className="mt-6 p-3 bg-secondary/20 rounded-md">
      <div className="flex items-center text-sm">
        <Book size={14} className="mr-2 text-primary flex-shrink-0" />
        <span>From: <a 
          href={note.bookInfo.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          {note.bookInfo.title}
        </a> by {note.bookInfo.author}</span>
      </div>
    </div>
  );
};

export default BookReferenceSection;
