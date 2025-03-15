
import React from 'react';
import { Book, Link2, BrainCircuit, MessageCircleQuestion } from 'lucide-react';
import { MentalModel } from '@/lib/garden/types/mental-model-types';

interface ContentSectionsProps {
  note: MentalModel;
}

const ContentSections = ({ note }: ContentSectionsProps) => {
  // Helper function to check if an object or array has content
  const hasContent = (obj: any): boolean => {
    if (!obj) return false;
    
    if (Array.isArray(obj)) {
      return obj.length > 0;
    }
    
    if (typeof obj === 'object') {
      // Check if any value in the object is non-empty
      return Object.values(obj).some(value => {
        if (typeof value === 'string') return value.trim() !== '';
        if (Array.isArray(value)) return value.length > 0;
        if (typeof value === 'object' && value !== null) return hasContent(value);
        return false;
      });
    }
    
    return false;
  };
  
  // Check if socratic attributes section has any content to display
  const hasSocraticContent = note.socraticAttributes && hasContent(note.socraticAttributes);
  
  // Check if consequences section has any content to display
  const hasConsequencesContent = note.consequences && hasContent(note.consequences);

  // Format date helper function
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch (e) {
      return 'Invalid date';
    }
  };

  return (
    <div className="mt-4 space-y-6">
      {/* Summary if different from full content */}
      {note.summary && note.summary !== note.fullContent && (
        <div className="font-medium text-sm">
          <p className="italic">{note.summary}</p>
        </div>
      )}
      
      {/* Full content */}
      {note.fullContent && note.fullContent.trim() !== '' && (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p>
            {note.fullContent}
          </p>
        </div>
      )}
      
      {/* Applications section if available */}
      {note.applications?.examples && note.applications.examples.length > 0 && (
        <div className="mt-6 space-y-2">
          <h3 className="text-sm font-semibold">Applications:</h3>
          <ul className="space-y-1 text-sm">
            {note.applications.examples.map((example, index) => (
              <li key={index} className="pl-4 relative before:absolute before:left-0 before:content-['•'] before:text-primary">
                <span className="font-medium">{example.domain}:</span> {example.description}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Consequences section if available and has content */}
      {hasConsequencesContent && (
        <div className="mt-6 space-y-2">
          <h3 className="text-sm font-semibold">Implications:</h3>
          <div className="space-y-1 text-sm">
            {note.consequences?.personal && note.consequences.personal.trim() !== '' && (
              <p><span className="font-medium">Personal:</span> {note.consequences.personal}</p>
            )}
            {note.consequences?.interpersonal && note.consequences.interpersonal.trim() !== '' && (
              <p><span className="font-medium">Interpersonal:</span> {note.consequences.interpersonal}</p>
            )}
            {note.consequences?.societal && note.consequences.societal.trim() !== '' && (
              <p><span className="font-medium">Societal:</span> {note.consequences.societal}</p>
            )}
          </div>
        </div>
      )}
      
      {/* Origin moment if available */}
      {note.originMoment && (
        <div className="mt-6 p-3 bg-secondary/20 rounded-md">
          <div className="flex items-start text-sm">
            <BrainCircuit size={14} className="mr-2 mt-0.5 text-primary" />
            <div>
              <span className="font-medium">Origin:</span> {formatDate(note.originMoment.datetime)}
              {note.originMoment.location && <span> at {note.originMoment.location}</span>}
              {note.originMoment.emotions && note.originMoment.emotions.length > 0 && (
                <p className="mt-1"><span className="font-medium">Emotions:</span> {note.originMoment.emotions.join(', ')}</p>
              )}
              {note.originMoment.perceptions && (
                <p className="mt-1"><span className="font-medium">Perceptions:</span> {note.originMoment.perceptions}</p>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Socratic attributes if available and has content */}
      {hasSocraticContent && (
        <div className="mt-6 space-y-3">
          <h3 className="text-sm font-semibold flex items-center">
            <MessageCircleQuestion size={14} className="mr-2 text-primary" />
            Socratic Analysis
          </h3>
          <div className="space-y-2 text-sm">
            {note.socraticAttributes?.clarification && note.socraticAttributes.clarification.trim() !== '' && (
              <p><span className="font-medium">Clarification:</span> {note.socraticAttributes.clarification}</p>
            )}
            {note.socraticAttributes?.assumptions && note.socraticAttributes.assumptions.length > 0 && (
              <div>
                <span className="font-medium">Assumptions:</span>
                <ul className="mt-1 pl-4 space-y-1">
                  {note.socraticAttributes.assumptions.map((assumption, index) => (
                    <li key={index} className="relative before:absolute before:left-[-1rem] before:content-['•'] before:text-primary">
                      {assumption}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {note.socraticAttributes?.evidence && note.socraticAttributes.evidence.trim() !== '' && (
              <p><span className="font-medium">Evidence:</span> {note.socraticAttributes.evidence}</p>
            )}
            {note.socraticAttributes?.alternativePerspectives && note.socraticAttributes.alternativePerspectives.length > 0 && (
              <div>
                <span className="font-medium">Alternative Perspectives:</span>
                <ul className="mt-1 pl-4 space-y-1">
                  {note.socraticAttributes.alternativePerspectives.map((perspective, index) => (
                    <li key={index} className="relative before:absolute before:left-[-1rem] before:content-['•'] before:text-primary">
                      {perspective}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {note.socraticAttributes?.implications && note.socraticAttributes.implications.trim() !== '' && (
              <p><span className="font-medium">Implications:</span> {note.socraticAttributes.implications}</p>
            )}
          </div>
        </div>
      )}
      
      {/* Open questions if available */}
      {note.openQuestions && note.openQuestions.length > 0 && (
        <div className="mt-6 space-y-2">
          <h3 className="text-sm font-semibold">Open Questions:</h3>
          <ul className="space-y-1 text-sm pl-4">
            {note.openQuestions.map((question, index) => (
              <li key={index} className="relative before:absolute before:left-[-1rem] before:content-['•'] before:text-primary">
                {question}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Book reference - using bookInfo directly if available */}
      {note.bookInfo && (
        <div className="mt-6 p-3 bg-secondary/20 rounded-md">
          <div className="flex items-center text-sm">
            <Book size={14} className="mr-2 text-primary flex-shrink-0" />
            <span>From: <a 
              href={note.bookInfo.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {note.bookInfo.title}
            </a> by {note.bookInfo.author}</span>
          </div>
        </div>
      )}
      
      {/* Tags section */}
      {note.tags && note.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
          <span className="text-xs text-muted-foreground mr-2">Tags:</span>
          {note.tags.map((tag) => (
            <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full bg-secondary/50 text-muted-foreground text-xs">
              <Link2 size={10} className="mr-1" />
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentSections;
