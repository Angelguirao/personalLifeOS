
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { MentalModel } from '@/lib/garden/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { mentalModelSchema } from './forms/schema';
import { processModelForForm } from '@/lib/garden/utils/form-processors';
import { FormTabs } from './forms/FormTabs';
import { FormActions } from './forms/FormActions';
import { MentalModelFormValues } from './forms/types';

interface MentalModelFormProps {
  model?: MentalModel;
  initialData?: MentalModelFormValues | null;
  onSubmit: (data: MentalModelFormValues) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

const MentalModelForm = ({ model, initialData, onSubmit, onCancel, isSubmitting }: MentalModelFormProps) => {
  const [activeTab, setActiveTab] = useState("basic");
  
  // Use initialData if provided, otherwise generate default values from model
  const defaultValues = initialData || (model ? processModelForForm(model) : {
    // Basic information
    title: '',
    subtitle: '',
    developmentStage: 'seedling',
    confidenceLevel: 'working',
    summary: '',
    fullContent: '',
    imageUrl: '',
    
    // Tags and categories
    tags: '',
    domains: '',
    frameworks: '',
    applications: '',
    
    // LATCH Framework
    latchLocation: '',
    latchAlphabetical: '',
    latchTime: '',
    latchCategory: '',
    latchHierarchyLevel: '3',
    
    // DSRP Structure
    dsrpDistinctions: '',
    dsrpSystems: '',
    dsrpRelationships: '',
    dsrpPerspectives: '',
    
    // Socratic Attributes
    socraticClarification: '',
    socraticAssumptions: '',
    socraticEvidence: '',
    socraticPerspectives: '',
    socraticImplications: '',
    
    // Origin Moment
    originDatetime: '',
    originLocation: '',
    originEmotions: '',
    originPerceptions: '',
    
    // Consequences
    consequencesPersonal: '',
    consequencesInterpersonal: '',
    consequencesSocietal: '',
    
    // Open Questions
    openQuestions: '',
    
    // Book Info
    bookTitle: '',
    bookAuthor: '',
    bookLink: '',
    
    // Versioning
    versionNote: '',
    createNewVersion: true,
    
    // Visibility
    visibility: 'public',
    
    // JSON data field (initially empty)
    jsonData: '',
    
    // Connections and questions
    connections: [],
    relatedQuestions: []
  });
  
  const form = useForm<MentalModelFormValues>({
    resolver: zodResolver(mentalModelSchema),
    defaultValues,
  });

  // Update form values when initialData changes
  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  const handleSubmit = async (data: MentalModelFormValues) => {
    await onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormTabs 
          control={form.control}
          modelId={model?.id}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          defaultValues={defaultValues}
          resetForm={(values) => form.reset(values)}
        />

        <FormActions 
          isSubmitting={isSubmitting}
          onCancel={onCancel}
          isUpdate={!!model}
        />
      </form>
    </Form>
  );
};

export default MentalModelForm;
