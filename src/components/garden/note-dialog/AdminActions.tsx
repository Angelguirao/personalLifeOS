
import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminActionsProps {
  isAuthenticated: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

const AdminActions = ({ isAuthenticated, onEdit, onDelete }: AdminActionsProps) => {
  if (!isAuthenticated) return null;
  
  return (
    <div className="absolute right-14 top-4 flex gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={onEdit}
        className="h-8 w-8 text-muted-foreground hover:text-foreground"
        title="Edit mental model"
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={onDelete}
        className="h-8 w-8 text-destructive/70 hover:text-destructive"
        title="Delete mental model"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default AdminActions;
