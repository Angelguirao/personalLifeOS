
import { useCallback } from 'react';
import { useWatch, Control } from 'react-hook-form';
import { toast } from 'sonner';
import { MentalModelFormValues } from '../types';
import { JsonTabType } from './JsonTabSelector';

interface UseJsonImporterProps {
  control: Control<MentalModelFormValues>;
  defaultValues: MentalModelFormValues;
  reset: (values: MentalModelFormValues) => void;
}

export const useJsonImporter = ({ control, defaultValues, reset }: UseJsonImporterProps) => {
  const currentValues = useWatch({ control });
  
  // Handle JSON import
  const handleImport = useCallback((jsonStr: string, activeTab: JsonTabType = "complete") => {
    try {
      const parsedData = JSON.parse(jsonStr);
      
      // Merge with default values based on the active tab
      if (activeTab === "complete") {
        reset({
          ...defaultValues,
          ...parsedData,
        });
      } else if (activeTab === "model") {
        const { connections, relatedQuestions, ...current } = currentValues;
        reset({
          ...current,
          ...parsedData,
          connections,
          relatedQuestions
        });
      } else if (activeTab === "connections") {
        reset({
          ...currentValues,
          connections: parsedData.connections || []
        });
      } else if (activeTab === "inspirations") {
        if (parsedData.bookInfo) {
          reset({
            ...currentValues,
            bookTitle: parsedData.bookInfo.title || '',
            bookAuthor: parsedData.bookInfo.author || '',
            bookLink: parsedData.bookInfo.link || ''
          });
        }
      } else if (activeTab === "questions") {
        // Handle open questions (convert array back to newline-separated string)
        let openQuestionsStr = '';
        if (parsedData.openQuestions && Array.isArray(parsedData.openQuestions)) {
          openQuestionsStr = parsedData.openQuestions.join('\n');
        }
        
        reset({
          ...currentValues,
          openQuestions: openQuestionsStr,
          relatedQuestions: parsedData.relatedQuestions || []
        });
      } else if (activeTab === "versioning") {
        if (parsedData.versionInfo) {
          reset({
            ...currentValues,
            createNewVersion: parsedData.versionInfo.createNewVersion,
            versionNote: parsedData.versionInfo.versionNote || ''
          });
        }
      }
      
      toast.success('Form data imported successfully');
    } catch (error) {
      console.error('Error parsing JSON:', error);
      toast.error('Invalid JSON format');
    }
  }, [currentValues, defaultValues, reset]);

  return { handleImport };
};
