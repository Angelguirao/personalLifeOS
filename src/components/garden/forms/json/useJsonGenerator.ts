
import { useCallback } from 'react';
import { useWatch } from 'react-hook-form';
import { Control } from 'react-hook-form';
import { MentalModelFormValues } from '../types';
import { JsonTabType } from './JsonTabSelector';

export const useJsonGenerator = (control: Control<MentalModelFormValues>) => {
  // Watch all form fields to generate JSON representation
  const formValues = useWatch({ control });
  
  // Generate formatted JSON representation of the form data
  const generateJson = useCallback((mode: JsonTabType = "complete") => {
    try {
      let data = { ...formValues };
      
      // Filter data based on selected tab
      switch (mode) {
        case "model":
          // Filter out connection and inspiration related fields
          const { connections, relatedQuestions, bookTitle, bookAuthor, bookLink, openQuestions, versionNote, createNewVersion, ...modelData } = data;
          return JSON.stringify(modelData, null, 2);
        
        case "connections":
          return JSON.stringify({ connections: data.connections || [] }, null, 2);
        
        case "inspirations":
          return JSON.stringify({
            bookInfo: data.bookTitle ? {
              title: data.bookTitle,
              author: data.bookAuthor,
              link: data.bookLink
            } : null
          }, null, 2);
          
        case "questions":
          // Process open questions to array format
          const questionsArray = data.openQuestions 
            ? data.openQuestions.split('\n')
              .map(q => q.trim())
              .filter(q => q.length > 0)
            : [];
            
          return JSON.stringify({
            openQuestions: questionsArray,
            relatedQuestions: data.relatedQuestions || []
          }, null, 2);
          
        case "versioning":
          return JSON.stringify({
            versionInfo: {
              createNewVersion: data.createNewVersion || false,
              versionNote: data.versionNote || ''
            }
          }, null, 2);
        
        case "complete":
        default:
          return JSON.stringify(data, null, 2);
      }
    } catch (error) {
      console.error('Error generating JSON:', error);
      return '{}';
    }
  }, [formValues]);

  return { generateJson };
};
