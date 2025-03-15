
import React from 'react';
import { Control } from 'react-hook-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BasicInfoTab } from './BasicInfoTab';
import { MetadataTab } from './MetadataTab';
import { AnalysisTab } from './AnalysisTab';
import { QuestionsTab } from './QuestionsTab';
import { InspirationsTab } from './InspirationsTab';
import { VersioningTab } from './VersioningTab';
import { JsonTab } from './JsonTab';
import { ConnectionsTab } from './ConnectionsTab';
import { MentalModelFormValues } from './types';

interface FormTabsProps {
  control: Control<MentalModelFormValues>;
  modelId?: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  defaultValues: MentalModelFormValues;
  resetForm: (values: MentalModelFormValues) => void;
}

export const FormTabs = ({
  control,
  modelId,
  activeTab,
  setActiveTab,
  defaultValues,
  resetForm
}: FormTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-2 md:grid-cols-8 mb-4">
        <TabsTrigger value="basic">Basic</TabsTrigger>
        <TabsTrigger value="metadata">Metadata</TabsTrigger>
        <TabsTrigger value="analysis">Analysis</TabsTrigger>
        <TabsTrigger value="connections">Connections</TabsTrigger>
        <TabsTrigger value="questions">Questions</TabsTrigger>
        <TabsTrigger value="inspirations">Inspirations</TabsTrigger>
        <TabsTrigger value="versioning">Versioning</TabsTrigger>
        <TabsTrigger value="json">JSON</TabsTrigger>
      </TabsList>
      
      {/* Basic Information Tab (now includes Origin) */}
      <TabsContent value="basic" className="space-y-4">
        <BasicInfoTab control={control} />
      </TabsContent>
      
      {/* Metadata Tab */}
      <TabsContent value="metadata" className="space-y-4">
        <MetadataTab control={control} />
      </TabsContent>
      
      {/* Analysis Tab */}
      <TabsContent value="analysis" className="space-y-4">
        <AnalysisTab control={control} />
      </TabsContent>
      
      {/* Connections Tab */}
      <TabsContent value="connections" className="space-y-4">
        <ConnectionsTab control={control} modelId={modelId} />
      </TabsContent>
      
      {/* Questions Tab */}
      <TabsContent value="questions" className="space-y-4">
        <QuestionsTab control={control} />
      </TabsContent>
      
      {/* Inspirations Tab */}
      <TabsContent value="inspirations" className="space-y-4">
        <InspirationsTab control={control} />
      </TabsContent>
      
      {/* Versioning Tab */}
      <TabsContent value="versioning" className="space-y-4">
        <VersioningTab control={control} />
      </TabsContent>
      
      {/* JSON Tab */}
      <TabsContent value="json" className="space-y-4">
        <JsonTab 
          control={control} 
          defaultValues={defaultValues} 
          reset={resetForm} 
        />
      </TabsContent>
    </Tabs>
  );
};
