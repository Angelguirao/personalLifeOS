
import React from 'react';
import { Link2, Sprout, ExternalLink } from 'lucide-react';
import BlurEffect from '../ui/BlurEffect';
import { GardenNote } from '../../lib/garden/types/legacy-types';
import NoteDialog from './NoteDialog';

interface NoteCardProps {
  note: GardenNote;
  index: number;
}

const getStageIcon = (stage: string) => {
  switch(stage) {
    case "seedling":
      return <Sprout size={16} className="text-green-400" />;
    case "growing":
      return <Sprout size={16} className="text-green-500" />;
    case "evergreen":
      return <Sprout size={16} className="text-green-600" />;
    default:
      return <Sprout size={16} />;
  }
};

const NoteCard = ({ note, index }: NoteCardProps) => {
  return (
    <BlurEffect className={`animation-delay-${(index + 1) * 100}`}>
      <article className="glass p-6 h-full transition-transform hover:-translate-y-1">
        <div className="mb-3 flex items-center text-xs text-muted-foreground">
          <div className="flex items-center">
            {getStageIcon(note.stage)}
            <span className="ml-1 capitalize">{note.stage}</span>
          </div>
          <span className="mx-2">•</span>
          <time dateTime={note.lastUpdated}>Updated: {new Date(note.lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
        </div>
        
        <h2 className="font-serif text-xl font-semibold mb-3">
          {note.title}
        </h2>
        
        <p className="text-muted-foreground mb-4">
          {note.bookInfo ? (
            <>
              {note.summary.split(note.bookInfo.title)[0]}
              <a 
                href={note.bookInfo.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {note.bookInfo.title}
              </a>
              {note.summary.split(note.bookInfo.title)[1]}
            </>
          ) : (
            note.summary
          )}
        </p>
        
        <div className="flex flex-col space-y-4">
          <div className="flex flex-wrap gap-2">
            {note.connections && note.connections.map((tag) => (
              <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full bg-secondary/50 text-muted-foreground text-xs">
                <Link2 size={10} className="mr-1" />
                {tag}
              </span>
            ))}
          </div>
          
          <NoteDialog note={note} />
        </div>
      </article>
    </BlurEffect>
  );
};

export default NoteCard;
