
import React from 'react';
import { Sprout, Network, List, Table2, MessageCircle, GitBranch } from 'lucide-react';
import { Button } from '../ui/button';

export type ViewMode = 'list' | 'graph' | 'table' | 'qa' | 'flowchart';

interface ViewModeSelectorProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

const ViewModeSelector = ({ viewMode, setViewMode }: ViewModeSelectorProps) => {
  return (
    <div className="flex flex-wrap gap-2 w-full sm:w-auto">
      <Button 
        variant={viewMode === 'list' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => setViewMode('list')}
        className="flex items-center flex-1 sm:flex-initial justify-center"
      >
        <Sprout size={16} className="mr-2" />
        List
      </Button>
      <Button 
        variant={viewMode === 'graph' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => setViewMode('graph')}
        className="flex items-center flex-1 sm:flex-initial justify-center"
      >
        <Network size={16} className="mr-2" />
        Graph
      </Button>
      <Button 
        variant={viewMode === 'table' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => setViewMode('table')}
        className="flex items-center flex-1 sm:flex-initial justify-center"
        disabled={true} // Disabled until implemented
      >
        <Table2 size={16} className="mr-2" />
        Table
      </Button>
      <Button 
        variant={viewMode === 'qa' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => setViewMode('qa')}
        className="flex items-center flex-1 sm:flex-initial justify-center"
        disabled={true} // Disabled until implemented
      >
        <MessageCircle size={16} className="mr-2" />
        Q&A
      </Button>
      <Button 
        variant={viewMode === 'flowchart' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => setViewMode('flowchart')}
        className="flex items-center flex-1 sm:flex-initial justify-center"
        disabled={true} // Disabled until implemented
      >
        <GitBranch size={16} className="mr-2" />
        Flowchart
      </Button>
    </div>
  );
};

export default ViewModeSelector;
