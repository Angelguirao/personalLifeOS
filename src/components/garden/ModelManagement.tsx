
import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Lock } from 'lucide-react';
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

  const handleLoginClick = async () => {
    if (!supabase) {
      toast.error('Supabase is not configured properly');
      return;
    }

    // Show a simple signin modal with email/password
    const email = prompt('Enter your admin email:');
    const password = prompt('Enter your password:');
    
    if (!email || !password) return;
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      toast.success('Signed in successfully');
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error signing in:', error);
      toast.error('Invalid credentials');
    }
  };

  const handleLogout = async () => {
    if (!supabase) return;
    
    try {
      await supabase.auth.signOut();
      setIsAuthenticated(false);
      toast.success('Signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out');
    }
  };

  if (isAuthLoading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="h-9 w-24 bg-muted animate-pulse rounded-md"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-between w-full">
        <div className="text-sm text-muted-foreground flex items-center">
          <Lock size={14} className="mr-1.5" />
          Manager access is restricted
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleLoginClick}
        >
          Admin Login
        </Button>
      </div>
    );
  }

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
      
      <Button
        variant="ghost"
        size="sm"
        onClick={handleLogout}
      >
        Sign Out
      </Button>
      
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
