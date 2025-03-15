
import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ModelFormDialog from './ModelFormDialog';
import supabase from '@/lib/garden/client';

interface ModelManagementProps {
  onRefresh: () => void;
}

const ModelManagement = ({ onRefresh }: ModelManagementProps) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
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
    
    // Subscribe to auth changes
    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setIsAuthenticated(!!session);
      });
      
      return () => subscription.unsubscribe();
    }
  }, []);

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
      </div>
      
      {/* Create Dialog */}
      <ModelFormDialog
        isOpen={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSuccess={onRefresh}
      />
    </div>
  );
};

export default ModelManagement;
