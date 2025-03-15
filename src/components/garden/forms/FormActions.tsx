
import React from 'react';
import { Button } from '@/components/ui/button';

interface FormActionsProps {
  isSubmitting: boolean;
  onCancel: () => void;
  isUpdate: boolean;
}

export const FormActions = ({ isSubmitting, onCancel, isUpdate }: FormActionsProps) => {
  return (
    <div className="flex justify-end space-x-2 pt-4">
      <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
        Cancel
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : isUpdate ? 'Update Model' : 'Create Model'}
      </Button>
    </div>
  );
};
