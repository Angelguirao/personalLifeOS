
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import MentalModelForm from './MentalModelForm';
import { MentalModelFormValues } from './forms/types';
import { MentalModel } from '@/lib/garden/types';
import { useModelForm } from '@/hooks/useModelForm';
import { handleModelSubmit } from './form-handlers/ModelSubmitHandler';

interface ModelFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  model?: MentalModel;
  onSuccess: () => void;
}

const ModelFormDialog = ({ isOpen, onOpenChange, model, onSuccess }: ModelFormDialogProps) => {
  const { isSubmitting, setIsSubmitting, formData } = useModelForm(model);

  const handleSubmit = async (formData: MentalModelFormValues) => {
    await handleModelSubmit(
      formData,
      model,
      setIsSubmitting,
      onOpenChange,
      onSuccess
    );
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
          initialData={formData}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ModelFormDialog;
