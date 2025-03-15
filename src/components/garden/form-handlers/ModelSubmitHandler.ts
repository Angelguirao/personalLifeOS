
import { MentalModelFormValues } from '@/components/garden/forms/types';
import { MentalModel } from '@/lib/garden/types';
import { createMentalModel, updateMentalModel } from '@/lib/garden/api';
import { toast } from 'sonner';
import supabase from '@/lib/garden/client';
import { processFormDataForSubmission } from '@/lib/garden/utils/form-processors';
import { handleConnections } from './ConnectionHandler';
import { handleBookInspiration } from './InspirationHandler';
import { v4 as uuidv4 } from 'uuid';
import { tableExists } from '@/lib/garden/utils/table-utils';

export const handleModelSubmit = async (
  formData: MentalModelFormValues, 
  model: MentalModel | undefined,
  setIsSubmitting: (isSubmitting: boolean) => void,
  onOpenChange: (open: boolean) => void,
  onSuccess: () => void
) => {
  setIsSubmitting(true);
  try {
    // Validate required fields - only title is required
    if (!formData.title || formData.title.trim() === '') {
      toast.error('Title is required');
      setIsSubmitting(false);
      return;
    }
    
    // Check if database tables exist before proceeding
    if (supabase) {
      // Check if the required table exists
      const tablesExist = await tableExists('distinctions.distinctions');
      if (!tablesExist) {
        toast.error('Database tables not properly set up. Please run the setup script.');
        setIsSubmitting(false);
        onOpenChange(false);
        return;
      }
    }
    
    // Check authentication status before proceeding
    if (supabase) {
      const { data: { session }, error: authError } = await supabase.auth.getSession();
      if (authError) {
        console.error('Authentication error:', authError);
        toast.error(`Authentication error: ${authError.message}`);
        setIsSubmitting(false);
        onOpenChange(false);
        return;
      }
      
      if (!session) {
        toast.error('You must be logged in to perform this action');
        setIsSubmitting(false);
        onOpenChange(false);
        return;
      }
    } else {
      toast.error('Database connection is not available');
      setIsSubmitting(false);
      onOpenChange(false);
      return;
    }
    
    // Process the form data into the format needed for the API
    const processedData = processFormDataForSubmission(formData);
    console.log('Processed form data for submission:', processedData);
    
    let modelId: string;
    
    if (model) {
      // Update existing model
      console.log('Updating existing model:', model.id);
      try {
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
            toast.warning('Updated model but failed to create version');
          }
        }
        
        toast.success('Mental model updated successfully');
      } catch (updateError) {
        console.error('Error updating mental model:', updateError);
        const errorMessage = updateError instanceof Error 
          ? updateError.message 
          : 'Unknown error';
        toast.error(`Failed to update mental model: ${errorMessage}`);
        setIsSubmitting(false);
        return;
      }
    } else {
      // Create new model with a generated UUID
      console.log('Creating new mental model');
      // Ensure the model has an ID
      if (!processedData.id) {
        processedData.id = uuidv4();
      }
      
      try {
        const newModel = await createMentalModel(processedData);
        modelId = newModel.id;
        toast.success('Mental model created successfully');
      } catch (createError) {
        console.error('Error creating mental model:', createError);
        const errorMessage = createError instanceof Error 
          ? createError.message 
          : 'Unknown error';
        
        // Provide more user-friendly error messages based on common issues
        if (errorMessage.includes('table does not exist')) {
          toast.error('Database tables not set up. Please run the setup script.');
        } else if (errorMessage.includes('permission denied')) {
          toast.error('Database permission error. Please check your policies.');
        } else if (errorMessage.includes('authentication')) {
          toast.error('Authentication error. Please log in again.');
        } else {
          toast.error(`Failed to create mental model: ${errorMessage}`);
        }
        
        setIsSubmitting(false);
        return;
      }
    }
    
    try {
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
    } catch (relatedDataError) {
      console.error('Error saving related data:', relatedDataError);
      toast.warning('Model saved but some related data could not be updated');
    }
    
    onOpenChange(false);
    onSuccess();
  } catch (error) {
    console.error('Error saving mental model:', error);
    
    // Provide more specific error messages based on the error
    if (error instanceof Error) {
      if (error.message.includes('table does not exist') || error.message.includes('42P01')) {
        toast.error('Database table not found. Please run the setup script.');
      } else if (error.message.includes('id')) {
        toast.error('Error with model ID generation. Please try again.');
      } else if (error.message.includes('not-null constraint')) {
        toast.error('Missing required fields. Please check the form.');
      } else if (error.message.includes('relation')) {
        toast.error('Database error: Table not found. Please ensure database is properly set up.');
      } else if (error.message.includes('authentication')) {
        toast.error('Authentication error. Please log in again.');
      } else {
        toast.error(`Failed to save mental model: ${error.message}`);
      }
    } else {
      toast.error('Failed to save mental model due to an unknown error');
    }
  } finally {
    setIsSubmitting(false);
  }
};
