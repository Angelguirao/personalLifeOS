
import { useState, useEffect } from 'react';
import { MentalModelFormValues } from '@/components/garden/forms/types';
import { MentalModel, SourceType, RelationshipType } from '@/lib/garden/types';
import { getNoteConnections, getModelInspirations } from '@/lib/garden/api';
import { processModelForForm } from '@/lib/garden/utils/form-processors';

export const useModelForm = (model?: MentalModel) => {
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

  return {
    isSubmitting,
    setIsSubmitting,
    formData,
    setFormData
  };
};
