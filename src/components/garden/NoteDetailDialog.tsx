
import React from 'react';
import { GardenNote } from '../../lib/garden/types/legacy-types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Sprout, Link2, Book } from 'lucide-react';

interface NoteDetailDialogProps {
  note: GardenNote | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const NoteDetailDialog = ({ note, isOpen, onOpenChange }: NoteDetailDialogProps) => {
  if (!note) return null;
  
  const getStageColor = (stage: string) => {
    switch(stage) {
      case "seedling": return "text-green-400";
      case "growing": return "text-green-500";
      case "evergreen":
      case "mature": return "text-green-600";
      default: return "text-green-400";
    }
  };

  // Check if this mental model references a book
  const hasBookReference = note.fullContent && 
    (note.fullContent.includes("book") || 
     note.connections.includes("book") ||
     note.fullContent.match(/['"].*['"]/) !== null);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl font-semibold">{note.title}</DialogTitle>
          <DialogDescription>
            {note.stage === "seedling" ? "An emerging mental model" : 
             note.stage === "growing" ? "A developing mental model" :
             "A fundamental mental model"}
          </DialogDescription>
        </DialogHeader>
        <div className="mb-3 flex items-center text-xs text-muted-foreground">
          <div className="flex items-center">
            <Sprout size={16} className={getStageColor(note.stage)} />
            <span className="ml-1 capitalize">{note.stage}</span>
          </div>
          <span className="mx-2">•</span>
          <time dateTime={note.lastUpdated}>
            Updated: {new Date(note.lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
          </time>
        </div>
        
        <div className="mt-4 space-y-4">
          {/* Show subtitle if available */}
          {note.subtitle && (
            <p className="text-muted-foreground italic">
              {note.subtitle}
            </p>
          )}
          
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p>
              {note.fullContent}
            </p>
          </div>
          
          {hasBookReference && (
            <div className="mt-4 pt-2 border-t border-border">
              <div className="flex items-center text-sm text-muted-foreground">
                <Book size={14} className="mr-2" />
                <span>Related to book or published work</span>
              </div>
            </div>
          )}
          
          {note.connections && note.connections.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
              <span className="text-xs text-muted-foreground mr-2">Connected concepts:</span>
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
