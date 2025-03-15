
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '../ui/dialog';
import { MentalModel } from '../../lib/garden/types/mental-model-types';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import ModelFormDialog from './ModelFormDialog';
import { deleteMentalModel } from '@/lib/garden/api';
import { toast } from 'sonner';
import supabase from '@/lib/garden/client';

// Import refactored components
import AdminActions from './note-dialog/AdminActions';
import MetadataDisplay from './note-dialog/MetadataDisplay';
import ContentSections from './note-dialog/ContentSections';
import DeleteConfirmDialog from './note-dialog/DeleteConfirmDialog';

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

  useEffect(() => {
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
          
          {/* Admin actions component */}
          <AdminActions 
            isAuthenticated={isAuthenticated} 
            onEdit={() => setIsEditDialogOpen(true)} 
            onDelete={() => setIsDeleteDialogOpen(true)} 
          />
          
          {/* Metadata display component */}
          <MetadataDisplay note={note} />
          
          {/* Content sections component */}
          <ContentSections note={note} />
          
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
      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDelete}
        title={note.title}
      />
    </>
  );
};

export default NoteDialog;
