
import { useState } from 'react';
import { DistinctionType } from '@/components/garden/ViewModeSelector';
import { toast } from 'sonner';

export function useDistinctionDialogs() {
  const [isCreateModelDialogOpen, setIsCreateModelDialogOpen] = useState(false);
  const [isCreateSystemDialogOpen, setIsCreateSystemDialogOpen] = useState(false);
  const [isCreateQuestionDialogOpen, setIsCreateQuestionDialogOpen] = useState(false);
  const [isDistinctionTypeDialogOpen, setIsDistinctionTypeDialogOpen] = useState(false);

  // Handle distinction type selection
  const handleDistinctionTypeSelect = (type: DistinctionType) => {
    setIsDistinctionTypeDialogOpen(false);
    
    if (type === 'mentalModel') {
      setIsCreateModelDialogOpen(true);
    } else if (type === 'question') {
      setIsCreateQuestionDialogOpen(true);
    } else if (type === 'experience') {
      // Future implementation for experiences
      toast.info('Experience creation coming soon!');
    }
  };

  // Open the distinction type selection dialog
  const handleCreateDistinction = () => {
    setIsDistinctionTypeDialogOpen(true);
  };
  
  return {
    isCreateModelDialogOpen,
    setIsCreateModelDialogOpen,
    isCreateSystemDialogOpen,
    setIsCreateSystemDialogOpen,
    isCreateQuestionDialogOpen,
    setIsCreateQuestionDialogOpen,
    isDistinctionTypeDialogOpen,
    setIsDistinctionTypeDialogOpen,
    handleDistinctionTypeSelect,
    handleCreateDistinction
  };
}
