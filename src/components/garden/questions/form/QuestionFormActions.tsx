
import React from 'react';
import { Button } from '@/components/ui/button';

interface QuestionFormActionsProps {
  onCancel: () => void;
  isSubmitting?: boolean;
}

export const QuestionFormActions = ({ onCancel, isSubmitting = false }: QuestionFormActionsProps) => {
  return (
    <div className="flex justify-end space-x-2 pt-4">
      <Button type="button" variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Creating...' : 'Create Question'}
      </Button>
    </div>
  );
};
