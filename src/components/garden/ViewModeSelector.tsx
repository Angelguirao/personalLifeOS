
import React from 'react';
import { Sprout, Network } from 'lucide-react';
import { Button } from '../ui/button';

interface ViewModeSelectorProps {
  viewMode: 'list' | 'graph';
  setViewMode: (mode: 'list' | 'graph') => void;
}

const ViewModeSelector = ({ viewMode, setViewMode }: ViewModeSelectorProps) => {
  return (
    <div className="flex space-x-2 w-full sm:w-auto">
      <Button 
        variant={viewMode === 'list' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => setViewMode('list')}
        className="flex items-center flex-1 sm:flex-initial justify-center"
      >
        <Sprout size={16} className="mr-2" />
        List View
      </Button>
      <Button 
        variant={viewMode === 'graph' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => setViewMode('graph')}
        className="flex items-center flex-1 sm:flex-initial justify-center"
      >
        <Network size={16} className="mr-2" />
        Graph View
      </Button>
    </div>
  );
};

export default ViewModeSelector;
