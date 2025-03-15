
import React, { useState } from 'react';
import { Control } from 'react-hook-form';
import { MentalModelFormValues } from './types';
import { 
  JsonTabSelector, 
  JsonTabType,
  JsonDataField,
  JsonActionButtons,
  useJsonGenerator,
  useJsonImporter
} from './json';

interface JsonTabProps {
  control: Control<MentalModelFormValues>;
  defaultValues: MentalModelFormValues;
  reset: (values: MentalModelFormValues) => void;
}

export const JsonTab = ({ control, defaultValues, reset }: JsonTabProps) => {
  const [activeJsonTab, setActiveJsonTab] = useState<JsonTabType>("complete");
  
  // Use custom hooks for JSON generation and import
  const { generateJson } = useJsonGenerator(control);
  const { handleImport } = useJsonImporter({ control, defaultValues, reset });
  
  return (
    <>
      <JsonTabSelector 
        activeTab={activeJsonTab} 
        setActiveTab={setActiveJsonTab} 
      />
      
      <div className="space-y-6">
        <JsonDataField 
          control={control} 
          jsonContent={generateJson(activeJsonTab)} 
        />
        
        <JsonActionButtons 
          onImport={(jsonStr) => handleImport(jsonStr, activeJsonTab)} 
          generateJson={generateJson}
          activeTab={activeJsonTab}
        />
      </div>
    </>
  );
};
