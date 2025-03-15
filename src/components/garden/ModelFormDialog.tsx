
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import MentalModelForm, { MentalModelFormValues } from './MentalModelForm';
import { MentalModel } from '@/lib/garden/types';
import { 
  createMentalModel, 
  updateMentalModel, 
  getConnections,
  getNoteConnections,
  createConnection,
  updateConnection,
  deleteConnection,
  getModelInspirations,
  createInspiration,
  deleteInspiration
} from '@/lib/garden/api';
import { toast } from 'sonner';
import supabase from '@/lib/garden/client';
import { processFormDataForSubmission, processModelForForm } from '@/lib/garden/utils/form-processors';
import { RelationshipType } from '@/lib/garden/types/connection-types';

interface ModelFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  model?: MentalModel;
  onSuccess: () => void;
}

const ModelFormDialog = ({ isOpen, onOpenChange, model, onSuccess }: ModelFormDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<MentalModelFormValues | null>(null);
  const [connections, setConnections] = useState([]);

  // Load connections and inspirations when editing an existing model
  useEffect(() => {
    const fetchModelData = async () => {
      if (model?.id) {
        try {
          // Fetch connections
          const modelConnections = await getNoteConnections(model.id);
          // Format connections for the form
          const formattedConnections = modelConnections.map(conn => ({
            targetId: conn.targetId === model.id ? conn.sourceId : conn.targetId,
            relationship: conn.relationship,
            strength: conn.strength
          }));
          
          // Update form data with connections
          setFormData(prevData => {
            if (!prevData) return processModelForForm(model);
            return { 
              ...prevData, 
              connections: formattedConnections.map(conn => ({
                targetId: String(conn.targetId), // Ensure targetId is a string
                relationship: conn.relationship as RelationshipType, // Keep as RelationshipType
                strength: conn.strength
              }))
            };
          });
        } catch (error) {
          console.error('Error fetching connections:', error);
        }
      }
    };
    
    if (model) {
      // Initialize form with model data
      setFormData(processModelForForm(model));
      // Fetch connections
      fetchModelData();
    } else {
      // Initialize empty form for new model
      setFormData(null);
    }
  }, [model]);

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
        // First, get existing connections to compare
        const existingConnections = await getNoteConnections(modelId);
        
        // Process each connection
        for (const conn of processedData.connections) {
          // Check if this connection already exists
          const existingConn = existingConnections.find(ec => 
            (ec.sourceId === modelId && ec.targetId === conn.targetId) ||
            (ec.targetId === modelId && ec.sourceId === conn.targetId)
          );
          
          if (existingConn) {
            // Update existing connection if needed
            if (existingConn.strength !== conn.strength || existingConn.relationship !== conn.relationship) {
              await updateConnection(existingConn.id, {
                strength: conn.strength,
                relationship: conn.relationship as RelationshipType
              });
            }
          } else {
            // Create new connection
            await createConnection({
              sourceId: modelId,
              targetId: conn.targetId,
              strength: conn.strength,
              relationship: conn.relationship as RelationshipType
            });
          }
        }
        
        // Delete connections that were removed
        for (const existingConn of existingConnections) {
          const stillExists = processedData.connections.some(conn => 
            conn.targetId === (existingConn.sourceId === modelId ? existingConn.targetId : existingConn.sourceId)
          );
          
          if (!stillExists) {
            await deleteConnection(existingConn.id);
          }
        }
      }
      
      // Handle book info / inspiration if provided
      if (processedData.bookInfo && processedData.bookInfo.title) {
        try {
          // Get existing inspirations for this model
          let existingInspirations = [];
          if (model) {
            existingInspirations = await getModelInspirations(modelId);
          }
          
          // Create or update book inspiration
          const bookInspiration = {
            sourceType: 'book' as SourceType,
            sourceName: processedData.bookInfo.title,
            authorName: processedData.bookInfo.author,
            link: processedData.bookInfo.link,
            mentalModelId: modelId
          };
          
          // Check if we already have a book inspiration for this model
          const existingBookInspiration = existingInspirations.find(
            insp => insp.sourceType === 'book'
          );
          
          if (existingBookInspiration) {
            // Delete old inspiration if book title changed
            if (existingBookInspiration.sourceName !== processedData.bookInfo.title) {
              await deleteInspiration(existingBookInspiration.id);
              await createInspiration(bookInspiration);
            }
          } else {
            // Create new inspiration
            await createInspiration(bookInspiration);
          }
        } catch (error) {
          console.error('Error saving book inspiration:', error);
          // Continue even if inspiration saving fails
        }
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
