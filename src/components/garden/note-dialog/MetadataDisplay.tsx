
import React from 'react';
import { Sprout, Star, Eye, Layers, Calendar } from 'lucide-react';
import { MentalModel } from '@/lib/garden/types/mental-model-types';

interface MetadataDisplayProps {
  note: MentalModel;
}

const MetadataDisplay = ({ note }: MetadataDisplayProps) => {
  const getStageColor = (stage: string) => {
    switch(stage) {
      case "seedling": return "text-green-400";
      case "growing": return "text-green-500";
      case "evergreen":
      case "mature": return "text-green-600";
      default: return "text-green-400";
    }
  };

  const getConfidenceColor = (confidence: string) => {
    switch(confidence) {
      case "hypothesis": return "text-blue-400";
      case "working": return "text-blue-500";
      case "established": return "text-blue-600";
      case "fundamental": return "text-blue-700";
      default: return "text-blue-500";
    }
  };

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
    <div className="mb-4 flex flex-wrap items-center justify-between gap-y-2 border-b pb-3">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
        {/* Development stage */}
        <div className="flex items-center">
          <Sprout size={16} className={getStageColor(note.developmentStage || note.stage || 'seedling')} />
          <span className="ml-1 capitalize">{note.developmentStage || note.stage || 'seedling'}</span>
        </div>
        
        {/* Confidence level */}
        {note.confidenceLevel && (
          <div className="flex items-center">
            <Star size={16} className={getConfidenceColor(note.confidenceLevel)} />
            <span className="ml-1 capitalize">{note.confidenceLevel}</span>
          </div>
        )}
        
        {/* Visibility */}
        {note.visibility && (
          <div className="flex items-center">
            <Eye size={16} />
            <span className="ml-1 capitalize">{note.visibility}</span>
          </div>
        )}
        
        {/* Hierarchy level if available */}
        {note.latchAttributes?.hierarchyLevel && (
          <div className="flex items-center">
            <Layers size={16} />
            <span className="ml-1">Level {note.latchAttributes.hierarchyLevel}</span>
          </div>
        )}
      </div>
      
      {/* Timestamps */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
        {note.timestamps?.created && (
          <div className="flex items-center">
            <Calendar size={14} className="mr-1" />
            <span>Created: {formatDate(note.timestamps.created)}</span>
          </div>
        )}
        {note.timestamps?.modified && (
          <div className="flex items-center">
            <Calendar size={14} className="mr-1" />
            <span>Updated: {formatDate(note.timestamps.modified)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetadataDisplay;
