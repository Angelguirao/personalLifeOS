
import React from 'react';
import { Link2, ExternalLink, Sprout } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { GardenNote } from '../../lib/garden/types/legacy-types';

interface NoteDialogProps {
  note: GardenNote;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const NoteDialog = ({ note, isOpen, onOpenChange }: NoteDialogProps) => {
  const getStageColor = (stage: string) => {
    switch(stage) {
      case "seedling": return "text-green-400";
      case "growing": return "text-green-500";
      case "evergreen":
      case "mature": return "text-green-600";
      default: return "text-green-400";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl font-semibold">{note.title}</DialogTitle>
        </DialogHeader>
        <div className="mb-3 flex items-center text-xs text-muted-foreground">
          <div className="flex items-center">
            <Sprout size={16} className={getStageColor(note.stage)} />
            <span className="ml-1 capitalize">{note.stage}</span>
          </div>
          <span className="mx-2">•</span>
          <time dateTime={note.lastUpdated}>Updated: {new Date(note.lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
        </div>
        
        <div className="mt-4 space-y-4">
          <p className="text-muted-foreground">
            {note.bookInfo ? (
              <>
                {note.fullContent.split(note.bookInfo.title)[0]}
                <a 
                  href={note.bookInfo.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {note.bookInfo.title}
                </a>
                {note.fullContent.split(note.bookInfo.title)[1]}
              </>
            ) : (
              note.fullContent
            )}
          </p>
          
          {note.connections && note.connections.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-4">
              <span className="text-xs text-muted-foreground mr-2">Connected ideas:</span>
              {note.connections.map((tag) => (
                <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full bg-secondary/50 text-muted-foreground text-xs">
                  <Link2 size={10} className="mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NoteDialog;
