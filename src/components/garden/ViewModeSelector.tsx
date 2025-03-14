
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
    <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as ViewMode)} className="flex flex-wrap w-full sm:w-auto">
      <ToggleGroupItem value="list" variant="outline" size="sm" className="flex-1 sm:flex-initial">
        <List size={16} className="mr-2" />
        List
      </ToggleGroupItem>
      
      <ToggleGroupItem value="graph" variant="outline" size="sm" className="flex-1 sm:flex-initial">
        <Network size={16} className="mr-2" />
        Graph
      </ToggleGroupItem>
      
      <ToggleGroupItem value="table" variant="outline" size="sm" className="flex-1 sm:flex-initial" disabled={true}>
        <Table2 size={16} className="mr-2" />
        Table
      </ToggleGroupItem>
      
      <ToggleGroupItem value="qa" variant="outline" size="sm" className="flex-1 sm:flex-initial" disabled={true}>
        <MessageCircle size={16} className="mr-2" />
        Q&A
      </ToggleGroupItem>
      
      <ToggleGroupItem value="flowchart" variant="outline" size="sm" className="flex-1 sm:flex-initial" disabled={true}>
        <GitBranch size={16} className="mr-2" />
        Flowchart
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default ViewModeSelector;
