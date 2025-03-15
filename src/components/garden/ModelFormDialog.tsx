
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
      const processStringsToArray = (str?: string) => 
        str ? str.split(',').map(item => item.trim()).filter(item => item !== '') : [];
      
      const tagsArray = processStringsToArray(formData.tags);
      
      // Add domain, framework, and application tags with prefixes
      const domainTags = processStringsToArray(formData.domains).map(d => `domain:${d}`);
      const frameworkTags = processStringsToArray(formData.frameworks).map(f => `framework:${f}`);
      const applicationTags = processStringsToArray(formData.applications).map(a => `application:${a}`);
      
      // Combine all tags
      const allTags = [...tagsArray, ...domainTags, ...frameworkTags, ...applicationTags];
      
      // Prepare LATCH attributes
      const latchAttributes = {
        location: formData.latchLocation,
        alphabeticalIndex: formData.latchAlphabetical,
        time: formData.latchTime,
        category: formData.latchCategory,
        hierarchyLevel: parseInt(formData.latchHierarchyLevel as string) || 3
      };
      
      // Prepare DSRP structure
      const dsrpStructure = {
        distinctions: formData.dsrpDistinctions,
        systemStructure: formData.dsrpSystems,
        relationships: formData.dsrpRelationships ? JSON.parse(`{"text": "${formData.dsrpRelationships}"}`) : undefined,
        perspectives: processStringsToArray(formData.dsrpPerspectives)
      };
      
      // Prepare Socratic attributes
      const socraticAttributes = {
        clarification: formData.socraticClarification,
        assumptions: processStringsToArray(formData.socraticAssumptions),
        evidence: formData.socraticEvidence,
        alternativePerspectives: processStringsToArray(formData.socraticPerspectives),
        implications: formData.socraticImplications
      };
      
      // Prepare consequences
      const consequences = {
        personal: formData.consequencesPersonal,
        interpersonal: formData.consequencesInterpersonal,
        societal: formData.consequencesSocietal
      };
      
      // Prepare book info if provided
      const bookInfo = formData.bookTitle ? {
        title: formData.bookTitle,
        author: formData.bookAuthor || 'Unknown',
        link: formData.bookLink || ''
      } : undefined;
      
      // Process open questions - split by newlines
      const openQuestions = formData.openQuestions
        ? formData.openQuestions.split('\n').map(q => q.trim()).filter(q => q !== '')
        : [];
      
      if (model) {
        // Update existing model
        await updateMentalModel(model.id, {
          title: formData.title,
          subtitle: formData.subtitle,
          developmentStage: formData.developmentStage,
          confidenceLevel: formData.confidenceLevel,
          summary: formData.summary,
          fullContent: formData.fullContent,
          tags: allTags,
          latchAttributes,
          dsrpStructure,
          socraticAttributes,
          consequences,
          openQuestions,
          bookInfo,
          imageUrl: formData.imageUrl,
          visibility: formData.visibility,
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
          tags: allTags,
          timestamps: {
            created: now,
            modified: now,
          },
          latchAttributes,
          dsrpStructure,
          socraticAttributes,
          consequences,
          openQuestions,
          bookInfo,
          imageUrl: formData.imageUrl,
          visibility: formData.visibility,
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
