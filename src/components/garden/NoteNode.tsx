import React from 'react';
import { Handle, Position } from 'reactflow';
import { GardenNote } from '../../lib/garden/types/legacy-types';

// Custom node for garden notes
const NoteNode = ({ data }: { data: GardenNote }) => {
  const getStageColor = (stage: string) => {
    switch(stage) {
      case "seedling": return "bg-green-400";
      case "growing": return "bg-green-500";
      case "evergreen": return "bg-green-600";
      default: return "bg-gray-400";
    }
  };

  return (
    <div className={`p-3 rounded-md bg-background border border-muted shadow-md w-48 hover:shadow-lg transition-shadow`}>
      <div className="flex items-center mb-2">
        <div className={`w-2 h-2 rounded-full ${getStageColor(data.stage)} mr-2`}></div>
        <span className="text-xs text-muted-foreground">{data.stage}</span>
      </div>
      <div className="font-serif font-medium text-sm truncate" title={data.title}>
        {data.title}
      </div>
      
      {/* Adding handles for connections */}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default NoteNode;
