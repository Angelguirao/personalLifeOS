
import React from 'react';
import { Sprout, Network, List, Table2, MessageCircle, GitBranch, Layers } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';

export type ViewMode = 'list' | 'graph' | 'table' | 'qa' | 'flowchart' | 'hierarchy';

interface ViewModeSelectorProps {
  activeView: ViewMode;
  onViewChange: (mode: ViewMode) => void;
}

const ViewModeSelector = ({ activeView, onViewChange }: ViewModeSelectorProps) => {
  return (
    <div className="flex justify-center w-full">
      <ToggleGroup 
        type="single" 
        value={activeView} 
        onValueChange={(value) => value && onViewChange(value as ViewMode)} 
        className="flex flex-wrap justify-center"
      >
        <ToggleGroupItem 
          value="hierarchy" 
          variant="outline" 
          size="sm" 
          className={`flex-1 sm:flex-initial ${activeView === 'hierarchy' ? 'bg-black text-white hover:bg-black/90' : 'hover:bg-green-50 border-green-100'}`}
        >
          <Layers size={16} className="mr-2" />
          Hierarchy
        </ToggleGroupItem>
        
        <ToggleGroupItem 
          value="list" 
          variant="outline" 
          size="sm" 
          className={`flex-1 sm:flex-initial ${activeView === 'list' ? 'bg-black text-white hover:bg-black/90' : 'hover:bg-green-50 border-green-100'}`}
        >
          <List size={16} className="mr-2" />
          List
        </ToggleGroupItem>
        
        <ToggleGroupItem 
          value="graph" 
          variant="outline" 
          size="sm" 
          className={`flex-1 sm:flex-initial ${activeView === 'graph' ? 'bg-black text-white hover:bg-black/90' : 'hover:bg-green-50 border-green-100'}`}
        >
          <Network size={16} className="mr-2" />
          Graph
        </ToggleGroupItem>
        
        <ToggleGroupItem 
          value="qa" 
          variant="outline" 
          size="sm" 
          className={`flex-1 sm:flex-initial ${activeView === 'qa' ? 'bg-black text-white hover:bg-black/90' : 'hover:bg-green-50 border-green-100'}`}
        >
          <MessageCircle size={16} className="mr-2" />
          Q&A
        </ToggleGroupItem>
        
        <ToggleGroupItem 
          value="table" 
          variant="outline" 
          size="sm" 
          className={`flex-1 sm:flex-initial ${activeView === 'table' ? 'bg-black text-white hover:bg-black/90' : 'hover:bg-green-50 border-green-100'}`}
          disabled={true}
        >
          <Table2 size={16} className="mr-2" />
          Table
        </ToggleGroupItem>
        
        <ToggleGroupItem 
          value="flowchart" 
          variant="outline" 
          size="sm" 
          className={`flex-1 sm:flex-initial ${activeView === 'flowchart' ? 'bg-black text-white hover:bg-black/90' : 'hover:bg-green-50 border-green-100'}`}
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
