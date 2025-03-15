
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import MentalModelForm, { MentalModelFormValues } from './MentalModelForm';
import { MentalModel } from '@/lib/garden/types';
import { createMentalModel, updateMentalModel } from '@/lib/garden/api';
import { toast } from 'sonner';
import supabase from '@/lib/garden/client';
import { processFormDataForSubmission } from '@/lib/garden/utils/form-processors';

interface ModelFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  model?: MentalModel;
  onSuccess: () => void;
}

const ModelFormDialog = ({ isOpen, onOpenChange, model, onSuccess }: ModelFormDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: MentalModelFormValues) => {
    setIsSubmitting(true);
    try {
      // Check authentication status before proceeding
      if (supabase) {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          toast.error('You must be logged in to perform this action');
          setIsSubmitting(false);
          onOpenChange(false);
          return;
        }
      }
      
      // Process the form data into the format needed for the API
      const processedData = processFormDataForSubmission(formData);
      
      if (model) {
        // Update existing model
        await updateMentalModel(model.id, processedData);
        toast.success('Mental model updated successfully');
      } else {
        // Create new model
        await createMentalModel(processedData);
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
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
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
