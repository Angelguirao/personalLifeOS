
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import MentalModelForm from './MentalModelForm';
import { MentalModel } from '@/lib/garden/types';
import { createMentalModel, updateMentalModel } from '@/lib/garden/api';
import { toast } from 'sonner';

interface ModelFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  model?: MentalModel;
  onSuccess: () => void;
}

const ModelFormDialog = ({ isOpen, onOpenChange, model, onSuccess }: ModelFormDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);
    try {
      // Generate a timestamp
      const now = new Date().toISOString();
      
      if (model) {
        // Update existing model
        await updateMentalModel(model.id, {
          ...formData,
          timestamps: {
            ...model.timestamps,
            modified: now
          }
        });
        toast.success('Mental model updated successfully');
      } else {
        // Create new model
        await createMentalModel({
          ...formData,
          timestamps: {
            created: now,
            modified: now,
          },
          visibility: 'public',
          latchAttributes: {
            hierarchyLevel: 3
          }
        });
        toast.success('Mental model created successfully');
      }
      
      onOpenChange(false);
      onSuccess();
    } catch (error) {
      console.error('Error saving mental model:', error);
      toast.error('Failed to save mental model');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {model ? 'Edit Mental Model' : 'Create New Mental Model'}
          </DialogTitle>
        </DialogHeader>
        
        <MentalModelForm
          model={model}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ModelFormDialog;
