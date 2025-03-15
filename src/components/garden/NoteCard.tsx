
import React, { useState } from 'react';
import { Link2, Sprout, ChevronRight } from 'lucide-react';
import BlurEffect from '../ui/BlurEffect';
import { MentalModel } from '../../lib/garden/types/mental-model-types';
import NoteDialog from './NoteDialog';
import { Button } from '../ui/button';

interface NoteCardProps {
  note: MentalModel;
  index: number;
}

const getStageIcon = (stage: string) => {
  switch(stage) {
    case "seedling":
      return <Sprout size={16} className="text-green-400" />;
    case "growing":
      return <Sprout size={16} className="text-green-500" />;
    case "evergreen":
    case "mature":
      return <Sprout size={16} className="text-green-600" />;
    default:
      return <Sprout size={16} />;
  }
};

const NoteCard = ({ note, index }: NoteCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Extract first sentence for a concise description
  const firstSentence = note.summary.split('.')[0] + '.';
  
  const handleOpenDialog = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDialogOpen(true);
  };
  
  const handleDialogOpenChange = (open: boolean) => {
    console.log("Dialog open state changed to:", open);
    setIsDialogOpen(open);
  };
  
  return (
    <BlurEffect className={`animation-delay-${(index + 1) * 100}`}>
      <article 
        className="glass p-6 h-full transition-transform hover:-translate-y-1 flex flex-col"
      >
        <div className="mb-3 flex items-center text-xs text-muted-foreground">
          <div className="flex items-center">
            {getStageIcon(note.developmentStage || note.stage || 'seedling')}
            <span className="ml-1 capitalize">{note.developmentStage || note.stage || 'seedling'}</span>
          </div>
          <span className="mx-2">•</span>
          <time dateTime={note.timestamps?.modified || note.lastUpdated || ''}>
            Updated: {new Date(note.timestamps?.modified || note.lastUpdated || '').toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })}
          </time>
        </div>
        
        <h2 className="font-serif text-xl font-semibold mb-3">
          {note.title}
        </h2>
        
        <p className="text-muted-foreground mb-6 flex-grow">
          {firstSentence}
        </p>
        
        <div className="flex flex-col space-y-4">
          <div className="flex flex-wrap gap-2">
            {note.tags && note.tags.map((tag) => (
              <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full bg-secondary/50 text-muted-foreground text-xs">
                <Link2 size={10} className="mr-1" />
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex justify-center mt-4">
            <Button 
              variant="ghost" 
              className="text-primary hover:text-primary/90 gap-1"
              onClick={handleOpenDialog}
            >
              Read more
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </article>
      
      <NoteDialog 
        note={note} 
        isOpen={isDialogOpen} 
        onOpenChange={handleDialogOpenChange}
      />
    </BlurEffect>
  );
};

export default NoteCard;
