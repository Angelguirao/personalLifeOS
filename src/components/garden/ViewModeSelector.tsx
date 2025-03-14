
import React from 'react';
import { Sprout, Network, List, Table2, MessageCircle, GitBranch } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';

export type ViewMode = 'list' | 'graph' | 'table' | 'qa' | 'flowchart';

interface ViewModeSelectorProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

const ViewModeSelector = ({ viewMode, setViewMode }: ViewModeSelectorProps) => {
  return (
    <div className="flex justify-center w-full">
      <ToggleGroup 
        type="single" 
        value={viewMode} 
        onValueChange={(value) => value && setViewMode(value as ViewMode)} 
        className="flex flex-wrap justify-center"
      >
        <ToggleGroupItem 
          value="list" 
          variant="outline" 
          size="sm" 
          className={`flex-1 sm:flex-initial ${viewMode === 'list' ? 'bg-black text-white hover:bg-black/90' : 'hover:bg-green-50 border-green-100'}`}
        >
          <List size={16} className="mr-2" />
          List
        </ToggleGroupItem>
        
        <ToggleGroupItem 
          value="graph" 
          variant="outline" 
          size="sm" 
          className={`flex-1 sm:flex-initial ${viewMode === 'graph' ? 'bg-black text-white hover:bg-black/90' : 'hover:bg-green-50 border-green-100'}`}
        >
          <Network size={16} className="mr-2" />
          Graph
        </ToggleGroupItem>
        
        <ToggleGroupItem 
          value="table" 
          variant="outline" 
          size="sm" 
          className={`flex-1 sm:flex-initial ${viewMode === 'table' ? 'bg-black text-white hover:bg-black/90' : 'hover:bg-green-50 border-green-100'}`}
          disabled={true}
        >
          <Table2 size={16} className="mr-2" />
          Table
        </ToggleGroupItem>
        
        <ToggleGroupItem 
          value="qa" 
          variant="outline" 
          size="sm" 
          className={`flex-1 sm:flex-initial ${viewMode === 'qa' ? 'bg-black text-white hover:bg-black/90' : 'hover:bg-green-50 border-green-100'}`}
          disabled={true}
        >
          <MessageCircle size={16} className="mr-2" />
          Q&A
        </ToggleGroupItem>
        
        <ToggleGroupItem 
          value="flowchart" 
          variant="outline" 
          size="sm" 
          className={`flex-1 sm:flex-initial ${viewMode === 'flowchart' ? 'bg-black text-white hover:bg-black/90' : 'hover:bg-green-50 border-green-100'}`}
          disabled={true}
        >
          <GitBranch size={16} className="mr-2" />
          Flowchart
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default ViewModeSelector;
