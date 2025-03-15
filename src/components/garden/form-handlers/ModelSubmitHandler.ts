
import { MentalModelFormValues } from '@/components/garden/forms/types';
import { MentalModel } from '@/lib/garden/types';
import { createMentalModel, updateMentalModel } from '@/lib/garden/api';
import { toast } from 'sonner';
import supabase from '@/lib/garden/client';
import { processFormDataForSubmission } from '@/lib/garden/utils/form-processors';
import { handleConnections } from './ConnectionHandler';
import { handleBookInspiration } from './InspirationHandler';

export const handleModelSubmit = async (
  formData: MentalModelFormValues, 
  model: MentalModel | undefined,
  setIsSubmitting: (isSubmitting: boolean) => void,
  onOpenChange: (open: boolean) => void,
  onSuccess: () => void
) => {
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
    
    let modelId: string;
    
    if (model) {
      // Update existing model
      const updatedModel = await updateMentalModel(model.id, processedData);
      modelId = model.id;
      
      // Create a new version if requested
      if (processedData.versionInfo?.createNewVersion) {
        try {
          // Here you would call your versioning API
          // e.g. await createModelVersion(modelId, processedData.versionInfo.versionNote);
          console.log('Would create new version:', processedData.versionInfo.versionNote);
        } catch (versionError) {
          console.error('Error creating version:', versionError);
          // Continue with the update even if versioning fails
        }
      }
      
      toast.success('Mental model updated successfully');
    } else {
      // Create new model
      const newModel = await createMentalModel(processedData);
      modelId = newModel.id;
      toast.success('Mental model created successfully');
    }
    
    // Handle connections updates if we have a valid model ID
    if (modelId && processedData.connections && processedData.connections.length > 0) {
      await handleConnections(modelId, processedData.connections);
    }
    
    // Handle book info / inspiration if provided
    if (processedData.bookInfo && processedData.bookInfo.title) {
      await handleBookInspiration(modelId, processedData.bookInfo);
    }
    
    // Handle questions if provided
    if (processedData.relatedQuestions && processedData.relatedQuestions.length > 0) {
      // Here you would save related questions
      // e.g. await saveRelatedQuestions(modelId, processedData.relatedQuestions);
      console.log('Would save related questions:', processedData.relatedQuestions);
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
