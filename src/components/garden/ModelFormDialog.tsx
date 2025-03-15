
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import MentalModelForm, { MentalModelFormValues } from './MentalModelForm';
import { MentalModel } from '@/lib/garden/types';
import { createMentalModel, updateMentalModel } from '@/lib/garden/api';
import { toast } from 'sonner';
import supabase from '@/lib/garden/client';

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
      
      // Generate a timestamp
      const now = new Date().toISOString();
      
      // Process tags from comma-separated string to array
      const tagsArray = formData.tags 
        ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '') 
        : [];
      
      if (model) {
        // Update existing model
        await updateMentalModel(model.id, {
          ...formData,
          tags: tagsArray,
          timestamps: {
            ...model.timestamps,
            modified: now
          }
        });
        toast.success('Mental model updated successfully');
      } else {
        // Create new model - ensure all required properties are provided
        await createMentalModel({
          title: formData.title,
          subtitle: formData.subtitle || '',
          developmentStage: formData.developmentStage,
          confidenceLevel: formData.confidenceLevel,
          summary: formData.summary,
          fullContent: formData.fullContent,
          tags: tagsArray,
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
