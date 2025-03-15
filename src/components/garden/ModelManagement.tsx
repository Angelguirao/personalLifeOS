
import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import ModelFormDialog from './ModelFormDialog';
import { MentalModel } from '@/lib/garden/types';
import { deleteMentalModel } from '@/lib/garden/api';
import { toast } from 'sonner';
import supabase from '@/lib/garden/client';

interface ModelManagementProps {
  selectedModel?: MentalModel;
  onRefresh: () => void;
}

const ModelManagement = ({ selectedModel, onRefresh }: ModelManagementProps) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    // Check authentication status on mount
    const checkAuthStatus = async () => {
      setIsAuthLoading(true);
      if (!supabase) {
        setIsAuthenticated(false);
        setIsAuthLoading(false);
        return;
      }

      try {
        const { data: { session } } = await supabase.auth.getSession();
        setIsAuthenticated(!!session);
      } catch (error) {
        console.error('Error checking auth status:', error);
        setIsAuthenticated(false);
      } finally {
        setIsAuthLoading(false);
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
    if (!selectedModel) return;
    
    try {
      await deleteMentalModel(selectedModel.id);
      toast.success('Mental model deleted successfully');
      onRefresh();
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error('Error deleting mental model:', error);
      toast.error('Failed to delete mental model');
    }
  };

  if (isAuthLoading) {
    return null; // Don't show anything while loading
  }

  if (!isAuthenticated) {
    return null; // Don't show anything if not authenticated
  }

  // Only show management UI when authenticated
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
          size="sm"
          className="gap-1" 
          onClick={() => setIsCreateDialogOpen(true)}
        >
          <Plus size={16} />
          New Model
        </Button>
        
        {selectedModel && (
          <>
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
              onClick={() => setIsEditDialogOpen(true)}
            >
              <Pencil size={16} />
              Edit
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="gap-1 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              <Trash2 size={16} />
              Delete
            </Button>
          </>
        )}
      </div>
      
      {/* Create Dialog */}
      <ModelFormDialog
        isOpen={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSuccess={onRefresh}
      />
      
      {/* Edit Dialog */}
      {selectedModel && (
        <ModelFormDialog
          isOpen={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          model={selectedModel}
          onSuccess={onRefresh}
        />
      )}
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the mental model "{selectedModel?.title}". 
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
    </div>
  );
};

export default ModelManagement;
