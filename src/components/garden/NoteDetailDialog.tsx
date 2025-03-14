
import React from 'react';
import { GardenNote } from '../../lib/garden/types/legacy-types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Sprout, Link2 } from 'lucide-react';

interface NoteDetailDialogProps {
  note: GardenNote | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const NoteDetailDialog = ({ note, isOpen, onOpenChange }: NoteDetailDialogProps) => {
  if (!note) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl font-semibold">{note.title}</DialogTitle>
          <DialogDescription>
            A note in your digital garden
          </DialogDescription>
        </DialogHeader>
        <div className="mb-3 flex items-center text-xs text-muted-foreground">
          <div className="flex items-center">
            <Sprout size={16} className={note.stage === 'seedling' ? 'text-green-400' : note.stage === 'growing' ? 'text-green-500' : 'text-green-600'} />
            <span className="ml-1 capitalize">{note.stage}</span>
          </div>
          <span className="mx-2">•</span>
          <time dateTime={note.lastUpdated}>
            Updated: {new Date(note.lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </time>
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

export default NoteDetailDialog;
