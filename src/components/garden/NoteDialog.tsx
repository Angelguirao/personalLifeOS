
import React, { useState } from 'react';
import { Link2, Sprout, X, Book, Calendar, Star, BrainCircuit, MessageCircleQuestion, Layers, Eye, Pencil, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '../ui/dialog';
import { MentalModel } from '../../lib/garden/types/mental-model-types';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import ModelFormDialog from './ModelFormDialog';
import { deleteMentalModel } from '@/lib/garden/api';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import supabase from '@/lib/garden/client';

interface NoteDialogProps {
  note: MentalModel;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onModelDeleted?: () => void;
}

const NoteDialog = ({ note, isOpen, onOpenChange, onModelDeleted }: NoteDialogProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  React.useEffect(() => {
    // Check authentication status
    const checkAuthStatus = async () => {
      if (!supabase) return;
      
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setIsAuthenticated(!!session);
      } catch (error) {
        console.error('Error checking auth status:', error);
      }
    };

    checkAuthStatus();
    
    // Subscribe to auth changes
    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setIsAuthenticated(!!session);
      });
      
      return () => subscription.unsubscribe();
    }
  }, []);

  const handleDelete = async () => {
    try {
      await deleteMentalModel(note.id);
      toast.success('Mental model deleted successfully');
      setIsDeleteDialogOpen(false);
      onOpenChange(false);
      if (onModelDeleted) onModelDeleted();
    } catch (error) {
      console.error('Error deleting mental model:', error);
      toast.error('Failed to delete mental model');
    }
  };

  const getStageColor = (stage: string) => {
    switch(stage) {
      case "seedling": return "text-green-400";
      case "growing": return "text-green-500";
      case "evergreen":
      case "mature": return "text-green-600";
      default: return "text-green-400";
    }
  };

  const getConfidenceColor = (confidence: string) => {
    switch(confidence) {
      case "hypothesis": return "text-blue-400";
      case "working": return "text-blue-500";
      case "established": return "text-blue-600";
      case "fundamental": return "text-blue-700";
      default: return "text-blue-500";
    }
  };

  // Format date helper function
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch (e) {
      return 'Invalid date';
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl font-semibold">{note.title}</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              {note.subtitle || "A digital garden note"}
            </DialogDescription>
          </DialogHeader>
          
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
          
          {/* Admin actions */}
          {isAuthenticated && (
            <div className="absolute right-14 top-4 flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditDialogOpen(true)}
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                title="Edit mental model"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDeleteDialogOpen(true)}
                className="h-8 w-8 text-destructive/70 hover:text-destructive"
                title="Delete mental model"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
          
          {/* Metadata section */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-y-2 border-b pb-3">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
              {/* Development stage */}
              <div className="flex items-center">
                <Sprout size={16} className={getStageColor(note.developmentStage || note.stage || 'seedling')} />
                <span className="ml-1 capitalize">{note.developmentStage || note.stage || 'seedling'}</span>
              </div>
              
              {/* Confidence level */}
              {note.confidenceLevel && (
                <div className="flex items-center">
                  <Star size={16} className={getConfidenceColor(note.confidenceLevel)} />
                  <span className="ml-1 capitalize">{note.confidenceLevel}</span>
                </div>
              )}
              
              {/* Visibility */}
              {note.visibility && (
                <div className="flex items-center">
                  <Eye size={16} />
                  <span className="ml-1 capitalize">{note.visibility}</span>
                </div>
              )}
              
              {/* Hierarchy level if available */}
              {note.latchAttributes?.hierarchyLevel && (
                <div className="flex items-center">
                  <Layers size={16} />
                  <span className="ml-1">Level {note.latchAttributes.hierarchyLevel}</span>
                </div>
              )}
            </div>
            
            {/* Timestamps */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              {note.timestamps?.created && (
                <div className="flex items-center">
                  <Calendar size={14} className="mr-1" />
                  <span>Created: {formatDate(note.timestamps.created)}</span>
                </div>
              )}
              {note.timestamps?.modified && (
                <div className="flex items-center">
                  <Calendar size={14} className="mr-1" />
                  <span>Updated: {formatDate(note.timestamps.modified)}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Main content section */}
          <div className="mt-4 space-y-6">
            {/* Summary if different from full content */}
            {note.summary && note.summary !== note.fullContent && (
              <div className="font-medium text-sm">
                <p className="italic">{note.summary}</p>
              </div>
            )}
            
            {/* Full content */}
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                {note.fullContent}
              </p>
            </div>
            
            {/* Applications section if available */}
            {note.applications?.examples && note.applications.examples.length > 0 && (
              <div className="mt-6 space-y-2">
                <h3 className="text-sm font-semibold">Applications:</h3>
                <ul className="space-y-1 text-sm">
                  {note.applications.examples.map((example, index) => (
                    <li key={index} className="pl-4 relative before:absolute before:left-0 before:content-['•'] before:text-primary">
                      <span className="font-medium">{example.domain}:</span> {example.description}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Consequences section if available */}
            {note.consequences && (Object.keys(note.consequences).length > 0) && (
              <div className="mt-6 space-y-2">
                <h3 className="text-sm font-semibold">Implications:</h3>
                <div className="space-y-1 text-sm">
                  {note.consequences.personal && (
                    <p><span className="font-medium">Personal:</span> {note.consequences.personal}</p>
                  )}
                  {note.consequences.interpersonal && (
                    <p><span className="font-medium">Interpersonal:</span> {note.consequences.interpersonal}</p>
                  )}
                  {note.consequences.societal && (
                    <p><span className="font-medium">Societal:</span> {note.consequences.societal}</p>
                  )}
                </div>
              </div>
            )}
            
            {/* Origin moment if available */}
            {note.originMoment && (
              <div className="mt-6 p-3 bg-secondary/20 rounded-md">
                <div className="flex items-start text-sm">
                  <BrainCircuit size={14} className="mr-2 mt-0.5 text-primary" />
                  <div>
                    <span className="font-medium">Origin:</span> {formatDate(note.originMoment.datetime)}
                    {note.originMoment.location && <span> at {note.originMoment.location}</span>}
                    {note.originMoment.emotions && note.originMoment.emotions.length > 0 && (
                      <p className="mt-1"><span className="font-medium">Emotions:</span> {note.originMoment.emotions.join(', ')}</p>
                    )}
                    {note.originMoment.perceptions && (
                      <p className="mt-1"><span className="font-medium">Perceptions:</span> {note.originMoment.perceptions}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* Socratic attributes if available */}
            {note.socraticAttributes && Object.keys(note.socraticAttributes).length > 0 && (
              <div className="mt-6 space-y-3">
                <h3 className="text-sm font-semibold flex items-center">
                  <MessageCircleQuestion size={14} className="mr-2 text-primary" />
                  Socratic Analysis
                </h3>
                <div className="space-y-2 text-sm">
                  {note.socraticAttributes.clarification && (
                    <p><span className="font-medium">Clarification:</span> {note.socraticAttributes.clarification}</p>
                  )}
                  {note.socraticAttributes.assumptions && note.socraticAttributes.assumptions.length > 0 && (
                    <div>
                      <span className="font-medium">Assumptions:</span>
                      <ul className="mt-1 pl-4 space-y-1">
                        {note.socraticAttributes.assumptions.map((assumption, index) => (
                          <li key={index} className="relative before:absolute before:left-[-1rem] before:content-['•'] before:text-primary">
                            {assumption}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {note.socraticAttributes.evidence && (
                    <p><span className="font-medium">Evidence:</span> {note.socraticAttributes.evidence}</p>
                  )}
                  {note.socraticAttributes.alternativePerspectives && note.socraticAttributes.alternativePerspectives.length > 0 && (
                    <div>
                      <span className="font-medium">Alternative Perspectives:</span>
                      <ul className="mt-1 pl-4 space-y-1">
                        {note.socraticAttributes.alternativePerspectives.map((perspective, index) => (
                          <li key={index} className="relative before:absolute before:left-[-1rem] before:content-['•'] before:text-primary">
                            {perspective}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {note.socraticAttributes.implications && (
                    <p><span className="font-medium">Implications:</span> {note.socraticAttributes.implications}</p>
                  )}
                </div>
              </div>
            )}
            
            {/* Open questions if available */}
            {note.openQuestions && note.openQuestions.length > 0 && (
              <div className="mt-6 space-y-2">
                <h3 className="text-sm font-semibold">Open Questions:</h3>
                <ul className="space-y-1 text-sm pl-4">
                  {note.openQuestions.map((question, index) => (
                    <li key={index} className="relative before:absolute before:left-[-1rem] before:content-['•'] before:text-primary">
                      {question}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Book reference - using bookInfo directly if available */}
            {note.bookInfo && (
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
            )}
            
            {/* Tags section */}
            {note.tags && note.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                <span className="text-xs text-muted-foreground mr-2">Tags:</span>
                {note.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full bg-secondary/50 text-muted-foreground text-xs">
                    <Link2 size={10} className="mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          <Separator className="my-6" />
          
          <div className="flex justify-center">
            <DialogClose asChild>
              <Button 
                variant="outline" 
                className="gap-2"
              >
                Close
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Edit Dialog */}
      {isEditDialogOpen && (
        <ModelFormDialog
          isOpen={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          model={note}
          onSuccess={() => {
            if (onModelDeleted) onModelDeleted();
            onOpenChange(false);
          }}
        />
      )}
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the mental model "{note.title}". 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default NoteDialog;
